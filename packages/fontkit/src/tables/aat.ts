import * as r from 'restructure';

export namespace AAT {
	/**
	 * A map of Apple Advanced Typography (AAT) as described by Apple’s
	 * TrueType Reference manual:
	 * https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6AATIntro.html
	 */
	export interface Features {
		acnt?: boolean;
		ankr?: boolean;
		avar?: boolean;
		bdat?: boolean;
		bhed?: boolean;
		bloc?: boolean;
		bsln?: boolean;
		cmap?: boolean;
		cvar?: boolean;
		cvt?: boolean;
		EBSC?: boolean;
		fdsc?: boolean;
		feat?: boolean;
		fmtx?: boolean;
		fond?: boolean;
		fpgm?: boolean;
		fvar?: boolean;
		gasp?: boolean;
		gcid?: boolean;
		glyf?: boolean;
		gvar?: boolean;
		hdmx?: boolean;
		head?: boolean;
		hhea?: boolean;
		hmtx?: boolean;
		just?: boolean;
		kern?: boolean;
		kerx?: boolean;
		lcar?: boolean;
		loca?: boolean;
		ltag?: boolean;
		maxp?: boolean;
		meta?: boolean;
		mort?: boolean;
		morx?: boolean;
		name?: boolean;
		opbd?: boolean;
		'OS/2'?: boolean;
		post?: boolean;
		prep?: boolean;
		prop?: boolean;
		sbix?: boolean;
		trak?: boolean;
		vhea?: boolean;
		vmtx?: boolean;
		xref?: boolean;
		Zapf?: boolean;
	}

	export type FeatureTag = keyof Features;

	// Common AAT binary search header structure
	export interface BinarySearchHeader {
		unitSize: number;
		nUnits: number;
		searchRange: number;
		entrySelector: number;
		rangeShift: number;
	}

	export interface LookupTableV0<T> {
		version: 0;
		values: UnboundedArrayAccessor<r.FieldT<T>>;
	}

	export interface LookupSegmentSingle<T> {
		lastGlyph: number;
		firstGlyph: number;
		value: T;
	}

	export interface LookupTableV2<T> {
		version: 2;
		binarySearchHeader: BinarySearchHeader;
		segments: LookupSegmentSingle<T>[];
	}

	export interface LookupSegmentArray<T> {
		lastGlyph: number;
		firstGlyph: number;
		values: T[]; // Pointer translates directly to the resolved value array.
	}

	export interface LookupTableV4<T> {
		version: 4;
		binarySearchHeader: AAT.BinarySearchHeader;
		segments: LookupSegmentArray<T>[];
	}

	export interface LookupSingle<T> {
		glyph: number;
		value: T;
	}

	export interface LookupTableV6<T> {
		version: 6;
		binarySearchHeader: AAT.BinarySearchHeader;
		segments: LookupSingle<T>[];
	}

	export interface LookupTableV8<T> {
		version: 8;
		firstGlyph: number;
		count: number;
		values: T[];
	}

	export type LookupTable<T> =
		| LookupTableV0<T>
		| LookupTableV2<T>
		| LookupTableV4<T>
		| LookupTableV6<T>
		| LookupTableV8<T>;

	export type StateEntry<TEntry> = {
		newStateOffset: number;
		newState: number;
		flags: number;
		[additionalKeys: string]: unknown;
	} & TEntry;

	export interface StateHeader<TLookup = number, TEntry = Record<string, any>> {
		nClasses: number;
		classTable: LookupTable<TLookup>;
		stateArray: UnboundedArrayAccessor<r.FieldT<number[]>>;
		entryTable: UnboundedArrayAccessor<r.FieldT<StateEntry<TEntry>>>;
	}

	export type StateEntry1<TEntry> = {
		newStateOffset: number;
		newState: number;
		flags: number;
	} & TEntry;

	export interface StateHeader1<TEntry = Record<string, any>> {
		nClasses: number;
		classTable: Omit<LookupTableV8<number>, 'count'>;
		stateArray: UnboundedArrayAccessor<r.FieldT<number[][]>>;
		entryTable: UnboundedArrayAccessor<r.FieldT<StateEntry1<TEntry>>>;
	}

