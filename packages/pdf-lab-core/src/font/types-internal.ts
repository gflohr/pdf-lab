import type { PDFRef } from '@cantoo/pdf-lib';
import type { GlyphMapper } from '../encoding/mappers/glyph-mapper.js';

// FIXME! That does not fit here!
export const StandardEncodings = [
	'StandardEncoding',
	'MacRomanEncoding',
	'WinAnsiEncoding',
	'MacExpertEncoding',
	'SymbolEncoding',
	'ZapfDingbatsEncoding',
] as const;

/**
 * The pre-defined PDF encodings.
 */
export type Encoding = (typeof StandardEncodings)[number];

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
