import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import fontkit from './helpers.js';

const datadir = path.resolve(import.meta.dirname, './data');

describe('metadata', () => {
	const filename = path.resolve(`${datadir}/OpenSans/OpenSans-Regular.ttf`);
	const font = fontkit.openSync(filename);

	it('decodes SFNT directory values correctly', () => {
		// biome-ignore lint/complexity/useLiteralKeys: need private access for testing.
		const dir = font['directory'];
		expect(dir.numTables).toBe(19);
		expect(dir.searchRange).toBe(256);
		expect(dir.entrySelector).toBe(4);
		expect(dir.rangeShift).toBe(48);
	});

	it('numTables matches table collection', () => {
		// biome-ignore lint/complexity/useLiteralKeys: need private access for testing.
		const dir = font['directory'];
		expect(Object.keys(dir.tables).length).toBe(dir.numTables);
	});
});
