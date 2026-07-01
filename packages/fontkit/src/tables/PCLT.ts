import r from '@pdf-lib/restructure';

export namespace PCLTTable {
	export interface PCLT {
		version: number;
		fontNumber: number;
		pitch: number;
		xHeight: number;
		style: number;
		typeFamily: number;
		capHeight: number;
		symbolSet: number;
		typeface: string;
		characterComplement: string;
		fileName: string;
		strokeWeight: string;
		widthType: string;
		serifStyle: number;
	}
}

// PCL 5 Table
// NOTE: The PCLT table is strongly discouraged for OpenType fonts with TrueType outlines
const pcltFields = {
	version: r.uint16,
	fontNumber: r.uint32,
	pitch: r.uint16,
	xHeight: r.uint16,
	style: r.uint16,
	typeFamily: r.uint16,
	capHeight: r.uint16,
	symbolSet: r.uint16,
	typeface: new r.String(16),
	characterComplement: new r.String(8),
	fileName: new r.String(6),
	strokeWeight: new r.String(1),
	widthType: new r.String(1),
	serifStyle: r.uint8,
	reserved: new r.Reserved(r.uint8),
};
/** @internal */
export const PCLT = new r.Struct<typeof pcltFields, PCLTTable.PCLT>(pcltFields);
