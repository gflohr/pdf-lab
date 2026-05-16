import path from 'node:path';
import { describe, expect, it } from 'vitest';
import BBox from '../src/glyph/BBox.js';
import fontkit from './helpers.js';

const datadir = path.resolve(import.meta.dirname, './data');

describe('Font metadata', () => {
	const font = fontkit.openSync(`${datadir}/NotoSans/NotoSans.ttc`, 'NotoSans');

	it('has metadata properties', () => {
		expect(font.fullName).toBe('Noto Sans');
		expect(font.postscriptName).toBe('NotoSans');
		expect(font.familyName).toBe('Noto Sans');
		expect(font.subfamilyName).toBe('Regular');
		expect(font.copyright).toBe(
			'Copyright 2012 Google Inc. All Rights Reserved.',
		);
		return expect(font.version).toBe('Version 1.05 uh');
	});

	it('exposes some metrics', () => {
		expect(font.unitsPerEm).toBe(2048);
		expect(font.ascent | 0).toBe(2189);
		expect(font.descent | 0).toBe(-600);
		expect(font.lineGap).toBe(0);
		expect(font.underlinePosition).toBe(-154);
		expect(font.underlineThickness).toBe(102);
		expect(font.italicAngle).toBe(0);
		expect(font.capHeight).toBe(1462);
		expect(font.xHeight).toBe(1098);
		expect(font.numGlyphs).toBe(8708);
		expect(font.bbox).toStrictEqual(new BBox(-1268, -600, 2952, 2189));
	});

	it('exposes tables directly', () => {
		expect(typeof font.head).toBe('object');
		expect(typeof font.hhea).toBe('object');
		expect(typeof font['OS/2']).toBe('object');
		expect(typeof font.post).toBe('object');
	});
});
