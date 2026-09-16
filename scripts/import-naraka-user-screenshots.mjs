/**
 * Import user-provided Dota 2 gameplay screenshots (local PNGs).
 * Writes /images/dota2-screenshot-01.webp … 08.webp + -480w / -960w variants
 * and legacy feature aliases. Does not touch agent assets.
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const imagesDir = path.join(ROOT, 'public/images');
const assetsDir = '/home/ubuntu/.cursor/projects/workspace/assets';

/** User images in display order — cycled for screenshots 01–08. */
const USER_SOURCES = [
	{
		file: '8ff52a29-79b1-454f-b22b-dbbc9c47f10f.png',
		label: 'ESP item and weapon drops box labels through walls',
	},
	{
		file: '3ae3180e-dbdb-467a-a109-f9ff03ec7071.png',
		label: 'ESP weapon drops tags through map geometry',
	},
	{
		file: 'b1cd963b-a712-4f90-bad0-cdd0fe1756eb.png',
		label: 'Dota 2 third-person gameplay on Windows PC',
	},
	{
		file: 'fa6b50d9-f928-4111-af7b-55c6d7859393.png',
		label: 'ESP player tracking with distance readouts',
	},
];

const SCREENSHOT_COUNT = 8;
const CONTENT_WIDTHS = [480, 960];
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

const LEGACY_MAP = {
	'dota2-screenshot-01': ['dota2-cheats-esp.webp', 'dota2-esp-player-tags.webp'],
	'dota2-screenshot-02': ['dota2-cheats-wallhack.webp', 'dota2-cheats-session.webp'],
	'dota2-screenshot-03': ['dota2-cheats-aimbot.webp', 'dota2-cheats-combat.webp'],
	'dota2-screenshot-04': [
		'dota2-cheats-aimbot-view.webp',
		'dota2-aimbot-skeleton.webp',
		'dota2-aimbot-sniper.webp',
	],
	'dota2-screenshot-05': ['dota2-cheats-radar.webp', 'dota2-esp-radar.webp'],
	'dota2-screenshot-06': ['naraka-extract-fight.webp', 'naraka-growth-run-combat.webp'],
	'dota2-screenshot-07': ['naraka-growth-run-mode.webp'],
	'dota2-screenshot-08': [],
};

async function encodeWebp(input, width, options = WEBP) {
	const meta = await sharp(input).metadata();
	const nativeWidth = meta.width ?? width;
	const targetWidth = Math.min(width, nativeWidth);
	const height = Math.round(((meta.height ?? 667) / nativeWidth) * targetWidth);
	return sharp(input)
		.resize(targetWidth, height, { fit: 'inside', withoutEnlargement: true })
		.webp(options)
		.toBuffer();
}

async function writeScreenshotSet(pngPath, baseName) {
	const outputs = [];
	let canonical = null;

	for (const width of CONTENT_WIDTHS) {
		const file = `${baseName}-${width}w.webp`;
		const webp = await encodeWebp(pngPath, width);
		await writeFile(path.join(imagesDir, file), webp);
		outputs.push({ file, bytes: webp.length });
	}

	canonical = await encodeWebp(pngPath, 960);
	await writeFile(path.join(imagesDir, `${baseName}.webp`), canonical);
	outputs.push({ file: `${baseName}.webp`, bytes: canonical.length });

	return { outputs, canonical };
}

await mkdir(imagesDir, { recursive: true });
await mkdir(path.join(ROOT, 'scripts/assets/dota2-screenshots'), { recursive: true });

const sourcePaths = [];
for (let i = 0; i < USER_SOURCES.length; i += 1) {
	const src = path.join(assetsDir, USER_SOURCES[i].file);
	const saved = path.join(ROOT, 'scripts/assets/dota2-screenshots', `source-${i + 1}.png`);
	await copyFile(src, saved);
	sourcePaths.push(saved);
	console.log(`✓ staged ${USER_SOURCES[i].file}`);
}

let totalBytes = 0;
const canonicalBySlot = {};

for (let n = 1; n <= SCREENSHOT_COUNT; n += 1) {
	const num = String(n).padStart(2, '0');
	const base = `dota2-screenshot-${num}`;
	const sourceIndex = (n - 1) % USER_SOURCES.length;
	const png = sourcePaths[sourceIndex];

	console.log(`Processing ${base} ← source ${sourceIndex + 1}…`);
	const { outputs, canonical } = await writeScreenshotSet(png, base);
	canonicalBySlot[base] = canonical;
	for (const { file, bytes } of outputs) {
		totalBytes += bytes;
		console.log(`  ✓ ${file} (${Math.round(bytes / 1024)}KB)`);
	}

	for (const name of LEGACY_MAP[base] ?? []) {
		await writeFile(path.join(imagesDir, name), canonical);
		console.log(`  ✓ ${name} (alias)`);
	}
}

const reviewsCanonical = canonicalBySlot['dota2-screenshot-04'];
await writeFile(path.join(imagesDir, 'reviews-banner.webp'), reviewsCanonical);
for (const width of CONTENT_WIDTHS) {
	const webp = await encodeWebp(sourcePaths[3], width);
	await writeFile(path.join(imagesDir, `reviews-banner-${width}w.webp`), webp);
}
console.log('✓ reviews-banner.webp (+ responsive variants)');

console.log(
	`\nDone — ${SCREENSHOT_COUNT} screenshots from ${USER_SOURCES.length} user images (~${Math.round(totalBytes / 1024)}KB webp). Agent unchanged.`,
);
