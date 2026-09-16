/** Localized FAQ question/answer text keyed by slug. */

import { FAQ_ACCURACY_FIXES } from './faq-accuracy-fixes.mjs';

const CORE_FAQ = {
	es: {
		'what-are-dota2-cheats': {
			q: '¿Qué es Dota 2 Cheats?',
			a: 'Dota 2 Cheats es un paquete de trucos para Dota 2 en PC Windows. Incluye ESP wallhack, radar 2D y asistencia de skillshot, con mantenimiento VAC y soporte de instalación.',
		},
		'are-dota2-cheats-reliable-in-2026': {
			q: '¿Se mantienen los trucos de Dota 2 en 2026?',
			a: 'Dota 2 Cheats se actualiza tras parches de VAC y del juego. Revisa la página de Estado antes de entrar en cola. Ningún cheat puede garantizar detección cero permanente.',
		},
		'solo-farmer-and-raider-sessions': {
			q: '¿Funciona en partidas ranked y casuales?',
			a: 'Sí. ESP, radar y skillshot assist están pensados para el flujo de partida de Dota 2: leer héroes enemigos, rastrear wards y runas, y mantener visión en líneas y objetivos.',
		},
		'esp-wallhack-radar-or-aimbot': {
			q: '¿Qué incluye: ESP, wallhack, radar o aimbot?',
			a: 'Dota 2 Cheats agrupa ESP wallhack, marcadores de wards, radar 2D y skillshot assist configurable en una licencia. Consulta Funciones para la lista completa.',
		},
		'how-are-licenses-delivered': {
			q: '¿Cómo se entregan las licencias?',
			a: 'Tras confirmar el pago, los datos de la licencia se entregan digitalmente en el checkout. El tiempo puede variar según el método de pago. Guarda la confirmación del pedido si contactas soporte.',
		},
		'where-to-check-updates': {
			q: '¿Dónde reviso actualizaciones tras un parche de Dota 2 o VAC?',
			a: 'Las notas de mantenimiento se publican en la página de Estado cuando un parche afecta al paquete. Es el lugar más rápido para confirmar si hay una nueva build.',
		},
		'how-to-contact-support': {
			q: '¿Cómo contacto soporte?',
			a: 'Usa la página de Soporte o escribe a support@dota2cheat.com. Incluye los datos del pedido y una descripción clara del problema de instalación.',
		},
		'what-is-a-dota2-wallhack': {
			q: '¿Qué es un wallhack de Dota 2?',
			a: 'Un wallhack de Dota 2 es un overlay ESP que muestra héroes enemigos a través del terreno y la niebla. Dota 2 Cheats incluye distancias, señales de habilidades y categorías configurables.',
		},
		'does-dota2-cheats-include-radar-hack': {
			q: '¿Dota 2 Cheats incluye radar hack?',
			a: 'Sí. Dota 2 Cheats incluye overlays de radar 2D que resaltan amenazas cercanas fuera de tu campo de visión, útil para ganks y rotaciones.',
		},
		'vac-anti-cheat-and-dota2-cheats': {
			q: '¿Cómo afecta VAC a los trucos de Dota 2?',
			a: 'VAC monitoriza Dota 2 en PC Windows. Dota 2 Cheats publica notas de mantenimiento tras parches que pueden requerir una nueva build. Revisa Estado antes de jugar.',
		},
		'buy-reliable-dota2-cheats-windows-pc': {
			q: '¿Puedo comprar trucos de Dota 2 para PC Windows?',
			a: 'Sí: Dota 2 Cheats vende licencias mensuales y de por vida para PC Windows con ESP, radar y skillshot assist en un solo paquete. Compara planes en la Tienda antes del checkout.',
		},
	},
	fr: {
		'what-are-dota2-cheats': {
			q: "Qu'est-ce que Dota 2 Cheats ?",
			a: "Dota 2 Cheats est un pack de triches pour Dota 2 sur PC Windows. Il inclut ESP wallhack, radar 2D et assistance skillshot, avec maintenance VAC et aide à l'installation.",
		},
		'are-dota2-cheats-reliable-in-2026': {
			q: 'Les triches Dota 2 sont-elles maintenues en 2026 ?',
			a: "Dota 2 Cheats est maintenu pour Dota 2 avec des rebuilds après les patchs VAC et du jeu. Consultez la page Statut avant de jouer. Aucune triche ne garantit une détection zéro permanente.",
		},
		'solo-farmer-and-raider-sessions': {
			q: 'Est-ce que ça fonctionne en ranked et en casual ?',
			a: "Oui. ESP, radar et skillshot assist sont conçus pour le flux de match Dota 2 — lire les héros ennemis, repérer les wards et runes, et garder la vision sur les lanes et objectifs.",
		},
		'esp-wallhack-radar-or-aimbot': {
			q: "Qu'est-ce qui est inclus — ESP, wallhack, radar ou aimbot ?",
			a: "Dota 2 Cheats regroupe ESP wallhack, marqueurs de wards, radar 2D et skillshot assist configurable dans une licence. Voir Fonctions pour la liste complète.",
		},
		'how-are-licenses-delivered': {
			q: 'Comment les licences sont-elles livrées ?',
			a: "Après confirmation du paiement, les détails de licence sont livrés numériquement via le checkout. Gardez la confirmation de commande si vous contactez le support.",
		},
		'where-to-check-updates': {
			q: 'Où vérifier les mises à jour après un patch Dota 2 ou VAC ?',
			a: "Les notes de maintenance sont publiées sur la page Statut quand un patch affecte le pack. C'est l'endroit le plus rapide pour confirmer une nouvelle build.",
		},
		'how-to-contact-support': {
			q: 'Comment contacter le support ?',
			a: "Utilisez la page Support ou écrivez à support@dota2cheat.com avec les détails de votre commande et une description claire du problème.",
		},
		'what-is-a-dota2-wallhack': {
			q: "Qu'est-ce qu'un wallhack Dota 2 ?",
			a: "Un wallhack Dota 2 est un overlay ESP qui affiche les héros ennemis à travers le terrain et le fog. Dota 2 Cheats inclut distances, signaux de capacités et catégories configurables.",
		},
		'does-dota2-cheats-include-radar-hack': {
			q: 'Dota 2 Cheats inclut-il un radar hack ?',
			a: "Oui. Dota 2 Cheats inclut des overlays radar 2D qui mettent en évidence les menaces proches hors de votre champ de vision.",
		},
		'vac-anti-cheat-and-dota2-cheats': {
			q: 'Comment VAC affecte-t-il les triches Dota 2 ?',
			a: "VAC surveille Dota 2 sur PC Windows. Dota 2 Cheats publie des notes de maintenance après les patchs. Consultez Statut avant de jouer.",
		},
		'buy-reliable-dota2-cheats-windows-pc': {
			q: 'Puis-je acheter des triches Dota 2 pour PC Windows ?',
			a: "Oui — Dota 2 Cheats vend des licences mensuelles et à vie pour PC Windows avec ESP, radar et skillshot assist. Comparez les formules sur la page Tarifs.",
		},
	},
	de: {
		'what-are-dota2-cheats': {
			q: 'Was ist Dota 2 Cheats?',
			a: 'Dota 2 Cheats ist ein Premium-Paket für Dota 2 auf Windows PC. Es enthält ESP Wallhack, 2D-Radar und Skillshot-Assist mit VAC-Wartung und Setup-Support.',
		},
		'are-dota2-cheats-reliable-in-2026': {
			q: 'Werden Dota 2 Cheats 2026 gewartet?',
			a: 'Dota 2 Cheats wird für Dota 2 mit Rebuilds nach VAC- und Spiel-Patches gewartet. Prüfe die Status-Seite vor dem Queueing. Kein Cheat kann dauerhafte Null-Erkennung garantieren.',
		},
		'solo-farmer-and-raider-sessions': {
			q: 'Funktioniert das in Ranked und Casual?',
			a: 'Ja. ESP, Radar und Skillshot-Assist sind für den Dota 2-Match-Flow gebaut — feindliche Helden lesen, Wards und Runen tracken und Vision auf Lanes und Objectives behalten.',
		},
		'esp-wallhack-radar-or-aimbot': {
			q: 'Was ist enthalten — ESP, Wallhack, Radar oder Aimbot?',
			a: 'Dota 2 Cheats bündelt ESP Wallhack, Ward-Marker, 2D-Radar und konfigurierbaren Skillshot-Assist in einer Lizenz. Siehe Features für die vollständige Liste.',
		},
		'how-are-licenses-delivered': {
			q: 'Wie werden Lizenzen geliefert?',
			a: 'Nach Zahlungsbestätigung werden Lizenzdetails digital über den Checkout geliefert. Bewahre die Bestellbestätigung für Support-Anfragen auf.',
		},
		'where-to-check-updates': {
			q: 'Wo prüfe ich Updates nach einem Dota 2- oder VAC-Patch?',
			a: 'Wartungshinweise erscheinen auf der Status-Seite, wenn ein Patch das Paket betrifft. Dort siehst du am schnellsten, ob ein neuer Build live ist.',
		},
		'how-to-contact-support': {
			q: 'Wie kontaktiere ich den Support?',
			a: 'Nutze die Support-Seite oder schreibe an support@dota2cheat.com mit Bestelldetails und einer klaren Problembeschreibung.',
		},
		'what-is-a-dota2-wallhack': {
			q: 'Was ist ein Dota 2 Wallhack?',
			a: 'Ein Dota 2 Wallhack ist ein ESP-Overlay, das feindliche Helden durch Terrain und Fog zeigt. Dota 2 Cheats enthält Distanzen, Ability-Hinweise und umschaltbare Kategorien.',
		},
		'does-dota2-cheats-include-radar-hack': {
			q: 'Enthält Dota 2 Cheats einen Radar Hack?',
			a: 'Ja. Dota 2 Cheats enthält 2D-Radar-Overlays für nahe Bedrohungen außerhalb deines Sichtfelds.',
		},
		'vac-anti-cheat-and-dota2-cheats': {
			q: 'Wie wirkt sich VAC auf Dota 2 Cheats aus?',
			a: 'VAC überwacht Dota 2 auf Windows PC. Dota 2 Cheats veröffentlicht Wartungshinweise nach Patches. Prüfe Status vor dem Spielen.',
		},
		'buy-reliable-dota2-cheats-windows-pc': {
			q: 'Kann ich Dota 2 Cheats für Windows PC kaufen?',
			a: 'Ja — Dota 2 Cheats verkauft Monats- und Lifetime-Lizenzen für Windows PC mit ESP, Radar und Skillshot-Assist. Vergleiche Pläne auf der Preisseite.',
		},
	},
};

