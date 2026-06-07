import r, {
	type DecodeStream,
	type FieldT,
	type PointerT,
	type RestructureLazyArray,
	type StructT,
} from '@pdf-lib/restructure';
import {
	type OpenType,
	openTypeChainingContext,
	openTypeClassDef,
	openTypeContext,
	openTypeCoverage,
	openTypeDevice,
	openTypeFeatureList,
	openTypeLookupList,
	openTypeScriptList,
} from './opentype.js';
import {
	type OpenTypeVariation,
	featureVariations,
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
	xPlaDevice: new r.Pointer(r.uint16, openTypeDevice, {
		type: 'global',
		relativeTo: 'rel',
	}),
	yPlaDevice: new r.Pointer(r.uint16, openTypeDevice, {
		type: 'global',
		relativeTo: 'rel',
	}),
	xAdvDevice: new r.Pointer(r.uint16, openTypeDevice, {
		type: 'global',
		relativeTo: 'rel',
	}),
	yAdvDevice: new r.Pointer(r.uint16, openTypeDevice, {
		type: 'global',
		relativeTo: 'rel',
	}),
};

export class ValueRecord implements FieldT<GPOSTable.DecodedValueRecord> {
	private key: string;

	constructor(key: string = 'valueFormat') {
		this.key = key;
	}

