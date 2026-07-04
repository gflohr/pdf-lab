import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import r from '@pdf-lib/restructure';
import { describe, expect, it } from 'vitest';
import { Glyph, TrueTypeFont } from '../src';
import { readSubsetStream } from './helpers.js';

describe('bugfixes from foliojs/fontkit', () => {
	describe('CFF Subset Binary Layout', () => {
		it('should explicitly encode a standard offSize byte value of 4', async () => {
			const fontPath = path.join(
				__dirname,
				'data',
				'SourceSansPro',
				'SourceSansPro-Regular.otf',
			);
			const fontBytes = await fs.readFile(fontPath);
			const inputStream = new r.DecodeStream(fontBytes);
			const font = new TrueTypeFont(inputStream);

			const subset = font.createSubset();
			expect(subset.constructor.name).toBe('CFFSubset');

			const iterable = font.glyphsForString('abc');

			for (let i = 0; i < iterable.length; i++) {
				const glyph = iterable[i]!;
				subset.includeGlyph(glyph);
			}

			const subsetStream = subset.encodeStream();
			const buf = await readSubsetStream(subsetStream);

			// The 4th byte (index 3) is the offSize field in a CFF block.
			expect(buf[3]).toBe(4);
		});
	});
});
