import * as v from 'valibot';
import type { XmpDynamicValueType } from '../../../xmp-schema.js';

/**
 * Generates a closed {@link Choice}.
 */
export const xmpClosedChoice: XmpDynamicValueType<
	[choices: string[], options?: { strict?: boolean }]
> = (choices, options) => {
	const allowed = new Set(choices);
	return {
		name: 'Choice',
		validationActions: [
			v.check(
				(input) => typeof input === 'string' && allowed.has(input),
				`Value must be one of: ${choices.map((c) => `'${c}'`).join(', ')}`,
			),
		],
		strict: options?.strict ?? false,
	};
};
