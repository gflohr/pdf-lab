import {
	decodePDFRawStream,
	PDFDocument,
	PDFName,
	PDFRawStream,
	PDFRef,
	PDFStream,
} from '@cantoo/pdf-lib';
import type { FontkitAPI } from '@pdfa-lab/fontkit';
import collectFonts from './font/collect-fonts.js';
import { collectResources, type FontUsage } from './font/collect-resources.js';
import collectSubsetPrefixes from './font/collect-subset-prefixes.js';
import { FontEmbedder } from './font/embedder.js';
import { patchStream } from './font/patch-stream.js';
import type { FontInfo, FontMap, PatchSet } from './font/types.js';
import { extractGlyphs, type GlyphBlock } from './text/extract-glyphs.js';
import { extractText } from './text/extract-text.js';
import {
	DEFAULT_BASE_IRI,
	type RdfSerialisationFormat,
	type RdfSerialisationFormatAlias,
	type RdfSerialisationOptions,
	rdfSerialisationFormatAlias,
	XmpDocument,
} from './xmp/xmp-document.js';

/**
 * Options for embedding fonts.
 */
export interface FontEmbedOptions {
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
}

/**
 * Options for converting to PDF/A.
 */
export interface PDFAConversionOptions {
	/**
	 * Whether to embed fonts. Defaults to `true`.
	 */
	embedFonts?: boolean;

	/**
	 * Options for font embedding.
	 */
	fontEmbedOptions?: FontEmbedOptions;

	/**
	 * A fontkit instance. This is mandatory, if fonts have to be embedded.
	 */
	fontkit?: FontkitAPI;
}

/**
 * A block of text extracted from a `PDFDocument`.
 */
export interface TextBlock {
	/**
	 * The extracted text.
	 */
	text: string;

	/**
	 * The corresponding glyph IDs.
	 */
	glyphs: number[];

	/**
	 * The font information.
	 */
	font: FontInfo;

	/**
	 * The page number where the snippet was found.
	 */
	pageNumber: number;
}

export class PDFALab {
	private fonts: Map<string, FontInfo> | undefined;
	private fontUsage: FontUsage[] | undefined;

	private constructor(private readonly _pdfDoc: PDFDocument) {}

	/**
	 * Returns the internally used `PDFDocument`. Changing the structure of
	 * this document, and then calling other `PDFALab` methods, may result in
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
		// It is crucial to set useObjectStreams to true here! Otherwise,
		// pdf-lib will corrupt the document.
		return this.pdfDocument.save({ useObjectStreams: true });
	}

	/**
	 * Creates a `PDFALab` instance from a variety of PDF-like inputs and
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
	 * @returns A normalized `PDFALab` instance backed by a canonical PDF document.
	 */
	static async from(
		input: PDFDocument | string | ArrayBuffer | Uint8Array<ArrayBufferLike>,
	): Promise<PDFALab> {
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

		return new PDFALab(pdfDoc);
	}

	/**
	 * Convert a document to PDF/A.
	 *
	 * @param options
	 */
	public async makePDFA(options: PDFAConversionOptions = {}): Promise<void> {
		options.embedFonts ??= true;
		options.fontEmbedOptions ??= {};

		await this.embedFonts(options.fontkit!, options.fontEmbedOptions);
	}

