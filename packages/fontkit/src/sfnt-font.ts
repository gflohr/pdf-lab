import type * as r from '@pdf-lib/restructure';
import type { CFFFont } from './cff/cff-font.js';
import type { BoundingBox } from './glyph/bounding-box.js';
import type { Glyph } from './glyph/glyph.js';
import type { BidiDirection, GlyphRun } from './layout/glyph-run.js';
import type { LayoutEngine } from './layout/layout-engine.js';
import type * as Script from './layout/script.js';
import type { OpenTypeFont } from './open-type-font.js';
import type { Subset } from './subset/subset.js';
import type { avarTable } from './tables/avar.js';
import type { BASETable } from './tables/BASE.js';
import type { bslnTable } from './tables/bsln.js';
import type { COLRTable } from './tables/COLR.js';
import type { CPALTable } from './tables/CPAL.js';
import type { cmapTable } from './tables/cmap.js';
import type { cvtTable } from './tables/cvt.js';
import type { DSIGTable } from './tables/DSIG.js';
import type { SFNTTableMap } from './tables/directory.js';
import type { EBLCTable } from './tables/EBLC.js';
import type { featTable } from './tables/feat.js';
import type { fpgmTable } from './tables/fpgm.js';
import type { fvarTable } from './tables/fvar.js';
import type { GDEFTable } from './tables/GDEF.js';
import type { GPOSTable } from './tables/GPOS.js';
import type { GSUBTable } from './tables/GSUB.js';
import type { gaspTable } from './tables/gasp.js';
import type { glyfTable } from './tables/glyf.js';
import type { gvarTable } from './tables/gvar.js';
import type { HVARTable } from './tables/HVAR.js';
import type { hdmxTable } from './tables/hdmx.js';
import type { headTable } from './tables/head.js';
import type { hheaTable } from './tables/hhea.js';
import type { hmtxTable } from './tables/hmtx.js';
import type { JSTFTable } from './tables/JSTF.js';
import type { justTable } from './tables/just.js';
import type { kernTable } from './tables/kern.js';
import type { LTSHTable } from './tables/LTSH.js';
import type { locaTable } from './tables/loca.js';
import type { maxpTable } from './tables/maxp.js';
import type { morxTable } from './tables/morx.js';
import type { nameTable } from './tables/name.js';
import type { OS2Table } from './tables/OS2.js';
import type { opbdTable } from './tables/opbd.js';
import type { OpenType } from './tables/opentype.js';
import type { PCLTTable } from './tables/PCLT.js';
import type { postTable } from './tables/post.js';
import type { prepTable } from './tables/prep.js';
import type { sbixTable } from './tables/sbix.js';
import type { VDMXTable } from './tables/VDMX.js';
import type { VORGTable } from './tables/VORG.js';
import type { vheaTable } from './tables/vhea.js';
import type { vmtxTable } from './tables/vmtx.js';
import { AATFont } from './aat/aat-font.js';
import { TrueTypeSubsetFont } from './true-type-subset-font.js';

/**
 * A universal base interface for any font directory (SFNT, WOFF, WOFF2).
 */
export interface SFNTFontDirectory {
	tag: string;
	numTables: number;
	tables: Record<string, any>;
}

/**
 * Baseline interface representing an unvalidated SFNT-based layout.
 * Every table property is considered nullable by default. As a consequence,
 * many properties are possibly `undefined`. You can avoid that by upcasting
 * the font object with {@link SFNTFont.asOpenTypeFont} to an
 * {@link OpenTypeFont}, which guarantees the presence of the 8 core tables,
 * and 0-2 outline tables.
 */
export interface SFNTFont<
	TDirectory extends SFNTFontDirectory = SFNTFontDirectory,
