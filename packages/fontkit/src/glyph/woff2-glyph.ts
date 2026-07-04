import {
	requiredTrueTypeSubsetTables,
	TrueTypeSubsetFont,
} from '../true-type-subset-font.js';
import type { WOFF2Font } from '../woff2-font.js';
import { type DecodedGlyph, TTFGlyph } from './ttf-glyph.js';

/**
 * Represents a TrueType glyph in the WOFF2 format, which compresses glyphs differently.
 */
export class WOFF2Glyph extends TTFGlyph {
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

	decode() {
		// We have to decode in advance (in WOFF2Font), so just return the
		// pre-decoded data.
		const font = this._font as WOFF2Font;
		return font.transformedGlyphs?.[this.id] as DecodedGlyph;
	}

	getCBox() {
		return this.path.bbox;
	}
}
