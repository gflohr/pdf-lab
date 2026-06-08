import r from '@pdf-lib/restructure';

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
export interface WOFFDirectoryEntry extends WOFFTableEntryBinary {
	/** The actual decoded table payload stream, or null if unparsed */
	unwrapped?: unknown;
}

export interface WOFFDirectory {
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
	tables: WOFFTableEntryBinary[] & Record<string, WOFFDirectoryEntry>;
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

const WOFFDirectoryEntryStruct = new r.Struct<
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
	tables: new r.Array(WOFFDirectoryEntryStruct, 'numTables'),
};

const WOFFDirectoryStruct = new r.Struct<typeof fields, WOFFDirectory>(fields);

/* ========================================================================== */
/* Restructure Lifecycle Hooks                                                */
/* ========================================================================== */

WOFFDirectoryStruct.process = function (this: WOFFDirectoryContext): void {
	const mappedTables: Record<string, WOFFDirectoryEntry> = {};

	for (const table of this.tables) {
		mappedTables[table.tag] = table;
	}

	// Safely cast away the binary array representation to the clean runtime map
	this.tables = mappedTables as any;
};

export default WOFFDirectoryStruct;
