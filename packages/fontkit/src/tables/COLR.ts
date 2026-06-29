import r from '@pdf-lib/restructure';

export namespace COLRTable {
	export interface LayerRecordType {
		/**
		 * Glyph ID of layer glyph (must be in z-order from bottom to top).
		 */
		gid: number;

		/**
		 * Index value to use in the appropriate palette. This value must
		 * be less than numPaletteEntries in the CPAL table, except for
		 * the special case noted below. Each palette entry is 16 bits.
		 * A palette index of 0xFFFF is a special case indicating that
		 * the text foreground color should be used.
		 */
		paletteIndex: number;
	}

	export interface BaseGlyphRecord {
		/**
		 * Glyph ID of reference glyph. This glyph is for reference only
		 * and is not rendered for color.
		 */
		gid: number;

		/**
		 * Index (from beginning of the Layer Records) to the layer record.
		 */
		firstLayerIndex: number;

		/**
		 * There will be numLayers consecutive entries for this base glyph.
		 */
		numLayers: number;
	}

	/**
	 * Represents the OpenType COLR (Color Table) header data.
	 */
	export interface COLR {
		/**
		 * Table version number (typically 0).
		 */
		version: number;

		/**
		 * Number of Base Glyph Records.
		 */
		numBaseGlyphRecords: number;

		/**
		 * Array of Base Glyph Records, sorted by glyph ID.
		 */
		baseGlyphRecord: BaseGlyphRecord[];

		/**
		 * Lazy-loaded array of Layer Records.
		 *
		 * @returns the layer records
		 */
		layerRecords: COLRTable.LayerRecordType[];

		/**
		 * Number of layer recods.
		 */
		numLayerRecords: number;
	}
}

const layerRecordFields = {
	gid: r.uint16,
	paletteIndex: r.uint16,
};
const layerRecord = new r.Struct<
	typeof layerRecordFields,
	COLRTable.LayerRecordType
>(layerRecordFields);

const baseGlyphRecordFields = {
	gid: r.uint16,
	firstLayerIndex: r.uint16,
	numLayers: r.uint16,
};
const baseGlyphRecord = new r.Struct<
	typeof baseGlyphRecordFields,
	COLRTable.BaseGlyphRecord
>(baseGlyphRecordFields);

const colrStructFields = {
	version: r.uint16,
	numBaseGlyphRecords: r.uint16,
	baseGlyphRecord: new r.Pointer(
		r.uint32,
		new r.Array(baseGlyphRecord, 'numBaseGlyphRecords'),
	),
	layerRecords: new r.Pointer(
		r.uint32,
		new r.Array(layerRecord, 'numLayerRecords'),
		{ lazy: true },
	),
	numLayerRecords: r.uint16,
};

export const COLR = new r.Struct<typeof colrStructFields, COLRTable.COLR>(
	colrStructFields,
);
