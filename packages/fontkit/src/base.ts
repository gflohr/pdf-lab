import r from '@pdf-lib/restructure';
import type { DFont } from './d-font.js';
import type { SFNTFont } from './sfnt-font.js';
import type { TrueTypeCollection } from './true-type-collection.js';

export type FontFormatClass = (new (
	...args: any[]
) => SFNTFont | TrueTypeCollection | DFont) & {
	probe(buffer: Buffer): boolean;
};

const formats: FontFormatClass[] = [];

export const fontkit = {
	logErrors: false,

	registerFormat: (format: FontFormatClass) => {
		formats.push(format);
	},

	create: (uint8ArrayFontData: Uint8Array, postscriptName?: string) => {
		const buffer = Buffer.from(uint8ArrayFontData);
		for (let i = 0; i < formats.length; i++) {
			const format = formats[i];
			if (format.probe(buffer)) {
				const font = new format(new r.DecodeStream(buffer));
				if (postscriptName) {
					return font.getFont(postscriptName);
				}

				return font;
			}
		}
		throw new Error('Unknown font format');
	},
};
