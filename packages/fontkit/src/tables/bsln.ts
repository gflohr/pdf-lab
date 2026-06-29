import r from '@pdf-lib/restructure';
import { type AAT, aatLookupTable } from './aat.js';

export namespace bslnTable {
	/** Distance-based, no mapping. */
	export interface SubtableFormat0 {
		format: 0;
		deltas: number[];
	}

	/** Distance-based, with mapping. */
	export interface SubtableFormat1 {
		format: 1;
		deltas: number[];
		mappingData: AAT.LookupTable<number>;
	}

	/** Control point-based, no mapping. */
	export interface SubtableFormat2 {
		format: 2;
		standardGlyph: number;
		controlPoints: number[];
	}

	/** Control point-based, with mapping. */
	export interface SubtableFormat3 {
		format: 3;
		standardGlyph: number;
		controlPoints: number[];
		mappingData: AAT.LookupTable<number>;
	}

	export type Subtable =
		| SubtableFormat0
		| SubtableFormat1
		| SubtableFormat2
		| SubtableFormat3;

	export interface bsln {
		version: number;
		format: number;
		defaultBaseline: number;
		subtable: Subtable;
	}
}

const bslnSubtableFields = {
	0: {
		// Distance-based, no mapping
		deltas: new r.Array(r.int16, 32),
	},

	1: {
		// Distance-based, with mapping
		deltas: new r.Array(r.int16, 32),
		mappingData: aatLookupTable(r.uint16),
	},

	2: {
		// Control point-based, no mapping
		standardGlyph: r.uint16,
		controlPoints: new r.Array(r.uint16, 32),
	},

	3: {
		// Control point-based, with mapping
		standardGlyph: r.uint16,
		controlPoints: new r.Array(r.uint16, 32),
		mappingData: aatLookupTable(r.uint16),
	},
};
const bslnSubtable = new r.VersionedStruct<
	typeof bslnSubtableFields,
	bslnTable.Subtable
>('format', bslnSubtableFields);

const bslnStructFields = {
	version: r.fixed32,
	format: r.uint16,
	defaultBaseline: r.uint16,
	subtable: bslnSubtable,
};
export const bsln = new r.Struct<typeof bslnStructFields, bslnTable.bsln>(
	bslnStructFields,
);
