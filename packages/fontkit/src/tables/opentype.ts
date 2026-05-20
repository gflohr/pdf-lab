import r, { type FieldT } from '@pdf-lib/restructure';

// ==========================================
// Domain 1: Scripts and Languages Interfaces
// ==========================================

export interface OpenTypeLangSysTable {
	reqFeatureIndex: number;
	featureCount: number;
	featureIndexes: number[];
}

export interface OpenTypeLangSysRecord {
	tag: string;
	langSys: OpenTypeLangSysTable;
}

export interface OpenTypeScriptTable {
	defaultLangSys: OpenTypeLangSysTable | null;
	count: number;
	langSysRecords: OpenTypeLangSysRecord[];
}

export interface OpenTypeScriptRecord {
	tag: string;
	script: OpenTypeScriptTable;
}

// ==========================================
// Domain 2: Features and Lookups Interfaces
// ==========================================

export interface OpenTypeFeatureTable {
	featureParams: number;
	lookupCount: number;
	lookupListIndexes: number[];
}

export interface OpenTypeFeatureRecord {
	tag: string;
	feature: OpenTypeFeatureTable;
}

export interface OpenTypeLookupFlags {
	markAttachmentType: number;
	flags: {
		rightToLeft: boolean;
		ignoreBaseGlyphs: boolean;
		ignoreLigatures: boolean;
		ignoreMarks: boolean;
		useMarkFilteringSet: boolean;
	};
}

export interface OpenTypeLookupTable<TSubTable> {
	lookupType: number;
	flags: OpenTypeLookupFlags;
	subTableCount: number;
	subTables: TSubTable[];
	markFilteringSet: number | null;
}

// ==========================================
// Domain 3: Coverage and Classes Interfaces
// ==========================================

export interface OpenTypeRangeRecord {
	start: number;
	end: number;
	startCoverageIndex: number;
}

export interface OpenTypeCoverageV1 {
	version: 1;
	glyphCount: number;
	glyphs: number[];
}

export interface OpenTypeCoverageV2 {
	version: 2;
	rangeCount: number;
	rangeRecords: OpenTypeRangeRecord[];
}

export type OpenTypeCoverageTable = OpenTypeCoverageV1 | OpenTypeCoverageV2;

export interface OpenTypeClassRangeRecord {
	start: number;
	end: number;
	class: number;
}

export interface OpenTypeClassDefV1 {
	version: 1;
	startGlyph: number;
	glyphCount: number;
	classValueArray: number[];
}

export interface OpenTypeClassDefV2 {
	version: 2;
	classRangeCount: number;
	classRangeRecord: OpenTypeClassRangeRecord[];
}

export type OpenTypeClassDefTable = OpenTypeClassDefV1 | OpenTypeClassDefV2;

/**
 * Represents typographic device scaling metrics or OpenType Variation Index offsets.
 */
export interface OpenTypeDeviceTable {
	/** startSize for standard hinting tables, or outerIndex for Variation Stores. */
	a: number;
	/** endSize for standard hinting tables, or innerIndex for Variation Stores. */
	b: number;
	deltaFormat: number;
}

// ==========================================
// Domain 4: Contextual Matching Interfaces
// ==========================================

export interface OpenTypeLookupRecord {
	sequenceIndex: number;
	lookupListIndex: number;
}

export interface OpenTypeContextRule {
	glyphCount: number;
	lookupCount: number;
	input: number[];
	lookupRecords: OpenTypeLookupRecord[];
}

export interface OpenTypeContextClassRule {
	glyphCount: number;
	lookupCount: number;
	classes: number[];
	lookupRecords: OpenTypeLookupRecord[];
}

export interface OpenTypeContextV1 {
	version: 1;
	coverage: OpenTypeCoverageTable;
	ruleSetCount: number;
	ruleSets: OpenTypeContextRule[][];
}

export interface OpenTypeContextV2 {
	version: 2;
	coverage: OpenTypeCoverageTable;
	classDef: OpenTypeClassDefTable;
	classSetCnt: number;
	classSet: OpenTypeContextClassRule[][];
}

export interface OpenTypeContextV3 {
	version: 3;
	glyphCount: number;
	lookupCount: number;
	coverages: OpenTypeCoverageTable[];
	lookupRecords: OpenTypeLookupRecord[];
}

export type OpenTypeContextTable =
	| OpenTypeContextV1
	| OpenTypeContextV2
	| OpenTypeContextV3;

export interface OpenTypeChainRule {
	backtrackGlyphCount: number;
	backtrack: number[];
	inputGlyphCount: number;
	input: number[];
	lookaheadGlyphCount: number;
	lookahead: number[];
	lookupCount: number;
	lookupRecords: OpenTypeLookupRecord[];
}

