import type { SFNTFont } from '../sfnt-font.js';
import type { OpenTypeVariation } from '../tables/variations.js';
import type { Point } from './ttf-glyph.js';

const TUPLES_SHARE_POINT_NUMBERS = 0x8000;
const TUPLE_COUNT_MASK = 0x0fff;
const EMBEDDED_TUPLE_COORD = 0x8000;
const INTERMEDIATE_TUPLE = 0x4000;
const PRIVATE_POINT_NUMBERS = 0x2000;
const TUPLE_INDEX_MASK = 0x0fff;
const POINTS_ARE_WORDS = 0x80;
const POINT_RUN_COUNT_MASK = 0x7f;
const DELTAS_ARE_ZERO = 0x80;
const DELTAS_ARE_WORDS = 0x40;
const DELTA_RUN_COUNT_MASK = 0x3f;

interface VariationMapEntry {
	outerIndex: number;
	innerIndex: number;
}

interface AdvanceWidthMappingTable {
	mapCount: number;
	mapData: VariationMapEntry[];
}

/**
 * Temporary structural interface uniting BASE, GDEF, and HVAR tables until
 * full table parsers are formally written and typed.
 */
interface MetricVariationTable {
	/** Optional mapping matrix resolving indices to delta coordinates. */
	advanceWidthMapping?: AdvanceWidthMappingTable | null;

	/** The core shared Item Variation Store layout engine configuration pointer. */
	itemVariationStore: OpenTypeVariation.ItemVariationStore;
}

/**
 * This class transforms TrueType glyphs according to the data from
 * the Apple Advanced Typography variation tables (fvar, gvar, and avar).
 * These tables allow infinite adjustments to glyph weight, width, slant,
 * and optical size without the designer needing to specify every exact style.
 *
 * Apple's documentation for these tables is not great, so thanks to the
 * Freetype project for figuring much of this out.
 *
 * FIXME! This class cache blend vecotrs and calculates normalised coordinates
 * and remembers them. That can easily be integrated into the SFNTFont class.
 */
export default class GlyphVariationProcessor {
	private font: SFNTFont;
	public _normalizedCoords: number[];
	private blendVectors = new Map<
		OpenTypeVariation.ItemVariationData,
		number[]
	>();

	constructor(font: SFNTFont, coords: number[]) {
		this.font = font;
		this._normalizedCoords = this.normalizeCoords(coords);
	}

	private normalizeCoords(coords: number[]): number[] {
		// the default mapping is linear along each axis, in two segments:
		// from the minValue to defaultValue, and from defaultValue to maxValue.
		const normalized = [];
		for (let i = 0; i < this.font.fvar.axis.length; i++) {
			const axis = this.font.fvar.axis[i];
			if (coords[i] < axis.defaultValue) {
				normalized.push(
					(coords[i] - axis.defaultValue + Number.EPSILON) /
						(axis.defaultValue - axis.minValue + Number.EPSILON),
				);
			} else {
				normalized.push(
					(coords[i] - axis.defaultValue + Number.EPSILON) /
						(axis.maxValue - axis.defaultValue + Number.EPSILON),
				);
			}
		}

		// if there is an avar table, the normalized value is calculated
		// by interpolating between the two nearest mapped values.
		if (this.font.avar) {
			for (let i = 0; i < this.font.avar.segment.length; i++) {
				const segment = this.font.avar.segment[i];
				for (let j = 0; j < segment.correspondence.length; j++) {
					const pair = segment.correspondence[j];
					if (j >= 1 && normalized[i] < pair.fromCoord) {
						const prev = segment.correspondence[j - 1];
						normalized[i] =
							((normalized[i] - prev.fromCoord) *
								(pair.toCoord - prev.toCoord) +
								Number.EPSILON) /
								(pair.fromCoord - prev.fromCoord + Number.EPSILON) +
							prev.toCoord;

						break;
					}
				}
			}
		}

		return normalized;
	}

