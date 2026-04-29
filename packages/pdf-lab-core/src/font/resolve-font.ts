import { isStandardFont, type PDFRef, StandardFonts } from '@cantoo/pdf-lib';
import type { CMapMapper } from '../encoding/mappers/cmap-mapper.js';
import { type Encoding, StandardEncodings } from './../encoding/types.js';
import { fcMatch } from './fc-match.js';
import { loadFont, loadFontFromPath, type OsType } from './load-font.js';
import type { FontData, FontMap } from './types.js';
import { fontName } from './util/font-name.js';

export type FontCategory =
	| 'sans'
	| 'serif'
	| 'mono'
	| 'symbol'
	| 'zapfdingbats';
export type FontWeight = 'normal' | 'bold';
export type FontStyle = 'roman' | 'italic';
export type FontWidth = 'condensed' | 'normal' | 'expanded';
export type FontDescription = {
	fontName: string;
	category: FontCategory;
	weight: FontWeight;
	style: FontStyle;
	width: FontWidth;
	standardName?: StandardFonts;
};

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
		width: 'normal',
		fontName: StandardFonts.Helvetica,
		standardName: StandardFonts.Helvetica,
	},
	'helvetica-oblique': {
		category: 'sans',
		weight: 'normal',
		style: 'italic',
		width: 'normal',
		fontName: StandardFonts.HelveticaOblique,
		standardName: StandardFonts.HelveticaOblique,
	},
	'helvetica-bold': {
		category: 'sans',
		weight: 'bold',
		style: 'roman',
		width: 'normal',
		fontName: StandardFonts.HelveticaBold,
		standardName: StandardFonts.HelveticaBold,
	},
	'helvetica-boldoblique': {
		category: 'sans',
		weight: 'bold',
		style: 'italic',
		width: 'normal',
		fontName: StandardFonts.HelveticaBoldOblique,
		standardName: StandardFonts.HelveticaBoldOblique,
	},
	times: {
		category: 'serif',
		weight: 'normal',
		style: 'roman',
		width: 'normal',
		fontName: StandardFonts.TimesRoman,
		standardName: StandardFonts.TimesRoman,
	},
	'times-italic': {
		category: 'serif',
		weight: 'normal',
		style: 'italic',
		width: 'normal',
		fontName: StandardFonts.TimesRomanItalic,
		standardName: StandardFonts.TimesRomanItalic,
	},
	'times-bold': {
		category: 'serif',
		weight: 'bold',
		style: 'roman',
		width: 'normal',
		fontName: StandardFonts.TimesRomanBold,
		standardName: StandardFonts.TimesRomanBold,
	},
	'times-bolditalic': {
		category: 'serif',
		weight: 'bold',
		style: 'italic',
		width: 'normal',
		fontName: StandardFonts.TimesRomanBoldItalic,
		standardName: StandardFonts.TimesRomanBoldItalic,
	},
	courier: {
		category: 'mono',
		weight: 'normal',
		style: 'roman',
		width: 'normal',
		fontName: StandardFonts.Courier,
		standardName: StandardFonts.Courier,
	},
	'courier-oblique': {
		category: 'mono',
		weight: 'normal',
		style: 'italic',
		width: 'normal',
		fontName: StandardFonts.CourierOblique,
		standardName: StandardFonts.CourierOblique,
	},
	'courier-bold': {
		category: 'mono',
		weight: 'bold',
		style: 'roman',
		width: 'normal',
		fontName: StandardFonts.CourierBold,
		standardName: StandardFonts.CourierBold,
	},
	'courier-boldoblique': {
		category: 'mono',
		weight: 'bold',
		style: 'italic',
		width: 'normal',
		fontName: StandardFonts.CourierBoldOblique,
		standardName: StandardFonts.CourierBoldOblique,
	},
	symbol: {
		category: 'symbol',
		weight: 'normal',
		style: 'roman',
		width: 'normal',
		fontName: StandardFonts.Symbol,
		standardName: StandardFonts.Symbol,
	},
	zapfdingbats: {
		category: 'zapfdingbats',
		weight: 'normal',
		style: 'roman',
		width: 'normal',
		fontName: StandardFonts.ZapfDingbats,
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

function isStandardEncoding(encoding: string): boolean {
	return StandardEncodings.map((e) => e.toLocaleLowerCase()).includes(
		encoding.toLowerCase(),
	);
}

/**
 * Resolve a font identified by name and return the raw bytes. The
 * resolving performs the following steps:
 *
 * 1. Try to lookup the font data in the font map provided. This uses an exact match.
 * 2. Check if the system has `fc-match` and try to find a suitable font.
 * 3. Try to find a suitable font file in the file system that matches the name.
 * 4. Try to find a suitable font file in the file system that matches the font style and weight (ignore width).
 *
 * Only the first step works in the browser.
 *
 * The returned object has the raw data bytes in the `source` property. The
 * optional `postScriptName` property is only relevant for TrueType
 * collections (`.ttc` fonts).
 *
 * @param fontName the font name (with subset prefix or producer suffix stripped off)
 * @param fontMap the font mapping (maps font names to file names or pre-loaded raw data bytes)
 * @returns the raw font data
 */
export async function resolve(
	pdfFontName: string,
	fontMap: FontMap = {},
	fcMatchPath = 'fc-match',
	platform?: OsType,
): Promise<FontData> {
	const canonicalName = fontName(pdfFontName);
	if (Object.hasOwn(fontMap, canonicalName.toLowerCase())) {
		const data = fontMap[canonicalName.toLowerCase()]?.source;
		if (typeof data === 'string') {
			fontMap[canonicalName.toLowerCase()] = await loadFontFromPath(
				canonicalName,
				data,
				platform,
			);
		}

		return fontMap[canonicalName.toLowerCase()]!;
	}

	const description = parseName(pdfFontName);
	const fcMatchHit = await fcMatch(description, fcMatchPath);
	if (fcMatchHit) return fcMatchHit;

	const searchList = createSearchList(description);

	for (let i = 0; i < searchList.length; ++i) {
		const desc = searchList[i]!;
		const tryName = FontMatrix[desc.category][desc.weight][desc.style];
		const key = tryName.toLowerCase();
		if (Object.hasOwn(fontMap, key)) {
			const data = fontMap[key];
			if (typeof data?.source === 'string') {
				fontMap[key] = await loadFontFromPath(
					pdfFontName,
					data.source,
					platform,
				);
			}

			return fontMap[key]!;
		}

		const fontData = await loadFont(desc, pdfFontName, platform);
		if (typeof fontData !== 'undefined') return fontData;
	}

	throw new Error(
		`The font '${pdfFontName}' is not embedded, no replacement font has been specified, and no fallback font has been found.`,
	);
}

function parseName(pdfFontName: string): FontDescription {
	const name = fontName(pdfFontName);

	if (isStandardFont(name)) {
		return FontDescriptionByName[name.toLowerCase()]!;
	}

	// Heuristic parse.
	const lname = name.toLowerCase();
	const weight: FontWeight = lname.includes('bold') ? 'bold' : 'normal';
	const style: FontStyle =
		lname.includes('italic') || lname.includes('oblique') ? 'italic' : 'roman';

	const width = lname.includes('condensed')
		? 'condensed'
		: lname.includes('expanded')
			? 'expanded'
			: 'normal';

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

	return { fontName: family, category, weight, style, width };
}

function createSearchList(desc: FontDescription): FontDescription[] {
	const searchList: FontDescription[] = [desc];

	// These cannot be replaced.
	if (desc.category === 'symbol' || desc.category === 'zapfdingbats') {
		const standardName =
			desc.category === 'symbol'
				? StandardFonts.Symbol
				: StandardFonts.ZapfDingbats;
		return [
			{
				fontName: desc.fontName,
				category: desc.category,
				weight: 'normal',
				style: 'roman',
				standardName,
				width: 'normal',
			},
		];
	}

	for (const weight of ['normal', 'bold']) {
		if (desc.weight === weight) continue;
		for (const style of ['roman', 'italic']) {
			if (desc.style === style) continue;
			for (const category of ['sans', 'serif', 'mono']) {
				if (desc.category === category) continue;
				searchList.push({ fontName: desc.fontName, category, weight, style } as FontDescription);
			}
		}
	}

	return searchList;
}
