import type { GlyphMapper } from '../mappers/glyph-mapper.js';

export function octetsToGlyphIds(
	octets: Uint8Array,
	mapper: GlyphMapper,
): number[] {
	const glyphs: number[] = [];
	for (let i = 0; i < octets.length; ++i) {
		let glyphId = 0;
		let match = false;
		for (let j = 0; j < 4; ++j) {
			const nextByte = octets[i + j];
			if (typeof nextByte === 'undefined') break;
			glyphId = (glyphId << 8) | nextByte;

			const cps = mapper.lookupCodePoints(glyphId);
			if (cps.length) {
				i += j;
				glyphs.push(glyphId);
				match = true;
				break;
			}
		}

		if (!match) {
			glyphs.push(0);
		}
	}

	return glyphs;
}
