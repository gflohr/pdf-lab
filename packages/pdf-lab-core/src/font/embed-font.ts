import {
	PDFDict,
	type PDFDocument,
	PDFName,
	PDFNumber,
	type PDFRef,
} from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { GlyphMapper } from '../encoding/mappers/glyph-mapper.js';
import type { FontEmbedOptions } from '../pdf-lab.js';
import { resolveFont } from './resolve-font.js';
import type { FontInfo } from './types.js';

type Metrics = {
	bbox: number[];
	ascent: number;
	descent: number;
	capHeight: number;
	italicAngle: number;
	widths: number[];
};

/**
 * Embed one single font into the PDF. This only works for subtype /TrueType
 * at the moment.
 */
export async function embedFont(
	pdfDocument: PDFDocument,
	fontInfo: FontInfo,
	glyphIds: Set<number>,
	options: FontEmbedOptions,
) {
	if (!options.fontkit) {
		throw new Error(
			'You have to pass a fontkit instance in the embed options!',
		);
	}

	const fontData = await resolveFont(
		fontInfo.fontName ?? 'sans',
		options.fontMap,
		options.fcMatch,
	);
	const source = fontData.source as Uint8Array;

	const isTTC =
		source[0] === 0x74 &&
		source[1] === 0x74 &&
		source[2] === 0x63 &&
		source[3] === 0x66;
	const font = isTTC
		? fontkit.create(source, fontData.postScriptName)
		: fontkit.create(source as Uint8Array);
	const fontDict = getFontDict(pdfDocument, fontInfo.ref);
	fontDict.set(PDFName.of('Encoding'), PDFName.of('Identity-H'));

	if (fontInfo.subtype === 'Type1') {
		const subset = font.createSubset();
		const mapper = fontInfo.glyphMapper!;
		glyphIds.forEach((glyphId) => {
			const codePoint = coerceCodePoints(mapper.lookupCodepoints(glyphId));
			const glyph = font.glyphForCodePoint(codePoint);
			subset.includeGlyph(glyph);
		});
		const fontBytes = await serializeSubset(subset);

		await embedType1(pdfDocument, fontInfo, font, glyphIds, fontBytes, options);
	} else {
		const fontDescriptor = getFontDescriptor(fontDict);
		const subset = font.createSubset();
		const mapping: Record<string, number> = { '0': 0 };
		const subsetGlyphs = [0];

		const mapper = fontInfo.glyphMapper;
		if (!mapper) {
			throw new Error('Cannot embed font without ToUnicode CMap!');
		}
		glyphIds.forEach((glyphId) => {
			const codePoint = coerceCodePoints(mapper?.lookupCodepoints(glyphId));
			const glyph = font.glyphForCodePoint(codePoint);
			subsetGlyphs.push(glyph.id);
			mapping[codePoint] = glyphId;
		});

		// Ouch.
		(subset as unknown as { mapping: Record<string, number> }).mapping =
			mapping;
		(subset as unknown as { glyphs: number[] }).glyphs = subsetGlyphs;

		const bytes = await serializeSubset(subset);
		const stream = options.compress
			? pdfDocument.context.flateStream(bytes)
			: pdfDocument.context.stream(bytes);

		const streamRef = pdfDocument.context.register(stream);
		fontDescriptor.set(PDFName.of('FontFile2'), streamRef);
	}
	fontInfo.embedded = true;
}

// We cannot use the embedFont() method of pdf-lib, because it does not
// support specifying the PostScript name for a TrueType font collection.
async function embedType1(
	pdfDocument: PDFDocument,
	fontInfo: FontInfo,
	font: fontkit.Font,
	glyphIds: Set<number>,
	fontBytes: Uint8Array,
	options: FontEmbedOptions,
) {
	const context = pdfDocument.context;
	const fontStream = options.compress
		? pdfDocument.context.flateStream(fontBytes)
		: pdfDocument.context.stream(fontBytes);
	const fontStreamRef = context.register(fontStream);

	const fontDict = getFontDict(pdfDocument, fontInfo.ref);
	fontDict.set(PDFName.of('SubType'), PDFName.of('Type0'));

	const fontDescriptor =
		fontDict.lookupMaybe(PDFName.of('FontDescriptor'), PDFDict) ??
		context.obj({
			Type: 'FontDescriptor',
		});
	const pdfFontName = fontInfo.baseFont ?? font.fullName ?? 'Unknown';
	fontDescriptor.set(
		PDFName.of('FontName'),
		PDFName.of(context.addRandomSuffix(pdfFontName)),
	);

	storeFontMetrics(pdfDocument, font, fontDict, fontDescriptor);

	fontDict.set(PDFName.of('Encoding'), PDFName.of('Identity-H'));
	const cmap = createCMap(fontInfo.glyphMapper!, glyphIds);
	const cmapStream = options.compress
		? pdfDocument.context.flateStream(cmap)
		: pdfDocument.context.stream(cmap);
	const cmapRef = context.register(cmapStream);
	fontDict.set(PDFName.of('ToUnicode'), cmapRef);
}
ƒ;
function storeFontMetrics(
	pdfDocument: PDFDocument,
	font: fontkit.Font,
	fontDict: PDFDict,
	fontDescriptor: PDFDict,
) {
	const metrics = extractMetrics(font);

	fontDescriptor.set(PDFName.of('Flags'), PDFNumber.of(32));
	fontDescriptor.set(
		PDFName.of('FontBBox'),
		pdfDocument.context.obj(metrics.bbox),
	);
	fontDescriptor.set(PDFName.of('Ascent'), PDFNumber.of(metrics.ascent));
	fontDescriptor.set(PDFName.of('Descent'), PDFNumber.of(metrics.descent));
	fontDescriptor.set(PDFName.of('CapHeight'), PDFNumber.of(metrics.capHeight));
	fontDescriptor.set(
		PDFName.of('ItalicAngle'),
		PDFNumber.of(metrics.italicAngle),
	);
	fontDescriptor.set(PDFName.of('StemV'), PDFNumber.of(80));

	const widthsArray = pdfDocument.context.obj(metrics.widths);
}

