import r, { type DecodeStream } from '@pdf-lib/restructure';
import type { DFont } from './d-font.js';
import type { SFNTFont } from './sfnt-font.js';
import type { TrueTypeCollection } from './true-type-collection.js';

export interface FontContainerInstance {
	getFont(postscriptName: string): SFNTFont | null;
}

/**
 * Describes the static constructor pattern required to plug a font parser into
 * the engine.
 */
export interface FontContainer {
	/**
	 * The static probing function.
	 * @returns `true` if the input buffer seems to be of the expect type.
	 */
	probe(buffer: Uint8Array): boolean;

	/**
	 * The constructor signature accepting a Restructure `DecodeStream`.
	 */
	new (stream: DecodeStream): FontContainerInstance;
}

const formats: FontContainer[] = [];

/**
 * The main entry point into the library.
 */
export const fontkit = {
	/**
	 * Set to `true` for verbose error logging.
	 */
	logErrors: false,

	/**
	 * Register a new font format.
	 *
	 * @param format
	 */
	registerFormat: (format: FontContainer) => {
		formats.push(format);
	},

	/**
	 * Create an instance of a font or a font collection.
	 *
	 * For a {@link TrueTypeCollection} or {@link DFont}, you may specify the
	 * PostScript name of one of the fonts contained in the collection.
	 * Otherwise, you get the collection itself. You can then get the list
	 * of included fonts with the method `getFonts`.
	 *
	 * If the font is a regular font program file and you specify a PostScript
	 * name, an attempt is made to get a font variation of that name. That is
	 * only possible if:
	 *
	 * 1. The font has an {@link fvarTable.fvar} table.
	 * 2. The font either has a {@link CFFFont | CFF2} table, or it has both a {@link gvarTable.gvar | gvar} and `glyf` table.
	 *
	 * The resolution may still fail if the requested variation is not present
	 * in the font.
	 *
	 * @param bytes the raw font byte
	 * @param postscriptName the optional PostScript name
	 * @returns the font or font collection
	 */
	create: (bytes: Uint8Array, postscriptName?: string): SFNTFont | DFont | TrueTypeCollection | null => {
		const buffer = Buffer.from(bytes);
		for (let i = 0; i < formats.length; i++) {
			const format = formats[i];
			if (format.probe(buffer)) {
				const font = new format(new r.DecodeStream(buffer));
				if (postscriptName) {
					return font.getFont(postscriptName);
				}

				return font as SFNTFont | DFont | TrueTypeCollection;
			}
		}
		throw new Error('Unknown font format');
	},
};
