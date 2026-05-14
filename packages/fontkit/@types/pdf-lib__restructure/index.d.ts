/** biome-ignore-all lint/suspicious/noExplicitAny: this file models a highly dynamic runtime parsing DSL. */

// This is an attempt to provide types for `@pdf-lib/restructure` the way
// the library is used inside of this project. It is very well possible that
// legitimate usage of `restructure` is not reflected here. Do not suspect
// a bug in this case but rather extend the typing.
declare module '@pdf-lib/restructure' {
	type InferStruct<TFields> = {
		[K in keyof TFields]: TFields[K] extends Field<infer TValue>
			? TValue
			: never;
	};

	export interface Field<T = unknown> {
		readonly __type?: T;
	}

	export class DecodeStream {
		buffer: Uint8Array;
		pos: number;

		readUInt8(): number;
		readUInt16BE(): number;
		readUInt32BE(): number;
	}

	export type LengthResolver = (context: any) => number;

	type StructFields = {
		[key: string]: Field<any> | StructFields | ((context: any) => any);
	};
	export class Struct<TFields extends StructFields>
		implements Field<InferStruct<TFields>>
	{
		constructor(fields: TFields);
	}

	export class VersionedStruct<TFields extends StructFields>
		implements Field<InferStruct<TFields>>
	{
		readonly __type: InferStruct<TFields>;

		constructor(version: Field<number>, fields: TFields);

		versions: Record<number, TFields>;
	}

	export class FieldArray<TField extends Field<any>>
		implements Field<TField extends Field<infer T> ? T[] : never>
	{
		constructor(field: TField, length?: number | string | LengthResolver | Field<number>);
	}

	export class LazyArray<TField extends Field<any>>
		implements Field<TField extends Field<infer T> ? T[] : never>
	{
		constructor(field: TField, length?: number | string | LengthResolver | Field<number>);
	}

	export class Bitfield<const T extends readonly (string | null)[]>
		implements Field<Exclude<T[number], boolean>>
	{
		constructor(field: Field<number>, names: T);
	}

	export class Reserved {
		constructor(type: unknown, count?: number);
	}

	export class RString implements Field<string> {
		constructor(length: number | Field<number>);
	}

	export class Pointer<TField extends Field<any>>
		implements Field<TField extends Field<infer T> ? T : never>
	{
		constructor(
			offset: Field<number>,
			target: TField,
			options?: {
				type?: 'parent' | 'root';
				lazy?: boolean;
			}
		);
	}

	export interface RestructureStatic {
		Struct: typeof Struct;
		VersionedStruct: typeof VersionedStruct;
		Reserved: typeof Reserved;
		Array: typeof FieldArray;
		LazyArray: typeof LazyArray;
		Bitfield: typeof Bitfield;
		String: typeof RString;
		Pointer: typeof Pointer;

		int8: Field<number>;
		uint8: Field<number>;
		int16: Field<number>;
		uint16: Field<number>;
		int24: Field<number>;
		uint24: Field<number>;
		int32: Field<number>;
		uint32: Field<number>;
		float: Field<number>;
		double: Field<number>;
		fixed32: Field<number>;
	}

	const r: RestructureStatic;
	export default r;
}
