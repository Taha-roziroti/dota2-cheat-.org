#!/usr/bin/env node
/**
 * One-time migration: Dota 2 Hacks → Tarkov Cheats (Escape from Tarkov).
 * Domain: tarkovcheats.org
 * Run from project root: node scripts/adapt-tarkov.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['dota2-aimbot', 'tarkov-aimbot'],
	['dota2-esp', 'tarkov-esp'],
	['dota2-wallhack', 'tarkov-wallhack'],
	['dota2-radar-hack', 'tarkov-radar-hack'],
	['reliable-dota2-cheats', 'reliable-tarkov-cheats'],
	['dota2-cheats-2026', 'tarkov-cheats-2026'],
	['vac-bypass', 'battleye-bypass'],
	['dota2-hacks', 'tarkov-cheats'],
	['dota2-cheat-download', 'tarkov-cheat-download'],
	['dota2-mod-menu', 'tarkov-mod-menu'],
	['dota2-soft-aim', 'tarkov-soft-aim'],
	['best-dota2-cheats', 'best-tarkov-cheats'],
	['dota2-aimbot-hack', 'tarkov-aimbot-hack'],
	['dota2-esp-hack', 'tarkov-esp-hack'],
	['dota2-unlock-all', 'tarkov-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://dota2hacks.net', 'https://tarkovcheats.org'],
	['https://www.dota2hacks.net', 'https://www.tarkovcheats.org'],
	['www.dota2hacks.net', 'www.tarkovcheats.org'],
	['dota2hacks.net', 'tarkovcheats.org'],
	['support@dota2hacks.net', 'support@tarkovcheats.org'],
	['support@dota2scheats.net', 'support@tarkovcheats.org'],
	['dota2scheats.net', 'tarkovcheats.org'],
	['dota2scheats.com', 'tarkovcheats.org'],
	['dota2scheats.xyz', 'tarkovcheats.org'],
	['/products/dota2', '/products/tarkov'],
	['project-name=dota2hacks', 'project-name=besttarkovcheats'],
	['project-name=dota2scheats', 'project-name=besttarkovcheats'],
	['name = "dota2hacks"', 'name = "besttarkovcheats"'],
	['name = "dota2scheats"', 'name = "besttarkovcheats"'],
	['"name": "dota2-hacks"', '"name": "tarkov-cheats"'],
	['dota2-esp-player-tags', 'tarkov-esp-player-tags'],
	['dota2-wallhack-skeleton', 'tarkov-wallhack-skeleton'],
	['dota2-aimbot-sniper', 'tarkov-aimbot-sniper'],
	['dota2-aimbot-skeleton', 'tarkov-aimbot-skeleton'],
	['dota2-esp-radar', 'tarkov-esp-radar'],
	['dota2-cheats-combat', 'tarkov-cheats-combat'],
	['dota2-hacks-logo', 'tarkov-cheats-logo'],
	['dota2-hero-banner', 'tarkov-hero-banner'],
	['dota2-hero-ghost', 'tarkov-hero-ghost'],
	['dota2-hero-source', 'tarkov-hero-source'],
	['reliable-dota2-cheats', 'reliable-tarkov-cheats'],
	['best-dota2-cheats', 'best-tarkov-cheats'],
	['dota2-cheat-download', 'tarkov-cheat-download'],
	['dota2-cheats-2026', 'tarkov-cheats-2026'],
	['dota2-radar-hack', 'tarkov-radar-hack'],
	['dota2-aimbot-hack', 'tarkov-aimbot-hack'],
	['dota2-esp-hack', 'tarkov-esp-hack'],
	['dota2-unlock-all', 'tarkov-unlock-all'],
	['dota2-soft-aim', 'tarkov-soft-aim'],
	['dota2-mod-menu', 'tarkov-mod-menu'],
	['dota2-wallhack', 'tarkov-wallhack'],
	['dota2-hacks', 'tarkov-cheats'],
	['dota2-aimbot', 'tarkov-aimbot'],
	['dota2-esp', 'tarkov-esp'],
	['vac-bypass', 'battleye-bypass'],
	["'vac'", "'battleye'"],
	['| vac', '| battleye'],
	['pageId="vac"', 'pageId="battleye"'],
	['pageId: \'vac\'', "pageId: 'battleye'"],
	['"vac"', '"battleye"'],
	['call-of-duty-dota2-cheats', 'escape-from-tarkov-cheats'],
	['Dota 2', 'Escape from Tarkov'],
	['Dota 2 Dota 2', 'Escape from Tarkov'],
	['Dota 2 Hacks', 'Tarkov Cheats'],
	['Dota 2 Cheats', 'Tarkov Cheats'],
	['Dota 2 cheats', 'Tarkov cheats'],
	['Dota 2 cheat', 'Tarkov cheat'],
	['Dota 2 hacks', 'Tarkov cheats'],
	['Dota 2 hack', 'Tarkov cheat'],
	['Dota 2CheatsSite', 'TarkovCheatsSite'],
	['Dota 2 Intel', 'Tarkov Intel'],
	['VAC anti-cheat', 'BattlEye anti-cheat'],
	['VAC maintenance', 'BattlEye maintenance'],
	['VAC bypass', 'BattlEye bypass'],
	['VAC Bypass', 'BattlEye Bypass'],
	['VAC patches', 'BattlEye patches'],
	['VAC patch', 'BattlEye patch'],
	['VAC updates', 'BattlEye updates'],
	['VAC update', 'BattlEye update'],
	['after VAC', 'after BattlEye'],
	['RICOCHET', 'BattlEye'],
	['VAC', 'BattlEye'],
	['vac', 'battleye'],
	['dota 2 hacks', 'tarkov cheats'],
	['dota 2 cheats', 'tarkov cheats'],
	['dota 2 hack', 'tarkov cheat'],
	['dota 2 cheat', 'tarkov cheat'],
	['the map, Urzikstan, and Rebirth Island', 'Customs, Woods, and Streets of Tarkov'],
	['the map, Urzikstan and Rebirth Island', 'Customs, Woods and Streets of Tarkov'],
	['the map, Urzikstan et Rebirth Island', 'Customs, Woods et Streets of Tarkov'],
	['the map, Urzikstan e Rebirth Island', 'Customs, Woods e Streets of Tarkov'],
	['the map, Urzikstan und Rebirth Island', 'Customs, Woods und Streets of Tarkov'],
	['gulag fights', 'extract fights'],
	['gulag fight', 'extract fight'],
	['gulag rounds', 'raid rounds'],
	['gulag', 'extract'],
	['BR and Resurgence-style modes', 'PMC raids and Scav runs'],
	['BR and Resurgence', 'PMC raids and Scav runs'],
	['BR & Resurgence', 'PMC & Scav'],
	['Resurgence and ranked matches', 'PMC raids and Scav runs'],
	['ranked matches', 'raid'],
	['Resurgence', 'Scav run'],
	['resurgence', 'scav run'],
	['contract markers', 'extract and weapon drops markers'],
	['loadout drops', 'high-value weapon drops'],
	['loadout drop', 'high-value weapon drops'],
	['Operators', 'PMCs'],
	['operators', 'PMCs'],
	['UAV', 'extract timer'],
	['dota2Images', 'tarkovImages'],
	["from './dota2'", "from './tarkov'"],
	["from '../data/dota2'", "from '../data/tarkov'"],
	["from '../../data/dota2'", "from '../../data/tarkov'"],
	['fetch-dota2-images', 'fetch-tarkov-images'],
	['dota2-hack-overlays', 'tarkov-hack-overlays'],
	['trucos-dota2', 'trucos-tarkov'],
	['triche-dota2', 'triche-tarkov'],
	['cheats-dota2', 'cheats-tarkov'],
	['trucchi-dota2', 'trucchi-tarkov'],
	['cheaty-dota2', 'cheaty-tarkov'],
	['chity-dota2', 'chity-tarkov'],
	['chitov-dota2', 'chitov-tarkov'],
	['chitiv-dota2', 'chitiv-tarkov'],
	['cheatow-dota2', 'cheatow-tarkov'],
	['hile-dota2', 'hile-tarkov'],
	['dota2-hile', 'tarkov-hile'],
	['dota2-esp-chity', 'tarkov-esp-chity'],
	['dota2-aimbot-chity', 'tarkov-aimbot-chity'],
	['unentdeckte-dota2-cheats', 'unentdeckte-tarkov-cheats'],
	['cheats-dota2-indetectaveis', 'cheats-tarkov-indetectaveis'],
	['trucchi-dota2-indetectabili', 'trucchi-tarkov-indetectabili'],
	['niewykrywalne-cheats-dota2', 'niewykrywalne-cheats-tarkov'],
	['nedecektiruemye-chity-dota2', 'nedecektiruemye-chity-tarkov'],
	['tespit-edilemeyen-dota2-hileleri', 'tespit-edilemeyen-tarkov-hileleri'],
	['nedecektovani-chity-dota2', 'nedecektovani-chity-tarkov'],
	['cheats-dota2-nedetectabile', 'cheats-tarkov-nedetectabile'],
	['basta-dota2-cheats', 'basta-tarkov-cheats'],
	['dota2-cheats-funktionen', 'tarkov-cheats-funktionen'],
	['dota2-cheats-functies', 'tarkov-cheats-functies'],
	['caracteristicas-trucos-dota2', 'caracteristicas-trucos-tarkov'],
	['fonctionnalites-triche-dota2', 'fonctionnalites-triche-tarkov'],
	['recursos-cheats-dota2', 'recursos-cheats-tarkov'],
	['call-of-duty-dota2', 'escape-from-tarkov'],
	['Buy Dota 2 Hacks', 'Buy Tarkov Cheats'],
	['Dota 2', 'Tarkov'],
	['dota2', 'tarkov'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'adapt-dota2.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
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
	const to = path.join(ROOT, 'src', 'data', 'tarkov.ts');
	try {
		await rename(from, to);
		console.log('Renamed dota2.ts → tarkov.ts');
	} catch (e) {
		console.warn(`dota2.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-dota2-images.mjs', 'fetch-tarkov-images.mjs'],
		['dota2-hack-overlays.mjs', 'tarkov-hack-overlays.mjs'],
		['fix-dota2-copy.mjs', 'fix-tarkov-copy.mjs'],
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
		'tarkov-aimbot': 'tarkov-aimbot',
		'tarkov-esp': 'tarkov-esp',
		'tarkov-wallhack': 'wallhack',
		'tarkov-radar-hack': 'radar',
		'reliable-tarkov-cheats': 'reliable',
		'tarkov-cheats-2026': 'cheats-2026',
		'battleye-bypass': 'battleye',
		'tarkov-cheats': 'hacks',
		'tarkov-cheat-download': 'cheat-download',
		'tarkov-mod-menu': 'mod-menu',
		'tarkov-soft-aim': 'soft-aim',
		'best-tarkov-cheats': 'best-cheats',
		'tarkov-aimbot-hack': 'aimbot-hack',
		'tarkov-esp-hack': 'esp-hack',
		'tarkov-unlock-all': 'unlock-all',
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
		const newName = file.replace(/dota2/g, 'tarkov').replace(/tarkov-hacks-logo/g, 'tarkov-cheats-logo');
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
	console.log('Adapting Dota 2 Hacks → Tarkov Cheats (tarkovcheats.org)...\n');
	await renamePageDirs();
	await renameDota 2Ts();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: fix brand.ts identity, sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
