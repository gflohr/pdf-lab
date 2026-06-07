import r, { type FieldT } from '@pdf-lib/restructure';
import type { AATFeatures } from '../aat/AATFeatureMap.js';

/**
 * A map of OpenType features as described in OpenType's spec:
 * https://docs.microsoft.com/en-gb/typography/opentype/spec/featurelist.
 */
export interface OpenTypeFeatures {
	aalt?: boolean;
	abvf?: boolean;
	abvm?: boolean;
	abvs?: boolean;
	afrc?: boolean;
	akhn?: boolean;
	blwf?: boolean;
	blwm?: boolean;
	blws?: boolean;
	calt?: boolean;
	case?: boolean;
	ccmp?: boolean;
	cfar?: boolean;
	cjct?: boolean;
	clig?: boolean;
	cpct?: boolean;
	cpsp?: boolean;
	cswh?: boolean;
	curs?: boolean;
	cv01?: boolean;
	cv02?: boolean;
	cv03?: boolean;
	cv04?: boolean;
	cv05?: boolean;
	cv06?: boolean;
	cv07?: boolean;
	cv08?: boolean;
	cv09?: boolean;
	cv10?: boolean;
	cv11?: boolean;
	cv22?: boolean;
	cv23?: boolean;
	cv24?: boolean;
	cv25?: boolean;
	cv26?: boolean;
	cv27?: boolean;
	cv28?: boolean;
	cv29?: boolean;
	cv30?: boolean;
	cv31?: boolean;
	cv32?: boolean;
	cv33?: boolean;
	cv34?: boolean;
	cv35?: boolean;
	cv36?: boolean;
	cv37?: boolean;
	cv38?: boolean;
	cv39?: boolean;
	cv40?: boolean;
	cv41?: boolean;
	cv42?: boolean;
	cv43?: boolean;
	cv44?: boolean;
	cv45?: boolean;
	cv46?: boolean;
	cv47?: boolean;
	cv48?: boolean;
	cv49?: boolean;
	cv50?: boolean;
	cv51?: boolean;
	cv52?: boolean;
	cv53?: boolean;
	cv54?: boolean;
	cv55?: boolean;
	cv56?: boolean;
	cv57?: boolean;
	cv58?: boolean;
	cv59?: boolean;
	cv60?: boolean;
	cv61?: boolean;
	cv62?: boolean;
	cv63?: boolean;
	cv64?: boolean;
	cv65?: boolean;
	cv66?: boolean;
	cv67?: boolean;
	cv68?: boolean;
	cv69?: boolean;
	cv70?: boolean;
	cv71?: boolean;
	cv72?: boolean;
	cv73?: boolean;
	cv74?: boolean;
	cv75?: boolean;
	cv76?: boolean;
	cv77?: boolean;
	cv78?: boolean;
	cv79?: boolean;
	cv80?: boolean;
	cv81?: boolean;
	cv82?: boolean;
	cv83?: boolean;
	cv84?: boolean;
	cv85?: boolean;
	cv86?: boolean;
	cv87?: boolean;
	cv88?: boolean;
	cv89?: boolean;
	cv90?: boolean;
	cv91?: boolean;
	cv92?: boolean;
	cv93?: boolean;
	cv94?: boolean;
	cv95?: boolean;
	cv96?: boolean;
	cv97?: boolean;
	cv98?: boolean;
	cv99?: boolean;
	c2pc?: boolean;
	c2sc?: boolean;
	dist?: boolean;
	dlig?: boolean;
	dnom?: boolean;
	dtls?: boolean;
	expt?: boolean;
	falt?: boolean;
	fin2?: boolean;
	fin3?: boolean;
	fina?: boolean;
	flac?: boolean;
	frac?: boolean;
	fwid?: boolean;
	half?: boolean;
	haln?: boolean;
	halt?: boolean;
	hist?: boolean;
	hkna?: boolean;
	hlig?: boolean;
	hngl?: boolean;
	hojo?: boolean;
	hwid?: boolean;
	init?: boolean;
	isol?: boolean;
	ital?: boolean;
	jalt?: boolean;
	jp78?: boolean;
	jp83?: boolean;
	jp90?: boolean;
	jp04?: boolean;
	kern?: boolean;
	lfbd?: boolean;
	liga?: boolean;
	ljmo?: boolean;
	lnum?: boolean;
	locl?: boolean;
	ltra?: boolean;
	ltrm?: boolean;
	mark?: boolean;
	med2?: boolean;
	medi?: boolean;
	mgrk?: boolean;
	mkmk?: boolean;
	mset?: boolean;
	nalt?: boolean;
	nlck?: boolean;
	nukt?: boolean;
	numr?: boolean;
	onum?: boolean;
	opbd?: boolean;
	ordn?: boolean;
	ornm?: boolean;
	palt?: boolean;
	pcap?: boolean;
	pkna?: boolean;
	pnum?: boolean;
	pref?: boolean;
	pres?: boolean;
	pstf?: boolean;
	psts?: boolean;
	pwid?: boolean;
	qwid?: boolean;
	rand?: boolean;
	rclt?: boolean;
	rkrf?: boolean;
	rlig?: boolean;
	rphf?: boolean;
	rtbd?: boolean;
	rtla?: boolean;
	rtlm?: boolean;
	ruby?: boolean;
	rvrn?: boolean;
	salt?: boolean;
	sinf?: boolean;
	size?: boolean;
	smcp?: boolean;
	smpl?: boolean;
	ss01?: boolean;
	ss02?: boolean;
	ss03?: boolean;
	ss04?: boolean;
	ss05?: boolean;
	ss06?: boolean;
	ss07?: boolean;
	ss08?: boolean;
	ss09?: boolean;
	ss10?: boolean;
	ss11?: boolean;
	ss12?: boolean;
	ss13?: boolean;
	ss14?: boolean;
	ss15?: boolean;
	ss16?: boolean;
	ss17?: boolean;
	ss18?: boolean;
	ss19?: boolean;
	ss20?: boolean;
	ssty?: boolean;
	stch?: boolean;
	subs?: boolean;
	sups?: boolean;
	swsh?: boolean;
	titl?: boolean;
	tjmo?: boolean;
	tnam?: boolean;
	tnum?: boolean;
	trad?: boolean;
	twid?: boolean;
	unic?: boolean;
	valt?: boolean;
	vatu?: boolean;
	vert?: boolean;
	vhal?: boolean;
	vjmo?: boolean;
	vkna?: boolean;
	vkrn?: boolean;
	vpal?: boolean;
	vrt2?: boolean;
	vrtr?: boolean;
	zero?: boolean;
}