	/**
	 * Walks up the parent chain to find the structural configuration
	 * and dynamically constructs the appropriate layout.
	 */
	private buildStruct(parent: any): StructT<GPOSTable.DecodedValueRecord, any> {
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

		return new r.Struct<typeof fields, GPOSTable.DecodedValueRecord>(fields);
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
	export interface DecodedValueRecord {
		xPlacement?: number;
		yPlacement?: number;
		xAdvance?: number;
		yAdvance?: number;
		// Pointers wrap the underlying Device structure.
		xPlaDevice?: typeof types.xPlaDevice extends PointerT<infer T>
			? T
			: OpenType.Device;
		yPlaDevice?: typeof types.yPlaDevice extends PointerT<infer T>
			? T
			: OpenType.Device;
		xAdvDevice?: typeof types.xAdvDevice extends PointerT<infer T>
			? T
			: OpenType.Device;
		yAdvDevice?: typeof types.yAdvDevice extends PointerT<infer T>
			? T
			: OpenType.Device;
	}

	export interface PairValueRecord {
		secondGlyph: number;
		value1: ValueRecord;
		value2: ValueRecord;
	}

	export interface Class2Record {
		value1: ValueRecord;
		value2: ValueRecord;
	}

	/** Design units only. */
	export interface AnchorV1 {
		version: 1;
		xCoordinate: number;
		yCoordinate: number;
	}

	/** Design units plus contour point. */
	export interface AnchorV2 {
		version: 2;
		xCoordinate: number;
		yCoordinate: number;
		anchorPoint: number;
	}

	/** Design units plus device tables. */
	export interface AnchorV3 {
		version: 3;
		xCoordinate: number;
		yCoordinate: number;
		xDeviceTable: OpenType.Device;
		yDeviceTable: OpenType.Device;
	}

	export type Anchor = AnchorV1 | AnchorV2 | AnchorV3;

	// Restored conditional extraction matching your morx table implementation
	export interface EntryExitRecord {
		entryAnchor: typeof Anchor extends PointerT<infer T> ? T : Anchor;
		exitAnchor: typeof Anchor extends PointerT<infer T> ? T : Anchor;
	}

	export interface MarkRecord {
		class: number;
		markAnchor: typeof Anchor extends PointerT<infer T> ? T : Anchor;
	}

	export interface LookupSingleV1 {
		version: 1;

		// Single positioning value
		coverage: OpenType.Coverage | null;
		valueFormat: typeof ValueFormat;
		value: ValueRecord;
	}

	export interface LookupSingleV2 {
		version: 2;
		coverage: OpenType.Coverage | null;
		valueFormat: typeof ValueFormat;
		valueCount: number;
		values: RestructureLazyArray<ValueRecord>;
	}

	// Single Adjustment
	export type LookupSingle = (LookupSingleV1 | LookupSingleV2) & {
		lookupType: 1;
	};

	export interface LookupPairV1 {
		version: 1;

		// Adjustments for glyph pairs
		coverage: OpenType.Coverage | null;
		valueFormat1: typeof ValueFormat;
		valueFormat2: typeof ValueFormat;
		pairSetCount: number;
		pairSets: RestructureLazyArray<PairValueRecord>;
	}

	export interface LookupPairV2 {
		version: 2;

		coverage: OpenType.Coverage | null;
		valueFormat1: typeof ValueFormat;
		valueFormat2: typeof ValueFormat;
		classDef1: OpenType.ClassDef | null;
		classDef2: OpenType.ClassDef | null;
		class1Count: number;
		class2Count: number;
		classRecords: RestructureLazyArray<Class2Record>;
	}

	export type LookupPair = (LookupPairV1 | LookupPairV2) & {
		lookupType: 2;
	};

	// Cursive Attachment Positioning.
	export interface LookupCursive {
		lookupType: 3;
		format: number;
		coverage: OpenType.Coverage | null;
		entryExitCount: number;
		entryExitRecords: EntryExitRecord[];
	}

	// MarkToBase Attachment Positioning.
	export interface LookupMarkToBase {
		lookupType: 4;
		format: number;
		markCoverage: OpenType.Coverage | null;
		baseCoverage: OpenType.Coverage | null;
		classCount: number;
		markArray: MarkRecord | null;
		// FIXME! This is maybe wrong!
		baseArray: Anchor[] | null;
	}

	// MarkToLigature Attachment Positioning
	export interface LookupMarkToLigature {
		lookupType: 5;
		format: number;
		markCoverage: OpenType.Coverage | null;
		ligatureCoverage: OpenType.Coverage | null;
		classCount: number;
		markArray: MarkRecord[] | null;
		// FIXME! This has to checked later!
		ligatureArray: unknown;
	}

	// MarkToMark Attachment Positioning
	export interface LookupMarkToMark {
		lookupType: 6;
		format: number;
		mark1Coverage: OpenType.Coverage | null;
		mark2Coverage: OpenType.Coverage | null;
		classCount: number;
		mark1Array: MarkRecord[] | null;
		// FIXME! Check later.
		mark2Array: unknown;
	}

	export type LookupContext = OpenType.Context & { lookupType: 7 };

	export type LookupChainingContext = OpenType.ChainingContext & {
		lookupType: 8;
	};

	export interface LookupExtension {
		// Extension Positioning
		posFormat: number;
		lookupType: number; // cannot also be 9
		// FIXME!
		extension: LookupTable;
	}

	export type LookupTable =
		| LookupSingle
		| LookupPair
		| LookupCursive
		| LookupMarkToBase
		| LookupMarkToLigature
		| LookupMarkToMark
		| LookupContext
		| LookupChainingContext
		| LookupExtension;

	interface GPOSBase {
		scriptList: OpenType.ScriptRecord[];
		featureList: OpenType.FeatureRecord;
		lookupList: FieldT<OpenType.LookupTable<LookupTable>[]> | null;
	}

	export interface GPOSV1_0 extends GPOSBase {
		version: 1.0;
	}

	export interface GPOSV1_1 extends GPOSBase {
		version: 1.1;
		featureVariations: OpenTypeVariation.FeatureVariations | null;
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
	GPOSTable.PairValueRecord
>(pairValueRecordFields);

const PairSet = new r.Array(PairValueRecord, r.uint16);

const class2RecordFields = {
	value1: new ValueRecord('valueFormat1'),
	value2: new ValueRecord('valueFormat2'),
};
const Class2Record = new r.Struct<
	typeof class2RecordFields,
	GPOSTable.Class2Record
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
		xDeviceTable: new r.Pointer(r.uint16, openTypeDevice),
		yDeviceTable: new r.Pointer(r.uint16, openTypeDevice),
	},
};
const Anchor = new r.VersionedStruct<typeof anchorFields, GPOSTable.Anchor>(
	r.uint16,
	anchorFields,
);

const entryExitRecordFields = {
	entryAnchor: new r.Pointer(r.uint16, Anchor, { type: 'parent' }),
	exitAnchor: new r.Pointer(r.uint16, Anchor, { type: 'parent' }),
};
const EntryExitRecord = new r.Struct<
	typeof entryExitRecordFields,
	GPOSTable.EntryExitRecord
>(entryExitRecordFields);

const markRecordFields = {
	class: r.uint16,
	markAnchor: new r.Pointer(r.uint16, Anchor, { type: 'parent' }),
};
const MarkRecord = new r.Struct<typeof markRecordFields, GPOSTable.MarkRecord>(
	markRecordFields,
);

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
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		valueFormat: ValueFormat,
		value: new ValueRecord(),
	},
	2: {
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		valueFormat: ValueFormat,
		valueCount: r.uint16,
		values: new r.LazyArray(new ValueRecord(), 'valueCount'),
	},
};
const gposLookupFieldsV2 = {
	// Pair Adjustment Positioning
	1: {
		// Adjustments for glyph pairs
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		valueFormat1: ValueFormat,
		valueFormat2: ValueFormat,
		pairSetCount: r.uint16,
		pairSets: new r.LazyArray(new r.Pointer(r.uint16, PairSet), 'pairSetCount'),
	},

	2: {
		// Class pair adjustment
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		valueFormat1: ValueFormat,
		valueFormat2: ValueFormat,
		classDef1: new r.Pointer(r.uint16, openTypeClassDef),
		classDef2: new r.Pointer(r.uint16, openTypeClassDef),
		class1Count: r.uint16,
		class2Count: r.uint16,
		classRecords: new r.LazyArray(
			new r.LazyArray(Class2Record, 'class2Count'),
			'class1Count',
		),
	},
};

