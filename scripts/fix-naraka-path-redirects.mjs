#!/usr/bin/env node
/**
 * Fix path-redirects.json: rewrite dota2 destinations → naraka and add legacy dota2 → naraka 301s.
 * Run: node scripts/fix-naraka-path-redirects.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

const SLUG_MAP = [
	['dota2-hacks', 'dota2-cheats'],
	['dota2-esp', 'dota2-esp'],
	['dota2-aimbot', 'dota2-aimbot'],
	['dota2-wallhack', 'dota2-wallhack'],
	['dota2-radar-hack', 'dota2-radar-hack'],
	['dota2-soft-aim', 'dota2-soft-aim'],
	['dota2-mod-menu', 'dota2-mod-menu'],
	['dota2-cheat-download', 'dota2-cheat-download'],
	['dota2-aimbot-hack', 'dota2-aimbot-hack'],
	['dota2-esp-hack', 'dota2-esp-hack'],
	['dota2-unlock-all', 'dota2-unlock-all'],
	['reliable-dota2-hacks', 'reliable-dota2-cheats'],
	['best-dota2-hacks', 'best-dota2-cheats'],
	['dota2-hacks-2026', 'dota2-cheats-2026'],
	['vac-bypass', 'vac-bypass'],
	['dota2-cheats', 'dota2-cheats'],
	['dota2-cheat', 'dota2-cheat'],
	['hacks-dota2', 'cheats-dota2'],
	['dota2', 'naraka'],
];

function rewritePath(p) {
	let out = p;
	for (const [from, to] of SLUG_MAP) {
		out = out.split(from).join(to);
	}
	return out;
}

function addPair(map, from, to) {
	if (!from || !to || from === to) return;
	map[from] = to;
	const noSlash = from.replace(/\/$/, '');
	if (noSlash !== from) map[noSlash] = to;
}

const raw = JSON.parse(await readFile(PATH_REDIRECTS, 'utf8'));
const fixed = {};

for (const [key, value] of Object.entries(raw)) {
	const newKey = rewritePath(key);
	const newValue = rewritePath(value);
	addPair(fixed, newKey, newValue);
}

// Legacy dota2 EN paths → naraka
const EN_REDIRECTS = [
	['/dota2-hacks', '/dota2-cheats/'],
	['/dota2-esp', '/dota2-esp/'],
	['/dota2-aimbot', '/dota2-aimbot/'],
	['/dota2-wallhack', '/dota2-wallhack/'],
	['/dota2-radar-hack', '/dota2-radar-hack/'],
	['/dota2-soft-aim', '/dota2-soft-aim/'],
	['/dota2-mod-menu', '/dota2-mod-menu/'],
	['/dota2-cheat-download', '/dota2-cheat-download/'],
	['/dota2-aimbot-hack', '/dota2-aimbot-hack/'],
	['/dota2-esp-hack', '/dota2-esp-hack/'],
	['/dota2-unlock-all', '/dota2-unlock-all/'],
	['/reliable-dota2-hacks', '/reliable-dota2-cheats/'],
	['/best-dota2-hacks', '/best-dota2-cheats/'],
	['/dota2-hacks-2026', '/dota2-cheats-2026/'],
	['/vac-bypass', '/vac-bypass/'],
	['/dota2-cheats', '/dota2-cheats/'],
];

for (const [from, to] of EN_REDIRECTS) {
	addPair(fixed, from, to);
	addPair(fixed, `${from}/`, to);
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(fixed, null, 2)}\n`);
console.log(`fix-naraka-path-redirects: ${Object.keys(fixed).length} redirect entries`);
