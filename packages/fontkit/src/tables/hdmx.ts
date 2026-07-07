import * as r from 'restructure';

export namespace hdmxTable {
	export interface DeviceRecord {
		pixelSize: number;
		maximumWidth: number;
		widths: number[];
		padding: number[];
	}

	/**
	 * The Horizontal Device Metrics table stores integer advance widths scaled
	 * to particular pixel sizes.
	 */
	export interface hdmx {
		version: number;
		numRecords: number;
		sizeDeviceRecord: number;
		records: DeviceRecord[];
	}
}

const deviceRecordFields = {
	pixelSize: r.uint8,
	maximumWidth: r.uint8,
	widths: new r.Array(r.uint8, (t) => t.parent.parent.maxp.numGlyphs),
	padding: new r.Array(
		r.uint8,
		(t) =>
			t.parent.parent.sizeDeviceRecord - 2 - t.parent.parent.maxp.numGlyphs,
	),
};
const DeviceRecord = new r.Struct<
	typeof deviceRecordFields,
	hdmxTable.DeviceRecord
>(deviceRecordFields);

const hdmxStructFields = {
	version: r.uint16,
	numRecords: r.uint16,
	sizeDeviceRecord: r.uint32,
	records: new r.Array(DeviceRecord, 'numRecords'),
};
/** @internal */
export const hdmx = new r.Struct<typeof hdmxStructFields, hdmxTable.hdmx>(
	hdmxStructFields,
);
