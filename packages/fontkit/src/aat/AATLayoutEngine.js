import AATMorxProcessor from './AATMorxProcessor.js';
import * as AATFeatureMap from './aat-feature-map.js';

export default class AATLayoutEngine {
	constructor(font) {
		this.font = font;
		this.morxProcessor = new AATMorxProcessor(font);
		this.fallbackPosition = false;
	}

	substitute(glyphRun) {
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

	getAvailableFeatures() {
		return AATFeatureMap.mapAATToOT(this.morxProcessor.getSupportedFeatures());
	}

	stringsForGlyph(gid) {
		const glyphStrings = this.morxProcessor.generateInputs(gid);
		const result = new Set();

		for (const glyphs of glyphStrings) {
			this._addStrings(glyphs, 0, result, '');
		}

		return result;
	}

	_addStrings(glyphs, index, strings, string) {
		const codePoints = this.font.codePointsForGlyph(glyphs[index]);

		for (const codePoint of codePoints) {
			const s = string + String.fromCodePoint(codePoint);
			if (index < glyphs.length - 1) {
				this._addStrings(glyphs, index + 1, strings, s);
			} else {
				strings.add(s);
			}
		}
	}
}
