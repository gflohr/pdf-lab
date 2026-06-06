import r, { type PointerT } from '@pdf-lib/restructure';
import { type AAT, LookupTable, StateTable, UnboundedArray } from './aat.js';

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
		items: AAT.LookupTable<number>[];
	}

	export interface SubtableDataV1 {
		version: 1;
		stateTable: AAT.StateHeader<number, ContextualData>;
		substitutionTable: typeof SubstitutionTable extends PointerT<infer T>
			? T
			: SubstitutionTable;
	}

	// Format 2: Ligature subtable.
	export interface morxLigatureData {
		action: number;
	}

	export interface SubtableDataV2 {
		version: 2;
		stateTable: AAT.StateHeader<number, morxLigatureData>;
		ligatureActions: number[];
		components: number[];
		ligatureList: number[];
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
		insertionActions: number[];
	}

	export type morxSubtableData =
		| SubtableDataV0
		| SubtableDataV1
		| SubtableDataV2
		| SubtableDataV4
		| SubtableDataV5;

	export interface morxSubtable {
		length: number;
		coverage: number;
		type: number;
		subFeatureFlags: number;
		table: morxSubtable;
	}
	export interface morxFeatureEntry {
		featureType: number;
		featureSetting: number;
		enableFlags: number;
		disableFlags: number;
	}

	export interface morxChain {
		defaultFlags: number;
		chainLength: number;
		nFeatureEntries: number;
		nSubtables: number;
		features: morxFeatureEntry[];
		subtables: morxSubtable[];
	}

	export interface morx {
		version: number;
		nChains: number;
		chains: morxChain[];
	}
}

const LigatureData = {
	action: r.uint16,
};

const ContextualData = {
	markIndex: r.uint16,
	currentIndex: r.uint16,
};

const InsertionData = {
	currentInsertIndex: r.uint16,
	markedInsertIndex: r.uint16,
};

const subtitutionTableFields = {
	items: new UnboundedArray(new r.Pointer(r.uint32, LookupTable())),
};
const SubstitutionTable = new r.Struct<
	typeof subtitutionTableFields,
	morxTable.SubstitutionTable
>(subtitutionTableFields);

const subtableDataFields = {
	0: {
		// Indic Rearrangement Subtable
		stateTable: StateTable(),
	},

	1: {
		// Contextual Glyph Substitution Subtable
		stateTable: StateTable(ContextualData),
		substitutionTable: new r.Pointer(r.uint32, SubstitutionTable),
	},

	2: {
		// Ligature subtable
		stateTable: StateTable(LigatureData),
		ligatureActions: new r.Pointer(r.uint32, new UnboundedArray(r.uint32)),
		components: new r.Pointer(r.uint32, new UnboundedArray(r.uint16)),
		ligatureList: new r.Pointer(r.uint32, new UnboundedArray(r.uint16)),
	},

	4: {
		// Non-contextual Glyph Substitution Subtable
		lookupTable: LookupTable(),
	},

	5: {
		// Glyph Insertion Subtable
		stateTable: StateTable(InsertionData),
		insertionActions: new r.Pointer(r.uint32, new UnboundedArray(r.uint16)),
	},
};
const SubtableData = new r.VersionedStruct<
	typeof subtableDataFields,
	morxTable.morxSubtableData
>('type', subtableDataFields);

const subtableFields = {
	length: r.uint32,
	coverage: r.uint24,
	type: r.uint8,
	subFeatureFlags: r.uint32,
	table: SubtableData,
	padding: new r.Reserved(r.uint8, (t) => t.length - t._currentOffset),
};
const Subtable = new r.Struct<typeof subtableFields, morxTable.morxSubtable>(
	subtableFields,
);

const featureEntryFields = {
	featureType: r.uint16,
	featureSetting: r.uint16,
	enableFlags: r.uint32,
	disableFlags: r.uint32,
};
const FeatureEntry = new r.Struct<
	typeof featureEntryFields,
	morxTable.morxFeatureEntry
>(featureEntryFields);

const morxChainFields = {
	defaultFlags: r.uint32,
	chainLength: r.uint32,
	nFeatureEntries: r.uint32,
	nSubtables: r.uint32,
	features: new r.Array(FeatureEntry, 'nFeatureEntries'),
	subtables: new r.Array(Subtable, 'nSubtables'),
};
const MorxChain = new r.Struct(morxChainFields);

const morxFields = {
	version: r.uint16,
	unused: new r.Reserved(r.uint16),
	nChains: r.uint32,
	chains: new r.Array(MorxChain, 'nChains'),
};
export default new r.Struct<typeof morxFields, morxTable.morx>(morxFields);
