import r from '@pdf-lib/restructure';
import { type AAT, LookupTable } from './aat.js';

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
		lookupTable: AAT.LookupTable<opbdOpticalBounds>;
	}
}

const opticalBoundsStructFields = {
	left: r.int16,
	top: r.int16,
	right: r.int16,
	bottom: r.int16,
};
const OpticalBounds = new r.Struct<
	typeof opticalBoundsStructFields,
	opbdTable.opbdOpticalBounds
>(opticalBoundsStructFields);

const opticalBoundsFields = {
	version: r.fixed32,
	format: r.uint16,
	lookupTable: LookupTable(OpticalBounds),
};
export default new r.Struct<typeof opticalBoundsFields, opbdTable.opbd>(
	opticalBoundsFields,
);
