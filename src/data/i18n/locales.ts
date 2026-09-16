export type LocaleCode =
	| 'en'
	| 'es'
	| 'fr'
	| 'de'
	| 'pt'
	| 'it'
	| 'nl'
	| 'pl'
	| 'ru'
	| 'tr'
	| 'ar'
	| 'ja'
	| 'ko'
	| 'zh'
	| 'hi'
	| 'id'
	| 'th'
	| 'vi'
	| 'uk'
	| 'cs'
	| 'ro'
	| 'sv';

export type LocaleMeta = {
	code: LocaleCode;
	name: string;
	nativeName: string;
	hreflang: string;
	ogLocale: string;
	dir: 'ltr' | 'rtl';
	region: string;
};

/** 22 locales for global Dota 2 Cheats blog SEO coverage. */
export const locales: LocaleMeta[] = [
	{ code: 'en', name: 'English', nativeName: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr', region: 'Worldwide' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr', region: 'Worldwide' },
	{ code: 'fr', name: 'French', nativeName: 'Français', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano', hreflang: 'it', ogLocale: 'it_IT', dir: 'ltr', region: 'Worldwide' },
	{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hreflang: 'nl', ogLocale: 'nl_NL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pl', name: 'Polish', nativeName: 'Polski', hreflang: 'pl', ogLocale: 'pl_PL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', hreflang: 'ru', ogLocale: 'ru_RU', dir: 'ltr', region: 'Worldwide' },
	{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hreflang: 'tr', ogLocale: 'tr_TR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', hreflang: 'ar', ogLocale: 'ar_SA', dir: 'rtl', region: 'Worldwide' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語', hreflang: 'ja', ogLocale: 'ja_JP', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어', hreflang: 'ko', ogLocale: 'ko_KR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文', hreflang: 'zh', ogLocale: 'zh_CN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hreflang: 'id', ogLocale: 'id_ID', dir: 'ltr', region: 'Worldwide' },
	{ code: 'th', name: 'Thai', nativeName: 'ไทย', hreflang: 'th', ogLocale: 'th_TH', dir: 'ltr', region: 'Worldwide' },
	{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hreflang: 'vi', ogLocale: 'vi_VN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hreflang: 'uk', ogLocale: 'uk_UA', dir: 'ltr', region: 'Worldwide' },
	{ code: 'cs', name: 'Czech', nativeName: 'Čeština', hreflang: 'cs', ogLocale: 'cs_CZ', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ro', name: 'Romanian', nativeName: 'Română', hreflang: 'ro', ogLocale: 'ro_RO', dir: 'ltr', region: 'Worldwide' },
	{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', hreflang: 'sv', ogLocale: 'sv_SE', dir: 'ltr', region: 'Worldwide' },
];

export const defaultLocale: LocaleCode = 'en';

export const localeCodes = locales.map((l) => l.code);

export const localeMap = Object.fromEntries(locales.map((l) => [l.code, l])) as Record<
	LocaleCode,
	LocaleMeta
>;

export function isLocaleCode(value: string): value is LocaleCode {
	return localeCodes.includes(value as LocaleCode);
}

export function getLocale(code: string): LocaleMeta | undefined {
	return isLocaleCode(code) ? localeMap[code] : undefined;
}

/** UI strings for blog index pages per locale. */
export const blogUi: Record<
	LocaleCode,
	{
		blogTitle: string;
		blogDescription: string;
		blogH1: string;
		blogIntro: string;
		readMore: string;
		published: string;
		updated: string;
		relatedPosts: string;
		allPosts: string;
		home: string;
		language: string;
		commentsTitle: string;
	}
> = {
	en: {
		blogTitle: 'Dota 2 Cheats Forums | Setup Tips & Feature Talk',
		blogDescription:
			'Dota 2 cheats forums with setup walkthroughs, ESP settings, skillshot assist sliders, and VAC patch notes for PC at dota2cheat.com/forums/.',
		blogH1: 'Community Forums',
		blogIntro:
			'Setup guides, feature breakdowns, and patch-day threads from players running dota 2 cheats on PC. Read before you buy — then compare ESP, maphack, and skillshot assist on our product pages.',
		readMore: 'Read thread',
		published: 'Posted',
		updated: 'Updated',
		relatedPosts: 'Related threads',
		allPosts: 'All forum threads',
		home: 'Dota 2 Cheats home',
		language: 'Language',
		commentsTitle: 'Replies',
	},
	es: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Guías en 22 idiomas',
		blogDescription:
			'Blog de Dota 2 Cheats con guías de trucos , ESP wallhack, radar y Aimbot para Dota 2 en PC Windows.',
		blogH1: 'Blog Dota 2 Cheats — Guías globales',
		blogIntro:
			'Guías SEO de trucos Dota 2 , ESP wallhack, radar hack, Aimbot y mantenimiento VAC en 22 idiomas.',
		readMore: 'Leer guía',
		published: 'Publicado',
		updated: 'Actualizado',
		relatedPosts: 'Guías Dota 2 relacionadas',
		allPosts: 'Todos los artículos',
		home: 'Inicio Dota 2 Cheats',
		language: 'Idioma',
		commentsTitle: 'Replies',
	},
	fr: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Guides en 22 langues',
		blogDescription:
			'Blog Dota 2 Cheats : triches , ESP wallhack, radar et Aimbot pour Dota 2 sur PC Windows.',
		blogH1: 'Blog Dota 2 Cheats — Guides mondiaux',
		blogIntro:
			'Guides SEO triches Dota 2 , ESP wallhack, radar hack, Aimbot et VAC en 22 langues.',
		readMore: 'Lire le guide',
		published: 'Publié',
		updated: 'Mis à jour',
		relatedPosts: 'Guides Dota 2 associés',
		allPosts: 'Tous les articles',
		home: 'Accueil Dota 2 Cheats',
		language: 'Langue',
		commentsTitle: 'Replies',
	},
	de: {
		blogTitle: 'Dota 2 Cheats Blog 2026 | Guides in 22 Sprachen',
		blogDescription:
			'Dota 2 Cheats Blog mit ESP, Wallhack, Radar und Aimbot Guides für Dota 2 auf Windows PC.',
		blogH1: 'Dota 2 Cheats Blog — Globale Guides',
		blogIntro:
			'SEO-Guides für reliable Dota 2 Cheats, ESP Wallhack, Radar Hack, Aimbot und VAC in 22 Sprachen.',
		readMore: 'Guide lesen',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		relatedPosts: 'Verwandte Dota 2 Guides',
		allPosts: 'Alle Beiträge',
		home: 'Dota 2 Cheats Start',
		language: 'Sprache',
		commentsTitle: 'Replies',
	},
	pt: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Guias em 22 idiomas',
		blogDescription:
			'Blog Dota 2 Cheats com guias de cheats indetectáveis, ESP wallhack, radar e Aimbot para Dota 2 no PC.',
		blogH1: 'Blog Dota 2 Cheats — Guias globais',
		blogIntro:
			'Guias SEO de cheats Dota 2 indetectáveis, ESP wallhack, radar hack, Aimbot e VAC em 22 idiomas.',
		readMore: 'Ler guia',
		published: 'Publicado',
		updated: 'Atualizado',
		relatedPosts: 'Guias Dota 2 relacionados',
		allPosts: 'Todos os posts',
		home: 'Início Dota 2 Cheats',
		language: 'Idioma',
		commentsTitle: 'Replies',
	},
	it: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Guide in 22 lingue',
		blogDescription:
			'Blog Dota 2 Cheats con guide cheat indetectable, ESP wallhack, radar e Aimbot per Dota 2 su PC Windows.',
		blogH1: 'Blog Dota 2 Cheats — Guide globali',
		blogIntro:
			'Guide SEO cheat Dota 2 indetectable, ESP wallhack, radar hack, Aimbot e VAC in 22 lingue.',
		readMore: 'Leggi guida',
		published: 'Pubblicato',
		updated: 'Aggiornato',
		relatedPosts: 'Guide Dota 2 correlate',
		allPosts: 'Tutti gli articoli',
		home: 'Home Dota 2 Cheats',
		language: 'Lingua',
		commentsTitle: 'Replies',
	},
	nl: {
		blogTitle: 'Dota 2 Cheats Blog 2026 | Gidsen in 22 talen',
		blogDescription:
			'Dota 2 Cheats blog met ESP, wallhack, radar en Aimbot gidsen voor Dota 2 op Windows PC.',
		blogH1: 'Dota 2 Cheats Blog — Wereldwijde gidsen',
		blogIntro:
			'SEO-gidsen voor dota 2 cheats, ESP wallhack, radar hack, Aimbot en VAC in 22 talen.',
		readMore: 'Lees gids',
		published: 'Gepubliceerd',
		updated: 'Bijgewerkt',
		relatedPosts: 'Gerelateerde Dota 2 gidsen',
		allPosts: 'Alle posts',
		home: 'Dota 2 Cheats home',
		language: 'Taal',
		commentsTitle: 'Replies',
	},
	pl: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Poradniki w 22 językach',
		blogDescription:
			'Blog Dota 2 Cheats z poradnikami ESP, wallhack, radar i Aimbot dla Dota 2 na PC.',
		blogH1: 'Blog Dota 2 Cheats — Globalne poradniki',
		blogIntro:
			'Poradniki SEO reliable cheatów Dota 2, ESP wallhack, radar hack, Aimbot i VAC w 22 językach.',
		readMore: 'Czytaj poradnik',
		published: 'Opublikowano',
		updated: 'Zaktualizowano',
		relatedPosts: 'Powiązane poradniki Dota 2',
		allPosts: 'Wszystkie artykuły',
		home: 'Strona główna Dota 2 Cheats',
		language: 'Język',
		commentsTitle: 'Replies',
	},
	ru: {
		blogTitle: 'Блог Dota 2 Cheats 2026 | Гайды на 22 языках',
		blogDescription:
			'Блог Dota 2 Cheats: ESP, wallhack, radar и Aimbot для Dota 2 на Windows PC.',
		blogH1: 'Блог Dota 2 Cheats — Глобальные гайды',
		blogIntro:
			'SEO-гайды по reliable читам Dota 2, ESP wallhack, radar hack, Aimbot и VAC на 22 языках.',
		readMore: 'Читать гайд',
		published: 'Опубликовано',
		updated: 'Обновлено',
		relatedPosts: 'Похожие гайды Dota 2',
		allPosts: 'Все статьи',
		home: 'Главная Dota 2 Cheats',
		language: 'Язык',
		commentsTitle: 'Replies',
	},
	tr: {
		blogTitle: 'Dota 2 Cheats Blog 2026 | 22 dilde rehberler',
		blogDescription:
			'Dota 2 Cheats blog: ESP, wallhack, radar ve Aimbot rehberleri Dota 2 Windows PC.',
		blogH1: 'Dota 2 Cheats Blog — Küresel rehberler',
		blogIntro:
			'Reliable Dota 2 hileleri, ESP wallhack, radar hack, Aimbot ve VAC SEO rehberleri 22 dilde.',
		readMore: 'Rehberi oku',
		published: 'Yayınlandı',
		updated: 'Güncellendi',
		relatedPosts: 'İlgili Dota 2 rehberleri',
		allPosts: 'Tüm yazılar',
		home: 'Dota 2 Cheats ana sayfa',
		language: 'Dil',
		commentsTitle: 'Replies',
	},
	ar: {
		blogTitle: 'مدونة Dota 2 Cheats 2026 | أدلة بـ 22 لغة',
		blogDescription:
			'مدونة Dota 2 Cheats: غش reliable وESP wallhack ورadar وAimbot لـ Dota 2 على Windows PC.',
		blogH1: 'مدونة Dota 2 Cheats — أدلة عالمية',
		blogIntro:
			'أدلة SEO لغش Dota 2 reliable وESP wallhack ورadar hack وAimbot وVAC بـ 22 لغة.',
		readMore: 'اقرأ الدليل',
		published: 'نُشر',
		updated: 'تم التحديث',
		relatedPosts: 'أدلة Dota 2 ذات صلة',
		allPosts: 'جميع المقالات',
		home: 'الرئيسية Dota 2 Cheats',
		language: 'اللغة',
		commentsTitle: 'Replies',
	},
	ja: {
		blogTitle: 'Dota 2 Cheats ブログ 2026 | 22言語ガイド',
		blogDescription:
			'Dota 2 Cheatsブログ：ESP、wallhack、radar、Aimbotガイド。Dota 2 Windows PC向け。',
		blogH1: 'Dota 2 Cheats ブログ — グローバルガイド',
		blogIntro:
			'reliable Dota 2チート、ESP wallhack、radar hack、Aimbot、VACのSEOガイドを22言語で提供。',
		readMore: 'ガイドを読む',
		published: '公開日',
		updated: '更新日',
		relatedPosts: '関連Dota 2ガイド',
		allPosts: 'すべての記事',
		home: 'Dota 2 Cheats ホーム',
		language: '言語',
		commentsTitle: 'Replies',
	},
	ko: {
		blogTitle: 'Dota 2 Cheats 블로그 2026 | 22개 언어 가이드',
		blogDescription:
			'Dota 2 Cheats 블로그: ESP, wallhack, radar, Aimbot 가이드. Dota 2 Windows PC.',
		blogH1: 'Dota 2 Cheats 블로그 — 글로벌 가이드',
		blogIntro:
			'reliable Dota 2 치트, ESP wallhack, radar hack, Aimbot, VAC SEO 가이드를 22개 언어로 제공.',
		readMore: '가이드 읽기',
		published: '게시일',
		updated: '업데이트',
		relatedPosts: '관련 Dota 2 가이드',
		allPosts: '모든 게시물',
		home: 'Dota 2 Cheats 홈',
		language: '언어',
		commentsTitle: 'Replies',
	},
	zh: {
		blogTitle: 'Dota 2 Cheats 博客 2026 | 22种语言指南',
		blogDescription:
			'Dota 2 Cheats博客：ESP、wallhack、radar和Aimbot指南，适用于Dota 2 Windows PC。',
		blogH1: 'Dota 2 Cheats 博客 — 全球指南',
		blogIntro:
			'reliable Dota 2作弊、ESP wallhack、radar hack、Aimbot和VAC的SEO指南，共22种语言。',
		readMore: '阅读指南',
		published: '发布',
		updated: '更新',
		relatedPosts: '相关Dota 2指南',
		allPosts: '所有文章',
		home: 'Dota 2 Cheats 首页',
		language: '语言',
		commentsTitle: 'Replies',
	},
	hi: {
		blogTitle: 'Dota 2 Cheats ब्लॉग 2026 | 22 भाषाओं में गाइड',
		blogDescription:
			'Dota 2 Cheats ब्लॉग: ESP, wallhack, radar और Aimbot गाइड Dota 2 Windows PC के लिए।',
		blogH1: 'Dota 2 Cheats ब्लॉग — वैश्विक गाइड',
		blogIntro:
			'dota 2 cheats, ESP wallhack, radar hack, Aimbot और VAC SEO गाइड 22 भाषाओं में।',
		readMore: 'गाइड पढ़ें',
		published: 'प्रकाशित',
		updated: 'अपडेट',
		relatedPosts: 'संबंधित Dota 2 गाइड',
		allPosts: 'सभी पोस्ट',
		home: 'Dota 2 Cheats होम',
		language: 'भाषा',
		commentsTitle: 'Replies',
	},
	id: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Panduan 22 bahasa',
		blogDescription:
			'Blog Dota 2 Cheats: pandua ESP, wallhack, radar dan Aimbot untuk Dota 2 di PC Windows.',
		blogH1: 'Blog Dota 2 Cheats — Panduan global',
		blogIntro:
			'Panduan SEO cheat Dota 2 reliable, ESP wallhack, radar hack, Aimbot dan VAC dalam 22 bahasa.',
		readMore: 'Baca panduan',
		published: 'Dipublikasikan',
		updated: 'Diperbarui',
		relatedPosts: 'Pandua Dota 2 terkait',
		allPosts: 'Semua artikel',
		home: 'Beranda Dota 2 Cheats',
		language: 'Bahasa',
		commentsTitle: 'Replies',
	},
	th: {
		blogTitle: 'บล็อก Dota 2 Cheats 2026 | คู่มือ 22 ภาษา',
		blogDescription:
			'บล็อก Dota 2 Cheats: คู่มือ ESP, wallhack, radar และ Aimbot สำหรับ Dota 2 บน PC',
		blogH1: 'บล็อก Dota 2 Cheats — คู่มือทั่วโลก',
		blogIntro:
			'คู่มือ SEO สำหรับ cheat Dota 2 reliable, ESP wallhack, radar hack, Aimbot และ VAC 22 ภาษา',
		readMore: 'อ่านคู่มือ',
		published: 'เผยแพร่',
		updated: 'อัปเดต',
		relatedPosts: 'คู่มือ Dota 2 ที่เกี่ยวข้อง',
		allPosts: 'บทความทั้งหมด',
		home: 'หน้าแรก Dota 2 Cheats',
		language: 'ภาษา',
		commentsTitle: 'Replies',
	},
	vi: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Hướng dẫn 22 ngôn ngữ',
		blogDescription:
			'Blog Dota 2 Cheats: hướng dẫn ESP, wallhack, radar và Aimbot cho Dota 2 trên PC.',
		blogH1: 'Blog Dota 2 Cheats — Hướng dẫn toàn cầu',
		blogIntro:
			'Hướng dẫn SEO cheat Dota 2 reliable, ESP wallhack, radar hack, Aimbot và VAC bằng 22 ngôn ngữ.',
		readMore: 'Đọc hướng dẫn',
		published: 'Xuất bản',
		updated: 'Cập nhật',
		relatedPosts: 'Hướng dẫn Dota 2 liên quan',
		allPosts: 'Tất cả bài viết',
		home: 'Trang chủ Dota 2 Cheats',
		language: 'Ngôn ngữ',
		commentsTitle: 'Replies',
	},
	uk: {
		blogTitle: 'Блог Dota 2 Cheats 2026 | Гайди 22 мовами',
		blogDescription:
			'Блог Dota 2 Cheats: ESP, wallhack, radar та Aimbot для Dota 2 на Windows PC.',
		blogH1: 'Блог Dota 2 Cheats — Глобальні гайди',
		blogIntro:
			'SEO-гайди з reliable читів Dota 2, ESP wallhack, radar hack, Aimbot та VAC 22 мовами.',
		readMore: 'Читати гайд',
		published: 'Опубліковано',
		updated: 'Оновлено',
		relatedPosts: "Пов'язані гайди Dota 2",
		allPosts: 'Усі статті',
		home: 'Головна Dota 2 Cheats',
		language: 'Мова',
		commentsTitle: 'Replies',
	},
	cs: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Průvodce ve 22 jazycích',
		blogDescription:
			'Blog Dota 2 Cheats: ESP, wallhack, radar a Aimbot pro Dota 2 na Windows PC.',
		blogH1: 'Blog Dota 2 Cheats — Globální průvodce',
		blogIntro:
			'SEO průvodce reliable dota 2 cheaty, ESP wallhack, radar hack, Aimbot a VAC ve 22 jazycích.',
		readMore: 'Číst průvodce',
		published: 'Publikováno',
		updated: 'Aktualizováno',
		relatedPosts: 'Související Dota 2 průvodce',
		allPosts: 'Všechny články',
		home: 'Domů Dota 2 Cheats',
		language: 'Jazyk',
		commentsTitle: 'Replies',
	},
	ro: {
		blogTitle: 'Blog Dota 2 Cheats 2026 | Ghiduri în 22 de limbi',
		blogDescription:
			'Blog Dota 2 Cheats: ghiduri ESP, wallhack, radar și Aimbot pentru Dota 2 pe PC.',
		blogH1: 'Blog Dota 2 Cheats — Ghiduri globale',
		blogIntro:
			'Ghiduri SEO cheat-uri Dota 2 reliable, ESP wallhack, radar hack, Aimbot și VAC în 22 de limbi.',
		readMore: 'Citește ghidul',
		published: 'Publicat',
		updated: 'Actualizat',
		relatedPosts: 'Ghiduri Dota 2 related',
		allPosts: 'Toate articolele',
		home: 'Acasă Dota 2 Cheats',
		language: 'Limbă',
		commentsTitle: 'Replies',
	},
	sv: {
		blogTitle: 'Dota 2 Cheats Blogg 2026 | Guider på 22 språk',
		blogDescription:
			'Dota 2 Cheats blogg med ESP, wallhack, radar och Aimbot guider för Dota 2 på PC.',
		blogH1: 'Dota 2 Cheats Blogg — Globala guider',
		blogIntro:
			'SEO-guider för dota 2 cheats, ESP wallhack, radar hack, Aimbot och VAC på 22 språk.',
		readMore: 'Läs guide',
		published: 'Publicerad',
		updated: 'Uppdaterad',
		relatedPosts: 'Relaterade Dota 2 guider',
		allPosts: 'Alla inlägg',
		home: 'Dota 2 Cheats hem',
		language: 'Språk',
		commentsTitle: 'Replies',
	},
};
