import type { DecodeStream, FieldT } from '@pdf-lib/restructure';
import r from '@pdf-lib/restructure';
import fontkit from './base.js';
import CmapProcessor from './CmapProcessor.js';
import type {
	Font,
	NamedVariation,
	NamedVariations,
	VariationAxes,
	VariationAxis,
	VariationCoordinates,
	VariationSettings,
} from './font.js';
import BBox from './glyph/bbox.js';
import CFFGlyph from './glyph/CFFGlyph.js';
import COLRGlyph from './glyph/COLRGlyph.js';
import GlyphVariationProcessor from './glyph/GlyphVariationProcessor.js';
import type Glyph from './glyph/glyph.js';
import SBIXGlyph from './glyph/SBIXGlyph.js';
import TTFGlyph from './glyph/TTFGlyph.js';
import LayoutEngine from './layout/LayoutEngine.js';
import CFFSubset from './subset/CFFSubset.js';
import type Subset from './subset/Subset.js';
import TTFSubset from './subset/TTFSubset.js';
import type {
	FilteredTableMap,
	SFNTDirectoryTable,
	SFNTTable,
	SFNTTableMap,
} from './tables/directory.js';
import Directory from './tables/directory.js';
import type { HVARTable } from './tables/HVAR.js';
import type { HheaTable } from './tables/hhea.js';
import tables from './tables/index.js';
import type { PostTable } from './tables/post.js';
import type { TypeFeatures } from './types/features.js';

export interface FontAxis {
	axisTag: string;
	minValue: number;
	defaultValue: number;
	maxValue: number;
}

/**
 * This is the base class for all SFNT-based font formats in fontkit.
 * It supports TrueType, and PostScript glyphs, and several color glyph formats.
 */
export class SFNTFont<
	TDirectoryTable extends SFNTDirectoryTable = SFNTDirectoryTable,
