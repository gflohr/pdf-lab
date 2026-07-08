import * as r from 'restructure';
import { type AAT, aatLookupTable, aatStateTable1 } from './aat.js';

export namespace justTable {
	export interface ClassTable {
		length: number;
		coverage: number;
		subFeatureFlags: number;
		stateTable: AAT.StateHeader1;
	}

	export interface WidthDeltaRecord {
		justClass: number;
		beforeGrowLimit: number;
		beforeShrinkLimit: number;
		afterGrowLimit: number;
		afterShrinkLimit: number;
		growFlags: number;
		shrinkFlags: number;
	}

	/** Decomposition action. */
	export interface ActionDataV0 {
		version: 0;
		lowerLimit: number;
		upperLimit: number;
		order: number;
		glyphs: number[];
	}

	/** Unconditional add glyph action. */
	export interface ActionDataV1 {
		version: 1;
		addGlyph: number;
	}

	/** Conditional add glyph action. */
	export interface ActionDataV2 {
		version: 2;
		substThreshold: number;
		addGlyph: number;
		substGlyph: number;
	}

	/** Stretch glyph action (no data, not supported by CoreText). */
	export interface ActionDataV3 {
		version: 3;
	}

	/** Ductile glyph action (not supported by CoreText). */
	export interface ActionDataV4 {
		version: 4;
		variationAxis: number;
		minimumLimit: number;
		noStretchValue: number;
		maximumLimit: number;
	}

	/** Repeated add glyph action. */
	export interface ActionDataV5 {
		version: 5;
		flags: number;
		glyph: number;
	}

	export type ActionData =
		| ActionDataV0
		| ActionDataV1
		| ActionDataV2
		| ActionDataV3
		| ActionDataV4
		| ActionDataV5;

	export interface justAction {
		actionClass: number;
		actionType: number;
		actionLength: number;
		actionData: ActionData;
	}

	export interface PostCompensationTable {
		lookupTable: Record<number, justAction[]>;
	}

	export interface JustificationTable {
		classTable: ClassTable;
		wdcOffset: number;
		postCompensationTable: PostCompensationTable;
		widthDeltaClusters: Record<number, WidthDeltaRecord[]>;
	}

	export interface just {
		version: number;
		format: number;
		horizontal?: JustificationTable;
		vertical?: JustificationTable;
	}
}

const classTableFields = {
	length: r.uint16,
	coverage: r.uint16,
	subFeatureFlags: r.uint32,
	stateTable: aatStateTable1(),
};
const ClassTable = new r.Struct<typeof classTableFields, justTable.ClassTable>(
	classTableFields,
);

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
	justTable.WidthDeltaRecord
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
	justTable.ActionData
>('actionType', actionDataFields);

const actionFields = {
	actionClass: r.uint16,
	actionType: r.uint16,
	actionLength: r.uint32,
	_startLoc: new r.Optional(new r.Reserved(r.uint8, 0), () => {
		return false; // Tells restructure not to actually parse anything
	}),
	actionData: ActionData,
	padding: new r.Reserved(
		r.uint8,
		(t: { actionLength: number; currentOffset: number }) =>
			t.actionLength - t.currentOffset,
	),
};
const Action = new r.Struct<typeof actionFields, justTable.justAction>(
	actionFields,
);

const PostcompensationAction = new r.Array(Action, r.uint32);

const postCompensationTableFields = {
	lookupTable: aatLookupTable(new r.Pointer(r.uint16, PostcompensationAction)),
};
const PostCompensationTable = new r.Struct<
	typeof postCompensationTableFields,
	justTable.PostCompensationTable
>(postCompensationTableFields);

const justificationTableFields = {
	classTable: new r.Pointer(r.uint16, ClassTable, { type: 'parent' }),
	wdcOffset: r.uint16,
	postCompensationTable: new r.Pointer(r.uint16, PostCompensationTable, {
		type: 'parent',
	}),
	widthDeltaClusters: aatLookupTable(
		new r.Pointer(r.uint16, WidthDeltaCluster, {
			type: 'parent',
			relativeTo: (ctx) => ctx.wdcOffset,
		}),
	),
};
const JustificationTable = new r.Struct<
	typeof justificationTableFields,
	justTable.JustificationTable
>(justificationTableFields);

const justFields = {
	version: r.uint32,
	format: r.uint16,
	horizontal: new r.Pointer(r.uint16, JustificationTable),
	vertical: new r.Pointer(r.uint16, JustificationTable),
};

/** @internal */
export const just = new r.Struct<typeof justFields, justTable.just>(justFields);
