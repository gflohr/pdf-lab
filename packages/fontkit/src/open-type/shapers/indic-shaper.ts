import * as base64 from 'base64-arraybuffer';
import StateMachine from 'dfa';
import pako from 'pako';
import unicode from 'unicode-properties';
import UnicodeTrie from 'unicode-trie';
import * as Script from '../../layout/script.js';
import type { OpenType } from '../../tables/open-type.js';
import type { TrueTypeFont } from '../../true-type-font.js';
import { GlyphInfo } from '../glyph-info.js';
import type { ShapingFunction, ShapingPlan } from '../shaping-plan.js';
import { DefaultShaper } from './default-shaper.js';
import base64DeflatedIndicMachine from './indic.js';
import {
	CATEGORIES,
	CONSONANT_FLAGS,
	HALANT_OR_COENG_FLAGS,
	INDIC_CONFIGS,
	INDIC_DECOMPOSITIONS,
	JOINER_FLAGS,
	POSITIONS,
} from './indic-data.js';
import base64DeflatedTrie from './trie-indic.js';
import base64DeflatedUseData from './use.js';
import { OpenTypeLayoutEngine } from '../open-type-layout-engine.js';

export class IndicInfo {
	constructor(
		public readonly category: number,
		public position: number,
		public readonly syllableType: string,
		public readonly syllable: number,
	) {}
}

// Trie is serialized as a Buffer in node, but here
// we may be running in a browser so we make an Uint8Array
const indicMachine: StateMachine.DFA = JSON.parse(
	String.fromCharCode.apply(
		String,
		Array.from(pako.inflate(base64.decode(base64DeflatedIndicMachine))),
	),
);

const useData = JSON.parse(
	String.fromCharCode.apply(
		String,
		Array.from(pako.inflate(base64.decode(base64DeflatedUseData))),
	),
);
const trieData = pako.inflate(base64.decode(base64DeflatedTrie));

const { decompositions } = useData;

const trie = new UnicodeTrie(trieData);
const stateMachine = new StateMachine(indicMachine);

interface IndicGlyphInfo extends GlyphInfo<IndicInfo> {
	shaperInfo: IndicInfo;
}

// FIXME! Fix the explicit any occurrencies!

/**
 * The IndicShaper supports indic scripts e.g. Devanagari, Kannada, etc.
 * Based on code from Harfbuzz: https://github.com/behdad/harfbuzz/blob/master/src/hb-ot-shape-complex-indic.cc
 */
export class IndicShaper extends DefaultShaper {
	static zeroMarkWidths = 'NONE';
	static planFeatures<IndicInfo>(plan: ShapingPlan<IndicInfo>) {
		plan.addStage(setupSyllables as ShapingFunction<IndicInfo>);

		plan.addStage(['locl', 'ccmp']);

		plan.addStage(initialReordering as unknown as ShapingFunction<IndicInfo>);

		plan.addStage('nukt');
		plan.addStage('akhn');
		plan.addStage('rphf', false);
		plan.addStage('rkrf');
		plan.addStage('pref', false);
		plan.addStage('blwf', false);
		plan.addStage('abvf', false);
		plan.addStage('half', false);
		plan.addStage('pstf', false);
		plan.addStage('vatu');
		plan.addStage('cjct');
		plan.addStage('cfar', false);

		plan.addStage(finalReordering as unknown as ShapingFunction<IndicInfo>);

		plan.addStage({
			local: ['init'],
			global: [
				'pres',
				'abvs',
				'blws',
				'psts',
				'haln',
				'dist',
				'abvm',
				'blwm',
				'calt',
				'clig',
			],
		});

		// Setup the indic config for the selected script
		plan.unicodeScript = Script.fromOpenType(plan.script!);
		plan.indicConfig =
			INDIC_CONFIGS[plan.unicodeScript!] || INDIC_CONFIGS.Default;
		plan.isOldSpec =
			plan.indicConfig.hasOldSpec &&
			plan.script![plan.script!.length - 1] !== '2';

		// TODO: turn off kern (Khmer) and liga features.
	}

