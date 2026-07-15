import * as r from 'restructure';
import type { WOFFDirectoryEntry } from './woff-directory.js';
import { SFNTDirectory } from './index.js';

const Base128 = {
	decode(stream: r.DecodeStream): number {
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
	size(): never {
		throw new Error('Base128 does not have a size');
	},
	encode(): never {
		throw new Error('Base128 does not implement encoding');
	},
	fromBuffer(_buf: Uint8Array): never {
		throw new Error('Base128 does not support decoding from a buffer.');
	},
	toBuffer(): Uint8Array {
		throw new Error('Base128 does not support encoding to a buffer.');
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

/**
 * Tier 1: Pure Binary Representation (Matches file bytes exactly)
 */
export interface WOFF2TableEntryBinary {
	flags: number;
	customTag?: string;
	tag: string;
	length: number;
	transformVersion: number;
	transformed: boolean;
	transformLength?: number;
}

export interface WOFF2DirectoryBinary {
	tag: string; // Should be 'wOF2'
	flavor: number;
	length: number;
	numTables: number;
	totalSfntSize: number;
	totalCompressedSize: number;
	majorVersion: number;
	minorVersion: number;
	metaOffset: number;
	metaLength: number;
	metaOrigLength: number;
	privOffset: number;
	privLength: number;
	tables: WOFF2TableEntryBinary[];
}

/**
 * Tier 2: Post-Processed Runtime Representation (Clean App API)
 */
export interface WOFF2TableMetadata {
	offset: number;
	transformed: boolean;
	length: number;
	transformLength?: number;
	flags: number;
}

// Re-map WOFFDirectoryEntry directly to retain compressed structural properties
// while appending specific WOFF2 stream transformation fields safely.
export interface WOFF2DirectoryEntry
	extends WOFFDirectoryEntry,
		WOFF2TableMetadata {}

export interface WOFF2Directory extends SFNTDirectory {
	tag: string;
	flavor: number;
	length: number;
	numTables: number;
	totalSfntSize: number;
	totalCompressedSize: number;
	majorVersion: number;
	minorVersion: number;
	metaOffset: number;
	metaLength: number;
	metaOrigLength: number;
	privOffset: number;
	privLength: number;
	/** Satisfies the SFNTFontDirectory requirement */
	tables: Record<string, WOFF2DirectoryEntry>;
}

/**
 * Internal context layout map used strictly for restructuring hooks
 */
interface WOFF2DirectoryContext extends Omit<WOFF2Directory, 'tables'> {
	tables: WOFF2TableEntryBinary[] & Record<string, WOFF2DirectoryEntry>;
}

/* ========================================================================== */
/* Binary Layout Definitions                                                  */
/* ========================================================================== */

const woff2DirectoryEntryFields = {
	flags: r.uint8,
	customTag: new r.Optional(new r.String(4), (t) => (t.flags & 0x3f) === 0x3f),
	tag: (t: WOFF2TableEntryBinary) => t.customTag || knownTags[t.flags & 0x3f],
	length: Base128,
	transformVersion: (t: WOFF2TableEntryBinary) => (t.flags >>> 6) & 0x03,
	transformed: (t: WOFF2TableEntryBinary) =>
		t.tag === 'glyf' || t.tag === 'loca'
			? t.transformVersion === 0
			: t.transformVersion !== 0,
	transformLength: new r.Optional(Base128, (t) => t.transformed),
};

const woff2DirectoryEntryStruct = new r.Struct<
	typeof woff2DirectoryEntryFields,
	WOFF2TableEntryBinary
>(woff2DirectoryEntryFields);

const fields = {
	tag: new r.String(4),
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
	tables: new r.Array(woff2DirectoryEntryStruct, 'numTables'),
};

export const woff2DirectoryStruct = new r.Struct<typeof fields, WOFF2Directory>(
	fields,
);

/* ========================================================================== */
/* Restructure Lifecycle Hooks                                                */
/* ========================================================================== */

woff2DirectoryStruct.process = function (this: WOFF2DirectoryContext): void {
	const mappedTables: Record<string, WOFF2DirectoryEntry> = {};

	for (let i = 0; i < this.tables.length; i++) {
		const table = this.tables[i];
		mappedTables[table.tag] = table as any;
	}

	this.tables = mappedTables as any;
};
