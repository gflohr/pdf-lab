export const StandardEncodings = [
	'StandardEncoding',
	'MacRomanEncoding',
	'WinAnsiEncoding',
	'MacExpertEncoding',
	'SymbolEncoding',
	'ZapfDingbatsEncoding',
] as const;

/**
 * The pre-defined PDF encodings.
 */
export type Encoding = (typeof StandardEncodings)[number];
