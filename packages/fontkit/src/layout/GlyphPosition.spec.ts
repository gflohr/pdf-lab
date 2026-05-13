import path from 'node:path';
import { describe, expect, it } from 'vitest';
import fontkit from '../test-helpers.js';

const datadir = path.resolve(import.meta.dirname, '../../test-data');

describe('glyph positioning', () => {
	describe('basic positioning', () => {
		const font = fontkit.openSync(
			`${datadir}/SourceSansPro/SourceSansPro-Regular.otf`,
		);

		it('should get a glyph width', () =>
			expect(font.getGlyph(5).advanceWidth).toBe(615));
	});

	describe('opentype positioning', () => {
		const font = fontkit.openSync(
			`${datadir}/SourceSansPro/SourceSansPro-Regular.otf`,
		);

		it('should apply opentype GPOS features', () => {
			const { positions } = font.layout('Twitter');
			expect(positions.map((p) => p.xAdvance)).toStrictEqual(
				[502, 718, 246, 318, 324, 496, 347],
			);
		});

		it('should ignore duplicate features', () => {
			const { positions } = font.layout('Twitter', ['kern', 'kern']);
			expect(positions.map((p) => p.xAdvance)).toStrictEqual(
				[502, 718, 246, 318, 324, 496, 347],
			);
		});
	});

	describe('AAT features', () => {
		const font = fontkit.openSync(
			`${datadir}/Play/Play-Regular.ttf`,
		);

		it('should apply kerning by default', () => {
			const { positions } = font.layout('Twitter');
			expect(positions.map((p) => p.xAdvance)).toStrictEqual(
				[535, 792, 246, 372, 402, 535, 351],
			);
		});
	});
});
