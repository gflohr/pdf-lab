import type { RestructureLazyArray } from 'restructure';
import type { GlyphAxisMetrics } from '../glyph/glyph.js';

export interface MetricsTable {
	metrics: RestructureLazyArray<GlyphAxisMetrics>;
	bearings: RestructureLazyArray<number>;
}
