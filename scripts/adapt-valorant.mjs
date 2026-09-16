#!/usr/bin/env node
/**
 * One-time migration: The Final Cheats → Dota 2 Hacks (dota2hacks.org).
 * Run from project root: node scripts/adapt-dota2.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['finals-aimbot', 'dota2-aimbot'],
	['finals-esp', 'dota2-esp'],
	['finals-wallhack', 'dota2-wallhack'],
	['finals-radar-hack', 'dota2-radar-hack'],
	['reliable-finals-cheats', 'reliable-dota2-hacks'],
	['finals-cheats-2026', 'dota2-hacks-2026'],
	['eac-bypass', 'vac-bypass'],
	['finals-cheats', 'dota2-hacks'],
	['finals-cheat-download', 'dota2-cheat-download'],
	['finals-mod-menu', 'dota2-mod-menu'],
	['finals-soft-aim', 'dota2-soft-aim'],
	['best-finals-cheats', 'best-dota2-hacks'],
	['finals-aimbot-hack', 'dota2-aimbot-hack'],
	['finals-esp-hack', 'dota2-esp-hack'],
	['finals-unlock-all', 'dota2-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.thefinalscheats.org', 'https://www.dota2hacks.org'],
	['https://thefinalscheats.org', 'https://dota2hacks.org'],
	['www.thefinalscheats.org', 'www.dota2hacks.org'],
	['thefinalscheats.org', 'dota2hacks.org'],
	['support@thefinalscheats.org', 'support@dota2hacks.org'],
	['project-name=thefinalscheats', 'project-name=dota2hacks'],
	['name = "thefinalscheats"', 'name = "dota2hacks"'],
	['"name": "the-finals-cheats"', '"name": "dota2-hacks"'],
	['https://store.steampowered.com/app/2073850/THE_FINALS/', 'https://www.callofduty.com/dota2'],
	['https://store.steampowered.com/app/2073850/news/', 'https://www.callofduty.com/dota2/news'],
	['https://store.steampowered.com/app/2073850', 'https://www.callofduty.com/dota2'],
	['https://steamcommunity.com/app/2073850', 'https://www.callofduty.com/dota2'],
	['https://www.reachthefinals.com/', 'https://www.callofduty.com/dota2'],
	['https://thefinals.fandom.com/wiki/The_Finals', 'https://dota2.fandom.com/wiki/Call_of_Duty:_Dota 2'],
	['https://thefinals.fandom.com', 'https://dota2.fandom.com'],
	['reachthefinals.com', 'playdota2.com'],
	['thefinals.fandom.com', 'dota2.fandom.com'],
	['/products/the-finals', '/products/dota2'],
	['reliable-finals-cheats', 'reliable-dota2-hacks'],
	['best-finals-cheats', 'best-dota2-hacks'],
	['finals-cheat-download', 'dota2-cheat-download'],
	['finals-cheats-2026', 'dota2-hacks-2026'],
	['finals-radar-hack', 'dota2-radar-hack'],
	['finals-aimbot-hack', 'dota2-aimbot-hack'],
	['finals-esp-hack', 'dota2-esp-hack'],
	['finals-unlock-all', 'dota2-unlock-all'],
	['finals-soft-aim', 'dota2-soft-aim'],
	['finals-mod-menu', 'dota2-mod-menu'],
	['finals-wallhack', 'dota2-wallhack'],
	['finals-aimbot', 'dota2-aimbot'],
	['finals-esp', 'dota2-esp'],
	["'finals-esp'", "'dota2-esp'"],
	['"finals-esp"', '"dota2-esp"'],
	["'finals-aimbot'", "'dota2-aimbot'"],
	['"finals-aimbot"', '"dota2-aimbot"'],
	['finals-cheats', 'dota2-hacks'],
	['finals-cheat', 'dota2-cheat'],
	['finalsImages', 'dota2Images'],
	["from './finals'", "from './dota2'"],
	["from '../data/finals'", "from '../data/dota2'"],
	["from '../../data/finals'", "from '../../data/dota2'"],
	['fetch-finals-images', 'fetch-dota2-images'],
	['fetch-finals-hero', 'fetch-dota2-hero'],
	['import-finals-screenshots', 'import-dota2-screenshots'],
	['finals-hack-overlays', 'dota2-hack-overlays'],
	['fix-finals-copy', 'fix-dota2-copy'],
	['fix-finals-content', 'fix-dota2-content'],
	['adapt-finals', 'adapt-dota2'],
	['trucos-finals', 'trucos-dota2'],
	['triche-finals', 'triche-dota2'],
	['cheats-finals', 'cheats-dota2'],
	['trucchi-finals', 'trucchi-dota2'],
	['cheaty-finals', 'cheaty-dota2'],
	['chity-finals', 'chity-dota2'],
	['chitov-finals', 'chitov-dota2'],
	['chitiv-finals', 'chitiv-dota2'],
	['cheatow-finals', 'cheatow-dota2'],
	['hile-finals', 'hile-dota2'],
	['finals-hile', 'dota2-hile'],
	['finals-esp-chity', 'dota2-esp-chity'],
	['finals-aimbot-chity', 'dota2-aimbot-chity'],
	['unentdeckte-finals-cheats', 'unentdeckte-dota2-hacks'],
	['cheats-finals-indetectaveis', 'hacks-dota2-indetectaveis'],
	['trucchi-finals-indetectabili', 'trucchi-dota2-indetectabili'],
	['niewykrywalne-cheats-finals', 'niewykrywalne-hacks-dota2'],
	['nedecektiruemye-chity-finals', 'nedecektiruemye-chity-dota2'],
	['tespit-edilemeyen-finals-hileleri', 'tespit-edilemeyen-dota2-hileleri'],
	['nedecektovani-chity-finals', 'nedecektovani-chity-dota2'],
	['cheats-finals-nedetectabile', 'hacks-dota2-nedetectabile'],
	['basta-finals-cheats', 'basta-dota2-hacks'],
	['finals-cheats-funktionen', 'dota2-hacks-funktionen'],
	['finals-cheats-functies', 'dota2-hacks-functies'],
	['caracteristicas-trucos-finals', 'caracteristicas-trucos-dota2'],
	['fonctionnalites-triche-finals', 'fonctionnalites-triche-dota2'],
	['recursos-cheats-finals', 'recursos-hacks-dota2'],
	['arenas, stadiums, and cashout zones', 'maps, sites, and buy stations'],
	['arenas, stadiums and cashout zones', 'maps, sites and buy stations'],
	['cashout rounds and arena PvP sessions', 'ranked matches rounds and ranked matches matches'],
	['cashout rounds and arena PvP fights', 'ranked matches rounds and ranked matches matches'],
	['contestants & cashout teams', 'agents & ranked teams'],
	['spike markers', 'operator markers'],
	['cashout zones', 'buy stations'],
	['arenas and cashout spikes', 'maps and bomb sites'],
	['near arenas and cashout spikes', 'near bomb sites and choke points'],
	['cashout routes', 'loadout drop routes'],
	['Spike and cashout ESP', 'Agent and ability ESP'],
	['spike ESP', 'operator ESP'],
	['cashout worth the detour', 'round win worth the push'],
	['arena tools', 'tactical tools'],
	['Embark Studios', 'Riot Games'],
	['arena fight', 'competitive fight'],
	['arena fights', 'competitive fights'],
	['arena tips', 'competitive tips'],
	['arena map', 'map callouts'],
	['in stadiums', 'on maps'],
	['in cashout zones', 'on bomb sites'],
	['Arena', 'Map'],
	['FinalsCheatsSite', 'Dota 2CheatsSite'],
	['Finals Intel', 'Dota 2 Intel'],
	['The Final Cheats', 'Dota 2 Hacks'],
	['the finals cheats', 'dota 2 cheats'],
	['the finals cheat', 'dota 2 cheat'],
	['thefinals cheats', 'dota 2 cheats'],
	['thefinals cheat', 'dota 2 cheat'],
	['thefinals hacks', 'dota 2 hacks'],
	['thefinals hack', 'dota 2 hack'],
	['The Finals ESP', 'Dota 2 ESP'],
	['The Finals Aimbot', 'Dota 2 Aimbot'],
	['the finals esp', 'dota 2 esp'],
	['the finals aimbot', 'dota 2 aimbot'],
	['the finals wallhack', 'dota 2 wallhack'],
	['the finals radar', 'dota2 radar'],
	['Buy The Finals Cheats', 'Buy Dota 2 Hacks'],
	['what-are-finals-cheats', 'what-are-dota2-hacks'],
	['are-finals-cheats-reliable-in-2026', 'are-dota2-hacks-reliable-in-2026'],
	['cashout-rounds-and-arena-sessions', 'competitive-rounds-and-ranked-sessions'],
	['what-is-a-finals-wallhack', 'what-is-a-dota2-wallhack'],
	['does-finals-cheats-include-radar-hack', 'does-dota2-hacks-include-radar-hack'],
	['eac-anti-cheat-and-finals-cheats', 'vac-anti-cheat-and-dota2-hacks'],
	['buy-reliable-finals-cheats-windows-pc', 'buy-reliable-dota2-hacks-windows-pc'],
	['finals-soft-aim-review', 'dota2-soft-aim-review'],
	['finals-esp-cashout-review', 'dota2-esp-ranked-review'],
	['finals-cloud-dma-review', 'dota2-cloud-dma-review'],
	['finals-cheat-setup-review', 'dota2-cheat-setup-review'],
	['finals-spike-esp-review', 'dota2-agent-esp-review'],
	['finals-soft-aim-match-review', 'dota2-soft-aim-ranked-review'],
	['finals-radar-hack-review', 'dota2-radar-hack-review'],
	['finals-eac-update-review', 'dota2-vac-update-review'],
	['finals-sniper-soft-aim-review', 'dota2-operator-soft-aim-review'],
	['xKrypt0_Finals', 'xKrypt0_Dota 2'],
	['vanLifeFinals', 'vanLifeDota 2'],
	['finals-screenshot', 'dota2-screenshot'],
	['finals-cheats-logo', 'dota2-hacks-logo'],
	['finals-cheats-hero', 'dota2-hacks-hero'],
	['finals-hero-banner', 'dota2-hero-banner'],
	['finals-hero-ghost', 'dota2-hero-ghost'],
	['finals-hero-source', 'dota2-hero-source'],
	['finals-esp-player-tags', 'dota2-esp-player-tags'],
	['finals-wallhack-skeleton', 'dota2-wallhack-skeleton'],
	['finals-aimbot-skeleton', 'dota2-aimbot-skeleton'],
	['finals-aimbot-sniper', 'dota2-aimbot-operator'],
	['finals-esp-radar', 'dota2-esp-radar'],
	['finals-cheats-combat', 'dota2-hacks-combat'],
	['finals-cheats-wallhack', 'dota2-hacks-wallhack'],
	['finals-cheats-aimbot-view', 'dota2-hacks-aimbot-view'],
	['finals-cheats-aimbot', 'dota2-hacks-aimbot'],
	['finals-cheats-radar', 'dota2-hacks-radar'],
	['finals-cheats-session', 'dota2-hacks-session'],
	['finals-cheats-esp', 'dota2-hacks-esp'],
	['The Finals Hacks', 'Dota 2 Hacks'],
	['The Finals Features', 'Dota 2 Features'],
	['The Finals Status', 'Dota 2 Status'],
	['The Finals patches', 'Dota 2 patches'],
	['The Finals updates', 'Dota 2 updates'],
	['The Finals setup', 'Dota 2 setup'],
	['The Finals license', 'Dota 2 license'],
	['The Finals licenses', 'Dota 2 licenses'],
	['The Finals on Steam', 'Dota 2 on PC'],
	['eac-bypass', 'vac-bypass'],
	['EAC bypass', 'VAC bypass'],
	['EAC Bypass', 'VAC Bypass'],
	['EAC maintenance', 'VAC maintenance'],
	['EAC rebuilds', 'Vanguard rebuilds'],
	['EAC update', 'VAC update'],
	['EAC updates', 'VAC updates'],
	['EAC patch', 'VAC patch'],
	['EAC patches', 'VAC patches'],
	['Easy Anti-Cheat (EAC)', 'Vanguard'],
	['Easy Anti-Cheat', 'Vanguard'],
	["'eac'", "'vac'"],
	['| eac', '| vac'],
	['eac-anti-cheat', 'vac-anti-cheat'],
	['fc_locale', 'vc_locale'],
	['in The Finals', 'in Dota 2'],
	['for The Finals', 'for Dota 2'],
	['The Finals on', 'Dota 2 on'],
	['The Finals or', 'Dota 2 or'],
	["The Finals'", "Dota 2's"],
	['The Finals ', 'Dota 2 '],
	['The Finals,', 'Dota 2,'],
	['The Finals.', 'Dota 2.'],
	['The Finals', 'Dota 2'],
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

async function renameFinalsTs() {
	const from = path.join(ROOT, 'src', 'data', 'finals.ts');
	const to = path.join(ROOT, 'src', 'data', 'dota2.ts');
	try {
		await rename(from, to);
		console.log('Renamed finals.ts → dota2.ts');
	} catch (e) {
		console.warn(`finals.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-finals-images.mjs', 'fetch-dota2-images.mjs'],
		['fetch-finals-hero.mjs', 'fetch-dota2-hero.mjs'],
		['import-finals-screenshots.mjs', 'import-dota2-screenshots.mjs'],
		['finals-hack-overlays.mjs', 'dota2-hack-overlays.mjs'],
		['fix-finals-copy.mjs', 'fix-dota2-copy.mjs'],
		['fix-finals-content.mjs', 'fix-dota2-content.mjs'],
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
		'reliable-dota2-hacks': 'reliable',
		'dota2-hacks-2026': 'cheats-2026',
		'vac-bypass': 'vac',
		'dota2-hacks': 'hacks',
		'dota2-cheat-download': 'cheat-download',
		'dota2-mod-menu': 'mod-menu',
		'dota2-soft-aim': 'soft-aim',
		'best-dota2-hacks': 'best-cheats',
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
		if (!file.includes('finals')) continue;
		const newName = file
			.replace(/finals-cheats/g, 'dota2-hacks')
			.replace(/finals/g, 'dota2');
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
	console.log('Adapting The Final Cheats → Dota 2 Hacks (dota2hacks.org)...\n');
	await renamePageDirs();
	await renameFinalsTs();
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
