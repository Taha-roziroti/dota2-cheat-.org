import { HERO_IMAGES, clampTitle, clampDesc, section, stripcheckoutFromMeta } from './constants.mjs';
import { phrases } from './phrases.mjs';
import { PAGE_IMAGE_ALTS } from './image-alts.mjs';
import { FOCUS_I18N } from './focus-i18n.mjs';
import { LEGAL_I18N } from './legal-i18n.mjs';

/** Page-specific translated meta for home across locales. */
export const PAGE_META_HOME = {
	es: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack y Aimbot', desc: 'Trucos Dota 2 indetectables para Dota 2 en PC. ESP wallhack, radar hack y Aimbot con mantenimiento VAC. Entrega digital instantánea.', h1: 'cheats indetectables para Dota 2', intro: 'Paquete reliable para Dota 2 en Windows PC: ESP wallhack, radar y Aimbot con mantenimiento VAC tras cada parche.', imageAlt: 'Dota 2 ESP — etiquetas de jugador hack', gallery: 'Galería Dota 2 Cheats — ESP, Aimbot y wallhack', cta2: 'Ver funciones', h2a: 'Por qué eligen Dota 2 Cheats en 2026', h2b: 'ESP wallhack, radar y Aimbot en una licencia', topicA: 'Ideal para leer escuadrones enemigos en BR y Resurgence sessions.', topicB: 'Una licencia en lugar de herramientas separadas.' },
	fr: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack et Aimbot', desc: 'Triches Dota 2 indétectables pour Dota 2 sur PC. ESP wallhack, radar hack et Aimbot avec maintenance VAC. Livraison numérique instantanée.', h1: 'triches indétectables pour Dota 2', intro: 'Pack reliable pour Dota 2 sur PC Windows : ESP wallhack, radar et Aimbot avec maintenance VAC après chaque patch.', imageAlt: 'Dota 2 ESP — tags joueur hack', gallery: 'Galerie Dota 2 Cheats — ESP, Aimbot et wallhack', cta2: 'Voir les fonctions', h2a: 'Pourquoi choisir Dota 2 Cheats en 2026', h2b: 'ESP wallhack, radar et Aimbot en une licence', topicA: 'Parfait pour lire les équipes ennemies en BR et Resurgence sessions.', topicB: 'Une licence au lieu d\'outils séparés.' },
	de: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Reliable Dota 2 Cheats für Dota 2 auf PC. ESP Wallhack, Radar Hack und Aimbot mit VAC-Wartung. Sofortige digitale Lieferung.', h1: 'reliable Cheats für Dota 2', intro: 'Reliable Windows PC Paket für Dota 2: ESP Wallhack, Radar und Aimbot mit VAC-Wartung nach jedem Patch.', imageAlt: 'Dota 2 ESP — Spieler-Tags Hack', gallery: 'Dota 2 Cheats Galerie — ESP, Aimbot und Wallhack', cta2: 'Features ansehen', h2a: 'Warum Dota 2 Cheats 2026 führt', h2b: 'ESP Wallhack, Radar und Aimbot in einer Lizenz', topicA: 'Ideal um feindliche Squads in BR und Resurgence sessions zu lesen.', topicB: 'Eine Lizenz statt separater Tools.' },
	pt: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheats Dota 2 indetectáveis para Dota 2 no PC. ESP wallhack, radar hack e Aimbot com manutenção VAC. Entrega digital instantánea.', h1: 'cheats indetectáveis para Dota 2', intro: 'Pacote reliable para Dota 2 no Windows PC: ESP wallhack, radar e Aimbot com manutenção VAC após cada patch.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Galeria Dota 2 Cheats — ESP, Aimbot e wallhack', cta2: 'Ver recursos', h2a: 'Por que escolher Dota 2 Cheats em 2026', h2b: 'ESP wallhack, radar e Aimbot numa licença', topicA: 'Ideal para ler equipes inimigos em BR e Resurgence sessions.', topicB: 'Uma licença em vez de ferramentas separadas.' },
	it: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheat Dota 2 indetectable per Dota 2 su PC. ESP wallhack, radar hack e Aimbot con manutenzione VAC. Consegna digitale istantanea.', h1: 'cheat indetectable per Dota 2', intro: 'Pacchetto reliable per Dota 2 su PC Windows: ESP wallhack, radar e Aimbot con manutenzione VAC dopo ogni patch.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Galleria Dota 2 Cheats — ESP, Aimbot e wallhack', cta2: 'Vedi funzioni', h2a: 'Perché scegliere Dota 2 Cheats nel 2026', h2b: 'ESP wallhack, radar e Aimbot in una licenza', topicA: 'Ideale per leggere squadre nemiche in BR e Resurgence sessions.', topicB: 'Una licenza invece di tool separati.' },
	nl: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Reliable dota 2 cheats voor Dota 2 op PC. ESP wallhack, radar hack en Aimbot met VAC-onderhoud. Directe digitale levering.', h1: 'reliable cheats voor Dota 2', intro: 'Reliable Windows PC pakket voor Dota 2: ESP wallhack, radar en Aimbot met VAC-onderhoud na elke patch.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Dota 2 Cheats galerij — ESP, Aimbot en wallhack', cta2: 'Bekijk functies', h2a: 'Waarom Dota 2 Cheats in 2026', h2b: 'ESP wallhack, radar en Aimbot in één licentie', topicA: 'Ideaal om vijandelijke squads te lezen in BR en Resurgence sessions.', topicB: 'Eén licentie in plaats van losse tools.' },
	pl: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack i Aimbot', desc: 'Reliable cheaty Dota 2 dla Dota 2 na PC. ESP wallhack, radar hack i Aimbot z konserwacją VAC. Natychmiastowa dostawa cyfrowa.', h1: 'reliable cheaty dla Dota 2', intro: 'Pakiet reliable dla Dota 2 na Windows PC: ESP wallhack, radar i Aimbot z konserwacją VAC po każdym patchu.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Galeria Dota 2 Cheats — ESP, Aimbot i wallhack', cta2: 'Zobacz funkcje', h2a: 'Dlaczego Dota 2 Cheats w 2026', h2b: 'ESP wallhack, radar i Aimbot w jednej licencji', topicA: 'Idealny do czytania wrogich squadów w BR i Resurgence sessions.', topicB: 'Jedna licencja zamiast osobnych narzędzi.' },
	ru: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack и Aimbot', desc: 'Reliable читы Dota 2 для Dota 2 на PC. ESP wallhack, radar hack и Aimbot с обслуживанием VAC. Мгновенная цифровая доставка.', h1: 'reliable читы для Dota 2', intro: 'Reliable пакет для Dota 2 на Windows PC: ESP wallhack, radar и Aimbot с обслуживанием VAC после патчей.', imageAlt: 'Dota 2 ESP — теги игроков hack', gallery: 'Галерея Dota 2 Cheats — ESP, Aimbot и wallhack', cta2: 'Смотреть функции', h2a: 'Почему выбирают Dota 2 Cheats в 2026', h2b: 'ESP wallhack, radar и Aimbot в одной лицензии', topicA: 'Идеально для чтения вражеских отрядов в BR и Resurgence sessions.', topicB: 'Одна лицензия вместо отдельных инструментов.' },
	tr: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack ve Aimbot', desc: 'Dota 2 için reliable hileler. ESP wallhack, radar hack ve Aimbot — VAC bakımı. Anında dijital teslimat.', h1: 'Dota 2 için reliable hileler', intro: 'Dota 2 Windows PC reliable paketi: ESP wallhack, radar ve Aimbot — VAC bakımı dahil.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Dota 2 Cheats galeri — ESP, Aimbot ve wallhack', cta2: 'Özellikleri gör', h2a: '2026\'da neden Dota 2 Cheats', h2b: 'ESP wallhack, radar ve Aimbot tek lisans', topicA: 'BR ve Resurgence sessions\'da düşman squad okumak için ideal.', topicB: 'Ayrı araçlar yerine tek lisans.' },
	ar: { title: 'Dota 2 Cheats 2026 | ESP وWallhack وAimbot', desc: 'غش Dota 2 reliable لـ Dota 2 على PC. ESP wallhack ورadar hack وAimbot مع صيانة VAC. تسليم رقمي فوري.', h1: 'غش غير مكتشف لـ Dota 2', intro: 'حزمة reliable لـ Dota 2 على Windows PC: ESP wallhack ورadar وAimbot مع صيانة VAC.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'معرض Dota 2 Cheats — ESP وAimbot وwallhack', cta2: 'عرض الميزات', h2a: 'لماذا Dota 2 Cheats في 2026', h2b: 'ESP wallhack ورadar وAimbot في ترخيص واحد', topicA: 'مثالي لقراءة فرق العدو في BR وResurgence sessions.', topicB: 'ترخيص واحد بدلاً من أدوات منفصلة.' },
	ja: { title: 'Dota 2 Cheats 2026 | ESP・Wallhack・Aimbot', desc: 'Dota 2向けreliableチート。ESP wallhack、radar hack、Aimbot、VACメンテナンス。即時デジタル配信。', h1: 'Dota 2向けreliableチート', intro: 'Dota 2 Windows PC向けreliableパッケージ：ESP wallhack、radar、Aimbot、VACメンテナンス付き。', imageAlt: 'dota 2 cheats operator ESP aimbot wallhack', gallery: 'Dota 2 Cheatsギャラリー — ESP、Aimbot、wallhack', cta2: '機能を見る', h2a: '2026年にDota 2 Cheatsを選ぶ理由', h2b: 'ESP wallhack、radar、Aimbotが1ライセンス', topicA: 'BRとResurgence sessionsで敵スクワッドを読むのに最適。', topicB: '別ツールではなく1ライセンス。' },
	ko: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack, Aimbot', desc: 'Dota 2 reliable 치트. ESP wallhack, radar hack, Aimbot, VAC 유지보수. 즉시 디지털 배송.', h1: 'Dota 2용 reliable 치트', intro: 'Dota 2 Windows PC reliable 패키지: ESP wallhack, radar, Aimbot, VAC 유지보수 포함.', imageAlt: 'dota 2 cheats operator ESP aimbot wallhack', gallery: 'Dota 2 Cheats 갤러리 — ESP, Aimbot, wallhack', cta2: '기능 보기', h2a: '2026년 Dota 2 Cheats를 선택하는 이유', h2b: 'ESP wallhack, radar, Aimbot 단일 라이선스', topicA: 'BR 및 Resurgence sessions에서 적 분대 읽기에 이상적.', topicB: '별도 도구 대신 단일 라이선스.' },
	zh: { title: 'Dota 2 Cheats 2026 | ESP、Wallhack、Aimbot', desc: 'Dota 2 reliable作弊。ESP wallhack、radar hack、Aimbot、VAC维护。即时数字交付。', h1: 'Dota 2的reliable外挂', intro: 'Dota 2 Windows PC reliable套餐：ESP wallhack、radar、Aimbot，含VAC维护。', imageAlt: 'dota 2 cheats operator ESP aimbot wallhack', gallery: 'Dota 2 Cheats图库 — ESP、Aimbot、wallhack', cta2: '查看功能', h2a: '2026年选择Dota 2 Cheats的原因', h2b: 'ESP wallhack、radar、Aimbot单一许可证', topicA: '适合在BR和Resurgence sessions中读取敌方小队。', topicB: '一个许可证而非多个工具。' },
	hi: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack और Aimbot', desc: 'Dota 2 reliable hacks. ESP wallhack, radar hack, Aimbot, VAC maintenance. Instant digital delivery.', h1: 'Dota 2 ke liye reliable cheats', intro: 'Dota 2 Windows PC reliable पैकेज: ESP wallhack, radar, Aimbot, VAC maintenance सहित.', imageAlt: 'dota 2 cheats operator ESP aimbot wallhack', gallery: 'Dota 2 Cheats gallery — ESP, Aimbot, wallhack', cta2: 'फ़ीचर्स देखें', h2a: '2026 में Dota 2 Cheats क्यों', h2b: 'ESP wallhack, radar, Aimbot एक लाइसेंस में', topicA: 'BR और Resurgence sessions में दुश्मन squad पढ़ने के लिए आदर्श.', topicB: 'अलग टूल्स के बजाय एक लाइसेंस.' },
	id: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Dota 2 reliable untuk Dota 2 di PC. ESP wallhack, radar hack, Aimbot, pemeliharaan VAC. Pengiriman digital instan.', h1: 'cheat reliable untuk Dota 2', intro: 'Paket reliable Dota 2 di Windows PC: ESP wallhack, radar, Aimbot dengan pemeliharaan VAC.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Galeri Dota 2 Cheats — ESP, Aimbot, wallhack', cta2: 'Lihat fitur', h2a: 'Mengapa Dota 2 Cheats di 2026', h2b: 'ESP wallhack, radar, Aimbot dalam satu lisensi', topicA: 'Ideal membaca squad musuh di BR dan Resurgence sessions.', topicB: 'Satu lisensi alih-alih alat terpisah.' },
	th: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack และ Aimbot', desc: 'Cheat Dota 2 reliable สำหรับ Dota 2 บน PC. ESP wallhack, radar hack, Aimbot, VAC maintenance. จัดส่งดิจิทัลทันที.', h1: 'cheat reliable สำหรับ Dota 2', intro: 'แพ็ก reliable สำหรับ Dota 2 บน Windows PC: ESP wallhack, radar, Aimbot พร้อม VAC maintenance', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'แกลเลอรี Dota 2 Cheats — ESP, Aimbot, wallhack', cta2: 'ดูฟีเจอร์', h2a: 'ทำไมเลือก Dota 2 Cheats ปี 2026', h2b: 'ESP wallhack, radar, Aimbot ในใบอนุญาตเดียว', topicA: 'เหมาะสำหรับอ่าน squad ศัตรูใน BR และ Resurgence sessions', topicB: 'ใบอนุญาตเดียวแทนเครื่องมือแยก' },
	vi: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Dota 2 reliable cho Dota 2 trên PC. ESP wallhack, radar hack, Aimbot, bảo trì VAC. Giao hàng kỹ thuật số tức thì.', h1: 'cheat reliable cho Dota 2', intro: 'Gói reliable Dota 2 trên Windows PC: ESP wallhack, radar, Aimbot với bảo trì VAC.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Thư viện Dota 2 Cheats — ESP, Aimbot, wallhack', cta2: 'Xem tính năng', h2a: 'Vì sao chọn Dota 2 Cheats 2026', h2b: 'ESP wallhack, radar, Aimbot trong một giấy phép', topicA: 'Lý tưởng đọc squad địch trong BR và Resurgence sessions.', topicB: 'Một giấy phép thay vì công cụ riêng.' },
	uk: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack і Aimbot', desc: 'Reliable чіти Dota 2 для Dota 2 на PC. ESP wallhack, radar hack, Aimbot, обслуговування VAC. Мгновенная цифровая доставка.', h1: 'reliable чіти для Dota 2', intro: 'Reliable пакет для Dota 2 на Windows PC: ESP wallhack, radar, Aimbot з обслуговуванням VAC.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Галерея Dota 2 Cheats — ESP, Aimbot, wallhack', cta2: 'Дивитися функції', h2a: 'Чому Dota 2 Cheats у 2026', h2b: 'ESP wallhack, radar і Aimbot в одній ліцензії', topicA: 'Ідеально для читання ворожих загонів у BR і Resurgence sessions.', topicB: 'Одна ліцензія замість окремих інструментів.' },
	cs: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack a Aimbot', desc: 'Reliable dota 2 cheaty pro Dota 2 na PC. ESP wallhack, radar hack, Aimbot, údržba VAC. Okamžité digitální doručení.', h1: 'reliable cheaty pro Dota 2', intro: 'Reliable balíček pro Dota 2 na Windows PC: ESP wallhack, radar, Aimbot s údržbou VAC.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Galerie Dota 2 Cheats — ESP, Aimbot, wallhack', cta2: 'Zobrazit funkce', h2a: 'Proč Dota 2 Cheats v roce 2026', h2b: 'ESP wallhack, radar a Aimbot v jedné licenci', topicA: 'Ideální pro čtení nepřátelských squadů v BR a Resurgence sessions.', topicB: 'Jedna licence místo samostatných nástrojů.' },
	ro: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack și Aimbot', desc: 'Cheats Dota 2 reliable pentru Dota 2 pe PC. ESP wallhack, radar hack, Aimbot, mentenanță VAC. Livrare digitală instantă.', h1: 'cheat-uri reliable pentru Dota 2', intro: 'Pachet reliable Dota 2 pe Windows PC: ESP wallhack, radar, Aimbot cu mentenanță VAC.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Galerie Dota 2 Cheats — ESP, Aimbot, wallhack', cta2: 'Vezi funcții', h2a: 'De ce Dota 2 Cheats în 2026', h2b: 'ESP wallhack, radar și Aimbot într-o licență', topicA: 'Ideal pentru citirea squad-urilor inamice în BR și Resurgence sessions.', topicB: 'O licență în loc de instrumente separate.' },
	sv: { title: 'Dota 2 Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Reliable dota 2 cheats för Dota 2 på PC. ESP wallhack, radar hack, Aimbot, VAC-underhåll. Omedelbar digital leverans.', h1: 'reliable cheats för Dota 2', intro: 'Reliable paket för Dota 2 på Windows PC: ESP wallhack, radar, Aimbot med VAC-underhåll.', imageAlt: 'Dota 2 ESP player tags hack', gallery: 'Dota 2 Cheats galleri — ESP, Aimbot, wallhack', cta2: 'Se funktioner', h2a: 'Varför Dota 2 Cheats 2026', h2b: 'ESP wallhack, radar och Aimbot i en licens', topicA: 'Ideal för att läsa fiendesquads i BR och Resurgence sessions.', topicB: 'En licens istället för separata verktyg.' },
};

