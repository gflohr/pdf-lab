declare module '@pdf-lib/unicode-properties' {
	/**
	 * Unicode General Category constants (e.g., 'Lu' for Uppercase Letter, 'Nd' for Decimal Number).
	 */
	export type UnicodeCategory =
		| 'LC'
		| 'Ll'
		| 'Lo'
		| 'Lt'
		| 'Lm'
		| 'Lu' // Letters
		| 'Mn'
		| 'Mc'
		| 'Me' // Marks
		| 'Nd'
		| 'Nl'
		| 'No' // Numbers
		| 'Pc'
		| 'Pd'
		| 'Ps'
		| 'Pe'
		| 'Pi'
		| 'Pf'
		| 'Po' // Punctuation
		| 'Sm'
		| 'Sc'
		| 'Sk'
		| 'So' // Symbols
		| 'Zs'
		| 'Zl'
		| 'Zp' // Separators
		| 'Cc'
		| 'Cf'
		| 'Cs'
		| 'Co'
		| 'Cn'; // Other

	/**
	 * Unicode East Asian Width property codes.
	 */
	export type EastAsianWidth =
		| 'F' // Fullwidth
		| 'H' // Halfwidth
		| 'W' // Wide
		| 'Na' // Narrow
		| 'A' // Ambiguous
		| 'N'; // Neutral

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

	export type UnicodeCombiningClassName = keyof CombiningClassMapping;

	/**
	 * Returns the unicode general category for the given code point.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function getCategory(codePoint: number): UnicodeCategory;

	/**
	 * Returns the script for the given code point (e.g., 'Latn', 'Grek').
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function getScript(codePoint: number): string;

	/**
	 * Returns the canonical combining class for the given code point.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function getCombiningClass(codePoint: number): UnicodeCombiningClassName;

	/**
	 * Returns the East Asian width for the given code point.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function getEastAsianWidth(codePoint: number): EastAsianWidth;

	/**
	 * Returns the numeric value for the given code point, or `null` if there
	 * is no numeric value assigned to that character.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function getNumericValue(codePoint: number): number | null;

	/**
	 * Returns whether the code point is an alphabetic character.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isAlphabetic(codePoint: number): boolean;

	/**
	 * Returns whether the code point is a digit.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isDigit(codePoint: number): boolean;

	/**
	 * Returns whether the code point is a punctuation character.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isPunctuation(codePoint: number): boolean;

	/**
	 * Returns whether the code point is lower case.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isLowerCase(codePoint: number): boolean;

	/**
	 * Returns whether the code point is upper case.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isUpperCase(codePoint: number): boolean;

	/**
	 * Returns whether the code point is title case.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isTitleCase(codePoint: number): boolean;

	/**
	 * Returns whether the code point is whitespace: specifically, whether the
	 * category is one of Zs, Zl, or Zp.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isWhiteSpace(codePoint: number): boolean;

	/**
	 * Returns whether the code point is a base form. A code point of base form
	 * does not graphically combine with preceding characters.
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isBaseForm(codePoint: number): boolean;

	/**
	 * Returns whether the code point is a mark character (e.g. an accent modifier).
	 *
	 * @param codePoint - The numeric Unicode code point.
	 */
	export function isMark(codePoint: number): boolean;
}
