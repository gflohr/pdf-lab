import r, { type DecodeStream } from '@pdf-lib/restructure';
import BoundingBox from './bounding-box.js';
import Glyph, { type GlyphLayoutMetrics } from './glyph.js';
import Path from './path.js';

// The header for both simple and composite glyphs.
interface GlyphHeaderData {
	numberOfContours: number;
	xMin: number;
	yMin: number;
	xMax: number;
	yMax: number;
}
const fields = {
	numberOfContours: r.int16,
	xMin: r.int16,
	yMin: r.int16,
	xMax: r.int16,
	yMax: r.int16,
};
const GlyphHeader = new r.Struct<typeof fields, GlyphHeaderData>(fields);

// Flags for simple glyphs.
// FIXME! This repeat the same variables in TTFGlyphEncoder.ts!
const ON_CURVE = 1 << 0;
const X_SHORT_VECTOR = 1 << 1;
const Y_SHORT_VECTOR = 1 << 2;
const REPEAT = 1 << 3;
const SAME_X = 1 << 4;
const SAME_Y = 1 << 5;

// Flags for composite glyphs
const ARG_1_AND_2_ARE_WORDS = 1 << 0;
// const ARGS_ARE_XY_VALUES = 1 << 1;
// const ROUND_XY_TO_GRID = 1 << 2;
const WE_HAVE_A_SCALE = 1 << 3;
const MORE_COMPONENTS = 1 << 5;
const WE_HAVE_AN_X_AND_Y_SCALE = 1 << 6;
const WE_HAVE_A_TWO_BY_TWO = 1 << 7;
const WE_HAVE_INSTRUCTIONS = 1 << 8;
// const USE_MY_METRICS = 1 << 9;
// const OVERLAP_COMPOUND = 1 << 10;
// const SCALED_COMPONENT_OFFSET = 1 << 11;
// const UNSCALED_COMPONENT_OFFSET = 1 << 12;

// Represents a point in a simple glyph
export class Point {
	constructor(
		public onCurve: boolean,
		public endContour: boolean,
		public x = 0,
		public y = 0,
	) {}

	copy() {
		return new Point(this.onCurve, this.endContour, this.x, this.y);
	}
}

// Represents a component in a composite glyph
class Component {
	public pos = 0;
	public scaleX = 1;
	public scaleY = 1;
	public scale01 = 0;
	public scale10 = 0;
	constructor(
		public glyphID: number,
		public dx: number,
		public dy: number,
	) {}
}

export interface DecodedSimpleGlyph extends GlyphHeaderData {
	points: Point[];
	instructions: number[];
	phantomPoints?: Point[];
	components?: never; // Explicitly missing on simple glyphs.
}

export interface DecodedCompositeGlyph extends GlyphHeaderData {
	points: Point[];
	instructions: number[];
	components: Component[];
	phantomPoints?: Point[];
}

export interface DecodedEmptyGlyph extends GlyphHeaderData {
	points?: never;
	instructions?: never;
	components?: never;
	phantomPoints?: Point[];
}

export type DecodedGlyph =
	| DecodedSimpleGlyph
	| DecodedCompositeGlyph
	| DecodedEmptyGlyph;

/**
 * Represents a TrueType glyph.
 */
export default class TTFGlyph extends Glyph {
	// Legacys Hack: Properties injected via base Glyph constructor mutations.
	public numberOfContours!: number;
	public xMin!: number;
	public yMin!: number;
	public xMax!: number;
	public yMax!: number;
	public points?: Point[];
	public instructions?: number[];
	public phantomPoints?: Point[];
	public components?: Component[];

	// Parses just the glyph header and returns the bounding box.
	protected _getCBox(internal: boolean): Readonly<BoundingBox> {
		// We need to decode the glyph if variation processing is requested,
		// so it's easier just to recompute the path's cbox after decoding.
		if (this._font.variationProcessor && !internal) {
			return this.path.cbox;
		}

		const stream = this._font.getGlyfTableStream();
		if (!stream) {
			throw new Error("Malformed font! Cannot decode table 'glyh'!");
		}
		stream.pos += this._font.loca.offsets[this.id];
		const glyph = GlyphHeader.decode(stream);

		const cbox = new BoundingBox(
			glyph.xMin,
			glyph.yMin,
			glyph.xMax,
			glyph.yMax,
		);

		return Object.freeze(cbox);
	}

	// Parses a single glyph coordinate.
	// _parseGlyphCoord(stream: DecodeStream, prev: number, short: number, same: number) {
	_parseGlyphCoord(
		stream: DecodeStream,
		prev: number,
		short: number,
		same: number,
	): number {
		let val: number;
		if (short) {
			val = stream.readUInt8();
			if (!same) {
				val = -val;
			}

			val += prev;
		} else {
			if (same) {
				val = prev;
			} else {
				val = prev + stream.readInt16BE();
			}
		}

		return val;
	}

