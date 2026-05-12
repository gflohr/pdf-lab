import r from '@pdf-lib/restructure';
import { ClassDef, Coverage, Device } from './opentype.js';
import { ItemVariationStore } from './variations.js';

const AttachPoint = new r.Array(r.uint16, r.uint16);
const AttachList = new r.Struct({
	coverage: new r.Pointer(r.uint16, Coverage),
	glyphCount: r.uint16,
	attachPoints: new r.Array(new r.Pointer(r.uint16, AttachPoint), 'glyphCount'),
});

const CaretValue = new r.VersionedStruct(r.uint16, {
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
		deviceTable: new r.Pointer(r.uint16, Device),
	},
});

const LigGlyph = new r.Array(new r.Pointer(r.uint16, CaretValue), r.uint16);

const LigCaretList = new r.Struct({
	coverage: new r.Pointer(r.uint16, Coverage),
	ligGlyphCount: r.uint16,
	ligGlyphs: new r.Array(new r.Pointer(r.uint16, LigGlyph), 'ligGlyphCount'),
});

const MarkGlyphSetsDef = new r.Struct({
	markSetTableFormat: r.uint16,
	markSetCount: r.uint16,
	coverage: new r.Array(new r.Pointer(r.uint32, Coverage), 'markSetCount'),
});

export default new r.VersionedStruct(r.uint32, {
	header: {
		glyphClassDef: new r.Pointer(r.uint16, ClassDef),
		attachList: new r.Pointer(r.uint16, AttachList),
		ligCaretList: new r.Pointer(r.uint16, LigCaretList),
		markAttachClassDef: new r.Pointer(r.uint16, ClassDef),
	},

	65536: {},
	65538: {
		markGlyphSetsDef: new r.Pointer(r.uint16, MarkGlyphSetsDef),
	},
	65539: {
		markGlyphSetsDef: new r.Pointer(r.uint16, MarkGlyphSetsDef),
		itemVariationStore: new r.Pointer(r.uint32, ItemVariationStore),
	},
});
