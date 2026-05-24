declare module '@pdf-lib/brotli' {
	export interface CompressOptions {
		/** 0 = generic, 1 = text, 2 = font (WOFF2) */
		mode?: 0 | 1 | 2;
		/** Quality level from 0 to 11 */
		quality?: number;
		/** Window size */
		lgwin?: number;
	}

	/**
	 * Decompresses the given buffer to produce the original input.
	 * * @param buffer The compressed data buffer.
	 * @param outSize Optional. The expected uncompressed length. If not provided, it will be computed automatically.
	 */
	export function decompress(
		buffer: Buffer | Uint8Array,
		outSize?: number,
	): Uint8Array;

	/**
	 * Compresses the given buffer.
	 * * @param buffer The input data buffer to compress.
	 * @param options Pass `true` for generic text defaults, or an object with specific configurations.
	 */
	export function compress(
		buffer: Buffer | Uint8Array,
		options?: boolean | CompressOptions,
	): Uint8Array;

	const brotli: {
		compress: typeof compress;
		decompress: typeof decompress;
	};

	export default brotli;
}

// Support for importing just the decompress module: import decompress from 'brotli/decompress'
declare module '@pdf-lib/brotli/decompress.js' {
	import { decompress } from '@pdf-lib/brotli';
	export default decompress;
}
