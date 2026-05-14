import type { BoundingBox } from './bounding-box.js';

/**
 * Path objects are returned by glyphs and represent the actual vector outlines
 * for each glyph in the font. Paths can be converted to SVG path data strings,
 * or to functions that can be applied to render the path to a graphics context.
 */
export interface Path {
	/**
	 * This property represents the path’s bounding box, i.e. the smallest
	 * rectangle that contains the entire path shape. This is the exact
	 * bounding box, taking into account control points that may be outside the
	 * visible shape.
	 */
	bbox: BoundingBox;

	/**
	 * This property represents the path’s control box. It is like the
	 * bounding box, but it includes all points of the path, including control
	 * points of bezier segments. It is much faster to compute than the real
	 * bounding box, but less accurate if there are control points outside of the
	 * visible shape.
	 */
	cbox: BoundingBox;

	/**
	 * Moves the virtual pen to the given x, y coordinates.
	 */
	moveTo(x: number, y: number): void;

	/**
	 * Adds a line to the path from the current point to the
	 * given x, y coordinates.
	 */
	lineTo(x: number, y: number): void;

	/**
	 * Adds a quadratic curve to the path from the current point to the
	 * given x, y coordinates using cpx, cpy as a control point.
	 */
	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

	/**
	 * Adds a bezier curve to the path from the current point to the
	 * given x, y coordinates using cp1x, cp1y and cp2x, cp2y as control points.
	 */
	bezierCurveTo(
		cp1x: number,
		cp1y: number,
		cp2x: number,
		cp2y: number,
		x: number,
		y: number,
	): void;

	/**
	 * Closes the current sub-path by drawing a straight line back to the
	 * starting point.
	 */
	closePath(): void;

	/**
	 * Compiles the path to a JavaScript function that can be applied with a
	 * graphics context in order to render the path.
	 */
	// biome-ignore lint/complexity/noBannedTypes: needs investigation
	toFunction(): Function;

	/**
	 * Converts the path to an SVG path data string.
	 */
	toSVG(): string;
}
