import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import r, { type EncodeStream } from '@pdf-lib/restructure';
import { describe, expect, it } from 'vitest';
import { CFFFont } from '../src/cff/cff-font.js';
import { CFFGlyph } from '../src/glyph/cff-glyph.js';
import type { TrueTypeFont } from '../src/true-type-font.js';
import type { Subset } from '../src/subset/subset.js';
import fontkit from './helpers.js';

const datadir = path.resolve(import.meta.dirname, './data');

async function readSubsetStream(stream: EncodeStream): Promise<Buffer> {
	const chunks: Buffer[] = [];

	for await (const chunk of stream as unknown as AsyncIterable<Uint8Array>) {
		chunks.push(Buffer.from(chunk));
	}

	return Buffer.concat(chunks);
}

async function getSubsetFont(subset: Subset): Promise<TrueTypeFont> {
	const stream = subset.encodeStream();
	const buf = await readSubsetStream(stream);

	return fontkit.create(buf) as TrueTypeFont;
}

describe('font subsetting', () => {
	describe('truetype subsetting', () => {
		const font = fontkit.openSync(`${datadir}/OpenSans/OpenSans-Regular.ttf`);

		it('should create a TTFSubset instance', () => {
			const subset = font.createSubset();
			assert.equal(subset.constructor.name, 'TTFSubset');
		});

		it('should produce a subset', async () => {
			const subset = font.createSubset();
			for (const glyph of font.glyphsForString('hello')) {
				subset.includeGlyph(glyph);
			}

			const f = await getSubsetFont(subset);

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

			const f = await getSubsetFont(subset);

			expect(f.getGlyph(1)!.path.toSVG()).toBe(
				font.glyphsForString('e')[0]!.path.toSVG(),
			);
		});

		it('should handle composite glyphs', async () => {
			const subset = font.createSubset();
			subset.includeGlyph(font.glyphsForString('é')[0]!);

			const f = await getSubsetFont(subset);

			expect(f.numGlyphs).toBe(4);
			expect(f.getGlyph(1)!.path.toSVG()).toBe(
				font.glyphsForString('é')[0]!.path.toSVG(),
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

			const subsetStream = subset.encodeStream();
			const buf = await readSubsetStream(subsetStream);

			const stream = new r.DecodeStream(buf);
			const cff = new CFFFont(stream);
			const glyph = new CFFGlyph(1, [], { stream, 'CFF ': cff } as TrueTypeFont);

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

			const subsetStream = subset.encodeStream();
			const buf = await readSubsetStream(subsetStream);

			const stream = new r.DecodeStream(buf);
			const cff = new CFFFont(stream);
			const glyph = new CFFGlyph(1, [], { stream, 'CFF ': cff } as TrueTypeFont);

			expect(glyph.path.toSVG()).toBe(f.glyphsForString('갈')[0]!.path.toSVG());

			expect(cff.topDict.FDArray.length).toBe(2);

			expect(cff.topDict.FDSelect.fds).toEqual([0, 1, 1]);
		});
	});
});
