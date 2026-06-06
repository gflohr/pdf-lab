/** biome-ignore-all assist/source/organizeImports: tables are sorted by topic */
import type { ArrayT, StructT, VersionedStructT } from '@pdf-lib/restructure';

// AAT.
import type { AAT } from './aat.js';

// Required Tables
import cmap from './cmap.js';
import head from './head.js';
import hhea from './hhea.js';
import hmtx, { type hmtxTable } from './hmtx.js';
import maxp, { type maxpTable } from './maxp.js';
import name, { type nameTable } from './name.js';
import OS2, { type OS2Table } from './OS2.js';
import post, { type postTable } from './post.js';

// TrueType Outlines
import cvt from './cvt.js';
import fpgm from './fpgm.js';
import glyf from './glyf.js';
import loca, { type locaTable } from './loca.js';
import prep, { type prepTable } from './prep.js';

// PostScript Outlines
import CFFFont from '../cff/cff-font.js';
import VORG, { type VORGTable } from './VORG.js';

import COLR from './COLR.js';
import CPAL from './CPAL.js';

// OpenType variations tables
import HVAR, { type HVARTable } from './HVAR.js';

// Bitmap Glyphs
import EBLC from './EBLC.js';
import sbix, { type sbixTable } from './sbix.js';

// Advanced OpenType Tables
import BASE from './BASE.js';
import GDEF from './GDEF.js';
import GPOS, { type GPOSTable } from './GPOS.js';
import GSUB from './GSUB.js';
import JSTF from './JSTF.js';

// Other OpenType Tables
import DSIG from './DSIG.js';
import gasp from './gasp.js';
import hdmx from './hdmx.js';
import kern, { type kernTable } from './kern.js';
import LTSH, { type LTSHTable } from './LTSH.js';
import PCLT, { type PCLTTable } from './PCLT.js';
import VDMX, { type VDMXTable } from './VDMX.js';
import vhea, { type vheaTable } from './vhea.js';
import vmtx, { type vmtxTable } from './vmtx.js';

// Apple Advanced Typography Tables
import avar from './avar.js';
import bsln from './bsln.js';
import feat from './feat.js';
import fvar from './fvar.js';
import gvar from './gvar.js';
import just, { type justTable } from './just.js';
import morx, { type morxTable } from './morx.js';
import opbd from './opbd.js';

export type FontTable = Record<
	string,
	/** biome-ignore lint/suspicious/noExplicitAny: The restructure library
	 * used for decoding and encoding the table data is highly dynamic. Using
	 * stricter typings is currently considered not being worth the effort.
	 */
	StructT<any, any> | VersionedStructT<any> | ArrayT<any> | typeof CFFFont
>;

const tables = {
	cmap,
	head,
	hhea,
	hmtx,
	maxp,
	name,
	'OS/2': OS2,
	post,
	fpgm,
	loca,
	prep,
	'cvt ': cvt,
	glyf,
	'CFF ': CFFFont,
	CFF2: CFFFont,
	VORG,
	EBLC,
	CBLC: EBLC,
	sbix,
	COLR,
	CPAL,
	BASE,
	GDEF,
	GPOS,
	GSUB,
	JSTF,
	HVAR,
	DSIG,
	gasp,
	hdmx,
	kern,
	LTSH,
	PCLT,
	VDMX,
	vhea,
	vmtx,
	avar,
	bsln,
	feat,
	fvar,
	gvar,
	just,
	morx,
	opbd,
} satisfies FontTable;

export default tables;

export namespace SFNTTable {
	export type AATBinarySearchHeader = AAT.BinarySearchHeader;
	export type AATLookupTableV0<T> = AAT.LookupTableV0<T>;
	export type AATLookupTableV2<T> = AAT.LookupTableV2<T>;
	export type AATLookupTableV4<T> = AAT.LookupTableV4<T>;
	export type AATLookupTableV6<T> = AAT.LookupTableV6<T>;
	export type AATLookupTableV8<T> = AAT.LookupTableV8<T>;
	export type AATLookupTable<T> = AAT.LookupTable<T>;
	export type AATStateHeader = AAT.StateHeader;
	export type AATStateEntry<T> = AAT.StateEntry<T>;
	export type AATStateHeader1 = AAT.StateHeader1;

	export type GPOSDecodedValueRecord = GPOSTable.GPOSDecodedValueRecord;
	export type GPOSPairValueRecord = GPOSTable.GPOSPairValueRecord;
	export type GPOSClass2Record = GPOSTable.GPOSClass2Record;
	export type GPOSAnchorV1 = GPOSTable.GPOSAnchorV1;
	export type GPOSAnchorV2 = GPOSTable.GPOSAnchorV2;
	export type GPOSAnchorV3 = GPOSTable.GPOSAnchorV3;
	export type GPOSAnchor = GPOSTable.GPOSAnchor;
	export type GPOSEntryExitRecord = GPOSTable.GPOSEntryExitRecord;
	export type GPOSMarkRecord = GPOSTable.GPOSMarkRecord;
	export type GPOSLookupV1_1 = GPOSTable.GPOSLookupV1_1;
	export type GPOSLookupV1_2 = GPOSTable.GPOSLookupV1_2;
	export type GPOSLookupV1 = GPOSTable.GPOSLookupV1;
	export type GPOSLookupV2_1 = GPOSTable.GPOSLookupV2_1;
	export type GPOSLookupV2_2 = GPOSTable.GPOSLookupV2_2;
	export type GPOSLookupV2 = GPOSTable.GPOSLookupV2;
	export type GPOSLookupV3 = GPOSTable.GPOSLookupV3;
	export type GPOSLookupV4 = GPOSTable.GPOSLookupV4;
	export type GPOSLookupV5 = GPOSTable.GPOSLookupV5;
	export type GPOSLookupV6 = GPOSTable.GPOSLookupV6;
	export type GPOSLookupV7 = GPOSTable.GPOSLookupV7;
	export type GPOSLookupV8 = GPOSTable.GPOSLookupV8;
	export type GPOSLookupV9 = GPOSTable.GPOSLookupV9;
	export type GPOSLookup = GPOSTable.GPOSLookup;
	export type GPOSV65536 = GPOSTable.GPOSV65536;
	export type GPOSV65537 = GPOSTable.GPOSV65537;
	export type GPOS = GPOSTable.GPOS;

