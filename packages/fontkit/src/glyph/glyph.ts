import unicode from '@pdf-lib/unicode-properties';
import type { Font } from '../font.js';
import type { SFNTFont } from '../sfnt-font.js';
import type { MetricsTable } from '../tables/metrics.js';
import type BoundingBox from './bounding-box.js';
import Path from './path.js';
import StandardNames from './standard-names.js';

/**
 * Represents the layout metrics for a glyph along a single layout axis
 * (either purely horizontal or purely vertical).
 *
 * This is a low-level structural representation used directly when parsing
 * 1D dimension arrays from `hmtx` (Horizontal Metrics) or `vmtx` (Vertical Metrics) tables.
 */
export type GlyphAxisMetrics = {
	/**
	 * The total distance the pen position must move after rendering this glyph.
	 * Maps to `advanceWidth` in horizontal layout, or `advanceHeight` in vertical layout.
	 * Measured in font design units.
	 */
	advance: number;

	/**
	 * The offset distance from the axis baseline origin to the edge of the glyph bounding box.
	 * Maps to Left Side Bearing (`lsb`) in horizontal layout, or Top Side Bearing (`tsb`) in vertical layout.
	 * Measured in font design units.
	 */
	bearing: number;
};

/**
 * Represents the comprehensive, multi-axis bounding metrics for a specific glyph.
 *
 * This unified structure combines data resolved from both horizontal and vertical layout
 * systems, making it the primary interface for high-level rendering engines, text-shaping
 * loops, and bounding-box calculators.
 */
export type GlyphLayoutMetrics = {
	/**
	 * The horizontal advance width of the glyph, indicating how much to shift the
	 * X-cursor after rendering. Sourced from the `hmtx` table.
	 */
	advanceWidth: number;

	/**
	 * The vertical advance height of the glyph, indicating how much to shift the
	 * Y-cursor when rendering in vertical writing mode. Sourced from the `vmtx` table.
	 */
	advanceHeight: number;

	/**
	 * The distance from the horizontal origin (X = 0) to the leftmost edge of the glyph's outline.
	 * Also known as Left Side Bearing (LSB).
	 */
	leftBearing: number;

	/**
	 * The distance from the vertical origin (Y = 0) to the top edge of the glyph's outline.
	 * Also known as Top Side Bearing (TSB).
	 */
	topBearing: number;
};

/**
 * Glyph objects represent a glyph in the font. They have various properties for accessing metrics and
 * the actual vector path the glyph represents, and methods for rendering the glyph to a graphics context.
 *
 * You do not create glyph objects directly. They are created by various methods on the font object.
 * There are several subclasses of the base Glyph class internally that may be returned depending
 * on the font format, but they all inherit from this class.
 */
export default class Glyph {
	protected readonly id: number;
	private readonly codePoints: number[];
	protected readonly _font: SFNTFont;
	// FIXME! Make these two property private and private getters.
	public readonly isMark: boolean;
	public readonly isLigature: boolean;
	private _path?: Path;
	protected _metrics?: GlyphLayoutMetrics;
	private _bbox?: Readonly<BoundingBox>;
	private _cbox?: Readonly<BoundingBox>;
	private _advanceWidth?: number;
	private _advanceHeight?: number;
	private _name?: string | null;

	/**
	 * An array of unicode code points that are represented by this glyph.
	 * There can be multiple code points in the case of ligatures and other glyphs
	 * that represent multiple visual characters.
	 *
	 * @param id the glyph id in the font.
	 * @param codePoints the array of Unicode code points.
	 * @param font
	 */
	constructor(id: number, codePoints: number[], font: Font) {
		this.id = id;

		this.codePoints = codePoints;
		this._font = font as unknown as SFNTFont;

		// TODO: get this info from GDEF if available
		this.isMark =
			this.codePoints.length > 0 && this.codePoints.every(unicode.isMark);
		this.isLigature = this.codePoints.length > 1;
	}

	_getPath(): Path {
		return new Path();
	}

	_getCBox(_?: boolean): Readonly<BoundingBox> {
		return this.path.cbox;
	}

	_getBBox(): Readonly<BoundingBox> {
		return this.path.bbox;
	}

	_getTableMetrics(table: MetricsTable): GlyphAxisMetrics {
		if (this.id < table.metrics.length) {
			return table.metrics.get(this.id);
		}

		const metric = table.metrics.get(table.metrics.length - 1);
		const res = {
			advance: metric ? metric.advance : 0,
			bearing: table.bearings.get(this.id - table.metrics.length) || 0,
		};

		return res;
	}

