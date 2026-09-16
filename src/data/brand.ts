/**
 * SINGLE SOURCE OF TRUTH for template rebrands.
 * Employees: use Brand Studio at http://localhost:4321/brand-studio/ during `astro dev`.
 * Do not scatter brand strings across components.
 */
export const brand = {
	/** Public brand name (nav, footer, H1 hero, schema Organization) */
	name: 'Dota 2 Cheats',
	/** Short product label if needed */
	shortName: 'Dota 2 Cheats',
	/** Canonical origin — no trailing slash */
	url: 'https://dota2cheat.com',
	locale: 'en',
	market: 'Worldwide',
	supportEmail: 'support@dota2cheat.com',
	/** Replace with your live affiliate / store URL */
	checkoutUrl: 'https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fdota-2',

	/** Public profiles for Organization sameAs + Twitter cards (edit in Brand Studio). */
	social: {
		twitterSite: '@DOTA2',
		sameAs: [
			'https://x.com/DOTA2',
			'https://www.reddit.com/r/DotA2/',
			'https://www.dota2.com/',
		],
	} as const,

	/** Game this template instance targets */
	game: 'Dota 2',
	/** Official game page — linked from hero and footer */
	gameUrl: 'https://www.dota2.com/',
	/** Anti-cheat name used in Status / FAQ copy */
	antiCheat: 'VAC',

	logo: '/images/dota2-cheats-logo.webp',
	logoRaster: '/images/dota2-cheats-logo.png',
	logoRasterWidth: 512,
	logoRasterHeight: 512,
	logoAlt: 'Dota 2 cheats site icon — ESP, aimbot and maphack tools for PC',
	defaultOgImage: '/images/dota2-screenshot-05.webp',
	heroImage: '/images/dota2-cheats-hero.webp',
	heroVideoUrl: '',
	heroVideoMp4: '/videos/Dota2-Hero.mp4',
	demoVideoPoster: '/images/dota2-cheats-hero.webp',
	demoScreenshot: '/images/dota2-screenshot-01.webp',

	plans: [
		{ id: 'monthly', label: 'Monthly', price: 35, duration: 'P30D' },
		{ id: 'lifetime', label: 'Lifetime', price: 150, duration: 'P99Y' },
	] as const,
	currency: 'USD',
	platforms: ['Windows PC'] as const,

	/** Dota 2 dark purple canvas */
	theme: {
		accent: '#8B5CF6',
		bg: '#0D0A14',
		soft: '#A78BFA',
		deep: '#6D28D9',
		hover: '#C4B5FD',
		panel: '#0F0C18',
		elevated: '#0F0C19',
		line: '#1A1525',
		ink: '#F5F5F5',
		inkHeading: '#FFFFFF',
		inkSecondary: '#D4D4D8',
		inkMuted: '#A1A1AA',
		link: '#A78BFA',
	},

	keywords: {
		primary: 'dota 2 cheats',
		list: [
			'dota 2 cheats',
			'dota 2 cheat',
			'dota 2 hacks',
			'dota 2 hack',
			'dota 2 esp',
			'dota 2 aimbot',
			'dota 2 wallhack',
			'dota 2 maphack',
			'dota 2 scripts',
			'dota 2 overlay',
			'dota 2 radar hack',
			'dota 2 camera hack',
			'dota 2 auto last hit',
			'dota 2 skillshot assist',
			'dota 2 cheats pc',
			'dota 2 cheats 2026',
			'best dota 2 cheats',
			'dota 2 mod menu',
			'dota 2 combo script',
			'dota 2 ward hack',
		] as const,
	},

	seo: {
		homeTitle: 'Dota 2 Esp, Aimbot & Wallhack',
		homeDescription:
			'Dota 2 cheats with ESP, aimbot and wallhack for ranked and casual matches on PC. Hero vision, map overlays, skillshot assist, and VAC maintenance after patches.',
		featuresTitle: 'Dota 2 Cheats Features | ESP, Aimbot & Maphack',
		featuresDescription:
			'Full dota 2 cheats feature list — hero ESP, ward vision, maphack, skillshot assist, auto last hit, camera distance, and config profiles for PC.',
		storeTitle: 'Dota 2 Cheats Pricing | $35/mo or $150 Lifetime',
		storeDescription:
			'Buy dota 2 cheats — $35/month or $150 lifetime. ESP, aimbot and maphack for ranked matches on PC. Instant digital delivery worldwide.',
		statusTitle: 'Dota 2 Cheats Status | VAC Patch Updates',
		statusDescription:
			'Live status after {game} and {antiCheat} patches. Check ESP, aimbot and maphack rebuilds on PC before you queue ranked.',
		previewTitle: 'Dota 2 Cheats | ESP, Aimbot & Wallhack Guide',
		previewDescription:
			'Dota 2 cheats guide — ESP maphack, skillshot assist, radar overlays and {antiCheat} rebuilds for ranked on PC. Plans from $35 at dota2cheat.com.',
		setupTitle: 'Dota 2 Cheats Setup | Windows PC Install Guide',
		setupDescription:
			'Install {brand} on PC — activate ESP, aimbot and maphack step by step. Check {antiCheat} status before your first ranked match.',
		supportTitle: 'Dota 2 Cheats Support | License & Setup Help',
		supportDescription:
			'Support for license delivery, ESP setup and billing on PC. Email {email} with your order ID before you queue.',
		faqTitle: 'Dota 2 Cheats FAQ | ESP, Aimbot & VAC',
		faqDescription:
			'FAQ for dota 2 cheats — delivery, setup, ranked use, {antiCheat} updates and pricing on PC. Answers at dota2cheat.com before you buy.',
		reviewsTitle: 'Dota 2 Cheats Reviews | ESP, Aimbot & Maphack',
		reviewsDescription:
			'Real buyer reviews for dota 2 cheats — ESP, aimbot, maphack and {antiCheat} maintenance on PC. See license holder feedback at dota2cheat.com.',
		blogTitle: 'Dota 2 Cheats Forums | Setup Tips & Feature Talk',
		blogDescription:
			'Dota 2 cheats forums — setup walkthroughs, ESP settings, aimbot sliders, and VAC patch notes for PC. Join discussions at dota2cheat.com/forums/.',
	},

	copy: {
		tagline: '{primaryKeyword} — ESP, aimbot, and maphack for PC',
		summary:
			'{brand} is a {game} cheats package for Windows PC. Includes ESP, aimbot, maphack, ward vision, and skillshot assist with {antiCheat} maintenance after patches.',
		heroLede: 'ESP, aimbot, and maphack for Dota 2 on Windows PC.',
		blogLabel: 'Community Forums',
		ctaBuy: 'Get Access',
		ctaBuyShort: 'Buy',
		featuresIntro: 'Every ESP, maphack, skillshot assist, radar, and config control included in one license for {game} on Windows PC.',
		storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
		statusIntro: 'Check here after a {game} or {antiCheat} patch before you queue.',
		previewIntro:
			'{brand} for Dota 2 — ESP maphack, skillshot assist, ward vision, radar overlays, and VAC rebuilds after patches.',
		setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
		supportIntro: 'Need help with {brand}? Email {email} with your order ID.',
		faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
		reviewsIntro:
			'Real feedback on dota 2 cheats — ESP, aimbot, maphack, and support from {brand} buyers.',
		chipEsp: 'ESP / maphack',
		chipAim: 'Skillshot assist',
		chipRadar: 'Radar overlay',
		chipUpdates: 'Patch updates',
		navHome: 'Home',
		navPreview: 'Cheats',
		navFeatures: 'Features',
		navStore: 'Store',
		navStatus: 'Status',
		navReviews: 'Reviews',
	},

	sitemap: {
		contentLastmod: '2026-09-16',
		blogImageTitle: '{brand} forums',
		blogImageCaption: 'Community discussions for {primaryKeyword}',
		reviewsImageTitle: '{brand} reviews',
		reviewsImageCaption: 'Dota 2 cheats reviews — what buyers say about {primaryKeyword}',
		images: [
			{
				src: '/images/dota2-screenshot-01.webp',
				title: 'Dota 2 Invoker Sun Strike skillshot assist',
				caption: 'Dota 2 cheats skillshot assist landing Invoker Sun Strike during ranked combat',
			},
			{
				src: '/images/dota2-screenshot-02.webp',
				title: 'Dota 2 Pudge dodge assist script',
				caption: 'Dota 2 script dodge assist helping Pudge avoid enemy spells in ranked',
			},
			{
				src: '/images/dota2-screenshot-03.webp',
				title: 'Dota 2 Shadow Fiend lantern capture assist',
				caption: 'Dota 2 cheats automation for Shadow Fiend ability lantern capture on PC',
			},
			{
				src: '/images/dota2-screenshot-04.webp',
				title: 'Dota 2 Shadow Fiend teleport script',
				caption: 'Dota 2 cheats teleport automation for Shadow Fiend rotation on PC',
			},
			{
				src: '/images/dota2-screenshot-05.webp',
				title: 'Dota 2 Arc Warden ESP box overlay',
				caption: 'Dota 2 ESP wallhack showing enemy hero box and info near river on PC',
			},
			{
				src: '/images/dota2-screenshot-06.webp',
				title: 'Dota 2 Anti-Mage aim assist targeting ring',
				caption: 'Dota 2 aim assist with hero targeting ring and cooldown readouts on PC',
			},
		],
	},
} as const;

