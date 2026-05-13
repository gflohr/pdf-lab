import type { AATFeatures } from './aat';
import type { OpenTypeFeatures } from './opentype';

/**
 * The features is an object mapping OpenType features to a boolean
 * enabling or disabling each. If this is an AAT font,
 * the OpenType feature tags are mapped to AAT features.
 */
export interface TypeFeatures extends OpenTypeFeatures, AATFeatures {
	[key: string]: boolean | undefined;
}
