import type { Glyph } from '../glyph/glyph.js';
import type { SFNTFont, SFNTFontDirectory } from '../sfnt-font.js';

export abstract class Subset {
	protected readonly glyphs: number[];
	private readonly mapping: Record<number, number>;

	constructor(protected readonly font: SFNTFont<SFNTFontDirectory>) {
		this.font = font;
		this.glyphs = [];
		this.mapping = {};

		// always include the missing glyph
		this.includeGlyph(0);
	}

	public includeGlyph(glyph: number | Glyph): number {
		if (typeof glyph === 'object') {
			glyph = glyph.id;
		}

		if (this.mapping[glyph] == null) {
			this.glyphs.push(glyph);
			this.mapping[glyph] = this.glyphs.length - 1;
		}

		return this.mapping[glyph];
	}

	// FIXME! It probaly makes sense to support the old version, too.
	// It defines encodeStream(), which returns an EncodeStream. And this
	// can be used as an optional argument to encode().
	abstract encode(): Uint8Array;
}
