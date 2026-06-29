import r from '@pdf-lib/restructure';
import {
	type OpenType,
	openTypeClassDef,
	openTypeCoverage,
	openTypeDevice,
} from './opentype.js';
import { itemVariationStore, type OpenTypeVariation } from './variations.js';

export namespace GDEFTable {}

export namespace GDEFTable {
	export interface AttachList {
		coverage: OpenType.Coverage;
		glyphPoint: number;
		attachPoints: number[];
	}

	/** Design units only. */
	export interface CaretValueV1 {
		coordinate: number;
	}

	/** Contour point. */
	export interface CaretValueV2 {
		caretValuePoint: number;
	}

	/** Design units plus Device table. */
	export interface CaretValueV3 {
		coordinate: number;
		deviceTable: OpenType.Device;
	}

	export type CaretValue = CaretValueV1 | CaretValueV2 | CaretValueV3;

	export interface LigCaretList {
		coverage: OpenType.Coverage;
		ligGlyphCount: number;
		ligGlyphs: CaretValue[];
	}

	export interface MarkGlyphSetsDef {
		markSetTableFormat: number;
		markSetCount: number;
		coverage: OpenType.Coverage;
	}

	export interface GDEFHeader {
		glyphClassDef: OpenType.ClassDef;
		attachList: AttachList;
		ligCaretList: LigCaretList;
		markAttachClassDef: OpenType.ClassDef;
	}

	export interface GDEFV1_1 extends GDEFHeader {
		version: 65536;
	}

	export interface GDEFV1_3 extends GDEFHeader {
		version: 65538;
		markGlyphSetsDef: MarkGlyphSetsDef;
	}

	export interface GDEFV1_4 extends GDEFHeader {
		version: 65539;
		markGlyphSetsDef: MarkGlyphSetsDef;
		itemVariationStore: OpenTypeVariation.ItemVariationStore;
	}

	export type GDEF = GDEFV1_1 | GDEFV1_3 | GDEFV1_4;
}

const attachPoint = new r.Array(r.uint16, r.uint16);
const attachListFields = {
	coverage: new r.Pointer(r.uint16, openTypeCoverage),
	glyphCount: r.uint16,
	attachPoints: new r.Array(new r.Pointer(r.uint16, attachPoint), 'glyphCount'),
};
const attachList = new r.Struct<typeof attachListFields, GDEFTable.AttachList>(
	attachListFields,
);

const caretValueFields = {
	1: {
		// Design units only
		coordinate: r.int16,
	},

	2: {
		// Contour point
		caretValuePoint: r.uint16,
	},

	3: {
		// Design units plus Device table
		coordinate: r.int16,
		deviceTable: new r.Pointer(r.uint16, openTypeDevice),
	},
};
const caretValue = new r.VersionedStruct<
	typeof caretValueFields,
	GDEFTable.CaretValue
>(r.uint16, caretValueFields);

const ligGlyph = new r.Array(new r.Pointer(r.uint16, caretValue), r.uint16);

const ligCaretListFields = {
	coverage: new r.Pointer(r.uint16, openTypeCoverage),
	ligGlyphCount: r.uint16,
	ligGlyphs: new r.Array(new r.Pointer(r.uint16, ligGlyph), 'ligGlyphCount'),
};
const ligCaretList = new r.Struct<
	typeof ligCaretListFields,
	GDEFTable.LigCaretList
>(ligCaretListFields);

const markGlyphSetsDefFields = {
	markSetTableFormat: r.uint16,
	markSetCount: r.uint16,
	coverage: new r.Array(
		new r.Pointer(r.uint32, openTypeCoverage),
		'markSetCount',
	),
};
const markGlyphSetsDef = new r.Struct<
	typeof markGlyphSetsDefFields,
	GDEFTable.MarkGlyphSetsDef
>(markGlyphSetsDefFields);

const gdefStructFields = {
	header: {
		glyphClassDef: new r.Pointer(r.uint16, openTypeClassDef),
		attachList: new r.Pointer(r.uint16, attachList),
		ligCaretList: new r.Pointer(r.uint16, ligCaretList),
		markAttachClassDef: new r.Pointer(r.uint16, openTypeClassDef),
	},

	65536: {},
	65538: {
		markGlyphSetsDef: new r.Pointer(r.uint16, markGlyphSetsDef),
	},
	65539: {
		markGlyphSetsDef: new r.Pointer(r.uint16, markGlyphSetsDef),
		itemVariationStore: new r.Pointer(r.uint32, itemVariationStore),
	},
};
export const GDEF = new r.VersionedStruct<
	typeof gdefStructFields,
	GDEFTable.GDEF
>(r.uint32, gdefStructFields);