export function buildHome(locale) {
	const p = phrases[locale];
	const m = PAGE_META_HOME[locale];
	return {
		title: clampTitle(stripcheckoutFromMeta(m.title)),
		description: clampDesc(stripcheckoutFromMeta(m.desc)),
		h1: m.h1,
		intro: m.intro,
		imageAlt: m.imageAlt,
		galleryTitle: m.gallery,
		heroImage: HERO_IMAGES.home,
		ctaPrimary: p.buy,
		ctaSecondary: m.cta2,
		ctaSecondaryHref: '/features/',
		sections: [
			section(m.h2a, p.s1(m.topicA), p.s2()),
			section(m.h2b, p.s1(m.topicB), p.s3()),
		],
	};
}

/** Unique title/desc tails per page — English base + locale overrides for agent H1/subtitle. */
export const PAGE_META_TAILS = {
	'dota2-esp': { suffix: 'Player Boxes & Wallhack', focus: 'player boxes, operator markers, and wallhack overlays', altKeyword: 'ESP wallhack overlay' },
	'dota2-aimbot': { suffix: 'Soft Aim Controls', focus: 'soft aim, FOV, and per-weapon Aimbot profiles', altKeyword: 'aimbot combat' },
	features: { suffix: 'Full Feature List', focus: 'ESP, soft aim, radar controls', altKeyword: 'cheats package ESP aimbot' },
	pricing: { suffix: 'Monthly & Lifetime', focus: '$35 monthly or $150 lifetime licenses', altKeyword: 'cheats pricing' },
	setup: { suffix: 'PC Setup Guide', focus: 'Windows PC activation and first-launch setup', altKeyword: 'setup PC activation' },
	updates: { suffix: 'Live Status Log', focus: 'VAC patch status and rebuild notes', altKeyword: 'updates VAC maintenance' },
	faq: { suffix: 'Common Answers', focus: 'ESP, soft aim, delivery, and VAC questions', altKeyword: 'FAQ ESP aimbot' },
	support: { suffix: 'Help & Contact', focus: 'order help and license support contact', altKeyword: 'support license help' },
	reliable: { suffix: 'VAC Safe Status', focus: 'reliable maintenance after VAC patches', altKeyword: 'reliable cheats ESP' },
	wallhack: { suffix: 'ESP Visibility', focus: 'wallhack ESP for players, weapon drops, and distance', altKeyword: 'wallhack ESP visibility' },
	radar: { suffix: '2D Threat Overlay', focus: '2D radar cues for flanks and rotations', altKeyword: 'radar hack overlay' },
	vac: { suffix: 'Patch Maintenance', focus: 'how VAC updates are handled for Dota 2 cheats', altKeyword: 'VAC bypass ESP aimbot' },
	'cheats-2026': { suffix: 'Buyer Guide', focus: '2026 dota 2 cheats checklist before checkout', altKeyword: 'hacks 2026 ESP aimbot' },
	hacks: { suffix: 'ESP Aimbot Guide', focus: 'Dota 2 Cheats pillar for ESP and Aimbot', altKeyword: 'hacks ESP aimbot' },
	'cheat-download': { suffix: 'Instant Access', focus: 'digital license download after payment', altKeyword: 'cheat download ESP aimbot' },
	'mod-menu': { suffix: 'In-Game Toggles', focus: 'in-client ESP and soft aim toggles', altKeyword: 'mod menu ESP aimbot' },
	'soft-aim': { suffix: 'Smooth Aim Settings', focus: 'smooth soft aim settings for Windows PC', altKeyword: 'soft aim aimbot' },
	'best-cheats': { suffix: 'Buyer Checklist', focus: 'what to compare before buying dota 2 cheats', altKeyword: 'best hacks ESP aimbot' },
	'aimbot-hack': { suffix: 'Soft Aim Assist', focus: 'reliable Aimbot hack assist for Dota 2', altKeyword: 'aimbot hack combat' },
	'esp-hack': { suffix: 'Boxes & Weapon drops', focus: 'ESP hack boxes, weapon drops pins, and distance', altKeyword: 'ESP hack wallhack' },
	'unlock-all': { suffix: 'What It Means', focus: 'unlock-all searches vs real ESP and Aimbot tools', altKeyword: 'unlock all items ESP aimbot' },
};

