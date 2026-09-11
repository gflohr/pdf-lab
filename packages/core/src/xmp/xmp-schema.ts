import type * as v from 'valibot';
import { xmpBoolean } from './data-types/boolean.js';
import { xmpInteger } from './data-types/integer.js';
import { xmpDate } from './value-types/core/basic/date.js';
import { xmpReal } from './value-types/core/basic/real.js';
import { xmpText } from './value-types/core/basic/text.js';
import { xmpChoice } from './value-types/core/derived/choice.js';
import { xmpGUID } from './value-types/core/derived/guid.js';
import { xmpLocale } from './value-types/core/derived/locale.js';
import { xmpMIMEType } from './value-types/core/derived/mime-type.js';
import { xmpPart } from './value-types/core/derived/part.js';
import { xmpProperName } from './value-types/core/derived/proper-name.js';
import { xmpRenditionClass } from './value-types/core/derived/rendition-class.js';
import { xmpResourceRef } from './value-types/core/derived/resource-ref.js';
import { xmpURI } from './value-types/core/derived/uri.js';
import { xmpURL } from './value-types/core/derived/url.js';

export interface XmpBaseValueType {
	termType: string;

	/**
	 * Description. Verbose description of the type. Defaults to its name.
	 */
	description?: string;

	/**
	 * Valibot validation actions like v.regex() or v.minLength().
	 */
	validationActions?: v.GenericPipeAction[];

	/**
	 * If false, the validationActions are only checked in strict mode.
	 * Default `false`.
	 */
	strict?: boolean;
}

export interface XmpLiteral extends XmpBaseValueType {
	termType: 'Literal';

	/**
	 * The name of the value type.
	 */
	name: string;
}

/**
 * Factory function for {@link XmpLiteral}.
 *
 * @param name the name like 'Text', 'Date', etc.
 * @param validationActions possible validation actions
 * @param strict enforce validation actions
 * @param internal if internal or external
 * @returns
 */
export function xmpLiteral(
	name: string,
	validationActions?: v.GenericPipeAction[],
	strict?: boolean,
): XmpLiteral {
	return {
		name,
		termType: 'Literal',
		validationActions,
		strict,
	};
}

export interface XmpStruct extends XmpBaseValueType {
	name: string;

	termType: 'Struct';

	namespaceURI: string;

	prefix: string;

	/** Fields contained inside this structured custom type. */
	properties: Record<string, XmpProperty>;
}

export interface XmpBag<T = XmpLiteral> extends XmpBaseValueType {
	termType: 'Bag';

	itemType: T;
}

export function xmpBag<T extends XmpValueType = XmpLiteral>(
	itemType: T,
): XmpBag<T> {
	return {
		termType: 'Bag',

		itemType,
	};
}

export interface XmpSeq<T extends XmpValueType> extends XmpBaseValueType {
	termType: 'Seq';

	itemType: T;
}

export function xmpSeq<T extends XmpValueType = XmpLiteral>(
	itemType: T,
): XmpSeq<T> {
	return {
		termType: 'Seq',
		itemType,
	};
}
export interface XmpAlt<T extends XmpValueType> extends XmpBaseValueType {
	termType: 'Alt';
	qualifierPrefix: string;
	qualifier: string;
	itemType: T;
}
export function xmpAlt<T extends XmpValueType = XmpLiteral>(
	itemType: T,
	qualifierPrefix: string,
	qualifier: string,
): XmpAlt<T> {
	return {
		termType: 'Alt',
		qualifierPrefix,
		qualifier,
		itemType,
	};
}

export function xmpLangAlt<T extends XmpValueType = XmpLiteral>(itemType: T) {
	return xmpAlt<T>(itemType, 'xml', 'lang');
}

export type XmpList<T extends XmpValueType = XmpLiteral> =
	| XmpBag
	| XmpSeq<T>
	| XmpAlt<T>;
export type XmpValueType = XmpLiteral | XmpStruct | XmpList;

export const xmpCoreBaseTypes = {
	Boolean: xmpBoolean,
	Date: xmpDate,
	Integer: xmpInteger,
	Real: xmpReal,
	Text: xmpText,
} as const;

export type XmpCoreBaseType = keyof typeof xmpCoreBaseTypes;

export const xmpCoreDerivedTypes = {
	AgentName: xmpBoolean,
	Choice: xmpChoice,
	GUID: xmpGUID,
	Locale: xmpLocale,
	MIMEType: xmpMIMEType,
	Part: xmpPart,
	ProperName: xmpProperName,
	RenditionClass: xmpRenditionClass,
	ResourceRef: xmpResourceRef,
	URI: xmpURI,
	URL: xmpURL,
} as const;

export type XmpCoreDerivedType = keyof typeof xmpCoreDerivedTypes;

export type XmpCoreType = XmpCoreBaseType | XmpCoreDerivedType;

const ArticleNumber: XmpStruct = {
	name: 'ArticleNumber',
	termType: 'Struct',
	description: 'article number',
	namespaceURI: 'http://www.foobar.com/ns/articlenumber/1/',
	prefix: 'artnum',
	properties: {
		series: {
			description: 'machine series',
			valueType: xmpText,
		},
		model: {
			description: 'machine model',
			valueType: xmpText,
		},
	},
};

export interface XmpProperty {
	description?: string;

