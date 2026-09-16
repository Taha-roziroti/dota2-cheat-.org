#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const pages = readFileSync('scripts/i18n-data/pages-en.mjs', 'utf8');
const bad = [
	'supply-drop',
	'BR-critical',
	'BR loop',
	'vehicles',
	'ranked block',
	'Controllers',
	'Battle Pass',
	'reboot rounds',
	'endgame circles',
	'the map',
	'Activision',
	'soft aim, and .',
	'ESP, Soft Aim,',
	'best-dota2-cheats',
	'dota2-esp-hack',
	'dota2-aimbot-hack',
];
console.log('--- pages-en leftovers ---');
for (const b of bad) {
	const n = pages.split(b).length - 1;
	if (n) console.log(`${b}: ${n}`);
}

const gen = readFileSync('src/data/i18n/content.generated.ts', 'utf8');
const enEnd = gen.indexOf('\n\t\tes:');
const en = enEnd > 0 ? gen.slice(0, enEnd) : gen.slice(0, 120000);
console.log('--- EN generated leftovers ---');
for (const b of [
	'supply-drop',
	'BR-critical',
	'full BR',
	'vehicles before',
	'Controllers',
	'Battle Pass',
	'RVAC',
	'soft aim, and .',
	'best-dota2-cheats',
	'dota2-esp-hack',
]) {
	const n = en.split(b).length - 1;
	if (n) console.log(`${b}: ${n}`);
}

const blog = readFileSync('src/data/forums/posts.generated.ts', 'utf8');
const reps = [
	['V-Bucks', 'scrap'],
	['Item Shop', 'in-game store'],
	['Battle Pass', 'patch cycle progression'],
	['FNCS', 'Dota 2 community event'],
	['Hammer AR', 'M4A1'],
	['mythics', 'meta guns'],
	['island codes', 'aim train sessions maps'],
	['Creative 1v1s', 'aim training'],
	['creative 1v1s', 'aim training'],
	['Epic health', 'Battlestate status'],
	['Epic terms', 'Activision terms'],
	["Epic's VAC", 'VAC'],
	['Epic patch', 'Dota 2 patch'],
	['EliteFN', 'a Fortnite cheat shop'],
	['GhostWare', 'a slim cheat vendor'],
	['CheatSpike', 'another cheat shop'],
	['/dota2-aimbot-hack/', '/dota2-aimbot/'],
	['/dota2-esp-hack/', '/dota2-esp/'],
	['/best-dota2-cheats/', '/'],
	['best dota 2 cheats', 'dota 2 cheats'],
	['hot drops', 'hot spawns'],
	['ranked grinders', 'session grinders'],
	['before ranked matches', 'before a match'],
];
let s = blog;
let n = 0;
for (const [a, b] of reps) {
	if (s.includes(a)) {
		s = s.split(a).join(b);
		n += 1;
	}
}
writeFileSync('src/data/forums/posts.generated.ts', s);
console.log('blog patterns fixed:', n);
