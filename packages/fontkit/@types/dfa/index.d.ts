declare module 'dfa' {
	class StateMachine {
		constructor(dfa: StateMachine.DFA);

		match(codepoints: number[]): Iterable<[number, number, string[]]>;
	}

	namespace StateMachine {
		export interface DFA {
			categories?: string[];
			// The string keys are all integers.
			decompositions?: Record<string, number[]>;
			stateTable: number[];
			accepting: boolean[];
			tags: string[][];
		}
	}

	export = StateMachine;
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
		symbols: Record<string, number>,
	): Record<string, unknown>;

	const compileModule: {
		default: typeof compile;
	};

	export default compileModule;
}
