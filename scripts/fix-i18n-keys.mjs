#!/usr/bin/env node
/** Fix remaining i18n key mismatches and ui-strings. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const UI_REPLACEMENTS = [
	['Dota 2 Cheats', 'Dota 2 Cheats'],
	['dota 2 cheats', 'dota 2 cheats'],
	['Dota 2 Cheats', 'Dota 2 Cheats'],
	['Dota 2's, 'Dota 2's],
	['Dota 2's, 'Dota 2's],
	['Dota 2', 'Dota 2's],
	['Dota 2 PC', 'Dota 2 PC'],
	['for Dota 2', 'for Dota 2'],
	['Dota 2 ', 'Dota 2 '],
	['rust ', 'rust '],
	['VAC maintenance', 'VAC maintenance'],
	['VAC', 'VAC'],
	['VAC', 'VAC'],
	['operatorEsp', 'playerEsp'],
	['extractFight', 'raidFight'],
	['alMazrah', 'raidMap'],
	['players', 'players'],
	['operator', 'player'],
	['players', 'Players'],
	['Operator', 'Player'],
	['Al Mazrah', 'the map'],
	['the map', 'the map'],
	['farming run', 'farming run'],
	['extract', 'extract'],
	['dota2cheat.org', 'dota2cheat.org'],
	['Trucos Dota 2's, 'Trucos Dota 2's],
	['Triches Dota 2's, 'Triches Dota 2's],
	['Cheats Dota 2's, 'Cheats Dota 2's],
];

function apply(content) {
	let r = content;
	for (const [a, b] of UI_REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

// Rebuild ui-strings from clean source
for (const file of ['ui-strings-part1.mjs', 'ui-strings-part2.mjs']) {
	let content = await readFile(path.join(SRC, 'scripts/i18n-data', file), 'utf8');
	content = apply(content);
	await writeFile(path.join(ROOT, 'scripts/i18n-data', file), content);
	console.log('Fixed', file);
}

// Fix pages-en eac key
let pagesEn = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), 'utf8');
pagesEn = pagesEn.replace(/\teac: \{/, "\t'vac': {");
pagesEn = pagesEn.replace(/Dota 2 Dota 2/g, 'Dota 2's);
pagesEn = pagesEn.replace(/for Dota 2 Dota 2/g, 'for Dota 2');
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), pagesEn);

// Fix pages-i18n
let pagesI18n = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), 'utf8');
pagesI18n = apply(pagesI18n);
pagesI18n = pagesI18n.replace(/'vac'/g, "'vac'");
pagesI18n = pagesI18n.replace(/eac:/g, "'vac':");
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), pagesI18n);

// Fix generate-i18n pages count
let gen = await readFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), 'utf8');
gen = gen.replace('Pages per locale: 25', 'Pages per locale: 17');
await writeFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), gen);

console.log('Fixed i18n keys.');