	static assignFeatures(
		plan: ShapingPlan<IndicInfo>,
		glyphs: GlyphInfo<IndicInfo>[],
	) {
		// Decompose split matras
		// TODO: do this in a more general unicode normalizer
		for (let i = glyphs.length - 1; i >= 0; i--) {
			const codepoint = glyphs[i].codePoints[0];
			const d = INDIC_DECOMPOSITIONS[codepoint] || decompositions[codepoint];
			if (d) {
				const decomposed = d.map((c) => {
					const g = plan.font.glyphForCodePoint(c);

					if (!g) {
						throw new Error(
							'Fontkit IndicShaper Fatal: Script ' +
								'decomposition failed. The font lacks a ' +
								'glyph for component character ' +
								`U+${c.toString(16).toUpperCase()} ` +
								'required to split composite codepoint ' +
								`U+${codepoint.toString(16).toUpperCase()}.`,
						);
					}

					return new GlyphInfo<IndicInfo>(
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

function indicCategory(glyph: IndicGlyphInfo): number {
	return trie.get(glyph.codePoints[0]) >> 8;
}

function indicPosition(glyph: IndicGlyphInfo): number {
	return 1 << (trie.get(glyph.codePoints[0]) & 0xff);
}

function setupSyllables(_font: TrueTypeFont, glyphs: IndicGlyphInfo[]) {
	let syllable = 0;
	let last = 0;
	for (const [start, end, tags] of stateMachine.match(
		glyphs.map(indicCategory),
	)) {
		if (start > last) {
			++syllable;
			for (let i = last; i < start; i++) {
				glyphs[i].shaperInfo = new IndicInfo(
					CATEGORIES.X,
					POSITIONS.End,
					'non_indic_cluster',
					syllable,
				);
			}
		}

		++syllable;

		// Create shaper info
		for (let i = start; i <= end; i++) {
			glyphs[i].shaperInfo = new IndicInfo(
				1 << indicCategory(glyphs[i]),
				indicPosition(glyphs[i]),
				tags[0],
				syllable,
			);
		}

		last = end + 1;
	}

	if (last < glyphs.length) {
		++syllable;
		for (let i = last; i < glyphs.length; i++) {
			glyphs[i].shaperInfo = new IndicInfo(
				CATEGORIES.X,
				POSITIONS.End,
				'non_indic_cluster',
				syllable,
			);
		}
	}
}

function isConsonant(glyph: IndicGlyphInfo) {
	return (glyph.shaperInfo.category as number) & CONSONANT_FLAGS;
}

function isJoiner(glyph: IndicGlyphInfo) {
	return (glyph.shaperInfo.category as number) & JOINER_FLAGS;
}

function isHalantOrCoeng(glyph: IndicGlyphInfo) {
	return (glyph.shaperInfo.category as number) & HALANT_OR_COENG_FLAGS;
}

/**
 * Probes whether applying `feature` to the supplied glyphs would substitute
 * them down to a single glyph. NOTE: mutates the passed-in `glyphs` (both
 * each glyph's `features` and the array contents). Callers must pass copies.
 */
function wouldSubstitute(
	glyphs: IndicGlyphInfo[],
	feature: OpenType.FeatureTag,
) {
	for (const glyph of glyphs) {
		glyph.features = { [feature]: true };
	}

	const GSUB = (glyphs[0].font.layoutEngine.engine as OpenTypeLayoutEngine<unknown>)?.gsubProcessor;
	if (!GSUB) {
		return false;
	}

	GSUB.applyFeatures([feature], glyphs);

	return glyphs.length === 1;
}

function consonantPosition(
	_font: TrueTypeFont,
	consonant: IndicGlyphInfo,
	virama: IndicGlyphInfo,
): number {
	const glyphs = [virama, consonant, virama];
	if (
		wouldSubstitute(glyphs.slice(0, 2), 'blwf') ||
		wouldSubstitute(glyphs.slice(1, 3), 'blwf')
	) {
		return POSITIONS.Below_C;
	} else if (
		wouldSubstitute(glyphs.slice(0, 2), 'pstf') ||
		wouldSubstitute(glyphs.slice(1, 3), 'pstf')
	) {
		return POSITIONS.Post_C;
	} else if (
		wouldSubstitute(glyphs.slice(0, 2), 'pref') ||
		wouldSubstitute(glyphs.slice(1, 3), 'pref')
	) {
		return POSITIONS.Post_C;
	}

	return POSITIONS.Base_C;
}

function initialReordering(
	font: TrueTypeFont,
	glyphs: IndicGlyphInfo[],
	plan: ShapingPlan<IndicInfo>,
) {
	const indicConfig = plan.indicConfig!;
	const features = (font.layoutEngine.engine as OpenTypeLayoutEngine<unknown>)?.gsubProcessor?.features;

	const dottedCircle = font.glyphForCodePoint(0x25cc)?.id;
	if (!dottedCircle) {
		throw new Error(
			`Fontkit IndicShaper Exception: Cannot shape complex script. ` +
				'The font is missing the mandatory Dotted Circle placeholder ' +
				'character (U+25CC).',
		);
	}
	const virama = font.glyphForCodePoint(indicConfig!.virama)?.id;

	if (virama) {
		const info = new GlyphInfo<IndicInfo>(font, virama, [indicConfig.virama]);
		for (let i = 0; i < glyphs.length; i++) {
			if (glyphs[i].shaperInfo.position === POSITIONS.Base_C) {
				glyphs[i].shaperInfo.position = consonantPosition(
					font,
					glyphs[i].copy() as IndicGlyphInfo,
					info as IndicGlyphInfo,
				);
			}
		}
	}

	for (
		let start = 0, end = nextSyllable(glyphs, 0);
		start < glyphs.length;
		start = end, end = nextSyllable(glyphs, start)
	) {
		const syllableType = glyphs[start].shaperInfo?.syllableType;

		if (
			syllableType === 'symbol_cluster' ||
			syllableType === 'non_indic_cluster'
		) {
			continue;
		}

		if (syllableType === 'broken_cluster' && dottedCircle) {
			const g: IndicGlyphInfo = new GlyphInfo<IndicInfo>(
				font,
				dottedCircle,
				[0x25cc],
			) as IndicGlyphInfo;
			g.shaperInfo = new IndicInfo(
				1 << indicCategory(g),
				indicPosition(g),
				glyphs[start].shaperInfo.syllableType,
				glyphs[start].shaperInfo.syllable,
			);

			// Insert after possible Repha.
			let i = start;
			while (i < end && glyphs[i].shaperInfo.category === CATEGORIES.Repha) {
				i++;
			}

			glyphs.splice(i++, 0, g);
			end++;
		}

		// 1. Find base consonant:
		//
		// The shaping engine finds the base consonant of the syllable, using the
		// following algorithm: starting from the end of the syllable, move backwards
		// until a consonant is found that does not have a below-base or post-base
		// form (post-base forms have to follow below-base forms), or that is not a
		// pre-base reordering Ra, or arrive at the first consonant. The consonant
		// stopped at will be the base.

		let base = end;
		let limit = start;
		let hasReph = false;

		// If the syllable starts with Ra + Halant (in a script that has Reph)
		// and has more than one consonant, Ra is excluded from candidates for
		// base consonants.
		if (
			indicConfig.rephPos !== POSITIONS.Ra_To_Become_Reph &&
			features?.rphf &&
			start + 3 <= end &&
			((indicConfig.rephMode === 'Implicit' && !isJoiner(glyphs[start + 2])) ||
				(indicConfig.rephMode === 'Explicit' &&
					glyphs[start + 2].shaperInfo.category === CATEGORIES.ZWJ))
		) {
			// See if it matches the 'rphf' feature.
			const g = [
				glyphs[start].copy() as IndicGlyphInfo,
				glyphs[start + 1].copy() as IndicGlyphInfo,
				glyphs[start + 2].copy() as IndicGlyphInfo,
			];
			if (
				wouldSubstitute(g.slice(0, 2), 'rphf') ||
				(indicConfig.rephMode === 'Explicit' && wouldSubstitute(g, 'rphf'))
			) {
				limit += 2;
				while (limit < end && isJoiner(glyphs[limit])) {
					limit++;
				}
				base = start;
				hasReph = true;
			}
		} else if (
			indicConfig.rephMode === 'Log_Repha' &&
			glyphs[start].shaperInfo.category === CATEGORIES.Repha
		) {
			limit++;
			while (limit < end && isJoiner(glyphs[limit])) {
				limit++;
			}
			base = start;
			hasReph = true;
		}

		switch (indicConfig.basePos) {
			case 'Last': {
				// starting from the end of the syllable, move backwards
				let i = end;
				let seenBelow = false;

				do {
					const info = glyphs[--i].shaperInfo;

					// until a consonant is found
					if (isConsonant(glyphs[i])) {
						// that does not have a below-base or post-base form
						// (post-base forms have to follow below-base forms),
						if (
							info.position !== POSITIONS.Below_C &&
							(info.position !== POSITIONS.Post_C || seenBelow)
						) {
							base = i;
							break;
						}

						// or that is not a pre-base reordering Ra,
						//
						// IMPLEMENTATION NOTES:
						//
						// Our pre-base reordering Ra's are marked POS_POST_C, so will be skipped
						// by the logic above already.
						//

						// or arrive at the first consonant. The consonant stopped at will
						// be the base.
						if (info.position === POSITIONS.Below_C) {
							seenBelow = true;
						}

						base = i;
					} else if (
						start < i &&
						info.category === CATEGORIES.ZWJ &&
						glyphs[i - 1].shaperInfo.category === CATEGORIES.H
					) {
						// A ZWJ after a Halant stops the base search, and requests an explicit
						// half form.
						// A ZWJ before a Halant, requests a subjoined form instead, and hence
						// search continues.  This is particularly important for Bengali
						// sequence Ra,H,Ya that should form Ya-Phalaa by subjoining Ya.
						break;
					}
				} while (i > limit);
				break;
			}

			case 'First': {
				// The first consonant is always the base.
				base = start;

				// Mark all subsequent consonants as below.
				for (let i = base + 1; i < end; i++) {
					if (isConsonant(glyphs[i])) {
						glyphs[i].shaperInfo.position = POSITIONS.Below_C;
					}
				}
			}
		}

		// If the syllable starts with Ra + Halant (in a script that has Reph)
		// and has more than one consonant, Ra is excluded from candidates for
		// base consonants.
		//
		//  Only do this for unforced Reph. (ie. not for Ra,H,ZWJ)
		if (hasReph && base === start && limit - base <= 2) {
			hasReph = false;
		}

		// 2. Decompose and reorder Matras:
		//
		// Each matra and any syllable modifier sign in the cluster are moved to the
		// appropriate position relative to the consonant(s) in the cluster. The
		// shaping engine decomposes two- or three-part matras into their constituent
		// parts before any repositioning. Matra characters are classified by which
		// consonant in a conjunct they have affinity for and are reordered to the
		// following positions:
		//
		//   o Before first half form in the syllable
		//   o After subjoined consonants
		//   o After post-form consonant
		//   o After main consonant (for above marks)
		//
		// IMPLEMENTATION NOTES:
		//
		// The normalize() routine has already decomposed matras for us, so we do not
		// need to worry about that.

		// 3.  Reorder marks to canonical order:
		//
		// Adjacent nukta and halant or nukta and vedic sign are always repositioned
		// if necessary, so that the nukta is first.
		//
		// IMPLEMENTATION NOTES:
		//
		// We do not need to do this: the normalize() routine already did this for us.

		// Reorder characters

		for (let i = start; i < base; i++) {
			const info = glyphs[i].shaperInfo;
			info.position = Math.min(POSITIONS.Pre_C, info.position);
		}

		if (base < end) {
			glyphs[base].shaperInfo.position = POSITIONS.Base_C;
		}

		// Mark final consonants.  A final consonant is one appearing after a matra,
		// like in Khmer.
		for (let i = base + 1; i < end; i++) {
			if (glyphs[i].shaperInfo.category === CATEGORIES.M) {
				for (let j = i + 1; j < end; j++) {
					if (isConsonant(glyphs[j])) {
						glyphs[j].shaperInfo.position = POSITIONS.Final_C;
						break;
					}
				}
				break;
			}
		}

		// Handle beginning Ra
		if (hasReph) {
			glyphs[start].shaperInfo.position = POSITIONS.Ra_To_Become_Reph;
		}

		// For old-style Indic script tags, move the first post-base Halant after
		// last consonant.
		//
		// Reports suggest that in some scripts Uniscribe does this only if there
		// is *not* a Halant after last consonant already (eg. Kannada), while it
		// does it unconditionally in other scripts (eg. Malayalam).  We do not
		// currently know about other scripts, so we single out Malayalam for now.
		//
		// Kannada test case:
		// U+0C9A,U+0CCD,U+0C9A,U+0CCD
		// With some versions of Lohit Kannada.
		// https://bugs.freedesktop.org/show_bug.cgi?id=59118
		//
		// Malayalam test case:
		// U+0D38,U+0D4D,U+0D31,U+0D4D,U+0D31,U+0D4D
		// With lohit-ttf-20121122/Lohit-Malayalam.ttf
		if (plan.isOldSpec) {
			const disallowDoubleHalants = plan.unicodeScript !== 'Malayalam';
			for (let i = base + 1; i < end; i++) {
				if (glyphs[i].shaperInfo.category === CATEGORIES.H) {
					let j: number;
					for (j = end - 1; j > i; j--) {
						if (
							isConsonant(glyphs[j]) ||
							(disallowDoubleHalants &&
								glyphs[j].shaperInfo.category === CATEGORIES.H)
						) {
							break;
						}
					}

					if (glyphs[j].shaperInfo.category !== CATEGORIES.H && j > i) {
						// Move Halant to after last consonant.
						const t = glyphs[i];
						glyphs.splice(i, 0, ...glyphs.splice(i + 1, j - i));
						glyphs[j] = t;
					}

					break;
				}
			}
		}

		// Attach misc marks to previous char to move with them.
		let lastPos = POSITIONS.Start;
		for (let i = start; i < end; i++) {
			const info = glyphs[i].shaperInfo;
			if (
				(info.category as number) &
				(JOINER_FLAGS |
					CATEGORIES.N |
					CATEGORIES.RS |
					CATEGORIES.CM |
					(HALANT_OR_COENG_FLAGS & (info.category as number)))
			) {
				info.position = lastPos;
				if (
					info.category === CATEGORIES.H &&
					info.position === POSITIONS.Pre_M
				) {
					// Uniscribe does not move the Halant with Left Matra.
					// TEST: U+092B,U+093F,U+094DE
					// We follow.  This is important for the Sinhala
					// U+0DDA split matra since it decomposes to U+0DD9,U+0DCA
					// where U+0DD9 is a left matra and U+0DCA is the virama.
					// We do not want to move the virama with the left matra.
					// TEST: U+0D9A,U+0DDA
					for (let j = i; j > start; j--) {
						if (glyphs[j - 1].shaperInfo.position !== POSITIONS.Pre_M) {
							info.position = glyphs[j - 1].shaperInfo.position;
							break;
						}
					}
				}
			} else if (info.position !== POSITIONS.SMVD) {
				lastPos = info.position;
			}
		}

		// For post-base consonants let them own anything before them
		// since the last consonant or matra.
		let last = base;
		for (let i = base + 1; i < end; i++) {
			if (isConsonant(glyphs[i])) {
				for (let j = last + 1; j < i; j++) {
					if (glyphs[j].shaperInfo.position < POSITIONS.SMVD) {
						glyphs[j].shaperInfo.position = glyphs[i].shaperInfo.position;
					}
				}
				last = i;
			} else if (glyphs[i].shaperInfo.category === CATEGORIES.M) {
				last = i;
			}
		}

		const arr = glyphs.slice(start, end);
		arr.sort((a, b) => a.shaperInfo.position - b.shaperInfo.position);
		glyphs.splice(start, arr.length, ...arr);

		// Find base again
		for (let i = start; i < end; i++) {
			if (glyphs[i].shaperInfo.position === POSITIONS.Base_C) {
				base = i;
				break;
			}
		}

		// Setup features now

		// Reph
		for (
			let i = start;
			i < end && glyphs[i].shaperInfo.position === POSITIONS.Ra_To_Become_Reph;
			i++
		) {
			glyphs[i].features.rphf = true;
		}

		// Pre-base
		const blwf = !plan.isOldSpec && indicConfig.blwfMode === 'Pre_And_Post';
		for (let i = start; i < base; i++) {
			glyphs[i].features.half = true;
			if (blwf) {
				glyphs[i].features.blwf = true;
			}
		}

		// Post-base
		for (let i = base + 1; i < end; i++) {
			glyphs[i].features.abvf = true;
			glyphs[i].features.pstf = true;
			glyphs[i].features.blwf = true;
		}

		if (plan.isOldSpec && plan.unicodeScript === 'Devanagari') {
			// Old-spec eye-lash Ra needs special handling.  From the
			// spec:
			//
			// "The feature 'below-base form' is applied to consonants
			// having below-base forms and following the base consonant.
			// The exception is vattu, which may appear below half forms
			// as well as below the base glyph. The feature 'below-base
			// form' will be applied to all such occurrences of Ra as well."
			//
			// Test case: U+0924,U+094D,U+0930,U+094d,U+0915
			// with Sanskrit 2003 font.
			//
			// However, note that Ra,Halant,ZWJ is the correct way to
			// request eyelash form of Ra, so we would not inhibit it
			// in that sequence.
			//
			// Test case: U+0924,U+094D,U+0930,U+094d,U+200D,U+0915
			for (let i = start; i + 1 < base; i++) {
				if (
					glyphs[i].shaperInfo.category === CATEGORIES.Ra &&
					glyphs[i + 1].shaperInfo.category === CATEGORIES.H &&
					(i + 1 === base ||
						glyphs[i + 2].shaperInfo.category === CATEGORIES.ZWJ)
				) {
					glyphs[i].features.blwf = true;
					glyphs[i + 1].features.blwf = true;
				}
			}
		}

		const prefLen = 2;
		if (features?.pref && base + prefLen < end) {
			// Find a Halant,Ra sequence and mark it for pre-base reordering processing.
			for (let i = base + 1; i + prefLen - 1 < end; i++) {
				const g = [
					glyphs[i].copy() as IndicGlyphInfo,
					glyphs[i + 1].copy() as IndicGlyphInfo,
				];
				if (wouldSubstitute(g, 'pref')) {
					for (let j = 0; j < prefLen; j++) {
						glyphs[i++].features.pref = true;
					}

					// Mark the subsequent stuff with 'cfar'.  Used in Khmer.
					// Read the feature spec.
					// This allows distinguishing the following cases with MS Khmer fonts:
					// U+1784,U+17D2,U+179A,U+17D2,U+1782
					// U+1784,U+17D2,U+1782,U+17D2,U+179A
					if (features.cfar) {
						for (; i < end; i++) {
							glyphs[i].features.cfar = true;
						}
					}

					break;
				}
			}
		}

		// Apply ZWJ/ZWNJ effects
		for (let i = start + 1; i < end; i++) {
			if (isJoiner(glyphs[i])) {
				const nonJoiner = glyphs[i].shaperInfo.category === CATEGORIES.ZWNJ;
				let j = i;

				do {
					j--;

					// ZWJ/ZWNJ should disable CJCT.  They do that by simply
					// being there, since we do not skip them for the CJCT
					// feature (ie. F_MANUAL_ZWJ)

					// A ZWNJ disables HALF.
					if (nonJoiner) {
						delete glyphs[j].features.half;
					}
				} while (j > start && !isConsonant(glyphs[j]));
			}
		}
	}
}

function finalReordering(
	font: TrueTypeFont,
	glyphs: IndicGlyphInfo[],
	plan: ShapingPlan<IndicInfo>,
) {
	const indicConfig = plan.indicConfig!;
	const features = (font.layoutEngine.engine as OpenTypeLayoutEngine<unknown>)?.gsubProcessor?.features;

	for (
		let start = 0, end = nextSyllable(glyphs, 0);
		start < glyphs.length;
		start = end, end = nextSyllable(glyphs, start)
	) {
		// 4. Final reordering:
		//
		// After the localized forms and basic shaping forms GSUB features have been
		// applied (see below), the shaping engine performs some final glyph
		// reordering before applying all the remaining font features to the entire
		// cluster.

		let tryPref = !!features?.pref;

		// Find base again
		let base = start;
		for (; base < end; base++) {
			if (glyphs[base].shaperInfo.position >= POSITIONS.Base_C) {
				if (tryPref && base + 1 < end) {
					for (let i = base + 1; i < end; i++) {
						if (glyphs[i].features.pref) {
							if (
								!(
									glyphs[i].substituted &&
									glyphs[i].isLigated &&
									!glyphs[i].isMultiplied
								)
							) {
								// Ok, this was a 'pref' candidate but did not form any.
								// Base is around here...
								base = i;
								while (base < end && isHalantOrCoeng(glyphs[base])) {
									base++;
								}
								glyphs[base].shaperInfo.position = POSITIONS.Base_C;
								tryPref = false;
							}
							break;
						}
					}
				}

				// For Malayalam, skip over unformed below- (but NOT post-) forms.
				if (plan.unicodeScript === 'Malayalam') {
					for (let i = base + 1; i < end; i++) {
						while (i < end && isJoiner(glyphs[i])) {
							i++;
						}

						if (i === end || !isHalantOrCoeng(glyphs[i])) {
							break;
						}

						i++; // Skip halant.
						while (i < end && isJoiner(glyphs[i])) {
							i++;
						}

						if (
							i < end &&
							isConsonant(glyphs[i]) &&
							glyphs[i].shaperInfo.position === POSITIONS.Below_C
						) {
							base = i;
							glyphs[base].shaperInfo.position = POSITIONS.Base_C;
						}
					}
				}

				if (
					start < base &&
					glyphs[base].shaperInfo.position > POSITIONS.Base_C
				) {
					base--;
				}
				break;
			}
		}

		if (
			base === end &&
			start < base &&
			glyphs[base - 1].shaperInfo.category === CATEGORIES.ZWJ
		) {
			base--;
		}

		if (base < end) {
			while (
				start < base &&
				(glyphs[base].shaperInfo.category as number) &
					(CATEGORIES.N | HALANT_OR_COENG_FLAGS)
			) {
				base--;
			}
		}

		// o Reorder matras:
		//
		// If a pre-base matra character had been reordered before applying basic
		// features, the glyph can be moved closer to the main consonant based on
		// whether half-forms had been formed. Actual position for the matra is
		// defined as “after last standalone halant glyph, after initial matra
		// position and before the main consonant”. If ZWJ or ZWNJ follow this
		// halant, position is moved after it.
		//

		if (start + 1 < end && start < base) {
			// Otherwise there cannot be any pre-base matra characters.
			// If we lost track of base, alas, position before last thingy.
			let newPos = base === end ? base - 2 : base - 1;

			// Malayalam / Tamil do not have "half" forms or explicit virama forms.
			// The glyphs formed by 'half' are Chillus or ligated explicit viramas.
			// We want to position matra after them.
			if (
				plan.unicodeScript !== 'Malayalam' &&
				plan.unicodeScript !== 'Tamil'
			) {
				while (
					newPos > start &&
					!(
						(glyphs[newPos].shaperInfo.category as number) &
						(CATEGORIES.M | HALANT_OR_COENG_FLAGS)
					)
				) {
					newPos--;
				}

				// If we found no Halant we are done.
				// Otherwise only proceed if the Halant does
				// not belong to the Matra itself!
				if (
					isHalantOrCoeng(glyphs[newPos]) &&
					glyphs[newPos].shaperInfo.position !== POSITIONS.Pre_M
				) {
					// If ZWJ or ZWNJ follow this halant, position is moved after it.
					if (newPos + 1 < end && isJoiner(glyphs[newPos + 1])) {
						newPos++;
					}
				} else {
					newPos = start; // No move.
				}
			}

			if (
				start < newPos &&
				glyphs[newPos].shaperInfo.position !== POSITIONS.Pre_M
			) {
				// Now go see if there's actually any matras...
				for (let i = newPos; i > start; i--) {
					if (glyphs[i - 1].shaperInfo.position === POSITIONS.Pre_M) {
						const oldPos = i - 1;
						if (oldPos < base && base <= newPos) {
							// Should not happen.
							base--;
						}

						const tmp = glyphs[oldPos];
						glyphs.splice(
							oldPos,
							0,
							...glyphs.splice(oldPos + 1, newPos - oldPos),
						);
						glyphs[newPos] = tmp;

						newPos--;
					}
				}
			}
		}

		// o Reorder reph:
		//
		// Reph’s original position is always at the beginning of the syllable,
		// (i.e. it is not reordered at the character reordering stage). However,
		// it will be reordered according to the basic-forms shaping results.
		// Possible positions for reph, depending on the script, are; after main,
		// before post-base consonant forms, and after post-base consonant forms.

		// Two cases:
		//
		// - If repha is encoded as a sequence of characters (Ra,H or Ra,H,ZWJ), then
		//   we should only move it if the sequence ligated to the repha form.
		//
		// - If repha is encoded separately and in the logical position, we should only
		//   move it if it did NOT ligate.  If it ligated, it's probably the font trying
		//   to make it work without the reordering.
		if (
			start + 1 < end &&
			glyphs[start].shaperInfo.position === POSITIONS.Ra_To_Become_Reph &&
			(glyphs[start].shaperInfo.category === CATEGORIES.Repha) !==
				(glyphs[start].isLigated && !glyphs[start].isMultiplied)
		) {
			let newRephPos: number;
			const rephPos = indicConfig.rephPos;
			let found = false;

			// 1. If reph should be positioned after post-base consonant forms,
			//    proceed to step 5.
			if (rephPos !== POSITIONS.After_Post) {
				//  2. If the reph repositioning class is not after post-base: target
				//     position is after the first explicit halant glyph between the
				//     first post-reph consonant and last main consonant. If ZWJ or ZWNJ
				//     are following this halant, position is moved after it. If such
				//     position is found, this is the target position. Otherwise,
				//     proceed to the next step.
				//
				//     Note: in old-implementation fonts, where classifications were
				//     fixed in shaping engine, there was no case where reph position
				//     will be found on this step.
				newRephPos = start + 1;
				while (newRephPos < base && !isHalantOrCoeng(glyphs[newRephPos])) {
					newRephPos++;
				}

				if (newRephPos < base && isHalantOrCoeng(glyphs[newRephPos])) {
					// ->If ZWJ or ZWNJ are following this halant, position is moved after it.
					if (newRephPos + 1 < base && isJoiner(glyphs[newRephPos + 1])) {
						newRephPos++;
					}

					found = true;
				}

				// 3. If reph should be repositioned after the main consonant: find the
				//    first consonant not ligated with main, or find the first
				//    consonant that is not a potential pre-base reordering Ra.
				if (!found && rephPos === POSITIONS.After_Main) {
					newRephPos = base;
					while (
						newRephPos + 1 < end &&
						glyphs[newRephPos + 1].shaperInfo.position <= POSITIONS.After_Main
					) {
						newRephPos++;
					}

					found = newRephPos < end;
				}

				// 4. If reph should be positioned before post-base consonant, find
				//    first post-base classified consonant not ligated with main. If no
				//    consonant is found, the target position should be before the
				//    first matra, syllable modifier sign or vedic sign.
				//
				// This is our take on what step 4 is trying to say (and failing, BADLY).
				if (!found && rephPos === POSITIONS.After_Sub) {
					newRephPos = base;
					while (
						newRephPos + 1 < end &&
						!(
							glyphs[newRephPos + 1].shaperInfo.position &
							(POSITIONS.Post_C | POSITIONS.After_Post | POSITIONS.SMVD)
						)
					) {
						newRephPos++;
					}

					found = newRephPos < end;
				}
			}

			//  5. If no consonant is found in steps 3 or 4, move reph to a position
			//     immediately before the first post-base matra, syllable modifier
			//     sign or vedic sign that has a reordering class after the intended
			//     reph position. For example, if the reordering position for reph
			//     is post-main, it will skip above-base matras that also have a
			//     post-main position.
			if (!found) {
				// Copied from step 2.
				newRephPos = start + 1;
				while (newRephPos < base && !isHalantOrCoeng(glyphs[newRephPos])) {
					newRephPos++;
				}

				if (newRephPos < base && isHalantOrCoeng(glyphs[newRephPos])) {
					// ->If ZWJ or ZWNJ are following this halant, position is moved after it.
					if (newRephPos + 1 < base && isJoiner(glyphs[newRephPos + 1])) {
						newRephPos++;
					}

					found = true;
				}
			}

			// 6. Otherwise, reorder reph to the end of the syllable.
			if (!found) {
				newRephPos = end - 1;
				while (
					newRephPos > start &&
					glyphs[newRephPos].shaperInfo.position === POSITIONS.SMVD
				) {
					newRephPos--;
				}

				// If the Reph is to be ending up after a Matra,Halant sequence,
				// position it before that Halant so it can interact with the Matra.
				// However, if it's a plain Consonant, Halant we should not do that.
				// Uniscribe does not do this.
				// TEST: U+0930,U+094D,U+0915,U+094B,U+094D
				if (isHalantOrCoeng(glyphs[newRephPos])) {
					for (let i = base + 1; i < newRephPos; i++) {
						if (glyphs[i].shaperInfo.category === CATEGORIES.M) {
							newRephPos--;
						}
					}
				}
			}

			const reph = glyphs[start];
			glyphs.splice(start, 0, ...glyphs.splice(start + 1, newRephPos! - start));
			glyphs[newRephPos!] = reph;

			if (start < base && base <= newRephPos!) {
				base--;
			}
		}

		// o Reorder pre-base reordering consonants:
		//
		// If a pre-base reordering consonant is found, reorder it according to
		// the following rules:
		if (tryPref && base + 1 < end) {
			for (let i = base + 1; i < end; i++) {
				if (glyphs[i].features.pref) {
					// 1. Only reorder a glyph produced by substitution during application
					//    of the <pref> feature. (Note that a font may shape a Ra consonant with
					//    the feature generally but block it in certain contexts.)

					// Note: We just check that something got substituted.  We do not check that
					// the <pref> feature actually did it...
					//
					// Reorder pref only if it ligated.
					if (glyphs[i].isLigated && !glyphs[i].isMultiplied) {
						// 2. Try to find a target position the same way as for pre-base matra.
						//    If it is found, reorder pre-base consonant glyph.
						//
						// 3. If position is not found, reorder immediately before main
						//    consonant.
						let newPos = base;

						// Malayalam / Tamil do not have "half" forms or explicit virama forms.
						// The glyphs formed by 'half' are Chillus or ligated explicit viramas.
						// We want to position matra after them.
						if (
							plan.unicodeScript !== 'Malayalam' &&
							plan.unicodeScript !== 'Tamil'
						) {
							while (
								newPos > start &&
								!(
									(glyphs[newPos - 1].shaperInfo.category as number) &
									(CATEGORIES.M | HALANT_OR_COENG_FLAGS)
								)
							) {
								newPos--;
							}

							// In Khmer coeng model, a H,Ra can go *after* matras.  If it goes after a
							// split matra, it should be reordered to *before* the left part of such matra.
							if (
								newPos > start &&
								glyphs[newPos - 1].shaperInfo.category === CATEGORIES.M
							) {
								const oldPos = i;
								for (let j = base + 1; j < oldPos; j++) {
									if (glyphs[j].shaperInfo.category === CATEGORIES.M) {
										newPos--;
										break;
									}
								}
							}
						}

						if (newPos > start && isHalantOrCoeng(glyphs[newPos - 1])) {
							// -> If ZWJ or ZWNJ follow this halant, position is moved after it.
							if (newPos < end && isJoiner(glyphs[newPos])) {
								newPos++;
							}
						}

						const oldPos = i;
						const tmp = glyphs[oldPos];
						glyphs.splice(
							newPos + 1,
							0,
							...glyphs.splice(newPos, oldPos - newPos),
						);
						glyphs[newPos] = tmp;

						if (newPos <= base && base < oldPos) {
							base++;
						}
					}

					break;
				}
			}
		}

		// Apply 'init' to the Left Matra if it's a word start.
		if (
			glyphs[start].shaperInfo.position === POSITIONS.Pre_M &&
			(!start ||
				!/Cf|Mn/.test(unicode.getCategory(glyphs[start - 1].codePoints[0])))
		) {
			glyphs[start].features.init = true;
		}
	}
}

function nextSyllable(glyphs: IndicGlyphInfo[], start: number) {
	if (start >= glyphs.length) return start;
	const syllable = glyphs[start].shaperInfo.syllable;
	while (
		++start < glyphs.length &&
		glyphs[start].shaperInfo.syllable === syllable
	);
	return start;
}
