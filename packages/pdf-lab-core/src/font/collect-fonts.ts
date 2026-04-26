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
import type { FontUsage } from './collect-resources.js';
import {
	type Encoding,
	type FontInfo,
	type FontSubtype,
	StandardEncodings,
} from './types.js';

export default function collectFonts(
	pdfDoc: PDFDocument,
	resources: FontUsage[],
): Map<string, FontInfo> {
	const fonts: Map<string, FontInfo> = new Map<string, FontInfo>();

	const refs = [...new Set<PDFRef>(resources.flatMap(Object.values))];
	for (let i = 0; i < refs.length; ++i) {
		const fontRef = refs[i]!;
		const fontDict = pdfDoc.context.lookup(fontRef) as PDFDict;
		if (!fontDict) continue;

		const subtype = fontDict.lookupMaybe(PDFName.of('Subtype'), PDFName);
		if (!subtype) continue;

		const subtypeName = subtype.decodeText();
		if (subtypeName === 'Type0') {
			const info = getFontType0Info(pdfDoc, fontDict, fontRef as PDFRef);
			if (info) {
				fonts.set((fontRef as PDFRef).toString(), info);
			}
		} else {
			const info = getFontInfo(subtypeName, fontDict, fontRef as PDFRef);
			if (info) {
				fonts.set((fontRef as PDFRef).toString(), info);
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

	const baseFont = fontDict
		.lookupMaybe(PDFName.of('BaseFont'), PDFName)
		?.decodeText();
	const fontInfo: FontInfo = {
		ref: fontRef,
		embedded,
		subtype: subtypeName as FontSubtype,
		glyphMapper,
	};
	if (typeof baseFont !== 'undefined') {
		fontInfo.baseFont = baseFont;
		fontInfo.fontName = getFontName(baseFont);
	}
	if (typeof encoding !== 'undefined') {
		fontInfo.encoding = encoding as Encoding;
	}
	return fontInfo;
}

function getFontType0Info(
	pdfDoc: PDFDocument,
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

	const fontInfo: FontInfo = {
		ref: fontRef,
		embedded,
		subtype: 'Type0',
	};

	const baseFont = fontDict
		.lookupMaybe(PDFName.of('BaseFont'), PDFName)
		?.decodeText();
	if (typeof baseFont !== 'undefined') {
		fontInfo.baseFont = baseFont;
		fontInfo.fontName = getFontName(baseFont);
	}

	const toUnicodeStream = fontDict.lookup(PDFName.of('ToUnicode'));
	if (toUnicodeStream && toUnicodeStream instanceof PDFRawStream) {
		const stream = toUnicodeStream.contents;
		fontInfo.glyphMapper = new CMapMapper(stream);
	}

	return fontInfo;
}

function isStandardEncoding(encoding: string): boolean {
	return StandardEncodings.map((e) => e.toLocaleLowerCase()).includes(
		encoding.toLowerCase(),
	);
}
