import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fcMatch } from './fc-match.js';
import type { FontDescription } from './resolve-font.js';
import type { FontData } from './types.js';

const execFileMock = vi.fn();
const readFileMock = vi.fn();

vi.mock('node:child_process', () => ({
	execFile: execFileMock,
}));

vi.mock('node:fs/promises', () => ({
	readFile: readFileMock,
}));

describe('fcMatch', () => {
	const fcMatchPath = '/usr/bin/fc-match';

	const desc: FontDescription = {
		category: 'sans',
		fontName: 'Helvetica',
		style: 'roman',
		weight: 'normal',
		width: 'normal',
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns undefined if not running in Node', async () => {
		const originalProcess = globalThis.process;

		// @ts-expect-error simulate browser
		delete globalThis.process;

		const result = await fcMatch(desc, fcMatchPath);

		expect(result).toBeUndefined();

		globalThis.process = originalProcess;
	});

	it('returns undefined when exec fails', async () => {
		execFileMock.mockImplementation((_cmd, _args, cb: any) => {
			cb(new Error('fail'), '', '');
		});

		const result = await fcMatch(desc, fcMatchPath);

		expect(result).toBeUndefined();
	});

	it('returns FontData when successful', async () => {
		const fileBuffer = new Uint8Array([1, 2, 3]);

		// biome-ignore lint/suspicious/noExplicitAny: this is just a mock.
		execFileMock.mockImplementation((_cmd, _args, cb: any) => {
			cb(null, {
				stdout: '/user/share/fonts/helvetica.ttf : Helvetica-Bold',
			}, '');
		});

		readFileMock.mockResolvedValue(fileBuffer as unknown as Buffer);

		const result = await fcMatch(desc, fcMatchPath);

		expect(result).toBeDefined();

		const expected: FontData = {
			source: fileBuffer,
			postScriptName: 'Helvetica-Bold',
		};

		expect(result).toEqual(expected);
		expect(readFileMock).toHaveBeenCalledWith(
			'/user/share/fonts/helvetica.ttf',
		);
	});

	it('returns undefined, when fc-match fails', async () => {
		// biome-ignore lint/suspicious/noExplicitAny: this is just a mock.
		execFileMock.mockImplementation((_cmd, _args, cb: any) => {
			cb(null, {
				stdout: 'configuration mising',
			}, '');
		});

		const result = await fcMatch(desc, fcMatchPath);

		expect(result).not.toBeDefined();
	});
});
