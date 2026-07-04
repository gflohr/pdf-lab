import type { COLRTable } from '../tables/COLR.js';
import { BoundingBox } from './bounding-box.js';
import { type FontkitRenderingContext, Glyph } from './glyph.js';

interface Color {
	red: number;
	green: number;
	blue: number;
	alpha: number;
}

class COLRLayer {
	constructor(
		public glyph: Glyph,
		public color: Color,
	) {}
}

/**
 * Represents a color (e.g. emoji) glyph in Microsoft's COLR format.
 * Each glyph in this format contain a list of colored layers, each
 * of which  is another vector glyph.
 */
export class COLRGlyph extends Glyph {
	getBBox(): BoundingBox {
		const bbox = new BoundingBox();
		for (let i = 0; i < this.layers.length; i++) {
			const layer = this.layers[i];
			const b = layer.glyph.bbox;
			bbox.addPoint(b.minX, b.minY);
			bbox.addPoint(b.maxX, b.maxY);
		}

		return bbox;
	}

	/**
	 * Returns an array of objects containing the glyph and color for
	 * each layer in the composite color glyph.
	 */
	get layers(): COLRLayer[] {
		const cpal = this._font.CPAL;

		// If the color palette table is missing, fall back directly to the
		// standard monochrome base glyph representation in flat black.
		if (!cpal) {
			const g = this._font.getBaseGlyph(this.id);
			if (!g) {
				return [];
			}

			const color: Color = { red: 0, green: 0, blue: 0, alpha: 255 };
			return [new COLRLayer(g, color)];
		}

		const colr = this._font.COLR!;
		let low = 0;
		let high = colr.baseGlyphRecord.length - 1;

		let baseLayer: COLRTable.BaseGlyphRecord | undefined;

		while (low <= high) {
			const mid = (low + high) >> 1;
			const rec = colr.baseGlyphRecord[mid];

			if (this.id < rec.gid) {
				high = mid - 1;
			} else if (this.id > rec.gid) {
				low = mid + 1;
			} else {
				baseLayer = rec;
				break;
			}
		}

		if (baseLayer === undefined) {
			const g = this._font.getBaseGlyph(this.id);
			if (!g) {
				return [];
			}
			const color: Color = {
				red: 0,
				green: 0,
				blue: 0,
				alpha: 255,
			};

			return [new COLRLayer(g, color)];
		}

		const layers: COLRLayer[] = [];
		for (
			let i = baseLayer.firstLayerIndex;
			i < baseLayer.firstLayerIndex + baseLayer.numLayers;
			i++
		) {
			const rec = colr.layerRecords[i];
			const color = cpal.colorRecords[rec.paletteIndex];
			const g = this._font.getBaseGlyph(rec.gid);
			if (g) {
				layers.push(new COLRLayer(g, color));
			}
		}

		return layers;
	}

	render(ctx: FontkitRenderingContext, size: number) {
		for (const { glyph, color } of this.layers) {
			ctx.fillColor(
				[color.red, color.green, color.blue],
				(color.alpha / 255) * 100,
			);
			glyph.render(ctx, size);
		}

		return;
	}
}
