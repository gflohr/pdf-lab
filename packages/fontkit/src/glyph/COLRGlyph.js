import BBox from './BBox.js';
import Glyph from './glyph.js';

class COLRLayer {
	constructor(glyph, color) {
		this.glyph = glyph;
		this.color = color;
	}
}

/**
 * Represents a color (e.g. emoji) glyph in Microsoft's COLR format.
 * Each glyph in this format contain a list of colored layers, each
 * of which  is another vector glyph.
 */
export default class COLRGlyph extends Glyph {
	_getBBox() {
		const bbox = new BBox();
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
	 * @type {object[]}
	 */
	get layers() {
		const cpal = this._font.CPAL;
		const colr = this._font.COLR;
		let low = 0;
		let high = colr.baseGlyphRecord.length - 1;

		// 1. Declare baseLayer here so it has method scope
		let baseLayer;

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

		// 2. Strict check: since we did not initialize baseLayer,
		// it will be strictly undefined if the loop didn't find a match.
		if (baseLayer === undefined) {
			const g = this._font._getBaseGlyph(this.id);
			const color = {
				red: 0,
				green: 0,
				blue: 0,
				alpha: 255,
			};

			return [new COLRLayer(g, color)];
		}

		const layers = [];
		// 3. Using block-scoped const/let inside the loop
		for (
			let i = baseLayer.firstLayerIndex;
			i < baseLayer.firstLayerIndex + baseLayer.numLayers;
			i++
		) {
			const rec = colr.layerRecords[i];
			const color = cpal.colorRecords[rec.paletteIndex];
			const g = this._font._getBaseGlyph(rec.gid);
			layers.push(new COLRLayer(g, color));
		}

		return layers;
	}

	render(ctx, size) {
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
