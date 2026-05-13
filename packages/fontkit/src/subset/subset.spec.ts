import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import r from '@pdf-lib/restructure';
import concat from 'concat-stream';
import { describe, expect, it } from 'vitest';
import CFFFont from '../cff/CFFFont.js';
import CFFGlyph from '../glyph/CFFGlyph.js';
import fontkit from '../test-helpers.js';
import type { Font } from '../types/font.js';

const datadir = path.resolve(import.meta.dirname, '../../test-data');

describe('font subsetting', () => {
	describe('truetype subsetting', () => {
		const font = fontkit.openSync(
			`${datadir}/OpenSans/OpenSans-Regular.ttf`,
		);

		it('should create a TTFSubset instance', () => {
			const subset = font.createSubset();
			assert.equal(subset.constructor.name, 'TTFSubset');
		});

		it('should produce a subset', async () => {
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('hello')) {
				subset.includeGlyph(glyph);
			}

			const stream = subset.encodeStream();

			// FIXME! This can probably be simplified into something like:
			// const chunks: Buffer[] = [];
			//
			// for await (const chunk of stream as any) {
			// 	chunks.push(Buffer.from(chunk));
			// }
			//
			// const buf = Buffer.concat(chunks);

			const buf = await new Promise<Buffer>((resolve, reject) => {
				stream.on('error', reject);
				stream.pipe(concat((data) => resolve(data)));
			});

			const f = fontkit.create(buf) as Font;

			expect(f.numGlyphs).toBe(5);

			expect(f.getGlyph(1).path.toSVG()).toBe(font.glyphsForString('h')[0]!.path.toSVG());
		});

		it('should re-encode variation glyphs', async () => {
			// FIXME! This can only work on macOS.
			if (!fs.existsSync('/System/Library/Fonts/Supplemental/Skia.ttf')) return;

			const font = fontkit.openSync('/System/Library/Fonts/Supplemental/Skia.ttf', 'Bold');
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('e')) {
				subset.includeGlyph(glyph);
			}

			const stream = subset.encodeStream();

			const buf = await new Promise<Buffer>((resolve, reject) => {
				stream.on('error', reject);
				stream.pipe(concat((data) => resolve(data)));
			});

			const f = fontkit.create(buf) as Font;

			expect(f.getGlyph(1).path.toSVG()).toBe(font.glyphsForString('e')[0]!.path.toSVG());
		});

		it('should handle composite glyphs', async () => {
			const subset = font.createSubset();
			subset.includeGlyph(font.glyphsForString('é')[0]!);

			const stream = subset.encodeStream();

			const buf = await new Promise<Buffer>((resolve, reject) => {
				stream.on('error', reject);
				stream.pipe(concat((data) => resolve(data)));
			});

			const f = fontkit.create(buf) as Font;
			expect(f.numGlyphs).toBe(4);
			expect(f.getGlyph(1).path.toSVG()).toBe(font.glyphsForString('é')[0]!.path.toSVG());
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

			const buf = await new Promise<Buffer>((resolve, reject) => {
				const stream = subset.encodeStream();

				stream.on('error', reject);

				stream.pipe(
					concat((data) => {
						resolve(data);
					}),
				);
			});

			const stream = new r.DecodeStream(buf);
			const cff = new CFFFont(stream);
			const glyph = new CFFGlyph(1, [], { stream, 'CFF ': cff });

			expect(glyph.path.toSVG()).toBe(font.glyphsForString('h')[0]!.path.toSVG());
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

			const buf = await new Promise<Buffer>((resolve, reject) => {
				const stream = subset.encodeStream();

				stream.on('error', reject);

				stream.pipe(
					concat((data) => {
						resolve(data);
					}),
				);
			});

			const stream = new r.DecodeStream(buf);
			const cff = new CFFFont(stream);
			const glyph = new CFFGlyph(1, [], { stream, 'CFF ': cff });

			expect(glyph.path.toSVG()).toBe(
				f.glyphsForString('갈')[0]!.path.toSVG(),
			);

			expect(cff.topDict.FDArray.length).toBe(2);

			expect(cff.topDict.FDSelect.fds).toEqual([0, 1, 1]);
		});
	});
});
