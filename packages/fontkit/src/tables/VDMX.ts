import r from '@pdf-lib/restructure';

export namespace SFNTTable {
	export interface VDMXRatio {
		bCharSet: number, /** The character set. */
		xRatio: number, /** The alue to use for x-Ratio. */
		yStartRatio: number, /** The starting y-Ratio value. */
		yEndRatio: number, /** The ending y-Ratio value. */
	}

	export interface VDMXvTable {
		yPelHeight: number, /** The yPelHeight to which values apply. */
		yMax: number, /** The maximum value (in pels) for this yPelHeight. */
		yMin: number, /** The minimum value (in pels) for this yPelHeight. */
	}

	export interface VDMXGroup {
		recs: number, /** The number of height records in this group. */
		startsz: number, /** The starting yPelHeight. */
		endsz: number, /** The ending yPelHeight. */
		entries: VDMXvTable[], /** The VDMX records. */
	}

	/** VDMX tables contain ascender/descender overrides for certain (usually
	 * small sizes. This is needed in order to match font metrics on Windows.
	 */
	export interface VDMX {
		version: number, /* The version number (0 or 1). */
		numRecs: number, /* The number of VDMX groups present. */
		numRatios: number, /* The number of aspect ratio groupings. */
		ratioRanges: VDMXRatio[], /** The ratio ranges. */
		offsets: number[], /** The offset to the VDMX group for this ratio range. */
		groups: VDMXGroup[], /** The actual VDMX groupings. */
	}
}

const Ratio = new r.Struct({
	bCharSet: r.uint8,
	xRatio: r.uint8,
	yStartRatio: r.uint8,
	yEndRatio: r.uint8,
});

const vTable = new r.Struct({
	yPelHeight: r.uint16,
	yMax: r.int16,
	yMin: r.int16,
});

const VdmxGroup = new r.Struct({
	recs: r.uint16, // Number of height records in this group
	startsz: r.uint8, // Starting yPelHeight
	endsz: r.uint8, // Ending yPelHeight
	entries: new r.Array(vTable, 'recs'), // The VDMX records
});

const VDMXFields = {
	version: r.uint16, // Version number (0 or 1)
	numRecs: r.uint16, // Number of VDMX groups present
	numRatios: r.uint16, // Number of aspect ratio groupings
	ratioRanges: new r.Array(Ratio, 'numRatios'), // Ratio ranges
	offsets: new r.Array(r.uint16, 'numRatios'), // Offset to the VDMX group for this ratio range
	groups: new r.Array(VdmxGroup, 'numRecs'), // The actual VDMX groupings
}

const VDMXStruct = new r.Struct<typeof VDMXFields, SFNTTable.VDMX>(VDMXFields);

export default VDMXStruct;
