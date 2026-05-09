import type { FontInfo } from 'pdf-lab-core';

export type FontInfoDto = {
	ref: string;
	embedded: boolean;
	subtype?: string;
	baseFont?: string;
	fontName?: string;
	encoding?: string;
};

export function toFontInfoDto(fontInfo: FontInfo): FontInfoDto {
	const dto: FontInfoDto = {
		ref: fontInfo.ref.tag,
		embedded: fontInfo.embedded,
		encoding: fontInfo.toUnicodeMapper?.name ?? fontInfo.encodingMapper.name,
	};
	if (Object.hasOwn(fontInfo, 'subtype')) dto.subtype = fontInfo.subtype;
	if (Object.hasOwn(fontInfo, 'baseFont')) dto.baseFont = fontInfo.baseFont;
	if (Object.hasOwn(fontInfo, 'fontName')) dto.fontName = fontInfo.fontName;

	return dto;
}
