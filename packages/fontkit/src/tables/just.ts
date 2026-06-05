import r from '@pdf-lib/restructure';
import { type AAT, LookupTable, StateTable1 } from './aat.js';

export namespace justTable {
	export interface justClassTable {
		length: number;
		coverage: number;
		subFeatureFlags: number;
		stateTable: AAT.StateHeader1;
	}

	export interface justWidthDeltaRecord {
		justClass: number;
		beforeGrowLimit: number;
		beforeShrinkLimit: number;
		afterGrowLimit: number;
		afterShrinkLimit: number;
		growFlags: number;
		shrinkFlags: number;
	}

	/** Decomposition action. */
	export interface justActionDataV0 {
		lowerLimit: number;
		upperLimit: number;
		order: number;
		glyphs: number[];
	}

	/** Unconditional add glyph action. */
	export interface justActionDataV1 {
		addGlyph: number;
	}

	/** Conditional add glyph action. */
	export interface justActionDataV2 {
		substThreshold: number;
		addGlyph: number;
		substGlyph: number;
	}

	/** Stretch glyph action (no data, not supported by CoreText). */
	export type justActionDataV3 = {};

	/** Ductile glyph action (not supported by CoreText). */
	export interface justActionDataV4 {
		variationAxis: number;
		minimumLimit: number;
		noStretchValue: number;
		maximumLimit: number;
	}

	/** Repeated add glyph action. */
	export interface justActionDataV5 {
		flags: number;
		glyph: number;
	}

	export type justActionData =
		| justActionDataV0
		| justActionDataV1
		| justActionDataV2
		| justActionDataV3
		| justActionDataV4
		| justActionDataV5;

	export interface justAction {
		actionClass: number;
		actionType: number;
		actionLength: number;
		actionData: justActionData;
	}

	export interface justPostCompensationTable {
		lookupTable: Record<number, justAction[]>;
	}

	export interface justificationTable {
		classTable: justClassTable;
		wdcOffset: number;
		postCompensationTable: justPostCompensationTable;
		widthDeltaClusters: Record<number, justWidthDeltaRecord[]>;
	}

	export interface just {
		version: number;
		format: number;
		horizontal?: justificationTable;
		vertical?: justificationTable;
	}
}

const classTableFields = {
	length: r.uint16,
	coverage: r.uint16,
	subFeatureFlags: r.uint32,
	stateTable: StateTable1(),
};
const ClassTable = new r.Struct<
	typeof classTableFields,
	justTable.justClassTable
>(classTableFields);

const widthDeltaRecordFields = {
	justClass: r.uint32,
	beforeGrowLimit: r.fixed32,
	beforeShrinkLimit: r.fixed32,
	afterGrowLimit: r.fixed32,
	afterShrinkLimit: r.fixed32,
	growFlags: r.uint16,
	shrinkFlags: r.uint16,
};
const WidthDeltaRecord = new r.Struct<
	typeof widthDeltaRecordFields,
	justTable.justWidthDeltaRecord
>(widthDeltaRecordFields);
const WidthDeltaCluster = new r.Array(WidthDeltaRecord, r.uint32);

const actionDataFields = {
	0: {
		lowerLimit: r.fixed32,
		upperLimit: r.fixed32,
		order: r.uint16,
		glyphs: new r.Array(r.uint16, r.uint16),
	},
	1: { addGlyph: r.uint16 },
	2: {
		substThreshold: r.fixed32,
		addGlyph: r.uint16,
		substGlyph: r.uint16,
	},
	3: {},
	4: {
		variationAxis: r.uint32,
		minimumLimit: r.fixed32,
		noStretchValue: r.fixed32,
		maximumLimit: r.fixed32,
	},
	5: {
		flags: r.uint16,
		glyph: r.uint16,
	},
};

const ActionData = new r.VersionedStruct<
	typeof actionDataFields,
	justTable.justActionData
>('actionType', actionDataFields);

const actionFields = {
	actionClass: r.uint16,
	actionType: r.uint16,
	actionLength: r.uint32,
	_startLoc: new r.Optional(new r.Reserved(r.uint8, 0), () => {
		return false; // Tells restructure not to actually parse anything
	}),
	actionData: ActionData,
	padding: new r.Reserved(r.uint8, (t: { actionLength: number, currentOffset: number}) => t.actionLength - t.currentOffset),
};
const Action = new r.Struct<typeof actionFields, justTable.justAction>(
	actionFields,
);

const PostcompensationAction = new r.Array(Action, r.uint32);

const postCompensationTableFields = {
	lookupTable: LookupTable(new r.Pointer(r.uint16, PostcompensationAction)),
};
const PostCompensationTable = new r.Struct<
	typeof postCompensationTableFields,
	justTable.justPostCompensationTable
>(postCompensationTableFields);

const justificationTableFields = {
	classTable: new r.Pointer(r.uint16, ClassTable, { type: 'parent' }),
	wdcOffset: r.uint16,
	postCompensationTable: new r.Pointer(r.uint16, PostCompensationTable, {
		type: 'parent',
	}),
	widthDeltaClusters: LookupTable(
		new r.Pointer(r.uint16, WidthDeltaCluster, {
			type: 'parent',
			relativeTo: 'wdcOffset',
		}),
	),
};
const JustificationTable = new r.Struct<
	typeof justificationTableFields,
	justTable.justificationTable
>(justificationTableFields);

const justFields = {
	version: r.uint32,
	format: r.uint16,
	horizontal: new r.Pointer(r.uint16, JustificationTable),
	vertical: new r.Pointer(r.uint16, JustificationTable),
};

const justStruct = new r.Struct<typeof justFields, justTable.just>(justFields);

export default justStruct;
