import * as v from 'valibot';
import { xmpText } from '../value-types/core/basic/text.js';
import { type XmpSchema, xmpLiteral } from '../xmp-schema.js';

/**
 * PDF/A Field namespace.
 *
 * This schema describes a field in a structured type. It is very similar to
 * the PDF/A Property Value Type schema (@{link pdfaPropertySchema}), but
 * defines a field in a structure instead of a property.
 *
 * * Schema namespace URI: `http://www.aiim.org/pdfa/ns/field#`.
 * * Required schema namespace prefix: `pdfaField`.
 */
export const pdfaFieldSchema: XmpSchema = {
	name: 'Field',
	namespaceURI: 'http://www.aiim.org/pdfa/ns/field#',
	prefix: 'pdfaField',
	properties: {
		/**
		 * Type: {@link xmpText}
		 *
		 * The field description.
		 *
		 * Human-readable text.
		 */
		description: {
			description: 'Field description',
			valueType: xmpText,
		},

		/**
		 * Type: {@link xmpText}
		 *
		 * This property is required! The validation is strict!
		 *
		 * The field name.
		 *
		 * Field names must be valid XML element names
		 */
		name: {
			valueType: xmpLiteral(
				'name',
				[v.regex(/^[A-Za-z_][A-Za-z0-9_.-]*$/)],
				true,
			),
			required: true,
		},

		/**
		 * Type: open {@link xmpChoice}
		 *
		 * This property is required! The validation is strict!
		 *
		 * Field value type, drawn from XMP Specification 2004, or an embedded
		 * PDF/A value type extension schema.
		 *
		 * Predefined XMP type names or names of custom types according
		 * to the documentation of {@link pdfaValueType} can be used.
		 */
		valueType: {
			valueType: xmpLiteral(
				'valueType',
				[v.nonEmpty('Value type cannot be empty')],
				true,
			),
			required: true,
		},
	},
};
