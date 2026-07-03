import type { Glyph } from '../glyph/glyph.js';
import type { kernTable } from '../tables/kern.js';
import { binarySearch } from '../utils.js';
import type { GlyphPosition } from './glyph-position.js';

export class KernProcessor {
	constructor(private readonly kern: kernTable.kern) {}

	public process(glyphs: Glyph[], positions: GlyphPosition[]) {
		for (let glyphIndex = 0; glyphIndex < glyphs.length - 1; glyphIndex++) {
			const left = glyphs[glyphIndex].id;
			const right = glyphs[glyphIndex + 1].id;
			positions[glyphIndex].xAdvance += this.getKerning(left, right);
		}
	}

	private getKerning(left: number, right: number): number {
		let res = 0;

		for (const table of this.kern.tables) {
			if (table.coverage.crossStream) {
				continue;
			}

			switch (table.version) {
				case 0:
					if (!table.coverage.horizontal) {
						continue;
					}

					break;
				case 1:
					if (table.coverage.vertical || table.coverage.variation) {
						continue;
					}

					break;
				default:
					throw new Error(
						`Unsupported kerning table version ${(table as { version: number }).version}`,
					);
			}

			let val = 0;
			const s = table.subtable;
			switch (s.version) {
				case 0: {
					const pairIdx = binarySearch(
						s.pairs,
						(pair) => left - pair.left || right - pair.right,
					);

					if (pairIdx >= 0) {
						val = s.pairs[pairIdx].value;
					}

					break;
				}

				case 2: {
					let leftOffset = 0,
						rightOffset = 0;
					if (
						left >= s.leftTable.firstGlyph &&
						left < s.leftTable.firstGlyph + s.leftTable.nGlyphs
					) {
						leftOffset = s.leftTable.offsets[left - s.leftTable.firstGlyph];
					} else {
						leftOffset = s.array.off;
					}

					if (
						right >= s.rightTable.firstGlyph &&
						right < s.rightTable.firstGlyph + s.rightTable.nGlyphs
					) {
						rightOffset = s.rightTable.offsets[right - s.rightTable.firstGlyph];
					}

					const index = (leftOffset + rightOffset - s.array.off) / 2;
					val = s.array.values.get(index);
					break;
				}

				case 3:
					if (left >= s.glyphCount || right >= s.glyphCount) {
						return 0;
					}

					val =
						s.kernValue[
							s.kernIndex[
								s.leftClass[left] * s.rightClassCount + s.rightClass[right]
							]
						];
					break;

				default:
					throw new Error(
						`Unsupported kerning sub-table format ${table.format}`,
					);
			}

			// Microsoft supports the override flag, which resets the result
			// Otherwise, the sum of the results from all subtables is returned
			if (table.version === 0 && table.coverage.override) {
				res = val;
			} else {
				res += val;
			}
		}

		return res;
	}
}
