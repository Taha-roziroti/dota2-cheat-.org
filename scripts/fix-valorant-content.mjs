#!/usr/bin/env node
/**
 * Clean leftover Naraka/Bladepoint/VAC/checkout references after Dota 2 rebrand.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPLACEMENTS = [
	['Dota 2', 'Dota 2'],
	['dota2', 'dota2'],
	['Dota 2', 'Dota 2'],
	['dota2', 'dota2'],
	['dota 2 cheats', 'dota 2 cheats'],
	['Dota 2 cheats', 'Dota 2 cheats'],
	['Dota 2 Cheats', 'Dota 2 Cheats'],
	['dota 2 hack', 'dota 2 hack'],
	['dota 2 esp', 'dota 2 esp'],
	['dota 2 aimbot', 'dota 2 aimbot'],
	['dota 2 wallhack', 'dota 2 wallhack'],
	['dota2 soft aim', 'dota2 soft aim'],
	['dota2 mod menu', 'dota2 mod menu'],
	['dota2 radar', 'dota2 radar'],
	['dota2 patch', 'dota2 patch'],
	['dota2/dota2', 'dota2/dota2'],
	['VAC', 'VAC'],
	['vac', 'vac'],
	['ranked matches', 'ranked matches'],
	['Immortal lobbies', 'Immortal lobbies'],
	['Haven', 'Haven'],
	['Bind', 'Bind'],
	['Ascent', 'Ascent'],
	['Split', 'Split'],
	['Lotus', 'Lotus'],
	['operator ESP', 'operator ESP'],
	['operator markers', 'operator markers'],
	['agent ability', 'agent ability'],
	['agents', 'agents'],
	['Agents', 'Agents'],
	['agent ', 'agent '],
	['Agent ', 'Agent '],
	['spike', 'spike'],
	['Spike', 'Spike'],
	['weapon drops', 'weapon drops'],
	['Weapon drops', 'Weapon drops'],
	['operator', 'operator'],
	['Operator', 'Operator'],
	['assault rifle vs SMG', 'assault rifle vs SMG'],
	['vanLifeDota 2', 'vanLifeDota 2'],
	['dota2-vac-bypass', 'dota2-vac-bypass'],
	['meilleures-triches-dota2', 'meilleures-triches-dota2'],
	['checkout', 'checkout'],
	['checkout', 'checkout'],
	['cheatsfordota2', 'cheatsfordota2'],
	['EXT.dota2', 'EXT.dota2'],
	['${EXT.dota2}', '${EXT.dota2}'],
	['vac:', 'vac:'],
	["'vac'", "'vac'"],
	['/images/dota2', '/images/dota2'],
	['antiCheatShort": "VAC', 'antiCheatShort": "VAC'],
	['antiCheatShort": "VAC supported', 'antiCheatShort": "VAC supported'],
];

const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.md']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp']);

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

async function main() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		if (!TEXT_EXTENSIONS.has(path.extname(file))) continue;
		if (file.includes('adapt-naraka') || file.includes('adapt-dota2-site')) continue;
		const original = await readFile(file, 'utf8');
		let updated = original;
		for (const [from, to] of REPLACEMENTS) {
			updated = updated.split(from).join(to);
		}
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Fixed ${changed} files`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
