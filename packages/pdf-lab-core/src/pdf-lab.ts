import { PDFDocument } from '@cantoo/pdf-lib';
import * as fontCollector from './font/collect-fonts.js';
import type { FontInfo } from './font/types.js';

export class PDFLab {
	private fonts: Map<string, FontInfo> | undefined;

	private constructor(private readonly pdfDoc: PDFDocument) {}

	/**
	 * Creates a `PDFLab` instance from a variety of PDF-like inputs and
	 * normalizes them into a single canonical `@cantoo/pdf-lib` document
	 * representation.
	 *
	 * This method performs a pre-processing step to ensure that the returned
	 * `PDFDocument` has a consistent internal object graph.
	 *
	 * ## Why
	 *
	 * PDF libraries such as `pdf-lib` (and forks like `@cantoo/pdf-lib`) rely
	 * heavily on runtime identity checks such as `instanceof PDFDict`,
	 * `instanceof PDFArray`, etc.
	 *
	 * In bundled or duplicated dependency scenarios (e.g. monorepos, multiple
	 * builds, or linked packages), the same logical PDF object type may exist
	 * in multiple constructor instances. This causes `instanceof` checks to
	 * fail even though the objects are structurally identical, leading to
	 * weird runtime errors such as:
	 *
	 * - "Expected instance of PDFDict but got instance of PDFDict"
	 *
	 * To prevent this, the document is **always** serialised and reloaded.
	 * This forces all internal objects to be reconstructed using
	 * the active `@cantoo/pdf-lib` runtime, ensuring consistent prototype
	 * chains and reliable `instanceof` behaviour.
	 *
	 * ## Behaviour
	 *
	 * - If a raw PDF input is provided (base 64 encoded string, data URI, or binary), it is directly loaded.
	 * - If a `PDFDocument` from another runtime instance is detected, it is
	 *   first serialized via `save()` and then reloaded via `PDFDocument.load()`.
	 * - This process guarantees a canonical internal representation of the PDF.
	 *
	 * This step is intentionally non-trivial and may be expensive, but is
	 * required for correctness in environments where multiple copies or builds
	 * of `pdf-lib` may exist.
	 *
	 * @param input A PDF source: raw bytes, base64 string, data URI, or a
	 * `PDFDocument` instance.
	 * @returns A normalized `PDFLab` instance backed by a canonical PDF document.
	 */
	static async from(
		input: PDFDocument | string | ArrayBuffer | Uint8Array<ArrayBufferLike>,
	): Promise<PDFLab> {
		let pdfDoc: PDFDocument;
		if (typeof input === 'string') {
			pdfDoc = await PDFDocument.load(input);
		} else if (input instanceof Object) {
			if (
				Object.hasOwn(input, 'context') &&
				typeof (input as unknown as { save: unknown }).save === 'function'
			) {
				pdfDoc = await PDFDocument.load(
					await (input as unknown as PDFDocument).save(),
					{ ignoreEncryption: true },
				);
			} else {
				// Read 'string' here as anything that PDFDocument.from()
				// accepts as input.
				pdfDoc = await PDFDocument.load(input as unknown as string, {
					ignoreEncryption: true,
				});
			}
		} else {
			throw new Error(
				'input must be the raw data bytes of a PDF or ' +
					'a base64 encoded string (or data URI) containing a PDF',
			);
		}

		return new PDFLab(pdfDoc);
	}

	public collectFonts(): Map<string, FontInfo> {
		if (!this.fonts) {
			this.fonts = fontCollector.collectFonts(this.pdfDoc);
		}

		return this.fonts;
	}
}