	// Decodes the glyph data into points for simple glyphs,
	// or components for composite glyphs
	_decode(): DecodedGlyph | null {
		const glyphPos = this._font.loca.offsets[this.id];
		const nextPos = this._font.loca.offsets[this.id + 1];

		// Nothing to do if there is no data for this glyph
		if (glyphPos === nextPos) {
			return null;
		}

		const stream = this._font.getGlyfTableStream();
		if (!stream) {
			throw new Error("Malformed font! Cannot decode table 'glyh'!");
		}
		stream.pos += glyphPos;
		const startPos = stream.pos;

		const glyph = GlyphHeader.decode(stream);
		if (glyph.numberOfContours > 0) {
			this._decodeSimple(glyph as DecodedSimpleGlyph, stream);
		} else if (glyph.numberOfContours < 0) {
			this._decodeComposite(glyph as DecodedCompositeGlyph, stream, startPos);
		}

		return glyph;
	}

	_decodeSimple(glyph: DecodedSimpleGlyph, stream: DecodeStream): void {
		// this is a simple glyph
		glyph.points = [];
		glyph.instructions = [];

		const endPtsOfContours = new r.Array(
			r.uint16,
			glyph.numberOfContours,
		).decode(stream);
		glyph.instructions = new r.Array(r.uint8, r.uint16).decode(stream);

		const flags = [];
		const numCoords = endPtsOfContours[endPtsOfContours.length - 1] + 1;

		while (flags.length < numCoords) {
			const flag = stream.readUInt8();
			flags.push(flag);

			// check for repeat flag
			if (flag & REPEAT) {
				const count = stream.readUInt8();
				for (let j = 0; j < count; j++) {
					flags.push(flag);
				}
			}
		}

		for (let i = 0; i < flags.length; i++) {
			const flag = flags[i];
			const point = new Point(
				!!(flag & ON_CURVE),
				endPtsOfContours.indexOf(i) >= 0,
				0,
				0,
			);
			glyph.points.push(point);
		}

		let px = 0;
		for (let i = 0; i < flags.length; i++) {
			const flag = flags[i];
			glyph.points[i].x = px = this._parseGlyphCoord(
				stream,
				px,
				flag & X_SHORT_VECTOR,
				flag & SAME_X,
			);
		}

		let py = 0;
		for (let i = 0; i < flags.length; i++) {
			const flag = flags[i];
			glyph.points[i].y = py = this._parseGlyphCoord(
				stream,
				py,
				flag & Y_SHORT_VECTOR,
				flag & SAME_Y,
			);
		}

		if (this._font.variationProcessor) {
			const points = glyph.points.slice();
			points.push(...this._getPhantomPoints(glyph));

			this._font.variationProcessor.transformPoints(this.id, points);
			glyph.phantomPoints = points.slice(-4);
		}
	}

	_decodeComposite(
		glyph: DecodedCompositeGlyph,
		stream: DecodeStream,
		offset = 0,
	): boolean {
		glyph.points = [];
		glyph.instructions = [];
		glyph.components = [];

		let haveInstructions = false;
		let flags = MORE_COMPONENTS;

		while (flags & MORE_COMPONENTS) {
			flags = stream.readUInt16BE();
			const gPos = stream.pos - offset;
			const glyphID = stream.readUInt16BE();
			if (!haveInstructions) {
				haveInstructions = (flags & WE_HAVE_INSTRUCTIONS) !== 0;
			}

			let dx: number;
			let dy: number;
			if (flags & ARG_1_AND_2_ARE_WORDS) {
				dx = stream.readInt16BE();
				dy = stream.readInt16BE();
			} else {
				dx = stream.readInt8();
				dy = stream.readInt8();
			}

			const component = new Component(glyphID, dx, dy);
			component.pos = gPos;

			if (flags & WE_HAVE_A_SCALE) {
				// F2DOT14: signed 16-bit with 14 fraction bits.
				component.scaleX = component.scaleY = stream.readInt16BE() / 16384;
			} else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
				component.scaleX = stream.readInt16BE() / 16384;
				component.scaleY = stream.readInt16BE() / 16384;
			} else if (flags & WE_HAVE_A_TWO_BY_TWO) {
				component.scaleX = stream.readInt16BE() / 16384;
				component.scale01 = stream.readInt16BE() / 16384;
				component.scale10 = stream.readInt16BE() / 16384;
				component.scaleY = stream.readInt16BE() / 16384;
			}

			glyph.components.push(component);
		}

		if (this._font.variationProcessor) {
			const points = [];
			for (let j = 0; j < glyph.components.length; j++) {
				const component = glyph.components[j];
				points.push(new Point(true, true, component.dx, component.dy));
			}

			points.push(...this._getPhantomPoints(glyph));

			this._font.variationProcessor.transformPoints(this.id, points);
			glyph.phantomPoints = points.splice(-4, 4);

			for (let i = 0; i < points.length; i++) {
				const point = points[i];
				glyph.components[i].dx = point.x;
				glyph.components[i].dy = point.y;
			}
		}

