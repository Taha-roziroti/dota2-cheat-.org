/**
 * SINGLE SOURCE OF TRUTH for template rebrands.
 * Employees: use Brand Studio at http://localhost:4321/brand-studio/ during `astro dev`.
 * Do not scatter brand strings across components.
 */
export const brand = {
	/** Public brand name (nav, footer, H1 hero, schema Organization) */
	name: 'Warzone Cheats',
	/** Short product label if needed */
	shortName: 'Warzone Cheats',
	/** Canonical origin — no trailing slash */
	url: 'https://cheatsforwarzone.com',
	locale: 'en',
	market: 'Worldwide',
	supportEmail: 'support@cheatsforwarzone.com',
	checkoutUrl: 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fwarzone',

	/** Public profiles for Organization sameAs + Twitter cards (edit in Brand Studio). */
	social: {
		twitterSite: '@CallofDuty',
		sameAs: [
			'https://x.com/CallofDuty',
			'https://www.reddit.com/r/Warzone/',
			'https://www.callofduty.com/warzone',
		],
	} as const,

	/** Game this template instance targets */
	game: 'Call of Duty: Warzone',
	/** Official game page — linked from hero and footer */
	gameUrl: 'https://www.callofduty.com/warzone',
	/** Anti-cheat name used in Status / FAQ copy */
	antiCheat: 'Ricochet',

	logo: '/images/warzone-cheats-logo.webp',
	logoRaster: '/images/warzone-cheats-logo.png',
	logoRasterWidth: 512,
	logoRasterHeight: 512,
	logoAlt: 'Call of Duty wordmark — Warzone cheats site icon for ESP aimbot and wallhack on PC',
	defaultOgImage: '/images/warzone-screenshot-03.webp',
	heroImage: '/images/warzone-cheats-hero.webp',
	/** Cinematic hero loop — homepage hero banner only */
	heroVideoUrl: '/videos/hero.webm',
	heroVideoMp4: '',
	demoVideoPoster: '/images/warzone-hero-poster.webp',
	/** In-game ESP screenshot for homepage about block — never the cinematic hero art. */
	demoScreenshot: '/images/warzone-screenshot-02.webp',

	plans: [
		{ id: 'monthly', label: 'Monthly', price: 35, duration: 'P30D' },
		{ id: 'lifetime', label: 'Lifetime', price: 150, duration: 'P99Y' },
	] as const,
	currency: 'USD',
	platforms: ['Windows PC'] as const,

	/** COD Warzone palette — charcoal canvas, white ink, amber CTA accent */
	theme: {
		accent: '#FF9D00',
		bg: '#0D0D0D',
		soft: '#FFB84D',
		deep: '#CC7A00',
		hover: '#FFAD33',
		panel: '#1A1A1A',
		elevated: '#242424',
		line: '#333333',
		ink: '#F5F5F5',
		inkHeading: '#FFFFFF',
		inkSecondary: '#D4D4D8',
		inkMuted: '#A1A1AA',
		link: '#FF9D00',
	},

	keywords: {
		primary: 'warzone cheats',
		list: [
			'warzone cheats',
			'warzone cheat',
			'warzone hacks',
			'warzone hack',
			'cod warzone cheats',
			'cod warzone hacks',
			'call of duty warzone cheats',
			'call of duty warzone hacks',
			'warzone aimbot',
			'warzone esp',
			'warzone wallhack',
			'warzone triggerbot',
			'warzone radar hack',
			'warzone no recoil',
			'warzone mod menu',
			'warzone cheat software',
			'warzone cheats pc',
			'warzone cheats 2026',
			'undetected warzone cheats',
			'best warzone cheats',
			'warzone unlock tool',
			'warzone soft aim',
			'warzone silent aim',
		] as const,
	},

	seo: {
		homeTitle: 'Warzone Esp, Aimbot & Wallhack',
		homeDescription:
			'Warzone cheats with ESP, aimbot and wallhack for Battle Royale on PC. Undetected player ESP, loot tags, soft aim, and radar with Ricochet maintenance.',
		featuresTitle: 'Warzone Cheats Features | ESP, Aimbot & Wallhack',
		featuresDescription:
			'Full warzone cheats feature list — aimbot sliders, player ESP, bots ESP, item ESP, radar, color options, and config profiles for PC. See every control at cheatsforwarzone.com.',
		storeTitle: 'Warzone Cheats Pricing | $35/mo or $150 Lifetime',
		storeDescription:
			'Buy warzone cheats — $35/month or $150 lifetime. ESP, aimbot and wallhack for Battle Royale on PC. Instant digital delivery worldwide.',
		statusTitle: 'Warzone Cheats Status | Undetected {antiCheat} Updates',
		statusDescription:
			'Live status after {game} and {antiCheat} patches. Check undetected ESP, aimbot and wallhack rebuilds on PC before you drop into Verdansk.',
		previewTitle: 'Warzone Cheats | ESP, Aimbot & Wallhack Guide',
		previewDescription:
			'Warzone cheats guide — undetected ESP wallhack, aimbot, radar and {antiCheat} rebuilds for Battle Royale on PC. Buy from $35 at cheatsforwarzone.com.',
		setupTitle: 'Warzone Cheats Setup | Windows PC Install Guide',
		setupDescription:
			'Install {brand} on PC — activate ESP, aimbot and wallhack step by step. Check {antiCheat} status before your first Battle Royale match.',
		supportTitle: 'Warzone Cheats Support | License & Setup Help',
		supportDescription:
			'Support for license delivery, ESP setup and billing on PC. Email {email} with your order ID before you queue.',
		faqTitle: 'Warzone Cheats FAQ | ESP, Aimbot & Ricochet',
		faqDescription:
			'FAQ for warzone cheats — delivery, setup, Battle Royale use, {antiCheat} updates and pricing on PC. Answers at cheatsforwarzone.com before you buy.',
		reviewsTitle: 'Warzone Cheats Reviews | ESP, Aimbot & Wallhack',
		reviewsDescription:
			'Real buyer reviews for warzone cheats — ESP, aimbot, wallhack and {antiCheat} maintenance on PC. See license holder feedback at cheatsforwarzone.com.',
		blogTitle: 'Warzone Cheats Blog | Guides & Patch Tips',
		blogDescription:
			'Warzone guides — Battle Royale tips, ESP and aimbot notes, loot callouts and {antiCheat} updates for PC. Read guides at cheatsforwarzone.com/blog.',
	},

	copy: {
		tagline: 'Undetected {primaryKeyword} — ESP, aimbot, and wallhack for PC',
		summary:
			'{brand} is an undetected {game} cheats package for Windows PC. Includes ESP, aimbot, wallhack, item ESP, and radar with {antiCheat} maintenance after patches.',
		heroLede: 'Undetected ESP, aimbot, and wallhack for Call of Duty: Warzone on Windows PC.',
		blogLabel: 'Warzone Intel',
		ctaBuy: 'Get Access',
		ctaBuyShort: 'Buy',
		featuresIntro: 'Every aimbot, ESP, item, radar, and config control included in one license for {game} on Windows PC.',
		storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
		statusIntro: 'Check here after a {game} or {antiCheat} patch before you drop in.',
		previewIntro:
			'{brand} for Call of Duty: Warzone — ESP wallhack, aimbot, item ESP, radar, and Ricochet rebuilds after patches.',
		setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
		supportIntro: 'Need help with {brand}? Email {email} with your order ID.',
		faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
		reviewsIntro:
			'Real feedback on warzone cheats — ESP, aimbot, wallhack, and support from {brand} buyers.',
		chipEsp: 'ESP / wallhack',
		chipAim: 'Aimbot',
		chipRadar: 'Radar hack',
		chipUpdates: 'Patch updates',
		navHome: 'Home',
		navPreview: 'Cheats',
		navFeatures: 'Features',
		navStore: 'Store',
		navStatus: 'Status',
		navReviews: 'Reviews',
	},

	sitemap: {
		contentLastmod: '2026-09-07',
		blogImageTitle: '{brand} blog',
		blogImageCaption: 'Tips and updates for {primaryKeyword}',
		reviewsImageTitle: '{brand} reviews',
		reviewsImageCaption: 'Warzone cheats reviews — what buyers say about {primaryKeyword}',
		images: [
			{
				src: '/images/warzone-screenshot-01.webp',
				title: 'Warzone ESP box overlay at Train Wreck with distance tags',
				caption: 'Warzone ESP wallhack with player box, distance readout and aimbot FOV on PC',
			},
			{
				src: '/images/warzone-screenshot-02.webp',
				title: 'Warzone player ESP skeleton overlay at Coal Depot',
				caption: 'Warzone wallhack showing enemy skeletons and distance ESP through gas zone',
			},
			{
				src: '/images/warzone-screenshot-03.webp',
				title: 'Warzone aimbot and box ESP on Main Street rooftop',
				caption: 'Warzone cheats box ESP with aimbot lock and visibility check on PC',
			},
			{
				src: '/images/warzone-screenshot-04.webp',
				title: 'Warzone ESP distance markers through scope on Main Street',
				caption: 'Warzone ESP distance tags and aimbot target box during Battle Royale',
			},
			{
				src: '/images/warzone-screenshot-05.webp',
				title: 'Warzone wallhack box ESP with scope targeting',
				caption: 'Warzone wallhack player box ESP and aimbot crosshair overlay on rooftop',
			},
			{
				src: '/images/warzone-screenshot-06.webp',
				title: 'Warzone ESP box overlay on Fast Forward alley',
				caption: 'Warzone player ESP with distance tags and visibility counter in gas zone',
			},
			{
				src: '/images/warzone-screenshot-07.webp',
				title: 'Warzone item ESP and loot tags inside bank vault',
				caption: 'Warzone item ESP showing cash, armor plates, beacons and loot through walls on PC',
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
		const pad = text.toLowerCase().includes('cheatsforwarzone.com')
			? ' Windows PC license with Ricochet maintenance after patches.'
			: ' Compare plans and guides at cheatsforwarzone.com.';
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
