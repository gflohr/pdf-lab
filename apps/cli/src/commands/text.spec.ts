import { PDFRef } from '@cantoo/pdf-lib';
import * as yaml from 'js-yaml';
import { type TextBlock, TextExtractor } from 'pdf-lab-core';
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
import { coerceOptions } from '../optspec.js';
import { TextCommand } from './text.js';

vi.mock('../optspec.js');
vi.mock('./load-input.js', () => ({
	loadInput: vi.fn().mockResolvedValue(new Uint8Array()),
}));

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
		const extractMock = vi
			.spyOn(
				TextExtractor.prototype as unknown as {
					extract: () => Promise<TextBlock[]>;
				},
				'extract',
			)
			.mockResolvedValue([]);

		const result = await textCommand.run(Buffer.from(''), {} as Arguments);

		expect(extractMock).toHaveBeenCalledTimes(1);
		expect(result).toBe(0);
	});

	it('run() should return 1 and log an error if doRun throws', async () => {
		const error = new Error('test error');
		vi.spyOn(
			textCommand as unknown as { doRun: () => Promise<void> },
			'doRun',
		).mockRejectedValue(error);

		const consoleErrorSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const result = await textCommand.run(Buffer.from(''), {} as Arguments);

		expect(consoleErrorSpy).toHaveBeenCalledWith('pdf-lab: Error: test error');
		expect(result).toBe(1);
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
			},
		];
		const textBlocksDto = structuredClone<TextBlock[]>(textBlocks);

		// Patch the object.
		textBlocksDto.forEach((block) => {
			block.font.ref = block.font.ref.tag as unknown as PDFRef;
		});

		it('should output text only', async () => {
			const extractMock = vi
				.spyOn(
					TextExtractor.prototype as unknown as {
						extract: () => Promise<TextBlock[]>;
					},
					'extract',
				)
				.mockResolvedValue(textBlocks);

			const options = { format: 'text' } as unknown as Arguments;
			const pdfBytes = Buffer.from('');
			await textCommand.run(pdfBytes, options);

			expect(extractMock).toHaveBeenCalledTimes(1);
			expect(extractMock).toHaveBeenCalledWith(pdfBytes);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const expected = `The quick brown fox jumps over 13 lazy dogs.
Бързата кафява лисица прескача 13 мързеливи кучета.`;
			expect(consoleLogSpy).toHaveBeenCalledWith(expected);
		});

		it('should output yaml', async () => {
			const extractMock = vi
				.spyOn(
					TextExtractor.prototype as unknown as {
						extract: () => Promise<TextBlock[]>;
					},
					'extract',
				)
				.mockResolvedValue(textBlocks);

			const options = { format: 'yaml' } as unknown as Arguments;

			const pdfBytes = Buffer.from('');
			await textCommand.run(pdfBytes, options);

			expect(extractMock).toHaveBeenCalledTimes(1);
			expect(extractMock).toHaveBeenCalledWith(pdfBytes);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const output = yaml.load(consoleLogSpy.mock.calls[0][0]);
			expect(output).toStrictEqual(textBlocksDto);
		});

		it('should output json', async () => {
			const extractMock = vi
				.spyOn(
					TextExtractor.prototype as unknown as {
						extract: () => Promise<TextBlock[]>;
					},
					'extract',
				)
				.mockResolvedValue(textBlocks);

			const options = { format: 'json' } as unknown as Arguments;

			const pdfBytes = Buffer.from('');
			await textCommand.run(pdfBytes, options);

			expect(extractMock).toHaveBeenCalledTimes(1);
			expect(extractMock).toHaveBeenCalledWith(pdfBytes);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);

			const output = JSON.parse(consoleLogSpy.mock.calls[0][0]);
			expect(output).toStrictEqual(textBlocksDto);
		});
	});
});
