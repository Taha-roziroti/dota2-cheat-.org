#!/usr/bin/env node
/**
 * Bulk Dota 2 lexicon cleanup — removes Valorant/Vanguard leftovers from source files.
 * Run before generate:i18n and generate-blog-posts.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SKIP = new Set([
	'scripts/adapt-valorant-to-dota2.mjs',
	'scripts/adapt-valorant.mjs',
	'scripts/adapt-valorant-site.mjs',
	'scripts/adapt-naraka.mjs',
	'scripts/fix-valorant-lexicon.mjs',
	'scripts/dota2-content-cleanup.mjs',
	'src/data/brand.ts',
	'scripts/validate-checkout-links.mjs',
]);

/** Order matters — longer phrases first. */
const REPLACEMENTS = [
	['ranked & competitive ranked', 'ranked matches and Resurgence'],
	['Ranked & competitive ranked', 'ranked matches and Resurgence'],
	['Vanguard rebuilds', 'VAC rebuilds'],
	['Vanguard maintenance', 'VAC maintenance'],
	['Mantenimiento Vanguard', 'Mantenimiento VAC'],
	['Maintenance Vanguard', 'Maintenance VAC'],
	['Vanguard-underhåll', 'VAC-underhåll'],
	['Vanguard-Wartung', 'VAC-Wartung'],
	['Vanguard supported', 'VAC supported'],
	['Vanguard Updates', 'VAC Updates'],
	['Bypass Vanguard', 'VAC Bypass'],
	['How does Vanguard', 'How does VAC'],
	['Vanguard monitors', 'VAC monitors'],
	['keep Vanguard status', 'keep VAC status'],
	['Vanguard and report', 'VAC and report'],
	['parches de Vanguard', 'parches de VAC'],
	['patches Vanguard', 'patches VAC'],
	['with Vanguard', 'with VAC'],
	['& Vanguard', '& VAC'],
	['Vanguard incluido', 'VAC incluido'],
	['Vanguard inclus', 'VAC inclus'],
	['Vanguard support', 'VAC support'],
	['Vanguard rebuild', 'VAC rebuild'],
	['Vanguard patch', 'VAC patch'],
	['Vanguard update', 'VAC update'],
	['Vanguard FAQ', 'VAC FAQ'],
	['Vanguard rebuilds', 'VAC rebuilds'],
	['Vanguard', 'VAC'],
	['Riot Games', 'Activision'],
	["Riot's", "Activision's"],
	['Riot ', 'Activision '],
	['from Riot', 'from Activision'],
	['on Riot', 'on Activision'],
	['Unrated and Ranked', 'public matches and ranked matches'],
	['Unrated', 'public matches'],
	['Ranked queues', 'ranked matches queues'],
	['before Ranked', 'before ranked matches'],
	['in Ranked', 'in ranked matches'],
	['for Ranked', 'for ranked matches'],
	['Ranked and Resurgence', 'ranked matches and Resurgence'],
	['Ranked duels', 'mid-range gunfights'],
	['Ranked sessions', 'ranked matches sessions'],
	['Ranked play', 'ranked matches play'],
	['Ranked firefight', 'ranked matches firefight'],
	['Ranked competitive', 'ranked matches'],
	['competitive ranked', 'ranked matches'],
	['Vandal and Phantom', 'assault rifles and SMGs'],
	['Vandal', 'assault rifle'],
	['Phantom', 'SMG'],
	[' on Haven', ' at Train Wreck'],
	[' on Bind', ' on Main Street'],
	[' on Ascent', ' at Coal Depot'],
	[' on Split', ' at the map'],
	[' on Breeze', ' in Urzikstan'],
	['Finals intel', 'Dota 2 intel'],
	['The Finals', 'Dota 2'],
	['grapple and ult cues', 'loadout and streak cues'],
	['agent abilities', 'operator loadouts'],
	['agent tiers', 'weapon meta tiers'],
	['agent abilitys', 'operator loadouts'],
	['When Riot adjusts', 'When Activision adjusts'],
	['When Riot drops', 'When Activision drops'],
	['>Vanguard<', '>VAC anti-cheat<'],
	['rel="noopener noreferrer">Vanguard</a>', 'rel="noopener noreferrer">VAC anti-cheat</a>'],
	['Dota 2 Cheats agent', 'Dota 2 Cheats overlay'],
	['agents through walls', 'players through walls'],
	['enemy agents', 'enemy players'],
	['valorant', 'dota2'],
	['Valorant', 'Dota 2'],
];

async function walk(dir, acc = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		const rel = path.relative(ROOT, path.join(dir, e.name)).replace(/\\/g, '/');
		if (e.isDirectory()) {
			if (['node_modules', 'dist', '.git', '.astro'].includes(e.name)) continue;
			await walk(path.join(dir, e.name), acc);
		} else if (/\.(mjs|ts|tsx|astro|json)$/.test(e.name) && !rel.includes('content.generated') && !rel.includes('posts.generated')) {
			if (!SKIP.has(rel)) acc.push(path.join(dir, e.name));
		}
	}
	return acc;
}

function applyReplacements(text) {
	let out = text;
	for (const [from, to] of REPLACEMENTS) {
		out = out.split(from).join(to);
	}
	return out;
}

async function main() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const before = await readFile(file, 'utf8');
		const after = applyReplacements(before);
		if (after !== before) {
			await writeFile(file, after, 'utf8');
			changed++;
			console.log('fixed:', path.relative(ROOT, file));
		}
	}
	console.log(`\nDone — ${changed} files updated.`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
