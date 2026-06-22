import r from '@pdf-lib/restructure';

export namespace featTable {
	export interface Setting {
		setting: number;
		nameIndex: number;
		name: string;
	}

	export interface FeatureName {
		feature: number;
		nSettings: number;
		settingTable: number[];
		featureFlags: {
			hasDefault: boolean;
			exclusive: boolean;
		};
		defaultSetting: number;
		nameIndex: number;
		name: string;
	}

	export interface feat {
		version: number;
		featureNameCount: number;
		featureNames: FeatureName[];
	}
}

export type FeatureContext = {
	nameIndex: number;
	parent: FeatureContext;
	name: { records: { fontFeatures: string[] } };
}

const settingFields = {
	setting: r.uint16,
	nameIndex: r.int16,
	name: (t: FeatureContext) =>
		t.parent.parent.parent.name.records.fontFeatures[t.nameIndex],
};
const setting = new r.Struct<typeof settingFields, featTable.Setting>(
	settingFields,
);

const featureNameFields = {
	feature: r.uint16,
	nSettings: r.uint16,
	settingTable: new r.Pointer(r.uint32, new r.Array(setting, 'nSettings'), {
		type: 'parent',
	}),
	featureFlags: new r.Bitfield(r.uint8, [
		null,
		null,
		null,
		null,
		null,
		null,
		'hasDefault',
		'exclusive',
	]),
	defaultSetting: r.uint8,
	nameIndex: r.int16,
	name: (t: FeatureContext) =>
		t.parent.parent.name.records.fontFeatures[t.nameIndex],
};
const featureName = new r.Struct<
	typeof featureNameFields,
	featTable.FeatureName
>(featureNameFields);

const featStructFields = {
	version: r.fixed32,
	featureNameCount: r.uint16,
	reserved1: new r.Reserved(r.uint16),
	reserved2: new r.Reserved(r.uint32),
	featureNames: new r.Array(featureName, 'featureNameCount'),
};
export default new r.Struct<typeof featStructFields, featTable.feat>(
	featStructFields,
);
