const SINGLE_BYTE_ENCODINGS = new Set([
	'x-mac-roman',
	'x-mac-cyrillic',
	'iso-8859-6',
	'iso-8859-8',
]);
const MAC_ENCODINGS = {
	'x-mac-croatian':
		'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊<U+F8FF>©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ',
	'x-mac-gaelic':
		'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ',
	'x-mac-greek':
		'Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ\u00AD',
	'x-mac-icelandic':
		'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ<U+F8FF>ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
	'x-mac-inuit':
		'ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł',
	'x-mac-ce':
		'ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ',
	'x-mac-romanian':
		'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ<U+F8FF>ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
	'x-mac-turkish':
		'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ<U+F8FF>ÒÚÛÙ<U+F8A0>ˆ˜¯˘˙˚¸˝˛ˇ',
};

// Map of platform ids to encoding ids.
export const ENCODINGS = [
	// unicode
	['utf16be', 'utf16be', 'utf16be', 'utf16be', 'utf16be', 'utf16be'],

	// macintosh
	// Mappings available at http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/
	// 0	Roman                 17	Malayalam
	// 1	Japanese	            18	Sinhalese
	// 2	Traditional Chinese	  19	Burmese
	// 3	Korean	              20	Khmer
	// 4	Arabic	              21	Thai
	// 5	Hebrew	              22	Laotian
	// 6	Greek	                23	Georgian
	// 7	Russian	              24	Armenian
	// 8	RSymbol	              25	Simplified Chinese
	// 9	Devanagari	          26	Tibetan
	// 10	Gurmukhi	            27	Mongolian
	// 11	Gujarati	            28	Geez
	// 12	Oriya	                29	Slavic
	// 13	Bengali	              30	Vietnamese
	// 14	Tamil	                31	Sindhi
	// 15	Telugu	              32	(Uninterpreted)
	// 16	Kannada
	[
		'x-mac-roman',
		'shift-jis',
		'big5',
		'euc-kr',
		'iso-8859-6',
		'iso-8859-8',
		'x-mac-greek',
		'x-mac-cyrillic',
		'x-mac-symbol',
		'x-mac-devanagari',
		'x-mac-gurmukhi',
		'x-mac-gujarati',
		'Oriya',
		'Bengali',
		'Tamil',
		'Telugu',
		'Kannada',
		'Malayalam',
		'Sinhalese',
		'Burmese',
		'Khmer',
		'iso-8859-11',
		'Laotian',
		'Georgian',
		'Armenian',
		'hz-gb-2312',
		'Tibetan',
		'Mongolian',
		'Geez',
		'x-mac-ce',
		'Vietnamese',
		'Sindhi',
	],

	// ISO (deprecated)
	['ascii'],

	// windows
	// Docs here: http://msdn.microsoft.com/en-us/library/system.text.encoding(v=vs.110).aspx
	[
		'symbol',
		'utf16be',
		'shift-jis',
		'gb18030',
		'big5',
		'x-cp20949',
		'johab',
		null,
		null,
		null,
		'utf16be',
	],
];

// Overrides for Mac scripts by language id.
// See http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
export const MAC_LANGUAGE_ENCODINGS: Record<number, string> = {
	15: 'x-mac-icelandic',
	17: 'x-mac-turkish',
	18: 'x-mac-croatian',
	24: 'x-mac-ce',
	25: 'x-mac-ce',
	26: 'x-mac-ce',
	27: 'x-mac-ce',
	28: 'x-mac-ce',
	30: 'x-mac-icelandic',
	37: 'x-mac-romanian',
	38: 'x-mac-ce',
	39: 'x-mac-ce',
	40: 'x-mac-ce',
	143: 'x-mac-inuit',
	146: 'x-mac-gaelic',
};

