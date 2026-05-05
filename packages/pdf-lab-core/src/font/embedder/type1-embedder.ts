import type { PDFRef } from '@cantoo/pdf-lib';
import { StandardEncodings } from '../../encoding/types.js';
import { FontEmbedder, type SubType } from '../embedder.js';

export class Type1FontEmbedder extends FontEmbedder {
	get subType(): SubType {
		return 'Type0';
	}

	protected includeGlyphs() {
		const mapper = this.fontInfo.glyphMapper;
		if (!mapper) {
			throw new Error('Cannot embed font without ToUnicode CMap!');
		}
		for (let octet = 1; octet < 256; ++octet) {
			const codePoint = this.coerceCodePoints(
				mapper?.lookupCodepoints(octet),
			);
			const { glyphs } = this.font.layout(String.fromCharCode(codePoint));
			for (let idx = 0, len = glyphs.length; idx < len; ++idx) {
				const glyph = glyphs[idx]!;
				this.subset.includeGlyph(glyph);
			}
		}

		console.dir(this.subset);
	}

	protected embedToUnicodeDisabled(): PDFRef | undefined {
		// All embedders but the Type1 embedder must not touch an existing
		// ToUnicode map, unless they have an encoding that is not a standard
		// encoding.
		if (
			this.fontInfo.encoding &&
			StandardEncodings.includes(this.fontInfo.encoding)
		) {
			const cmap = this.createToUnicode();

			const context = this.pdfDoc.context;
			const cmapStream = context.flateStream(cmap);

			return context.register(cmapStream);
		}
	}

	protected createToUnicode(): string {
		const mapper = this.fontInfo.glyphMapper;
		if (typeof mapper === 'undefined') {
			throw new Error(
				`The font '${this.fontInfo.fontName}' does not use a standard encoding and does not have a ToUnicode map!`,
			);
		}

		let cmap = `/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
  /Registry (Adobe)
  /Ordering (UCS)
  /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<00> <ff>
endcodespacerange
224 beginbfchar
`;

		for (let glyphId = 32; glyphId < 256; ++glyphId) {
			const codePoint = this.coerceCodePoints(mapper.lookupCodepoints(glyphId));
			const hexCodePoint = `<${codePoint.toString(16).padStart(4, '0')}>`;
			const hexGlyphId = `<${glyphId.toString(16).padStart(2, '0')}>`;
			cmap += `${hexGlyphId} ${hexCodePoint}\n`;
		}

		cmap += `endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
`;
		return cmap;
	}

	protected getFirstChar() {
		return 32;
	}

	protected getLastChar() {
		return 255;
	}

	protected computeWidths(): number[] {
		const widths = [0];
		const mapper = this.fontInfo.glyphMapper!;
		for (let glyphId = 32; glyphId < 256; ++glyphId) {
			const codePoint = this.coerceCodePoints(mapper.lookupCodepoints(glyphId));
			const glyph = this.font.glyphForCodePoint(codePoint);

			widths.push(glyph.advanceWidth);
		};

		return widths;
	}
}
