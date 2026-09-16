#!/usr/bin/env node
/**
 * One-time migration: Dota 2 Cheats template → Fortnite Cheats.
 * Run from project root: node scripts/adapt-fortnite.mjs
 */
import { readFile, writeFile, readdir, rm, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REMOVE_PAGE_DIRS = [
	'dota2-hacks',
	'dota2-cheat-download',
	'dota2-mod-menu',
	'dota2-soft-aim',
	'best-dota2-cheats',
	'dota2-aimbot-hack',
	'dota2-esp-hack',
	'dota2-unlock-all',
];

const RENAME_PAGE_DIRS = [
	['dota2-aimbot', 'fortnite-aimbot'],
	['dota2-esp', 'fortnite-esp'],
	['dota2-wallhack', 'fortnite-wallhack'],
	['dota2-radar-hack', 'fortnite-radar-hack'],
	['reliable-dota2-cheats', 'reliable-fortnite-cheats'],
	['dota2-cheats-2026', 'fortnite-cheats-2026'],
	['vac-bypass', 'eac-bypass-fortnite'],
];

const REMOVE_PAGE_IDS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['dota2scheats.net', 'fortnitehack.net'],
	['dota2cheats.net', 'fortnitehack.net'],
	['dota2cheats.com', 'fortnitehack.net'],
	['dota2scheats.com', 'fortnitehack.net'],
	['support@dota2scheats.net', 'support@fortnitehack.net'],
	['/products/dota2', '/products/fortnite'],
	['dota2-esp-wallhack', 'fortnite-esp-wallhack'],
	['dota2-esp-hack', 'fortnite-esp'],
	['dota2-aimbot-hack', 'fortnite-aimbot'],
	['reliable-dota2-cheats', 'reliable-fortnite-cheats'],
	['dota2-cheats-2026', 'fortnite-cheats-2026'],
	['dota2-radar-hack', 'fortnite-radar-hack'],
	['dota2-wallhack', 'fortnite-wallhack'],
	['vac-bypass', 'eac-bypass-fortnite'],
	['dota2-aimbot', 'fortnite-aimbot'],
	['dota2-esp', 'fortnite-esp'],
	["'vac'", "'eac-bypass'"],
	['| vac', '| eac-bypass'],
	['dota2-aimbot', 'fortnite-aimbot'],
	['dota2-esp', 'fortnite-esp'],
	['call-of-duty-dota2-cheats', 'fortnite-cheats'],
	['call-of-duty-dota2', 'fortnite'],
	['Dota 2', 'Fortnite'],
	['Dota 2 Dota 2', 'Fortnite'],
	['Dota 2 Cheats', 'Fortnite Cheats'],
	['Dota 2 cheats', 'Fortnite cheats'],
	['Dota 2 cheat', 'Fortnite cheat'],
	['Dota 2 CheatsSite', 'FortniteCheatsSite'],
	['Dota 2 CheatsSite', 'FortniteCheatsSite'],
	['VAC anti-cheat', 'Easy Anti-Cheat (EAC)'],
	['VAC maintenance', 'EAC maintenance'],
	['VAC bypass', 'EAC bypass'],
	['VAC Bypass', 'EAC Bypass'],
	['VAC', 'Easy Anti-Cheat (EAC)'],
	['vac', 'eac'],
	['the map, Urzikstan, and Rebirth Island', 'survival island, Zero Build, and official servers'],
	['the map, Urzikstan and Rebirth Island', 'survival island, Zero Build and official servers'],
	['the map, Urzikstan, et Rebirth Island', 'survival island, Zero Build et lobbies compétitifs'],
	['the map, Urzikstan e Rebirth Island', 'survival island, Zero Build e lobbies competitivi'],
	['the map, Urzikstan und Rebirth Island', 'survival island, Zero Build und Competitive-Lobbys'],
	['gulag fights', 'reboot van rotations'],
	['gulag fight', 'reboot van fight'],
	['gulag rounds', 'respawn rounds'],
	['gulag', 'reboot van'],
	['operators', 'players'],
	['operator', 'player'],
	['species', 'Players'],
	['Operator', 'Player'],
	['UAV', 'supply drop'],
	['Resurgence and survival', 'Zero Build and survival'],
	['BR and Resurgence', 'BR and Zero Build'],
	['BR & Resurgence', 'BR & Zero Build'],
	['fresh weapon drops', 'weapon drops chests'],
	['loadout drop', 'weapon drops chest'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Al Mazrah', 'survival island'],
	['al-mazrah', 'survival-island'],
	['dota2Images', 'fortniteImages'],
	["from './dota2'", "from './fortnite'"],
	["from '../data/dota2'", "from '../data/fortnite'"],
	['dota2scheats', 'fortnitecheats'],
	['project-name=dota2scheats', 'project-name=fortnitecheats'],
	['name = "dota2scheats"', 'name = "fortnitecheats"'],
	['https://dota2scheats.net', 'https://fortnitehack.net'],
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
		result = result.split(from).join(to);
	}
	return result;
}

