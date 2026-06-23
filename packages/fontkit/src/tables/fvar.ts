import r from '@pdf-lib/restructure';

export namespace fvarTable {
	export interface Axis {
		axisTag: string;
		minValue: number;
		defaultValue: number;
		maxValue: number;
		flags: number;
		nameID: number;
		name: Record<string, string>;
	}

	export interface Instance {
		nameID: number;
		name: Record<string, string>;
		flags: number;
		coord: number[];
		postscriptNameID?: number;
	}

	export interface fvar {
		version: number;
		offsetToData: number;
		countSizePairs: number;
		axisCount: number;
		axisSize: number;
		instanceCount: number;
		instanceSize: number;
		axis: Axis[];
		instance: Instance[];
	}
}

export type FvarContext = {
	nameID: number;
	parent: FvarContext;
	name: { records: { fontFeatures: string[] } };
};

const axisFields = {
	axisTag: new r.String(4),
	minValue: r.fixed32,
	defaultValue: r.fixed32,
	maxValue: r.fixed32,
	flags: r.uint16,
	nameID: r.uint16,
	name: (t: FvarContext) => t.parent.parent.name.records.fontFeatures[t.nameID],
};
const axis = new r.Struct<typeof axisFields, fvarTable.Axis>(axisFields);

const instanceFields = {
	nameID: r.uint16,
	name: (t: FvarContext) => t.parent.parent.name.records.fontFeatures[t.nameID],
	flags: r.uint16,
	coord: new r.Array(r.fixed32, (t) => t.parent.axisCount),
	postscriptNameID: new r.Optional(
		r.uint16,
		(t) => t.parent.instanceSize - t._currentOffset > 0,
	),
};
const instance = new r.Struct<typeof instanceFields, fvarTable.Instance>(
	instanceFields,
);

const fvarStructFields = {
	version: r.fixed32,
	offsetToData: r.uint16,
	countSizePairs: r.uint16,
	axisCount: r.uint16,
	axisSize: r.uint16,
	instanceCount: r.uint16,
	instanceSize: r.uint16,
	axis: new r.Array(axis, 'axisCount'),
	instance: new r.Array(instance, 'instanceCount'),
};
export default new r.Struct<typeof fvarStructFields, fvarTable.fvar>(
	fvarStructFields,
);
