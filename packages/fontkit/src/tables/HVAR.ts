import r, { type DecodeStream, type FieldT, type Length } from 'restructure';
import { resolveLength } from 'restructure/src/utils.js';
import { itemVariationStore, type OpenTypeVariation } from './variations.js';

// TODO: add this to restructure
export class VariableSizeNumber implements FieldT<number> {
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

export namespace HVARTable {
	/**
	 * Represents a single parsed entry within a delta set index map.
	 */
	export interface MapDataEntry {
		/** The raw multi-size value containing packed index bits. */
		entry: number;

		/**
		 * Outer index pointing to an item variation data set inside the
		 * variation store.
		 */
		outerIndex: number;

		/**
		 * Inner index pointing to a specific delta vector row inside the
		 * item variation data set.
		 * */
		innerIndex: number;
	}

	/**
	 * Represents a compiled Map table correlating glyph IDs to variation
	 * indexes.
	 */
	export interface DeltaSetIndexMap {
		/** Flag formatting mask dictating outer/inner index bit boundaries. */
		entryFormat: number;
		/** Total number of mapping index elements stored. */
		mapCount: number;
		/** Array containing individual variation indexing pairs. */
		mapData: MapDataEntry[];
	}

	/**
	 * Represents the OpenType Horizontal Metrics Variation Table (`HVAR`).
	 *
	 * This table supplies variation adjustments for advance widths, left side bearings,
	 * and right side bearings of horizontal metrics within variable fonts.
	 */
	export interface HVAR {
		/** Major table specification version (typically 1). */
		majorVersion: number;

		/** Minor table specification version (typically 0). */
		minorVersion: number;

		/**
		 * Pointer to the underlying item variation storage tracking region
		 * deltas.
		 */
		itemVariationStore: OpenTypeVariation.ItemVariationStore;
		/**
		 * Optional mapping data resolving variable adjustments for advance
		 * widths.
		 */
		advanceWidthMapping: DeltaSetIndexMap | null;

		/**
		 * Optional mapping data resolving variable adjustments for Left Side
		 * Bearings.
		 */
		LSBMapping: DeltaSetIndexMap | null;

		/**
		 * Optional mapping data resolving variable adjustments for Right Side
		 * Bearings.
		 */
		RSBMapping: DeltaSetIndexMap | null;
	}
}

interface MapDataParent {
	entryFormat: number;
}

export interface MapDataEntryContext {
	parent: MapDataParent;
	entry: number;
}

const mapDataEntryFields = {
	entry: new VariableSizeNumber(
		(t: { parent: MapDataParent }) =>
			((t.parent.entryFormat & 0x0030) >> 4) + 1,
	),
	outerIndex: (t: MapDataEntryContext): number =>
		t.entry >> ((t.parent.entryFormat & 0x000f) + 1),

	innerIndex: (t: MapDataEntryContext): number =>
		t.entry & ((1 << ((t.parent.entryFormat & 0x000f) + 1)) - 1),
};
const MapDataEntry = new r.Struct<
	typeof mapDataEntryFields,
	HVARTable.MapDataEntry
>(mapDataEntryFields);

const deltaSetIndexMapFields = {
	entryFormat: r.uint16,
	mapCount: r.uint16,
	mapData: new r.Array(MapDataEntry, 'mapCount'),
};
const DeltaSetIndexMap = new r.Struct<
	typeof deltaSetIndexMapFields,
	HVARTable.DeltaSetIndexMap
>(deltaSetIndexMapFields);

const hvarFields = {
	majorVersion: r.uint16,
	minorVersion: r.uint16,
	itemVariationStore: new r.Pointer(r.uint32, itemVariationStore),
	advanceWidthMapping: new r.Pointer(r.uint32, DeltaSetIndexMap),
	LSBMapping: new r.Pointer(r.uint32, DeltaSetIndexMap),
	RSBMapping: new r.Pointer(r.uint32, DeltaSetIndexMap),
};

/** @internal */
export const HVAR = new r.Struct<typeof hvarFields, HVARTable.HVAR>(hvarFields);
