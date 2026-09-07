import { fillBrandTokens } from './brand';
import type { PageId } from './i18n/routing';

/** Internal link target — canonical PageId routes or fixed EN paths (blog/reviews). */
export type InternalLinkTarget =
	| { kind: 'page'; pageId: PageId; labelKey: string; label?: string }
	| { kind: 'path'; path: string; labelKey: string; label?: string };

function L(label: string): string {
	return fillBrandTokens(label);
}

/** Topics rival {game} cheat sites cover — mapped to our canonical pages. */
const TOPIC_LINKS = {
	overview: { kind: 'page' as const, pageId: 'home' as const, labelKey: 'internalLinks.overview', label: L('{brand} overview') },
	esp: { kind: 'page' as const, pageId: 'warzone-esp' as const, labelKey: 'internalLinks.esp', label: L('{game} ESP & wallhack') },
	aimbot: { kind: 'page' as const, pageId: 'warzone-aimbot' as const, labelKey: 'internalLinks.aimbot', label: L('{game} aimbot & soft aim') },
	radar: { kind: 'page' as const, pageId: 'radar' as const, labelKey: 'internalLinks.radar', label: L('{game} radar hack') },
	features: { kind: 'page' as const, pageId: 'features' as const, labelKey: 'internalLinks.features', label: L('Full {game} feature list') },
	pricing: { kind: 'page' as const, pageId: 'pricing' as const, labelKey: 'internalLinks.pricing', label: 'Store & pricing' },
	setup: { kind: 'page' as const, pageId: 'setup' as const, labelKey: 'internalLinks.setup', label: L('{game} setup guide') },
	status: { kind: 'page' as const, pageId: 'updates' as const, labelKey: 'internalLinks.status', label: L('Live {game} status') },
	faq: { kind: 'page' as const, pageId: 'faq' as const, labelKey: 'internalLinks.faq', label: L('{game} cheats FAQ') },
	support: { kind: 'page' as const, pageId: 'support' as const, labelKey: 'internalLinks.support', label: L('{brand} support') },
	blog: { kind: 'path' as const, path: '/blog/', labelKey: 'internalLinks.blog', label: L('{game} Intel blog') },
	reviews: { kind: 'path' as const, path: '/reviews/', labelKey: 'internalLinks.reviews', label: L('{brand} buyer reviews') },
	hacks: { kind: 'page' as const, pageId: 'hacks' as const, labelKey: 'internalLinks.hacks', label: L('{primaryKeyword} pillar') },
	undetected: {
		kind: 'page' as const,
		pageId: 'undetected' as const,
		labelKey: 'internalLinks.undetected',
		label: L('Undetected {game} cheats'),
	},
	ricochet: {
		kind: 'page' as const,
		pageId: 'ricochet' as const,
		labelKey: 'internalLinks.ricochet',
		label: L('{antiCheat} bypass guide'),
	},
} satisfies Record<string, InternalLinkTarget>;

/** Per-page related internal links (exclude self where noted in component). */
export const relatedLinksByPageId: Partial<Record<PageId, InternalLinkTarget[]>> = {
	home: [
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.radar,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
		TOPIC_LINKS.faq,
		TOPIC_LINKS.blog,
		TOPIC_LINKS.reviews,
	],
	hacks: [
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.radar,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
	],
	'warzone-esp': [
		TOPIC_LINKS.overview,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.radar,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
		TOPIC_LINKS.blog,
	],
	'warzone-aimbot': [
		TOPIC_LINKS.overview,
		TOPIC_LINKS.esp,
		TOPIC_LINKS.radar,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
		TOPIC_LINKS.reviews,
	],
	radar: [
		TOPIC_LINKS.overview,
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
	],
	features: [
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.radar,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
		TOPIC_LINKS.faq,
		TOPIC_LINKS.blog,
	],
	pricing: [
		TOPIC_LINKS.overview,
		TOPIC_LINKS.features,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
		TOPIC_LINKS.faq,
		TOPIC_LINKS.support,
		TOPIC_LINKS.reviews,
	],
	setup: [
		TOPIC_LINKS.overview,
		TOPIC_LINKS.features,
		TOPIC_LINKS.status,
		TOPIC_LINKS.faq,
		TOPIC_LINKS.support,
		TOPIC_LINKS.pricing,
	],
	updates: [
		TOPIC_LINKS.overview,
		TOPIC_LINKS.features,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.faq,
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.blog,
	],
	faq: [
		TOPIC_LINKS.overview,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
		TOPIC_LINKS.support,
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
	],
	support: [
		TOPIC_LINKS.faq,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.status,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.overview,
	],
	privacy: [TOPIC_LINKS.overview, TOPIC_LINKS.support, TOPIC_LINKS.faq],
	refund: [TOPIC_LINKS.pricing, TOPIC_LINKS.support, TOPIC_LINKS.faq],
	terms: [TOPIC_LINKS.overview, TOPIC_LINKS.support, TOPIC_LINKS.faq],
	undetected: [
		TOPIC_LINKS.ricochet,
		TOPIC_LINKS.status,
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.faq,
	],
	ricochet: [
		TOPIC_LINKS.undetected,
		TOPIC_LINKS.status,
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.faq,
	],
	'cheats-2026': [
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.undetected,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.status,
		TOPIC_LINKS.blog,
	],
	'best-cheats': [
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.undetected,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.reviews,
		TOPIC_LINKS.status,
	],
};

