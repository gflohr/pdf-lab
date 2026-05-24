import fontkit from './base.js';
import DFont from './DFont.js';
import TrueTypeCollection from './TrueTypeCollection.js';
import { TTFFont } from './TTFFont.js';
import WOFF2Font from './WOFF2Font.js';
import WOFFFont from './WOFFFont.js';

// Register font formats
fontkit.registerFormat(TTFFont);
fontkit.registerFormat(WOFFFont);
fontkit.registerFormat(WOFF2Font);
fontkit.registerFormat(TrueTypeCollection);
fontkit.registerFormat(DFont);

export default fontkit;
