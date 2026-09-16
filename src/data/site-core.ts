import { brand, fillBrandTokens, seoDescription, seoTitle } from './brand';
import { globalSeoKeywords } from './seo-keywords';

/**
 * Title clamp lives here — NOT in brand.ts.
 * Brand Studio rewrites brand.ts on every save; helpers here stay stable.
 */
export function seoPageTitle(template: string): string {
	let text = fillBrandTokens(template).trim();
	if (text.length < 30) {
		text = `${text} | Dota 2 Cheats PC`;
	}
	/** Google SERP titles typically display ~50–60 chars; clamp at 60. */
	if (text.length <= 60) return text;
	const trimmed = text.slice(0, 60);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 45 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 60);
}

export { brand, fillBrandTokens, seoDescription, seoTitle };

const copyDefaults = {
	tagline: '{primaryKeyword} — ESP, aimbot, and maphack for PC',
	summary:
		'{brand} is a {game} cheat package for Windows PC. Includes ESP, skillshot assist, maphack, and radar with {antiCheat} maintenance after patches.',
	heroLede: 'ESP, aimbot, and maphack for Dota 2 on Windows PC.',
	blogLabel: 'Community Forums',
	ctaBuy: 'Buy now',
	ctaBuyShort: 'Buy',
	featuresIntro: 'Everything included in one license for {game} on Windows PC.',
	storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
	statusIntro: 'Check here after a {game} or {antiCheat} patch before you play.',
	previewIntro: 'A quick look at {brand} — ESP, aimbot, radar, and updates after patches.',
	setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
	supportIntro: 'Need help with {brand}? Email {email} with your order ID.',
	faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
	reviewsIntro:
		'Real feedback on Dota 2 cheats — ESP, skillshot assist, radar, and support from {brand} buyers.',
	chipEsp: 'ESP / wallhack',
	chipAim: 'Skillshot assist',
	chipRadar: '2D radar',
	chipUpdates: 'Patch updates',
	navPreview: 'Preview',
	navFeatures: 'Features',
	navStore: 'Store',
	navStatus: 'Status',
	navReviews: 'Reviews',
} as const;

const seoDefaults = {
	homeTitle: 'Dota 2 Esp, Aimbot & Wallhack',
	homeDescription:
		'Dota 2 cheats with ESP, aimbot and wallhack for ranked matches on PC. Hero vision, maphack, skillshot assist, and VAC maintenance after patches.',
	featuresTitle: 'Dota 2 Cheats Features | ESP, Aimbot & Maphack',
	featuresDescription:
		'Full Dota 2 cheats feature list — hero ESP, ward vision, maphack, skillshot assist, and config profiles on PC. {antiCheat} maintenance at dota2cheat.com.',
	storeTitle: 'Dota 2 Cheats Pricing | $35/mo or $150 Lifetime',
	storeDescription:
		'Buy Dota 2 cheats at dota2cheat.com — $35/month or $150 lifetime. ESP, aimbot & radar on PC. Same features, instant delivery.',
	statusTitle: 'Dota 2 Cheats Status | VAC Patch Updates',
	statusDescription:
		'Live status after {game} and {antiCheat} patches. Check ESP, aimbot and maphack rebuilds on PC before you queue ranked.',
	previewTitle: 'Dota 2 Cheats | ESP, Aimbot & Wallhack Guide',
	previewDescription:
		'Dota 2 cheats guide — ESP maphack, skillshot assist, radar overlays and {antiCheat} rebuilds for ranked on PC. Plans from $35 at dota2cheat.com.',
	setupTitle: 'Dota 2 Cheats Setup | Windows PC Install Guide',
	setupDescription:
		'Install {brand} on PC — activate ESP, skillshot assist, and radar step by step. Setup guide at dota2cheat.com. Check {antiCheat} status before your first match.',
	supportTitle: 'Dota 2 Cheats Support | License & Setup Help',
	supportDescription:
		'Support for license delivery, ESP setup & billing on PC. Email {email} with your order ID. dota2cheat.com/support.',
	faqTitle: 'Dota 2 Cheats FAQ | ESP, Aimbot & {antiCheat}',
	faqDescription:
		'FAQ for dota 2 cheats — delivery, setup, ranked use, {antiCheat} updates and pricing on PC. Answers at dota2cheat.com before you buy.',
	reviewsTitle: 'Dota 2 Cheats Reviews | ESP, Aimbot & Maphack',
	reviewsDescription:
		'Real buyer reviews for Dota 2 cheats — ESP, skillshot assist, radar, and {antiCheat} maintenance on PC. See what license holders say at dota2cheat.com.',
	blogTitle: 'Dota 2 Cheats Forums | Setup Tips & Feature Talk',
	blogDescription:
		'Dota 2 cheats forums — setup walkthroughs, ESP settings, skillshot assist sliders, and VAC patch notes for PC at dota2cheat.com/forums/.',
} as const;

