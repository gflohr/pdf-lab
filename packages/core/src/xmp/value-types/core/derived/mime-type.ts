import * as v from 'valibot';
import { xmpLiteral } from '../../../xmp-schema.js';

/**
 * A simple text value denoting a digital file format as defined in IETF RFC
 * 2046.
 */
export const xmpMIMEType = xmpLiteral('MIMEType', [
	v.regex(
		/^[a-zA-Z0-9][a-zA-Z0-9!#$&^_.+-]{0,126}\/[a-zA-Z0-9][a-zA-Z0-9!#$&^_.+-]{0,126}$/,
	),
]);
