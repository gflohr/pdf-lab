import { fontkit } from './base.js';
import { DFont } from './d-font.js';
import { TrueTypeCollection } from './true-type-collection.js';
import { TrueTypeFont } from './true-type-font.js';
import { WOFFFont } from './woff-font.js';
import { WOFF2Font } from './woff2-font.js';

// Register font formats
fontkit.registerFormat(TrueTypeFont);
fontkit.registerFormat(WOFFFont);
fontkit.registerFormat(WOFF2Font);
fontkit.registerFormat(TrueTypeCollection);
fontkit.registerFormat(DFont);

export { fontkit };
export default fontkit;

export * from './aat/index.js';
export * from './cff/index.js';
export * from './cmap-processor.js';
export * from './d-font.js';
export * from './encodings.js';
export * from './fatal-font-error.js';
export * from './font.js';
export * from './glyph/index.js';
export * from './layout/index.js';
export * from './open-type-font.js';
export * from './open-type/index.js';
export * from './sfnt-font.js';
export * from './subset/index.js';
export * from './tables/index.js';
export * from './true-type-collection.js';
export * from './true-type-font.js';
export * from './true-type-font.js';
export * from './utils.js';
export * from './woff-font.js';
export * from './woff2-font.js';
