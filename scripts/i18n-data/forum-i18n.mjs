import { LOCALES } from './constants.mjs';

const POST_META = {
	'install-guide': {
		es: { title: 'Cómo instalar trucos de Dota 2 en PC Windows', h1: 'Cómo instalar trucos de Dota 2 en PC Windows', intro: '¿Primera vez configurando trucos para Dota 2? Guía de descarga, licencia, overlay y ajustes antes de ranked.', metaDescription: 'Instalación de trucos Dota 2 en Windows 10/11. Clave, overlay ESP y checklist antes de ranked.' },
		fr: { title: 'Installer des triches Dota 2 sur PC Windows', h1: 'Installer des triches Dota 2 sur PC Windows', intro: 'Première installation ? Téléchargement, licence, overlay et réglages avant ranked.', metaDescription: 'Installation triches Dota 2 Windows 10/11. Clé, overlay ESP, checklist ranked.' },
		de: { title: 'Dota 2 Cheats auf Windows installieren', h1: 'Dota 2 Cheats auf Windows installieren', intro: 'Erstes Setup? Download, Lizenz, Overlay und Einstellungen vor Ranked.', metaDescription: 'Dota 2 Cheats Installation Windows 10/11. Lizenz, ESP-Overlay, Ranked-Checkliste.' },
		pt: { title: 'Como instalar cheats Dota 2 no Windows', h1: 'Como instalar cheats Dota 2 no Windows', intro: 'Primeira vez? Download, licença, overlay e ajustes antes do ranked.', metaDescription: 'Instalação de cheats Dota 2 no Windows. Chave, overlay ESP e checklist.' },
		it: { title: 'Come installare cheat Dota 2 su Windows', h1: 'Come installare cheat Dota 2 su Windows', intro: 'Prima installazione? Download, licenza, overlay e impostazioni prima del ranked.', metaDescription: 'Installazione cheat Dota 2 su Windows. Chiave, overlay ESP, checklist.' },
		ru: { title: 'Как установить читы Dota 2 на Windows', h1: 'Как установить читы Dota 2 на Windows', intro: 'Первый раз? Загрузка, ключ, оверлей и настройки перед ranked.', metaDescription: 'Установка читов Dota 2 на Windows. Ключ, ESP-оверлей, чеклист.' },
		ja: { title: 'WindowsでDota 2チートをインストールする方法', h1: 'WindowsでDota 2チートをインストールする方法', intro: '初めてのセットアップ？ダウンロード、ライセンス、オーバーレイ、ランク前の設定。', metaDescription: 'Windows 10/11向けDota 2チートのインストール手順。' },
		zh: { title: '在 Windows 上安装 Dota 2 作弊', h1: '在 Windows 上安装 Dota 2 作弊', intro: '第一次设置？下载、许可证、覆盖层与排位前设置。', metaDescription: 'Windows 10/11 的 Dota 2 作弊安装步骤。' },
		ko: { title: 'Windows에서 Dota 2 치트 설치 방법', h1: 'Windows에서 Dota 2 치트 설치 방법', intro: '처음 설정? 다운로드, 라이선스, 오버레이, 랭크 전 설정.', metaDescription: 'Windows 10/11 Dota 2 치트 설치 가이드.' },
	},
	'esp-settings-ranked': {
		es: { title: 'Ajustes ESP Dota 2: ¿qué funciona en ranked?', h1: 'Ajustes ESP Dota 2: ¿qué funciona en ranked?', intro: 'El ESP en ranked no es ver todo — es ver lo correcto a tiempo.', metaDescription: 'Ajustes ESP Dota 2 para ranked — cajas, wards, runas y opacidad.' },
		fr: { title: 'Réglages ESP Dota 2 : que choisir en ranked ?', h1: 'Réglages ESP Dota 2 : que choisir en ranked ?', intro: "L'ESP ranked n'est pas tout voir — c'est voir au bon moment.", metaDescription: 'Réglages ESP Dota 2 ranked — boîtes, wards, runes, opacité.' },
		de: { title: 'Dota 2 ESP-Einstellungen für Ranked', h1: 'Dota 2 ESP-Einstellungen für Ranked', intro: 'Ranked-ESP heißt nicht alles sehen — sondern das Richtige zur richtigen Zeit.', metaDescription: 'Dota 2 ESP für Ranked — Boxen, Wards, Runen, Deckkraft.' },
	},
	'aimbot-settings-ban': {
		es: { title: 'Skillshot assist: ¿qué nivel y riesgo de ban?', h1: 'Skillshot assist: ¿qué nivel y riesgo de ban?', intro: 'Todos preguntan qué slider los banea. Esto es lo que uso en Invoker y Pudge.', metaDescription: 'Ajustes skillshot assist Dota 2 — suavizado, FOV, humanizer y VAC.' },
		fr: { title: 'Skillshot assist : quel niveau et risque de ban ?', h1: 'Skillshot assist : quel niveau et risque de ban ?', intro: 'La question classique sur Discord. Mes réglages Invoker et Pudge.', metaDescription: 'Réglages skillshot assist — lissage, FOV, humanizer, VAC.' },
		de: { title: 'Skillshot-Assist: Level & Ban-Risiko', h1: 'Skillshot-Assist: Level & Ban-Risiko', intro: 'Die Standard-Frage im Discord. Meine Invoker- und Pudge-Werte.', metaDescription: 'Skillshot-Assist Dota 2 — Glättung, FOV, Humanizer, VAC.' },
	},
};

