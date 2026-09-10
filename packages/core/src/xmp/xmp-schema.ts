import type * as v from 'valibot';
import { xmpDate } from './value-types/core/basic/date.js';
import { xmpText } from './value-types/core/basic/text.js';

export interface XmpBaseValueType {
	/**
	 * The name of the value type.
	 */
	name: string;

	/**
	 * Description. Verbose description of the type. Defaults to its name.
	 */
	description?: string;
};

export interface XmpScalarValueType extends XmpBaseValueType {
	termType?: 'Literal',

	/**
	 * Valibot validation actions like v.regex() or v.minLength().
	 */
	validationActions?: v.GenericPipeAction[];

	/**
	 * If false, the validationActions are only checked in strict mode.
	 * Default `false`.
	 */
	strict?: boolean;

	/**
	 * The opposite of external. Default: `false`. That means that properties
	 * are by default external.
	 */
	internal?: boolean;
};

export interface XmpStructValueType extends XmpBaseValueType {
	termType: 'Struct';

	namespaceURI: string;

	prefix: string;

	/** Fields contained inside this structured custom type. */
	fields: Record<string, XmpProperty>;
}

export type XmpStaticValueType = XmpScalarValueType | XmpStructValueType;

export type XmpDynamicValueType<TArgs extends unknown[] = unknown[]> = (
	...args: TArgs
) => XmpStaticValueType;

export type XmpValueType = XmpStaticValueType | XmpDynamicValueType;

/**
 * Base type for all XMP properties.
 */
export interface XmpBaseProperty {
	valueType: XmpValueType;

	/**
	 * Property-level description used for
	 * `pdfaProperty:description` or `pdfaField:description`.
	 */
	description?: string;

	/**
	 * Is this property mandatory. Default `false`.
	 */
	mandatory?: boolean;

	internal?: boolean;
}

export interface XmpLiteral extends XmpBaseProperty { termType: 'Literal'; }
export interface XmpSeq extends XmpBaseProperty { termType: 'Seq'; }
export interface XmpBag extends XmpBaseProperty { termType: 'Bag'; }
export interface XmpAlt extends XmpBaseProperty { termType: 'Alt'; }
export interface XmpStruct extends XmpBaseProperty { termType: 'Struct'; }

export type XmpProperty = XmpLiteral | XmpSeq | XmpBag | XmpAlt | XmpStruct;

export interface XmpSchema {
	name: string;
	namespaceURI: string;
	prefix: string;
	properties: Record<string, XmpProperty>;
}

const ArticleNumber: XmpStructValueType = {
	name: 'ArticleNumber',
	termType: 'Struct',
	description: 'article number',
	namespaceURI: 'http://www.foobar.com/ns/articlenumber/1/',
	prefix: 'artnum',
	fields: {
		series: {
			termType: 'Literal',
			valueType: xmpText,
			description: 'machine series',
		},
		model: {
			termType: 'Literal',
			valueType: xmpText,
			description: 'machine model',
		},
	},
};

const fooMachinesSchema: XmpSchema = {
	name: 'Foo Machines Schema',
	namespaceURI: 'http://www.foobar.com/ns/machines/2/',
	prefix: 'fm',
	properties: {
		YearOfManufacture: {
			description: 'year of manufacture',
			termType: 'Literal',
			valueType: xmpDate,
		},
		MachineName: {
			description: 'machine name',
			termType: 'Literal',
			valueType: xmpText,
		},
		MachineNumber: {
			description: 'product number',
			termType: 'Struct',
			valueType: ArticleNumber,
		}
	}
}
