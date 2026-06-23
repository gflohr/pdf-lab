import type GlyphInfo from './glyph-info.js';

export type GlyphIteratorFlags = {
	ignoreMarks?: boolean;
	ignoreBaseGlyphs?: boolean;
	ignoreLigatures?: boolean;
	useMarkFilteringSet?: boolean;
	rightToLeft?: boolean;
};

export type GlyphIteratorOptions = {
	flags?: GlyphIteratorFlags;
	markAttachmentType?: number;
};

export default class GlyphIterator<T> {
	public options!: GlyphIteratorOptions;
	public flags!: GlyphIteratorFlags;
	private markAttachmentType!: number;
	public index!: number;

	constructor(
		private glyphs: GlyphInfo<T>[],
		options?: GlyphIteratorOptions,
	) {
		this.reset(options);
	}

	reset(options: GlyphIteratorOptions = {}, index = 0) {
		this.options = options;
		this.flags = options.flags || {};
		this.markAttachmentType = options.markAttachmentType || 0;
		this.index = index;
	}

	get cur(): GlyphInfo<T> | null {
		return this.glyphs[this.index] ?? null;
	}

	shouldIgnore<T>(glyph: GlyphInfo<T>) {
		return (
			(this.flags.ignoreMarks && glyph.isMark) ||
			(this.flags.ignoreBaseGlyphs && glyph.isBase) ||
			(this.flags.ignoreLigatures && glyph.isLigature) ||
			(this.markAttachmentType &&
				glyph.isMark &&
				glyph.markAttachmentType !== this.markAttachmentType)
		);
	}

	move(dir: 1 | -1) {
		this.index += dir;
		while (
			0 <= this.index &&
			this.index < this.glyphs.length &&
			this.shouldIgnore(this.glyphs[this.index])
		) {
			this.index += dir;
		}

		if (0 > this.index || this.index >= this.glyphs.length) {
			return null;
		}

		return this.glyphs[this.index];
	}

	next() {
		return this.move(+1);
	}

	prev() {
		return this.move(-1);
	}

	peek(count = 1) {
		const idx = this.index;
		const res = this.increment(count);
		this.index = idx;
		return res;
	}

	peekIndex(count = 1) {
		const idx = this.index;
		this.increment(count);
		const res = this.index;
		this.index = idx;
		return res;
	}

	increment(count = 1) {
		const dir = count < 0 ? -1 : 1;
		count = Math.abs(count);
		while (count--) {
			this.move(dir);
		}

		return this.glyphs[this.index] ?? null;
	}
}
