import fs from 'node:fs';
import * as base64 from 'base64-arraybuffer';
import codepoints, { type CodepointEntry } from 'codepoints';
import compileModule from 'dfa/compile.js';
import pako from 'pako';
import UnicodeTrieBuilder from 'unicode-trie/builder.js';

const compile = compileModule.default;

type PositionDependentClass = 'F' | 'M' | 'CM' | 'V' | 'VM' | 'SM';

type IndicPositionalCategory = NonNullable<
	CodepointEntry['indicPositionalCategory']
>;
type IndicSyllabicCategory = NonNullable<
	CodepointEntry['indicSyllabicCategory']
>;

type RelaxedIndicPositionalCategory = IndicPositionalCategory | 'Not_Applicable';

interface OTFPositioningMap {
	Abv?: RelaxedIndicPositionalCategory[];
	Blw?: RelaxedIndicPositionalCategory[];
	Pre?: RelaxedIndicPositionalCategory[];
	Pst?: RelaxedIndicPositionalCategory[];
}
type UsePositionShape = Record<PositionDependentClass, OTFPositioningMap>;

type CategoryType =
	| PositionDependentClass
	| 'B'
	| 'CGJ'
	| 'CS'
	| 'FM'
	| 'GB'
	| 'H'
	| 'HN'
	| 'IND'
	| 'N'
	| 'R'
	| 'Rsv'
	| 'S'
	| 'SUB'
	| 'VS'
	| 'WJ'
	| 'ZWJ'
	| 'ZWNJ'
	| 'O';

type UGCCategory = 'Lo' | 'Sc';
type UISCValue = NonNullable<CodepointEntry['indicSyllabicCategory']> | 'Other';
type UGCValue = CodepointEntry['category'] | { not: UGCCategory };
type UValue = { not: UGCCategory | number[] | number } | number;
interface FeatureCriteria {
	UISC?: UISCValue;
	UGC?: UGCValue;
	U?: UValue;
}
type MatchPattern = FeatureCriteria | UISCValue | number | 'Other';

type CategoryShape = Record<CategoryType, MatchPattern[]>;

type UISCOverrideShape = Record<number, IndicSyllabicCategory>;
type UIPCOverrideShape = Record<
	number,
	RelaxedIndicPositionalCategory
>;

const CATEGORIES = {
	B: [
		{ UISC: 'Number' },
		{ UISC: 'Avagraha', UGC: 'Lo' },
		{ UISC: 'Bindu', UGC: 'Lo' },
		{ UISC: 'Consonant' },
		{ UISC: 'Consonant_Final', UGC: 'Lo' },
		{ UISC: 'Consonant_Head_Letter' },
		{ UISC: 'Consonant_Medial', UGC: 'Lo' },
		{ UISC: 'Consonant_Subjoined', UGC: 'Lo' },
		{ UISC: 'Tone_Letter' },
		{ UISC: 'Vowel', UGC: 'Lo' },
		{ UISC: 'Vowel_Independent' },
		{ UISC: 'Vowel_Dependent', UGC: 'Lo' },
	],
	CGJ: [0x034f],
	CM: ['Nukta', 'Gemination_Mark', 'Consonant_Killer'],
	CS: ['Consonant_With_Stacker'],
	F: [
		{ UISC: 'Consonant_Final', UGC: { not: 'Lo' } },
		{ UISC: 'Consonant_Succeeding_Repha' },
	],
	FM: ['Syllable_Modifier'],
	GB: ['Consonant_Placeholder', 0x2015, 0x2022, 0x25fb, 0x25fc, 0x25fd, 0x25fe],
	H: ['Virama', 'Invisible_Stacker'],
	HN: ['Number_Joiner'],
	IND: [
		'Consonant_Dead',
		'Modifying_Letter',
		{ UGC: 'Po', U: { not: [0x104e, 0x2022] } },
	],
	M: [{ UISC: 'Consonant_Medial', UGC: { not: 'Lo' } }],
	N: ['Brahmi_Joining_Number'],
	R: ['Consonant_Preceding_Repha', 'Consonant_Prefixed'],
	Rsv: [
		{ UGC: 'Cn' }, // TODO
	],
	S: [{ UGC: 'So', U: { not: 0x25cc } }, { UGC: 'Sc' }],
	SM: [0x1b6b, 0x1b6c, 0x1b6d, 0x1b6e, 0x1b6f, 0x1b70, 0x1b71, 0x1b72, 0x1b73],
	SUB: [{ UISC: 'Consonant_Subjoined', UGC: { not: 'Lo' } }],
	V: [
		{ UISC: 'Vowel', UGC: { not: 'Lo' } },
		{ UISC: 'Vowel_Dependent', UGC: { not: 'Lo' } },
		{ UISC: 'Pure_Killer' },
	],
	VM: [
		{ UISC: 'Bindu', UGC: { not: 'Lo' } },
		'Tone_Mark',
		'Cantillation_Mark',
		'Register_Shifter',
		'Visarga',
	],
	VS: [
		0xfe00, 0xfe01, 0xfe02, 0xfe03, 0xfe04, 0xfe05, 0xfe06, 0xfe07, 0xfe08,
		0xfe09, 0xfe0a, 0xfe0b, 0xfe0c, 0xfe0d, 0xfe0e, 0xfe0f,
	],
	WJ: [0x2060],
	ZWJ: ['Joiner'],
	ZWNJ: ['Non_Joiner'],
	O: ['Other'],
} as const satisfies CategoryShape;