/** Localized H1 suffixes (title/subtitle language change on product pages). */
export const SUFFIX_I18N = {
	es: {
		'dota2-esp': 'Cajas de jugador y wallhack',
		'dota2-aimbot': 'Controles soft aim',
		features: 'Lista completa de funciones',
		pricing: 'Mensual y de por vida',
		setup: 'Guía de instalación PC',
		updates: 'Registro de estado',
		faq: 'Preguntas frecuentes',
		support: 'Ayuda y contacto',
		reliable: 'Estado indetectable',
		wallhack: 'Visibilidad ESP',
		radar: 'Radar 2D de amenazas',
		vac: 'Mantenimiento de parches',
		'cheats-2026': 'Guía del comprador',
		hacks: 'Guía ESP y Aimbot',
		'cheat-download': 'Acceso instantáneo',
		'mod-menu': 'Controles en partida',
		'soft-aim': 'Ajustes soft aim',
		'best-cheats': 'Lista de compra',
		'aimbot-hack': 'Asistencia soft aim',
		'esp-hack': 'Cajas y weapon drops',
		'unlock-all': 'Qué significa',
	},
	fr: {
		'dota2-esp': 'Boîtes joueur et wallhack',
		'dota2-aimbot': 'Contrôles soft aim',
		features: 'Liste complète des fonctions',
		pricing: 'Mensuel et à vie',
		setup: 'Guide d\'installation PC',
		updates: 'Journal de statut',
		faq: 'Questions fréquentes',
		support: 'Aide et contact',
		reliable: 'Statut indétectable',
		wallhack: 'Visibilité ESP',
		radar: 'Radar 2D des menaces',
		vac: 'Maintenance des patchs',
		'cheats-2026': 'Guide acheteur',
		hacks: 'Guide ESP et Aimbot',
		'cheat-download': 'Accès instantané',
		'mod-menu': 'Contrôles en jeu',
		'soft-aim': 'Réglages soft aim',
		'best-cheats': 'Checklist acheteur',
		'aimbot-hack': 'Assistance soft aim',
		'esp-hack': 'Boîtes et weapon drops',
		'unlock-all': 'Ce que ça signifie',
	},
	de: {
		'dota2-esp': 'Spielerboxen & Wallhack',
		'dota2-aimbot': 'Soft-Aim Steuerung',
		features: 'Vollständige Feature-Liste',
		pricing: 'Monatlich & Lifetime',
		setup: 'PC Setup-Anleitung',
		updates: 'Wartungsprotokoll',
		faq: 'Häufige Fragen',
		support: 'Hilfe & Kontakt',
		reliable: 'Reliable Status',
		wallhack: 'ESP Sichtbarkeit',
		radar: '2D Bedrohungsradar',
		vac: 'Patch-Wartung',
		'cheats-2026': 'Käuferleitfaden',
		hacks: 'ESP Aimbot Guide',
		'cheat-download': 'Sofortzugang',
		'mod-menu': 'In-Game Toggles',
		'soft-aim': 'Soft-Aim Einstellungen',
		'best-cheats': 'Käufer-Checkliste',
		'aimbot-hack': 'Soft-Aim Assist',
		'esp-hack': 'Boxen & Weapon drops',
		'unlock-all': 'Was es bedeutet',
	},
	pt: {
		'dota2-esp': 'Caixas de jogador e wallhack',
		'dota2-aimbot': 'Controles soft aim',
		features: 'Lista completa de recursos',
		pricing: 'Mensal e vitalício',
		setup: 'Guia de instalação PC',
		updates: 'Registro de estado',
		faq: 'Perguntas frequentes',
		support: 'Ajuda e contato',
		reliable: 'Status indetectável',
		wallhack: 'Visibilidade ESP',
		radar: 'Radar 2D de ameaças',
		vac: 'Manutenção de patches',
		'cheats-2026': 'Guia do comprador',
		hacks: 'Guia ESP e Aimbot',
		'cheat-download': 'Acesso instantâneo',
		'mod-menu': 'Controles in-game',
		'soft-aim': 'Ajustes soft aim',
		'best-cheats': 'Checklist do comprador',
		'aimbot-hack': 'Assistência soft aim',
		'esp-hack': 'Caixas e weapon drops',
		'unlock-all': 'O que significa',
	},
	it: {
		'dota2-esp': 'Box giocatore e wallhack',
		'dota2-aimbot': 'Controlli soft aim',
		features: 'Elenco completo funzioni',
		pricing: 'Mensile e lifetime',
		setup: 'Guida setup PC',
		updates: 'Log manutenzione',
		faq: 'Domande frequenti',
		support: 'Aiuto e contatto',
		reliable: 'Stato indetectable',
		wallhack: 'Visibilità ESP',
		radar: 'Radar 2D minacce',
		vac: 'Manutenzione patch',
		'cheats-2026': 'Guida acquirente',
		hacks: 'Guida ESP e Aimbot',
		'cheat-download': 'Accesso istantaneo',
		'mod-menu': 'Toggle in-game',
		'soft-aim': 'Impostazioni soft aim',
		'best-cheats': 'Checklist acquirente',
		'aimbot-hack': 'Assist soft aim',
		'esp-hack': 'Box e weapon drops',
		'unlock-all': 'Cosa significa',
	},
	ru: {
		'dota2-esp': 'Боксы игроков и wallhack',
		'dota2-aimbot': 'Управление soft aim',
		features: 'Полный список функций',
		pricing: 'Месяц и lifetime',
		setup: 'Гайд по установке',
		updates: 'Журнал обновлений',
		faq: 'Частые вопросы',
		support: 'Помощь и контакт',
		reliable: 'Статус reliable',
		wallhack: 'Видимость ESP',
		radar: '2D радар угроз',
		vac: 'Обслуживание патчей',
		'cheats-2026': 'Гайд покупателя',
		hacks: 'Гайд ESP и Aimbot',
		'cheat-download': 'Мгновенный доступ',
		'mod-menu': 'Игровые переключатели',
		'soft-aim': 'Настройки soft aim',
		'best-cheats': 'Чеклист покупателя',
		'aimbot-hack': 'Soft aim ассист',
		'esp-hack': 'Боксы и лут',
		'unlock-all': 'Что это значит',
	},
};

