import {
	decodePDFRawStream,
	PDFDict,
	type PDFDocument,
	PDFName,
	PDFNumber,
	type PDFRef,
	PDFString,
} from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { FontEmbedOptions } from '../pdf-lab.js';
import { deriveFontFlags } from './derive-font-flags.js';
import type { OsType } from './load-font.js';
import { resolveFont } from './resolve-font.js';
import type { FontData, FontInfo } from './types.js';
import { GlyphBlock } from '../text/extract-glyphs.js';

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

	constructor(
		private readonly _pdfDoc: PDFDocument,
		private readonly _fontInfo: FontInfo,
		private readonly _glyphIds: Set<number>,
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

		const fontRef = this._fontInfo.ref;
		const fontDict = this.pdfDoc.context.lookupMaybe(fontRef, PDFDict);
		if (typeof fontDict === 'undefined') {
			throw new Error(`PDF has no font dictionary '${fontRef.toString()}'!`);
		}
		this._fontDict = fontDict;

		this.initialised = true;
	}

	public async embed() {
		await this.initialise();
		this.fontDict.set(PDFName.of('Subtype'), PDFName.of('TrueType'));
		const baseName = `${this.generateSubsetPrefix()}+${this.fontInfo.fontName}`;
		this.fontDict.set(PDFName.of('BaseFont'), PDFName.of(baseName));
		//this.fontDict.delete(PDFName.of('Encoding'));
this.fontDict.set(PDFName.of('Encoding'), PDFName.of('Identity-H'));

		this.fontDict.set(PDFName.of('FirstChar'), PDFNumber.of(0));
		this.fontDict.set(PDFName.of('LastChar'), PDFNumber.of(this.glyphIds.size));

		const metrics = this.extractMetrics();
		this.fontDict.set(
			PDFName.of('Widths'),
			this.pdfDoc.context.obj(metrics.widths),
		);

		this.includeGlyphs();

		const toUnicode = this.embedToUnicode();
		this.fontDict.set(PDFName.of('ToUnicode'), toUnicode);
		//this.fontDict.delete(PDFName.of('Encoding'));

		const fontDescriptor = await this.embedFontDescriptor(metrics, baseName);
		this.fontDict.set(PDFName.of('FontDescriptor'), fontDescriptor);

		this.recodeTextBlocks();

		/*

		const cidFontDict = await this.embedCIDFontDict();
		const descendantFonts = PDFArray.withContext(this.pdfDoc.context);
		descendantFonts.push(cidFontDict);
		this.fontDict.set(PDFName.of('DescendantFonts'), descendantFonts);
		*/
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
		const cmapStream = context.flateStream(cmap);

		return context.register(cmapStream);
	}

	private createToUnicode(): string {
		const numGlyphs = this.glyphIds.size;

		let glyphIdLength: number;
		let codeSpaceRange: string;
		if (numGlyphs <= 0xff) {
			glyphIdLength = 2;
			codeSpaceRange = '<00> <ff>'
		} else if (numGlyphs <= 0xffff) {
			glyphIdLength = 4;
			codeSpaceRange = '<0000> <ffff>'
		} else if (numGlyphs <= 0xffffff) {
			glyphIdLength = 6;
			codeSpaceRange = '<000000> <ffffff>'
		} else {
			glyphIdLength = 8;
			codeSpaceRange = '<00000000> <ffffffff>'
		}
glyphIdLength = 4;
codeSpaceRange = '<0000><ffff>';

		const mapper = this.fontInfo.glyphMapper;
		if (typeof mapper === 'undefined') {
			throw new Error(
				`The font '${this.fontInfo.fontName}' does not use a standard encoding and does not have a ToUnicode map!`,
			);
		}

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
${codeSpaceRange}
endcodespacerange
224 beginbfchar
`;

		let glyphId = 0;
		this.glyphIds.forEach((fromCodePoint) => {
			++glyphId;
			const codePoint = this.coerceCodePoints(mapper.lookupCodepoints(fromCodePoint));
			const hexCodePoint = `<${codePoint.toString(16).padStart(4, '0')}>`;
			const hexGlyphId = `<${glyphId.toString(16).padStart(glyphIdLength, '0')}>`;
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

		const mapper = this.fontInfo.glyphMapper;
		if (!mapper) {
			throw new Error('Cannot embed font without ToUnicode CMap!');
		}
		this.glyphIds.forEach((glyphId) => {
			const codePoint = this.coerceCodePoints(
				mapper?.lookupCodepoints(glyphId),
			);
			const glyph = this.font.glyphForCodePoint(codePoint);
			subset.includeGlyph(glyph);
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

	private async embedCIDFontDict(): Promise<PDFRef> {
		const context = this.pdfDoc.context;

		const metrics = this.extractMetrics();
		const fontDescriptorRef = await this.embedFontDescriptor(
			metrics,
			this.fontInfo.fontName ?? 'Unknown',
		);

		const cidFontDict = context.obj({
			Type: PDFName.of('Font'),
			Subtype: PDFName.of(this.isCFF() ? 'CIDFontType0' : 'CIDFontType2'),
			CIDToGIDMap: PDFName.of('Identity'),
			BaseFont: PDFName.of(this.fontInfo.baseFont ?? 'Unknown'),
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

	protected computeWidths(): number[] {
		const widths = [0];
		const mapper = this.fontInfo.glyphMapper!;
		this.glyphIds.forEach((glyphId) => {
			const codePoint = this.coerceCodePoints(mapper.lookupCodepoints(glyphId));
			const glyph = this.font.glyphForCodePoint(codePoint);

			widths.push(glyph.advanceWidth);
		});

		return widths;
	}

	private computeCIDWidths(): (number | number[])[] {
		const glyphs: fontkit.Glyph[] = [];
		this.glyphIds.forEach((glyphId) => {
			glyphs.push(this.font.getGlyph(glyphId));
		});

		const widths: (number | number[])[] = [];
		let currSection: number[] = [];

		for (let idx = 0, len = glyphs.length; idx < len; idx++) {
			const currGlyph = glyphs[idx];
			const prevGlyph = glyphs[idx - 1];

			const currGlyphId = this.glyphId(currGlyph);
			const prevGlyphId = this.glyphId(prevGlyph);

			if (idx === 0) {
				widths.push(currGlyphId);
			} else if (currGlyphId - prevGlyphId !== 1) {
				widths.push(currSection);
				widths.push(currGlyphId);
				currSection = [];
			}

			currSection.push(currGlyph!.advanceWidth * this.scale);
		}

		widths.push(currSection);

		return widths;
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
			//XHeight: PDFNumber.of((this.font.xHeight || 0) * scale),
			StemV: PDFNumber.of(80),
			[this.isCFF() ? 'FontFile3' : 'FontFile2']: fontStreamRef,
		});

		return context.register(fontDescriptor);
	}

	private glyphId(glyph?: fontkit.Glyph): number {
		return glyph ? glyph.id : -1;
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

	private recodeTextBlocks() {
		// It is crucial to recode the text blocks in reverse order. Otherwise,
		// the offsets will change while recoding.
		// FIXME! Group by stream!
		this.glyphBlocks.reverse().forEach(block => { this.recodeStream([block]) });
	}

	private recodeStream(blocks: GlyphBlock[]) {
		const first = blocks[0];
		if (!first) return;

		const stream = first.stream;
		const decoded = decodePDFRawStream(stream);
		const bytes = decoded.getBytes(0);

		const decoder = new TextDecoder('latin1');

		const out: number[] = [];
		let cursor = 0;

		for (const block of blocks) {
			// 1. copy everything before this block
			if (block.offset > cursor) {
			out.push(...bytes.slice(cursor, block.offset));
			}

			// 2. extract original PDF string
			const raw = decoder.decode(
			bytes.slice(block.offset, block.offset + block.length)
			);

			// 3. replace it
			const replaced = this.recodePDFString(raw);

			// 4. write replacement (latin1-safe)
			for (let i = 0; i < replaced.length; i++) {
			out.push(replaced.charCodeAt(i) & 0xff);
			}

			cursor = block.offset + block.length;
		}

		// 5. append remaining tail
		if (cursor < bytes.length) {
			out.push(...bytes.slice(cursor));
		}

		const newBytes = new Uint8Array(out);

		stream.updateContents(newBytes);
		stream.dict.delete(PDFName.of('Filter'));
	}

	private recodePDFString(pdfString: string): string {
		return '<01>';
	}
}
