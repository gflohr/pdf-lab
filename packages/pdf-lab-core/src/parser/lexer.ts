type State = 'initial' | 'string' | 'hexstring';

export type Token = {
	type: 'string' | 'token';
	value: number[];
};

// This lexer happens to work for both CMap files embedded in PDFs and
// for text blocks.
//
// That being said, the lexer makes a lot of invalid simplifications but
// should work for normal files out in the wild.
export class Lexer {
	public tokenize(
		bytes: Uint8Array<ArrayBufferLike> | Uint8ClampedArray<ArrayBufferLike>,
	): Token[] {
		let state: State = 'initial';
		let parenLevel = 0;

		const tokens: Token[] = [];
		let token: Token = {
			type: 'token',
			value: [],
		};

		for (let i = 0; i < bytes.length; ++i) {
			const byte = bytes[i]!;
			if (state === 'initial') {
				switch (byte) {
					case 40: // Open parenthesis.
						if (token.value.length) tokens.push(token);
						token = {
							type: 'string',
							value: [],
						};
						state = 'string';
						++parenLevel;
						break;
					case 60: // Left angle bracket.
						if (token.value.length) tokens.push(token);
						token = {
							type: 'string',
							value: [],
						};
						state = 'hexstring';
						break;
					case 91: // Left square bracket.
					case 93: // Right square bracket.
						if (token.value.length) tokens.push(token);
						tokens.push({ type: 'token', value: [byte] });
						token = {
							type: 'token',
							value: [],
						};
						state = 'initial';
						break;
					case 37: // Percent (comment).
						for (let j = i; j < bytes.length; ++j) {
							if (bytes[j] === 10 || bytes[j] === 13) {
								i = j;
								break;
							} else if (j === bytes.length - 1) {
								i = bytes.length;
								break;
							}
						}
						break;
					default:
						if (byte <= 32) {
							if (token.value.length) tokens.push(token);
							token = { type: 'token', value: [] };
						} else {
							token.value.push(byte);
						}
						break;
				}
			} else if (state === 'string') {
				switch (byte) {
					case 40: // Open parenthesis.
						++parenLevel;
						token.value.push(byte);
						break;
					case 92: // Backslash.
						++i;
						break;
					case 41: // Closing parenthesis.
						--parenLevel;
						if (parenLevel <= 0) {
							// In case of an empty string, we have a token
							// length of 0. This is okay in this case.
							tokens.push(token);
							token = { type: 'token', value: [] };
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
					const value: number[] = [];
					for (let j = 0; j < token.value.length - 1; j += 2) {
						value.push(
							16 * this.hexCharToNumber(token.value[j]!) +
								this.hexCharToNumber(token.value[j + 1]!),
						);
					}
					token.value = [...value];
					// The length of the value should not be checked here so
					// that empty strings can be encoded.
					tokens.push(token);
					token = { type: 'token', value: [] };
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

		if (token.value.length) tokens.push(token);

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
}
