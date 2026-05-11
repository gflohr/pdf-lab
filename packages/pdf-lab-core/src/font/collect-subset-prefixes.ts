import {
	PDFArray,
	PDFDict,
	type PDFDocument,
	PDFName,
	type PDFRef,
} from '@cantoo/pdf-lib';
import type { FontUsage } from './collect-resources.js';

/**
 * Collect all subset prefixes ussed in a PDF document.
 *
 * @param pdfDoc the input PDF
 * @param resources the used font resources as returned by `collectResources`
 * @returns a set of the used subset prefixes
 */
export default function collectSubsetPrefixes(
	pdfDoc: PDFDocument,
	resources: FontUsage[],
): Set<string> {
	const prefixes = new Set<string>();

	const refs = [...new Set<PDFRef>(resources.flatMap(Object.values))];
	for (let i = 0; i < refs.length; ++i) {
		const fontRef = refs[i]!;
		const fontDict = pdfDoc.context.lookupMaybe(fontRef, PDFDict);
		if (!fontDict) continue;

		const baseName = fontDict.lookupMaybe(PDFName.of('BaseFont'), PDFName);
		if (baseName?.decodeText().match(/^[A-Z]{6}\+/)) {
			prefixes.add(baseName.decodeText().slice(0, 6));
		}

		const subtype = fontDict.lookupMaybe(PDFName.of('Subtype'), PDFName);
		if (!subtype) continue;

		const subtypeName = subtype.decodeText();
		if (subtypeName !== 'Type0') continue;

		const descendantFonts = fontDict.lookup(PDFName.of('DescendantFonts'));
		if (!(descendantFonts instanceof PDFArray && descendantFonts.size())) continue;

		const descendantFontRef = descendantFonts.get(0);
		const descendantFontDict = pdfDoc.context.lookupMaybe(
			descendantFontRef,
			PDFDict,
		);
		if (!descendantFontDict) continue;

		const descendantBaseName = descendantFontDict.lookupMaybe(PDFName.of('BaseFont'), PDFName);
		if (descendantBaseName?.decodeText().match(/^[A-Z]{6}\+/)) {
			prefixes.add(descendantBaseName.decodeText().slice(0, 6));
		}
	}

	return prefixes;
}
