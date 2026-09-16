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
		blogTitle: 'Foros Dota 2 Cheats | Configuración y funciones',
		blogDescription:
			'Blog de Dota 2 Cheats con guías de trucos , ESP wallhack, radar y Aimbot para Dota 2 en PC Windows.',
		blogH1: 'Foros de la comunidad',
		blogIntro:
			'Guías SEO de trucos Dota 2 , ESP wallhack, radar hack, Aimbot y mantenimiento VAC en 22 idiomas.',
		readMore: 'Leer hilo',
		published: 'Publicado',
		updated: 'Actualizado',
		relatedPosts: 'Hilos relacionados',
		allPosts: 'Todos los hilos',
		home: 'Inicio Dota 2 Cheats',
		language: 'Idioma',
		commentsTitle: 'Respuestas',
	},
	fr: {
		blogTitle: 'Forums Dota 2 Cheats | Configuration et fonctions',
		blogDescription:
			'Foros Dota 2 Cheats : triches , ESP wallhack, radar et Aimbot pour Dota 2 sur PC Windows.',
		blogH1: 'Forums communautaires',
		blogIntro:
			'Guides SEO triches Dota 2 , ESP wallhack, radar hack, Aimbot et VAC en 22 langues.',
		readMore: 'Lire le fil',
		published: 'Publié',
		updated: 'Mis à jour',
		relatedPosts: 'Fils associés',
		allPosts: 'Tous les fils',
		home: 'Accueil Dota 2 Cheats',
		language: 'Langue',
		commentsTitle: 'Réponses',
	},
	de: {
		blogTitle: 'Dota 2 Cheats Foren | Setup & Funktionen',
		blogDescription:
			'Dota 2 Cheats Forums mit ESP, Wallhack, Radar und Aimbot Guides für Dota 2 auf Windows PC.',
		blogH1: 'Community-Foren',
		blogIntro:
			'SEO-Guides für dota 2 cheats, ESP Wallhack, Radar Hack, Aimbot und VAC in 22 Sprachen.',
		readMore: 'Thread lesen',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		relatedPosts: 'Ähnliche Threads',
		allPosts: 'Alle Forum-Threads',
		home: 'Dota 2 Cheats Start',
		language: 'Sprache',
		commentsTitle: 'Antworten',
	},
	pt: {
		blogTitle: 'Fóruns Dota 2 Cheats | Configuração e recursos',
		blogDescription:
			'Foros Dota 2 Cheats com guias de cheats indetectáveis, ESP wallhack, radar e Aimbot para Dota 2 no PC.',
		blogH1: 'Fóruns da comunidade',
		blogIntro:
			'Guias SEO de cheats Dota 2 indetectáveis, ESP wallhack, radar hack, Aimbot e VAC em 22 idiomas.',
		readMore: 'Ler tópico',
		published: 'Publicado',
		updated: 'Atualizado',
		relatedPosts: 'Tópicos relacionados',
		allPosts: 'Todos os tópicos',
		home: 'Início Dota 2 Cheats',
		language: 'Idioma',
		commentsTitle: 'Respostas',
	},
	it: {
		blogTitle: 'Forum Dota 2 Cheats | Setup e funzioni',
		blogDescription:
			'Foros Dota 2 Cheats con guide cheat , ESP wallhack, radar e Aimbot per Dota 2 su PC Windows.',
		blogH1: 'Forum della community',
		blogIntro:
			'Guide SEO cheat Dota 2 , ESP wallhack, radar hack, Aimbot e VAC in 22 lingue.',
		readMore: 'Leggi discussione',
		published: 'Pubblicato',
		updated: 'Aggiornato',
		relatedPosts: 'Discussioni correlate',
		allPosts: 'Tutte le discussioni',
		home: 'Home Dota 2 Cheats',
		language: 'Lingua',
		commentsTitle: 'Risposte',
	},
	nl: {
		blogTitle: 'Dota 2 Cheats Forums | Setup & functies',
		blogDescription:
			'Dota 2 Cheats blog met ESP, wallhack, radar en Aimbot gidsen voor Dota 2 op Windows PC.',
		blogH1: 'Communityforums',
		blogIntro:
			'SEO-gidsen voor dota 2 cheats, ESP wallhack, radar hack, Aimbot en VAC in 22 talen.',
		readMore: 'Lees thread',
		published: 'Gepubliceerd',
		updated: 'Bijgewerkt',
		relatedPosts: 'Gerelateerde threads',
		allPosts: 'Alle forumthreads',
		home: 'Dota 2 Cheats home',
		language: 'Taal',
		commentsTitle: 'Reacties',
	},
	pl: {
		blogTitle: 'Fora Dota 2 Cheats | Konfiguracja i funkcje',
		blogDescription:
			'Foros Dota 2 Cheats z poradnikami ESP, wallhack, radar i Aimbot dla Dota 2 na PC.',
		blogH1: 'Fora społeczności',
		blogIntro:
			'Poradniki SEO reliable cheatów Dota 2, ESP wallhack, radar hack, Aimbot i VAC w 22 językach.',
		readMore: 'Czytaj wątek',
		published: 'Opublikowano',
		updated: 'Zaktualizowano',
		relatedPosts: 'Powiązane wątki',
		allPosts: 'Wszystkie wątki',
		home: 'Strona główna Dota 2 Cheats',
		language: 'Język',
		commentsTitle: 'Odpowiedzi',
	},
	ru: {
		blogTitle: 'Форумы Dota 2 Cheats | Настройка и функции',
		blogDescription:
			'Блог Dota 2 Cheats: ESP, wallhack, radar и Aimbot для Dota 2 на Windows PC.',
		blogH1: 'Форумы сообщества',
		blogIntro:
			'SEO-гайды по reliable читам Dota 2, ESP wallhack, radar hack, Aimbot и VAC на 22 языках.',
		readMore: 'Читать тему',
		published: 'Опубликовано',
		updated: 'Обновлено',
		relatedPosts: 'Похожие темы',
		allPosts: 'Все темы',
		home: 'Главная Dota 2 Cheats',
		language: 'Язык',
		commentsTitle: 'Ответы',
	},
	tr: {
		blogTitle: 'Dota 2 Cheats Forumları | Kurulum ve özellikler',
		blogDescription:
			'Dota 2 Cheats blog: ESP, wallhack, radar ve Aimbot rehberleri Dota 2 Windows PC.',
		blogH1: 'Topluluk forumları',
		blogIntro:
			'Reliable Dota 2 hileleri, ESP wallhack, radar hack, Aimbot ve VAC SEO rehberleri 22 dilde.',
		readMore: 'Konuyu oku',
		published: 'Yayınlandı',
		updated: 'Güncellendi',
		relatedPosts: 'İlgili konular',
		allPosts: 'Tüm konular',
		home: 'Dota 2 Cheats ana sayfa',
		language: 'Dil',
		commentsTitle: 'Yanıtlar',
	},
	ar: {
		blogTitle: 'منتديات Dota 2 Cheats',
		blogDescription:
			'مدونة Dota 2 Cheats: غش reliable وESP wallhack ورadar وAimbot لـ Dota 2 على Windows PC.',
		blogH1: 'منتديات المجتمع',
		blogIntro:
			'أدلة SEO لغش Dota 2 reliable وESP wallhack ورadar hack وAimbot وVAC بـ 22 لغة.',
		readMore: 'اقرأ الموضوع',
		published: 'نُشر',
		updated: 'تم التحديث',
		relatedPosts: 'مواضيع ذات صلة',
		allPosts: 'كل المواضيع',
		home: 'الرئيسية Dota 2 Cheats',
		language: 'اللغة',
		commentsTitle: 'الردود',
	},
	ja: {
		blogTitle: 'Dota 2 Cheats フォーラム',
		blogDescription:
			'Dota 2 Cheatsブログ：ESP、wallhack、radar、Aimbotガイド。Dota 2 Windows PC向け。',
		blogH1: 'コミュニティフォーラム',
		blogIntro:
			'reliable Dota 2チート、ESP wallhack、radar hack、Aimbot、VACのSEOガイドを22言語で提供。',
		readMore: 'スレッドを読む',
		published: '公開日',
		updated: '更新日',
		relatedPosts: '関連スレッド',
		allPosts: 'すべてのスレッド',
		home: 'Dota 2 Cheats ホーム',
		language: '言語',
		commentsTitle: '返信',
	},
	ko: {
		blogTitle: 'Dota 2 Cheats 포럼',
		blogDescription:
			'Dota 2 Cheats 블로그: ESP, wallhack, radar, Aimbot 가이드. Dota 2 Windows PC.',
		blogH1: '커뮤니티 포럼',
		blogIntro:
			'reliable Dota 2 치트, ESP wallhack, radar hack, Aimbot, VAC SEO 가이드를 22개 언어로 제공.',
		readMore: '글 읽기',
		published: '게시일',
		updated: '업데이트',
		relatedPosts: '관련 글',
		allPosts: '모든 글',
		home: 'Dota 2 Cheats 홈',
		language: '언어',
		commentsTitle: '답글',
	},
	zh: {
		blogTitle: 'Dota 2 Cheats 论坛',
		blogDescription:
			'Dota 2 Cheats博客：ESP、wallhack、radar和Aimbot指南，适用于Dota 2 Windows PC。',
		blogH1: '社区论坛',
		blogIntro:
			'reliable Dota 2作弊、ESP wallhack、radar hack、Aimbot和VAC的SEO指南，共22种语言。',
		readMore: '阅读帖子',
		published: '发布',
		updated: '更新',
		relatedPosts: '相关帖子',
		allPosts: '全部帖子',
		home: 'Dota 2 Cheats 首页',
		language: '语言',
		commentsTitle: '回复',
	},
	hi: {
		blogTitle: 'Dota 2 Cheats फ़ोरम',
		blogDescription:
			'Dota 2 Cheats ब्लॉग: ESP, wallhack, radar और Aimbot गाइड Dota 2 Windows PC के लिए।',
		blogH1: 'कम्युनिटी फ़ोरम',
		blogIntro:
			'dota 2 cheats, ESP wallhack, radar hack, Aimbot और VAC SEO गाइड 22 भाषाओं में।',
		readMore: 'थ्रेड पढ़ें',
		published: 'प्रकाशित',
		updated: 'अपडेट',
		relatedPosts: 'संबंधित थ्रेड',
		allPosts: 'सभी थ्रेड',
		home: 'Dota 2 Cheats होम',
		language: 'भाषा',
		commentsTitle: 'जवाब',
	},
	id: {
		blogTitle: 'Forum Dota 2 Cheats',
		blogDescription:
			'Foros Dota 2 Cheats: pandua ESP, wallhack, radar dan Aimbot untuk Dota 2 di PC Windows.',
		blogH1: 'Forum komunitas',
		blogIntro:
			'Panduan SEO cheat Dota 2 reliable, ESP wallhack, radar hack, Aimbot dan VAC dalam 22 bahasa.',
		readMore: 'Baca thread',
		published: 'Dipublikasikan',
		updated: 'Diperbarui',
		relatedPosts: 'Thread terkait',
		allPosts: 'Semua thread',
		home: 'Beranda Dota 2 Cheats',
		language: 'Bahasa',
		commentsTitle: 'Balasan',
	},
	th: {
		blogTitle: 'ฟอรั่ม Dota 2 Cheats',
		blogDescription:
			'บล็อก Dota 2 Cheats: คู่มือ ESP, wallhack, radar และ Aimbot สำหรับ Dota 2 บน PC',
		blogH1: 'ฟอรั่มชุมชน',
		blogIntro:
			'คู่มือ SEO สำหรับ cheat Dota 2 reliable, ESP wallhack, radar hack, Aimbot และ VAC 22 ภาษา',
		readMore: 'อ่านกระทู้',
		published: 'เผยแพร่',
		updated: 'อัปเดต',
		relatedPosts: 'กระทู้ที่เกี่ยวข้อง',
		allPosts: 'กระทู้ทั้งหมด',
		home: 'หน้าแรก Dota 2 Cheats',
		language: 'ภาษา',
		commentsTitle: 'ตอบกลับ',
	},
	vi: {
		blogTitle: 'Diễn đàn Dota 2 Cheats',
		blogDescription:
			'Foros Dota 2 Cheats: hướng dẫn ESP, wallhack, radar và Aimbot cho Dota 2 trên PC.',
		blogH1: 'Diễn đàn cộng đồng',
		blogIntro:
			'Hướng dẫn SEO cheat Dota 2 reliable, ESP wallhack, radar hack, Aimbot và VAC bằng 22 ngôn ngữ.',
		readMore: 'Đọc bài',
		published: 'Xuất bản',
		updated: 'Cập nhật',
		relatedPosts: 'Bài liên quan',
		allPosts: 'Tất cả bài',
		home: 'Trang chủ Dota 2 Cheats',
		language: 'Ngôn ngữ',
		commentsTitle: 'Phản hồi',
	},
	uk: {
		blogTitle: 'Форуми Dota 2 Cheats',
		blogDescription:
			'Блог Dota 2 Cheats: ESP, wallhack, radar та Aimbot для Dota 2 на Windows PC.',
		blogH1: 'Форуми спільноти',
		blogIntro:
			'SEO-гайди з reliable читів Dota 2, ESP wallhack, radar hack, Aimbot та VAC 22 мовами.',
		readMore: 'Читати тему',
		published: 'Опубліковано',
		updated: 'Оновлено',
		relatedPosts: "Пов'язані гайди Dota 2",
		allPosts: 'Усі теми',
		home: 'Головна Dota 2 Cheats',
		language: 'Мова',
		commentsTitle: 'Відповіді',
	},
	cs: {
		blogTitle: 'Fóra Dota 2 Cheats',
		blogDescription:
			'Foros Dota 2 Cheats: ESP, wallhack, radar a Aimbot pro Dota 2 na Windows PC.',
		blogH1: 'Komunitní fóra',
		blogIntro:
			'SEO průvodce reliable dota 2 cheaty, ESP wallhack, radar hack, Aimbot a VAC ve 22 jazycích.',
		readMore: 'Číst vlákno',
		published: 'Publikováno',
		updated: 'Aktualizováno',
		relatedPosts: 'Související vlákna',
		allPosts: 'Všechna vlákna',
		home: 'Domů Dota 2 Cheats',
		language: 'Jazyk',
		commentsTitle: 'Odpovědi',
	},
	ro: {
		blogTitle: 'Forumuri Dota 2 Cheats',
		blogDescription:
			'Foros Dota 2 Cheats: ghiduri ESP, wallhack, radar și Aimbot pentru Dota 2 pe PC.',
		blogH1: 'Forumuri comunitate',
		blogIntro:
			'Ghiduri SEO cheat-uri Dota 2 reliable, ESP wallhack, radar hack, Aimbot și VAC în 22 de limbi.',
		readMore: 'Citește discuția',
		published: 'Publicat',
		updated: 'Actualizat',
		relatedPosts: 'Discuții similare',
		allPosts: 'Toate discuțiile',
		home: 'Acasă Dota 2 Cheats',
		language: 'Limbă',
		commentsTitle: 'Răspunsuri',
	},
	sv: {
		blogTitle: 'Dota 2 Cheats Forum',
		blogDescription:
			'Dota 2 Cheats blogg med ESP, wallhack, radar och Aimbot guider för Dota 2 på PC.',
		blogH1: 'Communityforum',
		blogIntro:
			'SEO-guider för dota 2 cheats, ESP wallhack, radar hack, Aimbot och VAC på 22 språk.',
		readMore: 'Läs tråd',
		published: 'Publicerad',
		updated: 'Uppdaterad',
		relatedPosts: 'Relaterade trådar',
		allPosts: 'Alla trådar',
		home: 'Dota 2 Cheats hem',
		language: 'Språk',
		commentsTitle: 'Svar',
	},
};
