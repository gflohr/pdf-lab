import * as v from 'valibot';
import { xmpLiteral } from '../../../xmp-schema.js';

/**
 * Generates a closed {@link Choice}.
 */
export function xmpClosedChoice(choices: string[]) {
	const allowed = new Set(choices);

	return xmpLiteral('Choice', [
		v.check(
			(input) => typeof input === 'string' && allowed.has(input),
			`Value must be one of: ${choices.map((c) => `'${c}'`).join(', ')}`,
		),
	]);
}