export const FAQ_I18N = { ...CORE_FAQ };

/** Label swaps for locales generated from Spanish base. */
const FAQ_TEMPLATES = {
	pt: { status: 'Estado', features: 'Recursos', store: 'Loja', setup: 'Instalação', support: 'Suporte' },
	it: { status: 'Stato', features: 'Funzioni', store: 'Negozio', setup: 'Setup', support: 'Supporto' },
	nl: { status: 'Status', features: 'Functies', store: 'Winkel', setup: 'Setup', support: 'Support' },
	pl: { status: 'Status', features: 'Funkcje', store: 'Sklep', setup: 'Instalacja', support: 'Wsparcie' },
	ru: { status: 'Статус', features: 'Функции', store: 'Магазин', setup: 'Установка', support: 'Поддержка' },
	tr: { status: 'Durum', features: 'Özellikler', store: 'Mağaza', setup: 'Kurulum', support: 'Destek' },
	ar: { status: 'الحالة', features: 'الميزات', store: 'المتجر', setup: 'التثبيت', support: 'الدعم' },
	ja: { status: 'ステータス', features: '機能', store: 'ストア', setup: 'セットアップ', support: 'サポート' },
	ko: { status: '상태', features: '기능', store: '스토어', setup: '설치', support: '지원' },
	zh: { status: '状态', features: '功能', store: '商店', setup: '安装', support: '支持' },
	hi: { status: 'स्टेटस', features: 'फ़ीचर्स', store: 'स्टोर', setup: 'सेटअप', support: 'सहायता' },
	id: { status: 'Status', features: 'Fitur', store: 'Toko', setup: 'Setup', support: 'Dukungan' },
	th: { status: 'สถานะ', features: 'ฟีเจอร์', store: 'ร้านค้า', setup: 'ติดตั้ง', support: 'สนับสนุน' },
	vi: { status: 'Trạng thái', features: 'Tính năng', store: 'Cửa hàng', setup: 'Cài đặt', support: 'Hỗ trợ' },
	uk: { status: 'Статус', features: 'Функції', store: 'Магазин', setup: 'Встановлення', support: 'Підтримка' },
	cs: { status: 'Stav', features: 'Funkce', store: 'Obchod', setup: 'Instalace', support: 'Podpora' },
	ro: { status: 'Status', features: 'Funcții', store: 'Magazin', setup: 'Instalare', support: 'Suport' },
	sv: { status: 'Status', features: 'Funktioner', store: 'Butik', setup: 'Installation', support: 'Support' },
};

