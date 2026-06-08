declare module 'tiny-inflate' {
	/**
	 * Decompresses a DEFLATE-compressed buffer into an output buffer.
	 *
	 * @param input The buffer containing the compressed DEFLATE data.
	 * @param output The buffer where the decompressed data will be written. It must be pre-allocated to the correct decompressed size.
	 */
	function inflate(
		input: Buffer | Uint8Array,
		output: Buffer | Uint8Array,
	): Uint8Array;

	export = inflate;
}
