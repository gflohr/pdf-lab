import * as v from 'valibot';
import { XMPDate } from '../data-types/date.js';
import { XMPLocale } from '../data-types/locale.js';
import { XMPMIMEType } from '../data-types/mime-type.js';
import { XMPProperName } from '../data-types/proper-name.js';
import { XMPText } from '../data-types/text.js';
import {
	type XMPNamespaceSchema,
	xmpAlt,
	xmpBag,
	xmpLiteral,
	xmpSeq,
} from '../xmp-namespace.js';

/**
 * The Dublin Core namespace.
 *
 *  @see {@link https://developer.adobe.com/xmp/docs/xmp-namespaces/dc/}!
 */
export const dublinCoreNamespace = v.strictObject({
	/**
	 * Type: Unordered array of {@link XMPProperName}.
	 *
	 * **DCMI definition**: An entity responsible for making contributions to
	 * the resource. **DCMI comment**: Examples of a contributor include a
	 * person, an organization, or a service. Typically, the name of a
	 * contributor should be used to indicate the entity. **XMP addition**:
	 * XMP usage is a list of contributors. These contributors should not
	 * include those listed in dc:creator.
	 */
	contributor: xmpBag(XMPProperName),

	/**
	 * Type: {@link XMPText}.
	 *
	 * **DCMI definition**: The spatial or temporal topic of the resource, the
	 * spatial applicability of the resource, or the jurisdiction under which
	 * the resource is relevant. **XMP addition**: XMP usage is the extent or
	 * scope of the resource.
	 */
	coverage: xmpLiteral(XMPText),

	/**
	 * Type: Ordered array of {@link XMPProperName}.
	 *
	 * **DCMI definition**: An entity primarily responsible for making the
	 * resource. **DCMI comment**: Examples of a creator include a person, an
	 * organization, or a service. Typically, the name of a creator should be
	 * used to indicate the entity. **XMP addition**: XMP usage is a list of
	 * creators. Entities should be listed in order of decreasing precedence,
	 * if such order is significant.
	 */
	creator: xmpSeq(XMPProperName),

	/**
	 * Type: Ordered array of `Date` ({@link date}).
	 *
	 * **DCMI definition**: A point or period of time associated with an event
	 * in the life cycle of the resource.
	 */
	date: xmpSeq(v.pipe(v.string(), XMPDate)),

	/**
	 * Type: Language alternative of {@link XMPText}.
	 *
	 * **DCMI definition**: An account of the resource. **XMP addition**: XMP
	 * usage is a list of textual descriptions of the content of the resource,
	 * given in various languages.
	 */
	description: xmpAlt(),

	/**
	 * Type: {@link XMPMIMEType}.
	 *
	 * **DCMI definition**: The file format, physical medium, or dimensions of
	 * the resource. **DCMI comment**: Examples of dimensions include size and
	 * duration. Recommended best practice is to use a controlled vocabulary
	 * such as the list of Internet Media Types [MIME]. **XMP addition**:
	 * XMP usage is a MIME type. Dimensions would be stored using a
	 * media-specific property, beyond the scope of this document.
	 */
	format: xmpLiteral(XMPMIMEType),

	/**
	 * Type: {@link XMPText}.
	 *
	 * **DCMI definition**: An unambiguous reference to the resource within a
	 * given context. **DCMI comment**: Recommended best practice is to
	 * identify the resource by means of a string conforming to a formal
	 * identification system.
	 */
	identifier: xmpLiteral(XMPText),

	/**
	 * Type: Unordered array of {@link XMPLocale}.
	 *
	 * **DCMI definition**: A language of the resource. **XMP addition**: XMP
	 * usage is a list of languages used in the content of the resource.
	 */
	language: xmpSeq(v.pipe(v.string(), XMPLocale)),

	/**
	 * Type: Unordered array of {@link XMPProperName}.
	 *
	 * **DCMI definition**: An entity responsible for making the resource
	 * available. **DCMI comment**: Examples of a publisher include a person,
	 * an organization, or a service. Typically, the name of a publisher should
	 * be used to indicate the entity. XMP addition: XMP usage is a list of
	 * publishers.
	 */
	publisher: xmpBag(XMPProperName),

	/**
	 * Type: Unordered array of {@link XMPText}.
	 *
	 * **DCMI definition**: A related resource. **DCMI comment**: Recommended
	 * best practice is to identify the related resource by means of a string
	 * conforming to a formal identification system. **XMP addition**: XMP
	 * usage is a list of related resources.
	 */
	relation: xmpSeq(XMPText),

	/**
	 * Type: Language alternative of {@link XMPText}.
	 *
	 * **DCMI definition**: Information about rights held in and over the
	 * resource. **DCMI comment**: Typically, rights information includes a
	 * statement about various property rights associated with the resource,
	 * including intellectual property rights. **XMP addition**: XMP usage is a
	 * list of informal rights statements, given in various languages.
	 */
	rights: xmpAlt(),

	/**
	 * Type: {@link XMPText}.
	 *
	 * **DCMI definition**: A related resource from which the described resource
	 * is derived. **DCMI comment**: The described resource may be derived
	 * from the related resource in whole or in part. Recommended best practice
	 * is to identify the related resource by means of a string conforming to a
	 * formal identification system.
	 */
	source: xmpLiteral(XMPText),

	/**
	 * Type: Unordered array of {@link XMPText}.
	 *
	 * **DCMI definition**: The topic of the resource. **DCMI comment**:
	 * Typically, the subject will be represented using keywords, key phrases,
	 * or classification codes. Recommended best practice is to use a
	 * controlled vocabulary. To describe the spatial or temporal topic of the
	 * resource, use the dc:coverage element. **XMP addition**: XMP usage is a
	 * list of descriptive phrases or keywords that specify the content of the
	 * resource.
	 */
	subject: xmpSeq(XMPText),

	/**
	 * Type: Language alternative of {@link XMPText}.
	 *
	 * **DCMI definition**: A name given to the resource. **DCMI comment**:
	 * Typically, a title will be a name by which the resource is formally
	 * known. **XMP addition**: XMP usage is a title or name, given in various
	 * languages.
	 */
	title: xmpAlt(),

	/**
	 * Type: Unordered array of {@link XMPText}.
	 *
	 * **DCMI definition: The nature or genre of the resource. **DCMI
	 * comment**: Recommended best practice is to use a controlled vocabulary
	 * such as the DCMI Type Vocabulary [DCMITYPE]. To describe the file
	 * format, physical medium, or dimensions of the resource, use the
	 * `dc:format` element. **XMP addition**: See the `dc:format` entry for
	 * clarification of the XMP usage of that element.
	 */
	type: xmpSeq(XMPText),
}) satisfies XMPNamespaceSchema;

export type DublinCoreSchema = v.InferOutput<typeof dublinCoreNamespace>;
