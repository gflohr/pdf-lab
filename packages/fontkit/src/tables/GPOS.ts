import r, {
	type DecodeStream,
	type FieldT,
	type PointerT,
	type RestructureLazyArray,
	type StructT,
} from '@pdf-lib/restructure';
import {
	ChainingContext,
	ClassDef,
	Context,
	Coverage,
	Device,
	FeatureList,
	LookupList,
	type OpenTypeChainingContextTable,
	type OpenTypeClassDefTable,
	type OpenTypeContextTable,
	type OpenTypeCoverageTable,
	type OpenTypeDeviceTable,
	type OpenTypeFeatureRecord,
	type OpenTypeLookupTable,
	type OpenTypeScriptRecord,
	ScriptList,
} from './opentype.js';
import {
	FeatureVariations,
	type OpenTypeFeatureVariationsTable,
} from './variations.js';

const ValueFormat = new r.Bitfield(r.uint16, [
	'xPlacement',
	'yPlacement',
	'xAdvance',
	'yAdvance',
	'xPlaDevice',
	'yPlaDevice',
	'xAdvDevice',
	'yAdvDevice',
]);

const types = {
	xPlacement: r.int16,
	yPlacement: r.int16,
	xAdvance: r.int16,
	yAdvance: r.int16,
	xPlaDevice: new r.Pointer(r.uint16, Device, {
		type: 'global',
		relativeTo: 'rel',
	}),
	yPlaDevice: new r.Pointer(r.uint16, Device, {
		type: 'global',
		relativeTo: 'rel',
	}),
	xAdvDevice: new r.Pointer(r.uint16, Device, {
		type: 'global',
		relativeTo: 'rel',
	}),
	yAdvDevice: new r.Pointer(r.uint16, Device, {
		type: 'global',
		relativeTo: 'rel',
	}),
};

export class ValueRecord implements FieldT<GPOSTable.GPOSDecodedValueRecord> {
	private key: string;

	constructor(key: string = 'valueFormat') {
		this.key = key;
	}

	/**
	 * Walks up the parent chain to find the structural configuration
	 * and dynamically constructs the appropriate layout.
	 */

	// biome-ignore lint/suspicious/noExplicitAny: see above!
	private buildStruct(parent: any): StructT<GPOSTable.GPOSDecodedValueRecord> {
		let struct = parent;

		// Crawl up the hierarchy until we find the format dictionary and a parent
		while (struct && !(struct[this.key] && struct.parent)) {
			struct = struct.parent;
		}

		if (!struct?.[this.key]) {
			// Fallback to an empty struct if the configuration context isn't found
			return new r.Struct({});
		}

		// biome-ignore lint/suspicious/noExplicitAny: see above!
		const fields: Record<string, any> = {};

		// Inject the contextual start offset reference required by restructure
		fields.rel = () => struct._startOffset;

		const format = struct[this.key];
		for (const key in format) {
			const fieldKey = key as keyof typeof types;
			if (format[fieldKey] && types[fieldKey]) {
				fields[fieldKey] = types[fieldKey];
			}
		}

		return new r.Struct<typeof fields, GPOSTable.GPOSDecodedValueRecord>(
			fields,
		);
	}

	// biome-ignore lint/suspicious/noExplicitAny: see above!
	size(val?: any, ctx?: any): number {
		return this.buildStruct(ctx).size(val, ctx);
	}

	// biome-ignore lint/suspicious/noExplicitAny: see above!
	decode(stream: DecodeStream, parent?: any): any {
		const res = this.buildStruct(parent).decode(stream, parent);
		// Clean up the transient helper reference before passing data back
		if (res) {
			delete res.rel;
		}
		return res;
	}

	encode(): void {
		throw new Error('ValueRecord does not implement encoding.');
	}
}

export namespace GPOSTable {
	export interface GPOSDecodedValueRecord {
		xPlacement?: number;
		yPlacement?: number;
		xAdvance?: number;
		yAdvance?: number;
		// Pointers wrap the underlying Device structure.
		xPlaDevice?: typeof types.xPlaDevice extends PointerT<infer T>
			? T
			: OpenTypeDeviceTable;
		yPlaDevice?: typeof types.yPlaDevice extends PointerT<infer T>
			? T
			: OpenTypeDeviceTable;
		xAdvDevice?: typeof types.xAdvDevice extends PointerT<infer T>
			? T
			: OpenTypeDeviceTable;
		yAdvDevice?: typeof types.yAdvDevice extends PointerT<infer T>
			? T
			: OpenTypeDeviceTable;
	}

