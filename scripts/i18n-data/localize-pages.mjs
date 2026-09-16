/**
 * Structure-preserving page localization for all non-English locales.
 * Uses canonical EN pages as the structural source of truth.
 */
import { clampTitle, clampDesc, stripcheckoutFromMeta, HERO_IMAGES } from './constants.mjs';
import { phrases } from './phrases.mjs';
import { FOCUS_I18N } from './focus-i18n.mjs';
import { PAGE_META_HOME, SUFFIX_I18N, TOPIC_NAMES, CTA2_HREF, buildHome, buildLegal, PAGE_META_TAILS } from './pages-i18n.mjs';
import { getCanonicalEnPages } from './canonical-en-pages.mjs';
import { SIMPLE_PAGE_IDS } from './simple-pages-en.mjs';
import { buildSimplePagesForLocale } from './simple-pages-i18n.mjs';
import { localizeHtmlLinks, localizeLinkListItem, localizeLinkParagraph } from './link-labels.mjs';
import { PAGE_IMAGE_ALTS } from './image-alts.mjs';

const PARA_GENERATORS = [
	(p, focus) => p.s1(focus),
	(p) => p.s2(),
	(p) => p.s3(),
	(p) => p.legal(),
];

/** Localize one section preserving paragraph and list counts. */
function localizeSection(enSection, locale, pageKey, sectionIndex) {
	const p = phrases[locale];
	const focus = FOCUS_I18N[locale]?.[pageKey] ?? pageKey;

	const paragraphs = enSection.paragraphs.map((enPara, pi) => {
		const gen = PARA_GENERATORS[pi % PARA_GENERATORS.length];
		const text = gen(p, focus);
		if (enPara.includes('<a ')) {
			return localizeLinkParagraph(enPara, locale, text);
		}
		return text;
	});

	const list = enSection.list?.map((item) => {
		if (item.includes('<a ')) return localizeLinkListItem(item, locale);
		return item;
	});

	const topicName = TOPIC_NAMES[pageKey]?.[locale] ?? TOPIC_NAMES[pageKey]?.en ?? pageKey;
	const sectionSuffix =
		SECTION_SUFFIX_I18N[locale]?.[sectionIndex % 4] ?? SECTION_SUFFIX_I18N.en[sectionIndex % 4];
	const h2Map = RICH_SECTION_H2[locale]?.[pageKey]?.[sectionIndex];

	return {
		h2: h2Map ?? `${topicName} — ${sectionSuffix}`,
		paragraphs,
		...(list ? { list } : {}),
	};
}

/** Localize rich page meta fields. */
function localizeMeta(enPage, locale, pageKey) {
	const p = phrases[locale];
	const home = PAGE_META_HOME[locale];
	const meta = PAGE_META_TAILS[pageKey] ?? { suffix: 'Dota 2 Cheats', focus: pageKey };
	const suffix = SUFFIX_I18N[locale]?.[pageKey] ?? meta.suffix;
	const focus = FOCUS_I18N[locale]?.[pageKey] ?? meta.focus;
	const topicName = TOPIC_NAMES[pageKey]?.[locale] ?? TOPIC_NAMES[pageKey]?.en ?? pageKey;

	return {
		title: clampTitle(stripcheckoutFromMeta(`${topicName} | ${suffix}`)),
		description: clampDesc(
			stripcheckoutFromMeta(
				`${topicName} for Dota 2 ranked and casual matches on Windows PC — ${focus}. ${p.delivery}. ${p.reliable}. Official dota 2 cheats at dota2cheat.com.`,
			),
		),
		h1: `${topicName} — ${suffix}`,
		intro: p.s1(`${topicName}. ${focus}.`),
		imageAlt: PAGE_IMAGE_ALTS[pageKey] || `${topicName} — Dota 2 Cheats`,
		galleryTitle: topicName,
		ctaPrimary: p.buy,
		ctaSecondary: home?.cta2 ?? p.buy,
		ctaSecondaryHref: CTA2_HREF[pageKey] ?? '/',
	};
}

/** Localize a rich (non-simple) page from canonical EN. */
function localizeRichPage(enPage, locale, pageKey) {
	const meta = localizeMeta(enPage, locale, pageKey);
	const sections = enPage.sections.map((sec, i) => {
		const localized = localizeSection(sec, locale, pageKey, i);
		// Use EN h2 translated via suffix/focus where possible
		const h2Map = RICH_SECTION_H2[locale]?.[pageKey]?.[i];
		if (h2Map) localized.h2 = h2Map;
		return localized;
	});

	return {
		...enPage,
		...meta,
		h1: locale === 'en' && enPage.h1 ? enPage.h1 : meta.h1,
		title: locale === 'en' && enPage.title ? enPage.title : meta.title,
		description: locale === 'en' && enPage.description ? enPage.description : meta.description,
		heroImage: HERO_IMAGES[pageKey],
		sections,
	};
}

