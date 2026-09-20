#!/usr/bin/env node
/**
 * One-time migration: Valorant Cheats template → Dota 2 Dota 2 (dota2cheat.org).
 * Run from project root: node scripts/adapt-valorant-to-dota2.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['valorant-aimbot', 'dota2-aimbot'],
	['valorant-esp', 'dota2-esp'],
	['valorant-wallhack', 'dota2-wallhack'],
	['valorant-radar-hack', 'dota2-radar-hack'],
	['reliable-valorant-cheats', 'reliable-dota2-cheats'],
	['valorant-cheats-2026', 'dota2-cheats-2026'],
	['vanguard-bypass', 'vac-bypass'],
	['valorant-cheats', 'dota2-cheats'],
	['valorant-cheat-download', 'dota2-cheat-download'],
	['valorant-mod-menu', 'dota2-mod-menu'],
	['valorant-soft-aim', 'dota2-soft-aim'],
	['best-valorant-cheats', 'best-dota2-cheats'],
	['valorant-aimbot-hack', 'dota2-aimbot-hack'],
	['valorant-esp-hack', 'dota2-esp-hack'],
	['valorant-unlock-all', 'dota2-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://cheatsforvalorant.net', 'https://dota2cheat.org'],
	['cheatsforvalorant.net', 'dota2cheat.org'],
	['support@cheatsforvalorant.net', 'support@dota2cheat.org'],
	['project-name=cheatsforvalorant', 'project-name=cheatsfordota2'],
	['name = "cheats-for-valorant"', 'name = "cheats-for-dota2"'],
	['"name": "cheats-for-valorant"', '"name": "cheats-for-dota2"'],
	['https://playvalorant.com/en-us/news/', 'https://www.callofduty.com/dota2/news'],
	['https://playvalorant.com/', 'https://www.callofduty.com/dota2'],
	['https://playvalorant.com', 'https://www.callofduty.com/dota2'],
	['https://valorant.fandom.com/wiki/VALORANT', 'https://dota2.fandom.com/wiki/Call_of_Duty:_Dota 2'],
	['https://valorant.fandom.com', 'https://dota2.fandom.com'],
	['https://www.reddit.com/r/VALORANT/', 'https://www.reddit.com/r/Dota 2/'],
	['https://x.com/PlayVALORANT', 'https://x.com/DOTA2'],
	['@PlayVALORANT', '@DOTA2'],
	['/products/valorant', '/products/dota2'],
	['reliable-valorant-cheats', 'reliable-dota2-cheats'],
	['best-valorant-cheats', 'best-dota2-cheats'],
	['valorant-cheat-download', 'dota2-cheat-download'],
	['valorant-cheats-2026', 'dota2-cheats-2026'],
	['valorant-radar-hack', 'dota2-radar-hack'],
	['valorant-aimbot-hack', 'dota2-aimbot-hack'],
	['valorant-esp-hack', 'dota2-esp-hack'],
	['valorant-unlock-all', 'dota2-unlock-all'],
	['valorant-soft-aim', 'dota2-soft-aim'],
	['valorant-mod-menu', 'dota2-mod-menu'],
	['valorant-wallhack', 'dota2-wallhack'],
	['valorant-aimbot', 'dota2-aimbot'],
	['valorant-esp', 'dota2-esp'],
	["'valorant-esp'", "'dota2-esp'"],
	['"valorant-esp"', '"dota2-esp"'],
	["'valorant-aimbot'", "'dota2-aimbot'"],
	['"valorant-aimbot"', '"dota2-aimbot"'],
	['valorant-cheats', 'dota2-cheats'],
	['valorant-cheat', 'dota2-cheat'],
	['valorantImages', 'dota2Images'],
	["from './valorant'", "from './dota2'"],
	["from '../data/valorant'", "from '../data/dota2'"],
	["from '../../data/valorant'", "from '../../data/dota2'"],
	['fetch-valorant-images', 'fetch-dota2-images'],
	['fetch-valorant-hero', 'fetch-dota2-hero'],
	['import-valorant-screenshots', 'import-dota2-screenshots'],
	['valorant-hack-overlays', 'dota2-hack-overlays'],
	['fix-valorant-copy', 'fix-dota2-copy'],
	['fix-valorant-content', 'fix-dota2-content'],
	['fix-valorant-lexicon', 'fix-dota2-lexicon'],
	['adapt-valorant-site', 'adapt-dota2-site'],
	['rebrand-valorant-cheats', 'rebrand-dota2-cheats'],
	['trucos-valorant', 'trucos-dota2'],
	['triche-valorant', 'triche-dota2'],
	['cheats-valorant', 'cheats-dota2'],
	['trucchi-valorant', 'trucchi-dota2'],
	['cheaty-valorant', 'cheaty-dota2'],
	['chity-valorant', 'chity-dota2'],
	['chitov-valorant', 'chitov-dota2'],
	['chitiv-valorant', 'chitiv-dota2'],
	['cheatow-valorant', 'cheatow-dota2'],
	['hile-valorant', 'hile-dota2'],
	['valorant-hile', 'dota2-hile'],
	['valorant-esp-chity', 'dota2-esp-chity'],
	['valorant-aimbot-chity', 'dota2-aimbot-chity'],
	['unentdeckte-valorant-cheats', 'unentdeckte-dota2-cheats'],
	['cheats-valorant-indetectaveis', 'cheats-dota2-indetectaveis'],
	['trucchi-valorant-indetectabili', 'trucchi-dota2-indetectabili'],
	['niewykrywalne-cheats-valorant', 'niewykrywalne-cheats-dota2'],
	['nedecektiruemye-chity-valorant', 'nedecektiruemye-chity-dota2'],
	['tespit-edilemeyen-valorant-hileleri', 'tespit-edilemeyen-dota2-hileleri'],
	['nedecektovani-chity-valorant', 'nedecektovani-chity-dota2'],
	['cheats-valorant-nedetectabile', 'cheats-dota2-nedetectabile'],
	['basta-valorant-cheats', 'basta-dota2-cheats'],
	['valorant-cheats-funktionen', 'dota2-cheats-funktionen'],
	['valorant-cheats-functies', 'dota2-cheats-functies'],
	['caracteristicas-trucos-valorant', 'caracteristicas-trucos-dota2'],
	['fonctionnalites-triche-valorant', 'fonctionnalites-triche-dota2'],
	['recursos-cheats-valorant', 'recursos-cheats-dota2'],
	['funzioni-trucchi-valorant', 'funzioni-trucchi-dota2'],
	["'vanguard'", "'vac'"],
	['| vanguard', '| vac'],
	['vanguard-bypass', 'vac-bypass'],
	['Valorant Hacks', 'Dota 2 Hacks'],
	['Valorant Cheats', 'Dota 2 Cheats'],
	['Valorant cheats', 'Dota 2 cheats'],
	['Valorant cheat', 'Dota 2 cheat'],
	['Valorant Intel', 'Dota 2 Intel'],
	['Vanguard anti-cheat', 'VAC anti-cheat'],
	['Vanguard maintenance', 'VAC maintenance'],
	['Vanguard bypass', 'VAC bypass'],
	['Vanguard Bypass', 'VAC Bypass'],
	['Vanguard patches', 'VAC patches'],
	['Vanguard patch', 'VAC patch'],
	['Vanguard updates', 'VAC updates'],
	['Vanguard update', 'VAC update'],
	['after Vanguard', 'after VAC'],
	['valorant hacks', 'dota 2 hacks'],
	['valorant cheats', 'dota 2 cheats'],
	['Quick Match and Ranked', 'ranked matches and Resurgence'],
	['Quick Match', 'Resurgence'],
	['ranked matches', 'ranked matches matches'],
	['competitive rounds', 'ranked matches rounds'],
	['agent markers', 'operator markers'],
	['agent ESP', 'operator ESP'],
	['enemy agents', 'enemy operators'],
	['spike zones', 'buy stations'],
	['spike plant', 'loadout drop'],
	['valorant-screenshot', 'dota2-screenshot'],
	['valorant-cheats-logo', 'dota2-cheats-logo'],
	['valorant-site-icon', 'dota2-site-icon'],
	['valorant-hero-poster', 'dota2-hero-poster'],
	['valorant-cheats-hero', 'dota2-cheats-hero'],
	['valorant-cheats-esp', 'dota2-cheats-esp'],
	['valorant-cheats-aimbot', 'dota2-cheats-aimbot'],
	['valorant-cheats-wallhack', 'dota2-cheats-wallhack'],
	['valorant-cheats-radar', 'dota2-cheats-radar'],
	['valorant-cheats-combat', 'dota2-cheats-combat'],
	['valorant-cheats-session', 'dota2-cheats-session'],
	['valorant-esp-player-tags', 'dota2-esp-player-tags'],
	['valorant-esp-radar', 'dota2-esp-radar'],
	['valorant-aimbot-skeleton', 'dota2-aimbot-skeleton'],
	['valorant-aimbot-sniper', 'dota2-aimbot-sniper'],
	['valorant-wallhack-skeleton', 'dota2-wallhack-skeleton'],
	['--font-valorant', '--font-dota2'],
	['font-valorant', 'font-dota2'],
	['VALORANT', 'WARZONE'],
	['Valorant', 'Dota 2'],
	['valorant', 'dota2'],
	['vanguard', 'vac'],
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
	let out = content;
	for (const [from, to] of REPLACEMENTS) {
		out = out.replaceAll(from, to);
	}
	return out;
}

async function renamePageDirs() {
	const pagesDir = path.join(ROOT, 'src', 'pages');
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const fromPath = path.join(pagesDir, from);
		const toPath = path.join(pagesDir, to);
		try {
			await rename(fromPath, toPath);
			console.log(`Renamed pages/${from} → pages/${to}`);
		} catch {
			// may not exist
		}
	}
}

async function renameDataFile() {
	const from = path.join(ROOT, 'src', 'data', 'valorant.ts');
	const to = path.join(ROOT, 'src', 'data', 'dota2.ts');
	try {
		await rename(from, to);
		console.log('Renamed src/data/valorant.ts → dota2.ts');
	} catch {
		// already renamed
	}
}

async function processFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (file.includes('adapt-valorant-to-dota2.mjs')) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated);
			changed += 1;
		}
	}
	console.log(`Updated ${changed} files`);
}

async function main() {
	await renamePageDirs();
	await renameDataFile();
	await processFiles();
	console.log('Dota 2 migration complete.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
