import {
	isStandardFont,
	PDFArray,
	PDFDict,
	type PDFDocument,
	PDFName,
	PDFRawStream,
	type PDFRef,
} from '@cantoo/pdf-lib';
import { CMapMapper } from '../encoding/mappers/cmap-mapper.js';
import { SingleByteEncodingMapper } from '../encoding/mappers/single-byte-encoding-mapper.js';
import {
	type Encoding,
	type FontInfo,
	FontResolver,
	type FontSubtype,
} from '../font/font-resolver.js';
import { GlyphExtractor } from '../pdf/glyph-extractor.js';
import { makePDFDocument } from './make-pdf-document.js';

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

		const fonts = this.collectFonts(pdfDoc);
		const extractor = new GlyphExtractor();

		const glyphBlocks = extractor.parseDocument(pdfDoc);
		const textBlocks: TextBlock[] = [];
		for (const glyphBlock of glyphBlocks) {
			const font = fonts[glyphBlock.fontResource];
			// This should be verified. Will a PDF viewer fall back to a
			// default font (Helvetica), if the font informatin is missing?
			//
			// On the other hand, working around such a broken document is
			// probably not worth the hassle. Making the font optional in the
			// type definition will complicate things.
			if (!font) continue;

			let text: string;
			if (typeof font === 'undefined') {
				text = glyphBlock.glyphs.map(() => '\uFFFD').join('');
			} else if (font.cmapMapper) {
				const cmapMapper = font.cmapMapper;
				text = glyphBlock.glyphs
					.map((glyph) => cmapMapper.lookup(glyph))
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

	// FIXME! This must be moved to a FontCollector class.
	private collectFonts(pdfDoc: PDFDocument): Record<string, FontInfo> {
		const fonts: Record<string, FontInfo> = {};
		for (const page of pdfDoc.getPages()) {
			const { Font } = page.node.normalizedEntries();
			for (const [fontName, fontRef] of Font.entries()) {
				const fontDict = pdfDoc.context.lookupMaybe(fontRef, PDFDict);
				if (!fontDict) continue;

				const subtype = fontDict.lookupMaybe(PDFName.of('Subtype'), PDFName);
				if (!subtype) continue;

				const subtypeName = subtype.decodeText();
				if (subtypeName === 'Type0') {
					const info = this.getFontType0Info(
						pdfDoc,
						fontName,
						fontDict,
						fontRef as PDFRef,
					);
					if (info) {
						fonts[fontName.decodeText()] = info;
					}
				} else {
					const info = this.getFontInfo(
						subtypeName,
						fontName,
						fontDict,
						fontRef as PDFRef,
					);
					if (info) {
						fonts[fontName.decodeText()] = info;
					}
				}
			}
		}

		return fonts;
	}

	private getFontName(baseName: string): string {
		// Strip subset prefix (ABCDEF+).
		let fontName = baseName.replace(/^[A-Z]{6}\+/, '');

		// Strip numerical suffix.
		fontName = fontName.replace(/-[0-9]+$/, '');

		return fontName;
	}

	private getFontInfo(
		subtypeName: string,
		fontName: PDFName,
		fontDict: PDFDict,
		fontRef: PDFRef,
	): FontInfo | undefined {
		let embedded = false;
		const fontDescriptor = fontDict.lookupMaybe(
			PDFName.of('FontDescriptor'),
			PDFDict,
		);
		if (fontDescriptor) {
			embedded =
				fontDescriptor.has(PDFName.of('FontFile')) ||
				fontDescriptor.has(PDFName.of('FontFile2')) ||
				fontDescriptor.has(PDFName.of('FontFile3'));
		}

		const baseFont = fontName.decodeText();
		const fontInfo: FontInfo = {
			ref: fontRef,
			embedded,
			baseFont,
			fontName: this.getFontName(baseFont),
			subtype: subtypeName as FontSubtype,
		};

		const toUnicodeStream = fontDict.lookup(PDFName.of('ToUnicode'));
		if (toUnicodeStream && toUnicodeStream instanceof PDFRawStream) {
			const stream = toUnicodeStream.contents;
			fontInfo.cmapMapper = new CMapMapper(stream);
		}

		const encoding = fontDict.lookup(PDFName.of('Encoding'));
		if (encoding) {
			const encodingName = (encoding as PDFName).decodeText();
			if (FontResolver.isStandardEncoding(encodingName)) {
				fontInfo.encoding = encodingName as Encoding;
			}
		} else {
			const baseFont = fontDict.lookupMaybe(PDFName.of('BaseFont'), PDFName);
			if (baseFont && isStandardFont(baseFont.decodeText())) {
				const baseFontName = baseFont.decodeText();
				if (baseFontName === 'Symbol') {
					fontInfo.encoding = 'SymbolEncoding';
				} else if (baseFontName === 'ZapfDingbats') {
					fontInfo.encoding = 'ZapfDingbatsEncoding';
				} else {
					fontInfo.encoding = 'StandardEncoding';
				}
			}
		}

		return fontInfo;
	}

	private getFontType0Info(
		pdfDoc: PDFDocument,
		fontName: PDFName,
		fontDict: PDFDict,
		fontRef: PDFRef,
	): FontInfo | undefined {
		const descendantFonts = fontDict.lookup(PDFName.of('DescendantFonts'));
		if (!(descendantFonts instanceof PDFArray && descendantFonts.size()))
			return;
		const descendantFontRef = descendantFonts.get(0);
		const descendantFontDict = pdfDoc.context.lookupMaybe(
			descendantFontRef,
			PDFDict,
		);
		if (!descendantFontDict) return;

		const descendantFontDescriptor = descendantFontDict.lookup(
			PDFName.of('FontDescriptor'),
			PDFDict,
		);
		if (!descendantFontDescriptor) return;

		const embedded =
			descendantFontDescriptor.has(PDFName.of('FontFile')) ||
			descendantFontDescriptor.has(PDFName.of('FontFile2')) ||
			descendantFontDescriptor.has(PDFName.of('FontFile3'));

		const toUnicodeStream = fontDict.lookup(PDFName.of('ToUnicode'));
		if (!(toUnicodeStream && toUnicodeStream instanceof PDFRawStream)) return;

		const stream = toUnicodeStream.contents;
		const cmapMapper = new CMapMapper(stream);

		const baseFont = fontName.decodeText();
		return {
			ref: fontRef,
			embedded,
			baseFont,
			fontName: this.getFontName(baseFont),
			cmapMapper,
			subtype: 'Type0',
		};
	}
}
