import {
	beforeEach,
	describe,
	expect,
	it,
	type MockInstance,
	vi,
} from 'vitest';
import { loadInput } from './load-input.js';
import { Package } from './package.js';

vi.mock('node:fs/promises', () => ({
	readFile: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
}));
vi.mock('./load-input.js', () => ({
	loadInput: vi.fn().mockResolvedValue(new Uint8Array()),
}));

import { TextCommand } from './commands/text.js';
import { run } from './run.js';

describe('pdf-lab-cli', () => {
	let consoleErrorSpy: MockInstance<(...args: unknown[]) => void>;

	beforeEach(() => {
		consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	describe('normal operation', () => {
		it('should run the command', async () => {
			const argv = ['text', 'sample.pdf'];

			const doRunSpy = vi
				.spyOn(
					TextCommand.prototype as unknown as { doRun: () => Promise<void> },
					'doRun',
				)
				.mockResolvedValue(undefined);

			await run(argv);

			expect(doRunSpy).toHaveBeenCalledTimes(1);
		});

		it('should log exceptions', async () => {
			const argv = ['text', 'sample.pdf'];

			const doRunSpy = vi
				.spyOn(
					TextCommand.prototype as unknown as { doRun: () => Promise<void> },
					'doRun',
				)
				.mockRejectedValue('boum');

			const exitCode = await run(argv);

			expect(exitCode).toBe(1);
			expect(doRunSpy).toHaveBeenCalledTimes(1);
			expect(loadInput).toHaveBeenCalledWith('sample.pdf');
			expect(consoleErrorSpy).toHaveBeenCalledWith(`${Package.name}: boum`);
		});

		it('should use defaults', async () => {
			const doRunSpy = vi
				.spyOn(
					TextCommand.prototype as unknown as { doRun: () => Promise<void> },
					'doRun',
				)
				.mockResolvedValue(undefined);

			const exitCode = await run(['text']);

			expect(exitCode).toBe(0);
			expect(doRunSpy).toHaveBeenCalledTimes(1);

			expect(loadInput).toHaveBeenCalledWith('-');
		});

		it('should allow a custom synopsis', async () => {
			const consoleLogSpy: MockInstance<(...args: unknown[]) => void> = vi
				.spyOn(console, 'log')
				.mockImplementation(() => {});
			const processExitSpy: MockInstance<(...args: unknown[]) => never> = vi
				.spyOn(process, 'exit')
				.mockImplementation(() => {
					throw new Error('exit');
				});
			const synopsisSpy = vi.fn().mockReturnValueOnce('help yourself');
			Object.defineProperty(TextCommand.prototype, 'synopsis', {
				value: synopsisSpy,
				configurable: true,
			});

			await expect(run(['text', '--help'])).rejects.toThrow('exit');

			expect(synopsisSpy).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledTimes(1);
			expect(consoleLogSpy).toHaveBeenCalledWith(
				expect.stringMatching(/help yourself/),
			);

			delete (TextCommand.prototype as { synopsis?: unknown }).synopsis;
			processExitSpy.mockRestore();
		});

		it('should honour command-line options', async () => {
			const doRunSpy = vi
				.spyOn(
					TextCommand.prototype as unknown as { doRun: () => Promise<void> },
					'doRun',
				)
				.mockResolvedValue(undefined);

			const exitCode = await run(['text', '--input=example.pdf']);

			expect(exitCode).toBe(0);
			expect(doRunSpy).toHaveBeenCalledTimes(1);
			expect(loadInput).toHaveBeenCalledWith('example.pdf');
		});

		it('should fix a lone hyphen as a positional argument', async () => {
			const doRunSpy = vi
				.spyOn(
					TextCommand.prototype as unknown as { doRun: () => Promise<void> },
					'doRun',
				)
				.mockResolvedValue(undefined);

			const exitCode = await run(['text', '-']);

			expect(exitCode).toBe(0);
			expect(doRunSpy).toHaveBeenCalledTimes(1);
			expect(loadInput).toHaveBeenCalledWith('-');
		});

		it('should re-throw exceptions', async () => {
			const optionsSpy = vi
				.spyOn(TextCommand.prototype, 'options')
				.mockImplementation(() => {
					throw new Error('boum');
				});

			await expect(run(['text'])).rejects.toThrow('boum');

			expect(optionsSpy).toHaveBeenCalledTimes(1);
			expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				'pdf-lab: unhandled exception: Error: boum',
			);
		});
	});
});
