import { siteConfig } from './site';

/** User-provided Dota 2 gameplay screenshots (8 unique). */
export const PRODUCT_SCREENSHOT_SOURCES = [
	'user:291e026c-07bb-4e4a-8d62-c8c7a5b14965.png',
	'user:c5bc12a4-9b23-4840-8448-df2ee6f7c971.png',
	'user:bf7d564f-2f04-4bf0-9f10-db7f1fa87582.png',
	'user:d84e536f-9f6f-436c-bda8-6678d53a7f8e.png',
	'user:8596860c-50cf-4fa0-a494-0bde8111ef64.png',
	'user:056e390b-6eef-4749-9205-83d66710a362.png',
	'user:05a7f39c-e076-43b9-8aac-05851b338275.png',
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
		alt: 'Dota 2 Juggernaut Bladeform Legacy hero art with purple arcane glow',
		title: 'Dota 2 cheats hero showcase — Juggernaut arcana',
		caption: 'Dota 2 cheats cinematic hero preview with ESP and maphack overlays on PC',
	},
	2: {
		alt: 'Dota 2 hero ESP overlay with health bars and team colour tags in lane',
		title: 'Dota 2 hero ESP in ranked match',
		caption: 'Dota 2 wallhack showing enemy heroes, distance readouts and ward vision on PC',
	},
	3: {
		alt: 'Dota 2 skillshot assist targeting enemy mid with trajectory preview',
		title: 'Dota 2 skillshot assist and aimbot lock',
		caption: 'Dota 2 cheats skillshot assist with visibility check during ranked combat',
	},
	4: {
		alt: 'Dota 2 maphack minimap overlay with enemy positions and rune timers',
		title: 'Dota 2 maphack and radar overlay',
		caption: 'Dota 2 radar hack with hero positions, ward spots and bounty rune tags',
	},
	5: {
		alt: 'Dota 2 ward vision ESP through trees and fog of war',
		title: 'Dota 2 ward vision through fog',
		caption: 'Dota 2 maphack ward vision and hero ESP overlay in jungle skirmish',
	},
	6: {
		alt: 'Dota 2 Roshan pit ESP with timer and enemy hero boxes',
		title: 'Dota 2 Roshan pit ESP overlay',
		caption: 'Dota 2 player ESP with distance tags and Roshan timer in ranked',
	},
	7: {
		alt: 'Dota 2 item ESP showing bounty runes, wards and courier through fog',
		title: 'Dota 2 item ESP and rune tags',
		caption: 'Dota 2 item ESP showing bounty runes, wards and courier through fog on PC',
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
