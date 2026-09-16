#!/usr/bin/env node
/**
 * Generate site favicons from the official Dota 2 logo mark (red icon only).
 * Usage: node scripts/import-dota2-favicon.mjs [path-to-source-image]
 */
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const publicDir = path.join(root, 'public');
const assetsDir = path.join(root, 'scripts', 'assets');
const defaultSource = path.join(
	assetsDir,
	'dota2-official-favicon.jpg',
);

const sourcePath = process.argv[2] ?? defaultSource;
const FAVICON_BG = '#0d0a14';

function isBrightRed(r, g, b) {
	return r > 180 && g < 100 && b < 100;
}

async function extractIconMark() {
	const { data, info } = await sharp(sourcePath).raw().toBuffer({ resolveWithObject: true });

	let minX = info.width;
	let minY = info.height;
	let maxX = 0;
	let maxY = 0;

	for (let y = 0; y < info.height; y++) {
		for (let x = 0; x < info.width; x++) {
			const i = (y * info.width + x) * 3;
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			if (isBrightRed(r, g, b)) {
				minX = Math.min(minX, x);
				minY = Math.min(minY, y);
				maxX = Math.max(maxX, x);
				maxY = Math.max(maxY, y);
			}
		}
	}

	const pad = 4;
	const left = Math.max(0, minX - pad);
	const top = Math.max(0, minY - pad);
	const width = Math.min(info.width - left, maxX - minX + 1 + pad * 2);
	const height = Math.min(info.height - top, maxY - minY + 1 + pad * 2);

	return sharp(sourcePath)
		.extract({ left, top, width, height })
		.resize(512, 512, {
			fit: 'contain',
			background: FAVICON_BG,
		})
		.png();
}

async function writeSized(pipeline, outPath, size) {
	await writeFile(outPath, await pipeline.clone().resize(size, size).png().toBuffer());
}

async function main() {
	await mkdir(assetsDir, { recursive: true });

	const icon512 = await extractIconMark();
	const png512 = await icon512.png().toBuffer();

	const faviconSizes = [
		['favicon-16x16.png', 16],
		['favicon-32x32.png', 32],
		['apple-touch-icon.png', 180],
		['favicon.png', 192],
	];

	for (const [name, size] of faviconSizes) {
		await writeSized(sharp(png512), path.join(publicDir, name), size);
	}

	await writeFile(path.join(publicDir, 'favicon.ico'), await sharp(png512).resize(32, 32).png().toBuffer());

	const svgBase64 = png512.toString('base64');
	const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect width="512" height="512" fill="${FAVICON_BG}"/><image width="512" height="512" href="data:image/png;base64,${svgBase64}"/></svg>`;
	await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg);

	if (sourcePath !== defaultSource) {
		await copyFile(sourcePath, defaultSource);
	}

	console.log('✓ Dota 2 favicons generated from', sourcePath);
}

await main();
