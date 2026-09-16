#!/usr/bin/env node
/**
 * Bulk SEO + identity cleanup for i18n source files.
 * Run before `npm run generate:i18n`.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PATH_REPLACEMENTS = [
	['/forums/premium-dota2-cheats-VAC/', '/forums/reliable-dota2-cheats-eac/'],
	['/dota2-esp/', '/esp/'],
	['/dota2-aimbot/', '/aimbot/'],
	['/dota2-radar-hack/', '/radar/'],
	['/dota2-cheats-2026/', '/2026/'],
	['/dota2-cheats/', '/cheats/'],
	['/vac-bypass/', '/vac/'],
	['/premium-dota2-cheats/', '/cheats/'],
	['/reliable-dota2-cheats/', '/updates/'],
];

const TERM_REPLACEMENTS = [
	[/Skillshot assist assist/gi, 'Skillshot assist'],
	[/ranked matches matches/gi, 'ranked matches'],
	[/ranked matches rounds/gi, 'ranked matches'],
	[/operator abilitys/gi, 'hero abilities'],
	[/operator ability markers/gi, 'hero ability markers'],
	[/operator ability/gi, 'hero ability'],
	[/operator markers/gi, 'hero markers'],
	[/operator ESP/gi, 'hero ESP'],
	[/operator main/gi, 'carry main'],
	[/operator fights/gi, 'team fights'],
	[/operator holds/gi, 'lane holds'],
	[/enemy operators/gi, 'enemy heroes'],
	[/operator item builds/gi, 'hero item builds'],
	[/loadout drops/gi, 'item drops'],
	[/loadout and streak/gi, 'item and ultimate'],
	[/buy stations/gi, 'shops'],
	[/buy station/gi, 'shop'],
	[/weapon drops/gi, 'wards and runes'],
	[/enemy squads/gi, 'enemy teams'],
	[/hot zones/gi, 'objectives'],
	[/helicopter drop/gi, 'Roshan fight'],
	[/tactical operator/gi, 'Dota 2 hero'],
	[/heli markers/gi, 'Roshan markers'],
	[/Gadget ESP/gi, 'Utility ESP'],
	[/Agents, Spike, Health, Rank/gi, 'Heroes, wards, health, MMR'],
	[/assault rifle\/SMG/gi, 'ranged vs melee heroes'],
	[/ARs, SMGs/gi, 'carries and supports'],
	[/AR \/ SMG/gi, 'carry / support'],
	[/long-range rifles/gi, 'ranged heroes'],
	[/Kastov vs SMG/gi, 'ranged vs melee'],
	[/Rebirth Island/gi, 'the map'],
	[/Rebirth/gi, 'ranked'],
	[/Main Street/gi, 'mid lane'],
	[/Train Wreck/gi, 'team fights'],
	[/SBMM/gi, 'high MMR'],
	[/soft aim/gi, 'skillshot assist'],
	[/Soft aim/gi, 'Skillshot assist'],
	[/Soft Aim/gi, 'Skillshot assist'],
	[/checkout checkout/gi, 'checkout'],
	[/permanent reliable/gi, 'permanent patch status'],
	// Do not globally replace EAC→VAC — it corrupts forum slugs like reliable-dota2-cheats-eac.
	[/indetectable/gi, ''],
	[/undetected/gi, ''],
	[/Reliable /g, 'Patch status '],
	[/reliable /g, 'patch status '],
	[/Dota 2 Esp/g, 'Dota 2 ESP'],
	[/player ESP, loot tags/gi, 'hero ESP, ward vision'],
	[/loot and loadouts/gi, 'wards and item builds'],
	[/third-party/gi, 'gank'],
	[/third party/gi, 'gank'],
	[/TTK windows/gi, 'fight windows'],
	[/zone pushes/gi, 'lane pushes'],
	[/vertical loadout drop routes/gi, 'jungle ward routes'],
	[/high-traffic POIs/gi, 'key map objectives'],
	[/souljade contests/gi, 'Roshan contests'],
	[/Spectre fights/gi, 'carry fights'],
	[/killcam/gi, 'replay'],
	[/weapon balance/gi, 'hero balance'],
	[/official servers/gi, 'ranked matchmaking'],
	[/ranked and casual matches sessions/gi, 'ranked and casual matches'],
	[/ranked and casual matches lobbies/gi, 'ranked and casual matches'],
	[/ranked matches and ranked/gi, 'ranked and casual matches'],
	[/ranked and ranked/gi, 'ranked and casual matches'],
	[/dota 2 cheats" and "dota 2 cheats"/gi, 'dota 2 cheats'],
	[/dota 2 cheats 2026" criteria/gi, '2026 buyer guide'],
];

function cleanText(text) {
	let out = text;
	for (const [from, to] of PATH_REPLACEMENTS) {
		out = out.split(from).join(to);
	}
	for (const [re, rep] of TERM_REPLACEMENTS) {
		out = out.replace(re, rep);
	}
	return out.replace(/\s{2,}/g, ' ').replace(/ ,/g, ',').trim();
}

function processFile(relPath) {
	const abs = path.join(ROOT, relPath);
	let content = readFileSync(abs, 'utf8');
	const next = cleanText(content);
	if (next !== content) {
		writeFileSync(abs, next);
		console.log('✓', relPath);
	}
}

const targets = [
	'scripts/i18n-data/pages-en.mjs',
	'scripts/i18n-data/simple-pages-en.mjs',
	'scripts/i18n-data/simple-page-content.mjs',
	'scripts/i18n-data/simple-page-content-translations-rest.mjs',
	'scripts/i18n-data/pages-i18n.mjs',
	'scripts/i18n-data/ui-strings-part1.mjs',
	'scripts/i18n-data/ui-strings-part2.mjs',
	'scripts/i18n-data/link-labels.mjs',
	'scripts/generate-locale-translations.mjs',
];

for (const f of targets) processFile(f);

// Sync link-labels to canonical short paths for EN
const linkLabelsPath = path.join(ROOT, 'scripts/i18n-data/link-labels.mjs');
let linkLabels = readFileSync(linkLabelsPath, 'utf8');
const canonicalEn = {
	"'/'": "'Full product'",
	"'/esp/'": "'ESP & wallhack guide'",
	"'/aimbot/'": "'Aimbot & skillshot assist'",
	"'/radar/'": "'2D radar overlay'",
	"'/cheats/'": "'Dota 2 Cheats overview'",
	"'/features/'": "'All features'",
	"'/pricing/'": "'Store'",
	"'/setup/'": "'Setup guide'",
	"'/updates/'": "'Live status'",
	"'/faq/'": "'FAQ'",
	"'/support/'": "'Support'",
	"'/refund-policy/'": "'Refund policy'",
	"'/vac/'": "'VAC maintenance'",
	"'/forums/'": "'Dota 2 cheats forums'",
	"'/2026/'": "'dota 2 cheats 2026'",
	"'/compare/'": "'Compare'",
};
for (const [href, label] of Object.entries(canonicalEn)) {
	const re = new RegExp(`${href.replace(/\//g, '\\/')}: '[^']*'`, 'g');
	linkLabels = linkLabels.replace(re, `${href}: ${label}`);
}
writeFileSync(linkLabelsPath, linkLabels);
console.log('✓ link-labels canonical paths');
