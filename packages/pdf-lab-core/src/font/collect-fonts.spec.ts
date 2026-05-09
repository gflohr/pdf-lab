import { PDFDocument } from '@cantoo/pdf-lib';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import collectFonts from './collect-fonts.js';
import { collectResources } from './collect-resources.js';
import { FontInfo } from './types.js';

describe('Collecting Fonts', () => {
	describe('Type1 Fonts', () => {
		let fonts: Map<string, FontInfo>;

		beforeAll(async () => {
			const filename = path.resolve(
				import.meta.dirname,
				'../../../../assets/pdfs/standard-fonts.pdf',
			);
			const pdfBytes = await fs.readFile(filename);
			const pdfDoc = await PDFDocument.load(pdfBytes);
			const fontUsage = collectResources(pdfDoc);
			fonts = collectFonts(pdfDoc, fontUsage);
		});

		it('should find all 14 standard fonts', () => {
			expect(fonts.size).toBe(14);
		});

		it('should find Helvetica', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Helvetica').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Helvetica');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Helvetica-Bold', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Helvetica-Bold').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Helvetica-Bold');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Helvetica-Oblique', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Helvetica-Oblique').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Helvetica-Oblique');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Helvetica-BoldOblique', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Helvetica-BoldOblique').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Helvetica-BoldOblique');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Times-Roman', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Times-Roman').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Times-Roman');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Times-Italic', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Times-Italic').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Times-Italic');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Times-Bold', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Times-Bold').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Times-Bold');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Times-BoldItalic', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Times-BoldItalic').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Times-BoldItalic');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Courier', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Courier').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Courier');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Courier-Bold', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Courier-Bold').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Courier-Bold');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Courier-Oblique', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Courier-Oblique').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Courier-Oblique');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Courier-BoldOblique', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Courier-BoldOblique').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Courier-BoldOblique');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('WinAnsiEncoding');
		});

		it('should find Symbol', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'Symbol').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('Symbol');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('SymbolEncoding');
		});

		it('should find ZapfDingbats', () => {
			const myFonts = [...fonts].filter(([, font]) => font.baseFont === 'ZapfDingbats').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.fontName).toBe('ZapfDingbats');
			expect(myFont.embedded).toBeFalsy();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('ZapfDingbatsEncoding');
		});
	});

	describe('TrueType fonts', () => {
		let fonts: Map<string, FontInfo>;

		beforeAll(async () => {
			const filename = path.resolve(
				import.meta.dirname,
				'../../../../assets/pdfs/3-fonts-embedded.pdf',
			);
			const pdfBytes = await fs.readFile(filename);
			const pdfDoc = await PDFDocument.load(pdfBytes);
			const fontUsage = collectResources(pdfDoc);
			fonts = collectFonts(pdfDoc, fontUsage);
		});

		it('should find 3 different fonts', () => {
			expect(fonts.size).toBe(3);
		});

		it('should find NotoSans-Regular', () => {
			const myFonts = [...fonts].filter(([, font]) => font.fontName === 'NotoSans-Regular').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.baseFont).toMatch(/^[A-Z]{6}\+NotoSans-Regular$/);
			expect(myFont.embedded).toBeTruthy();
			expect(myFont.toUnicodeMapper).toBeDefined();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('Identity-H');
		});

		it('should find NotoSerif-Regular', () => {
			const myFonts = [...fonts].filter(([, font]) => font.fontName === 'NotoSerif-Regular').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.baseFont).toMatch(/^[A-Z]{6}\+NotoSerif-Regular$/);
			expect(myFont.embedded).toBeTruthy();
			expect(myFont.toUnicodeMapper).toBeDefined();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('Identity-H');
		});

		it('should find CourierNewPSMT', () => {
			const myFonts = [...fonts].filter(([, font]) => font.fontName === 'CourierNewPSMT').map(([, font]) => font);

			expect(myFonts.length).toBe(1);
			const myFont = myFonts[0]!;
			expect(myFont.baseFont).toMatch(/^[A-Z]{6}\+CourierNewPSMT$/);
			expect(myFont.embedded).toBeTruthy();
			expect(myFont.toUnicodeMapper).toBeDefined();
			expect(myFont.encodingMapper).toBeDefined();
			expect(myFont.encodingMapper.name).toBe('Identity-H');
		});
	});
});
