declare module '@pdf-lib/unicode-properties' {
	/**
	 * Unicode General Category constants (e.g., 'Lu' for Uppercase Letter, 'Nd' for Decimal Number).
	 */
	export type UnicodeCategory =
		| 'LC' | 'Ll' | 'Lo' | 'Lt' | 'Lm' | 'Lu' // Letters
		| 'Mn' | 'Mc' | 'Me' // Marks
		| 'Nd' | 'Nl' | 'No' // Numbers
		| 'Pc' | 'Pd' | 'Ps' | 'Pe' | 'Pi' | 'Pf' | 'Po' // Punctuation
		| 'Sm' | 'Sc' | 'Sk' | 'So' // Symbols
		| 'Zs' | 'Zl' | 'Zp' // Separators
		| 'Cc' | 'Cf' | 'Cs' | 'Co' | 'Cn'; // Other

	/**
	 * Unicode East Asian Width property codes.
	 */
	export type EastAsianWidth =
		| 'F' // Fullwidth
		| 'H' // Halfwidth
		| 'W' // Wide
		| 'Na'// Narrow
		| 'A' // Ambiguous
		| 'N'; // Neutral

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
	export function getCombiningClass(codePoint: number): number;

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
