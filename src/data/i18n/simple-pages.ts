import type { PageId } from './content.generated';
import { fillBrandTokens, seoDescription } from '../brand';
import { brandCopy, brandSeo, seoPageTitle } from '../site-core';

export type SimpleSection = {
	h2: string;
	paragraphs: string[];
	list?: string[];
};

export type SimplePageCopy = {
	title: string;
	description: string;
	h1: string;
	intro: string;
	ctaPrimary: string;
	ctaSecondary?: string;
	ctaSecondaryHref?: string;
	galleryTitle: string;
	sections: SimpleSection[];
};

function page(copy: SimplePageCopy): SimplePageCopy {
	return {
		...copy,
		title: seoPageTitle(copy.title),
		description: seoDescription(copy.description),
		intro: fillBrandTokens(copy.intro),
		sections: copy.sections.map((section) => ({
			...section,
			h2: fillBrandTokens(section.h2),
			paragraphs: section.paragraphs.map(fillBrandTokens),
			list: section.list?.map(fillBrandTokens),
		})),
	};
}

/** Short, plain-English overrides for key EN nav pages — meta from brand.seo */
export const simplePageCopy: Partial<Record<PageId, SimplePageCopy>> = {
	features: page({
		title: brandSeo.featuresTitle,
		description: brandSeo.featuresDescription,
		h1: 'Features',
		intro: brandCopy.featuresIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'View store',
		ctaSecondaryHref: '/pricing/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'ESP & wallhack',
				paragraphs: [
					'See players, scientists, and weapon drops through walls with distance readouts.',
					'Use filters so the overlay stays clear in monument zones, compounds, and high-traffic PvP areas.',
				],
				list: ['Player boxes & distance', 'Weapon drops and operator markers', 'Heli and Bradley filters'],
			},
			{
				h2: 'Aimbot & Skillshot assist',
				paragraphs: [
					'Aim help you can tune to feel natural.',
					'Set FOV, smoothness, and bone priority per weapon before you queue.',
				],
				list: ['Smooth aim strength', 'FOV and bone priority', 'Hotkeys mid-match'],
			},
			{
				h2: 'Radar',
				paragraphs: [
					'A simple 2D radar for threats outside your view.',
					'Spot flanks near maps and buy stations without filling the whole screen.',
				],
				list: ['Nearby enemy cues', 'Adjustable range', 'Works in matches & roaming'],
			},
			{
				h2: 'Explore related topics',
				paragraphs: [
					'Most {game} cheat sites cover ESP, aimbot, radar, setup, and status on separate pages. Use these guides next:',
				],
				list: [
					'<a href="/dota2-esp/">ESP & wallhack guide</a>',
					'<a href="/dota2-aimbot/">Aimbot & Skillshot assist</a>',
					'<a href="/dota2-radar-hack/">2D radar overlay</a>',
					'<a href="/setup/">Setup guide</a>',
					'<a href="/updates/">Live status</a>',
					'<a href="/forums/">Dota 2 cheats forums</a>',
					'<a href="https://www.dota2.com//news" target="_blank" rel="noopener noreferrer">Official Dota 2 patch notes</a>',
					'<a href="https://dota2.fandom.com/wiki/Call_of_Duty:_Dota 2" target="_blank" rel="noopener noreferrer">Dota 2 Wiki (Fandom)</a>',
				],
			},
			{
				h2: 'Updates & support',
				paragraphs: [
					'We rebuild after big {game} or {antiCheat} patches.',
					'Check Status before you play after a patch day.',
					'Verify official changes on <a href="https://www.dota2.com//news" target="_blank" rel="noopener noreferrer">Dota 2 patch notes</a> and the <a href="https://dota2.fandom.com/wiki/Call_of_Duty:_Dota 2" target="_blank" rel="noopener noreferrer">Dota 2 Wiki</a> before you tune overlays.',
				],
				list: ['Status on the Status page', 'Setup guide included', 'Email support with your order ID'],
			},
		],
	}),
	pricing: page({
		title: brandSeo.storeTitle,
		description: brandSeo.storeDescription,
		h1: 'Store',
		intro: brandCopy.storeIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Setup guide',
		ctaSecondaryHref: '/setup/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'What you get',
				paragraphs: [
					'Full package access for Windows 10 / 11.',
					'Same ESP, Skillshot assist, and radar on monthly and lifetime plans.',
				],
				list: ['ESP, aimbot, and radar', 'Patch rebuilds while active', 'Digital delivery after checkout'],
			},
			{
				h2: 'Plans',
				paragraphs: [
					'Pick monthly to try first, or lifetime for one payment.',
					'Both plans unlock the same features after checkout.',
				],
				list: ['Monthly — 30 days', 'Lifetime — one-time', 'Instant license by email'],
			},
			{
				h2: 'Before you buy',
				paragraphs: ['Read the refund policy if you need it. Contact support with your order ID for help.'],
				list: [
					'<a href="/refund-policy/">Refund policy</a>',
					'<a href="/faq/">FAQ</a>',
					'<a href="/support/">Support</a>',
				],
			},
		],
	}),
	updates: page({
		title: brandSeo.statusTitle,
		description: brandSeo.statusDescription,
		h1: 'Status',
		intro: brandCopy.statusIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Dota 2 Cheats overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Current status',
				paragraphs: [
					'As of 13 Aug 2026 the package is online for Dota 2 on Windows PC. We post a new note here when a game or VAC patch needs a rebuild.',
					'If Status is green, you can match. If we are rebuilding, wait for the next note.',
				],
				list: [
					'Check this page before every match after a patch',
					'Monthly and lifetime licenses get rebuilds while active',
					'No cheat stays reliable forever — status first, then play',
				],
			},
			{
				h2: 'After a patch',
				paragraphs: [
					'Wait for our rebuild note, then launch. Do not play on an old build after a big update.',
				],
				list: ['Read the latest status note', 'Follow setup if something fails', 'Email support with your order ID'],
			},
			{
				h2: 'Important',
				paragraphs: ['No cheat is 100% safe forever. Stay updated and use safe settings.'],
				list: ['Status first, then play', '<a href="/support/">Support</a> for license help'],
			},
		],
	}),
	hacks: page({
		title: brandSeo.previewTitle,
		description: brandSeo.previewDescription,
		h1: 'Dota 2 Cheats — Full Guide',
		intro:
			'Dota 2 cheats add ESP, radar, and Skillshot assist on top of the base game. This page explains what dota 2 cheats are, what Dota 2 Cheats includes, how VAC maintenance works, and where to go next before you buy.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'View features',
		ctaSecondaryHref: '/features/',
		galleryTitle: 'Dota 2 cheats in action',
		sections: [
			{
				h2: 'What are dota 2 cheats?',
				paragraphs: [
					'Dota 2 cheats are third-party tools that give you extra information and combat assist during matches. Most players search for dota 2 cheats when they want player ESP, weapon drops visibility, off-screen radar, or smoother aim under pressure.',
					'Dota 2 Cheats bundles those tools in one license for Windows PC — no stacking separate downloads for wallhack, radar, and aimbot.',
				],
			},
			{
				h2: 'What Dota 2 Cheats includes',
				paragraphs: [
					'One license covers the full match stack: player ESP with distance, operator markers, 2D radar for flanks, and configurable Skillshot assist profiles per weapon.',
					'Monthly and lifetime plans include the same feature stack with VAC rebuilds.',
				],
				list: [
					'ESP / wallhack with distance readouts',
					'Weapon drops and resource markers',
					'2D radar for off-screen threats',
					'Skillshot assist & aimbot profiles',
					'VAC rebuilds after patches',
				],
			},
			{
				h2: 'Module guides',
				paragraphs: [
					'Each tool has its own deep-dive page if you want details before checkout.',
				],
				list: [
					'<a href="/dota2-esp/">Dota 2 ESP & wallhack</a>',
					'<a href="/dota2-aimbot/">Dota 2 Aimbot & Skillshot assist</a>',
					'<a href="/dota2-radar-hack/">Radar hack overlay</a>',
					'<a href="/features/">Full feature list</a>',
				],
			},
			{
				h2: 'patch status & patches',
				paragraphs: [
					'Dota 2 uses VAC. No cheat stays reliable forever — maintenance after patches is what matters. Check the Status page after every Dota 2 or VAC update before you load in.',
				],
				list: [
					'<a href="/updates/">Live status & patch notes</a>',
					'<a href="/updates/">patch status guide</a>',
					'<a href="/vac-bypass/">VAC maintenance</a>',
					'<a href="/faq/">FAQ before you buy</a>',
				],
			},
			{
				h2: 'How to get started',
				paragraphs: [
					'Pick monthly ($35) or lifetime ($150) on the store — same features on both. After checkout you receive license details by email. Follow the setup guide, then check status after major patches.',
				],
				list: [
					'<a href="/pricing/">Compare plans</a>',
					'<a href="/setup/">Setup guide</a>',
					'<a href="/support/">Contact support</a>',
				],
			},
		],
	}),
	'dota2-esp': page({
		title: 'Dota 2 ESP | Wallhack & Player Boxes | {brand}',
		description:
			'Dota 2 ESP wallhack — player boxes, operator markers & distance tags on PC. Reliable cheats with aimbot & radar. Shop at dota2cheat.org.',
		h1: 'ESP',
		intro: 'See players and weapon drops through walls during Dota 2 matches. Part of the same {brand} license.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Dota 2 Cheats overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'ESP in match',
		sections: [
			{
				h2: 'What ESP shows',
				paragraphs: ['Boxes, distance, and filters for players, scientists, and weapon drops.'],
				list: ['Player ESP', 'Weapon drops markers', 'Heli and Bradley filters'],
			},
			{
				h2: 'When to use it',
				paragraphs: ['Clear monument zones and weapon drops runs without flooding the screen.'],
				list: ['Tune opacity', 'Filter noise', 'Pair with radar'],
			},
			{
				h2: 'Next steps',
				paragraphs: ['ESP is included with aimbot and radar in one plan.'],
				list: [
					'<a href="/">Full product</a>',
					'<a href="/features/">All features</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	}),
	'dota2-aimbot': page({
		title: 'Dota 2 Aimbot | Skillshot assist & FOV Settings | {brand}',
		description:
			'Dota 2 aimbot with Skillshot assist, FOV, bone priority & hotkeys on PC. Reliable {brand} with ESP & radar included. dota2cheat.org.',
		h1: 'Aimbot',
		intro: 'Skillshot assist and aim assist you can tune for Dota 2. Included in the same {brand} license.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Dota 2 Cheats overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'Aimbot view',
		sections: [
			{
				h2: 'Controls',
				paragraphs: ['Set FOV, smoothness, and bone priority before you queue.'],
				list: ['Skillshot assist strength', 'Bone priority', 'Hotkeys mid-match'],
			},
			{
				h2: 'Play styles',
				paragraphs: ['Keep settings subtle for longer matches. Raise strength only when you accept more risk.'],
				list: ['Legit Skillshot assist', 'Per-weapon profiles', 'Works with ESP'],
			},
			{
				h2: 'Next steps',
				paragraphs: ['Aimbot ships with ESP and radar in one license.'],
				list: [
					'<a href="/">Full product</a>',
					'<a href="/features/">All features</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	}),
	radar: page({
		title: 'Dota 2 Radar Hack | 2D Threat Map | {brand}',
		description:
			'2D radar hack for flank awareness on PC. Bundled with ESP wallhack & Skillshot assist in one license. VAC maintenance at dota2cheat.org.',
		h1: 'Radar',
		intro: 'A simple 2D radar for threats outside your view. Included in the same {brand} license.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Dota 2 Cheats overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'Radar overlay',
		sections: [
			{
				h2: 'What it shows',
				paragraphs: ['Nearby enemy cues with adjustable range for solo farmers and matchers.'],
				list: ['Flank awareness', 'Base approaches', 'Adjustable range'],
			},
			{
				h2: 'With ESP',
				paragraphs: ['Use radar for threats you cannot see yet. Use ESP when you push.'],
				list: [
					'<a href="/dota2-esp/">ESP guide</a>',
					'<a href="/">Full product</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	}),
	setup: page({
		title: brandSeo.setupTitle,
		description: brandSeo.setupDescription,
		h1: 'Setup',
		intro: brandCopy.setupIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Check status',
		ctaSecondaryHref: '/updates/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Before you install',
				paragraphs: ['Buy a plan first. You get a license by email.'],
				list: ['Windows 10 / 11 PC', 'Disable conflicting overlays', 'Have your order email ready'],
			},
			{
				h2: 'Install steps',
				paragraphs: ['Run the loader as admin, paste your license, then launch {game}.'],
				list: ['Download the loader from your delivery email', 'Paste license key', 'Launch the game'],
			},
			{
				h2: 'If something fails',
				paragraphs: ['Check Status after a patch. Email {email} with your order ID.'],
				list: ['<a href="/updates/">Status page</a>', '<a href="/support/">Support</a>', '<a href="/faq/">FAQ</a>'],
			},
		],
	}),
	support: page({
		title: brandSeo.supportTitle,
		description: brandSeo.supportDescription,
		h1: 'Support',
		intro: brandCopy.supportIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'FAQ',
		ctaSecondaryHref: '/faq/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'How to contact us',
				paragraphs: ['Email {email}. Include your order ID and a short note about the issue.'],
				list: ['Order ID from your receipt', 'Windows version', 'What you already tried'],
			},
			{
				h2: 'Faster answers',
				paragraphs: ['Check FAQ and Status before you write. Many setup questions are already covered.'],
				list: ['<a href="/faq/">FAQ</a>', '<a href="/updates/">Status</a>', '<a href="/setup/">Setup</a>'],
			},
		],
	}),
	faq: page({
		title: brandSeo.faqTitle,
		description: brandSeo.faqDescription,
		h1: 'FAQ',
		intro: brandCopy.faqIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Support',
		ctaSecondaryHref: '/support/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Buying & delivery',
				paragraphs: ['You get a digital license by email after payment.'],
				list: ['Instant delivery after checkout', 'Keep your order email', 'One license per purchase'],
			},
			{
				h2: 'Setup & updates',
				paragraphs: ['Follow Setup after you buy. Check Status after big {game} or {antiCheat} patches.'],
				list: ['<a href="/setup/">Setup guide</a>', '<a href="/updates/">Status</a>'],
			},
			{
				h2: 'Refunds',
				paragraphs: ['Read the refund policy before you buy if you need details.'],
				list: ['<a href="/refund-policy/">Refund policy</a>', '<a href="/support/">Support</a>'],
			},
		],
	}),
};