// Map of platform ids to BCP-47 language codes.
export const LANGUAGES: ([] | Record<number, string>)[] = [
	// unicode
	[],

	{
		// macintosh
		0: 'en',
		30: 'fo',
		60: 'ks',
		90: 'rw',
		1: 'fr',
		31: 'fa',
		61: 'ku',
		91: 'rn',
		2: 'de',
		32: 'ru',
		62: 'sd',
		92: 'ny',
		3: 'it',
		33: 'zh',
		63: 'bo',
		93: 'mg',
		4: 'nl',
		34: 'nl-BE',
		64: 'ne',
		94: 'eo',
		5: 'sv',
		35: 'ga',
		65: 'sa',
		128: 'cy',
		6: 'es',
		36: 'sq',
		66: 'mr',
		129: 'eu',
		7: 'da',
		37: 'ro',
		67: 'bn',
		130: 'ca',
		8: 'pt',
		38: 'cz',
		68: 'as',
		131: 'la',
		9: 'no',
		39: 'sk',
		69: 'gu',
		132: 'qu',
		10: 'he',
		40: 'si',
		70: 'pa',
		133: 'gn',
		11: 'ja',
		41: 'yi',
		71: 'or',
		134: 'ay',
		12: 'ar',
		42: 'sr',
		72: 'ml',
		135: 'tt',
		13: 'fi',
		43: 'mk',
		73: 'kn',
		136: 'ug',
		14: 'el',
		44: 'bg',
		74: 'ta',
		137: 'dz',
		15: 'is',
		45: 'uk',
		75: 'te',
		138: 'jv',
		16: 'mt',
		46: 'be',
		76: 'si',
		139: 'su',
		17: 'tr',
		47: 'uz',
		77: 'my',
		140: 'gl',
		18: 'hr',
		48: 'kk',
		78: 'km',
		141: 'af',
		19: 'zh-Hant',
		49: 'az-Cyrl',
		79: 'lo',
		142: 'br',
		20: 'ur',
		50: 'az-Arab',
		80: 'vi',
		143: 'iu',
		21: 'hi',
		51: 'hy',
		81: 'id',
		144: 'gd',
		22: 'th',
		52: 'ka',
		82: 'tl',
		145: 'gv',
		23: 'ko',
		53: 'mo',
		83: 'ms',
		146: 'ga',
		24: 'lt',
		54: 'ky',
		84: 'ms-Arab',
		147: 'to',
		25: 'pl',
		55: 'tg',
		85: 'am',
		148: 'el-polyton',
		26: 'hu',
		56: 'tk',
		86: 'ti',
		149: 'kl',
		27: 'es',
		57: 'mn-CN',
		87: 'om',
		150: 'az',
		28: 'lv',
		58: 'mn',
		88: 'so',
		151: 'nn',
		29: 'se',
		59: 'ps',
		89: 'sw',
	},

	// ISO (deprecated)
	[],

	{
		// windows
		1078: 'af',
		16393: 'en-IN',
		1159: 'rw',
		1074: 'tn',
		1052: 'sq',
		6153: 'en-IE',
		1089: 'sw',
		1115: 'si',
		1156: 'gsw',
		8201: 'en-JM',
		1111: 'kok',
		1051: 'sk',
		1118: 'am',
		17417: 'en-MY',
		1042: 'ko',
		1060: 'sl',
		5121: 'ar-DZ',
		5129: 'en-NZ',
		1088: 'ky',
		11274: 'es-AR',
		15361: 'ar-BH',
		13321: 'en-PH',
		1108: 'lo',
		16394: 'es-BO',
		3073: 'ar',
		18441: 'en-SG',
		1062: 'lv',
		13322: 'es-CL',
		2049: 'ar-IQ',
		7177: 'en-ZA',
		1063: 'lt',
		9226: 'es-CO',
		11265: 'ar-JO',
		11273: 'en-TT',
		2094: 'dsb',
		5130: 'es-CR',
		13313: 'ar-KW',
		2057: 'en-GB',
		1134: 'lb',
		7178: 'es-DO',
		12289: 'ar-LB',
		1033: 'en',
		1071: 'mk',
		12298: 'es-EC',
		4097: 'ar-LY',
		12297: 'en-ZW',
		2110: 'ms-BN',
		17418: 'es-SV',
		6145: 'ary',
		1061: 'et',
		1086: 'ms',
		4106: 'es-GT',
		8193: 'ar-OM',
		1080: 'fo',
		1100: 'ml',
		18442: 'es-HN',
		16385: 'ar-QA',
		1124: 'fil',
		1082: 'mt',
		2058: 'es-MX',
		1025: 'ar-SA',
		1035: 'fi',
		1153: 'mi',
		19466: 'es-NI',
		10241: 'ar-SY',
		2060: 'fr-BE',
		1146: 'arn',
		6154: 'es-PA',
		7169: 'aeb',
		3084: 'fr-CA',
		1102: 'mr',
		15370: 'es-PY',
		14337: 'ar-AE',
		1036: 'fr',
		1148: 'moh',
		10250: 'es-PE',
		9217: 'ar-YE',
		5132: 'fr-LU',
		1104: 'mn',
		20490: 'es-PR',
		1067: 'hy',
		6156: 'fr-MC',
		2128: 'mn-CN',
		3082: 'es',
		1101: 'as',
		4108: 'fr-CH',
		1121: 'ne',
		1034: 'es',
		2092: 'az-Cyrl',
		1122: 'fy',
		1044: 'nb',
		21514: 'es-US',
		1068: 'az',
		1110: 'gl',
		2068: 'nn',
		14346: 'es-UY',
		1133: 'ba',
		1079: 'ka',
		1154: 'oc',
		8202: 'es-VE',
		1069: 'eu',
		3079: 'de-AT',
		1096: 'or',
		2077: 'sv-FI',
		1059: 'be',
		1031: 'de',
		1123: 'ps',
		1053: 'sv',
		2117: 'bn',
		5127: 'de-LI',
		1045: 'pl',
		1114: 'syr',
		1093: 'bn-IN',
		4103: 'de-LU',
		1046: 'pt',
		1064: 'tg',
		8218: 'bs-Cyrl',
		2055: 'de-CH',
		2070: 'pt-PT',
		2143: 'tzm',
		5146: 'bs',
		1032: 'el',
		1094: 'pa',
		1097: 'ta',
		1150: 'br',
		1135: 'kl',
		1131: 'qu-BO',
		1092: 'tt',
		1026: 'bg',
		1095: 'gu',
		2155: 'qu-EC',
		1098: 'te',
		1027: 'ca',
		1128: 'ha',
		3179: 'qu',
		1054: 'th',
		3076: 'zh-HK',
		1037: 'he',
		1048: 'ro',
		1105: 'bo',
		5124: 'zh-MO',
		1081: 'hi',
		1047: 'rm',
		1055: 'tr',
		2052: 'zh',
		1038: 'hu',
		1049: 'ru',
		1090: 'tk',
		4100: 'zh-SG',
		1039: 'is',
		9275: 'smn',
		1152: 'ug',
		1028: 'zh-TW',
		1136: 'ig',
		4155: 'smj-NO',
		1058: 'uk',
		1155: 'co',
		1057: 'id',
		5179: 'smj',
		1070: 'hsb',
		1050: 'hr',
		1117: 'iu',
		3131: 'se-FI',
		1056: 'ur',
		4122: 'hr-BA',
		2141: 'iu-Latn',
		1083: 'se',
		2115: 'uz-Cyrl',
		1029: 'cs',
		2108: 'ga',
		2107: 'se-SE',
		1091: 'uz',
		1030: 'da',
		1076: 'xh',
		8251: 'sms',
		1066: 'vi',
		1164: 'prs',
		1077: 'zu',
		6203: 'sma-NO',
		1106: 'cy',
		1125: 'dv',
		1040: 'it',
		7227: 'sms',
		1160: 'wo',
		2067: 'nl-BE',
		2064: 'it-CH',
		1103: 'sa',
		1157: 'sah',
		1043: 'nl',
		1041: 'ja',
		7194: 'sr-Cyrl-BA',
		1144: 'ii',
		3081: 'en-AU',
		1099: 'kn',
		3098: 'sr',
		1130: 'yo',
		10249: 'en-BZ',
		1087: 'kk',
		6170: 'sr-Latn-BA',
		4105: 'en-CA',
		1107: 'km',
		2074: 'sr-Latn',
		9225: 'en-029',
		1158: 'quc',
		1132: 'nso',
	},
];

