/**
 * A map of Apple Advanced Typography (AAT) as described by Apple’s TrueType
 * Reference manual:
 * https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6AATIntro.html
 */
export interface AATFeatures {
	acnt?: boolean;
	ankr?: boolean;
	avar?: boolean;
	bdat?: boolean;
	bhed?: boolean;
	bloc?: boolean;
	bsln?: boolean;
	cmap?: boolean;
	cvar?: boolean;
	cvt?: boolean;
	EBSC?: boolean;
	fdsc?: boolean;
	feat?: boolean;
	fmtx?: boolean;
	fond?: boolean;
	fpgm?: boolean;
	fvar?: boolean;
	gasp?: boolean;
	gcid?: boolean;
	glyf?: boolean;
	gvar?: boolean;
	hdmx?: boolean;
	head?: boolean;
	hhea?: boolean;
	hmtx?: boolean;
	just?: boolean;
	kern?: boolean;
	kerx?: boolean;
	lcar?: boolean;
	loca?: boolean;
	ltag?: boolean;
	maxp?: boolean;
	meta?: boolean;
	mort?: boolean;
	morx?: boolean;
	name?: boolean;
	opbd?: boolean;
	'OS/2'?: boolean;
	post?: boolean;
	prep?: boolean;
	prop?: boolean;
	sbix?: boolean;
	trak?: boolean;
	vhea?: boolean;
	vmtx?: boolean;
	xref?: boolean;
	Zapf?: boolean;
}
