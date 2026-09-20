#!/usr/bin/env node
/** Final pass: fix remaining Dota 2 references in src/. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const REMOVE_PAGE_IDS = ['hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats', 'aimbot-hack', 'esp-hack', 'unlock-all'];

const REPLACEMENTS = [
	['dota2Images', 'dota2Images'],
	["from '../data/dota2'", "from '../data/dota2'"],
	["from './dota2'", "from './dota2'"],
	['/reliable-dota2-cheats/', '/reliable-dota2-cheats/'],
	['/dota2-wallhack/', '/dota2-wallhack/'],
	['/dota2-radar-hack/', '/dota2-radar-hack/'],
	['/vac-bypass/', '/vac-bypass/'],
	['/dota2-cheats-2026/', '/dota2-cheats-2026/'],
	['/dota2-aimbot/', '/dota2-aimbot/'],
	['/dota2-esp/', '/dota2-esp/'],
	['/dota2-cheats/', '/dota2-esp/'],
	['Dota 2 Cheats', 'Dota 2 Cheats'],
	['dota 2 cheats', 'dota 2 cheats'],
	['thefinals wallhack', 'Dota 2 wallhack'],
	['dota2 radar', 'Dota 2 radar'],
	['Dota 2 Aimbot', 'Dota 2 Aimbot'],
	['Dota 2 ESP', 'Dota 2 ESP'],
	['Dota 2's, 'Dota 2's],
	['VAC', 'VAC'],
	['vac', 'vac'],
	['dota2cheat.org', 'dota2cheat.org'],
	['operatorEsp', 'playerEsp'],
	['extractFight', 'raidFight'],
	['alMazrah', 'raidMap'],
];

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else if (/\.(ts|astro|js)$/.test(entry.name)) files.push(full);
	}
	return files;
}

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	for (const id of REMOVE_PAGE_IDS) {
		r = r.replace(new RegExp(`\\t'${id}':[^\\n]*\\n`, 'g'), '');
		r = r.replace(new RegExp(`\\{ label:[^}]*href: '/[^']*${id}[^']*/' \\},\\n`, 'g'), '');
	}
	return r;
}

for (const file of await walk(ROOT)) {
	const orig = await readFile(file, 'utf8');
	const updated = apply(orig);
	if (updated !== orig) {
		await writeFile(file, updated);
		console.log('Fixed', path.relative(ROOT, file));
	}
}
