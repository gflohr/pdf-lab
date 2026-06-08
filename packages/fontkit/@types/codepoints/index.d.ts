declare module 'codepoints' {
	type CombiningClassMapping = {
		readonly Not_Reordered: 0;
		readonly Overlay: 1;
		readonly Nukta: 7;
		readonly Kana_Voicing: 8;
		readonly Virama: 9;
		readonly CCC10: 10;
		readonly CCC11: 11;
		readonly CCC12: 12;
		readonly CCC13: 13;
		readonly CCC14: 14;
		readonly CCC15: 15;
		readonly CCC16: 16;
		readonly CCC17: 17;
		readonly CCC18: 18;
		readonly CCC19: 19;
		readonly CCC20: 20;
		readonly CCC21: 21;
		readonly CCC22: 22;
		readonly CCC23: 23;
		readonly CCC24: 24;
		readonly CCC25: 25;
		readonly CCC26: 26;
		readonly CCC30: 30;
		readonly CCC31: 31;
		readonly CCC32: 32;
		readonly CCC27: 27;
		readonly CCC28: 28;
		readonly CCC29: 29;
		readonly CCC33: 33;
		readonly CCC34: 34;
		readonly CCC35: 35;
		readonly CCC36: 36;
		readonly CCC84: 84;
		readonly CCC91: 91;
		readonly CCC103: 103;
		readonly CCC107: 107;
		readonly CCC118: 118;
		readonly CCC122: 122;
		readonly CCC129: 129;
		readonly CCC130: 130;
		readonly CCC132: 132;
		readonly Attached_Below: 202;
		readonly Attached_Above: 214;
		readonly Attached_Above_Right: 216;
		readonly Below_Left: 218;
		readonly Below: 220;
		readonly Below_Right: 222;
		readonly Left: 224;
		readonly Right: 226;
		readonly Above_Left: 228;
		readonly Above: 230;
		readonly Above_Right: 232;
		readonly Double_Below: 233;
		readonly Double_Above: 234;
		readonly Iota_Subscript: 240;
	};

	export type CombiningClassName = keyof CombiningClassMapping;
	export type CombiningClassValue = CombiningClassMapping[CombiningClassName];

	type SynchronizedCombiningClass = {
		[K in CombiningClassName]: {
			/** The string name for the combining class.
			 *
			 */
			combiningClassName: K;

			/** The numeric combining class value. */
			combiningClass: CombiningClassMapping[K];
		};
	}[CombiningClassName];

	export type CaseCondition = 'az';

	/**
	 * 0 = yes, 1 = no.
	 */
	export type YesNo = 0 | 1;

	/**
	 * 0 = yes, 1 = no, 2 = maybe.
	 */
	export type YesNoMaybe = YesNo | 2;

	interface BaseCodepoint {
		/** The code point index. */
		code: number;

		/** The character name. */
		name: string;

		/** The legacy name used by Unicode 1. */
		unicode1name: string;

		/** The Unicode category. */
		category:
			| 'Cc'
			| 'Cf'
			| 'Co'
			| 'Cs'
			| 'Ll'
			| 'Lm'
			| 'Lo'
			| 'Lt'
			| 'Lu'
			| 'Mc'
			| 'Me'
			| 'Mn'
			| 'Nd'
			| 'Nl'
			| 'No'
			| 'Pc'
			| 'Pd'
			| 'Pe'
			| 'Pf'
			| 'Pi'
			| 'Po'
			| 'Ps'
			| 'Sc'
			| 'Sk'
			| 'Sm'
			| 'So'
			| 'Zl'
			| 'Zp'
			| 'Zs';

		/** The block name this character is a part of. */
		block:
			| 'Adlam'
			| 'Aegean Numbers'
			| 'Ahom'
			| 'Alchemical Symbols'
			| 'Alphabetic Presentation Forms'
			| 'Anatolian Hieroglyphs'
			| 'Ancient Greek Musical Notation'
			| 'Ancient Greek Numbers'
			| 'Ancient Symbols'
			| 'Arabic'
			| 'Arabic Extended-A'
			| 'Arabic Mathematical Alphabetic Symbols'
			| 'Arabic Presentation Forms-A'
			| 'Arabic Presentation Forms-B'
			| 'Arabic Supplement'
			| 'Armenian'
			| 'Arrows'
			| 'Avestan'
			| 'Balinese'
			| 'Bamum'
			| 'Bamum Supplement'
			| 'Basic Latin'
			| 'Bassa Vah'
			| 'Batak'
			| 'Bengali'
			| 'Bhaiksuki'
			| 'Block Elements'
			| 'Bopomofo'
			| 'Bopomofo Extended'
			| 'Box Drawing'
			| 'Brahmi'
			| 'Braille Patterns'
			| 'Buginese'
			| 'Buhid'
			| 'Byzantine Musical Symbols'
			| 'CJK Compatibility'
			| 'CJK Compatibility Forms'
			| 'CJK Compatibility Ideographs'
			| 'CJK Compatibility Ideographs Supplement'
			| 'CJK Radicals Supplement'
			| 'CJK Strokes'
			| 'CJK Symbols and Punctuation'
			| 'CJK Unified Ideographs'
			| 'CJK Unified Ideographs Extension A'
			| 'CJK Unified Ideographs Extension B'
			| 'CJK Unified Ideographs Extension C'
			| 'CJK Unified Ideographs Extension D'
			| 'CJK Unified Ideographs Extension E'
			| 'CJK Unified Ideographs Extension F'
			| 'Carian'
			| 'Caucasian Albanian'
			| 'Chakma'
			| 'Cham'
			| 'Cherokee'
			| 'Cherokee Supplement'
			| 'Chess Symbols'
			| 'Combining Diacritical Marks'
			| 'Combining Diacritical Marks Extended'
			| 'Combining Diacritical Marks Supplement'
			| 'Combining Diacritical Marks for Symbols'
			| 'Combining Half Marks'
			| 'Common Indic Number Forms'
			| 'Control Pictures'
			| 'Coptic'
			| 'Coptic Epact Numbers'
			| 'Counting Rod Numerals'
			| 'Cuneiform'
			| 'Cuneiform Numbers and Punctuation'
			| 'Currency Symbols'
			| 'Cypriot Syllabary'
			| 'Cyrillic'
			| 'Cyrillic Extended-A'
			| 'Cyrillic Extended-B'
			| 'Cyrillic Extended-C'
			| 'Cyrillic Supplement'
			| 'Deseret'
			| 'Devanagari'
			| 'Devanagari Extended'
			| 'Dingbats'
			| 'Dogra'
			| 'Domino Tiles'
			| 'Duployan'
			| 'Early Dynastic Cuneiform'
			| 'Egyptian Hieroglyph Format Controls'
			| 'Egyptian Hieroglyphs'
			| 'Elbasan'
			| 'Elymaic'
			| 'Emoticons'
			| 'Enclosed Alphanumeric Supplement'
			| 'Enclosed Alphanumerics'
			| 'Enclosed CJK Letters and Months'
			| 'Enclosed Ideographic Supplement'
			| 'Ethiopic'
			| 'Ethiopic Extended'
			| 'Ethiopic Extended-A'
			| 'Ethiopic Supplement'
			| 'General Punctuation'
			| 'Geometric Shapes'
			| 'Geometric Shapes Extended'
			| 'Georgian'
			| 'Georgian Extended'
			| 'Georgian Supplement'
			| 'Glagolitic'
			| 'Glagolitic Supplement'
			| 'Gothic'
			| 'Grantha'
			| 'Greek Extended'
			| 'Greek and Coptic'
			| 'Gujarati'
			| 'Gunjala Gondi'
			| 'Gurmukhi'
			| 'Halfwidth and Fullwidth Forms'
			| 'Hangul Compatibility Jamo'
			| 'Hangul Jamo'
			| 'Hangul Jamo Extended-A'
			| 'Hangul Jamo Extended-B'
			| 'Hangul Syllables'
			| 'Hanifi Rohingya'
			| 'Hanunoo'
			| 'Hatran'
			| 'Hebrew'
			| 'High Private Use Surrogates'
			| 'High Surrogates'
			| 'Hiragana'
			| 'IPA Extensions'
			| 'Ideographic Description Characters'
			| 'Ideographic Symbols and Punctuation'
			| 'Imperial Aramaic'
			| 'Indic Siyaq Numbers'
			| 'Inscriptional Pahlavi'
			| 'Inscriptional Parthian'
			| 'Javanese'
			| 'Kaithi'
			| 'Kana Extended-A'
			| 'Kana Supplement'
			| 'Kanbun'
			| 'Kangxi Radicals'
			| 'Kannada'
			| 'Katakana'
			| 'Katakana Phonetic Extensions'
			| 'Kayah Li'
			| 'Kharoshthi'
			| 'Khmer'
			| 'Khmer Symbols'
			| 'Khojki'
			| 'Khudawadi'
			| 'Lao'
			| 'Latin Extended Additional'
			| 'Latin Extended-A'
			| 'Latin Extended-B'
			| 'Latin Extended-C'
			| 'Latin Extended-D'
			| 'Latin Extended-E'
			| 'Latin-1 Supplement'
			| 'Lepcha'
			| 'Letterlike Symbols'
			| 'Limbu'
			| 'Linear A'
			| 'Linear B Ideograms'
			| 'Linear B Syllabary'
			| 'Lisu'
			| 'Low Surrogates'
			| 'Lycian'
			| 'Lydian'
			| 'Mahajani'
			| 'Mahjong Tiles'
			| 'Makasar'
			| 'Malayalam'
			| 'Mandaic'
			| 'Manichaean'
			| 'Marchen'
			| 'Masaram Gondi'
			| 'Mathematical Alphanumeric Symbols'
			| 'Mathematical Operators'
			| 'Mayan Numerals'
			| 'Medefaidrin'
			| 'Meetei Mayek'
			| 'Meetei Mayek Extensions'
			| 'Mende Kikakui'
			| 'Meroitic Cursive'
			| 'Meroitic Hieroglyphs'
			| 'Miao'
			| 'Miscellaneous Mathematical Symbols-A'
			| 'Miscellaneous Mathematical Symbols-B'
			| 'Miscellaneous Symbols'
			| 'Miscellaneous Symbols and Arrows'
			| 'Miscellaneous Symbols and Pictographs'
			| 'Miscellaneous Technical'
			| 'Modi'
			| 'Modifier Tone Letters'
			| 'Mongolian'
			| 'Mongolian Supplement'
			| 'Mro'
			| 'Multani'
			| 'Musical Symbols'
			| 'Myanmar'
			| 'Myanmar Extended-A'
			| 'Myanmar Extended-B'
			| 'NKo'
			| 'Nabataean'
			| 'Nandinagari'
			| 'New Tai Lue'
			| 'Newa'
			| 'Number Forms'
			| 'Nushu'
			| 'Nyiakeng Puachue Hmong'
			| 'Ogham'
			| 'Ol Chiki'
			| 'Old Hungarian'
			| 'Old Italic'
			| 'Old North Arabian'
			| 'Old Permic'
			| 'Old Persian'
			| 'Old Sogdian'
			| 'Old South Arabian'
			| 'Old Turkic'
			| 'Optical Character Recognition'
			| 'Oriya'
			| 'Ornamental Dingbats'
			| 'Osage'
			| 'Osmanya'
			| 'Ottoman Siyaq Numbers'
			| 'Pahawh Hmong'
			| 'Palmyrene'
			| 'Pau Cin Hau'
			| 'Phags-pa'
			| 'Phaistos Disc'
			| 'Phoenician'
			| 'Phonetic Extensions'
			| 'Phonetic Extensions Supplement'
			| 'Playing Cards'
			| 'Private Use Area'
			| 'Psalter Pahlavi'
			| 'Rejang'
			| 'Rumi Numeral Symbols'
			| 'Runic'
			| 'Samaritan'
			| 'Saurashtra'
			| 'Sharada'
			| 'Shavian'
			| 'Shorthand Format Controls'
			| 'Siddham'
			| 'Sinhala'
			| 'Sinhala Archaic Numbers'
			| 'Small Form Variants'
			| 'Small Kana Extension'
			| 'Sogdian'
			| 'Sora Sompeng'
			| 'Soyombo'
			| 'Spacing Modifier Letters'
			| 'Specials'
			| 'Sundanese'
			| 'Sundanese Supplement'
			| 'Superscripts and Subscripts'
			| 'Supplemental Arrows-A'
			| 'Supplemental Arrows-B'
			| 'Supplemental Arrows-C'
			| 'Supplemental Mathematical Operators'
			| 'Supplemental Punctuation'
			| 'Supplemental Symbols and Pictographs'
			| 'Supplementary Private Use Area-A'
			| 'Supplementary Private Use Area-B'
			| 'Sutton SignWriting'
			| 'Syloti Nagri'
			| 'Symbols and Pictographs Extended-A'
			| 'Syriac'
			| 'Syriac Supplement'
			| 'Tagalog'
			| 'Tagbanwa'
			| 'Tags'
			| 'Tai Le'
			| 'Tai Tham'
			| 'Tai Viet'
			| 'Tai Xuan Jing Symbols'
			| 'Takri'
			| 'Tamil'
			| 'Tamil Supplement'
			| 'Tangut'
			| 'TangutComponents'
			| 'Telugu'
			| 'Thaana'
			| 'Thai'
			| 'Tibetan'
			| 'Tifinagh'
			| 'Tirhuta'
			| 'Transport and Map Symbols'
			| 'Ugaritic'
			| 'Unified Canadian Aboriginal Syllabics'
			| 'Unified Canadian Aboriginal Syllabics Extended'
			| 'Vai'
			| 'Variation Selectors'
			| 'Variation Selectors Supplement'
			| 'Vedic Extensions'
			| 'Vertical Forms'
			| 'Wancho'
			| 'Warang Citi'
			| 'Yi Radicals'
			| 'Yi Syllables'
			| 'Yijing Hexagram Symbols'
			| 'Zanabazar Square';

		/** The script this character belongs to. */
		script?:
			| 'Adlam'
			| 'Ahom'
			| 'Anatolian_Hieroglyphs'
			| 'Arabic'
			| 'Armenian'
			| 'Avestan'
			| 'Balinese'
			| 'Bamum'
			| 'Bassa_Vah'
			| 'Batak'
			| 'Bengali'
			| 'Bhaiksuki'
			| 'Bopomofo'
			| 'Brahmi'
			| 'Braille'
			| 'Buginese'
			| 'Buhid'
			| 'Canadian_Aboriginal'
			| 'Carian'
			| 'Caucasian_Albanian'
			| 'Chakma'
			| 'Cham'
			| 'Cherokee'
			| 'Common'
			| 'Coptic'
			| 'Cuneiform'
			| 'Cypriot'
			| 'Cyrillic'
			| 'Deseret'
			| 'Devanagari'
			| 'Dogra'
			| 'Duployan'
			| 'Egyptian_Hieroglyphs'
			| 'Elbasan'
			| 'Elymaic'
			| 'Ethiopic'
			| 'Georgian'
			| 'Glagolitic'
			| 'Gothic'
			| 'Grantha'
			| 'Greek'
			| 'Gujarati'
			| 'Gunjala_Gondi'
			| 'Gurmukhi'
			| 'Han'
			| 'Hangul'
			| 'Hanifi_Rohingya'
			| 'Hanunoo'
			| 'Hatran'
			| 'Hebrew'
			| 'Hiragana'
			| 'Imperial_Aramaic'
			| 'Inherited'
			| 'Inscriptional_Pahlavi'
			| 'Inscriptional_Parthian'
			| 'Javanese'
			| 'Kaithi'
			| 'Kannada'
			| 'Katakana'
			| 'Kayah_Li'
			| 'Kharoshthi'
			| 'Khmer'
			| 'Khojki'
			| 'Khudawadi'
			| 'Lao'
			| 'Latin'
			| 'Lepcha'
			| 'Limbu'
			| 'Linear_A'
			| 'Linear_B'
			| 'Lisu'
			| 'Lycian'
			| 'Lydian'
			| 'Mahajani'
			| 'Makasar'
			| 'Malayalam'
			| 'Mandaic'
			| 'Manichaean'
			| 'Marchen'
			| 'Masaram_Gondi'
			| 'Medefaidrin'
			| 'Meetei_Mayek'
			| 'Mende_Kikakui'
			| 'Meroitic_Cursive'
			| 'Meroitic_Hieroglyphs'
			| 'Miao'
			| 'Modi'
			| 'Mongolian'
			| 'Mro'
			| 'Multani'
			| 'Myanmar'
			| 'Nabataean'
			| 'Nandinagari'
			| 'New_Tai_Lue'
			| 'Newa'
			| 'Nko'
			| 'Nushu'
			| 'Nyiakeng_Puachue_Hmong'
			| 'Ogham'
			| 'Ol_Chiki'
			| 'Old_Hungarian'
			| 'Old_Italic'
			| 'Old_North_Arabian'
			| 'Old_Permic'
			| 'Old_Persian'
			| 'Old_Sogdian'
			| 'Old_South_Arabian'
			| 'Old_Turkic'
			| 'Oriya'
			| 'Osage'
			| 'Osmanya'
			| 'Pahawh_Hmong'
			| 'Palmyrene'
			| 'Pau_Cin_Hau'
			| 'Phags_Pa'
			| 'Phoenician'
			| 'Psalter_Pahlavi'
			| 'Rejang'
			| 'Runic'
			| 'Samaritan'
			| 'Saurashtra'
			| 'Sharada'
			| 'Shavian'
			| 'Siddham'
			| 'SignWriting'
			| 'Sinhala'
			| 'Sogdian'
			| 'Sora_Sompeng'
			| 'Soyombo'
			| 'Sundanese'
			| 'Syloti_Nagri'
			| 'Syriac'
			| 'Tagalog'
			| 'Tagbanwa'
			| 'Tai_Le'
			| 'Tai_Tham'
			| 'Tai_Viet'
			| 'Takri'
			| 'Tamil'
			| 'Tangut'
			| 'Telugu'
			| 'Thaana'
			| 'Thai'
			| 'Tibetan'
			| 'Tifinagh'
			| 'Tirhuta'
			| 'Ugaritic'
			| 'Vai'
			| 'Wancho'
			| 'Warang_Citi'
			| 'Yi'
			| 'Zanabazar_Square';

		/** The east asian width for this character. */
		eastAsianWidth: 'A' | 'F' | 'H' | 'N' | 'Na' | 'W';

		// These are handled above, so that the corresponding values can be
		// inferred from each other.
		// combiningClass: number;
		// combiningClassName: string;

		/** The class for the Unicode bidirectional algorithm. */
		bidiClass:
			| 'AL'
			| 'AN'
			| 'B'
			| 'BN'
			| 'CS'
			| 'EN'
			| 'ES'
			| 'ET'
			| 'FSI'
			| 'L'
			| 'LRE'
			| 'LRI'
			| 'LRO'
			| 'NSM'
			| 'ON'
			| 'PDF'
			| 'PDI'
			| 'R'
			| 'RLE'
			| 'RLI'
			| 'RLO'
			| 'S'
			| 'WS';

		/* Whether the character is mirrored in the bidi algorithm. */
		bidiMirrored: boolean;

		/**
		 * The numeric value for this character. This is either an integer
		 * ('1', '2', ...) or a vulgar fraction ('1/2', '7/12', ...).
		 */
		numeric: string;

		/**
		 * An array of code points mapping this character to upper case, if
		 * any.
		 */
		uppercase?: number[];

		/**
		 * An array of code points mapping this character to lower case, if
		 * any.
		 */
		lowercase?: number[];

		/**
		 * An array of code points mapping this character to title case, if
		 * any.
		 */
		titlecase?: number[];

		/**
		 * An array of code points mapping this character to a folded,
		 * equivalent, if any.
		 */
		folded?: number[];

		/** The conditions used during case mapping for this character. */
		caseConditions?: CaseCondition[];

		/**
		 * An array of code points that this character decomposes into. Used by
		 * the Unicode normalization algorithm.
		 */
		decomposition: number[];

		/**
		 * A dictionary mapping of compositions for this character.
		 */
		compositions: Record<number, number>;

		/* Whether the decomposition is a compatibility one. */
		isCompat: boolean;

		/* Whether the character is excluded from composition. */
		isExcluded: boolean;

		/** Quickcheck value for NFC (0 = YES, 1 = NO, 2 = MAYBE). */
		NFC_QC: YesNoMaybe;

		/** Quickcheck value for NFKC (0 = YES, 1 = NO, 2 = MAYBE). */
		NFKC_QC: YesNoMaybe;

		/** Quickcheck value for NFD (0 = YES, 1 = NO). */
		NFD_QC: YesNo;

		/** Quickcheck value for NFKD (0 = YES, 1 = NO). */
		NFKD_QC: YesNo;

		/** The arabic joing type. */
		joiningType:
			| 'Dual_Joining'
			| 'Join_Causing'
			| 'Left_Joining'
			| 'Non_Joining'
			| 'Right_Joining'
			| 'Transparent';

		joiningGroup:
			| 'AFRICAN FEH'
			| 'AFRICAN NOON'
			| 'AFRICAN QAF'
			| 'AIN'
			| 'ALAPH'
			| 'ALEF'
			| 'BEH'
			| 'BETH'
			| 'BURUSHASKI YEH BARREE'
			| 'DAL'
			| 'DALATH RISH'
			| 'E'
			| 'FARSI YEH'
			| 'FE'
			| 'FEH'
			| 'FINAL SEMKATH'
			| 'GAF'
			| 'GAMAL'
			| 'HAH'
			| 'HANIFI ROHINGYA KINNA YA'
			| 'HANIFI ROHINGYA PA'
			| 'HE'
			| 'HEH'
			| 'HEH GOAL'
			| 'HETH'
			| 'KAF'
			| 'KAPH'
			| 'KHAPH'
			| 'KNOTTED HEH'
			| 'LAM'
			| 'LAMADH'
			| 'MALAYALAM BHA'
			| 'MALAYALAM JA'
			| 'MALAYALAM LLA'
			| 'MALAYALAM LLLA'
			| 'MALAYALAM NGA'
			| 'MALAYALAM NNA'
			| 'MALAYALAM NNNA'
			| 'MALAYALAM NYA'
			| 'MALAYALAM RA'
			| 'MALAYALAM SSA'
			| 'MALAYALAM TTA'
			| 'MANICHAEAN ALEPH'
			| 'MANICHAEAN AYIN'
			| 'MANICHAEAN BETH'
			| 'MANICHAEAN DALETH'
			| 'MANICHAEAN DHAMEDH'
			| 'MANICHAEAN FIVE'
			| 'MANICHAEAN GIMEL'
			| 'MANICHAEAN HETH'
			| 'MANICHAEAN HUNDRED'
			| 'MANICHAEAN KAPH'
			| 'MANICHAEAN LAMEDH'
			| 'MANICHAEAN MEM'
			| 'MANICHAEAN NUN'
			| 'MANICHAEAN ONE'
			| 'MANICHAEAN PE'
			| 'MANICHAEAN QOPH'
			| 'MANICHAEAN RESH'
			| 'MANICHAEAN SADHE'
			| 'MANICHAEAN SAMEKH'
			| 'MANICHAEAN TAW'
			| 'MANICHAEAN TEN'
			| 'MANICHAEAN TETH'
			| 'MANICHAEAN THAMEDH'
			| 'MANICHAEAN TWENTY'
			| 'MANICHAEAN WAW'
			| 'MANICHAEAN YODH'
			| 'MANICHAEAN ZAYIN'
			| 'MEEM'
			| 'MIM'
			| 'NOON'
			| 'NUN'
			| 'NYA'
			| 'No_Joining_Group'
			| 'PE'
			| 'QAF'
			| 'QAPH'
			| 'REH'
			| 'REVERSED PE'
			| 'ROHINGYA YEH'
			| 'SAD'
			| 'SADHE'
			| 'SEEN'
			| 'SEMKATH'
			| 'SHIN'
			| 'STRAIGHT WAW'
			| 'SWASH KAF'
			| 'SYRIAC WAW'
			| 'TAH'
			| 'TAW'
			| 'TEH MARBUTA'
			| 'TEH MARBUTA GOAL'
			| 'TETH'
			| 'WAW'
			| 'YEH'
			| 'YEH BARREE'
			| 'YEH WITH TAIL'
			| 'YUDH'
			| 'YUDH HE'
			| 'ZAIN'
			| 'ZHAIN';
	}

	export type Codepoint = BaseCodepoint & SynchronizedCombiningClass;

	const codepoints: Codepoint[];

	/**
	 * The array of codepoint objects. The array contains gaps!
	 */
	export default codepoints;
}
