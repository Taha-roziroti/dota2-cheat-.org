#!/usr/bin/env node
/**
 * Bulk rebrand: Warzone template → Dota 2 Cheats (dota2cheat.org)
 * Run from project root: node scripts/adapt-dota2-site.mjs
 */
import { readFile, writeFile, readdir, unlink, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);

const REPLACEMENTS = [
	['https://cheatsforwarzone.com', 'https://dota2cheat.org'],
	['https://www.cheatsforwarzone.com', 'https://dota2cheat.org'],
	['cheatsforwarzone.com', 'dota2cheat.org'],
	['support@cheatsforwarzone.com', 'support@dota2cheat.org'],
	['https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fwarzone', 'https://dota2cheat.org/store'],
	['https://zadeyo.com', 'https://dota2cheat.org'],
	['zadeyo.com', 'dota2cheat.org'],
	['zadeyo', ''],
	['Call of Duty: Warzone', 'Dota 2'],
	['Call of Duty', 'Dota 2'],
	['Warzone Cheats', 'Dota 2 Cheats'],
	['warzone cheats', 'dota 2 cheats'],
	['warzone cheat', 'dota 2 cheat'],
	['warzone hacks', 'dota 2 hacks'],
	['warzone hack', 'dota 2 hack'],
	['warzone aimbot', 'dota 2 aimbot'],
	['warzone esp', 'dota 2 esp'],
	['warzone wallhack', 'dota 2 wallhack'],
	['Warzone', 'Dota 2'],
	['warzone', 'dota2'],
	['Ricochet', 'VAC'],
	['ricochet', 'vac'],
	['Verdansk', 'the map'],
	['Battle Royale', 'ranked matches'],
	['undetected warzone cheats', 'dota 2 cheats'],
	['undetected dota2 cheats', 'dota 2 cheats'],
	['Undetected warzone cheats', 'Dota 2 cheats'],
	['Undetected dota2 cheats', 'Dota 2 cheats'],
	['undetected', 'reliable'],
	['Undetected', 'Reliable'],
	['UNDETECTED', 'RELIABLE'],
	['cheats-for-warzone', 'dota2-cheat'],
	['cheats for warzone', 'dota 2 cheats'],
	["/blog/", '/forums/'],
	['"/blog"', '"/forums"'],
	["'/blog'", "'/forums'"],
	['https://www.callofduty.com/warzone', 'https://www.dota2.com/'],
	['https://callofduty.fandom.com', 'https://dota2.fandom.com'],
	['https://www.reddit.com/r/Warzone/', 'https://www.reddit.com/r/DotA2/'],
	['@CallofDuty', '@DOTA2'],
	['https://x.com/CallofDuty', 'https://x.com/DOTA2'],
];

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
	const ext = path.extname(file);
	return ['.ts', '.tsx', '.astro', '.mjs', '.js', '.json', '.md', '.css', '.toml', '.txt', '.xml'].includes(ext);
}

async function processFile(file) {
	if (!shouldProcess(file)) return false;
	if (file.includes('adapt-dota2-site.mjs')) return false;
	if (file.includes('generate-forum-posts.mjs')) return false;
	let content = await readFile(file, 'utf8');
	const original = content;
	for (const [from, to] of REPLACEMENTS) {
		content = content.split(from).join(to);
	}
	if (content !== original) {
		await writeFile(file, content, 'utf8');
		return true;
	}
	return false;
}

async function removeGuides() {
	const targets = [
		path.join(ROOT, 'src/pages/guides'),
		path.join(ROOT, 'src/components/GuideIndexPage.astro'),
		path.join(ROOT, 'src/components/GuidePostPage.astro'),
		path.join(ROOT, 'public/images/guides'),
		path.join(ROOT, 'public/images/zadeyo-logo.webp'),
	];
	for (const target of targets) {
		try {
			await rm(target, { recursive: true, force: true });
			console.log('Removed:', path.relative(ROOT, target));
		} catch {
			/* ignore */
		}
	}
}

async function stubGuidesHelpers() {
	const helpersPath = path.join(ROOT, 'src/data/guides/helpers.ts');
	const stub = `/** Guides removed for Dota 2 Cheats site — forums replace blog/guides. */
export function getGuidesSitemapEntries() {
	return [];
}

export function getAllGuides() {
	return [];
}

export function getGuideBySlug(_slug: string) {
	return undefined;
}
`;
	await writeFile(helpersPath, stub, 'utf8');
	console.log('Stubbed guides helpers');
}

async function main() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		if (await processFile(file)) changed++;
	}
	console.log(`Updated ${changed} files`);
	await removeGuides();
	await stubGuidesHelpers();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
