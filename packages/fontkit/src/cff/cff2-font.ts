import type { DecodeStream } from 'restructure';
import { CFFFont } from './cff-font';

export class CFF2Font extends CFFFont {
	static decode(stream: DecodeStream): CFF2Font {
		return new CFF2Font(stream);
	}
}
