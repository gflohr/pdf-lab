import r from '@pdf-lib/restructure';

export namespace VORGTable {
	export interface VerticalOrigin {
		glyphIndex: number;
		vertOriginY: number;
	}

	export interface VORG {
		majorVersion: number;
		minorVersion: number;
		defaultVertOriginY: number;
		numVertOriginYMetrics: number;
		metrics: VerticalOrigin[];
	}
}

const verticalOriginFields = {
	glyphIndex: r.uint16,
	vertOriginY: r.int16,
};
const VerticalOriginStruct = new r.Struct<
	typeof verticalOriginFields,
	VORGTable.VerticalOrigin
>(verticalOriginFields);

const VORGFields = {
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	defaultVertOriginY: r.int16,
	numVertOriginYMetrics: r.uint16,
	metrics: new r.Array(VerticalOriginStruct, 'numVertOriginYMetrics'),
};

export const VORG = new r.Struct<typeof VORGFields, VORGTable.VORG>(VORGFields);
