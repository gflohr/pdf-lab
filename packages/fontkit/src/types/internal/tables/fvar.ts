interface VariationAxis {
	axisTag: string;
	min: number;
	default: number;
	max: number;
	flags: number;
	nameID: number;
	name: string;
}

export interface VariationAxes {
	wght?: VariationAxis;
	wdth?: VariationAxis;
}

export type NamedVariation = Record<string, number>;

export type NamedVariations = Record<string, NamedVariation>;

export type VariationCoordinates = Record<string, number>;
