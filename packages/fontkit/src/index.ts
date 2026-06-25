import fontkit from './base.js';
import DFont from './d-font.js';
import TrueTypeCollection from './true-type-collection.js';
import { TrueTypeFont } from './true-type-font.js';
import { WOFFFont } from './woff-font.js';
import { WOFF2Font } from './woff2-font.js';

// Register font formats
fontkit.registerFormat(TrueTypeFont);
fontkit.registerFormat(WOFFFont);
fontkit.registerFormat(WOFF2Font);
fontkit.registerFormat(TrueTypeCollection);
fontkit.registerFormat(DFont);

export default fontkit;
