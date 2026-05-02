import { PDFName } from '@cantoo/pdf-lib';
import { FontEmbedder, type SubType } from '../embedder.js';

export class Type1FontEmbedder extends FontEmbedder {
	get subType(): SubType {
		return 'Type0';
	}

	protected embedToUnicode() {
		const cmap = this.createToUnicode();

		const context = this.pdfDoc.context;
		const cmapStream = context.flateStream(cmap);

		const ref = context.register(cmapStream);
		this.fontDict.set(PDFName.of('ToUnicode'), ref);
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
}
