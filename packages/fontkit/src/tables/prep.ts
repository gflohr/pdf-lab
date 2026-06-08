import r from '@pdf-lib/restructure';

/**
 * The set of instructions executed whenever the point size or font
 * transformation change.\
 */
export namespace prepTable {
	export interface prep {
		controlValueProgram: number[];
	}
}

const prepStructFields = {
	controlValueProgram: new r.Array(r.uint8),
};
export default new r.Struct<typeof prepStructFields, prepTable.prep>(
	prepStructFields,
);