/**
 * The features is an object mapping OpenType feature to a boolean
 * enabling or disabling each. If this is an AAT font,
 * the OpenType feature tags are mapped to AAT features.
 */
export interface TypeFeatures extends OpenTypeFeatures, AATFeatures {
	[key: string]: boolean | undefined;
}

/**
 * Baseline master layout properties shared across all OpenType Layout Engines
 * (GSUB and GPOS).
 */
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
	markFilteringSet?: number | null;
}

export interface OpenTypeLayoutTableBase<TLookupTable> {
	/** Pointer to the ScriptList table which defines font scripts and language systems. */
	scriptList: OpenTypeScriptRecord[] | null;
	/** Pointer to the FeatureList table which maps typographical layout features. */
	featureList: OpenTypeFeatureRecord[];
	/** List of lookup execution sequence steps mapping specific structural changes. */
	lookupList: OpenTypeLookupTable<TLookupTable>[];
}

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

export type OpenTypeChainingContext =
	| OpenTypeChainingContextV1
	| OpenTypeChainingContextV2
	| OpenTypeChainingContextV3;

const langSysTableFields = {
	reserved: new r.Reserved(r.uint16),
	reqFeatureIndex: r.uint16,
	featureCount: r.uint16,
	featureIndexes: new r.Array(r.uint16, 'featureCount'),
};
const LangSysTable = new r.Struct<
	typeof langSysTableFields,
	OpenTypeLangSysTable
>(langSysTableFields);

const langSysRecordFields = {
	tag: new r.String(4),
	langSys: new r.Pointer(r.uint16, LangSysTable, { type: 'parent' }),
};
const LangSysRecord = new r.Struct<
	typeof langSysRecordFields,
	OpenTypeLangSysRecord
>(langSysRecordFields);

const scriptFields = {
	defaultLangSys: new r.Pointer(r.uint16, LangSysTable),
	count: r.uint16,
	langSysRecords: new r.Array(LangSysRecord, 'count'),
};
const Script = new r.Struct<typeof scriptFields, OpenTypeScriptTable>(
	scriptFields,
);

const scriptRecordFields = {
	tag: new r.String(4),
	script: new r.Pointer(r.uint16, Script, { type: 'parent' }),
};
const ScriptRecord = new r.Struct<
	typeof scriptRecordFields,
	OpenTypeScriptRecord
>(scriptRecordFields);

export const ScriptList = new r.Array(ScriptRecord, r.uint16);

const featureFields = {
	featureParams: r.uint16,
	lookupCount: r.uint16,
	lookupListIndexes: new r.Array(r.uint16, 'lookupCount'),
};
export const Feature = new r.Struct<typeof featureFields, OpenTypeFeatureTable>(
	featureFields,
);

const featureRecordFields = {
	tag: new r.String(4),
	feature: new r.Pointer(r.uint16, Feature, { type: 'parent' }),
};
const FeatureRecord = new r.Struct<
	typeof featureRecordFields,
	OpenTypeFeatureRecord
>(featureRecordFields);

export const FeatureList = new r.Array(FeatureRecord, r.uint16);

const lookupFlagsFields = {
	markAttachmentType: r.uint8,
	flags: new r.Bitfield(r.uint8, [
		'rightToLeft',
		'ignoreBaseGlyphs',
		'ignoreLigatures',
		'ignoreMarks',
		'useMarkFilteringSet',
	]),
};
const LookupFlags = new r.Struct<typeof lookupFlagsFields, OpenTypeLookupFlags>(
	lookupFlagsFields,
);

