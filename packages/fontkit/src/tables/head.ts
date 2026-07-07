import * as r from 'restructure';

export namespace headTable {
	/**
	 * Bit flags used in the `head` table macStyle field.
	 */
	export interface MacStyle {
		readonly bold: boolean;
		readonly italic: boolean;
		readonly underline: boolean;
		readonly outline: boolean;
		readonly shadow: boolean;
		readonly condensed: boolean;
		readonly extended: boolean;
	}

	/**
	 * The `head` (font header) table.
	 *
	 * Contains global font metrics and metadata required for rendering,
	 * scaling, and coordinate system interpretation.
	 *
	 * This table is required for all SFNT-based fonts.
	 */
	export interface head {
		/** 0x00010000 (version 1.0) */
		version: number;

		/** Set by font manufacturer */
		revision: number;

		/** Checksum adjustment for the entire font file */
		checkSumAdjustment: number;

		/** Magic number (0x5F0F3CF5) */
		magicNumber: number;

		/** Font flags */
		flags: number;

		/** Units per em (typically 64–16384) */
		unitsPerEm: number;

		/** Creation timestamp (2x int32: [high, low]) */
		created: [number, number];

		/** Modification timestamp (2x int32: [high, low]) */
		modified: [number, number];

		/** Bounding box minimum X for all glyphs */
		xMin: number;

		/** Bounding box minimum Y for all glyphs */
		yMin: number;

		/** Bounding box maximum X for all glyphs */
		xMax: number;

		/** Bounding box maximum Y for all glyphs */
		yMax: number;

		/** Macintosh style flags */
		macStyle: MacStyle;

		/** Smallest readable size in pixels */
		lowestRecPPEM: number;

		/** Font direction hint */
		fontDirectionHint: number;

		/** Index-to-location format (0 = short, 1 = long) */
		indexToLocFormat: number;

		/** Glyph data format (always 0 for current spec) */
		glyphDataFormat: number;
	}
}

const headStructFields = {
	version: r.int32,
	revision: r.int32,
	checkSumAdjustment: r.uint32,
	magicNumber: r.uint32,
	flags: r.uint16,
	unitsPerEm: r.uint16,
	created: new r.Array(r.int32, 2),
	modified: new r.Array(r.int32, 2),
	xMin: r.int16,
	yMin: r.int16,
	xMax: r.int16,
	yMax: r.int16,
	macStyle: new r.Bitfield(r.uint16, [
		'bold',
		'italic',
		'underline',
		'outline',
		'shadow',
		'condensed',
		'extended',
	]),
	lowestRecPPEM: r.uint16, // smallest readable size in pixels
	fontDirectionHint: r.int16,
	indexToLocFormat: r.int16, // 0 for short offsets, 1 for long
	glyphDataFormat: r.int16, // 0 for current format
};
/** @internal */
export const head = new r.Struct<typeof headStructFields, headTable.head>(
	headStructFields,
);
