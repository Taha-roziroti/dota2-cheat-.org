#!/usr/bin/env node
/** Adapt pages-en.mjs and pages-i18n.mjs from Dota 2 source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_PAGE_KEYS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['dota2-esp', 'dota2-esp'],
	['dota2-aimbot', 'dota2-aimbot'],
	["'vac'", "'vac'"],
	['vac-bypass', 'vac-bypass'],
	['reliable-dota2-cheats', 'reliable-dota2-cheats'],
	['dota2-wallhack', 'dota2-wallhack'],
	['dota2-radar-hack', 'dota2-radar-hack'],
	['dota2-cheats-2026', 'dota2-cheats-2026'],
	['dota2-cheats', 'dota2-cheats'],
	['the-rust', 'rust'],
	['Dota 2's, 'Dota 2's],
	['Dota 2's, 'Dota 2's],
	['Dota 2 Cheats', 'Dota 2 Cheats'],
	['dota 2 cheats', 'dota 2 cheats'],
	['dota 2 cheat', 'dota 2 cheat'],
	['Dota 2 ESP', 'Dota 2 ESP'],
	['Dota 2 Aimbot', 'Dota 2 Aimbot'],
	['dota 2 wallhack', 'Dota 2 wallhack'],
	['dota2 radar', 'Dota 2 radar'],
	['Dota 2 competitive fights', 'Dota 2 competitive fights'],
	['Dota 2 combat', 'Dota 2 combat'],
	['Dota 2 patches', 'Dota 2 patches'],
	['Dota 2 updates', 'Dota 2 updates'],
	['Dota 2 setup', 'Dota 2 setup'],
	['Dota 2 license', 'Dota 2 license'],
	['Dota 2 licenses', 'Dota 2 licenses'],
	['Dota 2 matches', 'Dota 2 matches'],
	['in Dota 2', 'in Dota 2'],
	['for Dota 2', 'for Dota 2'],
	['Dota 2 on', 'Dota 2 on'],
	['Dota 2 or', 'Dota 2 or'],
	['Dota 2\'s', 'Dota 2\'s'],
	['Dota 2 ', 'Dota 2 '],
	['VAC', 'VAC'],
	['VAC maintenance', 'VAC maintenance'],
	['VAC bypass', 'VAC bypass'],
	['VAC Bypass', 'VAC Bypass'],
	['VAC', 'VAC'],
	['vac', 'vac'],
	['support@dota2cheat.com', 'support@dota2cheat.com'],
	['maps, sites, and buy stations', 'maps, sites, and buy stations'],
	['maps, sites and buy stations', 'maps, sites and buy stations'],
	['raid fights', 'raid fights'],
	['raid fight', 'raid fight'],
	['match rounds', 'match rounds'],
	['extract', 'extract'],
	['players', 'players'],
	['operator', 'player'],
	['players', 'Players'],
	['Operator', 'Player'],
	['raid timer', 'raid timer'],
	['ranked matches rounds and ranked matches matches', 'ranked matches rounds and ranked matches matches'],
	['ranked matches rounds and ranked matches matches', 'ranked matches rounds and ranked matches matches'],
	['agents & ranked teams', 'agents & ranked teams'],
	['high-value weapon drops', 'high-value weapon drops'],
	['high-value weapon drops', 'high-value weapon drops'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Activision\'s', 'Epic Games\''],
	['Dota 2 combat pace', 'Dota 2 combat pace'],
	['COD', 'Dota 2's],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageObjectBlocks(content) {
	let r = content;
	for (const key of REMOVE_PAGE_KEYS) {
		const quoted = `'${key}'`;
		const patterns = [
			new RegExp(`\\t${quoted}: \\{[\\s\\S]*?\\},\\n`, 'g'),
			new RegExp(`\\t${key.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		];
		for (const p of patterns) r = r.replace(p, '');
	}
	return r;
}

async function adaptFile(rel) {
	let content = await readFile(path.join(SRC, rel), 'utf8');
	content = apply(content);
	content = removePageObjectBlocks(content);
	await writeFile(path.join(ROOT, rel), content);
	console.log('Adapted', rel);
}

await adaptFile('scripts/i18n-data/pages-en.mjs');
await adaptFile('scripts/i18n-data/pages-i18n.mjs');
await adaptFile('scripts/i18n-data/phrases.mjs');

// Patch phrases KW object
let phrases = await readFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), 'utf8');
phrases = phrases.replace(
	/const KW = \{[\s\S]*?\};/,
	`const KW = {
	esp: 'ESP wallhack',
	radar: 'radar hack',
	aimbot: 'Aimbot',
	product: 'Dota 2 Cheats',
	game: 'Dota 2's,
	checkout: 'checkout',
	eac: 'VAC',
};`,
);
phrases = phrases.replace(/KW\.eac/g, 'KW.eac');
phrases = phrases.replace(/maps: '[^']*'/g, "maps: 'maps, sites, and buy stations'");
await writeFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), phrases);

console.log('Done adapting i18n pages.');
