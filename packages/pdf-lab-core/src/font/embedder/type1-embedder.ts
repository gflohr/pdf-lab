import { PDFRef } from '@cantoo/pdf-lib';
import { FontEmbedder, type SubType } from '../embedder.js';
import { StandardEncodings } from '../../encoding/types.js';

export class Type1FontEmbedder extends FontEmbedder {
	get subType(): SubType {
		return 'Type0';
	}

	protected includeGlyphs() {
		const subset = this.subset;
		const mapper = this.fontInfo.glyphMapper!;
		this.glyphIds.forEach((glyphId) => {
			const codePoint = this.coerceCodePoints(mapper.lookupCodepoints(glyphId));
			const glyph = this.font.glyphForCodePoint(codePoint);
			subset.includeGlyph(glyph);
		});
	}

	protected embedToUnicode(): PDFRef | undefined {
		// All embedders but the Type1 embedder must not touch an existing
		// ToUnicode map, unless they have an encoding that is not a standard
		// encoding.
		if (this.fontInfo.encoding && StandardEncodings.includes(this.fontInfo.encoding)) {
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

		const glyphIds = this.glyphIds;

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
${glyphIds.size} beginbfchar
`;

		glyphIds.forEach((glyphId) => {
			const codePoint = this.coerceCodePoints(mapper.lookupCodepoints(glyphId));
			const hexCodePoint = `<${codePoint.toString(16).padStart(4, '0')}>`;
			const hexGlyphId = `<${glyphId.toString(16).padStart(2, '0')}>`;
			cmap += `${hexGlyphId} ${hexCodePoint}\n`;
		});

		cmap += `endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
`;
		return cmap;
	}
}