/**
 * Gets an encoding name from platform, encoding, and language ids.
 * Returned encoding names can be used in iconv-lite to decode text.
 */
export function getEncoding(
	platformID: number,
	encodingID: number,
	languageID = 0,
): string | null {
	if (platformID === 1 && MAC_LANGUAGE_ENCODINGS[languageID]) {
		return MAC_LANGUAGE_ENCODINGS[languageID];
	}

	return ENCODINGS[platformID]?.[encodingID];
}

const encodingCache = new Map<string, Map<number, number>>();

export function getEncodingMapping(encoding: string) {
	const cached = encodingCache.get(encoding);
	if (cached) {
		return cached;
	}

	// These encodings aren't supported by TextDecoder.
	const mapping: string = MAC_ENCODINGS[encoding as keyof typeof MAC_ENCODINGS];
	if (mapping) {
		const res = new Map<number, number>();
		for (let i = 0; i < mapping.length; i++) {
			res.set(mapping.charCodeAt(i), 0x80 + i);
		}

		encodingCache.set(encoding, res);
		return res;
	}

	// Only single byte encodings can be mapped 1:1.
	if (SINGLE_BYTE_ENCODINGS.has(encoding)) {
		// TextEncoder only supports utf8, whereas TextDecoder supports legacy encodings.
		// Use this to create a mapping of code points.
		const decoder = new TextDecoder(encoding);
		const mapping = new Uint8Array(0x80);
		for (let i = 0; i < 0x80; i++) {
			mapping[i] = 0x80 + i;
		}

		const res = new Map<number, number>();
		const s = decoder.decode(mapping);
		for (let i = 0; i < 0x80; i++) {
			res.set(s.charCodeAt(i), 0x80 + i);
		}

		encodingCache.set(encoding, res);

		return res;
	}
}
