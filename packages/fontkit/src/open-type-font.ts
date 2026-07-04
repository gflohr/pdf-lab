import type { BoundingBox } from './glyph/bounding-box.js';
import type { Glyph } from './glyph/glyph.js';
import type { GlyphVariationProcessor } from './glyph/glyph-variation-processor.js';
import type { SFNTFont } from './sfnt-font.js';
import type { SFNTTableMap } from './tables/directory.js';

/**
 * The list of strictly required tables for an OpenType font.
 */
export const requiredOpenTypeTables = [
	'cmap',
	'head',
	'hhea',
	'hmtx',
	'maxp',
	'name',
	'OS/2',
	'post',
] as const;

/**
 * Union type for the items in the {@link requiredOpentTypeTables} list.
 */
export type RequiredOpenTypeTableTag = (typeof requiredOpenTypeTables)[number];

/**
 * The list of strictly required tables for an OpenType font with TrueType
 * outlines.
 */
export const requiredOpenTypeTrueTypeTables = [
	'loca',
	...requiredOpenTypeTables,
] as const;

/**
 * Union type for the items in the {@link requiredOpenTypeTables} list.
 */
export type RequiredOpenTypeTrueTypeTableTag =
	(typeof requiredOpenTypeTrueTypeTables)[number];

/**
 * The list of strictly required tables for an OpenType font with PostScript
 * outlines, legacy version.
 */
export const requiredOpenTypeCFF1Tables = [
	'CFF ',
	...requiredOpenTypeTables,
] as const;

/**
 * Union type for the items in the {@link requiredOpenTypeCFF1Tables} list.
 */
export type RequiredOpenTypeCFF1TableTag =
	(typeof requiredOpenTypeCFF1Tables)[number];

/**
 * The list of strictly required tables for an OpenType font with PostScript
 * outlines, modern version.
 * @see {@link requiredOpenTypeCFF1Tables} for legacy tables
 */
export const requiredOpenTypeCFF2Tables = [
	'CFF2',
	...requiredOpenTypeTables,
] as const;

/**
 * Union type for the items in the {@link requiredOpenTypeCFF2Tables} list.
 */
export type RequiredOpenTypeCFF2TableTag =
	(typeof requiredOpenTypeCFF2Tables)[number];

export type StrictTables<T extends keyof SFNTTableMap> = {
	readonly [K in T]: NonNullable<SFNTTableMap[K]>;
};

/**
 * These are propertiesthat are guaranteed to be defined, if the font has been
 * upcast to an {@link OpenTypeFont}.
 */
export interface OpenTypeHeader {
	ascent: number;
	descent: number;
	lineGap: number;
	underlinePosition: number;
	underlineThickness: number;
	italicAngle: number;
	capHeight: number;
	numGlyphs: number;
	unitsPerEm: number;
	bbox: Readonly<BoundingBox>;
}

type OpenTypeHeaderKeys = keyof OpenTypeHeader;

/**
 * OpenType which has all 8 core tables but lacks one or more of the
 * necessary outline tables.
 *
 * @see {@link requiredOpenTypeTables} for the list of required tables.
 */
export interface OpenTypeNoOutlinesFont
	extends Omit<SFNTFont, RequiredOpenTypeTableTag | OpenTypeHeaderKeys>,
		StrictTables<RequiredOpenTypeTableTag>,
		OpenTypeHeader {
	/** Discriminator for the different outline types. */
	readonly outlines: 'none';

	readonly outlineVersion: 0;
}

/**
 * OpenType font with verified TrueType vector geometry outline components
 * (glyf + loca + hmtx).
 */
export interface OpenTypeTrueTypeFont
	extends Omit<SFNTFont, RequiredOpenTypeTrueTypeTableTag | OpenTypeHeaderKeys>,
		StrictTables<RequiredOpenTypeTrueTypeTableTag>,
		OpenTypeHeader {
	/** Discriminator for the different outline types. */
	readonly outlines: 'TrueType';

	readonly outlineVersion: 1;

	getGlyph(glyph: number, characters?: readonly number[]): Glyph;
	getBaseGlyph(glyph: number, characters?: readonly number[]): Glyph;
}

/**
 * OpenType font with verified PostScript Compact Font Format (CFF) components,
 * legacy version.
 */
export interface OpenTypeCFF1Font
	extends Omit<SFNTFont, RequiredOpenTypeCFF1TableTag | OpenTypeHeaderKeys>,
		StrictTables<RequiredOpenTypeCFF1TableTag>,
		OpenTypeHeader {
	/** Discriminator for the different outline types. */
	readonly outlines: 'PostScript';

	/** Discriminator for CFF versions */
	readonly outlineVersion: 1;

	/**
	 * Alias for the structural {@link OpenTypePostScriptFont#CFF } table.
	 */
	readonly cff: NonNullable<SFNTTableMap['CFF ']>;

	getGlyph(glyph: number, characters?: readonly number[]): Glyph;
	getBaseGlyph(glyph: number, characters?: readonly number[]): Glyph;
}

/**
 * OpenType font with verified PostScript Compact Font Format (CFF) components,
 * legacy version.
 */
export interface OpenTypeCFF2Font
	extends Omit<SFNTFont, RequiredOpenTypeCFF2TableTag | OpenTypeHeaderKeys>,
		StrictTables<RequiredOpenTypeCFF2TableTag>,
		OpenTypeHeader {
	/** Discriminator for the different outline types. */
	readonly outlines: 'PostScript';

	/** Discriminator for CFF versions */
	readonly outlineVersion: 2;

	getGlyph(glyph: number, characters?: readonly number[]): Glyph;
	getBaseGlyph(glyph: number, characters?: readonly number[]): Glyph;
}

/**
 * Discriminated union representing an OpenType font with PostScript
 * outlines.
 */
export type OpenTypePostScriptFont = OpenTypeCFF1Font | OpenTypeCFF2Font;

/**
 * The final Discriminated Union representing any upcast, structurally
 * conformant OpenType font. You will usually get an object implementing
 * the interface with {@link SFNTFont.asOpenTypeFont}.
 *
 * You can discriminate the different types in your code like this:
 *
 * ```TypeScript
 * const openTypeFont = font.asOpenTypeFont();
 *
 * if (!openTypeFont) {
 * 	// This font is a legacy font without the compete set of OpenType core
 * 	// tables.
 * } else if (openTypeFont.outlines === 'TrueType') {
 * 	// openTypeFont is now an OpenTypeTrueTypeFont in the scope of this branch.
 * 	// All tables for TrueType outlines are guaranteed to be present.
 * } else if (openTypeFont.outlines === 'PostScript') {
 *  	// openTypeFont is now an OpenTypePostScriptFont in the scope of this branch.
 * 	// All tables for PostScript outlines are guaranteed to be present.
 * } else if (openTypeFont.outlines === 'none') {
 * 	// openTypeFont is now an OpenTypeNoOutlinesFont in the scope of this
 * 	// branch. All 8 OpenType core tables are present.
 * }
 * ```
 */
export type OpenTypeFont =
	| OpenTypeTrueTypeFont
	| OpenTypePostScriptFont
	| OpenTypeNoOutlinesFont;
