import './addTestHelpersToFontkit.js';
import assert from 'node:assert';
import fontkit from '../src/index.js';

describe('fontkit', () => {
	it('should open a font asynchronously', () =>
		fontkit.open(
			`${import.meta.dirname}/data/OpenSans/OpenSans-Regular.ttf`,
			(err, font) => {
				assert.equal(err, null);
				return assert.equal(font.constructor.name, 'TTFFont');
			},
		));

	it('should open a font synchronously', () => {
		const font = fontkit.openSync(
			`${import.meta.dirname}/data/OpenSans/OpenSans-Regular.ttf`,
		);
		return assert.equal(font.constructor.name, 'TTFFont');
	});

	it('should open fonts of different formats', () => {
		let font = fontkit.openSync(
			`${import.meta.dirname}/data/OpenSans/OpenSans-Regular.ttf`,
		);
		assert.equal(font.constructor.name, 'TTFFont');

		font = fontkit.openSync(
			`${import.meta.dirname}/data/SourceSansPro/SourceSansPro-Regular.otf`,
		);
		assert.equal(font.constructor.name, 'TTFFont');

		font = fontkit.openSync(
			`${import.meta.dirname}/data/NotoSans/NotoSans.ttc`,
		);
		assert.equal(font.constructor.name, 'TrueTypeCollection');

		font = fontkit.openSync(
			`${import.meta.dirname}/data/NotoSans/NotoSans.ttc`,
			'NotoSans',
		);
		assert.equal(font.constructor.name, 'TTFFont');

		font = fontkit.openSync(
			`${import.meta.dirname}/data/NotoSans/NotoSans.dfont`,
		);
		assert.equal(font.constructor.name, 'DFont');

		font = fontkit.openSync(
			`${import.meta.dirname}/data/NotoSans/NotoSans.dfont`,
			'NotoSans',
		);
		assert.equal(font.constructor.name, 'TTFFont');

		font = fontkit.openSync(
			`${import.meta.dirname}/data/SourceSansPro/SourceSansPro-Regular.woff`,
		);
		assert.equal(font.constructor.name, 'WOFFFont');

		font = fontkit.openSync(
			`${import.meta.dirname}/data/SourceSansPro/SourceSansPro-Regular.woff2`,
		);
		assert.equal(font.constructor.name, 'WOFF2Font');
	});

	it('should open fonts lacking PostScript name', () => {
		const font = fontkit.openSync(
			`${import.meta.dirname}/data/Mada/Mada-Regular.subset1.ttf`,
		);
		assert.equal(font.postscriptName, null);
	});

	it('should error when opening an invalid font asynchronously', () => {
		fontkit.open(import.meta.filename, (err) => {
			assert(err instanceof Error);
			assert.equal(err.message, 'Unknown font format');
		});
	});

	it('should error when opening an invalid font synchronously', () => {
		assert.throws(
			() => fontkit.openSync(import.meta.filename),
			/Unknown font format/,
		);
	});

	it('should get collection objects for ttc fonts', () => {
		const collection = fontkit.openSync(
			`${import.meta.dirname}/data/NotoSans/NotoSans.ttc`,
		);
		assert.equal(collection.constructor.name, 'TrueTypeCollection');

		const names = collection.fonts.map((f) => f.postscriptName);
		assert.deepEqual(names, [
			'NotoSans-Bold',
			'NotoSans',
			'NotoSans-Italic',
			'NotoSans-BoldItalic',
		]);

		const font = collection.getFont('NotoSans-Italic');
		return assert.equal(font.postscriptName, 'NotoSans-Italic');
	});

	it('should get collection objects for dfonts', () => {
		const collection = fontkit.openSync(
			`${import.meta.dirname}/data/NotoSans/NotoSans.dfont`,
		);
		assert.equal(collection.constructor.name, 'DFont');

		const names = collection.fonts.map((f) => f.postscriptName);
		assert.deepEqual(names, [
			'NotoSans',
			'NotoSans-Bold',
			'NotoSans-Italic',
			'NotoSans-BoldItalic',
		]);

		const font = collection.getFont('NotoSans-Italic');
		return assert.equal(font.postscriptName, 'NotoSans-Italic');
	});
});
