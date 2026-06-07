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

const JstfGSUBModList = new r.Array(r.uint16, r.uint16);

const jstfPriorityFields = {
	shrinkageEnableGSUB: new r.Pointer(r.uint16, JstfGSUBModList),
	shrinkageDisableGSUB: new r.Pointer(r.uint16, JstfGSUBModList),
	shrinkageEnableGPOS: new r.Pointer(r.uint16, JstfGSUBModList),
	shrinkageDisableGPOS: new r.Pointer(r.uint16, JstfGSUBModList),
	shrinkageJstfMax: new r.Pointer(r.uint16, openTypeLookupList(GPOSLookup)),
	extensionEnableGSUB: new r.Pointer(r.uint16, JstfGSUBModList),
	extensionDisableGSUB: new r.Pointer(r.uint16, JstfGSUBModList),
	extensionEnableGPOS: new r.Pointer(r.uint16, JstfGSUBModList),
	extensionDisableGPOS: new r.Pointer(r.uint16, JstfGSUBModList),
	extensionJstfMax: new r.Pointer(r.uint16, openTypeLookupList(GPOSLookup)),
};
const JstfPriority = new r.Struct<
	typeof jstfPriorityFields,
	JSTFTable.Priority
>(jstfPriorityFields);

const JstfLangSys = new r.Array(
	new r.Pointer(r.uint16, JstfPriority),
	r.uint16,
);

const jstfLangSysRecordFields = {
	tag: new r.String(4),
	jstfLangSys: new r.Pointer(r.uint16, JstfLangSys),
};
const JstfLangSysRecord = new r.Struct<
	typeof jstfLangSysRecordFields,
	JSTFTable.LangSysRecord
>(jstfLangSysRecordFields);

const JstfScript = new r.Struct({
	extenderGlyphs: new r.Pointer(r.uint16, new r.Array(r.uint16, r.uint16)), // array of glyphs to extend line length
	defaultLangSys: new r.Pointer(r.uint16, JstfLangSys),
	langSysCount: r.uint16,
	langSysRecords: new r.Array(JstfLangSysRecord, 'langSysCount'),
});

const jstfScriptRecordFields = {
	tag: new r.String(4),
	script: new r.Pointer(r.uint16, JstfScript, { type: 'parent' }),
};
const JstfScriptRecord = new r.Struct<
	typeof jstfScriptRecordFields,
	JSTFTable.Script
>(jstfScriptRecordFields);

const JSTFStructFields = {
	version: r.uint32, // should be 0x00010000
	scriptCount: r.uint16,
	scriptList: new r.Array(JstfScriptRecord, 'scriptCount'),
};
export default new r.Struct<typeof JSTFStructFields, JSTFTable.JSTF>(
	JSTFStructFields,
);
