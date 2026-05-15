import { readFileSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import fontkit from '../src/index.js';
import type { SFNTFont } from '../src/sfnt-font.js';
import type { VariationCoordinates } from '../src/types/internal/tables/fvar.js';

type OpenCallback = (error: Error | unknown | null, font?: SFNTFont) => void;

interface Fontkit {
	logErrors: boolean;

	registerFormat(format: unknown): void;

	create(buffer: Uint8Array, postscriptName?: string): unknown;

	openSync(
		filename: string,
		settings?: string | VariationCoordinates,
	): SFNTFont;

	open(
		filename: string,
		postscriptName?: string | null | OpenCallback,
	): Promise<SFNTFont>;
}

const typedFontkit = fontkit as Fontkit;

typedFontkit.openSync = (
	filename: string,
	postscriptName?: string,
): SFNTFont => {
	const buffer = readFileSync(filename);

	return fontkit.create(buffer, postscriptName) as SFNTFont;
};

typedFontkit.open = async (
	filename: string,
	postScriptName?: string | null | OpenCallback,
): Promise<SFNTFont> => {
	const fontBytes = await fs.readFile(filename);

	return fontkit.create(fontBytes, postScriptName);
};

export default typedFontkit;
