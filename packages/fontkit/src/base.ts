import r from '@pdf-lib/restructure';
import type DFont from './DFont';
import type { SFNTFont } from './sfnt-font';
import type TrueTypeCollection from './true-type-collection';

export type FontFormatClass = (new (...args: any[]) => SFNTFont | TrueTypeCollection | DFont) & {
	probe(buffer: Buffer): boolean;
};

const formats: FontFormatClass[] = [];

const fontkit = {
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

export default fontkit;
