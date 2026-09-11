import * as v from 'valibot';
import { xmpLiteral } from '../../../xmp-schema.js';

/**
 * Boolean values shall be "True" or "False".
 */
export const xmpBoolean = xmpLiteral('Boolean', [v.regex(/^True|False$/)]);
