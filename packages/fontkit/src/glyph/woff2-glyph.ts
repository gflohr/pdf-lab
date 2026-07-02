import { TrueTypeSubsetFont } from '../true-type-subset-font.js';
import type { WOFF2Font } from '../woff2-font.js';
import { type DecodedGlyph, TTFGlyph } from './ttf-glyph.js';

/**
 * Represents a TrueType glyph in the WOFF2 format, which compresses glyphs differently.
 */
export class WOFF2Glyph extends TTFGlyph {
	constructor(id: number, codePoints: readonly number[], font: WOFF2Font) {
		super(id, codePoints, font.asTrueTypeSubsetFont());
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
