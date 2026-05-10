import { type PDFDocument, PDFRef } from '@cantoo/pdf-lib';
import { describe, expect, it } from 'vitest';
import type { FontEmbedOptions } from '../pdf-lab.js';
import type { GlyphBlock } from '../text/extract-glyphs.js';
import { FontEmbedder } from './embedder.js';
import type { FontInfo } from './types.js';

class TestFontEmbedder extends FontEmbedder {}

describe('FontEmbedder', () => {
	describe('constructor guard', () => {
		const pdfDoc = {} as PDFDocument;

		const fontInfo: FontInfo = {
			baseFont: 'Helvetica',
			fontName: 'Helvetica',
			ref: PDFRef.of(7),
			embedded: false,
			subtype: 'TrueType',
		} as FontInfo;

		it('throws if fontkit is missing', () => {
			const options = {} as FontEmbedOptions;

			expect(() => {
				new TestFontEmbedder(pdfDoc, fontInfo, [] as GlyphBlock[], options);
			}).toThrow('You have to pass a fontkit instance in the embed options!');
		});
	});
});
