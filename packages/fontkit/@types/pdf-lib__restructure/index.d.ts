/** biome-ignore-all lint/suspicious/noExplicitAny: this file models a highly dynamic runtime parsing DSL. */

// This is an attempt to provide types for `@pdf-lib/restructure` the way
// the library is used inside of this project. It is very well possible that
// legitimate usage of `restructure` is not reflected here. Do not suspect
// a bug in this case but rather extend the typing.
declare module '@pdf-lib/restructure' {
	export class DecodeStream {
		buffer: Uint8Array;
		pos: number;

		readUInt8(): number;
		readUInt16BE(): number;
		readUInt32BE(): number;
	}

	export interface FieldT<T> {
		readonly __type?: T;

		size(): number;

		decode(stream: DecodeStream): T;

		encode(stream: DecodeStream, val: T): void;
	}

	export type LengthResolver<T = any> = (t: T) => number;
	export type Length = number | string | LengthResolver<any> | NumberT;
	export class NumberT implements FieldT<number> {
		readonly __type?: number;

		constructor(type: string, endian?: string);

		size(): number;

		decode(stream: DecodeStream): number;

		encode(stream: DecodeStream, val: number): void;
	}

	export class StringT implements FieldT<string> {
		readonly __type?: string;

		constructor(length?: Length, encoding?: string);

		size(value?: string, parent?: FieldT<unknown>): number;

		decode(stream: DecodeStream, parent?: FieldT<unknown>): string;

		encode(stream: DecodeStream, value: string, parent?: FieldT<unknown>): void;
	}

	type InferField<T> =
		T extends FieldT<infer TValue>
			? TValue
			: T extends (...args: any[]) => infer R
				? R
				: never;
	export class ArrayT<TField extends FieldT<unknown>>
		implements FieldT<InferField<TField>[]>
	{
		readonly __type?: InferField<TField>[];

		constructor(type: TField, length?: Length, lengthType?: 'count' | 'bytes');

		size(items?: FieldT<TField>[], parent?: FieldT<unknown>): number;

		decode(stream: DecodeStream): InferField<TField>[];

		encode(stream: DecodeStream, value: InferField<TField>[]): void;
	}

	export class LazyArrayT<TField extends FieldT<unknown>>
		implements FieldT<InferField<TField>[]>
	{
		readonly __type?: InferField<TField>[];

		constructor(type: TField, length?: Length, lengthType?: 'count' | 'bytes');

		size(items?: FieldT<TField>[], parent?: FieldT<unknown>): number;

		decode(stream: DecodeStream): InferField<TField>[];

		encode(stream: DecodeStream, value: InferField<TField>[]): void;
	}

	export type ComputedField<TStruct> = (t: TStruct) => any;

	export type StructFields<TStruct = any> = {
		[K in keyof TStruct]: FieldT<any> | ComputedField<TStruct>;
	};

	type InferStruct<TFields extends StructFields> = {
		[K in keyof TFields]: InferField<TFields[K]>;
	};
	export class StructT<TFields extends StructFields>
		implements FieldT<InferStruct<TFields>>
	{
		readonly __type?: InferStruct<TFields>;

		constructor(fields: TFields);

		size(value?: InferStruct<TFields>, parent?: FieldT<unknown>): number;

		decode(
			stream: DecodeStream,
			parent?: FieldT<unknown>,
			length?: number,
		): InferStruct<TFields>;

		encode(
			stream: DecodeStream,
			value: InferStruct<TFields>,
			parent?: FieldT<unknown>,
		): void;
	}

	export type InferVersionedStruct<
		TVersions extends Record<string, StructFields>,
	> = {
		[K in keyof TVersions & string]: { version: K } & InferStruct<TVersions[K]>;
	}[keyof TVersions & string];

	export class VersionedStructT<TVersions extends Record<string, any>>
		implements FieldT<InferVersionedStruct<TVersions>>
	{
		readonly __type?: InferVersionedStruct<TVersions>;

		versions: TVersions;

		// versionField can be a string (pointing to a parent key) or a Field (like uint16)
		constructor(versionField: string | FieldT<number>, versions: TVersions);

		decode(stream: DecodeStream, parent?: any): InferVersionedStruct<TVersions>;
		size(value?: InferVersionedStruct<TVersions>, parent?: any): number;

		encode(
			stream: DecodeStream,
			value: InferVersionedStruct<TVersions>,
			parent?: any,
		): void;
	}

	type BitfieldResult<T extends readonly (string | null)[]> = {
		[K in Exclude<T[number], null>]: boolean;
	};

	export class BitfieldT<TFlags extends readonly (string | null)[]>
		implements FieldT<BitfieldResult<TFlags>>
	{
		constructor(type: FieldT<number>, flags: TFlags);

		decode(stream: DecodeStream): BitfieldResult<TFlags>;

		size(): number;

		encode(stream: DecodeStream, value: BitfieldResult<TFlags>): void;
	}

	export class PointerT<TField extends FieldT<any>>
		implements
			FieldT<
				InferField<TField> | number | null | { get: () => InferField<TField> }
			>
	{
		constructor(
			offsetType: FieldT<number>,
			type: TField | 'void',
			options?: {
				type?: 'local' | 'immediate' | 'parent' | 'global';
				allowNull?: boolean;
				nullValue?: number;
				lazy?: boolean;
				relativeTo?: string;
			},
		);

		decode(
			stream: DecodeStream,
			ctx?: unknown,
		): InferField<TField> | number | null | { get: () => InferField<TField> };

		size(value?: unknown, ctx?: unknown): number;

		encode(stream: DecodeStream, value: unknown, ctx?: unknown): void;
	}

	export class VoidPointer<T = any> {
		constructor(type: FieldT<T>, value: T);

		type: FieldT<T>;
		value: T;
	}

	export class ReservedT implements FieldT<void> {
		constructor(type: FieldT<any>, count?: number | string | LengthResolver);

		decode(stream: DecodeStream, parent?: any): undefined;

		size(value?: undefined, parent?: any): number;

		encode(stream: DecodeStream, value: undefined, parent?: any): void;
	}
	export interface RestructureStatic {
		Number: typeof NumberT;
		String: typeof StringT;
		Array: typeof ArrayT;
		LazyArray: typeof LazyArrayT;
		Struct: typeof StructT;
		VersionedStruct: typeof VersionedStructT;
		Bitfield: typeof BitfieldT;
		Pointer: typeof PointerT;
		Reserved: typeof ReservedT;

		int8: NumberT;
		uint8: NumberT;
		int16: NumberT;
		uint16: NumberT;
		int24: NumberT;
		uint24: NumberT;
		int32: NumberT;
		uint32: NumberT;
		float: NumberT;
		double: NumberT;
		fixed32: NumberT;
	}

	const r: RestructureStatic;
	export default r;
}
