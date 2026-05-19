import BBox from './BBox.js';

const SVG_COMMANDS = {
	moveTo: 'M',
	lineTo: 'L',
	quadraticCurveTo: 'Q',
	bezierCurveTo: 'C',
	closePath: 'Z',
} as const;

export type CommandName = keyof typeof SVG_COMMANDS;

export interface PathCommand {
	command: CommandName;
	args: number[];
}

// A generic interface modeling a canvas or rendering context API.
export interface PathContext {
	moveTo(x: number, y: number): void;
	lineTo(x: number, y: number): void;
	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
	bezierCurveTo(
		cp1x: number,
		cp1y: number,
		cp2x: number,
		cp2y: number,
		x: number,
		y: number,
	): void;
	closePath(): void;
	[key: string]: any; // Allow room for other canvas properties/methods if needed
}

/**
 * Path objects are returned by glyphs and represent the actual
 * vector outlines for each glyph in the font. Paths can be converted
 * to SVG path data strings, or to functions that can be applied to
 * render the path to a graphics context.
 */
export default class Path {
	public commands: PathCommand[];
	private _bbox: Readonly<BBox> | null;
	private _cbox: Readonly<BBox> | null;

	constructor() {
		this.commands = [];
		this._bbox = null;
		this._cbox = null;
	}

	/**
	 * Compiles the path to a function that can be executed against a given
	 * graphics context to render the path.
	 *
	 * @returns A function accepting a graphics context.
	 */
	toFunction(): (ctx: PathContext) => void {
		return (ctx: PathContext) =>
			this.commands.forEach((c) => {
				const method = ctx[c.command];
				if (typeof method === 'function') {
					/** biome-ignore lint/complexity/noBannedTypes: Casting to
					 * 'Function' stops TS from trying to safely merge 0, 2, 4,
					 * and 6-argument function signatures.
					 */
					(method as Function).apply(ctx, c.args);
				}
			});
	}

	/**
	 * Converts the path to an SVG path data string.
	 */
	toSVG(): string {
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
	 */
	get cbox(): Readonly<BBox> {
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
	 */
	get bbox(): Readonly<BBox> {
		if (this._bbox) {
			return this._bbox;
		}

		const bbox = new BBox();
		let cx = 0;
		let cy = 0;

		// Shadow variables to satisfy TS compiler while analysing the dynamic
		// loop logic.
		let p0: number[] = [];
		let p1: number[] = [];
		let p2: number[] = [];
		let p3: number[] = [];
		let i = 0;

		const f = (t: number): number =>
			(1 - t) ** 3 * p0[i] +
			3 * (1 - t) ** 2 * t * p1[i] +
			3 * (1 - t) * t ** 2 * p2[i] +
			t ** 3 * p3[i];

		for (const c of this.commands) {
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
					let qp1x: number;
					let qp1y: number;
					let p3x: number;
					let p3y: number;
					let cp1x: number;
					let cp1y: number;
					let cp2x: number;
					let cp2y: number;

					if (c.command === 'quadraticCurveTo') {
						[qp1x, qp1y, p3x, p3y] = c.args;
						cp1x = cx + (2 / 3) * (qp1x - cx);
						cp1y = cy + (2 / 3) * (qp1y - cy);
						cp2x = p3x + (2 / 3) * (qp1x - p3x);
						cp2y = p3y + (2 / 3) * (qp1y - p3y);
					} else {
						[cp1x, cp1y, cp2x, cp2y, p3x, p3y] = c.args;
					}

					bbox.addPoint(p3x, p3y);

					p0 = [cx, cy];
					p1 = [cp1x, cp1y];
					p2 = [cp2x, cp2y];
					p3 = [p3x, p3y];

					for (i = 0; i <= 1; i++) {
						const b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
						const a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
						const loopC = 3 * p1[i] - 3 * p0[i]; // Renamed local variable 'c' to prevent scope confusion

						if (a === 0) {
							if (b === 0) {
								continue;
							}

							const t = -loopC / b;
							if (0 < t && t < 1) {
								if (i === 0) {
									bbox.addPoint(f(t), bbox.maxY);
								} else if (i === 1) {
									bbox.addPoint(bbox.maxX, f(t));
								}
							}

							continue;
						}

						const b2ac = b ** 2 - 4 * loopC * a;
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
	 * Applies a mapping function to each point coordinate in the path.
	 *
	 * @param fn - A transformation callback yielding a new [x, y] tuple.
	 */
	mapPoints(fn: (x: number, y: number) => [number, number]): Path {
		const path = new Path();

		for (const c of this.commands) {
			const args: number[] = [];
			for (let i = 0; i < c.args.length; i += 2) {
				const [x, y] = fn(c.args[i], c.args[i + 1]);
				args.push(x, y);
			}

			// Using our explicit wrapper method to pipe commands through safely
			path.pushCommand(c.command, args);
		}

		return path;
	}

	/**
	 * Transforms the path by a standard 2D affine transformation matrix.
	 */
	transform(
		m0: number,
		m1: number,
		m2: number,
		m3: number,
		m4: number,
		m5: number,
	): Path {
		return this.mapPoints((x, y) => {
			const newX = m0 * x + m2 * y + m4;
			const newY = m1 * x + m3 * y + m5;
			return [newX, newY];
		});
	}

	/**
	 * Translates the path by the given x and y offsets.
	 */
	translate(x: number, y: number): Path {
		return this.transform(1, 0, 0, 1, x, y);
	}

	/**
	 * Rotates the path by the given angle (in radians).
	 */
	rotate(angle: number): Path {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return this.transform(cos, sin, -sin, cos, 0, 0);
	}

	/**
	 * Scales the path coordinates by the specified scaling parameters.
	 */
	scale(scaleX: number, scaleY: number = scaleX): Path {
		return this.transform(scaleX, 0, 0, scaleY, 0, 0);
	}

	// --- Vector Draw Commands ---

	moveTo(x: number, y: number): this {
		return this.pushCommand('moveTo', [x, y]);
	}

	lineTo(x: number, y: number): this {
		return this.pushCommand('lineTo', [x, y]);
	}

	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this {
		return this.pushCommand('quadraticCurveTo', [cpx, cpy, x, y]);
	}

	bezierCurveTo(
		cp1x: number,
		cp1y: number,
		cp2x: number,
		cp2y: number,
		x: number,
		y: number,
	): this {
		return this.pushCommand('bezierCurveTo', [cp1x, cp1y, cp2x, cp2y, x, y]);
	}

	closePath(): this {
		return this.pushCommand('closePath', []);
	}

	/**
	 * Clears cached bounding boxes and appends a new path operation.
	 */
	private pushCommand(command: CommandName, args: number[]): this {
		this._bbox = this._cbox = null;
		this.commands.push({ command, args });
		return this;
	}
}
