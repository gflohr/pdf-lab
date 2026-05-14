import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { SFNTFont } from '../src/sfnt-font.js';
import fontkit from './helpers.js';

const datadir = path.resolve(import.meta.dirname, './data');

describe('character to glyph mapping', () => {
	describe('basic cmap handling', () => {
		const font = fontkit.openSync(`${datadir}/OpenSans/OpenSans-Regular.ttf`);

		it('should get characterSet', () => {
			expect(Array.isArray(font.characterSet)).toBeTruthy();
			expect(font.characterSet.length).toBe(884);
		});

		it('should check if a character is supported', () => {
			expect(font.hasGlyphForCodePoint('a'.charCodeAt(0))).toBeTruthy();
			expect(font.hasGlyphForCodePoint(0)).toBeFalsy();
		});

		it('should get a glyph for a character code', () => {
			const glyph = font.glyphForCodePoint('a'.charCodeAt(0));
			expect(glyph.id).toBe(68);
			expect(glyph.codePoints).toStrictEqual([97]);
		});

		it('should map a string to glyphs', () => {
			const glyphs = font.glyphsForString('hello');
			expect(Array.isArray(glyphs)).toBeTruthy();
			expect(glyphs.length).toBe(5);
			expect(glyphs.map((g) => g.id)).toStrictEqual([75, 72, 79, 79, 82]);
			expect(glyphs.map((g) => g.codePoints)).toStrictEqual([
				[104],
				[101],
				[108],
				[108],
				[111],
			]);
		});

		it('should support unicode variation selectors', () => {
			const font = fontkit.openSync(`${datadir}/fonttest/TestCMAP14.otf`);
			const glyphs = font.glyphsForString(
				'\u{82a6}\u{82a6}\u{E0100}\u{82a6}\u{E0101}',
			);
			expect(glyphs.map((g) => g.id)).toStrictEqual([1, 1, 2]);
		});

		it('should support legacy encodings when no unicode cmap is found', () => {
			const font = fontkit.openSync(
				`${datadir}/fonttest/TestCMAPMacTurkish.ttf`,
			);
			const glyphs = font.glyphsForString('“ABÇĞIİÖŞÜ”');
			expect(glyphs.map((g) => g.id)).toStrictEqual([
				200, 34, 35, 126, 176, 42, 178, 140, 181, 145, 201,
			]);
		});
	});

	describe('opentype features', () => {
		const font = fontkit.openSync(
			`${datadir}/SourceSansPro/SourceSansPro-Regular.otf`,
		);

		it('should list available features', () =>
			expect(font.availableFeatures).toStrictEqual([
				'aalt',
				'c2sc',
				'case',
				'ccmp',
				'dnom',
				'frac',
				'liga',
				'numr',
				'onum',
				'ordn',
				'pnum',
				'salt',
				'sinf',
				'smcp',
				'ss01',
				'ss02',
				'ss03',
				'ss04',
				'ss05',
				'subs',
				'sups',
				'zero',
				'kern',
				'mark',
				'mkmk',
				'size',
			]));

		it('should apply opentype GSUB features', () => {
			const { glyphs } = font.layout('ffi', ['dlig']);
			expect(glyphs.length).toBe(2);
			expect(glyphs.map((g) => g.id)).toStrictEqual([514, 36]);
			expect(glyphs.map((g) => g.codePoints)).toStrictEqual([
				[102, 102],
				[105],
			]);
		});

		it('should enable fractions when using fraction slash', () => {
			const { glyphs } = font.layout('123 1⁄16 123');
			expect(glyphs.map((g) => g.id)).toStrictEqual([
				1088, 1089, 1090, 1, 1617, 1724, 1603, 1608, 1, 1088, 1089, 1090,
			]);
		});

		it('should not break if can’t enable fractions when using fraction slash', () => {
			const { glyphs } = font.layout('a⁄b ⁄ 1⁄ ⁄2');
			expect(glyphs.map((g) => g.id)).toStrictEqual([
				28, 1724, 29, 1, 1724, 1, 1617, 1724, 1, 1724, 1604,
			]);
		});
	});

	describe('AAT features', () => {
		const font = fontkit.openSync(`${datadir}/Play/Play-Regular.ttf`);

		it('should list available features', () =>
			expect(font.availableFeatures).toStrictEqual([
				'tnum',
				'sups',
				'subs',
				'numr',
				'onum',
				'lnum',
				'liga',
				'kern',
			]));

		it('should apply default AAT morx features', () => {
			const { glyphs } = font.layout('ffi 1⁄2');
			expect(glyphs.length).toBe(5);
			expect(glyphs.map((g) => g.id)).toStrictEqual([767, 3, 20, 645, 21]);
			expect(glyphs.map((g) => g.codePoints)).toStrictEqual([
				[102, 102, 105],
				[32],
				[49],
				[8260],
				[50],
			]);
		});

		it('should apply user specified features', () => {
			const { glyphs } = font.layout('ffi 1⁄2', ['numr']);
			expect(glyphs.length).toBe(3);
			expect(glyphs.map((g) => g.id)).toStrictEqual([767, 3, 126]);
			expect(glyphs.map((g) => g.codePoints)).toStrictEqual([
				[102, 102, 105],
				[32],
				[49, 8260, 50],
			]);
		});

		it('should handle rtl direction', () => {
			const { glyphs } = font.layout('ffi', [], null, null, 'rtl');
			expect(glyphs.length).toBe(3);
			expect(glyphs.map((g) => g.id)).toStrictEqual([76, 73, 73]);
			expect(glyphs.map((g) => g.codePoints)).toStrictEqual([
				[105],
				[102],
				[102],
			]);
		});

		it('should apply indic reordering features', () => {
			const f = fontkit.openSync(`${datadir}/Khmer/Khmer.ttf`);
			const { glyphs } = f.layout('ខ្ញុំអាចញ៉ាំកញ្ចក់បាន ដោយគ្មានបញ្ហា');
			expect(glyphs.map((g) => g.id)).toStrictEqual([
				45, 153, 177, 112, 248, 188, 49, 296, 44, 187, 149, 44, 117, 236, 188,
				63, 3, 107, 226, 188, 69, 218, 169, 188, 63, 64, 255, 175, 188,
			]);

			expect(glyphs.map((g) => g.codePoints)).toStrictEqual([
				[6017],
				[6098, 6025],
				[6075],
				[6086],
				[6050],
				[6070],
				[6021],
				[6025, 6089, 6070, 6086],
				[6016],
				[6025],
				[6098, 6021],
				[6016],
				[6091],
				[6036],
				[6070],
				[6035],
				[32],
				[6084],
				[6026],
				[6070],
				[6041],
				[6018],
				[6098, 6040],
				[6070],
				[6035],
				[6036],
				[6025],
				[6098, 6048],
				[6070],
			]);
		});
	});

	describe('glyph id to strings', () => {
		it('should return strings from cmap that map to a given glyph', () => {
			const font = fontkit.openSync(
				`${datadir}/OpenSans/OpenSans-Regular.ttf`,
			);
			const strings = font.stringsForGlyph(68);
			expect(strings).toStrictEqual(['a']);
		});

		it('should return strings from AAT morx table that map to the given glyph', () => {
			const font = fontkit.openSync(
				`${datadir}/Play/Play-Regular.ttf`,
			);
			const strings = font.stringsForGlyph(767);
			expect(strings).toStrictEqual(['ffi']);
		});
	});
});
