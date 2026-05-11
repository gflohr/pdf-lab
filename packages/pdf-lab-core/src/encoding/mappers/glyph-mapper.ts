import type { Encoding } from '../types.js';

export interface GlyphMapper {
	name: Encoding | 'Identity-H' | 'Identity-V';
	highest: number;
	lookup(glyph: number): string;
	lookupCodePoints(glyph: number): number[];
}