	export interface GPOSPairValueRecord {
		secondGlyph: number;
		value1: ValueRecord;
		value2: ValueRecord;
	}

	export interface GPOSClass2Record {
		value1: ValueRecord;
		value2: ValueRecord;
	}

	/** Design units only. */
	export interface GPOSAnchorV1 {
		version: 1;
		xCoordinate: number;
		yCoordinate: number;
	}

	/** Design units plus contour point. */
	export interface GPOSAnchorV2 {
		version: 2;
		xCoordinate: number;
		yCoordinate: number;
		anchorPoint: number;
	}

	/** Design units plus device tables. */
	export interface GPOSAnchorV3 {
		version: 3;
		xCoordinate: number;
		yCoordinate: number;
		xDeviceTable: OpenTypeDeviceTable;
		yDeviceTable: OpenTypeDeviceTable;
	}

	export type GPOSAnchor = GPOSAnchorV1 | GPOSAnchorV2 | GPOSAnchorV3;

	// Restored conditional extraction matching your morx table implementation
	export interface GPOSEntryExitRecord {
		entryAnchor: typeof Anchor extends PointerT<infer T> ? T : GPOSAnchor;
		exitAnchor: typeof Anchor extends PointerT<infer T> ? T : GPOSAnchor;
	}

	export interface GPOSMarkRecord {
		class: number;
		markAnchor: typeof Anchor extends PointerT<infer T> ? T : GPOSAnchor;
	}

	// Single Adjustment
	export interface GPOSLookupV1_1 {
		version: 1;

		// Single positioning value
		coverage: OpenTypeCoverageTable | null;
		valueFormat: typeof ValueFormat;
		value: ValueRecord;
	}

	export interface GPOSLookupV1_2 {
		version: 2;
		coverage: OpenTypeCoverageTable | null;
		valueFormat: typeof ValueFormat;
		valueCount: number;
		values: RestructureLazyArray<ValueRecord>;
	}

	export type GPOSLookupV1 = GPOSLookupV1_1 | GPOSLookupV1_2;

	// Pair Adjustment Positioning
	export interface GPOSLookupV2_1 {
		version: 1;

		// Adjustments for glyph pairs
		coverage: OpenTypeCoverageTable | null;
		valueFormat1: typeof ValueFormat;
		valueFormat2: typeof ValueFormat;
		pairSetCount: number;
		pairSets: RestructureLazyArray<GPOSPairValueRecord>;
	}

	// Class pair adjustment
	export interface GPOSLookupV2_2 {
		version: 2;

		coverage: OpenTypeCoverageTable | null;
		valueFormat1: typeof ValueFormat;
		valueFormat2: typeof ValueFormat;
		classDef1: OpenTypeClassDefTable | null;
		classDef2: OpenTypeClassDefTable | null;
		class1Count: number;
		class2Count: number;
		classRecords: RestructureLazyArray<GPOSClass2Record>;
	}

	export type GPOSLookupV2 = GPOSLookupV2_1 | GPOSLookupV2_2;

	// Cursive Attachment Positioning.
	export interface GPOSLookupV3 {
		version: 3;
		format: number;
		coverage: OpenTypeCoverageTable | null;
		entryExitCount: number;
		entryExitRecords: GPOSEntryExitRecord[];
	}

	// MarkToBase Attachment Positioning.
	export interface GPOSLookupV4 {
		version: 4;
		format: number;
		markCoverage: OpenTypeCoverageTable | null;
		baseCoverage: OpenTypeCoverageTable | null;
		classCount: number;
		markArray: GPOSMarkRecord | null;
		// FIXME! This is maybe wrong!
		baseArray: GPOSAnchor[] | null;
	}

	// MarkToLigature Attachment Positioning
	export interface GPOSLookupV5 {
		version: 5;
		format: number;
		markCoverage: OpenTypeCoverageTable | null;
		ligatureCoverage: OpenTypeCoverageTable | null;
		classCount: number;
		markArray: GPOSMarkRecord[] | null;
		// FIXME! This has to checked later!
		ligatureArray: unknown;
	}

