import r, { type FieldT } from '@pdf-lib/restructure';
import { GPOSLookup } from './GPOS.js';
import { LookupList, type OpenTypeLookupTable } from './opentype.js';

export namespace JSTFTable {
	export interface JSTFPriority {
		shrinkableEnableGSUB: number[];
		shrinkableDisableGSUB: number[];
		shrinkableEnableGPOS: number[];
		shrinkableDisableGPOS: number[];
		shrinkageJstfMax: FieldT<OpenTypeLookupTable<typeof GPOSLookup>[]>;
		extensionEnableGSUB: number[];
		extensionDisableGSUB: number[];
		extensionEnableGPOS: number[];
		extensionDisableGPOS: number[];
		extensionJstfMax: FieldT<OpenTypeLookupTable<typeof GPOSLookup>[]>;
	}

	export interface JSTFLangSysRecord {
		tag: string;
		jstfLangSys: JSTFPriority;
	}

	export interface JSTFScript {
		extenderGlyphs: number[] | null; // array of glyphs to extend line length
		defaultLangSys: JSTFPriority[] | null;
		langSysCount: number;
		langSysRecords: JSTFLangSysRecord[] | null;
	}

	export interface JSTF {
		version: number; // should be 0x00010000
		scriptCount: number;
		scriptList: JSTFScript[];
	}
}

const JstfGSUBModList = new r.Array(r.uint16, r.uint16);

const jstfPriorityFields = {
	shrinkageEnableGSUB: new r.Pointer(r.uint16, JstfGSUBModList),
	shrinkageDisableGSUB: new r.Pointer(r.uint16, JstfGSUBModList),
	shrinkageEnableGPOS: new r.Pointer(r.uint16, JstfGSUBModList),
	shrinkageDisableGPOS: new r.Pointer(r.uint16, JstfGSUBModList),
	shrinkageJstfMax: new r.Pointer(r.uint16, LookupList(GPOSLookup)),
	extensionEnableGSUB: new r.Pointer(r.uint16, JstfGSUBModList),
	extensionDisableGSUB: new r.Pointer(r.uint16, JstfGSUBModList),
	extensionEnableGPOS: new r.Pointer(r.uint16, JstfGSUBModList),
	extensionDisableGPOS: new r.Pointer(r.uint16, JstfGSUBModList),
	extensionJstfMax: new r.Pointer(r.uint16, LookupList(GPOSLookup)),
};
const JstfPriority = new r.Struct<
	typeof jstfPriorityFields,
	JSTFTable.JSTFPriority
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
	JSTFTable.JSTFLangSysRecord
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
	JSTFTable.JSTFScript
>(jstfScriptRecordFields);

const JSTFStructFields = {
	version: r.uint32, // should be 0x00010000
	scriptCount: r.uint16,
	scriptList: new r.Array(JstfScriptRecord, 'scriptCount'),
};
const JSTFStruct = new r.Struct<typeof JSTFStructFields, JSTFTable.JSTF>(JSTFStructFields);

export default JSTFStruct;
