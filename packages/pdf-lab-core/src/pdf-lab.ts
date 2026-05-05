import { PDFDocument, PDFName, PDFRef } from '@cantoo/pdf-lib';
import collectFonts from './font/collect-fonts.js';
import { collectResources, type FontUsage } from './font/collect-resources.js';
import { Type1FontEmbedder } from './font/embedder/type1-embedder.js';
import type { FontInfo, FontMap } from './font/types.js';
import { extractGlyphs, GlyphBlock } from './text/extract-glyphs.js';
import { extractText, type TextBlock } from './text/extract-text.js';

/**
 * Options for embedding fonts.
 */
export type FontEmbedOptions = {
	/**
	 * Map font names to paths/buffers and optional PostScript names.
	 */
	fontMap?: FontMap;

	/**
	 * Path to the 'fc-match' program. Default: 'fc-match'.
	 */
	fcMatch?: string;

	/**
	 * Compress font streams. Default: true.
	 */
	compress?: boolean;

	/**
	 * Operating system as returned by os.platform() or undefined for the
	 * browser.
	 */

	platform?: string;
	/**
	 * A fontkit instance, see `@pdf-lib/fontkit`.
	 */

	/**
	 * FIXME! Create a stub type that covers all functionality that we need.
	 */
	fontkit?: unknown;
};

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
		return this.pdfDocument.save({ useObjectStreams: false });
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
	 * @param options control the font embedding
	 */
	public async embedFonts(
		references?: PDFRef[],
		options: FontEmbedOptions = {},
	) {
		options.fontMap ??= {};
		options.fcMatch ??= 'fc-match';
		options.compress ??= true;

		if (!this.fontUsage) {
			this.fontUsage = collectResources(this.pdfDocument);
		}

		if (!this.fonts) {
			this.fonts = collectFonts(this.pdfDocument, this.fontUsage);
		}

		const fonts = [...this.fonts.values()].filter((f) => !f.embedded);
		if (!fonts.length) {
			return;
		}

		const refs = new Set<string>(
			references?.map((ref) => ref.toString()) ??
				fonts.map((f) => f.ref.toString()),
		);

		const glyphBlocks = extractGlyphs(this.pdfDocument);
		const glyphUsage: Record<string, Set<number>> = {};
		const glyphsInFont: Record<string, GlyphBlock[]> = {};

		// Make sure that there is an entry for every font.
		for (const font of fonts) {
			const ref = font.ref.toString();
			if (refs.has(ref)) glyphUsage[ref] = new Set<number>();
		}

		// Aggregate all glyphs used.
		for (const block of glyphBlocks) {
			const page = this.pdfDocument.getPage(block.pageNumber);
			const { Font } = page.node.normalizedEntries();

			const font = Font.get(PDFName.of(block.fontResource));
			if (font instanceof PDFRef && refs.has(font.toString())) {
				const fontRef = font.toString();
				glyphsInFont[fontRef] ??= [];
				glyphsInFont[fontRef].push(block);
				block.glyphs.forEach((g) => {
					glyphUsage[fontRef]?.add(g);
				});
			}
		}

		// Normalize the fontMap.
		if (typeof options.fontMap !== 'undefined') {
			const fontMap = options.fontMap;
			Object.keys(fontMap).forEach((key) => {
				const entry = fontMap[key]!;
				delete fontMap[key];
				const lcKey = key.toLowerCase();
				if (Object.hasOwn(fontMap, lcKey)) {
					throw new Error(`font-mapping has duplicate key '${key}'!`);
				}
				fontMap[lcKey] = entry;
			});
		}

		for (const font of fonts) {
			switch (font.subtype) {
				case 'Type1':
					await new Type1FontEmbedder(
						this.pdfDocument,
						font,
						glyphUsage[font.ref.toString()]!,
						glyphsInFont[font.ref.toString()]!,
						options,
					).embed();
					break;
				default:
					throw new Error(
						`Embedding font sybtype ${font.subtype} not yet implemented`,
					);
			}
		}
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
	 * Extract all tags from the PDF.
	 *
	 * @returns an array of `TextBlock` objects.
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
