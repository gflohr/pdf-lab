import { PDFRef } from '@cantoo/pdf-lib';
import type { FontInfo } from 'pdf-lab-core';
import { describe, expect, it } from 'vitest';
import { toFontInfoDto } from './font-info-dto.js';

describe('FontInfo DTO', () => {
	it('should convert minimal font info structures', () => {
		const fontInfo: FontInfo = {
			ref: PDFRef.of(42, 0),
			embedded: true,
			encodingMapper: { name: 'Identity-H' },
		} as FontInfo;

		const fontInfoDto = {
			embedded: true,
			encoding: 'Identity-H',
			ref: '42 0 R',
		};
		expect(toFontInfoDto(fontInfo)).toStrictEqual(fontInfoDto);
	});

	it('should include the subtype if present', () => {
		const fontInfo: FontInfo = {
			ref: PDFRef.of(43, 0),
			embedded: true,
			encodingMapper: { name: 'Identity-V' },
			subtype: 'CIDFontType2',
		} as FontInfo;

		const fontInfoDto = {
			embedded: true,
			encoding: 'Identity-V',
			ref: '43 0 R',
			subtype: 'CIDFontType2',
		};
		expect(toFontInfoDto(fontInfo)).toStrictEqual(fontInfoDto);
	});

	it('should include the base font if present', () => {
		const fontInfo: FontInfo = {
			ref: PDFRef.of(44, 0),
			embedded: true,
			encodingMapper: { name: 'Identity-V' },
			baseFont: 'NotoSans-Regular',
		} as FontInfo;

		const fontInfoDto = {
			embedded: true,
			encoding: 'Identity-V',
			ref: '44 0 R',
			baseFont: 'NotoSans-Regular',
		};
		expect(toFontInfoDto(fontInfo)).toStrictEqual(fontInfoDto);
	});

	it('should include the font name if present', () => {
		const fontInfo: FontInfo = {
			ref: PDFRef.of(45, 0),
			embedded: true,
			encodingMapper: { name: 'Identity-V' },
			fontName: 'NotoSerif-Regular',
		} as FontInfo;

		const fontInfoDto = {
			embedded: true,
			encoding: 'Identity-V',
			ref: '45 0 R',
			fontName: 'NotoSerif-Regular',
		};
		expect(toFontInfoDto(fontInfo)).toStrictEqual(fontInfoDto);
	});
});
