/** biome-ignore-all lint/suspicious/noExplicitAny: this file models a highly dynamic runtime parsing DSL. */
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
		[key: string]: Field<any> | StructFields;
	};
	export class Struct<TFields extends StructFields>
		implements Field<InferStruct<TFields>>
	{
		constructor(fields: TFields);
	}

	export class VersionedStruct<TFields extends StructFields>
		implements Field<InferStruct<TFields>>
	{
		constructor(version: Field<number>, fields: TFields);
	}

	export class FieldArray<TField extends Field<any>>
		implements Field<TField extends Field<infer T> ? T[] : never>
	{
		constructor(field: TField, length?: number | string | LengthResolver);
	}

	export class Bitfield<const T extends readonly string[]>
		implements Field<Record<T[number], boolean>>
	{
		constructor(field: Field<number>, names: T);
	}

	export class Reserved {
		constructor(type: unknown, count: number);
	}

	export class RString implements Field<string> {
		constructor(type: Field<number>);
	}

	export interface RestructureStatic {
		Struct: typeof Struct;
		VersionedStruct: typeof VersionedStruct;
		Reserved: typeof Reserved;
		Array: typeof FieldArray;
		Bitfield: typeof Bitfield;
		String: typeof RString;

		int8: Field<number>;
		uint8: Field<number>;
		int16: Field<number>;
		uint16: Field<number>;
		int32: Field<number>;
		uint32: Field<number>;
		float: Field<number>;
		double: Field<number>;
		fixed32: Field<number>;
	}

	const r: RestructureStatic;
	export default r;
}