	public transformPoints(gid: number, glyphPoints: Point[]): void {
		if (!this.font.fvar || !this.font.gvar) {
			return;
		}

		const { gvar } = this.font;
		if (gid >= gvar.glyphCount) {
			return;
		}

		const offset = gvar.offsets[gid];
		if (offset === gvar.offsets[gid + 1]) {
			return;
		}

		// Read the gvar data for this glyph
		const { stream } = this.font;
		stream.pos = offset;
		if (stream.pos >= (stream.length as unknown as number)) {
			return;
		}

		let tupleCount = stream.readUInt16BE();
		let offsetToData = offset + stream.readUInt16BE();

		let sharedPoints: Uint16Array;
		if (tupleCount & TUPLES_SHARE_POINT_NUMBERS) {
			const here = stream.pos;
			stream.pos = offsetToData;
			sharedPoints = this.decodePoints();
			offsetToData = stream.pos;
			stream.pos = here;
		} else {
			sharedPoints = new Uint16Array();
		}

		const origPoints = glyphPoints.map((pt) => pt.copy());

		tupleCount &= TUPLE_COUNT_MASK;
		for (let i = 0; i < tupleCount; i++) {
			const tupleDataSize = stream.readUInt16BE();
			const tupleIndex = stream.readUInt16BE();
			let tupleCoords: number[] = [];

			if (tupleIndex & EMBEDDED_TUPLE_COORD) {
				for (let a = 0; a < gvar.axisCount; a++) {
					tupleCoords.push(stream.readInt16BE() / 16384);
				}
			} else {
				if ((tupleIndex & TUPLE_INDEX_MASK) >= gvar.globalCoordCount) {
					throw new Error('Invalid gvar table');
				}

				tupleCoords = gvar.globalCoords[tupleIndex & TUPLE_INDEX_MASK];
			}

			let startCoords: number[] | undefined;
			let endCoords: number[] | undefined;
			if (tupleIndex & INTERMEDIATE_TUPLE) {
				startCoords = [];
				for (let a = 0; a < gvar.axisCount; a++) {
					startCoords.push(stream.readInt16BE() / 16384);
				}

				endCoords = [];
				for (let a = 0; a < gvar.axisCount; a++) {
					endCoords.push(stream.readInt16BE() / 16384);
				}
			}

			// Get the factor at which to apply this tuple
			const factor = this.tupleFactor(
				tupleIndex,
				tupleCoords,
				startCoords,
				endCoords,
			);
			if (factor === 0) {
				offsetToData += tupleDataSize;
				continue;
			}

			const here = stream.pos;
			stream.pos = offsetToData;

			let points: Uint16Array;
			if (tupleIndex & PRIVATE_POINT_NUMBERS) {
				points = this.decodePoints();
			} else {
				points = sharedPoints;
			}

			// points.length = 0 means there are deltas for all points
			const nPoints = points.length === 0 ? glyphPoints.length : points.length;
			const xDeltas = this.decodeDeltas(nPoints);
			const yDeltas = this.decodeDeltas(nPoints);

			let point: Point;
			if (points.length === 0) {
				// all points
				for (let i = 0; i < glyphPoints.length; i++) {
					point = glyphPoints[i];
					point.x += Math.round(xDeltas[i] * factor);
					point.y += Math.round(yDeltas[i] * factor);
				}
			} else {
				const outPoints = origPoints.map((pt) => pt.copy());
				const hasDelta = glyphPoints.map(() => false);

				for (let i = 0; i < points.length; i++) {
					const idx = points[i];
					if (idx < glyphPoints.length) {
						point = outPoints[idx];
						hasDelta[idx] = true;

						point.x += Math.round(xDeltas[i] * factor);
						point.y += Math.round(yDeltas[i] * factor);
					}
				}

				this.interpolateMissingDeltas(outPoints, origPoints, hasDelta);

				for (let i = 0; i < glyphPoints.length; i++) {
					const deltaX = outPoints[i].x - origPoints[i].x;
					const deltaY = outPoints[i].y - origPoints[i].y;

					glyphPoints[i].x += deltaX;
					glyphPoints[i].y += deltaY;
				}
			}

			offsetToData += tupleDataSize;
			stream.pos = here;
		}
	}

	private decodePoints(): Uint16Array {
		const stream = this.font.stream;
		let count = stream.readUInt8();

		if (count & POINTS_ARE_WORDS) {
			count = ((count & POINT_RUN_COUNT_MASK) << 8) | stream.readUInt8();
		}

		const points = new Uint16Array(count);
		let i = 0;
		let point = 0;
		while (i < count) {
			const run = stream.readUInt8();
			const runCount = (run & POINT_RUN_COUNT_MASK) + 1;
			const fn = run & POINTS_ARE_WORDS ? stream.readUInt16 : stream.readUInt8;

			for (let j = 0; j < runCount && i < count; j++) {
				point += fn.call(stream);
				points[i++] = point;
			}
		}

		return points;
	}

	private decodeDeltas(count: number): Int16Array {
		const stream = this.font.stream;
		let i = 0;
		const deltas = new Int16Array(count);

		while (i < count) {
			const run = stream.readUInt8();
			const runCount = (run & DELTA_RUN_COUNT_MASK) + 1;

			if (run & DELTAS_ARE_ZERO) {
				i += runCount;
			} else {
				const fn =
					run & DELTAS_ARE_WORDS ? stream.readInt16BE : stream.readInt8;
				for (let j = 0; j < runCount && i < count; j++) {
					deltas[i++] = fn.call(stream);
				}
			}
		}

		return deltas;
	}

