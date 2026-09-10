import * as v from 'valibot';
import type { XmpValueType } from '../../../xmp-schema.js';

/**
 * Boolean values shall be "True" or "False".
 */
export const xmpBoolean: XmpValueType = {
	name: 'Boolean',
	validationActions: [v.regex(/^True|False$/)],
};
