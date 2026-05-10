import {
	decodePDFRawStream,
	type PDFContext,
	PDFName,
	PDFNumber,
	PDFRawStream,
	type PDFStream,
} from '@cantoo/pdf-lib';
import type { PatchSet } from './types.js';

export function patchStream(
	stream: PDFStream,
	context: PDFContext,
	patchSets: PatchSet[],
	compress: boolean,
) {
	// Sort the patch sets by offset.
	const sorted = patchSets.sort((a, b): number => {
		if (a.offset < b.offset) {
			return -1;
		} else if (a.offset > b.offset) {
			return +1;
		} else {
			return 0;
		}
	});

	let bytes: Uint8Array;
	if (stream instanceof PDFRawStream) {
		const decoded = decodePDFRawStream(stream);
		bytes = decoded.getBytes(0) as Uint8Array;
	} else {
		bytes = stream.getContents();
	}

	const chunks: number[][] = [];
	let cursor = 0;

	// Split the stream in chunks.
	for (const patchSet of sorted) {
		// The chunk before the offset, even if empty.
		const prefix = Array.from(bytes.slice(cursor, patchSet.offset));
		const chunk = Array.from(
			bytes.slice(patchSet.offset, patchSet.offset + patchSet.length),
		);
		chunks.push(prefix, chunk);
		cursor = patchSet.offset + patchSet.length;
	}
	const postfix = Array.from(bytes.slice(cursor, bytes.length - 1));
	chunks.push(postfix);

	for (let i = 0; i < patchSets.length; ++i) {
		chunks[1 + i * 2] = patchSets[i]!.hexstring;
	}

	const newBytes = new Uint8Array(chunks.flat());

	if (compress) {
		const compressed = context.flateStream(newBytes as Uint8Array);
		stream.dict.set(PDFName.of('Filter'), PDFName.of('FlateDecode'));
		stream.dict.set(
			PDFName.of('Length'),
			PDFNumber.of(compressed.contents.length),
		);
		stream.updateContents(compressed.contents);
	} else {
		stream.updateContents(newBytes);
		stream.dict.delete(PDFName.of('Filter'));
	}
}
