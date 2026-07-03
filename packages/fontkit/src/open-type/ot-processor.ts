import type { GlyphPosition } from '../layout/glyph-position.js';
import type { BidiDirection } from '../layout/glyph-run.js';
import * as Script from '../layout/script.js';
import type { GPOSTable } from '../tables/GPOS.js';
import type { GSUBTable } from '../tables/GSUB.js';
import type { OpenType } from '../tables/open-type.js';
import type { OpenTypeVariation } from '../tables/variations.js';
import type { TrueTypeFont } from '../true-type-font.js';
import type { GlyphInfo } from './glyph-info.js';
import { GlyphIterator } from './glyph-iterator.js';

const DEFAULT_SCRIPTS = ['DFLT', 'dflt', 'latn'];

type MatcherFunction<T> = (
	s: number | OpenType.Coverage,
	glyph: GlyphInfo<T>,
) => boolean;

export class OTProcessor<T> {
	protected font: TrueTypeFont;
	private table: GPOSTable.GPOS | GSUBTable.GSUB;
	private script: OpenType.Script | null;
	private scriptTag: string | null;
	private language: OpenType.LangSys | null;
	private languageTag: string | null;
	public features: Partial<Record<OpenType.FeatureTag, OpenType.Feature>>;
	private lookups: Record<string, unknown>;
	private variationsIndex: number;
	protected glyphs: GlyphInfo<T>[];
	protected positions?: GlyphPosition[];
	protected ligatureID: number;
	private currentFeature: string | null;
	protected direction: BidiDirection | undefined;
	protected glyphIterator: GlyphIterator<T> | undefined;

	constructor(font: TrueTypeFont, table: GPOSTable.GPOS | GSUBTable.GSUB) {
		this.font = font;
		this.table = table;

		this.script = null;
		this.scriptTag = null;

		this.language = null;
		this.languageTag = null;

		this.features = {};
		this.lookups = {};

		// Setup variation substitutions
		this.variationsIndex = font.variationProcessor
			? this.findVariationsIndex(font.variationProcessor.normalizedCoords)
			: -1;

		// Initialize to default script + language.
		this.selectScript();

		// current context (set by applyFeatures)
		this.glyphs = [];
		this.positions = []; // only used by GPOS
		this.ligatureID = 1;
		this.currentFeature = null;
	}

	private findScript(script: string | string[]): OpenType.ScriptRecord | null {
		if (this.table.scriptList == null) {
			return null;
		}

		if (!Array.isArray(script)) {
			script = [script];
		}

		for (const s of script) {
			for (const entry of this.table.scriptList) {
				if (entry.tag === s) {
					return entry;
				}
			}
		}

		return null;
	}

	public selectScript(
		script?: string,
		language?: string | null,
		direction?: BidiDirection,
	): string | null {
		let changed = false;
		let entry: OpenType.ScriptRecord | null;
		if (!this.script || script !== this.scriptTag) {
			entry = script ? this.findScript(script) : null;
			if (!entry) {
				entry = this.findScript(DEFAULT_SCRIPTS);
			}

			if (!entry) {
				return this.scriptTag;
			}

			this.scriptTag = entry.tag;
			this.script = entry.script;
			this.language = null;
			this.languageTag = null;
			changed = true;
		}

		if (!direction || direction !== this.direction) {
			this.direction = direction || Script.direction(script);
		}

		if (language && language.length < 4) {
			language += ' '.repeat(4 - language.length);
		}

		if (!language || language !== this.languageTag) {
			this.language = null;

			for (const lang of this.script.langSysRecords) {
				if (lang.tag === language) {
					this.language = lang.langSys;
					this.languageTag = lang.tag;
					break;
				}
			}

			if (!this.language) {
				this.language = this.script.defaultLangSys;
				this.languageTag = null;
			}

			changed = true;
		}

		// Build a feature lookup table
		if (changed) {
			this.features = {};
			if (this.language) {
				for (const featureIndex of this.language.featureIndexes) {
					const record = this.table.featureList[featureIndex];
					const substituteFeature =
						this.substituteFeatureForVariations(featureIndex);
					this.features[record.tag] = substituteFeature || record.feature;
				}
			}
		}

		return this.scriptTag;
	}

	private lookupsForFeatures(
		userFeatures: OpenType.FeatureTag[] = [],
		exclude?: number[],
	): OpenType.ProcessorLookupEnvelope<
		GPOSTable.LookupTable | GSUBTable.LookupTable
	>[] {
		const lookups: OpenType.ProcessorLookupEnvelope<
			GPOSTable.LookupTable | GSUBTable.LookupTable
		>[] = [];
		for (const tag of userFeatures) {
			const feature = this.features[tag];
			if (!feature) {
				continue;
			}

			for (const lookupIndex of feature.lookupListIndexes) {
				if (exclude && exclude.indexOf(lookupIndex) !== -1) {
					continue;
				}

				lookups.push({
					feature: tag,
					index: lookupIndex,
					lookup: this.table.lookupList.get(lookupIndex),
				});
			}
		}

		lookups.sort((a, b) => a.index - b.index);

		return lookups;
	}