export interface OpenTypeChainingContextV1 {
	version: 1;
	coverage: OpenTypeCoverageTable;
	chainCount: number;
	chainRuleSets: OpenTypeChainRule[][];
}

export interface OpenTypeChainingContextV2 {
	version: 2;
	coverage: OpenTypeCoverageTable;
	backtrackClassDef: OpenTypeClassDefTable;
	inputClassDef: OpenTypeClassDefTable;
	lookaheadClassDef: OpenTypeClassDefTable;
	chainCount: number;
	chainClassSet: OpenTypeChainRule[][];
}

export interface OpenTypeChainingContextV3 {
	version: 3;
	backtrackGlyphCount: number;
	backtrackCoverage: OpenTypeCoverageTable[];
	inputGlyphCount: number;
	inputCoverage: OpenTypeCoverageTable[];
	lookaheadGlyphCount: number;
	lookaheadCoverage: OpenTypeCoverageTable[];
	lookupCount: number;
	lookupRecords: OpenTypeLookupRecord[];
}

export type OpenTypeChainingContextTable =
	| OpenTypeChainingContextV1
	| OpenTypeChainingContextV2
	| OpenTypeChainingContextV3;

// ==========================================
// Parsers & Binary Struct Compilation Mapping
// ==========================================

const LangSysTable = new r.Struct<any, OpenTypeLangSysTable>({
	reserved: new r.Reserved(r.uint16),
	reqFeatureIndex: r.uint16,
	featureCount: r.uint16,
	featureIndexes: new r.Array(r.uint16, 'featureCount'),
});

const LangSysRecord = new r.Struct<any, OpenTypeLangSysRecord>({
	tag: new r.String(4),
	langSys: new r.Pointer(r.uint16, LangSysTable, { type: 'parent' }),
});

const Script = new r.Struct<any, OpenTypeScriptTable>({
	defaultLangSys: new r.Pointer(r.uint16, LangSysTable),
	count: r.uint16,
	langSysRecords: new r.Array(LangSysRecord, 'count'),
});

const ScriptRecord = new r.Struct<any, OpenTypeScriptRecord>({
	tag: new r.String(4),
	script: new r.Pointer(r.uint16, Script, { type: 'parent' }),
});

export const ScriptList = new r.Array(ScriptRecord, r.uint16);

export const Feature = new r.Struct<any, OpenTypeFeatureTable>({
	featureParams: r.uint16,
	lookupCount: r.uint16,
	lookupListIndexes: new r.Array(r.uint16, 'lookupCount'),
});

const FeatureRecord = new r.Struct<any, OpenTypeFeatureRecord>({
	tag: new r.String(4),
	feature: new r.Pointer(r.uint16, Feature, { type: 'parent' }),
});

export const FeatureList = new r.Array(FeatureRecord, r.uint16);

const LookupFlags = new r.Struct<any, OpenTypeLookupFlags>({
	markAttachmentType: r.uint8,
	flags: new r.Bitfield(r.uint8, [
		'rightToLeft',
		'ignoreBaseGlyphs',
		'ignoreLigatures',
		'ignoreMarks',
		'useMarkFilteringSet',
	]),
});

export function LookupList<T>(
	SubTable: FieldT<T>,
): FieldT<OpenTypeLookupTable<T>[]> {
	const Lookup = new r.Struct<any, OpenTypeLookupTable<T>>({
		lookupType: r.uint16,
		flags: LookupFlags,
		subTableCount: r.uint16,
		subTables: new r.Array(new r.Pointer(r.uint16, SubTable), 'subTableCount'),
		markFilteringSet: new r.Optional(
			r.uint16,
			(t: any) => t.flags.flags.useMarkFilteringSet,
		),
	});

	// 1. Pass FieldT<any> to represent the nested r.Pointer field wrapping the Lookup struct
	// 2. Keep OpenTypeLookupTable<T>[] as the clean output signature
	return new r.LazyArray<FieldT<any>, OpenTypeLookupTable<T>[]>(
		new r.Pointer(r.uint16, Lookup),
		r.uint16,
	);
}

const RangeRecord = new r.Struct<any, OpenTypeRangeRecord>({
	start: r.uint16,
	end: r.uint16,
	startCoverageIndex: r.uint16,
});

export const Coverage = new r.VersionedStruct<any, OpenTypeCoverageTable>(
	r.uint16,
	{
		1: {
			glyphCount: r.uint16,
			glyphs: new r.Array(r.uint16, 'glyphCount'),
		},
		2: {
			rangeCount: r.uint16,
			rangeRecords: new r.Array(RangeRecord, 'rangeCount'),
		},
	},
);

const ClassRangeRecord = new r.Struct<any, OpenTypeClassRangeRecord>({
	start: r.uint16,
	end: r.uint16,
	class: r.uint16,
});

