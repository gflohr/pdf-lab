import { PDFDict, type PDFDocument, PDFRef } from '@cantoo/pdf-lib';

/**
 * A FontUsage maps resource names like F1, F2, to serialised references like
 * "7 0 R".
 */
export type FontUsage = Record<string, PDFRef>;

export function collectResources(pdfDoc: PDFDocument): FontUsage[] {
	const usages: FontUsage[] = [];

	for (const page of pdfDoc.getPages()) {
		const usage: FontUsage = {};
		usages.push(usage);

		const { Font } = page.node.normalizedEntries();
		if (!Font) continue;

		for (const [fontName, fontRef] of Font.entries()) {
			const fontDict = pdfDoc.context.lookupMaybe(fontRef, PDFDict);
			if (!fontDict) continue; // Useless for our purposes.
			if (!(fontRef instanceof PDFRef)) continue;

			usage[fontName.decodeText()] = fontRef;
		}
	}

	return usages;
}
