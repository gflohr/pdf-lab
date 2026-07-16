import * as r from 'restructure';

export namespace LTSHTable {
	/**
	 * Linear Threshold table
	 * Records the ppem for each glyph at which the scaling becomes linear
	 * again, despite instructions affecting the advance width.
	 */
	export interface LTSH {
		version: number;
		numGlyphs: number;
		yPels: number[];
	}
}

const ltshFields = {
	version: r.uint16,
	numGlyphs: r.uint16,
	yPels: new r.Array(r.uint8, 'numGlyphs'),
};
/** @internal */
export const LTSH = new r.Struct<LTSHTable.LTSH>(ltshFields);
