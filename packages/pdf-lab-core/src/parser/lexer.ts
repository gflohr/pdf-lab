import type { Token as Uint8Token } from './types.js';

type State = 'initial' | 'lstring' | 'hexstring';
type Token = {
	type: 'string' | 'lstring' | 'token';
	value: number[];
	offset: number;
	length: number;
};

// This lexer happens to work for both CMap files embedded in PDFs and
// for text blocks.
//
// That being said, the lexer makes a lot of invalid simplifications but
// should work for normal files out in the wild.
export class Lexer {
	public tokenize(
		bytes: Uint8Array<ArrayBufferLike> | Uint8ClampedArray<ArrayBufferLike>,
	): Uint8Token[] {
		let state: State = 'initial';
		let parenLevel = 0;

		const tokens: Uint8Token[] = [];
		let token: Token = {
			type: 'token',
			value: [],
			offset: 0,
			length: 0,
		};

		for (let i = 0; i < bytes.length; ++i) {
			const byte = bytes[i]!;
			if (state === 'initial') {
				switch (byte) {
					case 40: // Open parenthesis.
						if (token.value.length) this.pushToken(tokens, token, i);
						token = {
							type: 'lstring',
							value: [],
							offset: i,
							length: 0,
						};
						state = 'lstring';
						++parenLevel;
						break;
					case 60: // Left angle bracket.
						if (token.value.length) this.pushToken(tokens, token, i);
						token = {
							type: 'string',
							value: [],
							offset: i,
							length: 0,
						};
						state = 'hexstring';
						break;
					case 91: // Left square bracket.
					case 93: // Right square bracket.
						if (token.value.length) this.pushToken(tokens, token, i);
						tokens.push({
							type: 'token',
							value: new Uint8Array([byte]),
							offset: i,
							length: 0,
						});
						token = {
							type: 'token',
							value: [],
							offset: i,
							length: 0,
						};
						state = 'initial';
						break;
					case 37: // Percent (comment).
						if (token.value.length) this.pushToken(tokens, token, i);
						for (let j = i; j < bytes.length; ++j) {
							if (bytes[j] === 10 || bytes[j] === 13) {
								i = j;
								token.offset = i + 1;
								break;
							} else if (j === bytes.length - 1) {
								i = bytes.length;
								token.offset = i + 1;
								break;
							}
						}
						break;
					default:
						if (byte <= 32) {
						if (token.value.length) this.pushToken(tokens, token, i);
							token = {
								type: 'token',
								value: [],
								offset: i + 1,
								length: 0,
							};
						} else {
							token.value.push(byte);
						}
						break;
				}
			} else if (state === 'lstring') {
				switch (byte) {
					case 40: // Open parenthesis.
						++parenLevel;
						token.value.push(byte);
						break;
					case 92: // Backslash.
						++i;
						token.value.push(byte);
						if (i < bytes.length) token.value.push(bytes[i]!);
						break;
					case 41: // Closing parenthesis.
						--parenLevel;
						if (parenLevel <= 0) {
							// In case of an empty string, we have a token
							// length of 0. This is okay in this case.
							this.pushToken(tokens, token, i);
							token = {
								type: 'token',
								value: [],
								offset: i + 1,
								length: 0,
							};
							state = 'initial';
						} else {
							token.value.push(byte);
						}
						break;
					default:
						token.value.push(byte);
						break;
				}
			} else {
				// Hexstring.
				if (byte === 62) {
					const hexvalues: number[] = [];
					for (let j = 0; j < token.value.length - 1; j += 2) {
						hexvalues.push(
							16 * this.hexCharToNumber(token.value[j]!) +
								this.hexCharToNumber(token.value[j + 1]!),
						);
					}
					token.value = hexvalues;

					// The length of the value should not be checked here so
					// that empty strings can be encoded.
					this.pushToken(tokens, token, i);
					token = {
						type: 'token',
						value: [],
						offset: i + 1,
						length: 0,
					};
					state = 'initial';
				} else if (
					(byte >= 48 && byte <= 57) ||
					(byte >= 65 && byte <= 70) ||
					(byte >= 97 && byte <= 102)
				) {
					token.value.push(byte);
				}
			}
		}

		if (token.value.length) {
			this.pushToken(tokens, token, bytes.length);
		}

		return tokens;
	}

	private hexCharToNumber(hex: number): number {
		if (hex >= 97) {
			return hex - 87;
		} else if (hex >= 65) {
			return hex - 55;
		} else {
			return hex - 48;
		}
	}

	private pushToken(tokens: Uint8Token[], token: Token, offset: number) {
		const uint8Token = {
			type: token.type,
			value: new Uint8Array(token.value),
			offset: token.offset,
			length: offset - token.offset,
		};

		if (token.type === 'string' || token.type === 'lstring') ++uint8Token.length;

		tokens.push(uint8Token);
	}
}

