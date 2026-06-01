import r from '@pdf-lib/restructure';
import { type AATLookupTable, LookupTable } from './aat.js';

export namespace opbdTable {
	export interface opbdOpticalBounds {
		left: number;
		top: number;
		right: number;
		bottom: number;
	}

	export interface opbd {
		version: number;
		format: number;
		lookupTable: AATLookupTable<opbdOpticalBounds>;
	}
}

const OpticalBounds = new r.Struct({
	left: r.int16,
	top: r.int16,
	right: r.int16,
	bottom: r.int16,
});

const opticalBoundsFields = {
	version: r.fixed32,
	format: r.uint16,
	lookupTable: LookupTable(OpticalBounds),
};
export default new r.Struct<typeof opticalBoundsFields, opbdTable.opbd>(
	opticalBoundsFields,
);
