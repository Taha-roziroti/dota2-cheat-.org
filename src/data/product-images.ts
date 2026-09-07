import { siteConfig } from './site';

/** User-provided Warzone gameplay screenshots (8 unique). */
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
		alt: 'Warzone ESP box overlay at Train Wreck with Peacekeeper Mk2 and 36m distance tag',
		title: 'Warzone ESP box and distance at Train Wreck',
		caption: 'Warzone ESP wallhack with player box, distance readout and aimbot FOV indicator on PC',
	},
	2: {
		alt: 'Warzone player ESP skeleton overlay at Coal Depot with multiple distance markers in gas zone',
		title: 'Warzone skeleton ESP at Coal Depot',
		caption: 'Warzone wallhack showing enemy skeletons, red boxes and distance ESP through gas',
	},
	3: {
		alt: 'Warzone aimbot box ESP on Main Street rooftop with AR-27 and 23m distance tag',
		title: 'Warzone aimbot and box ESP on Main Street',
		caption: 'Warzone cheats box ESP with aimbot lock, visibility check and distance tags on PC',
	},
	4: {
		alt: 'Warzone ESP distance markers through scope on Main Street with AK-27 33 rounds',
		title: 'Warzone scope ESP and distance tags',
		caption: 'Warzone ESP distance markers and aimbot target box during Battle Royale combat',
	},
	5: {
		alt: 'Warzone wallhack box ESP through scope with red hitmarker on Main Street 24m',
		title: 'Warzone wallhack scope targeting',
		caption: 'Warzone wallhack player box ESP and aimbot crosshair overlay on rooftop fight',
	},
	6: {
		alt: 'Warzone ESP box overlay on Fast Forward alley with D520 Mirage and 113m tag',
		title: 'Warzone ESP box on Fast Forward',
		caption: 'Warzone player ESP with distance tags and visible/invisible counter in gas zone',
	},
	7: {
		alt: 'Warzone item ESP showing cash armor plates and loot tags inside bank vault',
		title: 'Warzone item ESP and loot tags',
		caption: 'Warzone item ESP showing cash, armor plates, beacons and loot through walls on PC',
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
	const match = src.match(/warzone-screenshot-(\d{2})\.webp/i);
	return match ? parseInt(match[1]!, 10) : undefined;
}

/** Cinematic hero art — homepage banner only; never reuse in galleries or in-game blocks. */
export const HERO_IMAGE_PREFIXES = ['/images/warzone-cheats-hero', '/images/warzone-hero-poster'] as const;

export function isHeroMarketingImage(src: string): boolean {
	return HERO_IMAGE_PREFIXES.some((prefix) => src.startsWith(prefix));
}

export function screenshotSrc(n: number): string {
	const id = normalizeScreenshotId(n);
	return `/images/warzone-screenshot-${String(id).padStart(2, '0')}.webp`;
}

export function absoluteScreenshotUrl(n: number): string {
	return new URL(screenshotSrc(n), siteConfig.url).href;
}

export function getProductScreenshot(n: number): ProductScreenshotMeta {
	const id = normalizeScreenshotId(n);
	const meta = alts[id] ?? {
		alt: `Warzone cheats gameplay screenshot ${id}`,
		title: `Warzone cheats screenshot ${id}`,
		caption: `Warzone cheats screenshot ${id} for Call of Duty Warzone on Windows PC`,
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
