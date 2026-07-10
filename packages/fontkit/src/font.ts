/* istanbul ignore file */
import type { CFF1Font } from './cff/cff1-font.js';
import type { BoundingBox } from './glyph/bounding-box.js';
import type { Glyph } from './glyph/glyph.js';
import type { GlyphRun } from './layout/glyph-run.js';
import type { SFNTFont } from './sfnt-font.js';
import type { Subset } from './subset/subset.js';
import type { OpenType } from './tables/open-type.js';
import type { TrueTypeFont } from './true-type-font.js';

export interface VariationAxis {
	axisTag: string;
	min: number;
	default: number;
	max: number;
	flags: number;
	nameID: number;
	name: string;
}

export interface VariationAxes {
	wght?: VariationAxis;
	wdth?: VariationAxis;
}

export type NamedVariation = Record<string, number>;

export type NamedVariations = Record<string, NamedVariation>;

export type VariationCoordinates = Record<string, number>;

export type VariationSettings = Record<string, number>;

/**
 * This interface only exists for adding compatibility with other fontkit
 * forks.
 *
 * @deprecated Use {@link SFNTFont} instead!
 */
export interface Font extends SFNTFont {
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
	bbox: Readonly<BoundingBox> /** Font’s bounding box, i.e. the box that encloses all glyphs in the font. */;

	// Other properties
	numGlyphs: number /** Number of glyphs in the font */;
	characterSet: number[] /** Array of all of the unicode code points supported by the font */;
	availableFeatures: OpenType.FeatureTag[] /** OpenType feature tags (or mapped AAT tags) supported by the font */;

	// Character to Glyph Mapping Methods

	/**
	 * Maps a single unicode code point (number) to a Glyph object.
	 * Does not perform any advanced substitutions (there is no context to do so).
	 */
	glyphForCodePoint(codePoint: number): Glyph | null;

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
		text: string,
		features?: OpenType.Features | OpenType.FeatureTag[],
		script?: string | null,
		language?: string | null,
		direction?: string | null,
	): GlyphRun;

	// Other Methods

	/**
	 * Returns a glyph object for the given glyph id. You can pass the array of
	 * code points this glyph represents for your use later, and it will be
	 * stored in the glyph object.
	 */
	getGlyph(glyphId: number, codePoints?: readonly number[]): Glyph | null;

	/**
	 * Returns a Subset object for this font.
	 */
	createSubset(): Subset;

	/**
	 * Horizontal header metrics (hhea table).
	 */
	//hhea: hheaTable.hhea;

	/**
	 * Variable font axes (if present in the font).
	 */
	readonly variationAxes: VariationAxes;

	/**
	 * Returns named variation instances defined in the font.
	 */
	readonly namedVariations: NamedVariations;

	/**
	 * Returns a new font instance with applied variation coordinates.
	 *
	 * @throws if the font does not contain required variation tables.
	 */
	getVariation(settings: string | VariationCoordinates): Font;

	/**
	 * Returns all Unicode strings associated with a glyph ID.
	 *
	 * @param id - Glyph ID in the font’s glyph table
	 */
	stringsForGlyph(id: number): string[];

	/**
	 * An alias for the font's `CFF ` table (always version 1).
	 */
	cff: CFF1Font | null;

	/**
	 * Get a font variation of that name.
	 *
	 * @param postScriptName Postscript name of the variation
	 * @returns the found if found, null otherwise
	 */
	getFont(postScriptName: string): TrueTypeFont | null;
}
