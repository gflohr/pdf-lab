import r from '@pdf-lib/restructure';
import {
	chainingContext,
	Context,
	Coverage,
	FeatureList,
	LookupList,
	type OpenTypeChainingContext,
	type OpenTypeContextTable,
	type OpenTypeCoverageTable,
	type OpenTypeLayoutTableBase,
	ScriptList,
} from './opentype.js';
import {
	featureVariations,
	type OpenTypeFeatureVariations,
} from './variations.js';

export namespace GSUBTable {
	export interface LookupSingleV1 {
		format: 1;
		coverage?: OpenTypeCoverageTable;
		deltaGlyphID: number;
	}

	export interface LookupSingleV2 {
		format: 2;
		coverage?: OpenTypeCoverageTable;
		glyphCount: number;
		substitute: number[];
	}

	export type LookupSingle = LookupSingleV1 | LookupSingleV2;

	export interface LookupMultiple {
		substFormat: number;
		coverage?: OpenTypeCoverageTable;
		count: number;
		sequences: number[][];
	}

	export interface LookupAlternate {
		substFormat: number;
		coverage?: OpenTypeCoverageTable;
		count: number;
		alternateSet: number[][];
	}

	export interface LookupLigatureSet {
		glyph: number;
		compCount: number;
		components: number[];
	}
	export interface LookupLigature {
		substFormat: number;
		coverage?: OpenTypeCoverageTable;
		count: number;
		ligatureSets: LookupLigatureSet[];
	}

	export interface LookupReverseChaining {
		substFormat: number;
		coverage?: OpenTypeCoverageTable;
		backtrackCoverage: OpenTypeCoverageTable[];
		lookaheadGlyphCount: number;
		lookaheadCoverage: OpenTypeCoverageTable[];
		glyphCount: number;
		substitutes: number[];
	}

	export type LookupTable =
		| { lookupType: 1; table: LookupSingle }
		| { lookupType: 2; table: LookupMultiple }
		| { lookupType: 3; table: LookupAlternate }
		| { lookupType: 4; table: LookupLigature }
		| { lookupType: 5; table: OpenTypeContextTable }
		| { lookupType: 6; table: OpenTypeChainingContext }
		| {
				lookupType: 7;
				table: {
					substFormat: number;
					lookupType: Exclude<number, 7>;
					extension: LookupTable;
				};
		  }
		| { lookupType: 8; table: LookupReverseChaining };

	export interface GSUBV1_0 extends OpenTypeLayoutTableBase<LookupTable> {
		version: 1.0; // represented by binary uint32 value 65536
	}

	export interface GSUBV1_1 extends OpenTypeLayoutTableBase<LookupTable> {
		version: 1.1; // represented by binary uint32 value 65537
		featureVariations: OpenTypeFeatureVariations;
	}

	export type GSUB = GSUBV1_0 | GSUBV1_1;
}

const Sequence = new r.Array(r.uint16, r.uint16);
const AlternateSet = Sequence;

const ligatureFields = {
	glyph: r.uint16,
	compCount: r.uint16,
	components: new r.Array(r.uint16, (t) => t.compCount - 1),
};
const Ligature = new r.Struct<
	typeof ligatureFields,
	GSUBTable.LookupLigatureSet
>(ligatureFields);

const LigatureSet = new r.Array(new r.Pointer(r.uint16, Ligature), r.uint16);

const selfPointer = new r.Pointer(r.uint32, null);

const gsubLookupSingleFields = {
	1: {
		coverage: new r.Pointer(r.uint16, Coverage),
		deltaGlyphID: r.int16,
	},
	2: {
		coverage: new r.Pointer(r.uint16, Coverage),
		glyphCount: r.uint16,
		substitute: new r.LazyArray(r.uint16, 'glyphCount'),
	},
};
const gsubLookupFields = {
	1: new r.VersionedStruct<
		typeof gsubLookupSingleFields,
		GSUBTable.LookupSingle
	>(r.uint16, gsubLookupSingleFields),

	2: {
		substFormat: r.uint16,
		coverage: new r.Pointer(r.uint16, Coverage),
		count: r.uint16,
		sequences: new r.LazyArray(new r.Pointer(r.uint16, Sequence), 'count'),
	},

	3: {
		substFormat: r.uint16,
		coverage: new r.Pointer(r.uint16, Coverage),
		count: r.uint16,
		alternateSet: new r.LazyArray(
			new r.Pointer(r.uint16, AlternateSet),
			'count',
		),
	},

	4: {
		substFormat: r.uint16,
		coverage: new r.Pointer(r.uint16, Coverage),
		count: r.uint16,
		ligatureSets: new r.LazyArray(
			new r.Pointer(r.uint16, LigatureSet),
			'count',
		),
	},

	5: Context,
	6: chainingContext,

	7: {
		substFormat: r.uint16,
		lookupType: r.uint16,
		extension: selfPointer,
	},

	8: {
		substFormat: r.uint16,
		coverage: new r.Pointer(r.uint16, Coverage),
		backtrackCoverage: new r.Array(
			new r.Pointer(r.uint16, Coverage),
			'backtrackGlyphCount',
		),
		lookaheadGlyphCount: r.uint16,
		lookaheadCoverage: new r.Array(
			new r.Pointer(r.uint16, Coverage),
			'lookaheadGlyphCount',
		),
		glyphCount: r.uint16,
		substitutes: new r.Array(r.uint16, 'glyphCount'),
	},
};
const GSUBLookup = new r.VersionedStruct<
	typeof gsubLookupFields,
	GSUBTable.LookupTable
>('lookupType', gsubLookupFields);

// Fix circular reference
selfPointer.type = GSUBLookup;

const fields = {
	header: {
		scriptList: new r.Pointer(r.uint16, ScriptList),
		featureList: new r.Pointer(r.uint16, FeatureList),
		lookupList: new r.Pointer(r.uint16, LookupList(GSUBLookup)),
	},

	65536: {},
	65537: {
		featureVariations: new r.Pointer(r.uint32, featureVariations),
	},
};

export default new r.VersionedStruct<typeof fields, GSUBTable.GSUB>(
	r.uint32,
	fields,
);
