import type GlyphPosition from '../layout/glyph-position.js';
import type { BidiDirection, OpenTypeFeatureTag } from '../layout/glyph-run.js';
import type { OpenTypeTag, UnicodeScript } from '../layout/script.js';
import type { SFNTFont } from '../sfnt-font.js';
import { OpenType } from '../tables/opentype.js';
import type GlyphInfo from './glyph-info.js';
import type OTProcessor from './ot-processor.js';
import type { IndicConfig } from './shapers/indic-data.js';

type FeatureShape =
	| OpenTypeFeatureTag
	| OpenTypeFeatureTag[]
	| {
			local?: OpenTypeFeatureTag[];
			global?: OpenTypeFeatureTag[];
	  };

export type ShapingFunction<T = null> = (
	font: SFNTFont,
	glyphs: GlyphInfo<T>[],
	plan: ShapingPlan<T>,
) => void;
type Stage<T> = string[] | ShapingFunction<T>;

/**
 * ShapingPlans are used by the OpenType shapers to store which
 * features should by applied, and in what order to apply them.
 * The features are applied in groups called stages. A feature
 * can be applied globally to all glyphs, or locally to only
 * specific glyphs.
 */
export default class ShapingPlan<T = null> {
	private stages: Stage<T>[];
	private globalFeatures: Record<OpenTypeFeatureTag, boolean>;
	public readonly allFeatures: Record<OpenTypeFeatureTag, number>;
	private _direction: BidiDirection;
	public unicodeScript?: UnicodeScript;
	public indicConfig?: IndicConfig;
	public isOldSpec?: boolean;

	constructor(
		public font: SFNTFont,
		public readonly script?: OpenTypeTag,
		direction: BidiDirection = 'ltr',
	) {
		this.stages = [];
		this.globalFeatures = Object.create(null);
		this.allFeatures = Object.create(null);
		this._direction = direction;
	}

	public get direction(): BidiDirection {
		return this._direction;
	}

	/**
	 * Adds the given features to the last stage.
	 * Ignores features that have already been applied.
	 */
	private addFeatures(features: OpenTypeFeatureTag[], global: boolean) {
		const stageIndex = this.stages.length - 1;
		const stage = this.stages[stageIndex];
		for (const feature of features) {
			if (this.allFeatures[feature] == null) {
				(stage as string[]).push(feature);
				this.allFeatures[feature] = stageIndex;

				if (global) {
					this.globalFeatures[feature] = true;
				}
			}
		}
	}

	/**
	 * Add features to the last stage
	 */
	add(arg: FeatureShape, global = true) {
		if (this.stages.length === 0) {
			this.stages.push([]);
		}

		if (typeof arg === 'string') {
			arg = [arg];
		}

		if (Array.isArray(arg)) {
			this.addFeatures(arg, global);
		} else if (arg != null && typeof arg === 'object') {
			this.addFeatures(arg.global || [], true);
			this.addFeatures(arg.local || [], false);
		} else {
			throw new Error('Unsupported argument to ShapingPlan#add');
		}
	}

	/**
	 * Add a new stage
	 */
	addStage(arg: FeatureShape | ShapingFunction<T>, global?: boolean) {
		const isGlobal = global !== undefined ? global : true;

		if (typeof arg === 'function') {
			this.stages.push(arg, []);
		} else {
			this.stages.push([]);
			this.add(arg, isGlobal);
		}
	}

	setFeatureOverrides(features: string[] | OpenType.TypeFeatures) {
		if (Array.isArray(features)) {
			this.add(features);
		} else if (features != null && typeof features === 'object') {
			for (const tag of Object.keys(features)) {
				if (features[tag]) {
					this.add(tag);
				} else if (this.allFeatures[tag] != null) {
					const stage: string[] = this.stages[
						this.allFeatures[tag]
					] as string[];
					const index = stage.indexOf(tag);
					if (index !== -1) {
						stage.splice(index, 1);
					}
					delete this.allFeatures[tag];
					delete this.globalFeatures[tag];
				}
			}
		}
	}

	/**
	 * Assigns the global features to the given glyphs
	 */
	assignGlobalFeatures(glyphs: GlyphInfo<T>[]) {
		for (const glyph of glyphs) {
			for (const feature of Object.keys(this.globalFeatures)) {
				(glyph.features as Record<string, boolean>)[feature] = true;
			}
		}
	}

	/**
	 * Executes the planned stages using the given OTProcessor
	 */
	process(
		processor: OTProcessor<T>,
		glyphs: GlyphInfo<T>[],
		positions?: GlyphPosition[],
	) {
		for (const stage of this.stages) {
			if (typeof stage === 'function') {
				if (!positions) {
					stage(this.font, glyphs, this);
				}
			} else if (stage.length > 0) {
				processor.applyFeatures(stage, glyphs, positions);
			}
		}
	}
}
