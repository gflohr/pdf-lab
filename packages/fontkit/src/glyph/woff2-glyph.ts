import { requiredTrueTypeSubsetTables } from '../true-type-subset-font.js';
import type { WOFF2Font } from '../woff2-font.js';
import { TrueTypeGlyph } from './true-type-glyph.js';

/**
 * Represents a TrueType glyph in the WOFF2 format, which compresses glyphs differently.
 */
export class WOFF2Glyph extends TrueTypeGlyph {
	constructor(id: number, codePoints: readonly number[], _font: WOFF2Font) {
		const font = _font.asTrueTypeSubsetFont();
		if (!font) {
			throw new Error(
				`Fontkit Initialization Error: Cannot construct WOFF2Glyph ` +
					`for ID ${id}. The underlying WOFF2Font is missing required ` +
					`TrueType subset tables ` +
					`(${requiredTrueTypeSubsetTables.join(', ')}).`,
			);
		}
		super(id, codePoints, font);
	}

	/** @internal */
	public decode() {
		// We have to decode in advance (in WOFF2Font), so just return the
		// pre-decoded data.
		const font = this._font as unknown as WOFF2Font;

		return font.transformedGlyphs?.[this.id] ?? null;
	}

	protected getCBox() {
		return this.path.bbox;
	}
}
