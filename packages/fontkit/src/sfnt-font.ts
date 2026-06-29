import type { DecodeStream, FieldT } from '@pdf-lib/restructure';
import r from '@pdf-lib/restructure';
import fontkit from './base.js';
import type CFFFont from './cff/cff-font.js';
import CmapProcessor from './cmap-processor.js';
import { FatalFontError } from './fatal-font-error.js';
import type {
	Font,
	NamedVariation,
	NamedVariations,
	VariationAxes,
	VariationAxis,
	VariationCoordinates,
	VariationSettings,
} from './font.js';
import BoundingBox from './glyph/bounding-box.js';
import CFFGlyph from './glyph/cff-glyph.js';
import COLRGlyph from './glyph/colr-glyph.js';
import type Glyph from './glyph/glyph.js';
import GlyphVariationProcessor from './glyph/glyph-variation-processor.js';
import SBIXGlyph from './glyph/sbix-glyph.js';
import TTFGlyph from './glyph/ttf-glyph.js';
import type GlyphRun from './layout/glyph-run.js';
import type { BidiDirection } from './layout/glyph-run.js';
import LayoutEngine from './layout/layout-engine.js';
import type * as Script from './layout/script.js';
import type { BaseFontDirectory, NullFont } from './null-font.js';
import type { OpenTypeFont } from './open-type-font.js';
import {
	requiredOpenTypeCFF1Tables,
	requiredOpenTypeCFF2Tables,
	requiredOpenTypeTables,
	requiredOpenTypeTrueTypeTables,
} from './open-type-font.js';
import CFFSubset from './subset/cff-subset.js';
import type Subset from './subset/subset.js';
import TTFSubset from './subset/ttf-subset.js';
import type { AAT } from './tables/aat.js';
import type { SFNTDirectoryEntry, SFNTTableMap } from './tables/directory.js';
import Directory from './tables/directory.js';
import tables from './tables/index.js';
import type { nameTable } from './tables/name.js';
import type { OpenType } from './tables/opentype.js';

export type LayoutFeatures = OpenType.Features | AAT.Features;

export type LayoutFeatureTag = OpenType.FeatureTag | AAT.FeatureTag;
export interface FontAxis {
	axisTag: string;
	minValue: number;
	defaultValue: number;
	maxValue: number;
}

/**
 * The names of the 8 baseline tables strictly required for an OpenType
 * font program file to be considered valid according to the structural
 * specification.
 */
export const coreTableKeys = [
	'cmap',
	'head',
	'hhea',
	'hmtx',
	'maxp',
	'name',
	'OS/2',
	'post',
] as const;

/**
 * The literał union type representing the names of the core required OpenType
 * tables.
 */
export type CoreTableKey = (typeof coreTableKeys)[number];

/**
 * Internal map of core tables enforced as non-optional.
 */
export type CoreTables = Required<Pick<SFNTTableMap, CoreTableKey>>;

/**
 * An object map representing optional extension tables (like GSUB, GPOS, or
 * VORG).
 */
export type ExtensionTables = Omit<SFNTTableMap, CoreTableKey>;

/**
 * Supported SFNT Binary Tables.
 * This handles merging the strict, guaranteed core tables together with the
 * optional peripheral layout and font mapping registries.
 */
export type FontTableField = CoreTables & ExtensionTables;

export interface SFNTFont<
	TDirectory extends BaseFontDirectory = BaseFontDirectory,
> extends Font,
		FontTableField {
	directory: TDirectory;
}

/**
 * This is the base class for all SFNT-based font formats in fontkit.
 * It supports TrueType, and PostScript glyphs, and several color glyph formats.
 */
// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Merged with FontTableFields to map table layout properties dynamically via the constructor loop.
export class SFNTFont<TDirectory extends BaseFontDirectory = BaseFontDirectory>
	implements NullFont
{
	public stream: DecodeStream;
	private variationCoords: number[] | null;
	private directoryPos: number;
	private tables: SFNTTableMap = {} as SFNTTableMap;
	protected glyphs: Record<number, Glyph> = {};
	public directory: TDirectory;

	// Those variables are lazily instantiated by their respctive getters, and
	// then frozen.
	private _bbox!: Readonly<BoundingBox>;
	private _characterSet!: number[];
	private _cmapProcessor!: CmapProcessor;
	private _layoutEngine!: LayoutEngine;
	private _variationAxes!: VariationAxes;
	private _namedVariations!: NamedVariations;
	private _variationProcessor!: GlyphVariationProcessor | null;

	public outlines = '';
	public outlineVersion = 0;

	// Infers all other table properties (cmap, head, OS/2, etc.) via the
	// interface heritage.
	[key: string]: any;

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
		this.tables = {} as SFNTTableMap;
		this.glyphs = {};
		this.directory = this.decodeDirectory();

		const existingTableTags = new Set<string>();

		// Define properties for each table to lazily parse.
		for (const tag in tables) {
			Object.defineProperty(this, tag, {
				get: () => this.getTable(entry),
			});

			const entry = this.directory.tables[tag];
			if (entry && tables[tag as keyof typeof tables] && entry.length > 0) {
				existingTableTags.add(tag);
			}
		}

		if (
			requiredOpenTypeTables.every((tag) => existingTableTags.has(tag))
		) {
			if (
				requiredOpenTypeTrueTypeTables.every((tag) =>
					existingTableTags.has(tag),
				)
			) {
				this.outlines = 'TrueType';
				this.outlineVersion = 1;
			} else if (
				requiredOpenTypeCFF2Tables.every((tag) =>
					existingTableTags.has(tag),
				)
			) {
				this.outlines = 'PostScript';
				this.outlineVersion = 2;
			} else if (
				requiredOpenTypeCFF1Tables.every((tag) =>
					existingTableTags.has(tag),
				)
			) {
				this.outlines = 'PostScript';
				this.outlineVersion = 1;
			} else {
				this.outlines = 'none';
			}
		} else {
			this.outlines = '';
		}
	}

	/**
	 * Alias for the table 'CFF ';
	 */
	public get cff(): CFFFont | null {
		return this['CFF '];
	}

	private getTable<K extends keyof SFNTTableMap>(
		table: SFNTDirectoryEntry,
	): SFNTTableMap[K] | null {
		if (!table) {
			return null;
		}

		const tables = this.tables as Record<
			keyof SFNTTableMap,
			SFNTTableMap[keyof SFNTTableMap] | null
		>;
		const tag = table.tag as keyof SFNTTableMap;
		if (!(tag in tables)) {
			try {
				tables[tag] = this.decodeTable(table);
			} catch (e) {
				// Avoid retrying the failed decode attempt.
				tables[tag] = null;

				if (fontkit.logErrors) {
					console.error(`Error decoding table ${table.tag}: ${e}`);
					if (e instanceof Error) {
						console.error(e.stack);
					} else {
						console.error(e);
					}
				}

				if (e instanceof FatalFontError) {
					throw e;
				}
			}
		}

		if (!tables[tag]) return null;

		return tables[tag] as SFNTTableMap[K];
	}

	protected getTableStream(tag: string): DecodeStream | null {
		const table = this.directory.tables[tag];
		if (table) {
			this.stream.pos = table.offset;
			return this.stream;
		}

		return null;
	}

	public getGlyfTableStream(): DecodeStream | null {
		return this.getTableStream('glyf');
	}

	protected decodeDirectory(): TDirectory {
		return Directory.decode(this.stream, {
			_startOffset: 0,
		} as FieldT<unknown>) as unknown as TDirectory;
	}

	protected decodeTable<K extends keyof typeof tables>(
		table: SFNTDirectoryEntry,
	): ReturnType<(typeof tables)[K]['decode']> {
		const pos = this.stream.pos;
		const stream = this.getTableStream(table.tag);

		if (table.tag in tables && stream) {
			try {
				const tag = table.tag as K;
				const result = tables[tag].decode(
					stream,
					this as unknown as FieldT<unknown>,
					table.length,
				);

				return result as ReturnType<(typeof tables)[K]['decode']>;
			} catch (e) {
				throw new FatalFontError(
					`Corrupt table '${table.tag}': ${e}`,
					table.tag,
				);
			} finally {
				this.stream.pos = pos;
			}
		}

		throw new FatalFontError(
			`Unsupported font table tag: ${table.tag}`,
			table.tag,
		);
	}

	/**
	 * The unique PostScript name for this font.
	 * @returns the PostScript name or `null` if not present.
	 */
	get postscriptName(): string | null {
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
	protected getName(
		key: keyof nameTable.ProcessedRecords,
		lang = 'en',
	): string | null {
		const record = this.name.records[key];
		if (record) {
			return (record as Record<string, string>)[lang];
		}

		return null;
	}

	/**
	 * The font's full name, e.g. "Helvetica Bold".
	 * @returns the full name or `null` if not present.
	 */
	get fullName(): string | null {
		return this.getName('fullName');
	}

	/**
	 * The font's family name, e.g. "Helvetica".
	 * @returns the family name or `null` if not present.
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
	 * @returns the copright information or `null` if not present.
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
		// The partial exposure of the OS/2 table will be fixed later.
		return os2 ? (os2 as any).capHeight : this.ascent;
	}

	/**
	 * The height of lowercase letters in the font.
	 * See [here](https://en.wikipedia.org/wiki/X-height) for more details.
	 * @returns the height of the lowercase letters
	 */
	get xHeight() {
		const os2 = this['OS/2'];
		return os2 ? (os2 as any).xHeight : 0;
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
				new BoundingBox(
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
		if (typeof this._characterSet === 'undefined')
			this._characterSet = this.cmapProcessor.getCharacterSet();

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

	public get layoutEngine(): LayoutEngine {
		if (typeof this._layoutEngine === 'undefined') {
			this._layoutEngine = new LayoutEngine(this);
		}

		return this._layoutEngine;
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
	public layout(
		str: string,
		userFeatures?: OpenType.Features | OpenType.FeatureTag[],
		script?: string,
		language?: string,
		direction?: BidiDirection,
	): GlyphRun {
		return this.layoutEngine.layout(
			str,
			userFeatures ?? [],
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
		return this.layoutEngine.stringsForGlyph(gid);
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
	get availableFeatures(): OpenType.FeatureTag[] {
		return this.layoutEngine.getAvailableFeatures();
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
		script: Script.UnicodeScript,
		language?: string,
	): OpenType.FeatureTag[] {
		return this.layoutEngine.getAvailableFeatures(script, language);
	}

	public getBaseGlyph(
		glyph: number,
		characters: readonly number[] = [],
	): Glyph | null {
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

		return this.glyphs[glyph] ?? null;
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
	public getGlyph(glyph: number, characters: readonly number[] = []): Glyph {
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
				this.getBaseGlyph(glyph, characters);
			}
		}

		return this.glyphs[glyph] ?? null;
	}

	/**
	 * Creates a Subset of this font.
	 * @returns the empty subset
	 */
	public createSubset(): Subset {
		if (this.directory.tables['CFF ']) {
			return new CFFSubset(this);
		}

		return new TTFSubset(this);
	}

	private computeVariationAxes() {
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
			this._variationAxes = this.computeVariationAxes();
		}

		return this._variationAxes;
	}

	private computeNamedVariations(): NamedVariations {
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
			this._namedVariations = this.computeNamedVariations();
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
	public getVariation(settings: string | VariationCoordinates): Font {
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

		const font = new SFNTFont<TDirectory>(stream, coords);
		font.tables = this.tables;

		return font as unknown as Font;
	}

	private computeVariationProcessor(): GlyphVariationProcessor | null {
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

		return new GlyphVariationProcessor(this, variationCoords ?? []);
	}

	public get variationProcessor(): GlyphVariationProcessor | null {
		if (typeof this._variationProcessor === 'undefined') {
			this._variationProcessor = this.computeVariationProcessor();
		}

		return this._variationProcessor;
	}

	/**
	 * The font variation by variation name.
	 * @param name the variation name
	 * @returns the font
	 */
	public getFont(name: string): Font {
		return this.getVariation(name);
	}

	public hasTable<K extends string = string>(
		tag: K | keyof SFNTTableMap,
		decode?: boolean,
	): boolean {
		const entry = this.directory.tables[tag];
		if (!entry) return false;

		if (decode) {
			if (!(tag in tables) || entry.length === 0) return false;
			if (!this.getTable(entry)) return false;
		}

		return true;
	}

	public asOpenTypeFont(decode = false): OpenTypeFont | null {
		if (this.outlines === '') return null;

		if (decode) {
			let tags: string[];

			if (this.outlines === 'TrueType') {
				tags = [...requiredOpenTypeTrueTypeTables];
			} else if (this.outlines === 'PostScript') {
				if (this.outlineVersion === 1) {
					tags = [...requiredOpenTypeCFF1Tables];
				} else {
					tags = [...requiredOpenTypeCFF2Tables];
				}
			} else {
				tags = [...requiredOpenTypeTables];
			}

			for (let i = 0; i < tags.length; ++i) {
				const tag = tags[i];
				if (!this.getTable(this.directory.tables[tag])) {
					return null;
				}
			}
		}

		return this as OpenTypeFont;
	}
}
