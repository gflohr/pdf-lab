import {
	PDFArray,
	PDFDict,
	type PDFDocument,
	PDFName,
	PDFNumber,
	type PDFRef,
	PDFString,
} from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { GlyphMapper } from '../encoding/mappers/glyph-mapper.js';
import { OverlayMapper } from '../encoding/mappers/overlay-mapper.js';
import type { Encoding } from '../encoding/types.js';
import { isStandardEncoding } from '../encoding/util/is-standard-encoding.js';
import { octetsToGlyphIds } from '../encoding/util/octets-to-glyph-ids.js';
import { LiteralParser } from '../parser/literal-parser.js';
import type { FontEmbedOptions } from '../pdf-lab.js';
import type { GlyphBlock } from '../text/extract-glyphs.js';
import { deriveFontFlags } from './derive-font-flags.js';
import type { OsType } from './load-font.js';
import { resolveFont } from './resolve-font.js';
import type { FontData, FontInfo, PatchSet } from './types.js';

type Metrics = {
	bbox: number[];
	ascent: number;
	descent: number;
	capHeight: number;
	italicAngle: number;
	widths: (number | number[])[];
};

export abstract class FontEmbedder {
	private initialised = false;
	private _isTTC = false;
	private _fontDict: PDFDict | undefined;
	private _font: fontkit.Font | undefined;
	private _subset: fontkit.Subset | undefined;
	private _scale: number | undefined;
	private _glyphIds = new Set<number>();
	private _glyphs: fontkit.Glyph[] = [];
	private _glyphMapping: Record<string, number> = {};
	private _glyphMapper: GlyphMapper;

	constructor(
		private readonly _pdfDoc: PDFDocument,
		private readonly _fontInfo: FontInfo,
		private readonly _glyphBlocks: GlyphBlock[],
		private readonly _options: FontEmbedOptions,
	) {
		if (!this.options.fontkit) {
			throw new Error(
				'You have to pass a fontkit instance in the embed options!',
			);
		}

		const fontRef = this.fontInfo.ref;
		const fontDict = this.pdfDoc.context.lookupMaybe(fontRef, PDFDict);
		if (!fontDict) {
			throw new Error(`PDF has no font dictionary '${fontRef.toString()}'!`);
		}

		// Determine the glyph mapper in use. Edge case: It is possible that
		// a document uses a Type1 font and additionally has a ToUnicode
		// table. In that case, the glyphs are selected based on the encoding
		// only. But when extracting text, the ToUnicode CMap acts as an
		// overlay. That has the absurd consequence that, when you copy and
		// paste text from the PDF, the copied text differs from the text
		// rendered.
		//
		// In the new document with the embedded font, this is no longer
		// possible. The rendered glyphs always correspond to the textual
		// content. In this case, we let the visual representation "win" and
		// ignore a possible ToUnicode table.
		//
		// You can see such a case in the file assets/pdfs/mixed-content.pdf.
		// It renders the string "price: $5", but when you copy and paste
		// it, the text is German, and the price has changed.
		if (isStandardEncoding(this.fontInfo.encodingMapper.name)) {
			this._glyphMapper = this.fontInfo.encodingMapper;
		} else if (this.fontInfo.toUnicodeMapper) {
			this._glyphMapper = this.fontInfo.toUnicodeMapper;
		} else {
			const fontName = this.fontInfo.baseFont ?? '[unknown font]';
			const fontRef = this.fontInfo.ref.toString();
			throw new Error(
				`Cannot embed font '${fontName}' (object: ${fontRef}) without a ToUnicode CMap.`,
			);
		}

		// Convert the byte streams of the extracted glyphs to glyph ids.
		this.glyphBlocks.forEach((block) => {
			const glyphIds = octetsToGlyphIds(block.glyphs, this.glyphMapper);
			const decodedGlyphIds =
				block.type === 'lstring'
					? new LiteralParser(this.glyphMapper.name as Encoding).parse(glyphIds)
					: glyphIds;

			decodedGlyphIds.forEach((glyphId) => {
				this.glyphIds.add(glyphId);
			});
		});
	}

	private get pdfDoc(): PDFDocument {
		return this._pdfDoc;
	}

	private get isTTC(): boolean {
		return this._isTTC;
	}

	private get fontInfo(): FontInfo {
		return this._fontInfo;
	}

	private get options(): FontEmbedOptions {
		return this._options;
	}

	private get fontDict(): PDFDict {
		return this._fontDict!;
	}

	private get glyphIds(): Set<number> {
		return this._glyphIds;
	}

	private get font(): fontkit.Font {
		return this._font!;
	}

	private get subset(): fontkit.Subset {
		return this._subset!;
	}

	private get scale(): number {
		return this._scale!;
	}

	private get glyphBlocks(): GlyphBlock[] {
		return this._glyphBlocks;
	}

	private get glyphs(): fontkit.Glyph[] {
		return this._glyphs;
	}

	private get glyphMapping(): Record<string, number> {
		return this._glyphMapping;
	}

	private get glyphMapper(): GlyphMapper {
		return this._glyphMapper;
	}

