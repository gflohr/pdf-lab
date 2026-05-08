import type { Encoding } from '../types.js';

export interface GlyphMapper {
	name: Encoding | 'Identity-H' | 'Identity-V';
	lookup(glyph: number): string;
	lookupCodepoints(glyph: number): number[];
}
