import * as r from 'restructure';
import type { SFNTDirectory, SFNTDirectoryEntry } from './index.ts';

/**
 * Tier 1: Pure Binary Representation (Matches file bytes exactly)
 */
export interface WOFFTableEntryBinary {
	tag: string;
	offset: number; // Pointer target resolution placeholder
	compLength: number;
	length: number;
	origChecksum: number; // Corrected camelCase typo from binary definition
}

export interface WOFFDirectoryBinary {
	tag: string;
	flavor: number;
	length: number;
	numTables: number;
	totalSfntSize: number;
	majorVersion: number;
	minorVersion: number;
	metaOffset: number;
	metaLength: number;
	metaOrigLength: number;
	privOffset: number;
	privLength: number;
	tables: WOFFTableEntryBinary[];
}

/**
 * Tier 2: Post-Processed Runtime Representation (Clean App API).
 */
export interface WOFFDirectoryEntry
	extends WOFFTableEntryBinary,
		SFNTDirectoryEntry {
	/** The actual decoded table payload stream, or null if unparsed */
	unwrapped?: unknown;
}

export interface WOFFDirectory extends SFNTDirectory {
	tag: string;
	flavor: number;
	length: number;
	numTables: number;
	totalSfntSize: number;
	majorVersion: number;
	minorVersion: number;
	metaOffset: number;
	metaLength: number;
	metaOrigLength: number;
	privOffset: number;
	privLength: number;
	/** The index map built during the `.process()` lifecycle hook */
	tables: Record<string, WOFFDirectoryEntry>;
}

/**
 * Context interface matching the internal state inside restructure lifecycle hooks
 */
interface WOFFDirectoryContext extends Omit<WOFFDirectory, 'tables'> {
	// During execution, tables transitions from the raw array to the mapped record
	tables: Record<string, WOFFDirectoryEntry>;
}

/* ========================================================================== */
/* Binary Layout Definitions                                                  */
/* ========================================================================== */

const woffDirectoryEntryFields = {
	tag: new r.String(4),
	offset: new r.Pointer(r.uint32, 'void', { type: 'global' }),
	compLength: r.uint32,
	length: r.uint32,
	origChecksum: r.uint32,
};

const woffDirectoryEntryStruct = new r.Struct<
	typeof woffDirectoryEntryFields,
	WOFFTableEntryBinary
>(woffDirectoryEntryFields);

const fields = {
	tag: new r.String(4), // Should be 'wOFF'
	flavor: r.uint32,
	length: r.uint32,
	numTables: r.uint16,
	reserved: new r.Reserved(r.uint16),
	totalSfntSize: r.uint32,
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	metaOffset: r.uint32,
	metaLength: r.uint32,
	metaOrigLength: r.uint32,
	privOffset: r.uint32,
	privLength: r.uint32,
	tables: new r.Array(woffDirectoryEntryStruct, 'numTables'),
};

export const woffDirectoryStruct = new r.Struct<typeof fields, WOFFDirectory>(
	fields,
);

/* ========================================================================== */
/* Restructure Lifecycle Hooks                                                */
/* ========================================================================== */
woffDirectoryStruct.process = function (this: WOFFDirectoryContext): void {
	const mappedTables: Record<string, WOFFDirectoryEntry> = {};

	const binaryTables = this.tables as unknown as WOFFDirectoryBinary[];
	for (const table of binaryTables) {
		mappedTables[table.tag] = table as unknown as WOFFDirectoryEntry;
	}

	this.tables = mappedTables;
};
