import * as v from 'valibot';
import { xmpBag } from '../xmp-namespace.js';

/**
 * A single sub-asset entry inside xmpMM:Pantry.
 * Represents an rdf:Description node containing metadata for an embedded resource.
 */
export const XmpPantryItem = v.looseObject({
	// Standard identifier fields typically found on sub-assets
	'xmpMM:InstanceID': v.optional(v.string()),
	'xmpMM:DocumentID': v.optional(v.string()),
	'xmpMM:OriginalDocumentID': v.optional(v.string()),

	// Common optional Dublin Core properties on sub-assets
	'dc:format': v.optional(v.string()),

	// Allow any other valid XMP property keys (e.g., tiff:ImageWidth, etc.)
});

export type XmpPantryItem = v.InferOutput<typeof XmpPantryItem>;

/**
 * xmpMM:Pantry
 * Type: Unordered array (rdf:Bag) of nested XMP Resource descriptions.
 */
export const xmpPantry = xmpBag(XmpPantryItem);

export type XmpPantry = v.InferOutput<typeof xmpPantry>;
