import type { CFFIndexRecord } from '../cff/cff-index.js';
import type { OpenTypePostScriptFont } from '../open-type-font.js';
import { Glyph } from './glyph.js';
import { Path } from './path.js';

/**
 * Represents an OpenType PostScript glyph, in the Compact Font Format.
 */
export class CFFGlyph extends Glyph {
	public usedGsubrs: Record<number, boolean> = {};
	public usedSubrs: Record<number, boolean> = {};

	protected declare _font: OpenTypePostScriptFont;

	// biome-ignore lint/complexity/noUselessConstructor:required for property narrowing.
	constructor(
		id: number,
		codePoints: readonly number[],
		font: OpenTypePostScriptFont,
	) {
		super(id, codePoints, font);
	}

	getName() {
		if (this._font.outlineVersion === 2) {
			return super.getName();
		}

		return this._font['CFF '].getGlyphName(this.id);
	}

	bias(s: CFFIndexRecord[]): number {
		if (s.length < 1240) {
			return 107;
		} else if (s.length < 33900) {
			return 1131;
		} else {
			return 32768;
		}
	}

	getPath(): Path {
		const { stream } = this._font;

		const cff =
			this._font.outlineVersion === 2 ? this._font.CFF2 : this._font['CFF '];
		const str = cff.topDict.CharStrings[this.id];
		let end = str.offset + str.length;
		stream.pos = str.offset;

		const path = new Path();
		const stack: number[] = [];
		const trans: number[] = [];

		let width: number | null = null;
		let nStems = 0;
		let x = 0,
			y = 0;
		let usedGsubrs: Record<number, boolean>;
		let usedSubrs: Record<number, boolean>;
		let open = false;

		this.usedGsubrs = usedGsubrs = {};
		this.usedSubrs = usedSubrs = {};

		const gsubrs = cff.globalSubrIndex || [];
		const gsubrsBias = this.bias(gsubrs);

		const privateDict = cff.privateDictForGlyph(this.id);
		const subrs = privateDict?.Subrs || [];
		const subrsBias = this.bias(subrs);

		const vstore = cff.topDict.vstore?.itemVariationStore;
		let vsindex = privateDict?.vsindex;
		const variationProcessor = this._font.variationProcessor;

		function checkWidth() {
			if (width == null) {
				width = stack.shift()! + (privateDict?.nominalWidthX ?? 0);
			}
		}

		function parseStems() {
			if (stack.length % 2 !== 0) {
				checkWidth();
			}

			nStems += stack.length >> 1;
			stack.length = 0;

			return stack.length;
		}

		function moveTo(x: number, y: number) {
			if (open) {
				path.closePath();
			}

			path.moveTo(x, y);
			open = true;
		}

		const parse = () => {
			while (stream.pos < end) {
				let op = stream.readUInt8();
				let phase: boolean;
				let index: number;
				let subr: CFFIndexRecord;
				let a: number;
				let b: number;
				let idx: number;
				let pts: number[];
				if (op < 32) {
					switch (op) {
						case 1: // hstem
						case 3: // vstem
						case 18: // hstemhm
						case 23: // vstemhm
							parseStems();
							break;

						case 4: // vmoveto
							if (stack.length > 1) {
								checkWidth();
							}

							y += stack.shift()!;
							moveTo(x, y);
							break;

						case 5: // rlineto
							while (stack.length >= 2) {
								x += stack.shift()!;
								y += stack.shift()!;
								path.lineTo(x, y);
							}
							break;

						case 6: // hlineto
						case 7: // vlineto
							phase = op === 6;
							while (stack.length >= 1) {
								if (phase) {
									x += stack.shift()!;
								} else {
									y += stack.shift()!;
								}

								path.lineTo(x, y);
								phase = !phase;
							}
							break;

						case 8: // rrcurveto
							while (stack.length > 0) {
								const c1x = x + stack.shift()!;
								const c1y = y + stack.shift()!;
								const c2x = c1x + stack.shift()!;
								const c2y = c1y + stack.shift()!;
								x = c2x + stack.shift()!;
								y = c2y + stack.shift()!;
								path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
							}
							break;

						case 10: // callsubr
							{
								index = stack.pop()! + subrsBias;
								subr = subrs[index];
								if (subr) {
									usedSubrs[index] = true;
									const p = stream.pos;
									const e = end;
									stream.pos = subr.offset;
									end = subr.offset + subr.length;
									parse();
									stream.pos = p;
									end = e;
								}
							}
							break;

						case 11: // return
							if (cff.version >= 2) {
								break;
							}
							return;

						case 14: // endchar
							if (cff.version >= 2) {
								break;
							}

							if (stack.length > 0) {
								checkWidth();
							}

							if (open) {
								path.closePath();
								open = false;
							}
							break;

						case 15: {
							// vsindex
							if (cff.version < 2) {
								throw new Error('vsindex operator not supported in CFF v1');
							}

							vsindex = stack.pop()!;
							break;
						}

						case 16: {
							// blend
							if (cff.version < 2) {
								throw new Error('blend operator not supported in CFF v1');
							}

							if (!variationProcessor) {
								throw new Error('blend operator in non-variation font');
							}

							const blendVector = variationProcessor.getBlendVector(
								vstore,
								vsindex!,
							)!;
							const numBlends = stack.pop()!;
							let numOperands = numBlends * blendVector.length;
							let delta = stack.length - numOperands;
							const base = delta - numBlends;

							for (let i = 0; i < numBlends; i++) {
								let sum = stack[base + i];
								for (let j = 0; j < blendVector.length; j++) {
									sum += blendVector[j] * stack[delta++];
								}

								stack[base + i] = sum;
							}

							while (numOperands--) {
								stack.pop()!;
							}

							break;
						}

						case 19: // hintmask
						case 20: // cntrmask
							parseStems();
							stream.pos += (nStems + 7) >> 3;
							break;

						case 21: // rmoveto
							if (stack.length > 2) {
								checkWidth();
							}

							x += stack.shift()!;
							y += stack.shift()!;
							moveTo(x, y);
							break;

						case 22: // hmoveto
							if (stack.length > 1) {
								checkWidth();
							}

							x += stack.shift()!;
							moveTo(x, y);
							break;

						case 24: // rcurveline
							while (stack.length >= 8) {
								const c1x = x + stack.shift()!;
								const c1y = y + stack.shift()!;
								const c2x = c1x + stack.shift()!;
								const c2y = c1y + stack.shift()!;
								x = c2x + stack.shift()!;
								y = c2y + stack.shift()!;
								path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
							}

							x += stack.shift()!;
							y += stack.shift()!;
							path.lineTo(x, y);
							break;

						case 25: // rlinecurve
							while (stack.length >= 8) {
								x += stack.shift()!;
								y += stack.shift()!;
								path.lineTo(x, y);
							}

							{
								const c1x = x + stack.shift()!;
								const c1y = y + stack.shift()!;
								const c2x = c1x + stack.shift()!;
								const c2y = c1y + stack.shift()!;
								x = c2x + stack.shift()!;
								y = c2y + stack.shift()!;
								path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
							}
							break;

						case 26: // vvcurveto
							if (stack.length % 2) {
								x += stack.shift()!;
							}

							while (stack.length >= 4) {
								const c1x = x;
								const c1y = y + stack.shift()!;
								const c2x = c1x + stack.shift()!;
								const c2y = c1y + stack.shift()!;
								x = c2x;
								y = c2y + stack.shift()!;
								path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
							}
							break;

						case 27: // hhcurveto
							if (stack.length % 2) {
								y += stack.shift()!;
							}

							while (stack.length >= 4) {
								const c1x = x + stack.shift()!;
								const c1y = y;
								const c2x = c1x + stack.shift()!;
								const c2y = c1y + stack.shift()!;
								x = c2x + stack.shift()!;
								y = c2y;
								path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
							}
							break;

						case 28: // shortint
							stack.push(stream.readInt16BE());
							break;

						case 29: // callgsubr
							index = stack.pop()! + gsubrsBias;
							subr = gsubrs[index];
							if (subr) {
								usedGsubrs[index] = true;
								const p = stream.pos;
								const e = end;
								stream.pos = subr.offset;
								end = subr.offset + subr.length;
								parse();
								stream.pos = p;
								end = e;
							}
							break;

						case 30: // vhcurveto
						case 31: // hvcurveto
							phase = op === 31;
							while (stack.length >= 4) {
								let c1x: number;
								let c1y: number;
								let c2x: number;
								let c2y: number;
								if (phase) {
									c1x = x + stack.shift()!;
									c1y = y;
									c2x = c1x + stack.shift()!;
									c2y = c1y + stack.shift()!;
									y = c2y + stack.shift()!;
									x = c2x + (stack.length === 1 ? stack.shift()! : 0);
								} else {
									c1x = x;
									c1y = y + stack.shift()!;
									c2x = c1x + stack.shift()!;
									c2y = c1y + stack.shift()!;
									x = c2x + stack.shift()!;
									y = c2y + (stack.length === 1 ? stack.shift()! : 0);
								}

								path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
								phase = !phase;
							}
							break;

						case 12:
							op = stream.readUInt8();
							switch (op) {
								case 3: // and
									a = stack.pop()!;
									b = stack.pop()!;
									stack.push(a && b ? 1 : 0);

									break;

								case 4: // or
									a = stack.pop()!;
									b = stack.pop()!;
									stack.push(a || b ? 1 : 0);
									break;

								case 5: // not
									a = stack.pop()!;
									stack.push(a ? 0 : 1);
									break;

								case 9: // abs
									a = stack.pop()!;
									stack.push(Math.abs(a));
									break;

								case 10: // add
									a = stack.pop()!;
									b = stack.pop()!;
									stack.push(a + b);
									break;

								case 11: // sub
									a = stack.pop()!;
									b = stack.pop()!;
									stack.push(a - b);
									break;

								case 12: // div
									a = stack.pop()!;
									b = stack.pop()!;
									stack.push(a / b);
									break;

								case 14: // neg
									a = stack.pop()!;
									stack.push(-a);
									break;

								case 15: // eq
									a = stack.pop()!;
									b = stack.pop()!;
									stack.push(a === b ? 1 : 0);
									break;

								case 18: // drop
									stack.pop()!;
									break;

								case 20: // put
									{
										const val = stack.pop()!;
										const idx = stack.pop()!;
										trans[idx] = val;
									}
									break;

								case 21: // get
									idx = stack.pop()!;
									stack.push(trans[idx] || 0);
									break;

								case 22: // ifelse
									{
										const s1 = stack.pop()!;
										const s2 = stack.pop()!;
										const v1 = stack.pop()!;
										const v2 = stack.pop()!;
										stack.push(v1 <= v2 ? s1 : s2);
									}
									break;

								case 23: // random
									stack.push(Math.random());
									break;

								case 24: // mul
									a = stack.pop()!;
									b = stack.pop()!;
									stack.push(a * b);
									break;

								case 26: // sqrt
									a = stack.pop()!;
									stack.push(Math.sqrt(a));
									break;

								case 27: // dup
									a = stack.pop()!;
									stack.push(a, a);
									break;

								case 28: // exch
									a = stack.pop()!;
									b = stack.pop()!;
									stack.push(b, a);
									break;

								case 29: // index
									idx = stack.pop()!;
									if (idx < 0) {
										idx = 0;
									} else if (idx > stack.length - 1) {
										idx = stack.length - 1;
									}

									stack.push(stack[idx]);
									break;

								case 30: // roll
									{
										const n = stack.pop()!;
										let j = stack.pop()!;

										if (j >= 0) {
											while (j > 0) {
												const t = stack[n - 1];
												for (let i = n - 2; i >= 0; i--) {
													stack[i + 1] = stack[i];
												}

												stack[0] = t;
												j--;
											}
										} else {
											while (j < 0) {
												const t = stack[0];
												for (let i = 0; i <= n; i++) {
													stack[i] = stack[i + 1];
												}

												stack[n - 1] = t;
												j++;
											}
										}
									}
									break;

								case 34: // hflex
									{
										const c1x = x + stack.shift()!;
										const c1y = y;
										const c2x = c1x + stack.shift()!;
										const c2y = c1y + stack.shift()!;
										const c3x = c2x + stack.shift()!;
										const c3y = c2y;
										const c4x = c3x + stack.shift()!;
										const c4y = c3y;
										const c5x = c4x + stack.shift()!;
										const c5y = c4y;
										const c6x = c5x + stack.shift()!;
										const c6y = c5y;
										x = c6x;
										y = c6y;

										path.bezierCurveTo(c1x, c1y, c2x, c2y, c3x, c3y);
										path.bezierCurveTo(c4x, c4y, c5x, c5y, c6x, c6y);
									}
									break;

								case 35: // flex
									{
										pts = [];

										for (let i = 0; i <= 5; i++) {
											x += stack.shift()!;
											y += stack.shift()!;
											pts.push(x, y);
										}

										path.bezierCurveTo(
											...(pts.slice(0, 6) as [
												number,
												number,
												number,
												number,
												number,
												number,
											]),
										);
										path.bezierCurveTo(
											...(pts.slice(6) as [
												number,
												number,
												number,
												number,
												number,
												number,
											]),
										);
										stack.shift()!; // fd
									}
									break;

								case 36: // hflex1
									{
										const c1x = x + stack.shift()!;
										const c1y = y + stack.shift()!;
										const c2x = c1x + stack.shift()!;
										const c2y = c1y + stack.shift()!;
										const c3x = c2x + stack.shift()!;
										const c3y = c2y;
										const c4x = c3x + stack.shift()!;
										const c4y = c3y;
										const c5x = c4x + stack.shift()!;
										const c5y = c4y + stack.shift()!;
										const c6x = c5x + stack.shift()!;
										const c6y = c5y;
										x = c6x;
										y = c6y;

										path.bezierCurveTo(c1x, c1y, c2x, c2y, c3x, c3y);
										path.bezierCurveTo(c4x, c4y, c5x, c5y, c6x, c6y);
									}
									break;

								case 37: // flex1
									{
										const startx = x;
										const starty = y;

										pts = [];
										for (let i = 0; i <= 4; i++) {
											x += stack.shift()!;
											y += stack.shift()!;
											pts.push(x, y);
										}

										if (Math.abs(x - startx) > Math.abs(y - starty)) {
											// horizontal
											x += stack.shift()!;
											y = starty;
										} else {
											x = startx;
											y += stack.shift()!;
										}

										pts.push(x, y);
										path.bezierCurveTo(
											...(pts.slice(0, 6) as [
												number,
												number,
												number,
												number,
												number,
												number,
											]),
										);
										path.bezierCurveTo(
											...(pts.slice(6) as [
												number,
												number,
												number,
												number,
												number,
												number,
											]),
										);
									}
									break;

								default:
									throw new Error(`Unknown op: 12 ${op}`);
							}
							break;

						default:
							throw new Error(`Unknown op: ${op}`);
					}
				} else if (op < 247) {
					stack.push(op - 139);
				} else if (op < 251) {
					const b1 = stream.readUInt8();
					stack.push((op - 247) * 256 + b1 + 108);
				} else if (op < 255) {
					const b1 = stream.readUInt8();
					stack.push(-(op - 251) * 256 - b1 - 108);
				} else {
					stack.push(stream.readInt32BE() / 65536);
				}
			}
		};

		parse();

		if (open) {
			path.closePath();
		}

		return path;
	}
}
