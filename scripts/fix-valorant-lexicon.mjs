#!/usr/bin/env node
/**
 * Final-pass Dota 2 lexicon cleanup — removes leftover Dota 2/Vanguard strings.
 * Run: node scripts/fix-dota2-lexicon.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp', '.astro', 'dota2-hacks-org']);

/** Ordered — specific patterns first. */
const REPLACEMENTS = [
	['dota2 vac bypass', 'naraka vac bypass'],
	['dota2 soft aim', 'dota2 soft aim'],
	['dota2 mod menu', 'dota2 mod menu'],
	['dota2 external hack', 'naraka external cheat'],
	['dota2 2d radar', 'naraka 2d radar'],
	['soft aim dota2', 'soft aim naraka'],
	['vac bypass dota2', 'vac bypass naraka'],
	['dota2 anti cheat bypass', 'naraka anti cheat bypass'],
	['hwid spoofer dota2', 'hwid spoofer naraka'],
	['vac update', 'VAC update'],
	['vac reliable', 'Vanguard reliable'],
	['Vanguard Safe', 'Vanguard Safe'],
	['VAC maintenance', 'VAC maintenance'],
	['Vanguard rebuilds', 'Vanguard rebuilds'],
	['VAC patches', 'VAC patches'],
	['Vanguard and Dota 2', 'Vanguard and Dota 2'],
	['Vanguard or Dota 2', 'Vanguard or Dota 2'],
	['Vanguard', 'Vanguard'],
	['vac', 'vac'],
	['vanlifedota2', 'vanlifenaraka'],
	['vanLifeDota 2', 'vanLifeDota 2'],
	['valo hack', 'dota 2 cheat'],
	['valo cheats', 'dota 2 cheats'],
	['dota2-patch-notes', 'naraka-patch-notes'],
	['dota2-cosmetics', 'naraka-cosmetics'],
	['dota2-weapon-tier-list', 'naraka-weapon-tier-list'],
	['dota2-weapon drops-run', 'naraka-weapon drops-run'],
	['dota2-competitive-meta', 'naraka-competitive-meta'],
	['dota2-cashout-routes', 'naraka-weapon drops-routes'],
	['dota2-pro-settings', 'naraka-pro-settings'],
	['dota2-warmup-routine', 'naraka-warmup-routine'],
	['free-dota2-hack-download', 'free-dota2-cheat-download'],
	['how-long-dota2-hack-setup-takes', 'how-long-dota2-cheat-setup-takes'],
	['agent tiers', 'agent tiers'],
	['agents and abilities', 'agents and weapons'],
	['agents &', 'agents &'],
	['operator ESP', 'operator ESP'],
	['operator markers', 'operator markers'],
	['internalLinks.vac', 'internalLinks.vac'],
	['Dota 2 hacks', 'Dota 2 cheats'],
	['dota 2 hacks', 'dota 2 cheats'],
	['dota 2 hack', 'dota 2 cheat'],
	['{game} hacks', '{game} cheats'],
	['Hacks FAQ', 'Cheats FAQ'],
	['navPreview: \'Hacks\'', "navPreview: 'Cheats'"],
	["navPreview: 'Hacks'", "navPreview: 'Cheats'"],
	['/products/dota2', '/products/dota2'],
	['valo/valo cheats', 'naraka/dota 2 cheats'],
	['antiCheat: \'Vanguard\'', "antiCheat: 'Vanguard'"],
	['sitemap-meta.ts', 'sitemap-meta.ts'], // noop anchor
];

function walk(dir, files = []) {
	for (const name of readdirSync(dir)) {
		if (SKIP_DIRS.has(name)) continue;
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) walk(full, files);
		else files.push(full);
	}
	return files;
}

const TEXT_EXT = /\.(ts|tsx|js|mjs|astro|css|json|toml|txt|md|mdc)$/i;
let changed = 0;

for (const file of walk(ROOT)) {
	if (!TEXT_EXT.test(file)) continue;
	if (path.basename(file) === 'fix-dota2-lexicon.mjs') continue;
	if (path.basename(file) === 'adapt-dota2-site.mjs') continue;
	if (path.basename(file) === 'adapt-dota2.mjs') continue;
	let text = readFileSync(file, 'utf8');
	const original = text;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		text = text.split(from).join(to);
	}
	if (text !== original) {
		writeFileSync(file, text, 'utf8');
		changed++;
	}
}

console.log(`fix-dota2-lexicon: ${changed} file(s) updated`);
