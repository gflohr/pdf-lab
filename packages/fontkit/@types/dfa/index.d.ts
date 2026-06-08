declare module 'dfa' {
}

declare module 'dfa/compile.js' {
	/**
	 * Compiles an unparsed state-machine layout script file into a
	 * structural token mapping object.
	 * * @param machineDefinition The raw string text layout loaded from your .machine file.
	 * @param symbols A key/value token map matching contextual labels to operational indices.
	 */
	function compile(
		machineDefinition: string,
		symbols: Record<string, number>
	): Record<string, unknown>;

	const compileModule: {
		default: typeof compile;
	};

	export default compileModule;
}
