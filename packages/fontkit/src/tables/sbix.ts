import r from 'restructure';

export namespace sbixTable {
	export interface Flags {
		renderOutlines: boolean;
	}

	export interface ImageTable {
		ppem: number;
		resolution: number;
		imageOffsets: number[];
	}

	/**
	 * This is the Apple sbix table, used by the "Apple Color Emoji" font.
	 * It includes several image tables with images for each bitmap glyph
	 * of several different sizes.
	 */
	export interface sbix {
		version: number;
		flags: Flags;
		numImgTables: number;
		imageTables: ImageTable[];
	}
}

const imageTableFields = {
	ppem: r.uint16,
	resolution: r.uint16,
	imageOffsets: new r.Array(
		new r.Pointer(r.uint32, 'void'),
		(t) => t.parent.parent.maxp.numGlyphs + 1,
	),
};
const ImageTable = new r.Struct<typeof imageTableFields, sbixTable.ImageTable>(
	imageTableFields,
);

const sbixFields = {
	version: r.uint16,
	flags: new r.Bitfield(r.uint16, ['renderOutlines']),
	numImgTables: r.uint32,
	imageTables: new r.Array(new r.Pointer(r.uint32, ImageTable), 'numImgTables'),
};

/** @internal */
export const sbix = new r.Struct<typeof sbixFields, sbixTable.sbix>(sbixFields);
