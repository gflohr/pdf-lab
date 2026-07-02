import type { StrictTables } from '../open-type-font';
import type { SFNTFont } from '../sfnt-font';
import type { morxTable } from '../tables';

/**
 * Minimal operational capability needed Apple Advanced Typography (AAT).
 */
export const requiredAATTables = ['morx'] as const;

/**
 * Union type for the items in the {@link requiredAATTables} list.
 */
export type RequiredAATTableTag =
	(typeof requiredAATTables)[number];

/**
 * TrueType font with verified AAT capabilities.
 *
 * @see {@link RequiredAATTableTag}
 * @see {@link requiredAATTabes}
 */
/**
 * Represents an SFNT font containing Apple Advanced Typography (AAT) layout
 * extensions.
 *
 * AAT fonts utilise state machines inside specialized tables (like
 * {@link morxTable.morx | morx}) to handle glyph substitution, contextual
 * tracking, and text reordering, primarily on Apple platforms.
 */
export interface AATFont
	extends Omit<SFNTFont, RequiredAATTableTag>,
		StrictTables<RequiredAATTableTag> {}
