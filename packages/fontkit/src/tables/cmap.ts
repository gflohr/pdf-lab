import r, { type RestructureLazyArray } from '@pdf-lib/restructure';

export namespace cmapTable {
	export interface Subheader {
		firstCode: number;
		entryCount: number;
		idDelta: number;
		idRangeOffset: number;
	}

	export interface Group {
		startCharCode: number;
		endCharCode: number;
		glyphID: number;
	}

	export interface UnicodeValueRange {
		startUnicodeValue: number;
		additionalCount: number;
	}

	export interface UVSMapping {
		unicodeValue: number;
		glyphID: number;
	}

	export interface VarSelectorRecord {
		varSelector: number;
		defaultUVS: UnicodeValueRange[];
		nonDefaultUVS: UVSMapping[];
	}

	/** Byte encoding. */
	export interface SubtableV0 {
		version: 0;

		/** Total table length in bytes (set to 262 for format 0). */
		length: number;

		/**
		 * Language code for this encoding subtable, or zero if
		 * language-independent.
		 */
		language: number;
		codeMap: RestructureLazyArray<number>;
	}

	/** High-byte mapping (CJK). */
	export interface SubtableV2 {
		version: 2;

		length: number;
		language: number;
		subheaderKeys: number[];
		subheaderCount: number;
		subheaders: RestructureLazyArray<Subheader>;
		glyphIndexArray: RestructureLazyArray<number>;
	}

	/** Segment mapping to delta values. */
	export interface SubtableV4 {
		version: 4;

		/** Total table length in bytes. */
		length: number;

		/** Language code. */
		language: number;

		segCountX2: number;
		segCount: number;
		searchRange: number;
		entrySelector: number;
		rangeShift: number;
		endCode: RestructureLazyArray<number>;
		startCode: RestructureLazyArray<number>;
		idDelta: RestructureLazyArray<number>;
		idRangeOffset: RestructureLazyArray<number>;
		glyphIndexArray: RestructureLazyArray<number>;
	}

	/** Trimmed table. */
	export interface SubtableV6 {
		version: 6;

		length: number;
		language: number;
		firstCode: number;
		entryCount: number;
		glyphIndices: RestructureLazyArray<number>;
	}

	/** Mixed 16-bit and 32-bit coverage. */
	export interface SubtableV8 {
		version: 8;

		length: number;
		language: number;
		is32: RestructureLazyArray<number>;
		nGroups: number;
		groups: RestructureLazyArray<Group>;
	}

	/** Trimmed Array. */
	export interface SubtableV10 {
		version: 10;

		length: number;
		language: number;
		firstCode: number;
		entryCount: number;
		glyphIndices: RestructureLazyArray<number>;
	}

	/** Segmented coverage. */
	export interface SubtableV12 {
		version: 12;

		length: number;
		language: number;
		nGroups: number;
		groups: RestructureLazyArray<number>;
	}

	/**
	 * Many-to-one range mappings (same as 12 except for group.startGlyphID).
	 */
	export interface SubtableV13 {
		version: 13;

		length: number;
		language: number;
		nGroups: number;
		groups: RestructureLazyArray<Group>;
	}

	/** Unicode Variation Sequences. */
	export interface SubtableV14 {
		version: 14;

		length: number;
		numRecords: number;
		varSelectors: RestructureLazyArray<VarSelectorRecord>;
	}

	export type Subtable =
		| SubtableV0
		| SubtableV2
		| SubtableV4
		| SubtableV6
		| SubtableV8
		| SubtableV10
		| SubtableV12
		| SubtableV13
		| SubtableV14;

	export interface Entry {
		platformID: number /** Platform identifier. */;
		encodingID: number /** Platform-specific encoding identifier. */;
		// FIXME! This is loaded lazily!
		table: Subtable;
	}

	/** Character to glyph mapping. */
	export interface cmap {
		version: number;
		numSubtables: number;
		tables: Entry[];
	}
}

const subheaderFields = {
	firstCode: r.uint16,
	entryCount: r.uint16,
	idDelta: r.int16,
	idRangeOffset: r.uint16,
};
const subheader = new r.Struct<typeof subheaderFields, cmapTable.Subheader>(
	subheaderFields,
);

const cmapGroupFields = {
	startCharCode: r.uint32,
	endCharCode: r.uint32,
	glyphID: r.uint32,
};
const cmapGroup = new r.Struct<typeof cmapGroupFields, cmapTable.Group>(
	cmapGroupFields,
);

const unicodeValueRangeFields = {
	startUnicodeValue: r.uint24,
	additionalCount: r.uint8,
};
const unicodeValueRange = new r.Struct<
	typeof unicodeValueRangeFields,
	cmapTable.UnicodeValueRange
>(unicodeValueRangeFields);

