import { SingleByteEncodingMapper } from '../../encoding/mappers/single-byte-encoding-mapper.js';
import { type Encoding, StandardEncodings } from '../../encoding/types.js';
import { coerceCodePoints } from '../../encoding/util/coerce-code-points.js';

/**
 * Encode an array of octets to a Uint16Array
 *
 * For all encodings except 'Identity-H' and 'Identity-V', these are Unicode
 * code points. For the identity encodings, they are glyph IDs.
 *
 * 16 bits are enough here. Although, PDFs can - of course - render characters
 * with a code point >\uffff. But they use glyph IDs which will always fit
 * into 16 bits.
 *
 * @param octets the input octets
 * @param encoding the encoding of the octets
 * @returns the encoded octets
 */
export function encodeOctets(
	octets: number[],
	encoding: Encoding = 'StandardEncoding',
): Uint16Array {
	if (StandardEncodings.includes(encoding as Encoding)) {
		const mapper = new SingleByteEncodingMapper(encoding);
		const outChars: number[] = [];

		for (let i = 0; i < octets.length; ++i) {
			const codePoints = mapper.lookupCodePoints(octets[i]!);
			if (codePoints.length) {
				outChars.push(coerceCodePoints(codePoints));
			} else {
				outChars.push(octets[i]!);
			}
		}

		return new Uint16Array(outChars);
	} else {
		// Treat everything else as Identity-H.
		return new Uint16Array(octets);
	}
}
