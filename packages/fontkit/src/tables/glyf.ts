import r from '@pdf-lib/restructure';

export namespace glyfTable {
	export type glyph = Uint8Array[];
}

// Only used for encoding.
export const glyf = new r.Array(new r.Buffer());
