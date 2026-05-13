/**
 * There are several different types of font objects that are returned by
 * fontkit depending on the font format. They all inherit from the TTFFont class
 * and have the same public API.
 */
export interface Font {
	/**
	 * The PostScript name for TrueType collections, for example
	 * 'NotoSans-Regular'.
	 */
	postscriptName: string | null;

	/**
	 * The full font name, for example 'Noto Sans Regular'.
	 */
	fullName: string | null;

	/**
	 * The font family, for example 'Noto Sans'.
	 */
	familyName: string | null;

	/**
	 * **
	 * The subfamily name, for example 'Regular', 'Bold', 'Italic', or 'Bold
	 * Italic'.
	 */
	subfamilyName: string | null;

	/**
	 * The legal blurb.
	 */
	copyright: string | null;

	/**
	 * The font version, for example 'Version 2.000; ttfautohint (v1.8.4)' or
	 * 'Version 1.00'.
	 */
	version: string | null;
}
