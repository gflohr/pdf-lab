import { type PDFArray, PDFName, PDFNumber } from '@cantoo/pdf-lib';
import { adobeGlyphs } from '../agl.js';
import { MacExpertEncoding } from '../single-byte-encodings/mac-expert.js';
import { MacRomanEncoding } from '../single-byte-encodings/mac-roman.js';
import { PDFDocEncoding } from '../single-byte-encodings/pdf-doc.js';
import { StandardEncoding } from '../single-byte-encodings/standard.js';
import { SymbolEncoding } from '../single-byte-encodings/symbol.js';
import { WinAnsiEncoding } from '../single-byte-encodings/win-ansi.js';
import { ZapfDingbatsEncoding } from '../single-byte-encodings/zapf-dingbats.js';
import type { GlyphMapper } from './glyph-mapper.js';
import type { Encoding } from '../types.js';

export class SingleByteEncodingMapper implements GlyphMapper {
	private readonly encoding: string[];
	private readonly _name: Encoding;

	constructor(encodingName: Encoding, differences?: PDFArray) {
		switch (encodingName.toLowerCase()) {
			case 'macexpertencoding':
				this._name = 'MacExpertEncoding';
				this.encoding = [...MacExpertEncoding];
				break;
			case 'macromanencoding':
				this._name = 'MacRomanEncoding';
				this.encoding = [...MacRomanEncoding];
				break;
			case 'pdfdocencoding':
				this._name = 'PDFDocEncoding',
				this.encoding = [...PDFDocEncoding];
				break;
			case 'standardencoding':
				this._name = 'StandardEncoding',
				this.encoding = [...StandardEncoding];
				break;
			case 'symbolencoding':
				this._name = 'SymbolEncoding',
				this.encoding = [...SymbolEncoding];
				break;
			case 'winansiencoding':
				this._name = 'WinAnsiEncoding',
				this.encoding = [...WinAnsiEncoding];
				break;
			case 'zapfdingbatsencoding':
				this._name = 'ZapfDingbatsEncoding',
				this.encoding = [...ZapfDingbatsEncoding];
				break;
			default:
				throw new Error(`unsupported encoding '${encodingName}`);
		}

		if (differences) this.parseDifferences(differences);
	}

	public get name(): Encoding {
		return this._name;
	}

	public lookup(glyph: number): string {
		const codepoints = this.lookupCodepoints(glyph);
		if (codepoints.length) {
			return codepoints.map((c) => String.fromCharCode(c)).join('');
		} else {
			return '\uFFFD';
		}
	}

	public lookupCodepoints(glyph: number): number[] {
		if (glyph < 0 || glyph > this.encoding.length) {
			throw new Error(`glyph ID ${glyph} out of range`);
		}

		const name = this.encoding[glyph]!;
		if (name === '.notdef') return [];

		const adobeGlyph = adobeGlyphs[name];
		if (!adobeGlyph) return [];

		return typeof adobeGlyph.u === 'number' ? [adobeGlyph.u] : adobeGlyph.u;
	}

	private parseDifferences(differences: PDFArray) {
		let glyphId: number | undefined;
		for (let i = 0; i < differences.size(); ++i) {
			const item = differences.get(i);

			if (item instanceof PDFNumber) {
				glyphId = item.asNumber();
				if (glyphId < 0 || glyphId > 255) {
					glyphId = undefined;
				}
			} else if (typeof glyphId !== 'undefined') {
				if (item instanceof PDFName) {
					if (glyphId < this.encoding.length) {
						const glyph = item.decodeText();
						if (adobeGlyphs[glyph]) {
							this.encoding[glyphId] = glyph;
						}
					}
					++glyphId;
				}
			}
		}
	}
}
