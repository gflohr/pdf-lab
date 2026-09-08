import * as v from 'valibot';

/**
 * A signed or unsigned numeric string used as an integer number
 * representation. The string consists of an arbitrary-length decimal numeric
 * string with an optional leading "+" or "–" sign.
 */
export const XMPInteger = v.string();
