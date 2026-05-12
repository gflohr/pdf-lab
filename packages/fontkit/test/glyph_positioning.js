import './addTestHelpersToFontkit.js';
import assert from 'node:assert';
import fontkit from '../src/index.js';

describe('glyph positioning', () => {
	describe('basic positioning', () => {
		const font = fontkit.openSync(
			`${import.meta.dirname}/data/SourceSansPro/SourceSansPro-Regular.otf`,
		);

		it('should get a glyph width', () =>
			assert.equal(font.getGlyph(5).advanceWidth, 615));
	});

	describe('opentype positioning', () => {
		const font = fontkit.openSync(
			`${import.meta.dirname}/data/SourceSansPro/SourceSansPro-Regular.otf`,
		);

		it('should apply opentype GPOS features', () => {
			const { positions } = font.layout('Twitter');
			return assert.deepEqual(
				positions.map((p) => p.xAdvance),
				[502, 718, 246, 318, 324, 496, 347],
			);
		});

		it('should ignore duplicate features', () => {
			const { positions } = font.layout('Twitter', ['kern', 'kern']);
			return assert.deepEqual(
				positions.map((p) => p.xAdvance),
				[502, 718, 246, 318, 324, 496, 347],
			);
		});
	});

	describe('AAT features', () => {
		const font = fontkit.openSync(
			`${import.meta.dirname}/data/Play/Play-Regular.ttf`,
		);

		it('should apply kerning by default', () => {
			const { positions } = font.layout('Twitter');
			return assert.deepEqual(
				positions.map((p) => p.xAdvance),
				[535, 792, 246, 372, 402, 535, 351],
			);
		});
	});
});
