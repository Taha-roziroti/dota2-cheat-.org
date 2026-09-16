import type { PageId } from './i18n/routing';

export const primarySeoKeyword = 'dota 2 cheats';

export const globalSeoKeywords = [
	'dota 2 cheats',
	'dota 2 hack',
	'dota 2 hacks',
	'dota 2 aimbot',
	'dota 2 esp',
	'dota 2 wallhack',
	'dota2 triggerbot',
	'dota2 radar hack',
	'dota2 no recoil',
	'dota2 mod menu',
	'dota 2 cheat software',
	'dota 2 cheats pc',
	'dota 2 cheats 2026',
	'dota 2 cheats',
	'best dota 2 cheats',
	'dota2 ranked cheats',
	'dota2 competitive cheats',
	'dota2 unlock tool',
	'dota2 soft aim',
	'dota2 silent aim',
	'dota 2 esp overlay',
	'dota 2 wallhack pc',
	'dota 2 aimbot pc',
	'dota 2 cheat menu',
	'dota2 game cheats',
	'dota2 pc cheats',
	'dota 2 cheats windows 11',
	'dota2 latest cheats 2026',
] as const;

export const pageSeoKeywords: Partial<Record<PageId, readonly string[]>> = {
	home: [
		'dota 2 cheats',
		'dota 2 cheats 2026',
		'dota 2 cheats',
		'best dota 2 cheats',
		'dota 2 esp',
		'dota 2 aimbot',
	],
	hacks: [
		'dota 2 cheats',
		'dota 2 hacks',
		'dota 2 cheat software',
		'dota 2 cheats',
		'dota 2 esp',
		'dota 2 aimbot',
	],
	'dota2-esp': [
		'dota 2 esp',
		'dota 2 esp cheat',
		'dota 2 wallhack',
		'dota2 player esp',
		'dota2 enemy esp',
		'dota 2 esp overlay',
	],
	wallhack: [
		'dota 2 wallhack',
		'dota2 wall hacks',
		'dota 2 wallhack cheat',
		'dota2 enemy wallhack',
		'dota 2 esp',
	],
	'dota2-aimbot': [
		'dota 2 aimbot',
		'dota 2 aimbot cheat',
		'dota2 legit aimbot',
		'dota2 smooth aimbot',
		'dota2 headshot aimbot',
	],
	'aimbot-hack': ['dota 2 aimbot hack', 'dota 2 aimbot', 'dota2 rage aimbot', 'dota2 auto aim'],
	'soft-aim': ['dota2 soft aim', 'dota2 silent aim', 'dota2 auto targeting', 'dota 2 aimbot settings'],
	radar: ['dota2 radar hack', 'dota2 radar overlay', 'dota2 minimap hack', 'dota2 live radar'],
	'esp-hack': ['dota 2 esp hack', 'dota 2 esp', 'dota 2 wallhack', 'dota2 agent esp'],
	features: [
		'dota 2 cheat features',
		'dota 2 esp',
		'dota 2 aimbot',
		'dota 2 wallhack',
		'dota2 mod menu',
		'dota2 streamproof',
	],
	pricing: [
		'buy dota 2 cheats',
		'dota 2 cheats price',
		'dota 2 cheats monthly',
		'dota 2 cheats lifetime',
	],
	setup: ['dota 2 cheats setup', 'dota 2 cheat download', 'install dota 2 cheats'],
	'cheat-download': ['dota 2 cheat download', 'dota 2 cheats download', 'dota 2 cheat windows 10'],
	updates: [
		'dota 2 cheats',
		'dota 2 cheats status',
		'vac update',
		'dota 2 cheats reliable',
	],
	reliable: ['dota 2 cheats', 'dota 2 cheats reliable', 'vac reliable'],
	vac: [
		'vac bypass',
		'dota2 vac bypass',
		'dota2 anti cheat bypass',
		'dota2 ranked cheats',
	],
	'cheats-2026': [
		'dota 2 cheats 2026',
		'dota 2 hacks 2026',
		'best dota 2 cheats 2026',
		'dota 2 aimbot 2026',
	],
	'best-cheats': [
		'best dota 2 cheats',
		'best dota 2 hacks',
		'dota 2 cheat comparison',
		'dota 2 cheat review 2026',
	],
	'mod-menu': ['dota2 mod menu', 'dota 2 cheat menu', 'dota2 tools'],
	'unlock-all': ['dota2 unlock tool', 'dota2 unlock all', 'dota2 skin unlock tool'],
	faq: ['dota 2 cheats faq', 'dota 2 cheat guide', 'dota 2 cheats'],
	support: ['dota 2 cheats support', 'dota 2 cheat setup help'],
};

export const reviewsSeoKeywords = [
	'dota 2 cheats reviews',
	'dota 2 hack review',
	'dota 2 cheat review',
	'dota 2 esp review',
	'dota 2 aimbot review',
	'dota 2 wallhack review',
	'dota 2 cheats',
	'dota2 ranked cheats',
] as const;

export function getPageSeoKeywords(pageId?: PageId): string[] {
	if (!pageId) return [...globalSeoKeywords];
	const pageKeywords = pageSeoKeywords[pageId];
	return pageKeywords?.length ? [...pageKeywords] : [...globalSeoKeywords];
}
