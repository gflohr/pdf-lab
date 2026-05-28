import r, { type DecodeStream } from '@pdf-lib/restructure';
import type { SFNTDirectoryTable } from './directory.js';
import type { WOFFTable, WOFFTableMap } from './woff-directory.js';

const Base128 = {
	decode(stream: DecodeStream) {
		let result = 0;
		const iterable = [0, 1, 2, 3, 4];
		for (let j = 0; j < iterable.length; j++) {
			const code = stream.readUInt8();

			// If any of the top seven bits are set then we're about to overflow.
			if (result & 0xe0000000) {
				throw new Error('Overflow');
			}

			result = (result << 7) | (code & 0x7f);
			if ((code & 0x80) === 0) {
				return result;
			}
		}

		throw new Error('Bad base 128 number');
	},
	size() {
		throw new Error('Base128 does not have a size');
	},
	encode() {
		throw new Error('Base128 does not implement encoding');
	},
};

const knownTags = [
	'cmap',
	'head',
	'hhea',
	'hmtx',
	'maxp',
	'name',
	'OS/2',
	'post',
	'cvt ',
	'fpgm',
	'glyf',
	'loca',
	'prep',
	'CFF ',
	'VORG',
	'EBDT',
	'EBLC',
	'gasp',
	'hdmx',
	'kern',
	'LTSH',
	'PCLT',
	'VDMX',
	'vhea',
	'vmtx',
	'BASE',
	'GDEF',
	'GPOS',
	'GSUB',
	'EBSC',
	'JSTF',
	'MATH',
	'CBDT',
	'CBLC',
	'COLR',
	'CPAL',
	'SVG ',
	'sbix',
	'acnt',
	'avar',
	'bdat',
	'bloc',
	'bsln',
	'cvar',
	'fdsc',
	'feat',
	'fmtx',
	'fvar',
	'gvar',
	'hsty',
	'just',
	'lcar',
	'mort',
	'morx',
	'opbd',
	'prop',
	'trak',
	'Zapf',
	'Silf',
	'Glat',
	'Gloc',
	'Feat',
	'Sill',
];

export interface WOFF2TableMetadata {
	offset: number;
	transformed: boolean;
	length: number;
	transformLength?: number;
	flags: number;
}

export type WOFF2TableMap = {
	// Intersect metadata onto every possible table type from WOFFTableMap
	[K in keyof WOFFTableMap]: WOFFTableMap[K] extends null
		? null
		: WOFFTableMap[K] & WOFF2TableMetadata;
} & Record<string, (WOFFTable & WOFF2TableMetadata) | null>;

export interface WOFF2DirectoryTable extends SFNTDirectoryTable {
	totalCompressedSize: number;
	length: number;
	transformLength: number;
	offset: number;

	/**
	 * Record mapping identifying table tags directly to parsed table
	 * configurations.
	 */
	tables: WOFF2TableMap;
}

interface WOFF2DirectoryEntry {
	flags: number;
	customTag?: string;
	tag: string;
	length: number,
	transformVersion: number;
	transformed: boolean;
	transformLength?: number;
}

const WOFF2DirectoryEntryFields = {
	flags: r.uint8,
	customTag: new r.Optional(new r.String(4), (t) => (t.flags & 0x3f) === 0x3f),
	tag: (t: WOFF2DirectoryEntry) =>
		t.customTag || knownTags[t.flags & 0x3f], // || (() => { throw new Error(`Bad tag: ${flags & 0x3f}`); })(); },
	length: Base128,
	transformVersion: (t: WOFF2DirectoryEntry) => (t.flags >>> 6) & 0x03,
	transformed: (t: WOFF2DirectoryEntry) =>
		t.tag === 'glyf' || t.tag === 'loca'
			? t.transformVersion === 0
			: t.transformVersion !== 0,
	transformLength: new r.Optional(Base128, (t) => t.transformed),
}
const WOFF2DirectoryEntryStruct = new r.Struct<typeof WOFF2DirectoryEntryFields, WOFF2DirectoryEntry>(WOFF2DirectoryEntryFields);

const fields = {
	tag: new r.String(4), // should be 'wOF2'
	flavor: r.uint32,
	length: r.uint32,
	numTables: r.uint16,
	reserved: new r.Reserved(r.uint16),
	totalSfntSize: r.uint32,
	totalCompressedSize: r.uint32,
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	metaOffset: r.uint32,
	metaLength: r.uint32,
	metaOrigLength: r.uint32,
	privOffset: r.uint32,
	privLength: r.uint32,
	tables: new r.Array(WOFF2DirectoryEntryStruct, 'numTables'),
};
const WOFF2Directory = new r.Struct<typeof fields, WOFF2DirectoryTable>(fields);

WOFF2Directory.process = function () {
	const tables: Record<string, unknown> = {};
	for (let i = 0; i < this.tables.length; i++) {
		const table = this.tables[i];
		tables[table.tag] = table;
	}

	this.tables = tables;

	return tables;
};

export default WOFF2Directory;
