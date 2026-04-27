import { adobeGlyphs } from '../agl.js';
import { MacExpertEncoding } from '../single-byte-encodings/mac-expert.js';
import { MacRomanEncoding } from '../single-byte-encodings/mac-roman.js';
import { PDFDocEncoding } from '../single-byte-encodings/pdf-doc.js';
import { StandardEncoding } from '../single-byte-encodings/standard.js';
import { SymbolEncoding } from '../single-byte-encodings/symbol.js';
import { WinAnsiEncoding } from '../single-byte-encodings/win-ansi.js';
import { ZapfDingbatsEncoding } from '../single-byte-encodings/zapf-dingbats.js';
import type { GlyphMapper } from './glyph-mapper.js';

export class SingleByteEncodingMapper implements GlyphMapper {
	private readonly encoding: string[];

	constructor(encodingName: string) {
		switch (encodingName.toLowerCase()) {
			case 'macexpertencoding':
				this.encoding = MacExpertEncoding;
				break;
			case 'macromanencoding':
				this.encoding = MacRomanEncoding;
				break;
			case 'pdfdocencoding':
				this.encoding = PDFDocEncoding;
				break;
			case 'standardencoding':
				this.encoding = StandardEncoding;
				break;
			case 'symbolencoding':
				this.encoding = SymbolEncoding;
				break;
			case 'winansiencoding':
				this.encoding = WinAnsiEncoding;
				break;
			case 'zapfdingbatsencoding':
				this.encoding = ZapfDingbatsEncoding;
				break;
			default:
				throw new Error(`unsupported encoding '${encodingName}`);
		}
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
}
