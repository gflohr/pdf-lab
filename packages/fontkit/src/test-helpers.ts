import { readFileSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import fontkit from './index.js';
import type { Font } from './types/index.js';
import type { VariationCoordinates } from './types/internal/tables/fvar.js';

type OpenCallback = (error: Error | unknown | null, font?: Font) => void;

interface Fontkit {
	logErrors: boolean;

	registerFormat(format: unknown): void;

	create(buffer: Uint8Array, postscriptName?: string): unknown;

	openSync(filename: string, postscriptName?: string): Font;
	openSync(filename: string, settings?: VariationCoordinates): Font;

	open(
		filename: string,
		postscriptName?: string | null | OpenCallback,
	): Promise<Font>;
}

const typedFontkit = fontkit as Fontkit;

typedFontkit.openSync = (filename: string, postscriptName?: string): Font => {
	const buffer = readFileSync(filename);

	return fontkit.create(buffer, postscriptName) as Font;
};

typedFontkit.open = async (
	filename: string,
	postScriptName?: string | null | OpenCallback,
): Promise<Font> => {
	const fontBytes = await fs.readFile(filename);

	return await fontkit.create(fontBytes, postScriptName);
};

export default typedFontkit;
