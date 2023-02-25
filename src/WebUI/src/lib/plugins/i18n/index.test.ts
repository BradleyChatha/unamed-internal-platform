import { describe, it, expect } from 'vitest';
import { bundlesByLocale, getBundle, resourceByLocale, type TranslationKey } from './index';

describe('bundles', () => {
	it('getBundle', () => {
		expect(getBundle('en')).toBeTruthy();
	});

	for (const key in bundlesByLocale) {
		describe(`locale - ${key}`, () => {
			it('should load without errors', () => {
				const errors: Error[] = [];
				const bundle = getBundle(key as TranslationKey, errors);
				expect(errors).toEqual([]);
				expect(bundle).toBeTruthy();
			});

			it('should have the same keys as the en locale', () => {
				const enResource = resourceByLocale.en;
				const resource = resourceByLocale[key as TranslationKey];

				const enKeys = enResource.body.map((v) => v.id).sort();
				const keys = resource.body.map((v) => v.id).sort();

				expect(keys).toEqual(enKeys);
			});
		});
	}
});