	/**
	 * Embed multiple fonts, but only if they are not already embedded.
	 *
	 *
	 *
	 * If no references were passed, all currently missing fonts are
	 * embedded.
	 *
	 * @param fontkit a fontkit instance
	 * @param options control the font embedding
	 * @param references can be determined by `collectFonts()`
	 */
	public async embedFonts(
		fontkit: FontkitAPI,
		options: FontEmbedOptions = {},
		references?: PDFRef[],
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

		const subsetPrefixes = collectSubsetPrefixes(
			this.pdfDocument,
			this.fontUsage,
		);

		const fonts = [...this.fonts.values()].filter((f) => !f.embedded);
		if (!fonts.length) {
			return;
		}

		const refs = new Set<string>(
			references?.map((ref) => ref.toString()) ??
				fonts.map((f) => f.ref.toString()),
		);

		const glyphBlocks = extractGlyphs(this.pdfDocument);
		const glyphsInFont: Record<string, GlyphBlock[]> = {};

		// Aggregate all glyphs used, and remember the stream IDs.
		const streams: PDFStream[] = [];
		for (const block of glyphBlocks) {
			const page = this.pdfDocument.getPage(block.pageNumber);
			const { Font } = page.node.normalizedEntries();

			const font = Font.get(PDFName.of(block.fontResource));
			if (font instanceof PDFRef && refs.has(font.toString())) {
				const fontRef = font.toString();
				glyphsInFont[fontRef] ??= [];
				glyphsInFont[fontRef].push(block);
			}

			streams[block.streamId] = block.stream;
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
			if (
				font.subtype !== 'Type0' &&
				font.subtype !== 'Type1' &&
				font.subtype !== 'TrueType'
			) {
				// Fail early!
				throw new Error(
					`Embedding font subtype ${font.subtype} not yet implemented`,
				);
			}
		}

		const allPatchSets: PatchSet[] = [];
		for (const font of fonts) {
			// Make sure that we also embed unused fonts.
			const fontBlocks = glyphsInFont[font.ref.toString()] ?? [];

			const embedder = new FontEmbedder(
				this.pdfDocument,
				font,
				fontBlocks,
				subsetPrefixes,
				options,
			);

			const patchSets = await embedder.embed(fontkit as FontkitAPI);
			allPatchSets.push(...patchSets);
		}

		const patchGroups: PatchSet[][] = [];

		for (const patchSet of allPatchSets) {
			patchGroups[patchSet.streamId] ??= [];
			patchGroups[patchSet.streamId]!.push(patchSet);
		}

		for (let i = 0; i < patchGroups.length; ++i) {
			const group = patchGroups[i];
			if (group && streams[i]) {
				patchStream(
					streams[i]!,
					this.pdfDocument.context,
					group,
					options.compress,
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

	/**
	 * Extract XMP meta information from the PDF.
	 *
	 * @param format the desired serialisation format (default: application/rdf+xml)
	 * @param baseIRI the base IRI (default: urn:xmp:doc)
	 * @param options serialisation options for certain formats, see {@link RdfSerialisationOptions}
	 * @returns the serialised XMP or `null` if no meta information available
	 */
	public extractXmp(
		format:
			| RdfSerialisationFormat
			| RdfSerialisationFormatAlias = 'application/rdf+xml',
		baseIRI = DEFAULT_BASE_IRI,
		options: RdfSerialisationOptions = {},
	): string | null {
		format = format.toLowerCase();
		if (
			typeof rdfSerialisationFormatAlias[
				format as keyof typeof rdfSerialisationFormatAlias
			] !== 'undefined'
		) {
			format = rdfSerialisationFormatAlias[
				format as keyof typeof rdfSerialisationFormatAlias
			] as RdfSerialisationFormat;
		}

		const metadataRef = this.pdfDocument.catalog.get(PDFName.of('Metadata'));
		if (!metadataRef) return null;

		const stream = this.pdfDocument.context.lookup(metadataRef);
		if (!(stream instanceof PDFStream)) {
			return null;
		}

		let bytes: Uint8Array;
		if (stream instanceof PDFRawStream) {
			const decoded = decodePDFRawStream(stream);
			bytes = decoded.getBytes(0) as Uint8Array;
		} else {
			bytes = stream.getContents();
		}

		const xmlString = new TextDecoder().decode(bytes);
		const xmpDocument = new XmpDocument(xmlString, baseIRI);

		return xmpDocument.serialise(format as RdfSerialisationFormat, options);
	}

	public setXmpMetadataPacket(rdfxml: string) {
		const bom = '\uFEFF';

		const xml = `<?xpacket begin="${bom}" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="${XmpDocument.NS_X}">${rdfxml}</x:xmpmeta>
<?xpacket end="w"?>`;

		const xmlBytes = new TextEncoder().encode(xml);
		const metadataStream = this.pdfDocument.context.stream(xmlBytes, {
			Type: PDFName.of('Metadata'),
			Subtype: PDFName.of('XML'),
		});
		const metadataStreamRef = this.pdfDocument.context.register(metadataStream);
		this.pdfDocument.catalog.set(PDFName.of('Metadata'), metadataStreamRef);
	}
}
