#!/usr/bin/env node
/**
 * One-time migration: Fortnite Cheats → Dota 2 Hacks.
 * Run from project root: node scripts/adapt-dota2.mjs
 */
import { readFile, writeFile, readdir, rm, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['fortnite-aimbot', 'dota2-aimbot'],
	['fortnite-esp', 'dota2-esp'],
	['fortnite-wallhack', 'dota2-wallhack'],
	['fortnite-radar-hack', 'dota2-radar-hack'],
	['reliable-fortnite-cheats', 'reliable-dota2-cheats'],
	['fortnite-cheats-2026', 'dota2-cheats-2026'],
	['eac-bypass-fortnite', 'vac-bypass'],
	['fortnite-hacks', 'dota2-hacks'],
	['fortnite-cheat-download', 'dota2-cheat-download'],
	['fortnite-mod-menu', 'dota2-mod-menu'],
	['fortnite-soft-aim', 'dota2-soft-aim'],
	['best-fortnite-cheats', 'best-dota2-cheats'],
	['fortnite-aimbot-hack', 'dota2-aimbot-hack'],
	['fortnite-esp-hack', 'dota2-esp-hack'],
	['fortnite-unlock-all', 'dota2-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['fortnitehack.net', 'dota2scheats.net'],
	['fortnitecheats.xyz', 'dota2scheats.xyz'],
	['fortnitecheats.net', 'dota2scheats.net'],
	['fortnitecheats.com', 'dota2scheats.com'],
	['support@fortnitehack.net', 'support@dota2scheats.net'],
	['/products/fortnite', '/products/dota2'],
	['fortnite-esp-wallhack', 'dota2-esp-wallhack'],
	['fortnite-esp-hack', 'dota2-esp-hack'],
	['fortnite-aimbot-hack', 'dota2-aimbot-hack'],
	['reliable-fortnite-cheats', 'reliable-dota2-cheats'],
	['fortnite-cheats-2026', 'dota2-cheats-2026'],
	['fortnite-radar-hack', 'dota2-radar-hack'],
	['fortnite-wallhack', 'dota2-wallhack'],
	['eac-bypass-fortnite', 'vac-bypass'],
	['fortnite-cheat-download', 'dota2-cheat-download'],
	['fortnite-mod-menu', 'dota2-mod-menu'],
	['fortnite-soft-aim', 'dota2-soft-aim'],
	['best-fortnite-cheats', 'best-dota2-cheats'],
	['fortnite-unlock-all', 'dota2-unlock-all'],
	['fortnite-hacks', 'dota2-hacks'],
	['fortnite-aimbot', 'dota2-aimbot'],
	['fortnite-esp', 'dota2-esp'],
	["'eac-bypass'", "'vac'"],
	['| eac-bypass', '| vac'],
	['fortnite-cheats', 'call-of-duty-dota2-cheats'],
	['call-of-duty-dota2-cheats-buyers-guide', 'call-of-duty-dota2-cheats-buyers-guide'],
	['Fortnite Hacks', 'Dota 2 Hacks'],
	['Fortnite Cheats', 'Dota 2 Cheats'],
	['Fortnite cheats', 'Dota 2 cheats'],
	['Fortnite cheat', 'Dota 2 cheat'],
	['FortniteCheatsSite', 'Dota 2CheatsSite'],
	['Fortnite Intel', 'Dota 2 Intel'],
	['Easy Anti-Cheat (EAC)', 'VAC anti-cheat'],
	['Easy Anti-Cheat', 'VAC anti-cheat'],
	['EAC maintenance', 'VAC maintenance'],
	['EAC bypass', 'VAC bypass'],
	['EAC Bypass', 'VAC Bypass'],
	['EAC patches', 'VAC patches'],
	['EAC patch', 'VAC patch'],
	['EAC updates', 'VAC updates'],
	['EAC update', 'VAC update'],
	['after EAC', 'after VAC'],
	['fortnite hacks', 'dota 2 hacks'],
	['fortnite cheats', 'dota 2 cheats'],
	['survival island, Zero Build, and official servers', 'the map, Urzikstan, and Rebirth Island'],
	['survival island, Zero Build and official servers', 'the map, Urzikstan and Rebirth Island'],
	['survival island, Zero Build et lobbies compétitifs', 'the map, Urzikstan et Rebirth Island'],
	['survival island, Zero Build e lobbies competitivi', 'the map, Urzikstan e Rebirth Island'],
	['survival island, Zero Build und Competitive-Lobbys', 'the map, Urzikstan und Rebirth Island'],
	['reboot van rotations', 'gulag fights'],
	['reboot van fight', 'gulag fight'],
	['respawn rounds', 'gulag rounds'],
	['reboot van', 'gulag'],
	['Zero Build and survival', 'Resurgence and survival'],
	['BR and Zero Build', 'BR and Resurgence'],
	['BR & Zero Build', 'BR & Resurgence'],
	['Zero Build', 'Resurgence'],
	['weapon drops chests', 'fresh weapon drops'],
	['weapon drops chest', 'loadout drop'],
	['survival island', 'the map'],
	['survival-island', 'al-mazrah'],
	['supply drop', 'UAV'],
	['species', 'species'],
	['operators', 'operators'],
	['fortniteImages', 'dota2Images'],
	["from './fortnite'", "from './dota2'"],
	["from '../data/fortnite'", "from '../data/dota2'"],
	['fortnitecheats', 'dota2scheats'],
	['project-name=fortnitecheats', 'project-name=dota2scheats'],
	['name = "fortnitecheats"', 'name = "dota2scheats"'],
	['https://fortnitehack.net', 'https://dota2scheats.net'],
	['trucos-fortnite', 'trucos-dota2'],
	['triche-fortnite', 'triche-dota2'],
	['cheats-fortnite', 'cheats-dota2'],
	['trucchi-fortnite', 'trucchi-dota2'],
	['cheaty-fortnite', 'cheaty-dota2'],
	['chity-fortnite', 'chity-dota2'],
	['chitov-fortnite', 'chitov-dota2'],
	['chitiv-fortnite', 'chitiv-dota2'],
	['cheatow-fortnite', 'cheatow-dota2'],
	['hile-fortnite', 'hile-dota2'],
	['fortnite-hile', 'dota2-hile'],
	['fortnite-esp-chity', 'dota2-esp-chity'],
	['fortnite-aimbot-chity', 'dota2-aimbot-chity'],
	['unentdeckte-fortnite-cheats', 'unentdeckte-dota2-cheats'],
	['cheats-fortnite-indetectaveis', 'cheats-dota2-indetectaveis'],
	['trucchi-fortnite-indetectabili', 'trucchi-dota2-indetectabili'],
	['niewykrywalne-cheats-fortnite', 'niewykrywalne-cheats-dota2'],
	['nedecektiruemye-chity-fortnite', 'nedecektiruemye-chity-dota2'],
	['tespit-edilemeyen-fortnite-hileleri', 'tespit-edilemeyen-dota2-hileleri'],
	['nedecektovani-chity-fortnite', 'nedecektovani-chity-dota2'],
	['cheats-fortnite-nedetectabile', 'cheats-dota2-nedetectabile'],
	['basta-fortnite-cheats', 'basta-dota2-cheats'],
	['fortnite-cheats-funktionen', 'dota2-cheats-funktionen'],
	['fortnite-cheats-functies', 'dota2-cheats-functies'],
	['caracteristicas-trucos-fortnite', 'caracteristicas-trucos-dota2'],
	['fonctionnalites-triche-fortnite', 'fonctionnalites-triche-dota2'],
	['recursos-cheats-fortnite', 'recursos-cheats-dota2'],
	['funzioni-trucchi-fortnite', 'funzioni-trucchi-fortnite'],
	['Dota 2', 'Dota 2'],
	['Dota 2 Dota 2', 'Dota 2 Dota 2'],
	['Fortnite', 'Dota 2'],
	['fortnite', 'dota2'],
	['eac-bypass', 'vac-bypass'],
	['eac', 'vac'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);

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
		if (file.endsWith('adapt-dota2.mjs') || file.endsWith('adapt-fortnite.mjs')) continue;
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

async function renameFortniteTs() {
	const from = path.join(ROOT, 'src', 'data', 'fortnite.ts');
	const to = path.join(ROOT, 'src', 'data', 'dota2.ts');
	try {
		await rename(from, to);
		console.log('Renamed fortnite.ts → dota2.ts');
	} catch (e) {
		console.warn(`fortnite.ts rename: ${e.message}`);
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
		'dota2-hacks': 'hacks',
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
		if (file.includes('fortnite') || file.includes('call-of-duty-dota2')) {
			const newName = file
				.replace(/fortnite-cheats/g, 'call-of-duty-dota2-cheats')
				.replace(/fortnite-/g, 'dota2-')
				.replace(/fortnite/g, 'call-of-duty-dota2');
			if (newName !== file) {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Fortnite Cheats → Dota 2 Hacks...\n');
	await renamePageDirs();
	await renameFortniteTs();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next steps:');
	console.log('  node scripts/generate-i18n-content.mjs');
	console.log('  node scripts/generate-blog-posts.mjs');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
