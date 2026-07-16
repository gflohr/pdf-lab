import * as fs from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { TrueTypeFont } from '../src/index.js';

describe('opentype', async () => {
	const fontBytes = await fs.readFile(
		`${import.meta.dirname}/data/SourceSansPro/SourceSansPro-Regular.otf`,
	);
	const font = new TrueTypeFont(fontBytes);

	it('featureParams nameID of stylistic set should be 257', () => {
		expect(font.GSUB?.featureList[150]?.feature.featureParams?.nameID).toBe(
			257,
		);
	});

	it('featureParams version of stylistic set should be 0', () => {
		expect(font.GSUB?.featureList[150]?.feature.featureParams?.version).toBe(0);
	});

	it('featureParams should be null of aalt opentype feature', () => {
		expect(font.GSUB?.featureList[1]?.feature.featureParams).toBeNull();
	});
});
