import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import { TrueTypeFont } from '../src';

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
			const font = new TrueTypeFont(fontBytes);

			const subset = font.createSubset();
			expect(subset.constructor.name).toBe('CFFSubset');

			const iterable = font.glyphsForString('abc');

			for (let i = 0; i < iterable.length; i++) {
				const glyph = iterable[i]!;
				subset.includeGlyph(glyph);
			}

			const buf = subset.encode();

			// The 4th byte (index 3) is the offSize field in a CFF block.
			expect(buf[3]).toBe(4);
		});
	});

	describe('upstream #282 - ReferenceError: Cannot access \'c3x\' before initialization', () => {
        it('should not throw a ReferenceError', async () => {
			const fontPath = path.join(
				__dirname,
				'data',
				'PlayfairDisplay',
				'PlayfairDisplay-Regular.otf',
			);
			const fontBytes = await fs.readFile(fontPath);
			const font = new TrueTypeFont(fontBytes);

			const glyph = font.getGlyph(5);
			expect(glyph).not.toBeNull();

			// FIXME! Do not rely on getter side-effect.
			expect(() => glyph!.path).not.toThrow();
		});
	});
});
