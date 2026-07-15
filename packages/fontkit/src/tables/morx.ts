import * as r from 'restructure';
import {
	type AAT,
	AATUnboundedArray,
	aatLookupTable,
	aatStateTable,
	type UnboundedArrayAccessor,
} from './aat.js';

export namespace morxTable {
	// Format 0: Indic rearrangement subtable.
	export interface SubtableDataV0 {
		version: 0;
		stateTable: AAT.StateHeader;
	}

	// Format 1: Contextual glyph substitution subtable.
	export interface ContextualData {
		markIndex: number;
		currentIndex: number;
	}

	export interface SubstitutionTable {
		items: UnboundedArrayAccessor<AAT.LookupTable<number>, r.FieldT<AAT.LookupTable<number>>>;
	}

	export interface SubtableDataV1 {
		version: 1;
		stateTable: AAT.StateHeader<number, ContextualData>;
		substitutionTable: typeof substitutionTable extends r.PointerT<infer T>
			? T
			: SubstitutionTable;
	}

	// Format 2: Ligature subtable.
	export interface LigatureData {
		action: number;
	}

	export interface SubtableDataV2 {
		version: 2;
		stateTable: AAT.StateHeader<number, LigatureData>;
		ligatureActions: UnboundedArrayAccessor<number, r.FieldT<number>>;
		components: UnboundedArrayAccessor<number, r.FieldT<number>>;
		ligatureList: UnboundedArrayAccessor<number, r.FieldT<number>>;
	}

	// Format 4: Non-contextual glyph substitution subtable.

	export interface SubtableDataV4 {
		version: 4;
		lookupTable: AAT.LookupTable<number>;
	}

	// Format 5: Glyph insertion subtable.
	export interface InsertionData {
		currentInsertIndex: number;
		markedInsertIndex: number;
	}

	export interface SubtableDataV5 {
		version: 5;
		stateTable: AAT.StateHeader<number, InsertionData>;
		insertionActions: UnboundedArrayAccessor<number, r.FieldT<number>>;
	}

	export type SubtableData =
		| SubtableDataV0
		| SubtableDataV1
		| SubtableDataV2
		| SubtableDataV4
		| SubtableDataV5;

	export interface Subtable {
		length: number;
		coverage: number;
		type: number;
		subFeatureFlags: number;
		table: SubtableData;
	}

	export interface FeatureEntry {
		featureType: number;
		featureSetting: number;
		enableFlags: number;
		disableFlags: number;
	}

	export interface Chain {
		defaultFlags: number;
		chainLength: number;
		nFeatureEntries: number;
		nSubtables: number;
		features: FeatureEntry[];
		subtables: Subtable[];
	}

	export interface morx {
		version: number;
		nChains: number;
		chains: Chain[];
	}
}

const ligatureData = {
	action: r.uint16,
};

const contextualData = {
	markIndex: r.uint16,
	currentIndex: r.uint16,
};

const insertionData = {
	currentInsertIndex: r.uint16,
	markedInsertIndex: r.uint16,
};

const subtitutionTableFields = {
	items: new AATUnboundedArray(new r.Pointer(r.uint32, aatLookupTable())),
};
const substitutionTable = new r.Struct<
	typeof subtitutionTableFields,
	morxTable.SubstitutionTable
>(subtitutionTableFields);

const subtableDataFields = {
	0: {
		// Indic Rearrangement Subtable
		stateTable: aatStateTable(),
	},

	1: {
		// Contextual Glyph Substitution Subtable
		stateTable: aatStateTable(contextualData),
		substitutionTable: new r.Pointer(r.uint32, substitutionTable),
	},

	2: {
		// Ligature subtable
		stateTable: aatStateTable(ligatureData),
		ligatureActions: new r.Pointer(r.uint32, new AATUnboundedArray(r.uint32)),
		components: new r.Pointer(r.uint32, new AATUnboundedArray(r.uint16)),
		ligatureList: new r.Pointer(r.uint32, new AATUnboundedArray(r.uint16)),
	},

	4: {
		// Non-contextual Glyph Substitution Subtable
		lookupTable: aatLookupTable(),
	},

	5: {
		// Glyph Insertion Subtable
		stateTable: aatStateTable(insertionData),
		insertionActions: new r.Pointer(r.uint32, new AATUnboundedArray(r.uint16)),
	},
};
const subtableData = new r.VersionedStruct<
	typeof subtableDataFields,
	morxTable.SubtableData
>('type', subtableDataFields);

const subtableFields = {
	length: r.uint32,
	coverage: r.uint24,
	type: r.uint8,
	subFeatureFlags: r.uint32,
	table: subtableData,
	padding: new r.Reserved(r.uint8, (t) => t.length - t._currentOffset),
};
const subtable = new r.Struct<typeof subtableFields, morxTable.Subtable>(
	subtableFields,
);

const featureEntryFields = {
	featureType: r.uint16,
	featureSetting: r.uint16,
	enableFlags: r.uint32,
	disableFlags: r.uint32,
};
const featureEntry = new r.Struct<
	typeof featureEntryFields,
	morxTable.FeatureEntry
>(featureEntryFields);

const morxChainFields = {
	defaultFlags: r.uint32,
	chainLength: r.uint32,
	nFeatureEntries: r.uint32,
	nSubtables: r.uint32,
	features: new r.Array(featureEntry, 'nFeatureEntries'),
	subtables: new r.Array(subtable, 'nSubtables'),
};
const morxChain = new r.Struct<typeof morxChainFields, morxTable.Chain>(
	morxChainFields,
);

const morxFields = {
	version: r.uint16,
	unused: new r.Reserved(r.uint16),
	nChains: r.uint32,
	chains: new r.Array(morxChain, 'nChains'),
};
/** @internal */
export const morx = new r.Struct<typeof morxFields, morxTable.morx>(morxFields);
