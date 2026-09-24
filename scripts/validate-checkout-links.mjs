#!/usr/bin/env node
/**
 * Ensures all purchase CTAs in built HTML point at brand.checkoutUrl (checkout).
 * Run after `npm run build`: node scripts/validate-checkout-links.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function readCheckoutUrl() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const m = src.match(/checkoutUrl:\s*'((?:\\'|[^'])*)'/);
	if (!m) throw new Error('brand.ts missing checkoutUrl');
	return m[1].replace(/\\'/g, "'");
}

const CHECKOUT_URL = readCheckoutUrl();
const BUY_SELECTORS = [
	'hero__buy',
	'site-tools__buy',
	'site-panel__buy',
	'home__price-card-cta',
	'price-card',
	'post__buy',
	'review-detail__buy',
	'reviews-index__buy',
	'faq-detail__buy',
	'plan__cta',
	'product__buy',
];

/** btn-buy on product pages and banners — exclude 404 home link */
const BTN_BUY_PATTERN =
	/<a[^>]*class="[^"]*\bbtn-buy\b[^"]*"[^>]*href="([^"]+)"[^>]*>/gi;

const CTA_PATTERN = new RegExp(
	`<a[^>]*class="[^"]*(?:${BUY_SELECTORS.join('|')})[^"]*"[^>]*href="([^"]+)"[^>]*>`,
	'gi',
);

const REQUIRED_REL_PARTS = ['sponsored', 'nofollow'];

function walkHtmlFiles(dir, files = []) {
	for (const entry of readdirSync(dir)) {
		const full = path.join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) walkHtmlFiles(full, files);
		else if (entry.endsWith('.html')) files.push(full);
	}
	return files;
}

function collectBuyAnchors(html, file) {
	const anchors = [];
	let m;
	while ((m = CTA_PATTERN.exec(html))) {
		anchors.push({ href: m[1], tag: m[0], file, kind: 'cta' });
	}
	while ((m = BTN_BUY_PATTERN.exec(html))) {
		if (m[1] === '/' || m[1].startsWith('/#')) continue;
		anchors.push({ href: m[1], tag: m[0], file, kind: 'btn-buy' });
	}
	return anchors;
}

function relMissingSponsored(tag) {
	const relMatch = tag.match(/\brel="([^"]*)"/i);
	if (!relMatch) return true;
	const parts = relMatch[1].toLowerCase().split(/\s+/);
	return REQUIRED_REL_PARTS.some((p) => !parts.includes(p));
}

const files = walkHtmlFiles(DIST);
const badUrl = [];
const badRel = [];

for (const file of files) {
	const html = readFileSync(file, 'utf8');
	for (const { href, tag } of collectBuyAnchors(html, file)) {
		if (href.startsWith('mailto:')) continue;
		if (href !== CHECKOUT_URL) {
			badUrl.push({ file: path.relative(ROOT, file), href });
		} else if (relMissingSponsored(tag)) {
			badRel.push({ file: path.relative(ROOT, file), href });
		}
	}
}

if (badUrl.length === 0 && badRel.length === 0) {
	console.log(`✓ All purchase CTAs point to ${CHECKOUT_URL} with sponsored/nofollow rel`);
	console.log(`  Checked ${files.length} HTML files`);
	process.exit(0);
}

if (badUrl.length > 0) {
	console.error('Purchase CTA checkout URL mismatches:\n');
	for (const { file, href } of badUrl.slice(0, 30)) {
		console.error(`  ${file}\n    href="${href}"\n    expected="${CHECKOUT_URL}"`);
	}
	if (badUrl.length > 30) console.error(`  …and ${badUrl.length - 30} more`);
}

if (badRel.length > 0) {
	console.error('\nPurchase CTA missing rel="sponsored nofollow":\n');
	for (const { file, href } of badRel.slice(0, 30)) {
		console.error(`  ${file}\n    href="${href}"`);
	}
	if (badRel.length > 30) console.error(`  …and ${badRel.length - 30} more`);
}
process.exit(1);