		return haveInstructions;
	}

	_getPhantomPoints(glyph: DecodedGlyph) {
		const cbox = this._getCBox(true);
		if (this._metrics == null) {
			this._metrics = Glyph.prototype._getMetrics.call(this, cbox);
		}

		const { advanceWidth, advanceHeight, leftBearing, topBearing } =
			this._metrics;

		return [
			new Point(false, true, glyph.xMin - leftBearing, 0),
			new Point(false, true, glyph.xMin - leftBearing + advanceWidth, 0),
			new Point(false, true, 0, glyph.yMax + topBearing),
			new Point(false, true, 0, glyph.yMax + topBearing + advanceHeight),
		];
	}

	// Decodes font data, resolves composite glyphs, and returns an array of contours
	// @returns Point[][]
	_getContours(): Point[][] {
		const glyph = this._decode();
		if (!glyph) {
			return [];
		}

		let points: Point[] = [];

		if (glyph.numberOfContours < 0) {
			// resolve composite glyphs
			for (const component of glyph.components!) {
				const contours = (
					this._font.getGlyph(component.glyphID) as unknown as TTFGlyph
				)._getContours();
				for (let i = 0; i < contours.length; i++) {
					const contour = contours[i];
					for (let j = 0; j < contour.length; j++) {
						const point = contour[j];
						const x =
							point.x * component.scaleX +
							point.y * component.scale01 +
							component.dx;
						const y =
							point.y * component.scaleY +
							point.x * component.scale10 +
							component.dy;
						points.push(new Point(point.onCurve, point.endContour, x, y));
					}
				}
			}
		} else {
			points = glyph.points || [];
		}

		// Recompute and cache metrics if we performed variation processing, and don't have an HVAR table
		if (glyph.phantomPoints && !this._font.HVAR) {
			this._metrics!.advanceWidth =
				glyph.phantomPoints[1].x - glyph.phantomPoints[0].x;
			this._metrics!.advanceHeight =
				glyph.phantomPoints[3].y - glyph.phantomPoints[2].y;
			this._metrics!.leftBearing = glyph.xMin - glyph.phantomPoints[0].x;
			this._metrics!.topBearing = glyph.phantomPoints[2].y - glyph.yMax;
		}

		const contours = [];
		let cur = [];
		for (let k = 0; k < points.length; k++) {
			const point = points[k];
			cur.push(point);
			if (point.endContour) {
				contours.push(cur);
				cur = [];
			}
		}

		return contours;
	}

	public _getMetrics(): GlyphLayoutMetrics {
		if (this._metrics) {
			return this._metrics;
		}

		const cbox = this._getCBox(true);
		super._getMetrics(cbox);

		if (this._font.variationProcessor && !this._font.HVAR) {
			// No HVAR table, decode the glyph. This triggers recomputation of metrics.
			// FIXME! The getter is invoked because of the side-effect only!
			this.path;
		}

		return this._metrics!;
	}

	// Converts contours to a Path object that can be rendered
	protected _getPath(): Path {
		const contours = this._getContours();
		const path = new Path();

		for (let i = 0; i < contours.length; i++) {
			const contour = contours[i];
			let firstPt = contour[0];
			const lastPt = contour[contour.length - 1];
			let start = 0;
			let curvePt: Point | null;

			if (firstPt.onCurve) {
				// The first point will be consumed by the moveTo command, so skip in the loop
				curvePt = null;
				start = 1;
			} else {
				if (lastPt.onCurve) {
					// Start at the last point if the first point is off curve and the last point is on curve
					firstPt = lastPt;
				} else {
					// Start at the middle if both the first and last points are off curve
					firstPt = new Point(
						false,
						false,
						(firstPt.x + lastPt.x) / 2,
						(firstPt.y + lastPt.y) / 2,
					);
				}

				curvePt = firstPt;
			}

			path.moveTo(firstPt.x, firstPt.y);

			for (let j = start; j < contour.length; j++) {
				const pt = contour[j];
				const prevPt = j === 0 ? firstPt : contour[j - 1];

				if (prevPt.onCurve && pt.onCurve) {
					path.lineTo(pt.x, pt.y);
				} else if (prevPt.onCurve && !pt.onCurve) {
					curvePt = pt;
				} else if (!prevPt.onCurve && !pt.onCurve) {
					const midX = (prevPt.x + pt.x) / 2;
					const midY = (prevPt.y + pt.y) / 2;
					path.quadraticCurveTo(prevPt.x, prevPt.y, midX, midY);
					curvePt = pt;
				} else if (!prevPt.onCurve && pt.onCurve) {
					path.quadraticCurveTo(curvePt!.x, curvePt!.y, pt.x, pt.y);
					curvePt = null;
				} else {
					throw new Error('Unknown TTF path state');
				}
			}

			// Connect the first and last points
			if (curvePt) {
				path.quadraticCurveTo(curvePt.x, curvePt.y, firstPt.x, firstPt.y);
			}

			path.closePath();
		}

		return path;
	}
}
