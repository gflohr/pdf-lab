import r from '@pdf-lib/restructure';
import { type OpenType, openTypeDevice } from './opentype.js';
import { itemVariationStore, type OpenTypeVariation } from './variations.js';

export namespace BASETable {
	/** Design units only. */
	export interface CoordV1 {
		version: 1;
		/** X or Y value, in design units. */
		coordinate: number;
	}

	/** Design units plus contour point. */
	export interface CoordV2 {
		version: 2;

		/** X or Y value, in design units. */
		coordinate: number;

		/** GlyphID of control glyph. */
		referenceGlyph: number;

		/** Index of contour point on the referenceGlyph. */
		baseCoordPoint: number;
	}

	/** Design units plus Device table. */
	export interface CoordV3 {
		version: 3;

		/** X or Y value, in design units. */
		coordinate: number;

		/** Device table for X or Y value. */
		deviceTable: OpenType.Device;
	}

	export type Coord = CoordV1 | CoordV2 | CoordV3;

	export interface Values {
		/**
		 * Index of default baseline for this script-same index in the
		 * BaseTagList.
		 */
		defaultIndex: number;
		baseCoordCount: number;
		baseCoords: Coord[];
	}

	export interface FeatMinMaxRecord {
		/**
		 * 4-byte feature identification tag-must match FeatureTag in
		 * FeatureList.
		 */
		tag: string;
		minCoord: Coord | null;
		maxCoord: Coord | null;
	}

	export interface MinMax {
		minCoord: Coord | null;
		maxCoord: Coord | null;
		/** May be 0. */
		featMinMaxCount: number;

		/** In alphabetical order. */
		featMinMaxRecords: FeatMinMaxRecord[];
	}

	export interface LangSysRecord {
		/** 4-byte language system identification tag. */
		tag: string;
		minMax: MinMax;
	}

	export interface Script {
		baseValues: Values | null;
		defaultMinMax: MinMax | null;

		/** May be 0. */
		baseLangSysCount: number;

		/** In alphabetical order. */
		baseLangSysRecords: LangSysRecord[];
	}

	export interface ScriptRecord {
		/** 4-byte script identification tag. */
		tag: string;
		script: Script;
	}

	export interface Axis {
		baseTagList: string[] | null;
		baseScriptList: ScriptRecord[];
	}

	export interface BASEHeader {
		horizAxis: number | null;
		vertAxis: number | null;
	}

	export interface BASEV1_0 extends BASEHeader {
		version: 1.0;
	}

	export interface BASEV1_1 extends BASEHeader {
		version: 1.1;
		itemVariationStore: OpenTypeVariation.ItemVariationStore;
	}

	export type BASE = BASEV1_0 | BASEV1_1;
}

const baseCoordFields = {
	1: {
		// Design units only
		coordinate: r.int16, // X or Y value, in design units
	},

	2: {
		// Design units plus contour point
		coordinate: r.int16, // X or Y value, in design units
		referenceGlyph: r.uint16, // GlyphID of control glyph
		baseCoordPoint: r.uint16, // Index of contour point on the referenceGlyph
	},

	3: {
		// Design units plus Device table
		coordinate: r.int16, // X or Y value, in design units
		deviceTable: new r.Pointer(r.uint16, openTypeDevice), // Device table for X or Y value
	},
};
const baseCoord = new r.VersionedStruct<
	typeof baseCoordFields,
	BASETable.Coord
>(r.uint16, baseCoordFields);

const baseValuesFields = {
	defaultIndex: r.uint16, // Index of default baseline for this script-same index in the BaseTagList
	baseCoordCount: r.uint16,
	baseCoords: new r.Array(new r.Pointer(r.uint16, baseCoord), 'baseCoordCount'),
};
const baseValues = new r.Struct<typeof baseValuesFields, BASETable.Values>(
	baseValuesFields,
);

const featMinMaxRecordFields = {
	tag: new r.String(4), // 4-byte feature identification tag-must match FeatureTag in FeatureList
	minCoord: new r.Pointer(r.uint16, baseCoord, { type: 'parent' }), // May be NULL
	maxCoord: new r.Pointer(r.uint16, baseCoord, { type: 'parent' }), // May be NULL
};
const featMinMaxRecord = new r.Struct<
	typeof featMinMaxRecordFields,
	BASETable.FeatMinMaxRecord
>(featMinMaxRecordFields);

const minMaxFields = {
	minCoord: new r.Pointer(r.uint16, baseCoord), // May be NULL
	maxCoord: new r.Pointer(r.uint16, baseCoord), // May be NULL
	featMinMaxCount: r.uint16, // May be 0
	featMinMaxRecords: new r.Array(featMinMaxRecord, 'featMinMaxCount'), // In alphabetical order
};
const minMax = new r.Struct<typeof minMaxFields, BASETable.MinMax>(
	minMaxFields,
);

const baseLangSysRecordFields = {
	tag: new r.String(4), // 4-byte language system identification tag
	minMax: new r.Pointer(r.uint16, minMax, { type: 'parent' }),
};
const baseLangSysRecord = new r.Struct<
	typeof baseLangSysRecordFields,
	BASETable.LangSysRecord
>(baseLangSysRecordFields);

const baseScriptFields = {
	baseValues: new r.Pointer(r.uint16, baseValues), // May be NULL
	defaultMinMax: new r.Pointer(r.uint16, minMax), // May be NULL
	baseLangSysCount: r.uint16, // May be 0
	baseLangSysRecords: new r.Array(baseLangSysRecord, 'baseLangSysCount'), // in alphabetical order by BaseLangSysTag
};
const baseScript = new r.Struct<typeof baseScriptFields, BASETable.Script>(
	baseScriptFields,
);

const baseScriptRecordFields = {
	tag: new r.String(4), // 4-byte script identification tag
	script: new r.Pointer(r.uint16, baseScript, { type: 'parent' }),
};
const baseScriptRecord = new r.Struct<
	typeof baseScriptRecordFields,
	BASETable.ScriptRecord
>(baseScriptRecordFields);

const baseScriptList = new r.Array(baseScriptRecord, r.uint16);

// Array of 4-byte baseline identification tags-must be in alphabetical order
const baseTagList = new r.Array(new r.String(4), r.uint16);

const axisFields = {
	baseTagList: new r.Pointer(r.uint16, baseTagList), // May be NULL
	baseScriptList: new r.Pointer(r.uint16, baseScriptList),
};
const axis = new r.Struct<typeof axisFields, BASETable.Axis>(axisFields);

const baseStructFields = {
	header: {
		horizAxis: new r.Pointer(r.uint16, axis), // May be NULL
		vertAxis: new r.Pointer(r.uint16, axis), // May be NULL
	},

	65536: {},
	65537: {
		itemVariationStore: new r.Pointer(r.uint32, itemVariationStore),
	},
};
/** @internal */
export const BASE = new r.VersionedStruct<
	typeof baseStructFields,
	BASETable.BASE
>(r.uint32, baseStructFields);
