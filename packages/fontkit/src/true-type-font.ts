import r, { DecodeStream, type FieldT } from 'restructure';
import { type AATFont, requiredAATTables } from './aat/aat-font.js';
import { fontkit } from './base.js';
import type { CFFFont } from './cff/cff-font.js';
import { CmapProcessor } from './cmap-processor.js';
import type {
	NamedVariation,
	NamedVariations,
	VariationAxes,
	VariationAxis,
	VariationCoordinates,
	VariationSettings,
} from './font.js';
import { BoundingBox } from './glyph/bounding-box.js';
import { CFFGlyph } from './glyph/cff-glyph.js';
import { COLRGlyph } from './glyph/colr-glyph.js';
import type { Glyph } from './glyph/glyph.js';
import { GlyphVariationProcessor } from './glyph/glyph-variation-processor.js';
import { SBIXGlyph } from './glyph/sbix-glyph.js';
import { TrueTypeGlyph } from './glyph/true-type-glyph.js';
import type { BidiDirection, GlyphRun } from './layout/glyph-run.js';
import { LayoutEngine } from './layout/layout-engine.js';
import type * as Script from './layout/script.js';
import type { OpenTypeFont } from './open-type-font.js';
import {
	requiredOpenTypeCFF1Tables,
	requiredOpenTypeCFF2Tables,
	requiredOpenTypeTables,
	requiredOpenTypeTrueTypeTables,
} from './open-type-font.js';
import type { SFNTFont, SFNTFontDirectory } from './sfnt-font.js';
import { CFFSubset } from './subset/cff-subset.js';
import type { Subset } from './subset/subset.js';
import { TrueTypeSubset } from './subset/true-type-subset.js';
import type { AAT } from './tables/aat.js';
import type { SFNTDirectoryEntry, SFNTTableMap } from './tables/directory.js';
import { directory } from './tables/directory.js';
import { tables } from './tables/index.js';
import type { nameTable } from './tables/name.js';
import type { OpenType } from './tables/open-type.js';
import {
	requiredTrueTypeSubsetTables,
	type TrueTypeSubsetFont,
} from './true-type-subset-font.js';

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
 *
 * FIXME! This list contains the required tables as per OpenType specification.
 * Instead, it should be checked which tables are really required by the
 * library, in every context, where an {@link OpenTypeFont} is processed.
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

export interface TrueTypeFont<
	TDirectory extends SFNTFontDirectory = SFNTFontDirectory,
> extends SFNTFont,
		FontTableField {
	directory: TDirectory;
}

/**
 * This is the base class for all SFNT-based font formats in fontkit.
 * It supports TrueType, and PostScript glyphs, and several color glyph formats.
 */
// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Merged with FontTableFields to map table layout properties dynamically via the constructor loop.
export class TrueTypeFont<
	TDirectory extends SFNTFontDirectory = SFNTFontDirectory,
