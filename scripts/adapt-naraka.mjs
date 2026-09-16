#!/usr/bin/env node
/**
 * One-time migration: Dota 2 Hacks → Naraka Cheats (narakacheats.org).
 * Run from project root: node scripts/adapt-naraka.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['dota2-aimbot', 'naraka-aimbot'],
	['dota2-esp', 'naraka-esp'],
	['dota2-wallhack', 'naraka-wallhack'],
	['dota2-radar-hack', 'naraka-radar-hack'],
	['reliable-dota2-hacks', 'reliable-naraka-cheats'],
	['dota2-hacks-2026', 'naraka-cheats-2026'],
	['vac-bypass', 'neac-bypass'],
	['dota2-hacks', 'naraka-cheats'],
	['dota2-cheat-download', 'naraka-cheat-download'],
	['dota2-mod-menu', 'naraka-mod-menu'],
	['dota2-soft-aim', 'naraka-soft-aim'],
	['best-dota2-hacks', 'best-naraka-cheats'],
	['dota2-aimbot-hack', 'naraka-aimbot-hack'],
	['dota2-esp-hack', 'naraka-esp-hack'],
	['dota2-unlock-all', 'naraka-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.dota2hacks.org', 'https://www.narakacheats.org'],
	['https://dota2hacks.org', 'https://narakacheats.org'],
	['https://www.dota2cheats.org', 'https://www.narakacheats.org'],
	['https://dota2cheats.org', 'https://narakacheats.org'],
	['www.dota2hacks.org', 'www.narakacheats.org'],
	['www.dota2cheats.org', 'www.narakacheats.org'],
	['dota2hacks.org', 'narakacheats.org'],
	['dota2cheats.org', 'narakacheats.org'],
	['support@dota2hacks.org', 'support@narakacheats.org'],
	['support@dota2cheats.org', 'support@narakacheats.org'],
	['project-name=dota2hacks', 'project-name=narakacheats'],
	['name = "dota2-hacks-org"', 'name = "naraka-cheats-org"'],
	['name = "dota2hacks"', 'name = "naraka-cheats-org"'],
	['"name": "dota2-hacks"', '"name": "naraka-cheats"'],
	['https://www.callofduty.com/dota2/news', 'https://store.steampowered.com/app/1203220/news/'],
	['https://www.callofduty.com/dota2', 'https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/'],
	['https://www.callofduty.com/dota2', 'https://store.steampowered.com/app/1203220'],
	['https://dota2.fandom.com/wiki/Call_of_Duty:_Dota 2', 'https://naraka.fandom.com/wiki/NARAKA:_BLADEPOINT'],
	['https://dota2.fandom.com', 'https://naraka.fandom.com'],
	['playdota2.com', 'store.steampowered.com/app/1203220'],
	['dota2.fandom.com', 'naraka.fandom.com'],
	['https://www.reddit.com/r/Dota 2/', 'https://www.reddit.com/r/NARAKA/'],
	['https://x.com/dota2hacks', 'https://x.com/narakacheats'],
	['@dota2hacks', '@narakacheats'],
	['/products/dota2', '/products/naraka'],
	['reliable-dota2-hacks', 'reliable-naraka-cheats'],
	['best-dota2-hacks', 'best-naraka-cheats'],
	['dota2-cheat-download', 'naraka-cheat-download'],
	['dota2-hacks-2026', 'naraka-cheats-2026'],
	['dota2-radar-hack', 'naraka-radar-hack'],
	['dota2-aimbot-hack', 'naraka-aimbot-hack'],
	['dota2-esp-hack', 'naraka-esp-hack'],
	['dota2-unlock-all', 'naraka-unlock-all'],
	['dota2-soft-aim', 'naraka-soft-aim'],
	['dota2-mod-menu', 'naraka-mod-menu'],
	['dota2-wallhack', 'naraka-wallhack'],
	['dota2-aimbot', 'naraka-aimbot'],
	['dota2-esp', 'naraka-esp'],
	["'dota2-esp'", "'naraka-esp'"],
	['"dota2-esp"', '"naraka-esp"'],
	["'dota2-aimbot'", "'naraka-aimbot'"],
	['"dota2-aimbot"', '"naraka-aimbot"'],
	['dota2-hacks', 'naraka-cheats'],
	['dota2-cheat', 'naraka-cheat'],
	['dota2Images', 'narakaImages'],
	["from './dota2'", "from './naraka'"],
	["from '../data/dota2'", "from '../data/naraka'"],
	["from '../../data/dota2'", "from '../../data/naraka'"],
	['fetch-dota2-images', 'fetch-naraka-images'],
	['fetch-dota2-hero', 'fetch-naraka-hero'],
	['import-dota2-screenshots', 'import-naraka-screenshots'],
	['dota2-hack-overlays', 'naraka-hack-overlays'],
	['fix-dota2-copy', 'fix-naraka-copy'],
	['fix-dota2-content', 'fix-naraka-content'],
	['fix-dota2-lexicon', 'fix-naraka-lexicon'],
	['adapt-dota2', 'adapt-naraka'],
	['rebrand-dota2-hacks', 'rebrand-naraka-cheats'],
	['trucos-dota2', 'trucos-naraka'],
	['triche-dota2', 'triche-naraka'],
	['cheats-dota2', 'cheats-naraka'],
	['trucchi-dota2', 'trucchi-naraka'],
	['cheaty-dota2', 'cheaty-naraka'],
	['chity-dota2', 'chity-naraka'],
	['chitov-dota2', 'chitov-naraka'],
	['chitiv-dota2', 'chitiv-naraka'],
	['cheatow-dota2', 'cheatow-naraka'],
	['hile-dota2', 'hile-naraka'],
	['dota2-hile', 'naraka-hile'],
	['dota2-esp-chity', 'naraka-esp-chity'],
	['dota2-aimbot-chity', 'naraka-aimbot-chity'],
	['unentdeckte-dota2-hacks', 'unentdeckte-naraka-cheats'],
	['hacks-dota2-indetectaveis', 'cheats-naraka-indetectaveis'],
	['trucchi-dota2-indetectabili', 'trucchi-naraka-indetectabili'],
	['niewykrywalne-hacks-dota2', 'niewykrywalne-cheats-naraka'],
	['nedecektiruemye-chity-dota2', 'nedecektiruemye-chity-naraka'],
	['tespit-edilemeyen-dota2-hileleri', 'tespit-edilemeyen-naraka-hileleri'],
	['nedecektovani-chity-dota2', 'nedecektovani-chity-naraka'],
	['hacks-dota2-nedetectabile', 'cheats-naraka-nedetectabile'],
	['basta-dota2-hacks', 'basta-naraka-cheats'],
	['dota2-hacks-funktionen', 'naraka-cheats-funktionen'],
	['dota2-hacks-functies', 'naraka-cheats-functies'],
	['caracteristicas-trucos-dota2', 'caracteristicas-trucos-naraka'],
	['fonctionnalites-triche-dota2', 'fonctionnalites-triche-naraka'],
	['recursos-hacks-dota2', 'recursos-cheats-naraka'],
	['maps, sites, and buy stations', 'maps, zones, and combat points'],
	['maps, sites and buy stations', 'maps, zones and combat points'],
	['ranked matches rounds and ranked matches matches', 'battle royale rounds and ranked matches matches'],
	['agents & ranked teams', 'heroes & ranked teams'],
	['operator markers', 'hero markers'],
	['buy stations', 'combat zones'],
	['maps and bomb sites', 'maps and combat zones'],
	['near bomb sites and choke points', 'near combat zones and choke points'],
	['loadout drop routes', 'grapple routes'],
	['Agent and ability ESP', 'Hero and weapon ESP'],
	['operator ESP', 'hero ESP'],
	['round win worth the push', 'elimination worth the push'],
	['tactical tools', 'melee combat tools'],
	['Riot Games', '24 Entertainment'],
	['competitive fight', 'melee combat'],
	['competitive fights', 'melee combat sessions'],
	['competitive tips', 'battle royale tips'],
	['map callouts', 'map zones'],
	['on bomb sites', 'in combat zones'],
	['Dota 2CheatsSite', 'NarakaCheatsSite'],
	['Dota 2 Intel', 'Naraka Intel'],
	['Dota 2 Hacks', 'Naraka Cheats'],
	['dota 2 cheats', 'naraka cheats'],
	['dota 2 cheat', 'naraka cheat'],
	['dota 2 hacks', 'naraka cheats'],
	['dota 2 hack', 'naraka cheat'],
	['Dota 2 ESP', 'Naraka ESP'],
	['Dota 2 Aimbot', 'Naraka Aimbot'],
	['dota 2 esp', 'naraka esp'],
	['dota 2 aimbot', 'naraka aimbot'],
	['dota 2 wallhack', 'naraka wallhack'],
	['dota2 radar', 'naraka radar'],
	['Buy Dota 2 Hacks', 'Buy Naraka Cheats'],
	['what-are-dota2-hacks', 'what-are-naraka-cheats'],
	['are-dota2-hacks-reliable-in-2026', 'are-naraka-cheats-reliable-in-2026'],
	['competitive-rounds-and-ranked-sessions', 'battle-royale-rounds-and-ranked-sessions'],
	['what-is-a-dota2-wallhack', 'what-is-a-naraka-wallhack'],
	['does-dota2-hacks-include-radar-hack', 'does-naraka-cheats-include-radar-hack'],
	['vac-anti-cheat-and-dota2-hacks', 'neac-anti-cheat-and-naraka-cheats'],
	['buy-reliable-dota2-hacks-windows-pc', 'buy-reliable-naraka-cheats-windows-pc'],
	['dota2-soft-aim-review', 'naraka-soft-aim-review'],
	['dota2-esp-ranked-review', 'naraka-esp-ranked-review'],
	['dota2-cloud-dma-review', 'naraka-cloud-dma-review'],
	['dota2-cheat-setup-review', 'naraka-cheat-setup-review'],
	['dota2-agent-esp-review', 'naraka-hero-esp-review'],
	['dota2-soft-aim-ranked-review', 'naraka-soft-aim-ranked-review'],
	['dota2-radar-hack-review', 'naraka-radar-hack-review'],
	['dota2-vac-update-review', 'naraka-neac-update-review'],
	['dota2-operator-soft-aim-review', 'naraka-melee-soft-aim-review'],
	['xKrypt0_Dota 2', 'xKrypt0_Naraka'],
	['vanLifeDota 2', 'vanLifeNaraka'],
	['dota2-screenshot', 'naraka-screenshot'],
	['dota2-hacks-logo', 'naraka-cheats-logo'],
	['dota2-hacks-hero', 'naraka-cheats-hero'],
	['dota2-hero-banner', 'naraka-hero-banner'],
	['dota2-hero-ghost', 'naraka-hero-ghost'],
	['dota2-hero-source', 'naraka-hero-source'],
	['dota2-esp-player-tags', 'naraka-esp-player-tags'],
	['dota2-wallhack-skeleton', 'naraka-wallhack-skeleton'],
	['dota2-aimbot-skeleton', 'naraka-aimbot-skeleton'],
	['dota2-aimbot-operator', 'naraka-aimbot-melee'],
	['dota2-esp-radar', 'naraka-esp-radar'],
	['dota2-hacks-combat', 'naraka-cheats-combat'],
	['dota2-hacks-wallhack', 'naraka-cheats-wallhack'],
	['dota2-hacks-aimbot-view', 'naraka-cheats-aimbot-view'],
	['dota2-hacks-aimbot', 'naraka-cheats-aimbot'],
	['dota2-hacks-radar', 'naraka-cheats-radar'],
	['dota2-hacks-session', 'naraka-cheats-session'],
	['dota2-hacks-esp', 'naraka-cheats-esp'],
	['Dota 2 Features', 'Naraka Features'],
	['Dota 2 Status', 'Naraka Status'],
	['Dota 2 patches', 'Naraka patches'],
	['Dota 2 updates', 'Naraka updates'],
	['Dota 2 setup', 'Naraka setup'],
	['Dota 2 license', 'Naraka license'],
	['Dota 2 licenses', 'Naraka licenses'],
	['Dota 2 on PC', 'Naraka on PC'],
	['Dota 2 on Steam', 'Naraka on Steam'],
	['vac-bypass', 'neac-bypass'],
	['VAC bypass', 'NEAC bypass'],
	['VAC Bypass', 'NEAC Bypass'],
	['VAC maintenance', 'NEAC maintenance'],
	['Vanguard rebuilds', 'NEAC rebuilds'],
	['VAC update', 'NEAC update'],
	['VAC updates', 'NEAC updates'],
	['VAC patch', 'NEAC patch'],
	['VAC patches', 'NEAC patches'],
	["'vac'", "'neac'"],
	['| vac', '| neac'],
	['vac-anti-cheat', 'neac-anti-cheat'],
	['vc_locale', 'nc_locale'],
	['in Dota 2', 'in Naraka'],
	['for Dota 2', 'for Naraka'],
	['Dota 2 on', 'Naraka on'],
	['Dota 2 or', 'Naraka or'],
	["Dota 2's", "Naraka's"],
	['Dota 2 ', 'Naraka '],
	['Dota 2,', 'Naraka,'],
	['Dota 2.', 'Naraka.'],
	['Dota 2', 'Naraka'],
	['valo hacks', 'naraka cheats'],
	['valo cheats', 'naraka cheats'],
	['valo/valo cheats', 'naraka/naraka cheats'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp', 'dota2-hacks-org']);
const SKIP_FILES = new Set([
	'adapt-dota2.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
	'adapt-finals.mjs',
	'adapt-dota2.mjs',
	'adapt-naraka.mjs',
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

async function renameDota 2Ts() {
	const from = path.join(ROOT, 'src', 'data', 'dota2.ts');
	const to = path.join(ROOT, 'src', 'data', 'naraka.ts');
	try {
		await rename(from, to);
		console.log('Renamed dota2.ts → naraka.ts');
	} catch (e) {
		console.warn(`dota2.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-dota2-images.mjs', 'fetch-naraka-images.mjs'],
		['fetch-dota2-hero.mjs', 'fetch-naraka-hero.mjs'],
		['import-dota2-screenshots.mjs', 'import-naraka-screenshots.mjs'],
		['dota2-hack-overlays.mjs', 'naraka-hack-overlays.mjs'],
		['fix-dota2-copy.mjs', 'fix-naraka-copy.mjs'],
		['fix-dota2-content.mjs', 'fix-naraka-content.mjs'],
		['fix-dota2-lexicon.mjs', 'fix-naraka-lexicon.mjs'],
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
		'naraka-aimbot': 'naraka-aimbot',
		'naraka-esp': 'naraka-esp',
		'naraka-wallhack': 'wallhack',
		'naraka-radar-hack': 'radar',
		'reliable-naraka-cheats': 'reliable',
		'naraka-cheats-2026': 'cheats-2026',
		'neac-bypass': 'neac',
		'naraka-cheats': 'hacks',
		'naraka-cheat-download': 'cheat-download',
		'naraka-mod-menu': 'mod-menu',
		'naraka-soft-aim': 'soft-aim',
		'best-naraka-cheats': 'best-cheats',
		'naraka-aimbot-hack': 'aimbot-hack',
		'naraka-esp-hack': 'esp-hack',
		'naraka-unlock-all': 'unlock-all',
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
		if (!file.includes('dota2')) continue;
		const newName = file
			.replace(/dota2-hacks/g, 'naraka-cheats')
			.replace(/dota2/g, 'naraka');
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
	console.log('Adapting Dota 2 Hacks → Naraka Cheats (narakacheats.org)...\n');
	await renamePageDirs();
	await renameDota 2Ts();
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
