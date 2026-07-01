import r from '@pdf-lib/restructure';
import type { MetricsTable } from './metrics.js';

export namespace hmtxTable {
	export interface Entry {
		advance: number;
		bearing: number;
	}

	export interface hmtx extends MetricsTable {}
}

const hmtxEntryFields = {
	advance: r.uint16,
	bearing: r.int16,
};
const hmtxEntry = new r.Struct<typeof hmtxEntryFields, hmtxTable.Entry>(
	hmtxEntryFields,
);

const hmtxStructFields = {
	metrics: new r.LazyArray(hmtxEntry, (t) => t.parent.hhea.numberOfMetrics),
	bearings: new r.LazyArray(
		r.int16,
		(t) => t.parent.maxp.numGlyphs - t.parent.hhea.numberOfMetrics,
	),
};

/** @internal */
export const hmtx = new r.Struct<typeof hmtxStructFields, hmtxTable.hmtx>(
	hmtxStructFields,
);
