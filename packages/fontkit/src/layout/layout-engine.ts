import { AATLayoutEngine } from '../aat/aat-layout-engine.js';
import type { Glyph } from '../glyph/glyph.js';
import { OTLayoutEngine } from '../opentype/ot-layout-engine.js';
import type { OpenType } from '../tables/opentype.js';
import type { TrueTypeFont } from '../true-type-font.js';
import { GlyphPosition } from './glyph-position.js';
import { type BidiDirection, GlyphRun } from './glyph-run.js';
import { KernProcessor } from './kern-processor.js';
import * as Script from './script.js';
import { UnicodeLayoutEngine } from './unicode-layout-engine.js';

export class LayoutEngine {
	private unicodeLayoutEngine: UnicodeLayoutEngine | null;
	private kernProcessor: KernProcessor | null;
	public readonly engine?: AATLayoutEngine | OTLayoutEngine<null>;

	constructor(private readonly font: TrueTypeFont) {
		this.unicodeLayoutEngine = null;
		this.kernProcessor = null;

		// Choose an advanced layout engine. We try the AAT morx table first since more
		// scripts are currently supported because the shaping logic is built into the font.
		if (this.font.hasTable('morx')) {
			this.engine = new AATLayoutEngine(this.font);
		} else if (this.font.hasTable('GSUB') || this.font.hasTable('GPOS')) {
			this.engine = new OTLayoutEngine<null>(this.font);
		}
	}

	public layout(
		str: string | Glyph[],
		featuresOrScript:
			| OpenType.Features
			| OpenType.FeatureTag[]
			| Script.UnicodeScript,
		scriptOrLanguage?: string | Script.UnicodeScript,
		languageOrDirection?: string | BidiDirection,
		direction?: BidiDirection,
	): GlyphRun {
		// Make the features parameter optional
		let features: OpenType.Features | OpenType.FeatureTag[];
		let script: Script.UnicodeScript;
		let language: string | undefined;
		if (typeof featuresOrScript === 'string') {
			direction = languageOrDirection as BidiDirection;
			language = scriptOrLanguage;
			script = featuresOrScript;
			features = [];
		} else {
			features = featuresOrScript;
			script = scriptOrLanguage as Script.UnicodeScript;
			language = languageOrDirection;
		}

		// Map string to glyphs if needed
		let glyphs: Glyph[];
		if (typeof str === 'string') {
			// Attempt to detect the script from the string if not provided.
			if (script == null) {
				script = Script.forString(str) as Script.UnicodeScript;
			}

			glyphs = this.font.glyphsForString(str);
		} else {
			// Attempt to detect the script from the glyph code points if not provided.
			if (script == null) {
				const codePoints = [];
				for (const glyph of str) {
					codePoints.push(...glyph.codePoints);
				}

				script = Script.forCodePoints(codePoints) as Script.UnicodeScript;
			}

			glyphs = str;
		}

		const glyphRun = new GlyphRun(
			glyphs,
			features,
			script,
			language,
			direction,
		);

		// Return early if there are no glyphs
		if (glyphs.length === 0) {
			glyphRun.positions = [];
			return glyphRun;
		}

		// Setup the advanced layout engine
		if ((this.engine as OTLayoutEngine<null>)?.setup) {
			(this.engine as OTLayoutEngine<null>)?.setup(glyphRun);
		}

		// Substitute and position the glyphs
		this.substitute(glyphRun);
		this.position(glyphRun);

		this.hideDefaultIgnorables(glyphRun.glyphs, glyphRun.positions);

		// Let the layout engine clean up any state it might have
		if ((this.engine as OTLayoutEngine<null>)?.cleanup) {
			(this.engine as OTLayoutEngine<null>).cleanup();
		}

		return glyphRun;
	}

	private substitute(glyphRun: GlyphRun) {
		// Call the advanced layout engine to make substitutions
		if (this.engine?.substitute) {
			this.engine.substitute(glyphRun);
		}
	}

