import {
	decodePDFRawStream,
	isStandardFont,
	PDFArray,
	PDFDict,
	type PDFDocument,
	PDFName,
	PDFObject,
	PDFRawStream,
	type PDFRef,
	PDFStream,
} from '@cantoo/pdf-lib';
import { CMapMapper } from '../encoding/mappers/cmap-mapper.js';
import type { GlyphMapper } from '../encoding/mappers/glyph-mapper.js';
import { SingleByteEncodingMapper } from '../encoding/mappers/single-byte-encoding-mapper.js';
import { type Encoding, lcStandardEncodings, StandardEncodings } from '../encoding/types.js';
import type { FontUsage } from './collect-resources.js';
import type { FontInfo, FontSubtype } from './types.js';
import { fontName } from './util/font-name.js';
import { IdentityMapper } from '../encoding/mappers/identity-mapper.js';

/**
 * Collect all font contained in a PDF document.
 *
 * @param pdfDoc the input PDF
 * @param resources the used font resources as returned by `collectResources`
 * @returns a map of stringified references to font information objects
 */
export default function collectFonts(
	pdfDoc: PDFDocument,
	resources: FontUsage[],
): Map<string, FontInfo> {
	const fonts: Map<string, FontInfo> = new Map<string, FontInfo>();

	const refs = [...new Set<PDFRef>(resources.flatMap(Object.values))];
	for (let i = 0; i < refs.length; ++i) {
		const fontRef = refs[i]!;
		const fontDict = pdfDoc.context.lookupMaybe(fontRef, PDFDict);
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

	const toUnicodeMapper = getToUnicodeMapper(fontDict);
	const baseFont = fontDict.lookupMaybe(PDFName.of('BaseFont'), PDFName)?.decodeText();
	const encodingMapper = getEncodingMapper(fontDict, subtypeName, baseFont);

	const fontInfo: FontInfo = {
		ref: fontRef,
		embedded,
		subtype: subtypeName as FontSubtype,
		toUnicodeMapper,
		encodingMapper,
	};
	if (typeof baseFont !== 'undefined') {
		fontInfo.baseFont = baseFont;
		fontInfo.fontName = fontName(baseFont);
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

	const descendantFontDescriptor = descendantFontDict.lookupMaybe(
		PDFName.of('FontDescriptor'),
		PDFDict,
	);
	if (!descendantFontDescriptor) return;

	const embedded =
		descendantFontDescriptor.has(PDFName.of('FontFile')) ||
		descendantFontDescriptor.has(PDFName.of('FontFile2')) ||
		descendantFontDescriptor.has(PDFName.of('FontFile3'));


	const toUnicodeMapper = getToUnicodeMapper(fontDict);
	const baseFont = descendantFontDescriptor.lookupMaybe(PDFName.of('BaseFont'), PDFName)?.decodeText();
	const encodingMapper = getEncodingMapper(fontDict, 'Type0', baseFont);
	const subtype = descendantFontDescriptor.lookupMaybe(PDFName.of('Subtype'), PDFName)?.decodeText() as FontSubtype;
	const fontInfo: FontInfo = {
		ref: fontRef,
		embedded,
		subtype,
		toUnicodeMapper,
		encodingMapper,
	};
	if (typeof baseFont !== 'undefined') {
		fontInfo.baseFont = baseFont;
		fontInfo.fontName = fontName(baseFont);
	}

	return fontInfo;
}

function getEncodingMapper(fontDict: PDFDict, subtype: string, baseFont: string | undefined): GlyphMapper {
	const encodingObj = fontDict.lookup(PDFName.of('Encoding'));
	if (encodingObj instanceof PDFName) {
		const name = encodingObj.decodeText();
		const encoding = getEncoding(subtype, name, baseFont);
		if (encoding.toLowerCase().startsWith('identity-')) {
			return new IdentityMapper(encoding as 'Identity-H' | 'Identity-V');
		} else {
			return new SingleByteEncodingMapper(encoding as Encoding);
		}
	} else if (encodingObj instanceof PDFDict) {
		const pdfName = encodingObj.lookupMaybe(PDFName.of('BaseEncoding'), PDFName);
		const encoding = getEncoding(subtype, pdfName?.decodeText(), baseFont);
		const differences = encodingObj.lookupMaybe(PDFName.of('Differences'), PDFArray);

		if (encoding.toLowerCase().startsWith('identity-')) {
			return new IdentityMapper(encoding as 'Identity-H' | 'Identity-V', differences);
		} else {
			return new SingleByteEncodingMapper(encoding as Encoding, differences);
		}
	} else if (subtype === 'Type1') {
		const lcBaseFont = baseFont?.toLowerCase();
		if (lcBaseFont) {
			if (lcBaseFont === 'symbol') {
				return new SingleByteEncodingMapper('SymbolEncoding');
			} else if (lcBaseFont === 'zapfdingbats') {
				return new SingleByteEncodingMapper('ZapfDingbatsEncoding');
			} else {
				return new SingleByteEncodingMapper('StandardEncoding');
			}
		} else {
			return new SingleByteEncodingMapper('StandardEncoding');
		}
	} else {
		return new IdentityMapper('Identity-H');
	}
}

function getEncoding(subtype: string, name?: string, baseFont?: string): string {
	if(subtype === 'Type1') {
		const lcBaseFont = baseFont?.toLowerCase();
		if (lcBaseFont === 'symbol') {
			return 'SymbolEncoding';
		} else if (lcBaseFont === 'zapfdingbats') {
			return 'ZapfDingbatsEncoding';
		} else if (name && lcStandardEncodings.includes(name.toLowerCase())) {
			return name;
		} else {
			return 'StandardEncoding';
		}
	} else {
		const lcName = name?.toLowerCase();
		if (name && (lcStandardEncodings.includes(lcName!) || (lcName === 'identity-v'))) {
			return name;
		} else {
			return 'Identity-H';
		}
	}
}

function getToUnicodeMapper(fontDict: PDFDict): GlyphMapper | undefined {
	const toUnicodeStream = fontDict.lookup(PDFName.of('ToUnicode'));
	if (toUnicodeStream && toUnicodeStream instanceof PDFRawStream) {
		const data = decodePDFRawStream(toUnicodeStream).decode();
		return new CMapMapper(data);
	} else if (toUnicodeStream && toUnicodeStream instanceof PDFStream) {
		return new CMapMapper(toUnicodeStream.getContents());
	}
}
