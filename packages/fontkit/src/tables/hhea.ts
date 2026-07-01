import r from '@pdf-lib/restructure';

export namespace hheaTable {
	/**
	 * Represents the parsed header data from the OpenType Horizontal Header Table (`hhea`).
	 *
	 * This table contains high-level typographic and layout metrics used for horizontal
	 * text positioning, line spacing computations, and structural limits of the font.
	 */
	export interface hhea {
		/**
		 * The table version number. Typically `0x00010000` for version 1.0.
		 */
		version: number;

		/**
		 * The distance from the baseline to the highest ascender in the font.
		 * Usually matches the highest point of standard capital letters or accent marks.
		 */
		ascent: number;

		/**
		 * The distance from the baseline to the lowest descender in the font.
		 * Usually a negative value representing the depth of glyph elements dropping below the baseline.
		 */
		descent: number;

		/**
		 * The typographic line gap. Recommended amount of extra space to add between
		 * lines of text during layout rendering.
		 */
		lineGap: number;

		/**
		 * The maximum advance width value encountered across all glyphs within the `hmtx` table.
		 */
		advanceWidthMax: number;

		/**
		 * The minimum Left Side Bearing value encountered across all glyphs within the `hmtx` table.
		 */
		minLeftSideBearing: number;

		/**
		 * The minimum Right Side Bearing value encountered across all glyphs within the `hmtx` table.
		 */
		minRightSideBearing: number;

		/**
		 * The maximum extent value along the horizontal layout axis, calculated as:
		 * `Max(lsb + (xMax - xMin))`.
		 */
		xMaxExtent: number;

		/**
		 * The mathematical rise value used to compute the angle/slope of the caret cursor
		 * (`rise / run`). Set to `1` for purely vertical, un-slanted text cursors.
		 */
		caretSlopeRise: number;

		/**
		 * The mathematical run value used to compute the angle/slope of the caret cursor
		 * (`rise / run`). Set to `0` for purely vertical, un-slanted text cursors.
		 */
		caretSlopeRun: number;

		/**
		 * The horizontal offset displacement value for the text layout cursor.
		 * Typically set to `0` for non-slanted fonts.
		 */
		caretOffset: number;

		/**
		 * The format specification structure for the horizontal metric data.
		 * Set to `0` for current standard OpenType layouts.
		 */
		metricDataFormat: number;

		/**
		 * The total number of valid advance width records present inside the matching `hmtx` table.
		 */
		numberOfMetrics: number;
	}
}

const fields = {
	version: r.int32,
	ascent: r.int16,
	descent: r.int16,
	lineGap: r.int16,
	advanceWidthMax: r.uint16,
	minLeftSideBearing: r.int16,
	minRightSideBearing: r.int16,
	xMaxExtent: r.int16,
	caretSlopeRise: r.int16,
	caretSlopeRun: r.int16,
	caretOffset: r.int16,
	reserved: new r.Reserved(r.int16, 4),
	metricDataFormat: r.int16,
	numberOfMetrics: r.uint16,
};

/** @internal */
export const hhea = new r.Struct<typeof fields, hheaTable.hhea>(fields);
