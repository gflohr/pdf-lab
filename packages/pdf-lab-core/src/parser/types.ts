import type { Encoding } from '../encoding/types.js';

export type LiteralEncoding =
	| Encoding
	| 'Identity-H'
	| 'Identity-V'
	| 'UTF-8'
	| 'UTF-16BE'
	| 'UTF-16LE';

export type Token = {
	type: 'string' | 'token';
	value: Uint8Array;
	offset: number;
	length: number;
};