for (const [locale, labels] of Object.entries(FAQ_TEMPLATES)) {
	if (FAQ_I18N[locale]) continue;
	const base = FAQ_I18N.es;
	const items = {};
	for (const [slug, entry] of Object.entries(base)) {
		items[slug] = {
			q: entry.q
				.replace(/Estado/g, labels.status)
				.replace(/Funciones/g, labels.features)
				.replace(/Tienda/g, labels.store)
				.replace(/Instalación/g, labels.setup)
				.replace(/Soporte/g, labels.support),
			a: entry.a
				.replace(/página de Estado/g, labels.status)
				.replace(/Funciones/g, labels.features)
				.replace(/Tienda/g, labels.store)
				.replace(/Soporte/g, labels.support)
				.replace(/Estado/g, labels.status),
		};
	}
	FAQ_I18N[locale] = items;
}

/** Apply Dota 2-accurate FAQ copy over legacy terminology. */
for (const [locale, fixes] of Object.entries(FAQ_ACCURACY_FIXES)) {
	if (!FAQ_I18N[locale]) FAQ_I18N[locale] = {};
	Object.assign(FAQ_I18N[locale], fixes);
}

/** Build FAQ overlay for translation.json from English base + locale map. */
export function getFaqOverlay(locale, enFaqs) {
	const map = FAQ_I18N[locale];
	if (!map) return {};
	const items = {};
	for (const faq of enFaqs) {
		const t = map[faq.slug];
		if (t) items[faq.slug] = t;
	}
	return Object.keys(items).length ? { items } : {};
}
