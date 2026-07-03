import unicode from '@pdf-lib/unicode-properties';
import type { OpenType } from '../tables/open-type.js';
import type { TrueTypeFont } from '../true-type-font.js';
import { OTProcessor } from './ot-processor.js';
import type { IndicInfo } from './shapers/indic-shaper.js';
import type { USEInfo } from './shapers/universal-shaper.js';

export type ShaperInfo = IndicInfo | USEInfo;

export class GlyphInfo<ShaperInfoT = null> {
	public _font: TrueTypeFont;
	// The constructor calls the setter for this member. It is therefore
	// always initialised.
	private _id!: number;
	public features: OpenType.FeatureFlags;
	public ligatureID: number | null;
	public ligatureComponent: number | null;
	public isLigated: boolean;
	public cursiveAttachment: number | null;
	public markAttachment: number | null;
	public shaperInfo: ShaperInfoT | null;
	public substituted: boolean;
	public isMultiplied: boolean;
	public isBase?: boolean;
	public isLigature?: boolean; // FIXME! Is this meant to be the same as isLigated?
	public isMark?: boolean;
	public markAttachmentType?: number;

	constructor(
		font: TrueTypeFont,
		id: number,
		public codePoints: number[] = [],
		features?: OpenType.FeatureTag[] | OpenType.Features,
	) {
		// FIXME! Other classes access the _font property!
		this._font = font;
		this.codePoints = codePoints;

		// FIXME! The setter for `id` has side-effects. The side-effects
		// should be moved into a separate, private method that is then called
		// both by the constructor and the setter. Then we can remove the
		// bogus initialisation.
		this.id = id;

		this.features = {};
		if (Array.isArray(features)) {
			for (let i = 0; i < features.length; i++) {
				const feature = features[i];
				this.features[feature] = true;
			}
		} else if (typeof features === 'object') {
			Object.assign(this.features, features);
		}

		this.ligatureID = null;
		this.ligatureComponent = null;
		this.isLigated = false;
		this.cursiveAttachment = null;
		this.markAttachment = null;
		this.shaperInfo = null;
		this.isMultiplied = false;
		this.substituted = false;
	}

	get id(): number {
		return this._id;
	}

	set id(id: number) {
		this._id = id;
		this.substituted = true;

		const GDEF = this._font.GDEF;
		if (GDEF?.glyphClassDef) {
			// TODO: clean this up
			const classID = OTProcessor.prototype.getClassID(id, GDEF.glyphClassDef);
			this.isBase = classID === 1;
			this.isLigature = classID === 2;
			this.isMark = classID === 3;
			this.markAttachmentType = GDEF.markAttachClassDef
				? OTProcessor.prototype.getClassID(id, GDEF.markAttachClassDef)
				: 0;
		} else {
			this.isMark =
				this.codePoints.length > 0 && this.codePoints.every(unicode.isMark);
			this.isBase = !this.isMark;
			this.isLigature = this.codePoints.length > 1;
			this.markAttachmentType = 0;
		}
	}

	copy(): GlyphInfo<ShaperInfoT> {
		return new GlyphInfo(
			this._font,
			this.id,
			[...this.codePoints],
			this.features,
		);
	}
}
