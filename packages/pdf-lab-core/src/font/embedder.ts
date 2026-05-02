import { PDFDict, PDFName, type PDFDocument } from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { FontEmbedOptions } from '../pdf-lab.js';
import { resolveFont } from './resolve-font.js';
import type { FontData, FontInfo } from './types.js';

export type SubType = 'Type0';
export abstract class FontEmbedder {
	private initialised = false;
	private _fontData: Uint8Array | undefined;
	private _font: fontkit.Font;
	private _isTTC = false;
	private _fontDict: PDFDict;

	constructor(
		protected readonly _pdfDoc: PDFDocument,
		protected readonly _fontInfo: FontInfo,
		protected readonly _glyphIds: Set<number>,
		protected readonly _options: FontEmbedOptions,
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
		return this._fontDict;
	}

	public abstract get subType(): SubType;

	public async embed() {
		await this.initialise();
		this.fontDict.set(PDFName.of('SubType'), PDFName.of(this.subType));
	}

	private async initialise() {
		if (this.initialised) return;

		const fontData = await this.resolveFont();
		const source = fontData.source as Uint8Array;
		this._fontData = source;

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

	private async resolveFont(): Promise<FontData> {
		return await resolveFont(
			this.fontInfo.fontName ?? 'sans',
			this.options.fontMap,
			this.options.fcMatch,
		);
	}
}
