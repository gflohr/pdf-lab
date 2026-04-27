import { Lexer, type Token } from '../../parser/lexer.js';
import type { GlyphMapper } from './glyph-mapper.js';

type Mapping =
	| [number, number]
	| [number, number, number]
	| [number, number, number[][]]
	| [number, number[]];

export class CMapMapper implements GlyphMapper {
	private mappings: Mapping[];

	constructor(
		source:
			| string
			| Uint8Array<ArrayBufferLike>
			| Uint8ClampedArray<ArrayBufferLike>,
	) {
		if (typeof source === 'string') {
			source = new TextEncoder().encode(source);
		}

		if (source instanceof Uint8Array) {
			this.mappings = [...this.parse(source)].sort((a, b) => a[0] - b[0]);
		} else {
			throw new Error(`unsupported CMap source type '${typeof source}'`);
		}
	}

	private parse(
		source: Uint8Array<ArrayBufferLike> | Uint8ClampedArray<ArrayBufferLike>,
	): Mapping[] {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(source);

		const mappings: Mapping[] = [];

		for (let i = 0; i < tokens.length; ++i) {
			const token = tokens[i]!;
			if (token.type !== 'token') continue;

			const value = this.decodeNumberArray(token.value);
			if (value === 'beginbfchar') {
				i += this.consumeMappings(mappings, tokens, 2, i + 1);
			} else if (value === 'beginbfrange') {
				i += this.consumeMappings(mappings, tokens, 3, i + 1);
			}
		}

		return mappings;
	}

	private consumeMappings(
		mappings: Mapping[],
		tokens: Token[],
		cardinality: number,
		start: number,
	): number {
		const mapping: Mapping = [] as unknown as Mapping;
		for (let i = start; i < tokens.length; ++i) {
			const token = tokens[i]!;

			if (token.type === 'token') {
				const value = this.decodeNumberArray(token.value);
				if (cardinality === 2 && value === 'endbfchar') {
					return i - start + 1;
				} else if (
					cardinality === 2 &&
					mapping.length === cardinality - 1 &&
					value === '['
				) {
					i += this.consumeLigature(mappings, mapping, tokens, i + 1);
				} else if (cardinality === 3 && value === 'endbfrange') {
					return i - start + 1;
				} else if (
					cardinality === 3 &&
					mapping.length === cardinality - 1 &&
					value === '['
				) {
					i += this.consumeLigatures(mappings, mapping, tokens, i + 1);
				}
			} else {
				// String.
				mapping.push(this.numberArrayToNumber(token.value));
				if (mapping.length >= cardinality) {
					mappings.push([...mapping]);
					(mapping as Array<number>).length = 0;
				}
			}
		}

		return tokens.length - start + 1;
	}

	private consumeLigature(
		mappings: Mapping[],
		mapping: Mapping,
		tokens: Token[],
		start: number,
	): number {
		(mapping[1] as number[]) = [];
		for (let i = start; i < tokens.length && i < start + 2; ++i) {
			const token = tokens[i]!;

			if (
				token.type === 'token' &&
				this.decodeNumberArray(token.value) === ']'
			) {
				mappings.push(mapping);
				return i - start + 1;
			} else if (token.type === 'string') {
				// Convert the Uint8 into an array of 16-bit values.
				const v = token.value;
				for (let j = 0; j < v.length - 1; j += 2) {
					(mapping[1] as number[]).push((v[j]! << 8) | v[j + 1]!);
				}
			}
		}

		return tokens.length - start + 1;
	}

	private consumeLigatures(
		mappings: Mapping[],
		mapping: Mapping,
		tokens: Token[],
		start: number,
	): number {
		mapping[2] = [];
		for (let i = start; i < tokens.length; ++i) {
			const token = tokens[i]!;

			if (
				token.type === 'token' &&
				this.decodeNumberArray(token.value) === ']'
			) {
				mappings.push(mapping);
				return i - start + 1;
			} else if (token.type === 'string') {
				// Convert the Uint8 into an array of 16-bit values.
				const words: number[] = [];
				const v = token.value;
				for (let j = 0, k = 0; j < v.length - 1; j += 2, ++k) {
					words[k] = (v[j]! << 8) | v[j + 1]!;
				}
				mapping[2].push(words);
			}
		}

		return tokens.length - start + 1;
	}

	private decodeNumberArray(value: number[]): string {
		return value.map((c) => String.fromCharCode(c)).join('');
	}

	private numberArrayToNumber(octets: number[]): number {
		let factor = 1;
		let value = 0;
		octets.reverse().forEach((octet) => {
			value += factor * octet;
			factor *= 256;
		});

		return value;
	}

	// The CMap tables can become very big. Instead of a (sparse) array, we
	// do a binary search over the sorted entries.
	//
	// If no entry is found, the Unicode replacement character \uFFFD is
	// returned.
	public lookup(glyph: number): string {
		const codepoints = this.lookupCodepoints(glyph);
		if (codepoints.length) {
			return codepoints.map((c) => String.fromCharCode(c)).join('');
		} else {
			return '\uFFFD';
		}
	}

	// Does the same as lookup() but returns an array of codepoints. This is
	// more convenient, when we want to select glyphs from a font, which may
	// lack glyphs but provide an alternative (for example 'increment' for
	// 'Delta').
	public lookupCodepoints(glyph: number): number[] {
		let low = 0;
		let high = this.mappings.length - 1;
		while (high >= low) {
			const mid = low + ((high - low) >> 1);
			const mapping = this.mappings[mid]!;
			if (glyph < mapping[0]) {
				high = mid - 1;
			} else if (mapping.length > 2) {
				if (mapping[0] <= glyph && (mapping[1] as number) >= glyph) {
					return this.lookupRangeValue(glyph, mapping);
				} else {
					low = mid + 1;
				}
			} else {
				if (mapping[0] === glyph) {
					if (typeof mapping[1] === 'number') {
						return this.decodeUTF16BE(mapping[1]);
					} else {
						return mapping[1];
					}
				} else {
					low = mid + 1;
				}
			}
		}

		// Not found.
		return [];
	}

	private lookupRangeValue(glyph: number, mapping: Mapping): number[] {
		if (typeof mapping[2] === 'number') {
			return this.decodeUTF16BE(glyph - mapping[0] + mapping[2]!);
		} else {
			const offset = glyph - mapping[0];
			if (Array.isArray(mapping[2]) && offset < mapping[2].length) {
				return mapping[2][offset]!;
			} else {
				return [];
			}
		}
	}

	private decodeUTF16BE(value: number): number[] {
		// Single UTF-16 code unit (BMP)
		if (value <= 0xffff) {
			return [value];
		}

		// Two UTF-16 code units packed into one number
		const high = (value >> 16) & 0xffff;
		const low = value & 0xffff;

		// Validate surrogate pair
		if (high >= 0xd800 && high <= 0xdbff && low >= 0xdc00 && low <= 0xdfff) {
			const codepoint = ((high - 0xd800) << 10) + (low - 0xdc00) + 0x10000;

			return [codepoint];
		}

		// Invalid UTF-16.
		return [];
	}
}
