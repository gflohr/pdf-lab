import * as r from 'restructure';
import {
	type OpenType,
	openTypeChainingContext,
	openTypeContext,
	openTypeCoverage,
	openTypeFeatureList,
	openTypeLookupList,
	openTypeScriptList,
} from './open-type.js';
import { featureVariations, type OpenTypeVariation } from './variations.js';

export namespace GSUBTable {
	export interface LookupSingleV1 {
		version: 1;
		coverage?: OpenType.Coverage;
		deltaGlyphID: number;
	}

	export interface LookupSingleV2 {
		version: 2;
		coverage?: OpenType.Coverage;
		glyphCount: number;
		substitute: r.RestructureLazyArray<number>;
	}

	export type LookupSingle =
		| LookupSingleV1
		| (LookupSingleV2 & {
				lookupType: 1;
		  });

	export interface LookupMultiple {
		substFormat: number;
		coverage?: OpenType.Coverage;
		count: number;
		sequences: r.RestructureLazyArray<number[]>;
	}

	export interface LookupAlternate {
		substFormat: number;
		coverage?: OpenType.Coverage;
		count: number;
		alternateSet: r.RestructureLazyArray<number[]>;
	}

	export interface LookupLigatureSet {
		glyph: number;
		compCount: number;
		components: number[];
	}
	export interface LookupLigature {
		substFormat: number;
		coverage?: OpenType.Coverage;
		count: number;
		ligatureSets: r.RestructureLazyArray<LookupLigatureSet[]>;
	}

	export type LookupContext = OpenType.Context & { lookupType: 5 };

	export type LookupChainingContext = OpenType.ChainingContext & {
		lookupType: 6;
	};

	export interface LookupExtension {
		substFormat: number;
		lookupType: Exclude<number, 7>;
		extension: LookupTable;
	}

	export interface LookupReverseChaining {
		substFormat: number;
		coverage?: OpenType.Coverage;
		backtrackCoverage: OpenType.Coverage[];
		lookaheadGlyphCount: number;
		lookaheadCoverage: OpenType.Coverage[];
		glyphCount: number;
		substitutes: number[];
	}

	export type LookupTable =
		| LookupSingle
		| LookupMultiple
		| LookupAlternate
		| LookupLigature
		| LookupContext
		| LookupChainingContext
		| LookupExtension
		| LookupReverseChaining;

	export interface GSUBV1_0 extends OpenType.LayoutTableBase<LookupTable> {
		version: 65536; // 1.0 as float.
	}

	export interface GSUBV1_1 extends OpenType.LayoutTableBase<LookupTable> {
		version: 65537; // 1.1 as float.
		featureVariations: OpenTypeVariation.FeatureVariations; // FIXME! || null?
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
const Ligature = new r.Struct<GSUBTable.LookupLigatureSet>(ligatureFields);

const LigatureSet = new r.Array(new r.Pointer(r.uint16, Ligature), r.uint16);

const selfPointer = new r.Pointer(r.uint32, null);

const gsubLookupSingleFields = {
	1: {
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		deltaGlyphID: r.int16,
	},
	2: {
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		glyphCount: r.uint16,
		substitute: new r.LazyArray(r.uint16, 'glyphCount'),
	},
};
const gsubLookupFields = {
	1: new r.VersionedStruct<GSUBTable.LookupSingle>(
		r.uint16,
		gsubLookupSingleFields,
	),

	2: {
		substFormat: r.uint16,
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		count: r.uint16,
		sequences: new r.LazyArray(new r.Pointer(r.uint16, Sequence), 'count'),
	},

	3: {
		substFormat: r.uint16,
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		count: r.uint16,
		alternateSet: new r.LazyArray(
			new r.Pointer(r.uint16, AlternateSet),
			'count',
		),
	},

	4: {
		substFormat: r.uint16,
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		count: r.uint16,
		ligatureSets: new r.LazyArray(
			new r.Pointer(r.uint16, LigatureSet),
			'count',
		),
	},

	5: openTypeContext,
	6: openTypeChainingContext,

	7: {
		substFormat: r.uint16,
		lookupType: r.uint16,
		extension: selfPointer,
	},

	8: {
		substFormat: r.uint16,
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		backtrackCoverage: new r.Array(
			new r.Pointer(r.uint16, openTypeCoverage),
			'backtrackGlyphCount',
		),
		lookaheadGlyphCount: r.uint16,
		lookaheadCoverage: new r.Array(
			new r.Pointer(r.uint16, openTypeCoverage),
			'lookaheadGlyphCount',
		),
		glyphCount: r.uint16,
		substitutes: new r.Array(r.uint16, 'glyphCount'),
	},
};
const GSUBLookup = new r.VersionedStruct<GSUBTable.LookupTable>(
	'lookupType',
	gsubLookupFields,
);

// Fix circular reference
selfPointer.type = GSUBLookup;

const fields = {
	header: {
		scriptList: new r.Pointer(r.uint16, openTypeScriptList),
		featureList: new r.Pointer(r.uint16, openTypeFeatureList),
		lookupList: new r.Pointer(r.uint16, openTypeLookupList(GSUBLookup)),
	},

	65536: {},
	65537: {
		featureVariations: new r.Pointer(r.uint32, featureVariations),
	},
};

/** @internal */
export const GSUB = new r.VersionedStruct<GSUBTable.GSUB>(r.uint32, fields);
