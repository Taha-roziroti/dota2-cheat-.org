#!/usr/bin/env node
/**
 * Rename /images/dota2-cheats-* assets → /images/dota2-cheats-* and update references.
 * Run: node scripts/rename-dota2-cheats-images.mjs
 */
import { readFile, writeFile, rename, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES = path.join(ROOT, 'public/images');

const SKIP_DIRS = new Set([
	'node_modules',
	'dist',
	'.git',
	'tmp',
	'.astro',
	'the-finals-cheats-org',
	'dota2-cheats-org-audit',
]);

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

// 1. Rename image files on disk
const imageFiles = (await readdir(IMAGES)).filter((f) => f.includes('dota2-cheats'));
let renamed = 0;
for (const file of imageFiles) {
	const next = file.replace(/dota2-cheats/g, 'dota2-cheats');
	if (next === file) continue;
	await rename(path.join(IMAGES, file), path.join(IMAGES, next));
	renamed++;
	console.log(`renamed image: ${file} → ${next}`);
}

// 2. Update text references
const FROM = '/images/dota2-cheats-';
const TO = '/images/dota2-cheats-';
let updated = 0;
for (const file of await walk(ROOT)) {
	if (file.startsWith(IMAGES)) continue;
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) continue;
	const text = await readFile(file, 'utf8');
	if (!text.includes(FROM) && !text.includes('dota2-cheats-hero') && !text.includes('dota2-cheats-logo')) {
		continue;
	}
	const next = text
		.replaceAll(FROM, TO)
		.replaceAll("'dota2-cheats-hero'", "'dota2-cheats-hero'")
		.replaceAll("'dota2-cheats-logo'", "'dota2-cheats-logo'");
	if (next !== text) {
		await writeFile(file, next, 'utf8');
		updated++;
		console.log('updated', path.relative(ROOT, file));
	}
}

console.log(`\nrename-dota2-cheats-images: ${renamed} file(s) renamed, ${updated} reference file(s) updated`);
