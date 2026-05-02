import { FontEmbedder, type SubType } from '../embedder.js';

export class Type1FontEmbedder extends FontEmbedder {
	get subType(): SubType {
		return 'Type0';
	}
}
