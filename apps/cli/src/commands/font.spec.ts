import * as yaml from 'js-yaml';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import type { Arguments } from 'yargs';
import { coerceOptions } from '../util/optspec.js';

vi.mock('./load-input.js', () => ({
	loadInput: vi.fn().mockResolvedValue(new Uint8Array()),
}));

vi.mock('../util/optspec.js');
vi.mock('pdf-lab-core', async (importActual) => {
	const actual = await importActual<typeof import('pdf-lab-core')>();
	return {
		...actual,
		PDFLab: {
			from: vi.fn(),
		},
	};
});

import { PDFRef } from '@cantoo/pdf-lib';
import { type FontInfo, PDFLab } from 'pdf-lab-core';
// Currently, this is not exported. The deep import is therefore needed
// in the tests.
import { SingleByteEncodingMapper } from '../../../../packages/pdf-lab-core/src/encoding/mappers/single-byte-encoding-mapper.js';
import { type FontInfoDto, toFontInfoDto } from '../util/font-info-dto.js';
import { FontCommand } from './font.js';

describe('Font command', () => {
	let fontCommand: FontCommand;
	let consoleLogSpy: ReturnType<typeof vi.spyOn>;
	let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
	let fontInfos: FontInfo[];
	let fontInfoMap: Map<string, FontInfo>;
	let fontInfoDtos: FontInfoDto[];

	beforeEach(() => {
		fontCommand = new FontCommand();
		(coerceOptions as Mock).mockReturnValue(true);
		consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		fontInfos = [
			{
				ref: PDFRef.of(42),
				baseFont: 'ABCDEF+Helvetica',
				fontName: 'Helvetica',
				embedded: false,
				subtype: 'Type1',
				encoding: 'MacRomanEncoding',
				glyphMapper: new SingleByteEncodingMapper('MacRomanEncoding'),
			},
			{
				ref: PDFRef.of(43),
				baseFont: 'ZYXWVU+Helvetica-Oblique',
				fontName: 'Helvetica-Oblique',
				embedded: false,
				subtype: 'Type1',
				encoding: 'WinAnsiEncoding',
				glyphMapper: new SingleByteEncodingMapper('WinAnsiEncoding'),
			},
		];
		fontInfoMap = new Map<string, FontInfo>();
		fontInfoDtos = [];
		fontInfos.forEach((f) => {
			fontInfoMap.set(f.ref.toString(), f);
			fontInfoDtos.push(toFontInfoDto(f));
		});
	});

	it('description() should return a valid description', () => {
		expect(fontCommand.description()).toBe('List fonts from a PDF document.');
	});

	it('aliases() should return an empty array', () => {
		expect(fontCommand.aliases()).toEqual([]);
	});

	it('options() should return options', () => {
		const options = fontCommand.options();

		expect(options).toBeDefined();
	});

	it('run() should return 1 if coerceOptions fails', async () => {
		(coerceOptions as Mock).mockReturnValue(false);
		const result = await fontCommand.run(Buffer.from(''), {} as Arguments);

		expect(result).toBe(1);
	});

	it('should throw an error if nothing to do', async () => {
		const result = await fontCommand.run(Buffer.from(''), {} as Arguments);

		expect(result).toBe(1);
		expect(consoleErrorSpy).toHaveBeenCalledExactlyOnceWith(
			expect.stringContaining('nothing to do'),
		);
	});

	it('run() should call collectFonts and return 0 on success', async () => {
		const collectFontsMock = vi.fn().mockImplementation(() => {
			return new Map();
		});

		(PDFLab.from as Mock).mockResolvedValue({
			collectFonts: collectFontsMock,
		});

		const options = { list: true, format: 'text' } as unknown as Arguments;
		const result = await fontCommand.run(Buffer.from(''), options);

		expect(collectFontsMock).toHaveBeenCalledTimes(1);
		expect(result).toBe(0);
	});

	it('run() should return 1 and log an error if doRun throws', async () => {
		const error = new Error('test error');
		vi.spyOn(
			fontCommand as unknown as { doRun: () => Promise<void> },
			'doRun',
		).mockRejectedValue(error);

		const consoleErrorSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const result = await fontCommand.run(Buffer.from(''), {} as Arguments);

		expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('pdf-lab: Error: test error'));
		expect(result).toBe(1);
	});

	describe('output format', () => {
		it('should output text only', async () => {
			const collectFontsMock = vi.fn().mockReturnValue(fontInfoMap);

			(PDFLab.from as Mock).mockResolvedValue({
				collectFonts: collectFontsMock,
			});

			const options = { list: true, format: 'text' } as unknown as Arguments;
			const pdfBytes = Buffer.from('');
			await fontCommand.run(pdfBytes, options);

			expect(collectFontsMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const expected = `Helvetica
Helvetica-Oblique`;
			expect(consoleLogSpy).toHaveBeenCalledWith(expected);
		});

		it('should output json', async () => {
			const collectFontsMock = vi.fn().mockReturnValue(fontInfoMap);

			(PDFLab.from as Mock).mockResolvedValue({
				collectFonts: collectFontsMock,
			});

			const options = { list: true, format: 'json' } as unknown as Arguments;
			const pdfBytes = Buffer.from('');
			await fontCommand.run(pdfBytes, options);

			expect(collectFontsMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const output = JSON.parse(consoleLogSpy.mock.calls[0][0]);
			expect(output).toStrictEqual(fontInfoDtos);
		});

		it('should output yaml', async () => {
			const collectFontsMock = vi.fn().mockReturnValue(fontInfoMap);

			(PDFLab.from as Mock).mockResolvedValue({
				collectFonts: collectFontsMock,
			});

			const options = { list: true, format: 'yaml' } as unknown as Arguments;
			const pdfBytes = Buffer.from('');
			await fontCommand.run(pdfBytes, options);

			expect(collectFontsMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const output = yaml.load(consoleLogSpy.mock.calls[0][0]);
			expect(output).toStrictEqual(fontInfoDtos);
		});
	});

	describe('output shape', () => {
		it('should omit baseFont and fontName if not present', async () => {
			fontInfos.forEach((i) => {
				delete i.baseFont;
				delete i.fontName;
			});
			fontInfoDtos.forEach((dto) => {
				delete dto.baseFont;
				delete dto.fontName;
			});
			const collectFontsMock = vi.fn().mockReturnValue(fontInfoMap);

			(PDFLab.from as Mock).mockResolvedValue({
				collectFonts: collectFontsMock,
			});

			const options = { list: true, format: 'yaml' } as unknown as Arguments;
			const pdfBytes = Buffer.from('');
			await fontCommand.run(pdfBytes, options);

			expect(collectFontsMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const output = yaml.load(consoleLogSpy.mock.calls[0][0]);
			expect(output).toStrictEqual(fontInfoDtos);
		});
	});

	describe('Font Filtering', () => {
		it('should filter out by base-font name', async () => {
			const collectFontsMock = vi.fn().mockReturnValue(fontInfoMap);

			(PDFLab.from as Mock).mockResolvedValue({
				collectFonts: collectFontsMock,
			});

			const options = {
				list: true,
				format: 'text',
				'base-font': ['ABCDEF+Helvetica'],
			} as unknown as Arguments;
			const pdfBytes = Buffer.from('');
			await fontCommand.run(pdfBytes, options);

			expect(collectFontsMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const expected = `Helvetica`;
			expect(consoleLogSpy).toHaveBeenCalledWith(expected);
		});

		it('should filter out by font name', async () => {
			const collectFontsMock = vi.fn().mockReturnValue(fontInfoMap);

			(PDFLab.from as Mock).mockResolvedValue({
				collectFonts: collectFontsMock,
			});

			const options = {
				list: true,
				format: 'text',
				font: ['Helvetica-Oblique'],
			} as unknown as Arguments;
			const pdfBytes = Buffer.from('');
			await fontCommand.run(pdfBytes, options);

			expect(collectFontsMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const expected = `Helvetica-Oblique`;
			expect(consoleLogSpy).toHaveBeenCalledWith(expected);
		});
	});
});