function productPage(locale, pageKey, topicName, cta2href) {
	const p = phrases[locale];
	const home = PAGE_META_HOME[locale];
	const meta = PAGE_META_TAILS[pageKey] ?? { suffix: 'Dota 2 Cheats', focus: 'ESP wallhack, radar, and Aimbot', altKeyword: 'ESP aimbot wallhack' };
	const focus = FOCUS_I18N[locale]?.[pageKey] ?? meta.focus;
	const suffix = SUFFIX_I18N[locale]?.[pageKey] ?? meta.suffix;
	const titleBase = `${topicName} | ${suffix}`;
	return {
		title: clampTitle(stripcheckoutFromMeta(titleBase)),
		description: clampDesc(
			stripcheckoutFromMeta(
				`${topicName} for Dota 2 ranked matches and Resurgence on Windows PC — ${focus}. ${p.delivery}. ${p.reliable}. Official dota 2 cheats at dota2cheat.com.`,
			),
		),
		h1: topicName,
		intro: p.s1(`${topicName}.`),
		imageAlt: PAGE_IMAGE_ALTS[pageKey] || `${topicName} — Dota 2 Cheats screenshot`,
		galleryTitle: topicName,
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: p.buy,
		ctaSecondary: home.cta2,
		ctaSecondaryHref: cta2href,
		sections: [
			section(topicName, p.s1(`${focus}.`), p.s2()),
			section(`${p.reliable}`, p.s3(), p.s2()),
			section(p.delivery, p.s2(), p.legal()),
		],
	};
}

