import type { Glyph } from '../glyph/glyph.js';
import type { SFNTFont, SFNTFontDirectory } from '../sfnt-font.js';

/** @deprecated call the encode() method of {@link Subset} synchronously instead! */
export interface SubsetStream {
	on(eventType: 'data', callback: (data: Uint8Array) => void): this;
	on(eventType: 'end', callback: () => void): this;
}
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

	abstract encode(): Uint8Array;

	/**
	 * @deprecated Call encode() synchronously instead!
	 */
	public encodeStream(): SubsetStream {
		type DataCallback = (data: Uint8Array) => void;
		type EndCallback = () => void;

		let dataCallback: DataCallback | undefined;
		let endCallback: EndCallback | undefined;

		const buffer = this.encode();

		queueMicrotask(() => {
			if (dataCallback) {
				dataCallback(buffer);
			}
			if (endCallback) {
				endCallback();
			}
		});

		const stream: SubsetStream = {
			on(eventType, callback) {
				if (eventType === 'data') {
					dataCallback = callback as DataCallback;
				} else if (eventType === 'end') {
					endCallback = callback as EndCallback;
				}
				return this;
			},
		};

		return stream;
	}
}
