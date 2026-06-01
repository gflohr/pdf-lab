import r from '@pdf-lib/restructure';

export namespace SFNTTable {
	export interface VORGVerticalOrigin {
		glyphIndex: number;
		vertOriginY: number;
	}

	export interface VORG {
		majorVersion: number;
		minorVersion: number;
		defaultVertOriginY: number;
		numVertOriginYMetrics: number;
		metrics: VORGVerticalOrigin[];
	}
}

const verticalOriginFields = {
	glyphIndex: r.uint16,
	vertOriginY: r.int16,
};
const VerticalOriginStruct = new r.Struct<
	typeof verticalOriginFields,
	SFNTTable.VORGVerticalOrigin
>(verticalOriginFields);

const VORGFields = {
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	defaultVertOriginY: r.int16,
	numVertOriginYMetrics: r.uint16,
	metrics: new r.Array(VerticalOriginStruct, 'numVertOriginYMetrics'),
};

const VORGStruct = new r.Struct<typeof VORGFields, SFNTTable.VORG>(VORGFields);

export default VORGStruct;
