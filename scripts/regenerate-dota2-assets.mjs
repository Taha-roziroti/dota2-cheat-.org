/**
 * Regenerate Dota 2 screenshots, hero stills, and nav logo from the hero MP4.
 * Replaces leftover Warzone template imagery with real Dota 2 hero art.
 */
import { execSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const imagesDir = path.join(ROOT, 'public/images');
const publicDir = path.join(ROOT, 'public');
const tmpDir = path.join(ROOT, 'tmp/dota2-assets');
const HERO_VIDEO = path.join(publicDir, 'videos/Dota2-Hero.mp4');

const CONTENT_WIDTHS = [480, 640, 960, 1024, 1199];
const WEBP = { quality: 82, effort: 6, smartSubsample: true };
const SCREENSHOT_TIMES = [0.6, 1.4, 2.2, 3.0, 3.8, 4.6, 5.4];

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 72" role="img" aria-label="Dota 2 Cheats">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c4b5fd"/>
      <stop offset="0.5" stop-color="#a78bfa"/>
      <stop offset="1" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <text x="0" y="56" fill="url(#g)" font-family="Arial Black, Arial, sans-serif" font-size="52" font-weight="900" letter-spacing="2">DOTA 2 CHEATS</text>
</svg>`;

async function encodeWebp(input, width, options = WEBP) {
	const meta = await sharp(input).metadata();
	const nativeWidth = meta.width ?? width;
	const targetWidth = Math.min(width, nativeWidth);
	const height = Math.round(((meta.height ?? 1080) / nativeWidth) * targetWidth);
	return sharp(input)
		.resize(targetWidth, height, { fit: 'inside', withoutEnlargement: true })
		.webp(options)
		.toBuffer();
}

async function writeResponsive(baseName, input) {
	const fullBuf = await sharp(input).webp({ quality: 85, effort: 6 }).toBuffer();
	await writeFile(path.join(imagesDir, `${baseName}.webp`), fullBuf);
	for (const w of CONTENT_WIDTHS) {
		const buf = await encodeWebp(input, w);
		await writeFile(path.join(imagesDir, `${baseName}-${w}w.webp`), buf);
	}
	console.log(`  ✓ ${baseName}.webp (+ responsive)`);
}

async function extractFrame(seconds, outPath) {
	execSync(
		`ffmpeg -y -ss ${seconds} -i "${HERO_VIDEO}" -vframes 1 -update 1 "${outPath}"`,
		{ stdio: 'pipe' },
	);
}

async function writeHero(framePath) {
	const meta = await sharp(framePath).metadata();
	const targetW = 1920;
	const targetH = Math.round(targetW / 3.15);
	const aspect = targetW / targetH;
	let cropH = meta.height ?? 1080;
	let cropW = Math.round(cropH * aspect);
	if (cropW > (meta.width ?? 1920)) {
		cropW = meta.width ?? 1920;
		cropH = Math.round(cropW / aspect);
	}
	const left = (meta.width ?? 1920) - cropW;
	const top = Math.round((meta.height ?? 1080) * 0.08);
	const heroCrop = await sharp(framePath)
		.extract({ left, top, width: cropW, height: cropH })
		.resize(targetW, targetH)
		.toBuffer();

	await writeResponsive('dota2-cheats-hero', heroCrop);
	await writeResponsive('dota2-hero-poster', heroCrop);
	await writeFile(
		path.join(imagesDir, 'dota2-cheats-hero-4k.webp'),
		await sharp(heroCrop).resize(3840, null, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toBuffer(),
	);
	await writeFile(path.join(imagesDir, 'hero-banner.webp'), await sharp(heroCrop).webp({ quality: 85 }).toBuffer());
}

async function writeLogo() {
	await writeFile(path.join(imagesDir, 'dota2-cheats-logo-nav.svg'), LOGO_SVG);
	await writeFile(path.join(publicDir, 'dota2-cheats-logo-nav.svg'), LOGO_SVG);

	const master = await sharp(Buffer.from(LOGO_SVG)).png().toBuffer();
	const navWidths = [
		{ name: 'dota2-cheats-logo-nav-360w.png', w: 360 },
		{ name: 'dota2-cheats-logo-nav-480w.png', w: 480 },
		{ name: 'dota2-cheats-logo-nav-560w.png', w: 560 },
		{ name: 'dota2-cheats-logo-nav-720w.png', w: 720 },
		{ name: 'dota2-cheats-logo-nav.png', w: 640 },
	];

	for (const { name, w } of navWidths) {
		const meta = await sharp(master).metadata();
		const aspect = (meta.width ?? w) / (meta.height ?? 1);
		const height = Math.round(w / aspect);
		const png = await sharp(master)
			.resize(w, height, { fit: 'inside', withoutEnlargement: false })
			.png({ compressionLevel: 6 })
			.toBuffer();
		await writeFile(path.join(imagesDir, name), png);
		const base = name.replace('.png', '');
		await writeFile(
			path.join(imagesDir, `${base}.webp`),
			await sharp(png).webp({ quality: 98, nearLossless: true }).toBuffer(),
		);
	}

	const icon512 = await sharp(master).resize(512, 512, { fit: 'contain', background: { r: 13, g: 10, b: 20, alpha: 1 } }).png().toBuffer();
	await writeFile(path.join(imagesDir, 'dota2-cheats-logo.png'), icon512);
	await writeFile(path.join(imagesDir, 'dota2-cheats-logo.webp'), await sharp(icon512).webp({ quality: 90 }).toBuffer());
	await writeFile(path.join(imagesDir, 'dota2-site-icon-512.webp'), await sharp(icon512).webp({ quality: 90 }).toBuffer());
	await writeFile(path.join(imagesDir, 'dota2-site-icon-128.webp'), await sharp(icon512).resize(128, 128).webp({ quality: 90 }).toBuffer());

	const faviconSizes = [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'favicon.png', size: 192 },
	];
	for (const { name, size } of faviconSizes) {
		await writeFile(
			path.join(publicDir, name),
			await sharp(icon512).resize(size, size, { fit: 'contain', background: { r: 13, g: 10, b: 20, alpha: 1 } }).png().toBuffer(),
		);
	}
	await writeFile(path.join(publicDir, 'favicon.svg'), LOGO_SVG);
	console.log('  ✓ Dota 2 Cheats logo + favicons');
}

async function main() {
	await mkdir(imagesDir, { recursive: true });
	await mkdir(tmpDir, { recursive: true });

	console.log('Extracting Dota 2 frames from hero video…');
	const framePaths = [];
	for (let i = 0; i < SCREENSHOT_TIMES.length; i += 1) {
		const out = path.join(tmpDir, `frame-${i + 1}.png`);
		extractFrame(SCREENSHOT_TIMES[i], out);
		framePaths.push(out);
	}

	await writeHero(framePaths[0]);
	await writeLogo();

	for (let i = 0; i < framePaths.length; i += 1) {
		const id = String(i + 1).padStart(2, '0');
		await writeResponsive(`dota2-screenshot-${id}`, framePaths[i]);
	}

	const reviewsFrame = framePaths[3];
	await writeFile(path.join(imagesDir, 'reviews-banner.webp'), await sharp(reviewsFrame).webp({ quality: 82 }).toBuffer());
	for (const w of [480, 960]) {
		await writeFile(path.join(imagesDir, `reviews-banner-${w}w.webp`), await encodeWebp(reviewsFrame, w));
	}

	console.log('Done — Dota 2 screenshots and logo regenerated.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
