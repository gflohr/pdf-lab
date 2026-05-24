import fontkit from './base.js';
import DFont from './DFont.js';
import TrueTypeCollection from './TrueTypeCollection.js';
import { TrueTypeFont } from './true-type-font.js';
import WOFF2Font from './WOFF2Font.js';
import WOFFFont from './woff-font.js';

// Register font formats
fontkit.registerFormat(TrueTypeFont);
fontkit.registerFormat(WOFFFont);
fontkit.registerFormat(WOFF2Font);
fontkit.registerFormat(TrueTypeCollection);
fontkit.registerFormat(DFont);

export default fontkit;
