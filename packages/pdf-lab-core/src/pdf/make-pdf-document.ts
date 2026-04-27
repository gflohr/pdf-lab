import { PDFDocument } from '@cantoo/pdf-lib';

export async function makePDFDocument(
	pdfDoc: PDFDocument | string | ArrayBuffer | Uint8Array<ArrayBufferLike>,
): Promise<PDFDocument> {
	if (typeof pdfDoc === 'string') {
		pdfDoc = await PDFDocument.load(pdfDoc);
	} else if (pdfDoc instanceof Object) {
		if (!(pdfDoc instanceof PDFDocument)) {
			// Two cases. It could really be a PDFDocument but created
			// with another instance of the library (for example a bundled)
			// version. In that case, we have re-created it. Otherwise
			// the `instanceof` check inside pdf-lib will produce false
			// negatives.
			if (
				Object.hasOwn(pdfDoc, 'context') &&
				typeof (pdfDoc as unknown as { save: unknown }).save === 'function'
			) {
				pdfDoc = await PDFDocument.load(
					await (pdfDoc as unknown as PDFDocument).save(),
					{ ignoreEncryption: true },
				);
			} else {
				pdfDoc = await PDFDocument.load(pdfDoc, { ignoreEncryption: true });
			}
		}
	} else {
		throw new Error(
			'pdfDoc must be the raw data bytes of a PDF or' +
				'a base64 encoded string (or data URI) containing a PDF',
		);
	}

	return pdfDoc;
}
