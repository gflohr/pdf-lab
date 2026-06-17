import * as base64 from 'base64-arraybuffer';
import StateMachine from 'dfa';
import pako from 'pako';
import UnicodeTrie from 'unicode-trie';
import type { SFNTFont } from '../../sfnt-font.js';
import GlyphInfo from '../glyph-info.js';
import type ShapingPlan from '../shaping-plan.js';
import type { ShapingFunction } from '../shaping-plan.js';
import DefaultShaper from './default-shaper.js';
import base64DeflatedTrie from './trie-use.js';
import base64DeflatedUseData from './use.js';

// Trie is serialized as a Buffer in node, but here
// we may be running in a browser so we make an Uint8Array

const useData: StateMachine.DFA = JSON.parse(
	String.fromCharCode.apply(
		String,
		Array.from(pako.inflate(base64.decode(base64DeflatedUseData))),
	),
);
const trieData = pako.inflate(base64.decode(base64DeflatedTrie));

const { categories: rawCategories, decompositions: rawDecompositions } = useData;
// Guard against invalid data.
if (!rawCategories) {
	throw new Error('Invalid USE data: missing categories');
}
if (!rawDecompositions) {
	throw new Error('Invalid USE data: missing decompositions');
}

// Now make TypeScript happy, too:
const categories = rawCategories;
const decompositions = rawDecompositions;

const trie = new UnicodeTrie(trieData);
const stateMachine = new StateMachine(useData);

export class USEInfo {
	constructor(
		public category: string,
		public syllableType: string,
		public syllable: number,
	) {}
}

type UniversalGlyphInfo = GlyphInfo<USEInfo> & {
	shaperInfo: USEInfo;
};

/**
 * This shaper is an implementation of the Universal Shaping Engine, which
 * uses Unicode data to shape a number of scripts without a dedicated shaping engine.
 * See https://www.microsoft.com/typography/OpenTypeDev/USE/intro.htm.
 */
export default class UniversalShaper extends DefaultShaper {
	static zeroMarkWidths = 'BEFORE_GPOS';
	static planFeatures<T>(plan: ShapingPlan<T>) {
		plan.addStage(setupSyllables as unknown as ShapingFunction<T>);

		// Default glyph pre-processing group
		plan.addStage(['locl', 'ccmp', 'nukt', 'akhn']);

		// Reordering group
		plan.addStage(clearSubstitutionFlags as ShapingFunction<T>);
		plan.addStage(['rphf'], false);
		plan.addStage(recordRphf as ShapingFunction<T>);
		plan.addStage(clearSubstitutionFlags as ShapingFunction<T>);
		plan.addStage(['pref']);
		plan.addStage(recordPref as ShapingFunction<T>);

		// Orthographic unit shaping group
		plan.addStage(['rkrf', 'abvf', 'blwf', 'half', 'pstf', 'vatu', 'cjct']);
		plan.addStage(reorder as ShapingFunction<T>);

		// Topographical features
		// Scripts that need this are handled by the Arabic shaper, not implemented here for now.
		// plan.addStage(['isol', 'init', 'medi', 'fina', 'med2', 'fin2', 'fin3'], false);

		// Standard topographic presentation and positional feature application
		plan.addStage(['abvs', 'blws', 'pres', 'psts', 'dist', 'abvm', 'blwm']);
	}

	static assignFeatures(
		plan: ShapingPlan<USEInfo>,
		glyphs: GlyphInfo<USEInfo>[],
	) {
		// Decompose split vowels
		// TODO: do this in a more general unicode normalizer
		for (let i = glyphs.length - 1; i >= 0; i--) {
			const codepoint = glyphs[i].codePoints[0];
			if (decompositions[codepoint]) {
				const decomposed = decompositions[codepoint].map((c: number) => {
					const g = plan.font.glyphForCodePoint(c);
					return new GlyphInfo<USEInfo>(
						plan.font,
						g.id,
						[c],
						glyphs[i].features,
					);
				});

				glyphs.splice(i, 1, ...decomposed);
			}
		}
	}
}

function useCategory(glyph: UniversalGlyphInfo): number {
	return trie.get(glyph.codePoints[0]);
}

