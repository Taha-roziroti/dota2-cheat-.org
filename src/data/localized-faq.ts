import { homeFaqs, seoFaqs, type FaqItem } from './site';
import type { LocaleCode } from './i18n/locales';
import { getT } from '../i18n/server';

function faqField(
	t: ReturnType<typeof getT>,
	slug: string,
	field: 'q' | 'a',
	fallback: string,
): string {
	const key = `faq.items.${slug}.${field}`;
	const value = t(key);
	return value === key ? fallback : value;
}

function localizeFaq(t: ReturnType<typeof getT>, item: FaqItem): FaqItem {
	return {
		...item,
		question: faqField(t, item.slug, 'q', item.question),
		answer: faqField(t, item.slug, 'a', item.answer),
	};
}

/** Home FAQ accordion items with locale text when available in translation.json. */
export function getLocalizedHomeFaqs(locale: LocaleCode): FaqItem[] {
	const t = getT(locale);
	return homeFaqs.map((item) => localizeFaq(t, item));
}

/** Full FAQ list (index + schema) with locale text when available. */
export function getLocalizedFaqs(locale: LocaleCode): FaqItem[] {
	const t = getT(locale);
	return seoFaqs.map((item) => localizeFaq(t, item));
}
