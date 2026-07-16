import * as r from 'restructure';

export namespace CPALTable {
	export interface ColorRecord {
		blue: number;
		green: number;
		red: number;
		alpha: number;
	}

	export interface CPALHeader {
		numPaletteEntries: number;
		numPalettes: number;
		numColorRecords: number;
		colorRecords: ColorRecord[];
		colorRecordIndices: number[];
	}

	export interface CPALV0 extends CPALHeader {
		version: 0;
	}

	export interface CPALV1 extends CPALHeader {
		version: 1;
		offsetPaletteTypeArray: number[];
		offsetPaletteLabelArray: number[];
		offsetPaletteEntryLabelArray: number[];
	}

	export type CPAL = CPALV0 | CPALV1;
}

const colorRecordFields = {
	blue: r.uint8,
	green: r.uint8,
	red: r.uint8,
	alpha: r.uint8,
};
const colorRecord = new r.Struct<CPALTable.ColorRecord>(colorRecordFields);

const cpalStructFields = {
	header: {
		numPaletteEntries: r.uint16,
		numPalettes: r.uint16,
		numColorRecords: r.uint16,
		colorRecords: new r.Pointer(
			r.uint32,
			new r.Array(colorRecord, 'numColorRecords'),
		),
		colorRecordIndices: new r.Array(r.uint16, 'numPalettes'),
	},
	0: {},
	1: {
		offsetPaletteTypeArray: new r.Pointer(
			r.uint32,
			new r.Array(r.uint32, 'numPalettes'),
		),
		offsetPaletteLabelArray: new r.Pointer(
			r.uint32,
			new r.Array(r.uint16, 'numPalettes'),
		),
		offsetPaletteEntryLabelArray: new r.Pointer(
			r.uint32,
			new r.Array(r.uint16, 'numPaletteEntries'),
		),
	},
};
/** @internal */
export const CPAL = new r.VersionedStruct<
	CPALTable.CPAL
>(r.uint16, cpalStructFields);
