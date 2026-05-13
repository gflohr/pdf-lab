import { BoundingBox } from './bounding-box';
import { TypeFeatures } from './features';
import { Glyph, GlyphRun } from './glyph';
import { Subset } from './subset';

/**
 * There are several different types of font objects that are returned by
 * fontkit depending on the font format. They all inherit from the TTFFont class
 * and have the same public API.
 */
export interface Font {
	// Metadata properties
	postscriptName: string | null;
	fullName: string | null;
	familyName: string | null;
	subfamilyName: string | null;
	copyright: string | null;
	version: string | null;

	// Metrics properties
	unitsPerEm: number /** Size of the font’s internal coordinate grid */;
	ascent: number /** The font’s ascender */;
	descent: number /** The font’s descender */;
	lineGap: number /** Amount of space that should be included between lines */;
	underlinePosition: number /** Offset from the normal underline position that should be used */;
	underlineThickness: number /** Weight of the underline that should be used */;
	italicAngle: number /** If this is an italic font, the angle the cursor should be drawn at to match the font design */;
	capHeight: number /** Height of capital letters above the baseline. */;
	xHeight: number /** Height of lower case letters. */;
	bbox: BoundingBox /** Font’s bounding box, i.e. the box that encloses all glyphs in the font */;

	// Other properties
	numGlyphs: number /** Number of glyphs in the font */;
	characterSet: number[] /** Array of all of the unicode code points supported by the font */;
	availableFeatures: (keyof TypeFeatures)[] /** OpenType feature tags (or mapped AAT tags) supported by the font */;
	// biome-ignore lint/suspicious/noExplicitAny: needs investigation
	cff: any;
	'OS/2': { sFamilyClass: number };
	head: { macStyle: { italic: boolean } };
	post: { isFixedPitch: boolean };

	// Character to Glyph Mapping Methods

	/**
	 * Maps a single unicode code point (number) to a Glyph object.
	 * Does not perform any advanced substitutions (there is no context to do so).
	 */
	glyphForCodePoint(codePoint: number): Glyph;

	/**
	 * Returns whether there is glyph in the font for the given
	 * unicode code point.
	 */
	hasGlyphForCodePoint(codePoint: number): boolean;

	/**
	 * This method returns an array of Glyph objects for the given string.
	 * This is only a one-to-one mapping from characters to glyphs. For most uses,
	 * you should use Font.layout, which provides a much more advanced mapping
	 * supporting AAT and OpenType shaping.
	 */
	glyphsForString(string: string): Glyph[];

	// Glyph Metrics and Layout Methods

	/**
	 * Returns the advance width (described above) for a single glyph id.
	 */
	widthOfGlyph(glyphId: number): number;

	/**
	 * This method returns a GlyphRun object, which includes an array of Glyphs
	 * and GlyphPositions for the given string. Glyph objects are described below.
	 * GlyphPosition objects include 4 properties: xAdvance, yAdvance, xOffset,
	 * and yOffset.
	 *
	 * The features parameter is an array of OpenType feature tags to be applied
	 * in addition to the default set. If this is an AAT font, the OpenType
	 * feature tags are mapped to AAT features.
	 */
	layout(
		string: string,
		features?: TypeFeatures | (keyof TypeFeatures)[],
	): GlyphRun;

	// Other Methods

	/**
	 * Returns a glyph object for the given glyph id. You can pass the array of
	 * code points this glyph represents for your use later, and it will be
	 * stored in the glyph object.
	 */
	getGlyph(glyphId: number, codePoints?: number[]): Glyph;

	/**
	 * Returns a Subset object for this font.
	 */
	createSubset(): Subset;
}
