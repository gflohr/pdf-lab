import * as fs from 'node:fs/promises';
import type { PDFLab } from 'pdf-lab-core';
import { safeStdoutBufferWrite } from './safe-stdout-write.js';

export async function writeOutput(filename: string, lab: PDFLab) {
	const bytes = await lab.save();

	if (filename === '-') {
		await safeStdoutBufferWrite(bytes);
	} else {
		await fs.writeFile(filename, bytes);
	}
}
