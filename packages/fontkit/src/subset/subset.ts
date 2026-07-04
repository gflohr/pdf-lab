import r, { type EncodeStream } from '@pdf-lib/restructure';
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

	abstract encode(stream: EncodeStream): void;

	public encodeStream(): EncodeStream {
		const s = new r.EncodeStream();

		process.nextTick(() => {
			this.encode(s);

			return s.end();
		});

		return s;
	}
}
