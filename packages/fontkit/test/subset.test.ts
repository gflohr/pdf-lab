import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as r from 'restructure';
import { describe, expect, it } from 'vitest';
import { CFFFont } from '../src/cff/cff-font.js';
import { CFFGlyph } from '../src/glyph/cff-glyph.js';
import type { OpenTypePostScriptFont } from '../src/open-type-font.js';
import { TrueTypeFont } from '../src/true-type-font.js';
import fontkit from './helpers.js';

const datadir = path.resolve(import.meta.dirname, './data');

describe('font subsetting', () => {
	describe('truetype subsetting', () => {
		const font = fontkit.openSync(`${datadir}/OpenSans/OpenSans-Regular.ttf`);

		it('should create a TrueTypeSubset instance', () => {
			const subset = font.createSubset();
			assert.equal(subset.constructor.name, 'TrueTypeSubset');
		});

		it('should produce a subset', async () => {
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('hello')) {
				subset.includeGlyph(glyph);
			}

			const f = new TrueTypeFont(subset.encode());

			expect(f.numGlyphs).toBe(5);

			expect(f.getGlyph(1)!.path.toSVG()).toBe(
				font.glyphsForString('h')[0]!.path.toSVG(),
			);
		});

		it('should re-encode variation glyphs', async () => {
			// FIXME! This can only work on macOS.
			if (!fs.existsSync('/System/Library/Fonts/Supplemental/Skia.ttf')) return;

			const font = fontkit.openSync(
				'/System/Library/Fonts/Supplemental/Skia.ttf',
				'Bold',
			);
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('e')) {
				subset.includeGlyph(glyph);
			}

			const f = new TrueTypeFont(subset.encode());

			expect(f.getGlyph(1)!.path.toSVG()).toBe(
				font.glyphsForString('e')[0]!.path.toSVG(),
			);
		});

		it('should handle composite glyphs', async () => {
			const subset = font.createSubset();
			subset.includeGlyph(font.glyphsForString('é')[0]!);

			const f = new TrueTypeFont(subset.encode());

			expect(f.numGlyphs).toBe(4);
			expect(f.getGlyph(1)!.path.toSVG()).toBe(
				font.glyphsForString('é')[0]!.path.toSVG(),
			);
		});

		it('should handle fonts with long index to location format (indexToLocFormat = 1)', async () => {
			const bytes = fs.readFileSync(
				`${import.meta.dirname}/data/FiraSans/FiraSans-Regular.ttf`,
			);
			const font = new TrueTypeFont(bytes);
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('abcd')) {
				subset.includeGlyph(glyph);
			}

			const f = new TrueTypeFont(subset.encode());
			expect(f.numGlyphs).toBe(5);

			let subsetShape = f.getGlyph(1)?.path.toSVG();
			expect(subsetShape).toBeDefined();
			let fontShape = font.glyphsForString('a')?.[0]?.path.toSVG();
			expect(subsetShape).toBe(fontShape);

			// Must test also second glyph which has an odd loca index.
			subsetShape = f.getGlyph(2)?.path.toSVG();
			expect(subsetShape).toBeDefined();
			fontShape = font.glyphsForString('b')?.[0]?.path.toSVG();
			expect(subsetShape).toBe(fontShape);
		});

		it('should produce a subset using the legacy encodeStream API', async () => {
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('hello')) {
				subset.includeGlyph(glyph);
			}

			const encodedBuffer = await new Promise<Uint8Array>((resolve) => {
				const chunks: Uint8Array[] = [];

				subset
					.encodeStream()
					.on('data', (chunk) => {
						chunks.push(chunk);
					})
					.on('end', () => {
						// Combine chunks into a single Uint8Array
						const totalLength = chunks.reduce(
							(sum, chunk) => sum + chunk.length,
							0,
						);
						const result = new Uint8Array(totalLength);
						let offset = 0;
						for (const chunk of chunks) {
							result.set(chunk, offset);
							offset += chunk.length;
						}
						resolve(result);
					});
			});

			const f = new TrueTypeFont(encodedBuffer);

			expect(f.numGlyphs).toBe(5);

			expect(f.getGlyph(1)!.path.toSVG()).toBe(
				font.glyphsForString('h')[0]!.path.toSVG(),
			);
		});
	});

	describe('CFF subsetting', () => {
		const font = fontkit.openSync(
			`${datadir}/SourceSansPro/SourceSansPro-Regular.otf`,
		);

		it('should create a CFFSubset instance', () => {
			const subset = font.createSubset();
			expect(subset.constructor.name).toBe('CFFSubset');
		});

		it('should produce a subset', async () => {
			const subset = font.createSubset();
			const iterable = font.glyphsForString('hello');

			for (let i = 0; i < iterable.length; i++) {
				const glyph = iterable[i]!;
				subset.includeGlyph(glyph);
			}

			const buf = subset.encode();

			const stream = new r.DecodeStream(buf);
			const cff = new CFFFont(stream);
			const glyph = new CFFGlyph(1, [], {
				outlines: 'PostScript',
				stream,
				'CFF ': cff,
			} as OpenTypePostScriptFont);

			expect(glyph.path.toSVG()).toBe(
				font.glyphsForString('h')[0]!.path.toSVG(),
			);
		});

		it('should handle CID fonts', async () => {
			const f = fontkit.openSync(
				`${datadir}/NotoSansCJK/NotoSansCJKkr-Regular.otf`,
			);

			const subset = f.createSubset();
			const iterable = f.glyphsForString('갈휸');

			for (let i = 0; i < iterable.length; i++) {
				const glyph = iterable[i]!;
				subset.includeGlyph(glyph);
			}

			const buf = subset.encode();

			const stream = new r.DecodeStream(buf);
			const cff = new CFFFont(stream);
			const glyph = new CFFGlyph(1, [], {
				outlines: 'PostScript',
				stream,
				'CFF ': cff,
			} as OpenTypePostScriptFont);

			expect(glyph.path.toSVG()).toBe(f.glyphsForString('갈')[0]!.path.toSVG());

			expect(cff.topDict.FDArray.length).toBe(2);

			expect(cff.topDict.FDSelect.fds).toEqual([0, 1, 1]);
		});

		it('should produce a subset with Asian punctuation correctly', async () => {
			const bytes = fs.readFileSync(
				`${datadir}/NotoSansCJK/NotoSansCJKkr-Regular.otf`,
			);
			const koreanFont = new TrueTypeFont(bytes);
			const subset = koreanFont.createSubset();
			const iterable = koreanFont.glyphsForString('a。d');

			expect(iterable.length).toBe(3);
			for (const glyph of iterable) {
				subset.includeGlyph(glyph);
			}

			const buf = subset.encode();
			const stream = new r.DecodeStream(buf);

			expect(koreanFont.cff).not.toBeNull();

			const cff = new CFFFont(stream);

			let glyph = new CFFGlyph(1, [], {
				stream,
				'CFF ': cff,
			} as OpenTypePostScriptFont);
			expect(glyph.path.toSVG()).toBe(
				koreanFont.glyphsForString('a')[0]!.path.toSVG(),
			);

			glyph = new CFFGlyph(2, [], {
				stream,
				'CFF ': cff,
			} as OpenTypePostScriptFont);
			expect(glyph.path.toSVG()).toBe(
				koreanFont.glyphsForString('。')[0]!.path.toSVG(),
			);

			glyph = new CFFGlyph(3, [], {
				stream,
				'CFF ': cff,
			} as OpenTypePostScriptFont);
			expect(glyph.path.toSVG()).toBe(
				koreanFont.glyphsForString('d')[0]!.path.toSVG(),
			);
		});
	});
});
