import { BoundingBox } from '../glyph/bounding-box.js';
import type { Glyph } from '../glyph/glyph.js';
import type { UnicodeScript } from '../layout/script.js';
import * as Script from '../layout/script.js';
import type { OpenType } from '../tables/open-type.js';
import type { GlyphPosition } from './glyph-position.js';

/** The shaping direction, either left-to-right, or right-to-left. */
export type BidiDirection = 'ltr' | 'rtl';

/**
 * Represents a run of Glyph and GlyphPosition objects.
 * Returned by the font layout method.
 */
export class GlyphRun {
	private _positions: GlyphPosition[] | null;

	public readonly features: OpenType.Features;
	public readonly direction: BidiDirection;
	public readonly language: string | null;

	/**
	 * Create a glyph run.
	 *
	 * The script was either passed in or detected automatically.
	 *
	 * If no language is passed, the default language for the script is used
	 *
	 * @param glyphs an array of `Glyph` objects in the run.
	 * @param features
	 * @param script the script that was requested for shaping
	 * @param language the language as requested for shaping
	 * @param direction
	 */
	constructor(
		public glyphs: Glyph[],
		features: OpenType.FeatureTag[] | OpenType.Features,
		public readonly script?: UnicodeScript,
		language?: string,
		direction?: 'ltr' | 'rtl',
	) {
		this._positions = null;
		this.script = script;
		this.language = language || null;
		this.direction = direction || Script.direction(script);

		this.features = {};

		// Convert features to an object.
		if (Array.isArray(features)) {
			for (const tag of features) {
				this.features[tag] = true;
			}
		} else if (typeof features === 'object') {
			this.features = features;
		}
	}

	public get positions(): GlyphPosition[] {
		if (!this._positions) {
			throw new Error(
				'GlyphRun properties accessed before font layout engine calculated positioning data!',
			);
		}
		return this._positions;
	}

	public set positions(value: GlyphPosition[]) {
		if (!value) {
			console.trace('here');
		}
		if (value.length !== this.glyphs.length) {
			throw new Error(
				`Layout structural mismatch: positions array length (${value.length}) must match glyphs length (${this.glyphs.length})`,
			);
		}

		this._positions = value;
	}

	/**
	 * The total advance width of the run.
	 */
	get advanceWidth(): number {
		if (!this.positions) {
			throw new Error('GlyphRun.advanceWidth called without positions!');
		}
		let width = 0;
		for (const position of this.positions) {
			width += position.xAdvance;
		}

		return width;
	}

	/**
	 * The total advance height of the run.
	 */
	get advanceHeight(): number {
		let height = 0;
		for (const position of this.positions) {
			height += position.yAdvance;
		}

		return height;
	}

	/**
	 * The bounding box containing all glyphs in the run.
	 */
	get bbox(): BoundingBox {
		const bbox = new BoundingBox();

		let x = 0;
		let y = 0;
		for (let index = 0; index < this.glyphs.length; index++) {
			const glyph = this.glyphs[index];
			const p = this.positions[index];
			const b = glyph.bbox;

			bbox.addPoint(b.minX + x + p.xOffset, b.minY + y + p.yOffset);
			bbox.addPoint(b.maxX + x + p.xOffset, b.maxY + y + p.yOffset);

			x += p.xAdvance;
			y += p.yAdvance;
		}

		return bbox;
	}
}
