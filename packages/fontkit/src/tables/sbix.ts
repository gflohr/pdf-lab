import r from '@pdf-lib/restructure';

export interface SBIXImageTableType {
	ppem: number;
	resolution: number;
	imageOffsets: number[];
}

const imageTableFields = {
	ppem: r.uint16,
	resolution: r.uint16,
	imageOffsets: new r.Array(
		new r.Pointer(r.uint32, 'void'),
		(t) => t.parent.parent.maxp.numGlyphs + 1,
	),
};
const ImageTable = new r.Struct<typeof imageTableFields, SBIXImageTableType>(
	imageTableFields,
);

export interface SBIXFlagsType {
	renderOutlines: boolean;
}
interface SBIXType {
	version: number;
	flags: SBIXFlagsType;
	numImgTables: number;
	imageTables: SBIXImageTableType[];
}

const sbixFields = {
	version: r.uint16,
	flags: new r.Bitfield(r.uint16, ['renderOutlines']),
	numImgTables: r.uint32,
	imageTables: new r.Array(new r.Pointer(r.uint32, ImageTable), 'numImgTables'),
};

// This is the Apple sbix table, used by the "Apple Color Emoji" font.
// It includes several image tables with images for each bitmap glyph
// of several different sizes.
export default new r.Struct<typeof sbixFields, SBIXType>(sbixFields);
