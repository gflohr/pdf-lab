import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { afterEach } from 'node:test';
import { type PDFDocument, PDFRef } from '@cantoo/pdf-lib';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { CMapMapper } from '../encoding/mappers/cmap-mapper.js';
import type { FontUsage } from '../font/collect-resources.js';
import type { FontInfo } from '../font/types.js';
import { PDFLab } from '../pdf-lab.js';
import type { GlyphBlock } from './extract-glyphs.js';
import * as extractGlyphModule from './extract-glyphs.js';
import { extractText, type TextBlock } from './extract-text.js';
import { SingleByteEncodingMapper } from '../encoding/mappers/single-byte-encoding-mapper.js';
import { IdentityMapper } from '../encoding/mappers/identity-mapper.js';

describe('Text Extraction', () => {
	describe('standard fonts', () => {
		let textBlocks: TextBlock[];

		beforeAll(async () => {
			const filename = path.resolve(
				import.meta.dirname,
				'../../../../assets/pdfs/standard-fonts-demo.pdf',
			);

			const pdfBytes = await fs.readFile(filename);
			const pdfLab = await PDFLab.from(pdfBytes);
			const fonts = pdfLab.collectFonts();
			// biome-ignore lint/complexity/useLiteralKeys: false positive.
			const fontResources = pdfLab['fontUsage']!;
			textBlocks = await extractText(pdfLab.pdfDocument, fonts, fontResources);
		});

		it('should extract text', () => {
			expect(textBlocks.length).toBeGreaterThan(0);
		});

		it('should find the document headline first', () => {
			const headline = textBlocks[0]!;

			expect(headline).toBeDefined();
			expect(headline.text).toBe('Standard 14 Fonts Demo');
			expect(headline.pageNumber).toBe(0);
			expect(headline.font.fontName).toBe('Helvetica-Bold');
			expect(headline.font.subtype).toBe('Type1');
			expect(headline.font.encodingMapper.name).toBe('WinAnsiEncoding');
			expect(headline.font.embedded).toBeFalsy();
		});

		it('should find text on all pages', () => {
			const pageNumbers = [
				...new Set(textBlocks.map((i) => i.pageNumber)),
			].sort((a, b) => a - b);
			expect(pageNumbers).toStrictEqual([0, 1, 2, 3, 4]);
		});

		it('should map all glyphs in the document', () => {
			const text = textBlocks.map((b) => b.text).join('\n');

			expect(text).not.toContain('\uFFFD');
		});

		it('should only find text set in Helvetica and Helvetica-Bold on page 1', () => {
			const pageTextBlocks = textBlocks.filter((b) => b.pageNumber === 0);
			const fontNames = [
				...new Set(pageTextBlocks.map((b) => b.font.fontName)),
			].sort();
			expect(fontNames).toStrictEqual(['Helvetica', 'Helvetica-Bold']);
		});

		it('should only find text set in the Times family of fonts on page 2', () => {
			const pageTextBlocks = textBlocks.filter((b) => b.pageNumber === 1);
			const fontNames = [
				...new Set(pageTextBlocks.map((b) => b.font.fontName)),
			].sort();
			expect(fontNames).toStrictEqual([
				'Times-Bold',
				'Times-BoldItalic',
				'Times-Italic',
				'Times-Roman',
			]);
		});

		it('should only find text set in the Helvetica family of fonts on page 3', () => {
			const pageTextBlocks = textBlocks.filter((b) => b.pageNumber === 2);
			const fontNames = [
				...new Set(pageTextBlocks.map((b) => b.font.fontName)),
			].sort();
			expect(fontNames).toStrictEqual([
				'Helvetica',
				'Helvetica-Bold',
				'Helvetica-BoldOblique',
				'Helvetica-Oblique',
			]);
		});

		it('should only find text set in the Courier family of fonts on page 4', () => {
			const pageTextBlocks = textBlocks.filter((b) => b.pageNumber === 3);
			const fontNames = [
				...new Set(pageTextBlocks.map((b) => b.font.fontName)),
			].sort();
			expect(fontNames).toStrictEqual([
				'Courier',
				'Courier-Bold',
				'Courier-BoldOblique',
				'Courier-Oblique',
			]);
		});

		it('should only find text set in Helvetica, Symbol, and ZapfDingbats on page 5', () => {
			const pageTextBlocks = textBlocks.filter((b) => b.pageNumber === 4);
			const fontNames = [
				...new Set(pageTextBlocks.map((b) => b.font.fontName)),
			].sort();
			expect(fontNames).toStrictEqual(['Helvetica', 'Symbol', 'ZapfDingbats']);
		});

		it('should only find text encoded in WinAnsiEncoding on pages 1-4', () => {
			const pageTextBlocks = textBlocks.filter((b) => b.pageNumber < 4);
			const encodings = [
				...new Set(pageTextBlocks.map((b) => b.font.encodingMapper.name)),
			].sort();
			expect(encodings).toStrictEqual(['WinAnsiEncoding']);
		});

		it('should only find text encoded in WinAnsiEncoding, SymbolEncoding, and ZapfDingbatsEncoding on page 5', () => {
			const pageTextBlocks = textBlocks.filter((b) => b.pageNumber === 4);
			const encodings = [
				...new Set(pageTextBlocks.map((b) => b.font.encodingMapper.name)),
			].sort();
			expect(encodings).toStrictEqual([
				'SymbolEncoding',
				'WinAnsiEncoding',
				'ZapfDingbatsEncoding',
			]);
		});
	});

	describe('TrueType fonts', () => {
		let textBlocks: TextBlock[];

		beforeAll(async () => {
			const filename = path.resolve(
				import.meta.dirname,
				'../../../../assets/pdfs/3-fonts-embedded.pdf',
			);
			const pdfBytes = await fs.readFile(filename);
			const pdfLab = await PDFLab.from(pdfBytes);
			const fonts = pdfLab.collectFonts();
			// biome-ignore lint/complexity/useLiteralKeys: false positive.
			const fontResources = pdfLab['fontUsage']!;
			textBlocks = await extractText(pdfLab.pdfDocument, fonts, fontResources);
		});

		it('should extract text', () => {
			expect(textBlocks.length).toBe(7);
		});

		it('should find text in TJ hex arrays', () => {
			const block = textBlocks[0];

			expect(block?.text).toBe('This page uses');
			expect(block?.pageNumber).toBe(0);
			expect(block?.font.baseFont).toBe('BAAAAA+NotoSans-Regular');
			expect(block?.font.fontName).toBe('NotoSans-Regular');
			expect(block?.font.subtype).toBe('TrueType');
			expect(block?.font.embedded).toBe(true);
			expect(block?.font.encodingMapper.name).toBe('Identity-H');
			expect(block?.font.ref.toString()).toBe('12 0 R');
			expect(block?.font.toUnicodeMapper).toBeDefined();
			expect(block?.font.toUnicodeMapper).toBeInstanceOf(CMapMapper);
		});

		it('should find cyrillic text in TJ hex arrays', () => {
			const block = textBlocks[2];

			expect(block?.text).toBe('Тази стран');
			expect(block?.pageNumber).toBe(1);
			expect(block?.font.baseFont).toBe('CAAAAA+NotoSerif-Regular');
			expect(block?.font.fontName).toBe('NotoSerif-Regular');
			expect(block?.font.subtype).toBe('TrueType');
			expect(block?.font.embedded).toBe(true);
			expect(block?.font.encodingMapper.name).toBe('Identity-H');
			expect(block?.font.ref.toString()).toBe('13 0 R');
			expect(block?.font.toUnicodeMapper).toBeDefined();
			expect(block?.font.toUnicodeMapper).toBeInstanceOf(CMapMapper);
		});

		it('should find text in Tj hex arrays', () => {
			const block = textBlocks[6];

			expect(block?.text).toBe('This page uses Courier New.');
			expect(block?.pageNumber).toBe(2);
			expect(block?.font.baseFont).toBe('DAAAAA+CourierNewPSMT');
			expect(block?.font.fontName).toBe('CourierNewPSMT');
			expect(block?.font.subtype).toBe('TrueType');
			expect(block?.font.embedded).toBe(true);
			expect(block?.font.encodingMapper.name).toBe('Identity-H');
			expect(block?.font.ref.toString()).toBe('14 0 R');
			expect(block?.font.toUnicodeMapper).toBeDefined();
			expect(block?.font.toUnicodeMapper).toBeInstanceOf(CMapMapper);
		});
	});

	describe('Multi-byte glyph IDs', () => {
		const cmap = `
1 begincodespacerange
<00000000> <ffffffff>
endcodespacerange
1 beginbfchar
<00000001> <00000058>
endbfchar
`;
		const mapper = new CMapMapper(cmap);
		const pdfDoc = {} as PDFDocument;
		const fontRef = PDFRef.of(42);
		const fontInfo: FontInfo = {
			baseFont: 'AAAAAA+Fancy',
			subtype: 'TrueType',
			fontName: 'Fancy',
			ref: fontRef,
			embedded: true,
			encodingMapper: new IdentityMapper('Identity-H'),
			toUnicodeMapper: mapper,
		};
		const fonts = new Map<string, FontInfo>();
		fonts.set(fontRef.toString(), fontInfo);
		const resources: FontUsage[] = [{ F1: fontRef }];

		afterEach(() => {
			vi.restoreAllMocks();
			vi.resetAllMocks();
		});

		it('should extract single-byte glyph IDs', async () => {
			const glyphBlocks: GlyphBlock[] = [
				{
					glyphs: new Uint8Array([0x01]),
					fontResource: 'F1',
					pageRef: PDFRef.of(123),
					pageNumber: 0,
				} as GlyphBlock,
			];

			vi.spyOn(extractGlyphModule, 'extractGlyphs').mockImplementation(
				() => glyphBlocks,
			);

			const textBlocks = await extractText(pdfDoc, fonts, resources);
			expect(textBlocks.length).toBe(1);
			const textBlock = textBlocks[0]!;
			expect(textBlock.pageNumber).toBe(0);
			expect(textBlock.glyphs).toStrictEqual([1]);
			expect(textBlock.text).toBe('X');
		});

		it('should extract double-byte glyph IDs', async () => {
			const glyphBlocks: GlyphBlock[] = [
				{
					glyphs: new Uint8Array([0x00, 0x01]),
					fontResource: 'F1',
					pageRef: PDFRef.of(123),
					pageNumber: 0,
				} as unknown as GlyphBlock,
			];

			vi.spyOn(extractGlyphModule, 'extractGlyphs').mockImplementation(
				() => glyphBlocks,
			);

			const textBlocks = await extractText(pdfDoc, fonts, resources);
			expect(textBlocks.length).toBe(1);
			const textBlock = textBlocks[0]!;
			expect(textBlock.pageNumber).toBe(0);
			expect(textBlock.glyphs).toStrictEqual([1]);
			expect(textBlock.text).toBe('X');
		});
	});

	describe('Mixed content', () => {
		let textBlocks: TextBlock[];

		beforeAll(async () => {
			vi.resetAllMocks();
			const filename = path.resolve(
				import.meta.dirname,
				'../../../../assets/pdfs/mixed-content.pdf',
			);
			const pdfBytes = await fs.readFile(filename);
			const pdfLab = await PDFLab.from(pdfBytes);
			const fonts = pdfLab.collectFonts();
			// biome-ignore lint/complexity/useLiteralKeys: false positive.
			const fontResources = pdfLab['fontUsage']!;
			textBlocks = await extractText(pdfLab.pdfDocument, fonts, fontResources);
		});

		it('should extract text', () => {
			expect(textBlocks.length).toBe(3);
		});

		it.skip('should find text from literal strings', () => {
			const block = textBlocks[0];

			expect(block?.text).toBe('(Hello), (world)!');
			expect(block?.pageNumber).toBe(0);
			expect(block?.font.baseFont).toBe('BAAAAA+NotoSans-Regular');
			expect(block?.font.fontName).toBe('NotoSans-Regular');
			expect(block?.font.subtype).toBe('TrueType');
			expect(block?.font.embedded).toBe(true);
			expect(block?.font.encodingMapper.name).toBe('Identity');
			expect(block?.font.ref.toString()).toBe('12 0 R');
			expect(block?.font.toUnicodeMapper).toBeDefined();
			expect(block?.font.toUnicodeMapper).toBeInstanceOf(CMapMapper);
		});
	});
});
