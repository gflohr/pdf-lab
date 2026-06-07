import r, { type FieldT } from '@pdf-lib/restructure';
import { GPOSLookup } from './GPOS.js';
import { type OpenType, openTypeLookupList } from './opentype.js';

export namespace JSTFTable {
	export interface Priority {
		shrinkableEnableGSUB: number[];
		shrinkableDisableGSUB: number[];
		shrinkableEnableGPOS: number[];
		shrinkableDisableGPOS: number[];
		shrinkageJstfMax: FieldT<OpenType.LookupTable<typeof GPOSLookup>[]>;
		extensionEnableGSUB: number[];
		extensionDisableGSUB: number[];
		extensionEnableGPOS: number[];
		extensionDisableGPOS: number[];
		extensionJstfMax: FieldT<OpenType.LookupTable<typeof GPOSLookup>[]>;
	}

	export interface LangSysRecord {
		tag: string;
		jstfLangSys: Priority;
	}

	export interface Script {
		extenderGlyphs: number[] | null; // array of glyphs to extend line length
		defaultLangSys: Priority[] | null;
		langSysCount: number;
		langSysRecords: LangSysRecord[] | null;
	}

	export interface JSTF {
		version: number; // should be 0x00010000
		scriptCount: number;
		scriptList: Script[];
	}
}

const jstfGSUBModList = new r.Array(r.uint16, r.uint16);

const jstfPriorityFields = {
	shrinkageEnableGSUB: new r.Pointer(r.uint16, jstfGSUBModList),
	shrinkageDisableGSUB: new r.Pointer(r.uint16, jstfGSUBModList),
	shrinkageEnableGPOS: new r.Pointer(r.uint16, jstfGSUBModList),
	shrinkageDisableGPOS: new r.Pointer(r.uint16, jstfGSUBModList),
	shrinkageJstfMax: new r.Pointer(r.uint16, openTypeLookupList(GPOSLookup)),
	extensionEnableGSUB: new r.Pointer(r.uint16, jstfGSUBModList),
	extensionDisableGSUB: new r.Pointer(r.uint16, jstfGSUBModList),
	extensionEnableGPOS: new r.Pointer(r.uint16, jstfGSUBModList),
	extensionDisableGPOS: new r.Pointer(r.uint16, jstfGSUBModList),
	extensionJstfMax: new r.Pointer(r.uint16, openTypeLookupList(GPOSLookup)),
};
const jstfPriority = new r.Struct<
	typeof jstfPriorityFields,
	JSTFTable.Priority
>(jstfPriorityFields);

const jstfLangSys = new r.Array(
	new r.Pointer(r.uint16, jstfPriority),
	r.uint16,
);

const jstfLangSysRecordFields = {
	tag: new r.String(4),
	jstfLangSys: new r.Pointer(r.uint16, jstfLangSys),
};
const jstfLangSysRecord = new r.Struct<
	typeof jstfLangSysRecordFields,
	JSTFTable.LangSysRecord
>(jstfLangSysRecordFields);

const jstfScriptFields = {
	extenderGlyphs: new r.Pointer(r.uint16, new r.Array(r.uint16, r.uint16)), // array of glyphs to extend line length
	defaultLangSys: new r.Pointer(r.uint16, jstfLangSys),
	langSysCount: r.uint16,
	langSysRecords: new r.Array(jstfLangSysRecord, 'langSysCount'),
};
const jstfScript = new r.Struct<typeof jstfScriptFields, JSTFTable.Script>(
	jstfScriptFields,
);

const jstfScriptRecordFields = {
	tag: new r.String(4),
	script: new r.Pointer(r.uint16, jstfScript, { type: 'parent' }),
};
const jstfScriptRecord = new r.Struct<
	typeof jstfScriptRecordFields,
	JSTFTable.Script
>(jstfScriptRecordFields);

const jstfStructFields = {
	version: r.uint32, // should be 0x00010000
	scriptCount: r.uint16,
	scriptList: new r.Array(jstfScriptRecord, 'scriptCount'),
};
export default new r.Struct<typeof jstfStructFields, JSTFTable.JSTF>(
	jstfStructFields,
);
