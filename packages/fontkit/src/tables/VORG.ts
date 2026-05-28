import r from '@pdf-lib/restructure';

export interface VerticalOrigin {
	glyphIndex: number;
	vertOriginY: number;
}
const verticalOriginFields = {
	glyphIndex: r.uint16,
	vertOriginY: r.int16,
};
const VerticalOriginStruct = new r.Struct<
	typeof verticalOriginFields,
	VerticalOrigin
>(verticalOriginFields);

export interface VORGTable {
	majorVersion: number;
	minorVersion: number;
	defaultVertOriginY: number;
	numVertOriginYMetrics: number;
	metrics: VerticalOrigin[];
}
const vorgFields = {
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	defaultVertOriginY: r.int16,
	numVertOriginYMetrics: r.uint16,
	metrics: new r.Array(VerticalOriginStruct, 'numVertOriginYMetrics'),
};
export default new r.Struct<typeof vorgFields, VORGTable>(vorgFields);
