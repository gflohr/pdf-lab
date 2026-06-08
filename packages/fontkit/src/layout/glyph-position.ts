/**
 * Represents positioning information for a glyph in a GlyphRun.
 */
export default class GlyphPosition {
	/**
	 * Create a position.
	 *
	 * @param xAdvance the amount to move the virtual pen in the X direction after rendering this glyph.
	 * @param yAdvance the amount to move the virtual pen in the Y direction after rendering this glyph.
	 * @param xOffset the offset from the pen position in the X direction at which to render this glyph.
	 * @param yOffset the offset from the pen position in the y direction at which to render this glyph.
	 */
	constructor(
		public xAdvance = 0,
		public yAdvance = 0,
		public xOffset = 0,
		public yOffset = 0,
	) {}
}
