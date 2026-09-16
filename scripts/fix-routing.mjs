#!/usr/bin/env node
/** Rebuild routing.ts and constants.mjs from clea Dota 2 source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_IDS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['dota2-esp', 'dota2-esp'],
	['dota2-aimbot', 'dota2-aimbot'],
	['vac', 'vac'],
	['reliable-dota2-cheats', 'reliable-dota2-cheats'],
	['dota2-wallhack', 'dota2-wallhack'],
	['dota2-radar-hack', 'dota2-radar-hack'],
	['dota2-cheats-2026', 'dota2-cheats-2026'],
	['vac-bypass', 'vac-bypass'],
	['dota2cheat.com', 'dota2cheat.com'],
	['trucos-dota2', 'trucos-dota2'],
	['triche-dota2', 'triche-dota2'],
	['dota2-cheats', 'dota2-cheats'],
	['cheats-dota2', 'cheats-dota2'],
	['trucchi-dota2', 'trucchi-dota2'],
	['cheaty-dota2', 'cheaty-dota2'],
	['chity-dota2', 'chity-dota2'],
	['chitov-dota2', 'chitov-dota2'],
	['chitiv-dota2', 'chitiv-dota2'],
	['cheatow-dota2', 'cheatow-dota2'],
	['hile-dota2', 'hile-dota2'],
	['dota2-hile', 'dota2-hile'],
	['dota2-esp-chity', 'dota2-esp-chity'],
	['dota2-aimbot-chity', 'dota2-aimbot-chity'],
	['unentdeckte-dota2-cheats', 'unentdeckte-dota2-cheats'],
	['cheats-dota2-indetectaveis', 'cheats-dota2-indetectaveis'],
	['trucchi-dota2-indetectabili', 'trucchi-dota2-indetectabili'],
	['niewykrywalne-cheats-dota2', 'niewykrywalne-cheats-dota2'],
	['nedecektiruemye-chity-dota2', 'nedecektiruemye-chity-dota2'],
	['tespit-edilemeyen-dota2-hileleri', 'tespit-edilemeyen-dota2-hileleri'],
	['nedecektovani-chity-dota2', 'nedecektovani-chity-dota2'],
	['cheats-dota2-nedetectabile', 'cheats-dota2-nedetectabile'],
	['basta-dota2-cheats', 'basta-dota2-cheats'],
	['vac-bypass-trucos-dota2', 'vac-bypass-trucos-dota2'],
	['vac-bypass-triche-dota2', 'vac-bypass-triche-dota2'],
	['vac-bypass-hacks-dota2', 'vac-bypass-hacks-dota2'],
	['vac-bypass-chity-dota2', 'vac-bypass-chity-dota2'],
	['vac-bypass-rust', 'vac-bypass'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageBlocks(content, pageId) {
	const keyPatterns = [
		new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': \\{[\\s\\S]*?\\},\\n`, 'g'),
	];
	let r = content;
	for (const p of keyPatterns) r = r.replace(p, '');
	// Remove from PageId union
	r = r.replace(new RegExp(`\\s*\\|\\s*'${pageId}'`, 'g'), '');
	// Remove from englishPaths single line
	r = r.replace(new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: '[^']*',\\n`, 'g'), '');
	r = r.replace(new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': '[^']*',\\n`, 'g'), '');
	return r;
}

async function fixRouting() {
	let content = await readFile(path.join(SRC, 'src/data/i18n/routing.ts'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) content = removePageBlocks(content, id);
	// Fix eac key in englishPaths
	content = content.replace(/\teac: '/, "\t'vac': '");
	await writeFile(path.join(ROOT, 'src/data/i18n/routing.ts'), content);
	console.log('Fixed routing.ts');
}

async function fixConstants() {
	const heroImages = `/** Agent image per page topic — keyword-rich dota2-cheats paths. */
export const HERO_IMAGES = {
	home: '/images/the-dota2-cheats-hero.webp',
	'dota2-esp': '/images/the-dota2-cheats-esp-wallhack.webp',
	'dota2-aimbot': '/images/the-dota2-cheats-aimbot-combat.webp',
	features: '/images/dota2-cheats-package.webp',
	pricing: '/images/dota2-cheats-cover.webp',
	setup: '/images/rust-loadout-builder.webp',
	updates: '/images/rust-header-art.webp',
	faq: '/images/rust-pack-fight.webp',
	support: '/images/dota2-cheats-package.webp',
	reliable: '/images/rust-survival-combat.webp',
	wallhack: '/images/the-dota2-cheats-esp-wallhack.webp',
	radar: '/images/rust-player-esp.webp',
	'vac': '/images/rust-reboot-van-fight.webp',
	'cheats-2026': '/images/the-dota2-cheats-hero.webp',
	privacy: '/images/the-dota2-cheats-aimbot-combat.webp',
	refund: '/images/dota2-cheats-cover.webp',
	terms: '/images/dota2-cheats-package.webp',
};`;

	let content = await readFile(path.join(SRC, 'scripts/i18n-data/constants.mjs'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) {
		content = content.replace(new RegExp(`'${id}',\\s*`, 'g'), '');
	}
	content = content.replace(
		/export const PAGE_IDS = \[[\s\S]*?\];/,
		`export const PAGE_IDS = [\n\t'home', 'dota2-esp', 'dota2-aimbot', 'features', 'pricing', 'setup',\n\t'updates', 'faq', 'support', 'reliable', 'wallhack', 'radar', 'vac',\n\t'cheats-2026', 'privacy', 'refund', 'terms',\n];`,
	);
	content = content.replace(/\/\*\* Agent image[\s\S]*?};/, heroImages);
	content = content.replace(
		/export type PageId = [^;]+;/,
		"export type PageId = 'home' | 'dota2-esp' | 'dota2-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'reliable' | 'wallhack' | 'radar' | 'vac' | 'cheats-2026' | 'privacy' | 'refund' | 'terms';",
	);
	content = content.replace(/operatorEsp/g, 'playerEsp');
	content = content.replace(/extractFight/g, 'raidFight');
	content = content.replace(/alMazrah/g, 'raidMap');
	await writeFile(path.join(ROOT, 'scripts/i18n-data/constants.mjs'), content);
	console.log('Fixed constants.mjs');
}

await fixRouting();
await fixConstants();
