import r from '@pdf-lib/restructure';

export namespace gaspTable {
	export interface Range {
		/** Upper limit of range, in ppem. */
		rangeMaxPPEM: number;
		/** Flags describing raterizer behaviour. */
		ragenGaspBehavior: {
			grayscale: boolean;
			gridfit: boolean;
			symmetricSmooting: boolean;
			/** Only in version 1, for ClearType. */
			symmetricGridFit: boolean;
		};
	}

	export interface gasp {
		version: number;
		numRanges: number;
		gaspRanges: Range[];
	}
}

const gaspFields = {
	rangeMaxPPEM: r.uint16, // Upper limit of range, in ppem
	rangeGaspBehavior: new r.Bitfield(r.uint16, [
		// Flags describing desired rasterizer behaviour.
		'grayscale',
		'gridfit',
		'symmetricSmoothing',
		'symmetricGridfit', // only in version 1, for ClearType
	]),
};
const gaspRange = new r.Struct<typeof gaspFields, gaspTable.Range>(gaspFields);

const gaspStructFields = {
	version: r.uint16, // set to 0
	numRanges: r.uint16,
	gaspRanges: new r.Array(gaspRange, 'numRanges'), // Sorted by ppem
};
export default new r.Struct(gaspStructFields);
