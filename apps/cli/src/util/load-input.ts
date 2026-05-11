import * as fs from 'node:fs/promises';
import { stdin } from 'node:process';

/**
 * Load the input PDF.
 *
 * @param filename the filename of the PDF or '-' for standard input
 * @returns a `Buffer` with the input Bytes.
 */
export async function loadInput(filename: string): Promise<Buffer> {
	return filename === '-' ? readStdin() : fs.readFile(filename);
}

async function readStdin(): Promise<Buffer> {
	const chunks: Buffer[] = [];

	for await (const chunk of stdin) chunks.push(chunk);

	return Buffer.concat(chunks);
}
