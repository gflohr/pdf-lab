import { EmbedFontOptions, PDFDocument, type PDFRef } from '@cantoo/pdf-lib';
import collectFonts from './font/collect-fonts.js';
import { collectResources, type FontUsage } from './font/collect-resources.js';
import embedFont from './font/embed-font.js';
import type { FontInfo } from './font/types.js';
import { extractText, TextBlock } from './text/extract-text.js';

export class PDFLab {
	private fonts: Map<string, FontInfo> | undefined;
	private fontUsage: FontUsage[] | undefined;

	private constructor(private readonly _pdfDoc: PDFDocument) {}

	/**
	 * Returns the internally used `PDFDocument`. Changing the structure of
	 * this document, and then calling other `PDFLab` methods, may result in
	 * undefined behaviour and is strongly discouraged.
	 *
	 * @return the internally used `PDFDocument`
	 */
	public get pdfDocument(): PDFDocument {
		return this._pdfDoc;
	}

	/**
	 * Serialises the internally used PDF into a sequence of bytes. As a side
	 * effect, it also updates internal structures of the `PDFDocument` into
	 * a stable version.
	 *
	 * The method is a thin wrapper around the `save()` method of `PDFDocument`.
	 * Fine-tuning the saving process can be achieved by getting the
	 * `pdfDocument`, and then calling the `save()` method with the desired
	 * options.
	 *
	 * @returns
	 */
	public async save(): Promise<Uint8Array> {
		return this.pdfDocument.save();
	}

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

	/**
	 * Embed multiple fonts, but only if the are not already embedded.
	 * If no references were passed, all currently missing fonts are
	 * embedded.
	 *
	 * @param references font references (try `collectFonts()`)
	 * @param subset embed only a subset of each font
	 */
	public async embedFonts(references?: PDFRef[], subset = true ) {
		if (!this.fontUsage) {
			this.fontUsage = collectResources(this.pdfDocument);
		}

		if (!this.fonts) {
			this.fonts = collectFonts(this.pdfDocument, this.fontUsage);
		}

		const refs = new Set<string>(references?.map(ref => ref.toString()) ?? this.fonts.keys());

		const textBlocks = await extractText(this.pdfDocument, this.fonts, this.fontUsage);
		const characterUsage: Record<string, Set<string>> = {};

		// Make sure that there is an entry for every font.
		for (const ref of this.fonts.keys()) {
			if (refs.has(ref)) characterUsage[ref] = new Set<string>();
		}

		// Aggregate all characters used.
		for (const block of textBlocks.filter(block => !block.font.embedded && refs.has(block.font.ref.toString()))) {
			const ref = block.font.ref.toString();
			for (const character of block.text) {
				characterUsage[ref]!.add(character);
			}
		}

		console.dir(characterUsage, { depth: null });
	}

	/**
	 * Collects all fonts used in the PDF.
	 *
	 * @returns a `Map` with keys as `PDFRef` (reference of the font) and values as `FontInfo`
	 */
	public collectFonts(): Map<string, FontInfo> {
		if (!this.fontUsage) {
			this.fontUsage = collectResources(this.pdfDocument);
		}

		if (!this.fonts) {
			this.fonts = collectFonts(this.pdfDocument, this.fontUsage);
		}

		return this.fonts;
	}

	/**
	 * Collects all fonts used in the PDF.
	 *
	 * @returns a `Map` with keys as `PDFRef` (reference of the font) and values as `FontInfo`
	 */
	public async extractText(): Promise<TextBlock[]> {
		if (!this.fontUsage) {
			this.fontUsage = collectResources(this.pdfDocument);
		}

		if (!this.fonts) {
			this.fonts = collectFonts(this.pdfDocument, this.fontUsage);
		}

		return await extractText(this.pdfDocument, this.fonts, this.fontUsage);
	}
}
