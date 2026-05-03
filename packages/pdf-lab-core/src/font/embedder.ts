import { PDFArray, PDFDict, type PDFDocument, PDFName, PDFNumber, PDFRef, PDFString } from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { FontEmbedOptions } from '../pdf-lab.js';
import { resolveFont } from './resolve-font.js';
import type { FontData, FontInfo } from './types.js';
import { StandardEncodings } from '../encoding/types.js';
import { deriveFontFlags } from './derive-font-flags.js';

export type SubType = 'Type0';

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

	protected get pdfDoc(): PDFDocument {
		return this._pdfDoc;
	}

	private get isTTC(): boolean {
		return this._isTTC;
	}

	protected get fontInfo(): FontInfo {
		return this._fontInfo;
	}

	private get options(): FontEmbedOptions {
		return this._options;
	}

	protected get fontDict(): PDFDict {
		return this._fontDict!;
	}

	protected get glyphIds(): Set<number> {
		return this._glyphIds;
	}

	protected get font(): fontkit.Font {
		return this._font!;
	}

	protected get subset(): fontkit.Subset {
		return this._subset!;
	}

	protected get scale(): number {
		return this._scale!;
	}

	protected abstract get subType(): SubType;

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
		this.fontDict.set(PDFName.of('Subtype'), PDFName.of('Type0'));
		this.fontDict.set(PDFName.of('Encoding'), PDFName.of('Identity-H'));

		this.includeGlyphs();

		const toUnicode = this.embedToUnicode();
		if (toUnicode) this.fontDict.set(PDFName.of('ToUnicode'), toUnicode);

		const cidFontDict = await this.embedCIDFontDict();
		const descendantFonts = PDFArray.withContext(this.pdfDoc.context);
		descendantFonts.push(cidFontDict);
		this.fontDict.set(PDFName.of('DescendantFonts'), descendantFonts);
	}

	private async resolveFont(): Promise<FontData> {
		return await resolveFont(
			this.fontInfo.fontName ?? 'sans',
			this.options.fontMap,
			this.options.fcMatch,
		);
	}

	protected embedToUnicode(): PDFRef | undefined { return }

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

	protected createToUnicode(): string {
		const mapper = this.fontInfo.glyphMapper;
		if (typeof mapper === 'undefined') {
			throw new Error(
				`The font '${this.fontInfo.fontName}' does not use a standard encoding and does not have a ToUnicode map!`,
			);
		}

		const glyphIds = this.glyphIds;

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
${glyphIds.size} beginbfchar
`;

		let i = 0;
		glyphIds.forEach((glyphId) => {
			++i;
			const codepoint = this.coerceCodePoints(mapper.lookupCodepoints(glyphId));
			const hexCodePoint = `<${codepoint.toString(16).padStart(4, '0')}>`;
			const hexGlyphId = `<${i.toString(16).padStart(4, '0')}>`;
			cmap += `${hexGlyphId} ${hexCodePoint}\n`;
		});

		cmap += `endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
`;
		return cmap;
	}

	protected includeGlyphs() {
		const subset = this.subset;
		const mapping: Record<string, number> = { '0': 0 };
		const subsetGlyphs = [0];

		const mapper = this.fontInfo.glyphMapper;
		if (!mapper) {
			throw new Error('Cannot embed font without ToUnicode CMap!');
		}
		this.glyphIds.forEach((glyphId) => {
			const codePoint = this.coerceCodePoints(mapper?.lookupCodepoints(glyphId));
			const glyph = this.font.glyphForCodePoint(codePoint);
			subsetGlyphs.push(glyph.id);
			mapping[codePoint] = glyphId;
		});

		// Ouch.
		(subset as unknown as { mapping: Record<string, number> }).mapping =
			mapping;
		(subset as unknown as { glyphs: number[] }).glyphs = subsetGlyphs;
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
		const fontDescriptorRef = await this.embedFontDescriptor(metrics);

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
		const unitsPerEm = font.unitsPerEm;

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

	private computeWidths(): (number | number[])[] {
		const glyphs: fontkit.Glyph[] = [];
		this.glyphIds.forEach(glyphId => { glyphs.push(this.font.getGlyph(glyphId)) });

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

	protected async embedFontDescriptor(metrics: Metrics): Promise<PDFRef> {
		const context = this.pdfDoc.context;
		const fontStreamRef = await this.embedFontStream();

		const scale = 1000 / this.font.unitsPerEm;

		const fontDescriptor = context.obj({
			Type: 'FontDescriptor',
			FontName: this.fontInfo.baseFont,
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

	private glyphId(glyph?: fontkit.Glyph): number {
		return glyph ? glyph.id : -1;
	}
}
