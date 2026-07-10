/** biome-ignore-all assist/source/organizeImports: tables are sorted by topic */
import type { ArrayT, StructT, VersionedStructT } from 'restructure';

// AAT.

// Required Tables
import { cmap } from './cmap.js';
import { head } from './head.js';
import { hhea } from './hhea.js';
import { hmtx } from './hmtx.js';
import { maxp } from './maxp.js';
import { name } from './name.js';
import { OS2 } from './OS2.js';
import { post } from './post.js';

// TrueType Outlines
import { cvt } from './cvt.js';
import { fpgm } from './fpgm.js';
import { glyf } from './glyf.js';
import { loca } from './loca.js';
import { prep } from './prep.js';

// PostScript Outlines
import type { CFFFont } from '../cff/cff-font.js';
import { CFF1Font } from '../cff/cff1-font.js';
import { CFF2Font } from '../cff/cff2-font.js';
import { VORG } from './VORG.js';

import { COLR } from './COLR.js';
import { CPAL } from './CPAL.js';

// OpenType variations tables
import { HVAR } from './HVAR.js';

// Bitmap Glyphs
import { EBLC } from './EBLC.js';
import { sbix } from './sbix.js';

// Advanced OpenType Tables
import { BASE } from './BASE.js';
import { GDEF } from './GDEF.js';
import { GPOS } from './GPOS.js';
import { GSUB } from './GSUB.js';
import { JSTF } from './JSTF.js';

// Other OpenType Tables
import { DSIG } from './DSIG.js';
import { gasp } from './gasp.js';
import { hdmx } from './hdmx.js';
import { kern } from './kern.js';
import { LTSH } from './LTSH.js';
import { PCLT } from './PCLT.js';
import { VDMX } from './VDMX.js';
import { vhea } from './vhea.js';
import { vmtx } from './vmtx.js';

// Apple Advanced Typography Tables
import { avar } from './avar.js';
import { bsln } from './bsln.js';
import { feat } from './feat.js';
import { fvar } from './fvar.js';
import { gvar } from './gvar.js';
import { just } from './just.js';
import { morx } from './morx.js';
import { opbd } from './opbd.js';

export type FontTable = Record<
	string,
	/** biome-ignore lint/suspicious/noExplicitAny: The restructure library
	 * used for decoding and encoding the table data is highly dynamic. Using
	 * stricter typings is currently considered not being worth the effort.
	 */
	StructT<any, any> | VersionedStructT<any, any> | ArrayT<any> | typeof CFFFont
>;

export const tables = {
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
	'CFF ': CFF1Font,
	CFF2: CFF2Font,
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

export * from './aat.js';
export * from './avar.js';
export * from './BASE.js';
export * from './bsln.js';
export * from './cmap.js';
export * from './COLR.js';
export * from './CPAL.js';
export * from './cvt.js';
export * from './directory.js';
export * from './DSIG.js';
export * from './EBDT.js';
export * from './EBLC.js';
export * from './feat.js';
export * from './fpgm.js';
export * from './fvar.js';
export * from './gasp.js';
export * from './GDEF.js';
export * from './glyf.js';
export * from './GPOS.js';
export * from './GSUB.js';
export * from './gvar.js';
export * from './hdmx.js';
export * from './head.js';
export * from './hhea.js';
export * from './hmtx.js';
export * from './HVAR.js';
export * from './JSTF.js';
export * from './just.js';
export * from './kern.js';
export * from './loca.js';
export * from './LTSH.js';
export * from './maxp.js';
export * from './metrics.js';
export * from './morx.js';
export * from './name.js';
export * from './opbd.js';
export * from './open-type.js';
export * from './OS2.js';
export * from './PCLT.js';
export * from './post.js';
export * from './prep.js';
export * from './sbix.js';
export * from './variations.js';
export * from './VDMX.js';
export * from './vhea.js';
export * from './vmtx.js';
export * from './VORG.js';
export * from './woff-directory.js';
export * from './woff2-directory.js';
