#!/usr/bin/env node
/** Post-process all locale translation.json after generate:i18n */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	BLOG_CATEGORIES,
	COMMON_UI,
	HERO_CHIPS,
	NAV_ARIA,
	NOT_FOUND_UI,
	REVIEWS_PAGE_UI,
	REVIEWS_UI,
} from './i18n-data/ui-complete.mjs';
import { REVIEW_ITEMS_I18N } from './i18n-data/reviews-i18n.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES_DIR = path.join(ROOT, 'public/locales');

const FORUMS = {
	en: 'Forums', es: 'Foros', fr: 'Forums', de: 'Foren', pt: 'Fóruns', it: 'Forum',
	nl: 'Forums', pl: 'Fora', ru: 'Форумы', tr: 'Forumlar', ar: 'منتديات', ja: 'フォーラム',
	ko: '포럼', zh: '论坛', hi: 'फ़ोरम', id: 'Forum', th: 'ฟอรั่ม', vi: 'Diễn đàn',
	uk: 'Форуми', cs: 'Fóra', ro: 'Forumuri', sv: 'Forum',
};

const CHIP_AIM = {
	en: 'Skillshot assist', es: 'Asistencia de skillshot', fr: 'Assistance skillshot',
	de: 'Skillshot-Assist', pt: 'Assistência de skillshot', it: 'Assist skillshot',
	nl: 'Skillshot-assist', pl: 'Asysta skillshot', ru: 'Помощь в скиллшотах',
	tr: 'Skillshot yardımı', ar: 'مساعدة المهارة', ja: 'スキルショット支援',
	ko: '스킬샷 어시스트', zh: '技能辅助', hi: 'स्किलशॉट सहायता',
	id: 'Bantuan skillshot', th: 'ช่วยสกิลช็อต', vi: 'Hỗ trợ skillshot',
	uk: 'Допомога скиллшоту', cs: 'Skillshot asistence', ro: 'Asistență skillshot',
	sv: 'Skillshot-assistans',
};

const PATCH_STATUS = {
	es: 'estado del parche', fr: 'statut du patch', de: 'Patch-Status', pt: 'status do patch',
	it: 'stato patch', nl: 'patchstatus', pl: 'status patcha', ru: 'статус патча',
	tr: 'yama durumu', ar: 'حالة التحديث', ja: 'パッチ状況', ko: '패치 상태',
	zh: '补丁状态', hi: 'पैच स्थिति', id: 'status patch', th: 'สถานะแพตช์',
	vi: 'trạng thái bản vá', uk: 'статус патчу', cs: 'stav patchi', ro: 'status patch',
	sv: 'patchstatus',
};

