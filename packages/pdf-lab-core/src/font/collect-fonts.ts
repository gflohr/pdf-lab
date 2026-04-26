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
import type { GlyphMapper } from '../encoding/mappers/glyph-mapper.js';
import { SingleByteEncodingMapper } from '../encoding/mappers/single-byte-encoding-mapper.js';
import {
	type Encoding,
	type FontInfo,
	type FontSubtype,
	StandardEncodings,
} from './types.js';

export function collectFonts(pdfDoc: PDFDocument): Map<string, FontInfo> {
	const fonts: Map<string, FontInfo> = new Map<string, FontInfo>();

	for (const page of pdfDoc.getPages()) {
		const { Font } = page.node.normalizedEntries();
		for (const [fontName, fontRef] of Font.entries()) {
			const fontDict = pdfDoc.context.lookupMaybe(fontRef, PDFDict);
			if (!fontDict) continue;

			const subtype = fontDict.lookupMaybe(PDFName.of('Subtype'), PDFName);
			if (!subtype) continue;

			const subtypeName = subtype.decodeText();
			if (subtypeName === 'Type0') {
				const info = getFontType0Info(
					pdfDoc,
					fontName,
					fontDict,
					fontRef as PDFRef,
				);
				if (info) {
					fonts.set((fontRef as PDFRef).toString(), info);
				}
			} else {
				const info = getFontInfo(
					subtypeName,
					fontName,
					fontDict,
					fontRef as PDFRef,
				);
				if (info) {
					fonts.set((fontRef as PDFRef).toString(), info);
				}
			}
		}
	}

	return fonts;
}

function getFontName(baseName: string): string {
	// Strip subset prefix (ABCDEF+).
	let fontName = baseName.replace(/^[A-Z]{6}\+/, '');

	// Strip numerical suffix.
	fontName = fontName.replace(/-[0-9]+$/, '');

	return fontName;
}

function getFontInfo(
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

	let glyphMapper: GlyphMapper | undefined;
	const toUnicodeStream = fontDict.lookup(PDFName.of('ToUnicode'));
	if (toUnicodeStream && toUnicodeStream instanceof PDFRawStream) {
		const stream = (toUnicodeStream as PDFRawStream).contents;
		glyphMapper = new CMapMapper(stream);
	}

	let encoding: string | undefined;
	const encodingPDFName = fontDict.lookupMaybe(PDFName.of('Encoding'), PDFName);
	if (encodingPDFName) {
		const encodingName = encodingPDFName.decodeText();
		if (isStandardEncoding(encodingName)) {
			encoding = encodingName as Encoding;
		}
	} else {
		const baseFont = fontDict.lookupMaybe(PDFName.of('BaseFont'), PDFName);
		if (baseFont && isStandardFont(baseFont.decodeText())) {
			const baseFontName = baseFont.decodeText();
			if (baseFontName === 'Symbol') {
				encoding = 'SymbolEncoding';
			} else if (baseFontName === 'ZapfDingbats') {
				encoding = 'ZapfDingbatsEncoding';
			} else {
				encoding = 'StandardEncoding';
			}
		}
	}

	if (!glyphMapper) {
		if (typeof encoding === 'undefined') {
			glyphMapper = new SingleByteEncodingMapper('StandardEncoding');
		} else {
			glyphMapper = new SingleByteEncodingMapper(encoding);
		}
	}

	const baseFont =
		fontDict.lookupMaybe(PDFName.of('BaseFont'), PDFName)?.decodeText() ??
		fontName.decodeText();
	const fontInfo: FontInfo = {
		ref: fontRef,
		embedded,
		baseFont,
		fontName: getFontName(baseFont),
		subtype: subtypeName as FontSubtype,
		glyphMapper,
	};
	if (typeof encoding !== 'undefined') {
		fontInfo.encoding = encoding as Encoding;
	}
	return fontInfo;
}

function getFontType0Info(
	pdfDoc: PDFDocument,
	fontName: PDFName,
	fontDict: PDFDict,
	fontRef: PDFRef,
): FontInfo | undefined {
	const descendantFonts = fontDict.lookup(PDFName.of('DescendantFonts'));
	if (!(descendantFonts instanceof PDFArray && descendantFonts.size())) return;
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
	const glyphMapper = new CMapMapper(stream);

	const baseFont =
		fontDict.lookupMaybe(PDFName.of('BaseFont'), PDFName)?.decodeText() ??
		fontName.decodeText();
	return {
		ref: fontRef,
		embedded,
		baseFont,
		fontName: getFontName(baseFont),
		glyphMapper,
		subtype: 'Type0',
	};
}

function isStandardEncoding(encoding: string): boolean {
	return StandardEncodings.map((e) => e.toLocaleLowerCase()).includes(
		encoding.toLowerCase(),
	);
}
