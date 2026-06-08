/**
 * Stub types for unicode-trie. The types are incomplete and only used
 * for generating files.
 */
declare module 'unicode-trie' {}

declare module 'unicode-trie/builder.js' {
	export default class UnicodeTrieBuilder {
		constructor(initialValue?: number, errorValue?: number);

		set(codepoint: number, value: number): void;

		toBuffer(): Buffer;
	}
}
