import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { SFNTFont } from '../src/types/internal/sfnt-font.js';
import fontkit from './helpers.js';

const datadir = path.resolve(import.meta.dirname, './data');

describe('metadata', () => {
	const filename = path.resolve(`${datadir}/OpenSans/OpenSans-Regular.ttf`);
	const font = fontkit.openSync(filename) as SFNTFont;

	it('decodes SFNT directory values correctly', () => {
		const dir = font.directory;
		expect(dir.numTables).toBe(19);
		expect(dir.searchRange).toBe(256);
		expect(dir.entrySelector).toBe(4);
		expect(dir.rangeShift).toBe(48);
	});

	it('numTables matches table collection', () => {
		const dir = font.directory;
		expect(Object.keys(dir.tables).length).toBe(dir.numTables);
	});
});
