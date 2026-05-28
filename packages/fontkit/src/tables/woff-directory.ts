import r from '@pdf-lib/restructure';
import type {
	FilteredTableMap,
	SFNTDirectoryTable,
	SFNTTable,
} from './directory.js';

export interface WOFFTable extends SFNTTable {
	compLength: number;
}

/**
 * A strongly-typed dictionary map collection of all tables inside an SFNT font.
 * Keys match known font tags ('post', 'hvar') or fallback to arbitrary custom
 * strings.
 */
export type WOFFTableMap = Record<string, WOFFTable | null> &
	Partial<FilteredTableMap>;

/**
 * Represents the parsed master Table Directory at the head of every SFNT
 * (TrueType/OpenType) file.
 *
 * Scaled layout calculation parameters (`searchRange`, `entrySelector`,
 * `rangeShift`) are configured automatically by the directory compilation
 * engine during binary generation phases.
 */
export interface WOFFDirectoryTable extends SFNTDirectoryTable {
	/**
	 * Scaled signature layout tag (e.g., 'true' or 'OTTO' for OpenType
	 * PostScript layouts).
	 */
	tag: string;

	flavor: number;
	length: number;

	/**
	 * Total number of functional individual tables embedded within the font
	 * package.
	 */
	numTables: number;

	totalSfntSize: number;
	majorVersion: number;
	minorVersion: number;
	metaOffset: number;
	metaLength: number;
	metaOrigLength: number;
	privOffset: number;
	privLength: number;

	/**
	 * Record mapping identifying table tags directly to parsed table
	 * configurations.
	 */
	tables: WOFFTableMap;
}

interface WOFFDirectoryEntry {
	tag: string,
	offset: number,
	compLength: number,
	length: number,
	origCheckSum: number,
}
const woffDirectoryFields = {
	tag: new r.String(4),
	offset: new r.Pointer(r.uint32, 'void', { type: 'global' }),
	compLength: r.uint32,
	length: r.uint32,
	origChecksum: r.uint32,
};
const WOFFDirectoryEntryStruct = new r.Struct<typeof woffDirectoryFields, WOFFDirectoryEntry>(woffDirectoryFields);

const fields = {
	tag: new r.String(4), // should be 'wOFF'
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
const WOFFDirectory = new r.Struct<typeof fields, WOFFDirectoryTable>(fields);

WOFFDirectory.process = function () {
	const tables: Record<string, unknown> = {};
	for (const table of this.tables) {
		tables[table.tag] = table;
	}

	this.tables = tables;
};

export default WOFFDirectory;
