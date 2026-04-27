import { PDFDocument, PDFName, PDFRef, StandardFonts } from '@cantoo/pdf-lib';
import { describe, expect, it } from 'vitest';
import { collectResources } from './collect-resources.js';

describe('collectResources', () => {
	it('collects font resources for pages with text', async () => {
		const pdfDoc = await PDFDocument.create();

		const page = pdfDoc.addPage();

		const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

		page.drawText('Hello World', { font });
		await pdfDoc.save();

		const usages = collectResources(pdfDoc);
		expect(usages).toHaveLength(1);

		const pageUsage = usages[0]!;

		// There should be at least one font resource like F1
		const entries = Object.entries(pageUsage);

		expect(entries.length).toBeGreaterThan(0);

		const [resourceName] = entries[0]!;

		expect(resourceName).toMatch(/^Helvetica-\d+$/);
	});

	it('returns empty usage for pages without fonts', async () => {
		const pdfDoc = await PDFDocument.create();

		pdfDoc.addPage(); // no text drawn → no fonts

		const usages = collectResources(pdfDoc);

		expect(usages).toHaveLength(1);
		expect(usages[0]).toEqual({});
	});

	it('handles multiple pages independently', async () => {
		const pdfDoc = await PDFDocument.create();

		const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

		const page1 = pdfDoc.addPage();
		page1.drawText('Page 1', { font });

		const page2 = pdfDoc.addPage();
		page2.drawText('Page 2', { font });

		await pdfDoc.save();

		const usages = collectResources(pdfDoc);

		expect(usages).toHaveLength(2);

		expect(Object.keys(usages[0]!).length).toBeGreaterThan(0);
		expect(Object.keys(usages[1]!).length).toBeGreaterThan(0);
	});
});
