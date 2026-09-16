import { siteConfig } from '../site';
import {
	defaultLocale,
	localeCodes,
	localeMap,
	type LocaleCode,
	locales,
} from '../i18n/locales';
import { resolvePageContextFromPath } from '../i18n/routing';
import type { BlogImageKey, BlogPostDefinition, BlogTranslation, ResolvedBlogPost } from './types';
import { blogSitemapImageMeta } from '../brand-sitemap';
import { getBlogPostImageMeta, getBlogPostImageSrc, getBlogCardImageSrc, getBlogCardImageMeta } from '../page-images';
import { blogPosts as rawBlogPosts } from './posts.generated';

function expandTranslations(
	translations: Partial<Record<LocaleCode, BlogTranslation>> & { en: BlogTranslation },
): Record<LocaleCode, BlogTranslation> {
	const en = translations.en;
	const full = {} as Record<LocaleCode, BlogTranslation>;
	for (const code of localeCodes) {
		full[code] = translations[code] ?? { ...en };
	}
	return full;
}

export const blogPosts: BlogPostDefinition[] = rawBlogPosts.map((post) => ({
	...post,
	translations: expandTranslations(post.translations as Partial<Record<LocaleCode, BlogTranslation>> & { en: BlogTranslation }),
}));

/** @deprecated Legacy keys — use getBlogPostImageSrc(postIndex) instead. */
export function getBlogImageSrc(key: BlogImageKey): string {
	const index = blogPosts.findIndex((post) => post.imageKey === key);
	return getBlogPostImageSrc(index >= 0 ? index : 0);
}

export function getBlogBasePath(locale: LocaleCode): string {
	return locale === defaultLocale ? '/forums/' : `/${locale}/forums/`;
}

export function isBlogPath(pathname: string): boolean {
	const context = resolvePageContextFromPath(pathname);
	return Boolean(context.isBlogIndex || context.blogSlug);
}

export function findPostBySlug(slug: string, locale?: LocaleCode): BlogPostDefinition | undefined {
	return blogPosts.find((post) => {
		if (locale) {
			return post.translations[locale]?.slug === slug;
		}
		return localeCodes.some((code) => post.translations[code]?.slug === slug);
	});
}

/** Target URL for the same blog index or post in another locale. */
export function getBlogLocaleSwitchHref(pathname: string, targetLocale: LocaleCode): string {
	const context = resolvePageContextFromPath(pathname);

	if (context.blogSlug) {
		const post = findPostBySlug(context.blogSlug, context.locale) ?? findPostBySlug(context.blogSlug);
		if (post) {
			const translation = post.translations[targetLocale] ?? post.translations[defaultLocale];
			return getBlogPostPath(targetLocale, translation.slug);
		}
	}

	return getBlogBasePath(targetLocale);
}

export function getBlogPostPath(locale: LocaleCode, slug: string): string {
	if (locale === defaultLocale) {
		return `/forums/${slug}/`;
	}
	return `/${locale}/forums/${slug}/`;
}

export function absoluteBlogUrl(locale: LocaleCode, slug?: string): string {
	const path = slug ? getBlogPostPath(locale, slug) : getBlogBasePath(locale);
	return new URL(path, siteConfig.url).href;
}

export function resolvePost(post: BlogPostDefinition, locale: LocaleCode): ResolvedBlogPost {
	const postIndex = blogPosts.findIndex((item) => item.id === post.id);
	const translation = post.translations[locale];
	const meta = getBlogPostImageMeta(postIndex >= 0 ? postIndex : 0);
	return {
		...post,
		locale,
		translation: {
			...translation,
			imageAlt: translation.imageAlt || meta.alt,
		},
		imageSrc: getBlogPostImageSrc(postIndex >= 0 ? postIndex : 0),
		canonicalPath: getBlogPostPath(locale, translation.slug),
	};
}

