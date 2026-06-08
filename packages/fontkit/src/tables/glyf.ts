import r from '@pdf-lib/restructure';

export namespace glyfTable {
	export type glyph = Buffer[];
}

// Only used for encoding.
export default new r.Array(new r.Buffer());
