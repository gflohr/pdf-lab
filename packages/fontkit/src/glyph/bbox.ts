/**
 * Represents a glyph bounding box.
 */
export default class BBox {
	/** The minimum X position in the bounding box. */
	private _minX: number;

	/** The minimum Y position in the bounding box. */
	private _minY: number;

	/** The maximum X position in the bounding box. */
	private _maxX: number;

	/** The maximum Y position in the bounding box. */
	private _maxY: number;

	/**
	 * Creates an instance of a bounding box.
	 *
	 * @param minX - The initial minimum X position. Defaults to `Infinity`.
	 * @param minY - The initial minimum Y position. Defaults to `Infinity`.
	 * @param maxX - The initial maximum X position. Defaults to `-Infinity`.
	 * @param maxY - The initial maximum Y position. Defaults to `-Infinity`.
	 */
	constructor(
		minX: number = Infinity,
		minY: number = Infinity,
		maxX: number = -Infinity,
		maxY: number = -Infinity,
	) {
		this._minX = minX;
		this._minY = minY;
		this._maxX = maxX;
		this._maxY = maxY;
	}

	public get minX(): number {
		return this._minX;
	}

	public get minY(): number {
		return this._minY;
	}

	public get maxX(): number {
		return this._maxX;
	}

	public get maxY(): number {
		return this._maxY;
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
	 * Expands the bounding box to include the specified coordinate point.
	 * Finite coordinates are ignored if they don't expand the current bounds.
	 * Infinite values are explicitly ignored.
	 *
	 * @param x - The X coordinate of the point to add.
	 * @param y - The Y coordinate of the point to add.
	 */
	addPoint(x: number, y: number): void {
		if (Math.abs(x) !== Infinity) {
			if (x < this.minX) {
				this._minX = x;
			}

			if (x > this.maxX) {
				this._maxX = x;
			}
		}

		if (Math.abs(y) !== Infinity) {
			if (y < this.minY) {
				this._minY = y;
			}

			if (y > this.maxY) {
				this._maxY = y;
			}
		}
	}

	/**
	 * Creates a deep copy of the current bounding box instance.
	 *
	 * @returns A new `BBox` instance with matching dimensions.
	 */
	copy(): BBox {
		return new BBox(this.minX, this.minY, this.maxX, this.maxY);
	}
}
