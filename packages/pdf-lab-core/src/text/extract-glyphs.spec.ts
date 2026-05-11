import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { PDFDocument, PDFRef } from '@cantoo/pdf-lib';
import { beforeAll, describe, expect, it } from 'vitest';
import { extractGlyphs, type GlyphBlock } from './extract-glyphs.js';

describe('PDF glyph extractor', () => {
	let glyphBlocks: GlyphBlock[];

	beforeAll(async () => {
		const filename = path.resolve(
			import.meta.dirname,
			'../../../../assets/pdfs/mixed-content.pdf',
		);

		const pdfBytes = await fs.readFile(filename);
		const pdfDoc = await PDFDocument.load(pdfBytes);
		glyphBlocks = extractGlyphs(pdfDoc);
	});

	it('should find 3 glyph blocks', () => {
		expect(glyphBlocks.length).toBe(3);
	});

	it('should find the first text block', () => {
		const block = glyphBlocks[0]!;

		expect(block.type).toBe('lstring');
		const glyphs = new TextEncoder().encode('\\(Hello\\), \\(world\\)!');
		expect(block.glyphs).toStrictEqual(glyphs);
		expect(block.fontResource).toMatch(/^Helvetica-\d+$/);
		expect(block.offset).toBe(69);
		expect(block.length).toBe(23);
		expect(block.pageNumber).toBe(0);
		expect(block.pageRef).toBe(PDFRef.of(4, 0));
	});

	it('should find the second text block', () => {
		const block = glyphBlocks[1]!;

		expect(block.type).toBe('lstring');
		const glyphs = new TextEncoder().encode('Source code:');
		expect(block.glyphs).toStrictEqual(glyphs);
		expect(block.fontResource).toMatch(/^Helvetica-\d+$/);
		expect(block.offset).toBe(99);
		expect(block.length).toBe(14);
		expect(block.pageNumber).toBe(0);
		expect(block.pageRef).toBe(PDFRef.of(4, 0));
	});

	it('should find the third text block', () => {
		const block = glyphBlocks[2]!;

		expect(block.type).toBe('string');
		const glyphs = new TextEncoder().encode('\\(Hello\\), \\(world\\)!');
		expect(block.glyphs).toStrictEqual(glyphs);
		expect(block.fontResource).toMatch(/^Helvetica-\d+$/);
		expect(block.offset).toBe(120);
		expect(block.length).toBe(44);
		expect(block.pageNumber).toBe(0);
		expect(block.pageRef).toBe(PDFRef.of(4, 0));
	});
});
