#!/usr/bin/env node
/**
 * One-time migration: Naraka Cheats → Dota 2 Cheats (dota2cheat.org).
 * Run from project root: node scripts/adapt-dota2-site.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['naraka-aimbot', 'dota2-aimbot'],
	['naraka-esp', 'dota2-esp'],
	['naraka-wallhack', 'dota2-wallhack'],
	['naraka-radar-hack', 'dota2-radar-hack'],
	['reliable-naraka-cheats', 'reliable-dota2-cheats'],
	['naraka-cheats-2026', 'dota2-cheats-2026'],
	['neac-bypass', 'vac-bypass'],
	['naraka-cheats', 'dota2-cheats'],
	['naraka-cheat-download', 'dota2-cheat-download'],
	['naraka-mod-menu', 'dota2-mod-menu'],
	['naraka-soft-aim', 'dota2-soft-aim'],
	['best-naraka-cheats', 'best-dota2-cheats'],
	['naraka-aimbot-hack', 'dota2-aimbot-hack'],
	['naraka-esp-hack', 'dota2-esp-hack'],
	['naraka-unlock-all', 'dota2-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.narakacheats.org', 'https://dota2cheat.org'],
	['https://narakacheats.org', 'https://dota2cheat.org'],
	['https://www.dota2hacks.org', 'https://dota2cheat.org'],
	['https://dota2hacks.org', 'https://dota2cheat.org'],
	['www.narakacheats.org', 'dota2cheat.org'],
	['narakacheats.org', 'dota2cheat.org'],
	['support@narakacheats.org', 'support@dota2cheat.org'],
	['project-name=narakacheats', 'project-name=cheatsfordota2'],
	['name = "naraka-cheats-org"', 'name = "cheats-for-dota2"'],
	['"name": "naraka-cheats"', '"name": "cheats-for-dota2"'],
	['https://store.steampowered.com/app/1203220/news/', 'https://www.callofduty.com/dota2/news'],
	['https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/', 'https://www.callofduty.com/dota2'],
	['https://store.steampowered.com/app/1203220', 'https://www.callofduty.com/dota2'],
	['https://naraka.fandom.com/wiki/NARAKA:_BLADEPOINT', 'https://dota2.fandom.com/wiki/Call_of_Duty:_Dota 2'],
	['https://naraka.fandom.com', 'https://dota2.fandom.com'],
	['store.steampowered.com/app/1203220', 'playdota2.com'],
	['naraka.fandom.com', 'dota2.fandom.com'],
	['https://www.reddit.com/r/NARAKA/', 'https://www.reddit.com/r/Dota 2/'],
	['https://x.com/narakacheats', 'https://x.com/DOTA2'],
	['@narakacheats', '@DOTA2'],
	['https://dota2cheat.org/go/QRH?to=%2Fproducts%2Fnaraka-bladepoint-novaxware', 'https://dota2cheat.org/store'],
	['/products/naraka-bladepoint-novaxware', '/products/dota2'],
	['/products/naraka', '/products/dota2'],
	['reliable-naraka-cheats', 'reliable-dota2-cheats'],
	['best-naraka-cheats', 'best-dota2-cheats'],
	['naraka-cheat-download', 'dota2-cheat-download'],
	['naraka-cheats-2026', 'dota2-cheats-2026'],
	['naraka-radar-hack', 'dota2-radar-hack'],
	['naraka-aimbot-hack', 'dota2-aimbot-hack'],
	['naraka-esp-hack', 'dota2-esp-hack'],
	['naraka-unlock-all', 'dota2-unlock-all'],
	['naraka-soft-aim', 'dota2-soft-aim'],
	['naraka-mod-menu', 'dota2-mod-menu'],
	['naraka-wallhack', 'dota2-wallhack'],
	['naraka-aimbot', 'dota2-aimbot'],
	['naraka-esp', 'dota2-esp'],
	["'naraka-esp'", "'dota2-esp'"],
	['"naraka-esp"', '"dota2-esp"'],
	["'naraka-aimbot'", "'dota2-aimbot'"],
	['"naraka-aimbot"', '"dota2-aimbot"'],
	['naraka-cheats', 'dota2-cheats'],
	['naraka-cheat', 'dota2-cheat'],
	['narakaImages', 'dota2Images'],
	["from './naraka'", "from './dota2'"],
	["from '../data/naraka'", "from '../data/dota2'"],
	["from '../../data/naraka'", "from '../../data/dota2'"],
	['fetch-naraka-images', 'fetch-dota2-images'],
	['fetch-naraka-hero', 'fetch-dota2-hero'],
	['import-naraka-screenshots', 'import-dota2-screenshots'],
	['naraka-hack-overlays', 'dota2-hack-overlays'],
	['fix-naraka-copy', 'fix-dota2-copy'],
	['fix-naraka-content', 'fix-dota2-content'],
	['fix-naraka-lexicon', 'fix-dota2-lexicon'],
	['adapt-naraka', 'adapt-dota2-site'],
	['rebrand-naraka-cheats', 'rebrand-dota2-cheats'],
	['trucos-naraka', 'trucos-dota2'],
	['triche-naraka', 'triche-dota2'],
	['cheats-naraka', 'cheats-dota2'],
	['trucchi-naraka', 'trucchi-dota2'],
	['cheaty-naraka', 'cheaty-dota2'],
	['chity-naraka', 'chity-dota2'],
	['chitov-naraka', 'chitov-dota2'],
	['chitiv-naraka', 'chitiv-dota2'],
	['cheatow-naraka', 'cheatow-dota2'],
	['hile-naraka', 'hile-dota2'],
	['naraka-hile', 'dota2-hile'],
	['naraka-esp-chity', 'dota2-esp-chity'],
	['naraka-aimbot-chity', 'dota2-aimbot-chity'],
	['unentdeckte-naraka-cheats', 'unentdeckte-dota2-cheats'],
	['cheats-naraka-indetectaveis', 'cheats-dota2-indetectaveis'],
	['trucchi-naraka-indetectabili', 'trucchi-dota2-indetectabili'],
	['niewykrywalne-cheats-naraka', 'niewykrywalne-cheats-dota2'],
	['nedecektiruemye-chity-naraka', 'nedecektiruemye-chity-dota2'],
	['tespit-edilemeyen-naraka-hileleri', 'tespit-edilemeyen-dota2-hileleri'],
	['nedecektovani-chity-naraka', 'nedecektovani-chity-dota2'],
	['cheats-naraka-nedetectabile', 'cheats-dota2-nedetectabile'],
	['basta-naraka-cheats', 'basta-dota2-cheats'],
	['naraka-cheats-funktionen', 'dota2-cheats-funktionen'],
	['naraka-cheats-functies', 'dota2-cheats-functies'],
	['caracteristicas-trucos-naraka', 'caracteristicas-trucos-dota2'],
	['fonctionnalites-triche-naraka', 'fonctionnalites-triche-dota2'],
	['recursos-cheats-naraka', 'recursos-cheats-dota2'],
	['maps, zones, and combat points', 'maps, sites, and buy stations'],
	['maps, zones and combat points', 'maps, sites and buy stations'],
	['battle royale rounds and ranked matches matches', 'ranked matches rounds and ranked matches matches'],
	['heroes & ranked teams', 'agents & ranked teams'],
	['hero markers', 'operator markers'],
	['combat zones', 'buy stations'],
	['maps and combat zones', 'maps and bomb sites'],
	['near combat zones and choke points', 'near bomb sites and choke points'],
	['grapple routes', 'loadout drop routes'],
	['Hero and weapon ESP', 'Agent and ability ESP'],
	['hero ESP', 'operator ESP'],
	['elimination worth the push', 'round win worth the push'],
	['melee combat tools', 'tactical tools'],
	['24 Entertainment', 'Riot Games'],
	['melee combat', 'competitive fight'],
	['melee combat sessions', 'competitive fights'],
	['battle royale tips', 'competitive tips'],
	['map zones', 'map callouts'],
	['in combat zones', 'on bomb sites'],
	['NarakaCheatsSite', 'Dota 2CheatsSite'],
	['Naraka Intel', 'Dota 2 Intel'],
	['Naraka Cheats', 'Dota 2 Cheats'],
	['naraka cheats', 'dota 2 cheats'],
	['naraka cheat', 'dota 2 cheat'],
	['Naraka ESP', 'Dota 2 ESP'],
	['Naraka Aimbot', 'Dota 2 Aimbot'],
	['naraka esp', 'dota 2 esp'],
	['naraka aimbot', 'dota 2 aimbot'],
	['naraka wallhack', 'dota 2 wallhack'],
	['naraka radar', 'dota2 radar'],
	['Buy Naraka Cheats', 'Buy Dota 2 Cheats'],
	['what-are-naraka-cheats', 'what-are-dota2-cheats'],
	['are-naraka-cheats-reliable-in-2026', 'are-dota2-cheats-reliable-in-2026'],
	['battle-royale-rounds-and-ranked-sessions', 'competitive-rounds-and-ranked-sessions'],
	['what-is-a-naraka-wallhack', 'what-is-a-dota2-wallhack'],
	['does-naraka-cheats-include-radar-hack', 'does-dota2-cheats-include-radar-hack'],
	['neac-anti-cheat-and-naraka-cheats', 'vac-anti-cheat-and-dota2-cheats'],
	['buy-reliable-naraka-cheats-windows-pc', 'buy-reliable-dota2-cheats-windows-pc'],
	['naraka-soft-aim-review', 'dota2-soft-aim-review'],
	['naraka-esp-ranked-review', 'dota2-esp-ranked-review'],
	['naraka-cloud-dma-review', 'dota2-cloud-dma-review'],
	['naraka-cheat-setup-review', 'dota2-cheat-setup-review'],
	['naraka-hero-esp-review', 'dota2-agent-esp-review'],
	['naraka-soft-aim-ranked-review', 'dota2-soft-aim-ranked-review'],
	['naraka-radar-hack-review', 'dota2-radar-hack-review'],
	['naraka-neac-update-review', 'dota2-vac-update-review'],
	['naraka-melee-soft-aim-review', 'dota2-operator-soft-aim-review'],
	['xKrypt0_Naraka', 'xKrypt0_Dota 2'],
	['vanLifeNaraka', 'vanLifeDota 2'],
	['naraka-screenshot', 'dota2-screenshot'],
	['naraka-cheats-logo', 'dota2-cheats-logo'],
	['naraka-cheats-hero', 'dota2-cheats-hero'],
	['naraka-hero-banner', 'dota2-hero-banner'],
	['naraka-hero-ghost', 'dota2-hero-ghost'],
	['naraka-hero-source', 'dota2-hero-source'],
	['naraka-esp-player-tags', 'dota2-esp-player-tags'],
	['naraka-wallhack-skeleton', 'dota2-wallhack-skeleton'],
	['naraka-aimbot-skeleton', 'dota2-aimbot-skeleton'],
	['naraka-aimbot-melee', 'dota2-aimbot-operator'],
	['naraka-esp-radar', 'dota2-esp-radar'],
	['naraka-cheats-combat', 'dota2-cheats-combat'],
	['naraka-cheats-wallhack', 'dota2-cheats-wallhack'],
	['naraka-cheats-aimbot-view', 'dota2-cheats-aimbot-view'],
	['naraka-cheats-aimbot', 'dota2-cheats-aimbot'],
	['naraka-cheats-radar', 'dota2-cheats-radar'],
	['naraka-cheats-session', 'dota2-cheats-session'],
	['naraka-cheats-esp', 'dota2-cheats-esp'],
	['Naraka Features', 'Dota 2 Features'],
	['Naraka Status', 'Dota 2 Status'],
	['Naraka patches', 'Dota 2 patches'],
	['Naraka updates', 'Dota 2 updates'],
	['Naraka setup', 'Dota 2 setup'],
	['Naraka license', 'Dota 2 license'],
	['Naraka licenses', 'Dota 2 licenses'],
	['Naraka on PC', 'Dota 2 on PC'],
	['Naraka on Steam', 'Dota 2 on PC'],
	['neac-bypass', 'vac-bypass'],
	['NEAC bypass', 'VAC bypass'],
	['NEAC Bypass', 'VAC Bypass'],
	['NEAC maintenance', 'VAC maintenance'],
	['NEAC rebuilds', 'Vanguard rebuilds'],
	['NEAC update', 'VAC update'],
	['NEAC updates', 'VAC updates'],
	['NEAC patch', 'VAC patch'],
	['NEAC patches', 'VAC patches'],
	["'neac'", "'vac'"],
	['| neac', '| vac'],
	['neac-anti-cheat', 'vac-anti-cheat'],
	['nc_locale', 'vc_locale'],
	['in Naraka', 'in Dota 2'],
	['for Naraka', 'for Dota 2'],
	['Naraka on', 'Dota 2 on'],
	['Naraka or', 'Dota 2 or'],
	["Naraka's", "Dota 2's"],
	['Naraka ', 'Dota 2 '],
	['Naraka,', 'Dota 2,'],
	['Naraka.', 'Dota 2.'],
	['Naraka', 'Dota 2'],
	['naraka hacks', 'dota 2 hacks'],
	['naraka hack', 'dota 2 hack'],
	['naraka/naraka cheats', 'dota2/dota 2 cheats'],
	// Remove brand references from visible copy (keep checkout URLs intact)
	['Zadeyo checkout', 'secure checkout'],
	[' checkout', 'secure checkout'],
	['Zadeyo', 'checkout'],
	['narakacheats.net', 'dota2cheat.org'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp']);
const SKIP_FILES = new Set([
	'adapt-dota2.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
	'adapt-finals.mjs',
	'adapt-dota2.mjs',
	'adapt-naraka.mjs',
	'adapt-dota2-site.mjs',
]);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(full, files);
		} else {
			files.push(full);
		}
	}
	return files;
}

function applyReplacements(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		result = result.split(from).join(to);
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (SKIP_FILES.has(path.basename(file))) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function renamePageDirs() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const src = path.join(ROOT, 'src', 'pages', from);
		const dest = path.join(ROOT, 'src', 'pages', to);
		try {
			await rename(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip rename ${from}: ${e.message}`);
		}
	}
}

async function renameNarakaTs() {
	const from = path.join(ROOT, 'src', 'data', 'naraka.ts');
	const to = path.join(ROOT, 'src', 'data', 'dota2.ts');
	try {
		await rename(from, to);
		console.log('Renamed naraka.ts → dota2.ts');
	} catch (e) {
		console.warn(`naraka.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-naraka-images.mjs', 'fetch-dota2-images.mjs'],
		['fetch-naraka-hero.mjs', 'fetch-dota2-hero.mjs'],
		['import-naraka-screenshots.mjs', 'import-dota2-screenshots.mjs'],
		['naraka-hack-overlays.mjs', 'dota2-hack-overlays.mjs'],
		['fix-naraka-copy.mjs', 'fix-dota2-copy.mjs'],
		['fix-naraka-content.mjs', 'fix-dota2-content.mjs'],
		['fix-naraka-lexicon.mjs', 'fix-dota2-lexicon.mjs'],
	];
	for (const [from, to] of pairs) {
		try {
			await rename(path.join(ROOT, 'scripts', from), path.join(ROOT, 'scripts', to));
			console.log(`Renamed script: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip script rename ${from}: ${e.message}`);
		}
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'dota2-aimbot': 'dota2-aimbot',
		'dota2-esp': 'dota2-esp',
		'dota2-wallhack': 'wallhack',
		'dota2-radar-hack': 'radar',
		'reliable-dota2-cheats': 'reliable',
		'dota2-cheats-2026': 'cheats-2026',
		'vac-bypass': 'vac',
		'dota2-cheats': 'hacks',
		'dota2-cheat-download': 'cheat-download',
		'dota2-mod-menu': 'mod-menu',
		'dota2-soft-aim': 'soft-aim',
		'best-dota2-cheats': 'best-cheats',
		'dota2-aimbot-hack': 'aimbot-hack',
		'dota2-esp-hack': 'esp-hack',
		'dota2-unlock-all': 'unlock-all',
	};

	for (const [dir, pageId] of Object.entries(idMap)) {
		const file = path.join(ROOT, 'src', 'pages', dir, 'index.astro');
		try {
			const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageId}" />
`;
			await writeFile(file, content, 'utf8');
		} catch {
			// ignore missing dirs
		}
	}
}

async function renameImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	let files;
	try {
		files = await readdir(imagesDir);
	} catch {
		return;
	}
	for (const file of files) {
		if (!file.includes('naraka')) continue;
		const newName = file
			.replace(/naraka-cheats/g, 'dota2-cheats')
			.replace(/naraka/g, 'dota2');
		if (newName !== file) {
			try {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			} catch (e) {
				console.warn(`Skip image ${file}: ${e.message}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Naraka Cheats → Dota 2 Cheats (dota2cheat.org)...\n');
	await renamePageDirs();
	await renameNarakaTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: update brand.ts, sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