	// MarkToMark Attachment Positioning
	export interface GPOSLookupV6 {
		version: 6;
		format: number;
		mark1Coverage: OpenTypeCoverageTable | null;
		mark2Coverage: OpenTypeCoverageTable | null;
		classCount: number;
		mark1Array: GPOSMarkRecord[] | null;
		// FIXME! Check later.
		mark2Array: unknown;
	}

	export type GPOSLookupV7 = OpenTypeContextTable & { version: 7 };

	export type GPOSLookupV8 = OpenTypeChainingContextTable & { version: 8 };

	export interface GPOSLookupV9 {
		version: 9;
		// Extension Positioning
		posFormat: number;
		lookupType: number; // cannot also be 9
		// FIXME!
		extension: GPOSLookup;
	}

	export type GPOSLookup =
		| GPOSLookupV1
		| GPOSLookupV2
		| GPOSLookupV3
		| GPOSLookupV4
		| GPOSLookupV5
		| GPOSLookupV6
		| GPOSLookupV7
		| GPOSLookupV8
		| GPOSLookupV9;

	interface GPOSBase {
		scriptList: OpenTypeScriptRecord[];
		featureList: OpenTypeFeatureRecord;
		lookupList: FieldT<OpenTypeLookupTable<GPOSLookup>[]> | null;
	}

	export interface GPOSV1_0 extends GPOSBase {
		version: 1.0;
	}

	export interface GPOSV1_1 extends GPOSBase {
		version: 1.1;
		featureVariations: OpenTypeFeatureVariationsTable | null;
	}

	export type GPOS = GPOSV1_0 | GPOSV1_1;
}

const pairValueRecordFields = {
	secondGlyph: r.uint16,
	value1: new ValueRecord('valueFormat1'),
	value2: new ValueRecord('valueFormat2'),
};
const PairValueRecord = new r.Struct<
	typeof pairValueRecordFields,
	GPOSTable.GPOSPairValueRecord
>(pairValueRecordFields);

const PairSet = new r.Array(PairValueRecord, r.uint16);

const class2RecordFields = {
	value1: new ValueRecord('valueFormat1'),
	value2: new ValueRecord('valueFormat2'),
};
const Class2Record = new r.Struct<
	typeof class2RecordFields,
	GPOSTable.GPOSClass2Record
>(class2RecordFields);

const anchorFields = {
	1: {
		// Design units only
		xCoordinate: r.int16,
		yCoordinate: r.int16,
	},

	2: {
		// Design units plus contour point
		xCoordinate: r.int16,
		yCoordinate: r.int16,
		anchorPoint: r.uint16,
	},

	3: {
		// Design units plus Device tables
		xCoordinate: r.int16,
		yCoordinate: r.int16,
		xDeviceTable: new r.Pointer(r.uint16, Device),
		yDeviceTable: new r.Pointer(r.uint16, Device),
	},
};
const Anchor = new r.VersionedStruct<typeof anchorFields, GPOSTable.GPOSAnchor>(
	r.uint16,
	anchorFields,
);

const entryExitRecordFields = {
	entryAnchor: new r.Pointer(r.uint16, Anchor, { type: 'parent' }),
	exitAnchor: new r.Pointer(r.uint16, Anchor, { type: 'parent' }),
};
const EntryExitRecord = new r.Struct<
	typeof entryExitRecordFields,
	GPOSTable.GPOSEntryExitRecord
>(entryExitRecordFields);

const markRecordFields = {
	class: r.uint16,
	markAnchor: new r.Pointer(r.uint16, Anchor, { type: 'parent' }),
};
const MarkRecord = new r.Struct<
	typeof markRecordFields,
	GPOSTable.GPOSMarkRecord
>(markRecordFields);

const MarkArray = new r.Array(MarkRecord, r.uint16);

const BaseRecord = new r.Array(
	new r.Pointer(r.uint16, Anchor),
	(t) => t.parent.classCount,
);
const BaseArray = new r.Array(BaseRecord, r.uint16);

const ComponentRecord = new r.Array(
	new r.Pointer(r.uint16, Anchor),
	(t) => t.parent.parent.classCount,
);
const LigatureAttach = new r.Array(ComponentRecord, r.uint16);
const LigatureArray = new r.Array(
	new r.Pointer(r.uint16, LigatureAttach),
	r.uint16,
);

