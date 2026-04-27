import { isStandardFont, type PDFRef, StandardFonts } from '@cantoo/pdf-lib';
import type { CMapMapper } from '../encoding/mappers/cmap-mapper.js';
import { FontLoader, type OsType } from './font-loader.js';

export type FontCategory =
	| 'sans'
	| 'serif'
	| 'mono'
	| 'symbol'
	| 'zapfdingbats';
export type FontWeight = 'normal' | 'bold';
export type FontStyle = 'roman' | 'italic';
export type FontDescription = {
	category: FontCategory;
	weight: FontWeight;
	style: FontStyle;
	standardName?: StandardFonts;
};

export type FontMap = Record<
	string,
	string | ArrayBuffer | Uint8Array<ArrayBufferLike>
>;

// FIXME! That does not fit here!
const encodings = [
	'StandardEncoding',
	'MacRomanEncoding',
	'WinAnsiEncoding',
	'MacExpertEncoding',
	'SymbolEncoding',
	'ZapfDingbatsEncoding',
] as const;
export type Encoding = (typeof encodings)[number];

export type FontSubtype =
	| 'Type0'
	| 'Type1'
	| 'MMType1'
	| 'Type3'
	| 'TrueType'
	| 'CIDFontType0'
	| 'CIDFontType2';

/**
 * Information about a font.
 */
export type FontInfo = {
	/**
	 * The BaseFont. This often contains subset identifiers or a numbered
	 * suffix.
	 */
	baseFont: string;
	/**
	 * The normalized font name without the subset identifier or numbered
	 * suffix.
	 */
	fontName: string;
	/**
	 * The reference to the font dictionary.
	 */
	ref: PDFRef;
	/**
	 * The indicator for embedded fonts.
	 */
	embedded: boolean;
	/**
	 * The optional encoding.
	 */
	encoding?: Encoding;
	// FIXME! This should become a type GlyphMapper.
	/**
	 * The optional glyph mapper.
	 */
	cmapMapper?: CMapMapper;
	/**
	 * The font subtype.
	 */
	subtype: FontSubtype;
};

const FontDescriptionByName: Record<string, FontDescription> = {
	helvetica: {
		category: 'sans',
		weight: 'normal',
		style: 'roman',
		standardName: StandardFonts.Helvetica,
	},
	'helvetica-oblique': {
		category: 'sans',
		weight: 'normal',
		style: 'italic',
		standardName: StandardFonts.HelveticaOblique,
	},
	'helvetica-bold': {
		category: 'sans',
		weight: 'bold',
		style: 'roman',
		standardName: StandardFonts.HelveticaBold,
	},
	'helvetica-boldoblique': {
		category: 'sans',
		weight: 'bold',
		style: 'italic',
		standardName: StandardFonts.HelveticaBoldOblique,
	},
	times: {
		category: 'serif',
		weight: 'normal',
		style: 'roman',
		standardName: StandardFonts.TimesRoman,
	},
	'times-italic': {
		category: 'serif',
		weight: 'normal',
		style: 'italic',
		standardName: StandardFonts.TimesRomanItalic,
	},
	'times-bold': {
		category: 'serif',
		weight: 'bold',
		style: 'roman',
		standardName: StandardFonts.TimesRomanBold,
	},
	'times-bolditalic': {
		category: 'serif',
		weight: 'bold',
		style: 'italic',
		standardName: StandardFonts.TimesRomanBoldItalic,
	},
	courier: {
		category: 'mono',
		weight: 'normal',
		style: 'roman',
		standardName: StandardFonts.Courier,
	},
	'courier-oblique': {
		category: 'mono',
		weight: 'normal',
		style: 'italic',
		standardName: StandardFonts.CourierOblique,
	},
	'courier-bold': {
		category: 'mono',
		weight: 'bold',
		style: 'roman',
		standardName: StandardFonts.CourierBold,
	},
	'courier-boldoblique': {
		category: 'mono',
		weight: 'bold',
		style: 'italic',
		standardName: StandardFonts.CourierBoldOblique,
	},
	symbol: {
		category: 'symbol',
		weight: 'normal',
		style: 'roman',
		standardName: StandardFonts.Symbol,
	},
	zapfdingbats: {
		category: 'zapfdingbats',
		weight: 'normal',
		style: 'roman',
		standardName: StandardFonts.ZapfDingbats,
	},
};

const FontMatrix: Record<
	FontCategory,
	Record<FontWeight, Record<FontStyle, string>>
> = {
	sans: {
		normal: {
			roman: 'helvetica',
			italic: 'helvetica-oblique',
		},
		bold: {
			roman: 'helvetica-bold',
			italic: 'helvetica-boldoblique',
		},
	},
	serif: {
		normal: {
			roman: 'times-roman',
			italic: 'times-italic',
		},
		bold: {
			roman: 'times-bold',
			italic: 'times-bolditalic',
		},
	},
	mono: {
		normal: {
			roman: 'courier',
			italic: 'courier-oblique',
		},
		bold: {
			roman: 'courier-bold',
			italic: 'courier-boldoblique',
		},
	},
	symbol: {
		normal: {
			roman: 'symbol',
			italic: 'symbol',
		},
		bold: {
			roman: 'symbol',
			italic: 'symbol',
		},
	},
	zapfdingbats: {
		normal: {
			roman: 'zapfdingbats',
			italic: 'zapfdingbats',
		},
		bold: {
			roman: 'zapfdingbats',
			italic: 'zapfdingbats',
		},
	},
};