function stripRemovedPageIds(content) {
	let result = content;
	for (const id of REMOVE_PAGE_IDS) {
		// Remove from union types and arrays
		result = result.replace(new RegExp(`\\s*\\|\\s*'${id}'`, 'g'), '');
		result = result.replace(new RegExp(`'${id}',\\s*`, 'g'), '');
		result = result.replace(new RegExp(`,\\s*'${id}'`, 'g'), '');
		// Remove object keys in routing/localizedSlugs
		result = result.replace(new RegExp(`\\t${id.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'), '');
		result = result.replace(new RegExp(`\\t'${id.replace(/-/g, '\\-')}': \\{[\\s\\S]*?\\},\\n`, 'g'), '');
		result = result.replace(new RegExp(`\\t${id.replace(/-/g, '\\-')}: '[^']*',\\n`, 'g'), '');
		result = result.replace(new RegExp(`\\t'${id.replace(/-/g, '\\-')}': '[^']*',\\n`, 'g'), '');
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (file.endsWith('adapt-fortnite.mjs')) continue;
		const original = await readFile(file, 'utf8');
		let updated = applyReplacements(original);
		if (file.includes('routing.ts') || file.includes('constants.mjs') || file.includes('generate-i18n')) {
			updated = stripRemovedPageIds(updated);
		}
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function removeExtraPages() {
	for (const dir of REMOVE_PAGE_DIRS) {
		const full = path.join(ROOT, 'src', 'pages', dir);
		await rm(full, { recursive: true, force: true });
		console.log(`Removed page: ${dir}`);
	}
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
	const to = path.join(ROOT, 'src', 'data', 'fortnite.ts');
	try {
		await rename(from, to);
		console.log('Renamed dota2.ts → fortnite.ts');
	} catch (e) {
		console.warn(`dota2.ts rename: ${e.message}`);
	}
}

async function updatePageAstroFiles() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const pageId = to.replace('reliable-fortnite-cheats', 'reliable')
			.replace('fortnite-cheats-2026', 'cheats-2026')
			.replace('eac-bypass-fortnite', 'eac-bypass')
			.replace('fortnite-', 'fortnite-');
		const file = path.join(ROOT, 'src', 'pages', to, 'index.astro');
		try {
			const idMap = {
				'fortnite-aimbot': 'fortnite-aimbot',
				'fortnite-esp': 'fortnite-esp',
				'fortnite-wallhack': 'wallhack',
				'fortnite-radar-hack': 'radar',
				'reliable-fortnite-cheats': 'reliable',
				'fortnite-cheats-2026': 'cheats-2026',
				'eac-bypass-fortnite': 'eac-bypass',
			};
			const pageIdVal = idMap[to] || to;
			const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageIdVal}" />
`;
			await writeFile(file, content, 'utf8');
		} catch {
			// ignore
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
		if (file.includes('call-of-duty-dota2') || file.includes('dota2-')) {
			const newName = file
				.replace(/call-of-duty-dota2-cheats/g, 'fortnite-cheats')
				.replace(/call-of-duty-dota2/g, 'fortnite')
				.replace(/dota2-/g, 'fortnite-');
			if (newName !== file) {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Dota 2 template → Fortnite Cheats...\n');
	await removeExtraPages();
	await renamePageDirs();
	await renameDota 2Ts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: node scripts/generate-i18n-content.mjs');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
