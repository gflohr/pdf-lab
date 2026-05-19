import r, { type TypedStruct } from '@pdf-lib/restructure';
import type { MetricsTable } from './metrics.js';

const HmtxEntry = new r.Struct({
	advance: r.uint16,
	bearing: r.int16,
});

export default new r.Struct<MetricsTable>({
	metrics: new r.LazyArray(HmtxEntry, (t) => t.parent.hhea.numberOfMetrics),
	bearings: new r.LazyArray(
		r.int16,
		(t) => t.parent.maxp.numGlyphs - t.parent.hhea.numberOfMetrics,
	),
}) as TypedStruct<MetricsTable>;
