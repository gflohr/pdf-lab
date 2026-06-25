import type GlyphRun from '../layout/glyph-run.js';
import type { SFNTFont } from '../sfnt-font.js';
import type { OpenType } from '../tables/opentype.js';
import * as AATFeatureMap from './aat-feature-map.js';
import AATMorxProcessor from './aat-morx-processor.js';

export default class AATLayoutEngine {
	private readonly morxProcessor: AATMorxProcessor;
	public fallbackPosition: boolean;

	constructor(private readonly font: SFNTFont) {
		this.font = font;
		this.morxProcessor = new AATMorxProcessor(font);
		this.fallbackPosition = false;
	}

	public substitute(glyphRun: GlyphRun) {
		// AAT expects the glyphs to be in visual order prior to morx processing,
		// so reverse the glyphs if the script is right-to-left.
		if (glyphRun.direction === 'rtl') {
			glyphRun.glyphs.reverse();
		}

		this.morxProcessor.process(
			glyphRun.glyphs,
			AATFeatureMap.mapOTToAAT(glyphRun.features),
		);
	}

	public getAvailableFeatures(): OpenType.FeatureTag[] {
		return AATFeatureMap.mapAATToOT(this.morxProcessor.getSupportedFeatures());
	}

	public stringsForGlyph(gid: number) {
		const glyphStrings = this.morxProcessor.generateInputs(gid);
		const result = new Set<string>();

		for (const glyphs of glyphStrings) {
			this.addStrings(glyphs, 0, result, '');
		}

		return result;
	}

	private addStrings(
		glyphs: number[],
		index: number,
		strings: Set<string>,
		str: string,
	) {
		const codePoints = this.font.codePointsForGlyph(glyphs[index]);

		for (const codePoint of codePoints) {
			const s = str + String.fromCodePoint(codePoint);
			if (index < glyphs.length - 1) {
				this.addStrings(glyphs, index + 1, strings, s);
			} else {
				strings.add(s);
			}
		}
	}
}
