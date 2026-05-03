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
}
