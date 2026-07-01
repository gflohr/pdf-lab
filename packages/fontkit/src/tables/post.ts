import r from '@pdf-lib/restructure';

export namespace postTable {
	/**
	 * Base common headers present across all variations of the PostScript ('post')
	 * table.
	 */
	interface postHeader {
		/** Italic angle in counter-clockwise degrees from the vertical. */
		italicAngle: number;
		/** Suggested distance of the top of the underline from the baseline. */
		underlinePosition: number;
		/** Suggested values for the underline thickness. */
		underlineThickness: number;
		/** Whether the font is monospaced (0 = proportional, non-zero = monospaced). */
		isFixedPitch: number;
		/** Minimum memory usage when a TrueType font is downloaded as a Type 42 font. */
		minMemType42: number;
		/** Maximum memory usage when a TrueType font is downloaded as a Type 42 font. */
		maxMemType42: number;
		/** Minimum memory usage when a TrueType font is downloaded as a Type 1 font. */
		minMemType1: number;
		/** Maximum memory usage when a TrueType font is downloaded as a Type 1 font. */
		maxMemType1: number;
	}

	export interface postV1 extends postHeader {
		version: 1;
	}

	export interface postV2 extends postHeader {
		version: 2;
		numberOfGlyphs: number;
		glyphNameIndex: number[];
		names: string[];
	}

	export interface postV2_5 extends postHeader {
		version: 2.5;
		numberOfGlyphs: number;
		offsets: number[];
	}

	export interface postV3 extends postHeader {
		version: 3;
	}

	export interface postV4 extends postHeader {
		version: 4;
		map: number[];
	}

	/**
	 * Represents the parsed OpenType PostScript information table ('post').
	 */
	export type post = postV1 | postV2 | postV2_5 | postV3 | postV4;
}

interface ParentContext {
	maxp: { numGlyphs: number };
}

const postFields = {
	header: {
		italicAngle: r.fixed32,
		underlinePosition: r.int16,
		underlineThickness: r.int16,
		isFixedPitch: r.uint32,
		minMemType42: r.uint32,
		maxMemType42: r.uint32,
		minMemType1: r.uint32,
		maxMemType1: r.uint32,
	},
	1: {},
	2: {
		numberOfGlyphs: r.uint16,
		glyphNameIndex: new r.Array(r.uint16, 'numberOfGlyphs'),
		names: new r.Array(new r.String(r.uint8)),
	},
	2.5: {
		numberOfGlyphs: r.uint16,
		offsets: new r.Array(r.uint8, 'numberOfGlyphs'),
	},
	3: {},
	4: {
		map: new r.Array(
			r.uint32,
			(t: { parent: ParentContext }) => t.parent.maxp.numGlyphs,
		),
	},
};

/** @internal */
export const post = new r.VersionedStruct<typeof postFields, postTable.post>(
	r.fixed32,
	postFields,
);
