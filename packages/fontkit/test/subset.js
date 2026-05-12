import assert from 'node:assert';
import fs from 'node:fs';
import r from '@pdf-lib/restructure';
import concat from 'concat-stream';
import CFFFont from '../src/cff/CFFFont.js';
import CFFGlyph from '../src/glyph/CFFGlyph.js';
import './addTestHelpersToFontkit.js';
import fontkit from '../src/index.js';

describe('font subsetting', () => {
	describe('truetype subsetting', () => {
		const font = fontkit.openSync(
			`${import.meta.dirname}/data/OpenSans/OpenSans-Regular.ttf`,
		);

		it('should create a TTFSubset instance', () => {
			const subset = font.createSubset();
			assert.equal(subset.constructor.name, 'TTFSubset');
		});

		it('should produce a subset', (done) => {
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('hello')) {
				subset.includeGlyph(glyph);
			}

			subset.encodeStream().pipe(
				concat((buf) => {
					const f = fontkit.create(buf);
					assert.equal(f.numGlyphs, 5);
					assert.equal(
						f.getGlyph(1).path.toSVG(),
						font.glyphsForString('h')[0].path.toSVG(),
					);
					done();
				}),
			);
		});

		it('should re-encode variation glyphs', (done) => {
			if (!fs.existsSync('/Library/Fonts/Skia.ttf')) return done();

			const font = fontkit.openSync('/Library/Fonts/Skia.ttf', 'Bold');
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('e')) {
				subset.includeGlyph(glyph);
			}

			subset.encodeStream().pipe(
				concat((buf) => {
					const f = fontkit.create(buf);
					assert.equal(
						f.getGlyph(1).path.toSVG(),
						font.glyphsForString('e')[0].path.toSVG(),
					);
					done();
				}),
			);
		});

		it('should handle composite glyphs', (done) => {
			const subset = font.createSubset();
			subset.includeGlyph(font.glyphsForString('é')[0]);

			subset.encodeStream().pipe(
				concat((buf) => {
					const f = fontkit.create(buf);
					assert.equal(f.numGlyphs, 4);
					assert.equal(
						f.getGlyph(1).path.toSVG(),
						font.glyphsForString('é')[0].path.toSVG(),
					);
					done();
				}),
			);
		});
	});

	describe('CFF subsetting', () => {
		const font = fontkit.openSync(
			`${import.meta.dirname}/data/SourceSansPro/SourceSansPro-Regular.otf`,
		);

		it('should create a CFFSubset instance', () => {
			const subset = font.createSubset();
			return assert.equal(subset.constructor.name, 'CFFSubset');
		});

		it('should produce a subset', (done) => {
			const subset = font.createSubset();
			const iterable = font.glyphsForString('hello');
			for (let i = 0; i < iterable.length; i++) {
				const glyph = iterable[i];
				subset.includeGlyph(glyph);
			}

			return subset.encodeStream().pipe(
				concat((buf) => {
					const stream = new r.DecodeStream(buf);
					const cff = new CFFFont(stream);
					const glyph = new CFFGlyph(1, [], { stream, 'CFF ': cff });
					assert.equal(
						glyph.path.toSVG(),
						font.glyphsForString('h')[0].path.toSVG(),
					);
					return done();
				}),
			);
		});

		it('should handle CID fonts', (done) => {
			const f = fontkit.openSync(
				`${import.meta.dirname}/data/NotoSansCJK/NotoSansCJKkr-Regular.otf`,
			);
			const subset = f.createSubset();
			const iterable = f.glyphsForString('갈휸');
			for (let i = 0; i < iterable.length; i++) {
				const glyph = iterable[i];
				subset.includeGlyph(glyph);
			}

			return subset.encodeStream().pipe(
				concat((buf) => {
					const stream = new r.DecodeStream(buf);
					const cff = new CFFFont(stream);
					const glyph = new CFFGlyph(1, [], { stream, 'CFF ': cff });
					assert.equal(
						glyph.path.toSVG(),
						f.glyphsForString('갈')[0].path.toSVG(),
					);
					assert.equal(cff.topDict.FDArray.length, 2);
					assert.deepEqual(cff.topDict.FDSelect.fds, [0, 1, 1]);
					return done();
				}),
			);
		});
	});
});