const LOCALE_PHRASES = {
	es: [['Setup', 'Configuración'], ['Features', 'Funciones'], ['Before you', 'Antes de'], ['ranked', 'ranked'], ['VAC', 'VAC']],
	fr: [['Setup', 'Configuration'], ['Features', 'Fonctions'], ['Before you', 'Avant de'], ['ranked', 'classé']],
	de: [['Setup', 'Setup'], ['Features', 'Funktionen'], ['Before you', 'Bevor Sie'], ['ranked', 'Ranked']],
	pt: [['Setup', 'Configuração'], ['Features', 'Recursos'], ['ranked', 'ranked']],
	it: [['Setup', 'Configurazione'], ['Features', 'Funzioni'], ['ranked', 'ranked']],
	ru: [['Setup', 'Настройка'], ['Features', 'Функции'], ['ranked', 'ранкед']],
	ja: [['Setup', 'セットアップ'], ['Features', '機能'], ['ranked', 'ランク']],
	zh: [['Setup', '设置'], ['Features', '功能'], ['ranked', '排位']],
	ko: [['Setup', '설정'], ['Features', '기능'], ['ranked', '랭크']],
	pl: [['Setup', 'Konfiguracja'], ['Features', 'Funkcje']],
	nl: [['Setup', 'Setup'], ['Features', 'Functies']],
	tr: [['Setup', 'Kurulum'], ['Features', 'Özellikler']],
	ar: [['Setup', 'الإعداد'], ['Features', 'الميزات']],
	hi: [['Setup', 'सेटअप'], ['Features', 'फ़ीचर']],
	id: [['Setup', 'Pengaturan'], ['Features', 'Fitur']],
	th: [['Setup', 'การตั้งค่า'], ['Features', 'ฟีเจอร์']],
	vi: [['Setup', 'Cài đặt'], ['Features', 'Tính năng']],
	uk: [['Setup', 'Налаштування'], ['Features', 'Функції']],
	cs: [['Setup', 'Nastavení'], ['Features', 'Funkce']],
	ro: [['Setup', 'Configurare'], ['Features', 'Funcții']],
	sv: [['Setup', 'Installation'], ['Features', 'Funktioner']],
};

function applyPhrases(text, locale) {
	let out = text;
	for (const [a, b] of LOCALE_PHRASES[locale] ?? LOCALE_PHRASES.es ?? []) {
		out = out.split(a).join(b);
	}
	return out;
}

export function localizeForumPost(en, locale, postId) {
	if (locale === 'en') return en;
	const meta = POST_META[postId]?.[locale] ?? POST_META[postId]?.es;
	return {
		...en,
		slug: en.slug,
		title: meta?.title ?? applyPhrases(en.title, locale),
		h1: meta?.h1 ?? applyPhrases(en.h1, locale),
		intro: meta?.intro ?? applyPhrases(en.intro, locale),
		metaDescription: meta?.metaDescription ?? applyPhrases(en.metaDescription, locale),
		keywords: en.keywords.map((k) => applyPhrases(k, locale)),
		imageAlt: applyPhrases(en.imageAlt, locale),
		sections: en.sections.map((s) => ({
			h2: applyPhrases(s.h2, locale),
			paragraphs: s.paragraphs.map((p) => applyPhrases(p, locale)),
		})),
		comments: en.comments?.map((c) => ({ ...c, body: applyPhrases(c.body, locale) })),
	};
}

export { LOCALES };
