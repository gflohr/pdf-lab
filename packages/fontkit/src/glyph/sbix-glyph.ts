import r from '@pdf-lib/restructure';
import type { sbixTable } from '../tables/sbix.js';
import type { FontkitRenderingContext } from './glyph.js';
import TTFGlyph from './ttf-glyph.js';

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
export default class SBIXGlyph extends TTFGlyph {
	/**
	 * Returns an object representing a glyph image at the given point size.
	 * The object has a data property with a Buffer containing the actual image data,
	 * along with the image type, and origin.
	 */
	getImageForSize(size: number): SBIXImageType | null {
		// FIXME! This looks suspicious! If no table with ppem >= size is
		// found, table is the last table. Is that correct?
		let table: sbixTable.ImageTable;
		for (let i = 0; i < this._font.sbix!.imageTables.length; i++) {
			table = this._font.sbix!.imageTables[i];
			if (table.ppem >= size) {
				break;
			}
		}

		const offsets = table!.imageOffsets;
		const start = offsets[this.id];
		const end = offsets[this.id + 1];

		if (start === end) {
			return null;
		}

		this._font.stream.pos = start;
		return SBIXImage.decode(this._font.stream, { buflen: end - start });
	}

	render(ctx: FontkitRenderingContext, size: number) {
		const img = this.getImageForSize(size);
		if (img != null) {
			const scale = size / this._font.unitsPerEm;
			ctx.image(img.data, {
				height: size,
				x: img.originX,
				y: (this.bbox.minY - img.originY) * scale,
			});
		}

		if (this._font.sbix!.flags.renderOutlines) {
			super.render(ctx, size);
		}
	}
}
