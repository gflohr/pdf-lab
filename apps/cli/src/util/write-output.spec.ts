import * as fs from 'node:fs/promises';
import type { PDFLab } from 'pdf-lab-core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { safeStdoutBufferWrite } from './safe-stdout-write.js';
import { writeOutput } from './write-output.js';

vi.mock('node:fs/promises');
vi.mock('./safe-stdout-write.js');

describe('writeOutput', () => {
	const bytes = new Uint8Array([1, 2, 3]);

	const createLabMock = (): Pick<PDFLab, 'save'> => ({
		save: vi.fn().mockResolvedValue(bytes),
	});

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('writes to stdout when filename is "-"', async () => {
		const lab = createLabMock();

		await writeOutput('-', lab as PDFLab);

		expect(lab.save).toHaveBeenCalled();

		expect(safeStdoutBufferWrite).toHaveBeenCalledWith(bytes);
		expect(fs.writeFile).not.toHaveBeenCalled();
	});

	it('writes to file when filename is not "-"', async () => {
		const lab = createLabMock();

		await writeOutput('output.pdf', lab as PDFLab);

		expect(lab.save).toHaveBeenCalled();

		expect(fs.writeFile).toHaveBeenCalledWith('output.pdf', bytes);
		expect(safeStdoutBufferWrite).not.toHaveBeenCalled();
	});
});
