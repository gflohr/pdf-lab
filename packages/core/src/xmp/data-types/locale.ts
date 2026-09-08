import * as v from 'valibot';
import { xmpLiteral } from '../xmp-namespace.js';

/**
 * A simple text value denoting a language code as defined in IETF RFC 3066.
 */
export const xmpLocale = xmpLiteral(
	v.regex(/^[a-zA-Z]{1,8}(?:-[a-zA-Z0-9]{1,8})*$/),
);
