import BBox from './BBox.js';

const SVG_COMMANDS = {
	moveTo: 'M',
	lineTo: 'L',
	quadraticCurveTo: 'Q',
	bezierCurveTo: 'C',
	closePath: 'Z',
};

/**
 * Path objects are returned by glyphs and represent the actual
 * vector outlines for each glyph in the font. Paths can be converted
 * to SVG path data strings, or to functions that can be applied to
 * render the path to a graphics context.
 */
export default class Path {
	constructor() {
		this.commands = [];
		this._bbox = null;
		this._cbox = null;
	}

	/**
	 * Compiles the path to a JavaScript function that can be applied with
	 * a graphics context in order to render the path.
	 * @return {string}
	 */
	toFunction() {
		return (ctx) =>
			this.commands.forEach((c) => {
				ctx[c.command].apply(ctx, c.args);
			});
	}

	/**
	 * Converts the path to an SVG path data string
	 * @return {string}
	 */
	toSVG() {
		const cmds = this.commands.map((c) => {
			const args = c.args.map((arg) => Math.round(arg * 100) / 100);
			return `${SVG_COMMANDS[c.command]}${args.join(' ')}`;
		});

		return cmds.join('');
	}

	/**
	 * Gets the "control box" of a path.
	 * This is like the bounding box, but it includes all points including
	 * control points of bezier segments and is much faster to compute than
	 * the real bounding box.
	 * @type {BBox}
	 */
	get cbox() {
		if (!this._cbox) {
			const cbox = new BBox();
			for (const command of this.commands) {
				for (let i = 0; i < command.args.length; i += 2) {
					cbox.addPoint(command.args[i], command.args[i + 1]);
				}
			}

			this._cbox = Object.freeze(cbox);
		}

		return this._cbox;
	}

	/**
	 * Gets the exact bounding box of the path by evaluating curve segments.
	 * Slower to compute than the control box, but more accurate.
	 * @type {BBox}
	 */
	get bbox() {
		if (this._bbox) {
			return this._bbox;
		}

		const bbox = new BBox();
		let cx = 0,
			cy = 0;

		const f = (t) =>
			(1 - t) ** 3 * p0[i] +
			3 * (1 - t) ** 2 * t * p1[i] +
			3 * (1 - t) * t ** 2 * p2[i] +
			t ** 3 * p3[i];

		for (let c of this.commands) {
			switch (c.command) {
				case 'moveTo':
				case 'lineTo': {
					const [x, y] = c.args;
					bbox.addPoint(x, y);
					cx = x;
					cy = y;
					break;
				}

				case 'quadraticCurveTo':
				case 'bezierCurveTo': {
					let qp1x;
					let qp1y;
					let p3x;
					let p3y;
					let cp1x;
					let cp1y;
					let cp2x;
					let cp2y;
					if (c.command === 'quadraticCurveTo') {
						// http://fontforge.org/bezier.html
						[qp1x, qp1y, p3x, p3y] = c.args;
						cp1x = cx + (2 / 3) * (qp1x - cx); // CP1 = QP0 + 2/3 * (QP1-QP0)
						cp1y = cy + (2 / 3) * (qp1y - cy);
						cp2x = p3x + (2 / 3) * (qp1x - p3x); // CP2 = QP2 + 2/3 * (QP1-QP2)
						cp2y = p3y + (2 / 3) * (qp1y - p3y);
					} else {
						[cp1x, cp1y, cp2x, cp2y, p3x, p3y] = c.args;
					}

					// http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
					bbox.addPoint(p3x, p3y);

					const p0 = [cx, cy];
					const p1 = [cp1x, cp1y];
					const p2 = [cp2x, cp2y];
					const p3 = [p3x, p3y];

					for (let i = 0; i <= 1; i++) {
						const b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
						const a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
						c = 3 * p1[i] - 3 * p0[i];

						if (a === 0) {
							if (b === 0) {
								continue;
							}

							const t = -c / b;
							if (0 < t && t < 1) {
								if (i === 0) {
									bbox.addPoint(f(t), bbox.maxY);
								} else if (i === 1) {
									bbox.addPoint(bbox.maxX, f(t));
								}
							}

							continue;
						}

						const b2ac = b ** 2 - 4 * c * a;
						if (b2ac < 0) {
							continue;
						}

						const t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
						if (0 < t1 && t1 < 1) {
							if (i === 0) {
								bbox.addPoint(f(t1), bbox.maxY);
							} else if (i === 1) {
								bbox.addPoint(bbox.maxX, f(t1));
							}
						}

						const t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
						if (0 < t2 && t2 < 1) {
							if (i === 0) {
								bbox.addPoint(f(t2), bbox.maxY);
							} else if (i === 1) {
								bbox.addPoint(bbox.maxX, f(t2));
							}
						}
					}

					cx = p3x;
					cy = p3y;
					break;
				}
			}
		}

		this._bbox = Object.freeze(bbox);

		return this._bbox;
	}

	/**
	 * Applies a mapping function to each point in the path.
	 * @param {function} fn
	 * @return {Path}
	 */
	mapPoints(fn) {
		const path = new Path();

		for (const c of this.commands) {
			const args = [];
			for (let i = 0; i < c.args.length; i += 2) {
				const [x, y] = fn(c.args[i], c.args[i + 1]);
				args.push(x, y);
			}

			path[c.command](...args);
		}

		return path;
	}

	/**
	 * Transforms the path by the given matrix.
	 */
	transform(m0, m1, m2, m3, m4, m5) {
		return this.mapPoints((x, y) => {
			x = m0 * x + m2 * y + m4;
			// FIXME! This looks wrong, because it uses the overwritten x!
			y = m1 * x + m3 * y + m5;
			return [x, y];
		});
	}

	/**
	 * Translates the path by the given offset.
	 */
	translate(x, y) {
		return this.transform(1, 0, 0, 1, x, y);
	}

	/**
	 * Rotates the path by the given angle (in radians).
	 */
	rotate(angle) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return this.transform(cos, sin, -sin, cos, 0, 0);
	}

	/**
	 * Scales the path.
	 */
	scale(scaleX, scaleY = scaleX) {
		return this.transform(scaleX, 0, 0, scaleY, 0, 0);
	}
}

for (const command of [
	'moveTo',
	'lineTo',
	'quadraticCurveTo',
	'bezierCurveTo',
	'closePath',
]) {
	Path.prototype[command] = function (...args) {
		this._bbox = this._cbox = null;
		this.commands.push({
			command,
			args,
		});

		return this;
	};
}