	private async initialise() {
		if (this.initialised) return;

		const fontData = await this.resolveFont();
		const source = fontData.source as Uint8Array;

		this._isTTC =
			source[0] === 0x74 &&
			source[1] === 0x74 &&
			source[2] === 0x63 &&
			source[3] === 0x66;

		this._font = this.isTTC
			? fontkit.create(source, fontData.postScriptName)
			: fontkit.create(source as Uint8Array);
		this._subset = this.font.createSubset();
		this._scale = 1000 / this.font.unitsPerEm;

		this.includeGlyphs();

		const fontRef = this._fontInfo.ref;
		const fontDict = this.pdfDoc.context.lookupMaybe(fontRef, PDFDict);
		if (typeof fontDict === 'undefined') {
			throw new Error(`PDF has no font dictionary '${fontRef.toString()}'!`);
		}
		this._fontDict = fontDict;

		this.initialised = true;
	}

	public async embed(): Promise<PatchSet[]> {
		await this.initialise();
		this.fontDict.set(PDFName.of('Subtype'), PDFName.of('Type0'));
		const subsetPrefix = this.generateSubsetPrefix();
		const baseFontName = `${subsetPrefix}+${this.fontInfo.fontName ?? 'Unknown'}`;
		this.fontDict.set(PDFName.of('BaseFont'), PDFName.of(baseFontName));
		this.fontDict.set(PDFName.of('Encoding'), PDFName.of('Identity-H'));

		const toUnicode = this.embedToUnicode();
		this.fontDict.set(PDFName.of('ToUnicode'), toUnicode);

		const patchSets = this.recodeGlyphBlocks();

		const cidFontDict = await this.embedCIDFontDict(baseFontName);
		const descendantFonts = PDFArray.withContext(this.pdfDoc.context);
		descendantFonts.push(cidFontDict);
		this.fontDict.set(PDFName.of('DescendantFonts'), descendantFonts);

		return patchSets;
	}

	private async resolveFont(): Promise<FontData> {
		return await resolveFont(
			this.fontInfo.fontName ?? 'sans',
			this.options.fontMap,
			this.options.fcMatch,
			this.options.platform as OsType,
		);
	}

	private embedToUnicode(): PDFRef {
		const cmap = this.createToUnicode();

		const context = this.pdfDoc.context;
		// FIXME! Only compress, when requested!
		const cmapStream = context.flateStream(cmap);

		return context.register(cmapStream);
	}

	private createToUnicode(): string {
		const mapper = new OverlayMapper(
			this.fontInfo.encodingMapper,
			this.fontInfo.toUnicodeMapper,
		);

		let cmap = `/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
  /Registry (Adobe)
  /Ordering (UCS)
  /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<0000> <ffff>
endcodespacerange
${this.glyphIds.size} beginbfchar
`;

		let glyphId = 0;
		this.glyphIds.forEach((fromCodePoint) => {
			++glyphId;
			const codePoint = this.coerceCodePoints(
				mapper.lookupCodePoints(fromCodePoint),
			);
			const hexCodePoint = `<${codePoint.toString(16).padStart(4, '0')}>`;
			const hexGlyphId = `<${glyphId.toString(16).padStart(4, '0')}>`;
			cmap += `${hexGlyphId} ${hexCodePoint}\n`;
		});

		cmap += `endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
`;
		return cmap;
	}

	protected coerceCodePoints(cps: number[] | undefined): number {
		if (!cps?.length) {
			return 0;
		} else if (cps.length === 1) {
			return cps[0]!;
		} else {
			// Ligature?
			const asText = cps.map((cp) => String.fromCodePoint(cp)).join('');
			switch (asText) {
				case 'DZ':
					return 0x01f1;
				case 'Dz':
					return 0x01f2;
				case 'dz':
					return 0x01f3;
				case 'ff':
					return 0xfb00;
				case 'fi':
					return 0xfb01;
				case 'fl':
					return 0xfb02;
				case 'ffi':
					return 0xfb03;
				case 'ffl':
					return 0xfb04;
				case 'st':
					return 0xfb06;
				default:
					return cps[0]!; // Better than nothing.
			}
		}
	}

	protected includeGlyphs() {
		const subset = this.subset;

		let newGlyphId = 0;
		this.glyphIds.forEach((glyphId) => {
			const codePoint = this.coerceCodePoints(
				this.glyphMapper.lookupCodePoints(glyphId),
			);
			const glyph = this.font.glyphForCodePoint(codePoint);
			subset.includeGlyph(glyph);
			this.glyphs.push(glyph);
			this.glyphMapping[glyphId] = ++newGlyphId;
		});
	}

	private async serializeSubset(): Promise<Uint8Array> {
		const subset = this.subset;
		return new Promise((resolve, reject) => {
			const parts: Uint8Array[] = [];
			subset
				.encodeStream()
				.on('data', (bytes) => parts.push(bytes))
				.on('end', () => resolve(this.mergeUint8Arrays(parts)))
				// biome-ignore lint/suspicious/noExplicitAny: TODO!
				.on('error' as any, (err) => reject(err));
		});
	}

