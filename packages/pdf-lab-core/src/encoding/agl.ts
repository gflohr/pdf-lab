/* istanbul ignore file */
// This file is generated! Do NOT edit!
//
// Edit the file 'gen-tables.ts' in the directory 'scripts' in the project
// root instead!

/**
 * Representation of a glyph from the Adoble Glyph List Specification.
 */
export type AdobeGlyph = {
	/**
	 * Adobe name.
	 */
	n: string;

	/**
	 * Unicode code point or array of codepoints for composite characters.
	 */
	u: number | number[];

	/**
	 * Fallback characters as Unicode code points.
	 */
	f?: number[];

	/**
	 * `true` if the glyph belongs to a Zapf Dingbats font.
	 */
	z?: boolean;
};

/**
 * Lookup-table for all glyphs from the Adoble Glyph List Specification.
 *
 * The comment above the definition is the official Unicode name.
 */
export const adobeGlyphs: Record<string, AdobeGlyph> = {
	// LATIN CAPITAL LETTER A
	A: {
		n: 'A',
		u: 0x0041,
	},
	// LATIN CAPITAL LETTER AE
	AE: {
		n: 'AE',
		u: 0x00c6,
	},
	// LATIN CAPITAL LETTER AE WITH ACUTE
	AEacute: {
		n: 'AEacute',
		u: 0x01fc,
	},
	// LATIN CAPITAL LETTER AE WITH MACRON
	AEmacron: {
		n: 'AEmacron',
		u: 0x01e2,
	},
	// <private-use-F7E6>
	AEsmall: {
		n: 'AEsmall',
		u: 0xf7e6,
		f: [0x00c6],
	},
	// LATIN CAPITAL LETTER A WITH ACUTE
	Aacute: {
		n: 'Aacute',
		u: 0x00c1,
	},
	// <private-use-F7E1>
	Aacutesmall: {
		n: 'Aacutesmall',
		u: 0xf7e1,
		f: [0x00c1],
	},
	// LATIN CAPITAL LETTER A WITH BREVE
	Abreve: {
		n: 'Abreve',
		u: 0x0102,
	},
	// LATIN CAPITAL LETTER A WITH BREVE AND ACUTE
	Abreveacute: {
		n: 'Abreveacute',
		u: 0x1eae,
	},
	// CYRILLIC CAPITAL LETTER A WITH BREVE
	Abrevecyrillic: {
		n: 'Abrevecyrillic',
		u: 0x04d0,
	},
	// LATIN CAPITAL LETTER A WITH BREVE AND DOT BELOW
	Abrevedotbelow: {
		n: 'Abrevedotbelow',
		u: 0x1eb6,
	},
	// LATIN CAPITAL LETTER A WITH BREVE AND GRAVE
	Abrevegrave: {
		n: 'Abrevegrave',
		u: 0x1eb0,
	},
	// LATIN CAPITAL LETTER A WITH BREVE AND HOOK ABOVE
	Abrevehookabove: {
		n: 'Abrevehookabove',
		u: 0x1eb2,
	},
	// LATIN CAPITAL LETTER A WITH BREVE AND TILDE
	Abrevetilde: {
		n: 'Abrevetilde',
		u: 0x1eb4,
	},
	// LATIN CAPITAL LETTER A WITH CARON
	Acaron: {
		n: 'Acaron',
		u: 0x01cd,
	},
	// CIRCLED LATIN CAPITAL LETTER A
	Acircle: {
		n: 'Acircle',
		u: 0x24b6,
	},
	// LATIN CAPITAL LETTER A WITH CIRCUMFLEX
	Acircumflex: {
		n: 'Acircumflex',
		u: 0x00c2,
	},
	// LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND ACUTE
	Acircumflexacute: {
		n: 'Acircumflexacute',
		u: 0x1ea4,
	},
	// LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND DOT BELOW
	Acircumflexdotbelow: {
		n: 'Acircumflexdotbelow',
		u: 0x1eac,
	},
	// LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND GRAVE
	Acircumflexgrave: {
		n: 'Acircumflexgrave',
		u: 0x1ea6,
	},
	// LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND HOOK ABOVE
	Acircumflexhookabove: {
		n: 'Acircumflexhookabove',
		u: 0x1ea8,
	},
	// <private-use-F7E2>
	Acircumflexsmall: {
		n: 'Acircumflexsmall',
		u: 0xf7e2,
		f: [0x00c2],
	},
	// LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND TILDE
	Acircumflextilde: {
		n: 'Acircumflextilde',
		u: 0x1eaa,
	},
	// <private-use-F6C9>
	Acute: {
		n: 'Acute',
		u: 0xf6c9,
	},
	// <private-use-F7B4>
	Acutesmall: {
		n: 'Acutesmall',
		u: 0xf7b4,
		f: [0xf6c9],
	},
	// CYRILLIC CAPITAL LETTER A
	Acyrillic: {
		n: 'Acyrillic',
		u: 0x0410,
	},
	// LATIN CAPITAL LETTER A WITH DOUBLE GRAVE
	Adblgrave: {
		n: 'Adblgrave',
		u: 0x0200,
	},
	// LATIN CAPITAL LETTER A WITH DIAERESIS
	Adieresis: {
		n: 'Adieresis',
		u: 0x00c4,
	},
	// CYRILLIC CAPITAL LETTER A WITH DIAERESIS
	Adieresiscyrillic: {
		n: 'Adieresiscyrillic',
		u: 0x04d2,
	},
	// LATIN CAPITAL LETTER A WITH DIAERESIS AND MACRON
	Adieresismacron: {
		n: 'Adieresismacron',
		u: 0x01de,
	},
	// <private-use-F7E4>
	Adieresissmall: {
		n: 'Adieresissmall',
		u: 0xf7e4,
		f: [0x00c4],
	},
	// LATIN CAPITAL LETTER A WITH DOT BELOW
	Adotbelow: {
		n: 'Adotbelow',
		u: 0x1ea0,
	},
	// LATIN CAPITAL LETTER A WITH DOT ABOVE AND MACRON
	Adotmacron: {
		n: 'Adotmacron',
		u: 0x01e0,
	},
	// LATIN CAPITAL LETTER A WITH GRAVE
	Agrave: {
		n: 'Agrave',
		u: 0x00c0,
	},
	// <private-use-F7E0>
	Agravesmall: {
		n: 'Agravesmall',
		u: 0xf7e0,
		f: [0x00c0],
	},
	// LATIN CAPITAL LETTER A WITH HOOK ABOVE
	Ahookabove: {
		n: 'Ahookabove',
		u: 0x1ea2,
	},
	// CYRILLIC CAPITAL LIGATURE A IE
	Aiecyrillic: {
		n: 'Aiecyrillic',
		u: 0x04d4,
	},
	// LATIN CAPITAL LETTER A WITH INVERTED BREVE
	Ainvertedbreve: {
		n: 'Ainvertedbreve',
		u: 0x0202,
	},
	// GREEK CAPITAL LETTER ALPHA
	Alpha: {
		n: 'Alpha',
		u: 0x0391,
	},
	// GREEK CAPITAL LETTER ALPHA WITH TONOS
	Alphatonos: {
		n: 'Alphatonos',
		u: 0x0386,
	},
	// LATIN CAPITAL LETTER A WITH MACRON
	Amacron: {
		n: 'Amacron',
		u: 0x0100,
	},
	// FULLWIDTH LATIN CAPITAL LETTER A
	Amonospace: {
		n: 'Amonospace',
		u: 0xff21,
	},
	// LATIN CAPITAL LETTER A WITH OGONEK
	Aogonek: {
		n: 'Aogonek',
		u: 0x0104,
	},
	// LATIN CAPITAL LETTER A WITH RING ABOVE
	Aring: {
		n: 'Aring',
		u: 0x00c5,
	},
	// LATIN CAPITAL LETTER A WITH RING ABOVE AND ACUTE
	Aringacute: {
		n: 'Aringacute',
		u: 0x01fa,
	},
	// LATIN CAPITAL LETTER A WITH RING BELOW
	Aringbelow: {
		n: 'Aringbelow',
		u: 0x1e00,
	},
	// <private-use-F7E5>
	Aringsmall: {
		n: 'Aringsmall',
		u: 0xf7e5,
		f: [0x00c5],
	},
	// <private-use-F761>
	Asmall: {
		n: 'Asmall',
		u: 0xf761,
		f: [0x0041],
	},
	// LATIN CAPITAL LETTER A WITH TILDE
	Atilde: {
		n: 'Atilde',
		u: 0x00c3,
	},
	// <private-use-F7E3>
	Atildesmall: {
		n: 'Atildesmall',
		u: 0xf7e3,
		f: [0x00c3],
	},
	// ARMENIAN CAPITAL LETTER AYB
	Aybarmenian: {
		n: 'Aybarmenian',
		u: 0x0531,
	},
	// LATIN CAPITAL LETTER B
	B: {
		n: 'B',
		u: 0x0042,
	},
	// CIRCLED LATIN CAPITAL LETTER B
	Bcircle: {
		n: 'Bcircle',
		u: 0x24b7,
	},
	// LATIN CAPITAL LETTER B WITH DOT ABOVE
	Bdotaccent: {
		n: 'Bdotaccent',
		u: 0x1e02,
	},
	// LATIN CAPITAL LETTER B WITH DOT BELOW
	Bdotbelow: {
		n: 'Bdotbelow',
		u: 0x1e04,
	},
	// CYRILLIC CAPITAL LETTER BE
	Becyrillic: {
		n: 'Becyrillic',
		u: 0x0411,
	},
	// ARMENIAN CAPITAL LETTER BEN
	Benarmenian: {
		n: 'Benarmenian',
		u: 0x0532,
	},
	// GREEK CAPITAL LETTER BETA
	Beta: {
		n: 'Beta',
		u: 0x0392,
	},
	// LATIN CAPITAL LETTER B WITH HOOK
	Bhook: {
		n: 'Bhook',
		u: 0x0181,
	},
	// LATIN CAPITAL LETTER B WITH LINE BELOW
	Blinebelow: {
		n: 'Blinebelow',
		u: 0x1e06,
	},
	// FULLWIDTH LATIN CAPITAL LETTER B
	Bmonospace: {
		n: 'Bmonospace',
		u: 0xff22,
	},
	// <private-use-F6F4>
	Brevesmall: {
		n: 'Brevesmall',
		u: 0xf6f4,
	},
	// <private-use-F762>
	Bsmall: {
		n: 'Bsmall',
		u: 0xf762,
		f: [0x0042],
	},
	// LATIN CAPITAL LETTER B WITH TOPBAR
	Btopbar: {
		n: 'Btopbar',
		u: 0x0182,
	},
	// LATIN CAPITAL LETTER C
	C: {
		n: 'C',
		u: 0x0043,
	},
	// ARMENIAN CAPITAL LETTER CA
	Caarmenian: {
		n: 'Caarmenian',
		u: 0x053e,
	},
	// LATIN CAPITAL LETTER C WITH ACUTE
	Cacute: {
		n: 'Cacute',
		u: 0x0106,
	},
	// <private-use-F6CA>
	Caron: {
		n: 'Caron',
		u: 0xf6ca,
	},
	// <private-use-F6F5>
	Caronsmall: {
		n: 'Caronsmall',
		u: 0xf6f5,
		f: [0xf6ca],
	},
	// LATIN CAPITAL LETTER C WITH CARON
	Ccaron: {
		n: 'Ccaron',
		u: 0x010c,
	},
	// LATIN CAPITAL LETTER C WITH CEDILLA
	Ccedilla: {
		n: 'Ccedilla',
		u: 0x00c7,
	},
	// LATIN CAPITAL LETTER C WITH CEDILLA AND ACUTE
	Ccedillaacute: {
		n: 'Ccedillaacute',
		u: 0x1e08,
	},
	// <private-use-F7E7>
	Ccedillasmall: {
		n: 'Ccedillasmall',
		u: 0xf7e7,
		f: [0x00c7],
	},
	// CIRCLED LATIN CAPITAL LETTER C
	Ccircle: {
		n: 'Ccircle',
		u: 0x24b8,
	},
	// LATIN CAPITAL LETTER C WITH CIRCUMFLEX
	Ccircumflex: {
		n: 'Ccircumflex',
		u: 0x0108,
	},
	// LATIN CAPITAL LETTER C WITH DOT ABOVE
	Cdot: {
		n: 'Cdot',
		u: 0x010a,
	},
	// LATIN CAPITAL LETTER C WITH DOT ABOVE
	Cdotaccent: {
		n: 'Cdotaccent',
		u: 0x010a,
	},
	// <private-use-F7B8>
	Cedillasmall: {
		n: 'Cedillasmall',
		u: 0xf7b8,
	},
	// ARMENIAN CAPITAL LETTER CHA
	Chaarmenian: {
		n: 'Chaarmenian',
		u: 0x0549,
	},
	// CYRILLIC CAPITAL LETTER ABKHASIAN CHE
	Cheabkhasiancyrillic: {
		n: 'Cheabkhasiancyrillic',
		u: 0x04bc,
	},
	// CYRILLIC CAPITAL LETTER CHE
	Checyrillic: {
		n: 'Checyrillic',
		u: 0x0427,
	},
	// CYRILLIC CAPITAL LETTER ABKHASIAN CHE WITH DESCENDER
	Chedescenderabkhasiancyrillic: {
		n: 'Chedescenderabkhasiancyrillic',
		u: 0x04be,
	},
	// CYRILLIC CAPITAL LETTER CHE WITH DESCENDER
	Chedescendercyrillic: {
		n: 'Chedescendercyrillic',
		u: 0x04b6,
	},
	// CYRILLIC CAPITAL LETTER CHE WITH DIAERESIS
	Chedieresiscyrillic: {
		n: 'Chedieresiscyrillic',
		u: 0x04f4,
	},
	// ARMENIAN CAPITAL LETTER CHEH
	Cheharmenian: {
		n: 'Cheharmenian',
		u: 0x0543,
	},
	// CYRILLIC CAPITAL LETTER KHAKASSIAN CHE
	Chekhakassiancyrillic: {
		n: 'Chekhakassiancyrillic',
		u: 0x04cb,
	},
	// CYRILLIC CAPITAL LETTER CHE WITH VERTICAL STROKE
	Cheverticalstrokecyrillic: {
		n: 'Cheverticalstrokecyrillic',
		u: 0x04b8,
	},
	// GREEK CAPITAL LETTER CHI
	Chi: {
		n: 'Chi',
		u: 0x03a7,
	},
	// LATIN CAPITAL LETTER C WITH HOOK
	Chook: {
		n: 'Chook',
		u: 0x0187,
	},
	// <private-use-F6F6>
	Circumflexsmall: {
		n: 'Circumflexsmall',
		u: 0xf6f6,
	},
	// FULLWIDTH LATIN CAPITAL LETTER C
	Cmonospace: {
		n: 'Cmonospace',
		u: 0xff23,
	},
	// ARMENIAN CAPITAL LETTER CO
	Coarmenian: {
		n: 'Coarmenian',
		u: 0x0551,
	},
	// <private-use-F763>
	Csmall: {
		n: 'Csmall',
		u: 0xf763,
		f: [0x0043],
	},
	// LATIN CAPITAL LETTER D
	D: {
		n: 'D',
		u: 0x0044,
	},
	// LATIN CAPITAL LETTER DZ
	DZ: {
		n: 'DZ',
		u: 0x01f1,
	},
	// LATIN CAPITAL LETTER DZ WITH CARON
	DZcaron: {
		n: 'DZcaron',
		u: 0x01c4,
	},
	// ARMENIAN CAPITAL LETTER DA
	Daarmenian: {
		n: 'Daarmenian',
		u: 0x0534,
	},
	// LATIN CAPITAL LETTER AFRICAN D
	Dafrican: {
		n: 'Dafrican',
		u: 0x0189,
	},
	// LATIN CAPITAL LETTER D WITH CARON
	Dcaron: {
		n: 'Dcaron',
		u: 0x010e,
	},
	// LATIN CAPITAL LETTER D WITH CEDILLA
	Dcedilla: {
		n: 'Dcedilla',
		u: 0x1e10,
	},
	// CIRCLED LATIN CAPITAL LETTER D
	Dcircle: {
		n: 'Dcircle',
		u: 0x24b9,
	},
	// LATIN CAPITAL LETTER D WITH CIRCUMFLEX BELOW
	Dcircumflexbelow: {
		n: 'Dcircumflexbelow',
		u: 0x1e12,
	},
	// LATIN CAPITAL LETTER D WITH STROKE
	Dcroat: {
		n: 'Dcroat',
		u: 0x0110,
	},
	// LATIN CAPITAL LETTER D WITH DOT ABOVE
	Ddotaccent: {
		n: 'Ddotaccent',
		u: 0x1e0a,
	},
	// LATIN CAPITAL LETTER D WITH DOT BELOW
	Ddotbelow: {
		n: 'Ddotbelow',
		u: 0x1e0c,
	},
	// CYRILLIC CAPITAL LETTER DE
	Decyrillic: {
		n: 'Decyrillic',
		u: 0x0414,
	},
	// COPTIC CAPITAL LETTER DEI
	Deicoptic: {
		n: 'Deicoptic',
		u: 0x03ee,
	},
	// INCREMENT
	Delta: {
		n: 'Delta',
		u: 0x2206,
	},
	// GREEK CAPITAL LETTER DELTA
	Deltagreek: {
		n: 'Deltagreek',
		u: 0x0394,
		f: [0x2206],
	},
	// LATIN CAPITAL LETTER D WITH HOOK
	Dhook: {
		n: 'Dhook',
		u: 0x018a,
	},
	// <private-use-F6CB>
	Dieresis: {
		n: 'Dieresis',
		u: 0xf6cb,
	},
	// <private-use-F6CC>
	DieresisAcute: {
		n: 'DieresisAcute',
		u: 0xf6cc,
	},
	// <private-use-F6CD>
	DieresisGrave: {
		n: 'DieresisGrave',
		u: 0xf6cd,
	},
	// <private-use-F7A8>
	Dieresissmall: {
		n: 'Dieresissmall',
		u: 0xf7a8,
		f: [0xf6cb],
	},
	// GREEK LETTER DIGAMMA
	Digammagreek: {
		n: 'Digammagreek',
		u: 0x03dc,
	},
	// CYRILLIC CAPITAL LETTER DJE
	Djecyrillic: {
		n: 'Djecyrillic',
		u: 0x0402,
	},
	// LATIN CAPITAL LETTER D WITH LINE BELOW
	Dlinebelow: {
		n: 'Dlinebelow',
		u: 0x1e0e,
	},
	// FULLWIDTH LATIN CAPITAL LETTER D
	Dmonospace: {
		n: 'Dmonospace',
		u: 0xff24,
	},
	// <private-use-F6F7>
	Dotaccentsmall: {
		n: 'Dotaccentsmall',
		u: 0xf6f7,
	},
	// LATIN CAPITAL LETTER D WITH STROKE
	Dslash: {
		n: 'Dslash',
		u: 0x0110,
	},
	// <private-use-F764>
	Dsmall: {
		n: 'Dsmall',
		u: 0xf764,
		f: [0x0044],
	},
	// LATIN CAPITAL LETTER D WITH TOPBAR
	Dtopbar: {
		n: 'Dtopbar',
		u: 0x018b,
	},
	// LATIN CAPITAL LETTER D WITH SMALL LETTER Z
	Dz: {
		n: 'Dz',
		u: 0x01f2,
	},
	// LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON
	Dzcaron: {
		n: 'Dzcaron',
		u: 0x01c5,
	},
	// CYRILLIC CAPITAL LETTER ABKHASIAN DZE
	Dzeabkhasiancyrillic: {
		n: 'Dzeabkhasiancyrillic',
		u: 0x04e0,
	},
	// CYRILLIC CAPITAL LETTER DZE
	Dzecyrillic: {
		n: 'Dzecyrillic',
		u: 0x0405,
	},
	// CYRILLIC CAPITAL LETTER DZHE
	Dzhecyrillic: {
		n: 'Dzhecyrillic',
		u: 0x040f,
	},
	// LATIN CAPITAL LETTER E
	E: {
		n: 'E',
		u: 0x0045,
	},
	// LATIN CAPITAL LETTER E WITH ACUTE
	Eacute: {
		n: 'Eacute',
		u: 0x00c9,
	},
	// <private-use-F7E9>
	Eacutesmall: {
		n: 'Eacutesmall',
		u: 0xf7e9,
		f: [0x00c9],
	},
	// LATIN CAPITAL LETTER E WITH BREVE
	Ebreve: {
		n: 'Ebreve',
		u: 0x0114,
	},
	// LATIN CAPITAL LETTER E WITH CARON
	Ecaron: {
		n: 'Ecaron',
		u: 0x011a,
	},
	// LATIN CAPITAL LETTER E WITH CEDILLA AND BREVE
	Ecedillabreve: {
		n: 'Ecedillabreve',
		u: 0x1e1c,
	},
	// ARMENIAN CAPITAL LETTER ECH
	Echarmenian: {
		n: 'Echarmenian',
		u: 0x0535,
	},
	// CIRCLED LATIN CAPITAL LETTER E
	Ecircle: {
		n: 'Ecircle',
		u: 0x24ba,
	},
	// LATIN CAPITAL LETTER E WITH CIRCUMFLEX
	Ecircumflex: {
		n: 'Ecircumflex',
		u: 0x00ca,
	},
	// LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND ACUTE
	Ecircumflexacute: {
		n: 'Ecircumflexacute',
		u: 0x1ebe,
	},
	// LATIN CAPITAL LETTER E WITH CIRCUMFLEX BELOW
	Ecircumflexbelow: {
		n: 'Ecircumflexbelow',
		u: 0x1e18,
	},
	// LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND DOT BELOW
	Ecircumflexdotbelow: {
		n: 'Ecircumflexdotbelow',
		u: 0x1ec6,
	},
	// LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND GRAVE
	Ecircumflexgrave: {
		n: 'Ecircumflexgrave',
		u: 0x1ec0,
	},
	// LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND HOOK ABOVE
	Ecircumflexhookabove: {
		n: 'Ecircumflexhookabove',
		u: 0x1ec2,
	},
	// <private-use-F7EA>
	Ecircumflexsmall: {
		n: 'Ecircumflexsmall',
		u: 0xf7ea,
		f: [0x00ca],
	},
	// LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND TILDE
	Ecircumflextilde: {
		n: 'Ecircumflextilde',
		u: 0x1ec4,
	},
	// CYRILLIC CAPITAL LETTER UKRAINIAN IE
	Ecyrillic: {
		n: 'Ecyrillic',
		u: 0x0404,
	},
	// LATIN CAPITAL LETTER E WITH DOUBLE GRAVE
	Edblgrave: {
		n: 'Edblgrave',
		u: 0x0204,
	},
	// LATIN CAPITAL LETTER E WITH DIAERESIS
	Edieresis: {
		n: 'Edieresis',
		u: 0x00cb,
	},
	// <private-use-F7EB>
	Edieresissmall: {
		n: 'Edieresissmall',
		u: 0xf7eb,
		f: [0x00cb],
	},
	// LATIN CAPITAL LETTER E WITH DOT ABOVE
	Edot: {
		n: 'Edot',
		u: 0x0116,
	},
	// LATIN CAPITAL LETTER E WITH DOT ABOVE
	Edotaccent: {
		n: 'Edotaccent',
		u: 0x0116,
	},
	// LATIN CAPITAL LETTER E WITH DOT BELOW
	Edotbelow: {
		n: 'Edotbelow',
		u: 0x1eb8,
	},
	// CYRILLIC CAPITAL LETTER EF
	Efcyrillic: {
		n: 'Efcyrillic',
		u: 0x0424,
	},
	// LATIN CAPITAL LETTER E WITH GRAVE
	Egrave: {
		n: 'Egrave',
		u: 0x00c8,
	},
	// <private-use-F7E8>
	Egravesmall: {
		n: 'Egravesmall',
		u: 0xf7e8,
		f: [0x00c8],
	},
	// ARMENIAN CAPITAL LETTER EH
	Eharmenian: {
		n: 'Eharmenian',
		u: 0x0537,
	},
	// LATIN CAPITAL LETTER E WITH HOOK ABOVE
	Ehookabove: {
		n: 'Ehookabove',
		u: 0x1eba,
	},
	// ROMAN NUMERAL EIGHT
	Eightroman: {
		n: 'Eightroman',
		u: 0x2167,
	},
	// LATIN CAPITAL LETTER E WITH INVERTED BREVE
	Einvertedbreve: {
		n: 'Einvertedbreve',
		u: 0x0206,
	},
	// CYRILLIC CAPITAL LETTER IOTIFIED E
	Eiotifiedcyrillic: {
		n: 'Eiotifiedcyrillic',
		u: 0x0464,
	},
	// CYRILLIC CAPITAL LETTER EL
	Elcyrillic: {
		n: 'Elcyrillic',
		u: 0x041b,
	},
	// ROMAN NUMERAL ELEVEN
	Elevenroman: {
		n: 'Elevenroman',
		u: 0x216a,
	},
	// LATIN CAPITAL LETTER E WITH MACRON
	Emacron: {
		n: 'Emacron',
		u: 0x0112,
	},
	// LATIN CAPITAL LETTER E WITH MACRON AND ACUTE
	Emacronacute: {
		n: 'Emacronacute',
		u: 0x1e16,
	},
	// LATIN CAPITAL LETTER E WITH MACRON AND GRAVE
	Emacrongrave: {
		n: 'Emacrongrave',
		u: 0x1e14,
	},
	// CYRILLIC CAPITAL LETTER EM
	Emcyrillic: {
		n: 'Emcyrillic',
		u: 0x041c,
	},
	// FULLWIDTH LATIN CAPITAL LETTER E
	Emonospace: {
		n: 'Emonospace',
		u: 0xff25,
	},
	// CYRILLIC CAPITAL LETTER EN
	Encyrillic: {
		n: 'Encyrillic',
		u: 0x041d,
	},
	// CYRILLIC CAPITAL LETTER EN WITH DESCENDER
	Endescendercyrillic: {
		n: 'Endescendercyrillic',
		u: 0x04a2,
	},
	// LATIN CAPITAL LETTER ENG
	Eng: {
		n: 'Eng',
		u: 0x014a,
	},
	// CYRILLIC CAPITAL LIGATURE EN GHE
	Enghecyrillic: {
		n: 'Enghecyrillic',
		u: 0x04a4,
	},
	// CYRILLIC CAPITAL LETTER EN WITH HOOK
	Enhookcyrillic: {
		n: 'Enhookcyrillic',
		u: 0x04c7,
	},
	// LATIN CAPITAL LETTER E WITH OGONEK
	Eogonek: {
		n: 'Eogonek',
		u: 0x0118,
	},
	// LATIN CAPITAL LETTER OPEN E
	Eopen: {
		n: 'Eopen',
		u: 0x0190,
	},
	// GREEK CAPITAL LETTER EPSILON
	Epsilon: {
		n: 'Epsilon',
		u: 0x0395,
	},
	// GREEK CAPITAL LETTER EPSILON WITH TONOS
	Epsilontonos: {
		n: 'Epsilontonos',
		u: 0x0388,
	},
	// CYRILLIC CAPITAL LETTER ER
	Ercyrillic: {
		n: 'Ercyrillic',
		u: 0x0420,
	},
	// LATIN CAPITAL LETTER REVERSED E
	Ereversed: {
		n: 'Ereversed',
		u: 0x018e,
	},
	// CYRILLIC CAPITAL LETTER E
	Ereversedcyrillic: {
		n: 'Ereversedcyrillic',
		u: 0x042d,
	},
	// CYRILLIC CAPITAL LETTER ES
	Escyrillic: {
		n: 'Escyrillic',
		u: 0x0421,
	},
	// CYRILLIC CAPITAL LETTER ES WITH DESCENDER
	Esdescendercyrillic: {
		n: 'Esdescendercyrillic',
		u: 0x04aa,
	},
	// LATIN CAPITAL LETTER ESH
	Esh: {
		n: 'Esh',
		u: 0x01a9,
	},
	// <private-use-F765>
	Esmall: {
		n: 'Esmall',
		u: 0xf765,
		f: [0x0045],
	},
	// GREEK CAPITAL LETTER ETA
	Eta: {
		n: 'Eta',
		u: 0x0397,
	},
	// ARMENIAN CAPITAL LETTER ET
	Etarmenian: {
		n: 'Etarmenian',
		u: 0x0538,
	},
	// GREEK CAPITAL LETTER ETA WITH TONOS
	Etatonos: {
		n: 'Etatonos',
		u: 0x0389,
	},
	// LATIN CAPITAL LETTER ETH
	Eth: {
		n: 'Eth',
		u: 0x00d0,
	},
	// <private-use-F7F0>
	Ethsmall: {
		n: 'Ethsmall',
		u: 0xf7f0,
		f: [0x00d0],
	},
	// LATIN CAPITAL LETTER E WITH TILDE
	Etilde: {
		n: 'Etilde',
		u: 0x1ebc,
	},
	// LATIN CAPITAL LETTER E WITH TILDE BELOW
	Etildebelow: {
		n: 'Etildebelow',
		u: 0x1e1a,
	},
	// EURO SIGN
	Euro: {
		n: 'Euro',
		u: 0x20ac,
	},
	// LATIN CAPITAL LETTER EZH
	Ezh: {
		n: 'Ezh',
		u: 0x01b7,
	},
	// LATIN CAPITAL LETTER EZH WITH CARON
	Ezhcaron: {
		n: 'Ezhcaron',
		u: 0x01ee,
	},
	// LATIN CAPITAL LETTER EZH REVERSED
	Ezhreversed: {
		n: 'Ezhreversed',
		u: 0x01b8,
	},
	// LATIN CAPITAL LETTER F
	F: {
		n: 'F',
		u: 0x0046,
	},
	// CIRCLED LATIN CAPITAL LETTER F
	Fcircle: {
		n: 'Fcircle',
		u: 0x24bb,
	},
	// LATIN CAPITAL LETTER F WITH DOT ABOVE
	Fdotaccent: {
		n: 'Fdotaccent',
		u: 0x1e1e,
	},
	// ARMENIAN CAPITAL LETTER FEH
	Feharmenian: {
		n: 'Feharmenian',
		u: 0x0556,
	},
	// COPTIC CAPITAL LETTER FEI
	Feicoptic: {
		n: 'Feicoptic',
		u: 0x03e4,
	},
	// LATIN CAPITAL LETTER F WITH HOOK
	Fhook: {
		n: 'Fhook',
		u: 0x0191,
	},
	// CYRILLIC CAPITAL LETTER FITA
	Fitacyrillic: {
		n: 'Fitacyrillic',
		u: 0x0472,
	},
	// ROMAN NUMERAL FIVE
	Fiveroman: {
		n: 'Fiveroman',
		u: 0x2164,
	},
	// FULLWIDTH LATIN CAPITAL LETTER F
	Fmonospace: {
		n: 'Fmonospace',
		u: 0xff26,
	},
	// ROMAN NUMERAL FOUR
	Fourroman: {
		n: 'Fourroman',
		u: 0x2163,
	},
	// <private-use-F766>
	Fsmall: {
		n: 'Fsmall',
		u: 0xf766,
		f: [0x0046],
	},
	// LATIN CAPITAL LETTER G
	G: {
		n: 'G',
		u: 0x0047,
	},
	// SQUARE GB
	GBsquare: {
		n: 'GBsquare',
		u: 0x3387,
	},
	// LATIN CAPITAL LETTER G WITH ACUTE
	Gacute: {
		n: 'Gacute',
		u: 0x01f4,
	},
	// GREEK CAPITAL LETTER GAMMA
	Gamma: {
		n: 'Gamma',
		u: 0x0393,
	},
	// LATIN CAPITAL LETTER GAMMA
	Gammaafrican: {
		n: 'Gammaafrican',
		u: 0x0194,
	},
	// COPTIC CAPITAL LETTER GANGIA
	Gangiacoptic: {
		n: 'Gangiacoptic',
		u: 0x03ea,
	},
	// LATIN CAPITAL LETTER G WITH BREVE
	Gbreve: {
		n: 'Gbreve',
		u: 0x011e,
	},
	// LATIN CAPITAL LETTER G WITH CARON
	Gcaron: {
		n: 'Gcaron',
		u: 0x01e6,
	},
	// LATIN CAPITAL LETTER G WITH CEDILLA
	Gcedilla: {
		n: 'Gcedilla',
		u: 0x0122,
	},
	// CIRCLED LATIN CAPITAL LETTER G
	Gcircle: {
		n: 'Gcircle',
		u: 0x24bc,
	},
	// LATIN CAPITAL LETTER G WITH CIRCUMFLEX
	Gcircumflex: {
		n: 'Gcircumflex',
		u: 0x011c,
	},
	// LATIN CAPITAL LETTER G WITH CEDILLA
	Gcommaaccent: {
		n: 'Gcommaaccent',
		u: 0x0122,
	},
	// LATIN CAPITAL LETTER G WITH DOT ABOVE
	Gdot: {
		n: 'Gdot',
		u: 0x0120,
	},
	// LATIN CAPITAL LETTER G WITH DOT ABOVE
	Gdotaccent: {
		n: 'Gdotaccent',
		u: 0x0120,
	},
	// CYRILLIC CAPITAL LETTER GHE
	Gecyrillic: {
		n: 'Gecyrillic',
		u: 0x0413,
	},
	// ARMENIAN CAPITAL LETTER GHAD
	Ghadarmenian: {
		n: 'Ghadarmenian',
		u: 0x0542,
	},
	// CYRILLIC CAPITAL LETTER GHE WITH MIDDLE HOOK
	Ghemiddlehookcyrillic: {
		n: 'Ghemiddlehookcyrillic',
		u: 0x0494,
	},
	// CYRILLIC CAPITAL LETTER GHE WITH STROKE
	Ghestrokecyrillic: {
		n: 'Ghestrokecyrillic',
		u: 0x0492,
	},
	// CYRILLIC CAPITAL LETTER GHE WITH UPTURN
	Gheupturncyrillic: {
		n: 'Gheupturncyrillic',
		u: 0x0490,
	},
	// LATIN CAPITAL LETTER G WITH HOOK
	Ghook: {
		n: 'Ghook',
		u: 0x0193,
	},
	// ARMENIAN CAPITAL LETTER GIM
	Gimarmenian: {
		n: 'Gimarmenian',
		u: 0x0533,
	},
	// CYRILLIC CAPITAL LETTER GJE
	Gjecyrillic: {
		n: 'Gjecyrillic',
		u: 0x0403,
	},
	// LATIN CAPITAL LETTER G WITH MACRON
	Gmacron: {
		n: 'Gmacron',
		u: 0x1e20,
	},
	// FULLWIDTH LATIN CAPITAL LETTER G
	Gmonospace: {
		n: 'Gmonospace',
		u: 0xff27,
	},
	// <private-use-F6CE>
	Grave: {
		n: 'Grave',
		u: 0xf6ce,
	},
	// <private-use-F760>
	Gravesmall: {
		n: 'Gravesmall',
		u: 0xf760,
		f: [0xf6ce],
	},
	// <private-use-F767>
	Gsmall: {
		n: 'Gsmall',
		u: 0xf767,
		f: [0x0047],
	},
	// LATIN LETTER SMALL CAPITAL G WITH HOOK
	Gsmallhook: {
		n: 'Gsmallhook',
		u: 0x029b,
	},
	// LATIN CAPITAL LETTER G WITH STROKE
	Gstroke: {
		n: 'Gstroke',
		u: 0x01e4,
	},
	// LATIN CAPITAL LETTER H
	H: {
		n: 'H',
		u: 0x0048,
	},
	// BLACK CIRCLE
	H18533: {
		n: 'H18533',
		u: 0x25cf,
	},
	// BLACK SMALL SQUARE
	H18543: {
		n: 'H18543',
		u: 0x25aa,
	},
	// WHITE SMALL SQUARE
	H18551: {
		n: 'H18551',
		u: 0x25ab,
	},
	// WHITE SQUARE
	H22073: {
		n: 'H22073',
		u: 0x25a1,
	},
	// SQUARE HP
	HPsquare: {
		n: 'HPsquare',
		u: 0x33cb,
	},
	// CYRILLIC CAPITAL LETTER ABKHASIAN HA
	Haabkhasiancyrillic: {
		n: 'Haabkhasiancyrillic',
		u: 0x04a8,
	},
	// CYRILLIC CAPITAL LETTER HA WITH DESCENDER
	Hadescendercyrillic: {
		n: 'Hadescendercyrillic',
		u: 0x04b2,
	},
	// CYRILLIC CAPITAL LETTER HARD SIGN
	Hardsigncyrillic: {
		n: 'Hardsigncyrillic',
		u: 0x042a,
	},
	// LATIN CAPITAL LETTER H WITH STROKE
	Hbar: {
		n: 'Hbar',
		u: 0x0126,
	},
	// LATIN CAPITAL LETTER H WITH BREVE BELOW
	Hbrevebelow: {
		n: 'Hbrevebelow',
		u: 0x1e2a,
	},
	// LATIN CAPITAL LETTER H WITH CEDILLA
	Hcedilla: {
		n: 'Hcedilla',
		u: 0x1e28,
	},
	// CIRCLED LATIN CAPITAL LETTER H
	Hcircle: {
		n: 'Hcircle',
		u: 0x24bd,
	},
	// LATIN CAPITAL LETTER H WITH CIRCUMFLEX
	Hcircumflex: {
		n: 'Hcircumflex',
		u: 0x0124,
	},
	// LATIN CAPITAL LETTER H WITH DIAERESIS
	Hdieresis: {
		n: 'Hdieresis',
		u: 0x1e26,
	},
	// LATIN CAPITAL LETTER H WITH DOT ABOVE
	Hdotaccent: {
		n: 'Hdotaccent',
		u: 0x1e22,
	},
	// LATIN CAPITAL LETTER H WITH DOT BELOW
	Hdotbelow: {
		n: 'Hdotbelow',
		u: 0x1e24,
	},
	// FULLWIDTH LATIN CAPITAL LETTER H
	Hmonospace: {
		n: 'Hmonospace',
		u: 0xff28,
	},
	// ARMENIAN CAPITAL LETTER HO
	Hoarmenian: {
		n: 'Hoarmenian',
		u: 0x0540,
	},
	// COPTIC CAPITAL LETTER HORI
	Horicoptic: {
		n: 'Horicoptic',
		u: 0x03e8,
	},
	// <private-use-F768>
	Hsmall: {
		n: 'Hsmall',
		u: 0xf768,
		f: [0x0048],
	},
	// <private-use-F6CF>
	Hungarumlaut: {
		n: 'Hungarumlaut',
		u: 0xf6cf,
	},
	// <private-use-F6F8>
	Hungarumlautsmall: {
		n: 'Hungarumlautsmall',
		u: 0xf6f8,
		f: [0xf6cf],
	},
	// SQUARE HZ
	Hzsquare: {
		n: 'Hzsquare',
		u: 0x3390,
	},
	// LATIN CAPITAL LETTER I
	I: {
		n: 'I',
		u: 0x0049,
	},
	// CYRILLIC CAPITAL LETTER YA
	IAcyrillic: {
		n: 'IAcyrillic',
		u: 0x042f,
	},
	// LATIN CAPITAL LIGATURE IJ
	IJ: {
		n: 'IJ',
		u: 0x0132,
	},
	// CYRILLIC CAPITAL LETTER YU
	IUcyrillic: {
		n: 'IUcyrillic',
		u: 0x042e,
	},
	// LATIN CAPITAL LETTER I WITH ACUTE
	Iacute: {
		n: 'Iacute',
		u: 0x00cd,
	},
	// <private-use-F7ED>
	Iacutesmall: {
		n: 'Iacutesmall',
		u: 0xf7ed,
		f: [0x00cd],
	},
	// LATIN CAPITAL LETTER I WITH BREVE
	Ibreve: {
		n: 'Ibreve',
		u: 0x012c,
	},
	// LATIN CAPITAL LETTER I WITH CARON
	Icaron: {
		n: 'Icaron',
		u: 0x01cf,
	},
	// CIRCLED LATIN CAPITAL LETTER I
	Icircle: {
		n: 'Icircle',
		u: 0x24be,
	},
	// LATIN CAPITAL LETTER I WITH CIRCUMFLEX
	Icircumflex: {
		n: 'Icircumflex',
		u: 0x00ce,
	},
	// <private-use-F7EE>
	Icircumflexsmall: {
		n: 'Icircumflexsmall',
		u: 0xf7ee,
		f: [0x00ce],
	},
	// CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I
	Icyrillic: {
		n: 'Icyrillic',
		u: 0x0406,
	},
	// LATIN CAPITAL LETTER I WITH DOUBLE GRAVE
	Idblgrave: {
		n: 'Idblgrave',
		u: 0x0208,
	},
	// LATIN CAPITAL LETTER I WITH DIAERESIS
	Idieresis: {
		n: 'Idieresis',
		u: 0x00cf,
	},
	// LATIN CAPITAL LETTER I WITH DIAERESIS AND ACUTE
	Idieresisacute: {
		n: 'Idieresisacute',
		u: 0x1e2e,
	},
	// CYRILLIC CAPITAL LETTER I WITH DIAERESIS
	Idieresiscyrillic: {
		n: 'Idieresiscyrillic',
		u: 0x04e4,
	},
	// <private-use-F7EF>
	Idieresissmall: {
		n: 'Idieresissmall',
		u: 0xf7ef,
		f: [0x00cf],
	},
	// LATIN CAPITAL LETTER I WITH DOT ABOVE
	Idot: {
		n: 'Idot',
		u: 0x0130,
	},
	// LATIN CAPITAL LETTER I WITH DOT ABOVE
	Idotaccent: {
		n: 'Idotaccent',
		u: 0x0130,
	},
	// LATIN CAPITAL LETTER I WITH DOT BELOW
	Idotbelow: {
		n: 'Idotbelow',
		u: 0x1eca,
	},
	// CYRILLIC CAPITAL LETTER IE WITH BREVE
	Iebrevecyrillic: {
		n: 'Iebrevecyrillic',
		u: 0x04d6,
	},
	// CYRILLIC CAPITAL LETTER IE
	Iecyrillic: {
		n: 'Iecyrillic',
		u: 0x0415,
	},
	// BLACK-LETTER CAPITAL I
	Ifraktur: {
		n: 'Ifraktur',
		u: 0x2111,
	},
	// LATIN CAPITAL LETTER I WITH GRAVE
	Igrave: {
		n: 'Igrave',
		u: 0x00cc,
	},
	// <private-use-F7EC>
	Igravesmall: {
		n: 'Igravesmall',
		u: 0xf7ec,
		f: [0x00cc],
	},
	// LATIN CAPITAL LETTER I WITH HOOK ABOVE
	Ihookabove: {
		n: 'Ihookabove',
		u: 0x1ec8,
	},
	// CYRILLIC CAPITAL LETTER I
	Iicyrillic: {
		n: 'Iicyrillic',
		u: 0x0418,
	},
	// LATIN CAPITAL LETTER I WITH INVERTED BREVE
	Iinvertedbreve: {
		n: 'Iinvertedbreve',
		u: 0x020a,
	},
	// CYRILLIC CAPITAL LETTER SHORT I
	Iishortcyrillic: {
		n: 'Iishortcyrillic',
		u: 0x0419,
	},
	// LATIN CAPITAL LETTER I WITH MACRON
	Imacron: {
		n: 'Imacron',
		u: 0x012a,
	},
	// CYRILLIC CAPITAL LETTER I WITH MACRON
	Imacroncyrillic: {
		n: 'Imacroncyrillic',
		u: 0x04e2,
	},
	// FULLWIDTH LATIN CAPITAL LETTER I
	Imonospace: {
		n: 'Imonospace',
		u: 0xff29,
	},
	// ARMENIAN CAPITAL LETTER INI
	Iniarmenian: {
		n: 'Iniarmenian',
		u: 0x053b,
	},
	// CYRILLIC CAPITAL LETTER IO
	Iocyrillic: {
		n: 'Iocyrillic',
		u: 0x0401,
	},
	// LATIN CAPITAL LETTER I WITH OGONEK
	Iogonek: {
		n: 'Iogonek',
		u: 0x012e,
	},
	// GREEK CAPITAL LETTER IOTA
	Iota: {
		n: 'Iota',
		u: 0x0399,
	},
	// LATIN CAPITAL LETTER IOTA
	Iotaafrican: {
		n: 'Iotaafrican',
		u: 0x0196,
	},
	// GREEK CAPITAL LETTER IOTA WITH DIALYTIKA
	Iotadieresis: {
		n: 'Iotadieresis',
		u: 0x03aa,
	},
	// GREEK CAPITAL LETTER IOTA WITH TONOS
	Iotatonos: {
		n: 'Iotatonos',
		u: 0x038a,
	},
	// <private-use-F769>
	Ismall: {
		n: 'Ismall',
		u: 0xf769,
		f: [0x0049],
	},
	// LATIN CAPITAL LETTER I WITH STROKE
	Istroke: {
		n: 'Istroke',
		u: 0x0197,
	},
	// LATIN CAPITAL LETTER I WITH TILDE
	Itilde: {
		n: 'Itilde',
		u: 0x0128,
	},
	// LATIN CAPITAL LETTER I WITH TILDE BELOW
	Itildebelow: {
		n: 'Itildebelow',
		u: 0x1e2c,
	},
	// CYRILLIC CAPITAL LETTER IZHITSA
	Izhitsacyrillic: {
		n: 'Izhitsacyrillic',
		u: 0x0474,
	},
	// CYRILLIC CAPITAL LETTER IZHITSA WITH DOUBLE GRAVE ACCENT
	Izhitsadblgravecyrillic: {
		n: 'Izhitsadblgravecyrillic',
		u: 0x0476,
	},
	// LATIN CAPITAL LETTER J
	J: {
		n: 'J',
		u: 0x004a,
	},
	// ARMENIAN CAPITAL LETTER JA
	Jaarmenian: {
		n: 'Jaarmenian',
		u: 0x0541,
	},
	// CIRCLED LATIN CAPITAL LETTER J
	Jcircle: {
		n: 'Jcircle',
		u: 0x24bf,
	},
	// LATIN CAPITAL LETTER J WITH CIRCUMFLEX
	Jcircumflex: {
		n: 'Jcircumflex',
		u: 0x0134,
	},
	// CYRILLIC CAPITAL LETTER JE
	Jecyrillic: {
		n: 'Jecyrillic',
		u: 0x0408,
	},
	// ARMENIAN CAPITAL LETTER JHEH
	Jheharmenian: {
		n: 'Jheharmenian',
		u: 0x054b,
	},
	// FULLWIDTH LATIN CAPITAL LETTER J
	Jmonospace: {
		n: 'Jmonospace',
		u: 0xff2a,
	},
	// <private-use-F76A>
	Jsmall: {
		n: 'Jsmall',
		u: 0xf76a,
		f: [0x004a],
	},
	// LATIN CAPITAL LETTER K
	K: {
		n: 'K',
		u: 0x004b,
	},
	// SQUARE KB
	KBsquare: {
		n: 'KBsquare',
		u: 0x3385,
	},
	// SQUARE KK
	KKsquare: {
		n: 'KKsquare',
		u: 0x33cd,
	},
	// CYRILLIC CAPITAL LETTER BASHKIR KA
	Kabashkircyrillic: {
		n: 'Kabashkircyrillic',
		u: 0x04a0,
	},
	// LATIN CAPITAL LETTER K WITH ACUTE
	Kacute: {
		n: 'Kacute',
		u: 0x1e30,
	},
	// CYRILLIC CAPITAL LETTER KA
	Kacyrillic: {
		n: 'Kacyrillic',
		u: 0x041a,
	},
	// CYRILLIC CAPITAL LETTER KA WITH DESCENDER
	Kadescendercyrillic: {
		n: 'Kadescendercyrillic',
		u: 0x049a,
	},
	// CYRILLIC CAPITAL LETTER KA WITH HOOK
	Kahookcyrillic: {
		n: 'Kahookcyrillic',
		u: 0x04c3,
	},
	// GREEK CAPITAL LETTER KAPPA
	Kappa: {
		n: 'Kappa',
		u: 0x039a,
	},
	// CYRILLIC CAPITAL LETTER KA WITH STROKE
	Kastrokecyrillic: {
		n: 'Kastrokecyrillic',
		u: 0x049e,
	},
	// CYRILLIC CAPITAL LETTER KA WITH VERTICAL STROKE
	Kaverticalstrokecyrillic: {
		n: 'Kaverticalstrokecyrillic',
		u: 0x049c,
	},
	// LATIN CAPITAL LETTER K WITH CARON
	Kcaron: {
		n: 'Kcaron',
		u: 0x01e8,
	},
	// LATIN CAPITAL LETTER K WITH CEDILLA
	Kcedilla: {
		n: 'Kcedilla',
		u: 0x0136,
	},
	// CIRCLED LATIN CAPITAL LETTER K
	Kcircle: {
		n: 'Kcircle',
		u: 0x24c0,
	},
	// LATIN CAPITAL LETTER K WITH CEDILLA
	Kcommaaccent: {
		n: 'Kcommaaccent',
		u: 0x0136,
	},
	// LATIN CAPITAL LETTER K WITH DOT BELOW
	Kdotbelow: {
		n: 'Kdotbelow',
		u: 0x1e32,
	},
	// ARMENIAN CAPITAL LETTER KEH
	Keharmenian: {
		n: 'Keharmenian',
		u: 0x0554,
	},
	// ARMENIAN CAPITAL LETTER KEN
	Kenarmenian: {
		n: 'Kenarmenian',
		u: 0x053f,
	},
	// CYRILLIC CAPITAL LETTER HA
	Khacyrillic: {
		n: 'Khacyrillic',
		u: 0x0425,
	},
	// COPTIC CAPITAL LETTER KHEI
	Kheicoptic: {
		n: 'Kheicoptic',
		u: 0x03e6,
	},
	// LATIN CAPITAL LETTER K WITH HOOK
	Khook: {
		n: 'Khook',
		u: 0x0198,
	},
	// CYRILLIC CAPITAL LETTER KJE
	Kjecyrillic: {
		n: 'Kjecyrillic',
		u: 0x040c,
	},
	// LATIN CAPITAL LETTER K WITH LINE BELOW
	Klinebelow: {
		n: 'Klinebelow',
		u: 0x1e34,
	},
	// FULLWIDTH LATIN CAPITAL LETTER K
	Kmonospace: {
		n: 'Kmonospace',
		u: 0xff2b,
	},
	// CYRILLIC CAPITAL LETTER KOPPA
	Koppacyrillic: {
		n: 'Koppacyrillic',
		u: 0x0480,
	},
	// GREEK LETTER KOPPA
	Koppagreek: {
		n: 'Koppagreek',
		u: 0x03de,
	},
	// CYRILLIC CAPITAL LETTER KSI
	Ksicyrillic: {
		n: 'Ksicyrillic',
		u: 0x046e,
	},
	// <private-use-F76B>
	Ksmall: {
		n: 'Ksmall',
		u: 0xf76b,
		f: [0x004b],
	},
	// LATIN CAPITAL LETTER L
	L: {
		n: 'L',
		u: 0x004c,
	},
	// LATIN CAPITAL LETTER LJ
	LJ: {
		n: 'LJ',
		u: 0x01c7,
	},
	// <private-use-F6BF>
	LL: {
		n: 'LL',
		u: 0xf6bf,
	},
	// LATIN CAPITAL LETTER L WITH ACUTE
	Lacute: {
		n: 'Lacute',
		u: 0x0139,
	},
	// GREEK CAPITAL LETTER LAMDA
	Lambda: {
		n: 'Lambda',
		u: 0x039b,
	},
	// LATIN CAPITAL LETTER L WITH CARON
	Lcaron: {
		n: 'Lcaron',
		u: 0x013d,
	},
	// LATIN CAPITAL LETTER L WITH CEDILLA
	Lcedilla: {
		n: 'Lcedilla',
		u: 0x013b,
	},
	// CIRCLED LATIN CAPITAL LETTER L
	Lcircle: {
		n: 'Lcircle',
		u: 0x24c1,
	},
	// LATIN CAPITAL LETTER L WITH CIRCUMFLEX BELOW
	Lcircumflexbelow: {
		n: 'Lcircumflexbelow',
		u: 0x1e3c,
	},
	// LATIN CAPITAL LETTER L WITH CEDILLA
	Lcommaaccent: {
		n: 'Lcommaaccent',
		u: 0x013b,
	},
	// LATIN CAPITAL LETTER L WITH MIDDLE DOT
	Ldot: {
		n: 'Ldot',
		u: 0x013f,
	},
	// LATIN CAPITAL LETTER L WITH MIDDLE DOT
	Ldotaccent: {
		n: 'Ldotaccent',
		u: 0x013f,
	},
	// LATIN CAPITAL LETTER L WITH DOT BELOW
	Ldotbelow: {
		n: 'Ldotbelow',
		u: 0x1e36,
	},
	// LATIN CAPITAL LETTER L WITH DOT BELOW AND MACRON
	Ldotbelowmacron: {
		n: 'Ldotbelowmacron',
		u: 0x1e38,
	},
	// ARMENIAN CAPITAL LETTER LIWN
	Liwnarmenian: {
		n: 'Liwnarmenian',
		u: 0x053c,
	},
	// LATIN CAPITAL LETTER L WITH SMALL LETTER J
	Lj: {
		n: 'Lj',
		u: 0x01c8,
	},
	// CYRILLIC CAPITAL LETTER LJE
	Ljecyrillic: {
		n: 'Ljecyrillic',
		u: 0x0409,
	},
	// LATIN CAPITAL LETTER L WITH LINE BELOW
	Llinebelow: {
		n: 'Llinebelow',
		u: 0x1e3a,
	},
	// FULLWIDTH LATIN CAPITAL LETTER L
	Lmonospace: {
		n: 'Lmonospace',
		u: 0xff2c,
	},
	// LATIN CAPITAL LETTER L WITH STROKE
	Lslash: {
		n: 'Lslash',
		u: 0x0141,
	},
	// <private-use-F6F9>
	Lslashsmall: {
		n: 'Lslashsmall',
		u: 0xf6f9,
		f: [0x0141],
	},
	// <private-use-F76C>
	Lsmall: {
		n: 'Lsmall',
		u: 0xf76c,
		f: [0x004c],
	},
	// LATIN CAPITAL LETTER M
	M: {
		n: 'M',
		u: 0x004d,
	},
	// SQUARE MB
	MBsquare: {
		n: 'MBsquare',
		u: 0x3386,
	},
	// <private-use-F6D0>
	Macron: {
		n: 'Macron',
		u: 0xf6d0,
	},
	// <private-use-F7AF>
	Macronsmall: {
		n: 'Macronsmall',
		u: 0xf7af,
		f: [0xf6d0],
	},
	// LATIN CAPITAL LETTER M WITH ACUTE
	Macute: {
		n: 'Macute',
		u: 0x1e3e,
	},
	// CIRCLED LATIN CAPITAL LETTER M
	Mcircle: {
		n: 'Mcircle',
		u: 0x24c2,
	},
	// LATIN CAPITAL LETTER M WITH DOT ABOVE
	Mdotaccent: {
		n: 'Mdotaccent',
		u: 0x1e40,
	},
	// LATIN CAPITAL LETTER M WITH DOT BELOW
	Mdotbelow: {
		n: 'Mdotbelow',
		u: 0x1e42,
	},
	// ARMENIAN CAPITAL LETTER MEN
	Menarmenian: {
		n: 'Menarmenian',
		u: 0x0544,
	},
	// FULLWIDTH LATIN CAPITAL LETTER M
	Mmonospace: {
		n: 'Mmonospace',
		u: 0xff2d,
	},
	// <private-use-F76D>
	Msmall: {
		n: 'Msmall',
		u: 0xf76d,
		f: [0x004d],
	},
	// LATIN CAPITAL LETTER TURNED M
	Mturned: {
		n: 'Mturned',
		u: 0x019c,
	},
	// GREEK CAPITAL LETTER MU
	Mu: {
		n: 'Mu',
		u: 0x039c,
	},
	// LATIN CAPITAL LETTER N
	N: {
		n: 'N',
		u: 0x004e,
	},
	// LATIN CAPITAL LETTER NJ
	NJ: {
		n: 'NJ',
		u: 0x01ca,
	},
	// LATIN CAPITAL LETTER N WITH ACUTE
	Nacute: {
		n: 'Nacute',
		u: 0x0143,
	},
	// LATIN CAPITAL LETTER N WITH CARON
	Ncaron: {
		n: 'Ncaron',
		u: 0x0147,
	},
	// LATIN CAPITAL LETTER N WITH CEDILLA
	Ncedilla: {
		n: 'Ncedilla',
		u: 0x0145,
	},
	// CIRCLED LATIN CAPITAL LETTER N
	Ncircle: {
		n: 'Ncircle',
		u: 0x24c3,
	},
	// LATIN CAPITAL LETTER N WITH CIRCUMFLEX BELOW
	Ncircumflexbelow: {
		n: 'Ncircumflexbelow',
		u: 0x1e4a,
	},
	// LATIN CAPITAL LETTER N WITH CEDILLA
	Ncommaaccent: {
		n: 'Ncommaaccent',
		u: 0x0145,
	},
	// LATIN CAPITAL LETTER N WITH DOT ABOVE
	Ndotaccent: {
		n: 'Ndotaccent',
		u: 0x1e44,
	},
	// LATIN CAPITAL LETTER N WITH DOT BELOW
	Ndotbelow: {
		n: 'Ndotbelow',
		u: 0x1e46,
	},
	// LATIN CAPITAL LETTER N WITH LEFT HOOK
	Nhookleft: {
		n: 'Nhookleft',
		u: 0x019d,
	},
	// ROMAN NUMERAL NINE
	Nineroman: {
		n: 'Nineroman',
		u: 0x2168,
	},
	// LATIN CAPITAL LETTER N WITH SMALL LETTER J
	Nj: {
		n: 'Nj',
		u: 0x01cb,
	},
	// CYRILLIC CAPITAL LETTER NJE
	Njecyrillic: {
		n: 'Njecyrillic',
		u: 0x040a,
	},
	// LATIN CAPITAL LETTER N WITH LINE BELOW
	Nlinebelow: {
		n: 'Nlinebelow',
		u: 0x1e48,
	},
	// FULLWIDTH LATIN CAPITAL LETTER N
	Nmonospace: {
		n: 'Nmonospace',
		u: 0xff2e,
	},
	// ARMENIAN CAPITAL LETTER NOW
	Nowarmenian: {
		n: 'Nowarmenian',
		u: 0x0546,
	},
	// <private-use-F76E>
	Nsmall: {
		n: 'Nsmall',
		u: 0xf76e,
		f: [0x004e],
	},
	// LATIN CAPITAL LETTER N WITH TILDE
	Ntilde: {
		n: 'Ntilde',
		u: 0x00d1,
	},
	// <private-use-F7F1>
	Ntildesmall: {
		n: 'Ntildesmall',
		u: 0xf7f1,
		f: [0x00d1],
	},
	// GREEK CAPITAL LETTER NU
	Nu: {
		n: 'Nu',
		u: 0x039d,
	},
	// LATIN CAPITAL LETTER O
	O: {
		n: 'O',
		u: 0x004f,
	},
	// LATIN CAPITAL LIGATURE OE
	OE: {
		n: 'OE',
		u: 0x0152,
	},
	// <private-use-F6FA>
	OEsmall: {
		n: 'OEsmall',
		u: 0xf6fa,
		f: [0x0152],
	},
	// LATIN CAPITAL LETTER O WITH ACUTE
	Oacute: {
		n: 'Oacute',
		u: 0x00d3,
	},
	// <private-use-F7F3>
	Oacutesmall: {
		n: 'Oacutesmall',
		u: 0xf7f3,
		f: [0x00d3],
	},
	// CYRILLIC CAPITAL LETTER BARRED O
	Obarredcyrillic: {
		n: 'Obarredcyrillic',
		u: 0x04e8,
	},
	// CYRILLIC CAPITAL LETTER BARRED O WITH DIAERESIS
	Obarreddieresiscyrillic: {
		n: 'Obarreddieresiscyrillic',
		u: 0x04ea,
	},
	// LATIN CAPITAL LETTER O WITH BREVE
	Obreve: {
		n: 'Obreve',
		u: 0x014e,
	},
	// LATIN CAPITAL LETTER O WITH CARON
	Ocaron: {
		n: 'Ocaron',
		u: 0x01d1,
	},
	// LATIN CAPITAL LETTER O WITH MIDDLE TILDE
	Ocenteredtilde: {
		n: 'Ocenteredtilde',
		u: 0x019f,
	},
	// CIRCLED LATIN CAPITAL LETTER O
	Ocircle: {
		n: 'Ocircle',
		u: 0x24c4,
	},
	// LATIN CAPITAL LETTER O WITH CIRCUMFLEX
	Ocircumflex: {
		n: 'Ocircumflex',
		u: 0x00d4,
	},
	// LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND ACUTE
	Ocircumflexacute: {
		n: 'Ocircumflexacute',
		u: 0x1ed0,
	},
	// LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND DOT BELOW
	Ocircumflexdotbelow: {
		n: 'Ocircumflexdotbelow',
		u: 0x1ed8,
	},
	// LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND GRAVE
	Ocircumflexgrave: {
		n: 'Ocircumflexgrave',
		u: 0x1ed2,
	},
	// LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND HOOK ABOVE
	Ocircumflexhookabove: {
		n: 'Ocircumflexhookabove',
		u: 0x1ed4,
	},
	// <private-use-F7F4>
	Ocircumflexsmall: {
		n: 'Ocircumflexsmall',
		u: 0xf7f4,
		f: [0x00d4],
	},
	// LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND TILDE
	Ocircumflextilde: {
		n: 'Ocircumflextilde',
		u: 0x1ed6,
	},
	// CYRILLIC CAPITAL LETTER O
	Ocyrillic: {
		n: 'Ocyrillic',
		u: 0x041e,
	},
	// LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
	Odblacute: {
		n: 'Odblacute',
		u: 0x0150,
	},
	// LATIN CAPITAL LETTER O WITH DOUBLE GRAVE
	Odblgrave: {
		n: 'Odblgrave',
		u: 0x020c,
	},
	// LATIN CAPITAL LETTER O WITH DIAERESIS
	Odieresis: {
		n: 'Odieresis',
		u: 0x00d6,
	},
	// CYRILLIC CAPITAL LETTER O WITH DIAERESIS
	Odieresiscyrillic: {
		n: 'Odieresiscyrillic',
		u: 0x04e6,
	},
	// <private-use-F7F6>
	Odieresissmall: {
		n: 'Odieresissmall',
		u: 0xf7f6,
		f: [0x00d6],
	},
	// LATIN CAPITAL LETTER O WITH DOT BELOW
	Odotbelow: {
		n: 'Odotbelow',
		u: 0x1ecc,
	},
	// <private-use-F6FB>
	Ogoneksmall: {
		n: 'Ogoneksmall',
		u: 0xf6fb,
	},
	// LATIN CAPITAL LETTER O WITH GRAVE
	Ograve: {
		n: 'Ograve',
		u: 0x00d2,
	},
	// <private-use-F7F2>
	Ogravesmall: {
		n: 'Ogravesmall',
		u: 0xf7f2,
		f: [0x00d2],
	},
	// ARMENIAN CAPITAL LETTER OH
	Oharmenian: {
		n: 'Oharmenian',
		u: 0x0555,
	},
	// OHM SIGN
	Ohm: {
		n: 'Ohm',
		u: 0x2126,
	},
	// LATIN CAPITAL LETTER O WITH HOOK ABOVE
	Ohookabove: {
		n: 'Ohookabove',
		u: 0x1ece,
	},
	// LATIN CAPITAL LETTER O WITH HORN
	Ohorn: {
		n: 'Ohorn',
		u: 0x01a0,
	},
	// LATIN CAPITAL LETTER O WITH HORN AND ACUTE
	Ohornacute: {
		n: 'Ohornacute',
		u: 0x1eda,
	},
	// LATIN CAPITAL LETTER O WITH HORN AND DOT BELOW
	Ohorndotbelow: {
		n: 'Ohorndotbelow',
		u: 0x1ee2,
	},
	// LATIN CAPITAL LETTER O WITH HORN AND GRAVE
	Ohorngrave: {
		n: 'Ohorngrave',
		u: 0x1edc,
	},
	// LATIN CAPITAL LETTER O WITH HORN AND HOOK ABOVE
	Ohornhookabove: {
		n: 'Ohornhookabove',
		u: 0x1ede,
	},
	// LATIN CAPITAL LETTER O WITH HORN AND TILDE
	Ohorntilde: {
		n: 'Ohorntilde',
		u: 0x1ee0,
	},
	// LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
	Ohungarumlaut: {
		n: 'Ohungarumlaut',
		u: 0x0150,
	},
	// LATIN CAPITAL LETTER GHA
	Oi: {
		n: 'Oi',
		u: 0x01a2,
	},
	// LATIN CAPITAL LETTER O WITH INVERTED BREVE
	Oinvertedbreve: {
		n: 'Oinvertedbreve',
		u: 0x020e,
	},
	// LATIN CAPITAL LETTER O WITH MACRON
	Omacron: {
		n: 'Omacron',
		u: 0x014c,
	},
	// LATIN CAPITAL LETTER O WITH MACRON AND ACUTE
	Omacronacute: {
		n: 'Omacronacute',
		u: 0x1e52,
	},
	// LATIN CAPITAL LETTER O WITH MACRON AND GRAVE
	Omacrongrave: {
		n: 'Omacrongrave',
		u: 0x1e50,
	},
	// OHM SIGN
	Omega: {
		n: 'Omega',
		u: 0x2126,
		f: [0x03a9],
	},
	// CYRILLIC CAPITAL LETTER OMEGA
	Omegacyrillic: {
		n: 'Omegacyrillic',
		u: 0x0460,
	},
	// GREEK CAPITAL LETTER OMEGA
	Omegagreek: {
		n: 'Omegagreek',
		u: 0x03a9,
		f: [0x2126],
	},
	// CYRILLIC CAPITAL LETTER ROUND OMEGA
	Omegaroundcyrillic: {
		n: 'Omegaroundcyrillic',
		u: 0x047a,
	},
	// CYRILLIC CAPITAL LETTER OMEGA WITH TITLO
	Omegatitlocyrillic: {
		n: 'Omegatitlocyrillic',
		u: 0x047c,
	},
	// GREEK CAPITAL LETTER OMEGA WITH TONOS
	Omegatonos: {
		n: 'Omegatonos',
		u: 0x038f,
	},
	// GREEK CAPITAL LETTER OMICRON
	Omicron: {
		n: 'Omicron',
		u: 0x039f,
	},
	// GREEK CAPITAL LETTER OMICRON WITH TONOS
	Omicrontonos: {
		n: 'Omicrontonos',
		u: 0x038c,
	},
	// FULLWIDTH LATIN CAPITAL LETTER O
	Omonospace: {
		n: 'Omonospace',
		u: 0xff2f,
	},
	// ROMAN NUMERAL ONE
	Oneroman: {
		n: 'Oneroman',
		u: 0x2160,
	},
	// LATIN CAPITAL LETTER O WITH OGONEK
	Oogonek: {
		n: 'Oogonek',
		u: 0x01ea,
	},
	// LATIN CAPITAL LETTER O WITH OGONEK AND MACRON
	Oogonekmacron: {
		n: 'Oogonekmacron',
		u: 0x01ec,
	},
	// LATIN CAPITAL LETTER OPEN O
	Oopen: {
		n: 'Oopen',
		u: 0x0186,
	},
	// LATIN CAPITAL LETTER O WITH STROKE
	Oslash: {
		n: 'Oslash',
		u: 0x00d8,
	},
	// LATIN CAPITAL LETTER O WITH STROKE AND ACUTE
	Oslashacute: {
		n: 'Oslashacute',
		u: 0x01fe,
	},
	// <private-use-F7F8>
	Oslashsmall: {
		n: 'Oslashsmall',
		u: 0xf7f8,
		f: [0x00d8],
	},
	// <private-use-F76F>
	Osmall: {
		n: 'Osmall',
		u: 0xf76f,
		f: [0x004f],
	},
	// LATIN CAPITAL LETTER O WITH STROKE AND ACUTE
	Ostrokeacute: {
		n: 'Ostrokeacute',
		u: 0x01fe,
	},
	// CYRILLIC CAPITAL LETTER OT
	Otcyrillic: {
		n: 'Otcyrillic',
		u: 0x047e,
	},
	// LATIN CAPITAL LETTER O WITH TILDE
	Otilde: {
		n: 'Otilde',
		u: 0x00d5,
	},
	// LATIN CAPITAL LETTER O WITH TILDE AND ACUTE
	Otildeacute: {
		n: 'Otildeacute',
		u: 0x1e4c,
	},
	// LATIN CAPITAL LETTER O WITH TILDE AND DIAERESIS
	Otildedieresis: {
		n: 'Otildedieresis',
		u: 0x1e4e,
	},
	// <private-use-F7F5>
	Otildesmall: {
		n: 'Otildesmall',
		u: 0xf7f5,
		f: [0x00d5],
	},
	// LATIN CAPITAL LETTER P
	P: {
		n: 'P',
		u: 0x0050,
	},
	// LATIN CAPITAL LETTER P WITH ACUTE
	Pacute: {
		n: 'Pacute',
		u: 0x1e54,
	},
	// CIRCLED LATIN CAPITAL LETTER P
	Pcircle: {
		n: 'Pcircle',
		u: 0x24c5,
	},
	// LATIN CAPITAL LETTER P WITH DOT ABOVE
	Pdotaccent: {
		n: 'Pdotaccent',
		u: 0x1e56,
	},
	// CYRILLIC CAPITAL LETTER PE
	Pecyrillic: {
		n: 'Pecyrillic',
		u: 0x041f,
	},
	// ARMENIAN CAPITAL LETTER PEH
	Peharmenian: {
		n: 'Peharmenian',
		u: 0x054a,
	},
	// CYRILLIC CAPITAL LETTER PE WITH MIDDLE HOOK
	Pemiddlehookcyrillic: {
		n: 'Pemiddlehookcyrillic',
		u: 0x04a6,
	},
	// GREEK CAPITAL LETTER PHI
	Phi: {
		n: 'Phi',
		u: 0x03a6,
	},
	// LATIN CAPITAL LETTER P WITH HOOK
	Phook: {
		n: 'Phook',
		u: 0x01a4,
	},
	// GREEK CAPITAL LETTER PI
	Pi: {
		n: 'Pi',
		u: 0x03a0,
	},
	// ARMENIAN CAPITAL LETTER PIWR
	Piwrarmenian: {
		n: 'Piwrarmenian',
		u: 0x0553,
	},
	// FULLWIDTH LATIN CAPITAL LETTER P
	Pmonospace: {
		n: 'Pmonospace',
		u: 0xff30,
	},
	// GREEK CAPITAL LETTER PSI
	Psi: {
		n: 'Psi',
		u: 0x03a8,
	},
	// CYRILLIC CAPITAL LETTER PSI
	Psicyrillic: {
		n: 'Psicyrillic',
		u: 0x0470,
	},
	// <private-use-F770>
	Psmall: {
		n: 'Psmall',
		u: 0xf770,
		f: [0x0050],
	},
	// LATIN CAPITAL LETTER Q
	Q: {
		n: 'Q',
		u: 0x0051,
	},
	// CIRCLED LATIN CAPITAL LETTER Q
	Qcircle: {
		n: 'Qcircle',
		u: 0x24c6,
	},
	// FULLWIDTH LATIN CAPITAL LETTER Q
	Qmonospace: {
		n: 'Qmonospace',
		u: 0xff31,
	},
	// <private-use-F771>
	Qsmall: {
		n: 'Qsmall',
		u: 0xf771,
		f: [0x0051],
	},
	// LATIN CAPITAL LETTER R
	R: {
		n: 'R',
		u: 0x0052,
	},
	// ARMENIAN CAPITAL LETTER RA
	Raarmenian: {
		n: 'Raarmenian',
		u: 0x054c,
	},
	// LATIN CAPITAL LETTER R WITH ACUTE
	Racute: {
		n: 'Racute',
		u: 0x0154,
	},
	// LATIN CAPITAL LETTER R WITH CARON
	Rcaron: {
		n: 'Rcaron',
		u: 0x0158,
	},
	// LATIN CAPITAL LETTER R WITH CEDILLA
	Rcedilla: {
		n: 'Rcedilla',
		u: 0x0156,
	},
	// CIRCLED LATIN CAPITAL LETTER R
	Rcircle: {
		n: 'Rcircle',
		u: 0x24c7,
	},
	// LATIN CAPITAL LETTER R WITH CEDILLA
	Rcommaaccent: {
		n: 'Rcommaaccent',
		u: 0x0156,
	},
	// LATIN CAPITAL LETTER R WITH DOUBLE GRAVE
	Rdblgrave: {
		n: 'Rdblgrave',
		u: 0x0210,
	},
	// LATIN CAPITAL LETTER R WITH DOT ABOVE
	Rdotaccent: {
		n: 'Rdotaccent',
		u: 0x1e58,
	},
	// LATIN CAPITAL LETTER R WITH DOT BELOW
	Rdotbelow: {
		n: 'Rdotbelow',
		u: 0x1e5a,
	},
	// LATIN CAPITAL LETTER R WITH DOT BELOW AND MACRON
	Rdotbelowmacron: {
		n: 'Rdotbelowmacron',
		u: 0x1e5c,
	},
	// ARMENIAN CAPITAL LETTER REH
	Reharmenian: {
		n: 'Reharmenian',
		u: 0x0550,
	},
	// BLACK-LETTER CAPITAL R
	Rfraktur: {
		n: 'Rfraktur',
		u: 0x211c,
	},
	// GREEK CAPITAL LETTER RHO
	Rho: {
		n: 'Rho',
		u: 0x03a1,
	},
	// <private-use-F6FC>
	Ringsmall: {
		n: 'Ringsmall',
		u: 0xf6fc,
	},
	// LATIN CAPITAL LETTER R WITH INVERTED BREVE
	Rinvertedbreve: {
		n: 'Rinvertedbreve',
		u: 0x0212,
	},
	// LATIN CAPITAL LETTER R WITH LINE BELOW
	Rlinebelow: {
		n: 'Rlinebelow',
		u: 0x1e5e,
	},
	// FULLWIDTH LATIN CAPITAL LETTER R
	Rmonospace: {
		n: 'Rmonospace',
		u: 0xff32,
	},
	// <private-use-F772>
	Rsmall: {
		n: 'Rsmall',
		u: 0xf772,
		f: [0x0052],
	},
	// LATIN LETTER SMALL CAPITAL INVERTED R
	Rsmallinverted: {
		n: 'Rsmallinverted',
		u: 0x0281,
	},
	// MODIFIER LETTER SMALL CAPITAL INVERTED R
	Rsmallinvertedsuperior: {
		n: 'Rsmallinvertedsuperior',
		u: 0x02b6,
	},
	// LATIN CAPITAL LETTER S
	S: {
		n: 'S',
		u: 0x0053,
	},
	// BOX DRAWINGS LIGHT DOWN AND RIGHT
	SF010000: {
		n: 'SF010000',
		u: 0x250c,
	},
	// BOX DRAWINGS LIGHT UP AND RIGHT
	SF020000: {
		n: 'SF020000',
		u: 0x2514,
	},
	// BOX DRAWINGS LIGHT DOWN AND LEFT
	SF030000: {
		n: 'SF030000',
		u: 0x2510,
	},
	// BOX DRAWINGS LIGHT UP AND LEFT
	SF040000: {
		n: 'SF040000',
		u: 0x2518,
	},
	// BOX DRAWINGS LIGHT VERTICAL AND HORIZONTAL
	SF050000: {
		n: 'SF050000',
		u: 0x253c,
	},
	// BOX DRAWINGS LIGHT DOWN AND HORIZONTAL
	SF060000: {
		n: 'SF060000',
		u: 0x252c,
	},
	// BOX DRAWINGS LIGHT UP AND HORIZONTAL
	SF070000: {
		n: 'SF070000',
		u: 0x2534,
	},
	// BOX DRAWINGS LIGHT VERTICAL AND RIGHT
	SF080000: {
		n: 'SF080000',
		u: 0x251c,
	},
	// BOX DRAWINGS LIGHT VERTICAL AND LEFT
	SF090000: {
		n: 'SF090000',
		u: 0x2524,
	},
	// BOX DRAWINGS LIGHT HORIZONTAL
	SF100000: {
		n: 'SF100000',
		u: 0x2500,
	},
	// BOX DRAWINGS LIGHT VERTICAL
	SF110000: {
		n: 'SF110000',
		u: 0x2502,
	},
	// BOX DRAWINGS VERTICAL SINGLE AND LEFT DOUBLE
	SF190000: {
		n: 'SF190000',
		u: 0x2561,
	},
	// BOX DRAWINGS VERTICAL DOUBLE AND LEFT SINGLE
	SF200000: {
		n: 'SF200000',
		u: 0x2562,
	},
	// BOX DRAWINGS DOWN DOUBLE AND LEFT SINGLE
	SF210000: {
		n: 'SF210000',
		u: 0x2556,
	},
	// BOX DRAWINGS DOWN SINGLE AND LEFT DOUBLE
	SF220000: {
		n: 'SF220000',
		u: 0x2555,
	},
	// BOX DRAWINGS DOUBLE VERTICAL AND LEFT
	SF230000: {
		n: 'SF230000',
		u: 0x2563,
	},
	// BOX DRAWINGS DOUBLE VERTICAL
	SF240000: {
		n: 'SF240000',
		u: 0x2551,
	},
	// BOX DRAWINGS DOUBLE DOWN AND LEFT
	SF250000: {
		n: 'SF250000',
		u: 0x2557,
	},
	// BOX DRAWINGS DOUBLE UP AND LEFT
	SF260000: {
		n: 'SF260000',
		u: 0x255d,
	},
	// BOX DRAWINGS UP DOUBLE AND LEFT SINGLE
	SF270000: {
		n: 'SF270000',
		u: 0x255c,
	},
	// BOX DRAWINGS UP SINGLE AND LEFT DOUBLE
	SF280000: {
		n: 'SF280000',
		u: 0x255b,
	},
	// BOX DRAWINGS VERTICAL SINGLE AND RIGHT DOUBLE
	SF360000: {
		n: 'SF360000',
		u: 0x255e,
	},
	// BOX DRAWINGS VERTICAL DOUBLE AND RIGHT SINGLE
	SF370000: {
		n: 'SF370000',
		u: 0x255f,
	},
	// BOX DRAWINGS DOUBLE UP AND RIGHT
	SF380000: {
		n: 'SF380000',
		u: 0x255a,
	},
	// BOX DRAWINGS DOUBLE DOWN AND RIGHT
	SF390000: {
		n: 'SF390000',
		u: 0x2554,
	},
	// BOX DRAWINGS DOUBLE UP AND HORIZONTAL
	SF400000: {
		n: 'SF400000',
		u: 0x2569,
	},
	// BOX DRAWINGS DOUBLE DOWN AND HORIZONTAL
	SF410000: {
		n: 'SF410000',
		u: 0x2566,
	},
	// BOX DRAWINGS DOUBLE VERTICAL AND RIGHT
	SF420000: {
		n: 'SF420000',
		u: 0x2560,
	},
	// BOX DRAWINGS DOUBLE HORIZONTAL
	SF430000: {
		n: 'SF430000',
		u: 0x2550,
	},
	// BOX DRAWINGS DOUBLE VERTICAL AND HORIZONTAL
	SF440000: {
		n: 'SF440000',
		u: 0x256c,
	},
	// BOX DRAWINGS UP SINGLE AND HORIZONTAL DOUBLE
	SF450000: {
		n: 'SF450000',
		u: 0x2567,
	},
	// BOX DRAWINGS UP DOUBLE AND HORIZONTAL SINGLE
	SF460000: {
		n: 'SF460000',
		u: 0x2568,
	},
	// BOX DRAWINGS DOWN SINGLE AND HORIZONTAL DOUBLE
	SF470000: {
		n: 'SF470000',
		u: 0x2564,
	},
	// BOX DRAWINGS DOWN DOUBLE AND HORIZONTAL SINGLE
	SF480000: {
		n: 'SF480000',
		u: 0x2565,
	},
	// BOX DRAWINGS UP DOUBLE AND RIGHT SINGLE
	SF490000: {
		n: 'SF490000',
		u: 0x2559,
	},
	// BOX DRAWINGS UP SINGLE AND RIGHT DOUBLE
	SF500000: {
		n: 'SF500000',
		u: 0x2558,
	},
	// BOX DRAWINGS DOWN SINGLE AND RIGHT DOUBLE
	SF510000: {
		n: 'SF510000',
		u: 0x2552,
	},
	// BOX DRAWINGS DOWN DOUBLE AND RIGHT SINGLE
	SF520000: {
		n: 'SF520000',
		u: 0x2553,
	},
	// BOX DRAWINGS VERTICAL DOUBLE AND HORIZONTAL SINGLE
	SF530000: {
		n: 'SF530000',
		u: 0x256b,
	},
	// BOX DRAWINGS VERTICAL SINGLE AND HORIZONTAL DOUBLE
	SF540000: {
		n: 'SF540000',
		u: 0x256a,
	},
	// LATIN CAPITAL LETTER S WITH ACUTE
	Sacute: {
		n: 'Sacute',
		u: 0x015a,
	},
	// LATIN CAPITAL LETTER S WITH ACUTE AND DOT ABOVE
	Sacutedotaccent: {
		n: 'Sacutedotaccent',
		u: 0x1e64,
	},
	// GREEK LETTER SAMPI
	Sampigreek: {
		n: 'Sampigreek',
		u: 0x03e0,
	},
	// LATIN CAPITAL LETTER S WITH CARON
	Scaron: {
		n: 'Scaron',
		u: 0x0160,
	},
	// LATIN CAPITAL LETTER S WITH CARON AND DOT ABOVE
	Scarondotaccent: {
		n: 'Scarondotaccent',
		u: 0x1e66,
	},
	// <private-use-F6FD>
	Scaronsmall: {
		n: 'Scaronsmall',
		u: 0xf6fd,
		f: [0x0160],
	},
	// LATIN CAPITAL LETTER S WITH CEDILLA
	Scedilla: {
		n: 'Scedilla',
		u: 0x015e,
	},
	// LATIN CAPITAL LETTER SCHWA
	Schwa: {
		n: 'Schwa',
		u: 0x018f,
	},
	// CYRILLIC CAPITAL LETTER SCHWA
	Schwacyrillic: {
		n: 'Schwacyrillic',
		u: 0x04d8,
	},
	// CYRILLIC CAPITAL LETTER SCHWA WITH DIAERESIS
	Schwadieresiscyrillic: {
		n: 'Schwadieresiscyrillic',
		u: 0x04da,
	},
	// CIRCLED LATIN CAPITAL LETTER S
	Scircle: {
		n: 'Scircle',
		u: 0x24c8,
	},
	// LATIN CAPITAL LETTER S WITH CIRCUMFLEX
	Scircumflex: {
		n: 'Scircumflex',
		u: 0x015c,
	},
	// LATIN CAPITAL LETTER S WITH COMMA BELOW
	Scommaaccent: {
		n: 'Scommaaccent',
		u: 0x0218,
	},
	// LATIN CAPITAL LETTER S WITH DOT ABOVE
	Sdotaccent: {
		n: 'Sdotaccent',
		u: 0x1e60,
	},
	// LATIN CAPITAL LETTER S WITH DOT BELOW
	Sdotbelow: {
		n: 'Sdotbelow',
		u: 0x1e62,
	},
	// LATIN CAPITAL LETTER S WITH DOT BELOW AND DOT ABOVE
	Sdotbelowdotaccent: {
		n: 'Sdotbelowdotaccent',
		u: 0x1e68,
	},
	// ARMENIAN CAPITAL LETTER SEH
	Seharmenian: {
		n: 'Seharmenian',
		u: 0x054d,
	},
	// ROMAN NUMERAL SEVEN
	Sevenroman: {
		n: 'Sevenroman',
		u: 0x2166,
	},
	// ARMENIAN CAPITAL LETTER SHA
	Shaarmenian: {
		n: 'Shaarmenian',
		u: 0x0547,
	},
	// CYRILLIC CAPITAL LETTER SHA
	Shacyrillic: {
		n: 'Shacyrillic',
		u: 0x0428,
	},
	// CYRILLIC CAPITAL LETTER SHCHA
	Shchacyrillic: {
		n: 'Shchacyrillic',
		u: 0x0429,
	},
	// COPTIC CAPITAL LETTER SHEI
	Sheicoptic: {
		n: 'Sheicoptic',
		u: 0x03e2,
	},
	// CYRILLIC CAPITAL LETTER SHHA
	Shhacyrillic: {
		n: 'Shhacyrillic',
		u: 0x04ba,
	},
	// COPTIC CAPITAL LETTER SHIMA
	Shimacoptic: {
		n: 'Shimacoptic',
		u: 0x03ec,
	},
	// GREEK CAPITAL LETTER SIGMA
	Sigma: {
		n: 'Sigma',
		u: 0x03a3,
	},
	// ROMAN NUMERAL SIX
	Sixroman: {
		n: 'Sixroman',
		u: 0x2165,
	},
	// FULLWIDTH LATIN CAPITAL LETTER S
	Smonospace: {
		n: 'Smonospace',
		u: 0xff33,
	},
	// CYRILLIC CAPITAL LETTER SOFT SIGN
	Softsigncyrillic: {
		n: 'Softsigncyrillic',
		u: 0x042c,
	},
	// <private-use-F773>
	Ssmall: {
		n: 'Ssmall',
		u: 0xf773,
		f: [0x0053],
	},
	// GREEK LETTER STIGMA
	Stigmagreek: {
		n: 'Stigmagreek',
		u: 0x03da,
	},
	// LATIN CAPITAL LETTER T
	T: {
		n: 'T',
		u: 0x0054,
	},
	// GREEK CAPITAL LETTER TAU
	Tau: {
		n: 'Tau',
		u: 0x03a4,
	},
	// LATIN CAPITAL LETTER T WITH STROKE
	Tbar: {
		n: 'Tbar',
		u: 0x0166,
	},
	// LATIN CAPITAL LETTER T WITH CARON
	Tcaron: {
		n: 'Tcaron',
		u: 0x0164,
	},
	// LATIN CAPITAL LETTER T WITH CEDILLA
	Tcedilla: {
		n: 'Tcedilla',
		u: 0x0162,
	},
	// CIRCLED LATIN CAPITAL LETTER T
	Tcircle: {
		n: 'Tcircle',
		u: 0x24c9,
	},
	// LATIN CAPITAL LETTER T WITH CIRCUMFLEX BELOW
	Tcircumflexbelow: {
		n: 'Tcircumflexbelow',
		u: 0x1e70,
	},
	// LATIN CAPITAL LETTER T WITH CEDILLA
	Tcommaaccent: {
		n: 'Tcommaaccent',
		u: 0x0162,
	},
	// LATIN CAPITAL LETTER T WITH DOT ABOVE
	Tdotaccent: {
		n: 'Tdotaccent',
		u: 0x1e6a,
	},
	// LATIN CAPITAL LETTER T WITH DOT BELOW
	Tdotbelow: {
		n: 'Tdotbelow',
		u: 0x1e6c,
	},
	// CYRILLIC CAPITAL LETTER TE
	Tecyrillic: {
		n: 'Tecyrillic',
		u: 0x0422,
	},
	// CYRILLIC CAPITAL LETTER TE WITH DESCENDER
	Tedescendercyrillic: {
		n: 'Tedescendercyrillic',
		u: 0x04ac,
	},
	// ROMAN NUMERAL TEN
	Tenroman: {
		n: 'Tenroman',
		u: 0x2169,
	},
	// CYRILLIC CAPITAL LIGATURE TE TSE
	Tetsecyrillic: {
		n: 'Tetsecyrillic',
		u: 0x04b4,
	},
	// GREEK CAPITAL LETTER THETA
	Theta: {
		n: 'Theta',
		u: 0x0398,
	},
	// LATIN CAPITAL LETTER T WITH HOOK
	Thook: {
		n: 'Thook',
		u: 0x01ac,
	},
	// LATIN CAPITAL LETTER THORN
	Thorn: {
		n: 'Thorn',
		u: 0x00de,
	},
	// <private-use-F7FE>
	Thornsmall: {
		n: 'Thornsmall',
		u: 0xf7fe,
		f: [0x00de],
	},
	// ROMAN NUMERAL THREE
	Threeroman: {
		n: 'Threeroman',
		u: 0x2162,
	},
	// <private-use-F6FE>
	Tildesmall: {
		n: 'Tildesmall',
		u: 0xf6fe,
	},
	// ARMENIAN CAPITAL LETTER TIWN
	Tiwnarmenian: {
		n: 'Tiwnarmenian',
		u: 0x054f,
	},
	// LATIN CAPITAL LETTER T WITH LINE BELOW
	Tlinebelow: {
		n: 'Tlinebelow',
		u: 0x1e6e,
	},
	// FULLWIDTH LATIN CAPITAL LETTER T
	Tmonospace: {
		n: 'Tmonospace',
		u: 0xff34,
	},
	// ARMENIAN CAPITAL LETTER TO
	Toarmenian: {
		n: 'Toarmenian',
		u: 0x0539,
	},
	// LATIN CAPITAL LETTER TONE FIVE
	Tonefive: {
		n: 'Tonefive',
		u: 0x01bc,
	},
	// LATIN CAPITAL LETTER TONE SIX
	Tonesix: {
		n: 'Tonesix',
		u: 0x0184,
	},
	// LATIN CAPITAL LETTER TONE TWO
	Tonetwo: {
		n: 'Tonetwo',
		u: 0x01a7,
	},
	// LATIN CAPITAL LETTER T WITH RETROFLEX HOOK
	Tretroflexhook: {
		n: 'Tretroflexhook',
		u: 0x01ae,
	},
	// CYRILLIC CAPITAL LETTER TSE
	Tsecyrillic: {
		n: 'Tsecyrillic',
		u: 0x0426,
	},
	// CYRILLIC CAPITAL LETTER TSHE
	Tshecyrillic: {
		n: 'Tshecyrillic',
		u: 0x040b,
	},
	// <private-use-F774>
	Tsmall: {
		n: 'Tsmall',
		u: 0xf774,
		f: [0x0054],
	},
	// ROMAN NUMERAL TWELVE
	Twelveroman: {
		n: 'Twelveroman',
		u: 0x216b,
	},
	// ROMAN NUMERAL TWO
	Tworoman: {
		n: 'Tworoman',
		u: 0x2161,
	},
	// LATIN CAPITAL LETTER U
	U: {
		n: 'U',
		u: 0x0055,
	},
	// LATIN CAPITAL LETTER U WITH ACUTE
	Uacute: {
		n: 'Uacute',
		u: 0x00da,
	},
	// <private-use-F7FA>
	Uacutesmall: {
		n: 'Uacutesmall',
		u: 0xf7fa,
		f: [0x00da],
	},
	// LATIN CAPITAL LETTER U WITH BREVE
	Ubreve: {
		n: 'Ubreve',
		u: 0x016c,
	},
	// LATIN CAPITAL LETTER U WITH CARON
	Ucaron: {
		n: 'Ucaron',
		u: 0x01d3,
	},
	// CIRCLED LATIN CAPITAL LETTER U
	Ucircle: {
		n: 'Ucircle',
		u: 0x24ca,
	},
	// LATIN CAPITAL LETTER U WITH CIRCUMFLEX
	Ucircumflex: {
		n: 'Ucircumflex',
		u: 0x00db,
	},
	// LATIN CAPITAL LETTER U WITH CIRCUMFLEX BELOW
	Ucircumflexbelow: {
		n: 'Ucircumflexbelow',
		u: 0x1e76,
	},
	// <private-use-F7FB>
	Ucircumflexsmall: {
		n: 'Ucircumflexsmall',
		u: 0xf7fb,
		f: [0x00db],
	},
	// CYRILLIC CAPITAL LETTER U
	Ucyrillic: {
		n: 'Ucyrillic',
		u: 0x0423,
	},
	// LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
	Udblacute: {
		n: 'Udblacute',
		u: 0x0170,
	},
	// LATIN CAPITAL LETTER U WITH DOUBLE GRAVE
	Udblgrave: {
		n: 'Udblgrave',
		u: 0x0214,
	},
	// LATIN CAPITAL LETTER U WITH DIAERESIS
	Udieresis: {
		n: 'Udieresis',
		u: 0x00dc,
	},
	// LATIN CAPITAL LETTER U WITH DIAERESIS AND ACUTE
	Udieresisacute: {
		n: 'Udieresisacute',
		u: 0x01d7,
	},
	// LATIN CAPITAL LETTER U WITH DIAERESIS BELOW
	Udieresisbelow: {
		n: 'Udieresisbelow',
		u: 0x1e72,
	},
	// LATIN CAPITAL LETTER U WITH DIAERESIS AND CARON
	Udieresiscaron: {
		n: 'Udieresiscaron',
		u: 0x01d9,
	},
	// CYRILLIC CAPITAL LETTER U WITH DIAERESIS
	Udieresiscyrillic: {
		n: 'Udieresiscyrillic',
		u: 0x04f0,
	},
	// LATIN CAPITAL LETTER U WITH DIAERESIS AND GRAVE
	Udieresisgrave: {
		n: 'Udieresisgrave',
		u: 0x01db,
	},
	// LATIN CAPITAL LETTER U WITH DIAERESIS AND MACRON
	Udieresismacron: {
		n: 'Udieresismacron',
		u: 0x01d5,
	},
	// <private-use-F7FC>
	Udieresissmall: {
		n: 'Udieresissmall',
		u: 0xf7fc,
		f: [0x00dc],
	},
	// LATIN CAPITAL LETTER U WITH DOT BELOW
	Udotbelow: {
		n: 'Udotbelow',
		u: 0x1ee4,
	},
	// LATIN CAPITAL LETTER U WITH GRAVE
	Ugrave: {
		n: 'Ugrave',
		u: 0x00d9,
	},
	// <private-use-F7F9>
	Ugravesmall: {
		n: 'Ugravesmall',
		u: 0xf7f9,
		f: [0x00d9],
	},
	// LATIN CAPITAL LETTER U WITH HOOK ABOVE
	Uhookabove: {
		n: 'Uhookabove',
		u: 0x1ee6,
	},
	// LATIN CAPITAL LETTER U WITH HORN
	Uhorn: {
		n: 'Uhorn',
		u: 0x01af,
	},
	// LATIN CAPITAL LETTER U WITH HORN AND ACUTE
	Uhornacute: {
		n: 'Uhornacute',
		u: 0x1ee8,
	},
	// LATIN CAPITAL LETTER U WITH HORN AND DOT BELOW
	Uhorndotbelow: {
		n: 'Uhorndotbelow',
		u: 0x1ef0,
	},
	// LATIN CAPITAL LETTER U WITH HORN AND GRAVE
	Uhorngrave: {
		n: 'Uhorngrave',
		u: 0x1eea,
	},
	// LATIN CAPITAL LETTER U WITH HORN AND HOOK ABOVE
	Uhornhookabove: {
		n: 'Uhornhookabove',
		u: 0x1eec,
	},
	// LATIN CAPITAL LETTER U WITH HORN AND TILDE
	Uhorntilde: {
		n: 'Uhorntilde',
		u: 0x1eee,
	},
	// LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
	Uhungarumlaut: {
		n: 'Uhungarumlaut',
		u: 0x0170,
	},
	// CYRILLIC CAPITAL LETTER U WITH DOUBLE ACUTE
	Uhungarumlautcyrillic: {
		n: 'Uhungarumlautcyrillic',
		u: 0x04f2,
	},
	// LATIN CAPITAL LETTER U WITH INVERTED BREVE
	Uinvertedbreve: {
		n: 'Uinvertedbreve',
		u: 0x0216,
	},
	// CYRILLIC CAPITAL LETTER UK
	Ukcyrillic: {
		n: 'Ukcyrillic',
		u: 0x0478,
	},
	// LATIN CAPITAL LETTER U WITH MACRON
	Umacron: {
		n: 'Umacron',
		u: 0x016a,
	},
	// CYRILLIC CAPITAL LETTER U WITH MACRON
	Umacroncyrillic: {
		n: 'Umacroncyrillic',
		u: 0x04ee,
	},
	// LATIN CAPITAL LETTER U WITH MACRON AND DIAERESIS
	Umacrondieresis: {
		n: 'Umacrondieresis',
		u: 0x1e7a,
	},
	// FULLWIDTH LATIN CAPITAL LETTER U
	Umonospace: {
		n: 'Umonospace',
		u: 0xff35,
	},
	// LATIN CAPITAL LETTER U WITH OGONEK
	Uogonek: {
		n: 'Uogonek',
		u: 0x0172,
	},
	// GREEK CAPITAL LETTER UPSILON
	Upsilon: {
		n: 'Upsilon',
		u: 0x03a5,
	},
	// GREEK UPSILON WITH HOOK SYMBOL
	Upsilon1: {
		n: 'Upsilon1',
		u: 0x03d2,
	},
	// GREEK UPSILON WITH ACUTE AND HOOK SYMBOL
	Upsilonacutehooksymbolgreek: {
		n: 'Upsilonacutehooksymbolgreek',
		u: 0x03d3,
	},
	// LATIN CAPITAL LETTER UPSILON
	Upsilonafrican: {
		n: 'Upsilonafrican',
		u: 0x01b1,
	},
	// GREEK CAPITAL LETTER UPSILON WITH DIALYTIKA
	Upsilondieresis: {
		n: 'Upsilondieresis',
		u: 0x03ab,
	},
	// GREEK UPSILON WITH DIAERESIS AND HOOK SYMBOL
	Upsilondieresishooksymbolgreek: {
		n: 'Upsilondieresishooksymbolgreek',
		u: 0x03d4,
	},
	// GREEK UPSILON WITH HOOK SYMBOL
	Upsilonhooksymbol: {
		n: 'Upsilonhooksymbol',
		u: 0x03d2,
	},
	// GREEK CAPITAL LETTER UPSILON WITH TONOS
	Upsilontonos: {
		n: 'Upsilontonos',
		u: 0x038e,
	},
	// LATIN CAPITAL LETTER U WITH RING ABOVE
	Uring: {
		n: 'Uring',
		u: 0x016e,
	},
	// CYRILLIC CAPITAL LETTER SHORT U
	Ushortcyrillic: {
		n: 'Ushortcyrillic',
		u: 0x040e,
	},
	// <private-use-F775>
	Usmall: {
		n: 'Usmall',
		u: 0xf775,
		f: [0x0055],
	},
	// CYRILLIC CAPITAL LETTER STRAIGHT U
	Ustraightcyrillic: {
		n: 'Ustraightcyrillic',
		u: 0x04ae,
	},
	// CYRILLIC CAPITAL LETTER STRAIGHT U WITH STROKE
	Ustraightstrokecyrillic: {
		n: 'Ustraightstrokecyrillic',
		u: 0x04b0,
	},
	// LATIN CAPITAL LETTER U WITH TILDE
	Utilde: {
		n: 'Utilde',
		u: 0x0168,
	},
	// LATIN CAPITAL LETTER U WITH TILDE AND ACUTE
	Utildeacute: {
		n: 'Utildeacute',
		u: 0x1e78,
	},
	// LATIN CAPITAL LETTER U WITH TILDE BELOW
	Utildebelow: {
		n: 'Utildebelow',
		u: 0x1e74,
	},
	// LATIN CAPITAL LETTER V
	V: {
		n: 'V',
		u: 0x0056,
	},
	// CIRCLED LATIN CAPITAL LETTER V
	Vcircle: {
		n: 'Vcircle',
		u: 0x24cb,
	},
	// LATIN CAPITAL LETTER V WITH DOT BELOW
	Vdotbelow: {
		n: 'Vdotbelow',
		u: 0x1e7e,
	},
	// CYRILLIC CAPITAL LETTER VE
	Vecyrillic: {
		n: 'Vecyrillic',
		u: 0x0412,
	},
	// ARMENIAN CAPITAL LETTER VEW
	Vewarmenian: {
		n: 'Vewarmenian',
		u: 0x054e,
	},
	// LATIN CAPITAL LETTER V WITH HOOK
	Vhook: {
		n: 'Vhook',
		u: 0x01b2,
	},
	// FULLWIDTH LATIN CAPITAL LETTER V
	Vmonospace: {
		n: 'Vmonospace',
		u: 0xff36,
	},
	// ARMENIAN CAPITAL LETTER VO
	Voarmenian: {
		n: 'Voarmenian',
		u: 0x0548,
	},
	// <private-use-F776>
	Vsmall: {
		n: 'Vsmall',
		u: 0xf776,
		f: [0x0056],
	},
	// LATIN CAPITAL LETTER V WITH TILDE
	Vtilde: {
		n: 'Vtilde',
		u: 0x1e7c,
	},
	// LATIN CAPITAL LETTER W
	W: {
		n: 'W',
		u: 0x0057,
	},
	// LATIN CAPITAL LETTER W WITH ACUTE
	Wacute: {
		n: 'Wacute',
		u: 0x1e82,
	},
	// CIRCLED LATIN CAPITAL LETTER W
	Wcircle: {
		n: 'Wcircle',
		u: 0x24cc,
	},
	// LATIN CAPITAL LETTER W WITH CIRCUMFLEX
	Wcircumflex: {
		n: 'Wcircumflex',
		u: 0x0174,
	},
	// LATIN CAPITAL LETTER W WITH DIAERESIS
	Wdieresis: {
		n: 'Wdieresis',
		u: 0x1e84,
	},
	// LATIN CAPITAL LETTER W WITH DOT ABOVE
	Wdotaccent: {
		n: 'Wdotaccent',
		u: 0x1e86,
	},
	// LATIN CAPITAL LETTER W WITH DOT BELOW
	Wdotbelow: {
		n: 'Wdotbelow',
		u: 0x1e88,
	},
	// LATIN CAPITAL LETTER W WITH GRAVE
	Wgrave: {
		n: 'Wgrave',
		u: 0x1e80,
	},
	// FULLWIDTH LATIN CAPITAL LETTER W
	Wmonospace: {
		n: 'Wmonospace',
		u: 0xff37,
	},
	// <private-use-F777>
	Wsmall: {
		n: 'Wsmall',
		u: 0xf777,
		f: [0x0057],
	},
	// LATIN CAPITAL LETTER X
	X: {
		n: 'X',
		u: 0x0058,
	},
	// CIRCLED LATIN CAPITAL LETTER X
	Xcircle: {
		n: 'Xcircle',
		u: 0x24cd,
	},
	// LATIN CAPITAL LETTER X WITH DIAERESIS
	Xdieresis: {
		n: 'Xdieresis',
		u: 0x1e8c,
	},
	// LATIN CAPITAL LETTER X WITH DOT ABOVE
	Xdotaccent: {
		n: 'Xdotaccent',
		u: 0x1e8a,
	},
	// ARMENIAN CAPITAL LETTER XEH
	Xeharmenian: {
		n: 'Xeharmenian',
		u: 0x053d,
	},
	// GREEK CAPITAL LETTER XI
	Xi: {
		n: 'Xi',
		u: 0x039e,
	},
	// FULLWIDTH LATIN CAPITAL LETTER X
	Xmonospace: {
		n: 'Xmonospace',
		u: 0xff38,
	},
	// <private-use-F778>
	Xsmall: {
		n: 'Xsmall',
		u: 0xf778,
		f: [0x0058],
	},
	// LATIN CAPITAL LETTER Y
	Y: {
		n: 'Y',
		u: 0x0059,
	},
	// LATIN CAPITAL LETTER Y WITH ACUTE
	Yacute: {
		n: 'Yacute',
		u: 0x00dd,
	},
	// <private-use-F7FD>
	Yacutesmall: {
		n: 'Yacutesmall',
		u: 0xf7fd,
		f: [0x00dd],
	},
	// CYRILLIC CAPITAL LETTER YAT
	Yatcyrillic: {
		n: 'Yatcyrillic',
		u: 0x0462,
	},
	// CIRCLED LATIN CAPITAL LETTER Y
	Ycircle: {
		n: 'Ycircle',
		u: 0x24ce,
	},
	// LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
	Ycircumflex: {
		n: 'Ycircumflex',
		u: 0x0176,
	},
	// LATIN CAPITAL LETTER Y WITH DIAERESIS
	Ydieresis: {
		n: 'Ydieresis',
		u: 0x0178,
	},
	// <private-use-F7FF>
	Ydieresissmall: {
		n: 'Ydieresissmall',
		u: 0xf7ff,
		f: [0x0178],
	},
	// LATIN CAPITAL LETTER Y WITH DOT ABOVE
	Ydotaccent: {
		n: 'Ydotaccent',
		u: 0x1e8e,
	},
	// LATIN CAPITAL LETTER Y WITH DOT BELOW
	Ydotbelow: {
		n: 'Ydotbelow',
		u: 0x1ef4,
	},
	// CYRILLIC CAPITAL LETTER YERU
	Yericyrillic: {
		n: 'Yericyrillic',
		u: 0x042b,
	},
	// CYRILLIC CAPITAL LETTER YERU WITH DIAERESIS
	Yerudieresiscyrillic: {
		n: 'Yerudieresiscyrillic',
		u: 0x04f8,
	},
	// LATIN CAPITAL LETTER Y WITH GRAVE
	Ygrave: {
		n: 'Ygrave',
		u: 0x1ef2,
	},
	// LATIN CAPITAL LETTER Y WITH HOOK
	Yhook: {
		n: 'Yhook',
		u: 0x01b3,
	},
	// LATIN CAPITAL LETTER Y WITH HOOK ABOVE
	Yhookabove: {
		n: 'Yhookabove',
		u: 0x1ef6,
	},
	// ARMENIAN CAPITAL LETTER YI
	Yiarmenian: {
		n: 'Yiarmenian',
		u: 0x0545,
	},
	// CYRILLIC CAPITAL LETTER YI
	Yicyrillic: {
		n: 'Yicyrillic',
		u: 0x0407,
	},
	// ARMENIAN CAPITAL LETTER YIWN
	Yiwnarmenian: {
		n: 'Yiwnarmenian',
		u: 0x0552,
	},
	// FULLWIDTH LATIN CAPITAL LETTER Y
	Ymonospace: {
		n: 'Ymonospace',
		u: 0xff39,
	},
	// <private-use-F779>
	Ysmall: {
		n: 'Ysmall',
		u: 0xf779,
		f: [0x0059],
	},
	// LATIN CAPITAL LETTER Y WITH TILDE
	Ytilde: {
		n: 'Ytilde',
		u: 0x1ef8,
	},
	// CYRILLIC CAPITAL LETTER BIG YUS
	Yusbigcyrillic: {
		n: 'Yusbigcyrillic',
		u: 0x046a,
	},
	// CYRILLIC CAPITAL LETTER IOTIFIED BIG YUS
	Yusbigiotifiedcyrillic: {
		n: 'Yusbigiotifiedcyrillic',
		u: 0x046c,
	},
	// CYRILLIC CAPITAL LETTER LITTLE YUS
	Yuslittlecyrillic: {
		n: 'Yuslittlecyrillic',
		u: 0x0466,
	},
	// CYRILLIC CAPITAL LETTER IOTIFIED LITTLE YUS
	Yuslittleiotifiedcyrillic: {
		n: 'Yuslittleiotifiedcyrillic',
		u: 0x0468,
	},
	// LATIN CAPITAL LETTER Z
	Z: {
		n: 'Z',
		u: 0x005a,
	},
	// ARMENIAN CAPITAL LETTER ZA
	Zaarmenian: {
		n: 'Zaarmenian',
		u: 0x0536,
	},
	// LATIN CAPITAL LETTER Z WITH ACUTE
	Zacute: {
		n: 'Zacute',
		u: 0x0179,
	},
	// LATIN CAPITAL LETTER Z WITH CARON
	Zcaron: {
		n: 'Zcaron',
		u: 0x017d,
	},
	// <private-use-F6FF>
	Zcaronsmall: {
		n: 'Zcaronsmall',
		u: 0xf6ff,
		f: [0x017d],
	},
	// CIRCLED LATIN CAPITAL LETTER Z
	Zcircle: {
		n: 'Zcircle',
		u: 0x24cf,
	},
	// LATIN CAPITAL LETTER Z WITH CIRCUMFLEX
	Zcircumflex: {
		n: 'Zcircumflex',
		u: 0x1e90,
	},
	// LATIN CAPITAL LETTER Z WITH DOT ABOVE
	Zdot: {
		n: 'Zdot',
		u: 0x017b,
	},
	// LATIN CAPITAL LETTER Z WITH DOT ABOVE
	Zdotaccent: {
		n: 'Zdotaccent',
		u: 0x017b,
	},
	// LATIN CAPITAL LETTER Z WITH DOT BELOW
	Zdotbelow: {
		n: 'Zdotbelow',
		u: 0x1e92,
	},
	// CYRILLIC CAPITAL LETTER ZE
	Zecyrillic: {
		n: 'Zecyrillic',
		u: 0x0417,
	},
	// CYRILLIC CAPITAL LETTER ZE WITH DESCENDER
	Zedescendercyrillic: {
		n: 'Zedescendercyrillic',
		u: 0x0498,
	},
	// CYRILLIC CAPITAL LETTER ZE WITH DIAERESIS
	Zedieresiscyrillic: {
		n: 'Zedieresiscyrillic',
		u: 0x04de,
	},
	// GREEK CAPITAL LETTER ZETA
	Zeta: {
		n: 'Zeta',
		u: 0x0396,
	},
	// ARMENIAN CAPITAL LETTER ZHE
	Zhearmenian: {
		n: 'Zhearmenian',
		u: 0x053a,
	},
	// CYRILLIC CAPITAL LETTER ZHE WITH BREVE
	Zhebrevecyrillic: {
		n: 'Zhebrevecyrillic',
		u: 0x04c1,
	},
	// CYRILLIC CAPITAL LETTER ZHE
	Zhecyrillic: {
		n: 'Zhecyrillic',
		u: 0x0416,
	},
	// CYRILLIC CAPITAL LETTER ZHE WITH DESCENDER
	Zhedescendercyrillic: {
		n: 'Zhedescendercyrillic',
		u: 0x0496,
	},
	// CYRILLIC CAPITAL LETTER ZHE WITH DIAERESIS
	Zhedieresiscyrillic: {
		n: 'Zhedieresiscyrillic',
		u: 0x04dc,
	},
	// LATIN CAPITAL LETTER Z WITH LINE BELOW
	Zlinebelow: {
		n: 'Zlinebelow',
		u: 0x1e94,
	},
	// FULLWIDTH LATIN CAPITAL LETTER Z
	Zmonospace: {
		n: 'Zmonospace',
		u: 0xff3a,
	},
	// <private-use-F77A>
	Zsmall: {
		n: 'Zsmall',
		u: 0xf77a,
		f: [0x005a],
	},
	// LATIN CAPITAL LETTER Z WITH STROKE
	Zstroke: {
		n: 'Zstroke',
		u: 0x01b5,
	},
	// LATIN SMALL LETTER A
	a: {
		n: 'a',
		u: 0x0061,
	},
	// UPPER BLADE SCISSORS
	a1: {
		n: 'a1',
		u: 0x2701,
		z: true,
	},
	// STAR OF DAVID
	a10: {
		n: 'a10',
		u: 0x2721,
		z: true,
	},
	// HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT
	a100: {
		n: 'a100',
		u: 0x275e,
		z: true,
	},
	// CURVED STEM PARAGRAPH SIGN ORNAMENT
	a101: {
		n: 'a101',
		u: 0x2761,
		z: true,
	},
	// HEAVY EXCLAMATION MARK ORNAMENT
	a102: {
		n: 'a102',
		u: 0x2762,
		z: true,
	},
	// HEAVY HEART EXCLAMATION MARK ORNAMENT
	a103: {
		n: 'a103',
		u: 0x2763,
		z: true,
	},
	// HEAVY BLACK HEART
	a104: {
		n: 'a104',
		u: 0x2764,
		z: true,
	},
	// UPPER RIGHT PENCIL
	a105: {
		n: 'a105',
		u: 0x2710,
		z: true,
	},
	// ROTATED HEAVY BLACK HEART BULLET
	a106: {
		n: 'a106',
		u: 0x2765,
		z: true,
	},
	// FLORAL HEART
	a107: {
		n: 'a107',
		u: 0x2766,
		z: true,
	},
	// ROTATED FLORAL HEART BULLET
	a108: {
		n: 'a108',
		u: 0x2767,
		z: true,
	},
	// BLACK SPADE SUIT
	a109: {
		n: 'a109',
		u: 0x2660,
		z: true,
	},
	// BLACK RIGHT POINTING INDEX
	a11: {
		n: 'a11',
		u: 0x261b,
		z: true,
	},
	// BLACK HEART SUIT
	a110: {
		n: 'a110',
		u: 0x2665,
		z: true,
	},
	// BLACK DIAMOND SUIT
	a111: {
		n: 'a111',
		u: 0x2666,
		z: true,
	},
	// BLACK CLUB SUIT
	a112: {
		n: 'a112',
		u: 0x2663,
		z: true,
	},
	// ENVELOPE
	a117: {
		n: 'a117',
		u: 0x2709,
		z: true,
	},
	// AIRPLANE
	a118: {
		n: 'a118',
		u: 0x2708,
		z: true,
	},
	// TAPE DRIVE
	a119: {
		n: 'a119',
		u: 0x2707,
		z: true,
	},
	// WHITE RIGHT POINTING INDEX
	a12: {
		n: 'a12',
		u: 0x261e,
		z: true,
	},
	// CIRCLED DIGIT ONE
	a120: {
		n: 'a120',
		u: 0x2460,
		z: true,
	},
	// CIRCLED DIGIT TWO
	a121: {
		n: 'a121',
		u: 0x2461,
		z: true,
	},
	// CIRCLED DIGIT THREE
	a122: {
		n: 'a122',
		u: 0x2462,
		z: true,
	},
	// CIRCLED DIGIT FOUR
	a123: {
		n: 'a123',
		u: 0x2463,
		z: true,
	},
	// CIRCLED DIGIT FIVE
	a124: {
		n: 'a124',
		u: 0x2464,
		z: true,
	},
	// CIRCLED DIGIT SIX
	a125: {
		n: 'a125',
		u: 0x2465,
		z: true,
	},
	// CIRCLED DIGIT SEVEN
	a126: {
		n: 'a126',
		u: 0x2466,
		z: true,
	},
	// CIRCLED DIGIT EIGHT
	a127: {
		n: 'a127',
		u: 0x2467,
		z: true,
	},
	// CIRCLED DIGIT NINE
	a128: {
		n: 'a128',
		u: 0x2468,
		z: true,
	},
	// CIRCLED NUMBER TEN
	a129: {
		n: 'a129',
		u: 0x2469,
		z: true,
	},
	// VICTORY HAND
	a13: {
		n: 'a13',
		u: 0x270c,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT ONE
	a130: {
		n: 'a130',
		u: 0x2776,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT TWO
	a131: {
		n: 'a131',
		u: 0x2777,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT THREE
	a132: {
		n: 'a132',
		u: 0x2778,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT FOUR
	a133: {
		n: 'a133',
		u: 0x2779,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT FIVE
	a134: {
		n: 'a134',
		u: 0x277a,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT SIX
	a135: {
		n: 'a135',
		u: 0x277b,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT SEVEN
	a136: {
		n: 'a136',
		u: 0x277c,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT EIGHT
	a137: {
		n: 'a137',
		u: 0x277d,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED DIGIT NINE
	a138: {
		n: 'a138',
		u: 0x277e,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED NUMBER TEN
	a139: {
		n: 'a139',
		u: 0x277f,
		z: true,
	},
	// WRITING HAND
	a14: {
		n: 'a14',
		u: 0x270d,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT ONE
	a140: {
		n: 'a140',
		u: 0x2780,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT TWO
	a141: {
		n: 'a141',
		u: 0x2781,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT THREE
	a142: {
		n: 'a142',
		u: 0x2782,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT FOUR
	a143: {
		n: 'a143',
		u: 0x2783,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT FIVE
	a144: {
		n: 'a144',
		u: 0x2784,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT SIX
	a145: {
		n: 'a145',
		u: 0x2785,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT SEVEN
	a146: {
		n: 'a146',
		u: 0x2786,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT EIGHT
	a147: {
		n: 'a147',
		u: 0x2787,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF DIGIT NINE
	a148: {
		n: 'a148',
		u: 0x2788,
		z: true,
	},
	// DINGBAT CIRCLED SANS-SERIF NUMBER TEN
	a149: {
		n: 'a149',
		u: 0x2789,
		z: true,
	},
	// LOWER RIGHT PENCIL
	a15: {
		n: 'a15',
		u: 0x270e,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT ONE
	a150: {
		n: 'a150',
		u: 0x278a,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT TWO
	a151: {
		n: 'a151',
		u: 0x278b,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT THREE
	a152: {
		n: 'a152',
		u: 0x278c,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT FOUR
	a153: {
		n: 'a153',
		u: 0x278d,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT FIVE
	a154: {
		n: 'a154',
		u: 0x278e,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT SIX
	a155: {
		n: 'a155',
		u: 0x278f,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT SEVEN
	a156: {
		n: 'a156',
		u: 0x2790,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT EIGHT
	a157: {
		n: 'a157',
		u: 0x2791,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT NINE
	a158: {
		n: 'a158',
		u: 0x2792,
		z: true,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF NUMBER TEN
	a159: {
		n: 'a159',
		u: 0x2793,
		z: true,
	},
	// PENCIL
	a16: {
		n: 'a16',
		u: 0x270f,
		z: true,
	},
	// HEAVY WIDE-HEADED RIGHTWARDS ARROW
	a160: {
		n: 'a160',
		u: 0x2794,
		z: true,
	},
	// RIGHTWARDS ARROW
	a161: {
		n: 'a161',
		u: 0x2192,
		z: true,
	},
	// THREE-D BOTTOM-LIGHTED RIGHTWARDS ARROWHEAD
	a162: {
		n: 'a162',
		u: 0x27a3,
		z: true,
	},
	// LEFT RIGHT ARROW
	a163: {
		n: 'a163',
		u: 0x2194,
		z: true,
	},
	// UP DOWN ARROW
	a164: {
		n: 'a164',
		u: 0x2195,
		z: true,
	},
	// HEAVY RIGHTWARDS ARROW
	a165: {
		n: 'a165',
		u: 0x2799,
		z: true,
	},
	// DRAFTING POINT RIGHTWARDS ARROW
	a166: {
		n: 'a166',
		u: 0x279b,
		z: true,
	},
	// HEAVY ROUND-TIPPED RIGHTWARDS ARROW
	a167: {
		n: 'a167',
		u: 0x279c,
		z: true,
	},
	// TRIANGLE-HEADED RIGHTWARDS ARROW
	a168: {
		n: 'a168',
		u: 0x279d,
		z: true,
	},
	// HEAVY TRIANGLE-HEADED RIGHTWARDS ARROW
	a169: {
		n: 'a169',
		u: 0x279e,
		z: true,
	},
	// WHITE NIB
	a17: {
		n: 'a17',
		u: 0x2711,
		z: true,
	},
	// DASHED TRIANGLE-HEADED RIGHTWARDS ARROW
	a170: {
		n: 'a170',
		u: 0x279f,
		z: true,
	},
	// HEAVY DASHED TRIANGLE-HEADED RIGHTWARDS ARROW
	a171: {
		n: 'a171',
		u: 0x27a0,
		z: true,
	},
	// BLACK RIGHTWARDS ARROW
	a172: {
		n: 'a172',
		u: 0x27a1,
		z: true,
	},
	// THREE-D TOP-LIGHTED RIGHTWARDS ARROWHEAD
	a173: {
		n: 'a173',
		u: 0x27a2,
		z: true,
	},
	// BLACK RIGHTWARDS ARROWHEAD
	a174: {
		n: 'a174',
		u: 0x27a4,
		z: true,
	},
	// HEAVY BLACK CURVED DOWNWARDS AND RIGHTWARDS ARROW
	a175: {
		n: 'a175',
		u: 0x27a5,
		z: true,
	},
	// HEAVY BLACK CURVED UPWARDS AND RIGHTWARDS ARROW
	a176: {
		n: 'a176',
		u: 0x27a6,
		z: true,
	},
	// SQUAT BLACK RIGHTWARDS ARROW
	a177: {
		n: 'a177',
		u: 0x27a7,
		z: true,
	},
	// HEAVY CONCAVE-POINTED BLACK RIGHTWARDS ARROW
	a178: {
		n: 'a178',
		u: 0x27a8,
		z: true,
	},
	// RIGHT-SHADED WHITE RIGHTWARDS ARROW
	a179: {
		n: 'a179',
		u: 0x27a9,
		z: true,
	},
	// BLACK NIB
	a18: {
		n: 'a18',
		u: 0x2712,
		z: true,
	},
	// BACK-TILTED SHADOWED WHITE RIGHTWARDS ARROW
	a180: {
		n: 'a180',
		u: 0x27ab,
		z: true,
	},
	// HEAVY LOWER RIGHT-SHADOWED WHITE RIGHTWARDS ARROW
	a181: {
		n: 'a181',
		u: 0x27ad,
		z: true,
	},
	// NOTCHED LOWER RIGHT-SHADOWED WHITE RIGHTWARDS ARROW
	a182: {
		n: 'a182',
		u: 0x27af,
		z: true,
	},
	// CIRCLED HEAVY WHITE RIGHTWARDS ARROW
	a183: {
		n: 'a183',
		u: 0x27b2,
		z: true,
	},
	// WHITE-FEATHERED RIGHTWARDS ARROW
	a184: {
		n: 'a184',
		u: 0x27b3,
		z: true,
	},
	// BLACK-FEATHERED RIGHTWARDS ARROW
	a185: {
		n: 'a185',
		u: 0x27b5,
		z: true,
	},
	// HEAVY BLACK-FEATHERED RIGHTWARDS ARROW
	a186: {
		n: 'a186',
		u: 0x27b8,
		z: true,
	},
	// TEARDROP-BARBED RIGHTWARDS ARROW
	a187: {
		n: 'a187',
		u: 0x27ba,
		z: true,
	},
	// HEAVY TEARDROP-SHANKED RIGHTWARDS ARROW
	a188: {
		n: 'a188',
		u: 0x27bb,
		z: true,
	},
	// WEDGE-TAILED RIGHTWARDS ARROW
	a189: {
		n: 'a189',
		u: 0x27bc,
		z: true,
	},
	// CHECK MARK
	a19: {
		n: 'a19',
		u: 0x2713,
		z: true,
	},
	// HEAVY WEDGE-TAILED RIGHTWARDS ARROW
	a190: {
		n: 'a190',
		u: 0x27bd,
		z: true,
	},
	// OPEN-OUTLINED RIGHTWARDS ARROW
	a191: {
		n: 'a191',
		u: 0x27be,
		z: true,
	},
	// HEAVY NORTH EAST ARROW
	a192: {
		n: 'a192',
		u: 0x279a,
		z: true,
	},
	// LEFT-SHADED WHITE RIGHTWARDS ARROW
	a193: {
		n: 'a193',
		u: 0x27aa,
		z: true,
	},
	// BLACK-FEATHERED NORTH EAST ARROW
	a194: {
		n: 'a194',
		u: 0x27b6,
		z: true,
	},
	// HEAVY BLACK-FEATHERED NORTH EAST ARROW
	a195: {
		n: 'a195',
		u: 0x27b9,
		z: true,
	},
	// HEAVY SOUTH EAST ARROW
	a196: {
		n: 'a196',
		u: 0x2798,
		z: true,
	},
	// BLACK-FEATHERED SOUTH EAST ARROW
	a197: {
		n: 'a197',
		u: 0x27b4,
		z: true,
	},
	// HEAVY BLACK-FEATHERED SOUTH EAST ARROW
	a198: {
		n: 'a198',
		u: 0x27b7,
		z: true,
	},
	// FRONT-TILTED SHADOWED WHITE RIGHTWARDS ARROW
	a199: {
		n: 'a199',
		u: 0x27ac,
		z: true,
	},
	// BLACK SCISSORS
	a2: {
		n: 'a2',
		u: 0x2702,
		z: true,
	},
	// HEAVY CHECK MARK
	a20: {
		n: 'a20',
		u: 0x2714,
		z: true,
	},
	// HEAVY UPPER RIGHT-SHADOWED WHITE RIGHTWARDS ARROW
	a200: {
		n: 'a200',
		u: 0x27ae,
		z: true,
	},
	// NOTCHED UPPER RIGHT-SHADOWED WHITE RIGHTWARDS ARROW
	a201: {
		n: 'a201',
		u: 0x27b1,
		z: true,
	},
	// LOWER BLADE SCISSORS
	a202: {
		n: 'a202',
		u: 0x2703,
		z: true,
	},
	// UPPER RIGHT DROP-SHADOWED WHITE SQUARE
	a203: {
		n: 'a203',
		u: 0x2750,
		z: true,
	},
	// UPPER RIGHT SHADOWED WHITE SQUARE
	a204: {
		n: 'a204',
		u: 0x2752,
		z: true,
	},
	// HEAVY LEFT-POINTING ANGLE QUOTATION MARK ORNAMENT
	a205: {
		n: 'a205',
		u: 0x276e,
		z: true,
	},
	// HEAVY LEFT-POINTING ANGLE BRACKET ORNAMENT
	a206: {
		n: 'a206',
		u: 0x2770,
		z: true,
	},
	// MULTIPLICATION X
	a21: {
		n: 'a21',
		u: 0x2715,
		z: true,
	},
	// HEAVY MULTIPLICATION X
	a22: {
		n: 'a22',
		u: 0x2716,
		z: true,
	},
	// BALLOT X
	a23: {
		n: 'a23',
		u: 0x2717,
		z: true,
	},
	// HEAVY BALLOT X
	a24: {
		n: 'a24',
		u: 0x2718,
		z: true,
	},
	// OUTLINED GREEK CROSS
	a25: {
		n: 'a25',
		u: 0x2719,
		z: true,
	},
	// HEAVY GREEK CROSS
	a26: {
		n: 'a26',
		u: 0x271a,
		z: true,
	},
	// OPEN CENTRE CROSS
	a27: {
		n: 'a27',
		u: 0x271b,
		z: true,
	},
	// HEAVY OPEN CENTRE CROSS
	a28: {
		n: 'a28',
		u: 0x271c,
		z: true,
	},
	// FOUR TEARDROP-SPOKED ASTERISK
	a29: {
		n: 'a29',
		u: 0x2722,
		z: true,
	},
	// WHITE SCISSORS
	a3: {
		n: 'a3',
		u: 0x2704,
		z: true,
	},
	// FOUR BALLOON-SPOKED ASTERISK
	a30: {
		n: 'a30',
		u: 0x2723,
		z: true,
	},
	// HEAVY FOUR BALLOON-SPOKED ASTERISK
	a31: {
		n: 'a31',
		u: 0x2724,
		z: true,
	},
	// FOUR CLUB-SPOKED ASTERISK
	a32: {
		n: 'a32',
		u: 0x2725,
		z: true,
	},
	// BLACK FOUR POINTED STAR
	a33: {
		n: 'a33',
		u: 0x2726,
		z: true,
	},
	// WHITE FOUR POINTED STAR
	a34: {
		n: 'a34',
		u: 0x2727,
		z: true,
	},
	// BLACK STAR
	a35: {
		n: 'a35',
		u: 0x2605,
		z: true,
	},
	// STRESS OUTLINED WHITE STAR
	a36: {
		n: 'a36',
		u: 0x2729,
		z: true,
	},
	// CIRCLED WHITE STAR
	a37: {
		n: 'a37',
		u: 0x272a,
		z: true,
	},
	// OPEN CENTRE BLACK STAR
	a38: {
		n: 'a38',
		u: 0x272b,
		z: true,
	},
	// BLACK CENTRE WHITE STAR
	a39: {
		n: 'a39',
		u: 0x272c,
		z: true,
	},
	// BLACK TELEPHONE
	a4: {
		n: 'a4',
		u: 0x260e,
		z: true,
	},
	// OUTLINED BLACK STAR
	a40: {
		n: 'a40',
		u: 0x272d,
		z: true,
	},
	// HEAVY OUTLINED BLACK STAR
	a41: {
		n: 'a41',
		u: 0x272e,
		z: true,
	},
	// PINWHEEL STAR
	a42: {
		n: 'a42',
		u: 0x272f,
		z: true,
	},
	// SHADOWED WHITE STAR
	a43: {
		n: 'a43',
		u: 0x2730,
		z: true,
	},
	// HEAVY ASTERISK
	a44: {
		n: 'a44',
		u: 0x2731,
		z: true,
	},
	// OPEN CENTRE ASTERISK
	a45: {
		n: 'a45',
		u: 0x2732,
		z: true,
	},
	// EIGHT SPOKED ASTERISK
	a46: {
		n: 'a46',
		u: 0x2733,
		z: true,
	},
	// EIGHT POINTED BLACK STAR
	a47: {
		n: 'a47',
		u: 0x2734,
		z: true,
	},
	// EIGHT POINTED PINWHEEL STAR
	a48: {
		n: 'a48',
		u: 0x2735,
		z: true,
	},
	// SIX POINTED BLACK STAR
	a49: {
		n: 'a49',
		u: 0x2736,
		z: true,
	},
	// TELEPHONE LOCATION SIGN
	a5: {
		n: 'a5',
		u: 0x2706,
		z: true,
	},
	// EIGHT POINTED RECTILINEAR BLACK STAR
	a50: {
		n: 'a50',
		u: 0x2737,
		z: true,
	},
	// HEAVY EIGHT POINTED RECTILINEAR BLACK STAR
	a51: {
		n: 'a51',
		u: 0x2738,
		z: true,
	},
	// TWELVE POINTED BLACK STAR
	a52: {
		n: 'a52',
		u: 0x2739,
		z: true,
	},
	// SIXTEEN POINTED ASTERISK
	a53: {
		n: 'a53',
		u: 0x273a,
		z: true,
	},
	// TEARDROP-SPOKED ASTERISK
	a54: {
		n: 'a54',
		u: 0x273b,
		z: true,
	},
	// OPEN CENTRE TEARDROP-SPOKED ASTERISK
	a55: {
		n: 'a55',
		u: 0x273c,
		z: true,
	},
	// HEAVY TEARDROP-SPOKED ASTERISK
	a56: {
		n: 'a56',
		u: 0x273d,
		z: true,
	},
	// SIX PETALLED BLACK AND WHITE FLORETTE
	a57: {
		n: 'a57',
		u: 0x273e,
		z: true,
	},
	// BLACK FLORETTE
	a58: {
		n: 'a58',
		u: 0x273f,
		z: true,
	},
	// WHITE FLORETTE
	a59: {
		n: 'a59',
		u: 0x2740,
		z: true,
	},
	// LATIN CROSS
	a6: {
		n: 'a6',
		u: 0x271d,
		z: true,
	},
	// EIGHT PETALLED OUTLINED BLACK FLORETTE
	a60: {
		n: 'a60',
		u: 0x2741,
		z: true,
	},
	// CIRCLED OPEN CENTRE EIGHT POINTED STAR
	a61: {
		n: 'a61',
		u: 0x2742,
		z: true,
	},
	// HEAVY TEARDROP-SPOKED PINWHEEL ASTERISK
	a62: {
		n: 'a62',
		u: 0x2743,
		z: true,
	},
	// SNOWFLAKE
	a63: {
		n: 'a63',
		u: 0x2744,
		z: true,
	},
	// TIGHT TRIFOLIATE SNOWFLAKE
	a64: {
		n: 'a64',
		u: 0x2745,
		z: true,
	},
	// HEAVY CHEVRON SNOWFLAKE
	a65: {
		n: 'a65',
		u: 0x2746,
		z: true,
	},
	// SPARKLE
	a66: {
		n: 'a66',
		u: 0x2747,
		z: true,
	},
	// HEAVY SPARKLE
	a67: {
		n: 'a67',
		u: 0x2748,
		z: true,
	},
	// BALLOON-SPOKED ASTERISK
	a68: {
		n: 'a68',
		u: 0x2749,
		z: true,
	},
	// EIGHT TEARDROP-SPOKED PROPELLER ASTERISK
	a69: {
		n: 'a69',
		u: 0x274a,
		z: true,
	},
	// SHADOWED WHITE LATIN CROSS
	a7: {
		n: 'a7',
		u: 0x271e,
		z: true,
	},
	// HEAVY EIGHT TEARDROP-SPOKED PROPELLER ASTERISK
	a70: {
		n: 'a70',
		u: 0x274b,
		z: true,
	},
	// BLACK CIRCLE
	a71: {
		n: 'a71',
		u: 0x25cf,
		z: true,
	},
	// SHADOWED WHITE CIRCLE
	a72: {
		n: 'a72',
		u: 0x274d,
		z: true,
	},
	// BLACK SQUARE
	a73: {
		n: 'a73',
		u: 0x25a0,
		z: true,
	},
	// LOWER RIGHT DROP-SHADOWED WHITE SQUARE
	a74: {
		n: 'a74',
		u: 0x274f,
		z: true,
	},
	// LOWER RIGHT SHADOWED WHITE SQUARE
	a75: {
		n: 'a75',
		u: 0x2751,
		z: true,
	},
	// BLACK UP-POINTING TRIANGLE
	a76: {
		n: 'a76',
		u: 0x25b2,
		z: true,
	},
	// BLACK DOWN-POINTING TRIANGLE
	a77: {
		n: 'a77',
		u: 0x25bc,
		z: true,
	},
	// BLACK DIAMOND
	a78: {
		n: 'a78',
		u: 0x25c6,
		z: true,
	},
	// BLACK DIAMOND MINUS WHITE X
	a79: {
		n: 'a79',
		u: 0x2756,
		z: true,
	},
	// OUTLINED LATIN CROSS
	a8: {
		n: 'a8',
		u: 0x271f,
		z: true,
	},
	// RIGHT HALF BLACK CIRCLE
	a81: {
		n: 'a81',
		u: 0x25d7,
		z: true,
	},
	// LIGHT VERTICAL BAR
	a82: {
		n: 'a82',
		u: 0x2758,
		z: true,
	},
	// MEDIUM VERTICAL BAR
	a83: {
		n: 'a83',
		u: 0x2759,
		z: true,
	},
	// HEAVY VERTICAL BAR
	a84: {
		n: 'a84',
		u: 0x275a,
		z: true,
	},
	// HEAVY RIGHT-POINTING ANGLE QUOTATION MARK ORNAMENT
	a85: {
		n: 'a85',
		u: 0x276f,
		z: true,
	},
	// HEAVY RIGHT-POINTING ANGLE BRACKET ORNAMENT
	a86: {
		n: 'a86',
		u: 0x2771,
		z: true,
	},
	// LIGHT LEFT TORTOISE SHELL BRACKET ORNAMENT
	a87: {
		n: 'a87',
		u: 0x2772,
		z: true,
	},
	// LIGHT RIGHT TORTOISE SHELL BRACKET ORNAMENT
	a88: {
		n: 'a88',
		u: 0x2773,
		z: true,
	},
	// MEDIUM LEFT PARENTHESIS ORNAMENT
	a89: {
		n: 'a89',
		u: 0x2768,
		z: true,
	},
	// MALTESE CROSS
	a9: {
		n: 'a9',
		u: 0x2720,
		z: true,
	},
	// MEDIUM RIGHT PARENTHESIS ORNAMENT
	a90: {
		n: 'a90',
		u: 0x2769,
		z: true,
	},
	// MEDIUM LEFT-POINTING ANGLE BRACKET ORNAMENT
	a91: {
		n: 'a91',
		u: 0x276c,
		z: true,
	},
	// MEDIUM RIGHT-POINTING ANGLE BRACKET ORNAMENT
	a92: {
		n: 'a92',
		u: 0x276d,
		z: true,
	},
	// MEDIUM FLATTENED LEFT PARENTHESIS ORNAMENT
	a93: {
		n: 'a93',
		u: 0x276a,
		z: true,
	},
	// MEDIUM FLATTENED RIGHT PARENTHESIS ORNAMENT
	a94: {
		n: 'a94',
		u: 0x276b,
		z: true,
	},
	// MEDIUM LEFT CURLY BRACKET ORNAMENT
	a95: {
		n: 'a95',
		u: 0x2774,
		z: true,
	},
	// MEDIUM RIGHT CURLY BRACKET ORNAMENT
	a96: {
		n: 'a96',
		u: 0x2775,
		z: true,
	},
	// HEAVY SINGLE TURNED COMMA QUOTATION MARK ORNAMENT
	a97: {
		n: 'a97',
		u: 0x275b,
		z: true,
	},
	// HEAVY SINGLE COMMA QUOTATION MARK ORNAMENT
	a98: {
		n: 'a98',
		u: 0x275c,
		z: true,
	},
	// HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT
	a99: {
		n: 'a99',
		u: 0x275d,
		z: true,
	},
	// BENGALI LETTER AA
	aabengali: {
		n: 'aabengali',
		u: 0x0986,
	},
	// LATIN SMALL LETTER A WITH ACUTE
	aacute: {
		n: 'aacute',
		u: 0x00e1,
	},
	// DEVANAGARI LETTER AA
	aadeva: {
		n: 'aadeva',
		u: 0x0906,
	},
	// GUJARATI LETTER AA
	aagujarati: {
		n: 'aagujarati',
		u: 0x0a86,
	},
	// GURMUKHI LETTER AA
	aagurmukhi: {
		n: 'aagurmukhi',
		u: 0x0a06,
	},
	// GURMUKHI VOWEL SIGN AA
	aamatragurmukhi: {
		n: 'aamatragurmukhi',
		u: 0x0a3e,
	},
	// SQUARE AARU
	aarusquare: {
		n: 'aarusquare',
		u: 0x3303,
	},
	// BENGALI VOWEL SIGN AA
	aavowelsignbengali: {
		n: 'aavowelsignbengali',
		u: 0x09be,
	},
	// DEVANAGARI VOWEL SIGN AA
	aavowelsigndeva: {
		n: 'aavowelsigndeva',
		u: 0x093e,
	},
	// GUJARATI VOWEL SIGN AA
	aavowelsigngujarati: {
		n: 'aavowelsigngujarati',
		u: 0x0abe,
	},
	// ARMENIAN ABBREVIATION MARK
	abbreviationmarkarmenian: {
		n: 'abbreviationmarkarmenian',
		u: 0x055f,
	},
	// DEVANAGARI ABBREVIATION SIGN
	abbreviationsigndeva: {
		n: 'abbreviationsigndeva',
		u: 0x0970,
	},
	// BENGALI LETTER A
	abengali: {
		n: 'abengali',
		u: 0x0985,
	},
	// BOPOMOFO LETTER A
	abopomofo: {
		n: 'abopomofo',
		u: 0x311a,
	},
	// LATIN SMALL LETTER A WITH BREVE
	abreve: {
		n: 'abreve',
		u: 0x0103,
	},
	// LATIN SMALL LETTER A WITH BREVE AND ACUTE
	abreveacute: {
		n: 'abreveacute',
		u: 0x1eaf,
	},
	// CYRILLIC SMALL LETTER A WITH BREVE
	abrevecyrillic: {
		n: 'abrevecyrillic',
		u: 0x04d1,
	},
	// LATIN SMALL LETTER A WITH BREVE AND DOT BELOW
	abrevedotbelow: {
		n: 'abrevedotbelow',
		u: 0x1eb7,
	},
	// LATIN SMALL LETTER A WITH BREVE AND GRAVE
	abrevegrave: {
		n: 'abrevegrave',
		u: 0x1eb1,
	},
	// LATIN SMALL LETTER A WITH BREVE AND HOOK ABOVE
	abrevehookabove: {
		n: 'abrevehookabove',
		u: 0x1eb3,
	},
	// LATIN SMALL LETTER A WITH BREVE AND TILDE
	abrevetilde: {
		n: 'abrevetilde',
		u: 0x1eb5,
	},
	// LATIN SMALL LETTER A WITH CARON
	acaron: {
		n: 'acaron',
		u: 0x01ce,
	},
	// CIRCLED LATIN SMALL LETTER A
	acircle: {
		n: 'acircle',
		u: 0x24d0,
	},
	// LATIN SMALL LETTER A WITH CIRCUMFLEX
	acircumflex: {
		n: 'acircumflex',
		u: 0x00e2,
	},
	// LATIN SMALL LETTER A WITH CIRCUMFLEX AND ACUTE
	acircumflexacute: {
		n: 'acircumflexacute',
		u: 0x1ea5,
	},
	// LATIN SMALL LETTER A WITH CIRCUMFLEX AND DOT BELOW
	acircumflexdotbelow: {
		n: 'acircumflexdotbelow',
		u: 0x1ead,
	},
	// LATIN SMALL LETTER A WITH CIRCUMFLEX AND GRAVE
	acircumflexgrave: {
		n: 'acircumflexgrave',
		u: 0x1ea7,
	},
	// LATIN SMALL LETTER A WITH CIRCUMFLEX AND HOOK ABOVE
	acircumflexhookabove: {
		n: 'acircumflexhookabove',
		u: 0x1ea9,
	},
	// LATIN SMALL LETTER A WITH CIRCUMFLEX AND TILDE
	acircumflextilde: {
		n: 'acircumflextilde',
		u: 0x1eab,
	},
	// ACUTE ACCENT
	acute: {
		n: 'acute',
		u: 0x00b4,
	},
	// COMBINING ACUTE ACCENT BELOW
	acutebelowcmb: {
		n: 'acutebelowcmb',
		u: 0x0317,
	},
	// COMBINING ACUTE ACCENT
	acutecmb: {
		n: 'acutecmb',
		u: 0x0301,
	},
	// COMBINING ACUTE ACCENT
	acutecomb: {
		n: 'acutecomb',
		u: 0x0301,
	},
	// DEVANAGARI ACUTE ACCENT
	acutedeva: {
		n: 'acutedeva',
		u: 0x0954,
	},
	// MODIFIER LETTER LOW ACUTE ACCENT
	acutelowmod: {
		n: 'acutelowmod',
		u: 0x02cf,
	},
	// COMBINING ACUTE TONE MARK
	acutetonecmb: {
		n: 'acutetonecmb',
		u: 0x0341,
	},
	// CYRILLIC SMALL LETTER A
	acyrillic: {
		n: 'acyrillic',
		u: 0x0430,
	},
	// LATIN SMALL LETTER A WITH DOUBLE GRAVE
	adblgrave: {
		n: 'adblgrave',
		u: 0x0201,
	},
	// GURMUKHI ADDAK
	addakgurmukhi: {
		n: 'addakgurmukhi',
		u: 0x0a71,
	},
	// DEVANAGARI LETTER A
	adeva: {
		n: 'adeva',
		u: 0x0905,
	},
	// LATIN SMALL LETTER A WITH DIAERESIS
	adieresis: {
		n: 'adieresis',
		u: 0x00e4,
	},
	// CYRILLIC SMALL LETTER A WITH DIAERESIS
	adieresiscyrillic: {
		n: 'adieresiscyrillic',
		u: 0x04d3,
	},
	// LATIN SMALL LETTER A WITH DIAERESIS AND MACRON
	adieresismacron: {
		n: 'adieresismacron',
		u: 0x01df,
	},
	// LATIN SMALL LETTER A WITH DOT BELOW
	adotbelow: {
		n: 'adotbelow',
		u: 0x1ea1,
	},
	// LATIN SMALL LETTER A WITH DOT ABOVE AND MACRON
	adotmacron: {
		n: 'adotmacron',
		u: 0x01e1,
	},
	// LATIN SMALL LETTER AE
	ae: {
		n: 'ae',
		u: 0x00e6,
	},
	// LATIN SMALL LETTER AE WITH ACUTE
	aeacute: {
		n: 'aeacute',
		u: 0x01fd,
	},
	// HANGUL LETTER AE
	aekorean: {
		n: 'aekorean',
		u: 0x3150,
	},
	// LATIN SMALL LETTER AE WITH MACRON
	aemacron: {
		n: 'aemacron',
		u: 0x01e3,
	},
	// HORIZONTAL BAR
	afii00208: {
		n: 'afii00208',
		u: 0x2015,
	},
	// LIRA SIGN
	afii08941: {
		n: 'afii08941',
		u: 0x20a4,
	},
	// CYRILLIC CAPITAL LETTER A
	afii10017: {
		n: 'afii10017',
		u: 0x0410,
	},
	// CYRILLIC CAPITAL LETTER BE
	afii10018: {
		n: 'afii10018',
		u: 0x0411,
	},
	// CYRILLIC CAPITAL LETTER VE
	afii10019: {
		n: 'afii10019',
		u: 0x0412,
	},
	// CYRILLIC CAPITAL LETTER GHE
	afii10020: {
		n: 'afii10020',
		u: 0x0413,
	},
	// CYRILLIC CAPITAL LETTER DE
	afii10021: {
		n: 'afii10021',
		u: 0x0414,
	},
	// CYRILLIC CAPITAL LETTER IE
	afii10022: {
		n: 'afii10022',
		u: 0x0415,
	},
	// CYRILLIC CAPITAL LETTER IO
	afii10023: {
		n: 'afii10023',
		u: 0x0401,
	},
	// CYRILLIC CAPITAL LETTER ZHE
	afii10024: {
		n: 'afii10024',
		u: 0x0416,
	},
	// CYRILLIC CAPITAL LETTER ZE
	afii10025: {
		n: 'afii10025',
		u: 0x0417,
	},
	// CYRILLIC CAPITAL LETTER I
	afii10026: {
		n: 'afii10026',
		u: 0x0418,
	},
	// CYRILLIC CAPITAL LETTER SHORT I
	afii10027: {
		n: 'afii10027',
		u: 0x0419,
	},
	// CYRILLIC CAPITAL LETTER KA
	afii10028: {
		n: 'afii10028',
		u: 0x041a,
	},
	// CYRILLIC CAPITAL LETTER EL
	afii10029: {
		n: 'afii10029',
		u: 0x041b,
	},
	// CYRILLIC CAPITAL LETTER EM
	afii10030: {
		n: 'afii10030',
		u: 0x041c,
	},
	// CYRILLIC CAPITAL LETTER EN
	afii10031: {
		n: 'afii10031',
		u: 0x041d,
	},
	// CYRILLIC CAPITAL LETTER O
	afii10032: {
		n: 'afii10032',
		u: 0x041e,
	},
	// CYRILLIC CAPITAL LETTER PE
	afii10033: {
		n: 'afii10033',
		u: 0x041f,
	},
	// CYRILLIC CAPITAL LETTER ER
	afii10034: {
		n: 'afii10034',
		u: 0x0420,
	},
	// CYRILLIC CAPITAL LETTER ES
	afii10035: {
		n: 'afii10035',
		u: 0x0421,
	},
	// CYRILLIC CAPITAL LETTER TE
	afii10036: {
		n: 'afii10036',
		u: 0x0422,
	},
	// CYRILLIC CAPITAL LETTER U
	afii10037: {
		n: 'afii10037',
		u: 0x0423,
	},
	// CYRILLIC CAPITAL LETTER EF
	afii10038: {
		n: 'afii10038',
		u: 0x0424,
	},
	// CYRILLIC CAPITAL LETTER HA
	afii10039: {
		n: 'afii10039',
		u: 0x0425,
	},
	// CYRILLIC CAPITAL LETTER TSE
	afii10040: {
		n: 'afii10040',
		u: 0x0426,
	},
	// CYRILLIC CAPITAL LETTER CHE
	afii10041: {
		n: 'afii10041',
		u: 0x0427,
	},
	// CYRILLIC CAPITAL LETTER SHA
	afii10042: {
		n: 'afii10042',
		u: 0x0428,
	},
	// CYRILLIC CAPITAL LETTER SHCHA
	afii10043: {
		n: 'afii10043',
		u: 0x0429,
	},
	// CYRILLIC CAPITAL LETTER HARD SIGN
	afii10044: {
		n: 'afii10044',
		u: 0x042a,
	},
	// CYRILLIC CAPITAL LETTER YERU
	afii10045: {
		n: 'afii10045',
		u: 0x042b,
	},
	// CYRILLIC CAPITAL LETTER SOFT SIGN
	afii10046: {
		n: 'afii10046',
		u: 0x042c,
	},
	// CYRILLIC CAPITAL LETTER E
	afii10047: {
		n: 'afii10047',
		u: 0x042d,
	},
	// CYRILLIC CAPITAL LETTER YU
	afii10048: {
		n: 'afii10048',
		u: 0x042e,
	},
	// CYRILLIC CAPITAL LETTER YA
	afii10049: {
		n: 'afii10049',
		u: 0x042f,
	},
	// CYRILLIC CAPITAL LETTER GHE WITH UPTURN
	afii10050: {
		n: 'afii10050',
		u: 0x0490,
	},
	// CYRILLIC CAPITAL LETTER DJE
	afii10051: {
		n: 'afii10051',
		u: 0x0402,
	},
	// CYRILLIC CAPITAL LETTER GJE
	afii10052: {
		n: 'afii10052',
		u: 0x0403,
	},
	// CYRILLIC CAPITAL LETTER UKRAINIAN IE
	afii10053: {
		n: 'afii10053',
		u: 0x0404,
	},
	// CYRILLIC CAPITAL LETTER DZE
	afii10054: {
		n: 'afii10054',
		u: 0x0405,
	},
	// CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I
	afii10055: {
		n: 'afii10055',
		u: 0x0406,
	},
	// CYRILLIC CAPITAL LETTER YI
	afii10056: {
		n: 'afii10056',
		u: 0x0407,
	},
	// CYRILLIC CAPITAL LETTER JE
	afii10057: {
		n: 'afii10057',
		u: 0x0408,
	},
	// CYRILLIC CAPITAL LETTER LJE
	afii10058: {
		n: 'afii10058',
		u: 0x0409,
	},
	// CYRILLIC CAPITAL LETTER NJE
	afii10059: {
		n: 'afii10059',
		u: 0x040a,
	},
	// CYRILLIC CAPITAL LETTER TSHE
	afii10060: {
		n: 'afii10060',
		u: 0x040b,
	},
	// CYRILLIC CAPITAL LETTER KJE
	afii10061: {
		n: 'afii10061',
		u: 0x040c,
	},
	// CYRILLIC CAPITAL LETTER SHORT U
	afii10062: {
		n: 'afii10062',
		u: 0x040e,
	},
	// <private-use-F6C4>
	afii10063: {
		n: 'afii10063',
		u: 0xf6c4,
	},
	// <private-use-F6C5>
	afii10064: {
		n: 'afii10064',
		u: 0xf6c5,
	},
	// CYRILLIC SMALL LETTER A
	afii10065: {
		n: 'afii10065',
		u: 0x0430,
	},
	// CYRILLIC SMALL LETTER BE
	afii10066: {
		n: 'afii10066',
		u: 0x0431,
	},
	// CYRILLIC SMALL LETTER VE
	afii10067: {
		n: 'afii10067',
		u: 0x0432,
	},
	// CYRILLIC SMALL LETTER GHE
	afii10068: {
		n: 'afii10068',
		u: 0x0433,
	},
	// CYRILLIC SMALL LETTER DE
	afii10069: {
		n: 'afii10069',
		u: 0x0434,
	},
	// CYRILLIC SMALL LETTER IE
	afii10070: {
		n: 'afii10070',
		u: 0x0435,
	},
	// CYRILLIC SMALL LETTER IO
	afii10071: {
		n: 'afii10071',
		u: 0x0451,
	},
	// CYRILLIC SMALL LETTER ZHE
	afii10072: {
		n: 'afii10072',
		u: 0x0436,
	},
	// CYRILLIC SMALL LETTER ZE
	afii10073: {
		n: 'afii10073',
		u: 0x0437,
	},
	// CYRILLIC SMALL LETTER I
	afii10074: {
		n: 'afii10074',
		u: 0x0438,
	},
	// CYRILLIC SMALL LETTER SHORT I
	afii10075: {
		n: 'afii10075',
		u: 0x0439,
	},
	// CYRILLIC SMALL LETTER KA
	afii10076: {
		n: 'afii10076',
		u: 0x043a,
	},
	// CYRILLIC SMALL LETTER EL
	afii10077: {
		n: 'afii10077',
		u: 0x043b,
	},
	// CYRILLIC SMALL LETTER EM
	afii10078: {
		n: 'afii10078',
		u: 0x043c,
	},
	// CYRILLIC SMALL LETTER EN
	afii10079: {
		n: 'afii10079',
		u: 0x043d,
	},
	// CYRILLIC SMALL LETTER O
	afii10080: {
		n: 'afii10080',
		u: 0x043e,
	},
	// CYRILLIC SMALL LETTER PE
	afii10081: {
		n: 'afii10081',
		u: 0x043f,
	},
	// CYRILLIC SMALL LETTER ER
	afii10082: {
		n: 'afii10082',
		u: 0x0440,
	},
	// CYRILLIC SMALL LETTER ES
	afii10083: {
		n: 'afii10083',
		u: 0x0441,
	},
	// CYRILLIC SMALL LETTER TE
	afii10084: {
		n: 'afii10084',
		u: 0x0442,
	},
	// CYRILLIC SMALL LETTER U
	afii10085: {
		n: 'afii10085',
		u: 0x0443,
	},
	// CYRILLIC SMALL LETTER EF
	afii10086: {
		n: 'afii10086',
		u: 0x0444,
	},
	// CYRILLIC SMALL LETTER HA
	afii10087: {
		n: 'afii10087',
		u: 0x0445,
	},
	// CYRILLIC SMALL LETTER TSE
	afii10088: {
		n: 'afii10088',
		u: 0x0446,
	},
	// CYRILLIC SMALL LETTER CHE
	afii10089: {
		n: 'afii10089',
		u: 0x0447,
	},
	// CYRILLIC SMALL LETTER SHA
	afii10090: {
		n: 'afii10090',
		u: 0x0448,
	},
	// CYRILLIC SMALL LETTER SHCHA
	afii10091: {
		n: 'afii10091',
		u: 0x0449,
	},
	// CYRILLIC SMALL LETTER HARD SIGN
	afii10092: {
		n: 'afii10092',
		u: 0x044a,
	},
	// CYRILLIC SMALL LETTER YERU
	afii10093: {
		n: 'afii10093',
		u: 0x044b,
	},
	// CYRILLIC SMALL LETTER SOFT SIGN
	afii10094: {
		n: 'afii10094',
		u: 0x044c,
	},
	// CYRILLIC SMALL LETTER E
	afii10095: {
		n: 'afii10095',
		u: 0x044d,
	},
	// CYRILLIC SMALL LETTER YU
	afii10096: {
		n: 'afii10096',
		u: 0x044e,
	},
	// CYRILLIC SMALL LETTER YA
	afii10097: {
		n: 'afii10097',
		u: 0x044f,
	},
	// CYRILLIC SMALL LETTER GHE WITH UPTURN
	afii10098: {
		n: 'afii10098',
		u: 0x0491,
	},
	// CYRILLIC SMALL LETTER DJE
	afii10099: {
		n: 'afii10099',
		u: 0x0452,
	},
	// CYRILLIC SMALL LETTER GJE
	afii10100: {
		n: 'afii10100',
		u: 0x0453,
	},
	// CYRILLIC SMALL LETTER UKRAINIAN IE
	afii10101: {
		n: 'afii10101',
		u: 0x0454,
	},
	// CYRILLIC SMALL LETTER DZE
	afii10102: {
		n: 'afii10102',
		u: 0x0455,
	},
	// CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I
	afii10103: {
		n: 'afii10103',
		u: 0x0456,
	},
	// CYRILLIC SMALL LETTER YI
	afii10104: {
		n: 'afii10104',
		u: 0x0457,
	},
	// CYRILLIC SMALL LETTER JE
	afii10105: {
		n: 'afii10105',
		u: 0x0458,
	},
	// CYRILLIC SMALL LETTER LJE
	afii10106: {
		n: 'afii10106',
		u: 0x0459,
	},
	// CYRILLIC SMALL LETTER NJE
	afii10107: {
		n: 'afii10107',
		u: 0x045a,
	},
	// CYRILLIC SMALL LETTER TSHE
	afii10108: {
		n: 'afii10108',
		u: 0x045b,
	},
	// CYRILLIC SMALL LETTER KJE
	afii10109: {
		n: 'afii10109',
		u: 0x045c,
	},
	// CYRILLIC SMALL LETTER SHORT U
	afii10110: {
		n: 'afii10110',
		u: 0x045e,
	},
	// CYRILLIC CAPITAL LETTER DZHE
	afii10145: {
		n: 'afii10145',
		u: 0x040f,
	},
	// CYRILLIC CAPITAL LETTER YAT
	afii10146: {
		n: 'afii10146',
		u: 0x0462,
	},
	// CYRILLIC CAPITAL LETTER FITA
	afii10147: {
		n: 'afii10147',
		u: 0x0472,
	},
	// CYRILLIC CAPITAL LETTER IZHITSA
	afii10148: {
		n: 'afii10148',
		u: 0x0474,
	},
	// <private-use-F6C6>
	afii10192: {
		n: 'afii10192',
		u: 0xf6c6,
	},
	// CYRILLIC SMALL LETTER DZHE
	afii10193: {
		n: 'afii10193',
		u: 0x045f,
	},
	// CYRILLIC SMALL LETTER YAT
	afii10194: {
		n: 'afii10194',
		u: 0x0463,
	},
	// CYRILLIC SMALL LETTER FITA
	afii10195: {
		n: 'afii10195',
		u: 0x0473,
	},
	// CYRILLIC SMALL LETTER IZHITSA
	afii10196: {
		n: 'afii10196',
		u: 0x0475,
	},
	// <private-use-F6C7>
	afii10831: {
		n: 'afii10831',
		u: 0xf6c7,
	},
	// <private-use-F6C8>
	afii10832: {
		n: 'afii10832',
		u: 0xf6c8,
	},
	// CYRILLIC SMALL LETTER SCHWA
	afii10846: {
		n: 'afii10846',
		u: 0x04d9,
	},
	// LEFT-TO-RIGHT MARK
	afii299: {
		n: 'afii299',
		u: 0x200e,
	},
	// RIGHT-TO-LEFT MARK
	afii300: {
		n: 'afii300',
		u: 0x200f,
	},
	// ZERO WIDTH JOINER
	afii301: {
		n: 'afii301',
		u: 0x200d,
	},
	// ARABIC PERCENT SIGN
	afii57381: {
		n: 'afii57381',
		u: 0x066a,
	},
	// ARABIC COMMA
	afii57388: {
		n: 'afii57388',
		u: 0x060c,
	},
	// ARABIC-INDIC DIGIT ZERO
	afii57392: {
		n: 'afii57392',
		u: 0x0660,
	},
	// ARABIC-INDIC DIGIT ONE
	afii57393: {
		n: 'afii57393',
		u: 0x0661,
	},
	// ARABIC-INDIC DIGIT TWO
	afii57394: {
		n: 'afii57394',
		u: 0x0662,
	},
	// ARABIC-INDIC DIGIT THREE
	afii57395: {
		n: 'afii57395',
		u: 0x0663,
	},
	// ARABIC-INDIC DIGIT FOUR
	afii57396: {
		n: 'afii57396',
		u: 0x0664,
	},
	// ARABIC-INDIC DIGIT FIVE
	afii57397: {
		n: 'afii57397',
		u: 0x0665,
	},
	// ARABIC-INDIC DIGIT SIX
	afii57398: {
		n: 'afii57398',
		u: 0x0666,
	},
	// ARABIC-INDIC DIGIT SEVEN
	afii57399: {
		n: 'afii57399',
		u: 0x0667,
	},
	// ARABIC-INDIC DIGIT EIGHT
	afii57400: {
		n: 'afii57400',
		u: 0x0668,
	},
	// ARABIC-INDIC DIGIT NINE
	afii57401: {
		n: 'afii57401',
		u: 0x0669,
	},
	// ARABIC SEMICOLON
	afii57403: {
		n: 'afii57403',
		u: 0x061b,
	},
	// ARABIC QUESTION MARK
	afii57407: {
		n: 'afii57407',
		u: 0x061f,
	},
	// ARABIC LETTER HAMZA
	afii57409: {
		n: 'afii57409',
		u: 0x0621,
	},
	// ARABIC LETTER ALEF WITH MADDA ABOVE
	afii57410: {
		n: 'afii57410',
		u: 0x0622,
	},
	// ARABIC LETTER ALEF WITH HAMZA ABOVE
	afii57411: {
		n: 'afii57411',
		u: 0x0623,
	},
	// ARABIC LETTER WAW WITH HAMZA ABOVE
	afii57412: {
		n: 'afii57412',
		u: 0x0624,
	},
	// ARABIC LETTER ALEF WITH HAMZA BELOW
	afii57413: {
		n: 'afii57413',
		u: 0x0625,
	},
	// ARABIC LETTER YEH WITH HAMZA ABOVE
	afii57414: {
		n: 'afii57414',
		u: 0x0626,
	},
	// ARABIC LETTER ALEF
	afii57415: {
		n: 'afii57415',
		u: 0x0627,
	},
	// ARABIC LETTER BEH
	afii57416: {
		n: 'afii57416',
		u: 0x0628,
	},
	// ARABIC LETTER TEH MARBUTA
	afii57417: {
		n: 'afii57417',
		u: 0x0629,
	},
	// ARABIC LETTER TEH
	afii57418: {
		n: 'afii57418',
		u: 0x062a,
	},
	// ARABIC LETTER THEH
	afii57419: {
		n: 'afii57419',
		u: 0x062b,
	},
	// ARABIC LETTER JEEM
	afii57420: {
		n: 'afii57420',
		u: 0x062c,
	},
	// ARABIC LETTER HAH
	afii57421: {
		n: 'afii57421',
		u: 0x062d,
	},
	// ARABIC LETTER KHAH
	afii57422: {
		n: 'afii57422',
		u: 0x062e,
	},
	// ARABIC LETTER DAL
	afii57423: {
		n: 'afii57423',
		u: 0x062f,
	},
	// ARABIC LETTER THAL
	afii57424: {
		n: 'afii57424',
		u: 0x0630,
	},
	// ARABIC LETTER REH
	afii57425: {
		n: 'afii57425',
		u: 0x0631,
	},
	// ARABIC LETTER ZAIN
	afii57426: {
		n: 'afii57426',
		u: 0x0632,
	},
	// ARABIC LETTER SEEN
	afii57427: {
		n: 'afii57427',
		u: 0x0633,
	},
	// ARABIC LETTER SHEEN
	afii57428: {
		n: 'afii57428',
		u: 0x0634,
	},
	// ARABIC LETTER SAD
	afii57429: {
		n: 'afii57429',
		u: 0x0635,
	},
	// ARABIC LETTER DAD
	afii57430: {
		n: 'afii57430',
		u: 0x0636,
	},
	// ARABIC LETTER TAH
	afii57431: {
		n: 'afii57431',
		u: 0x0637,
	},
	// ARABIC LETTER ZAH
	afii57432: {
		n: 'afii57432',
		u: 0x0638,
	},
	// ARABIC LETTER AIN
	afii57433: {
		n: 'afii57433',
		u: 0x0639,
	},
	// ARABIC LETTER GHAIN
	afii57434: {
		n: 'afii57434',
		u: 0x063a,
	},
	// ARABIC TATWEEL
	afii57440: {
		n: 'afii57440',
		u: 0x0640,
	},
	// ARABIC LETTER FEH
	afii57441: {
		n: 'afii57441',
		u: 0x0641,
	},
	// ARABIC LETTER QAF
	afii57442: {
		n: 'afii57442',
		u: 0x0642,
	},
	// ARABIC LETTER KAF
	afii57443: {
		n: 'afii57443',
		u: 0x0643,
	},
	// ARABIC LETTER LAM
	afii57444: {
		n: 'afii57444',
		u: 0x0644,
	},
	// ARABIC LETTER MEEM
	afii57445: {
		n: 'afii57445',
		u: 0x0645,
	},
	// ARABIC LETTER NOON
	afii57446: {
		n: 'afii57446',
		u: 0x0646,
	},
	// ARABIC LETTER WAW
	afii57448: {
		n: 'afii57448',
		u: 0x0648,
	},
	// ARABIC LETTER ALEF MAKSURA
	afii57449: {
		n: 'afii57449',
		u: 0x0649,
	},
	// ARABIC LETTER YEH
	afii57450: {
		n: 'afii57450',
		u: 0x064a,
	},
	// ARABIC FATHATAN
	afii57451: {
		n: 'afii57451',
		u: 0x064b,
	},
	// ARABIC DAMMATAN
	afii57452: {
		n: 'afii57452',
		u: 0x064c,
	},
	// ARABIC KASRATAN
	afii57453: {
		n: 'afii57453',
		u: 0x064d,
	},
	// ARABIC FATHA
	afii57454: {
		n: 'afii57454',
		u: 0x064e,
	},
	// ARABIC DAMMA
	afii57455: {
		n: 'afii57455',
		u: 0x064f,
	},
	// ARABIC KASRA
	afii57456: {
		n: 'afii57456',
		u: 0x0650,
	},
	// ARABIC SHADDA
	afii57457: {
		n: 'afii57457',
		u: 0x0651,
	},
	// ARABIC SUKUN
	afii57458: {
		n: 'afii57458',
		u: 0x0652,
	},
	// ARABIC LETTER HEH
	afii57470: {
		n: 'afii57470',
		u: 0x0647,
	},
	// ARABIC LETTER VEH
	afii57505: {
		n: 'afii57505',
		u: 0x06a4,
	},
	// ARABIC LETTER PEH
	afii57506: {
		n: 'afii57506',
		u: 0x067e,
	},
	// ARABIC LETTER TCHEH
	afii57507: {
		n: 'afii57507',
		u: 0x0686,
	},
	// ARABIC LETTER JEH
	afii57508: {
		n: 'afii57508',
		u: 0x0698,
	},
	// ARABIC LETTER GAF
	afii57509: {
		n: 'afii57509',
		u: 0x06af,
	},
	// ARABIC LETTER TTEH
	afii57511: {
		n: 'afii57511',
		u: 0x0679,
	},
	// ARABIC LETTER DDAL
	afii57512: {
		n: 'afii57512',
		u: 0x0688,
	},
	// ARABIC LETTER RREH
	afii57513: {
		n: 'afii57513',
		u: 0x0691,
	},
	// ARABIC LETTER NOON GHUNNA
	afii57514: {
		n: 'afii57514',
		u: 0x06ba,
	},
	// ARABIC LETTER YEH BARREE
	afii57519: {
		n: 'afii57519',
		u: 0x06d2,
	},
	// ARABIC LETTER AE
	afii57534: {
		n: 'afii57534',
		u: 0x06d5,
	},
	// NEW SHEQEL SIGN
	afii57636: {
		n: 'afii57636',
		u: 0x20aa,
	},
	// HEBREW PUNCTUATION MAQAF
	afii57645: {
		n: 'afii57645',
		u: 0x05be,
	},
	// HEBREW PUNCTUATION SOF PASUQ
	afii57658: {
		n: 'afii57658',
		u: 0x05c3,
	},
	// HEBREW LETTER ALEF
	afii57664: {
		n: 'afii57664',
		u: 0x05d0,
	},
	// HEBREW LETTER BET
	afii57665: {
		n: 'afii57665',
		u: 0x05d1,
	},
	// HEBREW LETTER GIMEL
	afii57666: {
		n: 'afii57666',
		u: 0x05d2,
	},
	// HEBREW LETTER DALET
	afii57667: {
		n: 'afii57667',
		u: 0x05d3,
	},
	// HEBREW LETTER HE
	afii57668: {
		n: 'afii57668',
		u: 0x05d4,
	},
	// HEBREW LETTER VAV
	afii57669: {
		n: 'afii57669',
		u: 0x05d5,
	},
	// HEBREW LETTER ZAYIN
	afii57670: {
		n: 'afii57670',
		u: 0x05d6,
	},
	// HEBREW LETTER HET
	afii57671: {
		n: 'afii57671',
		u: 0x05d7,
	},
	// HEBREW LETTER TET
	afii57672: {
		n: 'afii57672',
		u: 0x05d8,
	},
	// HEBREW LETTER YOD
	afii57673: {
		n: 'afii57673',
		u: 0x05d9,
	},
	// HEBREW LETTER FINAL KAF
	afii57674: {
		n: 'afii57674',
		u: 0x05da,
	},
	// HEBREW LETTER KAF
	afii57675: {
		n: 'afii57675',
		u: 0x05db,
	},
	// HEBREW LETTER LAMED
	afii57676: {
		n: 'afii57676',
		u: 0x05dc,
	},
	// HEBREW LETTER FINAL MEM
	afii57677: {
		n: 'afii57677',
		u: 0x05dd,
	},
	// HEBREW LETTER MEM
	afii57678: {
		n: 'afii57678',
		u: 0x05de,
	},
	// HEBREW LETTER FINAL NUN
	afii57679: {
		n: 'afii57679',
		u: 0x05df,
	},
	// HEBREW LETTER NUN
	afii57680: {
		n: 'afii57680',
		u: 0x05e0,
	},
	// HEBREW LETTER SAMEKH
	afii57681: {
		n: 'afii57681',
		u: 0x05e1,
	},
	// HEBREW LETTER AYIN
	afii57682: {
		n: 'afii57682',
		u: 0x05e2,
	},
	// HEBREW LETTER FINAL PE
	afii57683: {
		n: 'afii57683',
		u: 0x05e3,
	},
	// HEBREW LETTER PE
	afii57684: {
		n: 'afii57684',
		u: 0x05e4,
	},
	// HEBREW LETTER FINAL TSADI
	afii57685: {
		n: 'afii57685',
		u: 0x05e5,
	},
	// HEBREW LETTER TSADI
	afii57686: {
		n: 'afii57686',
		u: 0x05e6,
	},
	// HEBREW LETTER QOF
	afii57687: {
		n: 'afii57687',
		u: 0x05e7,
	},
	// HEBREW LETTER RESH
	afii57688: {
		n: 'afii57688',
		u: 0x05e8,
	},
	// HEBREW LETTER SHIN
	afii57689: {
		n: 'afii57689',
		u: 0x05e9,
	},
	// HEBREW LETTER TAV
	afii57690: {
		n: 'afii57690',
		u: 0x05ea,
	},
	// HEBREW LETTER SHIN WITH SHIN DOT
	afii57694: {
		n: 'afii57694',
		u: 0xfb2a,
	},
	// HEBREW LETTER SHIN WITH SIN DOT
	afii57695: {
		n: 'afii57695',
		u: 0xfb2b,
	},
	// HEBREW LETTER VAV WITH HOLAM
	afii57700: {
		n: 'afii57700',
		u: 0xfb4b,
	},
	// HEBREW LIGATURE YIDDISH YOD YOD PATAH
	afii57705: {
		n: 'afii57705',
		u: 0xfb1f,
	},
	// HEBREW LIGATURE YIDDISH DOUBLE VAV
	afii57716: {
		n: 'afii57716',
		u: 0x05f0,
	},
	// HEBREW LIGATURE YIDDISH VAV YOD
	afii57717: {
		n: 'afii57717',
		u: 0x05f1,
	},
	// HEBREW LIGATURE YIDDISH DOUBLE YOD
	afii57718: {
		n: 'afii57718',
		u: 0x05f2,
	},
	// HEBREW LETTER VAV WITH DAGESH
	afii57723: {
		n: 'afii57723',
		u: 0xfb35,
	},
	// HEBREW POINT HIRIQ
	afii57793: {
		n: 'afii57793',
		u: 0x05b4,
	},
	// HEBREW POINT TSERE
	afii57794: {
		n: 'afii57794',
		u: 0x05b5,
	},
	// HEBREW POINT SEGOL
	afii57795: {
		n: 'afii57795',
		u: 0x05b6,
	},
	// HEBREW POINT QUBUTS
	afii57796: {
		n: 'afii57796',
		u: 0x05bb,
	},
	// HEBREW POINT QAMATS
	afii57797: {
		n: 'afii57797',
		u: 0x05b8,
	},
	// HEBREW POINT PATAH
	afii57798: {
		n: 'afii57798',
		u: 0x05b7,
	},
	// HEBREW POINT SHEVA
	afii57799: {
		n: 'afii57799',
		u: 0x05b0,
	},
	// HEBREW POINT HATAF PATAH
	afii57800: {
		n: 'afii57800',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF SEGOL
	afii57801: {
		n: 'afii57801',
		u: 0x05b1,
	},
	// HEBREW POINT HATAF QAMATS
	afii57802: {
		n: 'afii57802',
		u: 0x05b3,
	},
	// HEBREW POINT SIN DOT
	afii57803: {
		n: 'afii57803',
		u: 0x05c2,
	},
	// HEBREW POINT SHIN DOT
	afii57804: {
		n: 'afii57804',
		u: 0x05c1,
	},
	// HEBREW POINT HOLAM
	afii57806: {
		n: 'afii57806',
		u: 0x05b9,
	},
	// HEBREW POINT DAGESH OR MAPIQ
	afii57807: {
		n: 'afii57807',
		u: 0x05bc,
	},
	// HEBREW POINT METEG
	afii57839: {
		n: 'afii57839',
		u: 0x05bd,
	},
	// HEBREW POINT RAFE
	afii57841: {
		n: 'afii57841',
		u: 0x05bf,
	},
	// HEBREW PUNCTUATION PASEQ
	afii57842: {
		n: 'afii57842',
		u: 0x05c0,
	},
	// MODIFIER LETTER APOSTROPHE
	afii57929: {
		n: 'afii57929',
		u: 0x02bc,
	},
	// CARE OF
	afii61248: {
		n: 'afii61248',
		u: 0x2105,
	},
	// SCRIPT SMALL L
	afii61289: {
		n: 'afii61289',
		u: 0x2113,
	},
	// NUMERO SIGN
	afii61352: {
		n: 'afii61352',
		u: 0x2116,
	},
	// POP DIRECTIONAL FORMATTING
	afii61573: {
		n: 'afii61573',
		u: 0x202c,
	},
	// LEFT-TO-RIGHT OVERRIDE
	afii61574: {
		n: 'afii61574',
		u: 0x202d,
	},
	// RIGHT-TO-LEFT OVERRIDE
	afii61575: {
		n: 'afii61575',
		u: 0x202e,
	},
	// ZERO WIDTH NON-JOINER
	afii61664: {
		n: 'afii61664',
		u: 0x200c,
	},
	// ARABIC FIVE POINTED STAR
	afii63167: {
		n: 'afii63167',
		u: 0x066d,
	},
	// MODIFIER LETTER REVERSED COMMA
	afii64937: {
		n: 'afii64937',
		u: 0x02bd,
	},
	// LATIN SMALL LETTER A WITH GRAVE
	agrave: {
		n: 'agrave',
		u: 0x00e0,
	},
	// GUJARATI LETTER A
	agujarati: {
		n: 'agujarati',
		u: 0x0a85,
	},
	// GURMUKHI LETTER A
	agurmukhi: {
		n: 'agurmukhi',
		u: 0x0a05,
	},
	// HIRAGANA LETTER A
	ahiragana: {
		n: 'ahiragana',
		u: 0x3042,
	},
	// LATIN SMALL LETTER A WITH HOOK ABOVE
	ahookabove: {
		n: 'ahookabove',
		u: 0x1ea3,
	},
	// BENGALI LETTER AI
	aibengali: {
		n: 'aibengali',
		u: 0x0990,
	},
	// BOPOMOFO LETTER AI
	aibopomofo: {
		n: 'aibopomofo',
		u: 0x311e,
	},
	// DEVANAGARI LETTER AI
	aideva: {
		n: 'aideva',
		u: 0x0910,
	},
	// CYRILLIC SMALL LIGATURE A IE
	aiecyrillic: {
		n: 'aiecyrillic',
		u: 0x04d5,
	},
	// GUJARATI LETTER AI
	aigujarati: {
		n: 'aigujarati',
		u: 0x0a90,
	},
	// GURMUKHI LETTER AI
	aigurmukhi: {
		n: 'aigurmukhi',
		u: 0x0a10,
	},
	// GURMUKHI VOWEL SIGN AI
	aimatragurmukhi: {
		n: 'aimatragurmukhi',
		u: 0x0a48,
	},
	// ARABIC LETTER AIN
	ainarabic: {
		n: 'ainarabic',
		u: 0x0639,
	},
	// ARABIC LETTER AIN FINAL FORM
	ainfinalarabic: {
		n: 'ainfinalarabic',
		u: 0xfeca,
	},
	// ARABIC LETTER AIN INITIAL FORM
	aininitialarabic: {
		n: 'aininitialarabic',
		u: 0xfecb,
	},
	// ARABIC LETTER AIN MEDIAL FORM
	ainmedialarabic: {
		n: 'ainmedialarabic',
		u: 0xfecc,
	},
	// LATIN SMALL LETTER A WITH INVERTED BREVE
	ainvertedbreve: {
		n: 'ainvertedbreve',
		u: 0x0203,
	},
	// BENGALI VOWEL SIGN AI
	aivowelsignbengali: {
		n: 'aivowelsignbengali',
		u: 0x09c8,
	},
	// DEVANAGARI VOWEL SIGN AI
	aivowelsigndeva: {
		n: 'aivowelsigndeva',
		u: 0x0948,
	},
	// GUJARATI VOWEL SIGN AI
	aivowelsigngujarati: {
		n: 'aivowelsigngujarati',
		u: 0x0ac8,
	},
	// KATAKANA LETTER A
	akatakana: {
		n: 'akatakana',
		u: 0x30a2,
	},
	// HALFWIDTH KATAKANA LETTER A
	akatakanahalfwidth: {
		n: 'akatakanahalfwidth',
		u: 0xff71,
	},
	// HANGUL LETTER A
	akorean: {
		n: 'akorean',
		u: 0x314f,
	},
	// HEBREW LETTER ALEF
	alef: {
		n: 'alef',
		u: 0x05d0,
	},
	// ARABIC LETTER ALEF
	alefarabic: {
		n: 'alefarabic',
		u: 0x0627,
	},
	// HEBREW LETTER ALEF WITH MAPIQ
	alefdageshhebrew: {
		n: 'alefdageshhebrew',
		u: 0xfb30,
	},
	// ARABIC LETTER ALEF FINAL FORM
	aleffinalarabic: {
		n: 'aleffinalarabic',
		u: 0xfe8e,
	},
	// ARABIC LETTER ALEF WITH HAMZA ABOVE
	alefhamzaabovearabic: {
		n: 'alefhamzaabovearabic',
		u: 0x0623,
	},
	// ARABIC LETTER ALEF WITH HAMZA ABOVE FINAL FORM
	alefhamzaabovefinalarabic: {
		n: 'alefhamzaabovefinalarabic',
		u: 0xfe84,
	},
	// ARABIC LETTER ALEF WITH HAMZA BELOW
	alefhamzabelowarabic: {
		n: 'alefhamzabelowarabic',
		u: 0x0625,
	},
	// ARABIC LETTER ALEF WITH HAMZA BELOW FINAL FORM
	alefhamzabelowfinalarabic: {
		n: 'alefhamzabelowfinalarabic',
		u: 0xfe88,
	},
	// HEBREW LETTER ALEF
	alefhebrew: {
		n: 'alefhebrew',
		u: 0x05d0,
	},
	// HEBREW LIGATURE ALEF LAMED
	aleflamedhebrew: {
		n: 'aleflamedhebrew',
		u: 0xfb4f,
	},
	// ARABIC LETTER ALEF WITH MADDA ABOVE
	alefmaddaabovearabic: {
		n: 'alefmaddaabovearabic',
		u: 0x0622,
	},
	// ARABIC LETTER ALEF WITH MADDA ABOVE FINAL FORM
	alefmaddaabovefinalarabic: {
		n: 'alefmaddaabovefinalarabic',
		u: 0xfe82,
	},
	// ARABIC LETTER ALEF MAKSURA
	alefmaksuraarabic: {
		n: 'alefmaksuraarabic',
		u: 0x0649,
	},
	// ARABIC LETTER ALEF MAKSURA FINAL FORM
	alefmaksurafinalarabic: {
		n: 'alefmaksurafinalarabic',
		u: 0xfef0,
	},
	// ARABIC LETTER YEH INITIAL FORM
	alefmaksurainitialarabic: {
		n: 'alefmaksurainitialarabic',
		u: 0xfef3,
	},
	// ARABIC LETTER YEH MEDIAL FORM
	alefmaksuramedialarabic: {
		n: 'alefmaksuramedialarabic',
		u: 0xfef4,
	},
	// HEBREW LETTER ALEF WITH PATAH
	alefpatahhebrew: {
		n: 'alefpatahhebrew',
		u: 0xfb2e,
	},
	// HEBREW LETTER ALEF WITH QAMATS
	alefqamatshebrew: {
		n: 'alefqamatshebrew',
		u: 0xfb2f,
	},
	// ALEF SYMBOL
	aleph: {
		n: 'aleph',
		u: 0x2135,
	},
	// ALL EQUAL TO
	allequal: {
		n: 'allequal',
		u: 0x224c,
	},
	// GREEK SMALL LETTER ALPHA
	alpha: {
		n: 'alpha',
		u: 0x03b1,
	},
	// GREEK SMALL LETTER ALPHA WITH TONOS
	alphatonos: {
		n: 'alphatonos',
		u: 0x03ac,
	},
	// LATIN SMALL LETTER A WITH MACRON
	amacron: {
		n: 'amacron',
		u: 0x0101,
	},
	// FULLWIDTH LATIN SMALL LETTER A
	amonospace: {
		n: 'amonospace',
		u: 0xff41,
	},
	// AMPERSAND
	ampersand: {
		n: 'ampersand',
		u: 0x0026,
	},
	// FULLWIDTH AMPERSAND
	ampersandmonospace: {
		n: 'ampersandmonospace',
		u: 0xff06,
	},
	// <private-use-F726>
	ampersandsmall: {
		n: 'ampersandsmall',
		u: 0xf726,
		f: [0x0026],
	},
	// SQUARE AM
	amsquare: {
		n: 'amsquare',
		u: 0x33c2,
	},
	// BOPOMOFO LETTER AN
	anbopomofo: {
		n: 'anbopomofo',
		u: 0x3122,
	},
	// BOPOMOFO LETTER ANG
	angbopomofo: {
		n: 'angbopomofo',
		u: 0x3124,
	},
	// THAI CHARACTER ANGKHANKHU
	angkhankhuthai: {
		n: 'angkhankhuthai',
		u: 0x0e5a,
	},
	// ANGLE
	angle: {
		n: 'angle',
		u: 0x2220,
	},
	// LEFT ANGLE BRACKET
	anglebracketleft: {
		n: 'anglebracketleft',
		u: 0x3008,
		f: [0x2329],
	},
	// PRESENTATION FORM FOR VERTICAL LEFT ANGLE BRACKET
	anglebracketleftvertical: {
		n: 'anglebracketleftvertical',
		u: 0xfe3f,
	},
	// RIGHT ANGLE BRACKET
	anglebracketright: {
		n: 'anglebracketright',
		u: 0x3009,
	},
	// PRESENTATION FORM FOR VERTICAL RIGHT ANGLE BRACKET
	anglebracketrightvertical: {
		n: 'anglebracketrightvertical',
		u: 0xfe40,
	},
	// LEFT-POINTING ANGLE BRACKET
	angleleft: {
		n: 'angleleft',
		u: 0x2329,
		f: [0x3008],
	},
	// RIGHT-POINTING ANGLE BRACKET
	angleright: {
		n: 'angleright',
		u: 0x232a,
		f: [0x3009],
	},
	// ANGSTROM SIGN
	angstrom: {
		n: 'angstrom',
		u: 0x212b,
	},
	// GREEK ANO TELEIA
	anoteleia: {
		n: 'anoteleia',
		u: 0x0387,
	},
	// DEVANAGARI STRESS SIGN ANUDATTA
	anudattadeva: {
		n: 'anudattadeva',
		u: 0x0952,
	},
	// BENGALI SIGN ANUSVARA
	anusvarabengali: {
		n: 'anusvarabengali',
		u: 0x0982,
	},
	// DEVANAGARI SIGN ANUSVARA
	anusvaradeva: {
		n: 'anusvaradeva',
		u: 0x0902,
	},
	// GUJARATI SIGN ANUSVARA
	anusvaragujarati: {
		n: 'anusvaragujarati',
		u: 0x0a82,
	},
	// LATIN SMALL LETTER A WITH OGONEK
	aogonek: {
		n: 'aogonek',
		u: 0x0105,
	},
	// SQUARE APAATO
	apaatosquare: {
		n: 'apaatosquare',
		u: 0x3300,
	},
	// PARENTHESIZED LATIN SMALL LETTER A
	aparen: {
		n: 'aparen',
		u: 0x249c,
	},
	// ARMENIAN APOSTROPHE
	apostrophearmenian: {
		n: 'apostrophearmenian',
		u: 0x055a,
	},
	// MODIFIER LETTER APOSTROPHE
	apostrophemod: {
		n: 'apostrophemod',
		u: 0x02bc,
	},
	// <private-use-F8FF>
	apple: {
		n: 'apple',
		u: 0xf8ff,
		f: [0x1f34f, 0x1f34e],
	},
	// APPROACHES THE LIMIT
	approaches: {
		n: 'approaches',
		u: 0x2250,
	},
	// ALMOST EQUAL TO
	approxequal: {
		n: 'approxequal',
		u: 0x2248,
	},
	// APPROXIMATELY EQUAL TO OR THE IMAGE OF
	approxequalorimage: {
		n: 'approxequalorimage',
		u: 0x2252,
	},
	// APPROXIMATELY EQUAL TO
	approximatelyequal: {
		n: 'approximatelyequal',
		u: 0x2245,
	},
	// HANGUL LETTER ARAEAE
	araeaekorean: {
		n: 'araeaekorean',
		u: 0x318e,
	},
	// HANGUL LETTER ARAEA
	araeakorean: {
		n: 'araeakorean',
		u: 0x318d,
	},
	// ARC
	arc: {
		n: 'arc',
		u: 0x2312,
	},
	// LATIN SMALL LETTER A WITH RIGHT HALF RING
	arighthalfring: {
		n: 'arighthalfring',
		u: 0x1e9a,
	},
	// LATIN SMALL LETTER A WITH RING ABOVE
	aring: {
		n: 'aring',
		u: 0x00e5,
	},
	// LATIN SMALL LETTER A WITH RING ABOVE AND ACUTE
	aringacute: {
		n: 'aringacute',
		u: 0x01fb,
	},
	// LATIN SMALL LETTER A WITH RING BELOW
	aringbelow: {
		n: 'aringbelow',
		u: 0x1e01,
	},
	// LEFT RIGHT ARROW
	arrowboth: {
		n: 'arrowboth',
		u: 0x2194,
	},
	// DOWNWARDS DASHED ARROW
	arrowdashdown: {
		n: 'arrowdashdown',
		u: 0x21e3,
	},
	// LEFTWARDS DASHED ARROW
	arrowdashleft: {
		n: 'arrowdashleft',
		u: 0x21e0,
	},
	// RIGHTWARDS DASHED ARROW
	arrowdashright: {
		n: 'arrowdashright',
		u: 0x21e2,
	},
	// UPWARDS DASHED ARROW
	arrowdashup: {
		n: 'arrowdashup',
		u: 0x21e1,
	},
	// LEFT RIGHT DOUBLE ARROW
	arrowdblboth: {
		n: 'arrowdblboth',
		u: 0x21d4,
	},
	// DOWNWARDS DOUBLE ARROW
	arrowdbldown: {
		n: 'arrowdbldown',
		u: 0x21d3,
	},
	// LEFTWARDS DOUBLE ARROW
	arrowdblleft: {
		n: 'arrowdblleft',
		u: 0x21d0,
	},
	// RIGHTWARDS DOUBLE ARROW
	arrowdblright: {
		n: 'arrowdblright',
		u: 0x21d2,
	},
	// UPWARDS DOUBLE ARROW
	arrowdblup: {
		n: 'arrowdblup',
		u: 0x21d1,
	},
	// DOWNWARDS ARROW
	arrowdown: {
		n: 'arrowdown',
		u: 0x2193,
	},
	// SOUTH WEST ARROW
	arrowdownleft: {
		n: 'arrowdownleft',
		u: 0x2199,
	},
	// SOUTH EAST ARROW
	arrowdownright: {
		n: 'arrowdownright',
		u: 0x2198,
	},
	// DOWNWARDS WHITE ARROW
	arrowdownwhite: {
		n: 'arrowdownwhite',
		u: 0x21e9,
	},
	// MODIFIER LETTER DOWN ARROWHEAD
	arrowheaddownmod: {
		n: 'arrowheaddownmod',
		u: 0x02c5,
	},
	// MODIFIER LETTER LEFT ARROWHEAD
	arrowheadleftmod: {
		n: 'arrowheadleftmod',
		u: 0x02c2,
	},
	// MODIFIER LETTER RIGHT ARROWHEAD
	arrowheadrightmod: {
		n: 'arrowheadrightmod',
		u: 0x02c3,
	},
	// MODIFIER LETTER UP ARROWHEAD
	arrowheadupmod: {
		n: 'arrowheadupmod',
		u: 0x02c4,
	},
	// <private-use-F8E7>
	arrowhorizex: {
		n: 'arrowhorizex',
		u: 0xf8e7,
	},
	// LEFTWARDS ARROW
	arrowleft: {
		n: 'arrowleft',
		u: 0x2190,
	},
	// LEFTWARDS DOUBLE ARROW
	arrowleftdbl: {
		n: 'arrowleftdbl',
		u: 0x21d0,
	},
	// LEFTWARDS DOUBLE ARROW WITH STROKE
	arrowleftdblstroke: {
		n: 'arrowleftdblstroke',
		u: 0x21cd,
	},
	// LEFTWARDS ARROW OVER RIGHTWARDS ARROW
	arrowleftoverright: {
		n: 'arrowleftoverright',
		u: 0x21c6,
	},
	// LEFTWARDS WHITE ARROW
	arrowleftwhite: {
		n: 'arrowleftwhite',
		u: 0x21e6,
	},
	// RIGHTWARDS ARROW
	arrowright: {
		n: 'arrowright',
		u: 0x2192,
	},
	// RIGHTWARDS DOUBLE ARROW WITH STROKE
	arrowrightdblstroke: {
		n: 'arrowrightdblstroke',
		u: 0x21cf,
	},
	// HEAVY TRIANGLE-HEADED RIGHTWARDS ARROW
	arrowrightheavy: {
		n: 'arrowrightheavy',
		u: 0x279e,
	},
	// RIGHTWARDS ARROW OVER LEFTWARDS ARROW
	arrowrightoverleft: {
		n: 'arrowrightoverleft',
		u: 0x21c4,
	},
	// RIGHTWARDS WHITE ARROW
	arrowrightwhite: {
		n: 'arrowrightwhite',
		u: 0x21e8,
	},
	// LEFTWARDS ARROW TO BAR
	arrowtableft: {
		n: 'arrowtableft',
		u: 0x21e4,
	},
	// RIGHTWARDS ARROW TO BAR
	arrowtabright: {
		n: 'arrowtabright',
		u: 0x21e5,
	},
	// UPWARDS ARROW
	arrowup: {
		n: 'arrowup',
		u: 0x2191,
	},
	// UP DOWN ARROW
	arrowupdn: {
		n: 'arrowupdn',
		u: 0x2195,
	},
	// UP DOWN ARROW WITH BASE
	arrowupdnbse: {
		n: 'arrowupdnbse',
		u: 0x21a8,
	},
	// UP DOWN ARROW WITH BASE
	arrowupdownbase: {
		n: 'arrowupdownbase',
		u: 0x21a8,
	},
	// NORTH WEST ARROW
	arrowupleft: {
		n: 'arrowupleft',
		u: 0x2196,
	},
	// UPWARDS ARROW LEFTWARDS OF DOWNWARDS ARROW
	arrowupleftofdown: {
		n: 'arrowupleftofdown',
		u: 0x21c5,
	},
	// NORTH EAST ARROW
	arrowupright: {
		n: 'arrowupright',
		u: 0x2197,
	},
	// UPWARDS WHITE ARROW
	arrowupwhite: {
		n: 'arrowupwhite',
		u: 0x21e7,
	},
	// <private-use-F8E6>
	arrowvertex: {
		n: 'arrowvertex',
		u: 0xf8e6,
	},
	// CIRCUMFLEX ACCENT
	asciicircum: {
		n: 'asciicircum',
		u: 0x005e,
	},
	// FULLWIDTH CIRCUMFLEX ACCENT
	asciicircummonospace: {
		n: 'asciicircummonospace',
		u: 0xff3e,
	},
	// TILDE
	asciitilde: {
		n: 'asciitilde',
		u: 0x007e,
	},
	// FULLWIDTH TILDE
	asciitildemonospace: {
		n: 'asciitildemonospace',
		u: 0xff5e,
	},
	// LATIN SMALL LETTER ALPHA
	ascript: {
		n: 'ascript',
		u: 0x0251,
	},
	// LATIN SMALL LETTER TURNED ALPHA
	ascriptturned: {
		n: 'ascriptturned',
		u: 0x0252,
	},
	// HIRAGANA LETTER SMALL A
	asmallhiragana: {
		n: 'asmallhiragana',
		u: 0x3041,
	},
	// KATAKANA LETTER SMALL A
	asmallkatakana: {
		n: 'asmallkatakana',
		u: 0x30a1,
	},
	// HALFWIDTH KATAKANA LETTER SMALL A
	asmallkatakanahalfwidth: {
		n: 'asmallkatakanahalfwidth',
		u: 0xff67,
	},
	// ASTERISK
	asterisk: {
		n: 'asterisk',
		u: 0x002a,
	},
	// ARABIC FIVE POINTED STAR
	asteriskaltonearabic: {
		n: 'asteriskaltonearabic',
		u: 0x066d,
	},
	// ARABIC FIVE POINTED STAR
	asteriskarabic: {
		n: 'asteriskarabic',
		u: 0x066d,
	},
	// ASTERISK OPERATOR
	asteriskmath: {
		n: 'asteriskmath',
		u: 0x2217,
	},
	// FULLWIDTH ASTERISK
	asteriskmonospace: {
		n: 'asteriskmonospace',
		u: 0xff0a,
	},
	// SMALL ASTERISK
	asterisksmall: {
		n: 'asterisksmall',
		u: 0xfe61,
		f: [0x002a],
	},
	// ASTERISM
	asterism: {
		n: 'asterism',
		u: 0x2042,
	},
	// <private-use-F6E9>
	asuperior: {
		n: 'asuperior',
		u: 0xf6e9,
	},
	// ASYMPTOTICALLY EQUAL TO
	asymptoticallyequal: {
		n: 'asymptoticallyequal',
		u: 0x2243,
	},
	// COMMERCIAL AT
	at: {
		n: 'at',
		u: 0x0040,
	},
	// LATIN SMALL LETTER A WITH TILDE
	atilde: {
		n: 'atilde',
		u: 0x00e3,
	},
	// FULLWIDTH COMMERCIAL AT
	atmonospace: {
		n: 'atmonospace',
		u: 0xff20,
	},
	// SMALL COMMERCIAL AT
	atsmall: {
		n: 'atsmall',
		u: 0xfe6b,
		f: [0x0040],
	},
	// LATIN SMALL LETTER TURNED A
	aturned: {
		n: 'aturned',
		u: 0x0250,
	},
	// BENGALI LETTER AU
	aubengali: {
		n: 'aubengali',
		u: 0x0994,
	},
	// BOPOMOFO LETTER AU
	aubopomofo: {
		n: 'aubopomofo',
		u: 0x3120,
	},
	// DEVANAGARI LETTER AU
	audeva: {
		n: 'audeva',
		u: 0x0914,
	},
	// GUJARATI LETTER AU
	augujarati: {
		n: 'augujarati',
		u: 0x0a94,
	},
	// GURMUKHI LETTER AU
	augurmukhi: {
		n: 'augurmukhi',
		u: 0x0a14,
	},
	// BENGALI AU LENGTH MARK
	aulengthmarkbengali: {
		n: 'aulengthmarkbengali',
		u: 0x09d7,
	},
	// GURMUKHI VOWEL SIGN AU
	aumatragurmukhi: {
		n: 'aumatragurmukhi',
		u: 0x0a4c,
	},
	// BENGALI VOWEL SIGN AU
	auvowelsignbengali: {
		n: 'auvowelsignbengali',
		u: 0x09cc,
	},
	// DEVANAGARI VOWEL SIGN AU
	auvowelsigndeva: {
		n: 'auvowelsigndeva',
		u: 0x094c,
	},
	// GUJARATI VOWEL SIGN AU
	auvowelsigngujarati: {
		n: 'auvowelsigngujarati',
		u: 0x0acc,
	},
	// DEVANAGARI SIGN AVAGRAHA
	avagrahadeva: {
		n: 'avagrahadeva',
		u: 0x093d,
	},
	// ARMENIAN SMALL LETTER AYB
	aybarmenian: {
		n: 'aybarmenian',
		u: 0x0561,
	},
	// HEBREW LETTER AYIN
	ayin: {
		n: 'ayin',
		u: 0x05e2,
	},
	// HEBREW LETTER ALTERNATIVE AYIN
	ayinaltonehebrew: {
		n: 'ayinaltonehebrew',
		u: 0xfb20,
	},
	// HEBREW LETTER AYIN
	ayinhebrew: {
		n: 'ayinhebrew',
		u: 0x05e2,
	},
	// LATIN SMALL LETTER B
	b: {
		n: 'b',
		u: 0x0062,
	},
	// BENGALI LETTER BA
	babengali: {
		n: 'babengali',
		u: 0x09ac,
	},
	// REVERSE SOLIDUS
	backslash: {
		n: 'backslash',
		u: 0x005c,
	},
	// FULLWIDTH REVERSE SOLIDUS
	backslashmonospace: {
		n: 'backslashmonospace',
		u: 0xff3c,
	},
	// DEVANAGARI LETTER BA
	badeva: {
		n: 'badeva',
		u: 0x092c,
	},
	// GUJARATI LETTER BA
	bagujarati: {
		n: 'bagujarati',
		u: 0x0aac,
	},
	// GURMUKHI LETTER BA
	bagurmukhi: {
		n: 'bagurmukhi',
		u: 0x0a2c,
	},
	// HIRAGANA LETTER BA
	bahiragana: {
		n: 'bahiragana',
		u: 0x3070,
	},
	// THAI CURRENCY SYMBOL BAHT
	bahtthai: {
		n: 'bahtthai',
		u: 0x0e3f,
	},
	// KATAKANA LETTER BA
	bakatakana: {
		n: 'bakatakana',
		u: 0x30d0,
	},
	// VERTICAL LINE
	bar: {
		n: 'bar',
		u: 0x007c,
	},
	// FULLWIDTH VERTICAL LINE
	barmonospace: {
		n: 'barmonospace',
		u: 0xff5c,
	},
	// BOPOMOFO LETTER B
	bbopomofo: {
		n: 'bbopomofo',
		u: 0x3105,
	},
	// CIRCLED LATIN SMALL LETTER B
	bcircle: {
		n: 'bcircle',
		u: 0x24d1,
	},
	// LATIN SMALL LETTER B WITH DOT ABOVE
	bdotaccent: {
		n: 'bdotaccent',
		u: 0x1e03,
	},
	// LATIN SMALL LETTER B WITH DOT BELOW
	bdotbelow: {
		n: 'bdotbelow',
		u: 0x1e05,
	},
	// BEAMED SIXTEENTH NOTES
	beamedsixteenthnotes: {
		n: 'beamedsixteenthnotes',
		u: 0x266c,
	},
	// BECAUSE
	because: {
		n: 'because',
		u: 0x2235,
	},
	// CYRILLIC SMALL LETTER BE
	becyrillic: {
		n: 'becyrillic',
		u: 0x0431,
	},
	// ARABIC LETTER BEH
	beharabic: {
		n: 'beharabic',
		u: 0x0628,
	},
	// ARABIC LETTER BEH FINAL FORM
	behfinalarabic: {
		n: 'behfinalarabic',
		u: 0xfe90,
	},
	// ARABIC LETTER BEH INITIAL FORM
	behinitialarabic: {
		n: 'behinitialarabic',
		u: 0xfe91,
	},
	// HIRAGANA LETTER BE
	behiragana: {
		n: 'behiragana',
		u: 0x3079,
	},
	// ARABIC LETTER BEH MEDIAL FORM
	behmedialarabic: {
		n: 'behmedialarabic',
		u: 0xfe92,
	},
	// ARABIC LIGATURE BEH WITH MEEM INITIAL FORM
	behmeeminitialarabic: {
		n: 'behmeeminitialarabic',
		u: 0xfc9f,
	},
	// ARABIC LIGATURE BEH WITH MEEM ISOLATED FORM
	behmeemisolatedarabic: {
		n: 'behmeemisolatedarabic',
		u: 0xfc08,
	},
	// ARABIC LIGATURE BEH WITH NOON FINAL FORM
	behnoonfinalarabic: {
		n: 'behnoonfinalarabic',
		u: 0xfc6d,
	},
	// KATAKANA LETTER BE
	bekatakana: {
		n: 'bekatakana',
		u: 0x30d9,
	},
	// ARMENIAN SMALL LETTER BEN
	benarmenian: {
		n: 'benarmenian',
		u: 0x0562,
	},
	// HEBREW LETTER BET
	bet: {
		n: 'bet',
		u: 0x05d1,
	},
	// GREEK SMALL LETTER BETA
	beta: {
		n: 'beta',
		u: 0x03b2,
	},
	// GREEK BETA SYMBOL
	betasymbolgreek: {
		n: 'betasymbolgreek',
		u: 0x03d0,
	},
	// HEBREW LETTER BET WITH DAGESH
	betdagesh: {
		n: 'betdagesh',
		u: 0xfb31,
	},
	// HEBREW LETTER BET WITH DAGESH
	betdageshhebrew: {
		n: 'betdageshhebrew',
		u: 0xfb31,
	},
	// HEBREW LETTER BET
	bethebrew: {
		n: 'bethebrew',
		u: 0x05d1,
	},
	// HEBREW LETTER BET WITH RAFE
	betrafehebrew: {
		n: 'betrafehebrew',
		u: 0xfb4c,
	},
	// BENGALI LETTER BHA
	bhabengali: {
		n: 'bhabengali',
		u: 0x09ad,
	},
	// DEVANAGARI LETTER BHA
	bhadeva: {
		n: 'bhadeva',
		u: 0x092d,
	},
	// GUJARATI LETTER BHA
	bhagujarati: {
		n: 'bhagujarati',
		u: 0x0aad,
	},
	// GURMUKHI LETTER BHA
	bhagurmukhi: {
		n: 'bhagurmukhi',
		u: 0x0a2d,
	},
	// LATIN SMALL LETTER B WITH HOOK
	bhook: {
		n: 'bhook',
		u: 0x0253,
	},
	// HIRAGANA LETTER BI
	bihiragana: {
		n: 'bihiragana',
		u: 0x3073,
	},
	// KATAKANA LETTER BI
	bikatakana: {
		n: 'bikatakana',
		u: 0x30d3,
	},
	// LATIN LETTER BILABIAL CLICK
	bilabialclick: {
		n: 'bilabialclick',
		u: 0x0298,
	},
	// GURMUKHI SIGN BINDI
	bindigurmukhi: {
		n: 'bindigurmukhi',
		u: 0x0a02,
	},
	// SQUARE BIRU
	birusquare: {
		n: 'birusquare',
		u: 0x3331,
	},
	// BLACK CIRCLE
	blackcircle: {
		n: 'blackcircle',
		u: 0x25cf,
	},
	// BLACK DIAMOND
	blackdiamond: {
		n: 'blackdiamond',
		u: 0x25c6,
	},
	// BLACK DOWN-POINTING TRIANGLE
	blackdownpointingtriangle: {
		n: 'blackdownpointingtriangle',
		u: 0x25bc,
	},
	// BLACK LEFT-POINTING POINTER
	blackleftpointingpointer: {
		n: 'blackleftpointingpointer',
		u: 0x25c4,
	},
	// BLACK LEFT-POINTING TRIANGLE
	blackleftpointingtriangle: {
		n: 'blackleftpointingtriangle',
		u: 0x25c0,
	},
	// LEFT BLACK LENTICULAR BRACKET
	blacklenticularbracketleft: {
		n: 'blacklenticularbracketleft',
		u: 0x3010,
	},
	// PRESENTATION FORM FOR VERTICAL LEFT BLACK LENTICULAR BRACKET
	blacklenticularbracketleftvertical: {
		n: 'blacklenticularbracketleftvertical',
		u: 0xfe3b,
	},
	// RIGHT BLACK LENTICULAR BRACKET
	blacklenticularbracketright: {
		n: 'blacklenticularbracketright',
		u: 0x3011,
	},
	// PRESENTATION FORM FOR VERTICAL RIGHT BLACK LENTICULAR BRACKET
	blacklenticularbracketrightvertical: {
		n: 'blacklenticularbracketrightvertical',
		u: 0xfe3c,
	},
	// BLACK LOWER LEFT TRIANGLE
	blacklowerlefttriangle: {
		n: 'blacklowerlefttriangle',
		u: 0x25e3,
	},
	// BLACK LOWER RIGHT TRIANGLE
	blacklowerrighttriangle: {
		n: 'blacklowerrighttriangle',
		u: 0x25e2,
	},
	// BLACK RECTANGLE
	blackrectangle: {
		n: 'blackrectangle',
		u: 0x25ac,
	},
	// BLACK RIGHT-POINTING POINTER
	blackrightpointingpointer: {
		n: 'blackrightpointingpointer',
		u: 0x25ba,
	},
	// BLACK RIGHT-POINTING TRIANGLE
	blackrightpointingtriangle: {
		n: 'blackrightpointingtriangle',
		u: 0x25b6,
	},
	// BLACK SMALL SQUARE
	blacksmallsquare: {
		n: 'blacksmallsquare',
		u: 0x25aa,
	},
	// BLACK SMILING FACE
	blacksmilingface: {
		n: 'blacksmilingface',
		u: 0x263b,
	},
	// BLACK SQUARE
	blacksquare: {
		n: 'blacksquare',
		u: 0x25a0,
	},
	// BLACK STAR
	blackstar: {
		n: 'blackstar',
		u: 0x2605,
	},
	// BLACK UPPER LEFT TRIANGLE
	blackupperlefttriangle: {
		n: 'blackupperlefttriangle',
		u: 0x25e4,
	},
	// BLACK UPPER RIGHT TRIANGLE
	blackupperrighttriangle: {
		n: 'blackupperrighttriangle',
		u: 0x25e5,
	},
	// BLACK UP-POINTING SMALL TRIANGLE
	blackuppointingsmalltriangle: {
		n: 'blackuppointingsmalltriangle',
		u: 0x25b4,
	},
	// BLACK UP-POINTING TRIANGLE
	blackuppointingtriangle: {
		n: 'blackuppointingtriangle',
		u: 0x25b2,
	},
	// OPEN BOX
	blank: {
		n: 'blank',
		u: 0x2423,
	},
	// LATIN SMALL LETTER B WITH LINE BELOW
	blinebelow: {
		n: 'blinebelow',
		u: 0x1e07,
	},
	// FULL BLOCK
	block: {
		n: 'block',
		u: 0x2588,
	},
	// FULLWIDTH LATIN SMALL LETTER B
	bmonospace: {
		n: 'bmonospace',
		u: 0xff42,
	},
	// THAI CHARACTER BO BAIMAI
	bobaimaithai: {
		n: 'bobaimaithai',
		u: 0x0e1a,
	},
	// HIRAGANA LETTER BO
	bohiragana: {
		n: 'bohiragana',
		u: 0x307c,
	},
	// KATAKANA LETTER BO
	bokatakana: {
		n: 'bokatakana',
		u: 0x30dc,
	},
	// PARENTHESIZED LATIN SMALL LETTER B
	bparen: {
		n: 'bparen',
		u: 0x249d,
	},
	// SQUARE BQ
	bqsquare: {
		n: 'bqsquare',
		u: 0x33c3,
	},
	// <private-use-F8F4>
	braceex: {
		n: 'braceex',
		u: 0xf8f4,
	},
	// LEFT CURLY BRACKET
	braceleft: {
		n: 'braceleft',
		u: 0x007b,
	},
	// <private-use-F8F3>
	braceleftbt: {
		n: 'braceleftbt',
		u: 0xf8f3,
		f: [0xf8f0],
	},
	// <private-use-F8F2>
	braceleftmid: {
		n: 'braceleftmid',
		u: 0xf8f2,
		f: [0xf8ef],
	},
	// FULLWIDTH LEFT CURLY BRACKET
	braceleftmonospace: {
		n: 'braceleftmonospace',
		u: 0xff5b,
	},
	// SMALL LEFT CURLY BRACKET
	braceleftsmall: {
		n: 'braceleftsmall',
		u: 0xfe5b,
		f: [0x007b],
	},
	// <private-use-F8F1>
	bracelefttp: {
		n: 'bracelefttp',
		u: 0xf8f1,
		f: [0xf8ee],
	},
	// PRESENTATION FORM FOR VERTICAL LEFT CURLY BRACKET
	braceleftvertical: {
		n: 'braceleftvertical',
		u: 0xfe37,
	},
	// RIGHT CURLY BRACKET
	braceright: {
		n: 'braceright',
		u: 0x007d,
	},
	// <private-use-F8FE>
	bracerightbt: {
		n: 'bracerightbt',
		u: 0xf8fe,
	},
	// <private-use-F8FD>
	bracerightmid: {
		n: 'bracerightmid',
		u: 0xf8fd,
	},
	// FULLWIDTH RIGHT CURLY BRACKET
	bracerightmonospace: {
		n: 'bracerightmonospace',
		u: 0xff5d,
	},
	// SMALL RIGHT CURLY BRACKET
	bracerightsmall: {
		n: 'bracerightsmall',
		u: 0xfe5c,
		f: [0x007d],
	},
	// <private-use-F8FC>
	bracerighttp: {
		n: 'bracerighttp',
		u: 0xf8fc,
	},
	// PRESENTATION FORM FOR VERTICAL RIGHT CURLY BRACKET
	bracerightvertical: {
		n: 'bracerightvertical',
		u: 0xfe38,
	},
	// LEFT SQUARE BRACKET
	bracketleft: {
		n: 'bracketleft',
		u: 0x005b,
	},
	// <private-use-F8F0>
	bracketleftbt: {
		n: 'bracketleftbt',
		u: 0xf8f0,
		f: [0xf8f3],
	},
	// <private-use-F8EF>
	bracketleftex: {
		n: 'bracketleftex',
		u: 0xf8ef,
	},
	// FULLWIDTH LEFT SQUARE BRACKET
	bracketleftmonospace: {
		n: 'bracketleftmonospace',
		u: 0xff3b,
	},
	// <private-use-F8EE>
	bracketlefttp: {
		n: 'bracketlefttp',
		u: 0xf8ee,
		f: [0xf8f1],
	},
	// RIGHT SQUARE BRACKET
	bracketright: {
		n: 'bracketright',
		u: 0x005d,
	},
	// <private-use-F8FB>
	bracketrightbt: {
		n: 'bracketrightbt',
		u: 0xf8fb,
	},
	// <private-use-F8FA>
	bracketrightex: {
		n: 'bracketrightex',
		u: 0xf8fa,
	},
	// FULLWIDTH RIGHT SQUARE BRACKET
	bracketrightmonospace: {
		n: 'bracketrightmonospace',
		u: 0xff3d,
	},
	// <private-use-F8F9>
	bracketrighttp: {
		n: 'bracketrighttp',
		u: 0xf8f9,
	},
	// BREVE
	breve: {
		n: 'breve',
		u: 0x02d8,
	},
	// COMBINING BREVE BELOW
	brevebelowcmb: {
		n: 'brevebelowcmb',
		u: 0x032e,
	},
	// COMBINING BREVE
	brevecmb: {
		n: 'brevecmb',
		u: 0x0306,
	},
	// COMBINING INVERTED BREVE BELOW
	breveinvertedbelowcmb: {
		n: 'breveinvertedbelowcmb',
		u: 0x032f,
	},
	// COMBINING INVERTED BREVE
	breveinvertedcmb: {
		n: 'breveinvertedcmb',
		u: 0x0311,
	},
	// COMBINING DOUBLE INVERTED BREVE
	breveinverteddoublecmb: {
		n: 'breveinverteddoublecmb',
		u: 0x0361,
	},
	// COMBINING BRIDGE BELOW
	bridgebelowcmb: {
		n: 'bridgebelowcmb',
		u: 0x032a,
	},
	// COMBINING INVERTED BRIDGE BELOW
	bridgeinvertedbelowcmb: {
		n: 'bridgeinvertedbelowcmb',
		u: 0x033a,
	},
	// BROKEN BAR
	brokenbar: {
		n: 'brokenbar',
		u: 0x00a6,
	},
	// LATIN SMALL LETTER B WITH STROKE
	bstroke: {
		n: 'bstroke',
		u: 0x0180,
	},
	// <private-use-F6EA>
	bsuperior: {
		n: 'bsuperior',
		u: 0xf6ea,
	},
	// LATIN SMALL LETTER B WITH TOPBAR
	btopbar: {
		n: 'btopbar',
		u: 0x0183,
	},
	// HIRAGANA LETTER BU
	buhiragana: {
		n: 'buhiragana',
		u: 0x3076,
	},
	// KATAKANA LETTER BU
	bukatakana: {
		n: 'bukatakana',
		u: 0x30d6,
	},
	// BULLET
	bullet: {
		n: 'bullet',
		u: 0x2022,
	},
	// INVERSE BULLET
	bulletinverse: {
		n: 'bulletinverse',
		u: 0x25d8,
	},
	// BULLET OPERATOR
	bulletoperator: {
		n: 'bulletoperator',
		u: 0x2219,
	},
	// BULLSEYE
	bullseye: {
		n: 'bullseye',
		u: 0x25ce,
	},
	// LATIN SMALL LETTER C
	c: {
		n: 'c',
		u: 0x0063,
	},
	// ARMENIAN SMALL LETTER CA
	caarmenian: {
		n: 'caarmenian',
		u: 0x056e,
	},
	// BENGALI LETTER CA
	cabengali: {
		n: 'cabengali',
		u: 0x099a,
	},
	// LATIN SMALL LETTER C WITH ACUTE
	cacute: {
		n: 'cacute',
		u: 0x0107,
	},
	// DEVANAGARI LETTER CA
	cadeva: {
		n: 'cadeva',
		u: 0x091a,
	},
	// GUJARATI LETTER CA
	cagujarati: {
		n: 'cagujarati',
		u: 0x0a9a,
	},
	// GURMUKHI LETTER CA
	cagurmukhi: {
		n: 'cagurmukhi',
		u: 0x0a1a,
	},
	// SQUARE CAL
	calsquare: {
		n: 'calsquare',
		u: 0x3388,
	},
	// BENGALI SIGN CANDRABINDU
	candrabindubengali: {
		n: 'candrabindubengali',
		u: 0x0981,
	},
	// COMBINING CANDRABINDU
	candrabinducmb: {
		n: 'candrabinducmb',
		u: 0x0310,
	},
	// DEVANAGARI SIGN CANDRABINDU
	candrabindudeva: {
		n: 'candrabindudeva',
		u: 0x0901,
	},
	// GUJARATI SIGN CANDRABINDU
	candrabindugujarati: {
		n: 'candrabindugujarati',
		u: 0x0a81,
	},
	// UPWARDS WHITE ARROW FROM BAR
	capslock: {
		n: 'capslock',
		u: 0x21ea,
	},
	// CARE OF
	careof: {
		n: 'careof',
		u: 0x2105,
	},
	// CARON
	caron: {
		n: 'caron',
		u: 0x02c7,
	},
	// COMBINING CARON BELOW
	caronbelowcmb: {
		n: 'caronbelowcmb',
		u: 0x032c,
	},
	// COMBINING CARON
	caroncmb: {
		n: 'caroncmb',
		u: 0x030c,
	},
	// DOWNWARDS ARROW WITH CORNER LEFTWARDS
	carriagereturn: {
		n: 'carriagereturn',
		u: 0x21b5,
	},
	// BOPOMOFO LETTER C
	cbopomofo: {
		n: 'cbopomofo',
		u: 0x3118,
	},
	// LATIN SMALL LETTER C WITH CARON
	ccaron: {
		n: 'ccaron',
		u: 0x010d,
	},
	// LATIN SMALL LETTER C WITH CEDILLA
	ccedilla: {
		n: 'ccedilla',
		u: 0x00e7,
	},
	// LATIN SMALL LETTER C WITH CEDILLA AND ACUTE
	ccedillaacute: {
		n: 'ccedillaacute',
		u: 0x1e09,
	},
	// CIRCLED LATIN SMALL LETTER C
	ccircle: {
		n: 'ccircle',
		u: 0x24d2,
	},
	// LATIN SMALL LETTER C WITH CIRCUMFLEX
	ccircumflex: {
		n: 'ccircumflex',
		u: 0x0109,
	},
	// LATIN SMALL LETTER C WITH CURL
	ccurl: {
		n: 'ccurl',
		u: 0x0255,
	},
	// LATIN SMALL LETTER C WITH DOT ABOVE
	cdot: {
		n: 'cdot',
		u: 0x010b,
	},
	// LATIN SMALL LETTER C WITH DOT ABOVE
	cdotaccent: {
		n: 'cdotaccent',
		u: 0x010b,
	},
	// SQUARE CD
	cdsquare: {
		n: 'cdsquare',
		u: 0x33c5,
	},
	// CEDILLA
	cedilla: {
		n: 'cedilla',
		u: 0x00b8,
	},
	// COMBINING CEDILLA
	cedillacmb: {
		n: 'cedillacmb',
		u: 0x0327,
	},
	// CENT SIGN
	cent: {
		n: 'cent',
		u: 0x00a2,
	},
	// DEGREE CELSIUS
	centigrade: {
		n: 'centigrade',
		u: 0x2103,
	},
	// <private-use-F6DF>
	centinferior: {
		n: 'centinferior',
		u: 0xf6df,
	},
	// FULLWIDTH CENT SIGN
	centmonospace: {
		n: 'centmonospace',
		u: 0xffe0,
	},
	// <private-use-F7A2>
	centoldstyle: {
		n: 'centoldstyle',
		u: 0xf7a2,
	},
	// <private-use-F6E0>
	centsuperior: {
		n: 'centsuperior',
		u: 0xf6e0,
	},
	// ARMENIAN SMALL LETTER CHA
	chaarmenian: {
		n: 'chaarmenian',
		u: 0x0579,
	},
	// BENGALI LETTER CHA
	chabengali: {
		n: 'chabengali',
		u: 0x099b,
	},
	// DEVANAGARI LETTER CHA
	chadeva: {
		n: 'chadeva',
		u: 0x091b,
	},
	// GUJARATI LETTER CHA
	chagujarati: {
		n: 'chagujarati',
		u: 0x0a9b,
	},
	// GURMUKHI LETTER CHA
	chagurmukhi: {
		n: 'chagurmukhi',
		u: 0x0a1b,
	},
	// BOPOMOFO LETTER CH
	chbopomofo: {
		n: 'chbopomofo',
		u: 0x3114,
	},
	// CYRILLIC SMALL LETTER ABKHASIAN CHE
	cheabkhasiancyrillic: {
		n: 'cheabkhasiancyrillic',
		u: 0x04bd,
	},
	// CHECK MARK
	checkmark: {
		n: 'checkmark',
		u: 0x2713,
	},
	// CYRILLIC SMALL LETTER CHE
	checyrillic: {
		n: 'checyrillic',
		u: 0x0447,
	},
	// CYRILLIC SMALL LETTER ABKHASIAN CHE WITH DESCENDER
	chedescenderabkhasiancyrillic: {
		n: 'chedescenderabkhasiancyrillic',
		u: 0x04bf,
	},
	// CYRILLIC SMALL LETTER CHE WITH DESCENDER
	chedescendercyrillic: {
		n: 'chedescendercyrillic',
		u: 0x04b7,
	},
	// CYRILLIC SMALL LETTER CHE WITH DIAERESIS
	chedieresiscyrillic: {
		n: 'chedieresiscyrillic',
		u: 0x04f5,
	},
	// ARMENIAN SMALL LETTER CHEH
	cheharmenian: {
		n: 'cheharmenian',
		u: 0x0573,
	},
	// CYRILLIC SMALL LETTER KHAKASSIAN CHE
	chekhakassiancyrillic: {
		n: 'chekhakassiancyrillic',
		u: 0x04cc,
	},
	// CYRILLIC SMALL LETTER CHE WITH VERTICAL STROKE
	cheverticalstrokecyrillic: {
		n: 'cheverticalstrokecyrillic',
		u: 0x04b9,
	},
	// GREEK SMALL LETTER CHI
	chi: {
		n: 'chi',
		u: 0x03c7,
	},
	// CIRCLED HANGUL CHIEUCH A
	chieuchacirclekorean: {
		n: 'chieuchacirclekorean',
		u: 0x3277,
	},
	// PARENTHESIZED HANGUL CHIEUCH A
	chieuchaparenkorean: {
		n: 'chieuchaparenkorean',
		u: 0x3217,
	},
	// CIRCLED HANGUL CHIEUCH
	chieuchcirclekorean: {
		n: 'chieuchcirclekorean',
		u: 0x3269,
	},
	// HANGUL LETTER CHIEUCH
	chieuchkorean: {
		n: 'chieuchkorean',
		u: 0x314a,
	},
	// PARENTHESIZED HANGUL CHIEUCH
	chieuchparenkorean: {
		n: 'chieuchparenkorean',
		u: 0x3209,
	},
	// THAI CHARACTER CHO CHANG
	chochangthai: {
		n: 'chochangthai',
		u: 0x0e0a,
	},
	// THAI CHARACTER CHO CHAN
	chochanthai: {
		n: 'chochanthai',
		u: 0x0e08,
	},
	// THAI CHARACTER CHO CHING
	chochingthai: {
		n: 'chochingthai',
		u: 0x0e09,
	},
	// THAI CHARACTER CHO CHOE
	chochoethai: {
		n: 'chochoethai',
		u: 0x0e0c,
	},
	// LATIN SMALL LETTER C WITH HOOK
	chook: {
		n: 'chook',
		u: 0x0188,
	},
	// CIRCLED HANGUL CIEUC A
	cieucacirclekorean: {
		n: 'cieucacirclekorean',
		u: 0x3276,
	},
	// PARENTHESIZED HANGUL CIEUC A
	cieucaparenkorean: {
		n: 'cieucaparenkorean',
		u: 0x3216,
	},
	// CIRCLED HANGUL CIEUC
	cieuccirclekorean: {
		n: 'cieuccirclekorean',
		u: 0x3268,
	},
	// HANGUL LETTER CIEUC
	cieuckorean: {
		n: 'cieuckorean',
		u: 0x3148,
	},
	// PARENTHESIZED HANGUL CIEUC
	cieucparenkorean: {
		n: 'cieucparenkorean',
		u: 0x3208,
	},
	// PARENTHESIZED HANGUL CIEUC U
	cieucuparenkorean: {
		n: 'cieucuparenkorean',
		u: 0x321c,
	},
	// WHITE CIRCLE
	circle: {
		n: 'circle',
		u: 0x25cb,
	},
	// CIRCLED TIMES
	circlemultiply: {
		n: 'circlemultiply',
		u: 0x2297,
	},
	// CIRCLED DOT OPERATOR
	circleot: {
		n: 'circleot',
		u: 0x2299,
	},
	// CIRCLED PLUS
	circleplus: {
		n: 'circleplus',
		u: 0x2295,
	},
	// CIRCLED POSTAL MARK
	circlepostalmark: {
		n: 'circlepostalmark',
		u: 0x3036,
	},
	// CIRCLE WITH LEFT HALF BLACK
	circlewithlefthalfblack: {
		n: 'circlewithlefthalfblack',
		u: 0x25d0,
	},
	// CIRCLE WITH RIGHT HALF BLACK
	circlewithrighthalfblack: {
		n: 'circlewithrighthalfblack',
		u: 0x25d1,
	},
	// MODIFIER LETTER CIRCUMFLEX ACCENT
	circumflex: {
		n: 'circumflex',
		u: 0x02c6,
	},
	// COMBINING CIRCUMFLEX ACCENT BELOW
	circumflexbelowcmb: {
		n: 'circumflexbelowcmb',
		u: 0x032d,
	},
	// COMBINING CIRCUMFLEX ACCENT
	circumflexcmb: {
		n: 'circumflexcmb',
		u: 0x0302,
	},
	// X IN A RECTANGLE BOX
	clear: {
		n: 'clear',
		u: 0x2327,
	},
	// LATIN LETTER ALVEOLAR CLICK
	clickalveolar: {
		n: 'clickalveolar',
		u: 0x01c2,
	},
	// LATIN LETTER DENTAL CLICK
	clickdental: {
		n: 'clickdental',
		u: 0x01c0,
	},
	// LATIN LETTER LATERAL CLICK
	clicklateral: {
		n: 'clicklateral',
		u: 0x01c1,
	},
	// LATIN LETTER RETROFLEX CLICK
	clickretroflex: {
		n: 'clickretroflex',
		u: 0x01c3,
	},
	// BLACK CLUB SUIT
	club: {
		n: 'club',
		u: 0x2663,
	},
	// BLACK CLUB SUIT
	clubsuitblack: {
		n: 'clubsuitblack',
		u: 0x2663,
	},
	// WHITE CLUB SUIT
	clubsuitwhite: {
		n: 'clubsuitwhite',
		u: 0x2667,
	},
	// SQUARE CM CUBED
	cmcubedsquare: {
		n: 'cmcubedsquare',
		u: 0x33a4,
	},
	// FULLWIDTH LATIN SMALL LETTER C
	cmonospace: {
		n: 'cmonospace',
		u: 0xff43,
	},
	// SQUARE CM SQUARED
	cmsquaredsquare: {
		n: 'cmsquaredsquare',
		u: 0x33a0,
	},
	// ARMENIAN SMALL LETTER CO
	coarmenian: {
		n: 'coarmenian',
		u: 0x0581,
	},
	// COLON
	colon: {
		n: 'colon',
		u: 0x003a,
	},
	// COLON SIGN
	colonmonetary: {
		n: 'colonmonetary',
		u: 0x20a1,
	},
	// FULLWIDTH COLON
	colonmonospace: {
		n: 'colonmonospace',
		u: 0xff1a,
	},
	// COLON SIGN
	colonsign: {
		n: 'colonsign',
		u: 0x20a1,
	},
	// SMALL COLON
	colonsmall: {
		n: 'colonsmall',
		u: 0xfe55,
		f: [0x003a],
	},
	// MODIFIER LETTER HALF TRIANGULAR COLON
	colontriangularhalfmod: {
		n: 'colontriangularhalfmod',
		u: 0x02d1,
	},
	// MODIFIER LETTER TRIANGULAR COLON
	colontriangularmod: {
		n: 'colontriangularmod',
		u: 0x02d0,
	},
	// COMMA
	comma: {
		n: 'comma',
		u: 0x002c,
	},
	// COMBINING COMMA ABOVE
	commaabovecmb: {
		n: 'commaabovecmb',
		u: 0x0313,
	},
	// COMBINING COMMA ABOVE RIGHT
	commaaboverightcmb: {
		n: 'commaaboverightcmb',
		u: 0x0315,
	},
	// <private-use-F6C3>
	commaaccent: {
		n: 'commaaccent',
		u: 0xf6c3,
	},
	// ARABIC COMMA
	commaarabic: {
		n: 'commaarabic',
		u: 0x060c,
	},
	// ARMENIAN COMMA
	commaarmenian: {
		n: 'commaarmenian',
		u: 0x055d,
	},
	// <private-use-F6E1>
	commainferior: {
		n: 'commainferior',
		u: 0xf6e1,
	},
	// FULLWIDTH COMMA
	commamonospace: {
		n: 'commamonospace',
		u: 0xff0c,
	},
	// COMBINING REVERSED COMMA ABOVE
	commareversedabovecmb: {
		n: 'commareversedabovecmb',
		u: 0x0314,
	},
	// MODIFIER LETTER REVERSED COMMA
	commareversedmod: {
		n: 'commareversedmod',
		u: 0x02bd,
	},
	// SMALL COMMA
	commasmall: {
		n: 'commasmall',
		u: 0xfe50,
		f: [0x002c],
	},
	// <private-use-F6E2>
	commasuperior: {
		n: 'commasuperior',
		u: 0xf6e2,
	},
	// COMBINING TURNED COMMA ABOVE
	commaturnedabovecmb: {
		n: 'commaturnedabovecmb',
		u: 0x0312,
	},
	// MODIFIER LETTER TURNED COMMA
	commaturnedmod: {
		n: 'commaturnedmod',
		u: 0x02bb,
	},
	// WHITE SUN WITH RAYS
	compass: {
		n: 'compass',
		u: 0x263c,
	},
	// APPROXIMATELY EQUAL TO
	congruent: {
		n: 'congruent',
		u: 0x2245,
	},
	// CONTOUR INTEGRAL
	contourintegral: {
		n: 'contourintegral',
		u: 0x222e,
	},
	// UP ARROWHEAD
	control: {
		n: 'control',
		u: 0x2303,
	},
	// ACKNOWLEDGE
	controlACK: {
		n: 'controlACK',
		u: 0x0006,
	},
	// ALERT
	controlBEL: {
		n: 'controlBEL',
		u: 0x0007,
	},
	// BACKSPACE
	controlBS: {
		n: 'controlBS',
		u: 0x0008,
	},
	// CANCEL
	controlCAN: {
		n: 'controlCAN',
		u: 0x0018,
	},
	// CARRIAGE RETURN
	controlCR: {
		n: 'controlCR',
		u: 0x000d,
	},
	// DEVICE CONTROL ONE
	controlDC1: {
		n: 'controlDC1',
		u: 0x0011,
	},
	// DEVICE CONTROL TWO
	controlDC2: {
		n: 'controlDC2',
		u: 0x0012,
	},
	// DEVICE CONTROL THREE
	controlDC3: {
		n: 'controlDC3',
		u: 0x0013,
	},
	// DEVICE CONTROL FOUR
	controlDC4: {
		n: 'controlDC4',
		u: 0x0014,
	},
	// DELETE
	controlDEL: {
		n: 'controlDEL',
		u: 0x007f,
	},
	// DATA LINK ESCAPE
	controlDLE: {
		n: 'controlDLE',
		u: 0x0010,
	},
	// END OF MEDIUM
	controlEM: {
		n: 'controlEM',
		u: 0x0019,
	},
	// ENQUIRY
	controlENQ: {
		n: 'controlENQ',
		u: 0x0005,
	},
	// END OF TRANSMISSION
	controlEOT: {
		n: 'controlEOT',
		u: 0x0004,
	},
	// ESCAPE
	controlESC: {
		n: 'controlESC',
		u: 0x001b,
	},
	// END OF TRANSMISSION BLOCK
	controlETB: {
		n: 'controlETB',
		u: 0x0017,
	},
	// END OF TEXT
	controlETX: {
		n: 'controlETX',
		u: 0x0003,
	},
	// FORM FEED
	controlFF: {
		n: 'controlFF',
		u: 0x000c,
	},
	// INFORMATION SEPARATOR FOUR
	controlFS: {
		n: 'controlFS',
		u: 0x001c,
	},
	// INFORMATION SEPARATOR THREE
	controlGS: {
		n: 'controlGS',
		u: 0x001d,
	},
	// CHARACTER TABULATION
	controlHT: {
		n: 'controlHT',
		u: 0x0009,
	},
	// LINE FEED
	controlLF: {
		n: 'controlLF',
		u: 0x000a,
	},
	// NEGATIVE ACKNOWLEDGE
	controlNAK: {
		n: 'controlNAK',
		u: 0x0015,
	},
	// INFORMATION SEPARATOR TWO
	controlRS: {
		n: 'controlRS',
		u: 0x001e,
	},
	// SHIFT IN
	controlSI: {
		n: 'controlSI',
		u: 0x000f,
	},
	// SHIFT OUT
	controlSO: {
		n: 'controlSO',
		u: 0x000e,
	},
	// START OF TEXT
	controlSOT: {
		n: 'controlSOT',
		u: 0x0002,
	},
	// START OF HEADING
	controlSTX: {
		n: 'controlSTX',
		u: 0x0001,
	},
	// SUBSTITUTE
	controlSUB: {
		n: 'controlSUB',
		u: 0x001a,
	},
	// SYNCHRONOUS IDLE
	controlSYN: {
		n: 'controlSYN',
		u: 0x0016,
	},
	// INFORMATION SEPARATOR ONE
	controlUS: {
		n: 'controlUS',
		u: 0x001f,
	},
	// LINE TABULATION
	controlVT: {
		n: 'controlVT',
		u: 0x000b,
	},
	// COPYRIGHT SIGN
	copyright: {
		n: 'copyright',
		u: 0x00a9,
		f: [0xf8e9, 0xf6d9],
	},
	// <private-use-F8E9>
	copyrightsans: {
		n: 'copyrightsans',
		u: 0xf8e9,
		f: [0x00a9, 0xf6d9],
	},
	// <private-use-F6D9>
	copyrightserif: {
		n: 'copyrightserif',
		u: 0xf6d9,
		f: [0x00a9, 0xf8e9],
	},
	// LEFT CORNER BRACKET
	cornerbracketleft: {
		n: 'cornerbracketleft',
		u: 0x300c,
	},
	// HALFWIDTH LEFT CORNER BRACKET
	cornerbracketlefthalfwidth: {
		n: 'cornerbracketlefthalfwidth',
		u: 0xff62,
	},
	// PRESENTATION FORM FOR VERTICAL LEFT CORNER BRACKET
	cornerbracketleftvertical: {
		n: 'cornerbracketleftvertical',
		u: 0xfe41,
	},
	// RIGHT CORNER BRACKET
	cornerbracketright: {
		n: 'cornerbracketright',
		u: 0x300d,
	},
	// HALFWIDTH RIGHT CORNER BRACKET
	cornerbracketrighthalfwidth: {
		n: 'cornerbracketrighthalfwidth',
		u: 0xff63,
	},
	// PRESENTATION FORM FOR VERTICAL RIGHT CORNER BRACKET
	cornerbracketrightvertical: {
		n: 'cornerbracketrightvertical',
		u: 0xfe42,
	},
	// SQUARE CORPORATION
	corporationsquare: {
		n: 'corporationsquare',
		u: 0x337f,
	},
	// SQUARE CO
	cosquare: {
		n: 'cosquare',
		u: 0x33c7,
	},
	// SQUARE C OVER KG
	coverkgsquare: {
		n: 'coverkgsquare',
		u: 0x33c6,
	},
	// PARENTHESIZED LATIN SMALL LETTER C
	cparen: {
		n: 'cparen',
		u: 0x249e,
	},
	// CRUZEIRO SIGN
	cruzeiro: {
		n: 'cruzeiro',
		u: 0x20a2,
	},
	// LATIN LETTER STRETCHED C
	cstretched: {
		n: 'cstretched',
		u: 0x0297,
	},
	// CURLY LOGICAL AND
	curlyand: {
		n: 'curlyand',
		u: 0x22cf,
	},
	// CURLY LOGICAL OR
	curlyor: {
		n: 'curlyor',
		u: 0x22ce,
	},
	// CURRENCY SIGN
	currency: {
		n: 'currency',
		u: 0x00a4,
	},
	// <private-use-F6D1>
	cyrBreve: {
		n: 'cyrBreve',
		u: 0xf6d1,
	},
	// <private-use-F6D2>
	cyrFlex: {
		n: 'cyrFlex',
		u: 0xf6d2,
	},
	// <private-use-F6D4>
	cyrbreve: {
		n: 'cyrbreve',
		u: 0xf6d4,
	},
	// <private-use-F6D5>
	cyrflex: {
		n: 'cyrflex',
		u: 0xf6d5,
	},
	// LATIN SMALL LETTER D
	d: {
		n: 'd',
		u: 0x0064,
	},
	// ARMENIAN SMALL LETTER DA
	daarmenian: {
		n: 'daarmenian',
		u: 0x0564,
	},
	// BENGALI LETTER DA
	dabengali: {
		n: 'dabengali',
		u: 0x09a6,
	},
	// ARABIC LETTER DAD
	dadarabic: {
		n: 'dadarabic',
		u: 0x0636,
	},
	// DEVANAGARI LETTER DA
	dadeva: {
		n: 'dadeva',
		u: 0x0926,
	},
	// ARABIC LETTER DAD FINAL FORM
	dadfinalarabic: {
		n: 'dadfinalarabic',
		u: 0xfebe,
	},
	// ARABIC LETTER DAD INITIAL FORM
	dadinitialarabic: {
		n: 'dadinitialarabic',
		u: 0xfebf,
	},
	// ARABIC LETTER DAD MEDIAL FORM
	dadmedialarabic: {
		n: 'dadmedialarabic',
		u: 0xfec0,
	},
	// HEBREW POINT DAGESH OR MAPIQ
	dagesh: {
		n: 'dagesh',
		u: 0x05bc,
	},
	// HEBREW POINT DAGESH OR MAPIQ
	dageshhebrew: {
		n: 'dageshhebrew',
		u: 0x05bc,
	},
	// DAGGER
	dagger: {
		n: 'dagger',
		u: 0x2020,
	},
	// DOUBLE DAGGER
	daggerdbl: {
		n: 'daggerdbl',
		u: 0x2021,
	},
	// GUJARATI LETTER DA
	dagujarati: {
		n: 'dagujarati',
		u: 0x0aa6,
	},
	// GURMUKHI LETTER DA
	dagurmukhi: {
		n: 'dagurmukhi',
		u: 0x0a26,
	},
	// HIRAGANA LETTER DA
	dahiragana: {
		n: 'dahiragana',
		u: 0x3060,
	},
	// KATAKANA LETTER DA
	dakatakana: {
		n: 'dakatakana',
		u: 0x30c0,
	},
	// ARABIC LETTER DAL
	dalarabic: {
		n: 'dalarabic',
		u: 0x062f,
	},
	// HEBREW LETTER DALET
	dalet: {
		n: 'dalet',
		u: 0x05d3,
	},
	// HEBREW LETTER DALET WITH DAGESH
	daletdagesh: {
		n: 'daletdagesh',
		u: 0xfb33,
	},
	// HEBREW LETTER DALET WITH DAGESH
	daletdageshhebrew: {
		n: 'daletdageshhebrew',
		u: 0xfb33,
	},
	// HEBREW LETTER DALET + HEBREW POINT HATAF PATAH
	dalethatafpatah: {
		n: 'dalethatafpatah',
		u: [0x05d3, 0x05b2],
	},
	// HEBREW LETTER DALET + HEBREW POINT HATAF PATAH
	dalethatafpatahhebrew: {
		n: 'dalethatafpatahhebrew',
		u: [0x05d3, 0x05b2],
	},
	// HEBREW LETTER DALET + HEBREW POINT HATAF SEGOL
	dalethatafsegol: {
		n: 'dalethatafsegol',
		u: [0x05d3, 0x05b1],
	},
	// HEBREW LETTER DALET + HEBREW POINT HATAF SEGOL
	dalethatafsegolhebrew: {
		n: 'dalethatafsegolhebrew',
		u: [0x05d3, 0x05b1],
	},
	// HEBREW LETTER DALET
	dalethebrew: {
		n: 'dalethebrew',
		u: 0x05d3,
	},
	// HEBREW LETTER DALET + HEBREW POINT HIRIQ
	dalethiriq: {
		n: 'dalethiriq',
		u: [0x05d3, 0x05b4],
	},
	// HEBREW LETTER DALET + HEBREW POINT HIRIQ
	dalethiriqhebrew: {
		n: 'dalethiriqhebrew',
		u: [0x05d3, 0x05b4],
	},
	// HEBREW LETTER DALET + HEBREW POINT HOLAM
	daletholam: {
		n: 'daletholam',
		u: [0x05d3, 0x05b9],
	},
	// HEBREW LETTER DALET + HEBREW POINT HOLAM
	daletholamhebrew: {
		n: 'daletholamhebrew',
		u: [0x05d3, 0x05b9],
	},
	// HEBREW LETTER DALET + HEBREW POINT PATAH
	daletpatah: {
		n: 'daletpatah',
		u: [0x05d3, 0x05b7],
	},
	// HEBREW LETTER DALET + HEBREW POINT PATAH
	daletpatahhebrew: {
		n: 'daletpatahhebrew',
		u: [0x05d3, 0x05b7],
	},
	// HEBREW LETTER DALET + HEBREW POINT QAMATS
	daletqamats: {
		n: 'daletqamats',
		u: [0x05d3, 0x05b8],
	},
	// HEBREW LETTER DALET + HEBREW POINT QAMATS
	daletqamatshebrew: {
		n: 'daletqamatshebrew',
		u: [0x05d3, 0x05b8],
	},
	// HEBREW LETTER DALET + HEBREW POINT QUBUTS
	daletqubuts: {
		n: 'daletqubuts',
		u: [0x05d3, 0x05bb],
	},
	// HEBREW LETTER DALET + HEBREW POINT QUBUTS
	daletqubutshebrew: {
		n: 'daletqubutshebrew',
		u: [0x05d3, 0x05bb],
	},
	// HEBREW LETTER DALET + HEBREW POINT SEGOL
	daletsegol: {
		n: 'daletsegol',
		u: [0x05d3, 0x05b6],
	},
	// HEBREW LETTER DALET + HEBREW POINT SEGOL
	daletsegolhebrew: {
		n: 'daletsegolhebrew',
		u: [0x05d3, 0x05b6],
	},
	// HEBREW LETTER DALET + HEBREW POINT SHEVA
	daletsheva: {
		n: 'daletsheva',
		u: [0x05d3, 0x05b0],
	},
	// HEBREW LETTER DALET + HEBREW POINT SHEVA
	daletshevahebrew: {
		n: 'daletshevahebrew',
		u: [0x05d3, 0x05b0],
	},
	// HEBREW LETTER DALET + HEBREW POINT TSERE
	dalettsere: {
		n: 'dalettsere',
		u: [0x05d3, 0x05b5],
	},
	// HEBREW LETTER DALET + HEBREW POINT TSERE
	dalettserehebrew: {
		n: 'dalettserehebrew',
		u: [0x05d3, 0x05b5],
	},
	// ARABIC LETTER DAL FINAL FORM
	dalfinalarabic: {
		n: 'dalfinalarabic',
		u: 0xfeaa,
	},
	// ARABIC DAMMA
	dammaarabic: {
		n: 'dammaarabic',
		u: 0x064f,
	},
	// ARABIC DAMMA
	dammalowarabic: {
		n: 'dammalowarabic',
		u: 0x064f,
	},
	// ARABIC DAMMATAN
	dammatanaltonearabic: {
		n: 'dammatanaltonearabic',
		u: 0x064c,
	},
	// ARABIC DAMMATAN
	dammatanarabic: {
		n: 'dammatanarabic',
		u: 0x064c,
	},
	// DEVANAGARI DANDA
	danda: {
		n: 'danda',
		u: 0x0964,
	},
	// HEBREW ACCENT DARGA
	dargahebrew: {
		n: 'dargahebrew',
		u: 0x05a7,
	},
	// HEBREW ACCENT DARGA
	dargalefthebrew: {
		n: 'dargalefthebrew',
		u: 0x05a7,
	},
	// COMBINING CYRILLIC DASIA PNEUMATA
	dasiapneumatacyrilliccmb: {
		n: 'dasiapneumatacyrilliccmb',
		u: 0x0485,
	},
	// <private-use-F6D3>
	dblGrave: {
		n: 'dblGrave',
		u: 0xf6d3,
	},
	// LEFT DOUBLE ANGLE BRACKET
	dblanglebracketleft: {
		n: 'dblanglebracketleft',
		u: 0x300a,
	},
	// PRESENTATION FORM FOR VERTICAL LEFT DOUBLE ANGLE BRACKET
	dblanglebracketleftvertical: {
		n: 'dblanglebracketleftvertical',
		u: 0xfe3d,
	},
	// RIGHT DOUBLE ANGLE BRACKET
	dblanglebracketright: {
		n: 'dblanglebracketright',
		u: 0x300b,
	},
	// PRESENTATION FORM FOR VERTICAL RIGHT DOUBLE ANGLE BRACKET
	dblanglebracketrightvertical: {
		n: 'dblanglebracketrightvertical',
		u: 0xfe3e,
	},
	// COMBINING INVERTED DOUBLE ARCH BELOW
	dblarchinvertedbelowcmb: {
		n: 'dblarchinvertedbelowcmb',
		u: 0x032b,
	},
	// LEFT RIGHT DOUBLE ARROW
	dblarrowleft: {
		n: 'dblarrowleft',
		u: 0x21d4,
	},
	// RIGHTWARDS DOUBLE ARROW
	dblarrowright: {
		n: 'dblarrowright',
		u: 0x21d2,
	},
	// DEVANAGARI DOUBLE DANDA
	dbldanda: {
		n: 'dbldanda',
		u: 0x0965,
	},
	// <private-use-F6D6>
	dblgrave: {
		n: 'dblgrave',
		u: 0xf6d6,
	},
	// COMBINING DOUBLE GRAVE ACCENT
	dblgravecmb: {
		n: 'dblgravecmb',
		u: 0x030f,
	},
	// DOUBLE INTEGRAL
	dblintegral: {
		n: 'dblintegral',
		u: 0x222c,
	},
	// DOUBLE LOW LINE
	dbllowline: {
		n: 'dbllowline',
		u: 0x2017,
	},
	// COMBINING DOUBLE LOW LINE
	dbllowlinecmb: {
		n: 'dbllowlinecmb',
		u: 0x0333,
	},
	// COMBINING DOUBLE OVERLINE
	dbloverlinecmb: {
		n: 'dbloverlinecmb',
		u: 0x033f,
	},
	// MODIFIER LETTER DOUBLE PRIME
	dblprimemod: {
		n: 'dblprimemod',
		u: 0x02ba,
	},
	// DOUBLE VERTICAL LINE
	dblverticalbar: {
		n: 'dblverticalbar',
		u: 0x2016,
	},
	// COMBINING DOUBLE VERTICAL LINE ABOVE
	dblverticallineabovecmb: {
		n: 'dblverticallineabovecmb',
		u: 0x030e,
	},
	// BOPOMOFO LETTER D
	dbopomofo: {
		n: 'dbopomofo',
		u: 0x3109,
	},
	// SQUARE DB
	dbsquare: {
		n: 'dbsquare',
		u: 0x33c8,
	},
	// LATIN SMALL LETTER D WITH CARON
	dcaron: {
		n: 'dcaron',
		u: 0x010f,
	},
	// LATIN SMALL LETTER D WITH CEDILLA
	dcedilla: {
		n: 'dcedilla',
		u: 0x1e11,
	},
	// CIRCLED LATIN SMALL LETTER D
	dcircle: {
		n: 'dcircle',
		u: 0x24d3,
	},
	// LATIN SMALL LETTER D WITH CIRCUMFLEX BELOW
	dcircumflexbelow: {
		n: 'dcircumflexbelow',
		u: 0x1e13,
	},
	// LATIN SMALL LETTER D WITH STROKE
	dcroat: {
		n: 'dcroat',
		u: 0x0111,
	},
	// BENGALI LETTER DDA
	ddabengali: {
		n: 'ddabengali',
		u: 0x09a1,
	},
	// DEVANAGARI LETTER DDA
	ddadeva: {
		n: 'ddadeva',
		u: 0x0921,
	},
	// GUJARATI LETTER DDA
	ddagujarati: {
		n: 'ddagujarati',
		u: 0x0aa1,
	},
	// GURMUKHI LETTER DDA
	ddagurmukhi: {
		n: 'ddagurmukhi',
		u: 0x0a21,
	},
	// ARABIC LETTER DDAL
	ddalarabic: {
		n: 'ddalarabic',
		u: 0x0688,
	},
	// ARABIC LETTER DDAL FINAL FORM
	ddalfinalarabic: {
		n: 'ddalfinalarabic',
		u: 0xfb89,
	},
	// DEVANAGARI LETTER DDDHA
	dddhadeva: {
		n: 'dddhadeva',
		u: 0x095c,
	},
	// BENGALI LETTER DDHA
	ddhabengali: {
		n: 'ddhabengali',
		u: 0x09a2,
	},
	// DEVANAGARI LETTER DDHA
	ddhadeva: {
		n: 'ddhadeva',
		u: 0x0922,
	},
	// GUJARATI LETTER DDHA
	ddhagujarati: {
		n: 'ddhagujarati',
		u: 0x0aa2,
	},
	// GURMUKHI LETTER DDHA
	ddhagurmukhi: {
		n: 'ddhagurmukhi',
		u: 0x0a22,
	},
	// LATIN SMALL LETTER D WITH DOT ABOVE
	ddotaccent: {
		n: 'ddotaccent',
		u: 0x1e0b,
	},
	// LATIN SMALL LETTER D WITH DOT BELOW
	ddotbelow: {
		n: 'ddotbelow',
		u: 0x1e0d,
	},
	// ARABIC DECIMAL SEPARATOR
	decimalseparatorarabic: {
		n: 'decimalseparatorarabic',
		u: 0x066b,
	},
	// ARABIC DECIMAL SEPARATOR
	decimalseparatorpersian: {
		n: 'decimalseparatorpersian',
		u: 0x066b,
	},
	// CYRILLIC SMALL LETTER DE
	decyrillic: {
		n: 'decyrillic',
		u: 0x0434,
	},
	// DEGREE SIGN
	degree: {
		n: 'degree',
		u: 0x00b0,
	},
	// HEBREW ACCENT DEHI
	dehihebrew: {
		n: 'dehihebrew',
		u: 0x05ad,
	},
	// HIRAGANA LETTER DE
	dehiragana: {
		n: 'dehiragana',
		u: 0x3067,
	},
	// COPTIC SMALL LETTER DEI
	deicoptic: {
		n: 'deicoptic',
		u: 0x03ef,
	},
	// KATAKANA LETTER DE
	dekatakana: {
		n: 'dekatakana',
		u: 0x30c7,
	},
	// ERASE TO THE LEFT
	deleteleft: {
		n: 'deleteleft',
		u: 0x232b,
	},
	// ERASE TO THE RIGHT
	deleteright: {
		n: 'deleteright',
		u: 0x2326,
	},
	// GREEK SMALL LETTER DELTA
	delta: {
		n: 'delta',
		u: 0x03b4,
	},
	// LATIN SMALL LETTER TURNED DELTA
	deltaturned: {
		n: 'deltaturned',
		u: 0x018d,
	},
	// BENGALI CURRENCY NUMERATOR ONE LESS THAN THE DENOMINATOR
	denominatorminusonenumeratorbengali: {
		n: 'denominatorminusonenumeratorbengali',
		u: 0x09f8,
	},
	// LATIN SMALL LETTER DEZH DIGRAPH
	dezh: {
		n: 'dezh',
		u: 0x02a4,
	},
	// BENGALI LETTER DHA
	dhabengali: {
		n: 'dhabengali',
		u: 0x09a7,
	},
	// DEVANAGARI LETTER DHA
	dhadeva: {
		n: 'dhadeva',
		u: 0x0927,
	},
	// GUJARATI LETTER DHA
	dhagujarati: {
		n: 'dhagujarati',
		u: 0x0aa7,
	},
	// GURMUKHI LETTER DHA
	dhagurmukhi: {
		n: 'dhagurmukhi',
		u: 0x0a27,
	},
	// LATIN SMALL LETTER D WITH HOOK
	dhook: {
		n: 'dhook',
		u: 0x0257,
	},
	// GREEK DIALYTIKA TONOS
	dialytikatonos: {
		n: 'dialytikatonos',
		u: 0x0385,
	},
	// COMBINING GREEK DIALYTIKA TONOS
	dialytikatonoscmb: {
		n: 'dialytikatonoscmb',
		u: 0x0344,
	},
	// BLACK DIAMOND SUIT
	diamond: {
		n: 'diamond',
		u: 0x2666,
	},
	// WHITE DIAMOND SUIT
	diamondsuitwhite: {
		n: 'diamondsuitwhite',
		u: 0x2662,
	},
	// DIAERESIS
	dieresis: {
		n: 'dieresis',
		u: 0x00a8,
	},
	// <private-use-F6D7>
	dieresisacute: {
		n: 'dieresisacute',
		u: 0xf6d7,
	},
	// COMBINING DIAERESIS BELOW
	dieresisbelowcmb: {
		n: 'dieresisbelowcmb',
		u: 0x0324,
	},
	// COMBINING DIAERESIS
	dieresiscmb: {
		n: 'dieresiscmb',
		u: 0x0308,
	},
	// <private-use-F6D8>
	dieresisgrave: {
		n: 'dieresisgrave',
		u: 0xf6d8,
	},
	// GREEK DIALYTIKA TONOS
	dieresistonos: {
		n: 'dieresistonos',
		u: 0x0385,
	},
	// HIRAGANA LETTER DI
	dihiragana: {
		n: 'dihiragana',
		u: 0x3062,
	},
	// KATAKANA LETTER DI
	dikatakana: {
		n: 'dikatakana',
		u: 0x30c2,
	},
	// DITTO MARK
	dittomark: {
		n: 'dittomark',
		u: 0x3003,
	},
	// DIVISION SIGN
	divide: {
		n: 'divide',
		u: 0x00f7,
	},
	// DIVIDES
	divides: {
		n: 'divides',
		u: 0x2223,
	},
	// DIVISION SLASH
	divisionslash: {
		n: 'divisionslash',
		u: 0x2215,
		f: [0x2044],
	},
	// CYRILLIC SMALL LETTER DJE
	djecyrillic: {
		n: 'djecyrillic',
		u: 0x0452,
	},
	// DARK SHADE
	dkshade: {
		n: 'dkshade',
		u: 0x2593,
	},
	// LATIN SMALL LETTER D WITH LINE BELOW
	dlinebelow: {
		n: 'dlinebelow',
		u: 0x1e0f,
	},
	// SQUARE DL
	dlsquare: {
		n: 'dlsquare',
		u: 0x3397,
	},
	// LATIN SMALL LETTER D WITH STROKE
	dmacron: {
		n: 'dmacron',
		u: 0x0111,
	},
	// FULLWIDTH LATIN SMALL LETTER D
	dmonospace: {
		n: 'dmonospace',
		u: 0xff44,
	},
	// LOWER HALF BLOCK
	dnblock: {
		n: 'dnblock',
		u: 0x2584,
	},
	// THAI CHARACTER DO CHADA
	dochadathai: {
		n: 'dochadathai',
		u: 0x0e0e,
	},
	// THAI CHARACTER DO DEK
	dodekthai: {
		n: 'dodekthai',
		u: 0x0e14,
	},
	// HIRAGANA LETTER DO
	dohiragana: {
		n: 'dohiragana',
		u: 0x3069,
	},
	// KATAKANA LETTER DO
	dokatakana: {
		n: 'dokatakana',
		u: 0x30c9,
	},
	// DOLLAR SIGN
	dollar: {
		n: 'dollar',
		u: 0x0024,
	},
	// <private-use-F6E3>
	dollarinferior: {
		n: 'dollarinferior',
		u: 0xf6e3,
	},
	// FULLWIDTH DOLLAR SIGN
	dollarmonospace: {
		n: 'dollarmonospace',
		u: 0xff04,
	},
	// <private-use-F724>
	dollaroldstyle: {
		n: 'dollaroldstyle',
		u: 0xf724,
	},
	// SMALL DOLLAR SIGN
	dollarsmall: {
		n: 'dollarsmall',
		u: 0xfe69,
		f: [0x0024],
	},
	// <private-use-F6E4>
	dollarsuperior: {
		n: 'dollarsuperior',
		u: 0xf6e4,
	},
	// DONG SIGN
	dong: {
		n: 'dong',
		u: 0x20ab,
	},
	// SQUARE DORU
	dorusquare: {
		n: 'dorusquare',
		u: 0x3326,
	},
	// DOT ABOVE
	dotaccent: {
		n: 'dotaccent',
		u: 0x02d9,
	},
	// COMBINING DOT ABOVE
	dotaccentcmb: {
		n: 'dotaccentcmb',
		u: 0x0307,
	},
	// COMBINING DOT BELOW
	dotbelowcmb: {
		n: 'dotbelowcmb',
		u: 0x0323,
	},
	// COMBINING DOT BELOW
	dotbelowcomb: {
		n: 'dotbelowcomb',
		u: 0x0323,
	},
	// KATAKANA MIDDLE DOT
	dotkatakana: {
		n: 'dotkatakana',
		u: 0x30fb,
	},
	// LATIN SMALL LETTER DOTLESS I
	dotlessi: {
		n: 'dotlessi',
		u: 0x0131,
	},
	// <private-use-F6BE>
	dotlessj: {
		n: 'dotlessj',
		u: 0xf6be,
	},
	// LATIN SMALL LETTER DOTLESS J WITH STROKE AND HOOK
	dotlessjstrokehook: {
		n: 'dotlessjstrokehook',
		u: 0x0284,
	},
	// DOT OPERATOR
	dotmath: {
		n: 'dotmath',
		u: 0x22c5,
	},
	// DOTTED CIRCLE
	dottedcircle: {
		n: 'dottedcircle',
		u: 0x25cc,
	},
	// HEBREW LIGATURE YIDDISH YOD YOD PATAH
	doubleyodpatah: {
		n: 'doubleyodpatah',
		u: 0xfb1f,
	},
	// HEBREW LIGATURE YIDDISH YOD YOD PATAH
	doubleyodpatahhebrew: {
		n: 'doubleyodpatahhebrew',
		u: 0xfb1f,
	},
	// COMBINING DOWN TACK BELOW
	downtackbelowcmb: {
		n: 'downtackbelowcmb',
		u: 0x031e,
	},
	// MODIFIER LETTER DOWN TACK
	downtackmod: {
		n: 'downtackmod',
		u: 0x02d5,
	},
	// PARENTHESIZED LATIN SMALL LETTER D
	dparen: {
		n: 'dparen',
		u: 0x249f,
	},
	// <private-use-F6EB>
	dsuperior: {
		n: 'dsuperior',
		u: 0xf6eb,
	},
	// LATIN SMALL LETTER D WITH TAIL
	dtail: {
		n: 'dtail',
		u: 0x0256,
	},
	// LATIN SMALL LETTER D WITH TOPBAR
	dtopbar: {
		n: 'dtopbar',
		u: 0x018c,
	},
	// HIRAGANA LETTER DU
	duhiragana: {
		n: 'duhiragana',
		u: 0x3065,
	},
	// KATAKANA LETTER DU
	dukatakana: {
		n: 'dukatakana',
		u: 0x30c5,
	},
	// LATIN SMALL LETTER DZ
	dz: {
		n: 'dz',
		u: 0x01f3,
	},
	// LATIN SMALL LETTER DZ DIGRAPH
	dzaltone: {
		n: 'dzaltone',
		u: 0x02a3,
	},
	// LATIN SMALL LETTER DZ WITH CARON
	dzcaron: {
		n: 'dzcaron',
		u: 0x01c6,
	},
	// LATIN SMALL LETTER DZ DIGRAPH WITH CURL
	dzcurl: {
		n: 'dzcurl',
		u: 0x02a5,
	},
	// CYRILLIC SMALL LETTER ABKHASIAN DZE
	dzeabkhasiancyrillic: {
		n: 'dzeabkhasiancyrillic',
		u: 0x04e1,
	},
	// CYRILLIC SMALL LETTER DZE
	dzecyrillic: {
		n: 'dzecyrillic',
		u: 0x0455,
	},
	// CYRILLIC SMALL LETTER DZHE
	dzhecyrillic: {
		n: 'dzhecyrillic',
		u: 0x045f,
	},
	// LATIN SMALL LETTER E
	e: {
		n: 'e',
		u: 0x0065,
	},
	// LATIN SMALL LETTER E WITH ACUTE
	eacute: {
		n: 'eacute',
		u: 0x00e9,
	},
	// EARTH
	earth: {
		n: 'earth',
		u: 0x2641,
	},
	// BENGALI LETTER E
	ebengali: {
		n: 'ebengali',
		u: 0x098f,
	},
	// BOPOMOFO LETTER E
	ebopomofo: {
		n: 'ebopomofo',
		u: 0x311c,
	},
	// LATIN SMALL LETTER E WITH BREVE
	ebreve: {
		n: 'ebreve',
		u: 0x0115,
	},
	// DEVANAGARI LETTER CANDRA E
	ecandradeva: {
		n: 'ecandradeva',
		u: 0x090d,
	},
	// GUJARATI VOWEL CANDRA E
	ecandragujarati: {
		n: 'ecandragujarati',
		u: 0x0a8d,
	},
	// DEVANAGARI VOWEL SIGN CANDRA E
	ecandravowelsigndeva: {
		n: 'ecandravowelsigndeva',
		u: 0x0945,
	},
	// GUJARATI VOWEL SIGN CANDRA E
	ecandravowelsigngujarati: {
		n: 'ecandravowelsigngujarati',
		u: 0x0ac5,
	},
	// LATIN SMALL LETTER E WITH CARON
	ecaron: {
		n: 'ecaron',
		u: 0x011b,
	},
	// LATIN SMALL LETTER E WITH CEDILLA AND BREVE
	ecedillabreve: {
		n: 'ecedillabreve',
		u: 0x1e1d,
	},
	// ARMENIAN SMALL LETTER ECH
	echarmenian: {
		n: 'echarmenian',
		u: 0x0565,
	},
	// ARMENIAN SMALL LIGATURE ECH YIWN
	echyiwnarmenian: {
		n: 'echyiwnarmenian',
		u: 0x0587,
	},
	// CIRCLED LATIN SMALL LETTER E
	ecircle: {
		n: 'ecircle',
		u: 0x24d4,
	},
	// LATIN SMALL LETTER E WITH CIRCUMFLEX
	ecircumflex: {
		n: 'ecircumflex',
		u: 0x00ea,
	},
	// LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE
	ecircumflexacute: {
		n: 'ecircumflexacute',
		u: 0x1ebf,
	},
	// LATIN SMALL LETTER E WITH CIRCUMFLEX BELOW
	ecircumflexbelow: {
		n: 'ecircumflexbelow',
		u: 0x1e19,
	},
	// LATIN SMALL LETTER E WITH CIRCUMFLEX AND DOT BELOW
	ecircumflexdotbelow: {
		n: 'ecircumflexdotbelow',
		u: 0x1ec7,
	},
	// LATIN SMALL LETTER E WITH CIRCUMFLEX AND GRAVE
	ecircumflexgrave: {
		n: 'ecircumflexgrave',
		u: 0x1ec1,
	},
	// LATIN SMALL LETTER E WITH CIRCUMFLEX AND HOOK ABOVE
	ecircumflexhookabove: {
		n: 'ecircumflexhookabove',
		u: 0x1ec3,
	},
	// LATIN SMALL LETTER E WITH CIRCUMFLEX AND TILDE
	ecircumflextilde: {
		n: 'ecircumflextilde',
		u: 0x1ec5,
	},
	// CYRILLIC SMALL LETTER UKRAINIAN IE
	ecyrillic: {
		n: 'ecyrillic',
		u: 0x0454,
	},
	// LATIN SMALL LETTER E WITH DOUBLE GRAVE
	edblgrave: {
		n: 'edblgrave',
		u: 0x0205,
	},
	// DEVANAGARI LETTER E
	edeva: {
		n: 'edeva',
		u: 0x090f,
	},
	// LATIN SMALL LETTER E WITH DIAERESIS
	edieresis: {
		n: 'edieresis',
		u: 0x00eb,
	},
	// LATIN SMALL LETTER E WITH DOT ABOVE
	edot: {
		n: 'edot',
		u: 0x0117,
	},
	// LATIN SMALL LETTER E WITH DOT ABOVE
	edotaccent: {
		n: 'edotaccent',
		u: 0x0117,
	},
	// LATIN SMALL LETTER E WITH DOT BELOW
	edotbelow: {
		n: 'edotbelow',
		u: 0x1eb9,
	},
	// GURMUKHI LETTER EE
	eegurmukhi: {
		n: 'eegurmukhi',
		u: 0x0a0f,
	},
	// GURMUKHI VOWEL SIGN EE
	eematragurmukhi: {
		n: 'eematragurmukhi',
		u: 0x0a47,
	},
	// CYRILLIC SMALL LETTER EF
	efcyrillic: {
		n: 'efcyrillic',
		u: 0x0444,
	},
	// LATIN SMALL LETTER E WITH GRAVE
	egrave: {
		n: 'egrave',
		u: 0x00e8,
	},
	// GUJARATI LETTER E
	egujarati: {
		n: 'egujarati',
		u: 0x0a8f,
	},
	// ARMENIAN SMALL LETTER EH
	eharmenian: {
		n: 'eharmenian',
		u: 0x0567,
	},
	// BOPOMOFO LETTER EH
	ehbopomofo: {
		n: 'ehbopomofo',
		u: 0x311d,
	},
	// HIRAGANA LETTER E
	ehiragana: {
		n: 'ehiragana',
		u: 0x3048,
	},
	// LATIN SMALL LETTER E WITH HOOK ABOVE
	ehookabove: {
		n: 'ehookabove',
		u: 0x1ebb,
	},
	// BOPOMOFO LETTER EI
	eibopomofo: {
		n: 'eibopomofo',
		u: 0x311f,
	},
	// DIGIT EIGHT
	eight: {
		n: 'eight',
		u: 0x0038,
	},
	// ARABIC-INDIC DIGIT EIGHT
	eightarabic: {
		n: 'eightarabic',
		u: 0x0668,
	},
	// BENGALI DIGIT EIGHT
	eightbengali: {
		n: 'eightbengali',
		u: 0x09ee,
	},
	// CIRCLED DIGIT EIGHT
	eightcircle: {
		n: 'eightcircle',
		u: 0x2467,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT EIGHT
	eightcircleinversesansserif: {
		n: 'eightcircleinversesansserif',
		u: 0x2791,
	},
	// DEVANAGARI DIGIT EIGHT
	eightdeva: {
		n: 'eightdeva',
		u: 0x096e,
	},
	// CIRCLED NUMBER EIGHTEEN
	eighteencircle: {
		n: 'eighteencircle',
		u: 0x2471,
	},
	// PARENTHESIZED NUMBER EIGHTEEN
	eighteenparen: {
		n: 'eighteenparen',
		u: 0x2485,
	},
	// NUMBER EIGHTEEN FULL STOP
	eighteenperiod: {
		n: 'eighteenperiod',
		u: 0x2499,
	},
	// GUJARATI DIGIT EIGHT
	eightgujarati: {
		n: 'eightgujarati',
		u: 0x0aee,
	},
	// GURMUKHI DIGIT EIGHT
	eightgurmukhi: {
		n: 'eightgurmukhi',
		u: 0x0a6e,
	},
	// ARABIC-INDIC DIGIT EIGHT
	eighthackarabic: {
		n: 'eighthackarabic',
		u: 0x0668,
	},
	// HANGZHOU NUMERAL EIGHT
	eighthangzhou: {
		n: 'eighthangzhou',
		u: 0x3028,
	},
	// BEAMED EIGHTH NOTES
	eighthnotebeamed: {
		n: 'eighthnotebeamed',
		u: 0x266b,
	},
	// PARENTHESIZED IDEOGRAPH EIGHT
	eightideographicparen: {
		n: 'eightideographicparen',
		u: 0x3227,
	},
	// SUBSCRIPT EIGHT
	eightinferior: {
		n: 'eightinferior',
		u: 0x2088,
	},
	// FULLWIDTH DIGIT EIGHT
	eightmonospace: {
		n: 'eightmonospace',
		u: 0xff18,
	},
	// <private-use-F738>
	eightoldstyle: {
		n: 'eightoldstyle',
		u: 0xf738,
	},
	// PARENTHESIZED DIGIT EIGHT
	eightparen: {
		n: 'eightparen',
		u: 0x247b,
	},
	// DIGIT EIGHT FULL STOP
	eightperiod: {
		n: 'eightperiod',
		u: 0x248f,
	},
	// EXTENDED ARABIC-INDIC DIGIT EIGHT
	eightpersian: {
		n: 'eightpersian',
		u: 0x06f8,
	},
	// SMALL ROMAN NUMERAL EIGHT
	eightroman: {
		n: 'eightroman',
		u: 0x2177,
	},
	// SUPERSCRIPT EIGHT
	eightsuperior: {
		n: 'eightsuperior',
		u: 0x2078,
	},
	// THAI DIGIT EIGHT
	eightthai: {
		n: 'eightthai',
		u: 0x0e58,
	},
	// LATIN SMALL LETTER E WITH INVERTED BREVE
	einvertedbreve: {
		n: 'einvertedbreve',
		u: 0x0207,
	},
	// CYRILLIC SMALL LETTER IOTIFIED E
	eiotifiedcyrillic: {
		n: 'eiotifiedcyrillic',
		u: 0x0465,
	},
	// KATAKANA LETTER E
	ekatakana: {
		n: 'ekatakana',
		u: 0x30a8,
	},
	// HALFWIDTH KATAKANA LETTER E
	ekatakanahalfwidth: {
		n: 'ekatakanahalfwidth',
		u: 0xff74,
	},
	// GURMUKHI EK ONKAR
	ekonkargurmukhi: {
		n: 'ekonkargurmukhi',
		u: 0x0a74,
	},
	// HANGUL LETTER E
	ekorean: {
		n: 'ekorean',
		u: 0x3154,
	},
	// CYRILLIC SMALL LETTER EL
	elcyrillic: {
		n: 'elcyrillic',
		u: 0x043b,
	},
	// ELEMENT OF
	element: {
		n: 'element',
		u: 0x2208,
	},
	// CIRCLED NUMBER ELEVEN
	elevencircle: {
		n: 'elevencircle',
		u: 0x246a,
	},
	// PARENTHESIZED NUMBER ELEVEN
	elevenparen: {
		n: 'elevenparen',
		u: 0x247e,
	},
	// NUMBER ELEVEN FULL STOP
	elevenperiod: {
		n: 'elevenperiod',
		u: 0x2492,
	},
	// SMALL ROMAN NUMERAL ELEVEN
	elevenroman: {
		n: 'elevenroman',
		u: 0x217a,
	},
	// HORIZONTAL ELLIPSIS
	ellipsis: {
		n: 'ellipsis',
		u: 0x2026,
	},
	// VERTICAL ELLIPSIS
	ellipsisvertical: {
		n: 'ellipsisvertical',
		u: 0x22ee,
	},
	// LATIN SMALL LETTER E WITH MACRON
	emacron: {
		n: 'emacron',
		u: 0x0113,
	},
	// LATIN SMALL LETTER E WITH MACRON AND ACUTE
	emacronacute: {
		n: 'emacronacute',
		u: 0x1e17,
	},
	// LATIN SMALL LETTER E WITH MACRON AND GRAVE
	emacrongrave: {
		n: 'emacrongrave',
		u: 0x1e15,
	},
	// CYRILLIC SMALL LETTER EM
	emcyrillic: {
		n: 'emcyrillic',
		u: 0x043c,
	},
	// EM DASH
	emdash: {
		n: 'emdash',
		u: 0x2014,
	},
	// PRESENTATION FORM FOR VERTICAL EM DASH
	emdashvertical: {
		n: 'emdashvertical',
		u: 0xfe31,
	},
	// FULLWIDTH LATIN SMALL LETTER E
	emonospace: {
		n: 'emonospace',
		u: 0xff45,
	},
	// ARMENIAN EMPHASIS MARK
	emphasismarkarmenian: {
		n: 'emphasismarkarmenian',
		u: 0x055b,
	},
	// EMPTY SET
	emptyset: {
		n: 'emptyset',
		u: 0x2205,
	},
	// BOPOMOFO LETTER EN
	enbopomofo: {
		n: 'enbopomofo',
		u: 0x3123,
	},
	// CYRILLIC SMALL LETTER EN
	encyrillic: {
		n: 'encyrillic',
		u: 0x043d,
	},
	// EN DASH
	endash: {
		n: 'endash',
		u: 0x2013,
	},
	// PRESENTATION FORM FOR VERTICAL EN DASH
	endashvertical: {
		n: 'endashvertical',
		u: 0xfe32,
	},
	// CYRILLIC SMALL LETTER EN WITH DESCENDER
	endescendercyrillic: {
		n: 'endescendercyrillic',
		u: 0x04a3,
	},
	// LATIN SMALL LETTER ENG
	eng: {
		n: 'eng',
		u: 0x014b,
	},
	// BOPOMOFO LETTER ENG
	engbopomofo: {
		n: 'engbopomofo',
		u: 0x3125,
	},
	// CYRILLIC SMALL LIGATURE EN GHE
	enghecyrillic: {
		n: 'enghecyrillic',
		u: 0x04a5,
	},
	// CYRILLIC SMALL LETTER EN WITH HOOK
	enhookcyrillic: {
		n: 'enhookcyrillic',
		u: 0x04c8,
	},
	// EN SPACE
	enspace: {
		n: 'enspace',
		u: 0x2002,
	},
	// LATIN SMALL LETTER E WITH OGONEK
	eogonek: {
		n: 'eogonek',
		u: 0x0119,
	},
	// HANGUL LETTER EO
	eokorean: {
		n: 'eokorean',
		u: 0x3153,
	},
	// LATIN SMALL LETTER OPEN E
	eopen: {
		n: 'eopen',
		u: 0x025b,
	},
	// LATIN SMALL LETTER CLOSED OPEN E
	eopenclosed: {
		n: 'eopenclosed',
		u: 0x029a,
	},
	// LATIN SMALL LETTER REVERSED OPEN E
	eopenreversed: {
		n: 'eopenreversed',
		u: 0x025c,
	},
	// LATIN SMALL LETTER CLOSED REVERSED OPEN E
	eopenreversedclosed: {
		n: 'eopenreversedclosed',
		u: 0x025e,
	},
	// LATIN SMALL LETTER REVERSED OPEN E WITH HOOK
	eopenreversedhook: {
		n: 'eopenreversedhook',
		u: 0x025d,
	},
	// PARENTHESIZED LATIN SMALL LETTER E
	eparen: {
		n: 'eparen',
		u: 0x24a0,
	},
	// GREEK SMALL LETTER EPSILON
	epsilon: {
		n: 'epsilon',
		u: 0x03b5,
	},
	// GREEK SMALL LETTER EPSILON WITH TONOS
	epsilontonos: {
		n: 'epsilontonos',
		u: 0x03ad,
	},
	// EQUALS SIGN
	equal: {
		n: 'equal',
		u: 0x003d,
	},
	// FULLWIDTH EQUALS SIGN
	equalmonospace: {
		n: 'equalmonospace',
		u: 0xff1d,
	},
	// SMALL EQUALS SIGN
	equalsmall: {
		n: 'equalsmall',
		u: 0xfe66,
		f: [0x003d],
	},
	// SUPERSCRIPT EQUALS SIGN
	equalsuperior: {
		n: 'equalsuperior',
		u: 0x207c,
	},
	// IDENTICAL TO
	equivalence: {
		n: 'equivalence',
		u: 0x2261,
	},
	// BOPOMOFO LETTER ER
	erbopomofo: {
		n: 'erbopomofo',
		u: 0x3126,
	},
	// CYRILLIC SMALL LETTER ER
	ercyrillic: {
		n: 'ercyrillic',
		u: 0x0440,
	},
	// LATIN SMALL LETTER REVERSED E
	ereversed: {
		n: 'ereversed',
		u: 0x0258,
	},
	// CYRILLIC SMALL LETTER E
	ereversedcyrillic: {
		n: 'ereversedcyrillic',
		u: 0x044d,
	},
	// CYRILLIC SMALL LETTER ES
	escyrillic: {
		n: 'escyrillic',
		u: 0x0441,
	},
	// CYRILLIC SMALL LETTER ES WITH DESCENDER
	esdescendercyrillic: {
		n: 'esdescendercyrillic',
		u: 0x04ab,
	},
	// LATIN SMALL LETTER ESH
	esh: {
		n: 'esh',
		u: 0x0283,
	},
	// LATIN SMALL LETTER ESH WITH CURL
	eshcurl: {
		n: 'eshcurl',
		u: 0x0286,
	},
	// DEVANAGARI LETTER SHORT E
	eshortdeva: {
		n: 'eshortdeva',
		u: 0x090e,
	},
	// DEVANAGARI VOWEL SIGN SHORT E
	eshortvowelsigndeva: {
		n: 'eshortvowelsigndeva',
		u: 0x0946,
	},
	// LATIN LETTER REVERSED ESH LOOP
	eshreversedloop: {
		n: 'eshreversedloop',
		u: 0x01aa,
	},
	// LATIN SMALL LETTER SQUAT REVERSED ESH
	eshsquatreversed: {
		n: 'eshsquatreversed',
		u: 0x0285,
	},
	// HIRAGANA LETTER SMALL E
	esmallhiragana: {
		n: 'esmallhiragana',
		u: 0x3047,
	},
	// KATAKANA LETTER SMALL E
	esmallkatakana: {
		n: 'esmallkatakana',
		u: 0x30a7,
	},
	// HALFWIDTH KATAKANA LETTER SMALL E
	esmallkatakanahalfwidth: {
		n: 'esmallkatakanahalfwidth',
		u: 0xff6a,
	},
	// ESTIMATED SYMBOL
	estimated: {
		n: 'estimated',
		u: 0x212e,
	},
	// <private-use-F6EC>
	esuperior: {
		n: 'esuperior',
		u: 0xf6ec,
	},
	// GREEK SMALL LETTER ETA
	eta: {
		n: 'eta',
		u: 0x03b7,
	},
	// ARMENIAN SMALL LETTER ET
	etarmenian: {
		n: 'etarmenian',
		u: 0x0568,
	},
	// GREEK SMALL LETTER ETA WITH TONOS
	etatonos: {
		n: 'etatonos',
		u: 0x03ae,
	},
	// LATIN SMALL LETTER ETH
	eth: {
		n: 'eth',
		u: 0x00f0,
	},
	// LATIN SMALL LETTER E WITH TILDE
	etilde: {
		n: 'etilde',
		u: 0x1ebd,
	},
	// LATIN SMALL LETTER E WITH TILDE BELOW
	etildebelow: {
		n: 'etildebelow',
		u: 0x1e1b,
	},
	// HEBREW ACCENT ETNAHTA
	etnahtafoukhhebrew: {
		n: 'etnahtafoukhhebrew',
		u: 0x0591,
	},
	// HEBREW ACCENT ETNAHTA
	etnahtafoukhlefthebrew: {
		n: 'etnahtafoukhlefthebrew',
		u: 0x0591,
	},
	// HEBREW ACCENT ETNAHTA
	etnahtahebrew: {
		n: 'etnahtahebrew',
		u: 0x0591,
	},
	// HEBREW ACCENT ETNAHTA
	etnahtalefthebrew: {
		n: 'etnahtalefthebrew',
		u: 0x0591,
	},
	// LATIN SMALL LETTER TURNED E
	eturned: {
		n: 'eturned',
		u: 0x01dd,
	},
	// HANGUL LETTER EU
	eukorean: {
		n: 'eukorean',
		u: 0x3161,
	},
	// EURO SIGN
	euro: {
		n: 'euro',
		u: 0x20ac,
	},
	// BENGALI VOWEL SIGN E
	evowelsignbengali: {
		n: 'evowelsignbengali',
		u: 0x09c7,
	},
	// DEVANAGARI VOWEL SIGN E
	evowelsigndeva: {
		n: 'evowelsigndeva',
		u: 0x0947,
	},
	// GUJARATI VOWEL SIGN E
	evowelsigngujarati: {
		n: 'evowelsigngujarati',
		u: 0x0ac7,
	},
	// EXCLAMATION MARK
	exclam: {
		n: 'exclam',
		u: 0x0021,
	},
	// ARMENIAN EXCLAMATION MARK
	exclamarmenian: {
		n: 'exclamarmenian',
		u: 0x055c,
	},
	// DOUBLE EXCLAMATION MARK
	exclamdbl: {
		n: 'exclamdbl',
		u: 0x203c,
	},
	// INVERTED EXCLAMATION MARK
	exclamdown: {
		n: 'exclamdown',
		u: 0x00a1,
	},
	// <private-use-F7A1>
	exclamdownsmall: {
		n: 'exclamdownsmall',
		u: 0xf7a1,
		f: [0x00a1],
	},
	// FULLWIDTH EXCLAMATION MARK
	exclammonospace: {
		n: 'exclammonospace',
		u: 0xff01,
	},
	// <private-use-F721>
	exclamsmall: {
		n: 'exclamsmall',
		u: 0xf721,
		f: [0x0021],
	},
	// THERE EXISTS
	existential: {
		n: 'existential',
		u: 0x2203,
	},
	// LATIN SMALL LETTER EZH
	ezh: {
		n: 'ezh',
		u: 0x0292,
	},
	// LATIN SMALL LETTER EZH WITH CARON
	ezhcaron: {
		n: 'ezhcaron',
		u: 0x01ef,
	},
	// LATIN SMALL LETTER EZH WITH CURL
	ezhcurl: {
		n: 'ezhcurl',
		u: 0x0293,
	},
	// LATIN SMALL LETTER EZH REVERSED
	ezhreversed: {
		n: 'ezhreversed',
		u: 0x01b9,
	},
	// LATIN SMALL LETTER EZH WITH TAIL
	ezhtail: {
		n: 'ezhtail',
		u: 0x01ba,
	},
	// LATIN SMALL LETTER F
	f: {
		n: 'f',
		u: 0x0066,
	},
	// DEVANAGARI LETTER FA
	fadeva: {
		n: 'fadeva',
		u: 0x095e,
	},
	// GURMUKHI LETTER FA
	fagurmukhi: {
		n: 'fagurmukhi',
		u: 0x0a5e,
	},
	// DEGREE FAHRENHEIT
	fahrenheit: {
		n: 'fahrenheit',
		u: 0x2109,
	},
	// ARABIC FATHA
	fathaarabic: {
		n: 'fathaarabic',
		u: 0x064e,
	},
	// ARABIC FATHA
	fathalowarabic: {
		n: 'fathalowarabic',
		u: 0x064e,
	},
	// ARABIC FATHATAN
	fathatanarabic: {
		n: 'fathatanarabic',
		u: 0x064b,
	},
	// BOPOMOFO LETTER F
	fbopomofo: {
		n: 'fbopomofo',
		u: 0x3108,
	},
	// CIRCLED LATIN SMALL LETTER F
	fcircle: {
		n: 'fcircle',
		u: 0x24d5,
	},
	// LATIN SMALL LETTER F WITH DOT ABOVE
	fdotaccent: {
		n: 'fdotaccent',
		u: 0x1e1f,
	},
	// ARABIC LETTER FEH
	feharabic: {
		n: 'feharabic',
		u: 0x0641,
	},
	// ARMENIAN SMALL LETTER FEH
	feharmenian: {
		n: 'feharmenian',
		u: 0x0586,
	},
	// ARABIC LETTER FEH FINAL FORM
	fehfinalarabic: {
		n: 'fehfinalarabic',
		u: 0xfed2,
	},
	// ARABIC LETTER FEH INITIAL FORM
	fehinitialarabic: {
		n: 'fehinitialarabic',
		u: 0xfed3,
	},
	// ARABIC LETTER FEH MEDIAL FORM
	fehmedialarabic: {
		n: 'fehmedialarabic',
		u: 0xfed4,
	},
	// COPTIC SMALL LETTER FEI
	feicoptic: {
		n: 'feicoptic',
		u: 0x03e5,
	},
	// FEMALE SIGN
	female: {
		n: 'female',
		u: 0x2640,
	},
	// LATIN SMALL LIGATURE FF
	ff: {
		n: 'ff',
		u: 0xfb00,
	},
	// LATIN SMALL LIGATURE FFI
	ffi: {
		n: 'ffi',
		u: 0xfb03,
	},
	// LATIN SMALL LIGATURE FFL
	ffl: {
		n: 'ffl',
		u: 0xfb04,
	},
	// LATIN SMALL LIGATURE FI
	fi: {
		n: 'fi',
		u: 0xfb01,
	},
	// CIRCLED NUMBER FIFTEEN
	fifteencircle: {
		n: 'fifteencircle',
		u: 0x246e,
	},
	// PARENTHESIZED NUMBER FIFTEEN
	fifteenparen: {
		n: 'fifteenparen',
		u: 0x2482,
	},
	// NUMBER FIFTEEN FULL STOP
	fifteenperiod: {
		n: 'fifteenperiod',
		u: 0x2496,
	},
	// FIGURE DASH
	figuredash: {
		n: 'figuredash',
		u: 0x2012,
	},
	// BLACK SQUARE
	filledbox: {
		n: 'filledbox',
		u: 0x25a0,
	},
	// BLACK RECTANGLE
	filledrect: {
		n: 'filledrect',
		u: 0x25ac,
	},
	// HEBREW LETTER FINAL KAF
	finalkaf: {
		n: 'finalkaf',
		u: 0x05da,
	},
	// HEBREW LETTER FINAL KAF WITH DAGESH
	finalkafdagesh: {
		n: 'finalkafdagesh',
		u: 0xfb3a,
	},
	// HEBREW LETTER FINAL KAF WITH DAGESH
	finalkafdageshhebrew: {
		n: 'finalkafdageshhebrew',
		u: 0xfb3a,
	},
	// HEBREW LETTER FINAL KAF
	finalkafhebrew: {
		n: 'finalkafhebrew',
		u: 0x05da,
	},
	// HEBREW LETTER FINAL KAF + HEBREW POINT QAMATS
	finalkafqamats: {
		n: 'finalkafqamats',
		u: [0x05da, 0x05b8],
	},
	// HEBREW LETTER FINAL KAF + HEBREW POINT QAMATS
	finalkafqamatshebrew: {
		n: 'finalkafqamatshebrew',
		u: [0x05da, 0x05b8],
	},
	// HEBREW LETTER FINAL KAF + HEBREW POINT SHEVA
	finalkafsheva: {
		n: 'finalkafsheva',
		u: [0x05da, 0x05b0],
	},
	// HEBREW LETTER FINAL KAF + HEBREW POINT SHEVA
	finalkafshevahebrew: {
		n: 'finalkafshevahebrew',
		u: [0x05da, 0x05b0],
	},
	// HEBREW LETTER FINAL MEM
	finalmem: {
		n: 'finalmem',
		u: 0x05dd,
	},
	// HEBREW LETTER FINAL MEM
	finalmemhebrew: {
		n: 'finalmemhebrew',
		u: 0x05dd,
	},
	// HEBREW LETTER FINAL NUN
	finalnun: {
		n: 'finalnun',
		u: 0x05df,
	},
	// HEBREW LETTER FINAL NUN
	finalnunhebrew: {
		n: 'finalnunhebrew',
		u: 0x05df,
	},
	// HEBREW LETTER FINAL PE
	finalpe: {
		n: 'finalpe',
		u: 0x05e3,
	},
	// HEBREW LETTER FINAL PE
	finalpehebrew: {
		n: 'finalpehebrew',
		u: 0x05e3,
	},
	// HEBREW LETTER FINAL TSADI
	finaltsadi: {
		n: 'finaltsadi',
		u: 0x05e5,
	},
	// HEBREW LETTER FINAL TSADI
	finaltsadihebrew: {
		n: 'finaltsadihebrew',
		u: 0x05e5,
	},
	// MODIFIER LETTER MACRON
	firsttonechinese: {
		n: 'firsttonechinese',
		u: 0x02c9,
	},
	// FISHEYE
	fisheye: {
		n: 'fisheye',
		u: 0x25c9,
	},
	// CYRILLIC SMALL LETTER FITA
	fitacyrillic: {
		n: 'fitacyrillic',
		u: 0x0473,
	},
	// DIGIT FIVE
	five: {
		n: 'five',
		u: 0x0035,
	},
	// ARABIC-INDIC DIGIT FIVE
	fivearabic: {
		n: 'fivearabic',
		u: 0x0665,
	},
	// BENGALI DIGIT FIVE
	fivebengali: {
		n: 'fivebengali',
		u: 0x09eb,
	},
	// CIRCLED DIGIT FIVE
	fivecircle: {
		n: 'fivecircle',
		u: 0x2464,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT FIVE
	fivecircleinversesansserif: {
		n: 'fivecircleinversesansserif',
		u: 0x278e,
	},
	// DEVANAGARI DIGIT FIVE
	fivedeva: {
		n: 'fivedeva',
		u: 0x096b,
	},
	// VULGAR FRACTION FIVE EIGHTHS
	fiveeighths: {
		n: 'fiveeighths',
		u: 0x215d,
	},
	// GUJARATI DIGIT FIVE
	fivegujarati: {
		n: 'fivegujarati',
		u: 0x0aeb,
	},
	// GURMUKHI DIGIT FIVE
	fivegurmukhi: {
		n: 'fivegurmukhi',
		u: 0x0a6b,
	},
	// ARABIC-INDIC DIGIT FIVE
	fivehackarabic: {
		n: 'fivehackarabic',
		u: 0x0665,
	},
	// HANGZHOU NUMERAL FIVE
	fivehangzhou: {
		n: 'fivehangzhou',
		u: 0x3025,
	},
	// PARENTHESIZED IDEOGRAPH FIVE
	fiveideographicparen: {
		n: 'fiveideographicparen',
		u: 0x3224,
	},
	// SUBSCRIPT FIVE
	fiveinferior: {
		n: 'fiveinferior',
		u: 0x2085,
	},
	// FULLWIDTH DIGIT FIVE
	fivemonospace: {
		n: 'fivemonospace',
		u: 0xff15,
	},
	// <private-use-F735>
	fiveoldstyle: {
		n: 'fiveoldstyle',
		u: 0xf735,
	},
	// PARENTHESIZED DIGIT FIVE
	fiveparen: {
		n: 'fiveparen',
		u: 0x2478,
	},
	// DIGIT FIVE FULL STOP
	fiveperiod: {
		n: 'fiveperiod',
		u: 0x248c,
	},
	// EXTENDED ARABIC-INDIC DIGIT FIVE
	fivepersian: {
		n: 'fivepersian',
		u: 0x06f5,
	},
	// SMALL ROMAN NUMERAL FIVE
	fiveroman: {
		n: 'fiveroman',
		u: 0x2174,
	},
	// SUPERSCRIPT FIVE
	fivesuperior: {
		n: 'fivesuperior',
		u: 0x2075,
	},
	// THAI DIGIT FIVE
	fivethai: {
		n: 'fivethai',
		u: 0x0e55,
	},
	// LATIN SMALL LIGATURE FL
	fl: {
		n: 'fl',
		u: 0xfb02,
	},
	// LATIN SMALL LETTER F WITH HOOK
	florin: {
		n: 'florin',
		u: 0x0192,
	},
	// FULLWIDTH LATIN SMALL LETTER F
	fmonospace: {
		n: 'fmonospace',
		u: 0xff46,
	},
	// SQUARE FM
	fmsquare: {
		n: 'fmsquare',
		u: 0x3399,
	},
	// THAI CHARACTER FO FAN
	fofanthai: {
		n: 'fofanthai',
		u: 0x0e1f,
	},
	// THAI CHARACTER FO FA
	fofathai: {
		n: 'fofathai',
		u: 0x0e1d,
	},
	// THAI CHARACTER FONGMAN
	fongmanthai: {
		n: 'fongmanthai',
		u: 0x0e4f,
	},
	// FOR ALL
	forall: {
		n: 'forall',
		u: 0x2200,
	},
	// DIGIT FOUR
	four: {
		n: 'four',
		u: 0x0034,
	},
	// ARABIC-INDIC DIGIT FOUR
	fourarabic: {
		n: 'fourarabic',
		u: 0x0664,
	},
	// BENGALI DIGIT FOUR
	fourbengali: {
		n: 'fourbengali',
		u: 0x09ea,
	},
	// CIRCLED DIGIT FOUR
	fourcircle: {
		n: 'fourcircle',
		u: 0x2463,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT FOUR
	fourcircleinversesansserif: {
		n: 'fourcircleinversesansserif',
		u: 0x278d,
	},
	// DEVANAGARI DIGIT FOUR
	fourdeva: {
		n: 'fourdeva',
		u: 0x096a,
	},
	// GUJARATI DIGIT FOUR
	fourgujarati: {
		n: 'fourgujarati',
		u: 0x0aea,
	},
	// GURMUKHI DIGIT FOUR
	fourgurmukhi: {
		n: 'fourgurmukhi',
		u: 0x0a6a,
	},
	// ARABIC-INDIC DIGIT FOUR
	fourhackarabic: {
		n: 'fourhackarabic',
		u: 0x0664,
	},
	// HANGZHOU NUMERAL FOUR
	fourhangzhou: {
		n: 'fourhangzhou',
		u: 0x3024,
	},
	// PARENTHESIZED IDEOGRAPH FOUR
	fourideographicparen: {
		n: 'fourideographicparen',
		u: 0x3223,
	},
	// SUBSCRIPT FOUR
	fourinferior: {
		n: 'fourinferior',
		u: 0x2084,
	},
	// FULLWIDTH DIGIT FOUR
	fourmonospace: {
		n: 'fourmonospace',
		u: 0xff14,
	},
	// BENGALI CURRENCY NUMERATOR FOUR
	fournumeratorbengali: {
		n: 'fournumeratorbengali',
		u: 0x09f7,
	},
	// <private-use-F734>
	fouroldstyle: {
		n: 'fouroldstyle',
		u: 0xf734,
	},
	// PARENTHESIZED DIGIT FOUR
	fourparen: {
		n: 'fourparen',
		u: 0x2477,
	},
	// DIGIT FOUR FULL STOP
	fourperiod: {
		n: 'fourperiod',
		u: 0x248b,
	},
	// EXTENDED ARABIC-INDIC DIGIT FOUR
	fourpersian: {
		n: 'fourpersian',
		u: 0x06f4,
	},
	// SMALL ROMAN NUMERAL FOUR
	fourroman: {
		n: 'fourroman',
		u: 0x2173,
	},
	// SUPERSCRIPT FOUR
	foursuperior: {
		n: 'foursuperior',
		u: 0x2074,
	},
	// CIRCLED NUMBER FOURTEEN
	fourteencircle: {
		n: 'fourteencircle',
		u: 0x246d,
	},
	// PARENTHESIZED NUMBER FOURTEEN
	fourteenparen: {
		n: 'fourteenparen',
		u: 0x2481,
	},
	// NUMBER FOURTEEN FULL STOP
	fourteenperiod: {
		n: 'fourteenperiod',
		u: 0x2495,
	},
	// THAI DIGIT FOUR
	fourthai: {
		n: 'fourthai',
		u: 0x0e54,
	},
	// MODIFIER LETTER GRAVE ACCENT
	fourthtonechinese: {
		n: 'fourthtonechinese',
		u: 0x02cb,
	},
	// PARENTHESIZED LATIN SMALL LETTER F
	fparen: {
		n: 'fparen',
		u: 0x24a1,
	},
	// FRACTION SLASH
	fraction: {
		n: 'fraction',
		u: 0x2044,
		f: [0x2215],
	},
	// FRENCH FRANC SIGN
	franc: {
		n: 'franc',
		u: 0x20a3,
	},
	// LATIN SMALL LETTER G
	g: {
		n: 'g',
		u: 0x0067,
	},
	// BENGALI LETTER GA
	gabengali: {
		n: 'gabengali',
		u: 0x0997,
	},
	// LATIN SMALL LETTER G WITH ACUTE
	gacute: {
		n: 'gacute',
		u: 0x01f5,
	},
	// DEVANAGARI LETTER GA
	gadeva: {
		n: 'gadeva',
		u: 0x0917,
	},
	// ARABIC LETTER GAF
	gafarabic: {
		n: 'gafarabic',
		u: 0x06af,
	},
	// ARABIC LETTER GAF FINAL FORM
	gaffinalarabic: {
		n: 'gaffinalarabic',
		u: 0xfb93,
	},
	// ARABIC LETTER GAF INITIAL FORM
	gafinitialarabic: {
		n: 'gafinitialarabic',
		u: 0xfb94,
	},
	// ARABIC LETTER GAF MEDIAL FORM
	gafmedialarabic: {
		n: 'gafmedialarabic',
		u: 0xfb95,
	},
	// GUJARATI LETTER GA
	gagujarati: {
		n: 'gagujarati',
		u: 0x0a97,
	},
	// GURMUKHI LETTER GA
	gagurmukhi: {
		n: 'gagurmukhi',
		u: 0x0a17,
	},
	// HIRAGANA LETTER GA
	gahiragana: {
		n: 'gahiragana',
		u: 0x304c,
	},
	// KATAKANA LETTER GA
	gakatakana: {
		n: 'gakatakana',
		u: 0x30ac,
	},
	// GREEK SMALL LETTER GAMMA
	gamma: {
		n: 'gamma',
		u: 0x03b3,
	},
	// LATIN SMALL LETTER GAMMA
	gammalatinsmall: {
		n: 'gammalatinsmall',
		u: 0x0263,
	},
	// MODIFIER LETTER SMALL GAMMA
	gammasuperior: {
		n: 'gammasuperior',
		u: 0x02e0,
	},
	// COPTIC SMALL LETTER GANGIA
	gangiacoptic: {
		n: 'gangiacoptic',
		u: 0x03eb,
	},
	// BOPOMOFO LETTER G
	gbopomofo: {
		n: 'gbopomofo',
		u: 0x310d,
	},
	// LATIN SMALL LETTER G WITH BREVE
	gbreve: {
		n: 'gbreve',
		u: 0x011f,
	},
	// LATIN SMALL LETTER G WITH CARON
	gcaron: {
		n: 'gcaron',
		u: 0x01e7,
	},
	// LATIN SMALL LETTER G WITH CEDILLA
	gcedilla: {
		n: 'gcedilla',
		u: 0x0123,
	},
	// CIRCLED LATIN SMALL LETTER G
	gcircle: {
		n: 'gcircle',
		u: 0x24d6,
	},
	// LATIN SMALL LETTER G WITH CIRCUMFLEX
	gcircumflex: {
		n: 'gcircumflex',
		u: 0x011d,
	},
	// LATIN SMALL LETTER G WITH CEDILLA
	gcommaaccent: {
		n: 'gcommaaccent',
		u: 0x0123,
	},
	// LATIN SMALL LETTER G WITH DOT ABOVE
	gdot: {
		n: 'gdot',
		u: 0x0121,
	},
	// LATIN SMALL LETTER G WITH DOT ABOVE
	gdotaccent: {
		n: 'gdotaccent',
		u: 0x0121,
	},
	// CYRILLIC SMALL LETTER GHE
	gecyrillic: {
		n: 'gecyrillic',
		u: 0x0433,
	},
	// HIRAGANA LETTER GE
	gehiragana: {
		n: 'gehiragana',
		u: 0x3052,
	},
	// KATAKANA LETTER GE
	gekatakana: {
		n: 'gekatakana',
		u: 0x30b2,
	},
	// GEOMETRICALLY EQUAL TO
	geometricallyequal: {
		n: 'geometricallyequal',
		u: 0x2251,
	},
	// HEBREW ACCENT GERESH
	gereshaccenthebrew: {
		n: 'gereshaccenthebrew',
		u: 0x059c,
	},
	// HEBREW PUNCTUATION GERESH
	gereshhebrew: {
		n: 'gereshhebrew',
		u: 0x05f3,
	},
	// HEBREW ACCENT GERESH MUQDAM
	gereshmuqdamhebrew: {
		n: 'gereshmuqdamhebrew',
		u: 0x059d,
	},
	// LATIN SMALL LETTER SHARP S
	germandbls: {
		n: 'germandbls',
		u: 0x00df,
	},
	// HEBREW ACCENT GERSHAYIM
	gershayimaccenthebrew: {
		n: 'gershayimaccenthebrew',
		u: 0x059e,
	},
	// HEBREW PUNCTUATION GERSHAYIM
	gershayimhebrew: {
		n: 'gershayimhebrew',
		u: 0x05f4,
	},
	// GETA MARK
	getamark: {
		n: 'getamark',
		u: 0x3013,
	},
	// BENGALI LETTER GHA
	ghabengali: {
		n: 'ghabengali',
		u: 0x0998,
	},
	// ARMENIAN SMALL LETTER GHAD
	ghadarmenian: {
		n: 'ghadarmenian',
		u: 0x0572,
	},
	// DEVANAGARI LETTER GHA
	ghadeva: {
		n: 'ghadeva',
		u: 0x0918,
	},
	// GUJARATI LETTER GHA
	ghagujarati: {
		n: 'ghagujarati',
		u: 0x0a98,
	},
	// GURMUKHI LETTER GHA
	ghagurmukhi: {
		n: 'ghagurmukhi',
		u: 0x0a18,
	},
	// ARABIC LETTER GHAIN
	ghainarabic: {
		n: 'ghainarabic',
		u: 0x063a,
	},
	// ARABIC LETTER GHAIN FINAL FORM
	ghainfinalarabic: {
		n: 'ghainfinalarabic',
		u: 0xfece,
	},
	// ARABIC LETTER GHAIN INITIAL FORM
	ghaininitialarabic: {
		n: 'ghaininitialarabic',
		u: 0xfecf,
	},
	// ARABIC LETTER GHAIN MEDIAL FORM
	ghainmedialarabic: {
		n: 'ghainmedialarabic',
		u: 0xfed0,
	},
	// CYRILLIC SMALL LETTER GHE WITH MIDDLE HOOK
	ghemiddlehookcyrillic: {
		n: 'ghemiddlehookcyrillic',
		u: 0x0495,
	},
	// CYRILLIC SMALL LETTER GHE WITH STROKE
	ghestrokecyrillic: {
		n: 'ghestrokecyrillic',
		u: 0x0493,
	},
	// CYRILLIC SMALL LETTER GHE WITH UPTURN
	gheupturncyrillic: {
		n: 'gheupturncyrillic',
		u: 0x0491,
	},
	// DEVANAGARI LETTER GHHA
	ghhadeva: {
		n: 'ghhadeva',
		u: 0x095a,
	},
	// GURMUKHI LETTER GHHA
	ghhagurmukhi: {
		n: 'ghhagurmukhi',
		u: 0x0a5a,
	},
	// LATIN SMALL LETTER G WITH HOOK
	ghook: {
		n: 'ghook',
		u: 0x0260,
	},
	// SQUARE GHZ
	ghzsquare: {
		n: 'ghzsquare',
		u: 0x3393,
	},
	// HIRAGANA LETTER GI
	gihiragana: {
		n: 'gihiragana',
		u: 0x304e,
	},
	// KATAKANA LETTER GI
	gikatakana: {
		n: 'gikatakana',
		u: 0x30ae,
	},
	// ARMENIAN SMALL LETTER GIM
	gimarmenian: {
		n: 'gimarmenian',
		u: 0x0563,
	},
	// HEBREW LETTER GIMEL
	gimel: {
		n: 'gimel',
		u: 0x05d2,
	},
	// HEBREW LETTER GIMEL WITH DAGESH
	gimeldagesh: {
		n: 'gimeldagesh',
		u: 0xfb32,
	},
	// HEBREW LETTER GIMEL WITH DAGESH
	gimeldageshhebrew: {
		n: 'gimeldageshhebrew',
		u: 0xfb32,
	},
	// HEBREW LETTER GIMEL
	gimelhebrew: {
		n: 'gimelhebrew',
		u: 0x05d2,
	},
	// CYRILLIC SMALL LETTER GJE
	gjecyrillic: {
		n: 'gjecyrillic',
		u: 0x0453,
	},
	// LATIN LETTER INVERTED GLOTTAL STOP WITH STROKE
	glottalinvertedstroke: {
		n: 'glottalinvertedstroke',
		u: 0x01be,
	},
	// LATIN LETTER GLOTTAL STOP
	glottalstop: {
		n: 'glottalstop',
		u: 0x0294,
	},
	// LATIN LETTER INVERTED GLOTTAL STOP
	glottalstopinverted: {
		n: 'glottalstopinverted',
		u: 0x0296,
	},
	// MODIFIER LETTER GLOTTAL STOP
	glottalstopmod: {
		n: 'glottalstopmod',
		u: 0x02c0,
	},
	// LATIN LETTER PHARYNGEAL VOICED FRICATIVE
	glottalstopreversed: {
		n: 'glottalstopreversed',
		u: 0x0295,
	},
	// MODIFIER LETTER REVERSED GLOTTAL STOP
	glottalstopreversedmod: {
		n: 'glottalstopreversedmod',
		u: 0x02c1,
	},
	// MODIFIER LETTER SMALL REVERSED GLOTTAL STOP
	glottalstopreversedsuperior: {
		n: 'glottalstopreversedsuperior',
		u: 0x02e4,
	},
	// LATIN LETTER GLOTTAL STOP WITH STROKE
	glottalstopstroke: {
		n: 'glottalstopstroke',
		u: 0x02a1,
	},
	// LATIN LETTER REVERSED GLOTTAL STOP WITH STROKE
	glottalstopstrokereversed: {
		n: 'glottalstopstrokereversed',
		u: 0x02a2,
	},
	// LATIN SMALL LETTER G WITH MACRON
	gmacron: {
		n: 'gmacron',
		u: 0x1e21,
	},
	// FULLWIDTH LATIN SMALL LETTER G
	gmonospace: {
		n: 'gmonospace',
		u: 0xff47,
	},
	// HIRAGANA LETTER GO
	gohiragana: {
		n: 'gohiragana',
		u: 0x3054,
	},
	// KATAKANA LETTER GO
	gokatakana: {
		n: 'gokatakana',
		u: 0x30b4,
	},
	// PARENTHESIZED LATIN SMALL LETTER G
	gparen: {
		n: 'gparen',
		u: 0x24a2,
	},
	// SQUARE GPA
	gpasquare: {
		n: 'gpasquare',
		u: 0x33ac,
	},
	// NABLA
	gradient: {
		n: 'gradient',
		u: 0x2207,
	},
	// GRAVE ACCENT
	grave: {
		n: 'grave',
		u: 0x0060,
	},
	// COMBINING GRAVE ACCENT BELOW
	gravebelowcmb: {
		n: 'gravebelowcmb',
		u: 0x0316,
	},
	// COMBINING GRAVE ACCENT
	gravecmb: {
		n: 'gravecmb',
		u: 0x0300,
	},
	// COMBINING GRAVE ACCENT
	gravecomb: {
		n: 'gravecomb',
		u: 0x0300,
	},
	// DEVANAGARI GRAVE ACCENT
	gravedeva: {
		n: 'gravedeva',
		u: 0x0953,
	},
	// MODIFIER LETTER LOW GRAVE ACCENT
	gravelowmod: {
		n: 'gravelowmod',
		u: 0x02ce,
	},
	// FULLWIDTH GRAVE ACCENT
	gravemonospace: {
		n: 'gravemonospace',
		u: 0xff40,
	},
	// COMBINING GRAVE TONE MARK
	gravetonecmb: {
		n: 'gravetonecmb',
		u: 0x0340,
	},
	// GREATER-THAN SIGN
	greater: {
		n: 'greater',
		u: 0x003e,
	},
	// GREATER-THAN OR EQUAL TO
	greaterequal: {
		n: 'greaterequal',
		u: 0x2265,
	},
	// GREATER-THAN EQUAL TO OR LESS-THAN
	greaterequalorless: {
		n: 'greaterequalorless',
		u: 0x22db,
	},
	// FULLWIDTH GREATER-THAN SIGN
	greatermonospace: {
		n: 'greatermonospace',
		u: 0xff1e,
	},
	// GREATER-THAN OR EQUIVALENT TO
	greaterorequivalent: {
		n: 'greaterorequivalent',
		u: 0x2273,
	},
	// GREATER-THAN OR LESS-THAN
	greaterorless: {
		n: 'greaterorless',
		u: 0x2277,
	},
	// GREATER-THAN OVER EQUAL TO
	greateroverequal: {
		n: 'greateroverequal',
		u: 0x2267,
	},
	// SMALL GREATER-THAN SIGN
	greatersmall: {
		n: 'greatersmall',
		u: 0xfe65,
		f: [0x003e],
	},
	// LATIN SMALL LETTER SCRIPT G
	gscript: {
		n: 'gscript',
		u: 0x0261,
	},
	// LATIN SMALL LETTER G WITH STROKE
	gstroke: {
		n: 'gstroke',
		u: 0x01e5,
	},
	// HIRAGANA LETTER GU
	guhiragana: {
		n: 'guhiragana',
		u: 0x3050,
	},
	// LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
	guillemotleft: {
		n: 'guillemotleft',
		u: 0x00ab,
	},
	// RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
	guillemotright: {
		n: 'guillemotright',
		u: 0x00bb,
	},
	// SINGLE LEFT-POINTING ANGLE QUOTATION MARK
	guilsinglleft: {
		n: 'guilsinglleft',
		u: 0x2039,
	},
	// SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
	guilsinglright: {
		n: 'guilsinglright',
		u: 0x203a,
	},
	// KATAKANA LETTER GU
	gukatakana: {
		n: 'gukatakana',
		u: 0x30b0,
	},
	// SQUARE GURAMU
	guramusquare: {
		n: 'guramusquare',
		u: 0x3318,
	},
	// SQUARE GY
	gysquare: {
		n: 'gysquare',
		u: 0x33c9,
	},
	// LATIN SMALL LETTER H
	h: {
		n: 'h',
		u: 0x0068,
	},
	// CYRILLIC SMALL LETTER ABKHASIAN HA
	haabkhasiancyrillic: {
		n: 'haabkhasiancyrillic',
		u: 0x04a9,
	},
	// ARABIC LETTER HEH GOAL
	haaltonearabic: {
		n: 'haaltonearabic',
		u: 0x06c1,
	},
	// BENGALI LETTER HA
	habengali: {
		n: 'habengali',
		u: 0x09b9,
	},
	// CYRILLIC SMALL LETTER HA WITH DESCENDER
	hadescendercyrillic: {
		n: 'hadescendercyrillic',
		u: 0x04b3,
	},
	// DEVANAGARI LETTER HA
	hadeva: {
		n: 'hadeva',
		u: 0x0939,
	},
	// GUJARATI LETTER HA
	hagujarati: {
		n: 'hagujarati',
		u: 0x0ab9,
	},
	// GURMUKHI LETTER HA
	hagurmukhi: {
		n: 'hagurmukhi',
		u: 0x0a39,
	},
	// ARABIC LETTER HAH
	haharabic: {
		n: 'haharabic',
		u: 0x062d,
	},
	// ARABIC LETTER HAH FINAL FORM
	hahfinalarabic: {
		n: 'hahfinalarabic',
		u: 0xfea2,
	},
	// ARABIC LETTER HAH INITIAL FORM
	hahinitialarabic: {
		n: 'hahinitialarabic',
		u: 0xfea3,
	},
	// HIRAGANA LETTER HA
	hahiragana: {
		n: 'hahiragana',
		u: 0x306f,
	},
	// ARABIC LETTER HAH MEDIAL FORM
	hahmedialarabic: {
		n: 'hahmedialarabic',
		u: 0xfea4,
	},
	// SQUARE HAITU
	haitusquare: {
		n: 'haitusquare',
		u: 0x332a,
	},
	// KATAKANA LETTER HA
	hakatakana: {
		n: 'hakatakana',
		u: 0x30cf,
	},
	// HALFWIDTH KATAKANA LETTER HA
	hakatakanahalfwidth: {
		n: 'hakatakanahalfwidth',
		u: 0xff8a,
	},
	// GURMUKHI SIGN VIRAMA
	halantgurmukhi: {
		n: 'halantgurmukhi',
		u: 0x0a4d,
	},
	// ARABIC LETTER HAMZA
	hamzaarabic: {
		n: 'hamzaarabic',
		u: 0x0621,
	},
	// ARABIC LETTER HAMZA + ARABIC DAMMA
	hamzadammaarabic: {
		n: 'hamzadammaarabic',
		u: [0x0621, 0x064f],
	},
	// ARABIC LETTER HAMZA + ARABIC DAMMATAN
	hamzadammatanarabic: {
		n: 'hamzadammatanarabic',
		u: [0x0621, 0x064c],
	},
	// ARABIC LETTER HAMZA + ARABIC FATHA
	hamzafathaarabic: {
		n: 'hamzafathaarabic',
		u: [0x0621, 0x064e],
	},
	// ARABIC LETTER HAMZA + ARABIC FATHATAN
	hamzafathatanarabic: {
		n: 'hamzafathatanarabic',
		u: [0x0621, 0x064b],
	},
	// ARABIC LETTER HAMZA
	hamzalowarabic: {
		n: 'hamzalowarabic',
		u: 0x0621,
	},
	// ARABIC LETTER HAMZA + ARABIC KASRA
	hamzalowkasraarabic: {
		n: 'hamzalowkasraarabic',
		u: [0x0621, 0x0650],
	},
	// ARABIC LETTER HAMZA + ARABIC KASRATAN
	hamzalowkasratanarabic: {
		n: 'hamzalowkasratanarabic',
		u: [0x0621, 0x064d],
	},
	// ARABIC LETTER HAMZA + ARABIC SUKUN
	hamzasukunarabic: {
		n: 'hamzasukunarabic',
		u: [0x0621, 0x0652],
	},
	// HANGUL FILLER
	hangulfiller: {
		n: 'hangulfiller',
		u: 0x3164,
	},
	// CYRILLIC SMALL LETTER HARD SIGN
	hardsigncyrillic: {
		n: 'hardsigncyrillic',
		u: 0x044a,
	},
	// LEFTWARDS HARPOON WITH BARB UPWARDS
	harpoonleftbarbup: {
		n: 'harpoonleftbarbup',
		u: 0x21bc,
	},
	// RIGHTWARDS HARPOON WITH BARB UPWARDS
	harpoonrightbarbup: {
		n: 'harpoonrightbarbup',
		u: 0x21c0,
	},
	// SQUARE HA
	hasquare: {
		n: 'hasquare',
		u: 0x33ca,
	},
	// HEBREW POINT HATAF PATAH
	hatafpatah: {
		n: 'hatafpatah',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF PATAH
	hatafpatah16: {
		n: 'hatafpatah16',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF PATAH
	hatafpatah23: {
		n: 'hatafpatah23',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF PATAH
	hatafpatah2f: {
		n: 'hatafpatah2f',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF PATAH
	hatafpatahhebrew: {
		n: 'hatafpatahhebrew',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF PATAH
	hatafpatahnarrowhebrew: {
		n: 'hatafpatahnarrowhebrew',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF PATAH
	hatafpatahquarterhebrew: {
		n: 'hatafpatahquarterhebrew',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF PATAH
	hatafpatahwidehebrew: {
		n: 'hatafpatahwidehebrew',
		u: 0x05b2,
	},
	// HEBREW POINT HATAF QAMATS
	hatafqamats: {
		n: 'hatafqamats',
		u: 0x05b3,
	},
	// HEBREW POINT HATAF QAMATS
	hatafqamats1b: {
		n: 'hatafqamats1b',
		u: 0x05b3,
	},
	// HEBREW POINT HATAF QAMATS
	hatafqamats28: {
		n: 'hatafqamats28',
		u: 0x05b3,
	},
	// HEBREW POINT HATAF QAMATS
	hatafqamats34: {
		n: 'hatafqamats34',
		u: 0x05b3,
	},
	// HEBREW POINT HATAF QAMATS
	hatafqamatshebrew: {
		n: 'hatafqamatshebrew',
		u: 0x05b3,
	},
	// HEBREW POINT HATAF QAMATS
	hatafqamatsnarrowhebrew: {
		n: 'hatafqamatsnarrowhebrew',
		u: 0x05b3,
	},
	// HEBREW POINT HATAF QAMATS
	hatafqamatsquarterhebrew: {
		n: 'hatafqamatsquarterhebrew',
		u: 0x05b3,
	},
	// HEBREW POINT HATAF QAMATS
	hatafqamatswidehebrew: {
		n: 'hatafqamatswidehebrew',
		u: 0x05b3,
	},
	// HEBREW POINT HATAF SEGOL
	hatafsegol: {
		n: 'hatafsegol',
		u: 0x05b1,
	},
	// HEBREW POINT HATAF SEGOL
	hatafsegol17: {
		n: 'hatafsegol17',
		u: 0x05b1,
	},
	// HEBREW POINT HATAF SEGOL
	hatafsegol24: {
		n: 'hatafsegol24',
		u: 0x05b1,
	},
	// HEBREW POINT HATAF SEGOL
	hatafsegol30: {
		n: 'hatafsegol30',
		u: 0x05b1,
	},
	// HEBREW POINT HATAF SEGOL
	hatafsegolhebrew: {
		n: 'hatafsegolhebrew',
		u: 0x05b1,
	},
	// HEBREW POINT HATAF SEGOL
	hatafsegolnarrowhebrew: {
		n: 'hatafsegolnarrowhebrew',
		u: 0x05b1,
	},
	// HEBREW POINT HATAF SEGOL
	hatafsegolquarterhebrew: {
		n: 'hatafsegolquarterhebrew',
		u: 0x05b1,
	},
	// HEBREW POINT HATAF SEGOL
	hatafsegolwidehebrew: {
		n: 'hatafsegolwidehebrew',
		u: 0x05b1,
	},
	// LATIN SMALL LETTER H WITH STROKE
	hbar: {
		n: 'hbar',
		u: 0x0127,
	},
	// BOPOMOFO LETTER H
	hbopomofo: {
		n: 'hbopomofo',
		u: 0x310f,
	},
	// LATIN SMALL LETTER H WITH BREVE BELOW
	hbrevebelow: {
		n: 'hbrevebelow',
		u: 0x1e2b,
	},
	// LATIN SMALL LETTER H WITH CEDILLA
	hcedilla: {
		n: 'hcedilla',
		u: 0x1e29,
	},
	// CIRCLED LATIN SMALL LETTER H
	hcircle: {
		n: 'hcircle',
		u: 0x24d7,
	},
	// LATIN SMALL LETTER H WITH CIRCUMFLEX
	hcircumflex: {
		n: 'hcircumflex',
		u: 0x0125,
	},
	// LATIN SMALL LETTER H WITH DIAERESIS
	hdieresis: {
		n: 'hdieresis',
		u: 0x1e27,
	},
	// LATIN SMALL LETTER H WITH DOT ABOVE
	hdotaccent: {
		n: 'hdotaccent',
		u: 0x1e23,
	},
	// LATIN SMALL LETTER H WITH DOT BELOW
	hdotbelow: {
		n: 'hdotbelow',
		u: 0x1e25,
	},
	// HEBREW LETTER HE
	he: {
		n: 'he',
		u: 0x05d4,
	},
	// BLACK HEART SUIT
	heart: {
		n: 'heart',
		u: 0x2665,
	},
	// BLACK HEART SUIT
	heartsuitblack: {
		n: 'heartsuitblack',
		u: 0x2665,
	},
	// WHITE HEART SUIT
	heartsuitwhite: {
		n: 'heartsuitwhite',
		u: 0x2661,
	},
	// HEBREW LETTER HE WITH MAPIQ
	hedagesh: {
		n: 'hedagesh',
		u: 0xfb34,
	},
	// HEBREW LETTER HE WITH MAPIQ
	hedageshhebrew: {
		n: 'hedageshhebrew',
		u: 0xfb34,
	},
	// ARABIC LETTER HEH GOAL
	hehaltonearabic: {
		n: 'hehaltonearabic',
		u: 0x06c1,
	},
	// ARABIC LETTER HEH
	heharabic: {
		n: 'heharabic',
		u: 0x0647,
	},
	// HEBREW LETTER HE
	hehebrew: {
		n: 'hehebrew',
		u: 0x05d4,
	},
	// ARABIC LETTER HEH GOAL FINAL FORM
	hehfinalaltonearabic: {
		n: 'hehfinalaltonearabic',
		u: 0xfba7,
	},
	// ARABIC LETTER HEH FINAL FORM
	hehfinalalttwoarabic: {
		n: 'hehfinalalttwoarabic',
		u: 0xfeea,
	},
	// ARABIC LETTER HEH FINAL FORM
	hehfinalarabic: {
		n: 'hehfinalarabic',
		u: 0xfeea,
	},
	// ARABIC LETTER HEH WITH YEH ABOVE FINAL FORM
	hehhamzaabovefinalarabic: {
		n: 'hehhamzaabovefinalarabic',
		u: 0xfba5,
	},
	// ARABIC LETTER HEH WITH YEH ABOVE ISOLATED FORM
	hehhamzaaboveisolatedarabic: {
		n: 'hehhamzaaboveisolatedarabic',
		u: 0xfba4,
	},
	// ARABIC LETTER HEH GOAL INITIAL FORM
	hehinitialaltonearabic: {
		n: 'hehinitialaltonearabic',
		u: 0xfba8,
	},
	// ARABIC LETTER HEH INITIAL FORM
	hehinitialarabic: {
		n: 'hehinitialarabic',
		u: 0xfeeb,
	},
	// HIRAGANA LETTER HE
	hehiragana: {
		n: 'hehiragana',
		u: 0x3078,
	},
	// ARABIC LETTER HEH GOAL MEDIAL FORM
	hehmedialaltonearabic: {
		n: 'hehmedialaltonearabic',
		u: 0xfba9,
	},
	// ARABIC LETTER HEH MEDIAL FORM
	hehmedialarabic: {
		n: 'hehmedialarabic',
		u: 0xfeec,
	},
	// SQUARE ERA NAME HEISEI
	heiseierasquare: {
		n: 'heiseierasquare',
		u: 0x337b,
	},
	// KATAKANA LETTER HE
	hekatakana: {
		n: 'hekatakana',
		u: 0x30d8,
	},
	// HALFWIDTH KATAKANA LETTER HE
	hekatakanahalfwidth: {
		n: 'hekatakanahalfwidth',
		u: 0xff8d,
	},
	// SQUARE HEKUTAARU
	hekutaarusquare: {
		n: 'hekutaarusquare',
		u: 0x3336,
	},
	// LATIN SMALL LETTER HENG WITH HOOK
	henghook: {
		n: 'henghook',
		u: 0x0267,
	},
	// SQUARE HERUTU
	herutusquare: {
		n: 'herutusquare',
		u: 0x3339,
	},
	// HEBREW LETTER HET
	het: {
		n: 'het',
		u: 0x05d7,
	},
	// HEBREW LETTER HET
	hethebrew: {
		n: 'hethebrew',
		u: 0x05d7,
	},
	// LATIN SMALL LETTER H WITH HOOK
	hhook: {
		n: 'hhook',
		u: 0x0266,
	},
	// MODIFIER LETTER SMALL H WITH HOOK
	hhooksuperior: {
		n: 'hhooksuperior',
		u: 0x02b1,
	},
	// CIRCLED HANGUL HIEUH A
	hieuhacirclekorean: {
		n: 'hieuhacirclekorean',
		u: 0x327b,
	},
	// PARENTHESIZED HANGUL HIEUH A
	hieuhaparenkorean: {
		n: 'hieuhaparenkorean',
		u: 0x321b,
	},
	// CIRCLED HANGUL HIEUH
	hieuhcirclekorean: {
		n: 'hieuhcirclekorean',
		u: 0x326d,
	},
	// HANGUL LETTER HIEUH
	hieuhkorean: {
		n: 'hieuhkorean',
		u: 0x314e,
	},
	// PARENTHESIZED HANGUL HIEUH
	hieuhparenkorean: {
		n: 'hieuhparenkorean',
		u: 0x320d,
	},
	// HIRAGANA LETTER HI
	hihiragana: {
		n: 'hihiragana',
		u: 0x3072,
	},
	// KATAKANA LETTER HI
	hikatakana: {
		n: 'hikatakana',
		u: 0x30d2,
	},
	// HALFWIDTH KATAKANA LETTER HI
	hikatakanahalfwidth: {
		n: 'hikatakanahalfwidth',
		u: 0xff8b,
	},
	// HEBREW POINT HIRIQ
	hiriq: {
		n: 'hiriq',
		u: 0x05b4,
	},
	// HEBREW POINT HIRIQ
	hiriq14: {
		n: 'hiriq14',
		u: 0x05b4,
	},
	// HEBREW POINT HIRIQ
	hiriq21: {
		n: 'hiriq21',
		u: 0x05b4,
	},
	// HEBREW POINT HIRIQ
	hiriq2d: {
		n: 'hiriq2d',
		u: 0x05b4,
	},
	// HEBREW POINT HIRIQ
	hiriqhebrew: {
		n: 'hiriqhebrew',
		u: 0x05b4,
	},
	// HEBREW POINT HIRIQ
	hiriqnarrowhebrew: {
		n: 'hiriqnarrowhebrew',
		u: 0x05b4,
	},
	// HEBREW POINT HIRIQ
	hiriqquarterhebrew: {
		n: 'hiriqquarterhebrew',
		u: 0x05b4,
	},
	// HEBREW POINT HIRIQ
	hiriqwidehebrew: {
		n: 'hiriqwidehebrew',
		u: 0x05b4,
	},
	// LATIN SMALL LETTER H WITH LINE BELOW
	hlinebelow: {
		n: 'hlinebelow',
		u: 0x1e96,
	},
	// FULLWIDTH LATIN SMALL LETTER H
	hmonospace: {
		n: 'hmonospace',
		u: 0xff48,
	},
	// ARMENIAN SMALL LETTER HO
	hoarmenian: {
		n: 'hoarmenian',
		u: 0x0570,
	},
	// THAI CHARACTER HO HIP
	hohipthai: {
		n: 'hohipthai',
		u: 0x0e2b,
	},
	// HIRAGANA LETTER HO
	hohiragana: {
		n: 'hohiragana',
		u: 0x307b,
	},
	// KATAKANA LETTER HO
	hokatakana: {
		n: 'hokatakana',
		u: 0x30db,
	},
	// HALFWIDTH KATAKANA LETTER HO
	hokatakanahalfwidth: {
		n: 'hokatakanahalfwidth',
		u: 0xff8e,
	},
	// HEBREW POINT HOLAM
	holam: {
		n: 'holam',
		u: 0x05b9,
	},
	// HEBREW POINT HOLAM
	holam19: {
		n: 'holam19',
		u: 0x05b9,
	},
	// HEBREW POINT HOLAM
	holam26: {
		n: 'holam26',
		u: 0x05b9,
	},
	// HEBREW POINT HOLAM
	holam32: {
		n: 'holam32',
		u: 0x05b9,
	},
	// HEBREW POINT HOLAM
	holamhebrew: {
		n: 'holamhebrew',
		u: 0x05b9,
	},
	// HEBREW POINT HOLAM
	holamnarrowhebrew: {
		n: 'holamnarrowhebrew',
		u: 0x05b9,
	},
	// HEBREW POINT HOLAM
	holamquarterhebrew: {
		n: 'holamquarterhebrew',
		u: 0x05b9,
	},
	// HEBREW POINT HOLAM
	holamwidehebrew: {
		n: 'holamwidehebrew',
		u: 0x05b9,
	},
	// THAI CHARACTER HO NOKHUK
	honokhukthai: {
		n: 'honokhukthai',
		u: 0x0e2e,
	},
	// COMBINING HOOK ABOVE
	hookabovecomb: {
		n: 'hookabovecomb',
		u: 0x0309,
	},
	// COMBINING HOOK ABOVE
	hookcmb: {
		n: 'hookcmb',
		u: 0x0309,
	},
	// COMBINING PALATALIZED HOOK BELOW
	hookpalatalizedbelowcmb: {
		n: 'hookpalatalizedbelowcmb',
		u: 0x0321,
	},
	// COMBINING RETROFLEX HOOK BELOW
	hookretroflexbelowcmb: {
		n: 'hookretroflexbelowcmb',
		u: 0x0322,
	},
	// SQUARE HOON
	hoonsquare: {
		n: 'hoonsquare',
		u: 0x3342,
	},
	// COPTIC SMALL LETTER HORI
	horicoptic: {
		n: 'horicoptic',
		u: 0x03e9,
	},
	// HORIZONTAL BAR
	horizontalbar: {
		n: 'horizontalbar',
		u: 0x2015,
	},
	// COMBINING HORN
	horncmb: {
		n: 'horncmb',
		u: 0x031b,
	},
	// HOT SPRINGS
	hotsprings: {
		n: 'hotsprings',
		u: 0x2668,
	},
	// HOUSE
	house: {
		n: 'house',
		u: 0x2302,
	},
	// PARENTHESIZED LATIN SMALL LETTER H
	hparen: {
		n: 'hparen',
		u: 0x24a3,
	},
	// MODIFIER LETTER SMALL H
	hsuperior: {
		n: 'hsuperior',
		u: 0x02b0,
	},
	// LATIN SMALL LETTER TURNED H
	hturned: {
		n: 'hturned',
		u: 0x0265,
	},
	// HIRAGANA LETTER HU
	huhiragana: {
		n: 'huhiragana',
		u: 0x3075,
	},
	// SQUARE HUIITO
	huiitosquare: {
		n: 'huiitosquare',
		u: 0x3333,
	},
	// KATAKANA LETTER HU
	hukatakana: {
		n: 'hukatakana',
		u: 0x30d5,
	},
	// HALFWIDTH KATAKANA LETTER HU
	hukatakanahalfwidth: {
		n: 'hukatakanahalfwidth',
		u: 0xff8c,
	},
	// DOUBLE ACUTE ACCENT
	hungarumlaut: {
		n: 'hungarumlaut',
		u: 0x02dd,
	},
	// COMBINING DOUBLE ACUTE ACCENT
	hungarumlautcmb: {
		n: 'hungarumlautcmb',
		u: 0x030b,
	},
	// LATIN SMALL LETTER HV
	hv: {
		n: 'hv',
		u: 0x0195,
	},
	// HYPHEN-MINUS
	hyphen: {
		n: 'hyphen',
		u: 0x002d,
	},
	// <private-use-F6E5>
	hypheninferior: {
		n: 'hypheninferior',
		u: 0xf6e5,
	},
	// FULLWIDTH HYPHEN-MINUS
	hyphenmonospace: {
		n: 'hyphenmonospace',
		u: 0xff0d,
	},
	// SMALL HYPHEN-MINUS
	hyphensmall: {
		n: 'hyphensmall',
		u: 0xfe63,
		f: [0x002d],
	},
	// <private-use-F6E6>
	hyphensuperior: {
		n: 'hyphensuperior',
		u: 0xf6e6,
	},
	// HYPHEN
	hyphentwo: {
		n: 'hyphentwo',
		u: 0x2010,
	},
	// LATIN SMALL LETTER I
	i: {
		n: 'i',
		u: 0x0069,
	},
	// LATIN SMALL LETTER I WITH ACUTE
	iacute: {
		n: 'iacute',
		u: 0x00ed,
	},
	// CYRILLIC SMALL LETTER YA
	iacyrillic: {
		n: 'iacyrillic',
		u: 0x044f,
	},
	// BENGALI LETTER I
	ibengali: {
		n: 'ibengali',
		u: 0x0987,
	},
	// BOPOMOFO LETTER I
	ibopomofo: {
		n: 'ibopomofo',
		u: 0x3127,
	},
	// LATIN SMALL LETTER I WITH BREVE
	ibreve: {
		n: 'ibreve',
		u: 0x012d,
	},
	// LATIN SMALL LETTER I WITH CARON
	icaron: {
		n: 'icaron',
		u: 0x01d0,
	},
	// CIRCLED LATIN SMALL LETTER I
	icircle: {
		n: 'icircle',
		u: 0x24d8,
	},
	// LATIN SMALL LETTER I WITH CIRCUMFLEX
	icircumflex: {
		n: 'icircumflex',
		u: 0x00ee,
	},
	// CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I
	icyrillic: {
		n: 'icyrillic',
		u: 0x0456,
	},
	// LATIN SMALL LETTER I WITH DOUBLE GRAVE
	idblgrave: {
		n: 'idblgrave',
		u: 0x0209,
	},
	// CIRCLED IDEOGRAPH EARTH
	ideographearthcircle: {
		n: 'ideographearthcircle',
		u: 0x328f,
	},
	// CIRCLED IDEOGRAPH FIRE
	ideographfirecircle: {
		n: 'ideographfirecircle',
		u: 0x328b,
	},
	// PARENTHESIZED IDEOGRAPH ALLIANCE
	ideographicallianceparen: {
		n: 'ideographicallianceparen',
		u: 0x323f,
	},
	// PARENTHESIZED IDEOGRAPH CALL
	ideographiccallparen: {
		n: 'ideographiccallparen',
		u: 0x323a,
	},
	// CIRCLED IDEOGRAPH CENTRE
	ideographiccentrecircle: {
		n: 'ideographiccentrecircle',
		u: 0x32a5,
	},
	// IDEOGRAPHIC CLOSING MARK
	ideographicclose: {
		n: 'ideographicclose',
		u: 0x3006,
	},
	// IDEOGRAPHIC COMMA
	ideographiccomma: {
		n: 'ideographiccomma',
		u: 0x3001,
	},
	// HALFWIDTH IDEOGRAPHIC COMMA
	ideographiccommaleft: {
		n: 'ideographiccommaleft',
		u: 0xff64,
	},
	// PARENTHESIZED IDEOGRAPH CONGRATULATION
	ideographiccongratulationparen: {
		n: 'ideographiccongratulationparen',
		u: 0x3237,
	},
	// CIRCLED IDEOGRAPH CORRECT
	ideographiccorrectcircle: {
		n: 'ideographiccorrectcircle',
		u: 0x32a3,
	},
	// PARENTHESIZED IDEOGRAPH EARTH
	ideographicearthparen: {
		n: 'ideographicearthparen',
		u: 0x322f,
	},
	// PARENTHESIZED IDEOGRAPH ENTERPRISE
	ideographicenterpriseparen: {
		n: 'ideographicenterpriseparen',
		u: 0x323d,
	},
	// CIRCLED IDEOGRAPH EXCELLENT
	ideographicexcellentcircle: {
		n: 'ideographicexcellentcircle',
		u: 0x329d,
	},
	// PARENTHESIZED IDEOGRAPH FESTIVAL
	ideographicfestivalparen: {
		n: 'ideographicfestivalparen',
		u: 0x3240,
	},
	// CIRCLED IDEOGRAPH FINANCIAL
	ideographicfinancialcircle: {
		n: 'ideographicfinancialcircle',
		u: 0x3296,
	},
	// PARENTHESIZED IDEOGRAPH FINANCIAL
	ideographicfinancialparen: {
		n: 'ideographicfinancialparen',
		u: 0x3236,
	},
	// PARENTHESIZED IDEOGRAPH FIRE
	ideographicfireparen: {
		n: 'ideographicfireparen',
		u: 0x322b,
	},
	// PARENTHESIZED IDEOGRAPH HAVE
	ideographichaveparen: {
		n: 'ideographichaveparen',
		u: 0x3232,
	},
	// CIRCLED IDEOGRAPH HIGH
	ideographichighcircle: {
		n: 'ideographichighcircle',
		u: 0x32a4,
	},
	// IDEOGRAPHIC ITERATION MARK
	ideographiciterationmark: {
		n: 'ideographiciterationmark',
		u: 0x3005,
	},
	// CIRCLED IDEOGRAPH LABOR
	ideographiclaborcircle: {
		n: 'ideographiclaborcircle',
		u: 0x3298,
	},
	// PARENTHESIZED IDEOGRAPH LABOR
	ideographiclaborparen: {
		n: 'ideographiclaborparen',
		u: 0x3238,
	},
	// CIRCLED IDEOGRAPH LEFT
	ideographicleftcircle: {
		n: 'ideographicleftcircle',
		u: 0x32a7,
	},
	// CIRCLED IDEOGRAPH LOW
	ideographiclowcircle: {
		n: 'ideographiclowcircle',
		u: 0x32a6,
	},
	// CIRCLED IDEOGRAPH MEDICINE
	ideographicmedicinecircle: {
		n: 'ideographicmedicinecircle',
		u: 0x32a9,
	},
	// PARENTHESIZED IDEOGRAPH METAL
	ideographicmetalparen: {
		n: 'ideographicmetalparen',
		u: 0x322e,
	},
	// PARENTHESIZED IDEOGRAPH MOON
	ideographicmoonparen: {
		n: 'ideographicmoonparen',
		u: 0x322a,
	},
	// PARENTHESIZED IDEOGRAPH NAME
	ideographicnameparen: {
		n: 'ideographicnameparen',
		u: 0x3234,
	},
	// IDEOGRAPHIC FULL STOP
	ideographicperiod: {
		n: 'ideographicperiod',
		u: 0x3002,
	},
	// CIRCLED IDEOGRAPH PRINT
	ideographicprintcircle: {
		n: 'ideographicprintcircle',
		u: 0x329e,
	},
	// PARENTHESIZED IDEOGRAPH REACH
	ideographicreachparen: {
		n: 'ideographicreachparen',
		u: 0x3243,
	},
	// PARENTHESIZED IDEOGRAPH REPRESENT
	ideographicrepresentparen: {
		n: 'ideographicrepresentparen',
		u: 0x3239,
	},
	// PARENTHESIZED IDEOGRAPH RESOURCE
	ideographicresourceparen: {
		n: 'ideographicresourceparen',
		u: 0x323e,
	},
	// CIRCLED IDEOGRAPH RIGHT
	ideographicrightcircle: {
		n: 'ideographicrightcircle',
		u: 0x32a8,
	},
	// CIRCLED IDEOGRAPH SECRET
	ideographicsecretcircle: {
		n: 'ideographicsecretcircle',
		u: 0x3299,
	},
	// PARENTHESIZED IDEOGRAPH SELF
	ideographicselfparen: {
		n: 'ideographicselfparen',
		u: 0x3242,
	},
	// PARENTHESIZED IDEOGRAPH SOCIETY
	ideographicsocietyparen: {
		n: 'ideographicsocietyparen',
		u: 0x3233,
	},
	// IDEOGRAPHIC SPACE
	ideographicspace: {
		n: 'ideographicspace',
		u: 0x3000,
	},
	// PARENTHESIZED IDEOGRAPH SPECIAL
	ideographicspecialparen: {
		n: 'ideographicspecialparen',
		u: 0x3235,
	},
	// PARENTHESIZED IDEOGRAPH STOCK
	ideographicstockparen: {
		n: 'ideographicstockparen',
		u: 0x3231,
	},
	// PARENTHESIZED IDEOGRAPH STUDY
	ideographicstudyparen: {
		n: 'ideographicstudyparen',
		u: 0x323b,
	},
	// PARENTHESIZED IDEOGRAPH SUN
	ideographicsunparen: {
		n: 'ideographicsunparen',
		u: 0x3230,
	},
	// PARENTHESIZED IDEOGRAPH SUPERVISE
	ideographicsuperviseparen: {
		n: 'ideographicsuperviseparen',
		u: 0x323c,
	},
	// PARENTHESIZED IDEOGRAPH WATER
	ideographicwaterparen: {
		n: 'ideographicwaterparen',
		u: 0x322c,
	},
	// PARENTHESIZED IDEOGRAPH WOOD
	ideographicwoodparen: {
		n: 'ideographicwoodparen',
		u: 0x322d,
	},
	// IDEOGRAPHIC NUMBER ZERO
	ideographiczero: {
		n: 'ideographiczero',
		u: 0x3007,
	},
	// CIRCLED IDEOGRAPH METAL
	ideographmetalcircle: {
		n: 'ideographmetalcircle',
		u: 0x328e,
	},
	// CIRCLED IDEOGRAPH MOON
	ideographmooncircle: {
		n: 'ideographmooncircle',
		u: 0x328a,
	},
	// CIRCLED IDEOGRAPH NAME
	ideographnamecircle: {
		n: 'ideographnamecircle',
		u: 0x3294,
	},
	// CIRCLED IDEOGRAPH SUN
	ideographsuncircle: {
		n: 'ideographsuncircle',
		u: 0x3290,
	},
	// CIRCLED IDEOGRAPH WATER
	ideographwatercircle: {
		n: 'ideographwatercircle',
		u: 0x328c,
	},
	// CIRCLED IDEOGRAPH WOOD
	ideographwoodcircle: {
		n: 'ideographwoodcircle',
		u: 0x328d,
	},
	// DEVANAGARI LETTER I
	ideva: {
		n: 'ideva',
		u: 0x0907,
	},
	// LATIN SMALL LETTER I WITH DIAERESIS
	idieresis: {
		n: 'idieresis',
		u: 0x00ef,
	},
	// LATIN SMALL LETTER I WITH DIAERESIS AND ACUTE
	idieresisacute: {
		n: 'idieresisacute',
		u: 0x1e2f,
	},
	// CYRILLIC SMALL LETTER I WITH DIAERESIS
	idieresiscyrillic: {
		n: 'idieresiscyrillic',
		u: 0x04e5,
	},
	// LATIN SMALL LETTER I WITH DOT BELOW
	idotbelow: {
		n: 'idotbelow',
		u: 0x1ecb,
	},
	// CYRILLIC SMALL LETTER IE WITH BREVE
	iebrevecyrillic: {
		n: 'iebrevecyrillic',
		u: 0x04d7,
	},
	// CYRILLIC SMALL LETTER IE
	iecyrillic: {
		n: 'iecyrillic',
		u: 0x0435,
	},
	// CIRCLED HANGUL IEUNG A
	ieungacirclekorean: {
		n: 'ieungacirclekorean',
		u: 0x3275,
	},
	// PARENTHESIZED HANGUL IEUNG A
	ieungaparenkorean: {
		n: 'ieungaparenkorean',
		u: 0x3215,
	},
	// CIRCLED HANGUL IEUNG
	ieungcirclekorean: {
		n: 'ieungcirclekorean',
		u: 0x3267,
	},
	// HANGUL LETTER IEUNG
	ieungkorean: {
		n: 'ieungkorean',
		u: 0x3147,
	},
	// PARENTHESIZED HANGUL IEUNG
	ieungparenkorean: {
		n: 'ieungparenkorean',
		u: 0x3207,
	},
	// LATIN SMALL LETTER I WITH GRAVE
	igrave: {
		n: 'igrave',
		u: 0x00ec,
	},
	// GUJARATI LETTER I
	igujarati: {
		n: 'igujarati',
		u: 0x0a87,
	},
	// GURMUKHI LETTER I
	igurmukhi: {
		n: 'igurmukhi',
		u: 0x0a07,
	},
	// HIRAGANA LETTER I
	ihiragana: {
		n: 'ihiragana',
		u: 0x3044,
	},
	// LATIN SMALL LETTER I WITH HOOK ABOVE
	ihookabove: {
		n: 'ihookabove',
		u: 0x1ec9,
	},
	// BENGALI LETTER II
	iibengali: {
		n: 'iibengali',
		u: 0x0988,
	},
	// CYRILLIC SMALL LETTER I
	iicyrillic: {
		n: 'iicyrillic',
		u: 0x0438,
	},
	// DEVANAGARI LETTER II
	iideva: {
		n: 'iideva',
		u: 0x0908,
	},
	// GUJARATI LETTER II
	iigujarati: {
		n: 'iigujarati',
		u: 0x0a88,
	},
	// GURMUKHI LETTER II
	iigurmukhi: {
		n: 'iigurmukhi',
		u: 0x0a08,
	},
	// GURMUKHI VOWEL SIGN II
	iimatragurmukhi: {
		n: 'iimatragurmukhi',
		u: 0x0a40,
	},
	// LATIN SMALL LETTER I WITH INVERTED BREVE
	iinvertedbreve: {
		n: 'iinvertedbreve',
		u: 0x020b,
	},
	// CYRILLIC SMALL LETTER SHORT I
	iishortcyrillic: {
		n: 'iishortcyrillic',
		u: 0x0439,
	},
	// BENGALI VOWEL SIGN II
	iivowelsignbengali: {
		n: 'iivowelsignbengali',
		u: 0x09c0,
	},
	// DEVANAGARI VOWEL SIGN II
	iivowelsigndeva: {
		n: 'iivowelsigndeva',
		u: 0x0940,
	},
	// GUJARATI VOWEL SIGN II
	iivowelsigngujarati: {
		n: 'iivowelsigngujarati',
		u: 0x0ac0,
	},
	// LATIN SMALL LIGATURE IJ
	ij: {
		n: 'ij',
		u: 0x0133,
	},
	// KATAKANA LETTER I
	ikatakana: {
		n: 'ikatakana',
		u: 0x30a4,
	},
	// HALFWIDTH KATAKANA LETTER I
	ikatakanahalfwidth: {
		n: 'ikatakanahalfwidth',
		u: 0xff72,
	},
	// HANGUL LETTER I
	ikorean: {
		n: 'ikorean',
		u: 0x3163,
	},
	// SMALL TILDE
	ilde: {
		n: 'ilde',
		u: 0x02dc,
	},
	// HEBREW ACCENT ILUY
	iluyhebrew: {
		n: 'iluyhebrew',
		u: 0x05ac,
	},
	// LATIN SMALL LETTER I WITH MACRON
	imacron: {
		n: 'imacron',
		u: 0x012b,
	},
	// CYRILLIC SMALL LETTER I WITH MACRON
	imacroncyrillic: {
		n: 'imacroncyrillic',
		u: 0x04e3,
	},
	// IMAGE OF OR APPROXIMATELY EQUAL TO
	imageorapproximatelyequal: {
		n: 'imageorapproximatelyequal',
		u: 0x2253,
	},
	// GURMUKHI VOWEL SIGN I
	imatragurmukhi: {
		n: 'imatragurmukhi',
		u: 0x0a3f,
	},
	// FULLWIDTH LATIN SMALL LETTER I
	imonospace: {
		n: 'imonospace',
		u: 0xff49,
	},
	// INCREMENT
	increment: {
		n: 'increment',
		u: 0x2206,
		f: [0x0394],
	},
	// INFINITY
	infinity: {
		n: 'infinity',
		u: 0x221e,
	},
	// ARMENIAN SMALL LETTER INI
	iniarmenian: {
		n: 'iniarmenian',
		u: 0x056b,
	},
	// INTEGRAL
	integral: {
		n: 'integral',
		u: 0x222b,
	},
	// BOTTOM HALF INTEGRAL
	integralbottom: {
		n: 'integralbottom',
		u: 0x2321,
	},
	// BOTTOM HALF INTEGRAL
	integralbt: {
		n: 'integralbt',
		u: 0x2321,
	},
	// <private-use-F8F5>
	integralex: {
		n: 'integralex',
		u: 0xf8f5,
	},
	// TOP HALF INTEGRAL
	integraltop: {
		n: 'integraltop',
		u: 0x2320,
	},
	// TOP HALF INTEGRAL
	integraltp: {
		n: 'integraltp',
		u: 0x2320,
	},
	// INTERSECTION
	intersection: {
		n: 'intersection',
		u: 0x2229,
	},
	// SQUARE INTI
	intisquare: {
		n: 'intisquare',
		u: 0x3305,
	},
	// INVERSE BULLET
	invbullet: {
		n: 'invbullet',
		u: 0x25d8,
	},
	// INVERSE WHITE CIRCLE
	invcircle: {
		n: 'invcircle',
		u: 0x25d9,
	},
	// BLACK SMILING FACE
	invsmileface: {
		n: 'invsmileface',
		u: 0x263b,
	},
	// CYRILLIC SMALL LETTER IO
	iocyrillic: {
		n: 'iocyrillic',
		u: 0x0451,
	},
	// LATIN SMALL LETTER I WITH OGONEK
	iogonek: {
		n: 'iogonek',
		u: 0x012f,
	},
	// GREEK SMALL LETTER IOTA
	iota: {
		n: 'iota',
		u: 0x03b9,
	},
	// GREEK SMALL LETTER IOTA WITH DIALYTIKA
	iotadieresis: {
		n: 'iotadieresis',
		u: 0x03ca,
	},
	// GREEK SMALL LETTER IOTA WITH DIALYTIKA AND TONOS
	iotadieresistonos: {
		n: 'iotadieresistonos',
		u: 0x0390,
	},
	// LATIN SMALL LETTER IOTA
	iotalatin: {
		n: 'iotalatin',
		u: 0x0269,
	},
	// GREEK SMALL LETTER IOTA WITH TONOS
	iotatonos: {
		n: 'iotatonos',
		u: 0x03af,
	},
	// PARENTHESIZED LATIN SMALL LETTER I
	iparen: {
		n: 'iparen',
		u: 0x24a4,
	},
	// GURMUKHI IRI
	irigurmukhi: {
		n: 'irigurmukhi',
		u: 0x0a72,
	},
	// HIRAGANA LETTER SMALL I
	ismallhiragana: {
		n: 'ismallhiragana',
		u: 0x3043,
	},
	// KATAKANA LETTER SMALL I
	ismallkatakana: {
		n: 'ismallkatakana',
		u: 0x30a3,
	},
	// HALFWIDTH KATAKANA LETTER SMALL I
	ismallkatakanahalfwidth: {
		n: 'ismallkatakanahalfwidth',
		u: 0xff68,
	},
	// BENGALI ISSHAR
	issharbengali: {
		n: 'issharbengali',
		u: 0x09fa,
	},
	// LATIN SMALL LETTER I WITH STROKE
	istroke: {
		n: 'istroke',
		u: 0x0268,
	},
	// <private-use-F6ED>
	isuperior: {
		n: 'isuperior',
		u: 0xf6ed,
	},
	// HIRAGANA ITERATION MARK
	iterationhiragana: {
		n: 'iterationhiragana',
		u: 0x309d,
	},
	// KATAKANA ITERATION MARK
	iterationkatakana: {
		n: 'iterationkatakana',
		u: 0x30fd,
	},
	// LATIN SMALL LETTER I WITH TILDE
	itilde: {
		n: 'itilde',
		u: 0x0129,
	},
	// LATIN SMALL LETTER I WITH TILDE BELOW
	itildebelow: {
		n: 'itildebelow',
		u: 0x1e2d,
	},
	// BOPOMOFO LETTER IU
	iubopomofo: {
		n: 'iubopomofo',
		u: 0x3129,
	},
	// CYRILLIC SMALL LETTER YU
	iucyrillic: {
		n: 'iucyrillic',
		u: 0x044e,
	},
	// BENGALI VOWEL SIGN I
	ivowelsignbengali: {
		n: 'ivowelsignbengali',
		u: 0x09bf,
	},
	// DEVANAGARI VOWEL SIGN I
	ivowelsigndeva: {
		n: 'ivowelsigndeva',
		u: 0x093f,
	},
	// GUJARATI VOWEL SIGN I
	ivowelsigngujarati: {
		n: 'ivowelsigngujarati',
		u: 0x0abf,
	},
	// CYRILLIC SMALL LETTER IZHITSA
	izhitsacyrillic: {
		n: 'izhitsacyrillic',
		u: 0x0475,
	},
	// CYRILLIC SMALL LETTER IZHITSA WITH DOUBLE GRAVE ACCENT
	izhitsadblgravecyrillic: {
		n: 'izhitsadblgravecyrillic',
		u: 0x0477,
	},
	// LATIN SMALL LETTER J
	j: {
		n: 'j',
		u: 0x006a,
	},
	// ARMENIAN SMALL LETTER JA
	jaarmenian: {
		n: 'jaarmenian',
		u: 0x0571,
	},
	// BENGALI LETTER JA
	jabengali: {
		n: 'jabengali',
		u: 0x099c,
	},
	// DEVANAGARI LETTER JA
	jadeva: {
		n: 'jadeva',
		u: 0x091c,
	},
	// GUJARATI LETTER JA
	jagujarati: {
		n: 'jagujarati',
		u: 0x0a9c,
	},
	// GURMUKHI LETTER JA
	jagurmukhi: {
		n: 'jagurmukhi',
		u: 0x0a1c,
	},
	// BOPOMOFO LETTER J
	jbopomofo: {
		n: 'jbopomofo',
		u: 0x3110,
	},
	// LATIN SMALL LETTER J WITH CARON
	jcaron: {
		n: 'jcaron',
		u: 0x01f0,
	},
	// CIRCLED LATIN SMALL LETTER J
	jcircle: {
		n: 'jcircle',
		u: 0x24d9,
	},
	// LATIN SMALL LETTER J WITH CIRCUMFLEX
	jcircumflex: {
		n: 'jcircumflex',
		u: 0x0135,
	},
	// LATIN SMALL LETTER J WITH CROSSED-TAIL
	jcrossedtail: {
		n: 'jcrossedtail',
		u: 0x029d,
	},
	// LATIN SMALL LETTER DOTLESS J WITH STROKE
	jdotlessstroke: {
		n: 'jdotlessstroke',
		u: 0x025f,
	},
	// CYRILLIC SMALL LETTER JE
	jecyrillic: {
		n: 'jecyrillic',
		u: 0x0458,
	},
	// ARABIC LETTER JEEM
	jeemarabic: {
		n: 'jeemarabic',
		u: 0x062c,
	},
	// ARABIC LETTER JEEM FINAL FORM
	jeemfinalarabic: {
		n: 'jeemfinalarabic',
		u: 0xfe9e,
	},
	// ARABIC LETTER JEEM INITIAL FORM
	jeeminitialarabic: {
		n: 'jeeminitialarabic',
		u: 0xfe9f,
	},
	// ARABIC LETTER JEEM MEDIAL FORM
	jeemmedialarabic: {
		n: 'jeemmedialarabic',
		u: 0xfea0,
	},
	// ARABIC LETTER JEH
	jeharabic: {
		n: 'jeharabic',
		u: 0x0698,
	},
	// ARABIC LETTER JEH FINAL FORM
	jehfinalarabic: {
		n: 'jehfinalarabic',
		u: 0xfb8b,
	},
	// BENGALI LETTER JHA
	jhabengali: {
		n: 'jhabengali',
		u: 0x099d,
	},
	// DEVANAGARI LETTER JHA
	jhadeva: {
		n: 'jhadeva',
		u: 0x091d,
	},
	// GUJARATI LETTER JHA
	jhagujarati: {
		n: 'jhagujarati',
		u: 0x0a9d,
	},
	// GURMUKHI LETTER JHA
	jhagurmukhi: {
		n: 'jhagurmukhi',
		u: 0x0a1d,
	},
	// ARMENIAN SMALL LETTER JHEH
	jheharmenian: {
		n: 'jheharmenian',
		u: 0x057b,
	},
	// JAPANESE INDUSTRIAL STANDARD SYMBOL
	jis: {
		n: 'jis',
		u: 0x3004,
	},
	// FULLWIDTH LATIN SMALL LETTER J
	jmonospace: {
		n: 'jmonospace',
		u: 0xff4a,
	},
	// PARENTHESIZED LATIN SMALL LETTER J
	jparen: {
		n: 'jparen',
		u: 0x24a5,
	},
	// MODIFIER LETTER SMALL J
	jsuperior: {
		n: 'jsuperior',
		u: 0x02b2,
	},
	// LATIN SMALL LETTER K
	k: {
		n: 'k',
		u: 0x006b,
	},
	// CYRILLIC SMALL LETTER BASHKIR KA
	kabashkircyrillic: {
		n: 'kabashkircyrillic',
		u: 0x04a1,
	},
	// BENGALI LETTER KA
	kabengali: {
		n: 'kabengali',
		u: 0x0995,
	},
	// LATIN SMALL LETTER K WITH ACUTE
	kacute: {
		n: 'kacute',
		u: 0x1e31,
	},
	// CYRILLIC SMALL LETTER KA
	kacyrillic: {
		n: 'kacyrillic',
		u: 0x043a,
	},
	// CYRILLIC SMALL LETTER KA WITH DESCENDER
	kadescendercyrillic: {
		n: 'kadescendercyrillic',
		u: 0x049b,
	},
	// DEVANAGARI LETTER KA
	kadeva: {
		n: 'kadeva',
		u: 0x0915,
	},
	// HEBREW LETTER KAF
	kaf: {
		n: 'kaf',
		u: 0x05db,
	},
	// ARABIC LETTER KAF
	kafarabic: {
		n: 'kafarabic',
		u: 0x0643,
	},
	// HEBREW LETTER KAF WITH DAGESH
	kafdagesh: {
		n: 'kafdagesh',
		u: 0xfb3b,
	},
	// HEBREW LETTER KAF WITH DAGESH
	kafdageshhebrew: {
		n: 'kafdageshhebrew',
		u: 0xfb3b,
	},
	// ARABIC LETTER KAF FINAL FORM
	kaffinalarabic: {
		n: 'kaffinalarabic',
		u: 0xfeda,
	},
	// HEBREW LETTER KAF
	kafhebrew: {
		n: 'kafhebrew',
		u: 0x05db,
	},
	// ARABIC LETTER KAF INITIAL FORM
	kafinitialarabic: {
		n: 'kafinitialarabic',
		u: 0xfedb,
	},
	// ARABIC LETTER KAF MEDIAL FORM
	kafmedialarabic: {
		n: 'kafmedialarabic',
		u: 0xfedc,
	},
	// HEBREW LETTER KAF WITH RAFE
	kafrafehebrew: {
		n: 'kafrafehebrew',
		u: 0xfb4d,
	},
	// GUJARATI LETTER KA
	kagujarati: {
		n: 'kagujarati',
		u: 0x0a95,
	},
	// GURMUKHI LETTER KA
	kagurmukhi: {
		n: 'kagurmukhi',
		u: 0x0a15,
	},
	// HIRAGANA LETTER KA
	kahiragana: {
		n: 'kahiragana',
		u: 0x304b,
	},
	// CYRILLIC SMALL LETTER KA WITH HOOK
	kahookcyrillic: {
		n: 'kahookcyrillic',
		u: 0x04c4,
	},
	// KATAKANA LETTER KA
	kakatakana: {
		n: 'kakatakana',
		u: 0x30ab,
	},
	// HALFWIDTH KATAKANA LETTER KA
	kakatakanahalfwidth: {
		n: 'kakatakanahalfwidth',
		u: 0xff76,
	},
	// GREEK SMALL LETTER KAPPA
	kappa: {
		n: 'kappa',
		u: 0x03ba,
	},
	// GREEK KAPPA SYMBOL
	kappasymbolgreek: {
		n: 'kappasymbolgreek',
		u: 0x03f0,
	},
	// HANGUL LETTER KAPYEOUNMIEUM
	kapyeounmieumkorean: {
		n: 'kapyeounmieumkorean',
		u: 0x3171,
	},
	// HANGUL LETTER KAPYEOUNPHIEUPH
	kapyeounphieuphkorean: {
		n: 'kapyeounphieuphkorean',
		u: 0x3184,
	},
	// HANGUL LETTER KAPYEOUNPIEUP
	kapyeounpieupkorean: {
		n: 'kapyeounpieupkorean',
		u: 0x3178,
	},
	// HANGUL LETTER KAPYEOUNSSANGPIEUP
	kapyeounssangpieupkorean: {
		n: 'kapyeounssangpieupkorean',
		u: 0x3179,
	},
	// SQUARE KARORII
	karoriisquare: {
		n: 'karoriisquare',
		u: 0x330d,
	},
	// ARABIC TATWEEL
	kashidaautoarabic: {
		n: 'kashidaautoarabic',
		u: 0x0640,
	},
	// ARABIC TATWEEL
	kashidaautonosidebearingarabic: {
		n: 'kashidaautonosidebearingarabic',
		u: 0x0640,
	},
	// KATAKANA LETTER SMALL KA
	kasmallkatakana: {
		n: 'kasmallkatakana',
		u: 0x30f5,
	},
	// SQUARE KA
	kasquare: {
		n: 'kasquare',
		u: 0x3384,
	},
	// ARABIC KASRA
	kasraarabic: {
		n: 'kasraarabic',
		u: 0x0650,
	},
	// ARABIC KASRATAN
	kasratanarabic: {
		n: 'kasratanarabic',
		u: 0x064d,
	},
	// CYRILLIC SMALL LETTER KA WITH STROKE
	kastrokecyrillic: {
		n: 'kastrokecyrillic',
		u: 0x049f,
	},
	// HALFWIDTH KATAKANA-HIRAGANA PROLONGED SOUND MARK
	katahiraprolongmarkhalfwidth: {
		n: 'katahiraprolongmarkhalfwidth',
		u: 0xff70,
	},
	// CYRILLIC SMALL LETTER KA WITH VERTICAL STROKE
	kaverticalstrokecyrillic: {
		n: 'kaverticalstrokecyrillic',
		u: 0x049d,
	},
	// BOPOMOFO LETTER K
	kbopomofo: {
		n: 'kbopomofo',
		u: 0x310e,
	},
	// SQUARE KCAL
	kcalsquare: {
		n: 'kcalsquare',
		u: 0x3389,
	},
	// LATIN SMALL LETTER K WITH CARON
	kcaron: {
		n: 'kcaron',
		u: 0x01e9,
	},
	// LATIN SMALL LETTER K WITH CEDILLA
	kcedilla: {
		n: 'kcedilla',
		u: 0x0137,
	},
	// CIRCLED LATIN SMALL LETTER K
	kcircle: {
		n: 'kcircle',
		u: 0x24da,
	},
	// LATIN SMALL LETTER K WITH CEDILLA
	kcommaaccent: {
		n: 'kcommaaccent',
		u: 0x0137,
	},
	// LATIN SMALL LETTER K WITH DOT BELOW
	kdotbelow: {
		n: 'kdotbelow',
		u: 0x1e33,
	},
	// ARMENIAN SMALL LETTER KEH
	keharmenian: {
		n: 'keharmenian',
		u: 0x0584,
	},
	// HIRAGANA LETTER KE
	kehiragana: {
		n: 'kehiragana',
		u: 0x3051,
	},
	// KATAKANA LETTER KE
	kekatakana: {
		n: 'kekatakana',
		u: 0x30b1,
	},
	// HALFWIDTH KATAKANA LETTER KE
	kekatakanahalfwidth: {
		n: 'kekatakanahalfwidth',
		u: 0xff79,
	},
	// ARMENIAN SMALL LETTER KEN
	kenarmenian: {
		n: 'kenarmenian',
		u: 0x056f,
	},
	// KATAKANA LETTER SMALL KE
	kesmallkatakana: {
		n: 'kesmallkatakana',
		u: 0x30f6,
	},
	// LATIN SMALL LETTER KRA
	kgreenlandic: {
		n: 'kgreenlandic',
		u: 0x0138,
	},
	// BENGALI LETTER KHA
	khabengali: {
		n: 'khabengali',
		u: 0x0996,
	},
	// CYRILLIC SMALL LETTER HA
	khacyrillic: {
		n: 'khacyrillic',
		u: 0x0445,
	},
	// DEVANAGARI LETTER KHA
	khadeva: {
		n: 'khadeva',
		u: 0x0916,
	},
	// GUJARATI LETTER KHA
	khagujarati: {
		n: 'khagujarati',
		u: 0x0a96,
	},
	// GURMUKHI LETTER KHA
	khagurmukhi: {
		n: 'khagurmukhi',
		u: 0x0a16,
	},
	// ARABIC LETTER KHAH
	khaharabic: {
		n: 'khaharabic',
		u: 0x062e,
	},
	// ARABIC LETTER KHAH FINAL FORM
	khahfinalarabic: {
		n: 'khahfinalarabic',
		u: 0xfea6,
	},
	// ARABIC LETTER KHAH INITIAL FORM
	khahinitialarabic: {
		n: 'khahinitialarabic',
		u: 0xfea7,
	},
	// ARABIC LETTER KHAH MEDIAL FORM
	khahmedialarabic: {
		n: 'khahmedialarabic',
		u: 0xfea8,
	},
	// COPTIC SMALL LETTER KHEI
	kheicoptic: {
		n: 'kheicoptic',
		u: 0x03e7,
	},
	// DEVANAGARI LETTER KHHA
	khhadeva: {
		n: 'khhadeva',
		u: 0x0959,
	},
	// GURMUKHI LETTER KHHA
	khhagurmukhi: {
		n: 'khhagurmukhi',
		u: 0x0a59,
	},
	// CIRCLED HANGUL KHIEUKH A
	khieukhacirclekorean: {
		n: 'khieukhacirclekorean',
		u: 0x3278,
	},
	// PARENTHESIZED HANGUL KHIEUKH A
	khieukhaparenkorean: {
		n: 'khieukhaparenkorean',
		u: 0x3218,
	},
	// CIRCLED HANGUL KHIEUKH
	khieukhcirclekorean: {
		n: 'khieukhcirclekorean',
		u: 0x326a,
	},
	// HANGUL LETTER KHIEUKH
	khieukhkorean: {
		n: 'khieukhkorean',
		u: 0x314b,
	},
	// PARENTHESIZED HANGUL KHIEUKH
	khieukhparenkorean: {
		n: 'khieukhparenkorean',
		u: 0x320a,
	},
	// THAI CHARACTER KHO KHAI
	khokhaithai: {
		n: 'khokhaithai',
		u: 0x0e02,
	},
	// THAI CHARACTER KHO KHON
	khokhonthai: {
		n: 'khokhonthai',
		u: 0x0e05,
	},
	// THAI CHARACTER KHO KHUAT
	khokhuatthai: {
		n: 'khokhuatthai',
		u: 0x0e03,
	},
	// THAI CHARACTER KHO KHWAI
	khokhwaithai: {
		n: 'khokhwaithai',
		u: 0x0e04,
	},
	// THAI CHARACTER KHOMUT
	khomutthai: {
		n: 'khomutthai',
		u: 0x0e5b,
	},
	// LATIN SMALL LETTER K WITH HOOK
	khook: {
		n: 'khook',
		u: 0x0199,
	},
	// THAI CHARACTER KHO RAKHANG
	khorakhangthai: {
		n: 'khorakhangthai',
		u: 0x0e06,
	},
	// SQUARE KHZ
	khzsquare: {
		n: 'khzsquare',
		u: 0x3391,
	},
	// HIRAGANA LETTER KI
	kihiragana: {
		n: 'kihiragana',
		u: 0x304d,
	},
	// KATAKANA LETTER KI
	kikatakana: {
		n: 'kikatakana',
		u: 0x30ad,
	},
	// HALFWIDTH KATAKANA LETTER KI
	kikatakanahalfwidth: {
		n: 'kikatakanahalfwidth',
		u: 0xff77,
	},
	// SQUARE KIROGURAMU
	kiroguramusquare: {
		n: 'kiroguramusquare',
		u: 0x3315,
	},
	// SQUARE KIROMEETORU
	kiromeetorusquare: {
		n: 'kiromeetorusquare',
		u: 0x3316,
	},
	// SQUARE KIRO
	kirosquare: {
		n: 'kirosquare',
		u: 0x3314,
	},
	// CIRCLED HANGUL KIYEOK A
	kiyeokacirclekorean: {
		n: 'kiyeokacirclekorean',
		u: 0x326e,
	},
	// PARENTHESIZED HANGUL KIYEOK A
	kiyeokaparenkorean: {
		n: 'kiyeokaparenkorean',
		u: 0x320e,
	},
	// CIRCLED HANGUL KIYEOK
	kiyeokcirclekorean: {
		n: 'kiyeokcirclekorean',
		u: 0x3260,
	},
	// HANGUL LETTER KIYEOK
	kiyeokkorean: {
		n: 'kiyeokkorean',
		u: 0x3131,
	},
	// PARENTHESIZED HANGUL KIYEOK
	kiyeokparenkorean: {
		n: 'kiyeokparenkorean',
		u: 0x3200,
	},
	// HANGUL LETTER KIYEOK-SIOS
	kiyeoksioskorean: {
		n: 'kiyeoksioskorean',
		u: 0x3133,
	},
	// CYRILLIC SMALL LETTER KJE
	kjecyrillic: {
		n: 'kjecyrillic',
		u: 0x045c,
	},
	// LATIN SMALL LETTER K WITH LINE BELOW
	klinebelow: {
		n: 'klinebelow',
		u: 0x1e35,
	},
	// SQUARE KL
	klsquare: {
		n: 'klsquare',
		u: 0x3398,
	},
	// SQUARE KM CUBED
	kmcubedsquare: {
		n: 'kmcubedsquare',
		u: 0x33a6,
	},
	// FULLWIDTH LATIN SMALL LETTER K
	kmonospace: {
		n: 'kmonospace',
		u: 0xff4b,
	},
	// SQUARE KM SQUARED
	kmsquaredsquare: {
		n: 'kmsquaredsquare',
		u: 0x33a2,
	},
	// HIRAGANA LETTER KO
	kohiragana: {
		n: 'kohiragana',
		u: 0x3053,
	},
	// SQUARE K OHM
	kohmsquare: {
		n: 'kohmsquare',
		u: 0x33c0,
	},
	// THAI CHARACTER KO KAI
	kokaithai: {
		n: 'kokaithai',
		u: 0x0e01,
	},
	// KATAKANA LETTER KO
	kokatakana: {
		n: 'kokatakana',
		u: 0x30b3,
	},
	// HALFWIDTH KATAKANA LETTER KO
	kokatakanahalfwidth: {
		n: 'kokatakanahalfwidth',
		u: 0xff7a,
	},
	// SQUARE KOOPO
	kooposquare: {
		n: 'kooposquare',
		u: 0x331e,
	},
	// CYRILLIC SMALL LETTER KOPPA
	koppacyrillic: {
		n: 'koppacyrillic',
		u: 0x0481,
	},
	// KOREAN STANDARD SYMBOL
	koreanstandardsymbol: {
		n: 'koreanstandardsymbol',
		u: 0x327f,
	},
	// COMBINING GREEK KORONIS
	koroniscmb: {
		n: 'koroniscmb',
		u: 0x0343,
	},
	// PARENTHESIZED LATIN SMALL LETTER K
	kparen: {
		n: 'kparen',
		u: 0x24a6,
	},
	// SQUARE KPA
	kpasquare: {
		n: 'kpasquare',
		u: 0x33aa,
	},
	// CYRILLIC SMALL LETTER KSI
	ksicyrillic: {
		n: 'ksicyrillic',
		u: 0x046f,
	},
	// SQUARE KT
	ktsquare: {
		n: 'ktsquare',
		u: 0x33cf,
	},
	// LATIN SMALL LETTER TURNED K
	kturned: {
		n: 'kturned',
		u: 0x029e,
	},
	// HIRAGANA LETTER KU
	kuhiragana: {
		n: 'kuhiragana',
		u: 0x304f,
	},
	// KATAKANA LETTER KU
	kukatakana: {
		n: 'kukatakana',
		u: 0x30af,
	},
	// HALFWIDTH KATAKANA LETTER KU
	kukatakanahalfwidth: {
		n: 'kukatakanahalfwidth',
		u: 0xff78,
	},
	// SQUARE KV
	kvsquare: {
		n: 'kvsquare',
		u: 0x33b8,
	},
	// SQUARE KW
	kwsquare: {
		n: 'kwsquare',
		u: 0x33be,
	},
	// LATIN SMALL LETTER L
	l: {
		n: 'l',
		u: 0x006c,
	},
	// BENGALI LETTER LA
	labengali: {
		n: 'labengali',
		u: 0x09b2,
	},
	// LATIN SMALL LETTER L WITH ACUTE
	lacute: {
		n: 'lacute',
		u: 0x013a,
	},
	// DEVANAGARI LETTER LA
	ladeva: {
		n: 'ladeva',
		u: 0x0932,
	},
	// GUJARATI LETTER LA
	lagujarati: {
		n: 'lagujarati',
		u: 0x0ab2,
	},
	// GURMUKHI LETTER LA
	lagurmukhi: {
		n: 'lagurmukhi',
		u: 0x0a32,
	},
	// THAI CHARACTER LAKKHANGYAO
	lakkhangyaothai: {
		n: 'lakkhangyaothai',
		u: 0x0e45,
	},
	// ARABIC LIGATURE LAM WITH ALEF FINAL FORM
	lamaleffinalarabic: {
		n: 'lamaleffinalarabic',
		u: 0xfefc,
	},
	// ARABIC LIGATURE LAM WITH ALEF WITH HAMZA ABOVE FINAL FORM
	lamalefhamzaabovefinalarabic: {
		n: 'lamalefhamzaabovefinalarabic',
		u: 0xfef8,
	},
	// ARABIC LIGATURE LAM WITH ALEF WITH HAMZA ABOVE ISOLATED FORM
	lamalefhamzaaboveisolatedarabic: {
		n: 'lamalefhamzaaboveisolatedarabic',
		u: 0xfef7,
	},
	// ARABIC LIGATURE LAM WITH ALEF WITH HAMZA BELOW FINAL FORM
	lamalefhamzabelowfinalarabic: {
		n: 'lamalefhamzabelowfinalarabic',
		u: 0xfefa,
	},
	// ARABIC LIGATURE LAM WITH ALEF WITH HAMZA BELOW ISOLATED FORM
	lamalefhamzabelowisolatedarabic: {
		n: 'lamalefhamzabelowisolatedarabic',
		u: 0xfef9,
	},
	// ARABIC LIGATURE LAM WITH ALEF ISOLATED FORM
	lamalefisolatedarabic: {
		n: 'lamalefisolatedarabic',
		u: 0xfefb,
	},
	// ARABIC LIGATURE LAM WITH ALEF WITH MADDA ABOVE FINAL FORM
	lamalefmaddaabovefinalarabic: {
		n: 'lamalefmaddaabovefinalarabic',
		u: 0xfef6,
	},
	// ARABIC LIGATURE LAM WITH ALEF WITH MADDA ABOVE ISOLATED FORM
	lamalefmaddaaboveisolatedarabic: {
		n: 'lamalefmaddaaboveisolatedarabic',
		u: 0xfef5,
	},
	// ARABIC LETTER LAM
	lamarabic: {
		n: 'lamarabic',
		u: 0x0644,
	},
	// GREEK SMALL LETTER LAMDA
	lambda: {
		n: 'lambda',
		u: 0x03bb,
	},
	// LATIN SMALL LETTER LAMBDA WITH STROKE
	lambdastroke: {
		n: 'lambdastroke',
		u: 0x019b,
	},
	// HEBREW LETTER LAMED
	lamed: {
		n: 'lamed',
		u: 0x05dc,
	},
	// HEBREW LETTER LAMED WITH DAGESH
	lameddagesh: {
		n: 'lameddagesh',
		u: 0xfb3c,
	},
	// HEBREW LETTER LAMED WITH DAGESH
	lameddageshhebrew: {
		n: 'lameddageshhebrew',
		u: 0xfb3c,
	},
	// HEBREW LETTER LAMED
	lamedhebrew: {
		n: 'lamedhebrew',
		u: 0x05dc,
	},
	// HEBREW LETTER LAMED + HEBREW POINT HOLAM
	lamedholam: {
		n: 'lamedholam',
		u: [0x05dc, 0x05b9],
	},
	// HEBREW LETTER LAMED + HEBREW POINT HOLAM + HEBREW POINT DAGESH OR MAPIQ
	lamedholamdagesh: {
		n: 'lamedholamdagesh',
		u: [0x05dc, 0x05b9, 0x05bc],
	},
	// HEBREW LETTER LAMED + HEBREW POINT HOLAM + HEBREW POINT DAGESH OR MAPIQ
	lamedholamdageshhebrew: {
		n: 'lamedholamdageshhebrew',
		u: [0x05dc, 0x05b9, 0x05bc],
	},
	// HEBREW LETTER LAMED + HEBREW POINT HOLAM
	lamedholamhebrew: {
		n: 'lamedholamhebrew',
		u: [0x05dc, 0x05b9],
	},
	// ARABIC LETTER LAM FINAL FORM
	lamfinalarabic: {
		n: 'lamfinalarabic',
		u: 0xfede,
	},
	// ARABIC LIGATURE LAM WITH HAH INITIAL FORM
	lamhahinitialarabic: {
		n: 'lamhahinitialarabic',
		u: 0xfcca,
	},
	// ARABIC LETTER LAM INITIAL FORM
	laminitialarabic: {
		n: 'laminitialarabic',
		u: 0xfedf,
	},
	// ARABIC LIGATURE LAM WITH JEEM INITIAL FORM
	lamjeeminitialarabic: {
		n: 'lamjeeminitialarabic',
		u: 0xfcc9,
	},
	// ARABIC LIGATURE LAM WITH KHAH INITIAL FORM
	lamkhahinitialarabic: {
		n: 'lamkhahinitialarabic',
		u: 0xfccb,
	},
	// ARABIC LIGATURE ALLAH ISOLATED FORM
	lamlamhehisolatedarabic: {
		n: 'lamlamhehisolatedarabic',
		u: 0xfdf2,
	},
	// ARABIC LETTER LAM MEDIAL FORM
	lammedialarabic: {
		n: 'lammedialarabic',
		u: 0xfee0,
	},
	// ARABIC LIGATURE LAM WITH MEEM WITH HAH INITIAL FORM
	lammeemhahinitialarabic: {
		n: 'lammeemhahinitialarabic',
		u: 0xfd88,
	},
	// ARABIC LIGATURE LAM WITH MEEM INITIAL FORM
	lammeeminitialarabic: {
		n: 'lammeeminitialarabic',
		u: 0xfccc,
	},
	// ARABIC LETTER LAM INITIAL FORM + ARABIC LETTER MEEM MEDIAL FORM + ARABIC LETTER JEEM MEDIAL FORM
	lammeemjeeminitialarabic: {
		n: 'lammeemjeeminitialarabic',
		u: [0xfedf, 0xfee4, 0xfea0],
	},
	// ARABIC LETTER LAM INITIAL FORM + ARABIC LETTER MEEM MEDIAL FORM + ARABIC LETTER KHAH MEDIAL FORM
	lammeemkhahinitialarabic: {
		n: 'lammeemkhahinitialarabic',
		u: [0xfedf, 0xfee4, 0xfea8],
	},
	// LARGE CIRCLE
	largecircle: {
		n: 'largecircle',
		u: 0x25ef,
	},
	// LATIN SMALL LETTER L WITH BAR
	lbar: {
		n: 'lbar',
		u: 0x019a,
	},
	// LATIN SMALL LETTER L WITH BELT
	lbelt: {
		n: 'lbelt',
		u: 0x026c,
	},
	// BOPOMOFO LETTER L
	lbopomofo: {
		n: 'lbopomofo',
		u: 0x310c,
	},
	// LATIN SMALL LETTER L WITH CARON
	lcaron: {
		n: 'lcaron',
		u: 0x013e,
	},
	// LATIN SMALL LETTER L WITH CEDILLA
	lcedilla: {
		n: 'lcedilla',
		u: 0x013c,
	},
	// CIRCLED LATIN SMALL LETTER L
	lcircle: {
		n: 'lcircle',
		u: 0x24db,
	},
	// LATIN SMALL LETTER L WITH CIRCUMFLEX BELOW
	lcircumflexbelow: {
		n: 'lcircumflexbelow',
		u: 0x1e3d,
	},
	// LATIN SMALL LETTER L WITH CEDILLA
	lcommaaccent: {
		n: 'lcommaaccent',
		u: 0x013c,
	},
	// LATIN SMALL LETTER L WITH MIDDLE DOT
	ldot: {
		n: 'ldot',
		u: 0x0140,
	},
	// LATIN SMALL LETTER L WITH MIDDLE DOT
	ldotaccent: {
		n: 'ldotaccent',
		u: 0x0140,
	},
	// LATIN SMALL LETTER L WITH DOT BELOW
	ldotbelow: {
		n: 'ldotbelow',
		u: 0x1e37,
	},
	// LATIN SMALL LETTER L WITH DOT BELOW AND MACRON
	ldotbelowmacron: {
		n: 'ldotbelowmacron',
		u: 0x1e39,
	},
	// COMBINING LEFT ANGLE ABOVE
	leftangleabovecmb: {
		n: 'leftangleabovecmb',
		u: 0x031a,
	},
	// COMBINING LEFT TACK BELOW
	lefttackbelowcmb: {
		n: 'lefttackbelowcmb',
		u: 0x0318,
	},
	// LESS-THAN SIGN
	less: {
		n: 'less',
		u: 0x003c,
	},
	// LESS-THAN OR EQUAL TO
	lessequal: {
		n: 'lessequal',
		u: 0x2264,
	},
	// LESS-THAN EQUAL TO OR GREATER-THAN
	lessequalorgreater: {
		n: 'lessequalorgreater',
		u: 0x22da,
	},
	// FULLWIDTH LESS-THAN SIGN
	lessmonospace: {
		n: 'lessmonospace',
		u: 0xff1c,
	},
	// LESS-THAN OR EQUIVALENT TO
	lessorequivalent: {
		n: 'lessorequivalent',
		u: 0x2272,
	},
	// LESS-THAN OR GREATER-THAN
	lessorgreater: {
		n: 'lessorgreater',
		u: 0x2276,
	},
	// LESS-THAN OVER EQUAL TO
	lessoverequal: {
		n: 'lessoverequal',
		u: 0x2266,
	},
	// SMALL LESS-THAN SIGN
	lesssmall: {
		n: 'lesssmall',
		u: 0xfe64,
		f: [0x003c],
	},
	// LATIN SMALL LETTER LEZH
	lezh: {
		n: 'lezh',
		u: 0x026e,
	},
	// LEFT HALF BLOCK
	lfblock: {
		n: 'lfblock',
		u: 0x258c,
	},
	// LATIN SMALL LETTER L WITH RETROFLEX HOOK
	lhookretroflex: {
		n: 'lhookretroflex',
		u: 0x026d,
	},
	// LIRA SIGN
	lira: {
		n: 'lira',
		u: 0x20a4,
	},
	// ARMENIAN SMALL LETTER LIWN
	liwnarmenian: {
		n: 'liwnarmenian',
		u: 0x056c,
	},
	// LATIN SMALL LETTER LJ
	lj: {
		n: 'lj',
		u: 0x01c9,
	},
	// CYRILLIC SMALL LETTER LJE
	ljecyrillic: {
		n: 'ljecyrillic',
		u: 0x0459,
	},
	// <private-use-F6C0>
	ll: {
		n: 'll',
		u: 0xf6c0,
	},
	// DEVANAGARI LETTER LLA
	lladeva: {
		n: 'lladeva',
		u: 0x0933,
	},
	// GUJARATI LETTER LLA
	llagujarati: {
		n: 'llagujarati',
		u: 0x0ab3,
	},
	// LATIN SMALL LETTER L WITH LINE BELOW
	llinebelow: {
		n: 'llinebelow',
		u: 0x1e3b,
	},
	// DEVANAGARI LETTER LLLA
	llladeva: {
		n: 'llladeva',
		u: 0x0934,
	},
	// BENGALI LETTER VOCALIC LL
	llvocalicbengali: {
		n: 'llvocalicbengali',
		u: 0x09e1,
	},
	// DEVANAGARI LETTER VOCALIC LL
	llvocalicdeva: {
		n: 'llvocalicdeva',
		u: 0x0961,
	},
	// BENGALI VOWEL SIGN VOCALIC LL
	llvocalicvowelsignbengali: {
		n: 'llvocalicvowelsignbengali',
		u: 0x09e3,
	},
	// DEVANAGARI VOWEL SIGN VOCALIC LL
	llvocalicvowelsigndeva: {
		n: 'llvocalicvowelsigndeva',
		u: 0x0963,
	},
	// LATIN SMALL LETTER L WITH MIDDLE TILDE
	lmiddletilde: {
		n: 'lmiddletilde',
		u: 0x026b,
	},
	// FULLWIDTH LATIN SMALL LETTER L
	lmonospace: {
		n: 'lmonospace',
		u: 0xff4c,
	},
	// SQUARE LM
	lmsquare: {
		n: 'lmsquare',
		u: 0x33d0,
	},
	// THAI CHARACTER LO CHULA
	lochulathai: {
		n: 'lochulathai',
		u: 0x0e2c,
	},
	// LOGICAL AND
	logicaland: {
		n: 'logicaland',
		u: 0x2227,
	},
	// NOT SIGN
	logicalnot: {
		n: 'logicalnot',
		u: 0x00ac,
	},
	// REVERSED NOT SIGN
	logicalnotreversed: {
		n: 'logicalnotreversed',
		u: 0x2310,
	},
	// LOGICAL OR
	logicalor: {
		n: 'logicalor',
		u: 0x2228,
	},
	// THAI CHARACTER LO LING
	lolingthai: {
		n: 'lolingthai',
		u: 0x0e25,
	},
	// LATIN SMALL LETTER LONG S
	longs: {
		n: 'longs',
		u: 0x017f,
	},
	// CENTRELINE LOW LINE
	lowlinecenterline: {
		n: 'lowlinecenterline',
		u: 0xfe4e,
	},
	// COMBINING LOW LINE
	lowlinecmb: {
		n: 'lowlinecmb',
		u: 0x0332,
	},
	// DASHED LOW LINE
	lowlinedashed: {
		n: 'lowlinedashed',
		u: 0xfe4d,
	},
	// LOZENGE
	lozenge: {
		n: 'lozenge',
		u: 0x25ca,
	},
	// PARENTHESIZED LATIN SMALL LETTER L
	lparen: {
		n: 'lparen',
		u: 0x24a7,
	},
	// LATIN SMALL LETTER L WITH STROKE
	lslash: {
		n: 'lslash',
		u: 0x0142,
	},
	// SCRIPT SMALL L
	lsquare: {
		n: 'lsquare',
		u: 0x2113,
	},
	// <private-use-F6EE>
	lsuperior: {
		n: 'lsuperior',
		u: 0xf6ee,
	},
	// LIGHT SHADE
	ltshade: {
		n: 'ltshade',
		u: 0x2591,
	},
	// THAI CHARACTER LU
	luthai: {
		n: 'luthai',
		u: 0x0e26,
	},
	// BENGALI LETTER VOCALIC L
	lvocalicbengali: {
		n: 'lvocalicbengali',
		u: 0x098c,
	},
	// DEVANAGARI LETTER VOCALIC L
	lvocalicdeva: {
		n: 'lvocalicdeva',
		u: 0x090c,
	},
	// BENGALI VOWEL SIGN VOCALIC L
	lvocalicvowelsignbengali: {
		n: 'lvocalicvowelsignbengali',
		u: 0x09e2,
	},
	// DEVANAGARI VOWEL SIGN VOCALIC L
	lvocalicvowelsigndeva: {
		n: 'lvocalicvowelsigndeva',
		u: 0x0962,
	},
	// SQUARE LX
	lxsquare: {
		n: 'lxsquare',
		u: 0x33d3,
	},
	// LATIN SMALL LETTER M
	m: {
		n: 'm',
		u: 0x006d,
	},
	// BENGALI LETTER MA
	mabengali: {
		n: 'mabengali',
		u: 0x09ae,
	},
	// MACRON
	macron: {
		n: 'macron',
		u: 0x00af,
	},
	// COMBINING MACRON BELOW
	macronbelowcmb: {
		n: 'macronbelowcmb',
		u: 0x0331,
	},
	// COMBINING MACRON
	macroncmb: {
		n: 'macroncmb',
		u: 0x0304,
	},
	// MODIFIER LETTER LOW MACRON
	macronlowmod: {
		n: 'macronlowmod',
		u: 0x02cd,
	},
	// FULLWIDTH MACRON
	macronmonospace: {
		n: 'macronmonospace',
		u: 0xffe3,
	},
	// LATIN SMALL LETTER M WITH ACUTE
	macute: {
		n: 'macute',
		u: 0x1e3f,
	},
	// DEVANAGARI LETTER MA
	madeva: {
		n: 'madeva',
		u: 0x092e,
	},
	// GUJARATI LETTER MA
	magujarati: {
		n: 'magujarati',
		u: 0x0aae,
	},
	// GURMUKHI LETTER MA
	magurmukhi: {
		n: 'magurmukhi',
		u: 0x0a2e,
	},
	// HEBREW ACCENT MAHAPAKH
	mahapakhhebrew: {
		n: 'mahapakhhebrew',
		u: 0x05a4,
	},
	// HEBREW ACCENT MAHAPAKH
	mahapakhlefthebrew: {
		n: 'mahapakhlefthebrew',
		u: 0x05a4,
	},
	// HIRAGANA LETTER MA
	mahiragana: {
		n: 'mahiragana',
		u: 0x307e,
	},
	// <private-use-F895>
	maichattawalowleftthai: {
		n: 'maichattawalowleftthai',
		u: 0xf895,
	},
	// <private-use-F894>
	maichattawalowrightthai: {
		n: 'maichattawalowrightthai',
		u: 0xf894,
	},
	// THAI CHARACTER MAI CHATTAWA
	maichattawathai: {
		n: 'maichattawathai',
		u: 0x0e4b,
	},
	// <private-use-F893>
	maichattawaupperleftthai: {
		n: 'maichattawaupperleftthai',
		u: 0xf893,
	},
	// <private-use-F88C>
	maieklowleftthai: {
		n: 'maieklowleftthai',
		u: 0xf88c,
	},
	// <private-use-F88B>
	maieklowrightthai: {
		n: 'maieklowrightthai',
		u: 0xf88b,
	},
	// THAI CHARACTER MAI EK
	maiekthai: {
		n: 'maiekthai',
		u: 0x0e48,
	},
	// <private-use-F88A>
	maiekupperleftthai: {
		n: 'maiekupperleftthai',
		u: 0xf88a,
	},
	// <private-use-F884>
	maihanakatleftthai: {
		n: 'maihanakatleftthai',
		u: 0xf884,
	},
	// THAI CHARACTER MAI HAN-AKAT
	maihanakatthai: {
		n: 'maihanakatthai',
		u: 0x0e31,
	},
	// <private-use-F889>
	maitaikhuleftthai: {
		n: 'maitaikhuleftthai',
		u: 0xf889,
	},
	// THAI CHARACTER MAITAIKHU
	maitaikhuthai: {
		n: 'maitaikhuthai',
		u: 0x0e47,
	},
	// <private-use-F88F>
	maitholowleftthai: {
		n: 'maitholowleftthai',
		u: 0xf88f,
	},
	// <private-use-F88E>
	maitholowrightthai: {
		n: 'maitholowrightthai',
		u: 0xf88e,
	},
	// THAI CHARACTER MAI THO
	maithothai: {
		n: 'maithothai',
		u: 0x0e49,
	},
	// <private-use-F88D>
	maithoupperleftthai: {
		n: 'maithoupperleftthai',
		u: 0xf88d,
	},
	// <private-use-F892>
	maitrilowleftthai: {
		n: 'maitrilowleftthai',
		u: 0xf892,
	},
	// <private-use-F891>
	maitrilowrightthai: {
		n: 'maitrilowrightthai',
		u: 0xf891,
	},
	// THAI CHARACTER MAI TRI
	maitrithai: {
		n: 'maitrithai',
		u: 0x0e4a,
	},
	// <private-use-F890>
	maitriupperleftthai: {
		n: 'maitriupperleftthai',
		u: 0xf890,
	},
	// THAI CHARACTER MAIYAMOK
	maiyamokthai: {
		n: 'maiyamokthai',
		u: 0x0e46,
	},
	// KATAKANA LETTER MA
	makatakana: {
		n: 'makatakana',
		u: 0x30de,
	},
	// HALFWIDTH KATAKANA LETTER MA
	makatakanahalfwidth: {
		n: 'makatakanahalfwidth',
		u: 0xff8f,
	},
	// MALE SIGN
	male: {
		n: 'male',
		u: 0x2642,
	},
	// SQUARE MANSYON
	mansyonsquare: {
		n: 'mansyonsquare',
		u: 0x3347,
	},
	// HEBREW PUNCTUATION MAQAF
	maqafhebrew: {
		n: 'maqafhebrew',
		u: 0x05be,
	},
	// MALE SIGN
	mars: {
		n: 'mars',
		u: 0x2642,
	},
	// HEBREW MARK MASORA CIRCLE
	masoracirclehebrew: {
		n: 'masoracirclehebrew',
		u: 0x05af,
	},
	// SQUARE MA
	masquare: {
		n: 'masquare',
		u: 0x3383,
	},
	// BOPOMOFO LETTER M
	mbopomofo: {
		n: 'mbopomofo',
		u: 0x3107,
	},
	// SQUARE MB SMALL
	mbsquare: {
		n: 'mbsquare',
		u: 0x33d4,
	},
	// CIRCLED LATIN SMALL LETTER M
	mcircle: {
		n: 'mcircle',
		u: 0x24dc,
	},
	// SQUARE M CUBED
	mcubedsquare: {
		n: 'mcubedsquare',
		u: 0x33a5,
	},
	// LATIN SMALL LETTER M WITH DOT ABOVE
	mdotaccent: {
		n: 'mdotaccent',
		u: 0x1e41,
	},
	// LATIN SMALL LETTER M WITH DOT BELOW
	mdotbelow: {
		n: 'mdotbelow',
		u: 0x1e43,
	},
	// ARABIC LETTER MEEM
	meemarabic: {
		n: 'meemarabic',
		u: 0x0645,
	},
	// ARABIC LETTER MEEM FINAL FORM
	meemfinalarabic: {
		n: 'meemfinalarabic',
		u: 0xfee2,
	},
	// ARABIC LETTER MEEM INITIAL FORM
	meeminitialarabic: {
		n: 'meeminitialarabic',
		u: 0xfee3,
	},
	// ARABIC LETTER MEEM MEDIAL FORM
	meemmedialarabic: {
		n: 'meemmedialarabic',
		u: 0xfee4,
	},
	// ARABIC LIGATURE MEEM WITH MEEM INITIAL FORM
	meemmeeminitialarabic: {
		n: 'meemmeeminitialarabic',
		u: 0xfcd1,
	},
	// ARABIC LIGATURE MEEM WITH MEEM ISOLATED FORM
	meemmeemisolatedarabic: {
		n: 'meemmeemisolatedarabic',
		u: 0xfc48,
	},
	// SQUARE MEETORU
	meetorusquare: {
		n: 'meetorusquare',
		u: 0x334d,
	},
	// HIRAGANA LETTER ME
	mehiragana: {
		n: 'mehiragana',
		u: 0x3081,
	},
	// SQUARE ERA NAME MEIZI
	meizierasquare: {
		n: 'meizierasquare',
		u: 0x337e,
	},
	// KATAKANA LETTER ME
	mekatakana: {
		n: 'mekatakana',
		u: 0x30e1,
	},
	// HALFWIDTH KATAKANA LETTER ME
	mekatakanahalfwidth: {
		n: 'mekatakanahalfwidth',
		u: 0xff92,
	},
	// HEBREW LETTER MEM
	mem: {
		n: 'mem',
		u: 0x05de,
	},
	// HEBREW LETTER MEM WITH DAGESH
	memdagesh: {
		n: 'memdagesh',
		u: 0xfb3e,
	},
	// HEBREW LETTER MEM WITH DAGESH
	memdageshhebrew: {
		n: 'memdageshhebrew',
		u: 0xfb3e,
	},
	// HEBREW LETTER MEM
	memhebrew: {
		n: 'memhebrew',
		u: 0x05de,
	},
	// ARMENIAN SMALL LETTER MEN
	menarmenian: {
		n: 'menarmenian',
		u: 0x0574,
	},
	// HEBREW ACCENT MERKHA
	merkhahebrew: {
		n: 'merkhahebrew',
		u: 0x05a5,
	},
	// HEBREW ACCENT MERKHA KEFULA
	merkhakefulahebrew: {
		n: 'merkhakefulahebrew',
		u: 0x05a6,
	},
	// HEBREW ACCENT MERKHA KEFULA
	merkhakefulalefthebrew: {
		n: 'merkhakefulalefthebrew',
		u: 0x05a6,
	},
	// HEBREW ACCENT MERKHA
	merkhalefthebrew: {
		n: 'merkhalefthebrew',
		u: 0x05a5,
	},
	// LATIN SMALL LETTER M WITH HOOK
	mhook: {
		n: 'mhook',
		u: 0x0271,
	},
	// SQUARE MHZ
	mhzsquare: {
		n: 'mhzsquare',
		u: 0x3392,
	},
	// HALFWIDTH KATAKANA MIDDLE DOT
	middledotkatakanahalfwidth: {
		n: 'middledotkatakanahalfwidth',
		u: 0xff65,
	},
	// MIDDLE DOT
	middot: {
		n: 'middot',
		u: 0x00b7,
	},
	// CIRCLED HANGUL MIEUM A
	mieumacirclekorean: {
		n: 'mieumacirclekorean',
		u: 0x3272,
	},
	// PARENTHESIZED HANGUL MIEUM A
	mieumaparenkorean: {
		n: 'mieumaparenkorean',
		u: 0x3212,
	},
	// CIRCLED HANGUL MIEUM
	mieumcirclekorean: {
		n: 'mieumcirclekorean',
		u: 0x3264,
	},
	// HANGUL LETTER MIEUM
	mieumkorean: {
		n: 'mieumkorean',
		u: 0x3141,
	},
	// HANGUL LETTER MIEUM-PANSIOS
	mieumpansioskorean: {
		n: 'mieumpansioskorean',
		u: 0x3170,
	},
	// PARENTHESIZED HANGUL MIEUM
	mieumparenkorean: {
		n: 'mieumparenkorean',
		u: 0x3204,
	},
	// HANGUL LETTER MIEUM-PIEUP
	mieumpieupkorean: {
		n: 'mieumpieupkorean',
		u: 0x316e,
	},
	// HANGUL LETTER MIEUM-SIOS
	mieumsioskorean: {
		n: 'mieumsioskorean',
		u: 0x316f,
	},
	// HIRAGANA LETTER MI
	mihiragana: {
		n: 'mihiragana',
		u: 0x307f,
	},
	// KATAKANA LETTER MI
	mikatakana: {
		n: 'mikatakana',
		u: 0x30df,
	},
	// HALFWIDTH KATAKANA LETTER MI
	mikatakanahalfwidth: {
		n: 'mikatakanahalfwidth',
		u: 0xff90,
	},
	// MINUS SIGN
	minus: {
		n: 'minus',
		u: 0x2212,
	},
	// COMBINING MINUS SIGN BELOW
	minusbelowcmb: {
		n: 'minusbelowcmb',
		u: 0x0320,
	},
	// CIRCLED MINUS
	minuscircle: {
		n: 'minuscircle',
		u: 0x2296,
	},
	// MODIFIER LETTER MINUS SIGN
	minusmod: {
		n: 'minusmod',
		u: 0x02d7,
	},
	// MINUS-OR-PLUS SIGN
	minusplus: {
		n: 'minusplus',
		u: 0x2213,
	},
	// PRIME
	minute: {
		n: 'minute',
		u: 0x2032,
	},
	// SQUARE MIRIBAARU
	miribaarusquare: {
		n: 'miribaarusquare',
		u: 0x334a,
	},
	// SQUARE MIRI
	mirisquare: {
		n: 'mirisquare',
		u: 0x3349,
	},
	// LATIN SMALL LETTER TURNED M WITH LONG LEG
	mlonglegturned: {
		n: 'mlonglegturned',
		u: 0x0270,
	},
	// SQUARE ML
	mlsquare: {
		n: 'mlsquare',
		u: 0x3396,
	},
	// SQUARE MM CUBED
	mmcubedsquare: {
		n: 'mmcubedsquare',
		u: 0x33a3,
	},
	// FULLWIDTH LATIN SMALL LETTER M
	mmonospace: {
		n: 'mmonospace',
		u: 0xff4d,
	},
	// SQUARE MM SQUARED
	mmsquaredsquare: {
		n: 'mmsquaredsquare',
		u: 0x339f,
	},
	// HIRAGANA LETTER MO
	mohiragana: {
		n: 'mohiragana',
		u: 0x3082,
	},
	// SQUARE M OHM
	mohmsquare: {
		n: 'mohmsquare',
		u: 0x33c1,
	},
	// KATAKANA LETTER MO
	mokatakana: {
		n: 'mokatakana',
		u: 0x30e2,
	},
	// HALFWIDTH KATAKANA LETTER MO
	mokatakanahalfwidth: {
		n: 'mokatakanahalfwidth',
		u: 0xff93,
	},
	// SQUARE MOL
	molsquare: {
		n: 'molsquare',
		u: 0x33d6,
	},
	// THAI CHARACTER MO MA
	momathai: {
		n: 'momathai',
		u: 0x0e21,
	},
	// SQUARE M OVER S
	moverssquare: {
		n: 'moverssquare',
		u: 0x33a7,
	},
	// SQUARE M OVER S SQUARED
	moverssquaredsquare: {
		n: 'moverssquaredsquare',
		u: 0x33a8,
	},
	// PARENTHESIZED LATIN SMALL LETTER M
	mparen: {
		n: 'mparen',
		u: 0x24a8,
	},
	// SQUARE MPA
	mpasquare: {
		n: 'mpasquare',
		u: 0x33ab,
	},
	// SQUARE MS
	mssquare: {
		n: 'mssquare',
		u: 0x33b3,
	},
	// <private-use-F6EF>
	msuperior: {
		n: 'msuperior',
		u: 0xf6ef,
	},
	// LATIN SMALL LETTER TURNED M
	mturned: {
		n: 'mturned',
		u: 0x026f,
	},
	// MICRO SIGN
	mu: {
		n: 'mu',
		u: 0x00b5,
	},
	// MICRO SIGN
	mu1: {
		n: 'mu1',
		u: 0x00b5,
	},
	// SQUARE MU A
	muasquare: {
		n: 'muasquare',
		u: 0x3382,
	},
	// MUCH GREATER-THAN
	muchgreater: {
		n: 'muchgreater',
		u: 0x226b,
	},
	// MUCH LESS-THAN
	muchless: {
		n: 'muchless',
		u: 0x226a,
	},
	// SQUARE MU F
	mufsquare: {
		n: 'mufsquare',
		u: 0x338c,
	},
	// GREEK SMALL LETTER MU
	mugreek: {
		n: 'mugreek',
		u: 0x03bc,
	},
	// SQUARE MU G
	mugsquare: {
		n: 'mugsquare',
		u: 0x338d,
	},
	// HIRAGANA LETTER MU
	muhiragana: {
		n: 'muhiragana',
		u: 0x3080,
	},
	// KATAKANA LETTER MU
	mukatakana: {
		n: 'mukatakana',
		u: 0x30e0,
	},
	// HALFWIDTH KATAKANA LETTER MU
	mukatakanahalfwidth: {
		n: 'mukatakanahalfwidth',
		u: 0xff91,
	},
	// SQUARE MU L
	mulsquare: {
		n: 'mulsquare',
		u: 0x3395,
	},
	// MULTIPLICATION SIGN
	multiply: {
		n: 'multiply',
		u: 0x00d7,
	},
	// SQUARE MU M
	mumsquare: {
		n: 'mumsquare',
		u: 0x339b,
	},
	// HEBREW ACCENT MUNAH
	munahhebrew: {
		n: 'munahhebrew',
		u: 0x05a3,
	},
	// HEBREW ACCENT MUNAH
	munahlefthebrew: {
		n: 'munahlefthebrew',
		u: 0x05a3,
	},
	// EIGHTH NOTE
	musicalnote: {
		n: 'musicalnote',
		u: 0x266a,
	},
	// BEAMED EIGHTH NOTES
	musicalnotedbl: {
		n: 'musicalnotedbl',
		u: 0x266b,
	},
	// MUSIC FLAT SIGN
	musicflatsign: {
		n: 'musicflatsign',
		u: 0x266d,
	},
	// MUSIC SHARP SIGN
	musicsharpsign: {
		n: 'musicsharpsign',
		u: 0x266f,
	},
	// SQUARE MU S
	mussquare: {
		n: 'mussquare',
		u: 0x33b2,
	},
	// SQUARE MU V
	muvsquare: {
		n: 'muvsquare',
		u: 0x33b6,
	},
	// SQUARE MU W
	muwsquare: {
		n: 'muwsquare',
		u: 0x33bc,
	},
	// SQUARE MV MEGA
	mvmegasquare: {
		n: 'mvmegasquare',
		u: 0x33b9,
	},
	// SQUARE MV
	mvsquare: {
		n: 'mvsquare',
		u: 0x33b7,
	},
	// SQUARE MW MEGA
	mwmegasquare: {
		n: 'mwmegasquare',
		u: 0x33bf,
	},
	// SQUARE MW
	mwsquare: {
		n: 'mwsquare',
		u: 0x33bd,
	},
	// LATIN SMALL LETTER N
	n: {
		n: 'n',
		u: 0x006e,
	},
	// BENGALI LETTER NA
	nabengali: {
		n: 'nabengali',
		u: 0x09a8,
	},
	// NABLA
	nabla: {
		n: 'nabla',
		u: 0x2207,
	},
	// LATIN SMALL LETTER N WITH ACUTE
	nacute: {
		n: 'nacute',
		u: 0x0144,
	},
	// DEVANAGARI LETTER NA
	nadeva: {
		n: 'nadeva',
		u: 0x0928,
	},
	// GUJARATI LETTER NA
	nagujarati: {
		n: 'nagujarati',
		u: 0x0aa8,
	},
	// GURMUKHI LETTER NA
	nagurmukhi: {
		n: 'nagurmukhi',
		u: 0x0a28,
	},
	// HIRAGANA LETTER NA
	nahiragana: {
		n: 'nahiragana',
		u: 0x306a,
	},
	// KATAKANA LETTER NA
	nakatakana: {
		n: 'nakatakana',
		u: 0x30ca,
	},
	// HALFWIDTH KATAKANA LETTER NA
	nakatakanahalfwidth: {
		n: 'nakatakanahalfwidth',
		u: 0xff85,
	},
	// LATIN SMALL LETTER N PRECEDED BY APOSTROPHE
	napostrophe: {
		n: 'napostrophe',
		u: 0x0149,
	},
	// SQUARE NA
	nasquare: {
		n: 'nasquare',
		u: 0x3381,
	},
	// BOPOMOFO LETTER N
	nbopomofo: {
		n: 'nbopomofo',
		u: 0x310b,
	},
	// NO-BREAK SPACE
	nbspace: {
		n: 'nbspace',
		u: 0x00a0,
	},
	// LATIN SMALL LETTER N WITH CARON
	ncaron: {
		n: 'ncaron',
		u: 0x0148,
	},
	// LATIN SMALL LETTER N WITH CEDILLA
	ncedilla: {
		n: 'ncedilla',
		u: 0x0146,
	},
	// CIRCLED LATIN SMALL LETTER N
	ncircle: {
		n: 'ncircle',
		u: 0x24dd,
	},
	// LATIN SMALL LETTER N WITH CIRCUMFLEX BELOW
	ncircumflexbelow: {
		n: 'ncircumflexbelow',
		u: 0x1e4b,
	},
	// LATIN SMALL LETTER N WITH CEDILLA
	ncommaaccent: {
		n: 'ncommaaccent',
		u: 0x0146,
	},
	// LATIN SMALL LETTER N WITH DOT ABOVE
	ndotaccent: {
		n: 'ndotaccent',
		u: 0x1e45,
	},
	// LATIN SMALL LETTER N WITH DOT BELOW
	ndotbelow: {
		n: 'ndotbelow',
		u: 0x1e47,
	},
	// HIRAGANA LETTER NE
	nehiragana: {
		n: 'nehiragana',
		u: 0x306d,
	},
	// KATAKANA LETTER NE
	nekatakana: {
		n: 'nekatakana',
		u: 0x30cd,
	},
	// HALFWIDTH KATAKANA LETTER NE
	nekatakanahalfwidth: {
		n: 'nekatakanahalfwidth',
		u: 0xff88,
	},
	// NEW SHEQEL SIGN
	newsheqelsign: {
		n: 'newsheqelsign',
		u: 0x20aa,
	},
	// SQUARE NF
	nfsquare: {
		n: 'nfsquare',
		u: 0x338b,
	},
	// BENGALI LETTER NGA
	ngabengali: {
		n: 'ngabengali',
		u: 0x0999,
	},
	// DEVANAGARI LETTER NGA
	ngadeva: {
		n: 'ngadeva',
		u: 0x0919,
	},
	// GUJARATI LETTER NGA
	ngagujarati: {
		n: 'ngagujarati',
		u: 0x0a99,
	},
	// GURMUKHI LETTER NGA
	ngagurmukhi: {
		n: 'ngagurmukhi',
		u: 0x0a19,
	},
	// THAI CHARACTER NGO NGU
	ngonguthai: {
		n: 'ngonguthai',
		u: 0x0e07,
	},
	// HIRAGANA LETTER N
	nhiragana: {
		n: 'nhiragana',
		u: 0x3093,
	},
	// LATIN SMALL LETTER N WITH LEFT HOOK
	nhookleft: {
		n: 'nhookleft',
		u: 0x0272,
	},
	// LATIN SMALL LETTER N WITH RETROFLEX HOOK
	nhookretroflex: {
		n: 'nhookretroflex',
		u: 0x0273,
	},
	// CIRCLED HANGUL NIEUN A
	nieunacirclekorean: {
		n: 'nieunacirclekorean',
		u: 0x326f,
	},
	// PARENTHESIZED HANGUL NIEUN A
	nieunaparenkorean: {
		n: 'nieunaparenkorean',
		u: 0x320f,
	},
	// HANGUL LETTER NIEUN-CIEUC
	nieuncieuckorean: {
		n: 'nieuncieuckorean',
		u: 0x3135,
	},
	// CIRCLED HANGUL NIEUN
	nieuncirclekorean: {
		n: 'nieuncirclekorean',
		u: 0x3261,
	},
	// HANGUL LETTER NIEUN-HIEUH
	nieunhieuhkorean: {
		n: 'nieunhieuhkorean',
		u: 0x3136,
	},
	// HANGUL LETTER NIEUN
	nieunkorean: {
		n: 'nieunkorean',
		u: 0x3134,
	},
	// HANGUL LETTER NIEUN-PANSIOS
	nieunpansioskorean: {
		n: 'nieunpansioskorean',
		u: 0x3168,
	},
	// PARENTHESIZED HANGUL NIEUN
	nieunparenkorean: {
		n: 'nieunparenkorean',
		u: 0x3201,
	},
	// HANGUL LETTER NIEUN-SIOS
	nieunsioskorean: {
		n: 'nieunsioskorean',
		u: 0x3167,
	},
	// HANGUL LETTER NIEUN-TIKEUT
	nieuntikeutkorean: {
		n: 'nieuntikeutkorean',
		u: 0x3166,
	},
	// HIRAGANA LETTER NI
	nihiragana: {
		n: 'nihiragana',
		u: 0x306b,
	},
	// KATAKANA LETTER NI
	nikatakana: {
		n: 'nikatakana',
		u: 0x30cb,
	},
	// HALFWIDTH KATAKANA LETTER NI
	nikatakanahalfwidth: {
		n: 'nikatakanahalfwidth',
		u: 0xff86,
	},
	// <private-use-F899>
	nikhahitleftthai: {
		n: 'nikhahitleftthai',
		u: 0xf899,
	},
	// THAI CHARACTER NIKHAHIT
	nikhahitthai: {
		n: 'nikhahitthai',
		u: 0x0e4d,
	},
	// DIGIT NINE
	nine: {
		n: 'nine',
		u: 0x0039,
	},
	// ARABIC-INDIC DIGIT NINE
	ninearabic: {
		n: 'ninearabic',
		u: 0x0669,
	},
	// BENGALI DIGIT NINE
	ninebengali: {
		n: 'ninebengali',
		u: 0x09ef,
	},
	// CIRCLED DIGIT NINE
	ninecircle: {
		n: 'ninecircle',
		u: 0x2468,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT NINE
	ninecircleinversesansserif: {
		n: 'ninecircleinversesansserif',
		u: 0x2792,
	},
	// DEVANAGARI DIGIT NINE
	ninedeva: {
		n: 'ninedeva',
		u: 0x096f,
	},
	// GUJARATI DIGIT NINE
	ninegujarati: {
		n: 'ninegujarati',
		u: 0x0aef,
	},
	// GURMUKHI DIGIT NINE
	ninegurmukhi: {
		n: 'ninegurmukhi',
		u: 0x0a6f,
	},
	// ARABIC-INDIC DIGIT NINE
	ninehackarabic: {
		n: 'ninehackarabic',
		u: 0x0669,
	},
	// HANGZHOU NUMERAL NINE
	ninehangzhou: {
		n: 'ninehangzhou',
		u: 0x3029,
	},
	// PARENTHESIZED IDEOGRAPH NINE
	nineideographicparen: {
		n: 'nineideographicparen',
		u: 0x3228,
	},
	// SUBSCRIPT NINE
	nineinferior: {
		n: 'nineinferior',
		u: 0x2089,
	},
	// FULLWIDTH DIGIT NINE
	ninemonospace: {
		n: 'ninemonospace',
		u: 0xff19,
	},
	// <private-use-F739>
	nineoldstyle: {
		n: 'nineoldstyle',
		u: 0xf739,
	},
	// PARENTHESIZED DIGIT NINE
	nineparen: {
		n: 'nineparen',
		u: 0x247c,
	},
	// DIGIT NINE FULL STOP
	nineperiod: {
		n: 'nineperiod',
		u: 0x2490,
	},
	// EXTENDED ARABIC-INDIC DIGIT NINE
	ninepersian: {
		n: 'ninepersian',
		u: 0x06f9,
	},
	// SMALL ROMAN NUMERAL NINE
	nineroman: {
		n: 'nineroman',
		u: 0x2178,
	},
	// SUPERSCRIPT NINE
	ninesuperior: {
		n: 'ninesuperior',
		u: 0x2079,
	},
	// CIRCLED NUMBER NINETEEN
	nineteencircle: {
		n: 'nineteencircle',
		u: 0x2472,
	},
	// PARENTHESIZED NUMBER NINETEEN
	nineteenparen: {
		n: 'nineteenparen',
		u: 0x2486,
	},
	// NUMBER NINETEEN FULL STOP
	nineteenperiod: {
		n: 'nineteenperiod',
		u: 0x249a,
	},
	// THAI DIGIT NINE
	ninethai: {
		n: 'ninethai',
		u: 0x0e59,
	},
	// LATIN SMALL LETTER NJ
	nj: {
		n: 'nj',
		u: 0x01cc,
	},
	// CYRILLIC SMALL LETTER NJE
	njecyrillic: {
		n: 'njecyrillic',
		u: 0x045a,
	},
	// KATAKANA LETTER N
	nkatakana: {
		n: 'nkatakana',
		u: 0x30f3,
	},
	// HALFWIDTH KATAKANA LETTER N
	nkatakanahalfwidth: {
		n: 'nkatakanahalfwidth',
		u: 0xff9d,
	},
	// LATIN SMALL LETTER N WITH LONG RIGHT LEG
	nlegrightlong: {
		n: 'nlegrightlong',
		u: 0x019e,
	},
	// LATIN SMALL LETTER N WITH LINE BELOW
	nlinebelow: {
		n: 'nlinebelow',
		u: 0x1e49,
	},
	// FULLWIDTH LATIN SMALL LETTER N
	nmonospace: {
		n: 'nmonospace',
		u: 0xff4e,
	},
	// SQUARE NM
	nmsquare: {
		n: 'nmsquare',
		u: 0x339a,
	},
	// BENGALI LETTER NNA
	nnabengali: {
		n: 'nnabengali',
		u: 0x09a3,
	},
	// DEVANAGARI LETTER NNA
	nnadeva: {
		n: 'nnadeva',
		u: 0x0923,
	},
	// GUJARATI LETTER NNA
	nnagujarati: {
		n: 'nnagujarati',
		u: 0x0aa3,
	},
	// GURMUKHI LETTER NNA
	nnagurmukhi: {
		n: 'nnagurmukhi',
		u: 0x0a23,
	},
	// DEVANAGARI LETTER NNNA
	nnnadeva: {
		n: 'nnnadeva',
		u: 0x0929,
	},
	// HIRAGANA LETTER NO
	nohiragana: {
		n: 'nohiragana',
		u: 0x306e,
	},
	// KATAKANA LETTER NO
	nokatakana: {
		n: 'nokatakana',
		u: 0x30ce,
	},
	// HALFWIDTH KATAKANA LETTER NO
	nokatakanahalfwidth: {
		n: 'nokatakanahalfwidth',
		u: 0xff89,
	},
	// NO-BREAK SPACE
	nonbreakingspace: {
		n: 'nonbreakingspace',
		u: 0x00a0,
	},
	// THAI CHARACTER NO NEN
	nonenthai: {
		n: 'nonenthai',
		u: 0x0e13,
	},
	// THAI CHARACTER NO NU
	nonuthai: {
		n: 'nonuthai',
		u: 0x0e19,
	},
	// ARABIC LETTER NOON
	noonarabic: {
		n: 'noonarabic',
		u: 0x0646,
	},
	// ARABIC LETTER NOON FINAL FORM
	noonfinalarabic: {
		n: 'noonfinalarabic',
		u: 0xfee6,
	},
	// ARABIC LETTER NOON GHUNNA
	noonghunnaarabic: {
		n: 'noonghunnaarabic',
		u: 0x06ba,
	},
	// ARABIC LETTER NOON GHUNNA FINAL FORM
	noonghunnafinalarabic: {
		n: 'noonghunnafinalarabic',
		u: 0xfb9f,
	},
	// ARABIC LETTER NOON INITIAL FORM + ARABIC LETTER HEH MEDIAL FORM
	noonhehinitialarabic: {
		n: 'noonhehinitialarabic',
		u: [0xfee7, 0xfeec],
	},
	// ARABIC LETTER NOON INITIAL FORM
	nooninitialarabic: {
		n: 'nooninitialarabic',
		u: 0xfee7,
	},
	// ARABIC LIGATURE NOON WITH JEEM INITIAL FORM
	noonjeeminitialarabic: {
		n: 'noonjeeminitialarabic',
		u: 0xfcd2,
	},
	// ARABIC LIGATURE NOON WITH JEEM ISOLATED FORM
	noonjeemisolatedarabic: {
		n: 'noonjeemisolatedarabic',
		u: 0xfc4b,
	},
	// ARABIC LETTER NOON MEDIAL FORM
	noonmedialarabic: {
		n: 'noonmedialarabic',
		u: 0xfee8,
	},
	// ARABIC LIGATURE NOON WITH MEEM INITIAL FORM
	noonmeeminitialarabic: {
		n: 'noonmeeminitialarabic',
		u: 0xfcd5,
	},
	// ARABIC LIGATURE NOON WITH MEEM ISOLATED FORM
	noonmeemisolatedarabic: {
		n: 'noonmeemisolatedarabic',
		u: 0xfc4e,
	},
	// ARABIC LIGATURE NOON WITH NOON FINAL FORM
	noonnoonfinalarabic: {
		n: 'noonnoonfinalarabic',
		u: 0xfc8d,
	},
	// DOES NOT CONTAIN AS MEMBER
	notcontains: {
		n: 'notcontains',
		u: 0x220c,
	},
	// NOT AN ELEMENT OF
	notelement: {
		n: 'notelement',
		u: 0x2209,
	},
	// NOT AN ELEMENT OF
	notelementof: {
		n: 'notelementof',
		u: 0x2209,
	},
	// NOT EQUAL TO
	notequal: {
		n: 'notequal',
		u: 0x2260,
	},
	// NOT GREATER-THAN
	notgreater: {
		n: 'notgreater',
		u: 0x226f,
	},
	// NEITHER GREATER-THAN NOR EQUAL TO
	notgreaternorequal: {
		n: 'notgreaternorequal',
		u: 0x2271,
	},
	// NEITHER GREATER-THAN NOR LESS-THAN
	notgreaternorless: {
		n: 'notgreaternorless',
		u: 0x2279,
	},
	// NOT IDENTICAL TO
	notidentical: {
		n: 'notidentical',
		u: 0x2262,
	},
	// NOT LESS-THAN
	notless: {
		n: 'notless',
		u: 0x226e,
	},
	// NEITHER LESS-THAN NOR EQUAL TO
	notlessnorequal: {
		n: 'notlessnorequal',
		u: 0x2270,
	},
	// NOT PARALLEL TO
	notparallel: {
		n: 'notparallel',
		u: 0x2226,
	},
	// DOES NOT PRECEDE
	notprecedes: {
		n: 'notprecedes',
		u: 0x2280,
	},
	// NOT A SUBSET OF
	notsubset: {
		n: 'notsubset',
		u: 0x2284,
	},
	// DOES NOT SUCCEED
	notsucceeds: {
		n: 'notsucceeds',
		u: 0x2281,
	},
	// NOT A SUPERSET OF
	notsuperset: {
		n: 'notsuperset',
		u: 0x2285,
	},
	// ARMENIAN SMALL LETTER NOW
	nowarmenian: {
		n: 'nowarmenian',
		u: 0x0576,
	},
	// PARENTHESIZED LATIN SMALL LETTER N
	nparen: {
		n: 'nparen',
		u: 0x24a9,
	},
	// SQUARE NS
	nssquare: {
		n: 'nssquare',
		u: 0x33b1,
	},
	// SUPERSCRIPT LATIN SMALL LETTER N
	nsuperior: {
		n: 'nsuperior',
		u: 0x207f,
	},
	// LATIN SMALL LETTER N WITH TILDE
	ntilde: {
		n: 'ntilde',
		u: 0x00f1,
	},
	// GREEK SMALL LETTER NU
	nu: {
		n: 'nu',
		u: 0x03bd,
	},
	// HIRAGANA LETTER NU
	nuhiragana: {
		n: 'nuhiragana',
		u: 0x306c,
	},
	// KATAKANA LETTER NU
	nukatakana: {
		n: 'nukatakana',
		u: 0x30cc,
	},
	// HALFWIDTH KATAKANA LETTER NU
	nukatakanahalfwidth: {
		n: 'nukatakanahalfwidth',
		u: 0xff87,
	},
	// BENGALI SIGN NUKTA
	nuktabengali: {
		n: 'nuktabengali',
		u: 0x09bc,
	},
	// DEVANAGARI SIGN NUKTA
	nuktadeva: {
		n: 'nuktadeva',
		u: 0x093c,
	},
	// GUJARATI SIGN NUKTA
	nuktagujarati: {
		n: 'nuktagujarati',
		u: 0x0abc,
	},
	// GURMUKHI SIGN NUKTA
	nuktagurmukhi: {
		n: 'nuktagurmukhi',
		u: 0x0a3c,
	},
	// NUMBER SIGN
	numbersign: {
		n: 'numbersign',
		u: 0x0023,
	},
	// FULLWIDTH NUMBER SIGN
	numbersignmonospace: {
		n: 'numbersignmonospace',
		u: 0xff03,
	},
	// SMALL NUMBER SIGN
	numbersignsmall: {
		n: 'numbersignsmall',
		u: 0xfe5f,
		f: [0x0023],
	},
	// GREEK NUMERAL SIGN
	numeralsigngreek: {
		n: 'numeralsigngreek',
		u: 0x0374,
	},
	// GREEK LOWER NUMERAL SIGN
	numeralsignlowergreek: {
		n: 'numeralsignlowergreek',
		u: 0x0375,
	},
	// NUMERO SIGN
	numero: {
		n: 'numero',
		u: 0x2116,
	},
	// HEBREW LETTER NUN
	nun: {
		n: 'nun',
		u: 0x05e0,
	},
	// HEBREW LETTER NUN WITH DAGESH
	nundagesh: {
		n: 'nundagesh',
		u: 0xfb40,
	},
	// HEBREW LETTER NUN WITH DAGESH
	nundageshhebrew: {
		n: 'nundageshhebrew',
		u: 0xfb40,
	},
	// HEBREW LETTER NUN
	nunhebrew: {
		n: 'nunhebrew',
		u: 0x05e0,
	},
	// SQUARE NV
	nvsquare: {
		n: 'nvsquare',
		u: 0x33b5,
	},
	// SQUARE NW
	nwsquare: {
		n: 'nwsquare',
		u: 0x33bb,
	},
	// BENGALI LETTER NYA
	nyabengali: {
		n: 'nyabengali',
		u: 0x099e,
	},
	// DEVANAGARI LETTER NYA
	nyadeva: {
		n: 'nyadeva',
		u: 0x091e,
	},
	// GUJARATI LETTER NYA
	nyagujarati: {
		n: 'nyagujarati',
		u: 0x0a9e,
	},
	// GURMUKHI LETTER NYA
	nyagurmukhi: {
		n: 'nyagurmukhi',
		u: 0x0a1e,
	},
	// LATIN SMALL LETTER O
	o: {
		n: 'o',
		u: 0x006f,
	},
	// LATIN SMALL LETTER O WITH ACUTE
	oacute: {
		n: 'oacute',
		u: 0x00f3,
	},
	// THAI CHARACTER O ANG
	oangthai: {
		n: 'oangthai',
		u: 0x0e2d,
	},
	// LATIN SMALL LETTER BARRED O
	obarred: {
		n: 'obarred',
		u: 0x0275,
	},
	// CYRILLIC SMALL LETTER BARRED O
	obarredcyrillic: {
		n: 'obarredcyrillic',
		u: 0x04e9,
	},
	// CYRILLIC SMALL LETTER BARRED O WITH DIAERESIS
	obarreddieresiscyrillic: {
		n: 'obarreddieresiscyrillic',
		u: 0x04eb,
	},
	// BENGALI LETTER O
	obengali: {
		n: 'obengali',
		u: 0x0993,
	},
	// BOPOMOFO LETTER O
	obopomofo: {
		n: 'obopomofo',
		u: 0x311b,
	},
	// LATIN SMALL LETTER O WITH BREVE
	obreve: {
		n: 'obreve',
		u: 0x014f,
	},
	// DEVANAGARI LETTER CANDRA O
	ocandradeva: {
		n: 'ocandradeva',
		u: 0x0911,
	},
	// GUJARATI VOWEL CANDRA O
	ocandragujarati: {
		n: 'ocandragujarati',
		u: 0x0a91,
	},
	// DEVANAGARI VOWEL SIGN CANDRA O
	ocandravowelsigndeva: {
		n: 'ocandravowelsigndeva',
		u: 0x0949,
	},
	// GUJARATI VOWEL SIGN CANDRA O
	ocandravowelsigngujarati: {
		n: 'ocandravowelsigngujarati',
		u: 0x0ac9,
	},
	// LATIN SMALL LETTER O WITH CARON
	ocaron: {
		n: 'ocaron',
		u: 0x01d2,
	},
	// CIRCLED LATIN SMALL LETTER O
	ocircle: {
		n: 'ocircle',
		u: 0x24de,
	},
	// LATIN SMALL LETTER O WITH CIRCUMFLEX
	ocircumflex: {
		n: 'ocircumflex',
		u: 0x00f4,
	},
	// LATIN SMALL LETTER O WITH CIRCUMFLEX AND ACUTE
	ocircumflexacute: {
		n: 'ocircumflexacute',
		u: 0x1ed1,
	},
	// LATIN SMALL LETTER O WITH CIRCUMFLEX AND DOT BELOW
	ocircumflexdotbelow: {
		n: 'ocircumflexdotbelow',
		u: 0x1ed9,
	},
	// LATIN SMALL LETTER O WITH CIRCUMFLEX AND GRAVE
	ocircumflexgrave: {
		n: 'ocircumflexgrave',
		u: 0x1ed3,
	},
	// LATIN SMALL LETTER O WITH CIRCUMFLEX AND HOOK ABOVE
	ocircumflexhookabove: {
		n: 'ocircumflexhookabove',
		u: 0x1ed5,
	},
	// LATIN SMALL LETTER O WITH CIRCUMFLEX AND TILDE
	ocircumflextilde: {
		n: 'ocircumflextilde',
		u: 0x1ed7,
	},
	// CYRILLIC SMALL LETTER O
	ocyrillic: {
		n: 'ocyrillic',
		u: 0x043e,
	},
	// LATIN SMALL LETTER O WITH DOUBLE ACUTE
	odblacute: {
		n: 'odblacute',
		u: 0x0151,
	},
	// LATIN SMALL LETTER O WITH DOUBLE GRAVE
	odblgrave: {
		n: 'odblgrave',
		u: 0x020d,
	},
	// DEVANAGARI LETTER O
	odeva: {
		n: 'odeva',
		u: 0x0913,
	},
	// LATIN SMALL LETTER O WITH DIAERESIS
	odieresis: {
		n: 'odieresis',
		u: 0x00f6,
	},
	// CYRILLIC SMALL LETTER O WITH DIAERESIS
	odieresiscyrillic: {
		n: 'odieresiscyrillic',
		u: 0x04e7,
	},
	// LATIN SMALL LETTER O WITH DOT BELOW
	odotbelow: {
		n: 'odotbelow',
		u: 0x1ecd,
	},
	// LATIN SMALL LIGATURE OE
	oe: {
		n: 'oe',
		u: 0x0153,
	},
	// HANGUL LETTER OE
	oekorean: {
		n: 'oekorean',
		u: 0x315a,
	},
	// OGONEK
	ogonek: {
		n: 'ogonek',
		u: 0x02db,
	},
	// COMBINING OGONEK
	ogonekcmb: {
		n: 'ogonekcmb',
		u: 0x0328,
	},
	// LATIN SMALL LETTER O WITH GRAVE
	ograve: {
		n: 'ograve',
		u: 0x00f2,
	},
	// GUJARATI LETTER O
	ogujarati: {
		n: 'ogujarati',
		u: 0x0a93,
	},
	// ARMENIAN SMALL LETTER OH
	oharmenian: {
		n: 'oharmenian',
		u: 0x0585,
	},
	// HIRAGANA LETTER O
	ohiragana: {
		n: 'ohiragana',
		u: 0x304a,
	},
	// LATIN SMALL LETTER O WITH HOOK ABOVE
	ohookabove: {
		n: 'ohookabove',
		u: 0x1ecf,
	},
	// LATIN SMALL LETTER O WITH HORN
	ohorn: {
		n: 'ohorn',
		u: 0x01a1,
	},
	// LATIN SMALL LETTER O WITH HORN AND ACUTE
	ohornacute: {
		n: 'ohornacute',
		u: 0x1edb,
	},
	// LATIN SMALL LETTER O WITH HORN AND DOT BELOW
	ohorndotbelow: {
		n: 'ohorndotbelow',
		u: 0x1ee3,
	},
	// LATIN SMALL LETTER O WITH HORN AND GRAVE
	ohorngrave: {
		n: 'ohorngrave',
		u: 0x1edd,
	},
	// LATIN SMALL LETTER O WITH HORN AND HOOK ABOVE
	ohornhookabove: {
		n: 'ohornhookabove',
		u: 0x1edf,
	},
	// LATIN SMALL LETTER O WITH HORN AND TILDE
	ohorntilde: {
		n: 'ohorntilde',
		u: 0x1ee1,
	},
	// LATIN SMALL LETTER O WITH DOUBLE ACUTE
	ohungarumlaut: {
		n: 'ohungarumlaut',
		u: 0x0151,
	},
	// LATIN SMALL LETTER GHA
	oi: {
		n: 'oi',
		u: 0x01a3,
	},
	// LATIN SMALL LETTER O WITH INVERTED BREVE
	oinvertedbreve: {
		n: 'oinvertedbreve',
		u: 0x020f,
	},
	// KATAKANA LETTER O
	okatakana: {
		n: 'okatakana',
		u: 0x30aa,
	},
	// HALFWIDTH KATAKANA LETTER O
	okatakanahalfwidth: {
		n: 'okatakanahalfwidth',
		u: 0xff75,
	},
	// HANGUL LETTER O
	okorean: {
		n: 'okorean',
		u: 0x3157,
	},
	// HEBREW ACCENT OLE
	olehebrew: {
		n: 'olehebrew',
		u: 0x05ab,
	},
	// LATIN SMALL LETTER O WITH MACRON
	omacron: {
		n: 'omacron',
		u: 0x014d,
	},
	// LATIN SMALL LETTER O WITH MACRON AND ACUTE
	omacronacute: {
		n: 'omacronacute',
		u: 0x1e53,
	},
	// LATIN SMALL LETTER O WITH MACRON AND GRAVE
	omacrongrave: {
		n: 'omacrongrave',
		u: 0x1e51,
	},
	// DEVANAGARI OM
	omdeva: {
		n: 'omdeva',
		u: 0x0950,
	},
	// GREEK SMALL LETTER OMEGA
	omega: {
		n: 'omega',
		u: 0x03c9,
	},
	// GREEK PI SYMBOL
	omega1: {
		n: 'omega1',
		u: 0x03d6,
	},
	// CYRILLIC SMALL LETTER OMEGA
	omegacyrillic: {
		n: 'omegacyrillic',
		u: 0x0461,
	},
	// LATIN SMALL LETTER CLOSED OMEGA
	omegalatinclosed: {
		n: 'omegalatinclosed',
		u: 0x0277,
	},
	// CYRILLIC SMALL LETTER ROUND OMEGA
	omegaroundcyrillic: {
		n: 'omegaroundcyrillic',
		u: 0x047b,
	},
	// CYRILLIC SMALL LETTER OMEGA WITH TITLO
	omegatitlocyrillic: {
		n: 'omegatitlocyrillic',
		u: 0x047d,
	},
	// GREEK SMALL LETTER OMEGA WITH TONOS
	omegatonos: {
		n: 'omegatonos',
		u: 0x03ce,
	},
	// GUJARATI OM
	omgujarati: {
		n: 'omgujarati',
		u: 0x0ad0,
	},
	// GREEK SMALL LETTER OMICRON
	omicron: {
		n: 'omicron',
		u: 0x03bf,
	},
	// GREEK SMALL LETTER OMICRON WITH TONOS
	omicrontonos: {
		n: 'omicrontonos',
		u: 0x03cc,
	},
	// FULLWIDTH LATIN SMALL LETTER O
	omonospace: {
		n: 'omonospace',
		u: 0xff4f,
	},
	// DIGIT ONE
	one: {
		n: 'one',
		u: 0x0031,
	},
	// ARABIC-INDIC DIGIT ONE
	onearabic: {
		n: 'onearabic',
		u: 0x0661,
	},
	// BENGALI DIGIT ONE
	onebengali: {
		n: 'onebengali',
		u: 0x09e7,
	},
	// CIRCLED DIGIT ONE
	onecircle: {
		n: 'onecircle',
		u: 0x2460,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT ONE
	onecircleinversesansserif: {
		n: 'onecircleinversesansserif',
		u: 0x278a,
	},
	// DEVANAGARI DIGIT ONE
	onedeva: {
		n: 'onedeva',
		u: 0x0967,
	},
	// ONE DOT LEADER
	onedotenleader: {
		n: 'onedotenleader',
		u: 0x2024,
	},
	// VULGAR FRACTION ONE EIGHTH
	oneeighth: {
		n: 'oneeighth',
		u: 0x215b,
	},
	// <private-use-F6DC>
	onefitted: {
		n: 'onefitted',
		u: 0xf6dc,
	},
	// GUJARATI DIGIT ONE
	onegujarati: {
		n: 'onegujarati',
		u: 0x0ae7,
	},
	// GURMUKHI DIGIT ONE
	onegurmukhi: {
		n: 'onegurmukhi',
		u: 0x0a67,
	},
	// ARABIC-INDIC DIGIT ONE
	onehackarabic: {
		n: 'onehackarabic',
		u: 0x0661,
	},
	// VULGAR FRACTION ONE HALF
	onehalf: {
		n: 'onehalf',
		u: 0x00bd,
	},
	// HANGZHOU NUMERAL ONE
	onehangzhou: {
		n: 'onehangzhou',
		u: 0x3021,
	},
	// PARENTHESIZED IDEOGRAPH ONE
	oneideographicparen: {
		n: 'oneideographicparen',
		u: 0x3220,
	},
	// SUBSCRIPT ONE
	oneinferior: {
		n: 'oneinferior',
		u: 0x2081,
	},
	// FULLWIDTH DIGIT ONE
	onemonospace: {
		n: 'onemonospace',
		u: 0xff11,
	},
	// BENGALI CURRENCY NUMERATOR ONE
	onenumeratorbengali: {
		n: 'onenumeratorbengali',
		u: 0x09f4,
	},
	// <private-use-F731>
	oneoldstyle: {
		n: 'oneoldstyle',
		u: 0xf731,
	},
	// PARENTHESIZED DIGIT ONE
	oneparen: {
		n: 'oneparen',
		u: 0x2474,
	},
	// DIGIT ONE FULL STOP
	oneperiod: {
		n: 'oneperiod',
		u: 0x2488,
	},
	// EXTENDED ARABIC-INDIC DIGIT ONE
	onepersian: {
		n: 'onepersian',
		u: 0x06f1,
	},
	// VULGAR FRACTION ONE QUARTER
	onequarter: {
		n: 'onequarter',
		u: 0x00bc,
	},
	// SMALL ROMAN NUMERAL ONE
	oneroman: {
		n: 'oneroman',
		u: 0x2170,
	},
	// SUPERSCRIPT ONE
	onesuperior: {
		n: 'onesuperior',
		u: 0x00b9,
	},
	// THAI DIGIT ONE
	onethai: {
		n: 'onethai',
		u: 0x0e51,
	},
	// VULGAR FRACTION ONE THIRD
	onethird: {
		n: 'onethird',
		u: 0x2153,
	},
	// LATIN SMALL LETTER O WITH OGONEK
	oogonek: {
		n: 'oogonek',
		u: 0x01eb,
	},
	// LATIN SMALL LETTER O WITH OGONEK AND MACRON
	oogonekmacron: {
		n: 'oogonekmacron',
		u: 0x01ed,
	},
	// GURMUKHI LETTER OO
	oogurmukhi: {
		n: 'oogurmukhi',
		u: 0x0a13,
	},
	// GURMUKHI VOWEL SIGN OO
	oomatragurmukhi: {
		n: 'oomatragurmukhi',
		u: 0x0a4b,
	},
	// LATIN SMALL LETTER OPEN O
	oopen: {
		n: 'oopen',
		u: 0x0254,
	},
	// PARENTHESIZED LATIN SMALL LETTER O
	oparen: {
		n: 'oparen',
		u: 0x24aa,
	},
	// WHITE BULLET
	openbullet: {
		n: 'openbullet',
		u: 0x25e6,
	},
	// OPTION KEY
	option: {
		n: 'option',
		u: 0x2325,
	},
	// FEMININE ORDINAL INDICATOR
	ordfeminine: {
		n: 'ordfeminine',
		u: 0x00aa,
	},
	// MASCULINE ORDINAL INDICATOR
	ordmasculine: {
		n: 'ordmasculine',
		u: 0x00ba,
	},
	// RIGHT ANGLE
	orthogonal: {
		n: 'orthogonal',
		u: 0x221f,
	},
	// DEVANAGARI LETTER SHORT O
	oshortdeva: {
		n: 'oshortdeva',
		u: 0x0912,
	},
	// DEVANAGARI VOWEL SIGN SHORT O
	oshortvowelsigndeva: {
		n: 'oshortvowelsigndeva',
		u: 0x094a,
	},
	// LATIN SMALL LETTER O WITH STROKE
	oslash: {
		n: 'oslash',
		u: 0x00f8,
	},
	// LATIN SMALL LETTER O WITH STROKE AND ACUTE
	oslashacute: {
		n: 'oslashacute',
		u: 0x01ff,
	},
	// HIRAGANA LETTER SMALL O
	osmallhiragana: {
		n: 'osmallhiragana',
		u: 0x3049,
	},
	// KATAKANA LETTER SMALL O
	osmallkatakana: {
		n: 'osmallkatakana',
		u: 0x30a9,
	},
	// HALFWIDTH KATAKANA LETTER SMALL O
	osmallkatakanahalfwidth: {
		n: 'osmallkatakanahalfwidth',
		u: 0xff6b,
	},
	// LATIN SMALL LETTER O WITH STROKE AND ACUTE
	ostrokeacute: {
		n: 'ostrokeacute',
		u: 0x01ff,
	},
	// <private-use-F6F0>
	osuperior: {
		n: 'osuperior',
		u: 0xf6f0,
	},
	// CYRILLIC SMALL LETTER OT
	otcyrillic: {
		n: 'otcyrillic',
		u: 0x047f,
	},
	// LATIN SMALL LETTER O WITH TILDE
	otilde: {
		n: 'otilde',
		u: 0x00f5,
	},
	// LATIN SMALL LETTER O WITH TILDE AND ACUTE
	otildeacute: {
		n: 'otildeacute',
		u: 0x1e4d,
	},
	// LATIN SMALL LETTER O WITH TILDE AND DIAERESIS
	otildedieresis: {
		n: 'otildedieresis',
		u: 0x1e4f,
	},
	// BOPOMOFO LETTER OU
	oubopomofo: {
		n: 'oubopomofo',
		u: 0x3121,
	},
	// OVERLINE
	overline: {
		n: 'overline',
		u: 0x203e,
	},
	// CENTRELINE OVERLINE
	overlinecenterline: {
		n: 'overlinecenterline',
		u: 0xfe4a,
	},
	// COMBINING OVERLINE
	overlinecmb: {
		n: 'overlinecmb',
		u: 0x0305,
	},
	// DASHED OVERLINE
	overlinedashed: {
		n: 'overlinedashed',
		u: 0xfe49,
	},
	// DOUBLE WAVY OVERLINE
	overlinedblwavy: {
		n: 'overlinedblwavy',
		u: 0xfe4c,
	},
	// WAVY OVERLINE
	overlinewavy: {
		n: 'overlinewavy',
		u: 0xfe4b,
	},
	// MACRON
	overscore: {
		n: 'overscore',
		u: 0x00af,
	},
	// BENGALI VOWEL SIGN O
	ovowelsignbengali: {
		n: 'ovowelsignbengali',
		u: 0x09cb,
	},
	// DEVANAGARI VOWEL SIGN O
	ovowelsigndeva: {
		n: 'ovowelsigndeva',
		u: 0x094b,
	},
	// GUJARATI VOWEL SIGN O
	ovowelsigngujarati: {
		n: 'ovowelsigngujarati',
		u: 0x0acb,
	},
	// LATIN SMALL LETTER P
	p: {
		n: 'p',
		u: 0x0070,
	},
	// SQUARE PA AMPS
	paampssquare: {
		n: 'paampssquare',
		u: 0x3380,
	},
	// SQUARE PAASENTO
	paasentosquare: {
		n: 'paasentosquare',
		u: 0x332b,
	},
	// BENGALI LETTER PA
	pabengali: {
		n: 'pabengali',
		u: 0x09aa,
	},
	// LATIN SMALL LETTER P WITH ACUTE
	pacute: {
		n: 'pacute',
		u: 0x1e55,
	},
	// DEVANAGARI LETTER PA
	padeva: {
		n: 'padeva',
		u: 0x092a,
	},
	// DOWNWARDS ARROW WITH DOUBLE STROKE
	pagedown: {
		n: 'pagedown',
		u: 0x21df,
	},
	// UPWARDS ARROW WITH DOUBLE STROKE
	pageup: {
		n: 'pageup',
		u: 0x21de,
	},
	// GUJARATI LETTER PA
	pagujarati: {
		n: 'pagujarati',
		u: 0x0aaa,
	},
	// GURMUKHI LETTER PA
	pagurmukhi: {
		n: 'pagurmukhi',
		u: 0x0a2a,
	},
	// HIRAGANA LETTER PA
	pahiragana: {
		n: 'pahiragana',
		u: 0x3071,
	},
	// THAI CHARACTER PAIYANNOI
	paiyannoithai: {
		n: 'paiyannoithai',
		u: 0x0e2f,
	},
	// KATAKANA LETTER PA
	pakatakana: {
		n: 'pakatakana',
		u: 0x30d1,
	},
	// COMBINING CYRILLIC PALATALIZATION
	palatalizationcyrilliccmb: {
		n: 'palatalizationcyrilliccmb',
		u: 0x0484,
	},
	// CYRILLIC LETTER PALOCHKA
	palochkacyrillic: {
		n: 'palochkacyrillic',
		u: 0x04c0,
	},
	// HANGUL LETTER PANSIOS
	pansioskorean: {
		n: 'pansioskorean',
		u: 0x317f,
	},
	// PILCROW SIGN
	paragraph: {
		n: 'paragraph',
		u: 0x00b6,
	},
	// PARALLEL TO
	parallel: {
		n: 'parallel',
		u: 0x2225,
	},
	// LEFT PARENTHESIS
	parenleft: {
		n: 'parenleft',
		u: 0x0028,
	},
	// ORNATE LEFT PARENTHESIS
	parenleftaltonearabic: {
		n: 'parenleftaltonearabic',
		u: 0xfd3e,
	},
	// <private-use-F8ED>
	parenleftbt: {
		n: 'parenleftbt',
		u: 0xf8ed,
	},
	// <private-use-F8EC>
	parenleftex: {
		n: 'parenleftex',
		u: 0xf8ec,
	},
	// SUBSCRIPT LEFT PARENTHESIS
	parenleftinferior: {
		n: 'parenleftinferior',
		u: 0x208d,
	},
	// FULLWIDTH LEFT PARENTHESIS
	parenleftmonospace: {
		n: 'parenleftmonospace',
		u: 0xff08,
	},
	// SMALL LEFT PARENTHESIS
	parenleftsmall: {
		n: 'parenleftsmall',
		u: 0xfe59,
		f: [0x0028],
	},
	// SUPERSCRIPT LEFT PARENTHESIS
	parenleftsuperior: {
		n: 'parenleftsuperior',
		u: 0x207d,
	},
	// <private-use-F8EB>
	parenlefttp: {
		n: 'parenlefttp',
		u: 0xf8eb,
	},
	// PRESENTATION FORM FOR VERTICAL LEFT PARENTHESIS
	parenleftvertical: {
		n: 'parenleftvertical',
		u: 0xfe35,
	},
	// RIGHT PARENTHESIS
	parenright: {
		n: 'parenright',
		u: 0x0029,
	},
	// ORNATE RIGHT PARENTHESIS
	parenrightaltonearabic: {
		n: 'parenrightaltonearabic',
		u: 0xfd3f,
	},
	// <private-use-F8F8>
	parenrightbt: {
		n: 'parenrightbt',
		u: 0xf8f8,
	},
	// <private-use-F8F7>
	parenrightex: {
		n: 'parenrightex',
		u: 0xf8f7,
	},
	// SUBSCRIPT RIGHT PARENTHESIS
	parenrightinferior: {
		n: 'parenrightinferior',
		u: 0x208e,
	},
	// FULLWIDTH RIGHT PARENTHESIS
	parenrightmonospace: {
		n: 'parenrightmonospace',
		u: 0xff09,
	},
	// SMALL RIGHT PARENTHESIS
	parenrightsmall: {
		n: 'parenrightsmall',
		u: 0xfe5a,
		f: [0x0029],
	},
	// SUPERSCRIPT RIGHT PARENTHESIS
	parenrightsuperior: {
		n: 'parenrightsuperior',
		u: 0x207e,
	},
	// <private-use-F8F6>
	parenrighttp: {
		n: 'parenrighttp',
		u: 0xf8f6,
	},
	// PRESENTATION FORM FOR VERTICAL RIGHT PARENTHESIS
	parenrightvertical: {
		n: 'parenrightvertical',
		u: 0xfe36,
	},
	// PARTIAL DIFFERENTIAL
	partialdiff: {
		n: 'partialdiff',
		u: 0x2202,
	},
	// HEBREW PUNCTUATION PASEQ
	paseqhebrew: {
		n: 'paseqhebrew',
		u: 0x05c0,
	},
	// HEBREW ACCENT PASHTA
	pashtahebrew: {
		n: 'pashtahebrew',
		u: 0x0599,
	},
	// SQUARE PA
	pasquare: {
		n: 'pasquare',
		u: 0x33a9,
	},
	// HEBREW POINT PATAH
	patah: {
		n: 'patah',
		u: 0x05b7,
	},
	// HEBREW POINT PATAH
	patah11: {
		n: 'patah11',
		u: 0x05b7,
	},
	// HEBREW POINT PATAH
	patah1d: {
		n: 'patah1d',
		u: 0x05b7,
	},
	// HEBREW POINT PATAH
	patah2a: {
		n: 'patah2a',
		u: 0x05b7,
	},
	// HEBREW POINT PATAH
	patahhebrew: {
		n: 'patahhebrew',
		u: 0x05b7,
	},
	// HEBREW POINT PATAH
	patahnarrowhebrew: {
		n: 'patahnarrowhebrew',
		u: 0x05b7,
	},
	// HEBREW POINT PATAH
	patahquarterhebrew: {
		n: 'patahquarterhebrew',
		u: 0x05b7,
	},
	// HEBREW POINT PATAH
	patahwidehebrew: {
		n: 'patahwidehebrew',
		u: 0x05b7,
	},
	// HEBREW ACCENT PAZER
	pazerhebrew: {
		n: 'pazerhebrew',
		u: 0x05a1,
	},
	// BOPOMOFO LETTER P
	pbopomofo: {
		n: 'pbopomofo',
		u: 0x3106,
	},
	// CIRCLED LATIN SMALL LETTER P
	pcircle: {
		n: 'pcircle',
		u: 0x24df,
	},
	// LATIN SMALL LETTER P WITH DOT ABOVE
	pdotaccent: {
		n: 'pdotaccent',
		u: 0x1e57,
	},
	// HEBREW LETTER PE
	pe: {
		n: 'pe',
		u: 0x05e4,
	},
	// CYRILLIC SMALL LETTER PE
	pecyrillic: {
		n: 'pecyrillic',
		u: 0x043f,
	},
	// HEBREW LETTER PE WITH DAGESH
	pedagesh: {
		n: 'pedagesh',
		u: 0xfb44,
	},
	// HEBREW LETTER PE WITH DAGESH
	pedageshhebrew: {
		n: 'pedageshhebrew',
		u: 0xfb44,
	},
	// SQUARE PEEZI
	peezisquare: {
		n: 'peezisquare',
		u: 0x333b,
	},
	// HEBREW LETTER FINAL PE WITH DAGESH
	pefinaldageshhebrew: {
		n: 'pefinaldageshhebrew',
		u: 0xfb43,
	},
	// ARABIC LETTER PEH
	peharabic: {
		n: 'peharabic',
		u: 0x067e,
	},
	// ARMENIAN SMALL LETTER PEH
	peharmenian: {
		n: 'peharmenian',
		u: 0x057a,
	},
	// HEBREW LETTER PE
	pehebrew: {
		n: 'pehebrew',
		u: 0x05e4,
	},
	// ARABIC LETTER PEH FINAL FORM
	pehfinalarabic: {
		n: 'pehfinalarabic',
		u: 0xfb57,
	},
	// ARABIC LETTER PEH INITIAL FORM
	pehinitialarabic: {
		n: 'pehinitialarabic',
		u: 0xfb58,
	},
	// HIRAGANA LETTER PE
	pehiragana: {
		n: 'pehiragana',
		u: 0x307a,
	},
	// ARABIC LETTER PEH MEDIAL FORM
	pehmedialarabic: {
		n: 'pehmedialarabic',
		u: 0xfb59,
	},
	// KATAKANA LETTER PE
	pekatakana: {
		n: 'pekatakana',
		u: 0x30da,
	},
	// CYRILLIC SMALL LETTER PE WITH MIDDLE HOOK
	pemiddlehookcyrillic: {
		n: 'pemiddlehookcyrillic',
		u: 0x04a7,
	},
	// HEBREW LETTER PE WITH RAFE
	perafehebrew: {
		n: 'perafehebrew',
		u: 0xfb4e,
	},
	// PERCENT SIGN
	percent: {
		n: 'percent',
		u: 0x0025,
	},
	// ARABIC PERCENT SIGN
	percentarabic: {
		n: 'percentarabic',
		u: 0x066a,
	},
	// FULLWIDTH PERCENT SIGN
	percentmonospace: {
		n: 'percentmonospace',
		u: 0xff05,
	},
	// SMALL PERCENT SIGN
	percentsmall: {
		n: 'percentsmall',
		u: 0xfe6a,
		f: [0x0025],
	},
	// FULL STOP
	period: {
		n: 'period',
		u: 0x002e,
	},
	// ARMENIAN FULL STOP
	periodarmenian: {
		n: 'periodarmenian',
		u: 0x0589,
	},
	// MIDDLE DOT
	periodcentered: {
		n: 'periodcentered',
		u: 0x00b7,
	},
	// HALFWIDTH IDEOGRAPHIC FULL STOP
	periodhalfwidth: {
		n: 'periodhalfwidth',
		u: 0xff61,
	},
	// <private-use-F6E7>
	periodinferior: {
		n: 'periodinferior',
		u: 0xf6e7,
	},
	// FULLWIDTH FULL STOP
	periodmonospace: {
		n: 'periodmonospace',
		u: 0xff0e,
	},
	// SMALL FULL STOP
	periodsmall: {
		n: 'periodsmall',
		u: 0xfe52,
		f: [0x002e],
	},
	// <private-use-F6E8>
	periodsuperior: {
		n: 'periodsuperior',
		u: 0xf6e8,
	},
	// COMBINING GREEK PERISPOMENI
	perispomenigreekcmb: {
		n: 'perispomenigreekcmb',
		u: 0x0342,
	},
	// UP TACK
	perpendicular: {
		n: 'perpendicular',
		u: 0x22a5,
	},
	// PER MILLE SIGN
	perthousand: {
		n: 'perthousand',
		u: 0x2030,
	},
	// PESETA SIGN
	peseta: {
		n: 'peseta',
		u: 0x20a7,
	},
	// SQUARE PF
	pfsquare: {
		n: 'pfsquare',
		u: 0x338a,
	},
	// BENGALI LETTER PHA
	phabengali: {
		n: 'phabengali',
		u: 0x09ab,
	},
	// DEVANAGARI LETTER PHA
	phadeva: {
		n: 'phadeva',
		u: 0x092b,
	},
	// GUJARATI LETTER PHA
	phagujarati: {
		n: 'phagujarati',
		u: 0x0aab,
	},
	// GURMUKHI LETTER PHA
	phagurmukhi: {
		n: 'phagurmukhi',
		u: 0x0a2b,
	},
	// GREEK SMALL LETTER PHI
	phi: {
		n: 'phi',
		u: 0x03c6,
	},
	// GREEK PHI SYMBOL
	phi1: {
		n: 'phi1',
		u: 0x03d5,
	},
	// CIRCLED HANGUL PHIEUPH A
	phieuphacirclekorean: {
		n: 'phieuphacirclekorean',
		u: 0x327a,
	},
	// PARENTHESIZED HANGUL PHIEUPH A
	phieuphaparenkorean: {
		n: 'phieuphaparenkorean',
		u: 0x321a,
	},
	// CIRCLED HANGUL PHIEUPH
	phieuphcirclekorean: {
		n: 'phieuphcirclekorean',
		u: 0x326c,
	},
	// HANGUL LETTER PHIEUPH
	phieuphkorean: {
		n: 'phieuphkorean',
		u: 0x314d,
	},
	// PARENTHESIZED HANGUL PHIEUPH
	phieuphparenkorean: {
		n: 'phieuphparenkorean',
		u: 0x320c,
	},
	// LATIN SMALL LETTER PHI
	philatin: {
		n: 'philatin',
		u: 0x0278,
	},
	// THAI CHARACTER PHINTHU
	phinthuthai: {
		n: 'phinthuthai',
		u: 0x0e3a,
	},
	// GREEK PHI SYMBOL
	phisymbolgreek: {
		n: 'phisymbolgreek',
		u: 0x03d5,
	},
	// LATIN SMALL LETTER P WITH HOOK
	phook: {
		n: 'phook',
		u: 0x01a5,
	},
	// THAI CHARACTER PHO PHAN
	phophanthai: {
		n: 'phophanthai',
		u: 0x0e1e,
	},
	// THAI CHARACTER PHO PHUNG
	phophungthai: {
		n: 'phophungthai',
		u: 0x0e1c,
	},
	// THAI CHARACTER PHO SAMPHAO
	phosamphaothai: {
		n: 'phosamphaothai',
		u: 0x0e20,
	},
	// GREEK SMALL LETTER PI
	pi: {
		n: 'pi',
		u: 0x03c0,
	},
	// CIRCLED HANGUL PIEUP A
	pieupacirclekorean: {
		n: 'pieupacirclekorean',
		u: 0x3273,
	},
	// PARENTHESIZED HANGUL PIEUP A
	pieupaparenkorean: {
		n: 'pieupaparenkorean',
		u: 0x3213,
	},
	// HANGUL LETTER PIEUP-CIEUC
	pieupcieuckorean: {
		n: 'pieupcieuckorean',
		u: 0x3176,
	},
	// CIRCLED HANGUL PIEUP
	pieupcirclekorean: {
		n: 'pieupcirclekorean',
		u: 0x3265,
	},
	// HANGUL LETTER PIEUP-KIYEOK
	pieupkiyeokkorean: {
		n: 'pieupkiyeokkorean',
		u: 0x3172,
	},
	// HANGUL LETTER PIEUP
	pieupkorean: {
		n: 'pieupkorean',
		u: 0x3142,
	},
	// PARENTHESIZED HANGUL PIEUP
	pieupparenkorean: {
		n: 'pieupparenkorean',
		u: 0x3205,
	},
	// HANGUL LETTER PIEUP-SIOS-KIYEOK
	pieupsioskiyeokkorean: {
		n: 'pieupsioskiyeokkorean',
		u: 0x3174,
	},
	// HANGUL LETTER PIEUP-SIOS
	pieupsioskorean: {
		n: 'pieupsioskorean',
		u: 0x3144,
	},
	// HANGUL LETTER PIEUP-SIOS-TIKEUT
	pieupsiostikeutkorean: {
		n: 'pieupsiostikeutkorean',
		u: 0x3175,
	},
	// HANGUL LETTER PIEUP-THIEUTH
	pieupthieuthkorean: {
		n: 'pieupthieuthkorean',
		u: 0x3177,
	},
	// HANGUL LETTER PIEUP-TIKEUT
	pieuptikeutkorean: {
		n: 'pieuptikeutkorean',
		u: 0x3173,
	},
	// HIRAGANA LETTER PI
	pihiragana: {
		n: 'pihiragana',
		u: 0x3074,
	},
	// KATAKANA LETTER PI
	pikatakana: {
		n: 'pikatakana',
		u: 0x30d4,
	},
	// GREEK PI SYMBOL
	pisymbolgreek: {
		n: 'pisymbolgreek',
		u: 0x03d6,
	},
	// ARMENIAN SMALL LETTER PIWR
	piwrarmenian: {
		n: 'piwrarmenian',
		u: 0x0583,
	},
	// PLUS SIGN
	plus: {
		n: 'plus',
		u: 0x002b,
	},
	// COMBINING PLUS SIGN BELOW
	plusbelowcmb: {
		n: 'plusbelowcmb',
		u: 0x031f,
	},
	// CIRCLED PLUS
	pluscircle: {
		n: 'pluscircle',
		u: 0x2295,
	},
	// PLUS-MINUS SIGN
	plusminus: {
		n: 'plusminus',
		u: 0x00b1,
	},
	// MODIFIER LETTER PLUS SIGN
	plusmod: {
		n: 'plusmod',
		u: 0x02d6,
	},
	// FULLWIDTH PLUS SIGN
	plusmonospace: {
		n: 'plusmonospace',
		u: 0xff0b,
	},
	// SMALL PLUS SIGN
	plussmall: {
		n: 'plussmall',
		u: 0xfe62,
		f: [0x002b],
	},
	// SUPERSCRIPT PLUS SIGN
	plussuperior: {
		n: 'plussuperior',
		u: 0x207a,
	},
	// FULLWIDTH LATIN SMALL LETTER P
	pmonospace: {
		n: 'pmonospace',
		u: 0xff50,
	},
	// SQUARE PM
	pmsquare: {
		n: 'pmsquare',
		u: 0x33d8,
	},
	// HIRAGANA LETTER PO
	pohiragana: {
		n: 'pohiragana',
		u: 0x307d,
	},
	// WHITE DOWN POINTING INDEX
	pointingindexdownwhite: {
		n: 'pointingindexdownwhite',
		u: 0x261f,
	},
	// WHITE LEFT POINTING INDEX
	pointingindexleftwhite: {
		n: 'pointingindexleftwhite',
		u: 0x261c,
	},
	// WHITE RIGHT POINTING INDEX
	pointingindexrightwhite: {
		n: 'pointingindexrightwhite',
		u: 0x261e,
	},
	// WHITE UP POINTING INDEX
	pointingindexupwhite: {
		n: 'pointingindexupwhite',
		u: 0x261d,
	},
	// KATAKANA LETTER PO
	pokatakana: {
		n: 'pokatakana',
		u: 0x30dd,
	},
	// THAI CHARACTER PO PLA
	poplathai: {
		n: 'poplathai',
		u: 0x0e1b,
	},
	// POSTAL MARK
	postalmark: {
		n: 'postalmark',
		u: 0x3012,
	},
	// POSTAL MARK FACE
	postalmarkface: {
		n: 'postalmarkface',
		u: 0x3020,
	},
	// PARENTHESIZED LATIN SMALL LETTER P
	pparen: {
		n: 'pparen',
		u: 0x24ab,
	},
	// PRECEDES
	precedes: {
		n: 'precedes',
		u: 0x227a,
	},
	// PRESCRIPTION TAKE
	prescription: {
		n: 'prescription',
		u: 0x211e,
	},
	// MODIFIER LETTER PRIME
	primemod: {
		n: 'primemod',
		u: 0x02b9,
	},
	// REVERSED PRIME
	primereversed: {
		n: 'primereversed',
		u: 0x2035,
	},
	// N-ARY PRODUCT
	product: {
		n: 'product',
		u: 0x220f,
	},
	// PROJECTIVE
	projective: {
		n: 'projective',
		u: 0x2305,
	},
	// KATAKANA-HIRAGANA PROLONGED SOUND MARK
	prolongedkana: {
		n: 'prolongedkana',
		u: 0x30fc,
	},
	// PLACE OF INTEREST SIGN
	propellor: {
		n: 'propellor',
		u: 0x2318,
	},
	// SUBSET OF
	propersubset: {
		n: 'propersubset',
		u: 0x2282,
	},
	// SUPERSET OF
	propersuperset: {
		n: 'propersuperset',
		u: 0x2283,
	},
	// PROPORTION
	proportion: {
		n: 'proportion',
		u: 0x2237,
	},
	// PROPORTIONAL TO
	proportional: {
		n: 'proportional',
		u: 0x221d,
	},
	// GREEK SMALL LETTER PSI
	psi: {
		n: 'psi',
		u: 0x03c8,
	},
	// CYRILLIC SMALL LETTER PSI
	psicyrillic: {
		n: 'psicyrillic',
		u: 0x0471,
	},
	// COMBINING CYRILLIC PSILI PNEUMATA
	psilipneumatacyrilliccmb: {
		n: 'psilipneumatacyrilliccmb',
		u: 0x0486,
	},
	// SQUARE PS
	pssquare: {
		n: 'pssquare',
		u: 0x33b0,
	},
	// HIRAGANA LETTER PU
	puhiragana: {
		n: 'puhiragana',
		u: 0x3077,
	},
	// KATAKANA LETTER PU
	pukatakana: {
		n: 'pukatakana',
		u: 0x30d7,
	},
	// SQUARE PV
	pvsquare: {
		n: 'pvsquare',
		u: 0x33b4,
	},
	// SQUARE PW
	pwsquare: {
		n: 'pwsquare',
		u: 0x33ba,
	},
	// LATIN SMALL LETTER Q
	q: {
		n: 'q',
		u: 0x0071,
	},
	// DEVANAGARI LETTER QA
	qadeva: {
		n: 'qadeva',
		u: 0x0958,
	},
	// HEBREW ACCENT QADMA
	qadmahebrew: {
		n: 'qadmahebrew',
		u: 0x05a8,
	},
	// ARABIC LETTER QAF
	qafarabic: {
		n: 'qafarabic',
		u: 0x0642,
	},
	// ARABIC LETTER QAF FINAL FORM
	qaffinalarabic: {
		n: 'qaffinalarabic',
		u: 0xfed6,
	},
	// ARABIC LETTER QAF INITIAL FORM
	qafinitialarabic: {
		n: 'qafinitialarabic',
		u: 0xfed7,
	},
	// ARABIC LETTER QAF MEDIAL FORM
	qafmedialarabic: {
		n: 'qafmedialarabic',
		u: 0xfed8,
	},
	// HEBREW POINT QAMATS
	qamats: {
		n: 'qamats',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamats10: {
		n: 'qamats10',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamats1a: {
		n: 'qamats1a',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamats1c: {
		n: 'qamats1c',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamats27: {
		n: 'qamats27',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamats29: {
		n: 'qamats29',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamats33: {
		n: 'qamats33',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatsde: {
		n: 'qamatsde',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatshebrew: {
		n: 'qamatshebrew',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatsnarrowhebrew: {
		n: 'qamatsnarrowhebrew',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatsqatanhebrew: {
		n: 'qamatsqatanhebrew',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatsqatannarrowhebrew: {
		n: 'qamatsqatannarrowhebrew',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatsqatanquarterhebrew: {
		n: 'qamatsqatanquarterhebrew',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatsqatanwidehebrew: {
		n: 'qamatsqatanwidehebrew',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatsquarterhebrew: {
		n: 'qamatsquarterhebrew',
		u: 0x05b8,
	},
	// HEBREW POINT QAMATS
	qamatswidehebrew: {
		n: 'qamatswidehebrew',
		u: 0x05b8,
	},
	// HEBREW ACCENT QARNEY PARA
	qarneyparahebrew: {
		n: 'qarneyparahebrew',
		u: 0x059f,
	},
	// BOPOMOFO LETTER Q
	qbopomofo: {
		n: 'qbopomofo',
		u: 0x3111,
	},
	// CIRCLED LATIN SMALL LETTER Q
	qcircle: {
		n: 'qcircle',
		u: 0x24e0,
	},
	// LATIN SMALL LETTER Q WITH HOOK
	qhook: {
		n: 'qhook',
		u: 0x02a0,
	},
	// FULLWIDTH LATIN SMALL LETTER Q
	qmonospace: {
		n: 'qmonospace',
		u: 0xff51,
	},
	// HEBREW LETTER QOF
	qof: {
		n: 'qof',
		u: 0x05e7,
	},
	// HEBREW LETTER QOF WITH DAGESH
	qofdagesh: {
		n: 'qofdagesh',
		u: 0xfb47,
	},
	// HEBREW LETTER QOF WITH DAGESH
	qofdageshhebrew: {
		n: 'qofdageshhebrew',
		u: 0xfb47,
	},
	// HEBREW LETTER QOF + HEBREW POINT HATAF PATAH
	qofhatafpatah: {
		n: 'qofhatafpatah',
		u: [0x05e7, 0x05b2],
	},
	// HEBREW LETTER QOF + HEBREW POINT HATAF PATAH
	qofhatafpatahhebrew: {
		n: 'qofhatafpatahhebrew',
		u: [0x05e7, 0x05b2],
	},
	// HEBREW LETTER QOF + HEBREW POINT HATAF SEGOL
	qofhatafsegol: {
		n: 'qofhatafsegol',
		u: [0x05e7, 0x05b1],
	},
	// HEBREW LETTER QOF + HEBREW POINT HATAF SEGOL
	qofhatafsegolhebrew: {
		n: 'qofhatafsegolhebrew',
		u: [0x05e7, 0x05b1],
	},
	// HEBREW LETTER QOF
	qofhebrew: {
		n: 'qofhebrew',
		u: 0x05e7,
	},
	// HEBREW LETTER QOF + HEBREW POINT HIRIQ
	qofhiriq: {
		n: 'qofhiriq',
		u: [0x05e7, 0x05b4],
	},
	// HEBREW LETTER QOF + HEBREW POINT HIRIQ
	qofhiriqhebrew: {
		n: 'qofhiriqhebrew',
		u: [0x05e7, 0x05b4],
	},
	// HEBREW LETTER QOF + HEBREW POINT HOLAM
	qofholam: {
		n: 'qofholam',
		u: [0x05e7, 0x05b9],
	},
	// HEBREW LETTER QOF + HEBREW POINT HOLAM
	qofholamhebrew: {
		n: 'qofholamhebrew',
		u: [0x05e7, 0x05b9],
	},
	// HEBREW LETTER QOF + HEBREW POINT PATAH
	qofpatah: {
		n: 'qofpatah',
		u: [0x05e7, 0x05b7],
	},
	// HEBREW LETTER QOF + HEBREW POINT PATAH
	qofpatahhebrew: {
		n: 'qofpatahhebrew',
		u: [0x05e7, 0x05b7],
	},
	// HEBREW LETTER QOF + HEBREW POINT QAMATS
	qofqamats: {
		n: 'qofqamats',
		u: [0x05e7, 0x05b8],
	},
	// HEBREW LETTER QOF + HEBREW POINT QAMATS
	qofqamatshebrew: {
		n: 'qofqamatshebrew',
		u: [0x05e7, 0x05b8],
	},
	// HEBREW LETTER QOF + HEBREW POINT QUBUTS
	qofqubuts: {
		n: 'qofqubuts',
		u: [0x05e7, 0x05bb],
	},
	// HEBREW LETTER QOF + HEBREW POINT QUBUTS
	qofqubutshebrew: {
		n: 'qofqubutshebrew',
		u: [0x05e7, 0x05bb],
	},
	// HEBREW LETTER QOF + HEBREW POINT SEGOL
	qofsegol: {
		n: 'qofsegol',
		u: [0x05e7, 0x05b6],
	},
	// HEBREW LETTER QOF + HEBREW POINT SEGOL
	qofsegolhebrew: {
		n: 'qofsegolhebrew',
		u: [0x05e7, 0x05b6],
	},
	// HEBREW LETTER QOF + HEBREW POINT SHEVA
	qofsheva: {
		n: 'qofsheva',
		u: [0x05e7, 0x05b0],
	},
	// HEBREW LETTER QOF + HEBREW POINT SHEVA
	qofshevahebrew: {
		n: 'qofshevahebrew',
		u: [0x05e7, 0x05b0],
	},
	// HEBREW LETTER QOF + HEBREW POINT TSERE
	qoftsere: {
		n: 'qoftsere',
		u: [0x05e7, 0x05b5],
	},
	// HEBREW LETTER QOF + HEBREW POINT TSERE
	qoftserehebrew: {
		n: 'qoftserehebrew',
		u: [0x05e7, 0x05b5],
	},
	// PARENTHESIZED LATIN SMALL LETTER Q
	qparen: {
		n: 'qparen',
		u: 0x24ac,
	},
	// QUARTER NOTE
	quarternote: {
		n: 'quarternote',
		u: 0x2669,
	},
	// HEBREW POINT QUBUTS
	qubuts: {
		n: 'qubuts',
		u: 0x05bb,
	},
	// HEBREW POINT QUBUTS
	qubuts18: {
		n: 'qubuts18',
		u: 0x05bb,
	},
	// HEBREW POINT QUBUTS
	qubuts25: {
		n: 'qubuts25',
		u: 0x05bb,
	},
	// HEBREW POINT QUBUTS
	qubuts31: {
		n: 'qubuts31',
		u: 0x05bb,
	},
	// HEBREW POINT QUBUTS
	qubutshebrew: {
		n: 'qubutshebrew',
		u: 0x05bb,
	},
	// HEBREW POINT QUBUTS
	qubutsnarrowhebrew: {
		n: 'qubutsnarrowhebrew',
		u: 0x05bb,
	},
	// HEBREW POINT QUBUTS
	qubutsquarterhebrew: {
		n: 'qubutsquarterhebrew',
		u: 0x05bb,
	},
	// HEBREW POINT QUBUTS
	qubutswidehebrew: {
		n: 'qubutswidehebrew',
		u: 0x05bb,
	},
	// QUESTION MARK
	question: {
		n: 'question',
		u: 0x003f,
	},
	// ARABIC QUESTION MARK
	questionarabic: {
		n: 'questionarabic',
		u: 0x061f,
	},
	// ARMENIAN QUESTION MARK
	questionarmenian: {
		n: 'questionarmenian',
		u: 0x055e,
	},
	// INVERTED QUESTION MARK
	questiondown: {
		n: 'questiondown',
		u: 0x00bf,
	},
	// <private-use-F7BF>
	questiondownsmall: {
		n: 'questiondownsmall',
		u: 0xf7bf,
		f: [0x00bf],
	},
	// GREEK QUESTION MARK
	questiongreek: {
		n: 'questiongreek',
		u: 0x037e,
	},
	// FULLWIDTH QUESTION MARK
	questionmonospace: {
		n: 'questionmonospace',
		u: 0xff1f,
	},
	// <private-use-F73F>
	questionsmall: {
		n: 'questionsmall',
		u: 0xf73f,
		f: [0x003f],
	},
	// QUOTATION MARK
	quotedbl: {
		n: 'quotedbl',
		u: 0x0022,
	},
	// DOUBLE LOW-9 QUOTATION MARK
	quotedblbase: {
		n: 'quotedblbase',
		u: 0x201e,
	},
	// LEFT DOUBLE QUOTATION MARK
	quotedblleft: {
		n: 'quotedblleft',
		u: 0x201c,
	},
	// FULLWIDTH QUOTATION MARK
	quotedblmonospace: {
		n: 'quotedblmonospace',
		u: 0xff02,
	},
	// DOUBLE PRIME QUOTATION MARK
	quotedblprime: {
		n: 'quotedblprime',
		u: 0x301e,
	},
	// REVERSED DOUBLE PRIME QUOTATION MARK
	quotedblprimereversed: {
		n: 'quotedblprimereversed',
		u: 0x301d,
	},
	// RIGHT DOUBLE QUOTATION MARK
	quotedblright: {
		n: 'quotedblright',
		u: 0x201d,
	},
	// LEFT SINGLE QUOTATION MARK
	quoteleft: {
		n: 'quoteleft',
		u: 0x2018,
	},
	// SINGLE HIGH-REVERSED-9 QUOTATION MARK
	quoteleftreversed: {
		n: 'quoteleftreversed',
		u: 0x201b,
	},
	// SINGLE HIGH-REVERSED-9 QUOTATION MARK
	quotereversed: {
		n: 'quotereversed',
		u: 0x201b,
	},
	// RIGHT SINGLE QUOTATION MARK
	quoteright: {
		n: 'quoteright',
		u: 0x2019,
	},
	// LATIN SMALL LETTER N PRECEDED BY APOSTROPHE
	quoterightn: {
		n: 'quoterightn',
		u: 0x0149,
	},
	// SINGLE LOW-9 QUOTATION MARK
	quotesinglbase: {
		n: 'quotesinglbase',
		u: 0x201a,
	},
	// APOSTROPHE
	quotesingle: {
		n: 'quotesingle',
		u: 0x0027,
	},
	// FULLWIDTH APOSTROPHE
	quotesinglemonospace: {
		n: 'quotesinglemonospace',
		u: 0xff07,
	},
	// LATIN SMALL LETTER R
	r: {
		n: 'r',
		u: 0x0072,
	},
	// ARMENIAN SMALL LETTER RA
	raarmenian: {
		n: 'raarmenian',
		u: 0x057c,
	},
	// BENGALI LETTER RA
	rabengali: {
		n: 'rabengali',
		u: 0x09b0,
	},
	// LATIN SMALL LETTER R WITH ACUTE
	racute: {
		n: 'racute',
		u: 0x0155,
	},
	// DEVANAGARI LETTER RA
	radeva: {
		n: 'radeva',
		u: 0x0930,
	},
	// SQUARE ROOT
	radical: {
		n: 'radical',
		u: 0x221a,
	},
	// <private-use-F8E5>
	radicalex: {
		n: 'radicalex',
		u: 0xf8e5,
	},
	// SQUARE RAD OVER S
	radoverssquare: {
		n: 'radoverssquare',
		u: 0x33ae,
	},
	// SQUARE RAD OVER S SQUARED
	radoverssquaredsquare: {
		n: 'radoverssquaredsquare',
		u: 0x33af,
	},
	// SQUARE RAD
	radsquare: {
		n: 'radsquare',
		u: 0x33ad,
	},
	// HEBREW POINT RAFE
	rafe: {
		n: 'rafe',
		u: 0x05bf,
	},
	// HEBREW POINT RAFE
	rafehebrew: {
		n: 'rafehebrew',
		u: 0x05bf,
	},
	// GUJARATI LETTER RA
	ragujarati: {
		n: 'ragujarati',
		u: 0x0ab0,
	},
	// GURMUKHI LETTER RA
	ragurmukhi: {
		n: 'ragurmukhi',
		u: 0x0a30,
	},
	// HIRAGANA LETTER RA
	rahiragana: {
		n: 'rahiragana',
		u: 0x3089,
	},
	// KATAKANA LETTER RA
	rakatakana: {
		n: 'rakatakana',
		u: 0x30e9,
	},
	// HALFWIDTH KATAKANA LETTER RA
	rakatakanahalfwidth: {
		n: 'rakatakanahalfwidth',
		u: 0xff97,
	},
	// BENGALI LETTER RA WITH LOWER DIAGONAL
	ralowerdiagonalbengali: {
		n: 'ralowerdiagonalbengali',
		u: 0x09f1,
	},
	// BENGALI LETTER RA WITH MIDDLE DIAGONAL
	ramiddlediagonalbengali: {
		n: 'ramiddlediagonalbengali',
		u: 0x09f0,
	},
	// LATIN SMALL LETTER RAMS HORN
	ramshorn: {
		n: 'ramshorn',
		u: 0x0264,
	},
	// RATIO
	ratio: {
		n: 'ratio',
		u: 0x2236,
	},
	// BOPOMOFO LETTER R
	rbopomofo: {
		n: 'rbopomofo',
		u: 0x3116,
	},
	// LATIN SMALL LETTER R WITH CARON
	rcaron: {
		n: 'rcaron',
		u: 0x0159,
	},
	// LATIN SMALL LETTER R WITH CEDILLA
	rcedilla: {
		n: 'rcedilla',
		u: 0x0157,
	},
	// CIRCLED LATIN SMALL LETTER R
	rcircle: {
		n: 'rcircle',
		u: 0x24e1,
	},
	// LATIN SMALL LETTER R WITH CEDILLA
	rcommaaccent: {
		n: 'rcommaaccent',
		u: 0x0157,
	},
	// LATIN SMALL LETTER R WITH DOUBLE GRAVE
	rdblgrave: {
		n: 'rdblgrave',
		u: 0x0211,
	},
	// LATIN SMALL LETTER R WITH DOT ABOVE
	rdotaccent: {
		n: 'rdotaccent',
		u: 0x1e59,
	},
	// LATIN SMALL LETTER R WITH DOT BELOW
	rdotbelow: {
		n: 'rdotbelow',
		u: 0x1e5b,
	},
	// LATIN SMALL LETTER R WITH DOT BELOW AND MACRON
	rdotbelowmacron: {
		n: 'rdotbelowmacron',
		u: 0x1e5d,
	},
	// REFERENCE MARK
	referencemark: {
		n: 'referencemark',
		u: 0x203b,
	},
	// SUBSET OF OR EQUAL TO
	reflexsubset: {
		n: 'reflexsubset',
		u: 0x2286,
	},
	// SUPERSET OF OR EQUAL TO
	reflexsuperset: {
		n: 'reflexsuperset',
		u: 0x2287,
	},
	// REGISTERED SIGN
	registered: {
		n: 'registered',
		u: 0x00ae,
		f: [0xf8e8, 0xf6da],
	},
	// <private-use-F8E8>
	registersans: {
		n: 'registersans',
		u: 0xf8e8,
		f: [0x00ae, 0xf6da],
	},
	// <private-use-F6DA>
	registerserif: {
		n: 'registerserif',
		u: 0xf6da,
		f: [0x00ae, 0xf8e8],
	},
	// ARABIC LETTER REH
	reharabic: {
		n: 'reharabic',
		u: 0x0631,
	},
	// ARMENIAN SMALL LETTER REH
	reharmenian: {
		n: 'reharmenian',
		u: 0x0580,
	},
	// ARABIC LETTER REH FINAL FORM
	rehfinalarabic: {
		n: 'rehfinalarabic',
		u: 0xfeae,
	},
	// HIRAGANA LETTER RE
	rehiragana: {
		n: 'rehiragana',
		u: 0x308c,
	},
	// ARABIC LETTER REH + ARABIC LETTER YEH INITIAL FORM + ARABIC LETTER ALEF FINAL FORM + ARABIC LETTER LAM
	rehyehaleflamarabic: {
		n: 'rehyehaleflamarabic',
		u: [0x0631, 0xfef3, 0xfe8e, 0x0644],
	},
	// KATAKANA LETTER RE
	rekatakana: {
		n: 'rekatakana',
		u: 0x30ec,
	},
	// HALFWIDTH KATAKANA LETTER RE
	rekatakanahalfwidth: {
		n: 'rekatakanahalfwidth',
		u: 0xff9a,
	},
	// HEBREW LETTER RESH
	resh: {
		n: 'resh',
		u: 0x05e8,
	},
	// HEBREW LETTER RESH WITH DAGESH
	reshdageshhebrew: {
		n: 'reshdageshhebrew',
		u: 0xfb48,
	},
	// HEBREW LETTER RESH + HEBREW POINT HATAF PATAH
	reshhatafpatah: {
		n: 'reshhatafpatah',
		u: [0x05e8, 0x05b2],
	},
	// HEBREW LETTER RESH + HEBREW POINT HATAF PATAH
	reshhatafpatahhebrew: {
		n: 'reshhatafpatahhebrew',
		u: [0x05e8, 0x05b2],
	},
	// HEBREW LETTER RESH + HEBREW POINT HATAF SEGOL
	reshhatafsegol: {
		n: 'reshhatafsegol',
		u: [0x05e8, 0x05b1],
	},
	// HEBREW LETTER RESH + HEBREW POINT HATAF SEGOL
	reshhatafsegolhebrew: {
		n: 'reshhatafsegolhebrew',
		u: [0x05e8, 0x05b1],
	},
	// HEBREW LETTER RESH
	reshhebrew: {
		n: 'reshhebrew',
		u: 0x05e8,
	},
	// HEBREW LETTER RESH + HEBREW POINT HIRIQ
	reshhiriq: {
		n: 'reshhiriq',
		u: [0x05e8, 0x05b4],
	},
	// HEBREW LETTER RESH + HEBREW POINT HIRIQ
	reshhiriqhebrew: {
		n: 'reshhiriqhebrew',
		u: [0x05e8, 0x05b4],
	},
	// HEBREW LETTER RESH + HEBREW POINT HOLAM
	reshholam: {
		n: 'reshholam',
		u: [0x05e8, 0x05b9],
	},
	// HEBREW LETTER RESH + HEBREW POINT HOLAM
	reshholamhebrew: {
		n: 'reshholamhebrew',
		u: [0x05e8, 0x05b9],
	},
	// HEBREW LETTER RESH + HEBREW POINT PATAH
	reshpatah: {
		n: 'reshpatah',
		u: [0x05e8, 0x05b7],
	},
	// HEBREW LETTER RESH + HEBREW POINT PATAH
	reshpatahhebrew: {
		n: 'reshpatahhebrew',
		u: [0x05e8, 0x05b7],
	},
	// HEBREW LETTER RESH + HEBREW POINT QAMATS
	reshqamats: {
		n: 'reshqamats',
		u: [0x05e8, 0x05b8],
	},
	// HEBREW LETTER RESH + HEBREW POINT QAMATS
	reshqamatshebrew: {
		n: 'reshqamatshebrew',
		u: [0x05e8, 0x05b8],
	},
	// HEBREW LETTER RESH + HEBREW POINT QUBUTS
	reshqubuts: {
		n: 'reshqubuts',
		u: [0x05e8, 0x05bb],
	},
	// HEBREW LETTER RESH + HEBREW POINT QUBUTS
	reshqubutshebrew: {
		n: 'reshqubutshebrew',
		u: [0x05e8, 0x05bb],
	},
	// HEBREW LETTER RESH + HEBREW POINT SEGOL
	reshsegol: {
		n: 'reshsegol',
		u: [0x05e8, 0x05b6],
	},
	// HEBREW LETTER RESH + HEBREW POINT SEGOL
	reshsegolhebrew: {
		n: 'reshsegolhebrew',
		u: [0x05e8, 0x05b6],
	},
	// HEBREW LETTER RESH + HEBREW POINT SHEVA
	reshsheva: {
		n: 'reshsheva',
		u: [0x05e8, 0x05b0],
	},
	// HEBREW LETTER RESH + HEBREW POINT SHEVA
	reshshevahebrew: {
		n: 'reshshevahebrew',
		u: [0x05e8, 0x05b0],
	},
	// HEBREW LETTER RESH + HEBREW POINT TSERE
	reshtsere: {
		n: 'reshtsere',
		u: [0x05e8, 0x05b5],
	},
	// HEBREW LETTER RESH + HEBREW POINT TSERE
	reshtserehebrew: {
		n: 'reshtserehebrew',
		u: [0x05e8, 0x05b5],
	},
	// REVERSED TILDE
	reversedtilde: {
		n: 'reversedtilde',
		u: 0x223d,
	},
	// HEBREW ACCENT REVIA
	reviahebrew: {
		n: 'reviahebrew',
		u: 0x0597,
	},
	// HEBREW ACCENT REVIA
	reviamugrashhebrew: {
		n: 'reviamugrashhebrew',
		u: 0x0597,
	},
	// REVERSED NOT SIGN
	revlogicalnot: {
		n: 'revlogicalnot',
		u: 0x2310,
	},
	// LATIN SMALL LETTER R WITH FISHHOOK
	rfishhook: {
		n: 'rfishhook',
		u: 0x027e,
	},
	// LATIN SMALL LETTER REVERSED R WITH FISHHOOK
	rfishhookreversed: {
		n: 'rfishhookreversed',
		u: 0x027f,
	},
	// BENGALI LETTER RHA
	rhabengali: {
		n: 'rhabengali',
		u: 0x09dd,
	},
	// DEVANAGARI LETTER RHA
	rhadeva: {
		n: 'rhadeva',
		u: 0x095d,
	},
	// GREEK SMALL LETTER RHO
	rho: {
		n: 'rho',
		u: 0x03c1,
	},
	// LATIN SMALL LETTER R WITH TAIL
	rhook: {
		n: 'rhook',
		u: 0x027d,
	},
	// LATIN SMALL LETTER TURNED R WITH HOOK
	rhookturned: {
		n: 'rhookturned',
		u: 0x027b,
	},
	// MODIFIER LETTER SMALL TURNED R WITH HOOK
	rhookturnedsuperior: {
		n: 'rhookturnedsuperior',
		u: 0x02b5,
	},
	// GREEK RHO SYMBOL
	rhosymbolgreek: {
		n: 'rhosymbolgreek',
		u: 0x03f1,
	},
	// MODIFIER LETTER RHOTIC HOOK
	rhotichookmod: {
		n: 'rhotichookmod',
		u: 0x02de,
	},
	// CIRCLED HANGUL RIEUL A
	rieulacirclekorean: {
		n: 'rieulacirclekorean',
		u: 0x3271,
	},
	// PARENTHESIZED HANGUL RIEUL A
	rieulaparenkorean: {
		n: 'rieulaparenkorean',
		u: 0x3211,
	},
	// CIRCLED HANGUL RIEUL
	rieulcirclekorean: {
		n: 'rieulcirclekorean',
		u: 0x3263,
	},
	// HANGUL LETTER RIEUL-HIEUH
	rieulhieuhkorean: {
		n: 'rieulhieuhkorean',
		u: 0x3140,
	},
	// HANGUL LETTER RIEUL-KIYEOK
	rieulkiyeokkorean: {
		n: 'rieulkiyeokkorean',
		u: 0x313a,
	},
	// HANGUL LETTER RIEUL-KIYEOK-SIOS
	rieulkiyeoksioskorean: {
		n: 'rieulkiyeoksioskorean',
		u: 0x3169,
	},
	// HANGUL LETTER RIEUL
	rieulkorean: {
		n: 'rieulkorean',
		u: 0x3139,
	},
	// HANGUL LETTER RIEUL-MIEUM
	rieulmieumkorean: {
		n: 'rieulmieumkorean',
		u: 0x313b,
	},
	// HANGUL LETTER RIEUL-PANSIOS
	rieulpansioskorean: {
		n: 'rieulpansioskorean',
		u: 0x316c,
	},
	// PARENTHESIZED HANGUL RIEUL
	rieulparenkorean: {
		n: 'rieulparenkorean',
		u: 0x3203,
	},
	// HANGUL LETTER RIEUL-PHIEUPH
	rieulphieuphkorean: {
		n: 'rieulphieuphkorean',
		u: 0x313f,
	},
	// HANGUL LETTER RIEUL-PIEUP
	rieulpieupkorean: {
		n: 'rieulpieupkorean',
		u: 0x313c,
	},
	// HANGUL LETTER RIEUL-PIEUP-SIOS
	rieulpieupsioskorean: {
		n: 'rieulpieupsioskorean',
		u: 0x316b,
	},
	// HANGUL LETTER RIEUL-SIOS
	rieulsioskorean: {
		n: 'rieulsioskorean',
		u: 0x313d,
	},
	// HANGUL LETTER RIEUL-THIEUTH
	rieulthieuthkorean: {
		n: 'rieulthieuthkorean',
		u: 0x313e,
	},
	// HANGUL LETTER RIEUL-TIKEUT
	rieultikeutkorean: {
		n: 'rieultikeutkorean',
		u: 0x316a,
	},
	// HANGUL LETTER RIEUL-YEORINHIEUH
	rieulyeorinhieuhkorean: {
		n: 'rieulyeorinhieuhkorean',
		u: 0x316d,
	},
	// RIGHT ANGLE
	rightangle: {
		n: 'rightangle',
		u: 0x221f,
	},
	// COMBINING RIGHT TACK BELOW
	righttackbelowcmb: {
		n: 'righttackbelowcmb',
		u: 0x0319,
	},
	// RIGHT TRIANGLE
	righttriangle: {
		n: 'righttriangle',
		u: 0x22bf,
	},
	// HIRAGANA LETTER RI
	rihiragana: {
		n: 'rihiragana',
		u: 0x308a,
	},
	// KATAKANA LETTER RI
	rikatakana: {
		n: 'rikatakana',
		u: 0x30ea,
	},
	// HALFWIDTH KATAKANA LETTER RI
	rikatakanahalfwidth: {
		n: 'rikatakanahalfwidth',
		u: 0xff98,
	},
	// RING ABOVE
	ring: {
		n: 'ring',
		u: 0x02da,
	},
	// COMBINING RING BELOW
	ringbelowcmb: {
		n: 'ringbelowcmb',
		u: 0x0325,
	},
	// COMBINING RING ABOVE
	ringcmb: {
		n: 'ringcmb',
		u: 0x030a,
	},
	// MODIFIER LETTER LEFT HALF RING
	ringhalfleft: {
		n: 'ringhalfleft',
		u: 0x02bf,
	},
	// ARMENIAN MODIFIER LETTER LEFT HALF RING
	ringhalfleftarmenian: {
		n: 'ringhalfleftarmenian',
		u: 0x0559,
	},
	// COMBINING LEFT HALF RING BELOW
	ringhalfleftbelowcmb: {
		n: 'ringhalfleftbelowcmb',
		u: 0x031c,
	},
	// MODIFIER LETTER CENTRED LEFT HALF RING
	ringhalfleftcentered: {
		n: 'ringhalfleftcentered',
		u: 0x02d3,
	},
	// MODIFIER LETTER RIGHT HALF RING
	ringhalfright: {
		n: 'ringhalfright',
		u: 0x02be,
	},
	// COMBINING RIGHT HALF RING BELOW
	ringhalfrightbelowcmb: {
		n: 'ringhalfrightbelowcmb',
		u: 0x0339,
	},
	// MODIFIER LETTER CENTRED RIGHT HALF RING
	ringhalfrightcentered: {
		n: 'ringhalfrightcentered',
		u: 0x02d2,
	},
	// LATIN SMALL LETTER R WITH INVERTED BREVE
	rinvertedbreve: {
		n: 'rinvertedbreve',
		u: 0x0213,
	},
	// SQUARE RITTORU
	rittorusquare: {
		n: 'rittorusquare',
		u: 0x3351,
	},
	// LATIN SMALL LETTER R WITH LINE BELOW
	rlinebelow: {
		n: 'rlinebelow',
		u: 0x1e5f,
	},
	// LATIN SMALL LETTER R WITH LONG LEG
	rlongleg: {
		n: 'rlongleg',
		u: 0x027c,
	},
	// LATIN SMALL LETTER TURNED R WITH LONG LEG
	rlonglegturned: {
		n: 'rlonglegturned',
		u: 0x027a,
	},
	// FULLWIDTH LATIN SMALL LETTER R
	rmonospace: {
		n: 'rmonospace',
		u: 0xff52,
	},
	// HIRAGANA LETTER RO
	rohiragana: {
		n: 'rohiragana',
		u: 0x308d,
	},
	// KATAKANA LETTER RO
	rokatakana: {
		n: 'rokatakana',
		u: 0x30ed,
	},
	// HALFWIDTH KATAKANA LETTER RO
	rokatakanahalfwidth: {
		n: 'rokatakanahalfwidth',
		u: 0xff9b,
	},
	// THAI CHARACTER RO RUA
	roruathai: {
		n: 'roruathai',
		u: 0x0e23,
	},
	// PARENTHESIZED LATIN SMALL LETTER R
	rparen: {
		n: 'rparen',
		u: 0x24ad,
	},
	// BENGALI LETTER RRA
	rrabengali: {
		n: 'rrabengali',
		u: 0x09dc,
	},
	// DEVANAGARI LETTER RRA
	rradeva: {
		n: 'rradeva',
		u: 0x0931,
	},
	// GURMUKHI LETTER RRA
	rragurmukhi: {
		n: 'rragurmukhi',
		u: 0x0a5c,
	},
	// ARABIC LETTER RREH
	rreharabic: {
		n: 'rreharabic',
		u: 0x0691,
	},
	// ARABIC LETTER RREH FINAL FORM
	rrehfinalarabic: {
		n: 'rrehfinalarabic',
		u: 0xfb8d,
	},
	// BENGALI LETTER VOCALIC RR
	rrvocalicbengali: {
		n: 'rrvocalicbengali',
		u: 0x09e0,
	},
	// DEVANAGARI LETTER VOCALIC RR
	rrvocalicdeva: {
		n: 'rrvocalicdeva',
		u: 0x0960,
	},
	// GUJARATI LETTER VOCALIC RR
	rrvocalicgujarati: {
		n: 'rrvocalicgujarati',
		u: 0x0ae0,
	},
	// BENGALI VOWEL SIGN VOCALIC RR
	rrvocalicvowelsignbengali: {
		n: 'rrvocalicvowelsignbengali',
		u: 0x09c4,
	},
	// DEVANAGARI VOWEL SIGN VOCALIC RR
	rrvocalicvowelsigndeva: {
		n: 'rrvocalicvowelsigndeva',
		u: 0x0944,
	},
	// GUJARATI VOWEL SIGN VOCALIC RR
	rrvocalicvowelsigngujarati: {
		n: 'rrvocalicvowelsigngujarati',
		u: 0x0ac4,
	},
	// <private-use-F6F1>
	rsuperior: {
		n: 'rsuperior',
		u: 0xf6f1,
	},
	// RIGHT HALF BLOCK
	rtblock: {
		n: 'rtblock',
		u: 0x2590,
	},
	// LATIN SMALL LETTER TURNED R
	rturned: {
		n: 'rturned',
		u: 0x0279,
	},
	// MODIFIER LETTER SMALL TURNED R
	rturnedsuperior: {
		n: 'rturnedsuperior',
		u: 0x02b4,
	},
	// HIRAGANA LETTER RU
	ruhiragana: {
		n: 'ruhiragana',
		u: 0x308b,
	},
	// KATAKANA LETTER RU
	rukatakana: {
		n: 'rukatakana',
		u: 0x30eb,
	},
	// HALFWIDTH KATAKANA LETTER RU
	rukatakanahalfwidth: {
		n: 'rukatakanahalfwidth',
		u: 0xff99,
	},
	// BENGALI RUPEE MARK
	rupeemarkbengali: {
		n: 'rupeemarkbengali',
		u: 0x09f2,
	},
	// BENGALI RUPEE SIGN
	rupeesignbengali: {
		n: 'rupeesignbengali',
		u: 0x09f3,
	},
	// <private-use-F6DD>
	rupiah: {
		n: 'rupiah',
		u: 0xf6dd,
	},
	// THAI CHARACTER RU
	ruthai: {
		n: 'ruthai',
		u: 0x0e24,
	},
	// BENGALI LETTER VOCALIC R
	rvocalicbengali: {
		n: 'rvocalicbengali',
		u: 0x098b,
	},
	// DEVANAGARI LETTER VOCALIC R
	rvocalicdeva: {
		n: 'rvocalicdeva',
		u: 0x090b,
	},
	// GUJARATI LETTER VOCALIC R
	rvocalicgujarati: {
		n: 'rvocalicgujarati',
		u: 0x0a8b,
	},
	// BENGALI VOWEL SIGN VOCALIC R
	rvocalicvowelsignbengali: {
		n: 'rvocalicvowelsignbengali',
		u: 0x09c3,
	},
	// DEVANAGARI VOWEL SIGN VOCALIC R
	rvocalicvowelsigndeva: {
		n: 'rvocalicvowelsigndeva',
		u: 0x0943,
	},
	// GUJARATI VOWEL SIGN VOCALIC R
	rvocalicvowelsigngujarati: {
		n: 'rvocalicvowelsigngujarati',
		u: 0x0ac3,
	},
	// LATIN SMALL LETTER S
	s: {
		n: 's',
		u: 0x0073,
	},
	// BENGALI LETTER SA
	sabengali: {
		n: 'sabengali',
		u: 0x09b8,
	},
	// LATIN SMALL LETTER S WITH ACUTE
	sacute: {
		n: 'sacute',
		u: 0x015b,
	},
	// LATIN SMALL LETTER S WITH ACUTE AND DOT ABOVE
	sacutedotaccent: {
		n: 'sacutedotaccent',
		u: 0x1e65,
	},
	// ARABIC LETTER SAD
	sadarabic: {
		n: 'sadarabic',
		u: 0x0635,
	},
	// DEVANAGARI LETTER SA
	sadeva: {
		n: 'sadeva',
		u: 0x0938,
	},
	// ARABIC LETTER SAD FINAL FORM
	sadfinalarabic: {
		n: 'sadfinalarabic',
		u: 0xfeba,
	},
	// ARABIC LETTER SAD INITIAL FORM
	sadinitialarabic: {
		n: 'sadinitialarabic',
		u: 0xfebb,
	},
	// ARABIC LETTER SAD MEDIAL FORM
	sadmedialarabic: {
		n: 'sadmedialarabic',
		u: 0xfebc,
	},
	// GUJARATI LETTER SA
	sagujarati: {
		n: 'sagujarati',
		u: 0x0ab8,
	},
	// GURMUKHI LETTER SA
	sagurmukhi: {
		n: 'sagurmukhi',
		u: 0x0a38,
	},
	// HIRAGANA LETTER SA
	sahiragana: {
		n: 'sahiragana',
		u: 0x3055,
	},
	// KATAKANA LETTER SA
	sakatakana: {
		n: 'sakatakana',
		u: 0x30b5,
	},
	// HALFWIDTH KATAKANA LETTER SA
	sakatakanahalfwidth: {
		n: 'sakatakanahalfwidth',
		u: 0xff7b,
	},
	// ARABIC LIGATURE SALLALLAHOU ALAYHE WASALLAM
	sallallahoualayhewasallamarabic: {
		n: 'sallallahoualayhewasallamarabic',
		u: 0xfdfa,
	},
	// HEBREW LETTER SAMEKH
	samekh: {
		n: 'samekh',
		u: 0x05e1,
	},
	// HEBREW LETTER SAMEKH WITH DAGESH
	samekhdagesh: {
		n: 'samekhdagesh',
		u: 0xfb41,
	},
	// HEBREW LETTER SAMEKH WITH DAGESH
	samekhdageshhebrew: {
		n: 'samekhdageshhebrew',
		u: 0xfb41,
	},
	// HEBREW LETTER SAMEKH
	samekhhebrew: {
		n: 'samekhhebrew',
		u: 0x05e1,
	},
	// THAI CHARACTER SARA AA
	saraaathai: {
		n: 'saraaathai',
		u: 0x0e32,
	},
	// THAI CHARACTER SARA AE
	saraaethai: {
		n: 'saraaethai',
		u: 0x0e41,
	},
	// THAI CHARACTER SARA AI MAIMALAI
	saraaimaimalaithai: {
		n: 'saraaimaimalaithai',
		u: 0x0e44,
	},
	// THAI CHARACTER SARA AI MAIMUAN
	saraaimaimuanthai: {
		n: 'saraaimaimuanthai',
		u: 0x0e43,
	},
	// THAI CHARACTER SARA AM
	saraamthai: {
		n: 'saraamthai',
		u: 0x0e33,
	},
	// THAI CHARACTER SARA A
	saraathai: {
		n: 'saraathai',
		u: 0x0e30,
	},
	// THAI CHARACTER SARA E
	saraethai: {
		n: 'saraethai',
		u: 0x0e40,
	},
	// <private-use-F886>
	saraiileftthai: {
		n: 'saraiileftthai',
		u: 0xf886,
	},
	// THAI CHARACTER SARA II
	saraiithai: {
		n: 'saraiithai',
		u: 0x0e35,
	},
	// <private-use-F885>
	saraileftthai: {
		n: 'saraileftthai',
		u: 0xf885,
	},
	// THAI CHARACTER SARA I
	saraithai: {
		n: 'saraithai',
		u: 0x0e34,
	},
	// THAI CHARACTER SARA O
	saraothai: {
		n: 'saraothai',
		u: 0x0e42,
	},
	// <private-use-F888>
	saraueeleftthai: {
		n: 'saraueeleftthai',
		u: 0xf888,
	},
	// THAI CHARACTER SARA UEE
	saraueethai: {
		n: 'saraueethai',
		u: 0x0e37,
	},
	// <private-use-F887>
	saraueleftthai: {
		n: 'saraueleftthai',
		u: 0xf887,
	},
	// THAI CHARACTER SARA UE
	sarauethai: {
		n: 'sarauethai',
		u: 0x0e36,
	},
	// THAI CHARACTER SARA U
	sarauthai: {
		n: 'sarauthai',
		u: 0x0e38,
	},
	// THAI CHARACTER SARA UU
	sarauuthai: {
		n: 'sarauuthai',
		u: 0x0e39,
	},
	// BOPOMOFO LETTER S
	sbopomofo: {
		n: 'sbopomofo',
		u: 0x3119,
	},
	// LATIN SMALL LETTER S WITH CARON
	scaron: {
		n: 'scaron',
		u: 0x0161,
	},
	// LATIN SMALL LETTER S WITH CARON AND DOT ABOVE
	scarondotaccent: {
		n: 'scarondotaccent',
		u: 0x1e67,
	},
	// LATIN SMALL LETTER S WITH CEDILLA
	scedilla: {
		n: 'scedilla',
		u: 0x015f,
	},
	// LATIN SMALL LETTER SCHWA
	schwa: {
		n: 'schwa',
		u: 0x0259,
	},
	// CYRILLIC SMALL LETTER SCHWA
	schwacyrillic: {
		n: 'schwacyrillic',
		u: 0x04d9,
	},
	// CYRILLIC SMALL LETTER SCHWA WITH DIAERESIS
	schwadieresiscyrillic: {
		n: 'schwadieresiscyrillic',
		u: 0x04db,
	},
	// LATIN SMALL LETTER SCHWA WITH HOOK
	schwahook: {
		n: 'schwahook',
		u: 0x025a,
	},
	// CIRCLED LATIN SMALL LETTER S
	scircle: {
		n: 'scircle',
		u: 0x24e2,
	},
	// LATIN SMALL LETTER S WITH CIRCUMFLEX
	scircumflex: {
		n: 'scircumflex',
		u: 0x015d,
	},
	// LATIN SMALL LETTER S WITH COMMA BELOW
	scommaaccent: {
		n: 'scommaaccent',
		u: 0x0219,
	},
	// LATIN SMALL LETTER S WITH DOT ABOVE
	sdotaccent: {
		n: 'sdotaccent',
		u: 0x1e61,
	},
	// LATIN SMALL LETTER S WITH DOT BELOW
	sdotbelow: {
		n: 'sdotbelow',
		u: 0x1e63,
	},
	// LATIN SMALL LETTER S WITH DOT BELOW AND DOT ABOVE
	sdotbelowdotaccent: {
		n: 'sdotbelowdotaccent',
		u: 0x1e69,
	},
	// COMBINING SEAGULL BELOW
	seagullbelowcmb: {
		n: 'seagullbelowcmb',
		u: 0x033c,
	},
	// DOUBLE PRIME
	second: {
		n: 'second',
		u: 0x2033,
	},
	// MODIFIER LETTER ACUTE ACCENT
	secondtonechinese: {
		n: 'secondtonechinese',
		u: 0x02ca,
	},
	// SECTION SIGN
	section: {
		n: 'section',
		u: 0x00a7,
	},
	// ARABIC LETTER SEEN
	seenarabic: {
		n: 'seenarabic',
		u: 0x0633,
	},
	// ARABIC LETTER SEEN FINAL FORM
	seenfinalarabic: {
		n: 'seenfinalarabic',
		u: 0xfeb2,
	},
	// ARABIC LETTER SEEN INITIAL FORM
	seeninitialarabic: {
		n: 'seeninitialarabic',
		u: 0xfeb3,
	},
	// ARABIC LETTER SEEN MEDIAL FORM
	seenmedialarabic: {
		n: 'seenmedialarabic',
		u: 0xfeb4,
	},
	// HEBREW POINT SEGOL
	segol: {
		n: 'segol',
		u: 0x05b6,
	},
	// HEBREW POINT SEGOL
	segol13: {
		n: 'segol13',
		u: 0x05b6,
	},
	// HEBREW POINT SEGOL
	segol1f: {
		n: 'segol1f',
		u: 0x05b6,
	},
	// HEBREW POINT SEGOL
	segol2c: {
		n: 'segol2c',
		u: 0x05b6,
	},
	// HEBREW POINT SEGOL
	segolhebrew: {
		n: 'segolhebrew',
		u: 0x05b6,
	},
	// HEBREW POINT SEGOL
	segolnarrowhebrew: {
		n: 'segolnarrowhebrew',
		u: 0x05b6,
	},
	// HEBREW POINT SEGOL
	segolquarterhebrew: {
		n: 'segolquarterhebrew',
		u: 0x05b6,
	},
	// HEBREW ACCENT SEGOL
	segoltahebrew: {
		n: 'segoltahebrew',
		u: 0x0592,
	},
	// HEBREW POINT SEGOL
	segolwidehebrew: {
		n: 'segolwidehebrew',
		u: 0x05b6,
	},
	// ARMENIAN SMALL LETTER SEH
	seharmenian: {
		n: 'seharmenian',
		u: 0x057d,
	},
	// HIRAGANA LETTER SE
	sehiragana: {
		n: 'sehiragana',
		u: 0x305b,
	},
	// KATAKANA LETTER SE
	sekatakana: {
		n: 'sekatakana',
		u: 0x30bb,
	},
	// HALFWIDTH KATAKANA LETTER SE
	sekatakanahalfwidth: {
		n: 'sekatakanahalfwidth',
		u: 0xff7e,
	},
	// SEMICOLON
	semicolon: {
		n: 'semicolon',
		u: 0x003b,
	},
	// ARABIC SEMICOLON
	semicolonarabic: {
		n: 'semicolonarabic',
		u: 0x061b,
	},
	// FULLWIDTH SEMICOLON
	semicolonmonospace: {
		n: 'semicolonmonospace',
		u: 0xff1b,
	},
	// SMALL SEMICOLON
	semicolonsmall: {
		n: 'semicolonsmall',
		u: 0xfe54,
		f: [0x003b],
	},
	// KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK
	semivoicedmarkkana: {
		n: 'semivoicedmarkkana',
		u: 0x309c,
	},
	// HALFWIDTH KATAKANA SEMI-VOICED SOUND MARK
	semivoicedmarkkanahalfwidth: {
		n: 'semivoicedmarkkanahalfwidth',
		u: 0xff9f,
	},
	// SQUARE SENTI
	sentisquare: {
		n: 'sentisquare',
		u: 0x3322,
	},
	// SQUARE SENTO
	sentosquare: {
		n: 'sentosquare',
		u: 0x3323,
	},
	// DIGIT SEVEN
	seven: {
		n: 'seven',
		u: 0x0037,
	},
	// ARABIC-INDIC DIGIT SEVEN
	sevenarabic: {
		n: 'sevenarabic',
		u: 0x0667,
	},
	// BENGALI DIGIT SEVEN
	sevenbengali: {
		n: 'sevenbengali',
		u: 0x09ed,
	},
	// CIRCLED DIGIT SEVEN
	sevencircle: {
		n: 'sevencircle',
		u: 0x2466,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT SEVEN
	sevencircleinversesansserif: {
		n: 'sevencircleinversesansserif',
		u: 0x2790,
	},
	// DEVANAGARI DIGIT SEVEN
	sevendeva: {
		n: 'sevendeva',
		u: 0x096d,
	},
	// VULGAR FRACTION SEVEN EIGHTHS
	seveneighths: {
		n: 'seveneighths',
		u: 0x215e,
	},
	// GUJARATI DIGIT SEVEN
	sevengujarati: {
		n: 'sevengujarati',
		u: 0x0aed,
	},
	// GURMUKHI DIGIT SEVEN
	sevengurmukhi: {
		n: 'sevengurmukhi',
		u: 0x0a6d,
	},
	// ARABIC-INDIC DIGIT SEVEN
	sevenhackarabic: {
		n: 'sevenhackarabic',
		u: 0x0667,
	},
	// HANGZHOU NUMERAL SEVEN
	sevenhangzhou: {
		n: 'sevenhangzhou',
		u: 0x3027,
	},
	// PARENTHESIZED IDEOGRAPH SEVEN
	sevenideographicparen: {
		n: 'sevenideographicparen',
		u: 0x3226,
	},
	// SUBSCRIPT SEVEN
	seveninferior: {
		n: 'seveninferior',
		u: 0x2087,
	},
	// FULLWIDTH DIGIT SEVEN
	sevenmonospace: {
		n: 'sevenmonospace',
		u: 0xff17,
	},
	// <private-use-F737>
	sevenoldstyle: {
		n: 'sevenoldstyle',
		u: 0xf737,
	},
	// PARENTHESIZED DIGIT SEVEN
	sevenparen: {
		n: 'sevenparen',
		u: 0x247a,
	},
	// DIGIT SEVEN FULL STOP
	sevenperiod: {
		n: 'sevenperiod',
		u: 0x248e,
	},
	// EXTENDED ARABIC-INDIC DIGIT SEVEN
	sevenpersian: {
		n: 'sevenpersian',
		u: 0x06f7,
	},
	// SMALL ROMAN NUMERAL SEVEN
	sevenroman: {
		n: 'sevenroman',
		u: 0x2176,
	},
	// SUPERSCRIPT SEVEN
	sevensuperior: {
		n: 'sevensuperior',
		u: 0x2077,
	},
	// CIRCLED NUMBER SEVENTEEN
	seventeencircle: {
		n: 'seventeencircle',
		u: 0x2470,
	},
	// PARENTHESIZED NUMBER SEVENTEEN
	seventeenparen: {
		n: 'seventeenparen',
		u: 0x2484,
	},
	// NUMBER SEVENTEEN FULL STOP
	seventeenperiod: {
		n: 'seventeenperiod',
		u: 0x2498,
	},
	// THAI DIGIT SEVEN
	seventhai: {
		n: 'seventhai',
		u: 0x0e57,
	},
	// SOFT HYPHEN
	sfthyphen: {
		n: 'sfthyphen',
		u: 0x00ad,
	},
	// ARMENIAN SMALL LETTER SHA
	shaarmenian: {
		n: 'shaarmenian',
		u: 0x0577,
	},
	// BENGALI LETTER SHA
	shabengali: {
		n: 'shabengali',
		u: 0x09b6,
	},
	// CYRILLIC SMALL LETTER SHA
	shacyrillic: {
		n: 'shacyrillic',
		u: 0x0448,
	},
	// ARABIC SHADDA
	shaddaarabic: {
		n: 'shaddaarabic',
		u: 0x0651,
	},
	// ARABIC LIGATURE SHADDA WITH DAMMA ISOLATED FORM
	shaddadammaarabic: {
		n: 'shaddadammaarabic',
		u: 0xfc61,
	},
	// ARABIC LIGATURE SHADDA WITH DAMMATAN ISOLATED FORM
	shaddadammatanarabic: {
		n: 'shaddadammatanarabic',
		u: 0xfc5e,
	},
	// ARABIC LIGATURE SHADDA WITH FATHA ISOLATED FORM
	shaddafathaarabic: {
		n: 'shaddafathaarabic',
		u: 0xfc60,
	},
	// ARABIC SHADDA + ARABIC FATHATAN
	shaddafathatanarabic: {
		n: 'shaddafathatanarabic',
		u: [0x0651, 0x064b],
	},
	// ARABIC LIGATURE SHADDA WITH KASRA ISOLATED FORM
	shaddakasraarabic: {
		n: 'shaddakasraarabic',
		u: 0xfc62,
	},
	// ARABIC LIGATURE SHADDA WITH KASRATAN ISOLATED FORM
	shaddakasratanarabic: {
		n: 'shaddakasratanarabic',
		u: 0xfc5f,
	},
	// MEDIUM SHADE
	shade: {
		n: 'shade',
		u: 0x2592,
	},
	// DARK SHADE
	shadedark: {
		n: 'shadedark',
		u: 0x2593,
	},
	// LIGHT SHADE
	shadelight: {
		n: 'shadelight',
		u: 0x2591,
	},
	// MEDIUM SHADE
	shademedium: {
		n: 'shademedium',
		u: 0x2592,
	},
	// DEVANAGARI LETTER SHA
	shadeva: {
		n: 'shadeva',
		u: 0x0936,
	},
	// GUJARATI LETTER SHA
	shagujarati: {
		n: 'shagujarati',
		u: 0x0ab6,
	},
	// GURMUKHI LETTER SHA
	shagurmukhi: {
		n: 'shagurmukhi',
		u: 0x0a36,
	},
	// HEBREW ACCENT SHALSHELET
	shalshelethebrew: {
		n: 'shalshelethebrew',
		u: 0x0593,
	},
	// BOPOMOFO LETTER SH
	shbopomofo: {
		n: 'shbopomofo',
		u: 0x3115,
	},
	// CYRILLIC SMALL LETTER SHCHA
	shchacyrillic: {
		n: 'shchacyrillic',
		u: 0x0449,
	},
	// ARABIC LETTER SHEEN
	sheenarabic: {
		n: 'sheenarabic',
		u: 0x0634,
	},
	// ARABIC LETTER SHEEN FINAL FORM
	sheenfinalarabic: {
		n: 'sheenfinalarabic',
		u: 0xfeb6,
	},
	// ARABIC LETTER SHEEN INITIAL FORM
	sheeninitialarabic: {
		n: 'sheeninitialarabic',
		u: 0xfeb7,
	},
	// ARABIC LETTER SHEEN MEDIAL FORM
	sheenmedialarabic: {
		n: 'sheenmedialarabic',
		u: 0xfeb8,
	},
	// COPTIC SMALL LETTER SHEI
	sheicoptic: {
		n: 'sheicoptic',
		u: 0x03e3,
	},
	// NEW SHEQEL SIGN
	sheqel: {
		n: 'sheqel',
		u: 0x20aa,
	},
	// NEW SHEQEL SIGN
	sheqelhebrew: {
		n: 'sheqelhebrew',
		u: 0x20aa,
	},
	// HEBREW POINT SHEVA
	sheva: {
		n: 'sheva',
		u: 0x05b0,
	},
	// HEBREW POINT SHEVA
	sheva115: {
		n: 'sheva115',
		u: 0x05b0,
	},
	// HEBREW POINT SHEVA
	sheva15: {
		n: 'sheva15',
		u: 0x05b0,
	},
	// HEBREW POINT SHEVA
	sheva22: {
		n: 'sheva22',
		u: 0x05b0,
	},
	// HEBREW POINT SHEVA
	sheva2e: {
		n: 'sheva2e',
		u: 0x05b0,
	},
	// HEBREW POINT SHEVA
	shevahebrew: {
		n: 'shevahebrew',
		u: 0x05b0,
	},
	// HEBREW POINT SHEVA
	shevanarrowhebrew: {
		n: 'shevanarrowhebrew',
		u: 0x05b0,
	},
	// HEBREW POINT SHEVA
	shevaquarterhebrew: {
		n: 'shevaquarterhebrew',
		u: 0x05b0,
	},
	// HEBREW POINT SHEVA
	shevawidehebrew: {
		n: 'shevawidehebrew',
		u: 0x05b0,
	},
	// CYRILLIC SMALL LETTER SHHA
	shhacyrillic: {
		n: 'shhacyrillic',
		u: 0x04bb,
	},
	// COPTIC SMALL LETTER SHIMA
	shimacoptic: {
		n: 'shimacoptic',
		u: 0x03ed,
	},
	// HEBREW LETTER SHIN
	shin: {
		n: 'shin',
		u: 0x05e9,
	},
	// HEBREW LETTER SHIN WITH DAGESH
	shindagesh: {
		n: 'shindagesh',
		u: 0xfb49,
	},
	// HEBREW LETTER SHIN WITH DAGESH
	shindageshhebrew: {
		n: 'shindageshhebrew',
		u: 0xfb49,
	},
	// HEBREW LETTER SHIN WITH DAGESH AND SHIN DOT
	shindageshshindot: {
		n: 'shindageshshindot',
		u: 0xfb2c,
	},
	// HEBREW LETTER SHIN WITH DAGESH AND SHIN DOT
	shindageshshindothebrew: {
		n: 'shindageshshindothebrew',
		u: 0xfb2c,
	},
	// HEBREW LETTER SHIN WITH DAGESH AND SIN DOT
	shindageshsindot: {
		n: 'shindageshsindot',
		u: 0xfb2d,
	},
	// HEBREW LETTER SHIN WITH DAGESH AND SIN DOT
	shindageshsindothebrew: {
		n: 'shindageshsindothebrew',
		u: 0xfb2d,
	},
	// HEBREW POINT SHIN DOT
	shindothebrew: {
		n: 'shindothebrew',
		u: 0x05c1,
	},
	// HEBREW LETTER SHIN
	shinhebrew: {
		n: 'shinhebrew',
		u: 0x05e9,
	},
	// HEBREW LETTER SHIN WITH SHIN DOT
	shinshindot: {
		n: 'shinshindot',
		u: 0xfb2a,
	},
	// HEBREW LETTER SHIN WITH SHIN DOT
	shinshindothebrew: {
		n: 'shinshindothebrew',
		u: 0xfb2a,
	},
	// HEBREW LETTER SHIN WITH SIN DOT
	shinsindot: {
		n: 'shinsindot',
		u: 0xfb2b,
	},
	// HEBREW LETTER SHIN WITH SIN DOT
	shinsindothebrew: {
		n: 'shinsindothebrew',
		u: 0xfb2b,
	},
	// LATIN SMALL LETTER S WITH HOOK
	shook: {
		n: 'shook',
		u: 0x0282,
	},
	// GREEK SMALL LETTER SIGMA
	sigma: {
		n: 'sigma',
		u: 0x03c3,
	},
	// GREEK SMALL LETTER FINAL SIGMA
	sigma1: {
		n: 'sigma1',
		u: 0x03c2,
	},
	// GREEK SMALL LETTER FINAL SIGMA
	sigmafinal: {
		n: 'sigmafinal',
		u: 0x03c2,
	},
	// GREEK LUNATE SIGMA SYMBOL
	sigmalunatesymbolgreek: {
		n: 'sigmalunatesymbolgreek',
		u: 0x03f2,
	},
	// HIRAGANA LETTER SI
	sihiragana: {
		n: 'sihiragana',
		u: 0x3057,
	},
	// KATAKANA LETTER SI
	sikatakana: {
		n: 'sikatakana',
		u: 0x30b7,
	},
	// HALFWIDTH KATAKANA LETTER SI
	sikatakanahalfwidth: {
		n: 'sikatakanahalfwidth',
		u: 0xff7c,
	},
	// HEBREW POINT METEG
	siluqhebrew: {
		n: 'siluqhebrew',
		u: 0x05bd,
	},
	// HEBREW POINT METEG
	siluqlefthebrew: {
		n: 'siluqlefthebrew',
		u: 0x05bd,
	},
	// TILDE OPERATOR
	similar: {
		n: 'similar',
		u: 0x223c,
	},
	// HEBREW POINT SIN DOT
	sindothebrew: {
		n: 'sindothebrew',
		u: 0x05c2,
	},
	// CIRCLED HANGUL SIOS A
	siosacirclekorean: {
		n: 'siosacirclekorean',
		u: 0x3274,
	},
	// PARENTHESIZED HANGUL SIOS A
	siosaparenkorean: {
		n: 'siosaparenkorean',
		u: 0x3214,
	},
	// HANGUL LETTER SIOS-CIEUC
	sioscieuckorean: {
		n: 'sioscieuckorean',
		u: 0x317e,
	},
	// CIRCLED HANGUL SIOS
	sioscirclekorean: {
		n: 'sioscirclekorean',
		u: 0x3266,
	},
	// HANGUL LETTER SIOS-KIYEOK
	sioskiyeokkorean: {
		n: 'sioskiyeokkorean',
		u: 0x317a,
	},
	// HANGUL LETTER SIOS
	sioskorean: {
		n: 'sioskorean',
		u: 0x3145,
	},
	// HANGUL LETTER SIOS-NIEUN
	siosnieunkorean: {
		n: 'siosnieunkorean',
		u: 0x317b,
	},
	// PARENTHESIZED HANGUL SIOS
	siosparenkorean: {
		n: 'siosparenkorean',
		u: 0x3206,
	},
	// HANGUL LETTER SIOS-PIEUP
	siospieupkorean: {
		n: 'siospieupkorean',
		u: 0x317d,
	},
	// HANGUL LETTER SIOS-TIKEUT
	siostikeutkorean: {
		n: 'siostikeutkorean',
		u: 0x317c,
	},
	// DIGIT SIX
	six: {
		n: 'six',
		u: 0x0036,
	},
	// ARABIC-INDIC DIGIT SIX
	sixarabic: {
		n: 'sixarabic',
		u: 0x0666,
	},
	// BENGALI DIGIT SIX
	sixbengali: {
		n: 'sixbengali',
		u: 0x09ec,
	},
	// CIRCLED DIGIT SIX
	sixcircle: {
		n: 'sixcircle',
		u: 0x2465,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT SIX
	sixcircleinversesansserif: {
		n: 'sixcircleinversesansserif',
		u: 0x278f,
	},
	// DEVANAGARI DIGIT SIX
	sixdeva: {
		n: 'sixdeva',
		u: 0x096c,
	},
	// GUJARATI DIGIT SIX
	sixgujarati: {
		n: 'sixgujarati',
		u: 0x0aec,
	},
	// GURMUKHI DIGIT SIX
	sixgurmukhi: {
		n: 'sixgurmukhi',
		u: 0x0a6c,
	},
	// ARABIC-INDIC DIGIT SIX
	sixhackarabic: {
		n: 'sixhackarabic',
		u: 0x0666,
	},
	// HANGZHOU NUMERAL SIX
	sixhangzhou: {
		n: 'sixhangzhou',
		u: 0x3026,
	},
	// PARENTHESIZED IDEOGRAPH SIX
	sixideographicparen: {
		n: 'sixideographicparen',
		u: 0x3225,
	},
	// SUBSCRIPT SIX
	sixinferior: {
		n: 'sixinferior',
		u: 0x2086,
	},
	// FULLWIDTH DIGIT SIX
	sixmonospace: {
		n: 'sixmonospace',
		u: 0xff16,
	},
	// <private-use-F736>
	sixoldstyle: {
		n: 'sixoldstyle',
		u: 0xf736,
	},
	// PARENTHESIZED DIGIT SIX
	sixparen: {
		n: 'sixparen',
		u: 0x2479,
	},
	// DIGIT SIX FULL STOP
	sixperiod: {
		n: 'sixperiod',
		u: 0x248d,
	},
	// EXTENDED ARABIC-INDIC DIGIT SIX
	sixpersian: {
		n: 'sixpersian',
		u: 0x06f6,
	},
	// SMALL ROMAN NUMERAL SIX
	sixroman: {
		n: 'sixroman',
		u: 0x2175,
	},
	// SUPERSCRIPT SIX
	sixsuperior: {
		n: 'sixsuperior',
		u: 0x2076,
	},
	// CIRCLED NUMBER SIXTEEN
	sixteencircle: {
		n: 'sixteencircle',
		u: 0x246f,
	},
	// BENGALI CURRENCY DENOMINATOR SIXTEEN
	sixteencurrencydenominatorbengali: {
		n: 'sixteencurrencydenominatorbengali',
		u: 0x09f9,
	},
	// PARENTHESIZED NUMBER SIXTEEN
	sixteenparen: {
		n: 'sixteenparen',
		u: 0x2483,
	},
	// NUMBER SIXTEEN FULL STOP
	sixteenperiod: {
		n: 'sixteenperiod',
		u: 0x2497,
	},
	// THAI DIGIT SIX
	sixthai: {
		n: 'sixthai',
		u: 0x0e56,
	},
	// SOLIDUS
	slash: {
		n: 'slash',
		u: 0x002f,
	},
	// FULLWIDTH SOLIDUS
	slashmonospace: {
		n: 'slashmonospace',
		u: 0xff0f,
	},
	// LATIN SMALL LETTER LONG S
	slong: {
		n: 'slong',
		u: 0x017f,
	},
	// LATIN SMALL LETTER LONG S WITH DOT ABOVE
	slongdotaccent: {
		n: 'slongdotaccent',
		u: 0x1e9b,
	},
	// WHITE SMILING FACE
	smileface: {
		n: 'smileface',
		u: 0x263a,
	},
	// FULLWIDTH LATIN SMALL LETTER S
	smonospace: {
		n: 'smonospace',
		u: 0xff53,
	},
	// HEBREW PUNCTUATION SOF PASUQ
	sofpasuqhebrew: {
		n: 'sofpasuqhebrew',
		u: 0x05c3,
	},
	// SOFT HYPHEN
	softhyphen: {
		n: 'softhyphen',
		u: 0x00ad,
	},
	// CYRILLIC SMALL LETTER SOFT SIGN
	softsigncyrillic: {
		n: 'softsigncyrillic',
		u: 0x044c,
	},
	// HIRAGANA LETTER SO
	sohiragana: {
		n: 'sohiragana',
		u: 0x305d,
	},
	// KATAKANA LETTER SO
	sokatakana: {
		n: 'sokatakana',
		u: 0x30bd,
	},
	// HALFWIDTH KATAKANA LETTER SO
	sokatakanahalfwidth: {
		n: 'sokatakanahalfwidth',
		u: 0xff7f,
	},
	// COMBINING LONG SOLIDUS OVERLAY
	soliduslongoverlaycmb: {
		n: 'soliduslongoverlaycmb',
		u: 0x0338,
	},
	// COMBINING SHORT SOLIDUS OVERLAY
	solidusshortoverlaycmb: {
		n: 'solidusshortoverlaycmb',
		u: 0x0337,
	},
	// THAI CHARACTER SO RUSI
	sorusithai: {
		n: 'sorusithai',
		u: 0x0e29,
	},
	// THAI CHARACTER SO SALA
	sosalathai: {
		n: 'sosalathai',
		u: 0x0e28,
	},
	// THAI CHARACTER SO SO
	sosothai: {
		n: 'sosothai',
		u: 0x0e0b,
	},
	// THAI CHARACTER SO SUA
	sosuathai: {
		n: 'sosuathai',
		u: 0x0e2a,
	},
	// SPACE
	space: {
		n: 'space',
		u: 0x0020,
	},
	// SPACE
	spacehackarabic: {
		n: 'spacehackarabic',
		u: 0x0020,
	},
	// BLACK SPADE SUIT
	spade: {
		n: 'spade',
		u: 0x2660,
	},
	// BLACK SPADE SUIT
	spadesuitblack: {
		n: 'spadesuitblack',
		u: 0x2660,
	},
	// WHITE SPADE SUIT
	spadesuitwhite: {
		n: 'spadesuitwhite',
		u: 0x2664,
	},
	// PARENTHESIZED LATIN SMALL LETTER S
	sparen: {
		n: 'sparen',
		u: 0x24ae,
	},
	// COMBINING SQUARE BELOW
	squarebelowcmb: {
		n: 'squarebelowcmb',
		u: 0x033b,
	},
	// SQUARE CC
	squarecc: {
		n: 'squarecc',
		u: 0x33c4,
	},
	// SQUARE CM
	squarecm: {
		n: 'squarecm',
		u: 0x339d,
	},
	// SQUARE WITH DIAGONAL CROSSHATCH FILL
	squarediagonalcrosshatchfill: {
		n: 'squarediagonalcrosshatchfill',
		u: 0x25a9,
	},
	// SQUARE WITH HORIZONTAL FILL
	squarehorizontalfill: {
		n: 'squarehorizontalfill',
		u: 0x25a4,
	},
	// SQUARE KG
	squarekg: {
		n: 'squarekg',
		u: 0x338f,
	},
	// SQUARE KM
	squarekm: {
		n: 'squarekm',
		u: 0x339e,
	},
	// SQUARE KM CAPITAL
	squarekmcapital: {
		n: 'squarekmcapital',
		u: 0x33ce,
	},
	// SQUARE LN
	squareln: {
		n: 'squareln',
		u: 0x33d1,
	},
	// SQUARE LOG
	squarelog: {
		n: 'squarelog',
		u: 0x33d2,
	},
	// SQUARE MG
	squaremg: {
		n: 'squaremg',
		u: 0x338e,
	},
	// SQUARE MIL
	squaremil: {
		n: 'squaremil',
		u: 0x33d5,
	},
	// SQUARE MM
	squaremm: {
		n: 'squaremm',
		u: 0x339c,
	},
	// SQUARE M SQUARED
	squaremsquared: {
		n: 'squaremsquared',
		u: 0x33a1,
	},
	// SQUARE WITH ORTHOGONAL CROSSHATCH FILL
	squareorthogonalcrosshatchfill: {
		n: 'squareorthogonalcrosshatchfill',
		u: 0x25a6,
	},
	// SQUARE WITH UPPER LEFT TO LOWER RIGHT FILL
	squareupperlefttolowerrightfill: {
		n: 'squareupperlefttolowerrightfill',
		u: 0x25a7,
	},
	// SQUARE WITH UPPER RIGHT TO LOWER LEFT FILL
	squareupperrighttolowerleftfill: {
		n: 'squareupperrighttolowerleftfill',
		u: 0x25a8,
	},
	// SQUARE WITH VERTICAL FILL
	squareverticalfill: {
		n: 'squareverticalfill',
		u: 0x25a5,
	},
	// WHITE SQUARE CONTAINING BLACK SMALL SQUARE
	squarewhitewithsmallblack: {
		n: 'squarewhitewithsmallblack',
		u: 0x25a3,
	},
	// SQUARE SR
	srsquare: {
		n: 'srsquare',
		u: 0x33db,
	},
	// BENGALI LETTER SSA
	ssabengali: {
		n: 'ssabengali',
		u: 0x09b7,
	},
	// DEVANAGARI LETTER SSA
	ssadeva: {
		n: 'ssadeva',
		u: 0x0937,
	},
	// GUJARATI LETTER SSA
	ssagujarati: {
		n: 'ssagujarati',
		u: 0x0ab7,
	},
	// HANGUL LETTER SSANGCIEUC
	ssangcieuckorean: {
		n: 'ssangcieuckorean',
		u: 0x3149,
	},
	// HANGUL LETTER SSANGHIEUH
	ssanghieuhkorean: {
		n: 'ssanghieuhkorean',
		u: 0x3185,
	},
	// HANGUL LETTER SSANGIEUNG
	ssangieungkorean: {
		n: 'ssangieungkorean',
		u: 0x3180,
	},
	// HANGUL LETTER SSANGKIYEOK
	ssangkiyeokkorean: {
		n: 'ssangkiyeokkorean',
		u: 0x3132,
	},
	// HANGUL LETTER SSANGNIEUN
	ssangnieunkorean: {
		n: 'ssangnieunkorean',
		u: 0x3165,
	},
	// HANGUL LETTER SSANGPIEUP
	ssangpieupkorean: {
		n: 'ssangpieupkorean',
		u: 0x3143,
	},
	// HANGUL LETTER SSANGSIOS
	ssangsioskorean: {
		n: 'ssangsioskorean',
		u: 0x3146,
	},
	// HANGUL LETTER SSANGTIKEUT
	ssangtikeutkorean: {
		n: 'ssangtikeutkorean',
		u: 0x3138,
	},
	// <private-use-F6F2>
	ssuperior: {
		n: 'ssuperior',
		u: 0xf6f2,
	},
	// POUND SIGN
	sterling: {
		n: 'sterling',
		u: 0x00a3,
	},
	// FULLWIDTH POUND SIGN
	sterlingmonospace: {
		n: 'sterlingmonospace',
		u: 0xffe1,
	},
	// COMBINING LONG STROKE OVERLAY
	strokelongoverlaycmb: {
		n: 'strokelongoverlaycmb',
		u: 0x0336,
	},
	// COMBINING SHORT STROKE OVERLAY
	strokeshortoverlaycmb: {
		n: 'strokeshortoverlaycmb',
		u: 0x0335,
	},
	// SUBSET OF
	subset: {
		n: 'subset',
		u: 0x2282,
	},
	// SUBSET OF WITH NOT EQUAL TO
	subsetnotequal: {
		n: 'subsetnotequal',
		u: 0x228a,
	},
	// SUBSET OF OR EQUAL TO
	subsetorequal: {
		n: 'subsetorequal',
		u: 0x2286,
	},
	// SUCCEEDS
	succeeds: {
		n: 'succeeds',
		u: 0x227b,
	},
	// CONTAINS AS MEMBER
	suchthat: {
		n: 'suchthat',
		u: 0x220b,
	},
	// HIRAGANA LETTER SU
	suhiragana: {
		n: 'suhiragana',
		u: 0x3059,
	},
	// KATAKANA LETTER SU
	sukatakana: {
		n: 'sukatakana',
		u: 0x30b9,
	},
	// HALFWIDTH KATAKANA LETTER SU
	sukatakanahalfwidth: {
		n: 'sukatakanahalfwidth',
		u: 0xff7d,
	},
	// ARABIC SUKUN
	sukunarabic: {
		n: 'sukunarabic',
		u: 0x0652,
	},
	// N-ARY SUMMATION
	summation: {
		n: 'summation',
		u: 0x2211,
	},
	// WHITE SUN WITH RAYS
	sun: {
		n: 'sun',
		u: 0x263c,
	},
	// SUPERSET OF
	superset: {
		n: 'superset',
		u: 0x2283,
	},
	// SUPERSET OF WITH NOT EQUAL TO
	supersetnotequal: {
		n: 'supersetnotequal',
		u: 0x228b,
	},
	// SUPERSET OF OR EQUAL TO
	supersetorequal: {
		n: 'supersetorequal',
		u: 0x2287,
	},
	// SQUARE SV
	svsquare: {
		n: 'svsquare',
		u: 0x33dc,
	},
	// SQUARE ERA NAME SYOUWA
	syouwaerasquare: {
		n: 'syouwaerasquare',
		u: 0x337c,
	},
	// LATIN SMALL LETTER T
	t: {
		n: 't',
		u: 0x0074,
	},
	// BENGALI LETTER TA
	tabengali: {
		n: 'tabengali',
		u: 0x09a4,
	},
	// DOWN TACK
	tackdown: {
		n: 'tackdown',
		u: 0x22a4,
	},
	// LEFT TACK
	tackleft: {
		n: 'tackleft',
		u: 0x22a3,
	},
	// DEVANAGARI LETTER TA
	tadeva: {
		n: 'tadeva',
		u: 0x0924,
	},
	// GUJARATI LETTER TA
	tagujarati: {
		n: 'tagujarati',
		u: 0x0aa4,
	},
	// GURMUKHI LETTER TA
	tagurmukhi: {
		n: 'tagurmukhi',
		u: 0x0a24,
	},
	// ARABIC LETTER TAH
	taharabic: {
		n: 'taharabic',
		u: 0x0637,
	},
	// ARABIC LETTER TAH FINAL FORM
	tahfinalarabic: {
		n: 'tahfinalarabic',
		u: 0xfec2,
	},
	// ARABIC LETTER TAH INITIAL FORM
	tahinitialarabic: {
		n: 'tahinitialarabic',
		u: 0xfec3,
	},
	// HIRAGANA LETTER TA
	tahiragana: {
		n: 'tahiragana',
		u: 0x305f,
	},
	// ARABIC LETTER TAH MEDIAL FORM
	tahmedialarabic: {
		n: 'tahmedialarabic',
		u: 0xfec4,
	},
	// SQUARE ERA NAME TAISYOU
	taisyouerasquare: {
		n: 'taisyouerasquare',
		u: 0x337d,
	},
	// KATAKANA LETTER TA
	takatakana: {
		n: 'takatakana',
		u: 0x30bf,
	},
	// HALFWIDTH KATAKANA LETTER TA
	takatakanahalfwidth: {
		n: 'takatakanahalfwidth',
		u: 0xff80,
	},
	// ARABIC TATWEEL
	tatweelarabic: {
		n: 'tatweelarabic',
		u: 0x0640,
	},
	// GREEK SMALL LETTER TAU
	tau: {
		n: 'tau',
		u: 0x03c4,
	},
	// HEBREW LETTER TAV
	tav: {
		n: 'tav',
		u: 0x05ea,
	},
	// HEBREW LETTER TAV WITH DAGESH
	tavdages: {
		n: 'tavdages',
		u: 0xfb4a,
	},
	// HEBREW LETTER TAV WITH DAGESH
	tavdagesh: {
		n: 'tavdagesh',
		u: 0xfb4a,
	},
	// HEBREW LETTER TAV WITH DAGESH
	tavdageshhebrew: {
		n: 'tavdageshhebrew',
		u: 0xfb4a,
	},
	// HEBREW LETTER TAV
	tavhebrew: {
		n: 'tavhebrew',
		u: 0x05ea,
	},
	// LATIN SMALL LETTER T WITH STROKE
	tbar: {
		n: 'tbar',
		u: 0x0167,
	},
	// BOPOMOFO LETTER T
	tbopomofo: {
		n: 'tbopomofo',
		u: 0x310a,
	},
	// LATIN SMALL LETTER T WITH CARON
	tcaron: {
		n: 'tcaron',
		u: 0x0165,
	},
	// LATIN SMALL LETTER TC DIGRAPH WITH CURL
	tccurl: {
		n: 'tccurl',
		u: 0x02a8,
	},
	// LATIN SMALL LETTER T WITH CEDILLA
	tcedilla: {
		n: 'tcedilla',
		u: 0x0163,
	},
	// ARABIC LETTER TCHEH
	tcheharabic: {
		n: 'tcheharabic',
		u: 0x0686,
	},
	// ARABIC LETTER TCHEH FINAL FORM
	tchehfinalarabic: {
		n: 'tchehfinalarabic',
		u: 0xfb7b,
	},
	// ARABIC LETTER TCHEH INITIAL FORM
	tchehinitialarabic: {
		n: 'tchehinitialarabic',
		u: 0xfb7c,
	},
	// ARABIC LETTER TCHEH MEDIAL FORM
	tchehmedialarabic: {
		n: 'tchehmedialarabic',
		u: 0xfb7d,
	},
	// ARABIC LETTER TCHEH INITIAL FORM + ARABIC LETTER MEEM MEDIAL FORM
	tchehmeeminitialarabic: {
		n: 'tchehmeeminitialarabic',
		u: [0xfb7c, 0xfee4],
	},
	// CIRCLED LATIN SMALL LETTER T
	tcircle: {
		n: 'tcircle',
		u: 0x24e3,
	},
	// LATIN SMALL LETTER T WITH CIRCUMFLEX BELOW
	tcircumflexbelow: {
		n: 'tcircumflexbelow',
		u: 0x1e71,
	},
	// LATIN SMALL LETTER T WITH CEDILLA
	tcommaaccent: {
		n: 'tcommaaccent',
		u: 0x0163,
	},
	// LATIN SMALL LETTER T WITH DIAERESIS
	tdieresis: {
		n: 'tdieresis',
		u: 0x1e97,
	},
	// LATIN SMALL LETTER T WITH DOT ABOVE
	tdotaccent: {
		n: 'tdotaccent',
		u: 0x1e6b,
	},
	// LATIN SMALL LETTER T WITH DOT BELOW
	tdotbelow: {
		n: 'tdotbelow',
		u: 0x1e6d,
	},
	// CYRILLIC SMALL LETTER TE
	tecyrillic: {
		n: 'tecyrillic',
		u: 0x0442,
	},
	// CYRILLIC SMALL LETTER TE WITH DESCENDER
	tedescendercyrillic: {
		n: 'tedescendercyrillic',
		u: 0x04ad,
	},
	// ARABIC LETTER TEH
	teharabic: {
		n: 'teharabic',
		u: 0x062a,
	},
	// ARABIC LETTER TEH FINAL FORM
	tehfinalarabic: {
		n: 'tehfinalarabic',
		u: 0xfe96,
	},
	// ARABIC LIGATURE TEH WITH HAH INITIAL FORM
	tehhahinitialarabic: {
		n: 'tehhahinitialarabic',
		u: 0xfca2,
	},
	// ARABIC LIGATURE TEH WITH HAH ISOLATED FORM
	tehhahisolatedarabic: {
		n: 'tehhahisolatedarabic',
		u: 0xfc0c,
	},
	// ARABIC LETTER TEH INITIAL FORM
	tehinitialarabic: {
		n: 'tehinitialarabic',
		u: 0xfe97,
	},
	// HIRAGANA LETTER TE
	tehiragana: {
		n: 'tehiragana',
		u: 0x3066,
	},
	// ARABIC LIGATURE TEH WITH JEEM INITIAL FORM
	tehjeeminitialarabic: {
		n: 'tehjeeminitialarabic',
		u: 0xfca1,
	},
	// ARABIC LIGATURE TEH WITH JEEM ISOLATED FORM
	tehjeemisolatedarabic: {
		n: 'tehjeemisolatedarabic',
		u: 0xfc0b,
	},
	// ARABIC LETTER TEH MARBUTA
	tehmarbutaarabic: {
		n: 'tehmarbutaarabic',
		u: 0x0629,
	},
	// ARABIC LETTER TEH MARBUTA FINAL FORM
	tehmarbutafinalarabic: {
		n: 'tehmarbutafinalarabic',
		u: 0xfe94,
	},
	// ARABIC LETTER TEH MEDIAL FORM
	tehmedialarabic: {
		n: 'tehmedialarabic',
		u: 0xfe98,
	},
	// ARABIC LIGATURE TEH WITH MEEM INITIAL FORM
	tehmeeminitialarabic: {
		n: 'tehmeeminitialarabic',
		u: 0xfca4,
	},
	// ARABIC LIGATURE TEH WITH MEEM ISOLATED FORM
	tehmeemisolatedarabic: {
		n: 'tehmeemisolatedarabic',
		u: 0xfc0e,
	},
	// ARABIC LIGATURE TEH WITH NOON FINAL FORM
	tehnoonfinalarabic: {
		n: 'tehnoonfinalarabic',
		u: 0xfc73,
	},
	// KATAKANA LETTER TE
	tekatakana: {
		n: 'tekatakana',
		u: 0x30c6,
	},
	// HALFWIDTH KATAKANA LETTER TE
	tekatakanahalfwidth: {
		n: 'tekatakanahalfwidth',
		u: 0xff83,
	},
	// TELEPHONE SIGN
	telephone: {
		n: 'telephone',
		u: 0x2121,
	},
	// BLACK TELEPHONE
	telephoneblack: {
		n: 'telephoneblack',
		u: 0x260e,
	},
	// HEBREW ACCENT TELISHA GEDOLA
	telishagedolahebrew: {
		n: 'telishagedolahebrew',
		u: 0x05a0,
	},
	// HEBREW ACCENT TELISHA QETANA
	telishaqetanahebrew: {
		n: 'telishaqetanahebrew',
		u: 0x05a9,
	},
	// CIRCLED NUMBER TEN
	tencircle: {
		n: 'tencircle',
		u: 0x2469,
	},
	// PARENTHESIZED IDEOGRAPH TEN
	tenideographicparen: {
		n: 'tenideographicparen',
		u: 0x3229,
	},
	// PARENTHESIZED NUMBER TEN
	tenparen: {
		n: 'tenparen',
		u: 0x247d,
	},
	// NUMBER TEN FULL STOP
	tenperiod: {
		n: 'tenperiod',
		u: 0x2491,
	},
	// SMALL ROMAN NUMERAL TEN
	tenroman: {
		n: 'tenroman',
		u: 0x2179,
	},
	// LATIN SMALL LETTER TESH DIGRAPH
	tesh: {
		n: 'tesh',
		u: 0x02a7,
	},
	// HEBREW LETTER TET
	tet: {
		n: 'tet',
		u: 0x05d8,
	},
	// HEBREW LETTER TET WITH DAGESH
	tetdagesh: {
		n: 'tetdagesh',
		u: 0xfb38,
	},
	// HEBREW LETTER TET WITH DAGESH
	tetdageshhebrew: {
		n: 'tetdageshhebrew',
		u: 0xfb38,
	},
	// HEBREW LETTER TET
	tethebrew: {
		n: 'tethebrew',
		u: 0x05d8,
	},
	// CYRILLIC SMALL LIGATURE TE TSE
	tetsecyrillic: {
		n: 'tetsecyrillic',
		u: 0x04b5,
	},
	// HEBREW ACCENT TEVIR
	tevirhebrew: {
		n: 'tevirhebrew',
		u: 0x059b,
	},
	// HEBREW ACCENT TEVIR
	tevirlefthebrew: {
		n: 'tevirlefthebrew',
		u: 0x059b,
	},
	// BENGALI LETTER THA
	thabengali: {
		n: 'thabengali',
		u: 0x09a5,
	},
	// DEVANAGARI LETTER THA
	thadeva: {
		n: 'thadeva',
		u: 0x0925,
	},
	// GUJARATI LETTER THA
	thagujarati: {
		n: 'thagujarati',
		u: 0x0aa5,
	},
	// GURMUKHI LETTER THA
	thagurmukhi: {
		n: 'thagurmukhi',
		u: 0x0a25,
	},
	// ARABIC LETTER THAL
	thalarabic: {
		n: 'thalarabic',
		u: 0x0630,
	},
	// ARABIC LETTER THAL FINAL FORM
	thalfinalarabic: {
		n: 'thalfinalarabic',
		u: 0xfeac,
	},
	// <private-use-F898>
	thanthakhatlowleftthai: {
		n: 'thanthakhatlowleftthai',
		u: 0xf898,
	},
	// <private-use-F897>
	thanthakhatlowrightthai: {
		n: 'thanthakhatlowrightthai',
		u: 0xf897,
	},
	// THAI CHARACTER THANTHAKHAT
	thanthakhatthai: {
		n: 'thanthakhatthai',
		u: 0x0e4c,
	},
	// <private-use-F896>
	thanthakhatupperleftthai: {
		n: 'thanthakhatupperleftthai',
		u: 0xf896,
	},
	// ARABIC LETTER THEH
	theharabic: {
		n: 'theharabic',
		u: 0x062b,
	},
	// ARABIC LETTER THEH FINAL FORM
	thehfinalarabic: {
		n: 'thehfinalarabic',
		u: 0xfe9a,
	},
	// ARABIC LETTER THEH INITIAL FORM
	thehinitialarabic: {
		n: 'thehinitialarabic',
		u: 0xfe9b,
	},
	// ARABIC LETTER THEH MEDIAL FORM
	thehmedialarabic: {
		n: 'thehmedialarabic',
		u: 0xfe9c,
	},
	// THERE EXISTS
	thereexists: {
		n: 'thereexists',
		u: 0x2203,
	},
	// THEREFORE
	therefore: {
		n: 'therefore',
		u: 0x2234,
	},
	// GREEK SMALL LETTER THETA
	theta: {
		n: 'theta',
		u: 0x03b8,
	},
	// GREEK THETA SYMBOL
	theta1: {
		n: 'theta1',
		u: 0x03d1,
	},
	// GREEK THETA SYMBOL
	thetasymbolgreek: {
		n: 'thetasymbolgreek',
		u: 0x03d1,
	},
	// CIRCLED HANGUL THIEUTH A
	thieuthacirclekorean: {
		n: 'thieuthacirclekorean',
		u: 0x3279,
	},
	// PARENTHESIZED HANGUL THIEUTH A
	thieuthaparenkorean: {
		n: 'thieuthaparenkorean',
		u: 0x3219,
	},
	// CIRCLED HANGUL THIEUTH
	thieuthcirclekorean: {
		n: 'thieuthcirclekorean',
		u: 0x326b,
	},
	// HANGUL LETTER THIEUTH
	thieuthkorean: {
		n: 'thieuthkorean',
		u: 0x314c,
	},
	// PARENTHESIZED HANGUL THIEUTH
	thieuthparenkorean: {
		n: 'thieuthparenkorean',
		u: 0x320b,
	},
	// CIRCLED NUMBER THIRTEEN
	thirteencircle: {
		n: 'thirteencircle',
		u: 0x246c,
	},
	// PARENTHESIZED NUMBER THIRTEEN
	thirteenparen: {
		n: 'thirteenparen',
		u: 0x2480,
	},
	// NUMBER THIRTEEN FULL STOP
	thirteenperiod: {
		n: 'thirteenperiod',
		u: 0x2494,
	},
	// THAI CHARACTER THO NANGMONTHO
	thonangmonthothai: {
		n: 'thonangmonthothai',
		u: 0x0e11,
	},
	// LATIN SMALL LETTER T WITH HOOK
	thook: {
		n: 'thook',
		u: 0x01ad,
	},
	// THAI CHARACTER THO PHUTHAO
	thophuthaothai: {
		n: 'thophuthaothai',
		u: 0x0e12,
	},
	// LATIN SMALL LETTER THORN
	thorn: {
		n: 'thorn',
		u: 0x00fe,
	},
	// THAI CHARACTER THO THAHAN
	thothahanthai: {
		n: 'thothahanthai',
		u: 0x0e17,
	},
	// THAI CHARACTER THO THAN
	thothanthai: {
		n: 'thothanthai',
		u: 0x0e10,
	},
	// THAI CHARACTER THO THONG
	thothongthai: {
		n: 'thothongthai',
		u: 0x0e18,
	},
	// THAI CHARACTER THO THUNG
	thothungthai: {
		n: 'thothungthai',
		u: 0x0e16,
	},
	// CYRILLIC THOUSANDS SIGN
	thousandcyrillic: {
		n: 'thousandcyrillic',
		u: 0x0482,
	},
	// ARABIC THOUSANDS SEPARATOR
	thousandsseparatorarabic: {
		n: 'thousandsseparatorarabic',
		u: 0x066c,
	},
	// ARABIC THOUSANDS SEPARATOR
	thousandsseparatorpersian: {
		n: 'thousandsseparatorpersian',
		u: 0x066c,
	},
	// DIGIT THREE
	three: {
		n: 'three',
		u: 0x0033,
	},
	// ARABIC-INDIC DIGIT THREE
	threearabic: {
		n: 'threearabic',
		u: 0x0663,
	},
	// BENGALI DIGIT THREE
	threebengali: {
		n: 'threebengali',
		u: 0x09e9,
	},
	// CIRCLED DIGIT THREE
	threecircle: {
		n: 'threecircle',
		u: 0x2462,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT THREE
	threecircleinversesansserif: {
		n: 'threecircleinversesansserif',
		u: 0x278c,
	},
	// DEVANAGARI DIGIT THREE
	threedeva: {
		n: 'threedeva',
		u: 0x0969,
	},
	// VULGAR FRACTION THREE EIGHTHS
	threeeighths: {
		n: 'threeeighths',
		u: 0x215c,
	},
	// GUJARATI DIGIT THREE
	threegujarati: {
		n: 'threegujarati',
		u: 0x0ae9,
	},
	// GURMUKHI DIGIT THREE
	threegurmukhi: {
		n: 'threegurmukhi',
		u: 0x0a69,
	},
	// ARABIC-INDIC DIGIT THREE
	threehackarabic: {
		n: 'threehackarabic',
		u: 0x0663,
	},
	// HANGZHOU NUMERAL THREE
	threehangzhou: {
		n: 'threehangzhou',
		u: 0x3023,
	},
	// PARENTHESIZED IDEOGRAPH THREE
	threeideographicparen: {
		n: 'threeideographicparen',
		u: 0x3222,
	},
	// SUBSCRIPT THREE
	threeinferior: {
		n: 'threeinferior',
		u: 0x2083,
	},
	// FULLWIDTH DIGIT THREE
	threemonospace: {
		n: 'threemonospace',
		u: 0xff13,
	},
	// BENGALI CURRENCY NUMERATOR THREE
	threenumeratorbengali: {
		n: 'threenumeratorbengali',
		u: 0x09f6,
	},
	// <private-use-F733>
	threeoldstyle: {
		n: 'threeoldstyle',
		u: 0xf733,
	},
	// PARENTHESIZED DIGIT THREE
	threeparen: {
		n: 'threeparen',
		u: 0x2476,
	},
	// DIGIT THREE FULL STOP
	threeperiod: {
		n: 'threeperiod',
		u: 0x248a,
	},
	// EXTENDED ARABIC-INDIC DIGIT THREE
	threepersian: {
		n: 'threepersian',
		u: 0x06f3,
	},
	// VULGAR FRACTION THREE QUARTERS
	threequarters: {
		n: 'threequarters',
		u: 0x00be,
	},
	// <private-use-F6DE>
	threequartersemdash: {
		n: 'threequartersemdash',
		u: 0xf6de,
	},
	// SMALL ROMAN NUMERAL THREE
	threeroman: {
		n: 'threeroman',
		u: 0x2172,
	},
	// SUPERSCRIPT THREE
	threesuperior: {
		n: 'threesuperior',
		u: 0x00b3,
	},
	// THAI DIGIT THREE
	threethai: {
		n: 'threethai',
		u: 0x0e53,
	},
	// SQUARE THZ
	thzsquare: {
		n: 'thzsquare',
		u: 0x3394,
	},
	// HIRAGANA LETTER TI
	tihiragana: {
		n: 'tihiragana',
		u: 0x3061,
	},
	// KATAKANA LETTER TI
	tikatakana: {
		n: 'tikatakana',
		u: 0x30c1,
	},
	// HALFWIDTH KATAKANA LETTER TI
	tikatakanahalfwidth: {
		n: 'tikatakanahalfwidth',
		u: 0xff81,
	},
	// CIRCLED HANGUL TIKEUT A
	tikeutacirclekorean: {
		n: 'tikeutacirclekorean',
		u: 0x3270,
	},
	// PARENTHESIZED HANGUL TIKEUT A
	tikeutaparenkorean: {
		n: 'tikeutaparenkorean',
		u: 0x3210,
	},
	// CIRCLED HANGUL TIKEUT
	tikeutcirclekorean: {
		n: 'tikeutcirclekorean',
		u: 0x3262,
	},
	// HANGUL LETTER TIKEUT
	tikeutkorean: {
		n: 'tikeutkorean',
		u: 0x3137,
	},
	// PARENTHESIZED HANGUL TIKEUT
	tikeutparenkorean: {
		n: 'tikeutparenkorean',
		u: 0x3202,
	},
	// SMALL TILDE
	tilde: {
		n: 'tilde',
		u: 0x02dc,
	},
	// COMBINING TILDE BELOW
	tildebelowcmb: {
		n: 'tildebelowcmb',
		u: 0x0330,
	},
	// COMBINING TILDE
	tildecmb: {
		n: 'tildecmb',
		u: 0x0303,
	},
	// COMBINING TILDE
	tildecomb: {
		n: 'tildecomb',
		u: 0x0303,
	},
	// COMBINING DOUBLE TILDE
	tildedoublecmb: {
		n: 'tildedoublecmb',
		u: 0x0360,
	},
	// TILDE OPERATOR
	tildeoperator: {
		n: 'tildeoperator',
		u: 0x223c,
	},
	// COMBINING TILDE OVERLAY
	tildeoverlaycmb: {
		n: 'tildeoverlaycmb',
		u: 0x0334,
	},
	// COMBINING VERTICAL TILDE
	tildeverticalcmb: {
		n: 'tildeverticalcmb',
		u: 0x033e,
	},
	// CIRCLED TIMES
	timescircle: {
		n: 'timescircle',
		u: 0x2297,
	},
	// HEBREW ACCENT TIPEHA
	tipehahebrew: {
		n: 'tipehahebrew',
		u: 0x0596,
	},
	// HEBREW ACCENT TIPEHA
	tipehalefthebrew: {
		n: 'tipehalefthebrew',
		u: 0x0596,
	},
	// GURMUKHI TIPPI
	tippigurmukhi: {
		n: 'tippigurmukhi',
		u: 0x0a70,
	},
	// COMBINING CYRILLIC TITLO
	titlocyrilliccmb: {
		n: 'titlocyrilliccmb',
		u: 0x0483,
	},
	// ARMENIAN SMALL LETTER TIWN
	tiwnarmenian: {
		n: 'tiwnarmenian',
		u: 0x057f,
	},
	// LATIN SMALL LETTER T WITH LINE BELOW
	tlinebelow: {
		n: 'tlinebelow',
		u: 0x1e6f,
	},
	// FULLWIDTH LATIN SMALL LETTER T
	tmonospace: {
		n: 'tmonospace',
		u: 0xff54,
	},
	// ARMENIAN SMALL LETTER TO
	toarmenian: {
		n: 'toarmenian',
		u: 0x0569,
	},
	// HIRAGANA LETTER TO
	tohiragana: {
		n: 'tohiragana',
		u: 0x3068,
	},
	// KATAKANA LETTER TO
	tokatakana: {
		n: 'tokatakana',
		u: 0x30c8,
	},
	// HALFWIDTH KATAKANA LETTER TO
	tokatakanahalfwidth: {
		n: 'tokatakanahalfwidth',
		u: 0xff84,
	},
	// MODIFIER LETTER EXTRA-HIGH TONE BAR
	tonebarextrahighmod: {
		n: 'tonebarextrahighmod',
		u: 0x02e5,
	},
	// MODIFIER LETTER EXTRA-LOW TONE BAR
	tonebarextralowmod: {
		n: 'tonebarextralowmod',
		u: 0x02e9,
	},
	// MODIFIER LETTER HIGH TONE BAR
	tonebarhighmod: {
		n: 'tonebarhighmod',
		u: 0x02e6,
	},
	// MODIFIER LETTER LOW TONE BAR
	tonebarlowmod: {
		n: 'tonebarlowmod',
		u: 0x02e8,
	},
	// MODIFIER LETTER MID TONE BAR
	tonebarmidmod: {
		n: 'tonebarmidmod',
		u: 0x02e7,
	},
	// LATIN SMALL LETTER TONE FIVE
	tonefive: {
		n: 'tonefive',
		u: 0x01bd,
	},
	// LATIN SMALL LETTER TONE SIX
	tonesix: {
		n: 'tonesix',
		u: 0x0185,
	},
	// LATIN SMALL LETTER TONE TWO
	tonetwo: {
		n: 'tonetwo',
		u: 0x01a8,
	},
	// GREEK TONOS
	tonos: {
		n: 'tonos',
		u: 0x0384,
	},
	// SQUARE TON
	tonsquare: {
		n: 'tonsquare',
		u: 0x3327,
	},
	// THAI CHARACTER TO PATAK
	topatakthai: {
		n: 'topatakthai',
		u: 0x0e0f,
	},
	// LEFT TORTOISE SHELL BRACKET
	tortoiseshellbracketleft: {
		n: 'tortoiseshellbracketleft',
		u: 0x3014,
	},
	// SMALL LEFT TORTOISE SHELL BRACKET
	tortoiseshellbracketleftsmall: {
		n: 'tortoiseshellbracketleftsmall',
		u: 0xfe5d,
		f: [0x3014],
	},
	// PRESENTATION FORM FOR VERTICAL LEFT TORTOISE SHELL BRACKET
	tortoiseshellbracketleftvertical: {
		n: 'tortoiseshellbracketleftvertical',
		u: 0xfe39,
	},
	// RIGHT TORTOISE SHELL BRACKET
	tortoiseshellbracketright: {
		n: 'tortoiseshellbracketright',
		u: 0x3015,
	},
	// SMALL RIGHT TORTOISE SHELL BRACKET
	tortoiseshellbracketrightsmall: {
		n: 'tortoiseshellbracketrightsmall',
		u: 0xfe5e,
		f: [0x3015],
	},
	// PRESENTATION FORM FOR VERTICAL RIGHT TORTOISE SHELL BRACKET
	tortoiseshellbracketrightvertical: {
		n: 'tortoiseshellbracketrightvertical',
		u: 0xfe3a,
	},
	// THAI CHARACTER TO TAO
	totaothai: {
		n: 'totaothai',
		u: 0x0e15,
	},
	// LATIN SMALL LETTER T WITH PALATAL HOOK
	tpalatalhook: {
		n: 'tpalatalhook',
		u: 0x01ab,
	},
	// PARENTHESIZED LATIN SMALL LETTER T
	tparen: {
		n: 'tparen',
		u: 0x24af,
	},
	// TRADE MARK SIGN
	trademark: {
		n: 'trademark',
		u: 0x2122,
		f: [0xf8ea, 0xf6db],
	},
	// <private-use-F8EA>
	trademarksans: {
		n: 'trademarksans',
		u: 0xf8ea,
		f: [0x2122, 0xf6db],
	},
	// <private-use-F6DB>
	trademarkserif: {
		n: 'trademarkserif',
		u: 0xf6db,
		f: [0x2122, 0xf8ea],
	},
	// LATIN SMALL LETTER T WITH RETROFLEX HOOK
	tretroflexhook: {
		n: 'tretroflexhook',
		u: 0x0288,
	},
	// BLACK DOWN-POINTING TRIANGLE
	triagdn: {
		n: 'triagdn',
		u: 0x25bc,
	},
	// BLACK LEFT-POINTING POINTER
	triaglf: {
		n: 'triaglf',
		u: 0x25c4,
	},
	// BLACK RIGHT-POINTING POINTER
	triagrt: {
		n: 'triagrt',
		u: 0x25ba,
	},
	// BLACK UP-POINTING TRIANGLE
	triagup: {
		n: 'triagup',
		u: 0x25b2,
	},
	// LATIN SMALL LETTER TS DIGRAPH
	ts: {
		n: 'ts',
		u: 0x02a6,
	},
	// HEBREW LETTER TSADI
	tsadi: {
		n: 'tsadi',
		u: 0x05e6,
	},
	// HEBREW LETTER TSADI WITH DAGESH
	tsadidagesh: {
		n: 'tsadidagesh',
		u: 0xfb46,
	},
	// HEBREW LETTER TSADI WITH DAGESH
	tsadidageshhebrew: {
		n: 'tsadidageshhebrew',
		u: 0xfb46,
	},
	// HEBREW LETTER TSADI
	tsadihebrew: {
		n: 'tsadihebrew',
		u: 0x05e6,
	},
	// CYRILLIC SMALL LETTER TSE
	tsecyrillic: {
		n: 'tsecyrillic',
		u: 0x0446,
	},
	// HEBREW POINT TSERE
	tsere: {
		n: 'tsere',
		u: 0x05b5,
	},
	// HEBREW POINT TSERE
	tsere12: {
		n: 'tsere12',
		u: 0x05b5,
	},
	// HEBREW POINT TSERE
	tsere1e: {
		n: 'tsere1e',
		u: 0x05b5,
	},
	// HEBREW POINT TSERE
	tsere2b: {
		n: 'tsere2b',
		u: 0x05b5,
	},
	// HEBREW POINT TSERE
	tserehebrew: {
		n: 'tserehebrew',
		u: 0x05b5,
	},
	// HEBREW POINT TSERE
	tserenarrowhebrew: {
		n: 'tserenarrowhebrew',
		u: 0x05b5,
	},
	// HEBREW POINT TSERE
	tserequarterhebrew: {
		n: 'tserequarterhebrew',
		u: 0x05b5,
	},
	// HEBREW POINT TSERE
	tserewidehebrew: {
		n: 'tserewidehebrew',
		u: 0x05b5,
	},
	// CYRILLIC SMALL LETTER TSHE
	tshecyrillic: {
		n: 'tshecyrillic',
		u: 0x045b,
	},
	// <private-use-F6F3>
	tsuperior: {
		n: 'tsuperior',
		u: 0xf6f3,
	},
	// BENGALI LETTER TTA
	ttabengali: {
		n: 'ttabengali',
		u: 0x099f,
	},
	// DEVANAGARI LETTER TTA
	ttadeva: {
		n: 'ttadeva',
		u: 0x091f,
	},
	// GUJARATI LETTER TTA
	ttagujarati: {
		n: 'ttagujarati',
		u: 0x0a9f,
	},
	// GURMUKHI LETTER TTA
	ttagurmukhi: {
		n: 'ttagurmukhi',
		u: 0x0a1f,
	},
	// ARABIC LETTER TTEH
	tteharabic: {
		n: 'tteharabic',
		u: 0x0679,
	},
	// ARABIC LETTER TTEH FINAL FORM
	ttehfinalarabic: {
		n: 'ttehfinalarabic',
		u: 0xfb67,
	},
	// ARABIC LETTER TTEH INITIAL FORM
	ttehinitialarabic: {
		n: 'ttehinitialarabic',
		u: 0xfb68,
	},
	// ARABIC LETTER TTEH MEDIAL FORM
	ttehmedialarabic: {
		n: 'ttehmedialarabic',
		u: 0xfb69,
	},
	// BENGALI LETTER TTHA
	tthabengali: {
		n: 'tthabengali',
		u: 0x09a0,
	},
	// DEVANAGARI LETTER TTHA
	tthadeva: {
		n: 'tthadeva',
		u: 0x0920,
	},
	// GUJARATI LETTER TTHA
	tthagujarati: {
		n: 'tthagujarati',
		u: 0x0aa0,
	},
	// GURMUKHI LETTER TTHA
	tthagurmukhi: {
		n: 'tthagurmukhi',
		u: 0x0a20,
	},
	// LATIN SMALL LETTER TURNED T
	tturned: {
		n: 'tturned',
		u: 0x0287,
	},
	// HIRAGANA LETTER TU
	tuhiragana: {
		n: 'tuhiragana',
		u: 0x3064,
	},
	// KATAKANA LETTER TU
	tukatakana: {
		n: 'tukatakana',
		u: 0x30c4,
	},
	// HALFWIDTH KATAKANA LETTER TU
	tukatakanahalfwidth: {
		n: 'tukatakanahalfwidth',
		u: 0xff82,
	},
	// HIRAGANA LETTER SMALL TU
	tusmallhiragana: {
		n: 'tusmallhiragana',
		u: 0x3063,
	},
	// KATAKANA LETTER SMALL TU
	tusmallkatakana: {
		n: 'tusmallkatakana',
		u: 0x30c3,
	},
	// HALFWIDTH KATAKANA LETTER SMALL TU
	tusmallkatakanahalfwidth: {
		n: 'tusmallkatakanahalfwidth',
		u: 0xff6f,
	},
	// CIRCLED NUMBER TWELVE
	twelvecircle: {
		n: 'twelvecircle',
		u: 0x246b,
	},
	// PARENTHESIZED NUMBER TWELVE
	twelveparen: {
		n: 'twelveparen',
		u: 0x247f,
	},
	// NUMBER TWELVE FULL STOP
	twelveperiod: {
		n: 'twelveperiod',
		u: 0x2493,
	},
	// SMALL ROMAN NUMERAL TWELVE
	twelveroman: {
		n: 'twelveroman',
		u: 0x217b,
	},
	// CIRCLED NUMBER TWENTY
	twentycircle: {
		n: 'twentycircle',
		u: 0x2473,
	},
	// CJK UNIFIED IDEOGRAPH-5344
	twentyhangzhou: {
		n: 'twentyhangzhou',
		u: 0x5344,
	},
	// PARENTHESIZED NUMBER TWENTY
	twentyparen: {
		n: 'twentyparen',
		u: 0x2487,
	},
	// NUMBER TWENTY FULL STOP
	twentyperiod: {
		n: 'twentyperiod',
		u: 0x249b,
	},
	// DIGIT TWO
	two: {
		n: 'two',
		u: 0x0032,
	},
	// ARABIC-INDIC DIGIT TWO
	twoarabic: {
		n: 'twoarabic',
		u: 0x0662,
	},
	// BENGALI DIGIT TWO
	twobengali: {
		n: 'twobengali',
		u: 0x09e8,
	},
	// CIRCLED DIGIT TWO
	twocircle: {
		n: 'twocircle',
		u: 0x2461,
	},
	// DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT TWO
	twocircleinversesansserif: {
		n: 'twocircleinversesansserif',
		u: 0x278b,
	},
	// DEVANAGARI DIGIT TWO
	twodeva: {
		n: 'twodeva',
		u: 0x0968,
	},
	// TWO DOT LEADER
	twodotenleader: {
		n: 'twodotenleader',
		u: 0x2025,
	},
	// TWO DOT LEADER
	twodotleader: {
		n: 'twodotleader',
		u: 0x2025,
	},
	// PRESENTATION FORM FOR VERTICAL TWO DOT LEADER
	twodotleadervertical: {
		n: 'twodotleadervertical',
		u: 0xfe30,
	},
	// GUJARATI DIGIT TWO
	twogujarati: {
		n: 'twogujarati',
		u: 0x0ae8,
	},
	// GURMUKHI DIGIT TWO
	twogurmukhi: {
		n: 'twogurmukhi',
		u: 0x0a68,
	},
	// ARABIC-INDIC DIGIT TWO
	twohackarabic: {
		n: 'twohackarabic',
		u: 0x0662,
	},
	// HANGZHOU NUMERAL TWO
	twohangzhou: {
		n: 'twohangzhou',
		u: 0x3022,
	},
	// PARENTHESIZED IDEOGRAPH TWO
	twoideographicparen: {
		n: 'twoideographicparen',
		u: 0x3221,
	},
	// SUBSCRIPT TWO
	twoinferior: {
		n: 'twoinferior',
		u: 0x2082,
	},
	// FULLWIDTH DIGIT TWO
	twomonospace: {
		n: 'twomonospace',
		u: 0xff12,
	},
	// BENGALI CURRENCY NUMERATOR TWO
	twonumeratorbengali: {
		n: 'twonumeratorbengali',
		u: 0x09f5,
	},
	// <private-use-F732>
	twooldstyle: {
		n: 'twooldstyle',
		u: 0xf732,
	},
	// PARENTHESIZED DIGIT TWO
	twoparen: {
		n: 'twoparen',
		u: 0x2475,
	},
	// DIGIT TWO FULL STOP
	twoperiod: {
		n: 'twoperiod',
		u: 0x2489,
	},
	// EXTENDED ARABIC-INDIC DIGIT TWO
	twopersian: {
		n: 'twopersian',
		u: 0x06f2,
	},
	// SMALL ROMAN NUMERAL TWO
	tworoman: {
		n: 'tworoman',
		u: 0x2171,
	},
	// LATIN LETTER TWO WITH STROKE
	twostroke: {
		n: 'twostroke',
		u: 0x01bb,
	},
	// SUPERSCRIPT TWO
	twosuperior: {
		n: 'twosuperior',
		u: 0x00b2,
	},
	// THAI DIGIT TWO
	twothai: {
		n: 'twothai',
		u: 0x0e52,
	},
	// VULGAR FRACTION TWO THIRDS
	twothirds: {
		n: 'twothirds',
		u: 0x2154,
	},
	// LATIN SMALL LETTER U
	u: {
		n: 'u',
		u: 0x0075,
	},
	// LATIN SMALL LETTER U WITH ACUTE
	uacute: {
		n: 'uacute',
		u: 0x00fa,
	},
	// LATIN SMALL LETTER U BAR
	ubar: {
		n: 'ubar',
		u: 0x0289,
	},
	// BENGALI LETTER U
	ubengali: {
		n: 'ubengali',
		u: 0x0989,
	},
	// BOPOMOFO LETTER U
	ubopomofo: {
		n: 'ubopomofo',
		u: 0x3128,
	},
	// LATIN SMALL LETTER U WITH BREVE
	ubreve: {
		n: 'ubreve',
		u: 0x016d,
	},
	// LATIN SMALL LETTER U WITH CARON
	ucaron: {
		n: 'ucaron',
		u: 0x01d4,
	},
	// CIRCLED LATIN SMALL LETTER U
	ucircle: {
		n: 'ucircle',
		u: 0x24e4,
	},
	// LATIN SMALL LETTER U WITH CIRCUMFLEX
	ucircumflex: {
		n: 'ucircumflex',
		u: 0x00fb,
	},
	// LATIN SMALL LETTER U WITH CIRCUMFLEX BELOW
	ucircumflexbelow: {
		n: 'ucircumflexbelow',
		u: 0x1e77,
	},
	// CYRILLIC SMALL LETTER U
	ucyrillic: {
		n: 'ucyrillic',
		u: 0x0443,
	},
	// DEVANAGARI STRESS SIGN UDATTA
	udattadeva: {
		n: 'udattadeva',
		u: 0x0951,
	},
	// LATIN SMALL LETTER U WITH DOUBLE ACUTE
	udblacute: {
		n: 'udblacute',
		u: 0x0171,
	},
	// LATIN SMALL LETTER U WITH DOUBLE GRAVE
	udblgrave: {
		n: 'udblgrave',
		u: 0x0215,
	},
	// DEVANAGARI LETTER U
	udeva: {
		n: 'udeva',
		u: 0x0909,
	},
	// LATIN SMALL LETTER U WITH DIAERESIS
	udieresis: {
		n: 'udieresis',
		u: 0x00fc,
	},
	// LATIN SMALL LETTER U WITH DIAERESIS AND ACUTE
	udieresisacute: {
		n: 'udieresisacute',
		u: 0x01d8,
	},
	// LATIN SMALL LETTER U WITH DIAERESIS BELOW
	udieresisbelow: {
		n: 'udieresisbelow',
		u: 0x1e73,
	},
	// LATIN SMALL LETTER U WITH DIAERESIS AND CARON
	udieresiscaron: {
		n: 'udieresiscaron',
		u: 0x01da,
	},
	// CYRILLIC SMALL LETTER U WITH DIAERESIS
	udieresiscyrillic: {
		n: 'udieresiscyrillic',
		u: 0x04f1,
	},
	// LATIN SMALL LETTER U WITH DIAERESIS AND GRAVE
	udieresisgrave: {
		n: 'udieresisgrave',
		u: 0x01dc,
	},
	// LATIN SMALL LETTER U WITH DIAERESIS AND MACRON
	udieresismacron: {
		n: 'udieresismacron',
		u: 0x01d6,
	},
	// LATIN SMALL LETTER U WITH DOT BELOW
	udotbelow: {
		n: 'udotbelow',
		u: 0x1ee5,
	},
	// LATIN SMALL LETTER U WITH GRAVE
	ugrave: {
		n: 'ugrave',
		u: 0x00f9,
	},
	// GUJARATI LETTER U
	ugujarati: {
		n: 'ugujarati',
		u: 0x0a89,
	},
	// GURMUKHI LETTER U
	ugurmukhi: {
		n: 'ugurmukhi',
		u: 0x0a09,
	},
	// HIRAGANA LETTER U
	uhiragana: {
		n: 'uhiragana',
		u: 0x3046,
	},
	// LATIN SMALL LETTER U WITH HOOK ABOVE
	uhookabove: {
		n: 'uhookabove',
		u: 0x1ee7,
	},
	// LATIN SMALL LETTER U WITH HORN
	uhorn: {
		n: 'uhorn',
		u: 0x01b0,
	},
	// LATIN SMALL LETTER U WITH HORN AND ACUTE
	uhornacute: {
		n: 'uhornacute',
		u: 0x1ee9,
	},
	// LATIN SMALL LETTER U WITH HORN AND DOT BELOW
	uhorndotbelow: {
		n: 'uhorndotbelow',
		u: 0x1ef1,
	},
	// LATIN SMALL LETTER U WITH HORN AND GRAVE
	uhorngrave: {
		n: 'uhorngrave',
		u: 0x1eeb,
	},
	// LATIN SMALL LETTER U WITH HORN AND HOOK ABOVE
	uhornhookabove: {
		n: 'uhornhookabove',
		u: 0x1eed,
	},
	// LATIN SMALL LETTER U WITH HORN AND TILDE
	uhorntilde: {
		n: 'uhorntilde',
		u: 0x1eef,
	},
	// LATIN SMALL LETTER U WITH DOUBLE ACUTE
	uhungarumlaut: {
		n: 'uhungarumlaut',
		u: 0x0171,
	},
	// CYRILLIC SMALL LETTER U WITH DOUBLE ACUTE
	uhungarumlautcyrillic: {
		n: 'uhungarumlautcyrillic',
		u: 0x04f3,
	},
	// LATIN SMALL LETTER U WITH INVERTED BREVE
	uinvertedbreve: {
		n: 'uinvertedbreve',
		u: 0x0217,
	},
	// KATAKANA LETTER U
	ukatakana: {
		n: 'ukatakana',
		u: 0x30a6,
	},
	// HALFWIDTH KATAKANA LETTER U
	ukatakanahalfwidth: {
		n: 'ukatakanahalfwidth',
		u: 0xff73,
	},
	// CYRILLIC SMALL LETTER UK
	ukcyrillic: {
		n: 'ukcyrillic',
		u: 0x0479,
	},
	// HANGUL LETTER U
	ukorean: {
		n: 'ukorean',
		u: 0x315c,
	},
	// LATIN SMALL LETTER U WITH MACRON
	umacron: {
		n: 'umacron',
		u: 0x016b,
	},
	// CYRILLIC SMALL LETTER U WITH MACRON
	umacroncyrillic: {
		n: 'umacroncyrillic',
		u: 0x04ef,
	},
	// LATIN SMALL LETTER U WITH MACRON AND DIAERESIS
	umacrondieresis: {
		n: 'umacrondieresis',
		u: 0x1e7b,
	},
	// GURMUKHI VOWEL SIGN U
	umatragurmukhi: {
		n: 'umatragurmukhi',
		u: 0x0a41,
	},
	// FULLWIDTH LATIN SMALL LETTER U
	umonospace: {
		n: 'umonospace',
		u: 0xff55,
	},
	// LOW LINE
	underscore: {
		n: 'underscore',
		u: 0x005f,
	},
	// DOUBLE LOW LINE
	underscoredbl: {
		n: 'underscoredbl',
		u: 0x2017,
	},
	// FULLWIDTH LOW LINE
	underscoremonospace: {
		n: 'underscoremonospace',
		u: 0xff3f,
	},
	// PRESENTATION FORM FOR VERTICAL LOW LINE
	underscorevertical: {
		n: 'underscorevertical',
		u: 0xfe33,
	},
	// WAVY LOW LINE
	underscorewavy: {
		n: 'underscorewavy',
		u: 0xfe4f,
	},
	// UNION
	union: {
		n: 'union',
		u: 0x222a,
	},
	// FOR ALL
	universal: {
		n: 'universal',
		u: 0x2200,
	},
	// LATIN SMALL LETTER U WITH OGONEK
	uogonek: {
		n: 'uogonek',
		u: 0x0173,
	},
	// PARENTHESIZED LATIN SMALL LETTER U
	uparen: {
		n: 'uparen',
		u: 0x24b0,
	},
	// UPPER HALF BLOCK
	upblock: {
		n: 'upblock',
		u: 0x2580,
	},
	// HEBREW MARK UPPER DOT
	upperdothebrew: {
		n: 'upperdothebrew',
		u: 0x05c4,
	},
	// GREEK SMALL LETTER UPSILON
	upsilon: {
		n: 'upsilon',
		u: 0x03c5,
	},
	// GREEK SMALL LETTER UPSILON WITH DIALYTIKA
	upsilondieresis: {
		n: 'upsilondieresis',
		u: 0x03cb,
	},
	// GREEK SMALL LETTER UPSILON WITH DIALYTIKA AND TONOS
	upsilondieresistonos: {
		n: 'upsilondieresistonos',
		u: 0x03b0,
	},
	// LATIN SMALL LETTER UPSILON
	upsilonlatin: {
		n: 'upsilonlatin',
		u: 0x028a,
	},
	// GREEK SMALL LETTER UPSILON WITH TONOS
	upsilontonos: {
		n: 'upsilontonos',
		u: 0x03cd,
	},
	// COMBINING UP TACK BELOW
	uptackbelowcmb: {
		n: 'uptackbelowcmb',
		u: 0x031d,
	},
	// MODIFIER LETTER UP TACK
	uptackmod: {
		n: 'uptackmod',
		u: 0x02d4,
	},
	// GURMUKHI URA
	uragurmukhi: {
		n: 'uragurmukhi',
		u: 0x0a73,
	},
	// LATIN SMALL LETTER U WITH RING ABOVE
	uring: {
		n: 'uring',
		u: 0x016f,
	},
	// CYRILLIC SMALL LETTER SHORT U
	ushortcyrillic: {
		n: 'ushortcyrillic',
		u: 0x045e,
	},
	// HIRAGANA LETTER SMALL U
	usmallhiragana: {
		n: 'usmallhiragana',
		u: 0x3045,
	},
	// KATAKANA LETTER SMALL U
	usmallkatakana: {
		n: 'usmallkatakana',
		u: 0x30a5,
	},
	// HALFWIDTH KATAKANA LETTER SMALL U
	usmallkatakanahalfwidth: {
		n: 'usmallkatakanahalfwidth',
		u: 0xff69,
	},
	// CYRILLIC SMALL LETTER STRAIGHT U
	ustraightcyrillic: {
		n: 'ustraightcyrillic',
		u: 0x04af,
	},
	// CYRILLIC SMALL LETTER STRAIGHT U WITH STROKE
	ustraightstrokecyrillic: {
		n: 'ustraightstrokecyrillic',
		u: 0x04b1,
	},
	// LATIN SMALL LETTER U WITH TILDE
	utilde: {
		n: 'utilde',
		u: 0x0169,
	},
	// LATIN SMALL LETTER U WITH TILDE AND ACUTE
	utildeacute: {
		n: 'utildeacute',
		u: 0x1e79,
	},
	// LATIN SMALL LETTER U WITH TILDE BELOW
	utildebelow: {
		n: 'utildebelow',
		u: 0x1e75,
	},
	// BENGALI LETTER UU
	uubengali: {
		n: 'uubengali',
		u: 0x098a,
	},
	// DEVANAGARI LETTER UU
	uudeva: {
		n: 'uudeva',
		u: 0x090a,
	},
	// GUJARATI LETTER UU
	uugujarati: {
		n: 'uugujarati',
		u: 0x0a8a,
	},
	// GURMUKHI LETTER UU
	uugurmukhi: {
		n: 'uugurmukhi',
		u: 0x0a0a,
	},
	// GURMUKHI VOWEL SIGN UU
	uumatragurmukhi: {
		n: 'uumatragurmukhi',
		u: 0x0a42,
	},
	// BENGALI VOWEL SIGN UU
	uuvowelsignbengali: {
		n: 'uuvowelsignbengali',
		u: 0x09c2,
	},
	// DEVANAGARI VOWEL SIGN UU
	uuvowelsigndeva: {
		n: 'uuvowelsigndeva',
		u: 0x0942,
	},
	// GUJARATI VOWEL SIGN UU
	uuvowelsigngujarati: {
		n: 'uuvowelsigngujarati',
		u: 0x0ac2,
	},
	// BENGALI VOWEL SIGN U
	uvowelsignbengali: {
		n: 'uvowelsignbengali',
		u: 0x09c1,
	},
	// DEVANAGARI VOWEL SIGN U
	uvowelsigndeva: {
		n: 'uvowelsigndeva',
		u: 0x0941,
	},
	// GUJARATI VOWEL SIGN U
	uvowelsigngujarati: {
		n: 'uvowelsigngujarati',
		u: 0x0ac1,
	},
	// LATIN SMALL LETTER V
	v: {
		n: 'v',
		u: 0x0076,
	},
	// DEVANAGARI LETTER VA
	vadeva: {
		n: 'vadeva',
		u: 0x0935,
	},
	// GUJARATI LETTER VA
	vagujarati: {
		n: 'vagujarati',
		u: 0x0ab5,
	},
	// GURMUKHI LETTER VA
	vagurmukhi: {
		n: 'vagurmukhi',
		u: 0x0a35,
	},
	// KATAKANA LETTER VA
	vakatakana: {
		n: 'vakatakana',
		u: 0x30f7,
	},
	// HEBREW LETTER VAV
	vav: {
		n: 'vav',
		u: 0x05d5,
	},
	// HEBREW LETTER VAV WITH DAGESH
	vavdagesh: {
		n: 'vavdagesh',
		u: 0xfb35,
	},
	// HEBREW LETTER VAV WITH DAGESH
	vavdagesh65: {
		n: 'vavdagesh65',
		u: 0xfb35,
	},
	// HEBREW LETTER VAV WITH DAGESH
	vavdageshhebrew: {
		n: 'vavdageshhebrew',
		u: 0xfb35,
	},
	// HEBREW LETTER VAV
	vavhebrew: {
		n: 'vavhebrew',
		u: 0x05d5,
	},
	// HEBREW LETTER VAV WITH HOLAM
	vavholam: {
		n: 'vavholam',
		u: 0xfb4b,
	},
	// HEBREW LETTER VAV WITH HOLAM
	vavholamhebrew: {
		n: 'vavholamhebrew',
		u: 0xfb4b,
	},
	// HEBREW LIGATURE YIDDISH DOUBLE VAV
	vavvavhebrew: {
		n: 'vavvavhebrew',
		u: 0x05f0,
	},
	// HEBREW LIGATURE YIDDISH VAV YOD
	vavyodhebrew: {
		n: 'vavyodhebrew',
		u: 0x05f1,
	},
	// CIRCLED LATIN SMALL LETTER V
	vcircle: {
		n: 'vcircle',
		u: 0x24e5,
	},
	// LATIN SMALL LETTER V WITH DOT BELOW
	vdotbelow: {
		n: 'vdotbelow',
		u: 0x1e7f,
	},
	// CYRILLIC SMALL LETTER VE
	vecyrillic: {
		n: 'vecyrillic',
		u: 0x0432,
	},
	// ARABIC LETTER VEH
	veharabic: {
		n: 'veharabic',
		u: 0x06a4,
	},
	// ARABIC LETTER VEH FINAL FORM
	vehfinalarabic: {
		n: 'vehfinalarabic',
		u: 0xfb6b,
	},
	// ARABIC LETTER VEH INITIAL FORM
	vehinitialarabic: {
		n: 'vehinitialarabic',
		u: 0xfb6c,
	},
	// ARABIC LETTER VEH MEDIAL FORM
	vehmedialarabic: {
		n: 'vehmedialarabic',
		u: 0xfb6d,
	},
	// KATAKANA LETTER VE
	vekatakana: {
		n: 'vekatakana',
		u: 0x30f9,
	},
	// FEMALE SIGN
	venus: {
		n: 'venus',
		u: 0x2640,
	},
	// VERTICAL LINE
	verticalbar: {
		n: 'verticalbar',
		u: 0x007c,
	},
	// COMBINING VERTICAL LINE ABOVE
	verticallineabovecmb: {
		n: 'verticallineabovecmb',
		u: 0x030d,
	},
	// COMBINING VERTICAL LINE BELOW
	verticallinebelowcmb: {
		n: 'verticallinebelowcmb',
		u: 0x0329,
	},
	// MODIFIER LETTER LOW VERTICAL LINE
	verticallinelowmod: {
		n: 'verticallinelowmod',
		u: 0x02cc,
	},
	// MODIFIER LETTER VERTICAL LINE
	verticallinemod: {
		n: 'verticallinemod',
		u: 0x02c8,
	},
	// ARMENIAN SMALL LETTER VEW
	vewarmenian: {
		n: 'vewarmenian',
		u: 0x057e,
	},
	// LATIN SMALL LETTER V WITH HOOK
	vhook: {
		n: 'vhook',
		u: 0x028b,
	},
	// KATAKANA LETTER VI
	vikatakana: {
		n: 'vikatakana',
		u: 0x30f8,
	},
	// BENGALI SIGN VIRAMA
	viramabengali: {
		n: 'viramabengali',
		u: 0x09cd,
	},
	// DEVANAGARI SIGN VIRAMA
	viramadeva: {
		n: 'viramadeva',
		u: 0x094d,
	},
	// GUJARATI SIGN VIRAMA
	viramagujarati: {
		n: 'viramagujarati',
		u: 0x0acd,
	},
	// BENGALI SIGN VISARGA
	visargabengali: {
		n: 'visargabengali',
		u: 0x0983,
	},
	// DEVANAGARI SIGN VISARGA
	visargadeva: {
		n: 'visargadeva',
		u: 0x0903,
	},
	// GUJARATI SIGN VISARGA
	visargagujarati: {
		n: 'visargagujarati',
		u: 0x0a83,
	},
	// FULLWIDTH LATIN SMALL LETTER V
	vmonospace: {
		n: 'vmonospace',
		u: 0xff56,
	},
	// ARMENIAN SMALL LETTER VO
	voarmenian: {
		n: 'voarmenian',
		u: 0x0578,
	},
	// HIRAGANA VOICED ITERATION MARK
	voicediterationhiragana: {
		n: 'voicediterationhiragana',
		u: 0x309e,
	},
	// KATAKANA VOICED ITERATION MARK
	voicediterationkatakana: {
		n: 'voicediterationkatakana',
		u: 0x30fe,
	},
	// KATAKANA-HIRAGANA VOICED SOUND MARK
	voicedmarkkana: {
		n: 'voicedmarkkana',
		u: 0x309b,
	},
	// HALFWIDTH KATAKANA VOICED SOUND MARK
	voicedmarkkanahalfwidth: {
		n: 'voicedmarkkanahalfwidth',
		u: 0xff9e,
	},
	// KATAKANA LETTER VO
	vokatakana: {
		n: 'vokatakana',
		u: 0x30fa,
	},
	// PARENTHESIZED LATIN SMALL LETTER V
	vparen: {
		n: 'vparen',
		u: 0x24b1,
	},
	// LATIN SMALL LETTER V WITH TILDE
	vtilde: {
		n: 'vtilde',
		u: 0x1e7d,
	},
	// LATIN SMALL LETTER TURNED V
	vturned: {
		n: 'vturned',
		u: 0x028c,
	},
	// HIRAGANA LETTER VU
	vuhiragana: {
		n: 'vuhiragana',
		u: 0x3094,
	},
	// KATAKANA LETTER VU
	vukatakana: {
		n: 'vukatakana',
		u: 0x30f4,
	},
	// LATIN SMALL LETTER W
	w: {
		n: 'w',
		u: 0x0077,
	},
	// LATIN SMALL LETTER W WITH ACUTE
	wacute: {
		n: 'wacute',
		u: 0x1e83,
	},
	// HANGUL LETTER WAE
	waekorean: {
		n: 'waekorean',
		u: 0x3159,
	},
	// HIRAGANA LETTER WA
	wahiragana: {
		n: 'wahiragana',
		u: 0x308f,
	},
	// KATAKANA LETTER WA
	wakatakana: {
		n: 'wakatakana',
		u: 0x30ef,
	},
	// HALFWIDTH KATAKANA LETTER WA
	wakatakanahalfwidth: {
		n: 'wakatakanahalfwidth',
		u: 0xff9c,
	},
	// HANGUL LETTER WA
	wakorean: {
		n: 'wakorean',
		u: 0x3158,
	},
	// HIRAGANA LETTER SMALL WA
	wasmallhiragana: {
		n: 'wasmallhiragana',
		u: 0x308e,
	},
	// KATAKANA LETTER SMALL WA
	wasmallkatakana: {
		n: 'wasmallkatakana',
		u: 0x30ee,
	},
	// SQUARE WATTO
	wattosquare: {
		n: 'wattosquare',
		u: 0x3357,
	},
	// WAVE DASH
	wavedash: {
		n: 'wavedash',
		u: 0x301c,
	},
	// PRESENTATION FORM FOR VERTICAL WAVY LOW LINE
	wavyunderscorevertical: {
		n: 'wavyunderscorevertical',
		u: 0xfe34,
	},
	// ARABIC LETTER WAW
	wawarabic: {
		n: 'wawarabic',
		u: 0x0648,
	},
	// ARABIC LETTER WAW FINAL FORM
	wawfinalarabic: {
		n: 'wawfinalarabic',
		u: 0xfeee,
	},
	// ARABIC LETTER WAW WITH HAMZA ABOVE
	wawhamzaabovearabic: {
		n: 'wawhamzaabovearabic',
		u: 0x0624,
	},
	// ARABIC LETTER WAW WITH HAMZA ABOVE FINAL FORM
	wawhamzaabovefinalarabic: {
		n: 'wawhamzaabovefinalarabic',
		u: 0xfe86,
	},
	// SQUARE WB
	wbsquare: {
		n: 'wbsquare',
		u: 0x33dd,
	},
	// CIRCLED LATIN SMALL LETTER W
	wcircle: {
		n: 'wcircle',
		u: 0x24e6,
	},
	// LATIN SMALL LETTER W WITH CIRCUMFLEX
	wcircumflex: {
		n: 'wcircumflex',
		u: 0x0175,
	},
	// LATIN SMALL LETTER W WITH DIAERESIS
	wdieresis: {
		n: 'wdieresis',
		u: 0x1e85,
	},
	// LATIN SMALL LETTER W WITH DOT ABOVE
	wdotaccent: {
		n: 'wdotaccent',
		u: 0x1e87,
	},
	// LATIN SMALL LETTER W WITH DOT BELOW
	wdotbelow: {
		n: 'wdotbelow',
		u: 0x1e89,
	},
	// HIRAGANA LETTER WE
	wehiragana: {
		n: 'wehiragana',
		u: 0x3091,
	},
	// WEIERSTRASS ELLIPTIC FUNCTION
	weierstrass: {
		n: 'weierstrass',
		u: 0x2118,
	},
	// KATAKANA LETTER WE
	wekatakana: {
		n: 'wekatakana',
		u: 0x30f1,
	},
	// HANGUL LETTER WE
	wekorean: {
		n: 'wekorean',
		u: 0x315e,
	},
	// HANGUL LETTER WEO
	weokorean: {
		n: 'weokorean',
		u: 0x315d,
	},
	// LATIN SMALL LETTER W WITH GRAVE
	wgrave: {
		n: 'wgrave',
		u: 0x1e81,
	},
	// WHITE BULLET
	whitebullet: {
		n: 'whitebullet',
		u: 0x25e6,
	},
	// WHITE CIRCLE
	whitecircle: {
		n: 'whitecircle',
		u: 0x25cb,
	},
	// INVERSE WHITE CIRCLE
	whitecircleinverse: {
		n: 'whitecircleinverse',
		u: 0x25d9,
	},
	// LEFT WHITE CORNER BRACKET
	whitecornerbracketleft: {
		n: 'whitecornerbracketleft',
		u: 0x300e,
	},
	// PRESENTATION FORM FOR VERTICAL LEFT WHITE CORNER BRACKET
	whitecornerbracketleftvertical: {
		n: 'whitecornerbracketleftvertical',
		u: 0xfe43,
	},
	// RIGHT WHITE CORNER BRACKET
	whitecornerbracketright: {
		n: 'whitecornerbracketright',
		u: 0x300f,
	},
	// PRESENTATION FORM FOR VERTICAL RIGHT WHITE CORNER BRACKET
	whitecornerbracketrightvertical: {
		n: 'whitecornerbracketrightvertical',
		u: 0xfe44,
	},
	// WHITE DIAMOND
	whitediamond: {
		n: 'whitediamond',
		u: 0x25c7,
	},
	// WHITE DIAMOND CONTAINING BLACK SMALL DIAMOND
	whitediamondcontainingblacksmalldiamond: {
		n: 'whitediamondcontainingblacksmalldiamond',
		u: 0x25c8,
	},
	// WHITE DOWN-POINTING SMALL TRIANGLE
	whitedownpointingsmalltriangle: {
		n: 'whitedownpointingsmalltriangle',
		u: 0x25bf,
	},
	// WHITE DOWN-POINTING TRIANGLE
	whitedownpointingtriangle: {
		n: 'whitedownpointingtriangle',
		u: 0x25bd,
	},
	// WHITE LEFT-POINTING SMALL TRIANGLE
	whiteleftpointingsmalltriangle: {
		n: 'whiteleftpointingsmalltriangle',
		u: 0x25c3,
	},
	// WHITE LEFT-POINTING TRIANGLE
	whiteleftpointingtriangle: {
		n: 'whiteleftpointingtriangle',
		u: 0x25c1,
	},
	// LEFT WHITE LENTICULAR BRACKET
	whitelenticularbracketleft: {
		n: 'whitelenticularbracketleft',
		u: 0x3016,
	},
	// RIGHT WHITE LENTICULAR BRACKET
	whitelenticularbracketright: {
		n: 'whitelenticularbracketright',
		u: 0x3017,
	},
	// WHITE RIGHT-POINTING SMALL TRIANGLE
	whiterightpointingsmalltriangle: {
		n: 'whiterightpointingsmalltriangle',
		u: 0x25b9,
	},
	// WHITE RIGHT-POINTING TRIANGLE
	whiterightpointingtriangle: {
		n: 'whiterightpointingtriangle',
		u: 0x25b7,
	},
	// WHITE SMALL SQUARE
	whitesmallsquare: {
		n: 'whitesmallsquare',
		u: 0x25ab,
	},
	// WHITE SMILING FACE
	whitesmilingface: {
		n: 'whitesmilingface',
		u: 0x263a,
	},
	// WHITE SQUARE
	whitesquare: {
		n: 'whitesquare',
		u: 0x25a1,
	},
	// WHITE STAR
	whitestar: {
		n: 'whitestar',
		u: 0x2606,
	},
	// WHITE TELEPHONE
	whitetelephone: {
		n: 'whitetelephone',
		u: 0x260f,
	},
	// LEFT WHITE TORTOISE SHELL BRACKET
	whitetortoiseshellbracketleft: {
		n: 'whitetortoiseshellbracketleft',
		u: 0x3018,
	},
	// RIGHT WHITE TORTOISE SHELL BRACKET
	whitetortoiseshellbracketright: {
		n: 'whitetortoiseshellbracketright',
		u: 0x3019,
	},
	// WHITE UP-POINTING SMALL TRIANGLE
	whiteuppointingsmalltriangle: {
		n: 'whiteuppointingsmalltriangle',
		u: 0x25b5,
	},
	// WHITE UP-POINTING TRIANGLE
	whiteuppointingtriangle: {
		n: 'whiteuppointingtriangle',
		u: 0x25b3,
	},
	// HIRAGANA LETTER WI
	wihiragana: {
		n: 'wihiragana',
		u: 0x3090,
	},
	// KATAKANA LETTER WI
	wikatakana: {
		n: 'wikatakana',
		u: 0x30f0,
	},
	// HANGUL LETTER WI
	wikorean: {
		n: 'wikorean',
		u: 0x315f,
	},
	// FULLWIDTH LATIN SMALL LETTER W
	wmonospace: {
		n: 'wmonospace',
		u: 0xff57,
	},
	// HIRAGANA LETTER WO
	wohiragana: {
		n: 'wohiragana',
		u: 0x3092,
	},
	// KATAKANA LETTER WO
	wokatakana: {
		n: 'wokatakana',
		u: 0x30f2,
	},
	// HALFWIDTH KATAKANA LETTER WO
	wokatakanahalfwidth: {
		n: 'wokatakanahalfwidth',
		u: 0xff66,
	},
	// WON SIGN
	won: {
		n: 'won',
		u: 0x20a9,
	},
	// FULLWIDTH WON SIGN
	wonmonospace: {
		n: 'wonmonospace',
		u: 0xffe6,
	},
	// THAI CHARACTER WO WAEN
	wowaenthai: {
		n: 'wowaenthai',
		u: 0x0e27,
	},
	// PARENTHESIZED LATIN SMALL LETTER W
	wparen: {
		n: 'wparen',
		u: 0x24b2,
	},
	// LATIN SMALL LETTER W WITH RING ABOVE
	wring: {
		n: 'wring',
		u: 0x1e98,
	},
	// MODIFIER LETTER SMALL W
	wsuperior: {
		n: 'wsuperior',
		u: 0x02b7,
	},
	// LATIN SMALL LETTER TURNED W
	wturned: {
		n: 'wturned',
		u: 0x028d,
	},
	// LATIN LETTER WYNN
	wynn: {
		n: 'wynn',
		u: 0x01bf,
	},
	// LATIN SMALL LETTER X
	x: {
		n: 'x',
		u: 0x0078,
	},
	// COMBINING X ABOVE
	xabovecmb: {
		n: 'xabovecmb',
		u: 0x033d,
	},
	// BOPOMOFO LETTER X
	xbopomofo: {
		n: 'xbopomofo',
		u: 0x3112,
	},
	// CIRCLED LATIN SMALL LETTER X
	xcircle: {
		n: 'xcircle',
		u: 0x24e7,
	},
	// LATIN SMALL LETTER X WITH DIAERESIS
	xdieresis: {
		n: 'xdieresis',
		u: 0x1e8d,
	},
	// LATIN SMALL LETTER X WITH DOT ABOVE
	xdotaccent: {
		n: 'xdotaccent',
		u: 0x1e8b,
	},
	// ARMENIAN SMALL LETTER XEH
	xeharmenian: {
		n: 'xeharmenian',
		u: 0x056d,
	},
	// GREEK SMALL LETTER XI
	xi: {
		n: 'xi',
		u: 0x03be,
	},
	// FULLWIDTH LATIN SMALL LETTER X
	xmonospace: {
		n: 'xmonospace',
		u: 0xff58,
	},
	// PARENTHESIZED LATIN SMALL LETTER X
	xparen: {
		n: 'xparen',
		u: 0x24b3,
	},
	// MODIFIER LETTER SMALL X
	xsuperior: {
		n: 'xsuperior',
		u: 0x02e3,
	},
	// LATIN SMALL LETTER Y
	y: {
		n: 'y',
		u: 0x0079,
	},
	// SQUARE YAADO
	yaadosquare: {
		n: 'yaadosquare',
		u: 0x334e,
	},
	// BENGALI LETTER YA
	yabengali: {
		n: 'yabengali',
		u: 0x09af,
	},
	// LATIN SMALL LETTER Y WITH ACUTE
	yacute: {
		n: 'yacute',
		u: 0x00fd,
	},
	// DEVANAGARI LETTER YA
	yadeva: {
		n: 'yadeva',
		u: 0x092f,
	},
	// HANGUL LETTER YAE
	yaekorean: {
		n: 'yaekorean',
		u: 0x3152,
	},
	// GUJARATI LETTER YA
	yagujarati: {
		n: 'yagujarati',
		u: 0x0aaf,
	},
	// GURMUKHI LETTER YA
	yagurmukhi: {
		n: 'yagurmukhi',
		u: 0x0a2f,
	},
	// HIRAGANA LETTER YA
	yahiragana: {
		n: 'yahiragana',
		u: 0x3084,
	},
	// KATAKANA LETTER YA
	yakatakana: {
		n: 'yakatakana',
		u: 0x30e4,
	},
	// HALFWIDTH KATAKANA LETTER YA
	yakatakanahalfwidth: {
		n: 'yakatakanahalfwidth',
		u: 0xff94,
	},
	// HANGUL LETTER YA
	yakorean: {
		n: 'yakorean',
		u: 0x3151,
	},
	// THAI CHARACTER YAMAKKAN
	yamakkanthai: {
		n: 'yamakkanthai',
		u: 0x0e4e,
	},
	// HIRAGANA LETTER SMALL YA
	yasmallhiragana: {
		n: 'yasmallhiragana',
		u: 0x3083,
	},
	// KATAKANA LETTER SMALL YA
	yasmallkatakana: {
		n: 'yasmallkatakana',
		u: 0x30e3,
	},
	// HALFWIDTH KATAKANA LETTER SMALL YA
	yasmallkatakanahalfwidth: {
		n: 'yasmallkatakanahalfwidth',
		u: 0xff6c,
	},
	// CYRILLIC SMALL LETTER YAT
	yatcyrillic: {
		n: 'yatcyrillic',
		u: 0x0463,
	},
	// CIRCLED LATIN SMALL LETTER Y
	ycircle: {
		n: 'ycircle',
		u: 0x24e8,
	},
	// LATIN SMALL LETTER Y WITH CIRCUMFLEX
	ycircumflex: {
		n: 'ycircumflex',
		u: 0x0177,
	},
	// LATIN SMALL LETTER Y WITH DIAERESIS
	ydieresis: {
		n: 'ydieresis',
		u: 0x00ff,
	},
	// LATIN SMALL LETTER Y WITH DOT ABOVE
	ydotaccent: {
		n: 'ydotaccent',
		u: 0x1e8f,
	},
	// LATIN SMALL LETTER Y WITH DOT BELOW
	ydotbelow: {
		n: 'ydotbelow',
		u: 0x1ef5,
	},
	// ARABIC LETTER YEH
	yeharabic: {
		n: 'yeharabic',
		u: 0x064a,
	},
	// ARABIC LETTER YEH BARREE
	yehbarreearabic: {
		n: 'yehbarreearabic',
		u: 0x06d2,
	},
	// ARABIC LETTER YEH BARREE FINAL FORM
	yehbarreefinalarabic: {
		n: 'yehbarreefinalarabic',
		u: 0xfbaf,
	},
	// ARABIC LETTER YEH FINAL FORM
	yehfinalarabic: {
		n: 'yehfinalarabic',
		u: 0xfef2,
	},
	// ARABIC LETTER YEH WITH HAMZA ABOVE
	yehhamzaabovearabic: {
		n: 'yehhamzaabovearabic',
		u: 0x0626,
	},
	// ARABIC LETTER YEH WITH HAMZA ABOVE FINAL FORM
	yehhamzaabovefinalarabic: {
		n: 'yehhamzaabovefinalarabic',
		u: 0xfe8a,
	},
	// ARABIC LETTER YEH WITH HAMZA ABOVE INITIAL FORM
	yehhamzaaboveinitialarabic: {
		n: 'yehhamzaaboveinitialarabic',
		u: 0xfe8b,
	},
	// ARABIC LETTER YEH WITH HAMZA ABOVE MEDIAL FORM
	yehhamzaabovemedialarabic: {
		n: 'yehhamzaabovemedialarabic',
		u: 0xfe8c,
	},
	// ARABIC LETTER YEH INITIAL FORM
	yehinitialarabic: {
		n: 'yehinitialarabic',
		u: 0xfef3,
	},
	// ARABIC LETTER YEH MEDIAL FORM
	yehmedialarabic: {
		n: 'yehmedialarabic',
		u: 0xfef4,
	},
	// ARABIC LIGATURE YEH WITH MEEM INITIAL FORM
	yehmeeminitialarabic: {
		n: 'yehmeeminitialarabic',
		u: 0xfcdd,
	},
	// ARABIC LIGATURE YEH WITH MEEM ISOLATED FORM
	yehmeemisolatedarabic: {
		n: 'yehmeemisolatedarabic',
		u: 0xfc58,
	},
	// ARABIC LIGATURE YEH WITH NOON FINAL FORM
	yehnoonfinalarabic: {
		n: 'yehnoonfinalarabic',
		u: 0xfc94,
	},
	// ARABIC LETTER YEH WITH THREE DOTS BELOW
	yehthreedotsbelowarabic: {
		n: 'yehthreedotsbelowarabic',
		u: 0x06d1,
	},
	// HANGUL LETTER YE
	yekorean: {
		n: 'yekorean',
		u: 0x3156,
	},
	// YEN SIGN
	yen: {
		n: 'yen',
		u: 0x00a5,
	},
	// FULLWIDTH YEN SIGN
	yenmonospace: {
		n: 'yenmonospace',
		u: 0xffe5,
	},
	// HANGUL LETTER YEO
	yeokorean: {
		n: 'yeokorean',
		u: 0x3155,
	},
	// HANGUL LETTER YEORINHIEUH
	yeorinhieuhkorean: {
		n: 'yeorinhieuhkorean',
		u: 0x3186,
	},
	// HEBREW ACCENT YERAH BEN YOMO
	yerahbenyomohebrew: {
		n: 'yerahbenyomohebrew',
		u: 0x05aa,
	},
	// HEBREW ACCENT YERAH BEN YOMO
	yerahbenyomolefthebrew: {
		n: 'yerahbenyomolefthebrew',
		u: 0x05aa,
	},
	// CYRILLIC SMALL LETTER YERU
	yericyrillic: {
		n: 'yericyrillic',
		u: 0x044b,
	},
	// CYRILLIC SMALL LETTER YERU WITH DIAERESIS
	yerudieresiscyrillic: {
		n: 'yerudieresiscyrillic',
		u: 0x04f9,
	},
	// HANGUL LETTER YESIEUNG
	yesieungkorean: {
		n: 'yesieungkorean',
		u: 0x3181,
	},
	// HANGUL LETTER YESIEUNG-PANSIOS
	yesieungpansioskorean: {
		n: 'yesieungpansioskorean',
		u: 0x3183,
	},
	// HANGUL LETTER YESIEUNG-SIOS
	yesieungsioskorean: {
		n: 'yesieungsioskorean',
		u: 0x3182,
	},
	// HEBREW ACCENT YETIV
	yetivhebrew: {
		n: 'yetivhebrew',
		u: 0x059a,
	},
	// LATIN SMALL LETTER Y WITH GRAVE
	ygrave: {
		n: 'ygrave',
		u: 0x1ef3,
	},
	// LATIN SMALL LETTER Y WITH HOOK
	yhook: {
		n: 'yhook',
		u: 0x01b4,
	},
	// LATIN SMALL LETTER Y WITH HOOK ABOVE
	yhookabove: {
		n: 'yhookabove',
		u: 0x1ef7,
	},
	// ARMENIAN SMALL LETTER YI
	yiarmenian: {
		n: 'yiarmenian',
		u: 0x0575,
	},
	// CYRILLIC SMALL LETTER YI
	yicyrillic: {
		n: 'yicyrillic',
		u: 0x0457,
	},
	// HANGUL LETTER YI
	yikorean: {
		n: 'yikorean',
		u: 0x3162,
	},
	// YIN YANG
	yinyang: {
		n: 'yinyang',
		u: 0x262f,
	},
	// ARMENIAN SMALL LETTER YIWN
	yiwnarmenian: {
		n: 'yiwnarmenian',
		u: 0x0582,
	},
	// FULLWIDTH LATIN SMALL LETTER Y
	ymonospace: {
		n: 'ymonospace',
		u: 0xff59,
	},
	// HEBREW LETTER YOD
	yod: {
		n: 'yod',
		u: 0x05d9,
	},
	// HEBREW LETTER YOD WITH DAGESH
	yoddagesh: {
		n: 'yoddagesh',
		u: 0xfb39,
	},
	// HEBREW LETTER YOD WITH DAGESH
	yoddageshhebrew: {
		n: 'yoddageshhebrew',
		u: 0xfb39,
	},
	// HEBREW LETTER YOD
	yodhebrew: {
		n: 'yodhebrew',
		u: 0x05d9,
	},
	// HEBREW LIGATURE YIDDISH DOUBLE YOD
	yodyodhebrew: {
		n: 'yodyodhebrew',
		u: 0x05f2,
	},
	// HEBREW LIGATURE YIDDISH YOD YOD PATAH
	yodyodpatahhebrew: {
		n: 'yodyodpatahhebrew',
		u: 0xfb1f,
	},
	// HIRAGANA LETTER YO
	yohiragana: {
		n: 'yohiragana',
		u: 0x3088,
	},
	// HANGUL LETTER YO-I
	yoikorean: {
		n: 'yoikorean',
		u: 0x3189,
	},
	// KATAKANA LETTER YO
	yokatakana: {
		n: 'yokatakana',
		u: 0x30e8,
	},
	// HALFWIDTH KATAKANA LETTER YO
	yokatakanahalfwidth: {
		n: 'yokatakanahalfwidth',
		u: 0xff96,
	},
	// HANGUL LETTER YO
	yokorean: {
		n: 'yokorean',
		u: 0x315b,
	},
	// HIRAGANA LETTER SMALL YO
	yosmallhiragana: {
		n: 'yosmallhiragana',
		u: 0x3087,
	},
	// KATAKANA LETTER SMALL YO
	yosmallkatakana: {
		n: 'yosmallkatakana',
		u: 0x30e7,
	},
	// HALFWIDTH KATAKANA LETTER SMALL YO
	yosmallkatakanahalfwidth: {
		n: 'yosmallkatakanahalfwidth',
		u: 0xff6e,
	},
	// GREEK LETTER YOT
	yotgreek: {
		n: 'yotgreek',
		u: 0x03f3,
	},
	// HANGUL LETTER YO-YAE
	yoyaekorean: {
		n: 'yoyaekorean',
		u: 0x3188,
	},
	// HANGUL LETTER YO-YA
	yoyakorean: {
		n: 'yoyakorean',
		u: 0x3187,
	},
	// THAI CHARACTER YO YAK
	yoyakthai: {
		n: 'yoyakthai',
		u: 0x0e22,
	},
	// THAI CHARACTER YO YING
	yoyingthai: {
		n: 'yoyingthai',
		u: 0x0e0d,
	},
	// PARENTHESIZED LATIN SMALL LETTER Y
	yparen: {
		n: 'yparen',
		u: 0x24b4,
	},
	// GREEK YPOGEGRAMMENI
	ypogegrammeni: {
		n: 'ypogegrammeni',
		u: 0x037a,
	},
	// COMBINING GREEK YPOGEGRAMMENI
	ypogegrammenigreekcmb: {
		n: 'ypogegrammenigreekcmb',
		u: 0x0345,
	},
	// LATIN LETTER YR
	yr: {
		n: 'yr',
		u: 0x01a6,
	},
	// LATIN SMALL LETTER Y WITH RING ABOVE
	yring: {
		n: 'yring',
		u: 0x1e99,
	},
	// MODIFIER LETTER SMALL Y
	ysuperior: {
		n: 'ysuperior',
		u: 0x02b8,
	},
	// LATIN SMALL LETTER Y WITH TILDE
	ytilde: {
		n: 'ytilde',
		u: 0x1ef9,
	},
	// LATIN SMALL LETTER TURNED Y
	yturned: {
		n: 'yturned',
		u: 0x028e,
	},
	// HIRAGANA LETTER YU
	yuhiragana: {
		n: 'yuhiragana',
		u: 0x3086,
	},
	// HANGUL LETTER YU-I
	yuikorean: {
		n: 'yuikorean',
		u: 0x318c,
	},
	// KATAKANA LETTER YU
	yukatakana: {
		n: 'yukatakana',
		u: 0x30e6,
	},
	// HALFWIDTH KATAKANA LETTER YU
	yukatakanahalfwidth: {
		n: 'yukatakanahalfwidth',
		u: 0xff95,
	},
	// HANGUL LETTER YU
	yukorean: {
		n: 'yukorean',
		u: 0x3160,
	},
	// CYRILLIC SMALL LETTER BIG YUS
	yusbigcyrillic: {
		n: 'yusbigcyrillic',
		u: 0x046b,
	},
	// CYRILLIC SMALL LETTER IOTIFIED BIG YUS
	yusbigiotifiedcyrillic: {
		n: 'yusbigiotifiedcyrillic',
		u: 0x046d,
	},
	// CYRILLIC SMALL LETTER LITTLE YUS
	yuslittlecyrillic: {
		n: 'yuslittlecyrillic',
		u: 0x0467,
	},
	// CYRILLIC SMALL LETTER IOTIFIED LITTLE YUS
	yuslittleiotifiedcyrillic: {
		n: 'yuslittleiotifiedcyrillic',
		u: 0x0469,
	},
	// HIRAGANA LETTER SMALL YU
	yusmallhiragana: {
		n: 'yusmallhiragana',
		u: 0x3085,
	},
	// KATAKANA LETTER SMALL YU
	yusmallkatakana: {
		n: 'yusmallkatakana',
		u: 0x30e5,
	},
	// HALFWIDTH KATAKANA LETTER SMALL YU
	yusmallkatakanahalfwidth: {
		n: 'yusmallkatakanahalfwidth',
		u: 0xff6d,
	},
	// HANGUL LETTER YU-YE
	yuyekorean: {
		n: 'yuyekorean',
		u: 0x318b,
	},
	// HANGUL LETTER YU-YEO
	yuyeokorean: {
		n: 'yuyeokorean',
		u: 0x318a,
	},
	// BENGALI LETTER YYA
	yyabengali: {
		n: 'yyabengali',
		u: 0x09df,
	},
	// DEVANAGARI LETTER YYA
	yyadeva: {
		n: 'yyadeva',
		u: 0x095f,
	},
	// LATIN SMALL LETTER Z
	z: {
		n: 'z',
		u: 0x007a,
	},
	// ARMENIAN SMALL LETTER ZA
	zaarmenian: {
		n: 'zaarmenian',
		u: 0x0566,
	},
	// LATIN SMALL LETTER Z WITH ACUTE
	zacute: {
		n: 'zacute',
		u: 0x017a,
	},
	// DEVANAGARI LETTER ZA
	zadeva: {
		n: 'zadeva',
		u: 0x095b,
	},
	// GURMUKHI LETTER ZA
	zagurmukhi: {
		n: 'zagurmukhi',
		u: 0x0a5b,
	},
	// ARABIC LETTER ZAH
	zaharabic: {
		n: 'zaharabic',
		u: 0x0638,
	},
	// ARABIC LETTER ZAH FINAL FORM
	zahfinalarabic: {
		n: 'zahfinalarabic',
		u: 0xfec6,
	},
	// ARABIC LETTER ZAH INITIAL FORM
	zahinitialarabic: {
		n: 'zahinitialarabic',
		u: 0xfec7,
	},
	// HIRAGANA LETTER ZA
	zahiragana: {
		n: 'zahiragana',
		u: 0x3056,
	},
	// ARABIC LETTER ZAH MEDIAL FORM
	zahmedialarabic: {
		n: 'zahmedialarabic',
		u: 0xfec8,
	},
	// ARABIC LETTER ZAIN
	zainarabic: {
		n: 'zainarabic',
		u: 0x0632,
	},
	// ARABIC LETTER ZAIN FINAL FORM
	zainfinalarabic: {
		n: 'zainfinalarabic',
		u: 0xfeb0,
	},
	// KATAKANA LETTER ZA
	zakatakana: {
		n: 'zakatakana',
		u: 0x30b6,
	},
	// HEBREW ACCENT ZAQEF GADOL
	zaqefgadolhebrew: {
		n: 'zaqefgadolhebrew',
		u: 0x0595,
	},
	// HEBREW ACCENT ZAQEF QATAN
	zaqefqatanhebrew: {
		n: 'zaqefqatanhebrew',
		u: 0x0594,
	},
	// HEBREW ACCENT ZARQA
	zarqahebrew: {
		n: 'zarqahebrew',
		u: 0x0598,
	},
	// HEBREW LETTER ZAYIN
	zayin: {
		n: 'zayin',
		u: 0x05d6,
	},
	// HEBREW LETTER ZAYIN WITH DAGESH
	zayindagesh: {
		n: 'zayindagesh',
		u: 0xfb36,
	},
	// HEBREW LETTER ZAYIN WITH DAGESH
	zayindageshhebrew: {
		n: 'zayindageshhebrew',
		u: 0xfb36,
	},
	// HEBREW LETTER ZAYIN
	zayinhebrew: {
		n: 'zayinhebrew',
		u: 0x05d6,
	},
	// BOPOMOFO LETTER Z
	zbopomofo: {
		n: 'zbopomofo',
		u: 0x3117,
	},
	// LATIN SMALL LETTER Z WITH CARON
	zcaron: {
		n: 'zcaron',
		u: 0x017e,
	},
	// CIRCLED LATIN SMALL LETTER Z
	zcircle: {
		n: 'zcircle',
		u: 0x24e9,
	},
	// LATIN SMALL LETTER Z WITH CIRCUMFLEX
	zcircumflex: {
		n: 'zcircumflex',
		u: 0x1e91,
	},
	// LATIN SMALL LETTER Z WITH CURL
	zcurl: {
		n: 'zcurl',
		u: 0x0291,
	},
	// LATIN SMALL LETTER Z WITH DOT ABOVE
	zdot: {
		n: 'zdot',
		u: 0x017c,
	},
	// LATIN SMALL LETTER Z WITH DOT ABOVE
	zdotaccent: {
		n: 'zdotaccent',
		u: 0x017c,
	},
	// LATIN SMALL LETTER Z WITH DOT BELOW
	zdotbelow: {
		n: 'zdotbelow',
		u: 0x1e93,
	},
	// CYRILLIC SMALL LETTER ZE
	zecyrillic: {
		n: 'zecyrillic',
		u: 0x0437,
	},
	// CYRILLIC SMALL LETTER ZE WITH DESCENDER
	zedescendercyrillic: {
		n: 'zedescendercyrillic',
		u: 0x0499,
	},
	// CYRILLIC SMALL LETTER ZE WITH DIAERESIS
	zedieresiscyrillic: {
		n: 'zedieresiscyrillic',
		u: 0x04df,
	},
	// HIRAGANA LETTER ZE
	zehiragana: {
		n: 'zehiragana',
		u: 0x305c,
	},
	// KATAKANA LETTER ZE
	zekatakana: {
		n: 'zekatakana',
		u: 0x30bc,
	},
	// DIGIT ZERO
	zero: {
		n: 'zero',
		u: 0x0030,
	},
	// ARABIC-INDIC DIGIT ZERO
	zeroarabic: {
		n: 'zeroarabic',
		u: 0x0660,
	},
	// BENGALI DIGIT ZERO
	zerobengali: {
		n: 'zerobengali',
		u: 0x09e6,
	},
	// DEVANAGARI DIGIT ZERO
	zerodeva: {
		n: 'zerodeva',
		u: 0x0966,
	},
	// GUJARATI DIGIT ZERO
	zerogujarati: {
		n: 'zerogujarati',
		u: 0x0ae6,
	},
	// GURMUKHI DIGIT ZERO
	zerogurmukhi: {
		n: 'zerogurmukhi',
		u: 0x0a66,
	},
	// ARABIC-INDIC DIGIT ZERO
	zerohackarabic: {
		n: 'zerohackarabic',
		u: 0x0660,
	},
	// SUBSCRIPT ZERO
	zeroinferior: {
		n: 'zeroinferior',
		u: 0x2080,
	},
	// FULLWIDTH DIGIT ZERO
	zeromonospace: {
		n: 'zeromonospace',
		u: 0xff10,
	},
	// <private-use-F730>
	zerooldstyle: {
		n: 'zerooldstyle',
		u: 0xf730,
	},
	// EXTENDED ARABIC-INDIC DIGIT ZERO
	zeropersian: {
		n: 'zeropersian',
		u: 0x06f0,
	},
	// SUPERSCRIPT ZERO
	zerosuperior: {
		n: 'zerosuperior',
		u: 0x2070,
	},
	// THAI DIGIT ZERO
	zerothai: {
		n: 'zerothai',
		u: 0x0e50,
	},
	// ZERO WIDTH NO-BREAK SPACE
	zerowidthjoiner: {
		n: 'zerowidthjoiner',
		u: 0xfeff,
	},
	// ZERO WIDTH NON-JOINER
	zerowidthnonjoiner: {
		n: 'zerowidthnonjoiner',
		u: 0x200c,
	},
	// ZERO WIDTH SPACE
	zerowidthspace: {
		n: 'zerowidthspace',
		u: 0x200b,
	},
	// GREEK SMALL LETTER ZETA
	zeta: {
		n: 'zeta',
		u: 0x03b6,
	},
	// BOPOMOFO LETTER ZH
	zhbopomofo: {
		n: 'zhbopomofo',
		u: 0x3113,
	},
	// ARMENIAN SMALL LETTER ZHE
	zhearmenian: {
		n: 'zhearmenian',
		u: 0x056a,
	},
	// CYRILLIC SMALL LETTER ZHE WITH BREVE
	zhebrevecyrillic: {
		n: 'zhebrevecyrillic',
		u: 0x04c2,
	},
	// CYRILLIC SMALL LETTER ZHE
	zhecyrillic: {
		n: 'zhecyrillic',
		u: 0x0436,
	},
	// CYRILLIC SMALL LETTER ZHE WITH DESCENDER
	zhedescendercyrillic: {
		n: 'zhedescendercyrillic',
		u: 0x0497,
	},
	// CYRILLIC SMALL LETTER ZHE WITH DIAERESIS
	zhedieresiscyrillic: {
		n: 'zhedieresiscyrillic',
		u: 0x04dd,
	},
	// HIRAGANA LETTER ZI
	zihiragana: {
		n: 'zihiragana',
		u: 0x3058,
	},
	// KATAKANA LETTER ZI
	zikatakana: {
		n: 'zikatakana',
		u: 0x30b8,
	},
	// HEBREW ACCENT ZINOR
	zinorhebrew: {
		n: 'zinorhebrew',
		u: 0x05ae,
	},
	// LATIN SMALL LETTER Z WITH LINE BELOW
	zlinebelow: {
		n: 'zlinebelow',
		u: 0x1e95,
	},
	// FULLWIDTH LATIN SMALL LETTER Z
	zmonospace: {
		n: 'zmonospace',
		u: 0xff5a,
	},
	// HIRAGANA LETTER ZO
	zohiragana: {
		n: 'zohiragana',
		u: 0x305e,
	},
	// KATAKANA LETTER ZO
	zokatakana: {
		n: 'zokatakana',
		u: 0x30be,
	},
	// PARENTHESIZED LATIN SMALL LETTER Z
	zparen: {
		n: 'zparen',
		u: 0x24b5,
	},
	// LATIN SMALL LETTER Z WITH RETROFLEX HOOK
	zretroflexhook: {
		n: 'zretroflexhook',
		u: 0x0290,
	},
	// LATIN SMALL LETTER Z WITH STROKE
	zstroke: {
		n: 'zstroke',
		u: 0x01b6,
	},
	// HIRAGANA LETTER ZU
	zuhiragana: {
		n: 'zuhiragana',
		u: 0x305a,
	},
	// KATAKANA LETTER ZU
	zukatakana: {
		n: 'zukatakana',
		u: 0x30ba,
	},
};

/**
 * Map Unicode code points to Adobe glyph names.
 */
export const unicodeToAdobeGlyph = Object.assign([] as string[], {
	1: 'controlSTX',
	2: 'controlSOT',
	3: 'controlETX',
	4: 'controlEOT',
	5: 'controlENQ',
	6: 'controlACK',
	7: 'controlBEL',
	8: 'controlBS',
	9: 'controlHT',
	10: 'controlLF',
	11: 'controlVT',
	12: 'controlFF',
	13: 'controlCR',
	14: 'controlSO',
	15: 'controlSI',
	16: 'controlDLE',
	17: 'controlDC1',
	18: 'controlDC2',
	19: 'controlDC3',
	20: 'controlDC4',
	21: 'controlNAK',
	22: 'controlSYN',
	23: 'controlETB',
	24: 'controlCAN',
	25: 'controlEM',
	26: 'controlSUB',
	27: 'controlESC',
	28: 'controlFS',
	29: 'controlGS',
	30: 'controlRS',
	31: 'controlUS',
	32: 'space',
	33: 'exclam',
	34: 'quotedbl',
	35: 'numbersign',
	36: 'dollar',
	37: 'percent',
	38: 'ampersand',
	39: 'quotesingle',
	40: 'parenleft',
	41: 'parenright',
	42: 'asterisk',
	43: 'plus',
	44: 'comma',
	45: 'hyphen',
	46: 'period',
	47: 'slash',
	48: 'zero',
	49: 'one',
	50: 'two',
	51: 'three',
	52: 'four',
	53: 'five',
	54: 'six',
	55: 'seven',
	56: 'eight',
	57: 'nine',
	58: 'colon',
	59: 'semicolon',
	60: 'less',
	61: 'equal',
	62: 'greater',
	63: 'question',
	64: 'at',
	65: 'A',
	66: 'B',
	67: 'C',
	68: 'D',
	69: 'E',
	70: 'F',
	71: 'G',
	72: 'H',
	73: 'I',
	74: 'J',
	75: 'K',
	76: 'L',
	77: 'M',
	78: 'N',
	79: 'O',
	80: 'P',
	81: 'Q',
	82: 'R',
	83: 'S',
	84: 'T',
	85: 'U',
	86: 'V',
	87: 'W',
	88: 'X',
	89: 'Y',
	90: 'Z',
	91: 'bracketleft',
	92: 'backslash',
	93: 'bracketright',
	94: 'asciicircum',
	95: 'underscore',
	96: 'grave',
	97: 'a',
	98: 'b',
	99: 'c',
	100: 'd',
	101: 'e',
	102: 'f',
	103: 'g',
	104: 'h',
	105: 'i',
	106: 'j',
	107: 'k',
	108: 'l',
	109: 'm',
	110: 'n',
	111: 'o',
	112: 'p',
	113: 'q',
	114: 'r',
	115: 's',
	116: 't',
	117: 'u',
	118: 'v',
	119: 'w',
	120: 'x',
	121: 'y',
	122: 'z',
	123: 'braceleft',
	124: 'bar',
	125: 'braceright',
	126: 'asciitilde',
	127: 'controlDEL',
	160: 'nbspace',
	161: 'exclamdown',
	162: 'cent',
	163: 'sterling',
	164: 'currency',
	165: 'yen',
	166: 'brokenbar',
	167: 'section',
	168: 'dieresis',
	169: 'copyright',
	170: 'ordfeminine',
	171: 'guillemotleft',
	172: 'logicalnot',
	173: 'sfthyphen',
	174: 'registered',
	175: 'macron',
	176: 'degree',
	177: 'plusminus',
	178: 'twosuperior',
	179: 'threesuperior',
	180: 'acute',
	181: 'mu',
	182: 'paragraph',
	183: 'middot',
	184: 'cedilla',
	185: 'onesuperior',
	186: 'ordmasculine',
	187: 'guillemotright',
	188: 'onequarter',
	189: 'onehalf',
	190: 'threequarters',
	191: 'questiondown',
	192: 'Agrave',
	193: 'Aacute',
	194: 'Acircumflex',
	195: 'Atilde',
	196: 'Adieresis',
	197: 'Aring',
	198: 'AE',
	199: 'Ccedilla',
	200: 'Egrave',
	201: 'Eacute',
	202: 'Ecircumflex',
	203: 'Edieresis',
	204: 'Igrave',
	205: 'Iacute',
	206: 'Icircumflex',
	207: 'Idieresis',
	208: 'Eth',
	209: 'Ntilde',
	210: 'Ograve',
	211: 'Oacute',
	212: 'Ocircumflex',
	213: 'Otilde',
	214: 'Odieresis',
	215: 'multiply',
	216: 'Oslash',
	217: 'Ugrave',
	218: 'Uacute',
	219: 'Ucircumflex',
	220: 'Udieresis',
	221: 'Yacute',
	222: 'Thorn',
	223: 'germandbls',
	224: 'agrave',
	225: 'aacute',
	226: 'acircumflex',
	227: 'atilde',
	228: 'adieresis',
	229: 'aring',
	230: 'ae',
	231: 'ccedilla',
	232: 'egrave',
	233: 'eacute',
	234: 'ecircumflex',
	235: 'edieresis',
	236: 'igrave',
	237: 'iacute',
	238: 'icircumflex',
	239: 'idieresis',
	240: 'eth',
	241: 'ntilde',
	242: 'ograve',
	243: 'oacute',
	244: 'ocircumflex',
	245: 'otilde',
	246: 'odieresis',
	247: 'divide',
	248: 'oslash',
	249: 'ugrave',
	250: 'uacute',
	251: 'ucircumflex',
	252: 'udieresis',
	253: 'yacute',
	254: 'thorn',
	255: 'ydieresis',
	256: 'Amacron',
	257: 'amacron',
	258: 'Abreve',
	259: 'abreve',
	260: 'Aogonek',
	261: 'aogonek',
	262: 'Cacute',
	263: 'cacute',
	264: 'Ccircumflex',
	265: 'ccircumflex',
	266: 'Cdot',
	267: 'cdot',
	268: 'Ccaron',
	269: 'ccaron',
	270: 'Dcaron',
	271: 'dcaron',
	272: 'Dcroat',
	273: 'dcroat',
	274: 'Emacron',
	275: 'emacron',
	276: 'Ebreve',
	277: 'ebreve',
	278: 'Edot',
	279: 'edot',
	280: 'Eogonek',
	281: 'eogonek',
	282: 'Ecaron',
	283: 'ecaron',
	284: 'Gcircumflex',
	285: 'gcircumflex',
	286: 'Gbreve',
	287: 'gbreve',
	288: 'Gdot',
	289: 'gdot',
	290: 'Gcedilla',
	291: 'gcedilla',
	292: 'Hcircumflex',
	293: 'hcircumflex',
	294: 'Hbar',
	295: 'hbar',
	296: 'Itilde',
	297: 'itilde',
	298: 'Imacron',
	299: 'imacron',
	300: 'Ibreve',
	301: 'ibreve',
	302: 'Iogonek',
	303: 'iogonek',
	304: 'Idot',
	305: 'dotlessi',
	306: 'IJ',
	307: 'ij',
	308: 'Jcircumflex',
	309: 'jcircumflex',
	310: 'Kcedilla',
	311: 'kcedilla',
	312: 'kgreenlandic',
	313: 'Lacute',
	314: 'lacute',
	315: 'Lcedilla',
	316: 'lcedilla',
	317: 'Lcaron',
	318: 'lcaron',
	319: 'Ldot',
	320: 'ldot',
	321: 'Lslash',
	322: 'lslash',
	323: 'Nacute',
	324: 'nacute',
	325: 'Ncedilla',
	326: 'ncedilla',
	327: 'Ncaron',
	328: 'ncaron',
	329: 'napostrophe',
	330: 'Eng',
	331: 'eng',
	332: 'Omacron',
	333: 'omacron',
	334: 'Obreve',
	335: 'obreve',
	336: 'Odblacute',
	337: 'odblacute',
	338: 'OE',
	339: 'oe',
	340: 'Racute',
	341: 'racute',
	342: 'Rcedilla',
	343: 'rcedilla',
	344: 'Rcaron',
	345: 'rcaron',
	346: 'Sacute',
	347: 'sacute',
	348: 'Scircumflex',
	349: 'scircumflex',
	350: 'Scedilla',
	351: 'scedilla',
	352: 'Scaron',
	353: 'scaron',
	354: 'Tcedilla',
	355: 'tcedilla',
	356: 'Tcaron',
	357: 'tcaron',
	358: 'Tbar',
	359: 'tbar',
	360: 'Utilde',
	361: 'utilde',
	362: 'Umacron',
	363: 'umacron',
	364: 'Ubreve',
	365: 'ubreve',
	366: 'Uring',
	367: 'uring',
	368: 'Udblacute',
	369: 'udblacute',
	370: 'Uogonek',
	371: 'uogonek',
	372: 'Wcircumflex',
	373: 'wcircumflex',
	374: 'Ycircumflex',
	375: 'ycircumflex',
	376: 'Ydieresis',
	377: 'Zacute',
	378: 'zacute',
	379: 'Zdot',
	380: 'zdot',
	381: 'Zcaron',
	382: 'zcaron',
	383: 'longs',
	384: 'bstroke',
	385: 'Bhook',
	386: 'Btopbar',
	387: 'btopbar',
	388: 'Tonesix',
	389: 'tonesix',
	390: 'Oopen',
	391: 'Chook',
	392: 'chook',
	393: 'Dafrican',
	394: 'Dhook',
	395: 'Dtopbar',
	396: 'dtopbar',
	397: 'deltaturned',
	398: 'Ereversed',
	399: 'Schwa',
	400: 'Eopen',
	401: 'Fhook',
	402: 'florin',
	403: 'Ghook',
	404: 'Gammaafrican',
	405: 'hv',
	406: 'Iotaafrican',
	407: 'Istroke',
	408: 'Khook',
	409: 'khook',
	410: 'lbar',
	411: 'lambdastroke',
	412: 'Mturned',
	413: 'Nhookleft',
	414: 'nlegrightlong',
	415: 'Ocenteredtilde',
	416: 'Ohorn',
	417: 'ohorn',
	418: 'Oi',
	419: 'oi',
	420: 'Phook',
	421: 'phook',
	422: 'yr',
	423: 'Tonetwo',
	424: 'tonetwo',
	425: 'Esh',
	426: 'eshreversedloop',
	427: 'tpalatalhook',
	428: 'Thook',
	429: 'thook',
	430: 'Tretroflexhook',
	431: 'Uhorn',
	432: 'uhorn',
	433: 'Upsilonafrican',
	434: 'Vhook',
	435: 'Yhook',
	436: 'yhook',
	437: 'Zstroke',
	438: 'zstroke',
	439: 'Ezh',
	440: 'Ezhreversed',
	441: 'ezhreversed',
	442: 'ezhtail',
	443: 'twostroke',
	444: 'Tonefive',
	445: 'tonefive',
	446: 'glottalinvertedstroke',
	447: 'wynn',
	448: 'clickdental',
	449: 'clicklateral',
	450: 'clickalveolar',
	451: 'clickretroflex',
	452: 'DZcaron',
	453: 'Dzcaron',
	454: 'dzcaron',
	455: 'LJ',
	456: 'Lj',
	457: 'lj',
	458: 'NJ',
	459: 'Nj',
	460: 'nj',
	461: 'Acaron',
	462: 'acaron',
	463: 'Icaron',
	464: 'icaron',
	465: 'Ocaron',
	466: 'ocaron',
	467: 'Ucaron',
	468: 'ucaron',
	469: 'Udieresismacron',
	470: 'udieresismacron',
	471: 'Udieresisacute',
	472: 'udieresisacute',
	473: 'Udieresiscaron',
	474: 'udieresiscaron',
	475: 'Udieresisgrave',
	476: 'udieresisgrave',
	477: 'eturned',
	478: 'Adieresismacron',
	479: 'adieresismacron',
	480: 'Adotmacron',
	481: 'adotmacron',
	482: 'AEmacron',
	483: 'aemacron',
	484: 'Gstroke',
	485: 'gstroke',
	486: 'Gcaron',
	487: 'gcaron',
	488: 'Kcaron',
	489: 'kcaron',
	490: 'Oogonek',
	491: 'oogonek',
	492: 'Oogonekmacron',
	493: 'oogonekmacron',
	494: 'Ezhcaron',
	495: 'ezhcaron',
	496: 'jcaron',
	497: 'DZ',
	498: 'Dz',
	499: 'dz',
	500: 'Gacute',
	501: 'gacute',
	506: 'Aringacute',
	507: 'aringacute',
	508: 'AEacute',
	509: 'aeacute',
	510: 'Oslashacute',
	511: 'oslashacute',
	512: 'Adblgrave',
	513: 'adblgrave',
	514: 'Ainvertedbreve',
	515: 'ainvertedbreve',
	516: 'Edblgrave',
	517: 'edblgrave',
	518: 'Einvertedbreve',
	519: 'einvertedbreve',
	520: 'Idblgrave',
	521: 'idblgrave',
	522: 'Iinvertedbreve',
	523: 'iinvertedbreve',
	524: 'Odblgrave',
	525: 'odblgrave',
	526: 'Oinvertedbreve',
	527: 'oinvertedbreve',
	528: 'Rdblgrave',
	529: 'rdblgrave',
	530: 'Rinvertedbreve',
	531: 'rinvertedbreve',
	532: 'Udblgrave',
	533: 'udblgrave',
	534: 'Uinvertedbreve',
	535: 'uinvertedbreve',
	536: 'Scommaaccent',
	537: 'scommaaccent',
	592: 'aturned',
	593: 'ascript',
	594: 'ascriptturned',
	595: 'bhook',
	596: 'oopen',
	597: 'ccurl',
	598: 'dtail',
	599: 'dhook',
	600: 'ereversed',
	601: 'schwa',
	602: 'schwahook',
	603: 'eopen',
	604: 'eopenreversed',
	605: 'eopenreversedhook',
	606: 'eopenreversedclosed',
	607: 'jdotlessstroke',
	608: 'ghook',
	609: 'gscript',
	611: 'gammalatinsmall',
	612: 'ramshorn',
	613: 'hturned',
	614: 'hhook',
	615: 'henghook',
	616: 'istroke',
	617: 'iotalatin',
	619: 'lmiddletilde',
	620: 'lbelt',
	621: 'lhookretroflex',
	622: 'lezh',
	623: 'mturned',
	624: 'mlonglegturned',
	625: 'mhook',
	626: 'nhookleft',
	627: 'nhookretroflex',
	629: 'obarred',
	631: 'omegalatinclosed',
	632: 'philatin',
	633: 'rturned',
	634: 'rlonglegturned',
	635: 'rhookturned',
	636: 'rlongleg',
	637: 'rhook',
	638: 'rfishhook',
	639: 'rfishhookreversed',
	641: 'Rsmallinverted',
	642: 'shook',
	643: 'esh',
	644: 'dotlessjstrokehook',
	645: 'eshsquatreversed',
	646: 'eshcurl',
	647: 'tturned',
	648: 'tretroflexhook',
	649: 'ubar',
	650: 'upsilonlatin',
	651: 'vhook',
	652: 'vturned',
	653: 'wturned',
	654: 'yturned',
	656: 'zretroflexhook',
	657: 'zcurl',
	658: 'ezh',
	659: 'ezhcurl',
	660: 'glottalstop',
	661: 'glottalstopreversed',
	662: 'glottalstopinverted',
	663: 'cstretched',
	664: 'bilabialclick',
	666: 'eopenclosed',
	667: 'Gsmallhook',
	669: 'jcrossedtail',
	670: 'kturned',
	672: 'qhook',
	673: 'glottalstopstroke',
	674: 'glottalstopstrokereversed',
	675: 'dzaltone',
	676: 'dezh',
	677: 'dzcurl',
	678: 'ts',
	679: 'tesh',
	680: 'tccurl',
	688: 'hsuperior',
	689: 'hhooksuperior',
	690: 'jsuperior',
	692: 'rturnedsuperior',
	693: 'rhookturnedsuperior',
	694: 'Rsmallinvertedsuperior',
	695: 'wsuperior',
	696: 'ysuperior',
	697: 'primemod',
	698: 'dblprimemod',
	699: 'commaturnedmod',
	700: 'apostrophemod',
	701: 'commareversedmod',
	702: 'ringhalfright',
	703: 'ringhalfleft',
	704: 'glottalstopmod',
	705: 'glottalstopreversedmod',
	706: 'arrowheadleftmod',
	707: 'arrowheadrightmod',
	708: 'arrowheadupmod',
	709: 'arrowheaddownmod',
	710: 'circumflex',
	711: 'caron',
	712: 'verticallinemod',
	713: 'firsttonechinese',
	714: 'secondtonechinese',
	715: 'fourthtonechinese',
	716: 'verticallinelowmod',
	717: 'macronlowmod',
	718: 'gravelowmod',
	719: 'acutelowmod',
	720: 'colontriangularmod',
	721: 'colontriangularhalfmod',
	722: 'ringhalfrightcentered',
	723: 'ringhalfleftcentered',
	724: 'uptackmod',
	725: 'downtackmod',
	726: 'plusmod',
	727: 'minusmod',
	728: 'breve',
	729: 'dotaccent',
	730: 'ring',
	731: 'ogonek',
	732: 'ilde',
	733: 'hungarumlaut',
	734: 'rhotichookmod',
	736: 'gammasuperior',
	739: 'xsuperior',
	740: 'glottalstopreversedsuperior',
	741: 'tonebarextrahighmod',
	742: 'tonebarhighmod',
	743: 'tonebarmidmod',
	744: 'tonebarlowmod',
	745: 'tonebarextralowmod',
	768: 'gravecmb',
	769: 'acutecmb',
	770: 'circumflexcmb',
	771: 'tildecmb',
	772: 'macroncmb',
	773: 'overlinecmb',
	774: 'brevecmb',
	775: 'dotaccentcmb',
	776: 'dieresiscmb',
	777: 'hookcmb',
	778: 'ringcmb',
	779: 'hungarumlautcmb',
	780: 'caroncmb',
	781: 'verticallineabovecmb',
	782: 'dblverticallineabovecmb',
	783: 'dblgravecmb',
	784: 'candrabinducmb',
	785: 'breveinvertedcmb',
	786: 'commaturnedabovecmb',
	787: 'commaabovecmb',
	788: 'commareversedabovecmb',
	789: 'commaaboverightcmb',
	790: 'gravebelowcmb',
	791: 'acutebelowcmb',
	792: 'lefttackbelowcmb',
	793: 'righttackbelowcmb',
	794: 'leftangleabovecmb',
	795: 'horncmb',
	796: 'ringhalfleftbelowcmb',
	797: 'uptackbelowcmb',
	798: 'downtackbelowcmb',
	799: 'plusbelowcmb',
	800: 'minusbelowcmb',
	801: 'hookpalatalizedbelowcmb',
	802: 'hookretroflexbelowcmb',
	803: 'dotbelowcmb',
	804: 'dieresisbelowcmb',
	805: 'ringbelowcmb',
	807: 'cedillacmb',
	808: 'ogonekcmb',
	809: 'verticallinebelowcmb',
	810: 'bridgebelowcmb',
	811: 'dblarchinvertedbelowcmb',
	812: 'caronbelowcmb',
	813: 'circumflexbelowcmb',
	814: 'brevebelowcmb',
	815: 'breveinvertedbelowcmb',
	816: 'tildebelowcmb',
	817: 'macronbelowcmb',
	818: 'lowlinecmb',
	819: 'dbllowlinecmb',
	820: 'tildeoverlaycmb',
	821: 'strokeshortoverlaycmb',
	822: 'strokelongoverlaycmb',
	823: 'solidusshortoverlaycmb',
	824: 'soliduslongoverlaycmb',
	825: 'ringhalfrightbelowcmb',
	826: 'bridgeinvertedbelowcmb',
	827: 'squarebelowcmb',
	828: 'seagullbelowcmb',
	829: 'xabovecmb',
	830: 'tildeverticalcmb',
	831: 'dbloverlinecmb',
	832: 'gravetonecmb',
	833: 'acutetonecmb',
	834: 'perispomenigreekcmb',
	835: 'koroniscmb',
	836: 'dialytikatonoscmb',
	837: 'ypogegrammenigreekcmb',
	864: 'tildedoublecmb',
	865: 'breveinverteddoublecmb',
	884: 'numeralsigngreek',
	885: 'numeralsignlowergreek',
	890: 'ypogegrammeni',
	894: 'questiongreek',
	900: 'tonos',
	901: 'dieresistonos',
	902: 'Alphatonos',
	903: 'anoteleia',
	904: 'Epsilontonos',
	905: 'Etatonos',
	906: 'Iotatonos',
	908: 'Omicrontonos',
	910: 'Upsilontonos',
	911: 'Omegatonos',
	912: 'iotadieresistonos',
	913: 'Alpha',
	914: 'Beta',
	915: 'Gamma',
	916: 'Deltagreek',
	917: 'Epsilon',
	918: 'Zeta',
	919: 'Eta',
	920: 'Theta',
	921: 'Iota',
	922: 'Kappa',
	923: 'Lambda',
	924: 'Mu',
	925: 'Nu',
	926: 'Xi',
	927: 'Omicron',
	928: 'Pi',
	929: 'Rho',
	931: 'Sigma',
	932: 'Tau',
	933: 'Upsilon',
	934: 'Phi',
	935: 'Chi',
	936: 'Psi',
	937: 'Omegagreek',
	938: 'Iotadieresis',
	939: 'Upsilondieresis',
	940: 'alphatonos',
	941: 'epsilontonos',
	942: 'etatonos',
	943: 'iotatonos',
	944: 'upsilondieresistonos',
	945: 'alpha',
	946: 'beta',
	947: 'gamma',
	948: 'delta',
	949: 'epsilon',
	950: 'zeta',
	951: 'eta',
	952: 'theta',
	953: 'iota',
	954: 'kappa',
	955: 'lambda',
	956: 'mugreek',
	957: 'nu',
	958: 'xi',
	959: 'omicron',
	960: 'pi',
	961: 'rho',
	962: 'sigmafinal',
	963: 'sigma',
	964: 'tau',
	965: 'upsilon',
	966: 'phi',
	967: 'chi',
	968: 'psi',
	969: 'omega',
	970: 'iotadieresis',
	971: 'upsilondieresis',
	972: 'omicrontonos',
	973: 'upsilontonos',
	974: 'omegatonos',
	976: 'betasymbolgreek',
	977: 'thetasymbolgreek',
	978: 'Upsilonhooksymbol',
	979: 'Upsilonacutehooksymbolgreek',
	980: 'Upsilondieresishooksymbolgreek',
	981: 'phisymbolgreek',
	982: 'pisymbolgreek',
	986: 'Stigmagreek',
	988: 'Digammagreek',
	990: 'Koppagreek',
	992: 'Sampigreek',
	994: 'Sheicoptic',
	995: 'sheicoptic',
	996: 'Feicoptic',
	997: 'feicoptic',
	998: 'Kheicoptic',
	999: 'kheicoptic',
	1000: 'Horicoptic',
	1001: 'horicoptic',
	1002: 'Gangiacoptic',
	1003: 'gangiacoptic',
	1004: 'Shimacoptic',
	1005: 'shimacoptic',
	1006: 'Deicoptic',
	1007: 'deicoptic',
	1008: 'kappasymbolgreek',
	1009: 'rhosymbolgreek',
	1010: 'sigmalunatesymbolgreek',
	1011: 'yotgreek',
	1025: 'Iocyrillic',
	1026: 'Djecyrillic',
	1027: 'Gjecyrillic',
	1028: 'Ecyrillic',
	1029: 'Dzecyrillic',
	1030: 'Icyrillic',
	1031: 'Yicyrillic',
	1032: 'Jecyrillic',
	1033: 'Ljecyrillic',
	1034: 'Njecyrillic',
	1035: 'Tshecyrillic',
	1036: 'Kjecyrillic',
	1038: 'Ushortcyrillic',
	1039: 'Dzhecyrillic',
	1040: 'Acyrillic',
	1041: 'Becyrillic',
	1042: 'Vecyrillic',
	1043: 'Gecyrillic',
	1044: 'Decyrillic',
	1045: 'Iecyrillic',
	1046: 'Zhecyrillic',
	1047: 'Zecyrillic',
	1048: 'Iicyrillic',
	1049: 'Iishortcyrillic',
	1050: 'Kacyrillic',
	1051: 'Elcyrillic',
	1052: 'Emcyrillic',
	1053: 'Encyrillic',
	1054: 'Ocyrillic',
	1055: 'Pecyrillic',
	1056: 'Ercyrillic',
	1057: 'Escyrillic',
	1058: 'Tecyrillic',
	1059: 'Ucyrillic',
	1060: 'Efcyrillic',
	1061: 'Khacyrillic',
	1062: 'Tsecyrillic',
	1063: 'Checyrillic',
	1064: 'Shacyrillic',
	1065: 'Shchacyrillic',
	1066: 'Hardsigncyrillic',
	1067: 'Yericyrillic',
	1068: 'Softsigncyrillic',
	1069: 'Ereversedcyrillic',
	1070: 'IUcyrillic',
	1071: 'IAcyrillic',
	1072: 'acyrillic',
	1073: 'becyrillic',
	1074: 'vecyrillic',
	1075: 'gecyrillic',
	1076: 'decyrillic',
	1077: 'iecyrillic',
	1078: 'zhecyrillic',
	1079: 'zecyrillic',
	1080: 'iicyrillic',
	1081: 'iishortcyrillic',
	1082: 'kacyrillic',
	1083: 'elcyrillic',
	1084: 'emcyrillic',
	1085: 'encyrillic',
	1086: 'ocyrillic',
	1087: 'pecyrillic',
	1088: 'ercyrillic',
	1089: 'escyrillic',
	1090: 'tecyrillic',
	1091: 'ucyrillic',
	1092: 'efcyrillic',
	1093: 'khacyrillic',
	1094: 'tsecyrillic',
	1095: 'checyrillic',
	1096: 'shacyrillic',
	1097: 'shchacyrillic',
	1098: 'hardsigncyrillic',
	1099: 'yericyrillic',
	1100: 'softsigncyrillic',
	1101: 'ereversedcyrillic',
	1102: 'iucyrillic',
	1103: 'iacyrillic',
	1105: 'iocyrillic',
	1106: 'djecyrillic',
	1107: 'gjecyrillic',
	1108: 'ecyrillic',
	1109: 'dzecyrillic',
	1110: 'icyrillic',
	1111: 'yicyrillic',
	1112: 'jecyrillic',
	1113: 'ljecyrillic',
	1114: 'njecyrillic',
	1115: 'tshecyrillic',
	1116: 'kjecyrillic',
	1118: 'ushortcyrillic',
	1119: 'dzhecyrillic',
	1120: 'Omegacyrillic',
	1121: 'omegacyrillic',
	1122: 'Yatcyrillic',
	1123: 'yatcyrillic',
	1124: 'Eiotifiedcyrillic',
	1125: 'eiotifiedcyrillic',
	1126: 'Yuslittlecyrillic',
	1127: 'yuslittlecyrillic',
	1128: 'Yuslittleiotifiedcyrillic',
	1129: 'yuslittleiotifiedcyrillic',
	1130: 'Yusbigcyrillic',
	1131: 'yusbigcyrillic',
	1132: 'Yusbigiotifiedcyrillic',
	1133: 'yusbigiotifiedcyrillic',
	1134: 'Ksicyrillic',
	1135: 'ksicyrillic',
	1136: 'Psicyrillic',
	1137: 'psicyrillic',
	1138: 'Fitacyrillic',
	1139: 'fitacyrillic',
	1140: 'Izhitsacyrillic',
	1141: 'izhitsacyrillic',
	1142: 'Izhitsadblgravecyrillic',
	1143: 'izhitsadblgravecyrillic',
	1144: 'Ukcyrillic',
	1145: 'ukcyrillic',
	1146: 'Omegaroundcyrillic',
	1147: 'omegaroundcyrillic',
	1148: 'Omegatitlocyrillic',
	1149: 'omegatitlocyrillic',
	1150: 'Otcyrillic',
	1151: 'otcyrillic',
	1152: 'Koppacyrillic',
	1153: 'koppacyrillic',
	1154: 'thousandcyrillic',
	1155: 'titlocyrilliccmb',
	1156: 'palatalizationcyrilliccmb',
	1157: 'dasiapneumatacyrilliccmb',
	1158: 'psilipneumatacyrilliccmb',
	1168: 'Gheupturncyrillic',
	1169: 'gheupturncyrillic',
	1170: 'Ghestrokecyrillic',
	1171: 'ghestrokecyrillic',
	1172: 'Ghemiddlehookcyrillic',
	1173: 'ghemiddlehookcyrillic',
	1174: 'Zhedescendercyrillic',
	1175: 'zhedescendercyrillic',
	1176: 'Zedescendercyrillic',
	1177: 'zedescendercyrillic',
	1178: 'Kadescendercyrillic',
	1179: 'kadescendercyrillic',
	1180: 'Kaverticalstrokecyrillic',
	1181: 'kaverticalstrokecyrillic',
	1182: 'Kastrokecyrillic',
	1183: 'kastrokecyrillic',
	1184: 'Kabashkircyrillic',
	1185: 'kabashkircyrillic',
	1186: 'Endescendercyrillic',
	1187: 'endescendercyrillic',
	1188: 'Enghecyrillic',
	1189: 'enghecyrillic',
	1190: 'Pemiddlehookcyrillic',
	1191: 'pemiddlehookcyrillic',
	1192: 'Haabkhasiancyrillic',
	1193: 'haabkhasiancyrillic',
	1194: 'Esdescendercyrillic',
	1195: 'esdescendercyrillic',
	1196: 'Tedescendercyrillic',
	1197: 'tedescendercyrillic',
	1198: 'Ustraightcyrillic',
	1199: 'ustraightcyrillic',
	1200: 'Ustraightstrokecyrillic',
	1201: 'ustraightstrokecyrillic',
	1202: 'Hadescendercyrillic',
	1203: 'hadescendercyrillic',
	1204: 'Tetsecyrillic',
	1205: 'tetsecyrillic',
	1206: 'Chedescendercyrillic',
	1207: 'chedescendercyrillic',
	1208: 'Cheverticalstrokecyrillic',
	1209: 'cheverticalstrokecyrillic',
	1210: 'Shhacyrillic',
	1211: 'shhacyrillic',
	1212: 'Cheabkhasiancyrillic',
	1213: 'cheabkhasiancyrillic',
	1214: 'Chedescenderabkhasiancyrillic',
	1215: 'chedescenderabkhasiancyrillic',
	1216: 'palochkacyrillic',
	1217: 'Zhebrevecyrillic',
	1218: 'zhebrevecyrillic',
	1219: 'Kahookcyrillic',
	1220: 'kahookcyrillic',
	1223: 'Enhookcyrillic',
	1224: 'enhookcyrillic',
	1227: 'Chekhakassiancyrillic',
	1228: 'chekhakassiancyrillic',
	1232: 'Abrevecyrillic',
	1233: 'abrevecyrillic',
	1234: 'Adieresiscyrillic',
	1235: 'adieresiscyrillic',
	1236: 'Aiecyrillic',
	1237: 'aiecyrillic',
	1238: 'Iebrevecyrillic',
	1239: 'iebrevecyrillic',
	1240: 'Schwacyrillic',
	1241: 'schwacyrillic',
	1242: 'Schwadieresiscyrillic',
	1243: 'schwadieresiscyrillic',
	1244: 'Zhedieresiscyrillic',
	1245: 'zhedieresiscyrillic',
	1246: 'Zedieresiscyrillic',
	1247: 'zedieresiscyrillic',
	1248: 'Dzeabkhasiancyrillic',
	1249: 'dzeabkhasiancyrillic',
	1250: 'Imacroncyrillic',
	1251: 'imacroncyrillic',
	1252: 'Idieresiscyrillic',
	1253: 'idieresiscyrillic',
	1254: 'Odieresiscyrillic',
	1255: 'odieresiscyrillic',
	1256: 'Obarredcyrillic',
	1257: 'obarredcyrillic',
	1258: 'Obarreddieresiscyrillic',
	1259: 'obarreddieresiscyrillic',
	1262: 'Umacroncyrillic',
	1263: 'umacroncyrillic',
	1264: 'Udieresiscyrillic',
	1265: 'udieresiscyrillic',
	1266: 'Uhungarumlautcyrillic',
	1267: 'uhungarumlautcyrillic',
	1268: 'Chedieresiscyrillic',
	1269: 'chedieresiscyrillic',
	1272: 'Yerudieresiscyrillic',
	1273: 'yerudieresiscyrillic',
	1329: 'Aybarmenian',
	1330: 'Benarmenian',
	1331: 'Gimarmenian',
	1332: 'Daarmenian',
	1333: 'Echarmenian',
	1334: 'Zaarmenian',
	1335: 'Eharmenian',
	1336: 'Etarmenian',
	1337: 'Toarmenian',
	1338: 'Zhearmenian',
	1339: 'Iniarmenian',
	1340: 'Liwnarmenian',
	1341: 'Xeharmenian',
	1342: 'Caarmenian',
	1343: 'Kenarmenian',
	1344: 'Hoarmenian',
	1345: 'Jaarmenian',
	1346: 'Ghadarmenian',
	1347: 'Cheharmenian',
	1348: 'Menarmenian',
	1349: 'Yiarmenian',
	1350: 'Nowarmenian',
	1351: 'Shaarmenian',
	1352: 'Voarmenian',
	1353: 'Chaarmenian',
	1354: 'Peharmenian',
	1355: 'Jheharmenian',
	1356: 'Raarmenian',
	1357: 'Seharmenian',
	1358: 'Vewarmenian',
	1359: 'Tiwnarmenian',
	1360: 'Reharmenian',
	1361: 'Coarmenian',
	1362: 'Yiwnarmenian',
	1363: 'Piwrarmenian',
	1364: 'Keharmenian',
	1365: 'Oharmenian',
	1366: 'Feharmenian',
	1369: 'ringhalfleftarmenian',
	1370: 'apostrophearmenian',
	1371: 'emphasismarkarmenian',
	1372: 'exclamarmenian',
	1373: 'commaarmenian',
	1374: 'questionarmenian',
	1375: 'abbreviationmarkarmenian',
	1377: 'aybarmenian',
	1378: 'benarmenian',
	1379: 'gimarmenian',
	1380: 'daarmenian',
	1381: 'echarmenian',
	1382: 'zaarmenian',
	1383: 'eharmenian',
	1384: 'etarmenian',
	1385: 'toarmenian',
	1386: 'zhearmenian',
	1387: 'iniarmenian',
	1388: 'liwnarmenian',
	1389: 'xeharmenian',
	1390: 'caarmenian',
	1391: 'kenarmenian',
	1392: 'hoarmenian',
	1393: 'jaarmenian',
	1394: 'ghadarmenian',
	1395: 'cheharmenian',
	1396: 'menarmenian',
	1397: 'yiarmenian',
	1398: 'nowarmenian',
	1399: 'shaarmenian',
	1400: 'voarmenian',
	1401: 'chaarmenian',
	1402: 'peharmenian',
	1403: 'jheharmenian',
	1404: 'raarmenian',
	1405: 'seharmenian',
	1406: 'vewarmenian',
	1407: 'tiwnarmenian',
	1408: 'reharmenian',
	1409: 'coarmenian',
	1410: 'yiwnarmenian',
	1411: 'piwrarmenian',
	1412: 'keharmenian',
	1413: 'oharmenian',
	1414: 'feharmenian',
	1415: 'echyiwnarmenian',
	1417: 'periodarmenian',
	1425: 'etnahtahebrew',
	1426: 'segoltahebrew',
	1427: 'shalshelethebrew',
	1428: 'zaqefqatanhebrew',
	1429: 'zaqefgadolhebrew',
	1430: 'tipehahebrew',
	1431: 'reviahebrew',
	1432: 'zarqahebrew',
	1433: 'pashtahebrew',
	1434: 'yetivhebrew',
	1435: 'tevirhebrew',
	1436: 'gereshaccenthebrew',
	1437: 'gereshmuqdamhebrew',
	1438: 'gershayimaccenthebrew',
	1439: 'qarneyparahebrew',
	1440: 'telishagedolahebrew',
	1441: 'pazerhebrew',
	1443: 'munahhebrew',
	1444: 'mahapakhhebrew',
	1445: 'merkhahebrew',
	1446: 'merkhakefulahebrew',
	1447: 'dargahebrew',
	1448: 'qadmahebrew',
	1449: 'telishaqetanahebrew',
	1450: 'yerahbenyomohebrew',
	1451: 'olehebrew',
	1452: 'iluyhebrew',
	1453: 'dehihebrew',
	1454: 'zinorhebrew',
	1455: 'masoracirclehebrew',
	1456: 'sheva',
	1457: 'hatafsegol',
	1458: 'hatafpatah',
	1459: 'hatafqamats',
	1460: 'hiriq',
	1461: 'tsere',
	1462: 'segol',
	1463: 'patah',
	1464: 'qamats',
	1465: 'holam',
	1467: 'qubuts',
	1468: 'dagesh',
	1469: 'siluqhebrew',
	1470: 'maqafhebrew',
	1471: 'rafe',
	1472: 'paseqhebrew',
	1473: 'shindothebrew',
	1474: 'sindothebrew',
	1475: 'sofpasuqhebrew',
	1476: 'upperdothebrew',
	1488: 'alef',
	1489: 'bet',
	1490: 'gimel',
	1491: 'dalet',
	1492: 'he',
	1493: 'vav',
	1494: 'zayin',
	1495: 'het',
	1496: 'tet',
	1497: 'yod',
	1498: 'finalkaf',
	1499: 'kaf',
	1500: 'lamed',
	1501: 'finalmem',
	1502: 'mem',
	1503: 'finalnun',
	1504: 'nun',
	1505: 'samekh',
	1506: 'ayin',
	1507: 'finalpe',
	1508: 'pe',
	1509: 'finaltsadi',
	1510: 'tsadi',
	1511: 'qof',
	1512: 'resh',
	1513: 'shin',
	1514: 'tav',
	1520: 'vavvavhebrew',
	1521: 'vavyodhebrew',
	1522: 'yodyodhebrew',
	1523: 'gereshhebrew',
	1524: 'gershayimhebrew',
	1548: 'commaarabic',
	1563: 'semicolonarabic',
	1567: 'questionarabic',
	1569: 'hamzaarabic',
	1570: 'alefmaddaabovearabic',
	1571: 'alefhamzaabovearabic',
	1572: 'wawhamzaabovearabic',
	1573: 'alefhamzabelowarabic',
	1574: 'yehhamzaabovearabic',
	1575: 'alefarabic',
	1576: 'beharabic',
	1577: 'tehmarbutaarabic',
	1578: 'teharabic',
	1579: 'theharabic',
	1580: 'jeemarabic',
	1581: 'haharabic',
	1582: 'khaharabic',
	1583: 'dalarabic',
	1584: 'thalarabic',
	1585: 'reharabic',
	1586: 'zainarabic',
	1587: 'seenarabic',
	1588: 'sheenarabic',
	1589: 'sadarabic',
	1590: 'dadarabic',
	1591: 'taharabic',
	1592: 'zaharabic',
	1593: 'ainarabic',
	1594: 'ghainarabic',
	1600: 'tatweelarabic',
	1601: 'feharabic',
	1602: 'qafarabic',
	1603: 'kafarabic',
	1604: 'lamarabic',
	1605: 'meemarabic',
	1606: 'noonarabic',
	1607: 'heharabic',
	1608: 'wawarabic',
	1609: 'alefmaksuraarabic',
	1610: 'yeharabic',
	1611: 'fathatanarabic',
	1612: 'dammatanarabic',
	1613: 'kasratanarabic',
	1614: 'fathaarabic',
	1615: 'dammaarabic',
	1616: 'kasraarabic',
	1617: 'shaddaarabic',
	1618: 'sukunarabic',
	1632: 'zeroarabic',
	1633: 'onearabic',
	1634: 'twoarabic',
	1635: 'threearabic',
	1636: 'fourarabic',
	1637: 'fivearabic',
	1638: 'sixarabic',
	1639: 'sevenarabic',
	1640: 'eightarabic',
	1641: 'ninearabic',
	1642: 'percentarabic',
	1643: 'decimalseparatorarabic',
	1644: 'thousandsseparatorarabic',
	1645: 'asteriskarabic',
	1657: 'tteharabic',
	1662: 'peharabic',
	1670: 'tcheharabic',
	1672: 'ddalarabic',
	1681: 'rreharabic',
	1688: 'jeharabic',
	1700: 'veharabic',
	1711: 'gafarabic',
	1722: 'noonghunnaarabic',
	1729: 'haaltonearabic',
	1745: 'yehthreedotsbelowarabic',
	1746: 'yehbarreearabic',
	1749: 'afii57534',
	1776: 'zeropersian',
	1777: 'onepersian',
	1778: 'twopersian',
	1779: 'threepersian',
	1780: 'fourpersian',
	1781: 'fivepersian',
	1782: 'sixpersian',
	1783: 'sevenpersian',
	1784: 'eightpersian',
	1785: 'ninepersian',
	2305: 'candrabindudeva',
	2306: 'anusvaradeva',
	2307: 'visargadeva',
	2309: 'adeva',
	2310: 'aadeva',
	2311: 'ideva',
	2312: 'iideva',
	2313: 'udeva',
	2314: 'uudeva',
	2315: 'rvocalicdeva',
	2316: 'lvocalicdeva',
	2317: 'ecandradeva',
	2318: 'eshortdeva',
	2319: 'edeva',
	2320: 'aideva',
	2321: 'ocandradeva',
	2322: 'oshortdeva',
	2323: 'odeva',
	2324: 'audeva',
	2325: 'kadeva',
	2326: 'khadeva',
	2327: 'gadeva',
	2328: 'ghadeva',
	2329: 'ngadeva',
	2330: 'cadeva',
	2331: 'chadeva',
	2332: 'jadeva',
	2333: 'jhadeva',
	2334: 'nyadeva',
	2335: 'ttadeva',
	2336: 'tthadeva',
	2337: 'ddadeva',
	2338: 'ddhadeva',
	2339: 'nnadeva',
	2340: 'tadeva',
	2341: 'thadeva',
	2342: 'dadeva',
	2343: 'dhadeva',
	2344: 'nadeva',
	2345: 'nnnadeva',
	2346: 'padeva',
	2347: 'phadeva',
	2348: 'badeva',
	2349: 'bhadeva',
	2350: 'madeva',
	2351: 'yadeva',
	2352: 'radeva',
	2353: 'rradeva',
	2354: 'ladeva',
	2355: 'lladeva',
	2356: 'llladeva',
	2357: 'vadeva',
	2358: 'shadeva',
	2359: 'ssadeva',
	2360: 'sadeva',
	2361: 'hadeva',
	2364: 'nuktadeva',
	2365: 'avagrahadeva',
	2366: 'aavowelsigndeva',
	2367: 'ivowelsigndeva',
	2368: 'iivowelsigndeva',
	2369: 'uvowelsigndeva',
	2370: 'uuvowelsigndeva',
	2371: 'rvocalicvowelsigndeva',
	2372: 'rrvocalicvowelsigndeva',
	2373: 'ecandravowelsigndeva',
	2374: 'eshortvowelsigndeva',
	2375: 'evowelsigndeva',
	2376: 'aivowelsigndeva',
	2377: 'ocandravowelsigndeva',
	2378: 'oshortvowelsigndeva',
	2379: 'ovowelsigndeva',
	2380: 'auvowelsigndeva',
	2381: 'viramadeva',
	2384: 'omdeva',
	2385: 'udattadeva',
	2386: 'anudattadeva',
	2387: 'gravedeva',
	2388: 'acutedeva',
	2392: 'qadeva',
	2393: 'khhadeva',
	2394: 'ghhadeva',
	2395: 'zadeva',
	2396: 'dddhadeva',
	2397: 'rhadeva',
	2398: 'fadeva',
	2399: 'yyadeva',
	2400: 'rrvocalicdeva',
	2401: 'llvocalicdeva',
	2402: 'lvocalicvowelsigndeva',
	2403: 'llvocalicvowelsigndeva',
	2404: 'danda',
	2405: 'dbldanda',
	2406: 'zerodeva',
	2407: 'onedeva',
	2408: 'twodeva',
	2409: 'threedeva',
	2410: 'fourdeva',
	2411: 'fivedeva',
	2412: 'sixdeva',
	2413: 'sevendeva',
	2414: 'eightdeva',
	2415: 'ninedeva',
	2416: 'abbreviationsigndeva',
	2433: 'candrabindubengali',
	2434: 'anusvarabengali',
	2435: 'visargabengali',
	2437: 'abengali',
	2438: 'aabengali',
	2439: 'ibengali',
	2440: 'iibengali',
	2441: 'ubengali',
	2442: 'uubengali',
	2443: 'rvocalicbengali',
	2444: 'lvocalicbengali',
	2447: 'ebengali',
	2448: 'aibengali',
	2451: 'obengali',
	2452: 'aubengali',
	2453: 'kabengali',
	2454: 'khabengali',
	2455: 'gabengali',
	2456: 'ghabengali',
	2457: 'ngabengali',
	2458: 'cabengali',
	2459: 'chabengali',
	2460: 'jabengali',
	2461: 'jhabengali',
	2462: 'nyabengali',
	2463: 'ttabengali',
	2464: 'tthabengali',
	2465: 'ddabengali',
	2466: 'ddhabengali',
	2467: 'nnabengali',
	2468: 'tabengali',
	2469: 'thabengali',
	2470: 'dabengali',
	2471: 'dhabengali',
	2472: 'nabengali',
	2474: 'pabengali',
	2475: 'phabengali',
	2476: 'babengali',
	2477: 'bhabengali',
	2478: 'mabengali',
	2479: 'yabengali',
	2480: 'rabengali',
	2482: 'labengali',
	2486: 'shabengali',
	2487: 'ssabengali',
	2488: 'sabengali',
	2489: 'habengali',
	2492: 'nuktabengali',
	2494: 'aavowelsignbengali',
	2495: 'ivowelsignbengali',
	2496: 'iivowelsignbengali',
	2497: 'uvowelsignbengali',
	2498: 'uuvowelsignbengali',
	2499: 'rvocalicvowelsignbengali',
	2500: 'rrvocalicvowelsignbengali',
	2503: 'evowelsignbengali',
	2504: 'aivowelsignbengali',
	2507: 'ovowelsignbengali',
	2508: 'auvowelsignbengali',
	2509: 'viramabengali',
	2519: 'aulengthmarkbengali',
	2524: 'rrabengali',
	2525: 'rhabengali',
	2527: 'yyabengali',
	2528: 'rrvocalicbengali',
	2529: 'llvocalicbengali',
	2530: 'lvocalicvowelsignbengali',
	2531: 'llvocalicvowelsignbengali',
	2534: 'zerobengali',
	2535: 'onebengali',
	2536: 'twobengali',
	2537: 'threebengali',
	2538: 'fourbengali',
	2539: 'fivebengali',
	2540: 'sixbengali',
	2541: 'sevenbengali',
	2542: 'eightbengali',
	2543: 'ninebengali',
	2544: 'ramiddlediagonalbengali',
	2545: 'ralowerdiagonalbengali',
	2546: 'rupeemarkbengali',
	2547: 'rupeesignbengali',
	2548: 'onenumeratorbengali',
	2549: 'twonumeratorbengali',
	2550: 'threenumeratorbengali',
	2551: 'fournumeratorbengali',
	2552: 'denominatorminusonenumeratorbengali',
	2553: 'sixteencurrencydenominatorbengali',
	2554: 'issharbengali',
	2562: 'bindigurmukhi',
	2565: 'agurmukhi',
	2566: 'aagurmukhi',
	2567: 'igurmukhi',
	2568: 'iigurmukhi',
	2569: 'ugurmukhi',
	2570: 'uugurmukhi',
	2575: 'eegurmukhi',
	2576: 'aigurmukhi',
	2579: 'oogurmukhi',
	2580: 'augurmukhi',
	2581: 'kagurmukhi',
	2582: 'khagurmukhi',
	2583: 'gagurmukhi',
	2584: 'ghagurmukhi',
	2585: 'ngagurmukhi',
	2586: 'cagurmukhi',
	2587: 'chagurmukhi',
	2588: 'jagurmukhi',
	2589: 'jhagurmukhi',
	2590: 'nyagurmukhi',
	2591: 'ttagurmukhi',
	2592: 'tthagurmukhi',
	2593: 'ddagurmukhi',
	2594: 'ddhagurmukhi',
	2595: 'nnagurmukhi',
	2596: 'tagurmukhi',
	2597: 'thagurmukhi',
	2598: 'dagurmukhi',
	2599: 'dhagurmukhi',
	2600: 'nagurmukhi',
	2602: 'pagurmukhi',
	2603: 'phagurmukhi',
	2604: 'bagurmukhi',
	2605: 'bhagurmukhi',
	2606: 'magurmukhi',
	2607: 'yagurmukhi',
	2608: 'ragurmukhi',
	2610: 'lagurmukhi',
	2613: 'vagurmukhi',
	2614: 'shagurmukhi',
	2616: 'sagurmukhi',
	2617: 'hagurmukhi',
	2620: 'nuktagurmukhi',
	2622: 'aamatragurmukhi',
	2623: 'imatragurmukhi',
	2624: 'iimatragurmukhi',
	2625: 'umatragurmukhi',
	2626: 'uumatragurmukhi',
	2631: 'eematragurmukhi',
	2632: 'aimatragurmukhi',
	2635: 'oomatragurmukhi',
	2636: 'aumatragurmukhi',
	2637: 'halantgurmukhi',
	2649: 'khhagurmukhi',
	2650: 'ghhagurmukhi',
	2651: 'zagurmukhi',
	2652: 'rragurmukhi',
	2654: 'fagurmukhi',
	2662: 'zerogurmukhi',
	2663: 'onegurmukhi',
	2664: 'twogurmukhi',
	2665: 'threegurmukhi',
	2666: 'fourgurmukhi',
	2667: 'fivegurmukhi',
	2668: 'sixgurmukhi',
	2669: 'sevengurmukhi',
	2670: 'eightgurmukhi',
	2671: 'ninegurmukhi',
	2672: 'tippigurmukhi',
	2673: 'addakgurmukhi',
	2674: 'irigurmukhi',
	2675: 'uragurmukhi',
	2676: 'ekonkargurmukhi',
	2689: 'candrabindugujarati',
	2690: 'anusvaragujarati',
	2691: 'visargagujarati',
	2693: 'agujarati',
	2694: 'aagujarati',
	2695: 'igujarati',
	2696: 'iigujarati',
	2697: 'ugujarati',
	2698: 'uugujarati',
	2699: 'rvocalicgujarati',
	2701: 'ecandragujarati',
	2703: 'egujarati',
	2704: 'aigujarati',
	2705: 'ocandragujarati',
	2707: 'ogujarati',
	2708: 'augujarati',
	2709: 'kagujarati',
	2710: 'khagujarati',
	2711: 'gagujarati',
	2712: 'ghagujarati',
	2713: 'ngagujarati',
	2714: 'cagujarati',
	2715: 'chagujarati',
	2716: 'jagujarati',
	2717: 'jhagujarati',
	2718: 'nyagujarati',
	2719: 'ttagujarati',
	2720: 'tthagujarati',
	2721: 'ddagujarati',
	2722: 'ddhagujarati',
	2723: 'nnagujarati',
	2724: 'tagujarati',
	2725: 'thagujarati',
	2726: 'dagujarati',
	2727: 'dhagujarati',
	2728: 'nagujarati',
	2730: 'pagujarati',
	2731: 'phagujarati',
	2732: 'bagujarati',
	2733: 'bhagujarati',
	2734: 'magujarati',
	2735: 'yagujarati',
	2736: 'ragujarati',
	2738: 'lagujarati',
	2739: 'llagujarati',
	2741: 'vagujarati',
	2742: 'shagujarati',
	2743: 'ssagujarati',
	2744: 'sagujarati',
	2745: 'hagujarati',
	2748: 'nuktagujarati',
	2750: 'aavowelsigngujarati',
	2751: 'ivowelsigngujarati',
	2752: 'iivowelsigngujarati',
	2753: 'uvowelsigngujarati',
	2754: 'uuvowelsigngujarati',
	2755: 'rvocalicvowelsigngujarati',
	2756: 'rrvocalicvowelsigngujarati',
	2757: 'ecandravowelsigngujarati',
	2759: 'evowelsigngujarati',
	2760: 'aivowelsigngujarati',
	2761: 'ocandravowelsigngujarati',
	2763: 'ovowelsigngujarati',
	2764: 'auvowelsigngujarati',
	2765: 'viramagujarati',
	2768: 'omgujarati',
	2784: 'rrvocalicgujarati',
	2790: 'zerogujarati',
	2791: 'onegujarati',
	2792: 'twogujarati',
	2793: 'threegujarati',
	2794: 'fourgujarati',
	2795: 'fivegujarati',
	2796: 'sixgujarati',
	2797: 'sevengujarati',
	2798: 'eightgujarati',
	2799: 'ninegujarati',
	3585: 'kokaithai',
	3586: 'khokhaithai',
	3587: 'khokhuatthai',
	3588: 'khokhwaithai',
	3589: 'khokhonthai',
	3590: 'khorakhangthai',
	3591: 'ngonguthai',
	3592: 'chochanthai',
	3593: 'chochingthai',
	3594: 'chochangthai',
	3595: 'sosothai',
	3596: 'chochoethai',
	3597: 'yoyingthai',
	3598: 'dochadathai',
	3599: 'topatakthai',
	3600: 'thothanthai',
	3601: 'thonangmonthothai',
	3602: 'thophuthaothai',
	3603: 'nonenthai',
	3604: 'dodekthai',
	3605: 'totaothai',
	3606: 'thothungthai',
	3607: 'thothahanthai',
	3608: 'thothongthai',
	3609: 'nonuthai',
	3610: 'bobaimaithai',
	3611: 'poplathai',
	3612: 'phophungthai',
	3613: 'fofathai',
	3614: 'phophanthai',
	3615: 'fofanthai',
	3616: 'phosamphaothai',
	3617: 'momathai',
	3618: 'yoyakthai',
	3619: 'roruathai',
	3620: 'ruthai',
	3621: 'lolingthai',
	3622: 'luthai',
	3623: 'wowaenthai',
	3624: 'sosalathai',
	3625: 'sorusithai',
	3626: 'sosuathai',
	3627: 'hohipthai',
	3628: 'lochulathai',
	3629: 'oangthai',
	3630: 'honokhukthai',
	3631: 'paiyannoithai',
	3632: 'saraathai',
	3633: 'maihanakatthai',
	3634: 'saraaathai',
	3635: 'saraamthai',
	3636: 'saraithai',
	3637: 'saraiithai',
	3638: 'sarauethai',
	3639: 'saraueethai',
	3640: 'sarauthai',
	3641: 'sarauuthai',
	3642: 'phinthuthai',
	3647: 'bahtthai',
	3648: 'saraethai',
	3649: 'saraaethai',
	3650: 'saraothai',
	3651: 'saraaimaimuanthai',
	3652: 'saraaimaimalaithai',
	3653: 'lakkhangyaothai',
	3654: 'maiyamokthai',
	3655: 'maitaikhuthai',
	3656: 'maiekthai',
	3657: 'maithothai',
	3658: 'maitrithai',
	3659: 'maichattawathai',
	3660: 'thanthakhatthai',
	3661: 'nikhahitthai',
	3662: 'yamakkanthai',
	3663: 'fongmanthai',
	3664: 'zerothai',
	3665: 'onethai',
	3666: 'twothai',
	3667: 'threethai',
	3668: 'fourthai',
	3669: 'fivethai',
	3670: 'sixthai',
	3671: 'seventhai',
	3672: 'eightthai',
	3673: 'ninethai',
	3674: 'angkhankhuthai',
	3675: 'khomutthai',
	7680: 'Aringbelow',
	7681: 'aringbelow',
	7682: 'Bdotaccent',
	7683: 'bdotaccent',
	7684: 'Bdotbelow',
	7685: 'bdotbelow',
	7686: 'Blinebelow',
	7687: 'blinebelow',
	7688: 'Ccedillaacute',
	7689: 'ccedillaacute',
	7690: 'Ddotaccent',
	7691: 'ddotaccent',
	7692: 'Ddotbelow',
	7693: 'ddotbelow',
	7694: 'Dlinebelow',
	7695: 'dlinebelow',
	7696: 'Dcedilla',
	7697: 'dcedilla',
	7698: 'Dcircumflexbelow',
	7699: 'dcircumflexbelow',
	7700: 'Emacrongrave',
	7701: 'emacrongrave',
	7702: 'Emacronacute',
	7703: 'emacronacute',
	7704: 'Ecircumflexbelow',
	7705: 'ecircumflexbelow',
	7706: 'Etildebelow',
	7707: 'etildebelow',
	7708: 'Ecedillabreve',
	7709: 'ecedillabreve',
	7710: 'Fdotaccent',
	7711: 'fdotaccent',
	7712: 'Gmacron',
	7713: 'gmacron',
	7714: 'Hdotaccent',
	7715: 'hdotaccent',
	7716: 'Hdotbelow',
	7717: 'hdotbelow',
	7718: 'Hdieresis',
	7719: 'hdieresis',
	7720: 'Hcedilla',
	7721: 'hcedilla',
	7722: 'Hbrevebelow',
	7723: 'hbrevebelow',
	7724: 'Itildebelow',
	7725: 'itildebelow',
	7726: 'Idieresisacute',
	7727: 'idieresisacute',
	7728: 'Kacute',
	7729: 'kacute',
	7730: 'Kdotbelow',
	7731: 'kdotbelow',
	7732: 'Klinebelow',
	7733: 'klinebelow',
	7734: 'Ldotbelow',
	7735: 'ldotbelow',
	7736: 'Ldotbelowmacron',
	7737: 'ldotbelowmacron',
	7738: 'Llinebelow',
	7739: 'llinebelow',
	7740: 'Lcircumflexbelow',
	7741: 'lcircumflexbelow',
	7742: 'Macute',
	7743: 'macute',
	7744: 'Mdotaccent',
	7745: 'mdotaccent',
	7746: 'Mdotbelow',
	7747: 'mdotbelow',
	7748: 'Ndotaccent',
	7749: 'ndotaccent',
	7750: 'Ndotbelow',
	7751: 'ndotbelow',
	7752: 'Nlinebelow',
	7753: 'nlinebelow',
	7754: 'Ncircumflexbelow',
	7755: 'ncircumflexbelow',
	7756: 'Otildeacute',
	7757: 'otildeacute',
	7758: 'Otildedieresis',
	7759: 'otildedieresis',
	7760: 'Omacrongrave',
	7761: 'omacrongrave',
	7762: 'Omacronacute',
	7763: 'omacronacute',
	7764: 'Pacute',
	7765: 'pacute',
	7766: 'Pdotaccent',
	7767: 'pdotaccent',
	7768: 'Rdotaccent',
	7769: 'rdotaccent',
	7770: 'Rdotbelow',
	7771: 'rdotbelow',
	7772: 'Rdotbelowmacron',
	7773: 'rdotbelowmacron',
	7774: 'Rlinebelow',
	7775: 'rlinebelow',
	7776: 'Sdotaccent',
	7777: 'sdotaccent',
	7778: 'Sdotbelow',
	7779: 'sdotbelow',
	7780: 'Sacutedotaccent',
	7781: 'sacutedotaccent',
	7782: 'Scarondotaccent',
	7783: 'scarondotaccent',
	7784: 'Sdotbelowdotaccent',
	7785: 'sdotbelowdotaccent',
	7786: 'Tdotaccent',
	7787: 'tdotaccent',
	7788: 'Tdotbelow',
	7789: 'tdotbelow',
	7790: 'Tlinebelow',
	7791: 'tlinebelow',
	7792: 'Tcircumflexbelow',
	7793: 'tcircumflexbelow',
	7794: 'Udieresisbelow',
	7795: 'udieresisbelow',
	7796: 'Utildebelow',
	7797: 'utildebelow',
	7798: 'Ucircumflexbelow',
	7799: 'ucircumflexbelow',
	7800: 'Utildeacute',
	7801: 'utildeacute',
	7802: 'Umacrondieresis',
	7803: 'umacrondieresis',
	7804: 'Vtilde',
	7805: 'vtilde',
	7806: 'Vdotbelow',
	7807: 'vdotbelow',
	7808: 'Wgrave',
	7809: 'wgrave',
	7810: 'Wacute',
	7811: 'wacute',
	7812: 'Wdieresis',
	7813: 'wdieresis',
	7814: 'Wdotaccent',
	7815: 'wdotaccent',
	7816: 'Wdotbelow',
	7817: 'wdotbelow',
	7818: 'Xdotaccent',
	7819: 'xdotaccent',
	7820: 'Xdieresis',
	7821: 'xdieresis',
	7822: 'Ydotaccent',
	7823: 'ydotaccent',
	7824: 'Zcircumflex',
	7825: 'zcircumflex',
	7826: 'Zdotbelow',
	7827: 'zdotbelow',
	7828: 'Zlinebelow',
	7829: 'zlinebelow',
	7830: 'hlinebelow',
	7831: 'tdieresis',
	7832: 'wring',
	7833: 'yring',
	7834: 'arighthalfring',
	7835: 'slongdotaccent',
	7840: 'Adotbelow',
	7841: 'adotbelow',
	7842: 'Ahookabove',
	7843: 'ahookabove',
	7844: 'Acircumflexacute',
	7845: 'acircumflexacute',
	7846: 'Acircumflexgrave',
	7847: 'acircumflexgrave',
	7848: 'Acircumflexhookabove',
	7849: 'acircumflexhookabove',
	7850: 'Acircumflextilde',
	7851: 'acircumflextilde',
	7852: 'Acircumflexdotbelow',
	7853: 'acircumflexdotbelow',
	7854: 'Abreveacute',
	7855: 'abreveacute',
	7856: 'Abrevegrave',
	7857: 'abrevegrave',
	7858: 'Abrevehookabove',
	7859: 'abrevehookabove',
	7860: 'Abrevetilde',
	7861: 'abrevetilde',
	7862: 'Abrevedotbelow',
	7863: 'abrevedotbelow',
	7864: 'Edotbelow',
	7865: 'edotbelow',
	7866: 'Ehookabove',
	7867: 'ehookabove',
	7868: 'Etilde',
	7869: 'etilde',
	7870: 'Ecircumflexacute',
	7871: 'ecircumflexacute',
	7872: 'Ecircumflexgrave',
	7873: 'ecircumflexgrave',
	7874: 'Ecircumflexhookabove',
	7875: 'ecircumflexhookabove',
	7876: 'Ecircumflextilde',
	7877: 'ecircumflextilde',
	7878: 'Ecircumflexdotbelow',
	7879: 'ecircumflexdotbelow',
	7880: 'Ihookabove',
	7881: 'ihookabove',
	7882: 'Idotbelow',
	7883: 'idotbelow',
	7884: 'Odotbelow',
	7885: 'odotbelow',
	7886: 'Ohookabove',
	7887: 'ohookabove',
	7888: 'Ocircumflexacute',
	7889: 'ocircumflexacute',
	7890: 'Ocircumflexgrave',
	7891: 'ocircumflexgrave',
	7892: 'Ocircumflexhookabove',
	7893: 'ocircumflexhookabove',
	7894: 'Ocircumflextilde',
	7895: 'ocircumflextilde',
	7896: 'Ocircumflexdotbelow',
	7897: 'ocircumflexdotbelow',
	7898: 'Ohornacute',
	7899: 'ohornacute',
	7900: 'Ohorngrave',
	7901: 'ohorngrave',
	7902: 'Ohornhookabove',
	7903: 'ohornhookabove',
	7904: 'Ohorntilde',
	7905: 'ohorntilde',
	7906: 'Ohorndotbelow',
	7907: 'ohorndotbelow',
	7908: 'Udotbelow',
	7909: 'udotbelow',
	7910: 'Uhookabove',
	7911: 'uhookabove',
	7912: 'Uhornacute',
	7913: 'uhornacute',
	7914: 'Uhorngrave',
	7915: 'uhorngrave',
	7916: 'Uhornhookabove',
	7917: 'uhornhookabove',
	7918: 'Uhorntilde',
	7919: 'uhorntilde',
	7920: 'Uhorndotbelow',
	7921: 'uhorndotbelow',
	7922: 'Ygrave',
	7923: 'ygrave',
	7924: 'Ydotbelow',
	7925: 'ydotbelow',
	7926: 'Yhookabove',
	7927: 'yhookabove',
	7928: 'Ytilde',
	7929: 'ytilde',
	8194: 'enspace',
	8203: 'zerowidthspace',
	8204: 'zerowidthnonjoiner',
	8205: 'afii301',
	8206: 'afii299',
	8207: 'afii300',
	8208: 'hyphentwo',
	8210: 'figuredash',
	8211: 'endash',
	8212: 'emdash',
	8213: 'horizontalbar',
	8214: 'dblverticalbar',
	8215: 'dbllowline',
	8216: 'quoteleft',
	8217: 'quoteright',
	8218: 'quotesinglbase',
	8219: 'quotereversed',
	8220: 'quotedblleft',
	8221: 'quotedblright',
	8222: 'quotedblbase',
	8224: 'dagger',
	8225: 'daggerdbl',
	8226: 'bullet',
	8228: 'onedotenleader',
	8229: 'twodotleader',
	8230: 'ellipsis',
	8236: 'afii61573',
	8237: 'afii61574',
	8238: 'afii61575',
	8240: 'perthousand',
	8242: 'minute',
	8243: 'second',
	8245: 'primereversed',
	8249: 'guilsinglleft',
	8250: 'guilsinglright',
	8251: 'referencemark',
	8252: 'exclamdbl',
	8254: 'overline',
	8258: 'asterism',
	8260: 'fraction',
	8304: 'zerosuperior',
	8308: 'foursuperior',
	8309: 'fivesuperior',
	8310: 'sixsuperior',
	8311: 'sevensuperior',
	8312: 'eightsuperior',
	8313: 'ninesuperior',
	8314: 'plussuperior',
	8316: 'equalsuperior',
	8317: 'parenleftsuperior',
	8318: 'parenrightsuperior',
	8319: 'nsuperior',
	8320: 'zeroinferior',
	8321: 'oneinferior',
	8322: 'twoinferior',
	8323: 'threeinferior',
	8324: 'fourinferior',
	8325: 'fiveinferior',
	8326: 'sixinferior',
	8327: 'seveninferior',
	8328: 'eightinferior',
	8329: 'nineinferior',
	8333: 'parenleftinferior',
	8334: 'parenrightinferior',
	8353: 'colonsign',
	8354: 'cruzeiro',
	8355: 'franc',
	8356: 'lira',
	8359: 'peseta',
	8361: 'won',
	8362: 'sheqel',
	8363: 'dong',
	8364: 'Euro',
	8451: 'centigrade',
	8453: 'careof',
	8457: 'fahrenheit',
	8465: 'Ifraktur',
	8467: 'lsquare',
	8470: 'numero',
	8472: 'weierstrass',
	8476: 'Rfraktur',
	8478: 'prescription',
	8481: 'telephone',
	8482: 'trademark',
	8486: 'Ohm',
	8491: 'angstrom',
	8494: 'estimated',
	8501: 'aleph',
	8531: 'onethird',
	8532: 'twothirds',
	8539: 'oneeighth',
	8540: 'threeeighths',
	8541: 'fiveeighths',
	8542: 'seveneighths',
	8544: 'Oneroman',
	8545: 'Tworoman',
	8546: 'Threeroman',
	8547: 'Fourroman',
	8548: 'Fiveroman',
	8549: 'Sixroman',
	8550: 'Sevenroman',
	8551: 'Eightroman',
	8552: 'Nineroman',
	8553: 'Tenroman',
	8554: 'Elevenroman',
	8555: 'Twelveroman',
	8560: 'oneroman',
	8561: 'tworoman',
	8562: 'threeroman',
	8563: 'fourroman',
	8564: 'fiveroman',
	8565: 'sixroman',
	8566: 'sevenroman',
	8567: 'eightroman',
	8568: 'nineroman',
	8569: 'tenroman',
	8570: 'elevenroman',
	8571: 'twelveroman',
	8592: 'arrowleft',
	8593: 'arrowup',
	8594: 'arrowright',
	8595: 'arrowdown',
	8596: 'arrowboth',
	8597: 'arrowupdn',
	8598: 'arrowupleft',
	8599: 'arrowupright',
	8600: 'arrowdownright',
	8601: 'arrowdownleft',
	8616: 'arrowupdnbse',
	8629: 'carriagereturn',
	8636: 'harpoonleftbarbup',
	8640: 'harpoonrightbarbup',
	8644: 'arrowrightoverleft',
	8645: 'arrowupleftofdown',
	8646: 'arrowleftoverright',
	8653: 'arrowleftdblstroke',
	8655: 'arrowrightdblstroke',
	8656: 'arrowdblleft',
	8657: 'arrowdblup',
	8658: 'arrowdblright',
	8659: 'arrowdbldown',
	8660: 'arrowdblboth',
	8670: 'pageup',
	8671: 'pagedown',
	8672: 'arrowdashleft',
	8673: 'arrowdashup',
	8674: 'arrowdashright',
	8675: 'arrowdashdown',
	8676: 'arrowtableft',
	8677: 'arrowtabright',
	8678: 'arrowleftwhite',
	8679: 'arrowupwhite',
	8680: 'arrowrightwhite',
	8681: 'arrowdownwhite',
	8682: 'capslock',
	8704: 'forall',
	8706: 'partialdiff',
	8707: 'existential',
	8709: 'emptyset',
	8710: 'Delta',
	8711: 'nabla',
	8712: 'element',
	8713: 'notelement',
	8715: 'suchthat',
	8716: 'notcontains',
	8719: 'product',
	8721: 'summation',
	8722: 'minus',
	8723: 'minusplus',
	8725: 'divisionslash',
	8727: 'asteriskmath',
	8729: 'bulletoperator',
	8730: 'radical',
	8733: 'proportional',
	8734: 'infinity',
	8735: 'orthogonal',
	8736: 'angle',
	8739: 'divides',
	8741: 'parallel',
	8742: 'notparallel',
	8743: 'logicaland',
	8744: 'logicalor',
	8745: 'intersection',
	8746: 'union',
	8747: 'integral',
	8748: 'dblintegral',
	8750: 'contourintegral',
	8756: 'therefore',
	8757: 'because',
	8758: 'ratio',
	8759: 'proportion',
	8764: 'similar',
	8765: 'reversedtilde',
	8771: 'asymptoticallyequal',
	8773: 'congruent',
	8776: 'approxequal',
	8780: 'allequal',
	8784: 'approaches',
	8785: 'geometricallyequal',
	8786: 'approxequalorimage',
	8787: 'imageorapproximatelyequal',
	8800: 'notequal',
	8801: 'equivalence',
	8802: 'notidentical',
	8804: 'lessequal',
	8805: 'greaterequal',
	8806: 'lessoverequal',
	8807: 'greateroverequal',
	8810: 'muchless',
	8811: 'muchgreater',
	8814: 'notless',
	8815: 'notgreater',
	8816: 'notlessnorequal',
	8817: 'notgreaternorequal',
	8818: 'lessorequivalent',
	8819: 'greaterorequivalent',
	8822: 'lessorgreater',
	8823: 'greaterorless',
	8825: 'notgreaternorless',
	8826: 'precedes',
	8827: 'succeeds',
	8832: 'notprecedes',
	8833: 'notsucceeds',
	8834: 'subset',
	8835: 'superset',
	8836: 'notsubset',
	8837: 'notsuperset',
	8838: 'reflexsubset',
	8839: 'reflexsuperset',
	8842: 'subsetnotequal',
	8843: 'supersetnotequal',
	8853: 'circleplus',
	8854: 'minuscircle',
	8855: 'timescircle',
	8857: 'circleot',
	8867: 'tackleft',
	8868: 'tackdown',
	8869: 'perpendicular',
	8895: 'righttriangle',
	8901: 'dotmath',
	8910: 'curlyor',
	8911: 'curlyand',
	8922: 'lessequalorgreater',
	8923: 'greaterequalorless',
	8942: 'ellipsisvertical',
	8962: 'house',
	8963: 'control',
	8965: 'projective',
	8976: 'revlogicalnot',
	8978: 'arc',
	8984: 'propellor',
	8992: 'integraltp',
	8993: 'integralbt',
	8997: 'option',
	8998: 'deleteright',
	8999: 'clear',
	9001: 'angleleft',
	9002: 'angleright',
	9003: 'deleteleft',
	9251: 'blank',
	9312: 'onecircle',
	9313: 'twocircle',
	9314: 'threecircle',
	9315: 'fourcircle',
	9316: 'fivecircle',
	9317: 'sixcircle',
	9318: 'sevencircle',
	9319: 'eightcircle',
	9320: 'ninecircle',
	9321: 'tencircle',
	9322: 'elevencircle',
	9323: 'twelvecircle',
	9324: 'thirteencircle',
	9325: 'fourteencircle',
	9326: 'fifteencircle',
	9327: 'sixteencircle',
	9328: 'seventeencircle',
	9329: 'eighteencircle',
	9330: 'nineteencircle',
	9331: 'twentycircle',
	9332: 'oneparen',
	9333: 'twoparen',
	9334: 'threeparen',
	9335: 'fourparen',
	9336: 'fiveparen',
	9337: 'sixparen',
	9338: 'sevenparen',
	9339: 'eightparen',
	9340: 'nineparen',
	9341: 'tenparen',
	9342: 'elevenparen',
	9343: 'twelveparen',
	9344: 'thirteenparen',
	9345: 'fourteenparen',
	9346: 'fifteenparen',
	9347: 'sixteenparen',
	9348: 'seventeenparen',
	9349: 'eighteenparen',
	9350: 'nineteenparen',
	9351: 'twentyparen',
	9352: 'oneperiod',
	9353: 'twoperiod',
	9354: 'threeperiod',
	9355: 'fourperiod',
	9356: 'fiveperiod',
	9357: 'sixperiod',
	9358: 'sevenperiod',
	9359: 'eightperiod',
	9360: 'nineperiod',
	9361: 'tenperiod',
	9362: 'elevenperiod',
	9363: 'twelveperiod',
	9364: 'thirteenperiod',
	9365: 'fourteenperiod',
	9366: 'fifteenperiod',
	9367: 'sixteenperiod',
	9368: 'seventeenperiod',
	9369: 'eighteenperiod',
	9370: 'nineteenperiod',
	9371: 'twentyperiod',
	9372: 'aparen',
	9373: 'bparen',
	9374: 'cparen',
	9375: 'dparen',
	9376: 'eparen',
	9377: 'fparen',
	9378: 'gparen',
	9379: 'hparen',
	9380: 'iparen',
	9381: 'jparen',
	9382: 'kparen',
	9383: 'lparen',
	9384: 'mparen',
	9385: 'nparen',
	9386: 'oparen',
	9387: 'pparen',
	9388: 'qparen',
	9389: 'rparen',
	9390: 'sparen',
	9391: 'tparen',
	9392: 'uparen',
	9393: 'vparen',
	9394: 'wparen',
	9395: 'xparen',
	9396: 'yparen',
	9397: 'zparen',
	9398: 'Acircle',
	9399: 'Bcircle',
	9400: 'Ccircle',
	9401: 'Dcircle',
	9402: 'Ecircle',
	9403: 'Fcircle',
	9404: 'Gcircle',
	9405: 'Hcircle',
	9406: 'Icircle',
	9407: 'Jcircle',
	9408: 'Kcircle',
	9409: 'Lcircle',
	9410: 'Mcircle',
	9411: 'Ncircle',
	9412: 'Ocircle',
	9413: 'Pcircle',
	9414: 'Qcircle',
	9415: 'Rcircle',
	9416: 'Scircle',
	9417: 'Tcircle',
	9418: 'Ucircle',
	9419: 'Vcircle',
	9420: 'Wcircle',
	9421: 'Xcircle',
	9422: 'Ycircle',
	9423: 'Zcircle',
	9424: 'acircle',
	9425: 'bcircle',
	9426: 'ccircle',
	9427: 'dcircle',
	9428: 'ecircle',
	9429: 'fcircle',
	9430: 'gcircle',
	9431: 'hcircle',
	9432: 'icircle',
	9433: 'jcircle',
	9434: 'kcircle',
	9435: 'lcircle',
	9436: 'mcircle',
	9437: 'ncircle',
	9438: 'ocircle',
	9439: 'pcircle',
	9440: 'qcircle',
	9441: 'rcircle',
	9442: 'scircle',
	9443: 'tcircle',
	9444: 'ucircle',
	9445: 'vcircle',
	9446: 'wcircle',
	9447: 'xcircle',
	9448: 'ycircle',
	9449: 'zcircle',
	9472: 'SF100000',
	9474: 'SF110000',
	9484: 'SF010000',
	9488: 'SF030000',
	9492: 'SF020000',
	9496: 'SF040000',
	9500: 'SF080000',
	9508: 'SF090000',
	9516: 'SF060000',
	9524: 'SF070000',
	9532: 'SF050000',
	9552: 'SF430000',
	9553: 'SF240000',
	9554: 'SF510000',
	9555: 'SF520000',
	9556: 'SF390000',
	9557: 'SF220000',
	9558: 'SF210000',
	9559: 'SF250000',
	9560: 'SF500000',
	9561: 'SF490000',
	9562: 'SF380000',
	9563: 'SF280000',
	9564: 'SF270000',
	9565: 'SF260000',
	9566: 'SF360000',
	9567: 'SF370000',
	9568: 'SF420000',
	9569: 'SF190000',
	9570: 'SF200000',
	9571: 'SF230000',
	9572: 'SF470000',
	9573: 'SF480000',
	9574: 'SF410000',
	9575: 'SF450000',
	9576: 'SF460000',
	9577: 'SF400000',
	9578: 'SF540000',
	9579: 'SF530000',
	9580: 'SF440000',
	9600: 'upblock',
	9604: 'dnblock',
	9608: 'block',
	9612: 'lfblock',
	9616: 'rtblock',
	9617: 'ltshade',
	9618: 'shade',
	9619: 'dkshade',
	9632: 'filledbox',
	9633: 'whitesquare',
	9635: 'squarewhitewithsmallblack',
	9636: 'squarehorizontalfill',
	9637: 'squareverticalfill',
	9638: 'squareorthogonalcrosshatchfill',
	9639: 'squareupperlefttolowerrightfill',
	9640: 'squareupperrighttolowerleftfill',
	9641: 'squarediagonalcrosshatchfill',
	9642: 'blacksmallsquare',
	9643: 'whitesmallsquare',
	9644: 'filledrect',
	9650: 'triagup',
	9651: 'whiteuppointingtriangle',
	9652: 'blackuppointingsmalltriangle',
	9653: 'whiteuppointingsmalltriangle',
	9654: 'blackrightpointingtriangle',
	9655: 'whiterightpointingtriangle',
	9657: 'whiterightpointingsmalltriangle',
	9658: 'triagrt',
	9660: 'triagdn',
	9661: 'whitedownpointingtriangle',
	9663: 'whitedownpointingsmalltriangle',
	9664: 'blackleftpointingtriangle',
	9665: 'whiteleftpointingtriangle',
	9667: 'whiteleftpointingsmalltriangle',
	9668: 'triaglf',
	9670: 'blackdiamond',
	9671: 'whitediamond',
	9672: 'whitediamondcontainingblacksmalldiamond',
	9673: 'fisheye',
	9674: 'lozenge',
	9675: 'circle',
	9676: 'dottedcircle',
	9678: 'bullseye',
	9679: 'blackcircle',
	9680: 'circlewithlefthalfblack',
	9681: 'circlewithrighthalfblack',
	9687: 'a81',
	9688: 'invbullet',
	9689: 'invcircle',
	9698: 'blacklowerrighttriangle',
	9699: 'blacklowerlefttriangle',
	9700: 'blackupperlefttriangle',
	9701: 'blackupperrighttriangle',
	9702: 'openbullet',
	9711: 'largecircle',
	9733: 'blackstar',
	9734: 'whitestar',
	9742: 'telephoneblack',
	9743: 'whitetelephone',
	9755: 'a11',
	9756: 'pointingindexleftwhite',
	9757: 'pointingindexupwhite',
	9758: 'pointingindexrightwhite',
	9759: 'pointingindexdownwhite',
	9775: 'yinyang',
	9786: 'smileface',
	9787: 'invsmileface',
	9788: 'sun',
	9792: 'venus',
	9793: 'earth',
	9794: 'male',
	9824: 'spade',
	9825: 'heartsuitwhite',
	9826: 'diamondsuitwhite',
	9827: 'club',
	9828: 'spadesuitwhite',
	9829: 'heart',
	9830: 'diamond',
	9831: 'clubsuitwhite',
	9832: 'hotsprings',
	9833: 'quarternote',
	9834: 'musicalnote',
	9835: 'musicalnotedbl',
	9836: 'beamedsixteenthnotes',
	9837: 'musicflatsign',
	9839: 'musicsharpsign',
	9985: 'a1',
	9986: 'a2',
	9987: 'a202',
	9988: 'a3',
	9990: 'a5',
	9991: 'a119',
	9992: 'a118',
	9993: 'a117',
	9996: 'a13',
	9997: 'a14',
	9998: 'a15',
	9999: 'a16',
	10000: 'a105',
	10001: 'a17',
	10002: 'a18',
	10003: 'checkmark',
	10004: 'a20',
	10005: 'a21',
	10006: 'a22',
	10007: 'a23',
	10008: 'a24',
	10009: 'a25',
	10010: 'a26',
	10011: 'a27',
	10012: 'a28',
	10013: 'a6',
	10014: 'a7',
	10015: 'a8',
	10016: 'a9',
	10017: 'a10',
	10018: 'a29',
	10019: 'a30',
	10020: 'a31',
	10021: 'a32',
	10022: 'a33',
	10023: 'a34',
	10025: 'a36',
	10026: 'a37',
	10027: 'a38',
	10028: 'a39',
	10029: 'a40',
	10030: 'a41',
	10031: 'a42',
	10032: 'a43',
	10033: 'a44',
	10034: 'a45',
	10035: 'a46',
	10036: 'a47',
	10037: 'a48',
	10038: 'a49',
	10039: 'a50',
	10040: 'a51',
	10041: 'a52',
	10042: 'a53',
	10043: 'a54',
	10044: 'a55',
	10045: 'a56',
	10046: 'a57',
	10047: 'a58',
	10048: 'a59',
	10049: 'a60',
	10050: 'a61',
	10051: 'a62',
	10052: 'a63',
	10053: 'a64',
	10054: 'a65',
	10055: 'a66',
	10056: 'a67',
	10057: 'a68',
	10058: 'a69',
	10059: 'a70',
	10061: 'a72',
	10063: 'a74',
	10064: 'a203',
	10065: 'a75',
	10066: 'a204',
	10070: 'a79',
	10072: 'a82',
	10073: 'a83',
	10074: 'a84',
	10075: 'a97',
	10076: 'a98',
	10077: 'a99',
	10078: 'a100',
	10081: 'a101',
	10082: 'a102',
	10083: 'a103',
	10084: 'a104',
	10085: 'a106',
	10086: 'a107',
	10087: 'a108',
	10088: 'a89',
	10089: 'a90',
	10090: 'a93',
	10091: 'a94',
	10092: 'a91',
	10093: 'a92',
	10094: 'a205',
	10095: 'a85',
	10096: 'a206',
	10097: 'a86',
	10098: 'a87',
	10099: 'a88',
	10100: 'a95',
	10101: 'a96',
	10102: 'a130',
	10103: 'a131',
	10104: 'a132',
	10105: 'a133',
	10106: 'a134',
	10107: 'a135',
	10108: 'a136',
	10109: 'a137',
	10110: 'a138',
	10111: 'a139',
	10112: 'a140',
	10113: 'a141',
	10114: 'a142',
	10115: 'a143',
	10116: 'a144',
	10117: 'a145',
	10118: 'a146',
	10119: 'a147',
	10120: 'a148',
	10121: 'a149',
	10122: 'onecircleinversesansserif',
	10123: 'twocircleinversesansserif',
	10124: 'threecircleinversesansserif',
	10125: 'fourcircleinversesansserif',
	10126: 'fivecircleinversesansserif',
	10127: 'sixcircleinversesansserif',
	10128: 'sevencircleinversesansserif',
	10129: 'eightcircleinversesansserif',
	10130: 'ninecircleinversesansserif',
	10131: 'a159',
	10132: 'a160',
	10136: 'a196',
	10137: 'a165',
	10138: 'a192',
	10139: 'a166',
	10140: 'a167',
	10141: 'a168',
	10142: 'arrowrightheavy',
	10143: 'a170',
	10144: 'a171',
	10145: 'a172',
	10146: 'a173',
	10147: 'a162',
	10148: 'a174',
	10149: 'a175',
	10150: 'a176',
	10151: 'a177',
	10152: 'a178',
	10153: 'a179',
	10154: 'a193',
	10155: 'a180',
	10156: 'a199',
	10157: 'a181',
	10158: 'a200',
	10159: 'a182',
	10161: 'a201',
	10162: 'a183',
	10163: 'a184',
	10164: 'a197',
	10165: 'a185',
	10166: 'a194',
	10167: 'a198',
	10168: 'a186',
	10169: 'a195',
	10170: 'a187',
	10171: 'a188',
	10172: 'a189',
	10173: 'a190',
	10174: 'a191',
	12288: 'ideographicspace',
	12289: 'ideographiccomma',
	12290: 'ideographicperiod',
	12291: 'dittomark',
	12292: 'jis',
	12293: 'ideographiciterationmark',
	12294: 'ideographicclose',
	12295: 'ideographiczero',
	12296: 'anglebracketleft',
	12297: 'anglebracketright',
	12298: 'dblanglebracketleft',
	12299: 'dblanglebracketright',
	12300: 'cornerbracketleft',
	12301: 'cornerbracketright',
	12302: 'whitecornerbracketleft',
	12303: 'whitecornerbracketright',
	12304: 'blacklenticularbracketleft',
	12305: 'blacklenticularbracketright',
	12306: 'postalmark',
	12307: 'getamark',
	12308: 'tortoiseshellbracketleft',
	12309: 'tortoiseshellbracketright',
	12310: 'whitelenticularbracketleft',
	12311: 'whitelenticularbracketright',
	12312: 'whitetortoiseshellbracketleft',
	12313: 'whitetortoiseshellbracketright',
	12316: 'wavedash',
	12317: 'quotedblprimereversed',
	12318: 'quotedblprime',
	12320: 'postalmarkface',
	12321: 'onehangzhou',
	12322: 'twohangzhou',
	12323: 'threehangzhou',
	12324: 'fourhangzhou',
	12325: 'fivehangzhou',
	12326: 'sixhangzhou',
	12327: 'sevenhangzhou',
	12328: 'eighthangzhou',
	12329: 'ninehangzhou',
	12342: 'circlepostalmark',
	12353: 'asmallhiragana',
	12354: 'ahiragana',
	12355: 'ismallhiragana',
	12356: 'ihiragana',
	12357: 'usmallhiragana',
	12358: 'uhiragana',
	12359: 'esmallhiragana',
	12360: 'ehiragana',
	12361: 'osmallhiragana',
	12362: 'ohiragana',
	12363: 'kahiragana',
	12364: 'gahiragana',
	12365: 'kihiragana',
	12366: 'gihiragana',
	12367: 'kuhiragana',
	12368: 'guhiragana',
	12369: 'kehiragana',
	12370: 'gehiragana',
	12371: 'kohiragana',
	12372: 'gohiragana',
	12373: 'sahiragana',
	12374: 'zahiragana',
	12375: 'sihiragana',
	12376: 'zihiragana',
	12377: 'suhiragana',
	12378: 'zuhiragana',
	12379: 'sehiragana',
	12380: 'zehiragana',
	12381: 'sohiragana',
	12382: 'zohiragana',
	12383: 'tahiragana',
	12384: 'dahiragana',
	12385: 'tihiragana',
	12386: 'dihiragana',
	12387: 'tusmallhiragana',
	12388: 'tuhiragana',
	12389: 'duhiragana',
	12390: 'tehiragana',
	12391: 'dehiragana',
	12392: 'tohiragana',
	12393: 'dohiragana',
	12394: 'nahiragana',
	12395: 'nihiragana',
	12396: 'nuhiragana',
	12397: 'nehiragana',
	12398: 'nohiragana',
	12399: 'hahiragana',
	12400: 'bahiragana',
	12401: 'pahiragana',
	12402: 'hihiragana',
	12403: 'bihiragana',
	12404: 'pihiragana',
	12405: 'huhiragana',
	12406: 'buhiragana',
	12407: 'puhiragana',
	12408: 'hehiragana',
	12409: 'behiragana',
	12410: 'pehiragana',
	12411: 'hohiragana',
	12412: 'bohiragana',
	12413: 'pohiragana',
	12414: 'mahiragana',
	12415: 'mihiragana',
	12416: 'muhiragana',
	12417: 'mehiragana',
	12418: 'mohiragana',
	12419: 'yasmallhiragana',
	12420: 'yahiragana',
	12421: 'yusmallhiragana',
	12422: 'yuhiragana',
	12423: 'yosmallhiragana',
	12424: 'yohiragana',
	12425: 'rahiragana',
	12426: 'rihiragana',
	12427: 'ruhiragana',
	12428: 'rehiragana',
	12429: 'rohiragana',
	12430: 'wasmallhiragana',
	12431: 'wahiragana',
	12432: 'wihiragana',
	12433: 'wehiragana',
	12434: 'wohiragana',
	12435: 'nhiragana',
	12436: 'vuhiragana',
	12443: 'voicedmarkkana',
	12444: 'semivoicedmarkkana',
	12445: 'iterationhiragana',
	12446: 'voicediterationhiragana',
	12449: 'asmallkatakana',
	12450: 'akatakana',
	12451: 'ismallkatakana',
	12452: 'ikatakana',
	12453: 'usmallkatakana',
	12454: 'ukatakana',
	12455: 'esmallkatakana',
	12456: 'ekatakana',
	12457: 'osmallkatakana',
	12458: 'okatakana',
	12459: 'kakatakana',
	12460: 'gakatakana',
	12461: 'kikatakana',
	12462: 'gikatakana',
	12463: 'kukatakana',
	12464: 'gukatakana',
	12465: 'kekatakana',
	12466: 'gekatakana',
	12467: 'kokatakana',
	12468: 'gokatakana',
	12469: 'sakatakana',
	12470: 'zakatakana',
	12471: 'sikatakana',
	12472: 'zikatakana',
	12473: 'sukatakana',
	12474: 'zukatakana',
	12475: 'sekatakana',
	12476: 'zekatakana',
	12477: 'sokatakana',
	12478: 'zokatakana',
	12479: 'takatakana',
	12480: 'dakatakana',
	12481: 'tikatakana',
	12482: 'dikatakana',
	12483: 'tusmallkatakana',
	12484: 'tukatakana',
	12485: 'dukatakana',
	12486: 'tekatakana',
	12487: 'dekatakana',
	12488: 'tokatakana',
	12489: 'dokatakana',
	12490: 'nakatakana',
	12491: 'nikatakana',
	12492: 'nukatakana',
	12493: 'nekatakana',
	12494: 'nokatakana',
	12495: 'hakatakana',
	12496: 'bakatakana',
	12497: 'pakatakana',
	12498: 'hikatakana',
	12499: 'bikatakana',
	12500: 'pikatakana',
	12501: 'hukatakana',
	12502: 'bukatakana',
	12503: 'pukatakana',
	12504: 'hekatakana',
	12505: 'bekatakana',
	12506: 'pekatakana',
	12507: 'hokatakana',
	12508: 'bokatakana',
	12509: 'pokatakana',
	12510: 'makatakana',
	12511: 'mikatakana',
	12512: 'mukatakana',
	12513: 'mekatakana',
	12514: 'mokatakana',
	12515: 'yasmallkatakana',
	12516: 'yakatakana',
	12517: 'yusmallkatakana',
	12518: 'yukatakana',
	12519: 'yosmallkatakana',
	12520: 'yokatakana',
	12521: 'rakatakana',
	12522: 'rikatakana',
	12523: 'rukatakana',
	12524: 'rekatakana',
	12525: 'rokatakana',
	12526: 'wasmallkatakana',
	12527: 'wakatakana',
	12528: 'wikatakana',
	12529: 'wekatakana',
	12530: 'wokatakana',
	12531: 'nkatakana',
	12532: 'vukatakana',
	12533: 'kasmallkatakana',
	12534: 'kesmallkatakana',
	12535: 'vakatakana',
	12536: 'vikatakana',
	12537: 'vekatakana',
	12538: 'vokatakana',
	12539: 'dotkatakana',
	12540: 'prolongedkana',
	12541: 'iterationkatakana',
	12542: 'voicediterationkatakana',
	12549: 'bbopomofo',
	12550: 'pbopomofo',
	12551: 'mbopomofo',
	12552: 'fbopomofo',
	12553: 'dbopomofo',
	12554: 'tbopomofo',
	12555: 'nbopomofo',
	12556: 'lbopomofo',
	12557: 'gbopomofo',
	12558: 'kbopomofo',
	12559: 'hbopomofo',
	12560: 'jbopomofo',
	12561: 'qbopomofo',
	12562: 'xbopomofo',
	12563: 'zhbopomofo',
	12564: 'chbopomofo',
	12565: 'shbopomofo',
	12566: 'rbopomofo',
	12567: 'zbopomofo',
	12568: 'cbopomofo',
	12569: 'sbopomofo',
	12570: 'abopomofo',
	12571: 'obopomofo',
	12572: 'ebopomofo',
	12573: 'ehbopomofo',
	12574: 'aibopomofo',
	12575: 'eibopomofo',
	12576: 'aubopomofo',
	12577: 'oubopomofo',
	12578: 'anbopomofo',
	12579: 'enbopomofo',
	12580: 'angbopomofo',
	12581: 'engbopomofo',
	12582: 'erbopomofo',
	12583: 'ibopomofo',
	12584: 'ubopomofo',
	12585: 'iubopomofo',
	12593: 'kiyeokkorean',
	12594: 'ssangkiyeokkorean',
	12595: 'kiyeoksioskorean',
	12596: 'nieunkorean',
	12597: 'nieuncieuckorean',
	12598: 'nieunhieuhkorean',
	12599: 'tikeutkorean',
	12600: 'ssangtikeutkorean',
	12601: 'rieulkorean',
	12602: 'rieulkiyeokkorean',
	12603: 'rieulmieumkorean',
	12604: 'rieulpieupkorean',
	12605: 'rieulsioskorean',
	12606: 'rieulthieuthkorean',
	12607: 'rieulphieuphkorean',
	12608: 'rieulhieuhkorean',
	12609: 'mieumkorean',
	12610: 'pieupkorean',
	12611: 'ssangpieupkorean',
	12612: 'pieupsioskorean',
	12613: 'sioskorean',
	12614: 'ssangsioskorean',
	12615: 'ieungkorean',
	12616: 'cieuckorean',
	12617: 'ssangcieuckorean',
	12618: 'chieuchkorean',
	12619: 'khieukhkorean',
	12620: 'thieuthkorean',
	12621: 'phieuphkorean',
	12622: 'hieuhkorean',
	12623: 'akorean',
	12624: 'aekorean',
	12625: 'yakorean',
	12626: 'yaekorean',
	12627: 'eokorean',
	12628: 'ekorean',
	12629: 'yeokorean',
	12630: 'yekorean',
	12631: 'okorean',
	12632: 'wakorean',
	12633: 'waekorean',
	12634: 'oekorean',
	12635: 'yokorean',
	12636: 'ukorean',
	12637: 'weokorean',
	12638: 'wekorean',
	12639: 'wikorean',
	12640: 'yukorean',
	12641: 'eukorean',
	12642: 'yikorean',
	12643: 'ikorean',
	12644: 'hangulfiller',
	12645: 'ssangnieunkorean',
	12646: 'nieuntikeutkorean',
	12647: 'nieunsioskorean',
	12648: 'nieunpansioskorean',
	12649: 'rieulkiyeoksioskorean',
	12650: 'rieultikeutkorean',
	12651: 'rieulpieupsioskorean',
	12652: 'rieulpansioskorean',
	12653: 'rieulyeorinhieuhkorean',
	12654: 'mieumpieupkorean',
	12655: 'mieumsioskorean',
	12656: 'mieumpansioskorean',
	12657: 'kapyeounmieumkorean',
	12658: 'pieupkiyeokkorean',
	12659: 'pieuptikeutkorean',
	12660: 'pieupsioskiyeokkorean',
	12661: 'pieupsiostikeutkorean',
	12662: 'pieupcieuckorean',
	12663: 'pieupthieuthkorean',
	12664: 'kapyeounpieupkorean',
	12665: 'kapyeounssangpieupkorean',
	12666: 'sioskiyeokkorean',
	12667: 'siosnieunkorean',
	12668: 'siostikeutkorean',
	12669: 'siospieupkorean',
	12670: 'sioscieuckorean',
	12671: 'pansioskorean',
	12672: 'ssangieungkorean',
	12673: 'yesieungkorean',
	12674: 'yesieungsioskorean',
	12675: 'yesieungpansioskorean',
	12676: 'kapyeounphieuphkorean',
	12677: 'ssanghieuhkorean',
	12678: 'yeorinhieuhkorean',
	12679: 'yoyakorean',
	12680: 'yoyaekorean',
	12681: 'yoikorean',
	12682: 'yuyeokorean',
	12683: 'yuyekorean',
	12684: 'yuikorean',
	12685: 'araeakorean',
	12686: 'araeaekorean',
	12800: 'kiyeokparenkorean',
	12801: 'nieunparenkorean',
	12802: 'tikeutparenkorean',
	12803: 'rieulparenkorean',
	12804: 'mieumparenkorean',
	12805: 'pieupparenkorean',
	12806: 'siosparenkorean',
	12807: 'ieungparenkorean',
	12808: 'cieucparenkorean',
	12809: 'chieuchparenkorean',
	12810: 'khieukhparenkorean',
	12811: 'thieuthparenkorean',
	12812: 'phieuphparenkorean',
	12813: 'hieuhparenkorean',
	12814: 'kiyeokaparenkorean',
	12815: 'nieunaparenkorean',
	12816: 'tikeutaparenkorean',
	12817: 'rieulaparenkorean',
	12818: 'mieumaparenkorean',
	12819: 'pieupaparenkorean',
	12820: 'siosaparenkorean',
	12821: 'ieungaparenkorean',
	12822: 'cieucaparenkorean',
	12823: 'chieuchaparenkorean',
	12824: 'khieukhaparenkorean',
	12825: 'thieuthaparenkorean',
	12826: 'phieuphaparenkorean',
	12827: 'hieuhaparenkorean',
	12828: 'cieucuparenkorean',
	12832: 'oneideographicparen',
	12833: 'twoideographicparen',
	12834: 'threeideographicparen',
	12835: 'fourideographicparen',
	12836: 'fiveideographicparen',
	12837: 'sixideographicparen',
	12838: 'sevenideographicparen',
	12839: 'eightideographicparen',
	12840: 'nineideographicparen',
	12841: 'tenideographicparen',
	12842: 'ideographicmoonparen',
	12843: 'ideographicfireparen',
	12844: 'ideographicwaterparen',
	12845: 'ideographicwoodparen',
	12846: 'ideographicmetalparen',
	12847: 'ideographicearthparen',
	12848: 'ideographicsunparen',
	12849: 'ideographicstockparen',
	12850: 'ideographichaveparen',
	12851: 'ideographicsocietyparen',
	12852: 'ideographicnameparen',
	12853: 'ideographicspecialparen',
	12854: 'ideographicfinancialparen',
	12855: 'ideographiccongratulationparen',
	12856: 'ideographiclaborparen',
	12857: 'ideographicrepresentparen',
	12858: 'ideographiccallparen',
	12859: 'ideographicstudyparen',
	12860: 'ideographicsuperviseparen',
	12861: 'ideographicenterpriseparen',
	12862: 'ideographicresourceparen',
	12863: 'ideographicallianceparen',
	12864: 'ideographicfestivalparen',
	12866: 'ideographicselfparen',
	12867: 'ideographicreachparen',
	12896: 'kiyeokcirclekorean',
	12897: 'nieuncirclekorean',
	12898: 'tikeutcirclekorean',
	12899: 'rieulcirclekorean',
	12900: 'mieumcirclekorean',
	12901: 'pieupcirclekorean',
	12902: 'sioscirclekorean',
	12903: 'ieungcirclekorean',
	12904: 'cieuccirclekorean',
	12905: 'chieuchcirclekorean',
	12906: 'khieukhcirclekorean',
	12907: 'thieuthcirclekorean',
	12908: 'phieuphcirclekorean',
	12909: 'hieuhcirclekorean',
	12910: 'kiyeokacirclekorean',
	12911: 'nieunacirclekorean',
	12912: 'tikeutacirclekorean',
	12913: 'rieulacirclekorean',
	12914: 'mieumacirclekorean',
	12915: 'pieupacirclekorean',
	12916: 'siosacirclekorean',
	12917: 'ieungacirclekorean',
	12918: 'cieucacirclekorean',
	12919: 'chieuchacirclekorean',
	12920: 'khieukhacirclekorean',
	12921: 'thieuthacirclekorean',
	12922: 'phieuphacirclekorean',
	12923: 'hieuhacirclekorean',
	12927: 'koreanstandardsymbol',
	12938: 'ideographmooncircle',
	12939: 'ideographfirecircle',
	12940: 'ideographwatercircle',
	12941: 'ideographwoodcircle',
	12942: 'ideographmetalcircle',
	12943: 'ideographearthcircle',
	12944: 'ideographsuncircle',
	12948: 'ideographnamecircle',
	12950: 'ideographicfinancialcircle',
	12952: 'ideographiclaborcircle',
	12953: 'ideographicsecretcircle',
	12957: 'ideographicexcellentcircle',
	12958: 'ideographicprintcircle',
	12963: 'ideographiccorrectcircle',
	12964: 'ideographichighcircle',
	12965: 'ideographiccentrecircle',
	12966: 'ideographiclowcircle',
	12967: 'ideographicleftcircle',
	12968: 'ideographicrightcircle',
	12969: 'ideographicmedicinecircle',
	13056: 'apaatosquare',
	13059: 'aarusquare',
	13061: 'intisquare',
	13069: 'karoriisquare',
	13076: 'kirosquare',
	13077: 'kiroguramusquare',
	13078: 'kiromeetorusquare',
	13080: 'guramusquare',
	13086: 'kooposquare',
	13090: 'sentisquare',
	13091: 'sentosquare',
	13094: 'dorusquare',
	13095: 'tonsquare',
	13098: 'haitusquare',
	13099: 'paasentosquare',
	13105: 'birusquare',
	13107: 'huiitosquare',
	13110: 'hekutaarusquare',
	13113: 'herutusquare',
	13115: 'peezisquare',
	13122: 'hoonsquare',
	13127: 'mansyonsquare',
	13129: 'mirisquare',
	13130: 'miribaarusquare',
	13133: 'meetorusquare',
	13134: 'yaadosquare',
	13137: 'rittorusquare',
	13143: 'wattosquare',
	13179: 'heiseierasquare',
	13180: 'syouwaerasquare',
	13181: 'taisyouerasquare',
	13182: 'meizierasquare',
	13183: 'corporationsquare',
	13184: 'paampssquare',
	13185: 'nasquare',
	13186: 'muasquare',
	13187: 'masquare',
	13188: 'kasquare',
	13189: 'KBsquare',
	13190: 'MBsquare',
	13191: 'GBsquare',
	13192: 'calsquare',
	13193: 'kcalsquare',
	13194: 'pfsquare',
	13195: 'nfsquare',
	13196: 'mufsquare',
	13197: 'mugsquare',
	13198: 'squaremg',
	13199: 'squarekg',
	13200: 'Hzsquare',
	13201: 'khzsquare',
	13202: 'mhzsquare',
	13203: 'ghzsquare',
	13204: 'thzsquare',
	13205: 'mulsquare',
	13206: 'mlsquare',
	13207: 'dlsquare',
	13208: 'klsquare',
	13209: 'fmsquare',
	13210: 'nmsquare',
	13211: 'mumsquare',
	13212: 'squaremm',
	13213: 'squarecm',
	13214: 'squarekm',
	13215: 'mmsquaredsquare',
	13216: 'cmsquaredsquare',
	13217: 'squaremsquared',
	13218: 'kmsquaredsquare',
	13219: 'mmcubedsquare',
	13220: 'cmcubedsquare',
	13221: 'mcubedsquare',
	13222: 'kmcubedsquare',
	13223: 'moverssquare',
	13224: 'moverssquaredsquare',
	13225: 'pasquare',
	13226: 'kpasquare',
	13227: 'mpasquare',
	13228: 'gpasquare',
	13229: 'radsquare',
	13230: 'radoverssquare',
	13231: 'radoverssquaredsquare',
	13232: 'pssquare',
	13233: 'nssquare',
	13234: 'mussquare',
	13235: 'mssquare',
	13236: 'pvsquare',
	13237: 'nvsquare',
	13238: 'muvsquare',
	13239: 'mvsquare',
	13240: 'kvsquare',
	13241: 'mvmegasquare',
	13242: 'pwsquare',
	13243: 'nwsquare',
	13244: 'muwsquare',
	13245: 'mwsquare',
	13246: 'kwsquare',
	13247: 'mwmegasquare',
	13248: 'kohmsquare',
	13249: 'mohmsquare',
	13250: 'amsquare',
	13251: 'bqsquare',
	13252: 'squarecc',
	13253: 'cdsquare',
	13254: 'coverkgsquare',
	13255: 'cosquare',
	13256: 'dbsquare',
	13257: 'gysquare',
	13258: 'hasquare',
	13259: 'HPsquare',
	13261: 'KKsquare',
	13262: 'squarekmcapital',
	13263: 'ktsquare',
	13264: 'lmsquare',
	13265: 'squareln',
	13266: 'squarelog',
	13267: 'lxsquare',
	13268: 'mbsquare',
	13269: 'squaremil',
	13270: 'molsquare',
	13272: 'pmsquare',
	13275: 'srsquare',
	13276: 'svsquare',
	13277: 'wbsquare',
	21316: 'twentyhangzhou',
	63166: 'dotlessj',
	63167: 'LL',
	63168: 'll',
	63171: 'commaaccent',
	63172: 'afii10063',
	63173: 'afii10064',
	63174: 'afii10192',
	63175: 'afii10831',
	63176: 'afii10832',
	63177: 'Acute',
	63178: 'Caron',
	63179: 'Dieresis',
	63180: 'DieresisAcute',
	63181: 'DieresisGrave',
	63182: 'Grave',
	63183: 'Hungarumlaut',
	63184: 'Macron',
	63185: 'cyrBreve',
	63186: 'cyrFlex',
	63187: 'dblGrave',
	63188: 'cyrbreve',
	63189: 'cyrflex',
	63190: 'dblgrave',
	63191: 'dieresisacute',
	63192: 'dieresisgrave',
	63193: 'copyrightserif',
	63194: 'registerserif',
	63195: 'trademarkserif',
	63196: 'onefitted',
	63197: 'rupiah',
	63198: 'threequartersemdash',
	63199: 'centinferior',
	63200: 'centsuperior',
	63201: 'commainferior',
	63202: 'commasuperior',
	63203: 'dollarinferior',
	63204: 'dollarsuperior',
	63205: 'hypheninferior',
	63206: 'hyphensuperior',
	63207: 'periodinferior',
	63208: 'periodsuperior',
	63209: 'asuperior',
	63210: 'bsuperior',
	63211: 'dsuperior',
	63212: 'esuperior',
	63213: 'isuperior',
	63214: 'lsuperior',
	63215: 'msuperior',
	63216: 'osuperior',
	63217: 'rsuperior',
	63218: 'ssuperior',
	63219: 'tsuperior',
	63220: 'Brevesmall',
	63221: 'Caronsmall',
	63222: 'Circumflexsmall',
	63223: 'Dotaccentsmall',
	63224: 'Hungarumlautsmall',
	63225: 'Lslashsmall',
	63226: 'OEsmall',
	63227: 'Ogoneksmall',
	63228: 'Ringsmall',
	63229: 'Scaronsmall',
	63230: 'Tildesmall',
	63231: 'Zcaronsmall',
	63265: 'exclamsmall',
	63268: 'dollaroldstyle',
	63270: 'ampersandsmall',
	63280: 'zerooldstyle',
	63281: 'oneoldstyle',
	63282: 'twooldstyle',
	63283: 'threeoldstyle',
	63284: 'fouroldstyle',
	63285: 'fiveoldstyle',
	63286: 'sixoldstyle',
	63287: 'sevenoldstyle',
	63288: 'eightoldstyle',
	63289: 'nineoldstyle',
	63295: 'questionsmall',
	63328: 'Gravesmall',
	63329: 'Asmall',
	63330: 'Bsmall',
	63331: 'Csmall',
	63332: 'Dsmall',
	63333: 'Esmall',
	63334: 'Fsmall',
	63335: 'Gsmall',
	63336: 'Hsmall',
	63337: 'Ismall',
	63338: 'Jsmall',
	63339: 'Ksmall',
	63340: 'Lsmall',
	63341: 'Msmall',
	63342: 'Nsmall',
	63343: 'Osmall',
	63344: 'Psmall',
	63345: 'Qsmall',
	63346: 'Rsmall',
	63347: 'Ssmall',
	63348: 'Tsmall',
	63349: 'Usmall',
	63350: 'Vsmall',
	63351: 'Wsmall',
	63352: 'Xsmall',
	63353: 'Ysmall',
	63354: 'Zsmall',
	63393: 'exclamdownsmall',
	63394: 'centoldstyle',
	63400: 'Dieresissmall',
	63407: 'Macronsmall',
	63412: 'Acutesmall',
	63416: 'Cedillasmall',
	63423: 'questiondownsmall',
	63456: 'Agravesmall',
	63457: 'Aacutesmall',
	63458: 'Acircumflexsmall',
	63459: 'Atildesmall',
	63460: 'Adieresissmall',
	63461: 'Aringsmall',
	63462: 'AEsmall',
	63463: 'Ccedillasmall',
	63464: 'Egravesmall',
	63465: 'Eacutesmall',
	63466: 'Ecircumflexsmall',
	63467: 'Edieresissmall',
	63468: 'Igravesmall',
	63469: 'Iacutesmall',
	63470: 'Icircumflexsmall',
	63471: 'Idieresissmall',
	63472: 'Ethsmall',
	63473: 'Ntildesmall',
	63474: 'Ogravesmall',
	63475: 'Oacutesmall',
	63476: 'Ocircumflexsmall',
	63477: 'Otildesmall',
	63478: 'Odieresissmall',
	63480: 'Oslashsmall',
	63481: 'Ugravesmall',
	63482: 'Uacutesmall',
	63483: 'Ucircumflexsmall',
	63484: 'Udieresissmall',
	63485: 'Yacutesmall',
	63486: 'Thornsmall',
	63487: 'Ydieresissmall',
	63620: 'maihanakatleftthai',
	63621: 'saraileftthai',
	63622: 'saraiileftthai',
	63623: 'saraueleftthai',
	63624: 'saraueeleftthai',
	63625: 'maitaikhuleftthai',
	63626: 'maiekupperleftthai',
	63627: 'maieklowrightthai',
	63628: 'maieklowleftthai',
	63629: 'maithoupperleftthai',
	63630: 'maitholowrightthai',
	63631: 'maitholowleftthai',
	63632: 'maitriupperleftthai',
	63633: 'maitrilowrightthai',
	63634: 'maitrilowleftthai',
	63635: 'maichattawaupperleftthai',
	63636: 'maichattawalowrightthai',
	63637: 'maichattawalowleftthai',
	63638: 'thanthakhatupperleftthai',
	63639: 'thanthakhatlowrightthai',
	63640: 'thanthakhatlowleftthai',
	63641: 'nikhahitleftthai',
	63717: 'radicalex',
	63718: 'arrowvertex',
	63719: 'arrowhorizex',
	63720: 'registersans',
	63721: 'copyrightsans',
	63722: 'trademarksans',
	63723: 'parenlefttp',
	63724: 'parenleftex',
	63725: 'parenleftbt',
	63726: 'bracketlefttp',
	63727: 'bracketleftex',
	63728: 'bracketleftbt',
	63729: 'bracelefttp',
	63730: 'braceleftmid',
	63731: 'braceleftbt',
	63732: 'braceex',
	63733: 'integralex',
	63734: 'parenrighttp',
	63735: 'parenrightex',
	63736: 'parenrightbt',
	63737: 'bracketrighttp',
	63738: 'bracketrightex',
	63739: 'bracketrightbt',
	63740: 'bracerighttp',
	63741: 'bracerightmid',
	63742: 'bracerightbt',
	63743: 'apple',
	64256: 'ff',
	64257: 'fi',
	64258: 'fl',
	64259: 'ffi',
	64260: 'ffl',
	64287: 'doubleyodpatah',
	64288: 'ayinaltonehebrew',
	64298: 'shinshindot',
	64299: 'shinsindot',
	64300: 'shindageshshindot',
	64301: 'shindageshsindot',
	64302: 'alefpatahhebrew',
	64303: 'alefqamatshebrew',
	64304: 'alefdageshhebrew',
	64305: 'betdagesh',
	64306: 'gimeldagesh',
	64307: 'daletdagesh',
	64308: 'hedagesh',
	64309: 'vavdagesh',
	64310: 'zayindagesh',
	64312: 'tetdagesh',
	64313: 'yoddagesh',
	64314: 'finalkafdagesh',
	64315: 'kafdagesh',
	64316: 'lameddagesh',
	64318: 'memdagesh',
	64320: 'nundagesh',
	64321: 'samekhdagesh',
	64323: 'pefinaldageshhebrew',
	64324: 'pedagesh',
	64326: 'tsadidagesh',
	64327: 'qofdagesh',
	64328: 'reshdageshhebrew',
	64329: 'shindagesh',
	64330: 'tavdages',
	64331: 'vavholam',
	64332: 'betrafehebrew',
	64333: 'kafrafehebrew',
	64334: 'perafehebrew',
	64335: 'aleflamedhebrew',
	64343: 'pehfinalarabic',
	64344: 'pehinitialarabic',
	64345: 'pehmedialarabic',
	64359: 'ttehfinalarabic',
	64360: 'ttehinitialarabic',
	64361: 'ttehmedialarabic',
	64363: 'vehfinalarabic',
	64364: 'vehinitialarabic',
	64365: 'vehmedialarabic',
	64379: 'tchehfinalarabic',
	64380: 'tchehinitialarabic',
	64381: 'tchehmedialarabic',
	64393: 'ddalfinalarabic',
	64395: 'jehfinalarabic',
	64397: 'rrehfinalarabic',
	64403: 'gaffinalarabic',
	64404: 'gafinitialarabic',
	64405: 'gafmedialarabic',
	64415: 'noonghunnafinalarabic',
	64420: 'hehhamzaaboveisolatedarabic',
	64421: 'hehhamzaabovefinalarabic',
	64423: 'hehfinalaltonearabic',
	64424: 'hehinitialaltonearabic',
	64425: 'hehmedialaltonearabic',
	64431: 'yehbarreefinalarabic',
	64520: 'behmeemisolatedarabic',
	64523: 'tehjeemisolatedarabic',
	64524: 'tehhahisolatedarabic',
	64526: 'tehmeemisolatedarabic',
	64584: 'meemmeemisolatedarabic',
	64587: 'noonjeemisolatedarabic',
	64590: 'noonmeemisolatedarabic',
	64600: 'yehmeemisolatedarabic',
	64606: 'shaddadammatanarabic',
	64607: 'shaddakasratanarabic',
	64608: 'shaddafathaarabic',
	64609: 'shaddadammaarabic',
	64610: 'shaddakasraarabic',
	64621: 'behnoonfinalarabic',
	64627: 'tehnoonfinalarabic',
	64653: 'noonnoonfinalarabic',
	64660: 'yehnoonfinalarabic',
	64671: 'behmeeminitialarabic',
	64673: 'tehjeeminitialarabic',
	64674: 'tehhahinitialarabic',
	64676: 'tehmeeminitialarabic',
	64713: 'lamjeeminitialarabic',
	64714: 'lamhahinitialarabic',
	64715: 'lamkhahinitialarabic',
	64716: 'lammeeminitialarabic',
	64721: 'meemmeeminitialarabic',
	64722: 'noonjeeminitialarabic',
	64725: 'noonmeeminitialarabic',
	64733: 'yehmeeminitialarabic',
	64830: 'parenleftaltonearabic',
	64831: 'parenrightaltonearabic',
	64904: 'lammeemhahinitialarabic',
	65010: 'lamlamhehisolatedarabic',
	65018: 'sallallahoualayhewasallamarabic',
	65072: 'twodotleadervertical',
	65073: 'emdashvertical',
	65074: 'endashvertical',
	65075: 'underscorevertical',
	65076: 'wavyunderscorevertical',
	65077: 'parenleftvertical',
	65078: 'parenrightvertical',
	65079: 'braceleftvertical',
	65080: 'bracerightvertical',
	65081: 'tortoiseshellbracketleftvertical',
	65082: 'tortoiseshellbracketrightvertical',
	65083: 'blacklenticularbracketleftvertical',
	65084: 'blacklenticularbracketrightvertical',
	65085: 'dblanglebracketleftvertical',
	65086: 'dblanglebracketrightvertical',
	65087: 'anglebracketleftvertical',
	65088: 'anglebracketrightvertical',
	65089: 'cornerbracketleftvertical',
	65090: 'cornerbracketrightvertical',
	65091: 'whitecornerbracketleftvertical',
	65092: 'whitecornerbracketrightvertical',
	65097: 'overlinedashed',
	65098: 'overlinecenterline',
	65099: 'overlinewavy',
	65100: 'overlinedblwavy',
	65101: 'lowlinedashed',
	65102: 'lowlinecenterline',
	65103: 'underscorewavy',
	65104: 'commasmall',
	65106: 'periodsmall',
	65108: 'semicolonsmall',
	65109: 'colonsmall',
	65113: 'parenleftsmall',
	65114: 'parenrightsmall',
	65115: 'braceleftsmall',
	65116: 'bracerightsmall',
	65117: 'tortoiseshellbracketleftsmall',
	65118: 'tortoiseshellbracketrightsmall',
	65119: 'numbersignsmall',
	65121: 'asterisksmall',
	65122: 'plussmall',
	65123: 'hyphensmall',
	65124: 'lesssmall',
	65125: 'greatersmall',
	65126: 'equalsmall',
	65129: 'dollarsmall',
	65130: 'percentsmall',
	65131: 'atsmall',
	65154: 'alefmaddaabovefinalarabic',
	65156: 'alefhamzaabovefinalarabic',
	65158: 'wawhamzaabovefinalarabic',
	65160: 'alefhamzabelowfinalarabic',
	65162: 'yehhamzaabovefinalarabic',
	65163: 'yehhamzaaboveinitialarabic',
	65164: 'yehhamzaabovemedialarabic',
	65166: 'aleffinalarabic',
	65168: 'behfinalarabic',
	65169: 'behinitialarabic',
	65170: 'behmedialarabic',
	65172: 'tehmarbutafinalarabic',
	65174: 'tehfinalarabic',
	65175: 'tehinitialarabic',
	65176: 'tehmedialarabic',
	65178: 'thehfinalarabic',
	65179: 'thehinitialarabic',
	65180: 'thehmedialarabic',
	65182: 'jeemfinalarabic',
	65183: 'jeeminitialarabic',
	65184: 'jeemmedialarabic',
	65186: 'hahfinalarabic',
	65187: 'hahinitialarabic',
	65188: 'hahmedialarabic',
	65190: 'khahfinalarabic',
	65191: 'khahinitialarabic',
	65192: 'khahmedialarabic',
	65194: 'dalfinalarabic',
	65196: 'thalfinalarabic',
	65198: 'rehfinalarabic',
	65200: 'zainfinalarabic',
	65202: 'seenfinalarabic',
	65203: 'seeninitialarabic',
	65204: 'seenmedialarabic',
	65206: 'sheenfinalarabic',
	65207: 'sheeninitialarabic',
	65208: 'sheenmedialarabic',
	65210: 'sadfinalarabic',
	65211: 'sadinitialarabic',
	65212: 'sadmedialarabic',
	65214: 'dadfinalarabic',
	65215: 'dadinitialarabic',
	65216: 'dadmedialarabic',
	65218: 'tahfinalarabic',
	65219: 'tahinitialarabic',
	65220: 'tahmedialarabic',
	65222: 'zahfinalarabic',
	65223: 'zahinitialarabic',
	65224: 'zahmedialarabic',
	65226: 'ainfinalarabic',
	65227: 'aininitialarabic',
	65228: 'ainmedialarabic',
	65230: 'ghainfinalarabic',
	65231: 'ghaininitialarabic',
	65232: 'ghainmedialarabic',
	65234: 'fehfinalarabic',
	65235: 'fehinitialarabic',
	65236: 'fehmedialarabic',
	65238: 'qaffinalarabic',
	65239: 'qafinitialarabic',
	65240: 'qafmedialarabic',
	65242: 'kaffinalarabic',
	65243: 'kafinitialarabic',
	65244: 'kafmedialarabic',
	65246: 'lamfinalarabic',
	65247: 'laminitialarabic',
	65248: 'lammedialarabic',
	65250: 'meemfinalarabic',
	65251: 'meeminitialarabic',
	65252: 'meemmedialarabic',
	65254: 'noonfinalarabic',
	65255: 'nooninitialarabic',
	65256: 'noonmedialarabic',
	65258: 'hehfinalarabic',
	65259: 'hehinitialarabic',
	65260: 'hehmedialarabic',
	65262: 'wawfinalarabic',
	65264: 'alefmaksurafinalarabic',
	65266: 'yehfinalarabic',
	65267: 'yehinitialarabic',
	65268: 'yehmedialarabic',
	65269: 'lamalefmaddaaboveisolatedarabic',
	65270: 'lamalefmaddaabovefinalarabic',
	65271: 'lamalefhamzaaboveisolatedarabic',
	65272: 'lamalefhamzaabovefinalarabic',
	65273: 'lamalefhamzabelowisolatedarabic',
	65274: 'lamalefhamzabelowfinalarabic',
	65275: 'lamalefisolatedarabic',
	65276: 'lamaleffinalarabic',
	65279: 'zerowidthjoiner',
	65281: 'exclammonospace',
	65282: 'quotedblmonospace',
	65283: 'numbersignmonospace',
	65284: 'dollarmonospace',
	65285: 'percentmonospace',
	65286: 'ampersandmonospace',
	65287: 'quotesinglemonospace',
	65288: 'parenleftmonospace',
	65289: 'parenrightmonospace',
	65290: 'asteriskmonospace',
	65291: 'plusmonospace',
	65292: 'commamonospace',
	65293: 'hyphenmonospace',
	65294: 'periodmonospace',
	65295: 'slashmonospace',
	65296: 'zeromonospace',
	65297: 'onemonospace',
	65298: 'twomonospace',
	65299: 'threemonospace',
	65300: 'fourmonospace',
	65301: 'fivemonospace',
	65302: 'sixmonospace',
	65303: 'sevenmonospace',
	65304: 'eightmonospace',
	65305: 'ninemonospace',
	65306: 'colonmonospace',
	65307: 'semicolonmonospace',
	65308: 'lessmonospace',
	65309: 'equalmonospace',
	65310: 'greatermonospace',
	65311: 'questionmonospace',
	65312: 'atmonospace',
	65313: 'Amonospace',
	65314: 'Bmonospace',
	65315: 'Cmonospace',
	65316: 'Dmonospace',
	65317: 'Emonospace',
	65318: 'Fmonospace',
	65319: 'Gmonospace',
	65320: 'Hmonospace',
	65321: 'Imonospace',
	65322: 'Jmonospace',
	65323: 'Kmonospace',
	65324: 'Lmonospace',
	65325: 'Mmonospace',
	65326: 'Nmonospace',
	65327: 'Omonospace',
	65328: 'Pmonospace',
	65329: 'Qmonospace',
	65330: 'Rmonospace',
	65331: 'Smonospace',
	65332: 'Tmonospace',
	65333: 'Umonospace',
	65334: 'Vmonospace',
	65335: 'Wmonospace',
	65336: 'Xmonospace',
	65337: 'Ymonospace',
	65338: 'Zmonospace',
	65339: 'bracketleftmonospace',
	65340: 'backslashmonospace',
	65341: 'bracketrightmonospace',
	65342: 'asciicircummonospace',
	65343: 'underscoremonospace',
	65344: 'gravemonospace',
	65345: 'amonospace',
	65346: 'bmonospace',
	65347: 'cmonospace',
	65348: 'dmonospace',
	65349: 'emonospace',
	65350: 'fmonospace',
	65351: 'gmonospace',
	65352: 'hmonospace',
	65353: 'imonospace',
	65354: 'jmonospace',
	65355: 'kmonospace',
	65356: 'lmonospace',
	65357: 'mmonospace',
	65358: 'nmonospace',
	65359: 'omonospace',
	65360: 'pmonospace',
	65361: 'qmonospace',
	65362: 'rmonospace',
	65363: 'smonospace',
	65364: 'tmonospace',
	65365: 'umonospace',
	65366: 'vmonospace',
	65367: 'wmonospace',
	65368: 'xmonospace',
	65369: 'ymonospace',
	65370: 'zmonospace',
	65371: 'braceleftmonospace',
	65372: 'barmonospace',
	65373: 'bracerightmonospace',
	65374: 'asciitildemonospace',
	65377: 'periodhalfwidth',
	65378: 'cornerbracketlefthalfwidth',
	65379: 'cornerbracketrighthalfwidth',
	65380: 'ideographiccommaleft',
	65381: 'middledotkatakanahalfwidth',
	65382: 'wokatakanahalfwidth',
	65383: 'asmallkatakanahalfwidth',
	65384: 'ismallkatakanahalfwidth',
	65385: 'usmallkatakanahalfwidth',
	65386: 'esmallkatakanahalfwidth',
	65387: 'osmallkatakanahalfwidth',
	65388: 'yasmallkatakanahalfwidth',
	65389: 'yusmallkatakanahalfwidth',
	65390: 'yosmallkatakanahalfwidth',
	65391: 'tusmallkatakanahalfwidth',
	65392: 'katahiraprolongmarkhalfwidth',
	65393: 'akatakanahalfwidth',
	65394: 'ikatakanahalfwidth',
	65395: 'ukatakanahalfwidth',
	65396: 'ekatakanahalfwidth',
	65397: 'okatakanahalfwidth',
	65398: 'kakatakanahalfwidth',
	65399: 'kikatakanahalfwidth',
	65400: 'kukatakanahalfwidth',
	65401: 'kekatakanahalfwidth',
	65402: 'kokatakanahalfwidth',
	65403: 'sakatakanahalfwidth',
	65404: 'sikatakanahalfwidth',
	65405: 'sukatakanahalfwidth',
	65406: 'sekatakanahalfwidth',
	65407: 'sokatakanahalfwidth',
	65408: 'takatakanahalfwidth',
	65409: 'tikatakanahalfwidth',
	65410: 'tukatakanahalfwidth',
	65411: 'tekatakanahalfwidth',
	65412: 'tokatakanahalfwidth',
	65413: 'nakatakanahalfwidth',
	65414: 'nikatakanahalfwidth',
	65415: 'nukatakanahalfwidth',
	65416: 'nekatakanahalfwidth',
	65417: 'nokatakanahalfwidth',
	65418: 'hakatakanahalfwidth',
	65419: 'hikatakanahalfwidth',
	65420: 'hukatakanahalfwidth',
	65421: 'hekatakanahalfwidth',
	65422: 'hokatakanahalfwidth',
	65423: 'makatakanahalfwidth',
	65424: 'mikatakanahalfwidth',
	65425: 'mukatakanahalfwidth',
	65426: 'mekatakanahalfwidth',
	65427: 'mokatakanahalfwidth',
	65428: 'yakatakanahalfwidth',
	65429: 'yukatakanahalfwidth',
	65430: 'yokatakanahalfwidth',
	65431: 'rakatakanahalfwidth',
	65432: 'rikatakanahalfwidth',
	65433: 'rukatakanahalfwidth',
	65434: 'rekatakanahalfwidth',
	65435: 'rokatakanahalfwidth',
	65436: 'wakatakanahalfwidth',
	65437: 'nkatakanahalfwidth',
	65438: 'voicedmarkkanahalfwidth',
	65439: 'semivoicedmarkkanahalfwidth',
	65504: 'centmonospace',
	65505: 'sterlingmonospace',
	65507: 'macronmonospace',
	65509: 'yenmonospace',
	65510: 'wonmonospace',
	127822: 'apple',
	127823: 'apple',
});
