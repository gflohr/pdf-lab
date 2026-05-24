import r, { type FieldT, type StructT } from '@pdf-lib/restructure';
import Tables from './index.js';

/**
 * A type map representing all parsed structural tables available in the font
 * toolkit. Maps tags (e.g., 'post', 'hvar') directly to their compiled layout
 * output types.
 */
export type FilteredTableMap = {
	[K in keyof typeof Tables]: ReturnType<(typeof Tables)[K]['decode']>;
};

/**
 * Represents a raw structural entry inside the binary SFNT font table directory.
 */
export interface SFNTTableEntry {
	/**
	 * 4-byte structural identifier tag identifying the table (e.g., 'cmap',
	 * 'head', 'glyf').
	 */
	tag: string;

	/**
	 * Checksum generated for the individual uncompressed table stream chunk.
	 * */
	checkSum: number;

	/**
	 * Global byte offset pointer marking where this table begins relative to
	 * the file start.
	 */
	offset: number;

	/**
	 * Explicit byte length size spanning the raw table data segment.
	 * */
	length: number;
}

/**
 * The baseline structural properties present on every decoded table
 * inside the font directory mapping.
 */
export interface SFNTTable {
	/** The 4-character table identifier (e.g., 'head', 'cmap'). */
	tag: string;

	/** The calculated binary checksum of the raw table data. */
	checkSum: number;

	/** The physical byte size length occupied by the table. */
	length: number;

	/**
	 * Global byte offset pointer marking where this table begins relative to
	 * the file start.
	 */
	offset: number;

	/**
	 * The internal parsed structure payload decoded by the table-specific
	 * parser. If the layout engine hasn't executed a sub-table decode yet,
	 * this contains the raw pointer offset.
	 */
	[key: string]: unknown;
}

/**
 * A strongly-typed dictionary map collection of all tables inside an SFNT font.
 * Keys match known font tags ('post', 'hvar') or fallback to arbitrary custom
 * strings.
 */
export type SFNTTableMap = Record<string, SFNTTable | null> &
	Partial<FilteredTableMap>;

/**
 * Represents the parsed master Table Directory at the head of every SFNT
 * (TrueType/OpenType) file.
 *
 * Scaled layout calculation parameters (`searchRange`, `entrySelector`,
 * `rangeShift`) are configured automatically by the directory compilation
 * engine during binary generation phases.
 */
export interface SFNTDirectory {
	/**
	 * Scaled signature layout tag (e.g., 'true' or 'OTTO' for OpenType
	 * PostScript layouts).
	 */
	tag: string;

	/**
	 * Total number of functional individual tables embedded within the font
	 * package.
	 */
	numTables: number;

	/**
	 * Search range calculation metric used for optimized binary layout
	 * searching sequences.
	 */
	searchRange: number;

	/**
	 * Entry selector exponent constraint indicating logarithmic table block
	 * sizes.
	 */
	entrySelector: number;

	/**
	 * Range shift offset calculation parameter representing layout search
	 * remainders.
	 */
	rangeShift: number;

	/**
	 * Record mapping identifying table tags directly to parsed table
	 * configurations.
	 */
	tables: SFNTTableMap;
}

/**
 * Internal structure representing the un-processed binary file state.
 */
export interface SFNTDirectoryBinary {
	tag: string;
	numTables: number;
	searchRange: number;
	entrySelector: number;
	rangeShift: number;
	tables: SFNTTableEntry[];
}

const TableEntry = new r.Struct<any, SFNTTableEntry>({
	tag: new r.String(4),
	checkSum: r.uint32,
	offset: new r.Pointer(r.uint32, 'void', { type: 'global' }),
	length: r.uint32,
});

interface DirectoryContext extends SFNTDirectory {
	tables: any;
}

const fields = {
	tag: new r.String(4),
	numTables: r.uint16,
	searchRange: r.uint16,
	entrySelector: r.uint16,
	rangeShift: r.uint16,
	tables: new r.Array(TableEntry, 'numTables'),
};

const Directory = new r.Struct<typeof fields, SFNTDirectory>(fields);

/**
 * Lifecycle hook executed automatically post-decode.
 * Converts the sequential array entry list into an easy-access lookup table index.
 */
Directory.process = function (this: DirectoryContext): void {
	const tables: Record<string, unknown> = {};
	for (const table of this.tables) {
		tables[table.tag] = table;
	}

	this.tables = tables;
};

/**
 * Lifecycle hook executed automatically pre-encode.
 * Re-packs the string-keyed table record dictionary into a sorted sequence
 * and recalculates binary search padding optimization parameters dynamically.
 */
Directory.preEncode = function (this: DirectoryContext): void {
	const tables: any[] = [];
	for (const key in this.tables) {
		const tag = key as keyof typeof Tables;
		const table = this.tables[tag];
		if (table) {
			tables.push({
				tag,
				checkSum: 0,
				offset: new r.VoidPointer(Tables[tag] as FieldT<unknown>, table),
				length: (Tables[tag] as StructT<any>).size(table),
			});
		}
	}

	this.tag = 'true';
	this.numTables = tables.length;
	this.tables = tables;

	// Recalculate optimal binary search tracking headers for layout engine lookups
	const maxExponentFor2 = Math.floor(Math.log(this.numTables) / Math.LN2);
	const maxPowerOf2 = 2 ** maxExponentFor2;

	this.searchRange = maxPowerOf2 * 16;
	this.entrySelector = Math.log(maxPowerOf2) / Math.LN2;
	this.rangeShift = this.numTables * 16 - this.searchRange;
};

export default Directory;