export const TOPIC_NAMES = {
	'dota2-esp': { en: 'Dota 2 ESP', es: 'ESP Dota 2', fr: 'ESP Dota 2', de: 'Dota 2 ESP', pt: 'ESP Dota 2', it: 'ESP Dota 2', nl: 'Dota 2 ESP', pl: 'ESP Dota 2', ru: 'ESP Dota 2', tr: 'Dota 2 ESP', ar: 'ESP Dota 2', ja: 'Dota 2 ESP', ko: 'Dota 2 ESP', zh: 'Dota 2 ESP', hi: 'Dota 2 ESP', id: 'ESP Dota 2', th: 'Dota 2 ESP', vi: 'ESP Dota 2', uk: 'ESP Dota 2', cs: 'Dota 2 ESP', ro: 'ESP Dota 2', sv: 'Dota 2 ESP' },
	'dota2-aimbot': { en: 'Dota 2 Aimbot', es: 'Aimbot Dota 2', fr: 'Aimbot Dota 2', de: 'Dota 2 Aimbot', pt: 'Aimbot Dota 2', it: 'Aimbot Dota 2', nl: 'Dota 2 Aimbot', pl: 'Aimbot Dota 2', ru: 'Aimbot Dota 2', tr: 'Dota 2 Aimbot', ar: 'Aimbot Dota 2', ja: 'Dota 2 Aimbot', ko: 'Dota 2 Aimbot', zh: 'Dota 2 Aimbot', hi: 'Dota 2 Aimbot', id: 'Aimbot Dota 2', th: 'Dota 2 Aimbot', vi: 'Aimbot Dota 2', uk: 'Aimbot Dota 2', cs: 'Dota 2 Aimbot', ro: 'Aimbot Dota 2', sv: 'Dota 2 Aimbot' },
	features: { en: 'Features', es: 'Funciones', fr: 'Fonctions', de: 'Features', pt: 'Recursos', it: 'Funzioni', nl: 'Functies', pl: 'Funkcje', ru: 'Функции', tr: 'Özellikler', ar: 'الميزات', ja: '機能', ko: '기능', zh: '功能', hi: 'फ़ीचर्स', id: 'Fitur', th: 'ฟีเจอร์', vi: 'Tính năng', uk: 'Функції', cs: 'Funkce', ro: 'Funcții', sv: 'Funktioner' },
	pricing: { en: 'Pricing', es: 'Precios', fr: 'Tarifs', de: 'Preise', pt: 'Preços', it: 'Prezzi', nl: 'Prijzen', pl: 'Cennik', ru: 'Цены', tr: 'Fiyatlar', ar: 'الأسعار', ja: '料金', ko: '가격', zh: '价格', hi: 'कीमत', id: 'Harga', th: 'ราคา', vi: 'Giá', uk: 'Ціни', cs: 'Ceny', ro: 'Prețuri', sv: 'Priser' },
	setup: { en: 'Setup', es: 'Instalación', fr: 'Installation', de: 'Setup', pt: 'Instalação', it: 'Setup', nl: 'Setup', pl: 'Instalacja', ru: 'Установка', tr: 'Kurulum', ar: 'التثبيت', ja: 'セットアップ', ko: '설치', zh: '安装', hi: 'सेटअप', id: 'Setup', th: 'ติดตั้ง', vi: 'Cài đặt', uk: 'Встановлення', cs: 'Instalace', ro: 'Instalare', sv: 'Installation' },
	updates: { en: 'Updates', es: 'Actualizaciones', fr: 'Mises à jour', de: 'Updates', pt: 'Atualizações', it: 'Aggiornamenti', nl: 'Updates', pl: 'Aktualizacje', ru: 'Обновления', tr: 'Güncellemeler', ar: 'التحديثات', ja: '更新', ko: '업데이트', zh: '更新', hi: 'अपडेट', id: 'Pembaruan', th: 'อัปเดต', vi: 'Cập nhật', uk: 'Оновлення', cs: 'Aktualizace', ro: 'Actualizări', sv: 'Uppdateringar' },
	faq: { en: 'FAQ', es: 'FAQ', fr: 'FAQ', de: 'FAQ', pt: 'FAQ', it: 'FAQ', nl: 'FAQ', pl: 'FAQ', ru: 'FAQ', tr: 'SSS', ar: 'الأسئلة', ja: 'FAQ', ko: 'FAQ', zh: '常见问题', hi: 'FAQ', id: 'FAQ', th: 'FAQ', vi: 'FAQ', uk: 'FAQ', cs: 'FAQ', ro: 'FAQ', sv: 'FAQ' },
	support: { en: 'Support', es: 'Soporte', fr: 'Support', de: 'Support', pt: 'Suporte', it: 'Supporto', nl: 'Support', pl: 'Wsparcie', ru: 'Поддержка', tr: 'Destek', ar: 'الدعم', ja: 'サポート', ko: '지원', zh: '支持', hi: 'सहायता', id: 'Dukungan', th: 'สนับสนุน', vi: 'Hỗ trợ', uk: 'Підтримка', cs: 'Podpora', ro: 'Suport', sv: 'Support' },
	reliable: { en: 'Reliable Cheats', es: 'Trucos indetectables', fr: 'Triches indétectables', de: 'Reliable Cheats', pt: 'Cheats indetectáveis', it: 'Cheat indetectable', nl: 'Reliable Cheats', pl: 'Cheaty reliable', ru: 'Reliable читы', tr: 'Reliable hileler', ar: 'غش reliable', ja: 'Reliableチート', ko: 'Reliable 치트', zh: 'Reliable作弊', hi: 'Reliable cheats', id: 'Cheat reliable', th: 'Cheats reliable', vi: 'Cheat reliable', uk: 'Reliable чіти', cs: 'Reliable cheaty', ro: 'Cheats reliable', sv: 'Reliable cheats' },
	wallhack: { en: 'Dota 2 Wallhack', es: 'Dota 2 Wallhack', fr: 'Dota 2 Wallhack', de: 'Dota 2 Wallhack', pt: 'Dota 2 Wallhack', it: 'Dota 2 Wallhack', nl: 'Dota 2 Wallhack', pl: 'Dota 2 Wallhack', ru: 'Dota 2 Wallhack', tr: 'Dota 2 Wallhack', ar: 'Dota 2 Wallhack', ja: 'Dota 2 Wallhack', ko: 'Dota 2 Wallhack', zh: 'Dota 2 Wallhack', hi: 'Dota 2 Wallhack', id: 'Dota 2 Wallhack', th: 'Dota 2 Wallhack', vi: 'Dota 2 Wallhack', uk: 'Dota 2 Wallhack', cs: 'Dota 2 Wallhack', ro: 'Dota 2 Wallhack', sv: 'Dota 2 Wallhack' },
	radar: { en: 'Radar Hack', es: 'Radar hack', fr: 'Radar hack', de: 'Radar Hack', pt: 'Radar hack', it: 'Radar hack', nl: 'Radar Hack', pl: 'Radar hack', ru: 'Radar hack', tr: 'Radar hack', ar: 'Radar hack', ja: 'Radar Hack', ko: 'Radar Hack', zh: 'Radar Hack', hi: 'Radar Hack', id: 'Radar hack', th: 'Radar Hack', vi: 'Radar hack', uk: 'Radar hack', cs: 'Radar Hack', ro: 'Radar hack', sv: 'Radar Hack' },
	vac: { en: 'VAC Bypass', es: 'Bypass VAC', fr: 'Bypass VAC', de: 'VAC Bypass', pt: 'Bypass VAC', it: 'Bypass VAC', nl: 'VAC Bypass', pl: 'Bypass VAC', ru: 'Bypass VAC', tr: 'VAC bypass', ar: 'Bypass VAC', ja: 'VAC Bypass', ko: 'VAC Bypass', zh: 'VAC Bypass', hi: 'VAC Bypass', id: 'Bypass VAC', th: 'VAC Bypass', vi: 'Bypass VAC', uk: 'Bypass VAC', cs: 'VAC Bypass', ro: 'Bypass VAC', sv: 'VAC Bypass' },
	'cheats-2026': { en: 'Dota 2 Cheats 2026', es: 'Trucos Dota 2 2026', fr: 'Triches Dota 2 2026', de: 'Dota 2 Cheats 2026', pt: 'Cheats Dota 2 2026', it: 'Cheat Dota 2 2026', nl: 'Dota 2 Cheats 2026', pl: 'Cheaty Dota 2 2026', ru: 'Читы Dota 2 2026', tr: 'Dota 2 Hileleri 2026', ar: 'غش Dota 2 2026', ja: 'Dota 2 Cheats 2026', ko: 'Dota 2 Cheats 2026', zh: 'Dota 2作弊 2026', hi: 'Dota 2 Cheats 2026', id: 'Cheat Dota 2 2026', th: 'Dota 2 Cheats 2026', vi: 'Cheat Dota 2 2026', uk: 'Чіти Dota 2 2026', cs: 'dota 2 cheaty 2026', ro: 'Cheats Dota 2 2026', sv: 'Dota 2 Cheats 2026' },
	hacks: { en: 'Dota 2 Cheats', es: 'Trucos Dota 2', fr: 'Triches Dota 2', de: 'Dota 2 Cheats', pt: 'Cheats Dota 2', it: 'Cheat Dota 2', nl: 'Dota 2 Cheats', pl: 'Cheaty Dota 2', ru: 'Читы Dota 2', tr: 'Dota 2 Hileleri', ar: 'غش Dota 2', ja: 'Dota 2 Cheats', ko: 'Dota 2 Cheats', zh: 'Dota 2作弊', hi: 'Dota 2 Cheats', id: 'Cheat Dota 2', th: 'Dota 2 Cheats', vi: 'Cheat Dota 2', uk: 'Чіти Dota 2', cs: 'dota 2 cheaty', ro: 'Cheats Dota 2', sv: 'Dota 2 Cheats' },
	'cheat-download': { en: 'Dota 2 Cheat Download', es: 'Descarga Dota 2 Cheats', fr: 'Téléchargement Dota 2 Cheats', de: 'Dota 2 Cheat Download', pt: 'Download Dota 2 Cheats', it: 'Download Dota 2 Cheats', nl: 'Dota 2 Cheat Download', pl: 'Pobieranie Dota 2 Cheats', ru: 'Скачать Dota 2 Cheats', tr: 'Dota 2 Hile İndir', ar: 'تحميل Dota 2 Cheats', ja: 'Dota 2 Cheat Download', ko: 'Dota 2 Cheat Download', zh: 'Dota 2作弊下载', hi: 'Dota 2 Cheat Download', id: 'Download Cheat Dota 2', th: 'ดาวน์โหลด Dota 2 Cheats', vi: 'Tải Cheat Dota 2', uk: 'Завантаження Dota 2 Cheats', cs: 'Stáhnout Dota 2 Cheats', ro: 'Descărcare Dota 2 Cheats', sv: 'Dota 2 Cheat Download' },
	'mod-menu': { en: 'Dota 2 Mod Menu', es: 'Menú mod Dota 2', fr: 'Menu mod Dota 2', de: 'Dota 2 Mod-Menü', pt: 'Menu mod Dota 2', it: 'Mod menu Dota 2', nl: 'Dota 2 Mod Menu', pl: 'Mod menu Dota 2', ru: 'Мод-меню Dota 2', tr: 'Dota 2 Mod Menü', ar: 'قائمة مود Dota 2', ja: 'Dota 2 Mod Menu', ko: 'Dota 2 모드 메뉴', zh: 'Dota 2修改菜单', hi: 'Dota 2 Mod Menu', id: 'Menu mod Dota 2', th: 'เมนูมอด Dota 2', vi: 'Mod menu Dota 2', uk: 'Мод-меню Dota 2', cs: 'Dota 2 mod menu', ro: 'Meniu mod Dota 2', sv: 'Dota 2 Mod-meny' },
	'soft-aim': { en: 'Dota 2 Soft Aim', es: 'Soft aim Dota 2', fr: 'Soft aim Dota 2', de: 'Dota 2 Soft Aim', pt: 'Soft aim Dota 2', it: 'Soft aim Dota 2', nl: 'Dota 2 Soft Aim', pl: 'Soft aim Dota 2', ru: 'Soft aim Dota 2', tr: 'Dota 2 Soft Aim', ar: 'Soft aim Dota 2', ja: 'Dota 2 Soft Aim', ko: 'Dota 2 Soft Aim', zh: 'Dota 2 Soft Aim', hi: 'Dota 2 Soft Aim', id: 'Soft aim Dota 2', th: 'Dota 2 Soft Aim', vi: 'Soft aim Dota 2', uk: 'Soft aim Dota 2', cs: 'Dota 2 Soft Aim', ro: 'Soft aim Dota 2', sv: 'Dota 2 Soft Aim' },
	'best-cheats': { en: 'Best Dota 2 Cheats', es: 'Mejores trucos Dota 2', fr: 'Meilleures triches Dota 2', de: 'Beste Dota 2 Cheats', pt: 'Melhores cheats Dota 2', it: 'Migliori cheat Dota 2', nl: 'Beste Dota 2 Cheats', pl: 'Najlepsze cheaty Dota 2', ru: 'Лучшие читы Dota 2', tr: 'En İyi Dota 2 Hileleri', ar: 'أفضل غش Dota 2', ja: '最強Dota 2チート', ko: '최고의 Dota 2 치트', zh: '最佳Dota 2作弊', hi: 'सर्वश्रेष्ठ Dota 2 Cheats', id: 'Cheat Dota 2 terbaik', th: 'Cheat Dota 2 ที่ดีที่สุด', vi: 'Cheat Dota 2 tốt nhất', uk: 'Найкращі чіти Dota 2', cs: 'Nejlepší dota 2 cheaty', ro: 'Cele mai bune cheats Dota 2', sv: 'Bästa Dota 2 Cheats' },
	'aimbot-hack': { en: 'Dota 2 Aimbot Hack', es: 'Hack aimbot Dota 2', fr: 'Hack aimbot Dota 2', de: 'Dota 2 Aimbot Hack', pt: 'Hack aimbot Dota 2', it: 'Hack aimbot Dota 2', nl: 'Dota 2 Aimbot Hack', pl: 'Hack aimbot Dota 2', ru: 'Хак aimbot Dota 2', tr: 'Dota 2 Aimbot Hilesi', ar: 'هاك Aimbot Dota 2', ja: 'Dota 2 Aimbot Hack', ko: 'Dota 2 에임봇 핵', zh: 'Dota 2自瞄外挂', hi: 'Dota 2 Aimbot Hack', id: 'Hack aimbot Dota 2', th: 'Hack Aimbot Dota 2', vi: 'Hack aimbot Dota 2', uk: 'Хак aimbot Dota 2', cs: 'Dota 2 Aimbot hack', ro: 'Hack aimbot Dota 2', sv: 'Dota 2 Aimbot Hack' },
	'esp-hack': { en: 'Dota 2 ESP Hack', es: 'Hack ESP Dota 2', fr: 'Hack ESP Dota 2', de: 'Dota 2 ESP Hack', pt: 'Hack ESP Dota 2', it: 'Hack ESP Dota 2', nl: 'Dota 2 ESP Hack', pl: 'Hack ESP Dota 2', ru: 'Хак ESP Dota 2', tr: 'Dota 2 ESP Hilesi', ar: 'هاك ESP Dota 2', ja: 'Dota 2 ESP Hack', ko: 'Dota 2 ESP 핵', zh: 'Dota 2 ESP外挂', hi: 'Dota 2 ESP Hack', id: 'Hack ESP Dota 2', th: 'Hack ESP Dota 2', vi: 'Hack ESP Dota 2', uk: 'Хак ESP Dota 2', cs: 'Dota 2 ESP hack', ro: 'Hack ESP Dota 2', sv: 'Dota 2 ESP Hack' },
	'unlock-all': { en: 'Dota 2 Unlock All', es: 'Unlock all Dota 2', fr: 'Unlock all Dota 2', de: 'Dota 2 Unlock All', pt: 'Unlock all Dota 2', it: 'Unlock all Dota 2', nl: 'Dota 2 Unlock All', pl: 'Unlock all Dota 2', ru: 'Unlock all Dota 2', tr: 'Dota 2 Unlock All', ar: 'Unlock all Dota 2', ja: 'Dota 2 Unlock All', ko: 'Dota 2 Unlock All', zh: 'Dota 2 Unlock All', hi: 'Dota 2 Unlock All', id: 'Unlock all Dota 2', th: 'Dota 2 Unlock All', vi: 'Unlock all Dota 2', uk: 'Unlock all Dota 2', cs: 'Dota 2 Unlock All', ro: 'Unlock all Dota 2', sv: 'Dota 2 Unlock All' },
};

