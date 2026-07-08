import * as r from 'restructure';

export namespace maxpTable {
	/** Maximum profile. */
	export interface maxp {
		version: number;

		/** The number of glyphs in the font. */
		numGlyphs: number;

		/** Maximum points in a non-composite glyph. */
		maxPoints: number;

		/** Maximum contours in a non-composite glyph. */
		maxContours: number;

		/** Maximum points in a composite glyph. */
		maxComponentPoints: number;

		/** Maximum contours in a composite glyph. */
		maxComponentContours: number;

		/** 1 if instructions do not use the twilight zone, 2 otherwise. */
		maxZones: number;

		/** Maximum points used in Z0. */
		maxTwilightPoints: number;

		/** Number of Storage Area locations. */
		maxStorage: number;

		/** Number of FDEFs. */
		maxFunctionDefs: number;

		/** Number of IDEFs. */
		maxInstructionDefs: number;

		/** Maximum stack depth. */
		maxStackElements: number;

		/** Maximum byte count for glyph instructions. */
		maxSizeOfInstructions: number;

		/**
		 * Maximum number of components referenced at “top level” for any
		 * composite glyph.
		 */
		maxComponentElements: number;

		/** Maximum levels of recursion; 1 for simple components. */
		maxComponentDepth: number;
	}
}

const maxpFields = {
	version: r.int32,
	numGlyphs: r.uint16,
	maxPoints: r.uint16,
	maxContours: r.uint16,
	maxComponentPoints: r.uint16,
	maxComponentContours: r.uint16,
	maxZones: r.uint16,
	maxTwilightPoints: r.uint16,
	maxStorage: r.uint16,
	maxFunctionDefs: r.uint16,
	maxInstructionDefs: r.uint16,
	maxStackElements: r.uint16,
	maxSizeOfInstructions: r.uint16,
	maxComponentElements: r.uint16,
	maxComponentDepth: r.uint16,
};
/** @internal */
export const maxp = new r.Struct<typeof maxpFields, maxpTable.maxp>(maxpFields);
