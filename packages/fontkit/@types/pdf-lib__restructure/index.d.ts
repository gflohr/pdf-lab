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

	export class Struct<TFields extends Record<string, Field>>
		implements Field<InferStruct<TFields>>
	{
		constructor(fields: TFields);
	}

	export class VersionedStruct<TFields extends Record<string, Field>>
		implements Field<InferStruct<TFields>>
	{
		constructor(version: number, fields: TFields);
	}

	export class FixedSizeArray<TField extends Field<any>>
		implements Field<TField extends Field<infer T> ? T[] : never>
	{
		constructor(field: TField, length: number);
	}

	export class Bitfield<const T extends readonly string[]>
		implements Field<Record<T[number], boolean>>
	{
		constructor(field: Field<number>, names: T);
	}

	export class Reserved {
		constructor(type: unknown, count: number);
	}

	export interface RestructureStatic {
		Struct: typeof Struct;
		VersionedStruct: typeof VersionedStruct;
		Reserved: typeof Reserved;
		Array: typeof FixedSizeArray;
		Bitfield: typeof Bitfield;

		int8: Field<number>;
		uint8: Field<number>;
		int16: Field<number>;
		uint16: Field<number>;
		int32: Field<number>;
		uint32: Field<number>;
		float: Field<number>;
		double: Field<number>;
	}

	const r: RestructureStatic;
	export default r;
}
