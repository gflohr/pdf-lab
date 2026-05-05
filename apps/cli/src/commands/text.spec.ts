import { PDFRef } from '@cantoo/pdf-lib';
import * as yaml from 'js-yaml';
import { PDFLab, type TextBlock } from 'pdf-lab-core';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	type Mock,
	vi,
} from 'vitest';
import type { Arguments } from 'yargs';
import { coerceOptions } from '../util/optspec.js';
import { TextCommand } from './text.js';

vi.mock('../util/optspec.js');
vi.mock('./load-input.js', () => ({
	loadInput: vi.fn().mockResolvedValue(new Uint8Array()),
}));
vi.mock('pdf-lab-core', async (importActual) => {
	const actual = await importActual<typeof import('pdf-lab-core')>();
	return {
		...actual,
		PDFLab: {
			from: vi.fn(),
		},
	};
});

describe('Text Command', () => {
	let consoleLogSpy: ReturnType<typeof vi.spyOn>;
	let textCommand: TextCommand;

	beforeEach(() => {
		textCommand = new TextCommand();
		(coerceOptions as Mock).mockReturnValue(true);
		consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('description() should return a valid description', () => {
		expect(textCommand.description()).toBe('Extract text from a PDF document.');
	});

	it('aliases() should return an empty array', () => {
		expect(textCommand.aliases()).toEqual([]);
	});

	it('options() should return options', () => {
		const options = textCommand.options();

		expect(options).toBeDefined();
	});

	it('run() should return 1 if coerceOptions fails', async () => {
		(coerceOptions as Mock).mockReturnValue(false);
		const result = await textCommand.run(Buffer.from(''), {} as Arguments);

		expect(result).toBe(1);
	});

	it('run() should call extract and return 0 on success', async () => {
		const extractTextMock = vi.fn().mockReturnValue([]);
		(PDFLab.from as Mock).mockResolvedValue({
			extractText: extractTextMock,
		});

		const result = await textCommand.run(Buffer.from(''), {} as Arguments);

		expect(extractTextMock).toHaveBeenCalledTimes(1);
		expect(result).toBe(0);
	});

	describe('output format', () => {
		const textBlocks: TextBlock[] = [
			{
				text: 'The quick brown fox jumps over 13 lazy dogs.',
				font: {
					ref: PDFRef.of(42),
					baseFont: 'Helvetica-1234',
					fontName: 'Helvetica',
					embedded: false,
					subtype: 'Type1',
					encoding: 'MacRomanEncoding',
				},
				pageNumber: 0,
				glyphs: [],
			},
			{
				text: 'Бързата кафява лисица прескача 13 мързеливи кучета.',
				font: {
					ref: PDFRef.of(42),
					baseFont: 'Helvetica-Oblique-1234',
					fontName: 'Helvetica-Oblique',
					embedded: false,
					subtype: 'Type1',
				},
				pageNumber: 0,
				glyphs: [],
			},
		];
		const textBlocksDto = structuredClone<TextBlock[]>(textBlocks);

		// Patch the object.
		textBlocksDto.forEach((block) => {
			block.font.ref = block.font.ref.tag as unknown as PDFRef;
			delete (block as Record<string, unknown>).glyphs;
		});

		it('should output text only', async () => {
			const extractTextMock = vi.fn().mockReturnValue(textBlocks);
			(PDFLab.from as Mock).mockResolvedValue({
				extractText: extractTextMock,
			});

			const options = { format: 'text' } as unknown as Arguments;
			const pdfBytes = Buffer.from('');
			await textCommand.run(pdfBytes, options);

			expect(extractTextMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const expected = `The quick brown fox jumps over 13 lazy dogs.
Бързата кафява лисица прескача 13 мързеливи кучета.`;
			expect(consoleLogSpy).toHaveBeenCalledWith(expected);
		});

		it('should output yaml', async () => {
			const extractTextMock = vi.fn().mockReturnValue(textBlocks);
			(PDFLab.from as Mock).mockResolvedValue({
				extractText: extractTextMock,
			});

			const options = { format: 'yaml' } as unknown as Arguments;

			const pdfBytes = Buffer.from('');
			await textCommand.run(pdfBytes, options);

			expect(extractTextMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const output = yaml.load(consoleLogSpy.mock.calls[0][0]);
			expect(output).toStrictEqual(textBlocksDto);
		});

		it('should output json', async () => {
			const extractTextMock = vi.fn().mockReturnValue(textBlocks);
			(PDFLab.from as Mock).mockResolvedValue({
				extractText: extractTextMock,
			});

			const options = { format: 'json' } as unknown as Arguments;

			const pdfBytes = Buffer.from('');
			await textCommand.run(pdfBytes, options);

			expect(extractTextMock).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const output = JSON.parse(consoleLogSpy.mock.calls[0][0]);
			expect(output).toStrictEqual(textBlocksDto);
		});
	});
});
