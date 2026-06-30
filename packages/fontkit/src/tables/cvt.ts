import r from '@pdf-lib/restructure';

export namespace cvtTable {
	/** An array of predefined values accessible by instructions. */
	export interface cvt {
		controlValues: number[];
	}
}

const cvtStructFields = {
	controlValues: new r.Array(r.int16),
};
/** @internal */
export const cvt = new r.Struct<typeof cvtStructFields, cvtTable.cvt>(
	cvtStructFields,
);
