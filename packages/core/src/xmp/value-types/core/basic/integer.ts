import * as v from 'valibot';
import type { XmpValueType } from '../../../xmp-schema.js';

/**
 * A signed or unsigned numeric string used as an integer number
 * representation. The string consists of an arbitrary-length decimal numeric
 * string with an optional leading "+" or "–" sign.
 */
export const xmpInteger: XmpValueType = {
	name: 'Integer',
	validationActions: [v.regex(/^[-+]?[0-9]+$/)],
};
