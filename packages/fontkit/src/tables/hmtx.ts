import r from '@pdf-lib/restructure';

export interface MetricsEntry {
	advance: number;
	bearing: number;
}

export interface RestructureLazyArray<T> extends Array<T> {
	get(index: number): T | undefined;
}

export interface HmtxTable {
	metrics: RestructureLazyArray<number>;
	bearings: RestructureLazyArray<number>;
}

const HmtxEntry = new r.Struct({
	advance: r.uint16,
	bearing: r.int16,
});

export default new r.Struct<HmtxTable>({
	metrics: new r.LazyArray(HmtxEntry, (t) => t.parent.hhea.numberOfMetrics),
	bearings: new r.LazyArray(
		r.int16,
		(t) => t.parent.maxp.numGlyphs - t.parent.hhea.numberOfMetrics,
	),
});
