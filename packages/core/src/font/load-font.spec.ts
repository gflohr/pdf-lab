import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadFontFromPath } from './load-font.js';

vi.mock('node:fs/promises', () => {
	return {
		readFile: vi.fn(),
	};
});

describe('Font loading', () => {
	describe('loadFontFromPath', () => {
		const fontName = 'Helvetica';
		const path = '/some/font.ttf';
		const bytes = Buffer.from([1, 2, 3]);

		beforeEach(() => {
			vi.resetAllMocks();
		});

		it('reads file from fs when running in Node', async () => {
			const fs = await import('node:fs/promises');
			const readFileMock = vi.mocked(fs.readFile);

			readFileMock.mockResolvedValue(bytes);

			const result = await loadFontFromPath(fontName, path);

			expect(readFileMock).toHaveBeenCalledWith(path);
			expect(result).toStrictEqual({ source: bytes, filename: path });
		});
	});
});