	private substituteFeatureForVariations(
		featureIndex: number,
	): OpenType.Feature | null {
		if (this.variationsIndex === -1 || this.table.version !== 65537) {
			return null;
		}

		const record =
			this.table.featureVariations?.featureVariationRecords[
				this.variationsIndex
			];
		if (!record?.featureTableSubstitution) return null;

		const substitutions = record.featureTableSubstitution.substitutions;
		for (const substitution of substitutions) {
			if (substitution.featureIndex === featureIndex) {
				return substitution.alternateFeatureTable;
			}
		}

		return null;
	}

	private findVariationsIndex(coords: number[]): number {
		if (this.table.version !== 65537) return -1;

		const variations = this.table.featureVariations;
		if (!variations) {
			return -1;
		}

		const records = variations.featureVariationRecords;
		for (let i = 0; i < records.length; i++) {
			const conditions = records[i].conditionSet?.conditionTable;
			if (!conditions) continue;

			if (this.variationConditionsMatch(conditions, coords)) {
				return i;
			}
		}

		return -1;
	}

	private variationConditionsMatch(
		conditions: (OpenTypeVariation.Condition | null)[],
		coords: number[],
	) {
		return conditions.every((condition) => {
			if (!condition) return false;

			const coord =
				condition.axisIndex < coords.length ? coords[condition.axisIndex] : 0;
			return (
				condition.filterRangeMinValue <= coord &&
				coord <= condition.filterRangeMaxValue
			);
		});
	}

	public applyFeatures(
		userFeatures: OpenType.FeatureTag[],
		glyphs: GlyphInfo<T>[],
		advances?: GlyphPosition[],
	) {
		const lookups = this.lookupsForFeatures(userFeatures);
		this.applyLookups(lookups, glyphs, advances);
	}

	private applyLookups(
		lookups: OpenType.ProcessorLookupEnvelope<
			GPOSTable.LookupTable | GSUBTable.LookupTable
		>[],
		glyphs: GlyphInfo<T>[],
		positions?: GlyphPosition[],
	) {
		this.glyphs = glyphs;
		this.positions = positions;
		this.glyphIterator = new GlyphIterator(glyphs);

		for (const { feature, lookup } of lookups) {
			this.currentFeature = feature;
			this.glyphIterator.reset(lookup.flags);

			while (this.glyphIterator.index < glyphs.length) {
				if (!(feature in this.glyphIterator.cur!.features)) {
					this.glyphIterator.next();
					continue;
				}

				for (const table of lookup.subTables) {
					const res = this.applyLookup(lookup.lookupType, table);
					if (res) {
						break;
					}
				}

				this.glyphIterator.next();
			}
		}
	}

	// FIXME! Instead of receiving the lookupType, the method should receive
	// the entire LookupTable, so that the type can be inferred in the
	// subclasses.
	public applyLookup(
		_lookupType: number,
		_table: GPOSTable.LookupTable | GSUBTable.LookupTable,
	): boolean {
		throw new Error('applyLookup must be implemented by subclasses');
	}

	private applyLookupList(lookupRecords: OpenType.LookupRecord[]) {
		const options = this.glyphIterator!.options;
		const glyphIndex = this.glyphIterator!.index;

		for (const lookupRecord of lookupRecords) {
			// Reset flags and find glyph index for this lookup record
			this.glyphIterator!.reset(options, glyphIndex);
			this.glyphIterator!.increment(lookupRecord.sequenceIndex);

			// Get the lookup and setup flags for subtables
			const lookup = this.table.lookupList.get(lookupRecord.lookupListIndex);
			this.glyphIterator!.reset(lookup.flags, this.glyphIterator!.index);

			// Apply lookup subtables until one matches
			for (const table of lookup.subTables) {
				if (this.applyLookup(lookup.lookupType, table)) {
					break;
				}
			}
		}

		this.glyphIterator!.reset(options, glyphIndex);

		return true;
	}

	protected coverageIndex(coverage: OpenType.Coverage, glyph?: number) {
		if (glyph == null) {
			glyph = this.glyphIterator!.cur!.id;
		}

		switch (coverage.version) {
			case 1:
				return coverage.glyphs.indexOf(glyph);

			case 2:
				for (const range of coverage.rangeRecords) {
					if (range.start <= glyph && glyph <= range.end) {
						return range.startCoverageIndex + glyph - range.start;
					}
				}

				break;
		}

		return -1;
	}

	private match(
		sequenceIndex: number,
		sequence: number[] | OpenType.Coverage[],
		fn: MatcherFunction<T>,
		matched?: number[],
	): boolean | number[] {
		const pos = this.glyphIterator!.index;
		let glyph = this.glyphIterator!.increment(sequenceIndex);
		let idx = 0;

		while (idx < sequence.length && glyph && fn(sequence[idx], glyph)) {
			if (matched) {
				matched.push(this.glyphIterator!.index);
			}

			idx++;
			glyph = this.glyphIterator!.next()!;
		}

		this.glyphIterator!.index = pos;
		if (idx < sequence.length) {
			return false;
		}

		return matched || true;
	}

