/** biome-ignore-all lint/suspicious/noExplicitAny: this file models a highly dynamic runtime parsing DSL. */

// This is an attempt to provide types for `restructure` the way
// the library is used inside of this project. It is very well possible that
// legitimate usage of `restructure` is not reflected here. Do not suspect
// a bug in this case but rather extend the typing.
//
// FIXME! In its current state, this is a little bit of a mess because it has
// grown by fixing typing errors in the tables code, as they occurred. It is
// probably possible to get rid of a lot of the explicit any types.
declare module 'restructure' {
	/**
	 * Resolves a static number, string-pointer, or functional resolver down to
	 * a final byte/item count based on the current stream context.
	 */
	export function resolveLength(
		length: Length,
		stream: DecodeStream | null,
		parent: any,
	): number;

	/**
	 * A wrapper configuration descriptor managing compiled metadata assignment rules.
	 */
	export class PropertyDescriptor<T = unknown> {
		enumerable: boolean;
		configurable: boolean;
		[key: string]: any;

		constructor(opts?: Record<string, any>);

		get(): T;
	}

	export type ParsingContext = any;
	export type LengthResolver<T = any> = (t: T) => number;
	export type Length = number | string | LengthResolver<any> | NumberT;
	export class DecodeStream {
		buffer: Uint8Array;
		pos: number;
		length: Length;

		constructor(buffer: Uint8Array);

		readString(length: number, encoding?: string): string;
		readBuffer(offset: number): Uint8Array;
		readInt8(): number;
		readUInt8(): number;
		readInt16(): number;
		readInt16BE(): number;
		readUInt16BE(): number;
		readUInt16(): number;
		readInt24BE(): number;
		readUInt24BE(): number;
		readInt32BE(): number;
		readUInt32BE(): number;
	}

	export class EncodeStream {
		buffer: Uint8Array;
		pos: number;

		constructor(buffer: Uint8Array);

		fill(val: number, length: number): void;
		end(): void;

		writeUInt8(val: number): void;
		writeInt16(val: number): void;
		writeInt16BE(val: number): void;
		writeUInt16BE(val: number): void;
		writeUInt16(val: number): void;
		writeInt24BE(val: number): void;
		writeUInt24BE(val: number): void;
		writeInt32BE(val: number): void;
		writeUInt32BE(val: number): void;
	}

	export interface FieldT<T> {
		readonly __type?: T;
		readonly _startOffset?: number;
		readonly parent?: FieldT<any>;

		size(val?: any | null, ctx?: any): number;

		decode(stream: DecodeStream, ctx?: any): T;

		encode(stream: EncodeStream, val: T, ctx?: any): void;

		fromBuffer(buf: Uint8Array): T;
		toBuffer(val?: any | null): Uint8Array;
	}

	export class NumberT implements FieldT<number> {
		readonly __type?: number;
		readonly parent?: FieldT<any>;

		constructor(type: string, endian?: string);

		size(): number;

		decode(stream: DecodeStream): number;

		encode(stream: EncodeStream, val: number): void;

		fromBuffer(buf: Uint8Array): number;
		toBuffer(val?: any | null): Uint8Array;
	}

	export class FixedT implements FieldT<number> {
		readonly __type?: number;
		readonly parent?: FieldT<any>;

		constructor(type: number, endian?: string, fracBits?: number);

		size(): number;

		decode(stream: DecodeStream): number;

		encode(stream: EncodeStream, val: number): void;

		fromBuffer(buf: Uint8Array): number;
		toBuffer(val?: any | null): Uint8Array;
	}

	export type EncodingResolver<T = any> = (t: T) => string;
	export type Encoding = string | EncodingResolver<any>;

	export class StringT implements FieldT<string> {
		readonly __type?: string;
		readonly parent?: FieldT<any>;

		constructor(length?: Length, encoding?: Encoding);

		size(value?: string, parent?: FieldT<unknown>): number;

		decode(stream: DecodeStream, parent?: FieldT<unknown>): string;

		encode(stream: EncodeStream, value: string, parent?: FieldT<unknown>): void;

		fromBuffer(buf: Uint8Array): string;
		toBuffer(val?: any | null): Uint8Array;
	}