	export type StateTable = r.StructT<Record<string, unknown>, AAT.StateHeader>;

	export type StateTable1<TEntryData> = r.StructT<
		TEntryData,
		StateHeader1<TEntryData>
	>;

	export type TypeFeatures = Record<string, Record<string, boolean>>;
}

export class UnboundedArrayAccessor<TField extends r.FieldT<any>> {
	private type: TField;
	private stream: r.DecodeStream;
	private parent?: r.ParsingContext;
	private base: number;
	private _items: r.InferField<TField>[];

	constructor(type: TField, stream: r.DecodeStream, parent?: r.ParsingContext) {
		this.type = type;
		this.stream = stream;
		this.parent = parent;
		this.base = this.stream.pos;
		this._items = [];
	}

	// Changing the return from 'unknown' to 'InferField<TField>' fixes
	// downstream usage.
	getItem(index: number): r.InferField<TField> {
		if (this._items[index] == null) {
			const pos = this.stream.pos;
			// Note: passing null as value to match size signature
			this.stream.pos = this.base + this.type.size(null, this.parent) * index;
			this._items[index] = this.type.decode(this.stream, this.parent);
			this.stream.pos = pos;
		}

		return this._items[index];
	}

	inspect() {
		return `[UnboundedArray ${this.type.constructor.name}]`;
	}
}

export class AATUnboundedArray<
	TField extends r.FieldT<any>,
> extends r.Array<TField> {
	private arrayType: TField;

	constructor(type: TField) {
		super(type, 0);
		this.arrayType = type;
	}

	// We cast the output to 'any' to satisfy the base class's expectation of returning a real array array
	decode(stream: r.DecodeStream, parent?: r.ParsingContext): any {
		return new UnboundedArrayAccessor(this.arrayType, stream, parent);
	}
}

// `@__NO_SIDE_EFFECTS__`
/**
 * Builds an AAT lookup-table parser for the provided value field type.
 */
export const aatLookupTable = <TField extends r.FieldT<any> = typeof r.uint16>(
	ValueType: TField = r.uint16 as unknown as TField,
) => {
	// Helper class that makes internal structures invisible to pointers
	class Shadow<TField extends r.FieldT<any>> implements r.FieldT<any> {
		private type: TField;

		constructor(type: TField) {
			this.type = type;
		}

		decode(stream: r.DecodeStream, ctx?: r.ParsingContext) {
			const parentContext = ctx?.parent?.parent;

			return this.type.decode(stream, parentContext);
		}

		size(val?: r.FieldT<number>, ctx?: r.ParsingContext) {
			ctx = ctx?.parent?.parent;

			return this.type.size(val, ctx);
		}

		encode(stream: r.EncodeStream, val: number, ctx?: r.ParsingContext) {
			ctx = ctx?.parent?.parent;

			return this.type.encode(stream, val, ctx);
		}

		fromBuffer(_buf: Uint8Array) {
			throw new Error('internal');
		}
		toBuffer(): Uint8Array {
			throw new Error('internal');
		}
	}

	ValueType = new Shadow(ValueType) as unknown as TField;

	const binarySearchHeaderFields = {
		unitSize: r.uint16,
		nUnits: r.uint16,
		searchRange: r.uint16,
		entrySelector: r.uint16,
		rangeShift: r.uint16,
	};
	const BinarySearchHeader = new r.Struct<
		typeof binarySearchHeaderFields,
		AAT.BinarySearchHeader
	>(binarySearchHeaderFields);

	const lookupSegmentSingleFields = {
		lastGlyph: r.uint16,
		firstGlyph: r.uint16,
		value: ValueType,
	};
	const LookupSegmentSingle = new r.Struct<
		typeof lookupSegmentSingleFields,
		AAT.LookupSegmentSingle<r.InferField<TField>>
	>(lookupSegmentSingleFields);

	const lookupSegmentArrayFields = {
		lastGlyph: r.uint16,
		firstGlyph: r.uint16,
		values: new r.Pointer(
			r.uint16,
			new r.Array(ValueType, (t) => t.lastGlyph - t.firstGlyph + 1),
			{ type: 'parent' },
		),
	};
	const LookupSegmentArray = new r.Struct<
		typeof lookupSegmentArrayFields,
		AAT.LookupSegmentArray<r.InferField<TField>>
	>(lookupSegmentArrayFields);

	const lookupSingleFields = {
		glyph: r.uint16,
		value: ValueType,
	};
	const LookupSingle = new r.Struct<
		typeof lookupSingleFields,
		AAT.LookupSingle<r.InferField<TField>>
	>(lookupSingleFields);

	const lookupTableFields = {
		0: {
			values: new AATUnboundedArray(ValueType), // length == number of glyphs maybe?
		},
		2: {
			binarySearchHeader: BinarySearchHeader,
			segments: new r.Array(
				LookupSegmentSingle,
				(t) => t.binarySearchHeader.nUnits,
			),
		},
		4: {
			binarySearchHeader: BinarySearchHeader,
			segments: new r.Array(
				LookupSegmentArray,
				(t) => t.binarySearchHeader.nUnits,
			),
		},
		6: {
			binarySearchHeader: BinarySearchHeader,
			segments: new r.Array(LookupSingle, (t) => t.binarySearchHeader.nUnits),
		},
		8: {
			firstGlyph: r.uint16,
			count: r.uint16,
			values: new r.Array(ValueType, 'count'),
		},
	};

	return new r.VersionedStruct<
		typeof lookupTableFields,
		AAT.LookupTable<r.InferField<TField>>
	>(r.uint16, lookupTableFields);
};

