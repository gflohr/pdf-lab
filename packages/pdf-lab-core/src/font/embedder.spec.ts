import { type PDFDocument, PDFRef } from '@cantoo/pdf-lib';
import { describe, expect, it } from 'vitest';
import type { FontEmbedOptions } from '../pdf-lab.js';
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
		};

		const glyphIds = new Set<number>([1, 2, 3]);

		it('throws if fontkit is missing', () => {
			const options = {} as FontEmbedOptions;

			expect(() => {
				new TestFontEmbedder(pdfDoc, fontInfo, glyphIds, [], options);
			}).toThrow('You have to pass a fontkit instance in the embed options!');
		});
	});
});