function setupSyllables(_font: SFNTFont, glyphs: UniversalGlyphInfo[]) {
	let syllable = 0;
	for (const [start, end, tags] of stateMachine.match(
		glyphs.map(useCategory),
	)) {
		++syllable;

		// Create shaper info
		for (let i = start; i <= end; i++) {
			glyphs[i].shaperInfo = new USEInfo(
				categories[useCategory(glyphs[i])],
				tags[0],
				syllable,
			);
		}

		// Assign rphf feature
		const limit =
			glyphs[start].shaperInfo.category === 'R' ? 1 : Math.min(3, end - start);
		for (let i = start; i < start + limit; i++) {
			glyphs[i].features.rphf = true;
		}
	}
}

function clearSubstitutionFlags(_font: SFNTFont, glyphs: UniversalGlyphInfo[]) {
	for (const glyph of glyphs) {
		glyph.substituted = false;
	}
}

function recordRphf(_font: SFNTFont, glyphs: UniversalGlyphInfo[]) {
	for (const glyph of glyphs) {
		if (glyph.substituted && glyph.features.rphf) {
			// Mark a substituted repha.
			glyph.shaperInfo.category = 'R';
		}
	}
}

function recordPref(_font: SFNTFont, glyphs: UniversalGlyphInfo[]) {
	for (const glyph of glyphs) {
		if (glyph.substituted) {
			// Mark a substituted pref as VPre, as they behave the same way.
			glyph.shaperInfo.category = 'VPre';
		}
	}
}

function reorder(font: SFNTFont, glyphs: UniversalGlyphInfo[]) {
	const dottedCircle = font.glyphForCodePoint(0x25cc).id;

	for (
		let start = 0, end = nextSyllable(glyphs, 0);
		start < glyphs.length;
		start = end, end = nextSyllable(glyphs, start)
	) {
		let i: number, j: number;
		let info = glyphs[start].shaperInfo;
		const type = info.syllableType;

		// Only a few syllable types need reordering.
		if (
			type !== 'virama_terminated_cluster' &&
			type !== 'standard_cluster' &&
			type !== 'broken_cluster'
		) {
			continue;
		}

		// Insert a dotted circle glyph in broken clusters.
		if (type === 'broken_cluster' && dottedCircle) {
			const g = new GlyphInfo<USEInfo>(font, dottedCircle, [0x25cc]);
			g.shaperInfo = info;

			// Insert after possible Repha.
			for (i = start; i < end && glyphs[i].shaperInfo.category === 'R'; i++);
			glyphs.splice(++i, 0, g as UniversalGlyphInfo);
			end++;
		}

		// Move things forward.
		if (info.category === 'R' && end - start > 1) {
			// Got a repha. Reorder it to after first base, before first halant.
			for (i = start + 1; i < end; i++) {
				info = glyphs[i].shaperInfo;
				if (isBase(info) || isHalant(glyphs[i])) {
					// If we hit a halant, move before it; otherwise it's a
					// base: move to its place, and shift things in between
					// backward.
					if (isHalant(glyphs[i])) {
						i--;
					}

					glyphs.splice(
						start,
						0,
						...glyphs.splice(start + 1, i - start),
						glyphs[i],
					);
					break;
				}
			}
		}

		// Move things back.
		for (i = start, j = end; i < end; i++) {
			info = glyphs[i].shaperInfo;
			if (isBase(info) || isHalant(glyphs[i])) {
				// If we hit a halant, move after it; otherwise it's a base: move to it's
				// place, and shift things in between backward.
				j = isHalant(glyphs[i]) ? i + 1 : i;
			} else if (
				(info.category === 'VPre' || info.category === 'VMPre') &&
				j < i
			) {
				glyphs.splice(j, 1, glyphs[i], ...glyphs.splice(j, i - j));
			}
		}
	}
}

function nextSyllable(glyphs: UniversalGlyphInfo[], start: number): number {
	if (start >= glyphs.length) return start;
	const syllable = glyphs[start].shaperInfo.syllable;
	while (
		++start < glyphs.length &&
		glyphs[start].shaperInfo.syllable === syllable
	);
	return start;
}

function isHalant(glyph: UniversalGlyphInfo) {
	return glyph.shaperInfo.category === 'H' && !glyph.isLigated;
}

function isBase(info: USEInfo) {
	return info.category === 'B' || info.category === 'GB';
}
