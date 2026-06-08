import type { DecodeStream, EncodeStream } from '@pdf-lib/restructure';
import { Ptr } from './cff-pointer.js';

const FLOAT_EOF = 0xf;
const FLOAT_LOOKUP = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'.',
	'E',
	'E-',
	null,
	'-',
];

const FLOAT_ENCODE_LOOKUP = {
	'.': 10,
	E: 11,
	'E-': 12,
	'-': 14,
};

export const CFFOperand = {
	decode: (stream: DecodeStream, value: number): number | null => {
		if (32 <= value && value <= 246) {
			return value - 139;
		}

		if (247 <= value && value <= 250) {
			return (value - 247) * 256 + stream.readUInt8() + 108;
		}

		if (251 <= value && value <= 254) {
			return -(value - 251) * 256 - stream.readUInt8() - 108;
		}

		if (value === 28) {
			return stream.readInt16BE();
		}

		if (value === 29) {
			return stream.readInt32BE();
		}

		if (value === 30) {
			let str = '';
			while (true) {
				const b = stream.readUInt8();

				const n1 = b >> 4;
				if (n1 === FLOAT_EOF) {
					break;
				}
				str += FLOAT_LOOKUP[n1];

				const n2 = b & 15;
				if (n2 === FLOAT_EOF) {
					break;
				}
				str += FLOAT_LOOKUP[n2];
			}

			return parseFloat(str);
		}

		return null;
	},

	size: (value: number | Ptr): number => {
		let nvalue: number;
		if (value instanceof Ptr) {
			// if the value needs to be forced to the largest size (32 bit)
			// e.g. for unknown pointers, set to 32768
			if (value.forceLarge) {
				nvalue = 32768;
			} else {
				nvalue = value.val;
			}
		} else {
			nvalue = value;
		}

		if ((nvalue | 0) !== nvalue) {
			// floating point
			const str = `${value}`;
			return 1 + Math.ceil((str.length + 1) / 2);
		} else if (-107 <= nvalue && nvalue <= 107) {
			return 1;
		} else if (
			(108 <= nvalue && nvalue <= 1131) ||
			(-1131 <= nvalue && nvalue <= -108)
		) {
			return 2;
		} else if (-32768 <= nvalue && nvalue <= 32767) {
			return 3;
		} else {
			return 5;
		}
	},

	encode: (stream: EncodeStream, value: number | Ptr): void => {
		// if the value needs to be forced to the largest size (32 bit)
		// e.g. for unknown pointers, save the old value and set to 32768
		let val = Number(value);

		if (value instanceof Ptr && value.forceLarge) {
			stream.writeUInt8(29);
			stream.writeInt32BE(val);
			return;
		} else if ((val | 0) !== val) {
			// floating point
			stream.writeUInt8(30);

			const str = `${val}`;

			let n2: number;
			for (let i = 0; i < str.length; i += 2) {
				const c1 = str[i] as keyof typeof FLOAT_ENCODE_LOOKUP;
				const n1 = FLOAT_ENCODE_LOOKUP[c1] || +c1;

				if (i === str.length - 1) {
					n2 = FLOAT_EOF;
				} else {
					const c2 = str[i + 1] as keyof typeof FLOAT_ENCODE_LOOKUP;
					n2 = FLOAT_ENCODE_LOOKUP[c2] || +c2;
				}

				stream.writeUInt8((n1 << 4) | (n2 & 15));
			}

			if (n2! !== FLOAT_EOF) {
				stream.writeUInt8(FLOAT_EOF << 4);
				return;
			}
		} else if (-107 <= val && val <= 107) {
			stream.writeUInt8(val + 139);
			return;
		} else if (108 <= val && val <= 1131) {
			val -= 108;
			stream.writeUInt8((val >> 8) + 247);
			stream.writeUInt8(val & 0xff);
			return;
		} else if (-1131 <= val && val <= -108) {
			val = -val - 108;
			stream.writeUInt8((val >> 8) + 251);
			stream.writeUInt8(val & 0xff);
			return;
		} else if (-32768 <= val && val <= 32767) {
			stream.writeUInt8(28);
			stream.writeInt16BE(val);
			return;
		} else {
			stream.writeUInt8(29);
			stream.writeInt32BE(val);
			return;
		}
	},
};
