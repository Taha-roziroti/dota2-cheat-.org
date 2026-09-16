/**
 * Regenerate Dota 2 screenshots from user-provided gameplay PNGs.
 * Hero stills come from Dota2-Hero.mp4; product/gallery shots from user assets.
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const imagesDir = path.join(ROOT, 'public/images');
const publicDir = path.join(ROOT, 'public');
const assetsDir = '/home/ubuntu/.cursor/projects/workspace/assets';
const archiveDir = path.join(ROOT, 'scripts/assets/dota2-screenshots');
const HERO_VIDEO = path.join(publicDir, 'videos/Dota2-Hero.mp4');

/** User-provided Dota 2 gameplay screenshots — order maps to dota2-screenshot-01 … 06. */
const USER_SCREENSHOTS = [
	'13be2916-8042-448d-8b88-a282c00c22b4.png',
	'f422ed6d-143e-434c-88e8-6c492f64d752.png',
	'198f0c2b-9d76-4ffb-bb9c-dfde83999fbf.png',
	'c43cb5d5-b6f2-4e58-8506-fb591f4a7b51.png',
	'1d49a213-56a6-4bdb-878e-655613144c66.png',
	'f7f8f852-cfcb-45c2-a5ff-84dc50e6b2c0.png',
];

const CONTENT_WIDTHS = [480, 640, 960, 1024, 1199];
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

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

async function extractHeroFrame(outPath) {
	execSync(
		`ffmpeg -y -ss 0.6 -i "${HERO_VIDEO}" -vframes 1 -update 1 "${outPath}"`,
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

	const icon512 = await sharp(master)
		.resize(512, 512, { fit: 'contain', background: { r: 13, g: 10, b: 20, alpha: 1 } })
		.png()
		.toBuffer();
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
			await sharp(icon512)
				.resize(size, size, { fit: 'contain', background: { r: 13, g: 10, b: 20, alpha: 1 } })
				.png()
				.toBuffer(),
		);
	}
	await writeFile(path.join(publicDir, 'favicon.svg'), LOGO_SVG);
	console.log('  ✓ Dota 2 Cheats logo + favicons');
}

async function main() {
	await mkdir(imagesDir, { recursive: true });
	await mkdir(archiveDir, { recursive: true });

	const sourcePaths = [];
	for (let i = 0; i < USER_SCREENSHOTS.length; i += 1) {
		const src = path.join(assetsDir, USER_SCREENSHOTS[i]);
		const saved = path.join(archiveDir, `source-${i + 1}.png`);
		await copyFile(src, saved);
		sourcePaths.push(saved);
		console.log(`✓ staged ${USER_SCREENSHOTS[i]}`);
	}

	const heroFrame = path.join(archiveDir, 'hero-frame.png');
	extractHeroFrame(heroFrame);
	await writeHero(heroFrame);
	await writeLogo();

	for (let i = 0; i < sourcePaths.length; i += 1) {
		const id = String(i + 1).padStart(2, '0');
		await writeResponsive(`dota2-screenshot-${id}`, sourcePaths[i]);
	}

	const reviewsFrame = sourcePaths[4];
	await writeFile(path.join(imagesDir, 'reviews-banner.webp'), await sharp(reviewsFrame).webp({ quality: 82 }).toBuffer());
	for (const w of [480, 960]) {
		await writeFile(path.join(imagesDir, `reviews-banner-${w}w.webp`), await encodeWebp(reviewsFrame, w));
	}

	console.log(`Done — ${USER_SCREENSHOTS.length} user gameplay screenshots imported.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
