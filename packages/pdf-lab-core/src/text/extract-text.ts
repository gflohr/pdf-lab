import type { PDFDocument } from '@cantoo/pdf-lib';
import type { FontUsage } from '../font/collect-resources.js';
import type { FontInfo } from '../font/types.js';
import { extractGlyphs } from '../text/extract-glyphs.js';

/**
 * A block of text extracted from a `PDFDocument`.
 */
export type TextBlock = {
	/**
	 * The extracted text.
	 */
	text: string;

	/**
	 * The corresponding glyph IDs.
	 */
	glyphs: number[];

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
 * Extract text from a PDF document. This is best effort, and may not
 * catch all text blocks.
 *
 * @param pdfDoc the input as a PDFDocument
 * @param fonts the fonts used as a `Map` (key: reference, value: `FontInfo`)
 * @param resources the font resources as an array of `FontUsage` objects
 * @returns an array of the text blocks found
 */
export async function extractText(
	pdfDoc: PDFDocument,
	fonts: Map<string, FontInfo>,
	resources: FontUsage[],
): Promise<TextBlock[]> {
	const glyphBlocks = extractGlyphs(pdfDoc);
	const textBlocks: TextBlock[] = [];
	for (const glyphBlock of glyphBlocks) {
		const fontRef = resources[glyphBlock.pageNumber]?.[glyphBlock.fontResource];
		if (!fontRef) continue;

		const font = fonts.get(fontRef.toString());

		// This should be verified. Will a PDF viewer fall back to a
		// default font (Helvetica), if the font information is missing?
		//
		// On the other hand, working around such a broken document is
		// probably not worth the hassle. Making the font optional in the
		// type definition will complicate things.
		if (!font) continue;

		let text: string = '';
		const glyphs: number[] = [];
		if (font.toUnicodeMapper) {
			const mapper = font.toUnicodeMapper;
			for (let i = 0; i < glyphBlock.glyphs.length; ++i) {
				let glyphId = 0;
				let match = false;
				for (let j = 0; j < 4; ++j) {
					const nextByte = glyphBlock.glyphs[i + j];
					if (typeof nextByte === 'undefined') break;
					glyphId = (glyphId << 8) | nextByte;

					const s = mapper.lookup(glyphId);
					if (s !== '\uFFFD') {
						i += j;
						text ??= '';
						text += s;
						glyphs.push(glyphId);
						match = true;
						break;
					}
				}

				if (!match) {
					glyphs.push(glyphBlock.glyphs[i]!);
					text += font.encodingMapper.lookup(glyphBlock.glyphs[i]!);
				}
			}
		} else {
			const mapper = font.encodingMapper;
			text = [...glyphBlock.glyphs].map(glyph => mapper.lookup(glyph)).join('');
			glyphs.push(...glyphBlock.glyphs);
		}

		textBlocks.push({
			text,
			font,
			pageNumber: glyphBlock.pageNumber,
			glyphs,
		});
	}

	return textBlocks;
}
