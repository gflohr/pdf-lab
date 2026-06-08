import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import type TrueTypeCollection from '../src/true-type-collection.js';
import fontkit from './helpers.js';

const datadir = path.resolve(import.meta.dirname, './data');

describe('fontkit', () => {
	it('should open a font asynchronously', async () => {
		const font = await fontkit.open(`${datadir}/OpenSans/OpenSans-Regular.ttf`);
		expect(font.constructor.name).toBe('TrueTypeFont');
	});

	it('should open a font synchronously', () => {
		const font = fontkit.openSync(`${datadir}/OpenSans/OpenSans-Regular.ttf`);
		expect(font.constructor.name).toBe('TrueTypeFont');
	});

	describe('formats', () => {
		it('should open a TrueType font', () => {
			const font = fontkit.openSync(`${datadir}/OpenSans/OpenSans-Regular.ttf`);
			expect(font.constructor.name).toBe('TrueTypeFont');
		});

		it('should open an OpenType font', () => {
			const font = fontkit.openSync(
				`${datadir}/SourceSansPro/SourceSansPro-Regular.otf`,
			);
			expect(font.constructor.name).toBe('TrueTypeFont');
		});

		it('should open a font from a TrueType collection', () => {
			const font = fontkit.openSync(`${datadir}/NotoSans/NotoSans.ttc`);
			expect(font.constructor.name).toBe('TrueTypeCollection');
		});

		it('should open a font from a TrueType collection by PostScript name', () => {
			const font = fontkit.openSync(
				`${datadir}/NotoSans/NotoSans.ttc`,
				'NotoSans',
			);
			expect(font.constructor.name).toBe('TrueTypeFont');
		});

		it('should open a DataFork TrueType font', () => {
			const font = fontkit.openSync(`${datadir}/NotoSans/NotoSans.dfont`);
			expect(font.constructor.name).toBe('DFont');
		});

		it('should open a DataForm TrueType font by PostScript name', () => {
			const font = fontkit.openSync(
				`${datadir}/NotoSans/NotoSans.dfont`,
				'NotoSans',
			);
			expect(font.constructor.name).toBe('TrueTypeFont');
		});

		it('should open a WOFF font', () => {
			const font = fontkit.openSync(
				`${datadir}/SourceSansPro/SourceSansPro-Regular.woff`,
			);
			expect(font.constructor.name).toBe('WOFFFont');
		});

		it('should open a WOFF2 font', () => {
			const font = fontkit.openSync(
				`${datadir}/SourceSansPro/SourceSansPro-Regular.woff2`,
			);
			expect(font.constructor.name).toBe('WOFF2Font');
		});
	});

	describe('PostScript name', () => {
		it('should open fonts lacking PostScript name', () => {
			const font = fontkit.openSync(`${datadir}/Mada/Mada-Regular.subset1.ttf`);
			expect(font.postscriptName).toBeNull();
		});
	});

	describe('error handling', () => {
		it('should error when opening an invalid font asynchronously', async () => {
			await expect(fontkit.open(import.meta.filename)).rejects.toThrow(
				'Unknown font format',
			);
		});

		it('should error when opening an invalid font synchronously', () => {
			expect(() => fontkit.openSync(import.meta.filename)).toThrow(
				'Unknown font format',
			);
		});
	});

	describe('TrueType collections', () => {
		it('should get collection objects for ttc fonts', () => {
			const collection: TrueTypeCollection = fontkit.openSync(
				`${datadir}/NotoSans/NotoSans.ttc`,
			) as unknown as TrueTypeCollection;

			expect(collection.constructor.name).toBe('TrueTypeCollection');

			const names = collection.fonts.map((f) => f.postscriptName);
			expect(names).toStrictEqual([
				'NotoSans-Bold',
				'NotoSans',
				'NotoSans-Italic',
				'NotoSans-BoldItalic',
			]);

			const font = collection.getFont('NotoSans-Italic');
			if (!font) {
				throw new Error('font should not be null');
			}

			expect(font!.postscriptName).toBe('NotoSans-Italic');
		});

		it('should get collection objects for dfonts', () => {
			const collection: TrueTypeCollection = fontkit.openSync(
				`${datadir}/NotoSans/NotoSans.dfont`,
			) as unknown as TrueTypeCollection;
			expect(collection.constructor.name).toBe('DFont');

			const names = collection.fonts.map((f) => f.postscriptName);
			expect(names).toStrictEqual([
				'NotoSans',
				'NotoSans-Bold',
				'NotoSans-Italic',
				'NotoSans-BoldItalic',
			]);

			const font = collection.getFont('NotoSans-Italic');
			if (!font) {
				throw new Error('font should not be null');
			}

			expect(font!.postscriptName).toBe('NotoSans-Italic');
		});
	});
});