export function aatStateTable<
	TLookupField extends r.FieldT<any> = typeof r.uint16,
	TEntryData extends Record<string, any> = Record<string, never>,
>(
	entryData: TEntryData = {} as TEntryData,
	lookupType: TLookupField = r.uint16 as unknown as TLookupField,
) {
	const entry = Object.assign(
		{
			newState: r.uint16,
			flags: r.uint16,
		},
		entryData,
	);

	const Entry = new r.Struct<typeof entry, any>(entry);
	const StateArray = new AATUnboundedArray(
		new r.Array(r.uint16, (t) => t.nClasses),
	);

	const stateHeaderFields = {
		nClasses: r.uint32,
		classTable: new r.Pointer(r.uint32, aatLookupTable(lookupType)),
		stateArray: new r.Pointer(r.uint32, StateArray),
		entryTable: new r.Pointer(r.uint32, new AATUnboundedArray(Entry)),
	};
	const stateHeader = new r.Struct<typeof stateHeaderFields, AAT.StateHeader>(
		stateHeaderFields,
	);

	return stateHeader;
}

// This is the old version of the StateTable structure.
export function aatStateTable1<
	TEntryData extends Record<string, any> = Record<string, never>,
>(entryData: TEntryData = {} as TEntryData) {
	const classLookupTableFields = {
		version() {
			return 8;
		}, // simulate LookupTable
		firstGlyph: r.uint16,
		values: new r.Array(r.uint8, r.uint16),
	};

	const ClassLookupTable = new r.Struct<
		typeof classLookupTableFields,
		Omit<AAT.LookupTableV8<number>, 'count'>
	>(classLookupTableFields);

	const entry = Object.assign(
		{
			newStateOffset: r.uint16,
			// convert offset to stateArray index
			newState: (t: any) =>
				(t.newStateOffset -
					(t.parent.stateArray.base - t.parent._startOffset)) /
				t.parent.nClasses,
			flags: r.uint16,
		},
		entryData,
	);

	const Entry = new r.Struct<typeof entry, AAT.StateEntry1<TEntryData>>(entry);
	const StateArray = new AATUnboundedArray(
		new r.Array(r.uint8, (t) => t.nClasses),
	);

	const stateHeader1Fields = {
		nClasses: r.uint16,
		classTable: new r.Pointer(r.uint16, ClassLookupTable),
		stateArray: new r.Pointer(r.uint16, StateArray),
		entryTable: new r.Pointer(r.uint16, new AATUnboundedArray(Entry)),
	};

	const stateHeader1 = new r.Struct<
		typeof stateHeader1Fields,
		AAT.StateHeader1<TEntryData>
	>(stateHeader1Fields);

	return stateHeader1;
}
