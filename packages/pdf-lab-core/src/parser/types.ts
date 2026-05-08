export type Token = {
	type: 'string' | 'lstring' | 'token';
	value: Uint8Array;
	offset: number;
	length: number;
};
