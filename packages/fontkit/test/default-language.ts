import { describe, expect, it } from 'vitest';

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
});
