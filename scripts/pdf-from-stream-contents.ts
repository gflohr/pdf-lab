import { once } from 'node:events';
import * as stream from 'node:stream';
import * as util from 'node:util';

import {
	PDFArray,
	PDFDocument,
	PDFName,
	PDFStream,
	rgb,
	StandardFonts,
} from '@cantoo/pdf-lib';

// This simple test script creates a PDF with a hand-crafted content stream.
// It reads the stream from standard input, and writes the generated PDF to
// standard output.
//
// Sample usage: pnpm dlx tsx scripts/pdf-from-stream-contents.ts <in.txt >out.pdf
//
// Example input file:
//
// q
// BT
// 0 0 0 rg
// /Helvetica-7098480789 14 Tf
// 24 TL
// 1 0 0 1 50 791.89 Tm
// (test string) Tj
// T*
// ET
// Q
//
// The font /Helvetica-7098480789 should always work.

const CHUNK_SIZE = 16 * 1024;

const finished = util.promisify(stream.finished);

export const safeStdoutBufferWrite = async (output: Uint8Array) => {
	let offset = 0;

	while (offset < output.length) {
		const chunk = output.subarray(offset, offset + CHUNK_SIZE);
		const canContinue = process.stdout.write(chunk);

		if (!canContinue) {
			await once(process.stdout, 'drain');
		}

		offset += CHUNK_SIZE;
	}

	process.stdout.end();
	await finished(process.stdout);
};

async function readStdin(): Promise<Uint8Array> {
	const chunks: Buffer[] = [];

	for await (const chunk of process.stdin) {
		chunks.push(chunk as Buffer);
	}

	return Buffer.concat(chunks);
}

async function main(): Promise<void> {
	const contentBytes = await readStdin();

	const pdfDoc = await PDFDocument.create();
	let page = pdfDoc.addPage();
	const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
	page.drawText('dummy', {
		x: 50,
		y: page.getSize().height - 50,
		size: 14,
		font,
		color: rgb(0, 0, 0),
	});
	pdfDoc.save();

	page = pdfDoc.getPage(0);

	const contents = page.node.get(PDFName.of('Contents'));
	if (!contents) throw new Error('no content');

	let stream: PDFStream;
	if (contents instanceof PDFStream) {
		stream = contents;
	} else if (contents instanceof PDFArray) {
		for (let j = 0; j < contents.size(); ++j) {
			const item = contents.get(j);
			const resolved = pdfDoc.context.lookup(item);

			if (resolved instanceof PDFStream) {
				stream = resolved;
				break;
			}
		}
	} else {
		const resolved = pdfDoc.context.lookup(contents);
		if (resolved instanceof PDFStream) {
			stream = resolved;
		}
	}

	if (!stream!) throw new Error('cannot find content stream');

	stream.updateContents(contentBytes);
	stream.dict.delete(PDFName.of('Filter'));

	const bytes = await pdfDoc.save({ useObjectStreams: false });
	safeStdoutBufferWrite(bytes);
}

main().catch(console.error);
