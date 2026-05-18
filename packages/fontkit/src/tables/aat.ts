/** biome-ignore-all lint/suspicious/noExplicitAny: This file implements
 * advanced font layout parsing structures (AAT) that dynamically alter
 * execution context graphs, utilise virtual proxy arrays (UnboundedArray), and
 * bypass structural compilation layers via custom wrapper wrappers (Shadow).
 * Loose typing via 'any' is required to prevent circular resolution errors
 * inside the parser engine framework.
 */
import r, { type DecodeStream, type FieldT, type InferField, type ParsingContext } from '@pdf-lib/restructure';

class UnboundedArrayAccessor<TField extends FieldT<any>> {
	private type: TField;
	private stream: DecodeStream;
	private parent?: ParsingContext;
	private base: number;
	private _items: InferField<TField>[];

	constructor(type: TField, stream: DecodeStream, parent?: ParsingContext) {
		this.type = type;
		this.stream = stream;
		this.parent = parent;
		this.base = this.stream.pos;
		this._items = [];
	}

	// Changing the return from 'unknown' to 'InferField<TField>' fixes downstream usage
	getItem(index: number): InferField<TField> {
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

export class UnboundedArray<TField extends FieldT<any>> extends r.Array<TField> {
	private arrayType: TField;

	constructor(type: TField) {
		super(type, 0);
		this.arrayType = type;
	}

	// We cast the output to 'any' to satisfy the base class's expectation of returning a real array array
	decode(stream: DecodeStream, parent?: ParsingContext): any {
		return new UnboundedArrayAccessor(this.arrayType, stream, parent);
	}
}

export const LookupTable = (ValueType = r.uint16) => {
	// Helper class that makes internal structures invisible to pointers
	class Shadow<TField extends FieldT<number>> implements FieldT<number> {
		private type: TField;

		constructor(type: TField) {
			this.type = type;
		}

		decode(stream: DecodeStream, ctx?: ParsingContext) {
			const parentContext = ctx?.parent?.parent;

			return this.type.decode(stream, parentContext);
		}

		size(val?: FieldT<number>, ctx?: ParsingContext) {
			ctx = ctx?.parent?.parent;

			return this.type.size(val, ctx);
		}

		encode(stream: DecodeStream, val: number, ctx?: ParsingContext) {
			ctx = ctx?.parent?.parent;

			return this.type.encode(stream, val, ctx);
		}
	}

	ValueType = new Shadow(ValueType);

	const BinarySearchHeader = new r.Struct({
		unitSize: r.uint16,
		nUnits: r.uint16,
		searchRange: r.uint16,
		entrySelector: r.uint16,
		rangeShift: r.uint16,
	});

	const LookupSegmentSingle = new r.Struct({
		lastGlyph: r.uint16,
		firstGlyph: r.uint16,
		value: ValueType,
	});

	const LookupSegmentArray = new r.Struct({
		lastGlyph: r.uint16,
		firstGlyph: r.uint16,
		values: new r.Pointer(
			r.uint16,
			new r.Array(ValueType, (t) => t.lastGlyph - t.firstGlyph + 1),
			{ type: 'parent' },
		),
	});

	const LookupSingle = new r.Struct({
		glyph: r.uint16,
		value: ValueType,
	});

	return new r.VersionedStruct(r.uint16, {
		0: {
			values: new UnboundedArray(ValueType), // length == number of glyphs maybe?
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
	});
};

export function StateTable(entryData = {}, lookupType = r.uint16) {
	const entry = Object.assign(
		{
			newState: r.uint16,
			flags: r.uint16,
		},
		entryData,
	);

	const Entry = new r.Struct(entry);
	const StateArray = new UnboundedArray(
		new r.Array(r.uint16, (t) => t.nClasses),
	);

	const StateHeader = new r.Struct({
		nClasses: r.uint32,
		classTable: new r.Pointer(r.uint32, LookupTable(lookupType)),
		stateArray: new r.Pointer(r.uint32, StateArray),
		entryTable: new r.Pointer(r.uint32, new UnboundedArray(Entry)),
	});

	return StateHeader;
}

// This is the old version of the StateTable structure
export function StateTable1(entryData = {}) {
	const ClassLookupTable = new r.Struct({
		version() {
			return 8;
		}, // simulate LookupTable
		firstGlyph: r.uint16,
		values: new r.Array(r.uint8, r.uint16),
	});

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

	const Entry = new r.Struct(entry);
	const StateArray = new UnboundedArray(
		new r.Array(r.uint8, (t) => t.nClasses),
	);

	const StateHeader1 = new r.Struct({
		nClasses: r.uint16,
		classTable: new r.Pointer(r.uint16, ClassLookupTable),
		stateArray: new r.Pointer(r.uint16, StateArray),
		entryTable: new r.Pointer(r.uint16, new UnboundedArray(Entry)),
	});

	return StateHeader1;
}
