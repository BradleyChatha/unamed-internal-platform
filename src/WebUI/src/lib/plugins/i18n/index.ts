import { FluentBundle, FluentResource } from '@fluent/bundle';
import Resource_EN from '../../../../compiletime-assets/translations/en.ftl?raw';

export type TranslationKey = 'en';
export const LocaleKeyName = 'locale';

function loadLocale(
	locale: TranslationKey,
	resource: FluentResource,
	outErrors?: Error[]
): FluentBundle {
	const b = new FluentBundle(locale);
	const errors = b.addResource(resource);

	if (errors.length) {
		for (const error of errors) {
			outErrors?.push(error);
		}
	}

	return b;
}

// Exported for testing
export const resourceByLocale: Record<TranslationKey, FluentResource> = {
	en: new FluentResource(Resource_EN)
};

// Exported for testing
export const bundlesByLocale: Record<TranslationKey, FluentBundle | null> = {
	en: null
};

export function getBundle(locale: TranslationKey, errors?: Error[]): FluentBundle {
	if (!bundlesByLocale[locale]) {
		bundlesByLocale[locale] = loadLocale(locale, resourceByLocale[locale], errors);
	}

	return bundlesByLocale[locale] || (bundlesByLocale.en as FluentBundle);
}

export function t(
	id: string,
	args?: Record<string, string | number>,
	locale?: TranslationKey
): string {
	if (!locale) locale = (localStorage.getItem(LocaleKeyName) as TranslationKey) || 'en';

	const errors: Error[] = [];

	const bundle = getBundle(locale, errors);
	const message = bundle.getMessage(id);
	const value =
		message && message.value
			? bundle.formatPattern(message.value, args, errors)
			: `<could not load localised message: ${locale}>`;

	if (errors?.length)
		console.error(`[playwright:error:t] Error(s) occurred while localising message '${id}'`);
	for (const error of errors || []) {
		console.error(error);
	}

	return value;
}
