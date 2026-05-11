import fontkit from './base';
import DFont from './DFont';
import TrueTypeCollection from './TrueTypeCollection';
import TTFFont from './TTFFont';
import WOFF2Font from './WOFF2Font';
import WOFFFont from './WOFFFont';

// Register font formats
fontkit.registerFormat(TTFFont);
fontkit.registerFormat(WOFFFont);
fontkit.registerFormat(WOFF2Font);
fontkit.registerFormat(TrueTypeCollection);
fontkit.registerFormat(DFont);

export default fontkit;
