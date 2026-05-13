/**
 * Represents a glyph bounding box
 */
export interface BoundingBox {
	minX: number /** The minimum X position in the bounding box */;
	minY: number /** The minimum Y position in the bounding box */;
	maxX: number /** The maximum X position in the bounding box */;
	maxY: number /** The maximum Y position in the bounding box */;
	width: number /** The width of the bounding box */;
	height: number /** The height of the bounding box */;
}