	private position(glyphRun: GlyphRun) {
		// Get initial glyph positions
		glyphRun.positions = glyphRun.glyphs.map(
			(glyph) => new GlyphPosition(glyph.advanceWidth),
		);
		let positioned = null;

		// Call the advanced layout engine. Returns the features applied.
		if ((this.engine as OTLayoutEngine<null>)?.position) {
			positioned = (this.engine as OTLayoutEngine<null>).position(glyphRun);
		}

		// if there is no GPOS table, use unicode properties to position marks.
		if (
			!positioned &&
			(!this.engine || (this.engine as AATLayoutEngine).fallbackPosition)
		) {
			if (!this.unicodeLayoutEngine) {
				this.unicodeLayoutEngine = new UnicodeLayoutEngine(this.font);
			}

			this.unicodeLayoutEngine.positionGlyphs(
				glyphRun.glyphs,
				glyphRun.positions,
			);
		}

		// if kerning is not supported by GPOS, do kerning with the TrueType/AAT kern table
		if (
			!positioned?.kern &&
			glyphRun.features.kern !== false &&
			this.font.kern
		) {
			if (!this.kernProcessor) {
				this.kernProcessor = new KernProcessor(this.font);
			}

			this.kernProcessor.process(glyphRun.glyphs, glyphRun.positions);
			glyphRun.features.kern = true;
		}
	}

	private hideDefaultIgnorables(glyphs: Glyph[], positions: GlyphPosition[]) {
		let space = this.font.glyphForCodePoint(0x20);
		for (let i = 0; i < glyphs.length; i++) {
			if (this.isDefaultIgnorable(glyphs[i].codePoints[0])) {
				if (!space) {
					space = this.font.getGlyph(0, [0x20]);
					if (!space) {
						throw new Error('font lacks the .notdef glyph!');
					}
				}
				glyphs[i] = space;
				positions[i].xAdvance = 0;
				positions[i].yAdvance = 0;
			}
		}
	}

	private isDefaultIgnorable(ch: number): boolean {
		// From DerivedCoreProperties.txt in the Unicode database,
		// minus U+115F, U+1160, U+3164 and U+FFA0, which is what
		// Harfbuzz and Uniscribe do.
		const plane = ch >> 16;
		if (plane === 0) {
			// BMP
			switch (ch >> 8) {
				case 0x00:
					return ch === 0x00ad;
				case 0x03:
					return ch === 0x034f;
				case 0x06:
					return ch === 0x061c;
				case 0x17:
					return 0x17b4 <= ch && ch <= 0x17b5;
				case 0x18:
					return 0x180b <= ch && ch <= 0x180e;
				case 0x20:
					return (
						(0x200b <= ch && ch <= 0x200f) ||
						(0x202a <= ch && ch <= 0x202e) ||
						(0x2060 <= ch && ch <= 0x206f)
					);
				case 0xfe:
					return (0xfe00 <= ch && ch <= 0xfe0f) || ch === 0xfeff;
				case 0xff:
					return 0xfff0 <= ch && ch <= 0xfff8;
				default:
					return false;
			}
		} else {
			// Other planes
			switch (plane) {
				case 0x01:
					return (
						(0x1bca0 <= ch && ch <= 0x1bca3) || (0x1d173 <= ch && ch <= 0x1d17a)
					);
				case 0x0e:
					return 0xe0000 <= ch && ch <= 0xe0fff;
				default:
					return false;
			}
		}
	}

	public getAvailableFeatures(
		script?: Script.UnicodeScript,
		language?: string,
	): OpenType.FeatureTag[] {
		const features: OpenType.FeatureTag[] = [];

		if (this.engine) {
			features.push(...this.engine.getAvailableFeatures(script, language));
		}

		if (this.font.kern && features.indexOf('kern') === -1) {
			features.push('kern');
		}

		return features;
	}

	public stringsForGlyph(gid: number): string[] {
		const result = new Set<string>();

		const codePoints = this.font.codePointsForGlyph(gid);
		for (const codePoint of codePoints) {
			result.add(String.fromCodePoint(codePoint));
		}

		if ((this.engine as AATLayoutEngine)?.stringsForGlyph) {
			const engine: AATLayoutEngine = this.engine as AATLayoutEngine;
			for (const string of engine.stringsForGlyph(gid)) {
				result.add(string);
			}
		}

		return Array.from(result);
	}
}
