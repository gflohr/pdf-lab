import * as fs from 'node:fs/promises';
import { beforeAll, describe, expect, it } from 'vitest';
import { PDFLab } from '../pdf-lab.js';
import { extractText, type TextBlock } from './extract-text.js';

describe('Text Extraction', () => {
	describe('standard fonts', () => {
		let textBlocks: TextBlock[];

		beforeAll(async () => {
			const pdfBytes = await fs.readFile(
				'../../assets/pdfs/standard-fonts-demo.pdf',
			);
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
			expect(headline.font.encoding).toBe('WinAnsiEncoding');
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
				...new Set(pageTextBlocks.map((b) => b.font.encoding)),
			].sort();
			expect(encodings).toStrictEqual(['WinAnsiEncoding']);
		});

		it('should only find text encoded in WinAnsiEncoding, SymbolEncoding, and ZapfDingbatsEncoding on page 5', () => {
			const pageTextBlocks = textBlocks.filter((b) => b.pageNumber === 4);
			const encodings = [
				...new Set(pageTextBlocks.map((b) => b.font.encoding)),
			].sort();
			expect(encodings).toStrictEqual([
				'SymbolEncoding',
				'WinAnsiEncoding',
				'ZapfDingbatsEncoding',
			]);
		});
	});
});
