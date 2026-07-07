import * as r from 'restructure';
import { tables as allTables } from './index.js';

export type SFNTTableMap = {
	[K in keyof typeof allTables]: ReturnType<
		(typeof allTables)[K]['decode']
	> | null;
};

/**
 * Tier 1: Pure Binary Representation (Matches file bytes exactly).
 */
export interface SFNTTableEntryBinary {
	tag: string;
	checkSum: number;
	offset: number; // Pointer target resolution placeholder
	length: number;
}

export interface SFNTDirectoryBinary {
	tag: string;
	numTables: number;
	searchRange: number;
	entrySelector: number;
	rangeShift: number;
	tables: SFNTTableEntryBinary[];
}

/**
 * Tier 2: Post-Processed Runtime Representation (App API).
 */
export interface SFNTDirectoryEntry extends SFNTTableEntryBinary {
	/** The actual decoded table payload stream, or null if unparsed */
	unwrapped?: unknown;
}

export interface SFNTDirectory {
	tag: string;
	numTables: number;
	searchRange: number;
	entrySelector: number;
	rangeShift: number;
	/** The index map built during the `.process()` lifecycle hook */
	tables: Record<string, SFNTDirectoryEntry>;
}

/**
 * Context interface matching the internal state inside restructure lifecycle hooks
 */
interface DirectoryContext extends Omit<SFNTDirectory, 'tables'> {
	// During execution, tables transitions from the raw array to the mapped
	// record.
	tables: SFNTTableEntryBinary[] & Record<string, SFNTDirectoryEntry>;
}

// Binary Layout Definitions
const tableEntryFields = {
	tag: new r.String(4),
	checkSum: r.uint32,
	offset: new r.Pointer(r.uint32, 'void', { type: 'global' }),
	length: r.uint32,
};

const tableEntryStruct = new r.Struct<
	typeof tableEntryFields,
	SFNTTableEntryBinary
>(tableEntryFields);

const directoryFields = {
	tag: new r.String(4),
	numTables: r.uint16,
	searchRange: r.uint16,
	entrySelector: r.uint16,
	rangeShift: r.uint16,
	tables: new r.Array(tableEntryStruct, 'numTables'),
};

const directoryStruct = new r.Struct<typeof directoryFields, SFNTDirectory>(
	directoryFields,
);

// Restructure Lifecycle Hooks.
directoryStruct.process = function (this: DirectoryContext): void {
	const mappedTables: Record<string, SFNTDirectoryEntry> = {};

	for (const table of this.tables) {
		mappedTables[table.tag] = table;
	}

	// Safely cast away the binary array representation to the clean runtime
	// map.
	this.tables = mappedTables as any;
};

directoryStruct.preEncode = function (this: DirectoryContext): void {
	if (!Array.isArray(this.tables)) {
		const tables = [];
		for (const tag in this.tables) {
			const table = this.tables[tag];
			if (table) {
				tables.push({
					tag,
					checkSum: 0,
					offset: new r.VoidPointer(allTables[tag], table),
					length: allTables[tag].size(table),
				});
			}
		}

		this.tables = tables;
	}

	this.tag = 'true';
	this.numTables = this.tables.length;

	// Recalculate optimal binary search parameters
	const maxExponentFor2 = Math.floor(Math.log(this.numTables) / Math.LN2);
	const maxPowerOf2 = 2 ** maxExponentFor2;

	this.searchRange = maxPowerOf2 * 16;
	this.entrySelector = Math.log(maxPowerOf2) / Math.LN2;
	this.rangeShift = this.numTables * 16 - this.searchRange;
};

export interface SFNTDirectoryEncodeInput {
	tables: Record<string, unknown>;
}

export const directory = directoryStruct as Omit<
	typeof directoryStruct,
	'encode'
> & {
	encode(stream: r.EncodeStream, value: SFNTDirectoryEncodeInput): void;
};