> {
	/**
	 * Tests whether a certain table is present in the font file.
	 *
	 * If you pass a truthy value, as the second parameter, it is also
	 * attempted to load the table. Otherwise, the table will still be lazily
	 * loaded, when it is accessed for the first time.
	 *
	 * @param tag the table name like `cmap`, `OS/2`, or `hmtx`
	 * @param decode specify whether the table should be decoded.
	 */
	hasTable<K extends string = string>(
		tag: K | keyof SFNTTableMap,
		decode?: boolean,
	): boolean;

	/**
	 * Attempts to view this font instance as a strict OpenType font
	 * layout. Returns null, if a structurally required table is missing.
	 *
	 * See {@link OpenTypeFont} for usage instructions!
	 *
	 * If the argument `decode` is true, all tables are attempted to be
	 * decoded. That will throw an exception on failure.
	 *
	 * @param decode - also decode tables
	 * @returns the font with an update
	 */
	asOpenTypeFont(decode?: boolean): OpenTypeFont | null;

	/**
	 * Attempts to view this font as an {@line AATFont}.
	 *
	 * If the argument `decode` is true, all required tables are attempted to be
	 * decoded. That will throw an exception on failure.
	 *
	 * @param decode - also decode tables
	 * @returns the font with an update
	 */
	asAATFont(decode?: boolean): AATFont | null;

	/**
	 * Attempts to view this font as an {@link TrueTypeSubsetFont} font.
	 *
	 * If the argument `decode` is true, all required tables are attempted to be
	 * decoded. That will throw an exception on failure.
	 *
	 * @param decode - also decode tables
	 * @returns the font with an update
	 */
	asTrueTypeSubsetFont(decode?: boolean): TrueTypeSubsetFont | null;

	/**
	 * Character to Glyph Index Mapping Table. Maps characters to internal
	 * glyph indices.
	 */
	cmap: cmapTable.cmap | null;

	/**
	 * Font Header Table. Tracks global typographic metrics, scale grid bounds,
	 * and metadata.
	 */
	head: headTable.head | null;

	/**
	 * Horizontal Header Table. Stores global metric parameters for horizontal
	 * glyph layouts.
	 */
	hhea: hheaTable.hhea | null;

	/**
	 *
	 * Horizontal Metrics Table. Contains advance widths and left side
	 * bearings for all glyphs.
	 */
	hmtx: hmtxTable.hmtx | null;

	/**
	 * Maximum Profile Table. Explicitly defines memory boundaries and total
	 * glyph count constraints.
	 */
	maxp: maxpTable.maxp | null;

	/**
	 * Naming Table. Contains multilingual string records for copyrights,
	 * families, and system IDs.
	 */
	name: nameTable.name | null;

	/**
	 * OS/2 and Windows Metrics Table. Contains subsystem configurations,
	 * weights, and unicode ranges.
	 */
	'OS/2': OS2Table.OS2 | null;

	/**
	 * PostScript Table. Encapsulates printer operational bounds and
	 * memory-tracking metrics.
	 */
	post: postTable.post | null;

	/**
	 * Font Program Table. Contains low-level hints executing instruction sets
	 * across grid points.
	 */
	fpgm: fpgmTable.fpgm | null;

	/**
	 * Index to Location Table. Maps local offsets for binary data streams
	 * resolving glyph outlines.
	 */
	loca: locaTable.loca | null;

	/**
	 * Control Value Program Table. Provides global instructions establishing
	 * variable outline alignment.
	 */
	prep: prepTable.prep | null;
	/**
	 * Control Value Table. Establishes pixel values used by instructions to
	 * control raster adjustments.
	 */
	'cvt ': cvtTable.cvt | null;

	/**
	 * Glyph Data Table. Stores coordinate boundaries outlining standard
	 * TrueType geometric shapes.
	 */
	glyf: glyfTable.glyph | null;

	/**
	 * PostScript Compact Font Format (CFF) Outline Table version 1.
	 */
	cff: CFFFont | null;

	/**
	 * Alternate PostScript Compact Font Format alias mapping.
	 */
	'CFF ': CFFFont | null;

	/**
	 * PostScript Compact Font Format (CFF) Outline Table version 2.
	 */
	CFF2: CFFFont | null;

	/**
	 * Vertical Origin Table. Specifies vertical coordinate origins for dynamic
	 * metrics scaling.
	 */
	VORG: VORGTable.VORG | null;

	/**
	 * Embedded Bitmap Data Table. Stores bitmap images for specific point
	 * sises.
	 */
	EBLC: EBLCTable.EBLC | null;

	/**
	 * Colour Bitmap Data Table. Variant containing colour bitmap raw data
	 * blocks.
	 */
	CBLC: EBLCTable.EBLC | null;

	/**
	 * Standard Bitmap Graphics Table. Embeds raster configurations (PNG/JPEG)
	 * directly within glyph IDs.
	 */
	sbix: sbixTable.sbix | null;

	/**
	 * Colour Table. Outlines layering configurations for multi-coloured vector
	 * icon layouts.
	 */
	COLR: COLRTable.COLR | null;

	/**
	 * Colour Palette Table. Maps index arrays declaring hex colours utilised by
	 * COLR elements.
	 */
	CPAL: CPALTable.CPAL | null;

	/**
	 * Baseline Data Table. Sets alignment values dynamically shifting script
	 * baselines.
	 */
	BASE: BASETable.BASE | null;

	/**
	 * Glyph Definition Table. Categorises glyph types (e.g., base, ligature,
	 * mark) for layout alignment.
	 */
	GDEF: GDEFTable.GDEF | null;

	/**
	 * Glyph Positioning Table. Provides precise metric adjustments handling
	 * kerning and attachment marks.
	 */
	GPOS: GPOSTable.GPOS | null;

	/**
	 * Glyph Substitution Table. Replaces default layouts to process contextual
	 * alternates and ligatures.
	 */
	GSUB: GSUBTable.GSUB | null;

	/**
	 * Justification Table. Provides options for justification adjustments in
	 * complex scripts.
	 */
	JSTF: JSTFTable.JSTF | null;

	/**
	 * Horizontal Variation Metrics Table. Adjusts advance metrics across
	 * design spaces in variable fonts.
	 */
	HVAR: HVARTable.HVAR | null;

	/**
	 * Digital Signature Table. Encapsulates cryptographic signatures
	 * validating binary authenticity.
	 */
	DSIG: DSIGTable.DSIG | null;

	/**
	 * Grid-fitting and Scan-conversion Procedure Table. Optimises text raster
	 * rendering constraints.
	 */
	gasp: gaspTable.gasp | null;

	/**
	 * Horizontal Device Metrics Table. Preserves explicit pixel width mappings
	 * optimising spacing.
	 */
	hdmx: hdmxTable.hdmx | null;

	/**
	 * Kerning Table. Contains traditional pairwise spacing adjustments.
	 */
	kern: kernTable.kern | null;

	/**
	 * Linear Threshold Table. Sets pixel-per-em limits where scaling
	 * instructions degrade.
	 * */
	LTSH: LTSHTable.LTSH | null;

	/**
	 * PCL 5 Table. Contains metrics and command parameters for HP LaserJet
	 * compatibility.
	 * */
	PCLT: PCLTTable.PCLT | null;

	/**
	 * Vertical Device Metrics Table. Preserves explicit vertical pixel height
	 * mappings.
	 * */
	VDMX: VDMXTable.VDMX | null;

	/**
	 * Vertical Header Table. Stores global metric parameters for vertical text
	 * directions.
	 * */
	vhea: vheaTable.vhea | null;

	/**
	 * Vertical Metrics Table. Contains advance heights and top side bearings
	 * for vertical layouts.
	 * */
	vmtx: vmtxTable.vmtx | null;

	/**
	 * Axis Variations Table. Modifies normalised coordinates across axes in
	 * variable fonts.
	 * */
	avar: avarTable.avar | null;

	/**
	 * Baseline Table. Provides baseline shift measurements for multi-script
	 * alignment.
	 * */
	bsln: bslnTable.bsln | null;

	/**
	 * Feature Name Table. Maps AAT feature selectors to localised string
	 * references.
	 * */
	feat: featTable.feat | null;

	/**
	 * Font Variations Table. Declares design axes and instance configurations
	 * in variable fonts.
	 * */
	fvar: fvarTable.fvar | null;

	/**
	 * Glyph Variations Table. Controls structural outline distortion
	 * transformations for variable glyphs.
	 * */
	gvar: gvarTable.gvar | null;

	/**
	 * Justification Table. Provides layout spacing adjustments for AAT
	 * tracking loops.
	 * */
	just: justTable.just | null;

	/**
	 * Extended Glyph Metamorphosis Table. Powers state-machine transformations
	 * substituting AAT items.
	 * */
	morx: morxTable.morx | null;

	/**
	 * Optical Bounds Table. Sets bounding limits to align glyphs based on
	 * visual center points.
	 * */
	opbd: opbdTable.opbd | null;

	/**
	 * The unique PostScript name for this font or `null` if not present.
	 */
	postscriptName: string | null;

	/**
	 * The font's full name, e.g. "Helvetica Bold", or `null` if not present.
	 */
	fullName: string | null;

	/**
	 * The font's family name, e.g. "Helvetica", or `null` if not present.
	 */
	familyName: string | null;

	/**
	 * The font's sub-family, e.g. "Bold", or `null` if not present.
	 */
	subfamilyName: string | null;

	/**
	 * The font's copyright information, or `null` if not present.
	 */
	copyright: string | null;

	/**
	 * The font's version number or `null` if not present.
	 */
	version: string | null;

	/**
	 * The font’s [ascender](https://en.wikipedia.org/wiki/Ascender_(typography)).
	 */
	ascent: number | undefined;

	/**
	 * The font’s [descender](https://en.wikipedia.org/wiki/Descender).
	 */
	descent: number | undefined;

	/**
	 * The line gap, i.e. amount of space that should be included between lines.
	 */
	lineGap: number | undefined;

	/**
	 * The offset from the normal underline position that should be used.
	 */
	underlinePosition: number | undefined;

	/**
	 * The weight of the underline that should be used.
	 */
	underlineThickness: number | undefined;

	/**
	 * If this is an italic font, the angle the cursor should be drawn at to
	 * match the font design.
	 */
	italicAngle: number | undefined;

	/**
	 * The height of capital letters above the baseline.
	 * See [here](https://en.wikipedia.org/wiki/Cap_height) for more details.
	 */
	capHeight: number | undefined;

	/**
	 * The height of lowercase letters in the font.
	 * See [here](https://en.wikipedia.org/wiki/X-height) for more details.
	 */
	xHeight: number;

	/**
	 * The total count of glyph indexes present in the font mapping.
	 */
	numGlyphs: number | undefined;

	/**
	 * The size of the font's internal coordinate grid in units per em.
	 * Defaults to 1000, if all other attempts to calculate the value fail.
	 */
	unitsPerEm: number;

	/**
	 * The font’s bounding box, i.e. the box that encloses all glyphs in the font.
	 */
	bbox: Readonly<BoundingBox> | undefined;

	/**
	 * An array of all of the unicode code points supported by the font.
	 */
	characterSet: number[] | undefined;

	/**
	 * Returns whether there is a glyph in the font for the given unicode code point.
	 *
	 * @param codePoint - the unicode code point
	 * @returns `true` if a glyph is available for the code point, `false` otherwise
	 */
	hasGlyphForCodePoint(codePoint: number): boolean;

	/**
	 * Maps a single unicode code point to a Glyph object.
	 * Does not perform any advanced substitutions.
	 *
	 * @param codePoint - the unicode code point
	 * @returns the corresponding glyph
	 */
	glyphForCodePoint(codePoint: number): Glyph | null;

	/**
	 * Returns an array of Glyph objects for the given string.
	 * This is only a static one-to-one mapping from characters to glyphs.
	 *
	 * @param str the string to encode
	 * @returns the corresponding glyphs
	 */
	glyphsForString(str: string): Glyph[];

	/**
	 * The shaping engine matching text scripts to font tables. */
	layoutEngine: LayoutEngine;

	/**
	 * Returns a GlyphRun object, which includes an array of Glyphs and
	 * GlyphPositions for the given string.
	 *
	 * @param str the string to encode
	 * @param userFeatures an array of OpenType feature tags to be applied in addition to the default set.
	 * @param script the script of the string
	 * @param language the language of the string
	 * @param direction the writing direction for the string
	 * @returns the rendered string as a GlyphRun
	 */
	layout(
		str: string,
		userFeatures?: OpenType.Features | OpenType.FeatureTag[],
		script?: string,
		language?: string,
		direction?: BidiDirection,
	): GlyphRun;

	/**
	 * Returns an array of strings that map to the given glyph id.
	 * @param gid - the glyph id
	 */
	stringsForGlyph(gid: number): string[];

	/**
	 * Returns an array of alternative unicode mapping arrays tied to a
	 * specific glyph ID.
	 */
	codePointsForGlyph(gid: number): number[];

	/**
	 * An array of all OpenType feature tags supported by the font.
	 */
	availableFeatures: OpenType.FeatureTag[];

	/**
	 * An array of all OpenType feature tags supported by the font for a given
	 * script and language.
	 */
	getAvailableFeatures(
		script: Script.UnicodeScript,
		language?: string,
	): OpenType.FeatureTag[];

	/**
	 * Matches an overarching composite base target index parsing complex
	 * structures.
	 */
	getBaseGlyph(glyph: number, characters?: readonly number[]): Glyph | null;

	/**
	 * Returns a glyph object for the given glyph id.
	 *
	 * @param glyph the glyph id
	 * @param characters an array of code points this glyph represents
	 * @returns the corresponding glyph
	 */
	getGlyph(glyph: number, characters?: readonly number[]): Glyph | null;

	/**
	 * Creates an empty layout subset utilizing this font structure as its
	 * baseline data map.
	 */
	createSubset(): Subset;

	/**
	 * The structural binary wrapper tracking offset blocks and table pointers.
	 */
	directory: TDirectory;

	/**
	 * The raw input stream reading binary payload slices.
	 */
	stream: r.DecodeStream;

	/**
	 * Extracts a raw readable segment slice targetting vector outline
	 * definitions.
	 */
	getGlyfTableStream(): r.DecodeStream | null;
}