	private mergeUint8Arrays(arrays: Uint8Array[]): Uint8Array {
		let totalSize = 0;
		for (let idx = 0, len = arrays.length; idx < len; idx++) {
			totalSize += arrays[idx]!.length;
		}

		const mergedBuffer = new Uint8Array(totalSize);
		let offset = 0;
		for (let idx = 0, len = arrays.length; idx < len; idx++) {
			const array = arrays[idx];
			mergedBuffer.set(array!, offset);
			offset += array!.length;
		}

		return mergedBuffer;
	}

	private async embedFontStream(): Promise<PDFRef> {
		const context = this.pdfDoc.context;
		const fontStream = context.flateStream(await this.serializeSubset(), {
			Subtype: this.isCFF() ? 'CIDFontType0C' : undefined,
		});

		return context.register(fontStream);
	}

	private isCFF(): boolean {
		return (this.subset as unknown as { cff: boolean }).cff;
	}

	private async embedCIDFontDict(baseFontName: string): Promise<PDFRef> {
		const context = this.pdfDoc.context;

		const metrics = this.extractMetrics();
		const fontDescriptorRef = await this.embedFontDescriptor(
			metrics,
			baseFontName,
		);

		const cidFontDict = context.obj({
			Type: PDFName.of('Font'),
			Subtype: PDFName.of(this.isCFF() ? 'CIDFontType0' : 'CIDFontType2'),
			CIDToGIDMap: PDFName.of('Identity'),
			BaseFont: PDFName.of(baseFontName),
			CIDSystemInfo: {
				Registry: PDFString.of('Adobe'),
				Ordering: PDFString.of('Identity'),
				Supplement: 0,
			},
			FontDescriptor: fontDescriptorRef,
			W: metrics.widths,
		});

		return context.register(cidFontDict);
	}

	private extractMetrics(): Metrics {
		const font = this.font;

		const bbox = [
			this.scale * font.bbox.minX,
			this.scale * font.bbox.minY,
			this.scale * font.bbox.maxX,
			this.scale * font.bbox.maxY,
		];

		const ascent = this.scale * font.ascent;
		const descent = this.scale * font.descent;

		const capHeight = font.capHeight ? this.scale * font.capHeight : ascent;

		const italicAngle = font.italicAngle || 0;

		const widths = this.computeWidths();

		return {
			bbox,
			ascent,
			descent,
			capHeight,
			italicAngle,
			widths,
		};
	}

	protected computeWidths(): (number | number[])[] {
		return [1, this.glyphs.map((glyph) => glyph.advanceWidth * this.scale)];
	}

	protected async embedFontDescriptor(
		metrics: Metrics,
		fontName: string,
	): Promise<PDFRef> {
		const context = this.pdfDoc.context;
		const fontStreamRef = await this.embedFontStream();

		const scale = 1000 / this.font.unitsPerEm;

		const fontDescriptor = context.obj({
			Type: 'FontDescriptor',
			FontName: fontName,
			Flags: deriveFontFlags(this.font),
			FontBBox: context.obj(metrics.bbox),
			ItalicAngle: PDFNumber.of(metrics.italicAngle),
			Ascent: PDFNumber.of(metrics.ascent),
			Descent: PDFNumber.of(metrics.descent),
			CapHeight: PDFNumber.of(metrics.capHeight),
			XHeight: PDFNumber.of((this.font.xHeight || 0) * scale),
			StemV: PDFNumber.of(80),
			[this.isCFF() ? 'FontFile3' : 'FontFile2']: fontStreamRef,
		});

		return context.register(fontDescriptor);
	}

	// FIXME! Check for collisions!
	private generateSubsetPrefix(): string {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';

		for (let i = 0; i < 6; i++) {
			result += chars[Math.floor(Math.random() * chars.length)];
		}

		return result;
	}

	private recodeGlyphBlocks(): PatchSet[] {
		const patchSets: PatchSet[] = [];

		for (const block of this.glyphBlocks) {
			patchSets.push(this.recodeGlyphBlock(block));
		}

		return patchSets;
	}

	private recodeGlyphBlock(block: GlyphBlock): PatchSet {
		const glyphIds = octetsToGlyphIds(block.glyphs, this.glyphMapper);
		const decodedGlyphIds =
			block.type === 'lstring'
				? new LiteralParser(this.glyphMapper.name as Encoding).parse(glyphIds)
				: glyphIds;

		const hexstring = this.recodePDFString(decodedGlyphIds);

		return {
			streamId: block.streamId,
			offset: block.offset,
			length: block.length,
			hexstring,
		};
	}

	private recodePDFString(glyphs: number[]): number[] {
		const hexstring =
			'<' +
			glyphs
				.map((id) => this.glyphMapping[id]!)
				.map((id) => id.toString(16).padStart(4, '0'))
				.join('') +
			'>';

		const out: number[] = [];
		for (let i = 0; i < hexstring.length; ++i) {
			out.push(hexstring[i]!.charCodeAt(0));
		}

		return out;
	}
}
