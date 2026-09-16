#!/usr/bin/env node
/** Headless test: verify key components exist for all locales using correct localized paths. */
import { LOCALES } from './i18n-data/constants.mjs';

// Dynamic import of routing - use built dist preview
const BASE = process.env.BASE_URL || 'http://localhost:4321';

// Localized path slugs from routing.ts (pageId -> locale -> slug segment)
const SLUGS = {
	features: { en: 'features', es: 'funciones', fr: 'fonctions', de: 'features', pt: 'recursos', it: 'funzioni', nl: 'functies', pl: 'funkcje', ru: 'funkcii', tr: 'ozellikler', ar: 'dota2-cheats-features', ja: 'dota2-cheats-features', ko: 'dota2-cheats-features', zh: 'dota2-cheats-features', hi: 'dota2-cheats-features', id: 'dota2-cheats-features', th: 'dota2-cheats-features', vi: 'dota2-cheats-features', uk: 'funktsiyi', cs: 'funkce', ro: 'functii', sv: 'funktioner' },
	pricing: { en: 'pricing', es: 'precios', fr: 'tarifs', de: 'preise', pt: 'precos', it: 'prezzi', nl: 'prijzen', pl: 'cennik', ru: 'tseny', tr: 'fiyatlar', ar: 'dota2-cheats-pricing', ja: 'dota2-cheats-pricing', ko: 'dota2-cheats-pricing', zh: 'dota2-cheats-pricing', hi: 'dota2-cheats-pricing', id: 'dota2-cheats-pricing', th: 'dota2-cheats-pricing', vi: 'dota2-cheats-pricing', uk: 'tsiny', cs: 'ceny', ro: 'preturi', sv: 'priser' },
	faq: { en: 'faq', es: 'faq', fr: 'faq', de: 'faq', pt: 'faq', it: 'faq', nl: 'faq', pl: 'faq', ru: 'faq', tr: 'sss', ar: 'faq', ja: 'faq', ko: 'faq', zh: 'faq', hi: 'faq', id: 'faq', th: 'faq', vi: 'faq', uk: 'faq', cs: 'faq', ro: 'faq', sv: 'faq' },
	hacks: { en: 'dota2-cheats', es: 'hacks-trucos-dota2', fr: 'hacks-triche-dota2', de: 'dota2-cheats', pt: 'cheats-dota2', it: 'hacks-trucchi-dota2', nl: 'dota2-cheats', pl: 'hacks-cheatow-dota2', ru: 'dota2-cheats', tr: 'dota2-hile-hacks', ar: 'dota2-cheats', ja: 'dota2-cheats', ko: 'dota2-cheats', zh: 'dota2-cheats', hi: 'dota2-cheats', id: 'dota2-cheats', th: 'dota2-cheats', vi: 'dota2-cheats', uk: 'dota2-cheats', cs: 'dota2-cheats', ro: 'cheats-dota2', sv: 'dota2-cheats' },
};

function pagePath(locale, pageId) {
	const slug = SLUGS[pageId]?.[locale] ?? pageId;
	if (locale === 'en') return `/${slug}/`;
	return `/${locale}/${slug}/`;
}

async function fetchHtml(path) {
	const url = `${BASE}${path}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url} → ${res.status}`);
	return res.text();
}

let failed = 0;

for (const locale of LOCALES) {
	// Home
	try {
		const homePath = locale === 'en' ? '/' : `/${locale}/`;
		const html = await fetchHtml(homePath);
		const sections = (html.match(/class="card-panel/g) || []).length;
		if (sections < 1) { console.error(`FAIL ${homePath}: few sections`); failed++; }
		if (!html.includes('price-card') && !html.includes('price-grid')) { console.error(`FAIL ${homePath}: no pricing`); failed++; }
	} catch (e) { console.error(`FAIL ${locale} home: ${e.message}`); failed++; }

	for (const pageId of ['features', 'pricing', 'faq', 'hacks']) {
		const path = pagePath(locale, pageId);
		try {
			const html = await fetchHtml(path);
			const sections = (html.match(/class="card-panel/g) || []).length;
			const enSections = pageId === 'features' ? 5 : pageId === 'hacks' ? 5 : pageId === 'pricing' ? 3 : pageId === 'faq' ? 3 : 2;
			if (sections < enSections) {
				console.error(`FAIL ${path}: ${sections} sections (expected >=${enSections})`);
				failed++;
			}
			if (pageId === 'pricing' && !html.includes('price-card')) {
				console.error(`FAIL ${path}: missing price-card`);
				failed++;
			}
			if (pageId === 'faq' && !html.includes('faq-index')) {
				console.error(`FAIL ${path}: missing faq-index`);
				failed++;
			}
		} catch (e) {
			console.error(`FAIL ${path}: ${e.message}`);
			failed++;
		}
	}
}

if (failed) {
	console.error(`\n${failed} test(s) failed`);
	process.exit(1);
}
console.log(`\nAll ${LOCALES.length} locales passed section/component checks on ${BASE}`);
