import r from '@pdf-lib/restructure';
import { getEncoding, LANGUAGES } from '../encodings.js';

export namespace nameTable {
	export interface NameRecord {
		platformID: number;
		encodingID: number;
		languageID: number;
		nameID: number;
		length: number;
		string: string;
	}

	export interface LangTagRecord {
		length: number;
		tag: string;
	}

	/**
	 * Reusable mapping structure that represents the localized strings.
	 * E.g., { en: "Arial", de: "Arial" }
	 */
	export type LocalizedStrings = Record<string, string>;

	/**
	 * The final, processed form of the name records dictionary after `.process()` executes.
	 */
	export interface ProcessedRecords {
		copyright?: LocalizedStrings;
		fontFamily?: LocalizedStrings;
		fontSubfamily?: LocalizedStrings;
		uniqueSubfamily?: LocalizedStrings;
		fullName?: LocalizedStrings;
		version?: LocalizedStrings;
		postscriptName?: LocalizedStrings;
		trademark?: LocalizedStrings;
		manufacturer?: LocalizedStrings;
		designer?: LocalizedStrings;
		description?: LocalizedStrings;
		vendorURL?: LocalizedStrings;
		designerURL?: LocalizedStrings;
		license?: LocalizedStrings;
		licenseURL?: LocalizedStrings;
		preferredFamily?: LocalizedStrings;
		preferredSubfamily?: LocalizedStrings;
		compatibleFull?: LocalizedStrings;
		sampleText?: LocalizedStrings;
		postscriptCIDFontName?: LocalizedStrings;
		wwsFamilyName?: LocalizedStrings;
		wwsSubfamilyName?: LocalizedStrings;
		fontFeatures?: Record<number, LocalizedStrings>;
	}

	// Notice that "records" is typed as nameProcessedRecords to match the output state!
	export interface nameV1 {
		version: 1;
		count: number;
		stringOffset: number;
		records: ProcessedRecords;
	}

	export interface nameV2 {
		version: 2;
		count: number;
		stringOffset: number;
		records: ProcessedRecords;
		langTagCount: number;
		langTags: LangTagRecord[];
	}

	export type name = nameV1 | nameV2;
}

const nameRecordFields = {
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
};
const NameRecord = new r.Struct<typeof nameRecordFields, nameTable.NameRecord>(
	nameRecordFields,
);

const langTagRecordFields = {
	length: r.uint16,
	tag: new r.Pointer(r.uint16, new r.String('length', 'utf16be'), {
		type: 'parent',
		relativeTo: 'stringOffset',
	}),
};
const LangTagRecord = new r.Struct<
	typeof langTagRecordFields,
	nameTable.LangTagRecord
>(langTagRecordFields);

const nameFields = {
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
};

// We explicitly cast the base generic here to pass the runtime array format checks
// internally inside restructure, but map it gracefully to the finalized nameTable.name shape.
const nameStruct = new r.VersionedStruct<typeof nameFields, nameTable.name>(
	r.uint16,
	nameFields,
);

export default nameStruct;

const NAMES = [
	'copyright',
	'fontFamily',
	'fontSubfamily',
	'uniqueSubfamily',
	'fullName',
	'version',
	'postscriptName',
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

nameStruct.process = function (this: any) {
	const rawRecords = this.records as nameTable.NameRecord[];
	const processedRecords: nameTable.ProcessedRecords = {};

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
		const key = (
			isFontFeature
				? 'fontFeatures'
				: NAMES[record.nameID] || String(record.nameID)
		) as keyof nameTable.ProcessedRecords;

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

nameStruct.preEncode = function (this: any) {
	if (Array.isArray(this.records)) return;
	this.version = 0;

	const records = [];
	const processed = this.records as nameTable.ProcessedRecords;

	for (const key in processed) {
		if (key === 'fontFeatures') continue;
		const val = processed[
			key as keyof nameTable.ProcessedRecords
		] as nameTable.LocalizedStrings;
		if (!val?.en) continue;

		const indexedNameId = NAMES.indexOf(key);
		const fallbackNameId = Number(key);
		const nameID =
			indexedNameId !== -1
				? indexedNameId
				: Number.isInteger(fallbackNameId) &&
						fallbackNameId >= 0 &&
						fallbackNameId <= 0xffff
					? fallbackNameId
					: null;
		if (nameID == null) continue;

		records.push({
			platformID: 3,
			encodingID: 1,
			languageID: 0x409,
			nameID,
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
	this.stringOffset = nameStruct.size(this, null, false);
};
