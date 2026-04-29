/**
 * The type for font data reference.
 */
export type FontData = {
	/**
	 * The source of the font data. This can either be a file system path
	 * from where the font data gets loaded or the raw data bytes.
	 */
	source: string | ArrayBuffer | Uint8Array<ArrayBufferLike>;

	/**
	 * The optional PostScript name. This is only relevant, if the font
	 * is a TrueType collection (`.ttc`) file.
	 */
	postScriptName?: string;
};

/**
 * The font mapping data. This maps font names (with a subset prefix and a
 * producer suffix stripped off) to font data.
 */
export type FontMap = Record<string, FontData>;
