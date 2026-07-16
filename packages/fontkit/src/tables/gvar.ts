import * as r from 'restructure';

export namespace gvarTable {
	export interface gvar {
		version: number;
		axisCount: number;
		globalCoordCount: number;
		globalCoords: number[][];
		glyphCount: number;
		flags: number;
		offsetToData: number;
		offsets: number[];
	}
}

const shortFrac = new r.Fixed(16, 'BE', 14);

const Offset = {
	decode(stream: r.DecodeStream, parent: r.FieldT<unknown>) {
		// In short format, offsets are multiplied by 2.
		// This doesn't seem to be documented by Apple, but it
		// is implemented this way in Freetype.
		//
		// The original version just checked for parent.flags. But only bit
		// 0 should be used. Otherwise, reserved bits may cause decoding
		// errors.
		return (parent as unknown as { flags: number }).flags & 0x1
			? stream.readUInt32BE()
			: stream.readUInt16BE() * 2;
	},
} as r.FieldT<number>;

const gvarStructFields = {
	version: r.uint16,
	reserved: new r.Reserved(r.uint16),
	axisCount: r.uint16,
	globalCoordCount: r.uint16,
	globalCoords: new r.Pointer(
		r.uint32,
		new r.Array(new r.Array(shortFrac, 'axisCount'), 'globalCoordCount'),
	),
	glyphCount: r.uint16,
	flags: r.uint16,
	offsetToData: r.uint32,
	offsets: new r.Array(
		new r.Pointer(Offset, 'void', {
			relativeTo: (ctx) => ctx.offsetToData,
			allowNull: false,
		}),
		(t) => t.glyphCount + 1,
	),
};
/** @internal */
export const gvar = new r.Struct<gvarTable.gvar>(gvarStructFields);
