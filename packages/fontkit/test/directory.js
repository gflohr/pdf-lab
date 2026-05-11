import './addTestHelpersToFontkit.js';
import assert from 'node:assert';
import fontkit from '../src/index.js';

describe('metadata', () => {
	const font = fontkit.openSync(
		// biome-ignore lint/style/useTemplate: breaks things
		__dirname + '/data/OpenSans/OpenSans-Regular.ttf',
	);

	it('decodes SFNT directory values correctly', () => {
		const dir = font.directory;
		assert.equal(dir.numTables, 19);
		assert.equal(dir.searchRange, 256);
		assert.equal(dir.entrySelector, 4);
		assert.equal(dir.rangeShift, 48);
	});

	it('numTables matches table collection', () => {
		const dir = font.directory;
		assert.equal(Object.keys(dir.tables).length, dir.numTables);
	});
});
