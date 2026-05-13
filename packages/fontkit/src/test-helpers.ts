import fs from 'node:fs';
import fontkit from './index.js';
import { Font } from './types/font.js';

type OpenCallback = (error: Error | unknown | null, font?: unknown) => void;

interface Fontkit {
	logErrors: boolean;

	registerFormat(format: unknown): void;

	create(buffer: Uint8Array, postscriptName?: string): unknown;

	openSync(
		filename: string,
		postScriptName?: string,
	): unknown;

	open(
		filename: string,
		postScriptName: string | null | OpenCallback,
		callback?: OpenCallback,
	): void;
}

const typedFontkit = fontkit as Fontkit;

typedFontkit.openSync = (filename: string, postScriptName?: string): Font => {
	const buffer = fs.readFileSync(filename);

	return fontkit.create(buffer, postScriptName);
};

typedFontkit.open = (filename: string, postScriptName?: string | null | OpenCallback, callback?: OpenCallback): Font => {
	if (typeof postScriptName === 'function') {
		callback = postScriptName;
		postScriptName = null;
	}

	fs.readFile(filename, (err, buffer) => {
		if (err) {
			return callback!(err);
		}

		let font: unknown;
		try {
			font = fontkit.create(buffer, postScriptName);
		} catch (e) {
			return callback!(e);
		}

		return callback!(null, font);
	});

	return;
};

export default typedFontkit;