	private tupleFactor(
		tupleIndex: number,
		tupleCoords: number[],
		startCoords?: number[],
		endCoords?: number[],
	) {
		const normalized = this.normalizedCoords;
		const { gvar } = this.font;
		let factor = 1;

		for (let i = 0; i < gvar.axisCount; i++) {
			if (tupleCoords[i] === 0) {
				continue;
			}

			if (normalized[i] === 0) {
				return 0;
			}

			if ((tupleIndex & INTERMEDIATE_TUPLE) === 0) {
				if (
					normalized[i] < Math.min(0, tupleCoords[i]) ||
					normalized[i] > Math.max(0, tupleCoords[i])
				) {
					return 0;
				}

				factor =
					(factor * normalized[i] + Number.EPSILON) /
					(tupleCoords[i] + Number.EPSILON);
			} else {
				// Check for malformed font data to avoid crashes.
				if (!startCoords || !endCoords) {
					throw new Error(
						'Malformed font: Intermediate tuple missing start or end coordinates.',
					);
				}
				if (i >= startCoords.length || i >= endCoords.length) {
					throw new Error(
						`Malformed font: Coordinate axis index ${i} is out of bounds.`,
					);
				}

				if (normalized[i] < startCoords[i] || normalized[i] > endCoords[i]) {
					return 0;
				} else if (normalized[i] < tupleCoords[i]) {
					factor =
						(factor * (normalized[i] - startCoords[i] + Number.EPSILON)) /
						(tupleCoords[i] - startCoords[i] + Number.EPSILON);
				} else {
					factor =
						(factor * (endCoords[i] - normalized[i] + Number.EPSILON)) /
						(endCoords[i] - tupleCoords[i] + Number.EPSILON);
				}
			}
		}

		return factor;
	}

	// Interpolates points without delta values.
	// Needed for the Ø and Q glyphs in Skia.
	// Algorithm from Freetype.
	private interpolateMissingDeltas(
		points: Point[],
		inPoints: Point[],
		hasDelta: boolean[],
	) {
		if (points.length === 0) {
			return;
		}

		let point = 0;
		while (point < points.length) {
			const firstPoint = point;

			// find the end point of the contour
			let endPoint = point;
			let pt = points[endPoint];
			while (!pt.endContour) {
				pt = points[++endPoint];
			}

			// find the first point that has a delta
			while (point <= endPoint && !hasDelta[point]) {
				point++;
			}

			if (point > endPoint) {
				continue;
			}

			const firstDelta = point;
			let curDelta = point;
			point++;

			while (point <= endPoint) {
				// find the next point with a delta, and interpolate intermediate points
				if (hasDelta[point]) {
					this.deltaInterpolate(
						curDelta + 1,
						point - 1,
						curDelta,
						point,
						inPoints,
						points,
					);
					curDelta = point;
				}

				point++;
			}

			// shift contour if we only have a single delta
			if (curDelta === firstDelta) {
				this.deltaShift(firstPoint, endPoint, curDelta, inPoints, points);
			} else {
				// otherwise, handle the remaining points at the end and beginning of the contour
				this.deltaInterpolate(
					curDelta + 1,
					endPoint,
					curDelta,
					firstDelta,
					inPoints,
					points,
				);

				if (firstDelta > 0) {
					this.deltaInterpolate(
						firstPoint,
						firstDelta - 1,
						curDelta,
						firstDelta,
						inPoints,
						points,
					);
				}
			}

			point = endPoint + 1;
		}
	}

	private deltaInterpolate(
		p1: number,
		p2: number,
		ref1: number,
		ref2: number,
		inPoints: Point[],
		outPoints: Point[],
	) {
		if (p1 > p2) {
			return;
		}

		const iterable = ['x', 'y'] as const;
		for (let i = 0; i < iterable.length; i++) {
			const k = iterable[i];
			if (inPoints[ref1][k] > inPoints[ref2][k]) {
				const p = ref1;
				ref1 = ref2;
				ref2 = p;
			}

			const in1 = inPoints[ref1][k];
			const in2 = inPoints[ref2][k];
			const out1 = outPoints[ref1][k];
			const out2 = outPoints[ref2][k];

			// If the reference points have the same coordinate but different
			// delta, inferred delta is zero.  Otherwise interpolate.
			if (in1 !== in2 || out1 === out2) {
				const scale = in1 === in2 ? 0 : (out2 - out1) / (in2 - in1);

				for (let p = p1; p <= p2; p++) {
					let out = inPoints[p][k];

					if (out <= in1) {
						out += out1 - in1;
					} else if (out >= in2) {
						out += out2 - in2;
					} else {
						out = out1 + (out - in1) * scale;
					}

					outPoints[p][k] = out;
				}
			}
		}
	}

