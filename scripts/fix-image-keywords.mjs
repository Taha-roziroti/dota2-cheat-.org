#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const SIMPLE =
	"images: { hero: 'dota 2 cheats', espWallhack: 'dota 2 cheats wallhack', aimbotCombat: 'dota 2 cheats aimbot', squadFight: 'dota 2 cheats', playerEsp: 'dota 2 cheats esp', headerArt: 'dota 2 cheats aimbot', hacksPackage: 'dota 2 cheats radar', matchFight: 'dota 2 cheats aimbot', battleRoyale: 'dota 2 cheats', matchMap: 'dota 2 cheats esp' }";

const re =
	/images: \{ hero: '[^']+', espWallhack: '[^']+', aimbotCombat: '[^']+', squadFight: '[^']+', playerEsp: '[^']+', headerArt: '[^']+', hacksPackage: '[^']+', matchFight: '[^']+', battleRoyale: '[^']+', matchMap: '[^']+' \}/g;

for (const f of ['scripts/i18n-data/ui-strings-part1.mjs', 'scripts/i18n-data/ui-strings-part2.mjs']) {
	const c = readFileSync(f, 'utf8');
	const n = c.replace(re, SIMPLE);
	writeFileSync(f, n);
	console.log(f, (c.match(re) || []).length, 'image blocks simplified');
}

const altMap = [
	["imageAlt: 'Dota 2 ESP player tags hack'", "imageAlt: 'dota 2 cheats esp'"],
	["imageAlt: 'Dota 2 ESP radar hack'", "imageAlt: 'dota 2 cheats radar'"],
	["imageAlt: 'Dota 2 Aimbot sniper kill'", "imageAlt: 'dota 2 cheats aimbot'"],
	["imageAlt: 'Dota 2 Aimbot skeleton targeting'", "imageAlt: 'dota 2 cheats aimbot'"],
	["imageAlt: 'dota 2 cheats ADS combat'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheats setup PC activation'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheats updates VAC maintenance'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheats FAQ ESP aimbot'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheats support license help'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'Reliable dota 2 cheats ESP wallhack'", "imageAlt: 'reliable dota 2 cheats'"],
	["imageAlt: 'thefinals wallhack skeleton ESP'", "imageAlt: 'dota 2 cheats wallhack'"],
	["imageAlt: 'VAC bypass rust ESP aimbot'", "imageAlt: 'dota 2 cheats eac'"],
	["imageAlt: 'dota 2 cheats 2026 ESP aimbot'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheats combat aimbot'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheat download ESP aimbot'", "imageAlt: 'dota 2 cheats download'"],
	["imageAlt: 'Dota 2 mod menu ESP aimbot'", "imageAlt: 'dota 2 cheats mod menu'"],
	["imageAlt: 'Dota 2 soft aim aimbot settings'", "imageAlt: 'dota 2 cheats soft aim'"],
	["imageAlt: 'Best dota 2 cheats 2026 ESP'", "imageAlt: 'best dota 2 cheats'"],
	["imageAlt: 'Dota 2 Aimbot hack combat'", "imageAlt: 'dota 2 cheats aimbot'"],
	["imageAlt: 'Dota 2 ESP hack wallhack'", "imageAlt: 'dota 2 cheats esp'"],
	["imageAlt: 'Dota 2 unlock all items ESP aimbot guide'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheats privacy policy'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheats refund policy'", "imageAlt: 'dota 2 cheats'"],
	["imageAlt: 'dota 2 cheats terms of use'", "imageAlt: 'dota 2 cheats'"],
];

let pages = readFileSync('scripts/i18n-data/pages-en.mjs', 'utf8');
for (const [from, to] of altMap) pages = pages.split(from).join(to);
writeFileSync('scripts/i18n-data/pages-en.mjs', pages);
console.log('pages-en imageAlts simplified');

// productPage() imageAlt template in pages-i18n
let i18n = readFileSync('scripts/i18n-data/pages-i18n.mjs', 'utf8');
i18n = i18n
	.split("imageAlt: `Dota 2 ${meta.altKeyword}`")
	.join("imageAlt: 'dota 2 cheats'")
	.split("galleryTitle: `Dota 2 Cheats ${topicName}`")
	.join("galleryTitle: 'dota 2 cheats'")
	.split("imageAlt: `dota 2 cheats ${kind} policy`")
	.join("imageAlt: 'dota 2 cheats'")
	.split("galleryTitle: `Dota 2 Cheats ${kind} resources`")
	.join("galleryTitle: 'dota 2 cheats'");
writeFileSync('scripts/i18n-data/pages-i18n.mjs', i18n);
console.log('pages-i18n image alts simplified');
