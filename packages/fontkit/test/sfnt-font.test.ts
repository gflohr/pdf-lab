/** biome-ignore-all lint/complexity/useLiteralKeys: private access for testing */

import type { DecodeStream } from '@pdf-lib/restructure';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	requiredOpenTypeTables,
	requiredOpenTypeTrueTypeTables,
} from '../src/open-type-font.js';
import type { SFNTFontDirectory } from '../src/sfnt-font.js';
import type {
	SFNTDirectoryEntry,
	SFNTTableMap,
} from '../src/tables/directory.js';
import { TrueTypeFont } from '../src/true-type-font.js';

vi.mock('./src/tables/index.js', () => ({
	tables: {
		cmap: {},
		head: {},
		hhea: {},
		hmtx: {},
		maxp: {},
		name: {},
		'OS/2': {},
		post: {},
		glyf: {},
		loca: {},
		'CFF ': {},
	},
}));

describe('TrueTypeFont Capabilities & Table Resolution', () => {
	let font: TrueTypeFont;

	beforeEach(() => {
		font = Object.create(TrueTypeFont.prototype);

		font['tables'] = {} as SFNTTableMap;
		font.directory = {
			tag: 'true',
			numTables: 0,
			tables: {},
		} as SFNTFontDirectory;

		font['decodeTable'] = vi.fn(
			(entry: SFNTDirectoryEntry) =>
				({ tag: entry.tag, mockParsed: true }) as any,
		);
	});

	describe('hasTable()', () => {
		it('should return false if the table tag does not exist in the binary directory', () => {
			expect(font.hasTable('head')).toBe(false);
			expect(font['decodeTable']).not.toHaveBeenCalled();
		});

		it('should return true if the table exists and decode is false (without parsing it)', () => {
			++font.directory.numTables;
			font.directory.tables.head = {
				tag: 'head',
				offset: 100,
			};

			expect(font.hasTable('head')).toBe(true);
			expect(font['decodeTable']).not.toHaveBeenCalled();
		});

		it('should return true if an unknown table exists and decode is false (without parsing it)', () => {
			++font.directory.numTables;
			font.directory.tables.foot = {
				tag: 'foot',
				offset: 100,
			};

			expect(font.hasTable('foot')).toBe(true);
			expect(font['decodeTable']).not.toHaveBeenCalled();
		});
	});

	describe('TrueTypeFont Constructor - Outline Detection', () => {
		let mockStream: DecodeStream;

		beforeEach(() => {
			mockStream = { pos: 0 } as DecodeStream;

			TrueTypeFont.prototype['decodeDirectory'] = vi.fn().mockReturnValue({
				tables: {},
			});
		});

		const createFontWithTables = (tags: string[]) => {
			const tablesMap: Record<string, any> = {};
			for (const tag of tags) {
				tablesMap[tag] = { tag, length: 100, offset: 0 };
			}

			vi.mocked(TrueTypeFont.prototype['decodeDirectory']).mockReturnValueOnce({
				tag: 'true',
				numTables: tags.length,
				tables: tablesMap,
			} as any);

			return new TrueTypeFont(mockStream);
		};

		it('should set outlines to "" if the core 8 OpenType tables are not complete', () => {
			const incompleteTags = [
				'cmap',
				'head',
				'hhea',
				'hmtx',
				'maxp',
				'name',
				'OS/2',
			];
			const font = createFontWithTables(incompleteTags);

			expect(font.outlines).toBe('');
		});

		it('should set outlines to "none" if all 8 core tables exist but vector outline tags are missing', () => {
			const coreOnlyTags = [
				'cmap',
				'head',
				'hhea',
				'hmtx',
				'maxp',
				'name',
				'OS/2',
				'post',
			];
			const font = createFontWithTables(coreOnlyTags);

			expect(font.outlines).toBe('none');
		});

		it('should set outlines to "TrueType" when core tables plus glyf and loca exist', () => {
			const ttTags = [
				'cmap',
				'head',
				'hhea',
				'hmtx',
				'maxp',
				'name',
				'OS/2',
				'post',
				'glyf',
				'loca',
			];
			const font = createFontWithTables(ttTags);

			expect(font.outlines).toBe('TrueType');
		});

		it('should set outlines to "PostScript" when core tables plus CFF exist', () => {
			const psTags = [
				'cmap',
				'head',
				'hhea',
				'hmtx',
				'maxp',
				'name',
				'OS/2',
				'post',
				'CFF ',
			];
			const font = createFontWithTables(psTags);

			expect(font.outlines).toBe('PostScript');
		});
	});

	describe('asOpenType()', () => {
		let font: TrueTypeFont;

		beforeEach(() => {
			font = Object.create(TrueTypeFont.prototype);

			font['existingTableTags'] = new Set<string>();
			font['tables'] = {} as SFNTTableMap;
			font.directory = { tables: {} } as SFNTFontDirectory;

			font['getTable'] = vi.fn().mockReturnValue({});

			for (const tag of requiredOpenTypeTables) {
				font['existingTableTags'].add(tag);
				font.directory.tables[tag] = { tag, offset: 0, length: 100 } as unknown;
			}
		});

		describe('With decoding: asOpenTypeFont()', () => {
			it('should force immediate decoding on the core tables when layout evaluates to outlines: "none"', () => {
				font['outlines'] = 'none';

				font.asOpenTypeFont();

				const numFonts = requiredOpenTypeTables.length;

				expect(font['getTable']).toHaveBeenCalledTimes(numFonts);
				for (const tag of requiredOpenTypeTables) {
					expect(font['getTable']).toHaveBeenCalledWith(
						font.directory.tables[tag],
					);
				}
			});

			it('should decode the core tables PLUS loca when outlines are "TrueType"', () => {
				font['outlines'] = 'TrueType';

				font['existingTableTags'].add('loca');
				font.directory.tables['loca'] = { tag: 'loca' } as SFNTDirectoryEntry;

				font.asOpenTypeFont();

				const numTables = requiredOpenTypeTrueTypeTables.length;
				expect(font['getTable']).toHaveBeenCalledTimes(numTables);
				expect(font['getTable']).toHaveBeenCalledWith(
					font.directory.tables['loca'],
				);
			});

			it('should decode the core tables PLUS CFF when outlines are CFF version 1', () => {
				font.outlines = 'PostScript';
				font.outlineVersion = 1;

				font['existingTableTags'].add('CFF ');
				font.directory.tables['CFF '] = { tag: 'CFF ' } as SFNTDirectoryEntry;

				font.asOpenTypeFont();

				const numTables = requiredOpenTypeTables.length + 1;
				expect(font['getTable']).toHaveBeenCalledTimes(numTables);
				expect(font['getTable']).toHaveBeenCalledWith(
					font.directory.tables['CFF '],
				);
			});

			it('should decode the core tables PLUS CFF2 when outlines are CFF version 2', () => {
				font.outlines = 'PostScript';
				font.outlineVersion = 2;

				font['existingTableTags'].add('CFF2');
				font.directory.tables['CFF2'] = { tag: 'CFF2' } as SFNTDirectoryEntry;

				font.asOpenTypeFont();

				const numTables = requiredOpenTypeTrueTypeTables.length;
				expect(font['getTable']).toHaveBeenCalledTimes(numTables);
				expect(font['getTable']).toHaveBeenCalledWith(
					font.directory.tables['CFF2'],
				);
			});

			it('should catch an underlying parsing error and throw the clean upcast diagnostic message', () => {
				font['outlines'] = 'none';

				vi.mocked(font['getTable']).mockImplementation((entry) => {
					if (entry.tag === 'OS/2')
						throw new Error('Malformed table array stream');
					return {} as any;
				});

				expect(() => font.asOpenTypeFont()).toThrow(
					'Malformed table array stream',
				);
			});
		});
	});
});