	private sequenceMatches(sequenceIndex: number, sequence: number[]) {
		return this.match(
			sequenceIndex,
			sequence,
			(component, glyph) => component === glyph.id,
		);
	}

	protected sequenceMatchIndices(sequenceIndex: number, sequence: number[]) {
		return this.match(
			sequenceIndex,
			sequence,
			(component, glyph) => {
				// If the current feature does not apply to this glyph.
				if (!(this.currentFeature! in glyph.features)) {
					return false;
				}

				return component === glyph.id;
			},
			[],
		);
	}

	private coverageSequenceMatches(
		sequenceIndex: number,
		sequence: OpenType.Coverage[],
	) {
		return this.match(
			sequenceIndex,
			sequence,
			(coverage, glyph) =>
				this.coverageIndex(coverage as OpenType.Coverage, glyph.id) >= 0,
		);
	}

	public getClassID(glyph: number, classDef: OpenType.ClassDef): number {
		switch (classDef.version) {
			case 1: {
				// Class array
				const i = glyph - classDef.startGlyph;
				if (i >= 0 && i < classDef.classValueArray.length) {
					return classDef.classValueArray[i];
				}

				break;
			}

			case 2:
				for (const range of classDef.classRangeRecord) {
					if (range.start <= glyph && glyph <= range.end) {
						return range.class;
					}
				}

				break;
		}

		return 0;
	}

	private classSequenceMatches(
		sequenceIndex: number,
		sequence: number[],
		classDef: OpenType.ClassDef,
	) {
		return this.match(
			sequenceIndex,
			sequence,
			(classID, glyph) => classID === this.getClassID(glyph.id, classDef),
		);
	}

	protected applyContext(table: OpenType.Context) {
		let index: number;
		let set: OpenType.ContextRule[] | OpenType.ContextClassRule[];
		switch (table.version) {
			case 1:
				index = this.coverageIndex(table.coverage);
				if (index === -1) {
					return false;
				}

				set = table.ruleSets[index];
				for (const rule of set) {
					if (this.sequenceMatches(1, rule.input)) {
						return this.applyLookupList(rule.lookupRecords);
					}
				}

				break;

			case 2:
				if (this.coverageIndex(table.coverage) === -1) {
					return false;
				}

				index = this.getClassID(this.glyphIterator!.cur!.id, table.classDef);
				if (index === -1) {
					return false;
				}

				set = table.classSet[index];
				if (!set) {
					return false;
				}
				for (const rule of set) {
					if (this.classSequenceMatches(1, rule.classes, table.classDef)) {
						return this.applyLookupList(rule.lookupRecords);
					}
				}

				break;

			case 3:
				if (this.coverageSequenceMatches(0, table.coverages)) {
					return this.applyLookupList(table.lookupRecords);
				}

				break;
		}

		return false;
	}

	protected applyChainingContext(table: OpenType.ChainingContext) {
		let index: number;
		let set: OpenType.ChainRule[];
		switch (table.version) {
			case 1:
				index = this.coverageIndex(table.coverage);
				if (index === -1) {
					return false;
				}

				set = table.chainRuleSets[index];
				for (const rule of set) {
					if (
						this.sequenceMatches(-rule.backtrack.length, rule.backtrack) &&
						this.sequenceMatches(1, rule.input) &&
						this.sequenceMatches(1 + rule.input.length, rule.lookahead)
					) {
						return this.applyLookupList(rule.lookupRecords);
					}
				}

				break;

			case 2: {
				if (this.coverageIndex(table.coverage) === -1) {
					return false;
				}

				index = this.getClassID(
					this.glyphIterator!.cur!.id,
					table.inputClassDef,
				);
				const rules = table.chainClassSet[index];
				if (!rules) {
					return false;
				}

				for (const rule of rules) {
					if (
						this.classSequenceMatches(
							-rule.backtrack.length,
							rule.backtrack,
							table.backtrackClassDef,
						) &&
						this.classSequenceMatches(1, rule.input, table.inputClassDef) &&
						this.classSequenceMatches(
							1 + rule.input.length,
							rule.lookahead,
							table.lookaheadClassDef,
						)
					) {
						return this.applyLookupList(rule.lookupRecords);
					}
				}

				break;
			}

			case 3:
				if (
					this.coverageSequenceMatches(
						-table.backtrackGlyphCount,
						table.backtrackCoverage,
					) &&
					this.coverageSequenceMatches(0, table.inputCoverage) &&
					this.coverageSequenceMatches(
						table.inputGlyphCount,
						table.lookaheadCoverage,
					)
				) {
					return this.applyLookupList(table.lookupRecords);
				}

				break;
		}

		return false;
	}
}
