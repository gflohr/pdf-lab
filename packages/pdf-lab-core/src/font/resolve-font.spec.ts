import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resolveFont } from './resolve-font.js';
import type { FontData, FontMap } from './types.js';

vi.mock('./fc-match.js', () => ({
	fcMatch: vi.fn(),
}));

vi.mock('./load-font.js', () => ({
	loadFont: vi.fn(),
	loadFontFromPath: vi.fn(),
}));

vi.mock('./util/font-name.js', () => ({
	fontName: vi.fn((name: string) => name),
}));

import { fcMatch } from './fc-match.js';
import { loadFont, loadFontFromPath } from './load-font.js';
import { fontName } from './util/font-name.js';

describe('resolve', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('returns font from fontMap (preloaded)', async () => {
		const fontData: FontData = {
			source: new Uint8Array([1, 2, 3]),
		};

		const fontMap: FontMap = {
			helvetica: fontData,
		};

		const result = await resolveFont('Helvetica', fontMap);

		expect(result).toBe(fontData);
		expect(fcMatch).not.toHaveBeenCalled();
		expect(loadFont).not.toHaveBeenCalled();
	});

	it('loads font from path in fontMap', async () => {
		const bytes = new Uint8Array([1, 2, 3]);

		vi.mocked(loadFontFromPath).mockResolvedValue({ source: bytes });

		const fontMap: FontMap = {
			helvetica: { source: '/path/to/font.ttf' },
		};

		const result = await resolveFont('Helvetica', fontMap, 'fc-match', 'linux');

		expect(loadFontFromPath).toHaveBeenCalledWith(
			'Helvetica',
			'/path/to/font.ttf',
			'linux',
		);

		expect(result).toEqual({ source: bytes });
	});

	it('uses fcMatch if available', async () => {
		const fontData: FontData = {
			source: new Uint8Array([4, 5, 6]),
			postScriptName: 'TestPS',
		};

		vi.mocked(fcMatch).mockResolvedValue(fontData);

		const result = await resolveFont('SomeFont', {});

		expect(fcMatch).toHaveBeenCalled();
		expect(result).toBe(fontData);
		expect(loadFont).not.toHaveBeenCalled();
	});

	it('falls back to loadFont when fcMatch fails', async () => {
		const fontData: FontData = {
			source: new Uint8Array([7, 8, 9]),
		};

		vi.mocked(fcMatch).mockResolvedValue(undefined);
		vi.mocked(loadFont).mockResolvedValue(fontData);

		const result = await resolveFont('SomeFont', {}, 'fc-match', 'linux');

		expect(loadFont).toHaveBeenCalled();
		expect(result).toBe(fontData);
	});

	it('throws if no font can be resolved', async () => {
		vi.mocked(fcMatch).mockResolvedValue(undefined);
		vi.mocked(loadFont).mockResolvedValue(undefined);

		await expect(resolveFont('MissingFont', {})).rejects.toThrow(
			"The font 'MissingFont' is not embedded",
		);
	});

	it('normalizes font name using fontName()', async () => {
		const fontData: FontData = {
			source: new Uint8Array([1]),
		};

		vi.mocked(fontName).mockReturnValue('Helvetica');
		vi.mocked(fcMatch).mockResolvedValue(fontData);

		const result = await resolveFont('ABCDEF+Helvetica-Bold', {});

		expect(fontName).toHaveBeenCalledWith('ABCDEF+Helvetica-Bold');
		expect(result).toBe(fontData);
	});
});
