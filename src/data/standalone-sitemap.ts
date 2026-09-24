import { absolutePageUrl } from './page-sitemap';

export type StandaloneSitemapEntry = {
	path: string;
	lastmod: string;
	changefreq: 'weekly' | 'monthly' | 'yearly';
	priority: number;
};

/** English-only marketing pages outside the i18n PageId system. */
export const standaloneEnSitemapEntries: StandaloneSitemapEntry[] = [
	{
		path: '/about/',
		lastmod: '2026-08-25',
		changefreq: 'monthly',
		priority: 0.65,
	},
	{
		path: '/compare/',
		lastmod: '2026-08-25',
		changefreq: 'weekly',
		priority: 0.88,
	},
	{
		path: '/write-for-us/',
		lastmod: '2026-08-25',
		changefreq: 'yearly',
		priority: 0.5,
	},
	{
		path: '/affiliate-disclosure/',
		lastmod: '2026-09-24',
		changefreq: 'yearly',
		priority: 0.45,
	},
];

export function absoluteStandaloneUrl(path: string): string {
	return absolutePageUrl(path);
}
