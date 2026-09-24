import { customerReviews, siteConfig } from './site';
import { defaultLocale, localeCodes, localeMap, type LocaleCode } from './i18n/locales';
import { buildCanonicalUrl } from './i18n/routing';
import { reviewsSitemapImageMeta } from './brand-sitemap';
import { absoluteImageUrl, crawlPhotoMeta, reviewsImageSrc } from './page-images';

export const reviewsBasePath = '/reviews/';

export function getReviewPath(slug: string, locale: LocaleCode = defaultLocale): string {
	if (locale === defaultLocale) {
		return `${reviewsBasePath}${slug}/`;
	}
	return `/${locale}/reviews/${slug}/`;
}

export function getReviewsBasePath(locale: LocaleCode = defaultLocale): string {
	return locale === defaultLocale ? reviewsBasePath : `/${locale}/reviews/`;
}

export function getReviewsIndexHreflangAlternates(currentLocale: LocaleCode = defaultLocale) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: buildCanonicalUrl(getReviewsBasePath(code), code),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{
			hreflang: 'x-default' as const,
			href: buildCanonicalUrl(reviewsBasePath, defaultLocale),
		},
	];
}

export function absoluteReviewUrl(slug?: string): string {
	return new URL(slug ? getReviewPath(slug) : reviewsBasePath, siteConfig.url).href;
}

export function getReviewCrawlImage(slug: string, handle: string, caption: string) {
	return crawlPhotoMeta(slug, `Dota 2 Cheats review by @${handle}`, caption);
}

/** English review routes for sitemap-en.xml — /reviews/ index + one URL per review. */
export function getReviewSitemapEntries() {
	const indexLastmod = customerReviews.reduce(
		(max, review) => (review.date > max ? review.date : max),
		customerReviews[0]?.date ?? new Date().toISOString().slice(0, 10),
	);

	const indexMeta = reviewsSitemapImageMeta();
	const indexImage = {
		url: absoluteImageUrl(reviewsImageSrc),
		title: indexMeta.title,
		caption: indexMeta.caption,
	};

	const entries: {
		path: string;
		lastmod: string;
		priority: number;
		changefreq: 'daily' | 'weekly' | 'monthly';
		images: { url: string; title: string; caption: string }[];
	}[] = [
		{
			path: reviewsBasePath,
			lastmod: indexLastmod,
			priority: 0.85,
			changefreq: 'weekly',
			images: [indexImage],
		},
	];

	for (const review of customerReviews) {
		const photo = getReviewCrawlImage(review.slug, review.handle, review.seoDescription);
		entries.push({
			path: getReviewPath(review.slug),
			lastmod: review.date,
			priority: 0.75,
			changefreq: 'monthly',
			images: [
				{
					url: photo.url,
					title: photo.title,
					caption: photo.caption,
				},
			],
		});
	}

	return entries;
}