export function getAllPostsForLocale(locale: LocaleCode): ResolvedBlogPost[] {
	return blogPosts
		.map((post) => resolvePost(post, locale))
		.sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function getFeaturedPosts(locale: LocaleCode, limit = 3): ResolvedBlogPost[] {
	const all = getAllPostsForLocale(locale);
	const featured = all.filter((p) => p.featured);
	return (featured.length >= limit ? featured : all).slice(0, limit);
}

/** Blog index list — excludes featured cards already shown above the grid. */
export function getBlogListPosts(locale: LocaleCode): ResolvedBlogPost[] {
	const all = getAllPostsForLocale(locale);
	const featuredIds = new Set(getFeaturedPosts(locale, 3).map((post) => post.id));
	return all.filter((post) => !featuredIds.has(post.id));
}

/** Related posts for a blog article — same category first, then newest others. */
export function getRelatedPostsByCategory(post: ResolvedBlogPost, limit = 3): ResolvedBlogPost[] {
	const all = getAllPostsForLocale(post.locale).filter((item) => item.id !== post.id);
	const sameCategory = all.filter((item) => item.category === post.category);
	const otherCategories = all.filter((item) => item.category !== post.category);
	return [...sameCategory, ...otherCategories].slice(0, limit);
}

export function getPostBySlug(locale: LocaleCode, slug: string): ResolvedBlogPost | undefined {
	const post = blogPosts.find((p) => p.translations[locale]?.slug === slug);
	return post ? resolvePost(post, locale) : undefined;
}

/** Hreflang alternates for a blog post — all 22 locales. */
export function getBlogPostHreflangAlternates(
	post: BlogPostDefinition,
	currentLocale: LocaleCode = defaultLocale,
) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: absoluteBlogUrl(code, post.translations[code].slug),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{
			hreflang: 'x-default' as const,
			href: absoluteBlogUrl(defaultLocale, post.translations[defaultLocale].slug),
		},
	];
}

/** Hreflang alternates for a blog index — all 22 locales. */
export function getBlogIndexHreflangAlternates(currentLocale: LocaleCode = defaultLocale) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: absoluteBlogUrl(code),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{ hreflang: 'x-default' as const, href: absoluteBlogUrl(defaultLocale) },
	];
}

/**
 * Static paths for locale blog posts (all locales).
 */
export function getAllBlogStaticPaths(): { params: { lang?: string; slug: string }; props: { locale: LocaleCode } }[] {
	const paths: { params: { lang?: string; slug: string }; props: { locale: LocaleCode } }[] = [];

	for (const locale of localeCodes) {
		for (const post of blogPosts) {
			const slug = post.translations[locale].slug;
			if (locale === defaultLocale) {
				paths.push({ params: { slug }, props: { locale } });
			} else {
				paths.push({ params: { lang: locale, slug }, props: { locale } });
			}
		}
	}

	return paths;
}

/** Blog sitemap entries for one locale (index + all posts). */
export function getBlogSitemapEntriesForLocale(locale: LocaleCode) {

	const indexLastmod = blogPosts.reduce(
		(max, post) => (post.updated > max ? post.updated : max),
		blogPosts[0]?.updated ?? new Date().toISOString().slice(0, 10),
	);

	const entries: {
		path: string;
		lastmod: string;
		priority: number;
		changefreq: 'daily' | 'weekly' | 'monthly';
		images: { url: string; title: string; caption: string }[];
	}[] = [
		{
			path: getBlogBasePath(locale),
			lastmod: indexLastmod,
			priority: 0.92,
			changefreq: 'daily',
			images: [
				{
					url: new URL(siteConfig.defaultOgImage, siteConfig.url).href,
					...blogSitemapImageMeta(),
				},
			],
		},
	];

	for (const [index, post] of blogPosts.entries()) {
		const t = post.translations[locale];
		const meta = getBlogPostImageMeta(index);
		const isProductPost = /Dota 2 Cheats|Aimbot|ESP|Reliable|Comparisons/i.test(post.category);
		entries.push({
			path: getBlogPostPath(locale, t.slug),
			lastmod: post.updated,
			priority: isProductPost ? 0.95 : 0.88,
			changefreq: 'weekly',
			images: [
				{
					url: new URL(meta.url, siteConfig.url).href,
					title: t.title,
					caption: t.imageAlt || meta.alt,
				},
			],
		});
	}

	return entries;
}

/** English blog routes in the primary sitemap (localized posts live in per-locale sitemaps). */
export function getBlogSitemapEntries() {
	return getBlogSitemapEntriesForLocale(defaultLocale);
}

export { getBlogCardImageSrc, getBlogCardImageMeta } from '../page-images';