const WARZONE_FIXES = [
	[/operators/gi, 'heroes'],
	[/weapon drops/gi, 'wards and runes'],
	[/buy stations/gi, 'shops'],
	[/Resurgence/gi, 'ranked'],
	[/Activision/gi, 'Valve'],
	[/agents/gi, 'heroes'],
	[/soft aim/gi, 'skillshot assist'],
	[/Soft aim/gi, CHIP_AIM.en],
	[/reliable dota 2 cheats/gi, 'dota 2 cheats'],
	[/an reliable /gi, 'a '],
	[/reliable cheats/gi, 'dota 2 cheats'],
	[/reliable status/gi, 'patch status'],
	[/Reliable status/gi, 'Patch status'],
	[/estado reliable/gi, 'estado del parche'],
	[/ereliable/g, 'es'],
	[/reliableon/g, 'son'],
	[/reliablee/g, 'se'],
	[/Cheatreliable/g, 'Cheats'],
	[/trucoreliable/g, 'trucos'],
	[/indetectable[s]?/gi, ''],
	[/indétectable[s]?/gi, ''],
	[/undetected/gi, ''],
	[/checkout via checkout/gi, ''],
	[/— secure checkout\./gi, '.'],
	[/Blog Dota/g, 'Forums Dota'],
	[/Guías globales/g, 'Foros de la comunidad'],
	[/Guides mondiaux/g, 'Forums communautaires'],
	[/eyebrow": "Guides"/g, 'eyebrow": "Explore"'],
	[/ranked matches rounds/gi, 'ranked matches'],
	[/ranked matches matches/gi, 'ranked matches'],
];

function cleanString(s, loc) {
	if (typeof s !== 'string') return s;
	let out = s;
	for (const [re, rep] of WARZONE_FIXES) {
		out = out.replace(re, rep);
	}
	out = out
		.replace(/Soft aim/gi, CHIP_AIM[loc] ?? CHIP_AIM.en)
		.replace(/Reliable status/gi, PATCH_STATUS[loc] ?? 'patch status')
		.replace(/\s{2,}/g, ' ')
		.trim();
	return out;
}

function walkStrings(obj, loc) {
	if (typeof obj === 'string') return cleanString(obj, loc);
	if (Array.isArray(obj)) return obj.map((v) => walkStrings(v, loc));
	if (obj && typeof obj === 'object') {
		const out = {};
		for (const [k, v] of Object.entries(obj)) {
			if (k === 'guides') continue;
			out[k] = walkStrings(v, loc);
		}
		return out;
	}
	return obj;
}

function buildReviewItems(loc) {
	const items = {};
	for (const [slug, locales] of Object.entries(REVIEW_ITEMS_I18N)) {
		items[slug] = locales[loc] ?? locales.en;
	}
	return items;
}

async function main() {
	for (const loc of await readdir(LOCALES_DIR)) {
		const file = path.join(LOCALES_DIR, loc, 'translation.json');
		let t;
		try {
			t = JSON.parse(await readFile(file, 'utf8'));
		} catch {
			continue;
		}
		t = walkStrings(t, loc);
		t.common = { ...t.common, ...(COMMON_UI[loc] ?? COMMON_UI.en) };
		t.common.forums = FORUMS[loc] ?? FORUMS.en;
		t.common.blog = FORUMS[loc] ?? FORUMS.en;
		t.nav = { ...t.nav, ...(NAV_ARIA[loc] ?? NAV_ARIA.en) };
		t.reviews = {
			...t.reviews,
			...(REVIEWS_UI[loc] ?? REVIEWS_UI.en),
			...(REVIEWS_PAGE_UI[loc] ?? REVIEWS_PAGE_UI.en),
			prev: (REVIEWS_UI[loc] ?? REVIEWS_UI.en).prev ?? 'Previous review',
			next: (REVIEWS_UI[loc] ?? REVIEWS_UI.en).next ?? 'Next review',
			items: buildReviewItems(loc),
		};
		t.notFound = NOT_FOUND_UI[loc] ?? NOT_FOUND_UI.en;
		t.hero = { ...t.hero, ...(HERO_CHIPS[loc] ?? HERO_CHIPS.en) };
		t.blog = { ...t.blog, categories: BLOG_CATEGORIES[loc] ?? BLOG_CATEGORIES.en };
		delete t.common.guides;
		delete t.guides;
		if (t.categoryRow) {
			t.categoryRow.forums = FORUMS[loc] ?? FORUMS.en;
			t.categoryRow.blog = FORUMS[loc] ?? FORUMS.en;
			delete t.categoryRow.reliable;
		}
		if (t.hero) t.hero.chipAim = CHIP_AIM[loc] ?? CHIP_AIM.en;
		if (t.deals) t.deals.featAim = `${CHIP_AIM[loc] ?? CHIP_AIM.en} & hotkeys`.replace(' & hotkeys', loc === 'en' ? ' & hotkeys' : '');
		if (t.home) {
			t.home.aboutReliable = PATCH_STATUS[loc] ?? 'patch status';
			if (loc === 'es') t.home.aboutAimbot = 'controles de asistencia';
		}
		if (t.homeSeo) {
			t.homeSeo.linkBlog = FORUMS[loc] ?? FORUMS.en;
			t.homeSeo.linkPatchStatus = PATCH_STATUS[loc] ?? 'Patch status';
			delete t.homeSeo.linkReliable;
			if (loc === 'en') t.homeSeo.eyebrow = 'Explore';
		}
		if (t.blog) {
			t.blog.blogH1 = loc === 'en' ? 'Community Forums' : (t.blog.blogH1?.includes('Blog') ? FORUMS[loc] : t.blog.blogH1);
		}
		if (t.internalLinks) {
			t.internalLinks.blog = loc === 'en' ? 'Dota 2 cheats forums' : `${FORUMS[loc]} Dota 2`;
			delete t.internalLinks.reliable;
		}
		if (t.product) t.product.statusBadge = loc === 'es' ? 'Trucos Dota 2 para PC' : (t.product.statusBadge?.replace(/indetectable|reliable/gi, '').trim() || 'Dota 2 cheats PC');
		await writeFile(file, JSON.stringify(t, null, 2) + '\n');
		console.log('✓', loc);
	}
}

main();
