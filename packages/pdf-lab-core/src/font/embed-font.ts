import {
	PDFDict,
	type PDFDocument,
	PDFName,
	type PDFRef,
} from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { FontEmbedOptions } from '../pdf-lab.js';
import { resolveFont } from './resolve-font.js';
import type { FontInfo } from './types.js';

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
	const fontDict = getFontDict(pdfDocument, fontInfo.ref);
	fontDict.set(PDFName.of('Encoding'), PDFName.of('Identity-H'));

	const fontDescriptor = getFontDescriptor(fontDict, fontInfo.ref);
	const fontData = await resolveFont(
		fontInfo.fontName ?? 'sans',
		options.fontMap,
		options.fcMatch,
	);
	//const fontkit = options.fontkit as Fontkit;
	if (!options.fontkit) {
		throw new Error(
			'You have to pass a fontkit instance in the embed options!',
		);
	}

	const source = fontData.source as Uint8Array;

	const isTTC =
		source[0] === 0x74 &&
		source[1] === 0x74 &&
		source[2] === 63 &&
		source[3] === 0x66;
	const font = isTTC
		? fontkit.create(source, fontData.postScriptName)
		: fontkit.create(source as Uint8Array);
	const subset = font.createSubset();
	if (options.subset) {
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
	} else {
		throw new Error('todo!');
	}

	const bytes = await serializeSubset(subset);
	const stream = options.compress
		? pdfDocument.context.flateStream(bytes)
		: pdfDocument.context.stream(bytes);

	const streamRef = pdfDocument.context.register(stream);
	fontDescriptor.set(PDFName.of('FontFile2'), streamRef);

	fontInfo.embedded = true;
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

function getFontDescriptor(fontDict: PDFDict, fontRef: PDFRef): PDFDict {
	const fontDescriptor = fontDict.lookupMaybe(
		PDFName.of('FontDescriptor'),
		PDFDict,
	);
	if (!fontDescriptor) {
		throw new Error(`Creating a font descriptor is not yet implemented!`);
	}

	return fontDescriptor;
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