const USE_POSITIONS = {
	F: {
		Abv: ['Top'],
		Blw: ['Bottom'],
		Pst: ['Right'],
	},
	M: {
		Abv: ['Top'],
		Blw: ['Bottom'],
		Pst: ['Right'],
		Pre: ['Left'],
	},
	CM: {
		Abv: ['Top'],
		Blw: ['Bottom'],
	},
	V: {
		Abv: ['Top', 'Top_And_Bottom', 'Top_And_Bottom_And_Right', 'Top_And_Right'],
		Blw: ['Bottom', 'Overstruck', 'Bottom_And_Right'],
		Pst: ['Right'],
		Pre: ['Left', 'Top_And_Left', 'Top_And_Left_And_Right', 'Left_And_Right'],
	},
	VM: {
		Abv: ['Top'],
		Blw: ['Bottom', 'Overstruck'],
		Pst: ['Right'],
		Pre: ['Left'],
	},
	SM: {
		Abv: ['Top'],
		Blw: ['Bottom'],
	},
} as const satisfies UsePositionShape;

const UISC_OVERRIDE = {
	6109: 'Vowel_Dependent',
	7394: 'Cantillation_Mark',
	7395: 'Cantillation_Mark',
	7396: 'Cantillation_Mark',
	7397: 'Cantillation_Mark',
	7398: 'Cantillation_Mark',
	7399: 'Cantillation_Mark',
	7400: 'Cantillation_Mark',
	7405: 'Tone_Mark',
} as const satisfies UISCOverrideShape;

const UIPC_OVERRIDE = {
	7020: 'Bottom',
	2387: 'Not_Applicable',
	2388: 'Not_Applicable',
	4156: 'Left',
	43302: 'Top',
	43303: 'Top',
	43304: 'Top',
	43305: 'Top',
	43306: 'Top',
	70090: 'Bottom',
	70400: 'Top',
	70460: 'Bottom',
	71454: 'Left',
	7410: 'Right',
	7411: 'Right',
	7416: 'Top',
	7417: 'Top',
} as const satisfies UIPCOverrideShape;

//function check(pattern?: UISCValue | UGCValue | UValue, value?: UISCValue | UGCValue | UValue) {
function check(pattern?: UISCValue | UGCValue | UValue, value?: UISCValue | UGCValue | UValue) {
	if (typeof pattern === 'object' && pattern.not) {
		if (Array.isArray(pattern.not)) {
			return pattern.not.indexOf(value as never) === -1;
		} else {
			return value !== pattern.not;
		}
	}

	return value === pattern;
}