export const ClassDef = new r.VersionedStruct<any, OpenTypeClassDefTable>(
	r.uint16,
	{
		1: {
			startGlyph: r.uint16,
			glyphCount: r.uint16,
			classValueArray: new r.Array(r.uint16, 'glyphCount'),
		},
		2: {
			classRangeCount: r.uint16,
			classRangeRecord: new r.Array(ClassRangeRecord, 'classRangeCount'),
		},
	},
);

export const Device = new r.Struct<any, OpenTypeDeviceTable>({
	a: r.uint16,
	b: r.uint16,
	deltaFormat: r.uint16,
});

const LookupRecord = new r.Struct<any, OpenTypeLookupRecord>({
	sequenceIndex: r.uint16,
	lookupListIndex: r.uint16,
});

const Rule = new r.Struct<any, OpenTypeContextRule>({
	glyphCount: r.uint16,
	lookupCount: r.uint16,
	input: new r.Array(r.uint16, (t: any) => t.glyphCount - 1),
	lookupRecords: new r.Array(LookupRecord, 'lookupCount'),
});

const RuleSet = new r.Array(new r.Pointer(r.uint16, Rule), r.uint16);

const ClassRule = new r.Struct<any, OpenTypeContextClassRule>({
	glyphCount: r.uint16,
	lookupCount: r.uint16,
	classes: new r.Array(r.uint16, (t: any) => t.glyphCount - 1),
	lookupRecords: new r.Array(LookupRecord, 'lookupCount'),
});

const ClassSet = new r.Array(new r.Pointer(r.uint16, ClassRule), r.uint16);

export const Context = new r.VersionedStruct<any, OpenTypeContextTable>(
	r.uint16,
	{
		1: {
			coverage: new r.Pointer(r.uint16, Coverage),
			ruleSetCount: r.uint16,
			ruleSets: new r.Array(new r.Pointer(r.uint16, RuleSet), 'ruleSetCount'),
		},
		2: {
			coverage: new r.Pointer(r.uint16, Coverage),
			classDef: new r.Pointer(r.uint16, ClassDef),
			classSetCnt: r.uint16,
			classSet: new r.Array(new r.Pointer(r.uint16, ClassSet), 'classSetCnt'),
		},
		3: {
			glyphCount: r.uint16,
			lookupCount: r.uint16,
			coverages: new r.Array(new r.Pointer(r.uint16, Coverage), 'glyphCount'),
			lookupRecords: new r.Array(LookupRecord, 'lookupCount'),
		},
	},
);

const ChainRule = new r.Struct<any, OpenTypeChainRule>({
	backtrackGlyphCount: r.uint16,
	backtrack: new r.Array(r.uint16, 'backtrackGlyphCount'),
	inputGlyphCount: r.uint16,
	input: new r.Array(r.uint16, (t: any) => t.inputGlyphCount - 1),
	lookaheadGlyphCount: r.uint16,
	lookahead: new r.Array(r.uint16, 'lookaheadGlyphCount'),
	lookupCount: r.uint16,
	lookupRecords: new r.Array(LookupRecord, 'lookupCount'),
});

const ChainRuleSet = new r.Array(new r.Pointer(r.uint16, ChainRule), r.uint16);

export const ChainingContext = new r.VersionedStruct<
	any,
	OpenTypeChainingContextTable
>(r.uint16, {
	1: {
		coverage: new r.Pointer(r.uint16, Coverage),
		chainCount: r.uint16,
		chainRuleSets: new r.Array(
			new r.Pointer(r.uint16, ChainRuleSet),
			'chainCount',
		),
	},
	2: {
		coverage: new r.Pointer(r.uint16, Coverage),
		backtrackClassDef: new r.Pointer(r.uint16, ClassDef),
		inputClassDef: new r.Pointer(r.uint16, ClassDef),
		lookaheadClassDef: new r.Pointer(r.uint16, ClassDef),
		chainCount: r.uint16,
		chainClassSet: new r.Array(
			new r.Pointer(r.uint16, ChainRuleSet),
			'chainCount',
		),
	},
	3: {
		backtrackGlyphCount: r.uint16,
		backtrackCoverage: new r.Array(
			new r.Pointer(r.uint16, Coverage),
			'backtrackGlyphCount',
		),
		inputGlyphCount: r.uint16,
		inputCoverage: new r.Array(
			new r.Pointer(r.uint16, Coverage),
			'inputGlyphCount',
		),
		lookaheadGlyphCount: r.uint16,
		lookaheadCoverage: new r.Array(
			new r.Pointer(r.uint16, Coverage),
			'lookaheadGlyphCount',
		),
		lookupCount: r.uint16,
		lookupRecords: new r.Array(LookupRecord, 'lookupCount'),
	},
});
