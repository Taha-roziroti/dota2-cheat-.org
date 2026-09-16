#!/usr/bin/env node
/**
 * Patch i18n source files for Dota 2 forums + remove English/spam artifacts.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const GLOBAL_REPLACEMENTS = [
	[/indetectable/gi, ''],
	[/indétectable/gi, ''],
	[/indetectável/gi, ''],
	[/indetectable/gi, ''],
	[/unentdeckte/gi, ''],
	[/undetected/gi, ''],
	[/reliable dota 2 cheats/gi, 'dota 2 cheats'],
	[/reliable Dota 2 Cheats/gi, 'Dota 2 Cheats'],
	[/reliable ESP/gi, 'ESP'],
	[/Reliable ESP/gi, 'ESP'],
	[/reliable status/gi, 'patch status'],
	[/Reliable status/gi, 'Patch status'],
	[/Reliable-Status/gi, 'Patch-Status'],
	[/reliable-status/gi, 'patch-status'],
	[/an reliable/gi, 'a'],
	[/Resurgence/gi, 'ranked'],
	[/ranked matches rounds/gi, 'ranked matches'],
	[/ranked matches matches/gi, 'ranked matches'],
	[/Activision/gi, 'Valve'],
	[/callofduty\.com/gi, 'dota2.com'],
	[/Call of Duty/gi, 'Dota 2'],
	[/Dota 2 Intel blog/gi, 'Dota 2 cheats forums'],
	[/Compare plans at dota2cheat\.com/gi, ''],
	[/checkout via checkout/gi, 'secure checkout'],
	[/— checkout\./gi, '.'],
	[/Soft aim/gi, 'Skillshot assist'],
	[/soft aim/gi, 'skillshot assist'],
	[/aboutReliable/g, 'aboutStatus'],
	[/linkReliable/g, 'linkPatchStatus'],
	[/categoryRow\.reliable/g, 'categoryRow.forums'],
	[/"guides":/g, '"forumsLegacy":'],
	[/Guides &/g, 'Forums &'],
	[/guides &/g, 'forums &'],
	[/Blog Dota/g, 'Foros Dota'],
	[/Dota 2 Cheats Blog/g, 'Dota 2 Cheats Forums'],
	[/blog at dota2cheat/g, 'forums at dota2cheat'],
	[/Guides hub/g, 'Forums'],
	[/guides hub/g, 'forums'],
];

async function patchFile(file) {
	let c = await readFile(file, 'utf8');
	const o = c;
	for (const [re, rep] of GLOBAL_REPLACEMENTS) {
		c = c.replace(re, rep);
	}
	if (c !== o) await writeFile(file, c);
}

async function walk(dir, files = []) {
	for (const e of await readdir(dir, { withFileTypes: true })) {
		if (e.name === 'node_modules' || e.name === '.git') continue;
		const p = path.join(dir, e.name);
		if (e.isDirectory()) await walk(p, files);
		else if (/\.(mjs|ts|json)$/.test(e.name)) files.push(p);
	}
	return files;
}

const FORUM_UI = {
	en: { commentsTitle: 'Replies', blogH1: 'Community Forums', readMore: 'Read thread', relatedPosts: 'Related threads', allPosts: 'All forum threads' },
	es: { commentsTitle: 'Respuestas', blogH1: 'Foros de la comunidad', readMore: 'Leer hilo', relatedPosts: 'Hilos relacionados', allPosts: 'Todos los hilos', blogTitle: 'Foros Dota 2 Cheats | Configuración y funciones', blogDescription: 'Foros de trucos Dota 2 con guías de instalación, ajustes ESP, asistencia de skillshot y notas VAC para PC.', blogIntro: 'Guías de configuración, desglose de funciones y hilos del día del parche de jugadores con trucos Dota 2 en PC.' },
	fr: { commentsTitle: 'Réponses', blogH1: 'Forums communautaires', readMore: 'Lire le fil', relatedPosts: 'Fils associés', allPosts: 'Tous les fils', blogTitle: 'Forums Dota 2 Cheats | Configuration et fonctions', blogDescription: 'Forums de triches Dota 2 avec guides d\'installation, réglages ESP, assistance skillshot et notes VAC pour PC.', blogIntro: 'Guides de configuration, liste des fonctions et fils du jour de patch par des joueurs utilisant des triches Dota 2 sur PC.' },
	de: { commentsTitle: 'Antworten', blogH1: 'Community-Foren', readMore: 'Thread lesen', relatedPosts: 'Ähnliche Threads', allPosts: 'Alle Forum-Threads', blogTitle: 'Dota 2 Cheats Foren | Setup & Funktionen', blogDescription: 'Dota 2 Cheats Foren mit Installationsanleitungen, ESP-Einstellungen, Skillshot-Hilfe und VAC-Hinweisen für PC.', blogIntro: 'Setup-Anleitungen, Funktionsübersichten und Patch-Day-Threads von Dota 2 Cheat-Nutzern auf dem PC.' },
	pt: { commentsTitle: 'Respostas', blogH1: 'Fóruns da comunidade', readMore: 'Ler tópico', relatedPosts: 'Tópicos relacionados', allPosts: 'Todos os tópicos', blogTitle: 'Fóruns Dota 2 Cheats | Configuração e recursos', blogDescription: 'Fóruns de cheats Dota 2 com guias de instalação, ESP, skillshot e notas VAC para PC.', blogIntro: 'Guias de configuração, recursos e tópicos de patch de jogadores com cheats Dota 2 no PC.' },
	it: { commentsTitle: 'Risposte', blogH1: 'Forum della community', readMore: 'Leggi discussione', relatedPosts: 'Discussioni correlate', allPosts: 'Tutte le discussioni', blogTitle: 'Forum Dota 2 Cheats | Setup e funzioni', blogDescription: 'Forum cheat Dota 2 con guide installazione, ESP, skillshot e note VAC per PC.', blogIntro: 'Guide setup, funzioni e thread patch-day da giocatori con cheat Dota 2 su PC.' },
	nl: { commentsTitle: 'Reacties', blogH1: 'Communityforums', readMore: 'Lees thread', relatedPosts: 'Gerelateerde threads', allPosts: 'Alle forumthreads', blogTitle: 'Dota 2 Cheats Forums | Setup & functies', blogDescription: 'Dota 2 cheats forums met installatieguides, ESP-instellingen, skillshot en VAC-notities voor PC.', blogIntro: 'Setup-guides, functies en patch-day threads van Dota 2 cheat-gebruikers op PC.' },
	pl: { commentsTitle: 'Odpowiedzi', blogH1: 'Fora społeczności', readMore: 'Czytaj wątek', relatedPosts: 'Powiązane wątki', allPosts: 'Wszystkie wątki', blogTitle: 'Fora Dota 2 Cheats | Konfiguracja i funkcje', blogDescription: 'Fora cheatów Dota 2 z poradnikami instalacji, ESP, skillshot i notatkami VAC na PC.', blogIntro: 'Poradniki konfiguracji, funkcje i wątki po patchu od graczy z cheatami Dota 2 na PC.' },
	ru: { commentsTitle: 'Ответы', blogH1: 'Форумы сообщества', readMore: 'Читать тему', relatedPosts: 'Похожие темы', allPosts: 'Все темы', blogTitle: 'Форумы Dota 2 Cheats | Настройка и функции', blogDescription: 'Форумы читов Dota 2 с гайдами по установке, ESP, скиллшоту и VAC для ПК.', blogIntro: 'Гайды по настройке, функции и обсуждения после патчей от игроков с читами Dota 2 на ПК.' },
	tr: { commentsTitle: 'Yanıtlar', blogH1: 'Topluluk forumları', readMore: 'Konuyu oku', relatedPosts: 'İlgili konular', allPosts: 'Tüm konular', blogTitle: 'Dota 2 Cheats Forumları | Kurulum ve özellikler', blogDescription: 'Dota 2 hile forumları — kurulum, ESP, skillshot ve VAC notları PC için.', blogIntro: 'Kurulum rehberleri, özellikler ve patch günü konuları — PC Dota 2 hile kullanıcılarından.' },
	ar: { commentsTitle: 'الردود', blogH1: 'منتديات المجتمع', readMore: 'اقرأ الموضوع', relatedPosts: 'مواضيع ذات صلة', allPosts: 'كل المواضيع', blogTitle: 'منتديات Dota 2 Cheats', blogDescription: 'منتديات غش Dota 2 مع أدلة التثبيت وESP وVAC لأجهزة PC.', blogIntro: 'أدلة الإعداد ومناقشات التحديثات من لاعبين يستخدمون غش Dota 2 على PC.' },
	ja: { commentsTitle: '返信', blogH1: 'コミュニティフォーラム', readMore: 'スレッドを読む', relatedPosts: '関連スレッド', allPosts: 'すべてのスレッド', blogTitle: 'Dota 2 Cheats フォーラム', blogDescription: 'Dota 2チートフォーラム — セットアップ、ESP、スキルショット、VAC情報（PC）。', blogIntro: 'PCでDota 2チートを使うプレイヤーのセットアップガイドとパッチ情報。' },
	ko: { commentsTitle: '답글', blogH1: '커뮤니티 포럼', readMore: '글 읽기', relatedPosts: '관련 글', allPosts: '모든 글', blogTitle: 'Dota 2 Cheats 포럼', blogDescription: 'Dota 2 치트 포럼 — 설치, ESP, 스킬샷, VAC 안내 (PC).', blogIntro: 'PC에서 Dota 2 치트를 쓰는 플레이어의 설정 가이드와 패치 글.' },
	zh: { commentsTitle: '回复', blogH1: '社区论坛', readMore: '阅读帖子', relatedPosts: '相关帖子', allPosts: '全部帖子', blogTitle: 'Dota 2 Cheats 论坛', blogDescription: 'Dota 2 作弊论坛 — 安装、ESP、技能辅助与 VAC 说明（PC）。', blogIntro: 'PC 玩家的 Dota 2 作弊设置指南与补丁讨论。' },
	hi: { commentsTitle: 'जवाब', blogH1: 'कम्युनिटी फ़ोरम', readMore: 'थ्रेड पढ़ें', relatedPosts: 'संबंधित थ्रेड', allPosts: 'सभी थ्रेड', blogTitle: 'Dota 2 Cheats फ़ोरम', blogDescription: 'Dota 2 चीट फ़ोरम — सेटअप, ESP, स्किलशॉट, VAC (PC).', blogIntro: 'PC पर Dota 2 चीट उपयोगकर्ताओं की सेटअप गाइड और पैच चर्चा।' },
	id: { commentsTitle: 'Balasan', blogH1: 'Forum komunitas', readMore: 'Baca thread', relatedPosts: 'Thread terkait', allPosts: 'Semua thread', blogTitle: 'Forum Dota 2 Cheats', blogDescription: 'Forum cheat Dota 2 — panduan instalasi, ESP, skillshot, VAC untuk PC.', blogIntro: 'Panduan setup dan diskusi patch dari pemain cheat Dota 2 di PC.' },
	th: { commentsTitle: 'ตอบกลับ', blogH1: 'ฟอรั่มชุมชน', readMore: 'อ่านกระทู้', relatedPosts: 'กระทู้ที่เกี่ยวข้อง', allPosts: 'กระทู้ทั้งหมด', blogTitle: 'ฟอรั่ม Dota 2 Cheats', blogDescription: 'ฟอรั่มชีต Dota 2 — ติดตั้ง, ESP, skillshot, VAC สำหรับ PC', blogIntro: 'คู่มือตั้งค่าและกระทู้หลังแพตช์จากผู้เล่นชีต Dota 2 บน PC' },
	vi: { commentsTitle: 'Phản hồi', blogH1: 'Diễn đàn cộng đồng', readMore: 'Đọc bài', relatedPosts: 'Bài liên quan', allPosts: 'Tất cả bài', blogTitle: 'Diễn đàn Dota 2 Cheats', blogDescription: 'Diễn đàn cheat Dota 2 — cài đặt, ESP, skillshot, VAC cho PC.', blogIntro: 'Hướng dẫn cài đặt và thảo luận patch từ người dùng cheat Dota 2 trên PC.' },
	uk: { commentsTitle: 'Відповіді', blogH1: 'Форуми спільноти', readMore: 'Читати тему', relatedPosts: 'Схожі теми', allPosts: 'Усі теми', blogTitle: 'Форуми Dota 2 Cheats', blogDescription: 'Форуми читів Dota 2 — встановлення, ESP, skillshot, VAC для ПК.', blogIntro: 'Гайди з налаштування та обговорення патчів від гравців з читами Dota 2 на ПК.' },
	cs: { commentsTitle: 'Odpovědi', blogH1: 'Komunitní fóra', readMore: 'Číst vlákno', relatedPosts: 'Související vlákna', allPosts: 'Všechna vlákna', blogTitle: 'Fóra Dota 2 Cheats', blogDescription: 'Fóra cheatů Dota 2 — instalace, ESP, skillshot, VAC pro PC.', blogIntro: 'Návody a diskuse po patchi od hráčů s cheaty Dota 2 na PC.' },
	ro: { commentsTitle: 'Răspunsuri', blogH1: 'Forumuri comunitate', readMore: 'Citește discuția', relatedPosts: 'Discuții similare', allPosts: 'Toate discuțiile', blogTitle: 'Forumuri Dota 2 Cheats', blogDescription: 'Forumuri cheat Dota 2 — instalare, ESP, skillshot, VAC pentru PC.', blogIntro: 'Ghiduri setup și discuții patch de la jucători cu cheat Dota 2 pe PC.' },
	sv: { commentsTitle: 'Svar', blogH1: 'Communityforum', readMore: 'Läs tråd', relatedPosts: 'Relaterade trådar', allPosts: 'Alla trådar', blogTitle: 'Dota 2 Cheats Forum', blogDescription: 'Dota 2 fuskforum — installation, ESP, skillshot, VAC för PC.', blogIntro: 'Setup-guider och patch-diskussioner från Dota 2 fusk-spelare på PC.' },
};

async function patchLocalesTs() {
	const file = path.join(ROOT, 'src/data/i18n/locales.ts');
	let c = await readFile(file, 'utf8');
	for (const [loc, ui] of Object.entries(FORUM_UI)) {
		if (loc === 'en') continue;
		const blockRe = new RegExp(`(\t${loc}: \\{[\\s\\S]*?)(\t\\},)`, 'm');
		const m = c.match(blockRe);
		if (!m) continue;
		let block = m[1];
		for (const [k, v] of Object.entries(ui)) {
			const keyRe = new RegExp(`\t\t${k}: '[^']*',`);
			if (keyRe.test(block)) {
				block = block.replace(keyRe, `\t\t${k}: '${v.replace(/'/g, "\\'")}',`);
			}
		}
		c = c.replace(blockRe, block + m[2]);
	}
	await writeFile(file, c);
	console.log('Patched locales.ts blogUi');
}

async function patchGenerateLocaleTranslations() {
	const file = path.join(ROOT, 'scripts/generate-locale-translations.mjs');
	let c = await readFile(file, 'utf8');
	c = c.replace(
		/en\.common = \{[\s\S]*?guides: 'Guides',[\s\S]*?\};/,
		`en.common = {
		...en.common,
		refundPolicy: 'Refund policy',
		forums: 'Forums',
		blog: 'Forums',
		home: 'Home',
	};`,
	);
	c = c.replace(
		/en\.blog = \{[\s\S]*?\};/,
		`en.blog = {
		...(en.blog ?? {}),
		blogTitle: 'Dota 2 Cheats Forums | Setup Tips & Feature Talk',
		blogDescription:
			'Dota 2 cheats forums with setup walkthroughs, ESP settings, skillshot assist sliders, and VAC patch notes for PC at dota2cheat.com/forums/.',
		blogH1: 'Community Forums',
		blogIntro:
			'Setup guides, feature breakdowns, and patch-day threads from players running dota 2 cheats on PC.',
	};`,
	);
	c = c.replace(/aboutTitle: 'cheats indetectables para Dota 2'/, "aboutTitle: 'herramientas premium para Dota 2 ranked'");
	await writeFile(file, c);
	console.log('Patched generate-locale-translations.mjs');
}

async function patchTranslationJson() {
	const commonPatch = {
		forums: null,
		blog: null,
	};
	const forumLabels = {
		es: 'Foros', fr: 'Forums', de: 'Foren', pt: 'Fóruns', it: 'Forum', nl: 'Forums',
		pl: 'Fora', ru: 'Форумы', tr: 'Forumlar', ar: 'منتديات', ja: 'フォーラム', ko: '포럼',
		zh: '论坛', hi: 'फ़ोरम', id: 'Forum', th: 'ฟอรั่ม', vi: 'Diễn đàn', uk: 'Форуми',
		cs: 'Fóra', ro: 'Forumuri', sv: 'Forum', en: 'Forums',
	};
	for (const loc of Object.keys(forumLabels)) {
		const f = path.join(ROOT, 'public/locales', loc, 'translation.json');
		try {
			const t = JSON.parse(await readFile(f, 'utf8'));
			t.common = t.common ?? {};
			t.common.forums = forumLabels[loc];
			t.common.blog = forumLabels[loc];
			delete t.common.guides;
			if (t.categoryRow) {
				t.categoryRow.forums = forumLabels[loc];
				t.categoryRow.blog = forumLabels[loc];
				delete t.categoryRow.reliable;
			}
			if (t.homeSeo) {
				t.homeSeo.linkBlog = forumLabels[loc];
				if (t.homeSeo.linkReliable) t.homeSeo.linkPatchStatus = t.homeSeo.linkReliable;
			}
			if (t.guides) delete t.guides;
			await writeFile(f, JSON.stringify(t, null, 2) + '\n');
		} catch {
			/* skip */
		}
	}
	console.log('Patched translation.json files');
}

async function main() {
	const dirs = [
		path.join(ROOT, 'scripts/i18n-data'),
		path.join(ROOT, 'src/data/i18n'),
	];
	for (const dir of dirs) {
		for (const f of await walk(dir)) await patchFile(f);
	}
	await patchLocalesTs();
	await patchGenerateLocaleTranslations();
	await patchTranslationJson();
}

main();
