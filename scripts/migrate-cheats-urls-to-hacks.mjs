#!/usr/bin/env node
/**
 * Migrate URL slugs from dota2-cheats → dota2-cheats (paths + sitemaps).
 * Generates 301 redirects in functions/path-redirects.json from old routing slugs.
 * Run: node scripts/migrate-cheats-urls-to-hacks.mjs
 */
import { readFile, writeFile, readdir, rename, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTING = path.join(ROOT, 'src/data/i18n/routing.ts');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

const SKIP_DIRS = new Set([
	'node_modules',
	'dist',
	'.git',
	'tmp',
	'.astro',
	'the-finals-cheats-org',
	'dota2-cheats-org-audit',
]);
const SKIP_FILES = new Set(['package-lock.json', 'migrate-cheats-urls-to-hacks.mjs']);

/** Ordered — longest / most specific first. Image asset names are excluded via guard. */
const SLUG_REPLACEMENTS = [
	['reliable-dota2-cheats-eac', 'reliable-dota2-cheats-eac'],
	['reliable-dota2-cheats', 'reliable-dota2-cheats'],
	['unentdeckte-dota2-cheats', 'unentdeckte-dota2-cheats'],
	['buy-reliable-dota2-cheats-windows-pc', 'buy-reliable-dota2-cheats-windows-pc'],
	['vac-anti-cheat-and-dota2-cheats', 'vac-anti-cheat-and-dota2-cheats'],
	['are-dota2-cheats-reliable-in-2026', 'are-dota2-cheats-reliable-in-2026'],
	['what-are-dota2-cheats', 'what-are-dota2-cheats'],
	['does-dota2-cheats-include-radar-hack', 'does-dota2-cheats-include-radar-hack'],
	['dota2-cheats-vs-ghostware-features-pricing', 'dota2-cheats-vs-ghostware-features-pricing'],
	['dota2-cheats-vs-cheatspike-comparison', 'dota2-cheats-vs-cheatspike-comparison'],
	['elitefn-vs-dota2-cheats-two-week-test', 'elitefn-vs-dota2-cheats-two-week-test'],
	['dota2-cheats-complete-guide-2026', 'dota2-cheats-complete-guide-2026'],
	['dota2-cheats-2026-whats-new', 'dota2-cheats-2026-whats-new'],
	['dota2-cheats-buyers-guide', 'dota2-cheats-buyers-guide'],
	['best-dota2-cheats', 'best-dota2-cheats'],
	['beste-dota2-cheats', 'beste-dota2-cheats'],
	['basta-dota2-cheats', 'basta-dota2-cheats'],
	['nejlepsi-dota2-cheats', 'nejlepsi-dota2-cheats'],
	['dota2-cheats-2026', 'dota2-cheats-2026'],
	['dota2-cheats-funktionen', 'dota2-cheats-funktionen'],
	['dota2-cheats-functies', 'dota2-cheats-functies'],
	['dota2-cheats-funkce', 'dota2-cheats-funkce'],
	['dota2-cheats-funktioner', 'dota2-cheats-funktioner'],
	['dota2-cheats-features', 'dota2-cheats-features'],
	['dota2-cheats-preise', 'dota2-cheats-preise'],
	['dota2-cheats-prijzen', 'dota2-cheats-prijzen'],
	['dota2-cheats-priser', 'dota2-cheats-priser'],
	['dota2-cheats-pricing', 'dota2-cheats-pricing'],
	['dota2-cheats-ceny', 'dota2-cheats-ceny'],
	['dota2-cheats-installation', 'dota2-cheats-installation'],
	['dota2-cheats-installatie', 'dota2-cheats-installatie'],
	['dota2-cheats-instalace', 'dota2-cheats-instalace'],
	['dota2-cheats-setup', 'dota2-cheats-setup'],
	['dota2-cheats-updates', 'dota2-cheats-updates'],
	['dota2-cheats-uppdateringar', 'dota2-cheats-uppdateringar'],
	['dota2-cheats-aktualizace', 'dota2-cheats-aktualizace'],
	['dota2-cheats-faq', 'dota2-cheats-faq'],
	['dota2-cheats-support', 'dota2-cheats-support'],
	['dota2-cheats-podpora', 'dota2-cheats-podpora'],
	['niewykrywalne-cheats-dota2', 'niewykrywalne-cheats-dota2'],
	['najlepsze-cheats-dota2', 'najlepsze-hacks-dota2'],
	['melhores-cheats-dota2', 'melhores-hacks-dota2'],
	['cele-mai-bune-cheats-dota2', 'cele-mai-bune-hacks-dota2'],
	['cheats-dota2-indetectaveis', 'cheats-dota2-indetectaveis'],
	['cheats-dota2-nedetectabile', 'cheats-dota2-nedetectabile'],
	['cheats-dota2-2026', 'hacks-dota2-2026'],
	['hacks-cheats-dota2', 'hacks-dota2'],
	['faq-cheats-dota2', 'faq-hacks-dota2'],
	['functii-cheats-dota2', 'functii-hacks-dota2'],
	['preturi-cheats-dota2', 'preturi-hacks-dota2'],
	['actualizari-cheats-dota2', 'actualizari-hacks-dota2'],
	['instalare-cheats-dota2', 'instalare-hacks-dota2'],
	['suport-cheats-dota2', 'suport-hacks-dota2'],
	['recursos-cheats-dota2', 'recursos-cheats-dota2'],
	['precos-cheats-dota2', 'precos-hacks-dota2'],
	['atualizacoes-cheats-dota2', 'atualizacoes-hacks-dota2'],
	['instalacao-cheats-dota2', 'instalacao-hacks-dota2'],
	['suporte-cheats-dota2', 'suporte-hacks-dota2'],
	['download-cheats-dota2', 'download-hacks-dota2'],
	['menu-mod-cheats-dota2', 'menu-mod-hacks-dota2'],
	['meniu-mod-cheats-dota2', 'meniu-mod-hacks-dota2'],
	['soft-aim-cheats-dota2', 'soft-aim-hacks-dota2'],
	['aimbot-hack-cheats-dota2', 'aimbot-hack-hacks-dota2'],
	['esp-hack-cheats-dota2', 'esp-hack-hacks-dota2'],
	['unlock-all-cheats-dota2', 'unlock-all-hacks-dota2'],
	['wallhack-cheats-dota2', 'wallhack-hacks-dota2'],
	['radar-hack-cheats-dota2', 'radar-hack-hacks-dota2'],
	['descarcare-cheats-dota2', 'descarcare-hacks-dota2'],
	['cheats-dota2-esp', 'hacks-dota2-esp'],
	['cheats-dota2-aimbot', 'hacks-dota2-aimbot'],
	['vac-bypass-cheats', 'vac-bypass-hacks'],
	['/dota2-cheats/', '/dota2-cheats/'],
	['/dota2-cheats', '/dota2-cheats'],
	["'dota2-cheats'", "'dota2-cheats'"],
	['"dota2-cheats"', '"dota2-cheats"'],
];

const IMAGE_ASSET_PREFIX = '/images/dota2-cheats';

function applySlugReplacements(text) {
	let out = text;
	for (const [from, to] of SLUG_REPLACEMENTS) {
		if (!out.includes(from)) continue;
		out = out
			.split('\n')
			.map((line) => {
				// Never rewrite static image asset filenames.
				if (line.includes('/images/dota2-cheats')) {
					return line;
				}
				return line.split(from).join(to);
			})
			.join('\n');
	}
	return out;
}

function parseEnglishPaths(src) {
	const block = src.match(/export const englishPaths[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
	if (!block) throw new Error('englishPaths block not found');
	/** @type {Record<string, string>} */
	const paths = {};
	for (const row of block[1].matchAll(/\t(?:'([^']+)'|(\w+)):\s*'([^']*)',/g)) {
		paths[row[1] ?? row[2]] = row[3];
	}
	return paths;
}

function parseLocalizedSlugs(src) {
	const localized = src.slice(src.indexOf('export const localizedSlugs'));
	/** @type {Record<string, Record<string, string>>} */
	const slugs = {};
	for (const block of localized.matchAll(/\t(?:'([^']+)'|(\w+)):\s*\{([\s\S]*?)\n\t\},/g)) {
		const pageId = block[1] ?? block[2];
		slugs[pageId] = {};
		for (const row of block[3].matchAll(/\t(\w+):\s*'([^']*)',/g)) {
			slugs[pageId][row[1]] = row[2];
		}
	}
	return slugs;
}

function localePath(locale, slug) {
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

function addRedirectPair(map, fromPath, toPath) {
	if (!fromPath || !toPath || fromPath === toPath) return;
	map[fromPath] = toPath;
	const noSlash = fromPath.replace(/\/$/, '');
	if (noSlash !== fromPath && noSlash !== toPath) map[noSlash] = toPath;
}

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

function shouldProcess(file) {
	const rel = path.relative(ROOT, file);
	if (SKIP_FILES.has(path.basename(file))) return false;
	if (rel.startsWith('public/images/')) return false;
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) return false;
	return true;
}

const DIR_RENAMES = [
	['src/pages/dota2-cheats', 'src/pages/dota2-cheats'],
	['src/pages/best-dota2-cheats', 'src/pages/best-dota2-cheats'],
	['src/pages/reliable-dota2-cheats', 'src/pages/reliable-dota2-cheats'],
	['src/pages/dota2-cheats-2026', 'src/pages/dota2-cheats-2026'],
];

// --- Parse routing before migration ---
const routingBefore = await readFile(ROUTING, 'utf8');
const englishBefore = parseEnglishPaths(routingBefore);
const slugsBefore = parseLocalizedSlugs(routingBefore);

// --- Apply text replacements across repo ---
let changed = 0;
const files = await walk(ROOT);
for (const file of files) {
	if (!shouldProcess(file)) continue;
	const original = await readFile(file, 'utf8');
	const updated = applySlugReplacements(original);
	if (updated !== original) {
		await writeFile(file, updated, 'utf8');
		changed++;
	}
}

// Fix duplicate check in routing.ts
let routing = await readFile(ROUTING, 'utf8');
routing = routing.replace(
	"if (withSlash === '/dota2-cheats/' || withSlash === '/dota2-cheats/')",
	"if (withSlash === '/dota2-cheats/' || withSlash === '/dota2-cheats/')",
);
await writeFile(ROUTING, routing, 'utf8');

// --- Rename page directories ---
for (const [fromRel, toRel] of DIR_RENAMES) {
	const from = path.join(ROOT, fromRel);
	const to = path.join(ROOT, toRel);
	try {
		await access(from);
		await rename(from, to);
		console.log(`renamed ${fromRel} → ${toRel}`);
	} catch {
		// already migrated
	}
}

// --- Build redirects from slug diff ---
const routingAfter = await readFile(ROUTING, 'utf8');
const englishAfter = parseEnglishPaths(routingAfter);
const slugsAfter = parseLocalizedSlugs(routingAfter);

const existingRedirects = JSON.parse(await readFile(PATH_REDIRECTS, 'utf8'));
const newRedirects = { ...existingRedirects };

for (const [pageId, oldPath] of Object.entries(englishBefore)) {
	const newPath = englishAfter[pageId];
	if (oldPath && newPath && oldPath !== newPath) {
		addRedirectPair(newRedirects, oldPath.replace(/\/$/, ''), newPath);
		addRedirectPair(newRedirects, oldPath, newPath);
	}
}

for (const [pageId, localeMap] of Object.entries(slugsBefore)) {
	const afterMap = slugsAfter[pageId] ?? {};
	for (const [locale, oldSlug] of Object.entries(localeMap)) {
		const newSlug = afterMap[locale];
		if (oldSlug === newSlug) continue;
		const from = localePath(locale, oldSlug);
		const to = localePath(locale, newSlug);
		addRedirectPair(newRedirects, from, to);
	}
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(newRedirects, null, 2)}\n`);

console.log(`\nmigrate-cheats-urls-to-hacks: ${changed} file(s) updated`);
console.log(
	`Added/updated ${Object.keys(newRedirects).length - Object.keys(existingRedirects).length} redirect entries in path-redirects.json`,
);