const FontFamilyAliases: Record<string, FontCategory> = {
	// Sans-serif.
	arial: 'sans',
	helvetica: 'sans',
	liberationsans: 'sans',
	'dejavu sans': 'sans',
	dejavusans: 'sans',
	calibri: 'sans',
	verdana: 'sans',
	tahoma: 'sans',
	segoeui: 'sans',
	roboto: 'sans',
	opensans: 'sans',
	'noto sans': 'sans',
	notosans: 'sans',
	// Serif.
	times: 'serif',
	timesnewroman: 'serif',
	'times new roman': 'serif',
	georgia: 'serif',
	garamond: 'serif',
	palatino: 'serif',
	bookantiqua: 'serif',
	cambria: 'serif',
	liberationserif: 'serif',
	'noto serif': 'serif',
	notoserif: 'serif',
	// Monospace.
	courier: 'mono',
	couriernew: 'mono',
	'courier new': 'mono',
	consolas: 'mono',
	lucidaconsole: 'mono',
	liberationmono: 'mono',
	'dejavu sans mono': 'mono',
	dejavusansmono: 'mono',
	'noto mono': 'mono',
	notomono: 'mono',
} as const;

export class FontResolver {
	private readonly fontMap: FontMap = {};
	private readonly fontLoader: FontLoader;

	constructor(platform: string | undefined, fontMap: FontMap) {
		this.fontLoader = new FontLoader(platform as OsType);

		for (const name in fontMap) {
			this.fontMap[name.toLowerCase()] = fontMap[name]!;
		}
	}

	static isStandardEncoding(encoding: string): boolean {
		return encodings
			.map((e) => e.toLocaleLowerCase())
			.includes(encoding.toLowerCase());
	}

	async resolve(fontName: string): Promise<string | Uint8Array | ArrayBuffer> {
		const canonicalName = this.canonicalName(fontName);
		if (Object.hasOwn(this.fontMap, canonicalName.toLowerCase())) {
			const data = this.fontMap[canonicalName.toLowerCase()];
			if (typeof data === 'string') {
				this.fontMap[canonicalName.toLowerCase()] =
					await this.fontLoader.loadFromPath(canonicalName, data);
			}

			return this.fontMap[canonicalName.toLowerCase()]!;
		}

		const description = this.parseName(fontName);
		const searchList = this.createSearchList(description);

		for (let i = 0; i < searchList.length; ++i) {
			const desc = searchList[i]!;
			const tryName = FontMatrix[desc.category][desc.weight][desc.style];
			if (Object.hasOwn(this.fontMap, tryName)) {
				const data = this.fontMap[tryName];
				if (typeof data === 'string') {
					this.fontMap[tryName] = await this.fontLoader.loadFromPath(
						fontName,
						data,
					);
				}

				return this.fontMap[tryName]!;
			}

			const fontBytes = await this.fontLoader.load(desc, fontName);
			if (typeof fontBytes !== 'undefined') return fontBytes;
		}

		throw new Error(
			`The font '${fontName}' is not embedded, no replacement font has been specified, and no fallback font has been found.`,
		);
	}

	private canonicalName(name: string): string {
		// Strip subset prefix (ABCDEF+).
		name = name.replace(/^[A-Z]{6}\+/, '');

		// Strip numerical suffix.
		name = name.replace(/-[0-9]+$/, '');

		return name;
	}

	private parseName(name: string): FontDescription {
		name = this.canonicalName(name);

		if (isStandardFont(name)) {
			return FontDescriptionByName[name.toLowerCase()]!;
		}

		// Heuristic parse.
		const lname = name.toLowerCase();
		const weight: FontWeight = lname.includes('bold') ? 'bold' : 'normal';
		const style: FontStyle =
			lname.includes('italic') || lname.includes('oblique')
				? 'italic'
				: 'roman';

		// Strip weight/style tokens to isolate family
		let family = name.replace(
			/[-,]?(Bold|Italic|Oblique|Regular|Medium|Light|Semi|Demi|Extra|Condensed|MT|PS)/gi,
			'',
		);

		family = family.replace(/^-+|-+$/g, '').trim();

		const familyLower = family.toLowerCase().replace(/[\s-]/g, '');

		let category: FontCategory | undefined = FontFamilyAliases[familyLower];

		if (!category) {
			category = FontFamilyAliases[family.toLowerCase()];
		}

		if (!category) {
			category = 'sans';
		}

		return { category, weight, style };
	}

	private createSearchList(desc: FontDescription): FontDescription[] {
		const searchList: FontDescription[] = [desc];

		// These cannot be replaced.
		if (desc.category === 'symbol' || desc.category === 'zapfdingbats') {
			const standardName =
				desc.category === 'symbol'
					? StandardFonts.Symbol
					: StandardFonts.ZapfDingbats;
			return [
				{
					category: desc.category,
					weight: 'normal',
					style: 'roman',
					standardName,
				},
			];
		}

		for (const weight of ['normal', 'bold']) {
			if (desc.weight === weight) continue;
			for (const style in ['roman', 'itallic']) {
				if (desc.style === style) continue;
				for (const category in ['sans', 'serif', 'mono']) {
					if (desc.category === category) continue;
					searchList.push({ category, weight, style } as FontDescription);
				}
			}
		}

		return searchList;
	}
}
