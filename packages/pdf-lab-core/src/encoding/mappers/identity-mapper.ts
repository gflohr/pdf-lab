import { type PDFArray, PDFName, PDFNumber } from '@cantoo/pdf-lib';
import { adobeGlyphs } from '../agl.js';
import type { GlyphMapper } from './glyph-mapper.js';

export class IdentityMapper implements GlyphMapper {
	private readonly differences: Record<number, number | number[]> = {};

	constructor(
		private readonly _name: 'Identity-H' | 'Identity-V',
		differences?: PDFArray,
	) {
		this._name = _name;
		if (differences) {
			let glyphId: number | undefined;
			for (let i = 0; i < differences.size(); ++i) {
				const item = differences.get(i);

				if (item instanceof PDFNumber) {
					glyphId = item.asNumber();
					if (glyphId < 0) {
						glyphId = undefined;
					}
				} else if (typeof glyphId !== 'undefined') {
					if (item instanceof PDFName) {
						const glyph = item.decodeText();
						if (adobeGlyphs[glyph]) {
							this.differences[glyphId] = adobeGlyphs[glyph].u;
						}

						++glyphId;
					}
				}
			}
		}
	}

	public get name(): 'Identity-H' | 'Identity-V' {
		return this._name;
	}

	public lookup(glyph: number): string {
		const codePoints = this.lookupCodePoints(glyph);
		if (codePoints.length) {
			return codePoints.map((c) => String.fromCharCode(c)).join('');
		} else {
			return '\uFFFD';
		}
	}

	public lookupCodePoints(glyph: number): number[] {
		if (this.differences[glyph]) {
			const mapping = this.differences[glyph];
			if (typeof mapping === 'number') {
				return [mapping];
			} else {
				return mapping;
			}
		}

		return [glyph];
	}
}