	export type hmtx = hmtxTable.hmtx;

	export type HVARMapDataEntry = HVARTable.HVARMapDataEntry;
	export type HVARDeltaSetIndexMap = HVARTable.HVARDeltaSetIndexMap;
	export type HVAR = HVARTable.HVAR;

	export type justClassTable = justTable.justClassTable;
	export type justWidthDeltaRecord = justTable.justWidthDeltaRecord;
	export type justActionDataV0 = justTable.justActionDataV0;
	export type justActionDataV1 = justTable.justActionDataV1;
	export type justActionDataV2 = justTable.justActionDataV2;
	export type justActionDataV3 = justTable.justActionDataV3;
	export type justActionDataV4 = justTable.justActionDataV4;
	export type justActionDataV5 = justTable.justActionDataV5;
	export type justActionData = justTable.justActionData;
	export type justAction = justTable.justAction;
	export type justPostCompensationTable = justTable.justPostCompensationTable;
	export type justificationTable = justTable.justificationTable;
	export type just = justTable.just;

	export type kernClassTable = kernTable.kernClassTable;
	export type kern2Array = kernTable.kern2Array;
	export type kernPair = kernTable.kernPair;
	export type kernSubtableV0 = kernTable.kernSubtableV0;
	export type kernSubtableV2 = kernTable.kernSubtableV2;
	export type kernSubtableV3 = kernTable.kernSubtableV3;
	export type kernSubtable = kernTable.kernSubtable;
	export type kernV0 = kernTable.kernV0;
	export type kernV1 = kernTable.kernV1;
	export type kern = kernTable.kern;

	export type locaV0 = locaTable.locaV0;
	export type locaV1 = locaTable.locaV1;
	export type loca = locaTable.loca;

	export type LTSH = LTSHTable.LTSH;

	export type maxp = maxpTable.maxp;

	export type morxSubtableDataV0 = morxTable.morxSubtableDataV0;
	export type morxContextualData = morxTable.morxContextualData;
	export type morxSubstitutionTable = morxTable.morxSubstitutionTable;
	export type morxSubtableDataV1 = morxTable.morxSubtableDataV1;
	export type morxLigatureData = morxTable.morxLigatureData;
	export type morxSubtableDataV2 = morxTable.morxSubtableDataV2;
	export type morxSubtableDataV4 = morxTable.morxSubtableDataV4;
	export type morxInsertionData = morxTable.morxInsertionData;
	export type morxSubtableDataV5 = morxTable.morxSubtableDataV5;
	export type morxSubtableData = morxTable.morxSubtableData;
	export type morxSubtable = morxTable.morxSubtable;
	export type morxFeatureEntry = morxTable.morxFeatureEntry;
	export type morxChain = morxTable.morxChain;
	export type morx = morxTable.morx;

	export type nameLocalizedStrings = nameTable.nameLocalizedStrings;
	export type nameLangTagRecord = nameTable.nameLangTagRecord;
	export type nameProcessedRecords = nameTable.nameProcessedRecords;
	export type nameRecord = nameTable.nameRecord;
	export type nameV1 = nameTable.nameV1;
	export type nameV2 = nameTable.nameV2;
	export type name = nameTable.name;

	export type OS2V0 = OS2Table.OS2V0;
	export type OS2V1 = OS2Table.OS2V1;
	export type OS2V2 = OS2Table.OS2V2;
	export type OS2V3 = OS2Table.OS2V3;
	export type OS2V4 = OS2Table.OS2V4;
	export type OS2V5 = OS2Table.OS2V5;
	export type OS2 = OS2Table.OS2;

	export type PCLT = PCLTTable.PCLT;

	export type postV1 = postTable.postV1;
	export type postV2 = postTable.postV2;
	export type postV2_5 = postTable.postV2_5;
	export type postV3 = postTable.postV3;
	export type postV4 = postTable.postV4;
	export type post = postTable.post;

	export type prep = prepTable.prep;

	export type sbixFlags = sbixTable.sbixFlags;
	export type sbixImageTable = sbixTable.sbixImageTable;
	export type sbix = sbixTable.sbix;

	export type VDMXRatio = VDMXTable.VDMXRatio;
	export type VDMXvTable = VDMXTable.VDMXvTable;
	export type VDMXGroup = VDMXTable.VDMXGroup;
	export type VDMX = VDMXTable.VDMX;

	export type vhea = vheaTable.vhea;

	export type vmtx = vmtxTable.vmtx;

	export type VORG = VORGTable.VORG;
	export type VORGVerticalOrigin = VORGTable.VORGVerticalOrigin;
}
