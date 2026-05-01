import { PDFDocument, PDFRef } from '@cantoo/pdf-lib';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SingleByteEncodingMapper } from './encoding/mappers/single-byte-encoding-mapper.js';
import * as collectFont from './font/collect-fonts.js';
import * as embedFont from './font/embed-font.js';
import type { FontInfo } from './font/types.js';
import { PDFLab } from './pdf-lab.js';

async function makePDFLab(): Promise<PDFLab> {
	const doc = await PDFDocument.create();
	const lab = new (
		PDFLab as unknown as {
			new (pdfDoc: PDFDocument): PDFLab;
		}
	)(doc);

	return lab;
}

describe('PDFLab', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('from', () => {
		it('returns the same instance if given a real PDFDocument', async () => {
			const doc = await PDFDocument.create();

			const result = await PDFLab.from(doc);

			expect(result).toBeInstanceOf(PDFLab);
		});

		it('loads a PDFDocument from Uint8Array', async () => {
			const doc = await PDFDocument.create();
			const bytes = await doc.save();

			const result = await PDFLab.from(bytes);

			expect(result).toBeInstanceOf(PDFLab);
		});

		it('loads a PDFDocument from base64 string', async () => {
			const doc = await PDFDocument.create();
			const bytes = await doc.save();
			const base64 = Buffer.from(bytes).toString('base64');

			const result = await PDFLab.from(base64);

			expect(result).toBeInstanceOf(PDFLab);
		});

		it('recreates a "foreign" PDFDocument (same shape, different prototype)', async () => {
			const doc = await PDFDocument.create();
			const saveSpy = vi.fn(() => doc.save());
			const foreignDoc = { context: doc.context, save: saveSpy };

			const result = await PDFLab.from(foreignDoc as unknown as PDFDocument);

			expect(result).toBeInstanceOf(PDFLab);
			expect(saveSpy).toHaveBeenCalledTimes(1);
		});

		it('throws for invalid input', async () => {
			await expect(PDFLab.from(123 as unknown as string)).rejects.toThrow(
				/input must be/,
			);
		});

		it('falls back to PDFDocument.load for non-PDFDocument objects', async () => {
			const spy = vi.spyOn(PDFDocument, 'load');

			const bytes = new Uint8Array([37, 80, 68, 70]); // "%PDF" minimal header

			try {
				await PDFLab.from(bytes);
			} catch {
				// ignore parse error, we only care that load was called
			}

			expect(spy).toHaveBeenCalled();
		});
	});

	describe('embed fonts', () => {
		const fontInfos: FontInfo[] = [
			{
				ref: PDFRef.of(7),
				baseFont: 'Helvetica',
				fontName: 'Helvetica',
				embedded: false,
				subtype: 'Type0',
			},
			{
				ref: PDFRef.of(8),
				baseFont: 'Helvetica-Oblique',
				fontName: 'Helvetica-Oblique',
				embedded: false,
				subtype: 'Type0',
			},
			{
				ref: PDFRef.of(9),
				baseFont: 'Roboto',
				fontName: 'Roboto',
				embedded: true,
				subtype: 'TrueType',
			},
		];
		const fontInfoMap = new Map<string, FontInfo>();
		fontInfos.forEach((f) => {
			fontInfoMap.set(f.ref.toString(), f);
		});

		it.skip('should embed all fonts', async () => {
			const lab = await makePDFLab();
			const collectMock = vi
				.spyOn(collectFont, 'default')
				.mockReturnValue(fontInfoMap);

			await lab.embedFonts();

			expect(collectMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('collect fonts', () => {
		it('should call the collectFont() implementation', async () => {
			const lab = await makePDFLab();
			const collectMock = vi
				.spyOn(collectFont, 'default')
				.mockReturnValue(new Map<string, FontInfo>());

			lab.collectFonts();

			expect(collectMock).toHaveBeenCalledTimes(1);
		});

		it('should cache the results', async () => {
			const lab = await makePDFLab();
			const fonts = new Map<string, FontInfo>();

			fonts.set('42 0 R', {
				ref: PDFRef.of(42),
				baseFont: 'Helvetica-1234',
				fontName: 'Helvetica',
				encoding: 'MacRomanEncoding',
				embedded: false,
				subtype: 'Type1',
				glyphMapper: new SingleByteEncodingMapper('MacRomanEncoding'),
			});
			fonts.set('43 0 R', {
				ref: PDFRef.of(43),
				baseFont: 'Times-Roman-5678',
				fontName: 'Times-Roman',
				encoding: 'WinAnsiEncoding',
				embedded: false,
				subtype: 'Type1',
				glyphMapper: new SingleByteEncodingMapper('WinAnsiEncoding'),
			});
			const collectMock = vi
				.spyOn(collectFont, 'default')
				.mockReturnValue(fonts);

			const result1 = lab.collectFonts();
			expect(collectMock).toHaveBeenCalledTimes(1);
			expect(result1).toBe(fonts);
			const result2 = lab.collectFonts();
			expect(collectMock).toHaveBeenCalledTimes(1);
			expect(result2).toBe(fonts);
			const result3 = lab.collectFonts();
			expect(collectMock).toHaveBeenCalledTimes(1);
			expect(result3).toBe(fonts);
		});
	});
});