> implements SFNTFont
{
	public stream: DecodeStream;
	private variationCoords: number[] | null;
	private directoryPos: number;
	private tables: SFNTTableMap = {} as SFNTTableMap;
	protected glyphs: Record<number, Glyph> = {};
	public directory: TDirectory;
	public defaultLanguage: string | null;

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

	constructor(
		streamOrBuffer: Uint8Array | DecodeStream,
		variationCoords: number[] | null = null,
	) {
		if (streamOrBuffer instanceof Uint8Array) {
			this.stream = new DecodeStream(streamOrBuffer);
		} else {
			this.stream = streamOrBuffer;
		}
		this.variationCoords = variationCoords;

		this.directoryPos = this.stream.pos;
		this.tables = {} as SFNTTableMap;
		this.glyphs = {};
		this.directory = this.decodeDirectory();
		this.defaultLanguage = null;

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

		if (requiredOpenTypeTables.every((tag) => existingTableTags.has(tag))) {
			if (
				requiredOpenTypeTrueTypeTables.every((tag) =>
					existingTableTags.has(tag),
				)
			) {
				this.outlines = 'TrueType';
				this.outlineVersion = 1;
			} else if (
				requiredOpenTypeCFF2Tables.every((tag) => existingTableTags.has(tag))
			) {
				this.outlines = 'PostScript';
				this.outlineVersion = 2;
			} else if (
				requiredOpenTypeCFF1Tables.every((tag) => existingTableTags.has(tag))
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
		return directory.decode(this.stream, {
			_startOffset: 0,
		} as FieldT<unknown>) as unknown as TDirectory;
	}

	protected decodeTable<K extends keyof typeof tables>(
		table: SFNTDirectoryEntry,
	): ReturnType<(typeof tables)[K]['decode']> | null {
		const pos = this.stream.pos;
		const stream = this.getTableStream(table.tag);

		if (table.tag in tables && stream) {
			const tag = table.tag as K;
			const result = tables[tag].decode(
				stream,
				this as unknown as FieldT<unknown>,
				table.length,
			);

			this.stream.pos = pos;

			return result as ReturnType<(typeof tables)[K]['decode']>;
		} else {
			return null;
		}
	}

	get postscriptName(): string | Uint8Array | null {
		return this.getName('postscriptName');
	}

	public setDefaultLanguage(lang: string | null = null): void {
		this.defaultLanguage = lang;
	}

	protected getName(
		key: keyof nameTable.ProcessedRecords,
		lang = this.defaultLanguage || fontkit.defaultLanguage,
	): string | null {
		if (!this.name) {
			return null;
		}

		const maybeRecord = this.name.records[key];
		if (maybeRecord) {
			const record = maybeRecord;

			const firstKey = Object.keys(record)[0] as keyof typeof record;

			return (
				record[lang as keyof typeof record] ||
				record[this.defaultLanguage as keyof typeof record] ||
				record[fontkit.defaultLanguage as keyof typeof record] ||
				record['en' as keyof typeof record] ||
				(firstKey ? record[firstKey] : null) ||
				null
			);
		}

		return null;
	}

	public get fullName(): string | null {
		return this.getName('fullName');
	}

	public get familyName(): string | null {
		return this.getName('fontFamily');
	}

	public get subfamilyName(): string | null {
		return this.getName('fontSubfamily');
	}

	public get copyright(): string | null {
		return this.getName('copyright');
	}

	public get version(): string | null {
		return this.getName('version');
	}

	public get ascent(): number | undefined {
		if (!this.hhea) {
			return undefined;
		}

		return this.hhea.ascent;
	}

	public get descent() {
		if (!this.hhea) {
			return undefined;
		}

		return this.hhea.descent;
	}

	public get lineGap(): number | undefined {
		if (!this.hhea) {
			return undefined;
		}

		return this.hhea.lineGap;
	}

	public get underlinePosition(): number | undefined {
		if (!this.post) {
			return undefined;
		}

		return this.post.underlinePosition;
	}

	public get underlineThickness(): number | undefined {
		if (!this.post) {
			return undefined;
		}

		return this.post.underlineThickness;
	}

	public get italicAngle(): number | undefined {
		if (!this.post) {
			return undefined;
		}

		return this.post.italicAngle;
	}

	public get capHeight(): number | undefined {
		if (!this['OS/2']) {
			return this.ascent;
		}

		const os2 = this['OS/2'];
		if ('capHeight' in os2) {
			return os2.capHeight;
		} else {
			return this.ascent;
		}
	}

	public get xHeight(): number {
		if (!this['OS/2']) {
			return 0;
		}

		const os2 = this['OS/2'];
		if ('xHeight' in os2) {
			return os2.xHeight;
		} else {
			return 0;
		}
	}

	public get numGlyphs(): number | undefined {
		if (!this.maxp) {
			return undefined;
		}

		return this.maxp.numGlyphs;
	}

	public get unitsPerEm(): number {
		if (!this.head) {
			return 1000;
		}

		return this.head.unitsPerEm;
	}

	public get bbox(): Readonly<BoundingBox> | undefined {
		if (typeof this._bbox === 'undefined') {
			if (!this.head) {
				return undefined;
			}
			const head = this.head;
			this._bbox = Object.freeze(
				new BoundingBox(head.xMin, head.yMin, head.xMax, head.yMax),
			);
		}

		return this._bbox;
	}

	private get cmapProcessor(): CmapProcessor | null {
		if (typeof this._cmapProcessor === 'undefined') {
			if (this.cmap) {
				this._cmapProcessor = new CmapProcessor(this.cmap);
			} else {
				return null;
			}
		}

		return this._cmapProcessor;
	}

	public get characterSet(): number[] {
		if (typeof this._characterSet === 'undefined') {
			// Without a cmap table, we have no idea.
			this._characterSet = this.cmapProcessor?.getCharacterSet() || [];
		}

		return this._characterSet;
	}

	public hasGlyphForCodePoint(codePoint: number): boolean {
		return this.cmapProcessor ? !!this.cmapProcessor.lookup(codePoint) : false;
	}

	public glyphForCodePoint(codePoint: number): Glyph | null {
		if (!this.cmapProcessor) {
			return null;
		}

		return this.getGlyph(this.cmapProcessor.lookup(codePoint), [codePoint]);
	}

	public glyphsForString(str: string): Glyph[] {
		// Fast fail: if the font has no character mapping table,
		// it cannot map any character sequence to a glyph.
		if (!this.cmapProcessor) {
			return [];
		}

		const glyphs: Glyph[] = [];
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
				const glyph = this.getGlyph(this.cmapProcessor.lookup(last, code), [
					last,
					code,
				]);
				if (glyph) {
					glyphs.push(glyph);
				}
			} else if (state === 0 && nextState === 0) {
				// Normal codepoint following normal codepoint.
				const glyph = this.glyphForCodePoint(last);
				if (glyph) {
					glyphs.push(glyph);
				}
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

	public stringsForGlyph(gid: number): string[] {
		return this.layoutEngine.stringsForGlyph(gid);
	}

	public codePointsForGlyph(gid: number): number[] {
		return this.cmapProcessor?.codePointsForGlyph(gid) ?? [];
	}

	public get availableFeatures(): OpenType.FeatureTag[] {
		return this.layoutEngine.getAvailableFeatures();
	}

	public getAvailableFeatures(
		script: Script.UnicodeScript,
		language?: string,
	): OpenType.FeatureTag[] {
		return this.layoutEngine.getAvailableFeatures(script, language);
	}

	/** @internal */
	public getBaseGlyph(
		glyph: number,
		characters: readonly number[] = [],
	): Glyph | null {
		if (!this.glyphs[glyph]) {
			const ttFont = this.asTrueTypeSubsetFont();
			if (ttFont) {
				this.glyphs[glyph] = new TrueTypeGlyph(
					glyph,
					characters,
					this as TrueTypeSubsetFont,
				) as Glyph;
			} else {
				const font = this.asOpenTypeFont();
				if (font?.outlines === 'PostScript') {
					this.glyphs[glyph] = new CFFGlyph(glyph, characters, font) as Glyph;
				}
			}
		}

		return this.glyphs[glyph] ?? null;
	}

	// FIXME! The method either returns an SBIXGlyph, a COLRGlyph, a
	// TrueTypeGlyph, or a CFFGlyph. But the SBIXGlyph or COLRGlyph is not
	// necessarily a bitmap. It would probably be better to have a factory
	// method that returns the correct glyph for a particular codepoint.
	//
	// Otherwise, getGlyph()/getBaseGlyph() could be simplified by simply
	// checking just once in the constructor what the appropriate Glyph
	// class for this particular font is.
	public getGlyph(
		glyph: number,
		characters: readonly number[] = [],
	): Glyph | null {
		if (!this.glyphs[glyph]) {
			const font = this as OpenTypeFont;

			if (font?.sbix && font.outlines === 'TrueType') {
				this.glyphs[glyph] = new SBIXGlyph(glyph, characters, font) as Glyph;
			} else if (font?.COLR && font?.CPAL) {
				this.glyphs[glyph] = new COLRGlyph(glyph, characters, font) as Glyph;
			} else {
				this.getBaseGlyph(glyph, characters);
			}
		}

		return this.glyphs[glyph] ?? null;
	}

	public safeGetGlyph(
		glyph: number,
		characters: readonly number[] = [],
	): Glyph {
		const resolved = this.getGlyph(glyph, characters);

		if (!resolved) {
			throw new Error(
				'No Glyph object can be created, because this ' +
					'does not have any usable combination of font tables for ' +
					'achieving this!',
			);
		}

		return resolved;
	}

	public createSubset(): Subset {
		if (this.directory.tables['CFF ']) {
			return new CFFSubset(this);
		}

		const otFont = this.asOpenTypeFont();
		if (otFont?.outlines === 'TrueType') {
			return new TrueTypeSubset(otFont);
		} else {
			throw new Error('Cannot createa subset, because of missing font tables');
		}
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

	public get variationAxes(): VariationAxes {
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

	public get namedVariations(): NamedVariations {
		if (typeof this._namedVariations === 'undefined') {
			this._namedVariations = this.computeNamedVariations();
		}

		return this._namedVariations;
	}

	public getVariation(settings: string | VariationCoordinates): TrueTypeFont {
		if (
			!(
				this.hasTable('fvar') &&
				((this.hasTable('gvar') && this.hasTable('glyf')) ||
					this.hasTable('CFF2'))
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
		const coords = this.fvar!.axis.map((axis: FontAxis) => {
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

		const font = new TrueTypeFont<TDirectory>(stream, coords);
		font.tables = this.tables;

		return font;
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

	public getFont(name: string): TrueTypeFont {
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

	private decodeTableSubset(tags: string[]): boolean {
		for (let i = 0; i < tags.length; ++i) {
			const tag = tags[i];
			if (!this.getTable(this.directory.tables[tag])) {
				return false;
			}
		}

		return true;
	}

	public asOpenTypeFont(): OpenTypeFont | null {
		if (this.outlines === '') return null;

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

		if (!this.decodeTableSubset(tags)) {
			return null;
		}

		return this as OpenTypeFont;
	}

	public asAATFont(): AATFont | null {
		if (requiredAATTables.find((tag) => !this.hasTable(tag))) {
			return null;
		}

		if (!this.decodeTableSubset([...requiredAATTables])) {
			return null;
		}

		return this as AATFont;
	}

	public asTrueTypeSubsetFont(): TrueTypeSubsetFont | null {
		if (requiredTrueTypeSubsetTables.find((tag) => !this.hasTable(tag))) {
			return null;
		}

		if (!this.decodeTableSubset([...requiredTrueTypeSubsetTables])) {
			return null;
		}

		return this as TrueTypeSubsetFont;
	}
}
