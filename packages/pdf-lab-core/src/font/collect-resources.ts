import { PDFDict, type PDFDocument, PDFRef } from '@cantoo/pdf-lib';

/**
 * A FontUsage maps resource names like F1, F2, to serialised references like
 * "7 0 R".
 */
export type FontUsage = Record<string, PDFRef>;

/**
 * Collect per-page font resource references from a PDF document.
 *
 * @param pdfDoc the document to inspect
 * @returns an array (one entry per page, in page order) mapping each
 *   resource name (for example `F1`) to its font `PDFRef`
 */
export function collectResources(pdfDoc: PDFDocument): FontUsage[] {
	const usages: FontUsage[] = [];

	for (const page of pdfDoc.getPages()) {
		const usage: FontUsage = {};
		usages.push(usage);

		const { Font } = page.node.normalizedEntries();
		if (!Font) continue;

		for (const [fontName, fontRef] of Font.entries()) {
			if (!(fontRef instanceof PDFRef)) continue;
			const fontDict = pdfDoc.context.lookupMaybe(fontRef, PDFDict);
			if (!fontDict) continue; // Useless for our purposes.

			usage[fontName.decodeText()] = fontRef;
		}
	}

	return usages;
}
