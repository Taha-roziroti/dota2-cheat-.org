#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPLACEMENTS = [
	[/Trucos Dota 2 s/g, 'Trucos Dota 2'],
	[/cheats s /g, 'cheats '],
	[/cheats s para/g, 'cheats para'],
	[/Triches s /g, 'Triches '],
	[/Triches Dota 2 s/g, 'Triches Dota 2'],
	[/Cheat /g, 'Cheat '],
	[/cheat /g, 'cheat '],
	[/cheats indetectáveis/gi, 'cheats premium'],
	[/indetectáveis/gi, 'premium'],
	[/غير مكتشف/g, 'احترافي'],
	[/Reliable /g, ''],
	[/ reliable /g, ' '],
	[/reliable /g, ''],
	[/ reliable/g, ''],
	[/Reliable/g, 'Premium'],
	[/reliable/g, 'premium'],
	[/premium premium/g, 'premium'],
	[/Premium-Paket Premium/g, 'Premium-Paket'],
	[/BR ve /g, 'Ranked ve '],
	[/BR et /g, 'Ranked et '],
	[/BR y /g, 'Ranked y '],
	[/en BR /g, 'en ranked '],
	[/in BR /g, 'in ranked '],
	[/ranked sessions/gi, 'ranked matches'],
	[/ranked and casual matches matches/g, 'ranked and casual matches'],
	[/operator ESP/g, 'hero ESP'],
	[/squads/gi, 'heroes'],
	[/squad/gi, 'hero'],
	[/escuadrones/gi, 'héroes'],
	[/équipes ennemies/gi, 'héros ennemis'],
	[/equipes inimigos/gi, 'heróis inimigos'],
	[/What reliable means/g, 'What patch maintenance means'],
	[/Staying reliable after patches/g, 'Staying maintained after patches'],
	[/for reliable packages/g, 'after VAC patches'],
	[/for reliable play/g, 'for ranked play'],
	[/permanent reliable operation/g, 'permanent stability'],
	[/reliable maintenance/g, 'patch maintenance'],
	[/reliable guide/g, 'status guide'],
	[/reliable in 2026/g, 'maintained in 2026'],
	[/VAC maintenance for reliable Aimbot/g, 'VAC maintenance for skillshot assist'],
	[/one reliable package/g, 'one premium package'],
	[/one reliable license/g, 'one license'],
	[/aboutStatus: 'statusu reliable'/g, "aboutStatus: 'status patcha'"],
	[/aboutStatus: 'статусу reliable'/g, "aboutStatus: 'статус патча'"],
	[/aboutStatus: 'สถานะ reliable'/g, "aboutStatus: 'สถานะแพตช์'"],
	[/aboutStatus: 'statusul reliable'/g, "aboutStatus: 'status patch'"],
	[/aboutStatus: 'trạng thái reliable'/g, "aboutStatus: 'trạng thái bản vá'"],
	[/aboutTitle: 'reliable /g, "aboutTitle: 'premium "],
	[/aboutTitle: 'Dota 2 için reliable/g, "aboutTitle: 'Dota 2 için premium"],
	[/tagline: '.*reliable.*'/g, "tagline: 'ESP, wallhack, radar and skillshot assist for Dota 2.'"],
	[/Ranked ve ranked/g, 'Ranked ve casual'],
	[/Ranked et ranked/g, 'Ranked et casual'],
	[/Ranked và ranked/g, 'Ranked và casual'],
	[/Ranked i ranked/g, 'Ranked i casual'],
	[/Ranked и ranked/g, 'Ranked и casual'],
	[/Ranked y ranked/g, 'Ranked y casual'],
	[/软自瞄/g, '技能辅助'],
	[/reliable 状态/g, '补丁状态'],
	[/reliable-статус/g, 'статус патча'],
	[/reliable durumunu/g, 'yama durumunu'],
	[/statusul reliable/g, 'statusul patch-ului'],
	[/trạng thái reliable/g, 'trạng thái bản vá'],
	[/สถานะ reliable/g, 'สถานะแพตช์'],
];

async function patch(relPath) {
	const file = path.join(ROOT, relPath);
	let c = await readFile(file, 'utf8');
	const o = c;
	for (const [re, rep] of REPLACEMENTS) {
		c = c.replace(re, rep);
	}
	c = c.replace(/  +/g, ' ');
	if (c !== o) {
		await writeFile(file, c);
		console.log('fixed', relPath);
	}
}

const files = [
	'scripts/i18n-data/pages-en.mjs',
	'scripts/i18n-data/pages-i18n.mjs',
	'scripts/i18n-data/locale-overlays.mjs',
	'scripts/i18n-data/ui-strings-part1.mjs',
	'scripts/i18n-data/ui-strings-part2.mjs',
	'scripts/i18n-data/faq-accuracy-fixes.mjs',
	'scripts/i18n-data/simple-pages-en.mjs',
	'scripts/i18n-data/simple-pages-i18n.mjs',
];

for (const f of files) await patch(f);