	export type InferField<T> =
		T extends FieldT<infer TValue>
			? TValue
			: T extends (...args: any[]) => infer R
				? R
				: never;
	export class ArrayT<TField extends FieldT<any>>
		implements FieldT<InferField<TField>[]>
	{
		readonly __type?: InferField<TField>[];
		readonly type: TField;
		readonly length: number;
		readonly parent?: FieldT<any>;

		constructor(type: TField, length?: Length, lengthType?: 'count' | 'bytes');

		size(val?: any | null, ctx?: any): number;

		decode(stream: DecodeStream, parent?: any): InferField<TField>[];

		encode(stream: EncodeStream, value: InferField<TField>[]): void;

		fromBuffer(buf: Uint8Array): InferField<TField>[];
		toBuffer(val?: any | null): Uint8Array;
	}

	export interface RestructureLazyArray<T> extends Array<T> {
		get(index: number): T;
		toArray(): T[];
	}

	export class LazyArrayT<
		TField extends FieldT<unknown>,
		TExplicitOut = RestructureLazyArray<InferField<TField>>,
	> implements FieldT<TExplicitOut>
	{
		readonly __type?: TExplicitOut;
		readonly parent?: FieldT<any>;

		constructor(type: TField, length?: Length, lengthType?: 'count' | 'bytes');

		size(val?: any | null, ctx?: any): number;
		size(items?: any[], parent?: FieldT<unknown>): number;

		decode(stream: DecodeStream): TExplicitOut;

		encode(stream: EncodeStream, value: TExplicitOut): void;

		fromBuffer(buf: Uint8Array): TExplicitOut;
		toBuffer(val?: any | null): Uint8Array;
	}

	export type StructFields = Record<string | number, any>;
	type InferStruct<TFields extends StructFields> = {
		[K in keyof TFields]: InferField<TFields[K]>;
	};
	export class StructT<TExplicitOut> implements FieldT<TExplicitOut> {
		readonly __type?: TExplicitOut;
		readonly parent?: FieldT<any>;

		constructor(fields: StructFields);

		size(
			value?: TExplicitOut,
			parent?: FieldT<unknown>,
			includePointers?: boolean,
		): number;

		decode(stream: DecodeStream, parent?: any, length?: number): TExplicitOut;

		encode(
			stream: EncodeStream,
			value: TExplicitOut,
			parent?: FieldT<unknown>,
		): void;

		process?: (this: any, stream: DecodeStream) => void;
		preEncode?: (this: any, stream: DecodeStream) => void;

		fromBuffer(buf: Uint8Array): TExplicitOut;
		toBuffer(val?: Record<string, unknown> | null): Uint8Array;
	}

	export type VersionedStructFields = Record<string | number, StructFields>;
	export type InferVersionedStruct<
		TVersions extends Record<string, StructFields>,
	> = {
		[K in keyof TVersions & string]: { version: K } & InferStruct<TVersions[K]>;
	}[keyof TVersions & string];

	export class VersionedStructT<TExplicitOut> implements FieldT<TExplicitOut> {
		/** Holds the structural signature of the compiled output type safely */
		readonly __type?: TExplicitOut;
		readonly parent?: FieldT<any>;

		versions: VersionedStructFields;

		constructor(
			versionField: string | FieldT<number>,
			versions: VersionedStructFields,
		);

		decode(stream: DecodeStream, parent?: any): TExplicitOut;

		size(value?: TExplicitOut, parent?: any, includePointers?: boolean): number;

		encode(stream: EncodeStream, value: TExplicitOut, parent?: any): void;

		process?: (this: any, stream: DecodeStream) => void;
		preEncode?: (this: any, stream: DecodeStream) => void;

		fromBuffer(buf: Uint8Array): TExplicitOut;
		toBuffer(val?: Record<string, unknown> | null): Uint8Array;
	}

	type BitfieldResult<T extends readonly (string | null)[]> = {
		// Maps each actual string name entry in the literal array to a boolean
		// flag state.
		[K in Exclude<T[number], null>]: boolean;
	};

	export class BitfieldT<TFlags extends readonly (string | null)[]>
		implements FieldT<BitfieldResult<TFlags>>
	{
		readonly __type?: BitfieldResult<TFlags>;
		readonly parent?: FieldT<any>;

		// Enforcing TFlags ensures TypeScript preserves the exact string
		// literal names from the configuration arrays.
		constructor(type: FieldT<number>, flags: TFlags);

		decode(stream: DecodeStream, ctx?: any): BitfieldResult<TFlags>;

		size(val?: any | null, ctx?: any): number;

		encode(
			stream: EncodeStream,
			value: BitfieldResult<TFlags>,
			ctx?: any,
		): void;

		fromBuffer(buf: Uint8Array): BitfieldResult<TFlags>;
		toBuffer(val?: any | null): Uint8Array;
	}

