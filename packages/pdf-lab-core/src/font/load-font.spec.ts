import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { OsType } from './load-font.js';
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

		it('throws if not running in Node (no platform provided)', async () => {
			await expect(loadFontFromPath(fontName, path)).rejects.toThrow(
				`The font '${fontName}' is not embedded, and cannot be loaded from the file system.`,
			);
		});

		it('throws if platform is missing even in Node', async () => {
			await expect(loadFontFromPath(fontName, path, undefined)).rejects.toThrow(
				`The font '${fontName}' is not embedded, and cannot be loaded from the file system.`,
			);
		});

		it('reads file from fs when running in Node with platform', async () => {
			const fs = await import('node:fs/promises');
			const readFileMock = vi.mocked(fs.readFile);

			readFileMock.mockResolvedValue(bytes);

			const result = await loadFontFromPath(fontName, path, 'linux' as OsType);

			expect(readFileMock).toHaveBeenCalledWith(path);
			expect(result).toStrictEqual({ source: bytes });
		});
	});
});
