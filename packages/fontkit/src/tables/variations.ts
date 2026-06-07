import r from '@pdf-lib/restructure';
import { type OpenType, openTypeFeature } from './opentype.js';

export namespace OpenTypeVariation {
	export interface RegionAxisCoordinates {
		startCoord: number;
		peakCoord: number;
		endCoord: number;
	}

	export interface VariationRegionList {
		axisCount: number;
		regionCount: number;
		variationRegions: RegionAxisCoordinates[][];
	}

	export interface DeltaSet {
		shortDeltas: number[];
		regionDeltas: number[];
		deltas: number[];
	}

	export interface ItemVariationData {
		itemCount: number;
		shortDeltaCount: number;
		regionIndexCount: number;
		regionIndexes: number[];
		deltaSets: DeltaSet[];
	}

	export interface ItemVariationStore {
		format: number;
		variationRegionList: VariationRegionList | null;
		variationDataCount: number;
		itemVariationData: (ItemVariationData | null)[];
	}

	export interface ConditionV1 {
		version: 1;
		axisIndex: number;
		filterRangeMinValue: number;
		filterRangeMaxValue: number;
	}

	export type Condition = ConditionV1;

	export interface ConditionSet {
		conditionCount: number;
		conditionTable: (Condition | null)[];
	}

	export interface FeatureTableSubstitutionRecord {
		featureIndex: number;
		alternateFeatureTable: OpenType.Feature;
	}

	export interface FeatureTableSubstitution {
		version: number;
		substitutionCount: number;
		substitutions: FeatureTableSubstitutionRecord[];
	}

	export interface FeatureVariationRecord {
		conditionSet: ConditionSet | null;
		featureTableSubstitution: FeatureTableSubstitution | null;
	}

	export interface FeatureVariations {
		majorVersion: number;
		minorVersion: number;
		featureVariationRecordCount: number;
		featureVariationRecords: FeatureVariationRecord[];
	}
}

const f2DOT14 = new r.Fixed(16, 'BE', 14);

const regionAxisCoordinatesFields = {
	startCoord: f2DOT14,
	peakCoord: f2DOT14,
	endCoord: f2DOT14,
};
const regionAxisCoordinates = new r.Struct<
	typeof regionAxisCoordinatesFields,
	OpenTypeVariation.RegionAxisCoordinates
>(regionAxisCoordinatesFields);

const variationRegionListFields = {
	axisCount: r.uint16,
	regionCount: r.uint16,
	variationRegions: new r.Array(
		new r.Array(regionAxisCoordinates, 'axisCount'),
		'regionCount',
	),
};
const variationRegionList = new r.Struct<
	typeof variationRegionListFields,
	OpenTypeVariation.VariationRegionList
>(variationRegionListFields);

interface DeltaSetParentContext {
	shortDeltaCount: number;
	regionIndexCount: number;
}

interface DeltaSetContext {
	parent: DeltaSetParentContext;
	shortDeltas: number[];
	regionDeltas: number[];
}

const deltaSetFields = {
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
};
const deltaSet = new r.Struct<typeof deltaSetFields, OpenTypeVariation.DeltaSet>(
	deltaSetFields,
);

const itemVariationDataFields = {
	itemCount: r.uint16,
	shortDeltaCount: r.uint16,
	regionIndexCount: r.uint16,
	regionIndexes: new r.Array(r.uint16, 'regionIndexCount'),
	deltaSets: new r.Array(deltaSet, 'itemCount'),
};
const itemVariationData = new r.Struct<
	typeof itemVariationDataFields,
	OpenTypeVariation.ItemVariationData
>(itemVariationDataFields);

const variationStoreFields = {
	format: r.uint16,
	variationRegionList: new r.Pointer(r.uint32, variationRegionList),
	variationDataCount: r.uint16,
	itemVariationData: new r.Array(
		new r.Pointer(r.uint32, itemVariationData),
		'variationDataCount',
	),
};

export const itemVariationStore = new r.Struct<
	typeof variationStoreFields,
	OpenTypeVariation.ItemVariationStore
>(variationStoreFields);

const conditionTableFields = {
	1: {
		axisIndex: r.uint16,
		filterRangeMinValue: f2DOT14,
		filterRangeMaxValue: f2DOT14,
	},
};
const conditionTable = new r.VersionedStruct<
	typeof conditionTableFields,
	OpenTypeVariation.Condition
>(r.uint16, conditionTableFields);

const conditionSetFields = {
	conditionCount: r.uint16,
	conditionTable: new r.Array(
		new r.Pointer(r.uint32, conditionTable),
		'conditionCount',
	),
};
const conditionSet = new r.Struct<
	typeof conditionSetFields,
	OpenTypeVariation.ConditionSet
>(conditionSetFields);

const featureTableSubstitutionRecordFields = {
	featureIndex: r.uint16,
	alternateFeatureTable: new r.Pointer(r.uint32, openTypeFeature, {
		type: 'parent',
	}),
};
const featureTableSubstitutionRecord = new r.Struct<
	typeof featureTableSubstitutionRecordFields,
	OpenTypeVariation.FeatureTableSubstitutionRecord
>(featureTableSubstitutionRecordFields);

const featureTableSubstitutionFields = {
	version: r.fixed32,
	substitutionCount: r.uint16,
	substitutions: new r.Array(
		featureTableSubstitutionRecord,
		'substitutionCount',
	),
};
const featureTableSubstitution = new r.Struct<
	typeof featureTableSubstitutionFields,
	OpenTypeVariation.FeatureTableSubstitution
>(featureTableSubstitutionFields);

const featureVariationRecordFields = {
	conditionSet: new r.Pointer(r.uint32, conditionSet, { type: 'parent' }),
	featureTableSubstitution: new r.Pointer(r.uint32, featureTableSubstitution, {
		type: 'parent',
	}),
};
const featureVariationRecord = new r.Struct<
	typeof featureVariationRecordFields,
	OpenTypeVariation.FeatureVariationRecord
>(featureVariationRecordFields);

const featureVariationsFields = {
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	featureVariationRecordCount: r.uint32,
	featureVariationRecords: new r.Array(
		featureVariationRecord,
		'featureVariationRecordCount',
	),
};

export const featureVariations = new r.Struct<
	typeof featureVariationsFields,
	OpenTypeVariation.FeatureVariations
>(featureVariationsFields);
