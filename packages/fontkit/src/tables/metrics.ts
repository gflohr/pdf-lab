import type { RestructureLazyArray } from '@pdf-lib/restructure';
import type { GlyphAxisMetrics } from '../glyph/glyph';

export interface MetricsTable {
	metrics: RestructureLazyArray<GlyphAxisMetrics>;
	bearings: RestructureLazyArray<number>;
}