/** Product-topic links for blog posts, FAQ answers, and reviews. */
export const productTopicLinks: InternalLinkTarget[] = [
	TOPIC_LINKS.overview,
	TOPIC_LINKS.hacks,
	TOPIC_LINKS.esp,
	TOPIC_LINKS.aimbot,
	TOPIC_LINKS.radar,
	TOPIC_LINKS.features,
	TOPIC_LINKS.pricing,
	TOPIC_LINKS.setup,
	TOPIC_LINKS.status,
];

/** Pillar links for the public blog index. */
export const blogIndexTopicLinks: InternalLinkTarget[] = [
	TOPIC_LINKS.hacks,
	TOPIC_LINKS.esp,
	TOPIC_LINKS.aimbot,
	TOPIC_LINKS.radar,
	TOPIC_LINKS.features,
	TOPIC_LINKS.pricing,
	TOPIC_LINKS.setup,
	TOPIC_LINKS.status,
	TOPIC_LINKS.reviews,
];

/** Topic-relevant product links keyed by blog post category. */
const blogCategoryLinks: Record<string, InternalLinkTarget[]> = {
	Aimbot: [
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.esp,
		TOPIC_LINKS.radar,
		TOPIC_LINKS.features,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.status,
	],
	ESP: [
		TOPIC_LINKS.esp,
		TOPIC_LINKS.radar,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.features,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.pricing,
	],
	Undetected: [
		TOPIC_LINKS.undetected,
		TOPIC_LINKS.ricochet,
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.status,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.faq,
		TOPIC_LINKS.status,
	],
	Comparisons: [
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.reviews,
	],
	'Cheats Guide': [
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.features,
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.faq,
		TOPIC_LINKS.status,
	],
	'Buyers Guide': [
		TOPIC_LINKS.pricing,
		TOPIC_LINKS.reviews,
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.features,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.faq,
	],
	'Product Updates': [
		TOPIC_LINKS.status,
		TOPIC_LINKS.features,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.faq,
	],
	'Patch Notes': [
		TOPIC_LINKS.status,
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.setup,
		TOPIC_LINKS.features,
		TOPIC_LINKS.faq,
	],
	Competitive: [
		TOPIC_LINKS.esp,
		TOPIC_LINKS.aimbot,
		TOPIC_LINKS.radar,
		TOPIC_LINKS.features,
		TOPIC_LINKS.hacks,
		TOPIC_LINKS.pricing,
	],
};

const gameplayIntelCategories = new Set([
	'Cosmetics',
	'Weapons',
	'Weapon drops Runs',
	'Weapon drops Routes',
	'Settings',
	'Warmup',
]);

const gameplayIntelLinks: InternalLinkTarget[] = [
	TOPIC_LINKS.hacks,
	TOPIC_LINKS.esp,
	TOPIC_LINKS.aimbot,
	TOPIC_LINKS.features,
	TOPIC_LINKS.status,
	TOPIC_LINKS.pricing,
];

export function getTopicLinksForBlogCategory(category: string): InternalLinkTarget[] {
	if (blogCategoryLinks[category]) {
		return blogCategoryLinks[category];
	}
	if (gameplayIntelCategories.has(category)) {
		return gameplayIntelLinks;
	}
	return productTopicLinks;
}

const DEFAULT_LINKS = relatedLinksByPageId.home ?? [];

export function getRelatedLinks(pageId: PageId | undefined): InternalLinkTarget[] {
	if (!pageId) return DEFAULT_LINKS;
	return relatedLinksByPageId[pageId] ?? DEFAULT_LINKS;
}
