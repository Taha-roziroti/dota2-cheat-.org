/**
 * Import Warzone hero, favicon, and gameplay screenshots from user assets.
 * Writes /images/warzone-screenshot-01.webp … 08.webp plus responsive variants.
 */
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const ASSETS_DIR = '/home/ubuntu/.cursor/projects/workspace/assets';
const imagesDir = path.join(ROOT, 'public/images');

/** Hero image (helicopter POV) */
const HERO_SOURCE = path.join(ASSETS_DIR, 'ddd5f856-329a-47c9-ba47-f8ab2f63fec8.png');

/** 8 gameplay screenshots in order */
const SCREENSHOT_SOURCES = [
	path.join(ASSETS_DIR, '291e026c-07bb-4e4a-8d62-c8c7a5b14965.png'),
	path.join(ASSETS_DIR, 'c5bc12a4-9b23-4840-8448-df2ee6f7c971.png'),
	path.join(ASSETS_DIR, 'bf7d564f-2f04-4bf0-9f10-db7f1fa87582.png'),
	path.join(ASSETS_DIR, 'd84e536f-9f6f-436c-bda8-6678d53a7f8e.png'),
	path.join(ASSETS_DIR, '8596860c-50cf-4fa0-a494-0bde8111ef64.png'),
	path.join(ASSETS_DIR, '056e390b-6eef-4749-9205-83d66710a362.png'),
	path.join(ASSETS_DIR, '05a7f39c-e076-43b9-8aac-05851b338275.png'),
	path.join(ASSETS_DIR, '9266e795-ff5a-49a0-a618-7515d46730cd.webp'),
];

/** Favicon / navbar logo — Call of Duty wordmark */
const FAVICON_SOURCE = path.join(ASSETS_DIR, '32cbbd34-30a2-4e3e-9479-3b9c302e1385.webp');

const LOGO_BG = { r: 13, g: 13, b: 13, alpha: 1 }; // #0D0D0D — matches Warzone theme

const CONTENT_WIDTHS = [480, 640, 960, 1024, 1199];
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

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
	const fullPath = path.join(imagesDir, `${baseName}.webp`);
	const fullBuf = await sharp(input).webp({ quality: 85, effort: 6 }).toBuffer();
	await writeFile(fullPath, fullBuf);
	for (const w of CONTENT_WIDTHS) {
		const buf = await encodeWebp(input, w);
		await writeFile(path.join(imagesDir, `${baseName}-${w}w.webp`), buf);
	}
	console.log(`  ✓ ${baseName}.webp (+ responsive)`);
}

async function writeHero() {
	const heroBase = 'warzone-cheats-hero';
	await writeResponsive(heroBase, HERO_SOURCE);
	await writeResponsive('warzone-hero-poster', HERO_SOURCE);
	// Full-res hero for 4K display
	const hero4k = await sharp(HERO_SOURCE)
		.resize(3840, null, { fit: 'inside', withoutEnlargement: true })
		.webp({ quality: 88, effort: 6 })
		.toBuffer();
	await writeFile(path.join(imagesDir, 'warzone-cheats-hero-4k.webp'), hero4k);
}

async function writeScreenshots() {
	for (let i = 0; i < SCREENSHOT_SOURCES.length; i += 1) {
		const id = String(i + 1).padStart(2, '0');
		await writeResponsive(`warzone-screenshot-${id}`, SCREENSHOT_SOURCES[i]);
	}
}

async function whiteLogoOnDark(size) {
	const inner = Math.round(size * 0.82);
	const mark = await sharp(FAVICON_SOURCE)
		.ensureAlpha()
		.resize(inner, inner, { fit: 'inside', withoutEnlargement: false })
		.negate({ alpha: false })
		.toBuffer();
	return sharp({
		create: { width: size, height: size, channels: 4, background: LOGO_BG },
	})
		.composite([{ input: mark, gravity: 'center' }])
		.png()
		.toBuffer();
}

async function navLogoWebp(maxWidth, maxHeight) {
	return sharp(FAVICON_SOURCE)
		.ensureAlpha()
		.resize(maxWidth, maxHeight, { fit: 'inside', withoutEnlargement: false })
		.negate({ alpha: false })
		.webp({ quality: 92, effort: 6 })
		.toBuffer();
}

async function writeFavicon() {
	const navVariants = [
		{ name: 'warzone-cheats-logo-nav-280w.webp', w: 280, h: 56 },
		{ name: 'warzone-cheats-logo-nav-360w.webp', w: 360, h: 72 },
		{ name: 'warzone-cheats-logo-nav.webp', w: 440, h: 88 },
	];
	for (const { name, w, h } of navVariants) {
		await writeFile(path.join(imagesDir, name), await navLogoWebp(w, h));
	}

	const sizes = [
		{ name: 'warzone-site-icon-128.webp', size: 128 },
		{ name: 'warzone-site-icon-512.webp', size: 512 },
		{ name: 'warzone-cheats-logo.webp', size: 512 },
		{ name: 'warzone-cheats-logo-mark.webp', size: 256 },
	];
	for (const { name, size } of sizes) {
		const png = await whiteLogoOnDark(size);
		const buf = await sharp(png).webp({ quality: 90 }).toBuffer();
		await writeFile(path.join(imagesDir, name), buf);
	}
	const png512 = await whiteLogoOnDark(512);
	await writeFile(path.join(imagesDir, 'warzone-cheats-logo.png'), png512);

	const publicDir = path.join(ROOT, 'public');
	const faviconSizes = [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'favicon.png', size: 192 },
	];
	for (const { name, size } of faviconSizes) {
		await writeFile(path.join(publicDir, name), await whiteLogoOnDark(size));
	}
	await writeFile(path.join(publicDir, 'favicon.ico'), await sharp(await whiteLogoOnDark(32)).png().toBuffer());

	const svgBase64 = png512.toString('base64');
	const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect width="512" height="512" fill="#0d0d0d"/><image width="512" height="512" href="data:image/png;base64,${svgBase64}"/></svg>`;
	await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg);
	console.log('  ✓ favicon + logo assets (Call of Duty wordmark + nav logo)');
}

async function main() {
	await mkdir(imagesDir, { recursive: true });
	console.log('Importing Warzone assets…');
	await writeHero();
	await writeScreenshots();
	await writeFavicon();
	console.log('Done.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
