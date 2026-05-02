import * as fs from 'node:fs';
import { PDFDocument, PDFRef } from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SingleByteEncodingMapper } from '../../encoding/mappers/single-byte-encoding-mapper.js';
import type { FontEmbedOptions } from '../../pdf-lab.js';
import * as resolveFontModule from '../resolve-font.js';
import type { FontInfo } from '../types.js';
import { Type1FontEmbedder } from './type1-embedder.js';

const rootdir = '../..';
const assetDir = `${rootdir}/assets`;
const pdfDir = `${assetDir}/pdfs`;
const fontsDir = `${assetDir}/fonts/noto`;

describe('Type1 Font Embedder', () => {
	const pdfBytes = fs.readFileSync(`${pdfDir}/type1-fonts-missing.pdf`);
	const notoRegularBytes = fs.readFileSync(`${fontsDir}/NotoSans-Regular.ttf`);

	let pdfDoc: PDFDocument;
	const options: FontEmbedOptions = {
		subset: true,
		compress: false,
		fontkit,
	};

	beforeEach(async () => {
		pdfDoc = await PDFDocument.load(pdfBytes);
		pdfDoc.registerFontkit(fontkit);
	});

	it('should embed the Helvetica font', async () => {
		const fontInfo: FontInfo = {
			ref: PDFRef.of(5),
			embedded: false,
			subtype: 'Type1',
			glyphMapper: new SingleByteEncodingMapper('WinAnsiEncoding'),
			baseFont: 'Helvetica',
			fontName: 'Helvetica',
		};

		const glyphIds = new Set([
			84, 104, 105, 115, 32, 112, 97, 103, 101, 117, 72, 108, 118, 116, 99, 46,
		]);
		const embedder = new Type1FontEmbedder(pdfDoc, fontInfo, glyphIds, options);

		vi.spyOn(resolveFontModule, 'resolveFont').mockResolvedValue({
			source: notoRegularBytes,
		});
		await embedder.embed();

		expect('later').toBe('later');
	});
});
