import r from '@pdf-lib/restructure';
import { getEncoding, LANGUAGES } from '../encodings.js';

const NameRecord = new r.Struct({
	platformID: r.uint16,
	encodingID: r.uint16,
	languageID: r.uint16,
	nameID: r.uint16,
	length: r.uint16,
	string: new r.Pointer(
		r.uint16,
		new r.String(
			'length',
			(t) => getEncoding(t.platformID, t.encodingID, t.languageID) as string,
		),
		{ type: 'parent', relativeTo: 'parent.stringOffset', allowNull: false },
	),
});

const LangTagRecord = new r.Struct({
	length: r.uint16,
	tag: new r.Pointer(r.uint16, new r.String('length', 'utf16be'), {
		type: 'parent',
		relativeTo: 'stringOffset',
	}),
});

var NameTable = new r.VersionedStruct(r.uint16, {
	0: {
		count: r.uint16,
		stringOffset: r.uint16,
		records: new r.Array(NameRecord, 'count'),
	},
	1: {
		count: r.uint16,
		stringOffset: r.uint16,
		records: new r.Array(NameRecord, 'count'),
		langTagCount: r.uint16,
		langTags: new r.Array(LangTagRecord, 'langTagCount'),
	},
});

export default NameTable;

const NAMES = [
	'copyright',
	'fontFamily',
	'fontSubfamily',
	'uniqueSubfamily',
	'fullName',
	'version',
	'postscriptName', // Note: A font may have only one PostScript name and that name must be ASCII.
	'trademark',
	'manufacturer',
	'designer',
	'description',
	'vendorURL',
	'designerURL',
	'license',
	'licenseURL',
	null, // reserved
	'preferredFamily',
	'preferredSubfamily',
	'compatibleFull',
	'sampleText',
	'postscriptCIDFontName',
	'wwsFamilyName',
	'wwsSubfamilyName',
];

// 1. The clean, final public state type for the class property.
interface CompiledNameRecords {
	fontFeatures?: Record<number, Record<string, string>>;
	[nameKey: string]:
		| Record<string, string>
		| Record<number, Record<string, string>>
		| undefined;
}

// 2. An explicit internal interface for the temporary raw decoding format
interface RawFontRecord {
	platformID: number;
	languageID: number;
	nameID: number;
	string: string;
}

NameTable.process = function (this: {
	records: RawFontRecord[] | CompiledNameRecords;
	langTags?: { tag: string }[];
}) {
	const rawRecords = this.records as RawFontRecord[];
	const processedRecords: CompiledNameRecords = {};

	for (const record of rawRecords) {
		let language: string | null =
			LANGUAGES[record.platformID]?.[record.languageID];

		if (
			language == null &&
			this.langTags != null &&
			record.languageID >= 0x8000
		) {
			language = this.langTags[record.languageID - 0x8000]?.tag;
		}

		if (language == null) {
			language = `${record.platformID}-${record.languageID}`;
		}

		const isFontFeature = record.nameID >= 256;
		const key = isFontFeature
			? 'fontFeatures'
			: NAMES[record.nameID] || String(record.nameID);

		if (isFontFeature) {
			processedRecords.fontFeatures ||= {};
			processedRecords.fontFeatures[record.nameID] ||= {};

			const targetFeatureMap = processedRecords.fontFeatures[record.nameID];
			if (
				typeof record.string === 'string' ||
				typeof targetFeatureMap[language] !== 'string'
			) {
				targetFeatureMap[language] = record.string;
			}
		} else {
			processedRecords[key] ||= {};
			const targetNameMap = processedRecords[key] as Record<string, string>;

			if (
				typeof record.string === 'string' ||
				typeof targetNameMap[language] !== 'string'
			) {
				targetNameMap[language] = record.string;
			}
		}
	}

	this.records = processedRecords;
};

NameTable.preEncode = function () {
	if (Array.isArray(this.records)) return;
	this.version = 0;

	const records = [];
	for (const key in this.records) {
		const val = this.records[key];
		if (key === 'fontFeatures') continue;

		records.push({
			platformID: 3,
			encodingID: 1,
			languageID: 0x409,
			nameID: NAMES.indexOf(key),
			length: Buffer.byteLength(val.en, 'utf16le'),
			string: val.en,
		});

		if (key === 'postscriptName') {
			records.push({
				platformID: 1,
				encodingID: 0,
				languageID: 0,
				nameID: NAMES.indexOf(key),
				length: val.en.length,
				string: val.en,
			});
		}
	}

	this.records = records;
	this.count = records.length;
	this.stringOffset = NameTable.size(this, null, false);
};