const uvsMappingFields = {
	unicodeValue: r.uint24,
	glyphID: r.uint16,
};
const uvsMapping = new r.Struct<typeof uvsMappingFields, cmapTable.UVSMapping>(
	uvsMappingFields,
);

const DefaultUVS = new r.Array(unicodeValueRange, r.uint32);
const NonDefaultUVS = new r.Array(uvsMapping, r.uint32);

const varSelectorRecordFields = {
	varSelector: r.uint24,
	defaultUVS: new r.Pointer(r.uint32, DefaultUVS, { type: 'parent' }),
	nonDefaultUVS: new r.Pointer(r.uint32, NonDefaultUVS, { type: 'parent' }),
};
const varSelectorRecord = new r.Struct<
	typeof varSelectorRecordFields,
	cmapTable.VarSelectorRecord
>(varSelectorRecordFields);

const cmapSubtableFields = {
	0: {
		// Byte encoding
		length: r.uint16, // Total table length in bytes (set to 262 for format 0)
		language: r.uint16, // Language code for this encoding subtable, or zero if language-independent
		codeMap: new r.LazyArray(r.uint8, 256),
	},

	2: {
		// High-byte mapping (CJK)
		length: r.uint16,
		language: r.uint16,
		subheaderKeys: new r.Array(r.uint16, 256),
		subheaderCount: (t: { subheaderKeys: number[] }) =>
			Math.max(...t.subheaderKeys) / 8 + 1,
		subheaders: new r.LazyArray(subheader, 'subheaderCount'),
		glyphIndexArray: new r.LazyArray(
			r.uint16,
			(t) => (t.length - t._currentOffset) / 2,
		),
	},

	4: {
		// Segment mapping to delta values
		length: r.uint16, // Total table length in bytes
		language: r.uint16, // Language code
		segCountX2: r.uint16,
		segCount: (t: { segCountX2: number }) => t.segCountX2 >> 1,
		searchRange: r.uint16,
		entrySelector: r.uint16,
		rangeShift: r.uint16,
		endCode: new r.LazyArray(r.uint16, 'segCount'),
		reservedPad: new r.Reserved(r.uint16), // This value should be zero
		startCode: new r.LazyArray(r.uint16, 'segCount'),
		idDelta: new r.LazyArray(r.int16, 'segCount'),
		idRangeOffset: new r.LazyArray(r.uint16, 'segCount'),
		glyphIndexArray: new r.LazyArray(
			r.uint16,
			(t) => (t.length - t._currentOffset) / 2,
		),
	},

	6: {
		// Trimmed table
		length: r.uint16,
		language: r.uint16,
		firstCode: r.uint16,
		entryCount: r.uint16,
		glyphIndices: new r.LazyArray(r.uint16, 'entryCount'),
	},

	8: {
		// mixed 16-bit and 32-bit coverage
		reserved: new r.Reserved(r.uint16),
		length: r.uint32,
		language: r.uint16,
		is32: new r.LazyArray(r.uint8, 8192),
		nGroups: r.uint32,
		groups: new r.LazyArray(cmapGroup, 'nGroups'),
	},

	10: {
		// Trimmed Array
		reserved: new r.Reserved(r.uint16),
		length: r.uint32,
		language: r.uint32,
		firstCode: r.uint32,
		entryCount: r.uint32,
		glyphIndices: new r.LazyArray(r.uint16, 'entryCount'),
	},

	12: {
		// Segmented coverage
		reserved: new r.Reserved(r.uint16),
		length: r.uint32,
		language: r.uint32,
		nGroups: r.uint32,
		groups: new r.LazyArray(cmapGroup, 'nGroups'),
	},

	13: {
		// Many-to-one range mappings (same as 12 except for group.startGlyphID)
		reserved: new r.Reserved(r.uint16),
		length: r.uint32,
		language: r.uint32,
		nGroups: r.uint32,
		groups: new r.LazyArray(cmapGroup, 'nGroups'),
	},

	14: {
		// Unicode Variation Sequences
		length: r.uint32,
		numRecords: r.uint32,
		varSelectors: new r.LazyArray(varSelectorRecord, 'numRecords'),
	},
};
const cmapSubtable = new r.VersionedStruct<
	typeof cmapSubtableFields,
	cmapTable.Subtable
>(r.uint16, cmapSubtableFields);

const cmapEntryFields = {
	platformID: r.uint16, // Platform identifier
	encodingID: r.uint16, // Platform-specific encoding identifier
	table: new r.Pointer(r.uint32, cmapSubtable, { type: 'parent', lazy: true }),
};
const cmapEntry = new r.Struct(cmapEntryFields);

// Character to glyph mapping.
const cmapStructFields = {
	version: r.uint16,
	numSubtables: r.uint16,
	tables: new r.Array(cmapEntry, 'numSubtables'),
};
export default new r.Struct<typeof cmapStructFields, cmapTable.cmap>(
	cmapStructFields,
);