	private deltaShift(
		p1: number,
		p2: number,
		ref: number,
		inPoints: Point[],
		outPoints: Point[],
	) {
		const deltaX = outPoints[ref].x - inPoints[ref].x;
		const deltaY = outPoints[ref].y - inPoints[ref].y;

		if (deltaX === 0 && deltaY === 0) {
			return;
		}

		for (let p = p1; p <= p2; p++) {
			if (p !== ref) {
				outPoints[p].x += deltaX;
				outPoints[p].y += deltaY;
			}
		}
	}

	public get normalizedCoords(): number[] {
		return this._normalizedCoords;
	}

	// getAdvanceAdjustment(gid: number, table: any) {
	// FIXME! Create a common base type for the BASE, GDEF, and HVAR table!
	// This will be an appropriate type for the table argument.
	public getAdvanceAdjustment(gid: number, table: MetricVariationTable) {
		let outerIndex: number;
		let innerIndex: number;

		if (table.advanceWidthMapping) {
			let idx = gid;
			if (idx >= table.advanceWidthMapping.mapCount) {
				idx = table.advanceWidthMapping.mapCount - 1;
			}

			({ outerIndex, innerIndex } = table.advanceWidthMapping.mapData[idx]);
		} else {
			outerIndex = 0;
			innerIndex = gid;
		}

		return this.getDelta(table.itemVariationStore, outerIndex, innerIndex);
	}

	// See pseudo code from `Font Variations Overview'
	// in the OpenType specification.
	public getDelta(
		itemStore: OpenTypeVariation.ItemVariationStore,
		outerIndex: number,
		innerIndex: number,
	): number {
		if (outerIndex >= itemStore.itemVariationData.length) {
			return 0;
		}

		const varData = itemStore.itemVariationData[outerIndex]!;
		if (innerIndex >= varData.deltaSets.length) {
			return 0;
		}

		const deltaSet = varData.deltaSets[innerIndex];
		const blendVector = this.getBlendVector(itemStore, outerIndex);
		if (!blendVector) {
			return 0;
		}

		let netAdjustment = 0;

		for (let regionIdx = 0; regionIdx < varData.regionIndexCount; ++regionIdx) {
			netAdjustment += deltaSet.deltas[regionIdx] * blendVector[regionIdx];
		}

		return netAdjustment;
	}

	public getBlendVector(
		itemStore: OpenTypeVariation.ItemVariationStore,
		outerIndex: number,
	): number[] | undefined {
		if (!itemStore.variationRegionList?.variationRegions) {
			return;
		}

		const varData = itemStore.itemVariationData[outerIndex];
		if (!varData) {
			return;
		}

		if (this.blendVectors.has(varData)) {
			return this.blendVectors.get(varData);
		}

		const normalizedCoords = this.normalizedCoords;
		const blendVector = [];

		// outer loop steps through master designs to be blended
		for (let regionIdx = 0; regionIdx < varData.regionIndexCount; ++regionIdx) {
			let scalar = 1;
			const regionIndex = varData.regionIndexes[regionIdx];
			const axes = itemStore.variationRegionList?.variationRegions[regionIndex];
			if (!axes) {
				blendVector[regionIndex] = 0;
				continue;
			}

			// inner loop steps through axes in this region
			for (let j = 0; j < axes.length; j++) {
				const axis = axes[j];
				let axisScalar: number;

				// compute the scalar contribution of this axis
				// ignore invalid ranges
				if (
					axis.startCoord > axis.peakCoord ||
					axis.peakCoord > axis.endCoord
				) {
					axisScalar = 1;
				} else if (
					axis.startCoord < 0 &&
					axis.endCoord > 0 &&
					axis.peakCoord !== 0
				) {
					axisScalar = 1;

					// peak of 0 means ignore this axis
				} else if (axis.peakCoord === 0) {
					axisScalar = 1;

					// ignore this region if coords are out of range
				} else if (
					normalizedCoords[j] < axis.startCoord ||
					normalizedCoords[j] > axis.endCoord
				) {
					axisScalar = 0;

					// calculate a proportional factor
				} else {
					if (normalizedCoords[j] === axis.peakCoord) {
						axisScalar = 1;
					} else if (normalizedCoords[j] < axis.peakCoord) {
						axisScalar =
							(normalizedCoords[j] - axis.startCoord + Number.EPSILON) /
							(axis.peakCoord - axis.startCoord + Number.EPSILON);
					} else {
						axisScalar =
							(axis.endCoord - normalizedCoords[j] + Number.EPSILON) /
							(axis.endCoord - axis.peakCoord + Number.EPSILON);
					}
				}

				// take product of all the axis scalars
				scalar *= axisScalar;
			}

			blendVector[regionIdx] = scalar;
		}

		this.blendVectors.set(varData, blendVector);

		return blendVector;
	}
}
