import type { AAT } from '../tables/aat.js';
import { range } from '../utils.js';

export default class AATLookupTable<T> {
	private glyphsForValueCache: Map<number, number[]>;

	constructor(private readonly table: AAT.LookupTable<T>) {
		this.glyphsForValueCache = new Map();
	}

	public lookup(glyph: number) {
		switch (this.table.version) {
			case 0: // simple array format
			return this.table.values.getItem(glyph);

			case 2: // segment format
			case 4: {
				let min = 0;
				let max = this.table.binarySearchHeader.nUnits - 1;

				while (min <= max) {
					const mid = (min + max) >> 1;
					const seg = this.table.segments[mid];

					// special end of search value
					if (seg.firstGlyph === 0xffff) {
						return null;
					}

					if (glyph < seg.firstGlyph) {
						max = mid - 1;
					} else if (glyph > seg.lastGlyph) {
						min = mid + 1;
					} else {
						if (this.table.version === 2) {
							return this.table.segments[mid].value;
						} else {
							return this.table.segments[mid].values[glyph - seg.firstGlyph];
						}
					}
				}

				return null;
			}

			case 6: {
				// lookup single
				let min = 0;
				let max = this.table.binarySearchHeader.nUnits - 1;

				while (min <= max) {
					const mid = (min + max) >> 1;
					const seg = this.table.segments[mid];

					// special end of search value
					if (seg.glyph === 0xffff) {
						return null;
					}

					if (glyph < seg.glyph) {
						max = mid - 1;
					} else if (glyph > seg.glyph) {
						min = mid + 1;
					} else {
						return seg.value;
					}
				}

				return null;
			}

			case 8: // lookup trimmed
				return this.table.values[glyph - this.table.firstGlyph];

			default:
				throw new Error(`Unknown lookup table format: ${(this.table as {version: number}).version}`);
		}
	}

	private computeGlyphsForValue(classValue: number): number[] {
		const res: number[] = [];

		switch (this.table.version) {
			case 2: // segment format
			case 4: {
				for (let i = 0; i < this.table.segments.length; ++i) {
					if (typeof this.table.segments[i] === 'undefined') {
						continue;
					}

					if (this.table.version === 2) {
						const segment = this.table.segments[i];
						if (segment.value === classValue) {
							res.push(...range(segment.firstGlyph, segment.lastGlyph + 1));
						}
					} else {
						const segment = this.table.segments[i];
						for (let index = 0; index < segment.values.length; index++) {
							if (segment.values[index] === classValue) {
								res.push(segment.firstGlyph + index);
							}
						}
					}
				}

				break;
			}

			case 6: {
				// lookup single
				for (const segment of this.table.segments) {
					if (segment.value === classValue) {
						res.push(segment.glyph);
					}
				}

				break;
			}

			case 8: {
				// lookup trimmed
				for (let i = 0; i < this.table.values.length; i++) {
					if (this.table.values[i] === classValue) {
						res.push(this.table.firstGlyph + i);
					}
				}

				break;
			}

			default:
				throw new Error(`Unknown lookup table format: ${this.table.version}`);
		}

		return res;
	}

	public glyphsForValue(classValue: number): number[] {
		if (!this.glyphsForValueCache.has(classValue)) {
			this.glyphsForValueCache.set(
				classValue,
				this.computeGlyphsForValue(classValue),
			);
		}

		return this.glyphsForValueCache.get(classValue)!;
	}
}
