import unicode from '@pdf-lib/unicode-properties';
import type { OpenTypeFeatureTag } from '../layout/glyph-run.js';
import type { SFNTFont } from '../sfnt-font.js';
import OTProcessor from './OTProcessor.js';
import type { IndicInfo } from './shapers/indic-shaper.js';
import type { USEInfo } from './shapers/universal-shapers.js';

export type ShaperInfo = IndicInfo | USEInfo;

export default class GlyphInfo<ShaperInfoT = null> {
	public _font: SFNTFont;
	// The constructor calls the setter for this member. It is therefore
	// always initialised.
	private _id!: number;
	public features: Record<OpenTypeFeatureTag, boolean>;
	private ligatureID: string | null;
	private ligatureComponent: number | null;
	public readonly isLigated: boolean;
	private cursiveAttachment: GlyphInfo<ShaperInfoT> | null;
	private markAttachment: GlyphInfo<ShaperInfoT> | null;
	public shaperInfo: ShaperInfoT | null;
	public substituted: boolean;
	public readonly isMultiplied: boolean;
	private isBase?: boolean;
	private isLigature?: boolean; // FIXME! Is this meant to be the same as isLigated?
	private isMark?: boolean;
	private markAttachmentType?: number;

	constructor(
		font: SFNTFont,
		id: number,
		public codePoints: number[] = [],
		features?: OpenTypeFeatureTag[] | Record<OpenTypeFeatureTag, boolean>,
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
