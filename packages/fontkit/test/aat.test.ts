import { describe, expect, it } from 'vitest';
import {
	type AATFeaturesInput,
	mapAATToOT,
	mapOTToAAT,
} from '../src/aat/aat-feature-map.js';

describe('AAT & OpenType Feature Mappings', () => {
	describe('Static Tables Validation', () => {
		it('should correctly build dynamic character variant entries (cv01 - cv99)', () => {
			expect(mapAATToOT([[17, 1]])).toContain('cv01');
			expect(mapAATToOT([[17, 99]])).toContain('cv99');
		});
	});

	describe('mapOTToAAT()', () => {
		it('should map standard OpenType layout tags to stringified AAT numeric keys', () => {
			const otInput = { liga: true, smcp: true };
			const expectedAat = {
				'1': { '2': true }, // ligatures -> commonLigatures
				'37': { '1': true }, // lowerCase -> lowerCaseSmallCaps
			};

			expect(mapOTToAAT(otInput)).toEqual(expectedAat);
		});

		it('should safely ignore unrecognized OpenType feature tags', () => {
			const otInput = { XYZ1: true, liga: true };
			const expectedAat = {
				'1': { '2': true },
			};

			expect(mapOTToAAT(otInput)).toEqual(expectedAat);
		});

		it('should forward structural booleans down to the active selectors', () => {
			const otInput = { liga: false, smcp: true };
			const expectedAat = {
				'1': { '2': false },
				'37': { '1': true },
			};

			expect(mapOTToAAT(otInput)).toEqual(expectedAat);
		});
	});

	// --- AAT -> OpenType Pipeline ---
	describe('mapAATToOT()', () => {
		describe('Array Inputs Structure: [[featureType, featureSetting]]', () => {
			it('should map raw numeric codes to equivalent OpenType tags', () => {
				const aatInput: AATFeaturesInput = [
					[1, 2],
					[37, 1],
				]; // liga, smcp
				const result = mapAATToOT(aatInput);

				expect(result).toContain('liga');
				expect(result).toContain('smcp');
				expect(result).has.length(2);
			});

			it('should resolve semantic string labels correctly (Fixes legacy Number.isNaN bug)', () => {
				// Testing your bug fix: using string tags instead of raw numeric IDs
				const aatInput = [
					['ligatures', 'commonLigatures'],
				] as unknown as AATFeaturesInput;
				const result = mapAATToOT(aatInput);

				expect(result).toContain('liga');
			});

			it('should ignore unmappable or unsupported feature pairings cleanly', () => {
				const aatInput: AATFeaturesInput = [
					[999, 999],
					[1, 2],
				];
				const result = mapAATToOT(aatInput);

				expect(result).toEqual(['liga']);
			});
		});

		describe('Object Inputs Structure: { featureType: { featureSetting: boolean } }', () => {
			it('should resolve standard numeric-keyed object maps', () => {
				const aatInput: AATFeaturesInput = {
					'1': { '2': true }, // liga
					'37': { '1': true }, // smcp
				};
				const result = mapAATToOT(aatInput);

				expect(result).toContain('liga');
				expect(result).toContain('smcp');
			});

			it('should ignore object settings evaluated to false', () => {
				const aatInput: AATFeaturesInput = {
					'1': { '2': false }, // turned off
					'37': { '1': true },
				};
				const result = mapAATToOT(aatInput);

				expect(result).toContain('smcp');
				expect(result).not.toContain('liga');
			});

			it('should resolve deep string-labeled object descriptors cleanly', () => {
				const aatInput = {
					ligatures: {
						commonLigatures: true,
					},
				};

				const result = mapAATToOT(aatInput);
				expect(result).toEqual(['liga']);
			});
		});

		describe('Edge Cases & Defensive Guarding', () => {
			it('should gracefully return an empty array on empty or falsy inputs', () => {
				expect(mapAATToOT([])).toEqual([]);
				expect(mapAATToOT(null as unknown as AATFeaturesInput)).toEqual([]);
				expect(mapAATToOT({} as AATFeaturesInput)).toEqual([]);
			});
		});
	});
});
