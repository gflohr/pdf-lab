import type { PDFRef } from '@cantoo/pdf-lib';
import type { GlyphMapper } from '../encoding/mappers/glyph-mapper.js';
import type { Encoding } from '../encoding/types.js';

/**
 * The possible font subtypes.
 */
export type FontSubtype =
	| 'Type0'
	| 'Type1'
	| 'MMType1'
	| 'Type3'
	| 'TrueType'
	| 'CIDFontType0'
	| 'CIDFontType2';

/**
 * Information about a font.
 */
export type FontInfo = {
	/**
	 * The reference to the font dictionary.
	 */
	ref: PDFRef;

	/**
	 * The indicator for embedded fonts.
	 */
	embedded: boolean;

	/**
	 * The font subtype.
	 */
	subtype: FontSubtype;

	/**
	 * The BaseFont. This often contains subset identifiers or a numbered
	 * suffix.
	 */
	baseFont?: string;

	/**
	 * The normalised font name without the subset identifier or numbered
	 * suffix.
	 */
	fontName?: string;

	/**
	 * The optional encoding.
	 */
	encoding?: Encoding;

	/**
	 * The optional glyph mapper.
	 */
	glyphMapper?: GlyphMapper;
};

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