> implements Font {
	public stream: DecodeStream;
	private variationCoords: number[] | null;
	private directoryPos: number;
	private tables: SFNTTableMap = {};
	protected glyphs: Record<number, Glyph> = {};
	protected directory: TDirectoryTable;

	// Those variables are lazily instantiated by their respctive getters, and
	// then frozen.
	private _bbox!: Readonly<BBox>;
	private _characterSet!: number[];
	private _cmapProcessor!: CmapProcessor;
	__layoutEngine!: LayoutEngine;
	private _variationAxes!: VariationAxes;
	private _namedVariations!: NamedVariations;
	__variationProcessor!: GlyphVariationProcessor | null;

	// Tables.
	public cmap: FilteredTableMap['cmap'];
	public head: FilteredTableMap['head'];
	public hhea!: HheaTable;
	public hmtx!: FilteredTableMap['hmtx'];
	public maxp: FilteredTableMap['maxp'];
	public name: FilteredTableMap['name'];
	public 'OS/2': FilteredTableMap['OS/2'];
	public post!: PostTable;
	public fpgm?: FilteredTableMap['fpgm'];
	public loca: FilteredTableMap['loca'];
	public prep: FilteredTableMap['prep'];
	public 'cvt '?: FilteredTableMap['cvt '];
	public glyf?: FilteredTableMap['glyf'];
	cff!: FilteredTableMap['CFF '];
	public CFF2?: FilteredTableMap['CFF2'];
	public VORG?: FilteredTableMap['VORG'];
	public EBLC?: FilteredTableMap['EBLC'];
	public CBLC?: FilteredTableMap['CBLC'];
	public sbix?: FilteredTableMap['sbix'];
	public COLR?: FilteredTableMap['COLR'];
	public CPAL?: FilteredTableMap['CPAL'];
	public BASE?: FilteredTableMap['BASE'];
	public GDEF?: FilteredTableMap['GDEF'];
	public GPOS?: FilteredTableMap['GPOS'];
	public GSUB?: FilteredTableMap['GSUB'];
	public JSTF?: FilteredTableMap['JSTF'];
	public HVAR!: HVARTable;
	public DSIG?: FilteredTableMap['DSIG'];
	public gasp?: FilteredTableMap['gasp'];
	public hdmx?: FilteredTableMap['hdmx'];
	public kern?: FilteredTableMap['kern'];
	public LTSH?: FilteredTableMap['LTSH'];
	public PCLT?: FilteredTableMap['PCLT'];
	public VDMX?: FilteredTableMap['VDMX'];
	public vhea?: FilteredTableMap['vhea'];
	public vmtx?: FilteredTableMap['vmtx'];
	public avar?: FilteredTableMap['avar'];
	public bsln?: FilteredTableMap['bsln'];
	public feat?: FilteredTableMap['feat'];
	public fvar?: FilteredTableMap['fvar'];
	public gvar?: FilteredTableMap['gvar'];
	public just?: FilteredTableMap['just'];
	public morx?: FilteredTableMap['morx'];
	public opbd?: FilteredTableMap['opbd'];

	public static probe(buffer: Buffer): boolean {
		const format = buffer.toString('ascii', 0, 4);
		return (
			format === 'true' ||
			format === 'OTTO' ||
			format === String.fromCharCode(0, 1, 0, 0)
		);
	}

	constructor(stream: DecodeStream, variationCoords: number[] | null = null) {
		this.stream = stream;
		this.variationCoords = variationCoords;

		this.directoryPos = this.stream.pos;
		this.tables = {};
		this.glyphs = {};
		this.directory = this.decodeDirectory();

		// define properties for each table to lazily parse
		for (const tag in this.directory.tables) {
			const table = this.directory.tables[tag];
			if (
				table &&
				(tables as Record<string, unknown>)[tag] &&
				table.length > 0
			) {
				Object.defineProperty(this, tag, {
					get: this._getTable.bind(this, table),
				});
			}
		}
	}

	_getTable(table: SFNTTable): SFNTTable | null {
		if (!(table.tag in this.tables)) {
			try {
				this.tables[table.tag] = this._decodeTable(table);
			} catch (e) {
				// Avoid retrying the failed decode attempt.
				this.tables[table.tag] = null;
				if (fontkit.logErrors) {
					console.error(`Error decoding table ${table.tag}`);
					if (e instanceof Error) {
						console.error(e.stack);
					} else {
						console.error(e);
					}
				}
			}
		}

		return this.tables[table.tag];
	}

	_getTableStream(tag: string): DecodeStream | null {
		const table = this.directory.tables[tag];
		if (table) {
			this.stream.pos = table.offset;
			return this.stream;
		}

		return null;
	}

	protected decodeDirectory(): TDirectoryTable {
		return Directory.decode(this.stream, {
			_startOffset: 0,
		} as FieldT<unknown>) as TDirectoryTable;
	}

	_decodeTable(table: SFNTTable) {
		const pos = this.stream.pos;
		const stream = this._getTableStream(table.tag);

		if (table.tag in tables && stream) {
			const tag = table.tag as keyof typeof tables;
			const result = tables[tag].decode(
				stream,
				this as unknown as FieldT<unknown>,
				table.length,
			);
			this.stream.pos = pos;
			return result;
		}

		this.stream.pos = pos;

		throw new Error(`Unsupported font table tag: ${table.tag}`);
	}

	/**
	 * The unique PostScript name for this font.
	 * @returns the PostScript name or `null` if not present.
	 */
	get postscriptName() {
		const name = this.name.records.postscriptName;
		if (name) {
			const lang = Object.keys(name)[0];
			return name[lang];
		}

		return null;
	}

	/**
	 * Gets a string from the font's `name` table
	 * `lang` is a BCP-47 language code.
	 * @returns the table entry or `null` if not present.
	 */
	getName(key: string, lang = 'en'): string | null {
		const record = this.name.records[key];
		if (record) {
			return record[lang];
		}

		return null;
	}

	/**
	 * The font's full name, e.g. "Helvetica Bold".
	 * @returns the full noame or `null` if not present.
	 */
	get fullName(): string | null {
		return this.getName('fullName');
	}

	/**
	 * The font's family name, e.g. "Helvetica".
	 * @returns the family name of `null` if not present.
	 */
	get familyName(): string | null {
		return this.getName('fontFamily');
	}

	/**
	 * The font's sub-family, e.g. "Bold".
	 * @returns the sub-family or `null` if not present.
	 */
	get subfamilyName(): string | null {
		return this.getName('fontSubfamily');
	}

	/**
	 * The font's copyright information.
	 * @@returns the copright information or `null` if not present.
	 */
	get copyright(): string | null {
		return this.getName('copyright');
	}

	/**
	 * The font's version number.
	 * @returns the version number or `null` if not present.
	 */
	get version(): string | null {
		return this.getName('version');
	}

	/**
	 * The font’s
	 * [ascender](https://en.wikipedia.org/wiki/Ascender_(typography)).
	 * @returns the ascender.
	 */
	get ascent(): number {
		return this.hhea.ascent;
	}

	/**
	 * The font’s
	 * [descender](https://en.wikipedia.org/wiki/Descender).
	 * @returns the descender
	 */
	get descent() {
		return this.hhea.descent;
	}

	/**
	 * The amount of space that should be included between lines.
	 * @returns the line gap
	 */
	get lineGap(): number {
		return this.hhea.lineGap;
	}

	/**
	 * The offset from the normal underline position that should be used.
	 * @returns the offset
	 */
	get underlinePosition(): number {
		return this.post.underlinePosition;
	}

	/**
	 * The weight of the underline that should be used.
	 * @returns the underline weight
	 */
	get underlineThickness() {
		return this.post.underlineThickness;
	}

	/**
	 * If this is an italic font, the angle the cursor should be drawn at to
	 * match the font design.
	 * @returns the italic angle
	 */
	get italicAngle(): number {
		return this.post.italicAngle;
	}

	/**
	 * The height of capital letters above the baseline.
	 * See [here](https://en.wikipedia.org/wiki/Cap_height) for more details.
	 * @returns the capital letter height.
	 */
	get capHeight() {
		const os2 = this['OS/2'];
		return os2 ? os2.capHeight : this.ascent;
	}

	/**
	 * The height of lowercase letters in the font.
	 * See [here](https://en.wikipedia.org/wiki/X-height) for more details.
	 * @returns the height of the lowercase letters
	 */
	get xHeight() {
		const os2 = this['OS/2'];
		return os2 ? os2.xHeight : 0;
	}

	/**
	 * The number of glyphs in the font.
	 * @returns the number of glyphs
	 */
	get numGlyphs(): number {
		return this.maxp.numGlyphs;
	}

	/**
	 * The size of the font’s internal coordinate grid.
	 * @returns the units per em
	 */
	get unitsPerEm() {
		return this.head.unitsPerEm;
	}

	/**
	 * The font’s bounding box, i.e. the box that encloses all glyphs in the
	 * font.
	 * @returns the bbox
	 */
	get bbox() {
		if (typeof this._bbox === 'undefined') {
			this._bbox = Object.freeze(
				new BBox(
					this.head.xMin,
					this.head.yMin,
					this.head.xMax,
					this.head.yMax,
				),
			);
		}

		return this._bbox;
	}

	private get cmapProcessor(): CmapProcessor {
		if (typeof this._cmapProcessor === 'undefined') {
			this._cmapProcessor = new CmapProcessor(this.cmap);
		}

		return this._cmapProcessor;
	}

	/**
	 * An array of all of the unicode code points supported by the font.
	 * @return all unicode code points
	 */
	get characterSet(): number[] {
		if (typeof this._characterSet === 'undefined') {
			this._characterSet = this.cmapProcessor.getCharacterSet();
		}

		return this._characterSet;
	}

	/**
	 * Returns whether there is glyph in the font for the given unicode code point.
	 *
	 * @param - the unicode code point
	 * @returns `true` if a glyph is available for the code point, `false` otherwise
	 */
	hasGlyphForCodePoint(codePoint: number): boolean {
		return !!this.cmapProcessor.lookup(codePoint);
	}

	/**
	 * Maps a single unicode code point to a Glyph object.
	 * Does not perform any advanced substitutions (there is no context to do
	 * so).
	 *
	 * @param codePoint - the unicode code point
	 * @returns the corresponding glyph
	 */
	glyphForCodePoint(codePoint: number): Glyph {
		// FIXME! Get rid of the cast to never!
		return this.getGlyph(this.cmapProcessor.lookup(codePoint), [
			codePoint,
		] as never);
	}

	/**
	 * Returns an array of Glyph objects for the given string.
	 * This is only a one-to-one mapping from characters to glyphs.
	 * For most uses, you should use font.layout (described below), which
	 * provides a much more advanced mapping supporting AAT and OpenType shaping.
	 *
	 * @param str the string to encode
	 * @returns the corresponding glyphs
	 */
	glyphsForString(str: string): Glyph[] {
		const glyphs = [];
		const len = str.length;
		let idx = 0;
		let last = -1;
		let state = -1;

		while (idx <= len) {
			let code = 0;
			let nextState = 0;

			if (idx < len) {
				// Decode the next codepoint from UTF 16
				code = str.charCodeAt(idx++);
				if (0xd800 <= code && code <= 0xdbff && idx < len) {
					const next = str.charCodeAt(idx);
					if (0xdc00 <= next && next <= 0xdfff) {
						idx++;
						code = ((code & 0x3ff) << 10) + (next & 0x3ff) + 0x10000;
					}
				}

				// Compute the next state: 1 if the next codepoint is a variation selector, 0 otherwise.
				nextState =
					(0xfe00 <= code && code <= 0xfe0f) ||
					(0xe0100 <= code && code <= 0xe01ef)
						? 1
						: 0;
			} else {
				idx++;
			}

			if (state === 0 && nextState === 1) {
				// Variation selector following normal codepoint.
				glyphs.push(
					// FIXME! Get rid of the cast!
					this.getGlyph(this.cmapProcessor.lookup(last, code), [
						last,
						code,
					] as never),
				);
			} else if (state === 0 && nextState === 0) {
				// Normal codepoint following normal codepoint.
				glyphs.push(this.glyphForCodePoint(last));
			}

			last = code;
			state = nextState;
		}

		return glyphs;
	}

	get _layoutEngine(): LayoutEngine {
		if (typeof this.__layoutEngine === 'undefined') {
			this.__layoutEngine = new LayoutEngine(this);
		}

		return this.__layoutEngine;
	}

	/**
	 * Returns a GlyphRun object, which includes an array of Glyphs and
	 * GlyphPositions for the given string.
	 *
	 * @param str the string to encode
	 * @param features an array of OpenType feature tags to be applied
	 * in addition to the default set. If this is an AAT font, the OpenType
	 * feature tags are mapped to AAT features.
	 * @param script the script of the string
	 * @param language the language of the string
	 * @param direction the writing directory for the string
	 * @returns the rendered string
	 */
	layout(
		str: string,
		userFeatures?: TypeFeatures | (keyof TypeFeatures)[],
		script?: string | null,
		language?: string | null,
		direction?: string | null,
	) {
		return this._layoutEngine.layout(
			str,
			userFeatures,
			script,
			language,
			direction,
		);
	}

	/**
	 * Returns an array of strings that map to the given glyph id.
	 * @param gid - the glyph id
	 */
	stringsForGlyph(gid: number): string[] {
		return this._layoutEngine.stringsForGlyph(gid);
	}

	codePointsForGlyph(gid: number): number[] {
		return this.cmapProcessor.codePointsForGlyph(gid);
	}

	/**
	 * An array of all [OpenType feature
	 * tags](https://www.microsoft.com/typography/otspec/featuretags.htm) (or
	 * mapped AAT tags) supported by the font.
	 *
	 * The features parameter is an array of OpenType feature tags to be
	 * applied in addition to the default set.
	 *
	 * If this is an AAT font, the OpenType feature tags are mapped to AAT
	 * features.
	 *
	 * @returns the supported features
	 */
	get availableFeatures(): (keyof TypeFeatures)[] {
		return this._layoutEngine.getAvailableFeatures();
	}

	/**
	 * An array of all [OpenType feature
	 * tags](https://www.microsoft.com/typography/otspec/featuretags.htm) (or
	 * mapped AAT tags) supported by the font for a given script and
	 * language.
	 *
	 * The features parameter is an array of OpenType feature tags to be
	 * applied in addition to the default set.
	 *
	 * If this is an AAT font, the OpenType feature tags are mapped to AAT
	 * features.
	 *
	 * @returns the supported features
	 */
	getAvailableFeatures(
		script: string,
		language?: string,
	): (keyof TypeFeatures)[] {
		return this._layoutEngine.getAvailableFeatures(script, language);
	}

	_getBaseGlyph(glyph: number, characters: number[] = []): Glyph | null {
		if (!this.glyphs[glyph]) {
			if (this.directory.tables.glyf) {
				this.glyphs[glyph] = new TTFGlyph(
					glyph,
					characters,
					this as never,
				) as Glyph;
			} else if (this.directory.tables['CFF '] || this.directory.tables.CFF2) {
				this.glyphs[glyph] = new CFFGlyph(
					glyph,
					characters,
					this as never,
				) as Glyph;
			}
		}

		return this.glyphs[glyph] || null;
	}

	/**
	 * Returns a glyph object for the given glyph id.
	 * You can pass the array of code points this glyph represents for
	 * your use later, and it will be stored in the glyph object.
	 *
	 * @param glyph the glyph id
	 * @param characters an array of code points this glyph represents
	 * @returns the corresponding glyph
	 */
	getGlyph(glyph: number, characters: number[] = []): Glyph {
		if (!this.glyphs[glyph]) {
			// FIXME! Get rid of the casts!
			if (this.directory.tables.sbix) {
				this.glyphs[glyph] = new SBIXGlyph(
					glyph,
					characters,
					this as never,
				) as Glyph;
			} else if (this.directory.tables.COLR && this.directory.tables.CPAL) {
				this.glyphs[glyph] = new COLRGlyph(
					glyph,
					characters,
					this as never,
				) as Glyph;
			} else {
				this._getBaseGlyph(glyph, characters);
			}
		}

		return this.glyphs[glyph] || null;
	}

	/**
	 * Creates a Subset of this font.
	 * @returns the empty subset
	 */
	createSubset(): Subset {
		if (this.directory.tables['CFF ']) {
			return new CFFSubset(this);
		}

		return new TTFSubset(this);
	}

	_computeVariationAxes() {
		const res: VariationAxes = {};
		if (!this.fvar) {
			return res;
		}

		for (const axis of this.fvar.axis) {
			res[axis.axisTag.trim() as 'wght' | 'wdth'] = {
				name: axis.name.en,
				min: axis.minValue,
				default: axis.defaultValue,
				max: axis.maxValue,
			} as VariationAxis;
		}

		return res;
	}

	/**
	 * Returns an object describing the available variation axes
	 * that this font supports. Keys are setting tags, and values
	 * contain the axis name, range, and default value.
	 *
	 * @returns the variation axes
	 */
	get variationAxes(): VariationAxes {
		if (typeof this._variationAxes === 'undefined') {
			this._variationAxes = this._computeVariationAxes();
		}

		return this._variationAxes;
	}

	_computeNamedVariations(): NamedVariations {
		const res: NamedVariations = {};
		if (!this.fvar) {
			return res;
		}

		for (const instance of this.fvar.instance) {
			const settings: NamedVariation = {};
			for (let i = 0; i < this.fvar.axis.length; i++) {
				const axis = this.fvar.axis[i];
				settings[axis.axisTag.trim()] = instance.coord[i];
			}

			res[instance.name.en] = settings;
		}

		return res;
	}

	/**
	 * Returns an object describing the named variation instances
	 * that the font designer has specified. Keys are variation names
	 * and values are the variation settings for this instance.
	 *
	 * @returns the named variations
	 */
	get namedVariations(): NamedVariations {
		if (typeof this._namedVariations === 'undefined') {
			this._namedVariations = this._computeNamedVariations();
		}

		return this._namedVariations;
	}

	/**
	 * Returns a new font with the given variation settings applied.
	 * Settings can either be an instance name, or an object containing
	 * variation tags as specified by the `variationAxes` property.
	 *
	 * @param settings the instance name or variation settings
	 * @returns the generated font
	 */
	getVariation(settings: string | VariationCoordinates): SFNTFont<TDirectoryTable> {
		if (
			!(
				this.directory.tables.fvar &&
				((this.directory.tables.gvar && this.directory.tables.glyf) ||
					this.directory.tables.CFF2)
			)
		) {
			throw new Error(
				'Variations require a font with the fvar, gvar and glyf, or CFF2 tables.',
			);
		}

		let resolvedSettings: VariationSettings | undefined;
		if (typeof settings === 'string') {
			resolvedSettings = this.namedVariations[settings];
		} else {
			resolvedSettings = settings;
		}

		// Check for null/undefined since typeof null === 'object' in JS/TS
		if (!resolvedSettings || typeof resolvedSettings !== 'object') {
			throw new Error(
				'Variation settings must be either a variation name or settings object.',
			);
		}

		// Normalise the coordinates.
		const coords = this.fvar.axis.map((axis: FontAxis) => {
			const axisTag = axis.axisTag.trim();
			if (axisTag in resolvedSettings) {
				return Math.max(
					axis.minValue,
					Math.min(axis.maxValue, resolvedSettings[axisTag]),
				);
			} else {
				return axis.defaultValue;
			}
		});

		const stream = new r.DecodeStream(this.stream.buffer);
		stream.pos = this.directoryPos;

		const font = new SFNTFont<TDirectoryTable>(stream, coords);
		font.tables = this.tables;

		return font;
	}

	__computeVariationProcessor(): GlyphVariationProcessor | null {
		if (!this.fvar) {
			return null;
		}

		let variationCoords = this.variationCoords;

		// Ignore if no variation coords and not CFF2
		if (!variationCoords && !this.CFF2) {
			return null;
		}

		if (!variationCoords) {
			variationCoords = this.fvar.axis.map(
				(axis: FontAxis) => axis.defaultValue,
			);
		}

		return new GlyphVariationProcessor(this, variationCoords);
	}

	get _variationProcessor(): GlyphVariationProcessor | null {
		if (typeof this.__variationProcessor === 'undefined') {
			this.__variationProcessor = this.__computeVariationProcessor();
		}

		return this.__variationProcessor;
	}

	/**
	 * The font variation by variationv name.
	 * @param name the variation name
	 * @returns the font
	 */
	getFont(name: string): SFNTFont {
		return this.getVariation(name);
	}
}
