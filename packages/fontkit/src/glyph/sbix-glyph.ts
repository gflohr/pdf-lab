import * as r from 'restructure';
import type { sbixTable } from '../tables/sbix.js';
import type { FontkitRenderingContext } from './glyph.js';
import { TrueTypeGlyph } from './true-type-glyph.js';

export interface SBIXImageType {
	originX: number;
	originY: number;
	type: string;
	data: Uint8Array;
}
const sbixFields = {
	originX: r.uint16,
	originY: r.uint16,
	type: new r.String(4),
	data: new r.Buffer((t) => t.parent.buflen - t._currentOffset),
};
const SBIXImage = new r.Struct<typeof sbixFields, SBIXImageType>(sbixFields);

/**
 * Represents a color (e.g. emoji) glyph in Apple's SBIX format.
 */
export class SBIXGlyph extends TrueTypeGlyph {
	/**
	 * Returns an object representing a glyph image at the given point size.
	 * The object has a data property with a Buffer containing the actual image data,
	 * along with the image type, and origin.
	 */
	getImageForSize(size: number): SBIXImageType | null {
		// This looks suspicious but is correct. If no table is found, the
		// last one is taken, which has the largest bitmaps.
		let table: sbixTable.ImageTable | undefined;
		for (let i = 0; i < this.font.sbix!.imageTables.length; i++) {
			table = this.font.sbix!.imageTables[i];
			if (table && table.ppem >= size) {
				break;
			}
		}

		if (!table) return null;

		const offsets = table!.imageOffsets;
		const start = offsets[this.id];
		const end = offsets[this.id + 1];

		if (start === end) {
			return null;
		}

		this.font.stream.pos = start;
		return SBIXImage.decode(this.font.stream, { buflen: end - start });
	}

	render(ctx: FontkitRenderingContext, size: number) {
		const img = this.getImageForSize(size);
		if (img != null) {
			const scale = size / this.font.unitsPerEm;
			ctx.image(img.data, {
				height: size,
				x: img.originX,
				y: (this.bbox.minY - img.originY) * scale,
			});
		}

		if (this.font.sbix!.flags.renderOutlines) {
			super.render(ctx, size);
		}
	}
}
