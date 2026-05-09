import type { Encoding } from '../types.js';
import type { GlyphMapper } from './glyph-mapper.js';

export class OverlayMapper implements GlyphMapper {
	constructor(private readonly fallback: GlyphMapper, private readonly overlay?: GlyphMapper) {}

	public get name(): Encoding | 'Identity-H' | 'Identity-V' {
		return this.overlay?.name ?? this.fallback.name;
	}

	public lookup(glyph: number): string {
		if (this.overlay) {
			const result = this.overlay.lookup(glyph);

			if (result !== '\uFFFD') {
				return result;
			}
		}

		return this.fallback.lookup(glyph);
	}

	public lookupCodepoints(glyph: number): number[] {
		if (this.overlay) {
			const result = this.overlay.lookupCodepoints(glyph);

			if (result.length) {
				return result;
			}
		}

		return this.fallback.lookupCodepoints(glyph);
	}
}