const SECTION_SUFFIX_I18N = {
	en: ['Overview', 'Features', 'Status & updates', 'Getting started'],
	es: ['Resumen', 'Funciones', 'Estado y actualizaciones', 'Primeros pasos'],
	fr: ['Aperçu', 'Fonctions', 'Statut et mises à jour', 'Premiers pas'],
	de: ['Überblick', 'Features', 'Status & Updates', 'Erste Schritte'],
	pt: ['Visão geral', 'Recursos', 'Status e atualizações', 'Primeiros passos'],
	it: ['Panoramica', 'Funzioni', 'Stato e aggiornamenti', 'Primi passi'],
	nl: ['Overzicht', 'Functies', 'Status en updates', 'Aan de slag'],
	pl: ['Przegląd', 'Funkcje', 'Status i aktualizacje', 'Pierwsze kroki'],
	ru: ['Обзор', 'Функции', 'Статус и обновления', 'С чего начать'],
	tr: ['Genel bakış', 'Özellikler', 'Durum ve güncellemeler', 'İlk adımlar'],
	ar: ['نظرة عامة', 'الميزات', 'الحالة والتحديثات', 'البدء'],
	ja: ['概要', '機能', 'ステータスと更新', 'はじめに'],
	ko: ['개요', '기능', '상태 및 업데이트', '시작하기'],
	zh: ['概览', '功能', '状态与更新', '入门'],
	hi: ['अवलोकन', 'फ़ीचर', 'स्थिति और अपडेट', 'शुरुआत'],
	id: ['Ringkasan', 'Fitur', 'Status & pembaruan', 'Memulai'],
	th: ['ภาพรวม', 'ฟีเจอร์', 'สถานะและอัปเดต', 'เริ่มต้น'],
	vi: ['Tổng quan', 'Tính năng', 'Trạng thái & cập nhật', 'Bắt đầu'],
	uk: ['Огляд', 'Функції', 'Статус і оновлення', 'Початок'],
	cs: ['Přehled', 'Funkce', 'Stav a aktualizace', 'Začínáme'],
	ro: ['Prezentare', 'Funcții', 'Status și actualizări', 'Primii pași'],
	sv: ['Översikt', 'Funktioner', 'Status och uppdateringar', 'Kom igång'],
};

/** Optional native h2 overrides for rich pages. */
const RICH_SECTION_H2 = {
	es: {
		'dota2-esp': ['Qué resuelve el ESP en matches', 'Categorías ESP jugador, apex y wards and runes', 'ESP con mantenimiento EAC', 'ESP — siguientes pasos'],
		hacks: ['¿Qué son los trucos de Dota 2?', 'Qué incluye Dota 2 Cheats', 'Estado y VAC', 'Primeros pasos'],
	},
	fr: {
		'dota2-esp': ['Ce que l\'ESP résout en match', 'Catégories ESP joueur, apex et wards and runes', 'ESP avec maintenance EAC', 'ESP — prochaines étapes'],
		hacks: ['Que sont les triches Dota 2 ?', 'Ce que Dota 2 Cheats inclut', 'Statut et VAC', 'Premiers pas'],
	},
	de: {
		'dota2-esp': ['Was ESP in matches löst', 'Spieler-, Apex- und wards and runes-ESP-Kategorien', 'ESP mit EAC-Wartung', 'ESP — nächste Schritte'],
		hacks: ['Was sind Dota 2 Cheats?', 'Was Dota 2 Cheats enthält', 'Patch-Status und VAC', 'Erste Schritte'],
	},
};

/** Build all pages for a locale using canonical EN structure. */
export function buildLocalizedPages(locale) {
	const canonical = getCanonicalEnPages();
	const simplePages = buildSimplePagesForLocale(locale);
	const pages = { home: buildHome(locale) };

	for (const [pageKey, enPage] of Object.entries(canonical)) {
		if (pageKey === 'home') continue;
		if (['privacy', 'refund', 'terms'].includes(pageKey)) {
			pages[pageKey] = buildLegal(locale, pageKey, pageKey);
			continue;
		}
		if (SIMPLE_PAGE_IDS.includes(pageKey)) {
			const simple = simplePages[pageKey];
			pages[pageKey] = {
				...enPage,
				...simple,
				heroImage: enPage.heroImage,
				imageAlt: enPage.imageAlt,
			};
		} else {
			pages[pageKey] = localizeRichPage(enPage, locale, pageKey);
		}
	}

	return pages;
}

/** Validate structural parity between EN and localized pages. */
export function validateStructure(locale, pages) {
	const canonical = getCanonicalEnPages();
	const errors = [];
	for (const [pageKey, enPage] of Object.entries(canonical)) {
		if (['privacy', 'refund', 'terms'].includes(pageKey)) continue;
		const locPage = pages[pageKey];
		if (!locPage) {
			errors.push(`${locale}/${pageKey}: missing page`);
			continue;
		}
		if (enPage.sections.length !== locPage.sections.length) {
			errors.push(`${locale}/${pageKey}: section count ${locPage.sections.length} vs EN ${enPage.sections.length}`);
		}
		enPage.sections.forEach((enSec, i) => {
			const locSec = locPage.sections[i];
			if (!locSec) return;
			if ((enSec.list?.length ?? 0) !== (locSec.list?.length ?? 0)) {
				errors.push(`${locale}/${pageKey}[${i}]: list count mismatch`);
			}
		});
	}
	return errors;
}
