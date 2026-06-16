import unicode from '@pdf-lib/unicode-properties';
import type {
	BidiDirection,
	OpenTypeFeatureTag,
} from '../../layout/glyph-run.js';
import type GlyphInfo from '../glyph-info.js';
import { ShaperInfo } from '../glyph-info.js';
import type ShapingPlan from '../shaping-plan.js';

const VARIATION_FEATURES: OpenTypeFeatureTag[] = ['rvrn'];
const COMMON_FEATURES: OpenTypeFeatureTag[] = [
	'ccmp',
	'locl',
	'rlig',
	'mark',
	'mkmk',
];
const FRACTIONAL_FEATURES: OpenTypeFeatureTag[] = ['frac', 'numr', 'dnom'];
const HORIZONTAL_FEATURES: OpenTypeFeatureTag[] = [
	'calt',
	'clig',
	'liga',
	'rclt',
	'curs',
	'kern',
];
// const VERTICAL_FEATURES = ['vert'];
const DIRECTIONAL_FEATURES: Record<BidiDirection, OpenTypeFeatureTag[]> = {
	ltr: ['ltra', 'ltrm'],
	rtl: ['rtla', 'rtlm'],
};

// biome-ignore lint/complexity/noStaticOnlyClass: required for inheritance!
export default class DefaultShaper {
	static zeroMarkWidths = 'AFTER_GPOS';
	static plan(
		plan: ShapingPlan,
		glyphs: GlyphInfo[],
		features: Record<string, boolean>,
	) {
		// Plan the features we want to apply
		// biome-ignore lint/complexity/noThisInStatic: needs rewrite
		this.planPreprocessing(plan);
		// biome-ignore lint/complexity/noThisInStatic: needs rewrite
		this.planFeatures(plan);
		// biome-ignore lint/complexity/noThisInStatic: needs rewrite
		this.planPostprocessing(plan, features);

		// Assign the global features to all the glyphs
		plan.assignGlobalFeatures(glyphs);

		// Assign local features to glyphs
		// biome-ignore lint/complexity/noThisInStatic: needs rewrite
		this.assignFeatures(plan, glyphs);
	}

	static planPreprocessing(plan: ShapingPlan) {
		plan.add({
			global: [...VARIATION_FEATURES, ...DIRECTIONAL_FEATURES[plan.direction]],
			local: FRACTIONAL_FEATURES,
		});
	}

	static planFeatures<T>(_plan: ShapingPlan<T>) {
		// Do nothing by default. Let subclasses override this.
	}

	static planPostprocessing(
		plan: ShapingPlan,
		userFeatures: Record<OpenTypeFeatureTag, boolean>,
	) {
		plan.add([...COMMON_FEATURES, ...HORIZONTAL_FEATURES]);
		plan.setFeatureOverrides(userFeatures);
	}

	protected static assignFeatures(
		/* biome-ignore lint/suspicious/noExplicitAny: This base static method
		 * must use 'any' to act as a wildcard, allowing inheriting shapers
		 * (like Indic or Arabic) to safely narrow the generic parameters to
		 * their specific layout structures without violating the Liskov
		 * Substitution Principle.
		 */
		_plan: ShapingPlan<any>,
		// biome-ignore lint/suspicious/noExplicitAny: See above!
		glyphs: GlyphInfo<any>[],
	) {
		// Enable contextual fractions
		for (let i = 0; i < glyphs.length; i++) {
			const glyph = glyphs[i];
			if (glyph.codePoints[0] === 0x2044) {
				// fraction slash
				let start = i;
				let end = i + 1;

				// Apply numerator
				while (start > 0 && unicode.isDigit(glyphs[start - 1].codePoints[0])) {
					glyphs[start - 1].features.numr = true;
					glyphs[start - 1].features.frac = true;
					start--;
				}

				// Apply denominator
				while (
					end < glyphs.length &&
					unicode.isDigit(glyphs[end].codePoints[0])
				) {
					glyphs[end].features.dnom = true;
					glyphs[end].features.frac = true;
					end++;
				}

				// Apply fraction slash
				glyph.features.frac = true;
				i = end - 1;
			}
		}
	}
}
