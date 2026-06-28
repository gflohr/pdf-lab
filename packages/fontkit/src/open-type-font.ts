import type { NullFont } from './null-font.js';
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

export type RequiredOpenTypeTableTag = (typeof requiredOpenTypeTables)[number];

/**
 * The list of strictly required tables for an OpenType font with TrueType
 * outlines.
 */
export const requiredOpenTypeTrueTypeTables = [
	'glyf',
	'loca',
	...requiredOpenTypeTables,
] as const;

export type RequiredOpenTypeTrueTypeTableTag =
	(typeof requiredOpenTypeTrueTypeTables)[number];

/**
 * The list of strictly required tables for an OpenType font with PostScript
 * outlines.
 */
export const requiredOpenTypePostScriptTables = [
	'CFF ',
	...requiredOpenTypeTables,
] as const;

export type RequiredOpenTypePostScriptTableTag =
	(typeof requiredOpenTypePostScriptTables)[number];

type StrictTables<T extends keyof SFNTTableMap> = {
	readonly [K in T]: NonNullable<SFNTTableMap[K]>;
};

/**
 * An OpenTypeNoOutlinesFont extends {@link NullFont} by marking the core 8
 * baseline tables as non-nullable, guaranteeing they are present in the font
 * dictionary.
 *
 * The required tables are:
 *
 * - cmap
 * - head
 * - hhea
 * - hmtx
 * - maxp
 * - name
 * - OS/2
 * - post
 */
/**
 * Utility helper to mark a picked set of tables as strictly Required and Readonly.
 */
export interface OpenTypeNoOutlinesFont
	extends Omit<NullFont, RequiredOpenTypeTableTag>,
		StrictTables<RequiredOpenTypeTableTag> {
	/** Discriminator for the different outline types. */
	readonly outlines: 'none';
}

/**
 * OpenType font with verified TrueType vector geometry outline components (glyf + loca).
 */
export interface OpenTypeTrueTypeFont
	extends Omit<NullFont, RequiredOpenTypeTrueTypeTableTag>,
		StrictTables<RequiredOpenTypeTrueTypeTableTag> {
	/** Discriminator for the different outline types. */
	readonly outlines: 'TrueType';
}

/**
 * OpenType font with verified PostScript Compact Font Format (CFF) components.
 */
export interface OpenTypePostScriptFont
	extends Omit<NullFont, RequiredOpenTypePostScriptTableTag>,
		StrictTables<RequiredOpenTypePostScriptTableTag> {
	/** Discriminator for the different outline types. */
	readonly outlines: 'PostScript';

	/**
	 * Alias for the structural {@link OpenTypePostScriptFont#CFF } table.
	 */
	readonly cff: NonNullable<SFNTTableMap['CFF ']>;
}

/**
 * The final Discriminated Union representing any upcast, structurally
 * conformant OpenType font. You will usually get an object implementing
 * the interface with {@link NullFont.asOpenTypeFont}.
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