	valueType: XmpValueType;

	/**
	 * The opposite of external. Default: `false`. That means that properties
	 * are by default external.
	 */
	internal?: boolean;
}

export interface XmpSchema {
	name: string;
	namespaceURI: string;
	prefix: string;
	properties: Record<string, XmpProperty>;
}

const schema: XmpSchema = {
	name: 'Foo Machines Schema',
	namespaceURI: 'http://www.foobar.com/ns/machines/2/',
	prefix: 'fm',
	properties: {
		YearOfManufacture: {
			description: 'year of manufacture',
			valueType: xmpDate,
		},
		MachineName: {
			description: 'machine name',
			valueType: xmpText,
		},
		MachineNumber: {
			description: 'product number',
			valueType: ArticleNumber,
		},
	},
};

// Try to write a PDF/A extension schema from it fooMachinesSchema.
console.log(`<rdf:RDF>`);
console.log(`  <rdf:Description>`);
console.log(`    <pdfaExtension:schemas>`);
console.log(`      <rdf:Bag>`);
console.log(`        <rdf:li rdf:parseType="Resource">`);
if (typeof schema.name !== 'undefined') {
	console.log(
		`          <pdfaSchema:schema>${schema.name}</pdfaSchema:schema>`,
	);
}
console.log(
	`          <pdfaSchema:namespaceURI>${schema.namespaceURI}</pdfaSchema:namespaceURI>`,
);
console.log(
	`          <pdfaSchema:prefix>${schema.prefix}</pdfaSchema:prefix>`,
);
console.log(`          <pdfaSchema:property>`);
console.log(`            <rdf:Seq>`);
const customValueTypes: Record<string, XmpValueType> = {};
for (const name in schema.properties) {
	console.log(`              <rdf:li rdf:parseType="Resource">`);
	const property = schema.properties[name]!;
	console.log(`                <pdfaProperty:name>${name}</pdfaProperty:name>`);
	if (property.valueType.termType === 'Literal') {
		const name = property.valueType.name;
		if (
			!xmpCoreBaseTypes[name as XmpCoreBaseType] &&
			!xmpCoreDerivedTypes[name as XmpCoreDerivedType]
		) {
			customValueTypes[name] = property.valueType;
		}
		console.log(
			`                <pdfaProperty:name>${property.valueType.name}</pdfaProperty:name>`,
		);
	} else if (property.valueType.termType === 'Struct') {
		const name = property.valueType.name;
		if (
			!xmpCoreBaseTypes[name as XmpCoreBaseType] &&
			!xmpCoreDerivedTypes[name as XmpCoreDerivedType]
		) {
			customValueTypes[name] = property.valueType;
		}
		console.log(
			`                <pdfaProperty:name>${property.valueType.name}</pdfaProperty:name>`,
		);
	} else {
		throw new Error('How to?');
	}
	const category = property.internal ? 'internal' : 'external';
	console.log(
		`                <pdfaProperty:category>${category}</pdfaProperty:category>`,
	);
	console.log(
		`                <pdfaProperty:description>${property.description}</pdfaProperty:description>`,
	);
	console.log(`              </rdf:li>`);
}

console.log(`            </rdf:Seq>`);
console.log(`          </pdfaSchema:property>`);

if (Object.keys(customValueTypes).length) {
	console.log(`          <pdfaSchema:valueType>`);
	console.log(`            <rdf:Seq>`);

	for (const typeName in customValueTypes) {
		const valueType = customValueTypes[typeName] as XmpStruct;
		console.log(`              <rdf:li rdf:parseType="Resource">`);
		console.log(`                <pdfaType:type>${typeName}</pdfaType:type>`);
		// FIXME! What if this is another value type? Where to get the
		// Namespace URI?
		console.log(
			`                <pdfaType:namespaceURI>${valueType.namespaceURI}</pdfaType:namespaceURI>`,
		);
		console.log(
			`                <pdfaType:prefix>${valueType.prefix}</pdfaType:prefix>`,
		);
		console.log(
			`                <pdfaType:description>${valueType.description}</pdfaType:prefix>`,
		);
		if (Object.keys(valueType.properties).length) {
			console.log(`                <pdfaType:field>`);
			console.log(`                  <rdf:Seq>`);
			for (const fieldName in valueType.properties) {
				const property = valueType.properties[fieldName]!;
				const vt = property.valueType as XmpLiteral; // FIXME!
				console.log(`                    <rdf:li rdf:parseType="Resource">`);
				console.log(
					`                      <pdfaField:name>${fieldName}</pdfaField:name>`,
				);
				console.log(
					`                      <pdfaField:valueType>${vt.name}</pdfaField:name>`,
				);
				console.log(
					`                      <pdfaField:description>${vt.description}</pdfaField:description>`,
				);
				console.log(`                    </rdf:li>`);
			}
			console.log(`                  </rdf:Seq>`);
			console.log(`                </pdfaType:field>`);
		}
		console.log(`              </rdf:li>`);
	}

	console.log(`            </rdf:Seq>`);
	console.log(`          </pdfaSchema:valueType>`);
}

console.log(`        </rdf:li>`);
console.log(`      </rdf:Bag>`);
console.log(`   </pdfaExtension:schemas>`);
console.log(`  </rdf:Description>`);
console.log(`</rdf:RDF>`);
