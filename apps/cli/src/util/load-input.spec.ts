import * as fs from 'node:fs/promises';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStdin = vi.hoisted(() => {
	const chunks = [
		Buffer.from('Hello, '),
		Buffer.from('world'),
		Buffer.from('!'),
	];

	return {
		chunks,
		stdin: {
			async *[Symbol.asyncIterator]() {
				for (const chunk of chunks) {
					yield chunk;
				}
			},
		},
	};
});

vi.mock('node:process', () => ({
	stdin: mockStdin.stdin,
}));

vi.mock('node:fs/promises', () => ({
	readFile: vi.fn(),
}));

describe('PDF loading', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should load a PDF from the file system', async () => {
		const { loadInput } = await import('./load-input.js');
		const mockBuffer = Buffer.from('fake-pdf-content');

		vi.mocked(fs.readFile).mockResolvedValue(mockBuffer);

		const result = await loadInput('test.pdf');

		expect(fs.readFile).toHaveBeenCalledWith('test.pdf');
		expect(result).toStrictEqual(mockBuffer);
	});

	it('should load a PDF from stdin when filename is "-"', async () => {
		const { loadInput } = await import('./load-input.js');

		const result = await loadInput('-');

		expect(fs.readFile).not.toHaveBeenCalled();
		expect(result).toStrictEqual(Buffer.from('Hello, world!'));
	});
});
