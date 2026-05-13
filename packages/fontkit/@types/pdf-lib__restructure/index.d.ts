declare module '@pdf-lib/restructure' {
	export class DecodeStream {
		buffer: Uint8Array;
		pos: number;

		readUInt8(): number;
		readUInt16BE(): number;
		readUInt32BE(): number;
	}

	export class VersionedStruct {
		constructor(version: number, fields: unknown);
	}

	const r: unknown;
	export default r;
}
