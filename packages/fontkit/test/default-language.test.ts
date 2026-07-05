import * as fs from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fontkit } from '../src/index.js';
import { TrueTypeFont } from '../src/true-type-font';

// Minimal mock setup to recreate the context of the TrueTypeFont class context
const mockFontkit = {
	defaultLanguage: 'en',
};

class TestFont {
	defaultLanguage = 'de';
	name: { records: Record<string, any> } | null = null;

	// The method we are testing
	protected getName(
		key: string,
		lang = this.defaultLanguage || mockFontkit.defaultLanguage,
	): string | null {
		if (!this.name) {
			return null;
		}

		const maybeRecord = this.name.records[key];
		if (maybeRecord) {
			const record = maybeRecord;
			const firstKey = Object.keys(record)[0] as keyof typeof record;

			return (
				record[lang] ||
				record[this.defaultLanguage] ||
				record[mockFontkit.defaultLanguage] ||
				record.en ||
				(firstKey ? record[firstKey] : null) ||
				null
			);
		}

		return null;
	}

	// Public test helper to expose the protected method
	public testGetName(key: string, lang?: string) {
		return this.getName(key, lang);
	}
}

describe('default language precedence chain', () => {
	it('should return null if name table records do not exist', () => {
		const font = new TestFont();
		font.name = null;
		expect(font.testGetName('fontFamily')).toBeNull();
	});

	it('1. should prioritize the requested runtime language argument', () => {
		const font = new TestFont();
		font.name = {
			records: {
				fontFamily: { fr: 'Police', de: 'Schriftart', en: 'Font' },
			},
		};
		// Explicitly asking for French
		expect(font.testGetName('fontFamily', 'fr')).toBe('Police');
	});

	it('2. should fall back to the class defaultLanguage if runtime lang is missing', () => {
		const font = new TestFont();
		font.name = {
			records: {
				fontFamily: { de: 'Schriftart', en: 'Font' },
			},
		};
		// No arg passed -> falls back to font.defaultLanguage ('de')
		expect(font.testGetName('fontFamily')).toBe('Schriftart');
	});

	it('3. should fall back to global fontkit.defaultLanguage if class default is missing', () => {
		const font = new TestFont();
		font.defaultLanguage = ''; // clear class level default
		font.name = {
			records: {
				fontFamily: { en: 'Font Global Default', es: 'Fuente' },
			},
		};
		expect(font.testGetName('fontFamily')).toBe('Font Global Default');
	});

	it('4. should fall back specifically to "en" if other defaults are missing', () => {
		const font = new TestFont();
		font.defaultLanguage = '';
		// Mocking a scenario where lang argument mismatch occurs but 'en' is explicitly there
		font.name = {
			records: {
				fontFamily: { en: 'English Fallback Only', ja: 'フォント' },
			},
		};
		expect(font.testGetName('fontFamily', 'it')).toBe('English Fallback Only');
	});

	it('5. should grab the first available key if all target languages are absent', () => {
		const font = new TestFont();
		font.defaultLanguage = 'it'; // looking for Italian
		font.name = {
			records: {
				// Object.keys(record)[0] evaluates to 'ru'
				fontFamily: { ru: 'Шрифт', zh: '字体' },
			},
		};
		expect(font.testGetName('fontFamily', 'fr')).toBe('Шрифт');
	});

	it('should handle an empty records object gracefully', () => {
		const font = new TestFont();
		font.name = { records: { fontFamily: {} } };
		expect(font.testGetName('fontFamily')).toBeNull();
	});

	describe('upstream tests', () => {
		let font: TrueTypeFont;

		beforeEach(async () => {
			const bytes = await fs.readFile(
				`${import.meta.dirname}/data/amiri/amiri-regular.ttf`,
			);
			font = new TrueTypeFont(bytes);
		});

		afterEach(() => {
			fontkit.setDefaultLanguage();
		});

		describe('fontkit.setDefaultLanguage()', () => {
			it('font has "en" metadata properties', () => {
				expect(font.fullName).toBe('Amiri');
				expect(font.postscriptName).toBe('Amiri-Regular');
				expect(font.familyName).toBe('Amiri');
				expect(font.subfamilyName).toBe('Regular');
				expect(font.copyright).toBe(
					'Copyright (c) 2010-2017, Khaled Hosny <khaledhosny@eglug.org>.\nPortions copyright (c) 2010, Sebastian Kosch <sebastian@aldusleaf.org>.',
				);
				expect(font.version).toBe('Version 000.110 ');
			});

			it('can set global default language to "ar"', () => {
				fontkit.setDefaultLanguage('ar');
				expect(fontkit.defaultLanguage).toBe('ar');
			});

			it('font now has "ar" metadata properties', () => {
				fontkit.setDefaultLanguage('ar');
				expect(font.fullName).toBe('Amiri');
				expect(font.postscriptName).toBe('Amiri-Regular');
				expect(font.familyName).toBe('Amiri');
				expect(font.subfamilyName).toBe('عادي');
				expect(font.copyright).toBe(
					'حقوق النشر 2010-2017، خالد حسني <khaledhosny@eglug.org>.',
				);
				expect(font.version).toBe('إصدارة 000٫110');
			});

			it('can reset default language back to "en"', () => {
				fontkit.setDefaultLanguage();
				expect(fontkit.defaultLanguage).toBe('en');
			});
		});

		describe('font.setDefaultLanguage()', () => {
			it('font has "en" metadata properties', () => {
				expect(font.fullName).toBe('Amiri');
				expect(font.postscriptName).toBe('Amiri-Regular');
				expect(font.familyName).toBe('Amiri');
				expect(font.subfamilyName).toBe('Regular');
				expect(font.copyright).toBe(
					'Copyright (c) 2010-2017, Khaled Hosny <khaledhosny@eglug.org>.\nPortions copyright (c) 2010, Sebastian Kosch <sebastian@aldusleaf.org>.',
				);
				expect(font.version).toBe('Version 000.110 ');
			});

			it('can set font\'s default language to "ar"', () => {
				font.setDefaultLanguage('ar');
				expect(font.defaultLanguage).toBe('ar');
			});

			it('font now has "ar" metadata properties', () => {
				font.setDefaultLanguage('ar');
				expect(font.fullName).toBe('Amiri');
				expect(font.postscriptName).toBe('Amiri-Regular');
				expect(font.familyName).toBe('Amiri');
				expect(font.subfamilyName).toBe('عادي');
				expect(font.copyright).toBe(
					'حقوق النشر 2010-2017، خالد حسني <khaledhosny@eglug.org>.',
				);
				expect(font.version).toBe('إصدارة 000٫110');
			});

			it("the font's language should not change when the global changes", () => {
				font.setDefaultLanguage('ar');
				fontkit.setDefaultLanguage('en');

				expect(font.defaultLanguage).toBe('ar');
				expect(font.subfamilyName).toBe('عادي');
			});

			it('can reset default language back to "en"', () => {
				font.setDefaultLanguage();
				expect(font.defaultLanguage).toBe(null);
				expect(font.subfamilyName).toBe('Regular');
			});
		});

		describe('backup languages', () => {
			it("if the font's default language isn't found, use the global language", () => {
				font.setDefaultLanguage('piglatin');
				fontkit.setDefaultLanguage('ar');

				expect(font.subfamilyName).toBe('عادي');
			});
			it('if the global language isn\'t found, use "en"', () => {
				font.setDefaultLanguage('piglatin');
				fontkit.setDefaultLanguage('klingon');

				expect(font.subfamilyName).toBe('Regular');
			});
		});
	});
});
