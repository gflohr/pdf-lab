import { Textdomain } from '@esgettext/runtime';
import type { FontMap } from 'pdf-lab-core';

function parseSpec(spec: string): [string, string] | [string, string, string] | undefined {
	const result: string[] = [];
	let current = '';

	for (let i = 0; i < spec.length; i++) {
		const ch = spec[i];

		if (ch === ',') {
			if (spec[i + 1] === ',') {
				current += ',';
				i++;
			} else {
				result.push(current.trim());
				current = '';
			}
		} else {
			current += ch;
		}
	}

	result.push(current.trim());

	if (result.length < 2 || result.length > 3) return;

	return result as [string, string, string];
}

export function fontMapSpec(specArgs: string[] | string): FontMap {
	const specs = typeof specArgs === 'string' ? [specArgs] : specArgs;
	const fontMap: FontMap = {};

	for (const spec of specs) {
		const entry = parseSpec(spec);
		if (!entry) {
			const gtx = Textdomain.getInstance('pdf-lab');

			throw new Error(gtx._x("invalid font map specification '{spec}'", { spec }));
		}

		fontMap[entry[0]] = {
			source: entry[1],
			postScriptName: entry[2],
		};
	}

	return fontMap;
}