	export interface PointerTOptions {
		type?: 'local' | 'immediate' | 'parent' | 'global';
		allowNull?: boolean;
		nullValue?: number;
		lazy?: boolean;
		relativeTo?: (ctx: any) => string;
	}

	export class PointerT<TField extends FieldT<any>>
		implements
			FieldT<
				InferField<TField> | number | null | { get: () => InferField<TField> }
			>
	{
		type?: TField;
		offsetType: number;
		readonly parent?: FieldT<any>;

		constructor(
			offsetType: FieldT<number>,
			type: TField | 'void' | null,
			options?: PointerTOptions,
		);

		decode(
			stream: DecodeStream,
			ctx?: unknown,
		):
			| InferField<TField>
			| number
			| null
			| PropertyDescriptor<InferField<TField>>;

		size(value?: unknown, ctx?: unknown): number;

		encode(stream: EncodeStream, value: unknown, ctx?: unknown): void;

		fromBuffer(buf: Uint8Array): number;
		toBuffer(val?: any | null): Uint8Array;
	}

	export class VoidPointerT<T = any> {
		constructor(type: FieldT<T>, value: T);
		readonly parent?: FieldT<any>;

		type: FieldT<T>;
		value: T;
	}

	export class ReservedT implements FieldT<void> {
		constructor(type: FieldT<any>, count?: number | string | LengthResolver);
		readonly parent?: FieldT<any>;

		decode(stream: DecodeStream, parent?: any): undefined;

		size(value?: undefined, parent?: any): number;

		encode(stream: EncodeStream, value: undefined, parent?: any): void;

		fromBuffer(buf: Uint8Array): number;
		toBuffer(val?: any | null): Uint8Array;
	}

	export class BufferT implements FieldT<Uint8Array> {
		readonly __type?: Uint8Array;
		readonly parent?: FieldT<any>;

		constructor(length?: Length);

		size(value?: FieldT<unknown>): number;

		decode(stream: DecodeStream, ctx?: any): Uint8Array;

		encode(stream: EncodeStream, val: Uint8Array, ctx?: any): void;

		fromBuffer(buf: Uint8Array): Uint8Array;
		toBuffer(val?: any | null): Uint8Array;
	}

	export type ConditionResolver<T = any> = (t: T) => boolean;

	export class OptionalT<TField extends FieldT<any>> implements FieldT<any> {
		readonly __type?: number;
		readonly parent?: FieldT<any>;

		constructor(type: TField, condition: boolean | ConditionResolver);

		size(value?: FieldT<any>, parent?: FieldT<any>): number;

		decode(
			stream: DecodeStream,
			parent?: FieldT<number>,
		): InferField<TField> | undefined;

		encode(stream: EncodeStream, val: number, parent?: FieldT<number>): void;

		fromBuffer(buf: Uint8Array): number;
		toBuffer(val?: any | null): Uint8Array;
	}

	// biome-ignore lint/suspicious/noShadowRestrictedNames: legacy
	export const Number: typeof NumberT;
	export const Fixed: typeof FixedT;
	// biome-ignore lint/suspicious/noShadowRestrictedNames: legacy
	export const String: typeof StringT;
	// biome-ignore lint/suspicious/noShadowRestrictedNames: legacy
	export const Array: typeof ArrayT;
	export const LazyArray: new <
		TField extends FieldT<unknown>,
		TExplicitOut = RestructureLazyArray<InferField<TField>>,
	>(
		type: TField,
		length?: Length,
		lengthType?: 'count' | 'bytes',
	) => LazyArrayT<TField, TExplicitOut>;
	export const Struct: new <TExplicitOut>(
		fields: StructFields,
	) => StructT<TExplicitOut>;
	export const VersionedStruct: new <TExplicitOut>(
		versionField: string | FieldT<number>,
		versions: VersionedStructFields,
	) => VersionedStructT<TExplicitOut>;
	export const Bitfield: typeof BitfieldT;
	export const Pointer: typeof PointerT;
	export const VoidPointer: typeof VoidPointerT;
	export const Reserved: typeof ReservedT;
	export const Buffer: typeof BufferT;
	export const Optional: typeof OptionalT;

	export const int8: NumberT;
	export const uint8: NumberT;
	export const int16: NumberT;
	export const uint16: NumberT;
	export const int24: NumberT;
	export const uint24: NumberT;
	export const int32: NumberT;
	export const uint32: NumberT;
	export const float: NumberT;
	export const double: NumberT;
	export const fixed16: FixedT;
	export const fixed16be: FixedT;
	export const fixed16le: FixedT;
	export const fixed32: FixedT;
	export const fixed32be: FixedT;
	export const fixed32le: FixedT;
}
