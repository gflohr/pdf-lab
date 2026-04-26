import type { PDFDocument } from '@cantoo/pdf-lib';
import collectFonts from '../font/collect-fonts.js';
import { collectResources } from '../font/collect-resources.js';
import { GlyphExtractor } from '../pdf/glyph-extractor.js';
import { makePDFDocument } from './make-pdf-document.js';
import { SingleByteEncodingMapper } from '../encoding/mappers/single-byte-encoding-mapper.js';
import type { FontInfo } from '../font/types.js';

/**
 * A block of text extracted from a `PDFDocument`.
 */
export type TextBlock = {
	/**
	 * The extracted text.
	 */
	text: string;

	/**
	 * The font information.
	 */
	font: FontInfo;

	/**
	 * The page number where the snippet was found.
	 */
	pageNumber: number;
};

/**
 * The `TextExtractor` implements text extraction from PDF documents.
 */
export class TextExtractor {
	/**
	 * Extract text from a PDF document. This is best effort, and may not
	 * catch all text blocks.
	 *
	 * @param input the input as a PDFDocument, PDF raw data bytes, or a base 64 encoded string (or data URI) with the PDF bytes.
	 * @returns an array of the text blocks found
	 */
	async extract(
		input: PDFDocument | string | ArrayBuffer | Uint8Array<ArrayBufferLike>,
	): Promise<TextBlock[]> {
		const pdfDoc = await makePDFDocument(input);
		const resources = collectResources(pdfDoc);
		const fonts = collectFonts(pdfDoc, resources);
		const extractor = new GlyphExtractor();

		const glyphBlocks = extractor.parseDocument(pdfDoc);
		const textBlocks: TextBlock[] = [];
		for (const glyphBlock of glyphBlocks) {
			const fontRef =
				resources[glyphBlock.pageNumber]?.[glyphBlock.fontResource];
			if (!fontRef) continue;

			const font = fonts.get(fontRef.toString());

			// This should be verified. Will a PDF viewer fall back to a
			// default font (Helvetica), if the font information is missing?
			//
			// On the other hand, working around such a broken document is
			// probably not worth the hassle. Making the font optional in the
			// type definition will complicate things.
			if (!font) continue;

			let text: string;
			if (font.glyphMapper) {
				const mapper = font.glyphMapper;
				text = glyphBlock.glyphs
					.map((glyph) => mapper.lookup(glyph))
					.join('');
			} else if (font.encoding) {
				const mapper = new SingleByteEncodingMapper(font.encoding);
				text = glyphBlock.glyphs.map((glyph) => mapper.lookup(glyph)).join('');
			} else {
				// Hopeless case.
				text = glyphBlock.glyphs.map(() => '\uFFFD').join('');
			}

			textBlocks.push({
				text,
				font,
				pageNumber: glyphBlock.pageNumber,
			});
		}

		return textBlocks;
	}
}
