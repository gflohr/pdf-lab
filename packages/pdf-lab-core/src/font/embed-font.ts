import { PDFDict, PDFDocument, PDFName, PDFRef } from '@cantoo/pdf-lib';
import { FontInfo } from './types.js';
import { resolveFont } from './resolve-font.js';
import { FontEmbedOptions } from '../pdf-lab.js';
import fontkit from '@pdf-lib/fontkit';

/**
 * Embed one single font into the PDF.
 */
export async function embedFont(pdfDocument: PDFDocument, fontInfo: FontInfo, characters: Set<string>, options: FontEmbedOptions) {
	console.log(`embedding font: ${fontInfo.fontName}`);

	const fontDescriptor = getFontDescriptor(pdfDocument, fontInfo.ref);
	const fontData = await resolveFont(fontInfo.fontName ?? 'sans', options.fontMap, options.fcMatch);
	//const fontkit = options.fontkit as Fontkit;
	if (!options.fontkit) {
		throw new Error('You have to pass a fontkit instance in the embed options!');
	}

	const source = fontData.source as Uint8Array;

	const isTTC = source[0] === 0x74 && source[1] === 0x74 && source[2] === 63 && source[3] === 0x66;
	const font = isTTC ? fontkit.create(source, fontData.postScriptName) : fontkit.create(source as Uint8Array);
	const subset = font.createSubset();
	if (options.subset) {
		const text = [...characters].join('');
		const glyphs = font.glyphsForString(text);
		glyphs.forEach(g => { subset.includeGlyph(g)} );
	} else {
		throw new Error('todo!');
	}

	const bytes = await serializeSubset(subset);
	const stream = options.compress ? pdfDocument.context.flateStream(bytes)
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
};

function getFontDescriptor(pdfDoc: PDFDocument, fontRef: PDFRef): PDFDict {
	const fontDict = pdfDoc.context.lookupMaybe(fontRef, PDFDict);
	if (!fontDict) {
		throw new Error(`PDF has no font dictionary '${fontRef.toString()}'!`);
	}

	const fontDescriptor = fontDict.lookupMaybe(PDFName.of('FontDescriptor'), PDFDict);
	if (!fontDescriptor) {
		throw new Error(`Creating a font descriptor is not yet implemented!`);
	}

	return fontDescriptor;
}
