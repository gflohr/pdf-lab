import unicode from '@pdf-lib/unicode-properties';
import * as base64 from 'base64-arraybuffer';
import type { CodepointEntry } from 'codepoints';
import pako from 'pako';
import UnicodeTrie from 'unicode-trie';
import type { OpenType } from '../../tables/opentype.js';
import type { GlyphInfo } from '../glyph-info.js';
import type { ShapingPlan } from '../shaping-plan.js';
import { DefaultShaper } from './default-shaper.js';
// Trie is serialized as a Buffer in node, but here
// we may be running in a browser so we make an Uint8Array.
import base64DeflatedTrie from './trie.js';

const trieData = pako.inflate(base64.decode(base64DeflatedTrie));
const trie = new UnicodeTrie(trieData);

const FEATURES: OpenType.FeatureTag[] = [
	'isol',
	'fina',
	'fin2',
	'fin3',
	'medi',
	'med2',
	'init',
];

enum ShapingStateIndex {
	Non_Joining = 0,
	Left_Joining = 1,
	Right_Joining = 2,
	Dual_Joining = 3,
	ALAPH = 4,
	DALATH_RISH = 5,
	Transparent = 6,
}

type ShapingClass =
	| NonNullable<CodepointEntry['joiningType']>
	| 'ALAPH'
	| 'DALATH RISH';

const shapingClasses: Record<ShapingClass, number> = {
	Non_Joining: ShapingStateIndex.Non_Joining,
	Left_Joining: ShapingStateIndex.Left_Joining,
	Right_Joining: ShapingStateIndex.Right_Joining,
	Dual_Joining: ShapingStateIndex.Dual_Joining,
	Join_Causing: ShapingStateIndex.Dual_Joining, // maps to the same state
	ALAPH: ShapingStateIndex.ALAPH,
	'DALATH RISH': ShapingStateIndex.DALATH_RISH,
	Transparent: ShapingStateIndex.Transparent,
};

type OpenTypeFeatureTagRelaxed = OpenType.FeatureTag | null;
const ISOL: OpenTypeFeatureTagRelaxed = 'isol';
const FINA: OpenTypeFeatureTagRelaxed = 'fina';
const FIN2: OpenTypeFeatureTagRelaxed = 'fin2';
const FIN3: OpenTypeFeatureTagRelaxed = 'fin3';
const MEDI: OpenTypeFeatureTagRelaxed = 'medi';
const MED2: OpenTypeFeatureTagRelaxed = 'med2';
const INIT: OpenTypeFeatureTagRelaxed = 'init';
const NONE: OpenTypeFeatureTagRelaxed = null;

type StateTableEntry = [
	OpenTypeFeatureTagRelaxed,
	OpenTypeFeatureTagRelaxed,
	number,
];
type StateTableItem = [
	StateTableEntry,
	StateTableEntry,
	StateTableEntry,
	StateTableEntry,
	StateTableEntry,
	StateTableEntry,
];
type StateTable = [
	StateTableItem,
	StateTableItem,
	StateTableItem,
	StateTableItem,
	StateTableItem,
	StateTableItem,
	StateTableItem,
];

