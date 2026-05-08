export const StandardEncodings = [
	'StandardEncoding',
	'MacRomanEncoding',
	'WinAnsiEncoding',
	'MacExpertEncoding',
	'PDFDocEncoding',
	'SymbolEncoding',
	'ZapfDingbatsEncoding',
] as const;

/**
 * The pre-defined PDF encodings.
 */
export type Encoding = (typeof StandardEncodings)[number];

/**
 * The pre-defined PDF encodings in lowercase.
 */
export const lcStandardEncodings = StandardEncodings.map(e => e.toLowerCase());
