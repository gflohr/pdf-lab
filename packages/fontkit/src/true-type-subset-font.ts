import type { Glyph } from './glyph';
import type { StrictTables } from './open-type-font';
import type { SFNTFont } from './sfnt-font';

/**
 * NEW: Minimal operational capability needed to instantiate and run a TTFGlyph.
 * Overrides glyph accessor methods to promise non-null returns.
 */
export const requiredTrueTypeSubsetTables = ['glyf', 'loca', 'hmtx'] as const;

/**
 * Union type for the items in the {@link requiredOpenTypeTables} list.
 */
export type RequiredTrueTypeSubsetTableTag =
	(typeof requiredTrueTypeSubsetTables)[number];

/**
 * TrueType font with verified vector geometry outline components
 * (glyf + loca).
 */
export interface TrueTypeSubsetFont
	extends Omit<SFNTFont, RequiredTrueTypeSubsetTableTag>,
		StrictTables<RequiredTrueTypeSubsetTableTag> {
	getGlyph(glyph: number, characters?: readonly number[]): Glyph;
	getBaseGlyph(glyph: number, characters?: readonly number[]): Glyph;
}
