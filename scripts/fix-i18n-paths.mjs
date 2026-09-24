#!/usr/bin/env node
/**
 * Fix legacy path artifacts in i18n source files before generate:i18n.
 */
import { readFileSync, writeFileSync } from 'node:fs';
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

const TEXT_REPLACEMENTS = [
	[/checkout checkout/gi, 'checkout'],
	[/ranked matches, ranked, and ranked matc/gi, 'ranked and casual matches'],
	[/ranked matches matches/gi, 'ranked matches'],
	[/permanent reliable/gi, 'permanent patch status'],
	[/kalıcı reliable/gi, 'kalıcı patch status'],
	[/reliable 保証/gi, 'patch status 保証'],
	[/永久reliable/gi, '永久のpatch status'],
	[/영구 reliable/gi, '영구 patch status'],
	[/reliable vĩnh viễn/gi, 'patch status vĩnh viễn'],
	[/reliable permanen/gi, 'patch status permanen'],
	[/reliable статус/gi, 'patch status'],
	[/reliable stav/gi, 'patch status stav'],
	[/reliable garanterar/gi, 'patch status garanterar'],
	[/reliable गारंटी/gi, 'patch status गारंटी'],
	[/حالة reliable/gi, 'حالة patch status'],
	[/reliable دائمة/gi, 'patch status دائمة'],
	[/reliable ถาวร/gi, 'patch status ถาวร'],
	[/reliable 보장/gi, 'patch status 보장'],
];

const TARGETS = [
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

function clean(text) {
	let out = text;
	for (const [from, to] of PATH_REPLACEMENTS) {
		out = out.split(from).join(to);
	}
	for (const [re, rep] of TEXT_REPLACEMENTS) {
		out = out.replace(re, rep);
	}
	return out;
}

for (const rel of TARGETS) {
	const abs = path.join(ROOT, rel);
	const before = readFileSync(abs, 'utf8');
	const after = clean(before);
	if (after !== before) {
		writeFileSync(abs, after);
		console.log('✓', rel);
	}
}

// Canonical CTA hrefs for localized pages
const pagesI18nPath = path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs');
let pagesI18n = readFileSync(pagesI18nPath, 'utf8');
pagesI18n = pagesI18n.replace(
	/export const CTA2_HREF = \{[\s\S]*?\};/,
	`export const CTA2_HREF = {
	'dota2-esp': '/cheats/',
	'dota2-aimbot': '/esp/',
	features: '/pricing/',
	pricing: '/setup/',
	setup: '/support/',
	updates: '/cheats/',
	faq: '/support/',
	support: '/setup/',
	reliable: '/cheats/',
	wallhack: '/esp/',
	radar: '/esp/',
	vac: '/updates/',
	'cheats-2026': '/cheats/',
	hacks: '/features/',
	'cheat-download': '/setup/',
	'mod-menu': '/features/',
	'soft-aim': '/aimbot/',
	'best-cheats': '/pricing/',
	'aimbot-hack': '/aimbot/',
	'esp-hack': '/esp/',
	'unlock-all': '/features/',
};`,
);
writeFileSync(pagesI18nPath, pagesI18n);
console.log('✓ pages-i18n CTA2_HREF');
