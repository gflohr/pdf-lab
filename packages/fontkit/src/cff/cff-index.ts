import type {
	DecodeStream,
	EncodeStream,
	FieldT,
	NumberT,
	StringT,
} from 'restructure';
import * as r from 'restructure';
import type { CFFDict } from './cff-dict.js';
import type { CFFTable } from './cff-font.js';

export type IndexItemValue =
	| Record<string, unknown>
	| string
	| Buffer
	| CFFTable.IndexDescriptor;

interface CFFNodeContext extends FieldT<unknown> {
	length: number;
}

type CFFNode = CFFNodeContext & CFFTable.TopData;

/**
 * Handles variable-length table lookups across structural subroutines,
 * dictionaries, and string tables.
 */
export class CFFIndex<TType extends CFFDict | StringT | FieldT<IndexItemValue>>
	implements FieldT<IndexItemValue[]>
{
	constructor(public type?: TType) {}

	private getCFFVersion(ctx?: CFFNode) {
		while (ctx && !ctx.hdrSize) {
			ctx = ctx.parent as CFFNode;
		}

		return ctx ? ctx.version : -1;
	}

	decode(stream: DecodeStream, parent: CFFNode): IndexItemValue[] {
		const version = this.getCFFVersion(parent);
		const count = version >= 2 ? stream.readUInt32BE() : stream.readUInt16BE();

		if (count === 0) {
			return [];
		}

		const offSize = stream.readUInt8();
		let offsetType: NumberT;
		if (offSize === 1) {
			offsetType = r.uint8;
		} else if (offSize === 2) {
			offsetType = r.uint16;
		} else if (offSize === 3) {
			offsetType = r.uint24;
		} else if (offSize === 4) {
			offsetType = r.uint32;
		} else {
			throw new Error(`Bad offset size in CFFIndex: ${offSize} ${stream.pos}`);
		}

		const ret: IndexItemValue[] = [];
		const startPos = stream.pos + (count + 1) * offSize - 1;

		let start = offsetType.decode(stream);
		for (let i = 0; i < count; i++) {
			const end = offsetType.decode(stream);

			if (this.type != null) {
				const pos = stream.pos;
				stream.pos = startPos + start;

				parent.length = end - start;
				ret.push(this.type.decode(stream, parent));
				stream.pos = pos;
			} else {
				ret.push({
					offset: startPos + start,
					length: end - start,
				});
			}

			start = end;
		}

		stream.pos = startPos + start;

		return ret;
	}

	size(arr: Buffer[] | CFFDict[], parent: CFFNode) {
		let size = 2;
		if (arr.length === 0) {
			return size;
		}

		const type = this.type || new r.Buffer();

		// Find maximum offset to determine offset type.
		let offset = 1;
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			offset += type.size(item, parent);
		}

		let offsetType: NumberT;
		if (offset <= 0xff) {
			offsetType = r.uint8;
		} else if (offset <= 0xffff) {
			offsetType = r.uint16;
		} else if (offset <= 0xffffff) {
			offsetType = r.uint24;
		} else if (offset <= 0xffffffff) {
			offsetType = r.uint32;
		} else {
			throw new Error('Bad offset in CFFIndex');
		}

		size += 1 + offsetType.size() * (arr.length + 1);
		size += offset - 1;

		return size;
	}

	encode(
		stream: EncodeStream,
		// biome-ignore lint/suspicious/noExplicitAny: It can be almost anything.
		arr: any[],
		parent: CFFNode,
	) {
		if (this.getCFFVersion(parent) >= 2) {
			stream.writeUInt32BE(arr.length);
		} else {
			stream.writeUInt16BE(arr.length);
		}
		if (arr.length === 0) {
			return;
		}

		const type = this.type || new r.Buffer();

		// Find maximum offset to determine offset type.
		const sizes = [];
		let offset = 1;
		for (const item of arr) {
			const s = type.size(item, parent);
			sizes.push(s);
			offset += s;
		}

		let offsetType: NumberT;
		if (offset <= 0xff) {
			offsetType = r.uint8;
		} else if (offset <= 0xffff) {
			offsetType = r.uint16;
		} else if (offset <= 0xffffff) {
			offsetType = r.uint24;
		} else if (offset <= 0xffffffff) {
			offsetType = r.uint32;
		} else {
			throw new Error('Bad offset in CFFIndex');
		}

		// write offset size
		stream.writeUInt8(offsetType.size());

		// write elements
		offset = 1;
		offsetType.encode(stream, offset);

		for (const size of sizes) {
			offset += size;
			offsetType.encode(stream, offset);
		}

		for (const item of arr) {
			type.encode(stream, item, parent);
		}

		return;
	}

	fromBuffer(_buf: Uint8Array): never {
		throw new Error('internal');
	}

	toBuffer(): never {
		throw new Error('internal');
	}
}