// Each entry is [prevAction, curAction, nextState]
const STATE_TABLE: StateTable = [
	//   Non_Joining,        Left_Joining,       Right_Joining,     Dual_Joining,           ALAPH,            DALATH RISH
	// State 0: prev was U,  not willing to join.
	[
		[NONE, NONE, 0],
		[NONE, ISOL, 2],
		[NONE, ISOL, 1],
		[NONE, ISOL, 2],
		[NONE, ISOL, 1],
		[NONE, ISOL, 6],
	],

	// State 1: prev was R or ISOL/ALAPH,  not willing to join.
	[
		[NONE, NONE, 0],
		[NONE, ISOL, 2],
		[NONE, ISOL, 1],
		[NONE, ISOL, 2],
		[NONE, FIN2, 5],
		[NONE, ISOL, 6],
	],

	// State 2: prev was D/L in ISOL form,  willing to join.
	[
		[NONE, NONE, 0],
		[NONE, ISOL, 2],
		[INIT, FINA, 1],
		[INIT, FINA, 3],
		[INIT, FINA, 4],
		[INIT, FINA, 6],
	],

	// State 3: prev was D in FINA form,  willing to join.
	[
		[NONE, NONE, 0],
		[NONE, ISOL, 2],
		[MEDI, FINA, 1],
		[MEDI, FINA, 3],
		[MEDI, FINA, 4],
		[MEDI, FINA, 6],
	],

	// State 4: prev was FINA ALAPH,  not willing to join.
	[
		[NONE, NONE, 0],
		[NONE, ISOL, 2],
		[MED2, ISOL, 1],
		[MED2, ISOL, 2],
		[MED2, FIN2, 5],
		[MED2, ISOL, 6],
	],

	// State 5: prev was FIN2/FIN3 ALAPH,  not willing to join.
	[
		[NONE, NONE, 0],
		[NONE, ISOL, 2],
		[ISOL, ISOL, 1],
		[ISOL, ISOL, 2],
		[ISOL, FIN2, 5],
		[ISOL, ISOL, 6],
	],

	// State 6: prev was DALATH/RISH,  not willing to join.
	[
		[NONE, NONE, 0],
		[NONE, ISOL, 2],
		[NONE, ISOL, 1],
		[NONE, ISOL, 2],
		[NONE, FIN3, 5],
		[NONE, ISOL, 6],
	],
];

/**
 * This is a shaper for Arabic, and other cursive scripts.
 * It uses data from ArabicShaping.txt in the Unicode database,
 * compiled to a UnicodeTrie by generate-data.coffee.
 *
 * The shaping state machine was ported from Harfbuzz.
 * https://github.com/behdad/harfbuzz/blob/master/src/hb-ot-shape-complex-arabic.cc
 */
export class ArabicShaper extends DefaultShaper {
	static planFeatures<T>(plan: ShapingPlan<T>) {
		plan.add(['ccmp', 'locl']);
		for (let i = 0; i < FEATURES.length; i++) {
			const feature = FEATURES[i];
			plan.addStage(feature, false);
		}

		plan.addStage('mset');
	}

	protected static assignFeatures(
		plan: ShapingPlan<null>,
		glyphs: GlyphInfo<null>[],
	) {
		DefaultShaper.assignFeatures(plan, glyphs);

		let prev = -1;
		let state = 0;
		const actions: OpenTypeFeatureTagRelaxed[] = [];

		// Apply the state machine to map glyphs to features
		for (let i = 0; i < glyphs.length; i++) {
			let curAction: OpenTypeFeatureTagRelaxed,
				prevAction: OpenTypeFeatureTagRelaxed;
			const glyph = glyphs[i];
			const type = getShapingClass(glyph.codePoints[0]);
			if (type === shapingClasses.Transparent) {
				actions[i] = NONE;
				continue;
			}

			[prevAction, curAction, state] = STATE_TABLE[state][type];

			if (prevAction !== NONE && prev !== -1) {
				actions[prev] = prevAction;
			}

			actions[i] = curAction;
			prev = i;
		}

		// Apply the chosen features to their respective glyphs
		for (let index = 0; index < glyphs.length; index++) {
			const feature = actions[index];
			const glyph = glyphs[index];
			if (feature) {
				glyph.features[feature] = true;
			}
		}
	}
}

function getShapingClass(codePoint: number): number {
	const res = trie.get(codePoint);
	if (res) {
		return res - 1;
	}

	const category = unicode.getCategory(codePoint);
	if (category === 'Mn' || category === 'Me' || category === 'Cf') {
		return shapingClasses.Transparent;
	}

	return shapingClasses.Non_Joining;
}