function createCMap(mapper: GlyphMapper, glyphIds: Set<number>): string {
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
<0000> <ffff>
endcodespacerange
${glyphIds.size} beginbfchar
`;

	let i = 0;
	glyphIds.forEach((glyphId) => {
		++i;
		const codepoint = coerceCodePoints(mapper.lookupCodepoints(glyphId));
		const hexCodePoint = `<${codepoint.toString(16).padStart(4, '0')}>`;
		const hexGlyphId = `<${i.toString(16).padStart(4, '0')}>`;
		cmap += `${hexCodePoint} ${hexGlyphId}\n`;
	});

	cmap += `endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
`;
	return cmap;
}

function serializeSubset(subset: fontkit.Subset): Promise<Uint8Array> {
	return new Promise((resolve, reject) => {
		const parts: Uint8Array[] = [];
		subset
			.encodeStream()
			.on('data', (bytes) => parts.push(bytes))
			.on('end', () => resolve(mergeUint8Arrays(parts)))
			// biome-ignore lint/suspicious/noExplicitAny: TODO!
			.on('error' as any, (err) => reject(err));
	});
}

function mergeUint8Arrays(arrays: Uint8Array[]): Uint8Array {
	let totalSize = 0;
	for (let idx = 0, len = arrays.length; idx < len; idx++) {
		totalSize += arrays[idx]!.length;
	}

	const mergedBuffer = new Uint8Array(totalSize);
	let offset = 0;
	for (let idx = 0, len = arrays.length; idx < len; idx++) {
		const array = arrays[idx];
		mergedBuffer.set(array!, offset);
		offset += array!.length;
	}

	return mergedBuffer;
}

function getFontDict(pdfDoc: PDFDocument, fontRef: PDFRef): PDFDict {
	const fontDict = pdfDoc.context.lookupMaybe(fontRef, PDFDict);
	if (!fontDict) {
		throw new Error(`PDF has no font dictionary '${fontRef.toString()}'!`);
	}

	return fontDict;
}

function getFontDescriptor(fontDict: PDFDict): PDFDict {
	const fontDescriptor = fontDict.lookupMaybe(
		PDFName.of('FontDescriptor'),
		PDFDict,
	);
	if (fontDescriptor) {
		return fontDescriptor;
	} else {
		throw new Error('!Cannot embed this font without FontDescriptor!');
	}
}

function coerceCodePoints(cps: number[] | undefined): number {
	if (!cps?.length) {
		return 0;
	} else if (cps.length === 1) {
		return cps[0]!;
	} else {
		// Ligature?
		const asText = cps.map((cp) => String.fromCodePoint(cp)).join('');
		switch (asText) {
			case 'DZ':
				return 0x01f1;
			case 'Dz':
				return 0x01f2;
			case 'dz':
				return 0x01f3;
			case 'ff':
				return 0xfb00;
			case 'fi':
				return 0xfb01;
			case 'fl':
				return 0xfb02;
			case 'ffi':
				return 0xfb03;
			case 'ffl':
				return 0xfb04;
			case 'st':
				return 0xfb06;
			default:
				return cps[0]!; // Better than nothing.
		}
	}
}

function scale(value: number, unitsPerEm: number): number {
	return Math.round((value * 1000) / unitsPerEm);
}

function extractMetrics(font: fontkit.Font): Metrics {
	const unitsPerEm = font.unitsPerEm;

	const bbox = [
		scale(font.bbox.minX, unitsPerEm),
		scale(font.bbox.minY, unitsPerEm),
		scale(font.bbox.maxX, unitsPerEm),
		scale(font.bbox.maxY, unitsPerEm),
	];

	const ascent = scale(font.ascent, unitsPerEm);
	const descent = scale(font.descent, unitsPerEm);

	const capHeight = font.capHeight ? scale(font.capHeight, unitsPerEm) : ascent;

	const italicAngle = font.italicAngle || 0;

	const widths: number[] = [];

	for (let code = 32; code <= 255; code++) {
		const glyph = font.glyphForCodePoint(code);
		widths.push(scale(glyph.advanceWidth, unitsPerEm));
	}

	return {
		bbox,
		ascent,
		descent,
		capHeight,
		italicAngle,
		widths,
	};
}
