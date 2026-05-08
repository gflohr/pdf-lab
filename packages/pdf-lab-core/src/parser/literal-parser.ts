import { type Encoding, StandardEncodings } from '../encoding/types.js';
import { encodeOctets } from './util/encode-octets.js';

export class LiteralParser {
	constructor(private readonly encoding: Encoding) {}

	/**
	 * Parse a literal string. Literal strings are delimited by parentheses.
	 * The input must begin with an open parentheses and end with a closing
	 * parentheses.
	 *
	 * Nested parentheses are not treated in a special way. It is expected
	 * that they are balanced.
	 *
	 * @param octets input bytes as numbers
	 * @returns an array of unicode code points
	 */
	public parse(octets: number[]): Uint16Array {
		const chars: number[] = [];

		for (let i = 0; i < octets.length; ++i) {
			const octet = octets[i]!;

			switch (octet) {
				case 92:
					i += this.consumeBackslashSequence(chars, octets, i + 1);
					break;
				default:
					chars.push(octet);
					break;
			}
		}

		return encodeOctets(chars, this.encoding);
	}

	/**
	 *
	 * @param chars array of output characters
	 * @param octets array of input octets
	 * @param pos current position in input stream
	 * @returns the number of octets consumed minus 1
	 */
	private consumeBackslashSequence(
		chars: number[],
		octets: number[],
		pos: number,
	): number {
		let i = pos;
		const octet = octets[i];
		switch (octet) {
			case undefined:
				return 0;
			case 10:
				if (octets[i + 1] === 13) {
					return 2;
				}
				return 1;
			case 13:
				if (octets[i + 1] === 10) {
					return 2;
				}
				return 1;
			case 110: // n => newline.
				if (octets[i + 1] === 92 && octets[i + 2] === 114) {
					i += 2;
				}
				chars.push(0x0a);
				break;
			case 114: // r => carriage return.
				if (octets[i + 1] === 92 && octets[i + 2] === 110) {
					i += 2;
				}
				chars.push(0x0a);
				break;
			case 116: // h => horizontal tab.
				chars.push(0x09);
				break;
			case 98: // b => backspace.
				chars.push(0x08);
				break;
			case 102: // f => form feed.
				chars.push(0x0c);
				break;
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				i += this.parseOctalEscape(chars, octets, pos);
				break;
			default:
				chars.push(octet);
				break;
		}

		return i - pos + 1;
	}

	private parseOctalEscape(
		chars: number[],
		octets: number[],
		i: number,
	): number {
		let value = octets[i]! - 0o060;
		let consumed = 0;
		if (octets[i + 1] && octets[i + 1]! >= 0o060 && octets[i + 1]! <= 0o071) {
			value *= 8;
			value += octets[i + 1]! - 0o060;
			++consumed;
			if (octets[i + 2] && octets[i + 2]! >= 0o060 && octets[i + 2]! <= 0o071) {
				value *= 8;
				value += octets[i + 2]! - 0o060;
				++consumed;
			}
		}
		chars.push(value);

		return consumed;
	}
}
