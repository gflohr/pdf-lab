import r, { DecodeStream, FieldT, Length } from '@pdf-lib/restructure';
import { resolveLength } from '@pdf-lib/restructure/src/utils.js';
import { ItemVariationStore } from './variations.js';

// TODO: add this to restructure
class VariableSizeNumber implements FieldT<number> {
	private readonly _size: Length;

	constructor(size: Length) {
		this._size = size;
	}

	decode(stream: DecodeStream, parent?: FieldT<unknown>): number {
		const size = this.size(0, parent);

		switch (size) {
			case 1:
				return stream.readUInt8();
			case 2:
				return stream.readUInt16BE();
			case 3:
				return stream.readUInt24BE();
			case 4:
				return stream.readUInt32BE();
			default:
				throw new Error(`Unexpected size '${size}! Must be 1-4!'`);
		}
	}

	size(_val?: unknown, parent?: FieldT<unknown>) {
		return resolveLength(this._size, null, parent);
	}

	encode() {
		throw new Error('Variable size number does not support encoding!');
	}
}

const MapDataEntry = new r.Struct({
	entry: new VariableSizeNumber(
		(t) => ((t.parent.entryFormat & 0x0030) >> 4) + 1,
	),
	outerIndex: (t) => t.entry >> ((t.parent.entryFormat & 0x000f) + 1),
	innerIndex: (t) =>
		t.entry & ((1 << ((t.parent.entryFormat & 0x000f) + 1)) - 1),
});

const DeltaSetIndexMap = new r.Struct({
	entryFormat: r.uint16,
	mapCount: r.uint16,
	mapData: new r.Array(MapDataEntry, 'mapCount'),
});

export default new r.Struct({
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	itemVariationStore: new r.Pointer(r.uint32, ItemVariationStore),
	advanceWidthMapping: new r.Pointer(r.uint32, DeltaSetIndexMap),
	LSBMapping: new r.Pointer(r.uint32, DeltaSetIndexMap),
	RSBMapping: new r.Pointer(r.uint32, DeltaSetIndexMap),
});