export type Brand = typeof brand;

export function fillBrandTokens(input: string): string {
	return input
		.replaceAll('{brand}', brand.name)
		.replaceAll('{game}', brand.game)
		.replaceAll('{antiCheat}', brand.antiCheat)
		.replaceAll('{email}', brand.supportEmail)
		.replaceAll('{primaryKeyword}', brand.keywords.primary)
		.replaceAll('{checkout}', brand.checkoutUrl);
}

export function seoTitle(topic: string): string {
	const title = `${brand.game} ${topic} | ${brand.name}`;
	return title.length <= 60 ? title : `${topic} | ${brand.name}`;
}

export function seoDescription(template: string): string {
	let text = fillBrandTokens(template).trim();
	if (text.length < 140) {
		const pad = text.toLowerCase().includes('dota2cheat.com')
			? ' Windows PC license with VAC maintenance after patches.'
			: ' Compare plans and forums at dota2cheat.com.';
		text = `${text.replace(/[.…]+$/, '')}.${pad}`;
	}
	if (text.length <= 160) return text;
	const trimmed = text.slice(0, 160);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 130 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 160);
}

export function homeSeo() {
	return {
		title: fillBrandTokens(brand.seo.homeTitle),
		description: seoDescription(brand.seo.homeDescription),
	};
}
