import type { GlyphPosition } from '../layout/glyph-position.js';
import type { GlyphRun } from '../layout/glyph-run.js';
import type { OpenTypeTag } from '../layout/script.js';
import type { OpenType } from '../tables/open-type.js';
import type { TrueTypeFont } from '../true-type-font.js';
import { GlyphInfo } from './glyph-info.js';
import { GPOSProcessor } from './gpos-processor.js';
import { GSUBProcessor } from './gsub-processor.js';
import type { DefaultShaper } from './shapers/default-shaper.js';
import * as Shapers from './shapers/index.js';
import { ShapingPlan } from './shaping-plan.js';

export class OpenTypeLayoutEngine<T> {
	private font: TrueTypeFont;
	private glyphInfos: GlyphInfo<T>[] | null;
	private plan: ShapingPlan<T> | null;
	public gsubProcessor: GSUBProcessor<T> | null;
	public gposProcessor: GPOSProcessor<T> | null;
	private shaper: typeof DefaultShaper | undefined | null;

	constructor(font: TrueTypeFont) {
		this.font = font;
		this.glyphInfos = null;
		this.plan = null;
		this.gsubProcessor = null;
		this.gposProcessor = null;

		if (font.GSUB) {
			this.gsubProcessor = new GSUBProcessor(font, font.GSUB);
		}

		if (font.GPOS) {
			this.gposProcessor = new GPOSProcessor(font, font.GPOS);
		}
	}

	/** @internal */
	setup(glyphRun: GlyphRun) {
		// Map glyphs to GlyphInfo objects so data can be passed between
		// GSUB and GPOS without mutating the real (shared) Glyph objects.
		this.glyphInfos = glyphRun.glyphs.map(
			(glyph) => new GlyphInfo<T>(this.font, glyph.id, [...glyph.codePoints]),
		);

		// Select a script based on what is available in GSUB/GPOS.
		let script = null;
		if (this.gposProcessor) {
			script = this.gposProcessor.selectScript(
				glyphRun.script,
				glyphRun.language,
				glyphRun.direction,
			);
		}

		if (this.gsubProcessor) {
			script = this.gsubProcessor.selectScript(
				glyphRun.script,
				glyphRun.language,
				glyphRun.direction,
			);
		}

		// Choose a shaper based on the script, and setup a shaping plan.
		// This determines which features to apply to which glyphs.
		this.shaper = Shapers.choose(script);
		this.plan = new ShapingPlan(
			this.font,
			script as OpenTypeTag,
			glyphRun.direction,
		);
		this.shaper.plan(this.plan!, this.glyphInfos, glyphRun.features);

		// Assign chosen features to output glyph run
		for (const key of Object.keys(
			this.plan.allFeatures,
		) as OpenType.FeatureTag[]) {
			glyphRun.features[key] = true;
		}
	}

	/** @internal */
	substitute(glyphRun: GlyphRun) {
		if (this.gsubProcessor) {
			this.plan!.process(this.gsubProcessor, this.glyphInfos!);

			// Map glyph infos back to normal Glyph objects.
			glyphRun.glyphs = this.glyphInfos!.map((glyphInfo) =>
				this.font.safeGetGlyph(glyphInfo.id, glyphInfo.codePoints),
			);
		}
	}

	/** @internal */
	position(glyphRun: GlyphRun) {
		if (this.shaper!.zeroMarkWidths === 'BEFORE_GPOS') {
			this.zeroMarkAdvances(glyphRun.positions);
		}

		if (this.gposProcessor) {
			this.plan!.process(
				this.gposProcessor,
				this.glyphInfos!,
				glyphRun.positions,
			);
		}

		if (this.shaper!.zeroMarkWidths === 'AFTER_GPOS') {
			this.zeroMarkAdvances(glyphRun.positions);
		}

		// Reverse the glyphs and positions if the script is right-to-left
		if (glyphRun.direction === 'rtl') {
			glyphRun.glyphs.reverse();
			glyphRun.positions.reverse();
		}

		return this.gposProcessor?.features;
	}

	/** @internal */
	zeroMarkAdvances(positions: GlyphPosition[]) {
		for (let i = 0; i < this.glyphInfos!.length; i++) {
			if (this.glyphInfos![i].isMark) {
				positions[i].xAdvance = 0;
				positions[i].yAdvance = 0;
			}
		}
	}

	/** @internal */
	cleanup() {
		this.glyphInfos = null;
		this.plan = null;
		this.shaper = null;
	}

	getAvailableFeatures(
		script?: string,
		language?: string,
	): OpenType.FeatureTag[] {
		const features: OpenType.FeatureTag[] = [];

		if (this.gsubProcessor) {
			this.gsubProcessor.selectScript(script, language);
			features.push(
				...(Object.keys(this.gsubProcessor.features) as OpenType.FeatureTag[]),
			);
		}

		if (this.gposProcessor) {
			this.gposProcessor.selectScript(script, language);
			features.push(
				...(Object.keys(this.gposProcessor.features) as OpenType.FeatureTag[]),
			);
		}

		return features;
	}
}
