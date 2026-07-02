import type { SFNTFont } from '../sfnt-font';
import type { morxTable } from '../tables';

/**
 * Represents an SFNT font containing Apple Advanced Typography (AAT) layout
 * extensions.
 *
 * AAT fonts utilise state machines inside specialized tables (like
 * {@link morxTable.morx | morx}) to handle glyph substitution, contextual
 * tracking, and text reordering, primarily on Apple platforms.
 */
export interface AATFont extends SFNTFont {
	/**
	 * The Extended Glyph Metamorphosis (`morx`) table.
	 *
	 * Responsible for processing contextual glyph substitutions,
	 * transformations, and positioning instructions via operational layout
	 * state tables.
	 */
	morx: morxTable.morx;
}