export function LookupList<T>(
	SubTable: FieldT<T>,
): FieldT<OpenTypeLookupTable<T>[]> {
	const lookupFields = {
		lookupType: r.uint16,
		flags: LookupFlags,
		subTableCount: r.uint16,
		subTables: new r.Array(new r.Pointer(r.uint16, SubTable), 'subTableCount'),
		markFilteringSet: new r.Optional(
			r.uint16,
			(t: { flags: { flags: { useMarkFilteringSet: boolean } } }) =>
				t.flags.flags.useMarkFilteringSet,
		),
	};
	const Lookup = new r.Struct<typeof lookupFields, OpenTypeLookupTable<T>>(
		lookupFields,
	);

	return new r.LazyArray<FieldT<unknown>, OpenTypeLookupTable<T>[]>(
		new r.Pointer(r.uint16, Lookup),
		r.uint16,
	);
}

const rangeRecordFields = {
	start: r.uint16,
	end: r.uint16,
	startCoverageIndex: r.uint16,
};
const RangeRecord = new r.Struct<typeof rangeRecordFields, OpenTypeRangeRecord>(
	rangeRecordFields,
);

const coverageFields = {
	1: {
		glyphCount: r.uint16,
		glyphs: new r.Array(r.uint16, 'glyphCount'),
	},
	2: {
		rangeCount: r.uint16,
		rangeRecords: new r.Array(RangeRecord, 'rangeCount'),
	},
};
export const Coverage = new r.VersionedStruct<
	typeof coverageFields,
	OpenTypeCoverageTable
>(r.uint16, coverageFields);

const classRangeRecordFields = {
	start: r.uint16,
	end: r.uint16,
	class: r.uint16,
};
const ClassRangeRecord = new r.Struct<
	typeof classRangeRecordFields,
	OpenTypeClassRangeRecord
>(classRangeRecordFields);

const classDefFields = {
	1: {
		startGlyph: r.uint16,
		glyphCount: r.uint16,
		classValueArray: new r.Array(r.uint16, 'glyphCount'),
	},
	2: {
		classRangeCount: r.uint16,
		classRangeRecord: new r.Array(ClassRangeRecord, 'classRangeCount'),
	},
};
export const ClassDef = new r.VersionedStruct<
	typeof classDefFields,
	OpenTypeClassDefTable
>(r.uint16, classDefFields);

const deviceFields = {
	a: r.uint16,
	b: r.uint16,
	deltaFormat: r.uint16,
};
export const Device = new r.Struct<typeof deviceFields, OpenTypeDeviceTable>(
	deviceFields,
);

const lookupRecordFields = {
	sequenceIndex: r.uint16,
	lookupListIndex: r.uint16,
};
const LookupRecord = new r.Struct<
	typeof lookupRecordFields,
	OpenTypeLookupRecord
>(lookupRecordFields);

const ruleFields = {
	glyphCount: r.uint16,
	lookupCount: r.uint16,
	input: new r.Array(r.uint16, (t: { glyphCount: number }) => t.glyphCount - 1),
	lookupRecords: new r.Array(LookupRecord, 'lookupCount'),
};
const Rule = new r.Struct<typeof ruleFields, OpenTypeContextRule>(ruleFields);

const RuleSet = new r.Array(new r.Pointer(r.uint16, Rule), r.uint16);

const classRuleFields = {
	glyphCount: r.uint16,
	lookupCount: r.uint16,
	classes: new r.Array(
		r.uint16,
		(t: { glyphCount: number }) => t.glyphCount - 1,
	),
	lookupRecords: new r.Array(LookupRecord, 'lookupCount'),
};
const ClassRule = new r.Struct<
	typeof classRuleFields,
	OpenTypeContextClassRule
>(classRuleFields);

const ClassSet = new r.Array(new r.Pointer(r.uint16, ClassRule), r.uint16);

const contextFields = {
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
};
export const Context = new r.VersionedStruct<
	typeof contextFields,
	OpenTypeContextTable
>(r.uint16, contextFields);

const chainRuleFields = {
	backtrackGlyphCount: r.uint16,
	backtrack: new r.Array(r.uint16, 'backtrackGlyphCount'),
	inputGlyphCount: r.uint16,
	input: new r.Array(
		r.uint16,
		(t: { inputGlyphCount: number }) => t.inputGlyphCount - 1,
	),
	lookaheadGlyphCount: r.uint16,
	lookahead: new r.Array(r.uint16, 'lookaheadGlyphCount'),
	lookupCount: r.uint16,
	lookupRecords: new r.Array(LookupRecord, 'lookupCount'),
};
const ChainRule = new r.Struct<typeof chainRuleFields, OpenTypeChainRule>(
	chainRuleFields,
);

const ChainRuleSet = new r.Array(new r.Pointer(r.uint16, ChainRule), r.uint16);

const chainingContextFields = {
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
};
export const chainingContext = new r.VersionedStruct<
	typeof chainingContextFields,
	OpenTypeChainingContext
>(r.uint16, chainingContextFields);
