import { SingleByteEncodingMapper } from '../../encoding/mappers/single-byte-encoding-mapper.js';
import { type Encoding, StandardEncodings } from '../../encoding/types.js';
import { coerceCodePoints } from '../../encoding/util/coerce-code-points.js';

/**
 * Encode an array of octets to a Uint16Array
 *
 * For all encodings except 'Identity-H' and 'Identity-V', these are Unicode
 * code points. For the identity encodings, they are glyph IDs.
 *
 * @param octets the input octets
 * @param encoding the encoding of the octets
 * @returns the encoded octets
 */
export function encodeOctets(
	octets: number[],
	encoding: Encoding = 'StandardEncoding',
): number[] {
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

		return outChars;
	} else {
		// Treat everything else as Identity-H.
		return octets;
	}
}
