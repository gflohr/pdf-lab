import r from '@pdf-lib/restructure';
import type { MetricsTable } from './metrics.js';

export namespace hmtxTable {
	export interface hmtx extends MetricsTable {}
}

const HmtxEntry = new r.Struct({
	advance: r.uint16,
	bearing: r.int16,
});

const fields = {
	metrics: new r.LazyArray(HmtxEntry, (t) => t.parent.hhea.numberOfMetrics),
	bearings: new r.LazyArray(
		r.int16,
		(t) => t.parent.maxp.numGlyphs - t.parent.hhea.numberOfMetrics,
	),
};

const hmtxTableStruct = new r.Struct<typeof fields, hmtxTable.hmtx>(fields);

export default hmtxTableStruct;