	_getMetrics(cbox?: Readonly<BoundingBox>): GlyphLayoutMetrics {
		if (this._metrics) {
			return this._metrics;
		}

		let { advance: advanceWidth, bearing: leftBearing } = this._getTableMetrics(
			this._font.hmtx,
		);

		let advanceHeight: number;
		let topBearing: number;

		// For vertical metrics, use vmtx if available, or fall back to global data
		if (this._font.vmtx) {
			const metrics = this._getTableMetrics(this._font.vmtx);
			advanceHeight = metrics.advance;
			topBearing = metrics.bearing;
		} else {
			const localCbox = cbox === undefined || cbox === null ? this.cbox : cbox;

			const os2 = this._font['OS/2'];

			if (os2 && os2.version > 0) {
				advanceHeight = Math.abs(os2.typoAscender - os2.typoDescender);
				topBearing = os2.typoAscender - localCbox.maxY;
			} else {
				const { hhea } = this._font;
				advanceHeight = Math.abs(hhea.ascent - hhea.descent);
				topBearing = hhea.ascent - localCbox.maxY;
			}
		}

		if (this._font.variationProcessor && this._font.HVAR) {
			advanceWidth += this._font.variationProcessor.getAdvanceAdjustment(
				this.id,
				this._font.HVAR,
			);
		}

		// 4. Cache and return
		this._metrics = {
			advanceWidth,
			advanceHeight,
			leftBearing,
			topBearing,
		};

		return this._metrics;
	}

	/**
	 * The glyph’s control box.
	 * This is often the same as the bounding box, but is faster to compute.
	 * Because of the way bezier curves are defined, some of the control points
	 * can be outside of the bounding box. Where `bbox` takes this into account,
	 * `cbox` does not. Thus, cbox is less accurate, but faster to compute.
	 * See [here](http://www.freetype.org/freetype2/docs/glyphs/glyphs-6.html#section-2)
	 * for a more detailed description.
	 */
	get cbox(): Readonly<BoundingBox> {
		if (typeof this._cbox === 'undefined') {
			this._cbox = this._getCBox();
		}

		return this._cbox;
	}

	/**
	 * The glyph’s bounding box, i.e. the rectangle that encloses the
	 * glyph outline as tightly as possible.
	 */
	get bbox(): Readonly<BoundingBox> {
		if (typeof this._bbox === 'undefined') {
			this._bbox = this._getBBox();
		}

		return this._bbox;
	}

	/**
	 * A vector Path object representing the glyph outline.
	 * @type {Path}
	 */
	get path(): Readonly<Path> {
		// Cache the path so we only decode it once
		// Decoding is actually performed by subclasses
		if (typeof this._path === 'undefined') {
			this._path = this._getPath();
		}

		return this._path;
	}

	/**
	 * Returns a path scaled to the given font size.
	 * @param {number} size
	 * @return {Path}
	 */
	getScaledPath(size: number): Path {
		const scale = (1 / this._font.unitsPerEm) * size;
		return this.path.scale(scale);
	}

	/**
	 * The glyph's advance width.
	 * @type {number}
	 */
	get advanceWidth() {
		if (typeof this._advanceWidth === 'undefined') {
			this._advanceWidth = this._getMetrics().advanceWidth;
		}

		return this._advanceWidth;
	}

	/**
	 * The glyph's advance height.
	 * @type {number}
	 */
	get advanceHeight() {
		if (typeof this._advanceHeight === 'undefined') {
			this._advanceHeight = this._getMetrics().advanceHeight;
		}

		return this._advanceHeight;
	}

	_getName(): string | null {
		const { post } = this._font;

		if (!post) {
			return null;
		}

		switch (post.version) {
			case 1:
				return StandardNames[this.id] ?? null;

			case 2: {
				const id = post.glyphNameIndex?.[this.id];
				if (id === undefined) {
					return null;
				}

				if (id < StandardNames.length) {
					return StandardNames[id] ?? null;
				}

				return post.names?.[id - StandardNames.length] ?? null;
			}

			case 2.5: {
				const offset = post.offsets?.[this.id];
				if (offset === undefined) {
					return null;
				}
				return StandardNames[this.id + offset] ?? null;
			}

			case 4: {
				const mapCode = post.map?.[this.id];
				if (mapCode === undefined) {
					return null;
				}
				return String.fromCharCode(mapCode);
			}

			default:
				throw new Error(
					`Unsupported or corrupt 'post' table version (${post.version}) encountered while resolving glyph name.`,
				);
		}
	}

	/**
	 * The glyph's name
	 * @type {string}
	 */
	get name() {
		if (typeof this._name === 'undefined') {
			this._name = this._getName();
		}

		return this._name;
	}

	/**
	 * Renders the glyph to the given graphics context, at the specified font size.
	 * @param {CanvasRenderingContext2d} ctx
	 * @param {number} size
	 */
	render(ctx: CanvasRenderingContext2D, size: number) {
		ctx.save();

		const scale = (1 / this._font.unitsPerEm) * size;
		ctx.scale(scale, scale);

		const fn = this.path.toFunction();
		fn(ctx);
		ctx.fill();

		ctx.restore();
	}
}
