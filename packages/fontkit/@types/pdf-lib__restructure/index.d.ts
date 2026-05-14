declare module '@pdf-lib/restructure' {
	export interface Field<T = unknown> {
		// marker interface
	}

	export class DecodeStream {
		buffer: Uint8Array;
		pos: number;

		readUInt8(): number;
		readUInt16BE(): number;
		readUInt32BE(): number;
	}

	export class Struct<T = unknown> {
		constructor(fields: Record<string, unknown>);
	}

	export class VersionedStruct<T = unknown> {
		constructor(version: number, fields: Record<string, unknown>);
	}

	export class Reserved {
		constructor(type: unknown, count: number);
	}

	export interface RestructureStatic {
		Struct: typeof Struct;
		VersionedStruct: typeof VersionedStruct;
		Reserved: typeof Reserved;

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
