/**
 * Represents a glyph bounding box
 */
export default class BBox {
	private minX: number;
	private minY: number;
	private maxX: number;
	private maxY: number;

	/**
	 * Create a glyph bounding box from boundaries.
	 *
	 * @param minX the minimum x position in the bounding box
	 * @param minY the minimum y position in the bounding box
	 * @param maxX the maximum x position in the bounding box
	 * @param maxY the maximum y position in the bounding box
	 */
	constructor(
		minX = Infinity,
		minY = Infinity,
		maxX = -Infinity,
		maxY = -Infinity,
	) {
		this.minX = minX;
		this.minY = minY;
		this.maxX = maxX;
		this.maxY = maxY;
	}

	/**
	 * The width of the bounding box.
	 */
	get width(): number {
		return this.maxX - this.minX;
	}

	/**
	 * The height of the bounding box.
	 */
	get height(): number {
		return this.maxY - this.minY;
	}

	/**
	 * Extend the bounding box so that it includes a point.
	 *
	 * @param x the x coordinate of the point to include
	 * @param y the y coordinate of the point to include
	 */
	public addPoint(x: number, y: number): void {
		if (Math.abs(x) !== Infinity) {
			if (x < this.minX) {
				this.minX = x;
			}

			if (x > this.maxX) {
				this.maxX = x;
			}
		}

		if (Math.abs(y) !== Infinity) {
			if (y < this.minY) {
				this.minY = y;
			}

			if (y > this.maxY) {
				this.maxY = y;
			}
		}
	}

	/**
	 * Copy constructor.
	 *
	 * @returns a copy of the bounding box.
	 */
	copy(): BBox {
		return new BBox(this.minX, this.minY, this.maxX, this.maxY);
	}
}
