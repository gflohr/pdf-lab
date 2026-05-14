/**
 * The horizontal header table.
 */
export interface HheaTable {
	version: number /** The version. */;
	ascent: number /** The distance from baseline of highest ascender. */;
	descent: number /** The distance from baseline of lowest descender. */;
	lineGap: number /** the typographic line gap. */;
	advanceWidthMax: number /** The maximum advance width value in 'hmtx' table. */;
	minLeftSideBearing: number /** The minimum left sidebearing value. */
	minRightSideBearing: number /** The minimum right sidebearing value. */;

	/**
	 * The maximum horizontal extent of any glyph in the font.
	 * Used for fast text layout and bounding box estimation.
	 */
	xMaxExtent: number;
	caretSlopeRise: number /** Used to calculate the slope of the cursor (rise/run) 1 for vertical. */;
	caretSlopeRun: number /** 0 for vertical. */;
	caretOffset: number /** Set to 0 for non-slanted fonts. */;
	reserved: number[];
	metricDataFormat: number /** 0 for current format. */;
	numberOfMetrics: number /** Number of advance widths in 'hmtx' table. */;
}
