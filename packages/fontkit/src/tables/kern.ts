import r, {
	type ParsingContext,
	type RestructureLazyArray,
} from '@pdf-lib/restructure';

export namespace kernTable {
	export interface kernPair {
		left: number;
		right: number;
		value: number;
	}

	export interface kernClassTable {
		firstGlyph: number;
		nGlyphs: number;
		offset: number[];
		max: number;
	}

	export interface kern2Array {
		off: number;
		len: number;
		values: RestructureLazyArray<number>;
	}

	export interface kernSubtableV0 {
		version: 0;
		nPairs: number;
		searchRange: number;
		entrySelector: number;
		rangeShift: number;
		pairs: kernPair[];
	}

	export interface kernSubtableV2 {
		version: 2;
		rowWidth: number;
		leftTable: kernClassTable;
		array: kern2Array;
	}

	export interface kernSubtableV3 {
		version: 3;
		glyphCount: number;
		kernValueCount: number;
		leftClassCount: number;
		rightClassCount: number;
		flags: number;
		kernValue: number[];
		leftClass: number[];
		rightClass: number[];
		kernIndex: number[];
	}

	export type kernSubtable = kernSubtableV0 | kernSubtableV2 | kernSubtableV3;

	/**
	 * Microsoft uses this format.
	 */
	export interface kernTableV0 {
		version: 0;

		/** Microsoft has an extra sub-table version number. */
		subVersion: number;

		/** Length of the subtable in bytes. */
		length: number;

		/** Format of the subtable. */
		format: number;
		coverage: {
			/** `true` if table has horizontal data, `false` if vertical. */
			horizontal: boolean;

			/**
			 * If `true`, the table has minimum values. If `false`, the table
			 * has kerning values.
			 */
			minimum: boolean;

			/**
			 * If true, kerning is perpendicular to the flow of the text.
			 */
			crossStream: boolean;

			/**
			 * If `true`, the value in this table replaces the accumulated
			 * value.
			 */
			override: boolean;
		};
		subtable: kernSubtable;
	}

	/**
	 * Apple uses this format.
	 */
	export interface kernTableV1 {
		version: 1;
		length: number;
		coverage: {
			variation: boolean;

			/**
			 * If true, kerning is perpendicular to the flow of the text.
			 */
			crossStream: boolean;

			/** `true` if table has vertical data, `false` if horizontal. */
			vertical: boolean;
		};
		format: number;
		tupleIndex: number;
		subtable: kernSubtable;
	}

	export type kernTable = kernTableV0 | kernTableV1;

	/**
	 * Microsoft uses this format.
	 */
	export interface kernV0 {
		version: 0;
		ntables: number[];
		tables: kernTable[];
	}

	/**
	 * Apple uses this format.
	 */
	export interface kernV1 {
		version: 1;
		ntables: number[];
		tables: kernTable[];
	}

	export type kern = kernV0 | kernV1;
}

const kernPairFields = {
	left: r.uint16,
	right: r.uint16,
	value: r.int16,
};
const kernPair = new r.Struct<typeof kernPairFields, kernTable.kernPair>(
	kernPairFields,
);

interface ClassTableContext {
	offsets: number[];
}

const classTableFields = {
	firstGlyph: r.uint16,
	nGlyphs: r.uint16,
	offsets: new r.Array(r.uint16, 'nGlyphs'),
	max: (t: ClassTableContext) =>
		t.offsets.length && Math.max.apply(Math, t.offsets),
};
const ClassTable = new r.Struct(classTableFields);
interface LeftTableConfig {
	max: number;
}

interface KernRootContext extends ParsingContext {
	// Add any root properties if needed later
}

interface KernSubTableContext {
	parent: KernRootContext;
	rowWidth: number;
	leftTable: LeftTableConfig;
}

interface Kern2ArrayContext extends ParsingContext {
	parent: KernSubTableContext;
	off: number;
}

const kern2ArrayFields = {
	off: (t: Kern2ArrayContext) =>
		t._startOffset! - t.parent!.parent!._startOffset!,
	len: (t: Kern2ArrayContext) =>
		((t.parent.leftTable.max - t.off) / t.parent.rowWidth + 1) *
		(t.parent.rowWidth / 2),
	values: new r.LazyArray(r.int16, 'len'),
};
const Kern2Array = new r.Struct<typeof kern2ArrayFields, kernTable.kern2Array>(
	kern2ArrayFields,
);

const kernSubtableFields = {
	0: {
		nPairs: r.uint16,
		searchRange: r.uint16,
		entrySelector: r.uint16,
		rangeShift: r.uint16,
		pairs: new r.Array(kernPair, 'nPairs'),
	},

	2: {
		rowWidth: r.uint16,
		leftTable: new r.Pointer(r.uint16, ClassTable, { type: 'parent' }),
		rightTable: new r.Pointer(r.uint16, ClassTable, { type: 'parent' }),
		array: new r.Pointer(r.uint16, Kern2Array, { type: 'parent' }),
	},

	3: {
		glyphCount: r.uint16,
		kernValueCount: r.uint8,
		leftClassCount: r.uint8,
		rightClassCount: r.uint8,
		flags: r.uint8,
		kernValue: new r.Array(r.int16, 'kernValueCount'),
		leftClass: new r.Array(r.uint8, 'glyphCount'),
		rightClass: new r.Array(r.uint8, 'glyphCount'),
		kernIndex: new r.Array(
			r.uint8,
			(t) => t.leftClassCount * t.rightClassCount,
		),
	},
};
const KernSubtable = new r.VersionedStruct<
	typeof kernSubtableFields,
	kernTable.kernSubtable
>('format', kernSubtableFields);

const kernTableFields = {
	0: {
		// Microsoft uses this format
		subVersion: r.uint16, // Microsoft has an extra sub-table version number
		length: r.uint16, // Length of the subtable, in bytes
		format: r.uint8, // Format of subtable
		coverage: new r.Bitfield(r.uint8, [
			'horizontal', // 1 if table has horizontal data, 0 if vertical
			'minimum', // If set to 1, the table has minimum values. If set to 0, the table has kerning values.
			'crossStream', // If set to 1, kerning is perpendicular to the flow of the text
			'override', // If set to 1 the value in this table replaces the accumulated value
		]),
		subtable: KernSubtable,
		padding: new r.Reserved(r.uint8, (t) => t.length - t._currentOffset),
	},
	1: {
		// Apple uses this format
		length: r.uint32,
		coverage: new r.Bitfield(r.uint8, [
			null,
			null,
			null,
			null,
			null,
			'variation', // Set if table has variation kerning values
			'crossStream', // Set if table has cross-stream kerning values
			'vertical', // Set if table has vertical kerning values
		]),
		format: r.uint8,
		tupleIndex: r.uint16,
		subtable: KernSubtable,
		padding: new r.Reserved(r.uint8, (t) => t.length - t._currentOffset),
	},
};
const KernTable = new r.VersionedStruct<
	typeof kernTableFields,
	kernTable.kernTable
>('version', kernTableFields);

const kernFields = {
	0: {
		// Microsoft Version
		nTables: r.uint16,
		tables: new r.Array(KernTable, 'nTables'),
	},

	1: {
		// Apple Version
		reserved: new r.Reserved(r.uint16), // the other half of the version number
		nTables: r.uint32,
		tables: new r.Array(KernTable, 'nTables'),
	},
};
export default new r.VersionedStruct<typeof kernFields, kernTable.kern>(
	r.uint16,
	kernFields,
);