type SeoShape = typeof seoDefaults;
type CopyShape = typeof copyDefaults;

/** Always-safe copy/seo — Brand Studio saves must never crash the site. */
const brandExtra = brand as typeof brand & { seo?: Partial<SeoShape>; copy?: Partial<CopyShape> };
export const brandSeo: SeoShape = { ...seoDefaults, ...brandExtra.seo };
export const brandCopy: CopyShape = { ...copyDefaults, ...brandExtra.copy };

/** Resolved EN home meta */
export function homeSeo() {
	return {
		title: seoPageTitle(brandSeo.homeTitle),
		description: seoDescription(brandSeo.homeDescription),
	};
}

/** Site config derived from brand — import this in layouts/components. */
export const siteConfig = {
	name: brand.name,
	url: brand.url,
	locale: brand.locale,
	market: brand.market,
	supportEmail: brand.supportEmail,
	logo: brand.logo,
	logoRaster: brand.logoRaster,
	logoRasterWidth: brand.logoRasterWidth,
	logoRasterHeight: brand.logoRasterHeight,
	logoAlt: brand.logoAlt,
	checkoutUrl: brand.checkoutUrl,
	gameUrl: brand.gameUrl,
	defaultOgImage: brand.defaultOgImage,
	heroImage: brand.heroImage,
	demoVideoPoster: brand.demoVideoPoster,
	demoScreenshot: brand.demoScreenshot,
	twitterSite: brand.social.twitterSite,
	socialSameAs: [...brand.social.sameAs],
} as const;

/** Prefer brand.keywords — kept for Layout meta keywords. */
export const seoKeywords = globalSeoKeywords;

/** Blog eyebrow / title suffix */
export const blogLabel = fillBrandTokens(brandCopy.blogLabel);

export const productInfo = {
	name: brand.name,
	shortName: brand.game,
	brand: brand.name,
	tagline: fillBrandTokens(brandCopy.tagline),
	summary: fillBrandTokens(brandCopy.summary),
	game: brand.game,
	delivery: 'Digital license delivery after purchase confirmation',
	platforms: [...brand.platforms],
	updateCadence: fillBrandTokens(
		'Updates are published when {game} or {antiCheat} patches need a rebuild',
	),
	supportHours: 'Support requests are reviewed daily',
	plans: brand.plans.map((p) => ({ ...p })),
	currency: brand.currency,
	heroLede: fillBrandTokens(brandCopy.heroLede),
	features: {
		esp: [
			'Enable ESP',
			'Skeleton — Normal / Outline / Glow / RGB',
			'Box — Normal / Cornered / 3D',
			'Player Name, Head Circle, View Line',
			'Snapline — Top / Bottom / Middle',
			'Feet Circle and distance readouts',
		],
		aimbot: [
			'Enable Aimbot',
			'Customizable FOV and Draw FOV',
			'Smoothness and Hitbox Selection',
			'Draw Target Line with color options',
			'Per-weapon profiles',
		],
		radar: ['2D radar overlay', 'Hero ESP — wards, missing heroes, runes', 'Adjustable range'],
		general: [
			fillBrandTokens('{antiCheat} maintenance after patches'),
			'Streamproof mode',
			'Save Config / Load Config',
			'Digital delivery after checkout',
		],
	},
} as const;
