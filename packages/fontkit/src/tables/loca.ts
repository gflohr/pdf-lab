import r from '@pdf-lib/restructure';

export namespace locaTable {
	export interface locaV0 {
		version: 0;
		offsets: number[];
	}

	export interface locaV1 {
		version: 1;
		offsets: number[];
	}

	/**
	 * Version 0 of the loca table has 16-bit offsets, version 1 has 32-bit
	 * offsets. It is expected that the offsets are sorted.
	 */
	export type loca = locaV0 | locaV1;
}

const locaFields = {
	0: {
		offsets: new r.Array(r.uint16),
	},
	1: {
		offsets: new r.Array(r.uint32),
	},
};
export const loca = new r.VersionedStruct<typeof locaFields, locaTable.loca>(
	'head.indexToLocFormat',
	locaFields,
);

loca.process = function () {
	if (this.version === 0) {
		for (let i = 0; i < this.offsets.length; i++) {
			this.offsets[i] <<= 1;
		}
	}
};

loca.preEncode = function () {
	if (this.version != null) return;

	// Assume this.offsets is a sorted array.
	this.version = this.offsets[this.offsets.length - 1] > 0xffff ? 1 : 0;

	if (this.version === 0) {
		for (let i = 0; i < this.offsets.length; i++) {
			this.offsets[i] >>>= 1;
		}
	}
};
