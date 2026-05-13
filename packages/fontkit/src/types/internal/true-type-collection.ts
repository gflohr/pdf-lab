import type { Font } from '../font';

export interface TrueTypeCollection extends Font {
	getFont(name: string): Font | null;

	get fonts(): Font[];
}
