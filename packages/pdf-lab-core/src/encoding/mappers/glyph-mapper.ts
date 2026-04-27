export interface GlyphMapper {
	lookup(glyph: number): string;
	lookupCodepoints(glyph: number): number[];
}
