import r from '@pdf-lib/restructure';

export namespace avarTable {
	export interface avarCorrespondence {
		fromCoord: number;
		toCoord: number;
	}

	export interface avarSegment {
		pairCount: number;
		correspondence: avarCorrespondence[],
	}

	export interface avar {
		version: number;
		axisCount: number;
		segment: avarSegment[];
	}
}

const shortFrac = new r.Fixed(16, 'BE', 14);

const correspondenceFields = {
	fromCoord: shortFrac,
	toCoord: shortFrac,
}
const Correspondence = new r.Struct<typeof correspondenceFields, avarTable.avarCorrespondence>(correspondenceFields);

const segmentFields = {
	pairCount: r.uint16,
	correspondence: new r.Array(Correspondence, 'pairCount'),
};
const Segment = new r.Struct<typeof segmentFields, avarTable.avarSegment>(segmentFields);

const avarStructFields = {
	version: r.fixed32,
	axisCount: r.uint32,
	segment: new r.Array(Segment, 'axisCount'),
}
export default new r.Struct<typeof avarStructFields, avarTable.avar>(avarStructFields);
