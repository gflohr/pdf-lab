import type { RestructureLazyArray } from '@pdf-lib/restructure';

export interface MetricsEntry {
	advance: number;
	bearing: number;
}

export interface MetricsTable {
	metrics: RestructureLazyArray<number>;
	bearings: RestructureLazyArray<number>;
}
