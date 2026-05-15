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

	export type LengthResolver = (parent?: FieldT<unknown>) => number;

	export type Length = number | string | LengthResolver;

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

	type InferField<T> = T extends FieldT<infer TValue> ? TValue : never;

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

	type StructFields = Record<string, FieldT<any>>;

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

	export class VersionedStructT<
		TVersions extends Record<string, StructFields>
	> implements FieldT<
		{
			[K in keyof TVersions & string]:
				{ version: K } & InferStruct<TVersions[K]>
		}[keyof TVersions & string]
	> {
		readonly __type?: {
			[K in keyof TVersions & string]:
				{ version: K } & InferStruct<TVersions[K]>
		}[keyof TVersions & string];

		constructor(
			type: string | FieldT<number>,
			versions: TVersions
		);

		decode(
			stream: DecodeStream,
			parent?: any,
			length?: number
		): {
			[K in keyof TVersions & string]:
				{ version: K } & InferStruct<TVersions[K]>
		}[keyof TVersions & string];

		size(value?: any, parent?: any): number;

		encode(stream: DecodeStream, value: this['__type'], parent?: unknown): void;
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

	export class PointerT<
		TField extends FieldT<any>
	> implements FieldT<
		| InferField<TField>
		| number
		| null
		| { get: () => InferField<TField> }
	> {
		constructor(
			offsetType: FieldT<number>,
			type: TField | 'void',
			options?: {
				type?: 'local' | 'immediate' | 'parent' | 'global';
				allowNull?: boolean;
				nullValue?: number;
				lazy?: boolean;
				relativeTo?: string;
			}
		);

		decode(
			stream: DecodeStream,
			ctx?: unknown
		):
			| InferField<TField>
			| number
			| null
			| { get: () => InferField<TField> };

		size(value?: unknown, ctx?: unknown): number;

		encode(stream: DecodeStream, value: unknown, ctx?: unknown): void;
	}

	export class VoidPointer<T = any> {
		constructor(
			type: FieldT<T>,
			value: T
		);

		type: FieldT<T>;
		value: T;
	}

	export class ReservedT implements FieldT<void> {
		constructor(
			type: FieldT<any>,
			count?: number | string | LengthResolver
		);

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
