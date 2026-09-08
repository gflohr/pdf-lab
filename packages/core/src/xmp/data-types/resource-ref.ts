import * as v from 'valibot';
import { xmpSeq } from '../xmp-namespace.js';
import { xmpAgentName } from './agent-name.js';
import { xmpClosedChoice } from './closed-choice.js';
import { xmpDate } from './date.js';
import { xmpGUID } from './guid.js';
import { xmpPart } from './part.js';
import { xmpRenditionClass } from './rendition-class.js';
import { xmpText } from './text.js';
import { xmpURI } from './uri.js';

/**
 * ResourceRef
 *
 * A multiple part reference to a resource. Used to indicate prior versions,
 * originals of renditions, originals for derived documents, and so on. The
 * fields present in any specific reference depend on usage and on whether
 * the referenced resource is managed. Except for instanceID, the fields are
 * all properties from the referenced resource’s xmpMM namespace.
 *
 * * The field namespace URI is http://ns.adobe.com/xap/1.0/sType/ResourceRef#
 * * The preferred field namespace prefix is `stRef`
 */
export const xmpResourceRef = v.strictObject({
	/**
	 * Type: Ordered list of {@link xmpURI}.
	 *
	 * The referenced resource’s fallback file paths or URLs. The sequence
	 * order is the recommended order in attempting to locate the resource.
	 */
	alternatePaths: xmpSeq(xmpURI),

	/**
	 * Type: {@link xmpGUID}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	documentID: xmpGUID,

	/**
	 * Type: {@link xmpURI}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	filePath: xmpURI,

	/**
	 * Type: {@link xmpPart}.
	 *
	 * For a resource within an `xmpMM:Ingredients` list, the part of this
	 * resource that is incorporated in the containing document
	 */
	fromPart: xmpPart,

	/**
	 * Type: {@link xmpGUID}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	instanceID: xmpGUID,

	/**
	 * Type: {@link xmpDate}.
	 *
	 * The value of `stEvt:when` for the last time the file was written.
	 */
	lastModifyDate: xmpDate,

	/**
	 * Type: {@link xmpAgentName}
	 *
	 * The referenced resource’s `xmpMM:Manager`.
	 */
	manager: xmpAgentName,

	/**
	 * Type: {@link xmpText}
	 *
	 * The referenced resource’s `xmpMM:ManagerVariant`.
	 */
	managerVariant: xmpText,

	/**
	 * Type: {@link xmpURI}
	 *
	 * The referenced resource’s `xmpMM:ManageTo`.
	 */
	manageTo: xmpURI,

	/**
	 * Type: {@link xmpURI}
	 *
	 * The referenced resource’s `xmpMM:ManageUI`.
	 */
	manageUI: xmpURI,

	/**
	 * Type: Closed {@link xmpChoice}
	 *
	 * For a resource within an xmpMM:Ingredients list, whether markers in this
	 * resource should be ignored (masked) or processed normally. One of:
	 *
	 * * All: Ignore markers in this ingredient and all its children.
	 * * None: Process markers in this ingredient and all its children.
	 */
	maskMarkers: xmpClosedChoice(['All', 'None']),

	/**
	 * Type: {@link xmpText}
	 *
	 * The name or URI of a mapping function used to map the fromPart to the
	 * toPart. The default for time mappings is "linear".
	 */
	partMapping: xmpText,

	/**
	 * Type: {@link xmpRenditionClass}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	renditionClass: xmpRenditionClass,

	/**
	 * Type: {@link xmpText}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	renditionParams: xmpText,

	/**
	 * Type: {@link xmpPart}.
	 *
	 * For a resource within an xmpMM:Ingredients list, the part of the
	 * containing document into which this resource is incorporated.
	 */
	toPart: xmpPart,

	/**
	 * Type: {@link xmpText}
	 *
	 * The referenced resource’s `xmpMM:VersionID`.
	 */
	versionID: xmpText,
});

export type XmpResourceRef = v.InferOutput<typeof xmpResourceRef>;
