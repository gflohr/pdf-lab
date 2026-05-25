import r from '@pdf-lib/restructure';
import {
	ChainingContext,
	Context,
	Coverage,
	FeatureList,
	LookupList,
	OpenTypeFeatureRecord,
	OpenTypeScriptRecord,
	ScriptList,
} from './opentype.js';
import { FeatureVariations } from './variations.js';

/**
 * Baseline master layout properties shared across all OpenType Layout Engines
 * (GSUB/GPOS).
 *
 * FIXME! Move that to ./opentype.ts.
 */
interface OpenTypeLayoutTableBase {
	/** Pointer to the ScriptList table which defines font scripts and language systems. */
	scriptList: OpenTypeScriptRecord[] | null; // Instantiated via ScriptList configuration structure
	/** Pointer to the FeatureList table which maps typographical layout features. */
	featureList: OpenTypeFeatureRecord[]; // Instantiated via FeatureList configuration structure
	/** List of lookup execution sequence steps mapping specific structural changes. */
	lookupList: any; // Instantiated via LookupList configuration structure
}

export interface GSUBTableV1_0 extends OpenTypeLayoutTableBase {
	version: 1.0; // represented by binary uint32 value 65536
}

export interface GSUBTableV1_1 extends OpenTypeLayoutTableBase {
	version: 1.1; // represented by binary uint32 value 65537
	/** Pointer to optional design-axis metadata variable feature settings. */
	featureVariations: any; // Instantiated via FeatureVariations configuration structure
}

/**
 * Represents the final parsed OpenType Glyph Substitution table ('GSUB').
 */
export type GSUBTable = GSUBTableV1_0 | GSUBTableV1_1;

// ============================================================================
// 2. Inner Lookup Structure Discriminator Unions
// ============================================================================

export type GSUBLookupSingle =
	| { format: 1; coverage: any; deltaGlyphID: number }
	| { format: 2; coverage: any; glyphCount: number; substitute: number[] };

export interface GSUBLookupMultiple {
	substFormat: number;
	coverage: any;
	count: number;
	sequences: number[][];
}

export interface GSUBLookupAlternate {
	substFormat: number;
	coverage: any;
	count: number;
	alternateSet: number[][];
}

export interface GSUBLookupLigature {
	substFormat: number;
	coverage: any;
	count: number;
	ligatureSets: any[];
}

export interface GSUBLookupReverseChaining {
	substFormat: number;
	coverage: any;
	backtrackCoverage: any[];
	lookaheadGlyphCount: number;
	lookaheadCoverage: any[];
	glyphCount: number;
	substitutes: number[];
}

/**
 * Comprehensive mapping interface representing an individual decoded GSUB Lookup entry.
 */
export type GSUBLookupTable =
	| { lookupType: 1; table: GSUBLookupSingle }
	| { lookupType: 2; table: GSUBLookupMultiple }
	| { lookupType: 3; table: GSUBLookupAlternate }
	| { lookupType: 4; table: GSUBLookupLigature }
	| { lookupType: 5; table: any } // Contextual Substitution
	| { lookupType: 6; table: any } // Chaining Contextual Substitution
	| {
			lookupType: 7;
			table: { substFormat: number; lookupType: number; extension: any };
	  }
	| { lookupType: 8; table: GSUBLookupReverseChaining };

// ============================================================================
// 3. Structural Binary Configuration Shapes
// ============================================================================

const Sequence = new r.Array(r.uint16, r.uint16);
const AlternateSet = Sequence;

const Ligature = new r.Struct({
	glyph: r.uint16,
	compCount: r.uint16,
	components: new r.Array(r.uint16, (t) => t.compCount - 1),
});

const LigatureSet = new r.Array(new r.Pointer(r.uint16, Ligature), r.uint16);

const selfPointer = new r.Pointer(r.uint32, null);
const GSUBLookup = new r.VersionedStruct('lookupType', {
	1: new r.VersionedStruct(r.uint16, {
		1: {
			coverage: new r.Pointer(r.uint16, Coverage),
			deltaGlyphID: r.int16,
		},
		2: {
			coverage: new r.Pointer(r.uint16, Coverage),
			glyphCount: r.uint16,
			substitute: new r.LazyArray(r.uint16, 'glyphCount'),
		},
	}),

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
	6: ChainingContext,

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
});

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
		featureVariations: new r.Pointer(r.uint32, FeatureVariations),
	},
};

export default new r.VersionedStruct<typeof fields, GSUBTable>(
	r.uint32,
	fields,
);
