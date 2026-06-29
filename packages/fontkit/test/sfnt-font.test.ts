/** biome-ignore-all lint/complexity/useLiteralKeys: private access for testing */

import type { DecodeStream } from '@pdf-lib/restructure';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { BaseFontDirectory } from '../src/null-font.js';
import { requiredOpenTypeTables } from '../src/open-type-font.js';
import { SFNTFont } from '../src/sfnt-font.js';
import type {
	SFNTDirectoryEntry,
	SFNTTableMap,
} from '../src/tables/directory.js';

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

describe('SFNTFont Capabilities & Table Resolution', () => {
	let font: SFNTFont;

	beforeEach(() => {
		font = Object.create(SFNTFont.prototype);

		font['tables'] = {} as SFNTTableMap;
		font.directory = {
			tag: 'true',
			numTables: 0,
			tables: {},
		} as BaseFontDirectory;

		// Mock out internal decode method.
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

			expect(font.hasTable('head', false)).toBe(true);
			expect(font['decodeTable']).not.toHaveBeenCalled();
		});

		it('should return true if an unknown table exists and decode is false (without parsing it)', () => {
			++font.directory.numTables;
			font.directory.tables.foot = {
				tag: 'foot',
				offset: 100,
			};

			expect(font.hasTable('foot', false)).toBe(true);
			expect(font['decodeTable']).not.toHaveBeenCalled();
		});

		it('should trigger eager decoding and return true if decode is true and parsing succeeds', () => {
			++font.directory.numTables;
			font.directory.tables.head = {
				tag: 'head',
				offset: 100,
			};

			expect(font.hasTable('head', true)).toBe(true);
			expect(font['decodeTable']).toHaveBeenCalledWith({
				tag: 'head',
				offset: 100,
			});
			expect(font['tables']['head']).toEqual({ tag: 'head', mockParsed: true });
		});

		it('should not trigger eager decoding for an unknown table and return false if decode is true', () => {
			++font.directory.numTables;
			font.directory.tables.foot = {
				tag: 'foot',
				offset: 100,
			};

			expect(font.hasTable('foot', true)).toBe(false);
			expect(font['decodeTable']).not.toHaveBeenCalledWith();
		});

		it('should trap standard decoding errors and throw, when decode is true', () => {
			++font.directory.numTables;
			font.directory.tables.head = {
				tag: 'head',
				offset: 100,
			};

			vi.mocked(font['decodeTable']).mockImplementationOnce(() => {
				throw new Error('Corrupt data');
			});

			expect(font.hasTable('head', true)).toBeFalsy();
			expect(font['tables']['head']).toBeNull();
		});
	});

	describe('SFNTFont Constructor - Outline Detection', () => {
		let mockStream: DecodeStream;

		beforeEach(() => {
			mockStream = { pos: 0 } as DecodeStream;

			SFNTFont.prototype['decodeDirectory'] = vi.fn().mockReturnValue({
				tables: {},
			});
		});

		const createFontWithTables = (tags: string[]) => {
			// Setup the directory entry return map for the constructor to loop over
			const tablesMap: Record<string, any> = {};
			for (const tag of tags) {
				tablesMap[tag] = { tag, length: 100, offset: 0 };
			}

			vi.mocked(SFNTFont.prototype['decodeDirectory']).mockReturnValueOnce({
				tag: 'true',
				numTables: tags.length,
				tables: tablesMap,
			} as any);

			return new SFNTFont(mockStream);
		};

		it('should set outlines to "" if the core 8 OpenType tables are not complete', () => {
			// Missing 'post'
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
		let font: SFNTFont;

		beforeEach(() => {
			// Create an isolated prototype instance to bypass the constructor
			font = Object.create(SFNTFont.prototype);

			font['existingTableTags'] = new Set<string>();
			font['tables'] = {} as SFNTTableMap;
			font.directory = { tables: {} } as BaseFontDirectory;

			font['getTable'] = vi.fn().mockReturnValue({});

			for (const tag of requiredOpenTypeTables) {
				font['existingTableTags'].add(tag);
				font.directory.tables[tag] = { tag, offset: 0, length: 100 } as unknown;
			}
		});

		describe('Without Decoding: asOpenTypeFont(false) / asOpenTypeFont()', () => {
			it('should successfully upcast the font view without parsing raw table structures', () => {
				font.outlines = 'TrueType';

				const result = font.asOpenTypeFont(false);

				expect(result).toBe(font);

				// Ensure the lazy evaluation loop was skipped completely!
				expect(font['getTable']).not.toHaveBeenCalled();
			});
		});

		describe('With eager decoding: asOpenTypeFont(true)', () => {
			it('should force immediate decoding on the 8 core tables when layout evaluates to outlines: "none"', () => {
				font['outlines'] = 'none';

				font.asOpenTypeFont(true);

				expect(font['getTable']).toHaveBeenCalledTimes(8);
				for (const tag of requiredOpenTypeTables) {
					expect(font['getTable']).toHaveBeenCalledWith(
						font.directory.tables[tag],
					);
				}
			});

			it('should decode the 8 core tables PLUS glyf and loca when outlines are "TrueType"', () => {
				font['outlines'] = 'TrueType';

				font['existingTableTags'].add('glyf').add('loca');
				font.directory.tables['glyf'] = { tag: 'glyf' } as SFNTDirectoryEntry;
				font.directory.tables['loca'] = { tag: 'loca' } as SFNTDirectoryEntry;

				font.asOpenTypeFont(true);

				// 8 core tables + 2 outline tables = 10 table resolution calls
				// total.
				expect(font['getTable']).toHaveBeenCalledTimes(10);
				expect(font['getTable']).toHaveBeenCalledWith(
					font.directory.tables['glyf'],
				);
				expect(font['getTable']).toHaveBeenCalledWith(
					font.directory.tables['loca'],
				);
			});

			it('should decode the 8 core tables PLUS CFF when outlines are CFF version 1', () => {
				font.outlines = 'PostScript';
				font.outlineVersion = 1;

				// Inject the structural PostScript dependencies into our mock maps
				font['existingTableTags'].add('CFF ');
				font.directory.tables['CFF '] = { tag: 'CFF ' } as SFNTDirectoryEntry;

				font.asOpenTypeFont(true);

				// 8 core tables + 1 outline table = 9 table resolution calls total
				expect(font['getTable']).toHaveBeenCalledTimes(9);
				expect(font['getTable']).toHaveBeenCalledWith(
					font.directory.tables['CFF '],
				);
			});

			it('should decode the 8 core tables PLUS CFF2 when outlines are CFF version 2', () => {
				font.outlines = 'PostScript';
				font.outlineVersion = 2;

				// Inject the structural PostScript dependencies into our mock maps
				font['existingTableTags'].add('CFF2');
				font.directory.tables['CFF2'] = { tag: 'CFF2' } as SFNTDirectoryEntry;

				font.asOpenTypeFont(true);

				// 8 core tables + 1 outline table = 9 table resolution calls total
				expect(font['getTable']).toHaveBeenCalledTimes(9);
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

				expect(() => font.asOpenTypeFont(true)).toThrow(
					'Malformed table array stream',
				);
			});
		});
	});
});
