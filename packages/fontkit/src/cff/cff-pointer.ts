/** biome-ignore-all lint/suspicious/noExplicitAny: This module hijacks the
 * offsetType member of the base class dynamically.
 */
import type {
	DecodeStream,
	EncodeStream,
	FieldT,
	InferField,
	PointerTOptions,
} from 'restructure';
import r from 'restructure';
import type { CFFIndexRecord } from './cff-index.js';

export interface CFFPrivateDictTable {
	BlueValues?: number[] | null;
	OtherBlues?: number[] | null;
	FamilyBlues?: number[] | null;
	FamilyOtherBlues?: number[] | null;
	StdHW?: number;
	StdVW?: number;
	Subrs?: CFFIndexRecord[];
	defaultWidthX?: number;
	nominalWidthX?: number;
	vsindex?: number;
	blend?: unknown;
	BlueScale?: number;
	BlueShift?: number;
	BlueFuzz?: number;
	StemSnapH?: number[];
	StemSnapV?: number[];
	ForceBold?: boolean;
	LanguageGroup?: number;
	ExpansionFactor?: number;
	initialRandomSeed?: number;
}

/**
 * A specialized CFF wrapper representing an encapsulation pointer handle
 * that forces large 4-byte spacing output structures during encoding.
 *
 * @internal
 */
export class Ptr {
	public val: number;
	public forceLarge = true;

	constructor(val: number) {
		this.val = val;
	}

	valueOf(): number {
		return this.val;
	}
}

/**
 * Specialized CFF Dict stream pointer. Handles variable operands collected
 * from the dictionary stack as dynamic lookahead offsets.
 */
export class CFFPointer<TField extends FieldT<any>> extends r.Pointer<TField> {
	constructor(type: TField, options: PointerTOptions = {}) {
		if (options.type == null) {
			options.type = 'global';
		}

		// Restructure takes (offsetType, type, options). CFF overrides
		// offsetType dynamically, so pass null here.
		super(null as never, type, options);
	}

	/**
	 * Intercepted decoder driven by CFFDict operand collection cascades.
	 */
	override decode(
		stream: DecodeStream,
		parent?: unknown,
		operands?: [number],
	): InferField<TField> {
		if (operands && operands.length > 0) {
			// Hijack offsetType: instead of reading bytes, return the
			// pre-parsed operand size coordinate.
			(this as any).offsetType = {
				decode: () => operands[0],
			};
		}

		return super.decode(stream, parent) as InferField<TField>;
	}

	/**
	 * Serializes or computes size configurations for structural dictionaries.
	 */
	override encode(
		stream: EncodeStream | null,
		value: InferField<TField>,
		ctx: unknown,
	): any {
		if (!stream) {
			// Compute phase size generation mock.
			(this as any).offsetType = {
				size: () => 0,
			} as FieldT<number>;

			this.size(value, ctx);
			return [new Ptr(0)];
		}

		let ptr: number | null = null;
		(this as any).offsetType = {
			encode: (_stream: EncodeStream, val: number) => {
				ptr = val;
			},
		};

		super.encode(stream, value, ctx);

		return [new Ptr(ptr ?? 0)];
	}
}
