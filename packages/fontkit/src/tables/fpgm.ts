import r from '@pdf-lib/restructure';

export namespace fpgmTable {
	/**
	 * A list of instructions that are executed once when a font is first used.
	 * These instructions are known as the font program. The main use of this
	 * table is for the definition of functions that are used in many different
	 * glyph programs.
	 */
	export interface fpgm {
		instructions: number[];
	}
}

const fpgmStructFields = {
	instructions: new r.Array(r.uint8),
};
export default new r.Struct<typeof fpgmStructFields, fpgmTable.fpgm>(
	fpgmStructFields,
);
