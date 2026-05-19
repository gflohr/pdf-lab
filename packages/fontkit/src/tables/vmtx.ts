import r, { type RestructureLazyArray, type StructT } from '@pdf-lib/restructure';

export interface VmtxTable {
	metrics: RestructureLazyArray<number>;
	bearings: RestructureLazyArray<number>;
}

const VmtxEntry = new r.Struct({
	advance: r.uint16, // The advance height of the glyph
	bearing: r.int16, // The top sidebearing of the glyph
});

// Vertical Metrics Table
const fields = {
	metrics: new r.LazyArray(VmtxEntry, (t) => t.parent.vhea.numberOfMetrics),
	bearings: new r.LazyArray(
		r.int16,
		(t) => t.parent.maxp.numGlyphs - t.parent.vhea.numberOfMetrics,
	),
};

const vmtxTableStruct: StructT<typeof fields, VmtxTable> = new r.Struct<typeof fields, VmtxTable>(fields);

export default vmtxTableStruct;

