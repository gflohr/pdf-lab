import r from '@pdf-lib/restructure';

export namespace EBDTTable {
	export interface BigMetrics {
		height: number;
		width: number;
		horiBearingX: number;
		horiBearingY: number;
		horiAdvance: number;
		vertBearingX: number;
		vertBearingY: number;
		vertAdvance: number;
	}

	export interface SmallMetrics {
		height: number;
		width: number;
		bearingX: number;
		bearingY: number;
		advance: number;
	}

	export interface EBDTComponent {
		glyph: number;
		xOffset: number;
		yOffset: number;
	}

	export interface GlyphV1 {
		version: 1;
		metrics: SmallMetrics;
		data: ByteAligned;
	}

	export interface GlyphV2 {
		version: 2;
		metrics: SmallMetrics;
		data: BitAligned;
	}

	// format 3 is deprecated
	// format 4 is not supported by Microsoft

	export interface GlyphV5 {
		version: 5;
		data: BitAligned;
	}

	export interface GlyphV6 {
		version: 6;
		metrics: BigMetrics;
		data: ByteAligned;
	}

	export interface GlyphV7 {
		version: 7;
		metrics: BigMetrics;
		data: BitAligned;
	}

	export interface GlyphV8 {
		version: 8;
		metrics: SmallMetrics;
		numComponents: number;
		components: EBDTComponent[];
	}

	export interface GlyphV9 {
		version: 9;
		metrics: BigMetrics;
		numComponents: number;
		components: EBDTComponent[];
	}

	export interface GlyphV17 {
		version: 17;
		metrics: SmallMetrics;
		dataLen: number;
		data: Buffer;
	}

	export interface GlyphV18 {
		version: 18;
		metrics: BigMetrics;
		dataLen: number;
		data: Buffer;
	}

	export interface GlyphV19 {
		version: 19;
		dataLen: number;
		data: Buffer;
	}

	export type Glyph =
		| GlyphV1
		| GlyphV2
		| GlyphV5
		| GlyphV6
		| GlyphV7
		| GlyphV8
		| GlyphV9
		| GlyphV17
		| GlyphV18
		| GlyphV19;
}

const bigMetricsFields = {
	height: r.uint8,
	width: r.uint8,
	horiBearingX: r.int8,
	horiBearingY: r.int8,
	horiAdvance: r.uint8,
	vertBearingX: r.int8,
	vertBearingY: r.int8,
	vertAdvance: r.uint8,
};
export const bigMetrics = new r.Struct<
	typeof bigMetricsFields,
	EBDTTable.BigMetrics
>(bigMetricsFields);

const smallMetricsFields = {
	height: r.uint8,
	width: r.uint8,
	bearingX: r.int8,
	bearingY: r.int8,
	advance: r.uint8,
};
export const smallMetrics = new r.Struct<
	typeof smallMetricsFields,
	EBDTTable.SmallMetrics
>(smallMetricsFields);

const ebdtComponentFields = {
	glyph: r.uint16,
	xOffset: r.int8,
	yOffset: r.int8,
};
const ebdtComponent = new r.Struct<
	typeof ebdtComponentFields,
	EBDTTable.EBDTComponent
>(ebdtComponentFields);

export class ByteAligned {}
export class BitAligned {}

const glyphFields = {
	1: {
		metrics: smallMetrics,
		data: ByteAligned,
	},

	2: {
		metrics: smallMetrics,
		data: BitAligned,
	},

	// format 3 is deprecated
	// format 4 is not supported by Microsoft

	5: {
		data: BitAligned,
	},

	6: {
		metrics: bigMetrics,
		data: ByteAligned,
	},

	7: {
		metrics: bigMetrics,
		data: BitAligned,
	},

	8: {
		metrics: smallMetrics,
		pad: new r.Reserved(r.uint8),
		numComponents: r.uint16,
		components: new r.Array(ebdtComponent, 'numComponents'),
	},

	9: {
		metrics: bigMetrics,
		pad: new r.Reserved(r.uint8),
		numComponents: r.uint16,
		components: new r.Array(ebdtComponent, 'numComponents'),
	},

	17: {
		metrics: smallMetrics,
		dataLen: r.uint32,
		data: new r.Buffer('dataLen'),
	},

	18: {
		metrics: bigMetrics,
		dataLen: r.uint32,
		data: new r.Buffer('dataLen'),
	},

	19: {
		dataLen: r.uint32,
		data: new r.Buffer('dataLen'),
	},
};
export const glyph = new r.VersionedStruct<typeof glyphFields, EBDTTable.Glyph>(
	'version',
	glyphFields,
);
