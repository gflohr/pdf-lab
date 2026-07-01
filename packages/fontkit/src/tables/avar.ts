import r from '@pdf-lib/restructure';

export namespace avarTable {
	export interface Correspondence {
		fromCoord: number;
		toCoord: number;
	}

	export interface Segment {
		pairCount: number;
		correspondence: Correspondence[];
	}

	export interface avar {
		version: number;
		axisCount: number;
		segment: Segment[];
	}
}

const shortFrac = new r.Fixed(16, 'BE', 14);

const correspondenceFields = {
	fromCoord: shortFrac,
	toCoord: shortFrac,
};
const Correspondence = new r.Struct<
	typeof correspondenceFields,
	avarTable.Correspondence
>(correspondenceFields);

const segmentFields = {
	pairCount: r.uint16,
	correspondence: new r.Array(Correspondence, 'pairCount'),
};
const Segment = new r.Struct<typeof segmentFields, avarTable.Segment>(
	segmentFields,
);

const avarStructFields = {
	version: r.fixed32,
	axisCount: r.uint32,
	segment: new r.Array(Segment, 'axisCount'),
};
/** @internal */
export const avar = new r.Struct<typeof avarStructFields, avarTable.avar>(
	avarStructFields,
);