function matches(pattern: MatchPattern, code: FeatureCriteria) {
	let matcher: FeatureCriteria;
	if (typeof pattern === 'number') {
		matcher = { U: pattern };
	} else if (typeof pattern === 'string') {
		matcher = { UISC: pattern as UISCValue };
	} else {
		matcher = pattern;
	}

	const matcherKeys = Object.keys(matcher) as Array<keyof FeatureCriteria>
	for (const key of matcherKeys) {
		if (!check(matcher[key], code[key])) {
			return false;
		}
	}

	return true;
}

function getUISC(code: CodepointEntry): IndicSyllabicCategory | 'Other' {
	const codepoint = code.code as keyof typeof UISC_OVERRIDE;

	return UISC_OVERRIDE[codepoint] || code.indicSyllabicCategory || 'Other';
}

function getUIPC(
	code: CodepointEntry,
): RelaxedIndicPositionalCategory {
	const codepoint = code.code as keyof typeof UIPC_OVERRIDE;

	return UIPC_OVERRIDE[codepoint] || code.indicPositionalCategory;
}

function getPositionalCategory(
	code: CodepointEntry,
	USE: CategoryType,
): string {
	const UIPC = getUIPC(code);
	const pos: OTFPositioningMap | undefined =
		USE_POSITIONS[USE as PositionDependentClass];

	if (pos) {
		const posKeys = Object.keys(pos) as Array<keyof OTFPositioningMap>;

		for (const key of posKeys) {
			const groupArray = pos[key];

			if (groupArray && groupArray.indexOf(UIPC) !== -1) {
				return USE + key;
			}
		}
	}

	return USE;
}

function getCategory(code: CodepointEntry): string | null {
	const categoryKeys = Object.keys(CATEGORIES) as CategoryType[];
	for (const category of categoryKeys) {
		for (const pattern of CATEGORIES[category]) {
			if (
				matches(pattern, {
					UISC: getUISC(code),
					UGC: code.category,
					U: code.code,
				})
			) {
				return getPositionalCategory(code, category);
			}
		}
	}

	return null;
}

const trie = new UnicodeTrieBuilder();
const symbols: Record<string, number> = {};
let numSymbols = 0;
const decompositions: Record<number, unknown> = {};
for (let i = 0; i < codepoints.length; i++) {
	const codepoint = codepoints[i];
	if (codepoint) {
		const category = getCategory(codepoint);
		if (category) {
			if (!(category in symbols)) {
				symbols[category] = numSymbols++;
			}

			trie.set(codepoint.code, symbols[category]);
		}
		if (
			codepoint.indicSyllabicCategory === 'Vowel_Dependent' &&
			codepoint.decomposition.length > 0
		) {
			decompositions[codepoint.code] = decompose(codepoint.code);
		}
	}
}

function decompose(code: number) {
	const decomposition: number[] = [];
	const codepoint = codepoints[code];
	for (const c of codepoint.decomposition) {
		let codes = decompose(c);
		codes = codes.length > 0 ? codes : [c];
		decomposition.push(...codes);
	}

	return decomposition;
}

// Trie is serialized suboptimally as JSON so it can be loaded via require,
// allowing unicode-properties to work in the browser
const trieFilePath = `${import.meta.dirname}/trieUse.ts`;
const jsonBase64DeflatedTrie = JSON.stringify(
	base64.encode(pako.deflate(trie.toBuffer()) as unknown as ArrayBuffer),
);
fs.writeFileSync(
	trieFilePath,
	`export default ${jsonBase64DeflatedTrie.replace(/"/g, "'")}\n`,
);

const stateMachine = compile(
	fs.readFileSync(`${import.meta.dirname}/use.machine`, 'utf8'),
	symbols,
);
const json = Object.assign(
	{
		categories: Object.keys(symbols),
		decompositions: decompositions,
	},
	stateMachine,
);

const useFilePath = `${import.meta.dirname}/use.ts`;
const useJsonBytes = new TextEncoder().encode(JSON.stringify(json));
const jsonBase64DeflatedUse = JSON.stringify(
	base64.encode(pako.deflate(useJsonBytes) as unknown as ArrayBuffer),
);
fs.writeFileSync(
	useFilePath,
	`export default ${jsonBase64DeflatedUse.replace(/"/g, "'")};\n`,
);
