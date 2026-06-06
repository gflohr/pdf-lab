import r from '@pdf-lib/restructure';
import { bigMetrics, EBDTTable } from './EBDT.js';

export namespace EBLCTable {
	export interface SBitLineMetrics {
		ascender: number;
		descender: number;
		widthMax: number;
		caretSlopeNumerator: number;
		caretSlopeDenominator: number;
		caretOffset: number;
		minOriginSB: number;
		minAdvanceSB: number;
		maxBeforeBL: number;
		minAfterBL: number;
	}

	export interface CodeOffsetPair {
		glyphCode: number;
		offset: number;
	}

	export interface IndexSubtableHeader {
		imageFormat: number;
		imageDataOffset: number;
	}

	export interface IndexSubtableV1 extends IndexSubtableHeader {
		version: 1;
		offsetArray: number[];
	}

	export interface IndexSubtableV2 extends IndexSubtableHeader {
		version: 2;
		imageSize: number;
		bigMetrics: EBDTTable.BigMetrics;
	}

	export interface IndexSubtableV3 extends IndexSubtableHeader {
		version: 3;
		offsetArray: number[];
	}

	export interface IndexSubtableV4 extends IndexSubtableHeader {
		version: 4;
		numGlyphs: number;
		glyphArray: CodeOffsetPair[];
	}

	export interface IndexSubtableV5 extends IndexSubtableHeader {
		version: 5;
		imageSize: number;
		bigMetrics: EBDTTable.BigMetrics;
		numGlyphs: number;
		glyphCodeArray: number[];
	}

	export type IndexSubtable =
		| IndexSubtableV1
		| IndexSubtableV2
		| IndexSubtableV3
		| IndexSubtableV4
		| IndexSubtableV5;

	export interface IndexSubtableArray {
		firstGlyphIndex: number;
		lastGlyphIndex: number;
		subtable: IndexSubtable | null;
	}

	export interface BitmapSizeTable {
		indexSubTableArray: IndexSubtable | null;
		indexTablesSize: number;
		numberOfIndexSubTables: number;
		colorRef: number;
		hori: SBitLineMetrics;
		vert: SBitLineMetrics;
		startGlyphIndex: number;
		endGlyphIndex: number;
		ppemX: number;
		ppemY: number;
		bitDepth: number;
		flags: {
			horizontal: boolean;
			vertical: boolean;
		};
	}

	export interface EBLC {
		version: number; // 0x00020000
		numSizes: number;
		sizes: BitmapSizeTable[];
	}
}

const sBitLineMetricsFields = {
	ascender: r.int8,
	descender: r.int8,
	widthMax: r.uint8,
	caretSlopeNumerator: r.int8,
	caretSlopeDenominator: r.int8,
	caretOffset: r.int8,
	minOriginSB: r.int8,
	minAdvanceSB: r.int8,
	maxBeforeBL: r.int8,
	minAfterBL: r.int8,
	pad: new r.Reserved(r.int8, 2),
};
const sBitLineMetrics = new r.Struct<
	typeof sBitLineMetricsFields,
	EBLCTable.SBitLineMetrics
>(sBitLineMetricsFields);

const codeOffsetPairFields = {
	glyphCode: r.uint16,
	offset: r.uint16,
};
const codeOffsetPair = new r.Struct<
	typeof codeOffsetPairFields,
	EBLCTable.CodeOffsetPair
>(codeOffsetPairFields);

const indexSubtableFields = {
	header: {
		imageFormat: r.uint16,
		imageDataOffset: r.uint32,
	},

	1: {
		offsetArray: new r.Array(
			r.uint32,
			(t) => t.parent.lastGlyphIndex - t.parent.firstGlyphIndex + 1,
		),
	},

	2: {
		imageSize: r.uint32,
		bigMetrics,
	},

	3: {
		offsetArray: new r.Array(
			r.uint16,
			(t) => t.parent.lastGlyphIndex - t.parent.firstGlyphIndex + 1,
		),
	},

	4: {
		numGlyphs: r.uint32,
		glyphArray: new r.Array(codeOffsetPair, (t) => t.numGlyphs + 1),
	},

	5: {
		imageSize: r.uint32,
		bigMetrics,
		numGlyphs: r.uint32,
		glyphCodeArray: new r.Array(r.uint16, 'numGlyphs'),
	},
};
const indexSubtable = new r.VersionedStruct<
	typeof indexSubtableFields,
	EBLCTable.IndexSubtable
>(r.uint16, indexSubtableFields);

const indexSubTableArrayFields = {
	firstGlyphIndex: r.uint16,
	lastGlyphIndex: r.uint16,
	subtable: new r.Pointer(r.uint32, indexSubtable),
};
const indexSubtableArray = new r.Struct<
	typeof indexSubTableArrayFields,
	EBLCTable.IndexSubtable
>(indexSubTableArrayFields);

const bitmapSizeTableFields = {
	indexSubTableArray: new r.Pointer(
		r.uint32,
		new r.Array(indexSubtableArray, 1),
		{ type: 'parent' },
	),
	indexTablesSize: r.uint32,
	numberOfIndexSubTables: r.uint32,
	colorRef: r.uint32,
	hori: sBitLineMetrics,
	vert: sBitLineMetrics,
	startGlyphIndex: r.uint16,
	endGlyphIndex: r.uint16,
	ppemX: r.uint8,
	ppemY: r.uint8,
	bitDepth: r.uint8,
	flags: new r.Bitfield(r.uint8, ['horizontal', 'vertical']),
};
const bitmapSizeTable = new r.Struct<
	typeof bitmapSizeTableFields,
	EBLCTable.BitmapSizeTable
>(bitmapSizeTableFields);

const eblcStructFields = {
	version: r.uint32, // 0x00020000
	numSizes: r.uint32,
	sizes: new r.Array(bitmapSizeTable, 'numSizes'),
};
export default new r.Struct<typeof eblcStructFields, EBLCTable.EBLC>(
	eblcStructFields,
);