const selfPointer = new r.Pointer(r.uint32, null);
const gposLookupFieldsV1 = {
	// Single Adjustment
	1: {
		// Single positioning value
		coverage: new r.Pointer(r.uint16, Coverage),
		valueFormat: ValueFormat,
		value: new ValueRecord(),
	},
	2: {
		coverage: new r.Pointer(r.uint16, Coverage),
		valueFormat: ValueFormat,
		valueCount: r.uint16,
		values: new r.LazyArray(new ValueRecord(), 'valueCount'),
	},
};
const gposLookupFieldsV2 = {
	// Pair Adjustment Positioning
	1: {
		// Adjustments for glyph pairs
		coverage: new r.Pointer(r.uint16, Coverage),
		valueFormat1: ValueFormat,
		valueFormat2: ValueFormat,
		pairSetCount: r.uint16,
		pairSets: new r.LazyArray(new r.Pointer(r.uint16, PairSet), 'pairSetCount'),
	},

	2: {
		// Class pair adjustment
		coverage: new r.Pointer(r.uint16, Coverage),
		valueFormat1: ValueFormat,
		valueFormat2: ValueFormat,
		classDef1: new r.Pointer(r.uint16, ClassDef),
		classDef2: new r.Pointer(r.uint16, ClassDef),
		class1Count: r.uint16,
		class2Count: r.uint16,
		classRecords: new r.LazyArray(
			new r.LazyArray(Class2Record, 'class2Count'),
			'class1Count',
		),
	},
};

const gposLookupFields = {
	1: new r.VersionedStruct<typeof gposLookupFieldsV1, GPOSTable.GPOSLookupV1>(
		r.uint16,
		gposLookupFieldsV1,
	),

	2: new r.VersionedStruct<typeof gposLookupFieldsV2, GPOSTable.GPOSLookupV2>(
		r.uint16,
		gposLookupFieldsV2,
	),

	3: {
		// Cursive Attachment Positioning.
		format: r.uint16,
		coverage: new r.Pointer(r.uint16, Coverage),
		entryExitCount: r.uint16,
		entryExitRecords: new r.Array(EntryExitRecord, 'entryExitCount'),
	},

	4: {
		// MarkToBase Attachment Positioning.
		format: r.uint16,
		markCoverage: new r.Pointer(r.uint16, Coverage),
		baseCoverage: new r.Pointer(r.uint16, Coverage),
		classCount: r.uint16,
		markArray: new r.Pointer(r.uint16, MarkArray),
		baseArray: new r.Pointer(r.uint16, BaseArray),
	},

	5: {
		// MarkToLigature Attachment Positioning
		format: r.uint16,
		markCoverage: new r.Pointer(r.uint16, Coverage),
		ligatureCoverage: new r.Pointer(r.uint16, Coverage),
		classCount: r.uint16,
		markArray: new r.Pointer(r.uint16, MarkArray),
		ligatureArray: new r.Pointer(r.uint16, LigatureArray),
	},

	6: {
		// MarkToMark Attachment Positioning
		format: r.uint16,
		mark1Coverage: new r.Pointer(r.uint16, Coverage),
		mark2Coverage: new r.Pointer(r.uint16, Coverage),
		classCount: r.uint16,
		mark1Array: new r.Pointer(r.uint16, MarkArray),
		mark2Array: new r.Pointer(r.uint16, BaseArray),
	},

	7: Context, // Contextual positioning
	8: ChainingContext, // Chaining contextual positioning

	9: {
		// Extension Positioning
		posFormat: r.uint16,
		lookupType: r.uint16, // cannot also be 9
		extension: selfPointer,
	},
};
const GPOSLookup = new r.VersionedStruct<
	typeof gposLookupFields,
	GPOSTable.GPOSLookup
>('lookupType', gposLookupFields);

// Fix circular reference
selfPointer.type = GPOSLookup;

const gposStructFields = {
	header: {
		scriptList: new r.Pointer(r.uint16, ScriptList),
		featureList: new r.Pointer(r.uint16, FeatureList),
		lookupList: new r.Pointer(r.uint16, LookupList(GPOSLookup)),
	},

	65536: {},
	65537: {
		featureVariations: new r.Pointer(r.uint32, FeatureVariations),
	},
};
const GPOSStruct = new r.VersionedStruct<typeof gposStructFields>(
	r.uint32,
	gposStructFields,
);
export default GPOSStruct;

export { GPOSLookup };