const gposLookupFields = {
	1: new r.VersionedStruct<typeof gposLookupFieldsV1, GPOSTable.LookupSingle>(
		r.uint16,
		gposLookupFieldsV1,
	),

	2: new r.VersionedStruct<typeof gposLookupFieldsV2, GPOSTable.LookupPair>(
		r.uint16,
		gposLookupFieldsV2,
	),

	3: {
		// Cursive Attachment Positioning.
		format: r.uint16,
		coverage: new r.Pointer(r.uint16, openTypeCoverage),
		entryExitCount: r.uint16,
		entryExitRecords: new r.Array(EntryExitRecord, 'entryExitCount'),
	},

	4: {
		// MarkToBase Attachment Positioning.
		format: r.uint16,
		markCoverage: new r.Pointer(r.uint16, openTypeCoverage),
		baseCoverage: new r.Pointer(r.uint16, openTypeCoverage),
		classCount: r.uint16,
		markArray: new r.Pointer(r.uint16, MarkArray),
		baseArray: new r.Pointer(r.uint16, BaseArray),
	},

	5: {
		// MarkToLigature Attachment Positioning
		format: r.uint16,
		markCoverage: new r.Pointer(r.uint16, openTypeCoverage),
		ligatureCoverage: new r.Pointer(r.uint16, openTypeCoverage),
		classCount: r.uint16,
		markArray: new r.Pointer(r.uint16, MarkArray),
		ligatureArray: new r.Pointer(r.uint16, LigatureArray),
	},

	6: {
		// MarkToMark Attachment Positioning
		format: r.uint16,
		mark1Coverage: new r.Pointer(r.uint16, openTypeCoverage),
		mark2Coverage: new r.Pointer(r.uint16, openTypeCoverage),
		classCount: r.uint16,
		mark1Array: new r.Pointer(r.uint16, MarkArray),
		mark2Array: new r.Pointer(r.uint16, BaseArray),
	},

	7: openTypeContext, // Contextual positioning
	8: openTypeChainingContext, // Chaining contextual positioning

	9: {
		// Extension Positioning
		posFormat: r.uint16,
		lookupType: r.uint16, // cannot also be 9
		extension: selfPointer,
	},
};
const GPOSLookup = new r.VersionedStruct<
	typeof gposLookupFields,
	GPOSTable.LookupTable
>('lookupType', gposLookupFields);

// Fix circular reference
selfPointer.type = GPOSLookup;

const gposStructFields = {
	header: {
		scriptList: new r.Pointer(r.uint16, openTypeScriptList),
		featureList: new r.Pointer(r.uint16, openTypeFeatureList),
		lookupList: new r.Pointer(r.uint16, openTypeLookupList(GPOSLookup)),
	},

	65536: {},
	65537: {
		featureVariations: new r.Pointer(r.uint32, featureVariations),
	},
};
const GPOSStruct = new r.VersionedStruct<typeof gposStructFields, GPOSTable.GPOS>(
	r.uint32,
	gposStructFields,
);
export default GPOSStruct;

export { GPOSLookup };
