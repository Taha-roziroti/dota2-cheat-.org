import { siteConfig } from './site';

/** User-provided Dota 2 gameplay screenshots (6 unique). */
export const PRODUCT_SCREENSHOT_SOURCES = [
	'user:13be2916-8042-448d-8b88-a282c00c22b4.png',
	'user:f422ed6d-143e-434c-88e8-6c492f64d752.png',
	'user:198f0c2b-9d76-4ffb-bb9c-dfde83999fbf.png',
	'user:c43cb5d5-b6f2-4e58-8506-fb591f4a7b51.png',
	'user:1d49a213-56a6-4bdb-878e-655613144c66.png',
	'user:f7f8f852-cfcb-45c2-a5ff-84dc50e6b2c0.png',
] as const;

export const PRODUCT_SCREENSHOT_COUNT = PRODUCT_SCREENSHOT_SOURCES.length;

export type ProductScreenshotMeta = {
	id: number;
	src: string;
	url: string;
	sourceUrl: string;
	sourceKey: string;
	alt: string;
	title: string;
	caption: string;
};

const alts: Record<number, { alt: string; title: string; caption: string }> = {
	1: {
		alt: 'Dota 2 Invoker Sun Strike and EMP combo with purple spell effects in lane',
		title: 'Dota 2 Invoker skillshot assist — Sun Strike',
		caption: 'Dota 2 cheats skillshot assist landing Invoker Sun Strike during ranked combat',
	},
	2: {
		alt: 'Dota 2 Pudge with dodge-assist script text overlay near river bridge',
		title: 'Dota 2 dodge assist on Pudge',
		caption: 'Dota 2 script dodge assist helping Pudge avoid enemy spells in ranked',
	},
	3: {
		alt: 'Dota 2 Shadow Fiend capturing ability lantern with yellow capture ring',
		title: 'Dota 2 Shadow Fiend lantern capture assist',
		caption: 'Dota 2 cheats automation for Shadow Fiend ability lantern capture on PC',
	},
	4: {
		alt: 'Dota 2 Shadow Fiend teleporting to mid tower with script overlay',
		title: 'Dota 2 teleport script to mid tower',
		caption: 'Dota 2 cheats teleport automation for Shadow Fiend rotation on PC',
	},
	5: {
		alt: 'Dota 2 Arc Warden with green ESP box overlay near river',
		title: 'Dota 2 Arc Warden ESP box overlay',
		caption: 'Dota 2 ESP wallhack showing enemy hero box and info near river on PC',
	},
	6: {
		alt: 'Dota 2 Anti-Mage with red targeting ring and ability cooldown tags',
		title: 'Dota 2 Anti-Mage aim assist targeting ring',
		caption: 'Dota 2 aim assist with hero targeting ring and cooldown readouts on PC',
	},
};

export function normalizeScreenshotId(n: number): number {
	return ((n - 1) % PRODUCT_SCREENSHOT_COUNT) + 1;
}

export function screenshotSourceKey(id: number): string {
	return PRODUCT_SCREENSHOT_SOURCES[normalizeScreenshotId(id) - 1]!;
}

export function screenshotsShareSource(a: number, b: number): boolean {
	return screenshotSourceKey(a) === screenshotSourceKey(b);
}

export function screenshotIdFromSrc(src: string): number | undefined {
	const match = src.match(/dota2-screenshot-(\d{2})\.webp/i);
	return match ? parseInt(match[1]!, 10) : undefined;
}

/** Cinematic hero art — homepage banner only; never reuse in galleries or in-game blocks. */
export const HERO_IMAGE_PREFIXES = ['/images/dota2-cheats-hero', '/images/dota2-hero-poster'] as const;

export function isHeroMarketingImage(src: string): boolean {
	return HERO_IMAGE_PREFIXES.some((prefix) => src.startsWith(prefix));
}

export function screenshotSrc(n: number): string {
	const id = normalizeScreenshotId(n);
	return `/images/dota2-screenshot-${String(id).padStart(2, '0')}.webp`;
}

export function absoluteScreenshotUrl(n: number): string {
	return new URL(screenshotSrc(n), siteConfig.url).href;
}

export function getProductScreenshot(n: number): ProductScreenshotMeta {
	const id = normalizeScreenshotId(n);
	const meta = alts[id] ?? {
		alt: `Dota 2 cheats gameplay screenshot ${id}`,
		title: `Dota 2 cheats screenshot ${id}`,
		caption: `Dota 2 cheats screenshot ${id} for Dota 2 Dota 2 on Windows PC`,
	};
	const src = screenshotSrc(id);
	const sourceKey = screenshotSourceKey(id);
	return {
		id,
		src,
		url: new URL(src, siteConfig.url).href,
		sourceUrl: sourceKey,
		sourceKey,
		...meta,
	};
}

/** Pick N screenshots with unique source assets — skips duplicate visuals. */
export function pickUniqueScreenshotIds(options: {
	count: number;
	excludeKeys?: Iterable<string>;
	startOffset?: number;
}): number[] {
	const { count, excludeKeys = [], startOffset = 0 } = options;
	const usedKeys = new Set(excludeKeys);
	const result: number[] = [];

	for (
		let offset = 0;
		result.length < count && offset < PRODUCT_SCREENSHOT_COUNT * 3;
		offset += 1
	) {
		const id = normalizeScreenshotId(startOffset + offset + 1);
		const key = screenshotSourceKey(id);
		if (usedKeys.has(key)) continue;
		usedKeys.add(key);
		result.push(id);
	}

	return result;
}

export const productScreenshots: ProductScreenshotMeta[] = Array.from(
	{ length: PRODUCT_SCREENSHOT_COUNT },
	(_, i) => getProductScreenshot(i + 1),
);

/** JSON-LD ImageObject nodes for gallery / sitemap parity. */
export function screenshotImageObjects(limit = PRODUCT_SCREENSHOT_COUNT) {
	return productScreenshots.slice(0, limit).map((shot) => ({
		'@type': 'ImageObject' as const,
		'@id': `${shot.url}#image`,
		url: shot.url,
		contentUrl: shot.url,
		name: shot.title,
		description: shot.caption,
		thumbnailUrl: shot.url,
	}));
}
