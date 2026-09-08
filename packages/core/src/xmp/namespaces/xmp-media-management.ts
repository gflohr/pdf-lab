import * as v from 'valibot';
import { xmpGUID } from '../data-types/guid.js';
import { xmpPantry } from '../data-types/pantry.js';
import { xmpRenditionClass } from '../data-types/rendition-class.js';
import { xmpResourceEvent } from '../data-types/resource-event.js';
import { xmpResourceRef } from '../data-types/resource-ref.js';
import { xmpText } from '../data-types/text.js';
import { xmpURI } from '../data-types/uri.js';
import { xmpBag, xmpSeq } from '../xmp-namespace.js';
import { xmpVersion } from '../data-types/version.js';
import { xmpURL } from '../data-types/url.js';
import { xmpInteger } from '../data-types/integer.js';

/**
 * The XMP Media Management namespace
 *
 * This namespace is primarily for use by digital asset management (DAM)
 * systems.
 * The following properties are “owned” by the DAM system and should be set by
 * applications under their direction; they should not be used by unmanaged
 * files: `xmpMM:ManagedFrom`, `xmpMM:Manager`, `xmpMM:ManageTo`,
 * `xmpMM:ManageUI`, `xmpMM: ManagerVariant`.
 *
 * The following properties are owned by the DAM system for managed files, but
 * can also be used by applications for unmanaged files: `xmpMM:DerivedFrom`,
 * `xmpMM:DocumentID`, `xmpMM: RenditionClass`, `xmpMM:RenditionParams`,
 * `xmpMM:VersionID`, `xmpMM:Versions`.
 *
 * The `xmpMM:History` property is always owned by the application.
 *
 * * The namespace URI is http://ns.adobe.com/xap/1.0/mm/
 * * The preferred namespace prefix is `xmpMM`.
 */
export const xmpMediaManagementNamespace = v.strictObject({
	/**
	 * Type: {@link xmpResourceRef}
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	DerivedFrom: xmpResourceRef,

	/**
	 * Type: {@link xmpGUID}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	DocumentID: xmpGUID,

	/**
	 * Type: Ordered array of {@link xmpResourceEvent}.
	 *
	 * High-level actions that resulted in this resource. It is intended to
	 * give human readers a description of the steps taken to make the changes
	 * from the previous version to this one. The list should be at an abstract
	 * level; it is not intended to be an exhaustive keystroke or other
	 * detailed history. The description should be sufficient for metadata
	 * management, as well as for workflow enhancement.
	 */
	History: xmpSeq(xmpResourceEvent),

	/**
	 * Type: Unordered array of {@link xmpResourceRef}.
	 *
	 * References to resources that were incorporated, by inclusion or
	 * reference, into this resource.
	 */
	Ingredients: xmpBag(xmpResourceRef),

	/**
	 * Type: {@link xmpGUID}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	InstanceID: xmpGUID,

	/**
	 * Type: Unordered array of {@link xmpResourceRef}.
	 *
	 * A reference to the document as it was prior to becoming managed. It is
	 * set when a managed document is introduced to an asset management system
	 * that does not currently own it. It may or may not include references to
	 * different management systems.
	 */
	ManagedFrom: xmpBag(xmpResourceRef),

	/**
	 * Type: {@link xmpAgentName}.
	 *
	 * The name of the asset management system that manages this resource.
	 * Along with `xmpMM:ManagerVariant`, it tells applications which asset
	 * management system to contact concerning this document.
	 */
	Manager: xmpGUID,

	/**
	 * Type: {@link xmpURI}.
	 *
	 * A URI identifying the managed resource to the asset management system;
	 * the presence of this property is the formal indication that this
	 * resource is managed. The form and content of this URI is private to the
	 * asset management system.
	 */
	ManageTo: xmpURI,

	/**
	 * Type: {@link xmpURI}.
	 *
	 * A URI that can be used to access information about the managed resource
	 * through a web browser. It might require a custom browser plug-in.
	 */
	ManageUI: xmpURI,

	/**
	 * Type: {@link xmpText}.
	 *
	 * Specifies a particular variant of the asset management system. The
	 * format of this property is private to the specific asset management
	 * system.
	 */
	ManagerVariant: xmpText,

	/**
	 * Type: {@link xmpGUID}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	OriginalDocumentID: xmpGUID,

	/**
	 * Type: Unordered array of {@link xmpPan}.
	 *
	 * Each array item has a structure value with a potentially unique set of
	 * fields, containing extracted XMP from a component. Each field is a
	 * property from the XMP of a contained resource component, with all
	 * substructure preserved.
	 *
	 * Each pantry entry shall contain an `xmpMM:InstanceID`. Only one copy of
	 * the pantry entry for any given xmpMM:InstanceID shall be retained in the
	 * pantry. Nested pantry items shall be removed from the individual pantry
	 * item and promoted to the top level of the pantry.
	 */
	Pantry: xmpPantry,

	/**
	 * Type: {@link xmpRenditionClass}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	RenditionClass: xmpRenditionClass,

	/**
	 * Type: {@link xmpText}.
	 *
	 * Refer to Part 1 of the XMP specification, *Data Model, Serialization,
	 * and Core Properties*, for definition.
	 */
	RenditionParams: xmpText,

	/**
	 * Type: {@link xmpText}.
	 * The document version identifier for this resource.
	 *
	 * Each version of a document gets a new identifier, usually simply by
	 * incrementing integers 1, 2, 3 . . . and so on.
	 *
	 * Media management systems can have other conventions or support branching
	 * which requires a more complex scheme.
	 */
	VersionID: xmpText,

	/**
	 * Type: Ordered array of {@link xmpVersion}.
	 *
	 * Each array item has a structure value with a potentially unique set of
	 * fields, containing extracted XMP from a component. Each field is a
	 * property from the XMP of a contained resource component, with all
	 * substructure preserved.
	 *
	 * Each pantry entry shall contain an `xmpMM:InstanceID`. Only one copy of
	 * the pantry entry for any given xmpMM:InstanceID shall be retained in the
	 * pantry. Nested pantry items shall be removed from the individual pantry
	 * item and promoted to the top level of the pantry.
	 */
	Versions: xmpBag(xmpVersion),

	/**
	 * Type: {@link xmpURL}.
	 *
	 * @deprecated for privacy protection.
	 */
	LastURL: xmpURL,

	/**
	 * Type: {@link xmpResourceRef}.
	 *
	 * @deprecated in favour of `xmpMM:DerivedFrom`.
	 *
	 * A reference to the document of which this is a rendition.
	 */
	RenditionOf: xmpResourceRef,

	/**
	 * Type: {@link xmpInteger}.
	 *
	 * @deprecated Previously used only to support the `xmpMM:LastURL` property.
	 */
	SaveID: xmpInteger,
});

export type XmpMediaManagementSchema = v.InferOutput<
	typeof xmpMediaManagementNamespace
>;
