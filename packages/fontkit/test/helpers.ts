/* istanbul ignore file */
import { readFileSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import type { EncodeStream } from 'restructure';
import type { Font, VariationCoordinates } from '../src/font.js';
import { fontkit } from '../src/index.js';
import type { Subset } from '../src/subset/index.js';
import type { TrueTypeFont } from '../src/true-type-font.js';

type OpenCallback = (
	error: Error | unknown | null,
	font?: TrueTypeFont,
) => void;

interface Fontkit {
	logErrors: boolean;

	registerFormat(format: unknown): void;

	create(buffer: Uint8Array, postscriptName?: string): Font;

	openSync(
		filename: string,
		settings?: string | VariationCoordinates,
	): TrueTypeFont;

	open(
		filename: string,
		postscriptName?: string | null | OpenCallback,
	): Promise<TrueTypeFont>;
}

const typedFontkit = fontkit as Fontkit;

typedFontkit.openSync = (
	filename: string,
	postscriptName?: string,
): TrueTypeFont => {
	const buffer = readFileSync(filename);

	return fontkit.create(buffer, postscriptName) as TrueTypeFont;
};

typedFontkit.open = async (
	filename: string,
	postScriptName?: string | null | OpenCallback,
): Promise<TrueTypeFont> => {
	const fontBytes = await fs.readFile(filename);

	return fontkit.create(fontBytes, postScriptName as string) as TrueTypeFont;
};

export default typedFontkit;

export async function readSubsetStream(stream: EncodeStream): Promise<Buffer> {
	const chunks: Buffer[] = [];

	for await (const chunk of stream as unknown as AsyncIterable<Uint8Array>) {
		chunks.push(Buffer.from(chunk));
	}

	return Buffer.concat(chunks);
}

export async function getSubsetFont(subset: Subset): Promise<TrueTypeFont> {
	const stream = subset.encodeStream();
	const buf = await readSubsetStream(stream);

	return fontkit.create(buf) as TrueTypeFont;
}
