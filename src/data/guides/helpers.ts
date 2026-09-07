import { siteConfig } from '../site';
import type { GuideDefinition, ResolvedGuide } from './types';
import { guides as rawGuides } from './guides.generated';

export const guides: GuideDefinition[] = rawGuides;

export function getGuidesBasePath(): string {
	return '/guides/';
}

export function resolveGuide(guide: GuideDefinition): ResolvedGuide {
	return {
		...guide,
		canonicalPath: `/guides/${guide.slug}/`,
	};
}

/** All dedicated guide articles — hub only (excluded from main blog). */
export function getAllGuides(): ResolvedGuide[] {
	return guides.map(resolveGuide);
}

export function getAllGuidesRaw(): ResolvedGuide[] {
	return getAllGuides();
}

export function getGuideBySlug(slug: string): ResolvedGuide | undefined {
	const guide = guides.find((g) => g.slug === slug);
	return guide ? resolveGuide(guide) : undefined;
}

export function getGuidesByGame(): Map<string, ResolvedGuide[]> {
	const map = new Map<string, ResolvedGuide[]>();
	for (const guide of getAllGuides()) {
		const list = map.get(guide.game) ?? [];
		list.push(guide);
		map.set(guide.game, list);
	}
	return new Map([...map.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

/** Interleave guides from each game so same-game articles are not grouped together. */
export function getMixedGuides(): ResolvedGuide[] {
	const byGame = [...getGuidesByGame().values()];
	const mixed: ResolvedGuide[] = [];
	let index = 0;
	let hasMore = true;

	while (hasMore) {
		hasMore = false;
		for (const guidesForGame of byGame) {
			if (index < guidesForGame.length) {
				mixed.push(guidesForGame[index]);
				hasMore = true;
			}
		}
		index++;
	}

	return mixed;
}

export function absoluteGuideUrl(slug?: string): string {
	const base = `${siteConfig.url}${getGuidesBasePath()}`;
	return slug ? `${siteConfig.url}/guides/${slug}/` : base;
}

export function isWarzoneGuide(guide: Pick<GuideDefinition, 'game'>): boolean {
	return guide.game.toLowerCase() === 'warzone';
}

export type GuideSitemapEntry = {
	path: string;
	lastmod: string;
	changefreq: 'weekly' | 'monthly';
	priority: number;
	images: { url: string; title: string; caption: string }[];
};

/** Guides hub + posts for sitemap-en.xml (omits legacy-brand competitor pages). */
const LEGACY_GUIDE_SLUGS = new Set([
	'the-finals-thefinalscheats-org-guide',
	'the-finals-thefinalscheats-net-guide',
]);

export function getGuidesSitemapEntries(): GuideSitemapEntry[] {
	const hub: GuideSitemapEntry = {
		path: getGuidesBasePath(),
		lastmod: '2026-09-05',
		changefreq: 'weekly',
		priority: 0.75,
		images: [],
	};

	const posts = getAllGuides()
		.filter((guide) => !LEGACY_GUIDE_SLUGS.has(guide.slug))
		.map((guide) => ({
			path: guide.canonicalPath,
			lastmod: guide.updated,
			changefreq: 'monthly' as const,
			priority: isWarzoneGuide(guide) ? 0.7 : 0.55,
			images: guide.imageUrl
				? [
						{
							url: guide.imageUrl.startsWith('http')
								? guide.imageUrl
								: new URL(guide.imageUrl, siteConfig.url).href,
							title: guide.title,
							caption: guide.metaDescription,
						},
					]
				: [],
		}));

	return [hub, ...posts];
}
