//
// This script generates a UnicodeTrie containing shaping data derived
// from Unicode properties (currently just for the Arabic shaper).
//

import * as base64 from 'base64-arraybuffer';
import codepoints from 'codepoints';
import fs from 'node:fs';
import pako from 'pako';
import UnicodeTrieBuilder from 'unicode-trie/builder';

const ShapingClasses = {
	Non_Joining: 0,
	Left_Joining: 1,
	Right_Joining: 2,
	Dual_Joining: 3,
	Join_Causing: 3,
	ALAPH: 4,
	'DALATH RISH': 5,
	Transparent: 6,
};

const trie = new UnicodeTrieBuilder();
for (let i = 0; i < codepoints.length; i++) {
	const codepoint = codepoints[i];
	if (codepoint) {
		if (
			codepoint.joiningGroup === 'ALAPH' ||
			codepoint.joiningGroup === 'DALATH RISH'
		) {
			trie.set(codepoint.code, ShapingClasses[codepoint.joiningGroup] + 1);
		} else if (codepoint.joiningType) {
			trie.set(codepoint.code, ShapingClasses[codepoint.joiningType] + 1);
		}
	}
}

// Trie is serialized suboptimally as JSON so it can be loaded via require,
// allowing unicode-properties to work in the browser
// biome-ignore lint/style/useTemplate: breaks things.
const filePath = __dirname + '/trie.json';
const jsonBase64DeflatedTrie = JSON.stringify(
	base64.encode(pako.deflate(trie.toBuffer())),
);
fs.writeFileSync(filePath, `${jsonBase64DeflatedTrie}\n`);
