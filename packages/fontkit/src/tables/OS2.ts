import r from '@pdf-lib/restructure';

export namespace OS2Table {
	export interface OS2Header {
		/**
		 * The average weighted advance width of lower case letters and space.
		 */
		xAvgCharWidth: number,

		/** The visual weight of stroke in glyphs. */
		usWeightClass: number,

		/**
		 * The relative change from the normal aspect ratio (width to height
		 * ratio).
		 */
		usWidthClass: number,

		/** The indication of font embedding licensing rights. */
		fsType: {
			noEmbedding: boolean,
			viewOnly: boolean,
			editable: boolean,
			noSubsetting: boolean,
			bitmapOnly: boolean,
		},

		/** The recommended horizontal size in pixels for subscripts. */
		ySubscriptXSize: number,

		/** The recommended horizontal size in pixels for subscripts. */
		ySubscriptYSize: number,

		/** The recommended horizontal offset for subscripts. */
		ySubscriptXOffset: number,

		/** The recommended vertical offset from the baseline for subscripts. */
		ySubscriptYOffset: number,

		/** The recommended horizontal size in pixels for superscripts. */
		ySuperscriptXSize: number,

		/** The recommended vertical size in pixels for superscripts. */
		ySuperscriptYSize: number,

		/** The recommended horizontal offset for superscripts */
		ySuperscriptXOffset: number,

		/**
		 * The recommended vertical offset from the baseline for superscripts.
		 */
		ySuperscriptYOffset: number,

		/* The width of the strikeout stroke. */
		yStrikeoutSize: number,

		/** The position of the strikeout stroke relative to the baseline. */
		yStrikeoutPosition: number,

		/** The classification of font-family design. */
		sFamilyClass: number,

		/**
		 * The description of the visual characteristics of a given typeface.
		 */
		panose: number[],

		ulCharRange: number[],

		/** The four character identifier for the font vendor. */
		vendorID: string,

		/** A bit field containing information about the font. */
		fsSelection: {
			italic: boolean,
			underscore: boolean,
			negative: boolean,
			outlined: boolean,
			strikeout: boolean,
			bold: boolean,
			regular: boolean,
			useTypoMetrics: boolean,
			wws: boolean,
			oblique: boolean,
		},

		/** The minimum Unicode index in this font. */
		usFirstCharIndex: number,

		/** The maximum Unicode index in this font. */
		usLastCharIndex: number,
	}

	/**
	 * The Apple version of this table ends here but the Microsoft one
	 * continues on...
	 */
	export interface OS2V0 extends OS2Header {
		version: 0,
	};

	export interface OS2V1 extends OS2Header {
		version: 1,
		typoAscender: number,
		typoDescender: number,
		typoLineGap: number,
		winAscent: number,
		winDescent: number,
		codePageRange: [number, number],
	};

	export interface OS2V2 extends OS2Header {
		// Common with version 1.
		version: 2,
		typoAscender: number,
		typoDescender: number,
		typoLineGap: number,
		winAscent: number,
		winDescent: number,
		codePageRange: [number, number],

		// Extensions.
		xHeight: number,
		capHeight: number,
		defaultChar: number,
		breakChar: number,
		maxContent: number,
	};

	export interface OS2V3 extends OS2Header {
		// Common with version 1.
		version: 3,
		typoAscender: number,
		typoDescender: number,
		typoLineGap: number,
		winAscent: number,
		winDescent: number,
		codePageRange: [number, number],

		// Extensions.
		xHeight: number,
		capHeight: number,
		defaultChar: number,
		breakChar: number,
		maxContent: number,
	};

	export interface OS2V4 extends OS2Header {
		// Common with version 1.
		version: 4,
		typoAscender: number,
		typoDescender: number,
		typoLineGap: number,
		winAscent: number,
		winDescent: number,
		codePageRange: [number, number],

		// Extensions.
		xHeight: number,
		capHeight: number,
		defaultChar: number,
		breakChar: number,
		maxContent: number,
	};

	export interface OS2V5 extends OS2Header {
		// Common with version 1.
		version: 5,
		typoAscender: number,
		typoDescender: number,
		typoLineGap: number,
		winAscent: number,
		winDescent: number,
		codePageRange: [number, number],

		// Common with version 2.
		xHeight: number,
		capHeight: number,
		defaultChar: number,
		breakChar: number,
		maxContent: number,

		// Extensions.
		usLowerOpticalPointSize: number,
		usUpperOpticalPointSize: number,
	};

	export type OS2 = OS2V0 | OS2V1 | OS2V2 | OS2V3 | OS2V4 | OS2V5;
}

const os2V1Fields = {
	typoAscender: r.int16,
	typoDescender: r.int16,
	typoLineGap: r.int16,
	winAscent: r.uint16,
	winDescent: r.uint16,
	codePageRange: new r.Array(r.uint32, 2),
};
const os2V2Fields = {
	...os2V1Fields,
	xHeight: r.int16,
	capHeight: r.int16,
	defaultChar: r.uint16,
	breakChar: r.uint16,
	maxContent: r.uint16,
};
const os2V5Fields = {
	...os2V2Fields,
	usLowerOpticalPointSize: r.uint16,
	usUpperOpticalPointSize: r.uint16,
};
const os2Fields = {
	header: {
		xAvgCharWidth: r.int16,
		usWeightClass: r.uint16,
		usWidthClass: r.uint16,
		fsType: new r.Bitfield(r.uint16, [
			null,
			'noEmbedding',
			'viewOnly',
			'editable',
			null,
			null,
			null,
			null,
			'noSubsetting',
			'bitmapOnly',
		]),
		ySubscriptXSize: r.int16,
		ySubscriptYSize: r.int16,
		ySubscriptXOffset: r.int16,
		ySubscriptYOffset: r.int16,
		ySuperscriptXSize: r.int16,
		ySuperscriptYSize: r.int16,
		ySuperscriptXOffset: r.int16,
		ySuperscriptYOffset: r.int16,
		yStrikeoutSize: r.int16,
		yStrikeoutPosition: r.int16,
		sFamilyClass: r.int16,
		panose: new r.Array(r.uint8, 10),
		ulCharRange: new r.Array(r.uint32, 4),
		vendorID: new r.String(4),
		fsSelection: new r.Bitfield(r.uint16, [
			'italic',
			'underscore',
			'negative',
			'outlined',
			'strikeout',
			'bold',
			'regular',
			'useTypoMetrics',
			'wws',
			'oblique',
		]),
		usFirstCharIndex: r.uint16,
		usLastCharIndex: r.uint16,
	},

	0: {},
	1: os2V1Fields,
	2: os2V2Fields,
	3: os2V2Fields,
	4: os2V2Fields,
	5: os2V5Fields,
};

const OS2Struct = new r.VersionedStruct<typeof os2Fields, OS2Table.OS2>(r.uint16, os2Fields);

export default OS2Struct;
