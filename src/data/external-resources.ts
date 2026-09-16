import { brand } from './brand';
import type { PageId } from './i18n/routing';

export type ExternalResource = {
	id: string;
	label: string;
	href: string;
	note?: string;
};

export type GuideCta = {
	label: string;
	href: string;
};

/** Canonical outbound URLs — single source for CTAs, pills, and resource blocks. */
export const externalUrls = {
	steam: brand.gameUrl,
	steamNews: 'https://www.dota2.com/news',
	officialSite: 'https://www.dota2.com/',
	wiki: 'https://dota2.fandom.com/wiki/Dota_2',
	steamCommunity: 'https://www.reddit.com/r/DotA2/',
} as const;

/** Authoritative third-party guides — cite official game sources for readers and search engines. */
export const externalResources: ExternalResource[] = [
	{
		id: 'steam',
		label: 'Dota 2 on PC',
		href: externalUrls.steam,
		note: 'Official store page, system requirements, and player reviews.',
	},
	{
		id: 'patch',
		label: 'Dota 2 patch notes & news',
		href: externalUrls.steamNews,
		note: 'Read official update posts before you change your loadout.',
	},
	{
		id: 'official',
		label: 'Official Dota 2 website',
		href: externalUrls.officialSite,
		note: 'Game overview from Valve.',
	},
	{
		id: 'wiki',
		label: 'Dota 2 Wiki (Fandom)',
		href: externalUrls.wiki,
		note: 'Hero stats, items, and patch history.',
	},
	{
		id: 'community',
		label: 'Dota 2 Community hub',
		href: externalUrls.steamCommunity,
		note: 'Announcements and community discussions.',
	},
];

/** Compact above-the-fold guide links for blogs and page banners. */
export const featuredGuidePills: GuideCta[] = [
	{ label: 'Dota 2 on PC', href: externalUrls.steam },
	{ label: 'Official patch notes', href: externalUrls.steamNews },
	{ label: 'Dota 2 Wiki', href: externalUrls.wiki },
];

/**
 * Secondary banner buttons that should point to official guides — not internal sales pages.
 * Keeps primary Buy CTAs while giving Google clear outbound citations.
 */
export const externalSecondaryByPageId: Partial<Record<PageId, GuideCta>> = {
	features: { label: 'Official patch notes', href: externalUrls.steamNews },
	updates: { label: 'Dota 2 patch notes', href: externalUrls.steamNews },
	hacks: { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	'dota2-esp': { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	'dota2-aimbot': { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	radar: { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	setup: { label: 'Official game site', href: externalUrls.officialSite },
	support: { label: 'Dota 2 community', href: externalUrls.steamCommunity },
	faq: { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	reliable: { label: 'Dota 2 patch notes', href: externalUrls.steamNews },
	wallhack: { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	vac: { label: 'Official patch notes', href: externalUrls.steamNews },
	'cheats-2026': { label: 'Dota 2 on PC', href: externalUrls.steam },
	'cheat-download': { label: 'Official game site', href: externalUrls.officialSite },
	'mod-menu': { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	'soft-aim': { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	'best-cheats': { label: 'Dota 2 community', href: externalUrls.steamCommunity },
	'aimbot-hack': { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	'esp-hack': { label: 'Dota 2 Wiki', href: externalUrls.wiki },
	'unlock-all': { label: 'Official game site', href: externalUrls.officialSite },
	pricing: { label: 'Dota 2 on PC', href: externalUrls.steam },
};

export function getExternalSecondaryCta(pageId: PageId): GuideCta | undefined {
	return externalSecondaryByPageId[pageId];
}

export function isExternalHref(href: string): boolean {
	return href.startsWith('http');
}
