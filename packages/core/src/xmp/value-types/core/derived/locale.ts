import * as v from 'valibot';
import { xmpLiteral } from '../../../xmp-schema.js';

/**
 * A simple text value denoting a language code as defined in IETF RFC 3066.
 */
export const xmpLocale = xmpLiteral('Locale', [
	v.regex(/^[a-zA-Z]{1,8}(?:-[a-zA-Z0-9]{1,8})*$/),
]);
