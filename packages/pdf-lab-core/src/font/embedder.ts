import { PDFDict, type PDFDocument, PDFName } from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { FontEmbedOptions } from '../pdf-lab.js';
import { resolveFont } from './resolve-font.js';
import type { FontData, FontInfo } from './types.js';
import { StandardEncodings } from '../encoding/types.js';

export type SubType = 'Type0';
export abstract class FontEmbedder {
	private initialised = false;
	private _font: fontkit.Font;
	private _isTTC = false;
	private _fontDict: PDFDict | undefined;

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
		this.fontDict.set(PDFName.of('SubType'), PDFName.of(this.subType));
		this.fontDict.set(PDFName.of('Encoding'), PDFName.of('Identity-H'));

		this.embedToUnicode();
	}

	private async resolveFont(): Promise<FontData> {
		return await resolveFont(
			this.fontInfo.fontName ?? 'sans',
			this.options.fontMap,
			this.options.fcMatch,
		);
	}

	protected embedToUnicode() {
		// All embedders but the Type1 embedder must not touch an existing
		// ToUnicode map, unless they have an encoding that is not a standard
		// encoding.
		if (this.fontInfo.encoding && StandardEncodings.includes(this.fontInfo.encoding)) {
			const cmap = this.createToUnicode();

			const context = this.pdfDoc.context;
			const cmapStream = context.flateStream(cmap);

			const ref = context.register(cmapStream);
			this.fontDict.set(PDFName.of('ToUnicode'), ref);
		}
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
}
