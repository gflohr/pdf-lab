import * as r from 'restructure';

export namespace glyfTable {
	export type glyph = Uint8Array[];
}

// Only used for encoding.
/** @internal */
export const glyf = new r.Array(new r.Buffer());
