import r from '@pdf-lib/restructure';
import type { GlyphAxisMetrics } from '../glyph/glyph.js';
import type { MetricsTable } from './metrics.js';

export namespace vmtxTable {
	export interface vmtx extends MetricsTable {}
}

/**
 * Context interface mapping parent table structures required during
 * dynamic runtime array slicing calculation phases.
 */
interface VmtxParentContext {
	parent: {
		vhea: { numberOfMetrics: number };
		maxp: { numGlyphs: number };
	};
}

const VmtxEntryFields = {
	advance: r.uint16, // The advance height of the glyph
	bearing: r.int16, // The top sidebearing of the glyph
};

const VmtxEntryStruct = new r.Struct<typeof VmtxEntryFields, GlyphAxisMetrics>(
	VmtxEntryFields,
);

// Vertical Metrics Table
const vmtxFields = {
	metrics: new r.LazyArray(
		VmtxEntryStruct,
		(t: VmtxParentContext) => t.parent.vhea.numberOfMetrics,
	),
	bearings: new r.LazyArray(
		r.int16,
		(t: VmtxParentContext) =>
			t.parent.maxp.numGlyphs - t.parent.vhea.numberOfMetrics,
	),
};

const vmtxTableStruct = new r.Struct<typeof vmtxFields, vmtxTable.vmtx>(
	vmtxFields,
);

export default vmtxTableStruct;
