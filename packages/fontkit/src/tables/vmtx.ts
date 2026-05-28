import r from '@pdf-lib/restructure';
import type { GlyphAxisMetrics } from '../glyph/glyph.js';
import type { MetricsTable } from './metrics.js';

export interface VmtxTable extends MetricsTable {}

const VmtxEntryFields = {
	advance: r.uint16, // The advance height of the glyph
	bearing: r.int16, // The top sidebearing of the glyph
};
const VmtxEntryStruct = new r.Struct<typeof VmtxEntryFields, GlyphAxisMetrics>(VmtxEntryFields);

// Vertical Metrics Table
const VmtxFields = {
	metrics: new r.LazyArray(VmtxEntryStruct, (t) => t.parent.vhea.numberOfMetrics),
	bearings: new r.LazyArray(
		r.int16,
		(t) => t.parent.maxp.numGlyphs - t.parent.vhea.numberOfMetrics,
	),
};
export default new r.Struct<
	typeof VmtxFields,
	VmtxTable
>(VmtxFields);
