import r from '@pdf-lib/restructure';
import { Feature, type OpenTypeFeatureTable } from './opentype.js';

// ==========================================
// Domain 1: Variation Store Interfaces
// ==========================================

export interface OpenTypeRegionAxisCoordinates {
	startCoord: number;
	peakCoord: number;
	endCoord: number;
}

export interface OpenTypeVariationRegionList {
	axisCount: number;
	regionCount: number;
	variationRegions: OpenTypeRegionAxisCoordinates[][];
}

export interface OpenTypeDeltaSet {
	shortDeltas: number[];
	regionDeltas: number[];
	deltas: number[];
}

export interface OpenTypeItemVariationData {
	itemCount: number;
	shortDeltaCount: number;
	regionIndexCount: number;
	regionIndexes: number[];
	deltaSets: OpenTypeDeltaSet[];
}

export interface ItemVariationStoreTable {
	format: number;
	variationRegionList: OpenTypeVariationRegionList | null;
	variationDataCount: number;
	itemVariationData: (OpenTypeItemVariationData | null)[];
}

export interface OpenTypeConditionTableV1 {
	version: 1;
	axisIndex: number;
	filterRangeMinValue: number;
	filterRangeMaxValue: number;
}

export type OpenTypeConditionTable = OpenTypeConditionTableV1;

export interface OpenTypeConditionSet {
	conditionCount: number;
	conditionTable: (OpenTypeConditionTable | null)[];
}

export interface OpenTypeFeatureTableSubstitutionRecord {
	featureIndex: number;
	alternateFeatureTable: OpenTypeFeatureTable;
}

export interface OpenTypeFeatureTableSubstitution {
	version: number;
	substitutionCount: number;
	substitutions: OpenTypeFeatureTableSubstitutionRecord[];
}

export interface OpenTypeFeatureVariationRecord {
	conditionSet: OpenTypeConditionSet | null;
	featureTableSubstitution: OpenTypeFeatureTableSubstitution | null;
}

export interface OpenTypeFeatureVariationsTable {
	majorVersion: number;
	minorVersion: number;
	featureVariationRecordCount: number;
	featureVariationRecords: OpenTypeFeatureVariationRecord[];
}

const F2DOT14 = new r.Fixed(16, 'BE', 14);

const RegionAxisCoordinates = new r.Struct<any, OpenTypeRegionAxisCoordinates>({
	startCoord: F2DOT14,
	peakCoord: F2DOT14,
	endCoord: F2DOT14,
});

const VariationRegionList = new r.Struct<any, OpenTypeVariationRegionList>({
	axisCount: r.uint16,
	regionCount: r.uint16,
	variationRegions: new r.Array(
		new r.Array(RegionAxisCoordinates, 'axisCount'),
		'regionCount',
	),
});

interface DeltaSetParentContext {
	shortDeltaCount: number;
	regionIndexCount: number;
}

interface DeltaSetContext {
	parent: DeltaSetParentContext;
	shortDeltas: number[];
	regionDeltas: number[];
}

const DeltaSet = new r.Struct<any, OpenTypeDeltaSet>({
	shortDeltas: new r.Array(
		r.int16,
		(t: { parent: DeltaSetParentContext }) => t.parent.shortDeltaCount,
	),
	regionDeltas: new r.Array(
		r.int8,
		(t: { parent: DeltaSetParentContext }) =>
			t.parent.regionIndexCount - t.parent.shortDeltaCount,
	),
	deltas: (t: DeltaSetContext): number[] =>
		t.shortDeltas.concat(t.regionDeltas),
});

const ItemVariationData = new r.Struct<any, OpenTypeItemVariationData>({
	itemCount: r.uint16,
	shortDeltaCount: r.uint16,
	regionIndexCount: r.uint16,
	regionIndexes: new r.Array(r.uint16, 'regionIndexCount'),
	deltaSets: new r.Array(DeltaSet, 'itemCount'),
});

const variationStoreFields = {
	format: r.uint16,
	variationRegionList: new r.Pointer(r.uint32, VariationRegionList),
	variationDataCount: r.uint16,
	itemVariationData: new r.Array(
		new r.Pointer(r.uint32, ItemVariationData),
		'variationDataCount',
	),
};

export const ItemVariationStore = new r.Struct<
	typeof variationStoreFields,
	ItemVariationStoreTable
>(variationStoreFields);

const ConditionTable = new r.VersionedStruct<any, OpenTypeConditionTable>(
	r.uint16,
	{
		1: {
			axisIndex: r.uint16,
			filterRangeMinValue: F2DOT14,
			filterRangeMaxValue: F2DOT14,
		},
	},
);

const ConditionSet = new r.Struct<any, OpenTypeConditionSet>({
	conditionCount: r.uint16,
	conditionTable: new r.Array(
		new r.Pointer(r.uint32, ConditionTable),
		'conditionCount',
	),
});

const FeatureTableSubstitutionRecord = new r.Struct<
	any,
	OpenTypeFeatureTableSubstitutionRecord
>({
	featureIndex: r.uint16,
	alternateFeatureTable: new r.Pointer(r.uint32, Feature, { type: 'parent' }),
});

const FeatureTableSubstitution = new r.Struct<
	any,
	OpenTypeFeatureTableSubstitution
>({
	version: r.fixed32,
	substitutionCount: r.uint16,
	substitutions: new r.Array(
		FeatureTableSubstitutionRecord,
		'substitutionCount',
	),
});

const FeatureVariationRecord = new r.Struct<
	any,
	OpenTypeFeatureVariationRecord
>({
	conditionSet: new r.Pointer(r.uint32, ConditionSet, { type: 'parent' }),
	featureTableSubstitution: new r.Pointer(r.uint32, FeatureTableSubstitution, {
		type: 'parent',
	}),
});

const featureVariationsFields = {
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	featureVariationRecordCount: r.uint32,
	featureVariationRecords: new r.Array(
		FeatureVariationRecord,
		'featureVariationRecordCount',
	),
};

export const FeatureVariations = new r.Struct<
	typeof featureVariationsFields,
	OpenTypeFeatureVariationsTable
>(featureVariationsFields);
