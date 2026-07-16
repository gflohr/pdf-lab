import isEqual from 'deep-equal';
import type {
	DecodeStream,
	EncodeStream,
	FieldT,
	ParsingContext,
} from 'restructure';
import { cffOperand } from './cff-operand.js';
import type { CFFPrivateDictTable } from './cff-pointer.js';
import type { CFFPrivateOp, PredefinedOp } from './cff-top.js';

interface CFFOp extends FieldT<unknown> {
	decode(
		stream: DecodeStream,
		ctx?: ParsingContext,
		operands?: ParsingContext,
	): unknown;
}

type CFFOpType =
	| 'delta'
	| 'number'
	| 'boolean'
	| 'offset'
	| 'sid'
	| 'array'
	| string[]
	| null
	| CFFOp
	| CFFPrivateOp
	| PredefinedOp;

export type CFFOpDefinition = [
	operator: number | [number, number],
	name: string,
	type: CFFOpType,
	defaultValue?: number | number[] | string[] | boolean | null,
];

/**
 * @internal
 */
export interface CFFContext {
	parent?: CFFContext;
	val: any;
	pointerSize: number;
	startOffset: number;
	pointers?: Array<{ type: any; val: any; parent: any }>;
	pointerOffset?: number;
}

/**
 * Handles binary decoding and encoding of Compact Font Format (CFF) key-value dictionaries.
 */
export class CFFDict implements FieldT<Record<string, any>> {
	public ops: CFFOpDefinition[];
	public fields: Record<number, CFFOpDefinition>;

	constructor(ops: CFFOpDefinition[] = []) {
		this.ops = ops;
		this.fields = {};

		for (const field of ops) {
			const key = Array.isArray(field[0])
				? (field[0][0] << 8) | field[0][1]
				: field[0];
			this.fields[key] = field;
		}
	}

	decodeOperands(
		type: CFFOpType | string | undefined | null,
		stream: DecodeStream,
		ret: Record<string, CFFPrivateDictTable>,
		operands: number[],
	): any {
		if (Array.isArray(type)) {
			return operands.map((op, i) =>
				this.decodeOperands(type[i], stream, ret, [op]),
			);
		} else if (
			type &&
			typeof type === 'object' &&
			typeof type.decode === 'function'
		) {
			return type.decode(stream, ret, operands);
		} else {
			switch (type) {
				case 'number':
				case 'offset':
				case 'sid':
					return operands[0];
				case 'boolean':
					return !!operands[0];
				default:
					return operands;
			}
		}
	}

	encodeOperands(
		type: any,
		stream: EncodeStream | null,
		ctx: CFFContext,
		operands: any,
	): any[] {
		if (Array.isArray(type)) {
			return operands.map(
				(op: any, i: number) =>
					this.encodeOperands(type[i], stream, ctx, op)[0],
			);
		} else if (type && typeof type.encode === 'function') {
			return type.encode(stream, operands, ctx);
		} else if (typeof operands === 'number') {
			return [operands];
		} else if (typeof operands === 'boolean') {
			return [+operands];
		} else if (Array.isArray(operands)) {
			return operands;
		} else {
			return [operands];
		}
	}

	decode(stream: DecodeStream, parent?: any): Record<string, any> {
		const end = stream.pos + (parent?.length ?? 0);
		const ret: Record<string, any> = {};
		let operands: any[] = [];

		// Define hidden context metadata engine properties
		Object.defineProperties(ret, {
			parent: { value: parent, enumerable: false },
			_startOffset: { value: stream.pos, enumerable: false },
		});

		// Fill in defaults specified by the operators configuration schema
		for (const key in this.fields) {
			const field = this.fields[key];
			const defaultValue = field[3];
			ret[field[1]] = Array.isArray(defaultValue)
				? [...defaultValue]
				: defaultValue;
		}

		while (stream.pos < end) {
			let b = stream.readUInt8();
			if (b < 28) {
				if (b === 12) {
					b = (b << 8) | stream.readUInt8();
				}

				const field = this.fields[b];
				if (!field) {
					throw new Error(`Unknown CFF operator token: ${b}`);
				}

				const val = this.decodeOperands(field[2], stream, ret, operands);
				if (val != null) {
					if (
						val &&
						typeof val === 'object' &&
						val.constructor?.name === 'PropertyDescriptor'
					) {
						Object.defineProperty(ret, field[1], val as PropertyDescriptor);
					} else {
						ret[field[1]] = val;
					}
				}

				operands = [];
			} else {
				operands.push(cffOperand.decode(stream, b));
			}
		}

		return ret;
	}

	size(
		dict: Record<string, any>,
		parent?: any,
		includePointers = true,
	): number {
		const ctx: CFFContext = {
			parent,
			val: dict,
			pointerSize: 0,
			startOffset: parent?.startOffset || 0,
		};

		let len = 0;

		for (const k in this.fields) {
			const field = this.fields[k];
			const val = dict[field[1]];
			if (val == null || isEqual(val, field[3])) {
				continue;
			}

			const operands = this.encodeOperands(field[2], null, ctx, val);
			for (const op of operands) {
				len += cffOperand.size(op);
			}

			const key = Array.isArray(field[0]) ? field[0] : [field[0]];
			len += key.length;
		}

		if (includePointers) {
			len += ctx.pointerSize;
		}

		return len;
	}

	encode(stream: EncodeStream, dict: Record<string, any>, parent?: any): void {
		const ctx: CFFContext = {
			pointers: [],
			startOffset: stream.pos,
			parent,
			val: dict,
			pointerSize: 0,
		};

		ctx.pointerOffset = stream.pos + this.size(dict, ctx, false);

		for (const field of this.ops) {
			const val = dict[field[1]];
			if (val == null || isEqual(val, field[3])) {
				continue;
			}

			const operands = this.encodeOperands(field[2], stream, ctx, val);
			for (const op of operands) {
				cffOperand.encode(stream, op);
			}

			const key = Array.isArray(field[0]) ? field[0] : [field[0]];
			for (const op of key) {
				stream.writeUInt8(op);
			}
		}

		if (ctx.pointers) {
			let i = 0;
			while (i < ctx.pointers.length) {
				const ptr = ctx.pointers[i++];
				ptr.type.encode(stream, ptr.val, ptr.parent);
			}
		}
	}

	[key: string]: unknown;

	fromBuffer(_buf: Uint8Array): never {
		throw new Error('internal');
	}

	toBuffer(): never {
		throw new Error('internal');
	}
}
