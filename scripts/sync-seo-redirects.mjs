#!/usr/bin/env node
/** Merge SEO pillar redirects into functions/path-redirects.json */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

/** Direct EN cannibal → pillar (skip intermediate stub pages). */
const EN_PILLAR_REDIRECTS = {
	'/wallhack/': '/esp/',
	'/wallhack': '/esp/',
	'/mod/': '/',
	'/mod': '/',
	'/soft-aim/': '/aimbot/',
	'/soft-aim': '/aimbot/',
	'/download/': '/setup/',
	'/download': '/setup/',
	'/reliable/': '/updates/',
	'/reliable': '/updates/',
	'/esp-hack/': '/esp/',
	'/esp-hack': '/esp/',
	'/aimbot-hack/': '/aimbot/',
	'/aimbot-hack': '/aimbot/',
	'/unlock/': '/',
	'/unlock': '/',
	'/premium-dota2-cheats/': '/cheats/',
	'/premium-dota2-cheats': '/cheats/',
	'/dota2-mod-menu/': '/',
	'/dota2-mod-menu': '/',
	'/dota2-soft-aim/': '/aimbot/',
	'/dota2-soft-aim': '/aimbot/',
	'/dota2-wallhack/': '/esp/',
	'/dota2-wallhack': '/esp/',
	'/dota2-cheat-download/': '/setup/',
	'/dota2-cheat-download': '/setup/',
	'/dota2-esp-hack/': '/esp/',
	'/dota2-esp-hack': '/esp/',
	'/dota2-aimbot-hack/': '/aimbot/',
	'/dota2-aimbot-hack': '/aimbot/',
	'/dota2-unlock-all/': '/',
	'/dota2-unlock-all': '/',
};

const map = JSON.parse(readFileSync(PATH_REDIRECTS, 'utf8'));
let added = 0;
for (const [from, to] of Object.entries(EN_PILLAR_REDIRECTS)) {
	if (map[from] !== to) {
		map[from] = to;
		added++;
	}
}
writeFileSync(PATH_REDIRECTS, `${JSON.stringify(map, null, 2)}\n`);
console.log(`Updated ${added} SEO pillar redirects in path-redirects.json`);