export const CTA2_HREF = {
	'dota2-esp': '/dota2-cheats/',
	'dota2-aimbot': '/dota2-esp/',
	features: '/pricing/',
	pricing: '/setup/',
	setup: '/support/',
	updates: '/dota2-cheats/',
	faq: '/support/',
	support: '/setup/',
	reliable: '/dota2-cheats/',
	wallhack: '/dota2-esp/',
	radar: '/dota2-esp/',
	vac: '/updates/',
	'cheats-2026': '/dota2-cheats/',
	hacks: '/features/',
	'cheat-download': '/setup/',
	'mod-menu': '/features/',
	'soft-aim': '/dota2-aimbot/',
	'best-cheats': '/pricing/',
	'aimbot-hack': '/dota2-aimbot/',
	'esp-hack': '/dota2-esp/',
	'unlock-all': '/features/',
};

export function buildLegal(locale, pageKey, kind) {
	const p = phrases[locale];
	const titles = {
		privacy: { es: 'Política de privacidad', fr: 'Politique de confidentialité', de: 'Datenschutz', pt: 'Política de privacidade', it: 'Informativa privacy', nl: 'Privacybeleid', pl: 'Polityka prywatności', ru: 'Политика конфиденциальности', tr: 'Gizlilik politikası', ar: 'سياسة الخصوصية', ja: 'プライバシーポリシー', ko: '개인정보 처리방침', zh: '隐私政策', hi: 'गोपनीयता नीति', id: 'Kebijakan privasi', th: 'นโยบายความเป็นส่วนตัว', vi: 'Chính sách bảo mật', uk: 'Політика конфіденційності', cs: 'Zásady ochrany soukromí', ro: 'Politica de confidențialitate', sv: 'Integritetspolicy' },
		refund: { es: 'Política de reembolso', fr: 'Politique de remboursement', de: 'Rückerstattung', pt: 'Política de reembolso', it: 'Politica di rimborso', nl: 'Restitutiebeleid', pl: 'Polityka zwrotów', ru: 'Политика возврата', tr: 'İade politikası', ar: 'سياسة الاسترداد', ja: '返金ポリシー', ko: '환불 정책', zh: '退款政策', hi: 'रिफंड नीति', id: 'Kebijakan refund', th: 'นโยบายการคืนเงิน', vi: 'Chính sách hoàn tiền', uk: 'Політика повернення', cs: 'Zásady vrácení peněz', ro: 'Politica de rambursare', sv: 'Återbetalningspolicy' },
		terms: { es: 'Términos de uso', fr: 'Conditions d\'utilisation', de: 'Nutzungsbedingungen', pt: 'Termos de uso', it: 'Termini di utilizzo', nl: 'Gebruiksvoorwaarden', pl: 'Warunki użytkowania', ru: 'Условия использования', tr: 'Kullanım şartları', ar: 'شروط الاستخدام', ja: '利用規約', ko: '이용 약관', zh: '使用条款', hi: 'उपयोग की शर्तें', id: 'Syarat penggunaan', th: 'ข้อกำหนดการใช้งาน', vi: 'Điều khoản sử dụng', uk: 'Умови використання', cs: 'Podmínky použití', ro: 'Termeni de utilizare', sv: 'Användarvillkor' },
	};
	const h1 = titles[kind][locale] ?? (kind === 'privacy' ? 'Privacy Policy' : kind === 'refund' ? 'Refund Policy' : 'Terms of Use');
	const L = LEGAL_I18N[locale];
	const pageCopy = L?.[kind] ?? {};
	const h2 = pageCopy.h2 ?? ['Information we collect', 'How we use data', 'Your rights'];
	return {
		title: clampTitle(stripcheckoutFromMeta(`${h1} | Dota 2 Cheats`)),
		description: clampDesc(stripcheckoutFromMeta(`${h1} ${L?.descFor ?? 'for Dota 2 Cheats — ESP wallhack, Aimbot'}, ${p.win}.`)),
		h1,
		intro: p.s1(`${h1} ${L?.introTopic ?? 'for dota2cheat.com and Dota 2 licenses.'}`),
		imageAlt: 'Dota 2 Cheats',
		galleryTitle: 'Dota 2 Cheats',
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: L?.emailSupport ?? 'Email support',
		ctaSecondary:
			kind === 'privacy'
				? L?.readTerms ?? 'Read terms'
				: L?.readPrivacy ?? 'Read privacy',
		ctaSecondaryHref: kind === 'privacy' ? '/terms/' : '/privacy-policy/',
		sections: [
			section(
				h2[0],
				p.s1(L?.sec1p1 ?? 'Contact email, checkout order references, and basic site security data.'),
				kind === 'privacy'
					? L?.privacy?.sec1p2 ?? 'Payment details are processed by secure checkout — not stored on dota2cheat.com.'
					: p.s2(),
			),
			section(
				h2[1],
				p.s1(L?.privacy?.sec2p1 ?? 'Support responses, order resolution, and legal compliance when required.'),
				kind === 'terms'
					? L?.terms?.sec2p2 ?? 'Using cheats may violate Activision terms — you assume all ban risk.'
					: p.s3(),
			),
			section(h2[2], p.legal(), `${L?.emailLabel ?? 'Email:'} support@dota2cheat.com`),
		],
	};
}

/** Build all pages for a non-English locale. */
export function buildPagesForLocale(locale) {
	const pages = { home: buildHome(locale) };
	for (const [pageKey, names] of Object.entries(TOPIC_NAMES)) {
		pages[pageKey] = productPage(locale, pageKey, names[locale], CTA2_HREF[pageKey]);
	}
	for (const kind of ['privacy', 'refund', 'terms']) {
		pages[kind] = buildLegal(locale, kind, kind);
	}
	return pages;
}
