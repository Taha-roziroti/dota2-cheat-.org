import type { LocaleCode } from './locales';

export type GalleryUi = {
	eyebrow: string;
	title: string;
	subtitle: string;
	lead: string;
	highlights: { title: string; copy: string }[];
	updatesLabel: string;
	updatesShort: string;
};

export const galleryUi: Record<LocaleCode, GalleryUi> = {
	en: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 Cheats gallery',
		subtitle: 'Simple dota 2 cheats visuals — ESP, wallhack, aimbot, and radar for Dota 2 on PC.',
		lead: 'Dota 2 Cheats helps you spot players, agents, abilities, and bomb sites with ESP, aimbot, and radar in one license.',
		highlights: [
			{ title: 'dota 2 cheats esp', copy: 'See players through walls with dota 2 cheats esp and wallhack overlays.' },
			{ title: 'dota 2 cheats radar', copy: 'Track nearby threats with dota 2 cheats radar before you push or rotate.' },
			{ title: 'dota 2 cheats aimbot', copy: 'Use soft aim and aimbot controls tuned for Dota 2 matches on Windows PC.' },
		],
		updatesLabel: 'dota 2 cheats updates',
		updatesShort: 'Updates',
	},
	es: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Galería Dota 2',
		subtitle: 'Visuales de Dota 2 con loadouts, peleas de equipo y combate match — junto a herramientas ESP, radar y Aimbot.',
		lead: 'Dota 2 Cheats está pensado para el loop competitivo de Dota 2: leer el mapa, rastrear escuadrones enemigos, weapon dropsear y ganar rondas.',
		highlights: [
			{ title: 'ESP de players y escuadrones', copy: 'Detecta players enemigos y contornos de equipo en mapas y loadout drop routes para elegir peleas con mejor información.' },
			{ title: 'Marcadores de weapon drops y cofres', copy: 'Resalta loadouts, cofres y weapon drops de alto nivel sin saturar la pantalla en plena partida.' },
			{ title: 'Controles Aimbot Dota 2', copy: 'Ajusta suavidad, prioridad de objetivo y teclas para AR, SMG y francotirador antes de comprar.' },
		],
		updatesLabel: 'Actualizaciones Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	fr: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Galerie Dota 2',
		subtitle: 'Visuels Dota 2 — loadouts, combats d\'équipe et match — avec ESP, radar et Aimbot.',
		lead: 'Dota 2 Cheats suit la boucle competitivo de Dota 2 : lire la carte, suivre les équipes, weapon drops et gagner les rounds.',
		highlights: [
			{ title: 'ESP players & équipes', copy: 'Repérez les players ennemis sur cartes et loadout drop routes pour choisir vos engagements.' },
			{ title: 'Marqueurs weapon drops & coffres', copy: 'Mettez en évidence loadouts, coffres et weapon drops haut niveau sans encombrer l\'écran.' },
			{ title: 'Réglages Aimbot Dota 2', copy: 'Ajustez fluidité, priorité cible et raccourcis pour AR, SMG et sniper.' },
		],
		updatesLabel: 'Mises à jour Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	de: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 Galerie',
		subtitle: 'Dota 2-Bilder zu Loadouts, Squad-Kämpfen und match — mit ESP, Radar und Aimbot.',
		lead: 'Dota 2 Cheats passt zur Raid-Schleife von Dota 2: Karte lesen, Gegner tracken, weapon dropsen und matches überleben.',
		highlights: [
			{ title: 'Player- & Squad-ESP', copy: 'Erkenne feindliche Playeren auf Karten und loadout drop routes für bessere Rotationsentscheidungen.' },
			{ title: 'Weapon drops- & Vertragsmarker', copy: 'Hebe Loadout-Drops, Verträge und High-Tier-Weapon drops hervor ohne Screen-Spam.' },
			{ title: 'Dota 2 Aimbot Steuerung', copy: 'Feinjustiere Glätte, Zielpriorität und Hotkeys für AR, SMG und Sniper.' },
		],
		updatesLabel: 'Dota 2 Cheats Updates',
		updatesShort: 'Updates',
	},
	pt: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Galeria Dota 2',
		subtitle: 'Visuais de Dota 2 com loadouts, combates de esquadrão e match — com ESP, radar e Aimbot.',
		lead: 'Dota 2 Cheats segue o loop BR do Dota 2: ler o mapa, rastrear equipes, weapon dropsar e sobreviver ao extract.',
		highlights: [
			{ title: 'ESP de players e equipes', copy: 'Detecte players inimigos em mappe e loadout drop routes para escolher lutas com melhor intel.' },
			{ title: 'Marcadores de weapon drops e cofres', copy: 'Destaque loadouts, cofres e weapon drops de alto nível sem poluir a tela.' },
			{ title: 'Controles Aimbot Dota 2', copy: 'Ajuste suavidade, prioridade de alvo e atalhos para AR, SMG e sniper.' },
		],
		updatesLabel: 'Atualizações Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	it: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Galleria Dota 2',
		subtitle: 'Immagini Dota 2 — loadout, scontri di squadra e match — con ESP, radar e Aimbot.',
		lead: 'Dota 2 Cheats è pensato per il loop BR di Dota 2: leggere la mappa, tracciare squadre nemiche, weapon drops e sopravvivere al extract.',
		highlights: [
			{ title: 'ESP playeri e squadre', copy: 'Individua playeri nemici su mappe e loadout drop routes per scegliere i fight con più intel.' },
			{ title: 'Marker weapon drops e coffreti', copy: 'Evidenzia loadout, coffreti e weapon drops di alto livello senza riempire lo schermo.' },
			{ title: 'Controlli Aimbot Dota 2', copy: 'Regola smoothness, priorità bersaglio e hotkey per AR, SMG e sniper.' },
		],
		updatesLabel: 'Aggiornamenti Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	nl: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 galerij',
		subtitle: 'Dota 2-beelden van loadouts, squadgevechten en match — met ESP, radar en Aimbot.',
		lead: 'Dota 2 Cheats volgt de match-loop va Dota 2: kaart lezen, vijandelijke squads volgen, jagen en buy stations overleven.',
		highlights: [
			{ title: 'Player- & squad-ESP', copy: 'Spot vijandelijke players op mappe en loadout drop routes voor betere rotatiebeslissingen.' },
			{ title: 'Weapon drops- & chestmarkers', copy: 'Markeer loadout-drops, chesten en high-tier weapon drops zonder schermoverlast.' },
			{ title: 'Dota 2 Aimbot instellingen', copy: 'Stel smoothness, doelprioriteit en hotkeys af voor AR, SMG en sniper.' },
		],
		updatesLabel: 'Dota 2 Cheats updates',
		updatesShort: 'Updates',
	},
	pl: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Galeria Dota 2',
		subtitle: 'Grafiki Dota 2 — loadouty, walki drużynowe i match — z ESP, radar i Aimbot.',
		lead: 'Dota 2 Cheats pasuje do pętli BR Dota 2: czytaj mapę, śledź wrogie drużyny, weapon dropsuj i przeżyj extract.',
		highlights: [
			{ title: 'ESP players i drużyn', copy: 'Wykrywaj wrogich players na mapy i loadout drop routes dla lepszych decyzji rotacyjnych.' },
			{ title: 'Markery weapon dropsu i skrzyń', copy: 'Podświetlaj loadouty, petity i wysokiej klasy weapon drops bez zaśmiecania ekranu.' },
			{ title: 'Sterowanie Aimbot Dota 2', copy: 'Dostosuj płynność, priorytet celu i skróty dla AR, SMG i snajperki.' },
		],
		updatesLabel: 'Aktualizacje Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	ru: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Галерея Dota 2',
		subtitle: 'Визуалы Dota 2 — лоадауты, бои отрядов и match — с ESP, радаром и Aimbot.',
		lead: 'Dota 2 Cheats создан для рейд-циклу Dota 2: читать карту, отслеживать вражеские отряды, лут и выживать в extract.',
		highlights: [
			{ title: 'ESP игроков и отрядов', copy: 'Замечайте вражеских игроков на карты и loadout drop routes для лучших решений по ротации.' },
			{ title: 'Маркеры лута и сундуков', copy: 'Подсвечивайте loadout, сундуки и высокий лут без перегрузки экрана.' },
			{ title: 'Настройки Aimbot Dota 2', copy: 'Настройте плавность, приоритет цели и горячие клавиши для AR, SMG и снайперки.' },
		],
		updatesLabel: 'Обновления Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	tr: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 galerisi',
		subtitle: 'Loadout, takım savaşları ve match görselleri — ESP, radar ve Aimbot ile.',
		lead: 'Dota 2 Cheats, Dota 2 BR döngüsü için: haritayı oku, düşman takımları izle, weapon drops al ve extract\'da hayatta kal.',
		highlights: [
			{ title: 'Player ve takım ESP', copy: 'haritalar ve loadout drop routes\'da düşman playerleri görerek daha iyi rotasyon kararları alın.' },
			{ title: 'Weapon drops ve kontrat işaretleri', copy: 'Loadout, kontrat ve üst seviye weapon drops\'u ekranı doldurmadan vurgulayın.' },
			{ title: 'Dota 2 Aimbot kontrolleri', copy: 'AR, SMG ve sniper için yumuşaklık, hedef önceliği ve kısayolları ayarlayın.' },
		],
		updatesLabel: 'Dota 2 Cheats güncellemeleri',
		updatesShort: 'Updates',
	},
	ar: {
		eyebrow: 'Dota 2 Cheats',
		title: 'معرض Dota 2',
		subtitle: 'صور Dota 2 — loadouts ومعارك الفرق وsession — مع ESP ورادار وAimbot.',
		lead: 'Dota 2 Cheats مبني لحلقة BR في Dota 2: قراءة الخريطة، تتبع الفرق، جمع اللوت والنجاة في extract.',
		highlights: [
			{ title: 'ESP للمشغلين والفرق', copy: 'اكتشف players المعادين على خرائط وloadout drop routes لاختيار القتالات بذكاء.' },
			{ title: 'علامات اللوت والصناديق', copy: 'أبرز loadouts والصناديق واللوت العالي دون ازدحام الشاشة.' },
			{ title: 'تحكم Aimbot Dota 2', copy: 'اضبط النعومة وأولوية الهدف والاختصارات للـ AR وSMG والقناص.' },
		],
		updatesLabel: 'تحديثات Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	ja: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 ギャラリー',
		subtitle: 'ロードアウト、スクワッド戦、BRコンバットのDota 2ビジュアル — ESP、レーダー、エイムボット付き。',
		lead: 'Dota 2 CheatsはDota 2のBRループ向け：マップを読み、敵スクワッドを追跡し、ルートしてextractを生き延びる。',
		highlights: [
			{ title: 'players＆スクワッドESP', copy: 'マップとloadout drop routesで敵playersを把握し、ローテ判断を改善。' },
			{ title: 'ルート＆チェストマーカー', copy: 'ロードアウト、チェスト、高ティアルートを画面を埋めずに表示。' },
			{ title: 'Dota 2エイムボット設定', copy: 'AR、SMG、スナイパー向けにスムーズさ、ターゲット優先度、ホットキーを調整。' },
		],
		updatesLabel: 'Dota 2 Cheats更新',
		updatesShort: 'Updates',
	},
	ko: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 갤러리',
		subtitle: '로드아웃, 스쿼드 전투, BR 컴뱃 Dota 2 비주얼 — ESP, 레이더, 에임봇 포함.',
		lead: 'Dota 2 Cheats는 Dota 2 survival loop용: 맵 읽기, 적 스쿼드 추적, 루트 수집, extract 생존.',
		highlights: [
			{ title: 'players & 스쿼드 ESP', copy: '맵과 loadout drop routes에서 적 players를 파악해 로테이션 결정을 개선.' },
			{ title: '루트 & 상자 마커', copy: '로드아웃, 상자, 고티어 루트를 화면을 가리지 않고 강조.' },
			{ title: 'Dota 2 에임봇 컨트롤', copy: 'AR, SMG, 스나이퍼용 부드러움, 타겟 우선순위, 단축키 조정.' },
		],
		updatesLabel: 'Dota 2 Cheats 업데이트',
		updatesShort: 'Updates',
	},
	zh: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 图库',
		subtitle: 'Dota 2 视觉 — 配装、小队战斗和大逃杀 — 配合 ESP、雷达和自瞄。',
		lead: 'Dota 2 Cheats 为 Dota 2 match loop设计：读图、追踪敌方小队、搜刮并在 base survival。',
		highlights: [
			{ title: 'players与小队 ESP', copy: '在 地图和 loadout drop routes 发现敌方players，做出更好的转点决策。' },
			{ title: '物资与宝箱标记', copy: '高亮配装、宝箱和高级物资，不遮挡屏幕。' },
			{ title: 'Dota 2 自瞄控制', copy: '调整 AR、SMG 和狙击的平滑度、目标优先级和热键。' },
		],
		updatesLabel: 'Dota 2 Cheats 更新',
		updatesShort: 'Updates',
	},
	hi: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 गैलरी',
		subtitle: 'Loadout, team fights और match visuals — ESP, radar और Aimbot के साथ।',
		lead: 'Dota 2 Cheats Dota 2 match loop के लिए: map पढ़ें, enemy squads track करें, weapon drops करें और base survival करें।',
		highlights: [
			{ title: 'Player & Squad ESP', copy: 'मैप और loadout drop routes पर enemy players spot करें बेहतर rotation decisions के लिए।' },
			{ title: 'Weapon drops & Chest Markers', copy: 'Loadout drops, chests और high-tier weapon drops highlight करें screen clutter के बिना।' },
			{ title: 'Dota 2 Aimbot Controls', copy: 'AR, SMG और sniper के लिए smoothness, target priority और hotkeys tune करें।' },
		],
		updatesLabel: 'Dota 2 Cheats updates',
		updatesShort: 'Updates',
	},
	id: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Galeri Dota 2',
		subtitle: 'Visual Dota 2 — loadout, pertempuran squad, dan match — dengan ESP, radar, dan Aimbot.',
		lead: 'Dota 2 Cheats untuk loop BR Dota 2: baca peta, lacak squad musuh, weapon drops, dan selamat di extract.',
		highlights: [
			{ title: 'ESP player & squad', copy: 'Deteksi player musuh di peta dan loadout drop routes untuk keputusan rotasi lebih baik.' },
			{ title: 'Marker weapon drops & peti', copy: 'Sorot loadout, peti, dan weapon drops tier tinggi tanpa membanjiri layar.' },
			{ title: 'Kontrol Aimbot Dota 2', copy: 'Atur smoothness, prioritas target, dan hotkey untuk AR, SMG, dan sniper.' },
		],
		updatesLabel: 'Update Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	th: {
		eyebrow: 'Dota 2 Cheats',
		title: 'แกลเลอรี Dota 2',
		subtitle: 'ภาพ Dota 2 — loadout การต่อสู้ทีม และ match — พร้อม ESP เรดาร์และ Aimbot',
		lead: 'Dota 2 Cheats สำหรับลูป BR ของ Dota 2: อ่านแผนที่ ติดตามทีมศัตรู เก็บ weapon drops และรอด extract',
		highlights: [
			{ title: 'ESP ผู้เล่นและทีม', copy: 'มองเห็นศัตรูบน แผนที่และ loadout drop routes เพื่อตัดสินใจหมุนเวียนได้ดีขึ้น' },
			{ title: 'มาร์กเกอร์ weapon drops และหีบ', copy: 'เน้น loadout หีบและ weapon drops ระดับสูงโดยไม่รกหน้าจอ' },
			{ title: 'ควบคุม Aimbot Dota 2', copy: 'ปรับความนุ่ม ลำดับเป้าหมาย และ hotkey สำหรับ AR SMG และ sniper' },
		],
		updatesLabel: 'อัปเดต Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	vi: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Thư viện Dota 2',
		subtitle: 'Hình ảnh Dota 2 — loadout, chiến đấu squad và match — với ESP, radar và Aimbot.',
		lead: 'Dota 2 Cheats cho vòng BR Dota 2: đọc bản đồ, theo dõi squad địch, weapon drops và sống sót extract.',
		highlights: [
			{ title: 'ESP player & squad', copy: 'Phát hiện player địch trên bản đồ và loadout drop routes để quyết định rotate tốt hơn.' },
			{ title: 'Đánh dấu weapon drops & rương', copy: 'Làm nổi bật loadout, rương và weapon drops cao cấp mà không che màn hình.' },
			{ title: 'Điều khiển Aimbot Dota 2', copy: 'Tinh chỉnh độ mượt, ưu tiên mục tiêu và phím tắt cho AR, SMG và sniper.' },
		],
		updatesLabel: 'Cập nhật Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	uk: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Галерея Dota 2',
		subtitle: 'Візуали Dota 2 — loadout, бої загонів і match — з ESP, радаром і Aimbot.',
		lead: 'Dota 2 Cheats для рейд-циклу Dota 2: читати карту, відстежувати ворожі загони, лут і виживати в extract.',
		highlights: [
			{ title: 'ESP гравців і загонів', copy: 'Помічайте ворожих гравців на Map і loadout drop routes для кращих ротацій.' },
			{ title: 'Маркери луту й скринь', copy: 'Підсвічуйте loadout, контракти та високий лут без перевантаження екрана.' },
			{ title: 'Налаштування Aimbot Dota 2', copy: 'Налаштуйте плавність, пріоритет цілі та гарячі клавіші для AR, SMG і снайперки.' },
		],
		updatesLabel: 'Оновлення Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	cs: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Galerie Dota 2',
		subtitle: 'Dota 2 vizuály — loadouty, squad souboje a match — s ESP, radarem a Aimbot.',
		lead: 'Dota 2 Cheats pro BR smyčku Dota 2: číst mapu, sledovat nepřátelské squady, weapon drops a přežít extract.',
		highlights: [
			{ title: 'ESP players a squadů', copy: 'Spozorujte nepřátelské operátory na mapy a loadout drop routes pro lepší rotační rozhodnutí.' },
			{ title: 'Markery weapon dropsu a petitů', copy: 'Zvýrazněte loadouty, petity a high-tier weapon drops bez přeplnění obrazovky.' },
			{ title: 'Ovládání Aimbot Dota 2', copy: 'Nastavte smoothness, prioritu cíle a hotkeys pro AR, SMG a sniper.' },
		],
		updatesLabel: 'Aktualizace Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	ro: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Galerie Dota 2',
		subtitle: 'Vizualuri Dota 2 — loadout, lupte de squad și match — cu ESP, radar și Aimbot.',
		lead: 'Dota 2 Cheats pentru bucla BR Dota 2: citește harta, urmărește squad-uri inamice, weapon drops și supraviețuiește extract.',
		highlights: [
			{ title: 'ESP playeri și squad-uri', copy: 'Detectează playeri inamici pe Map și loadout drop routes pentru decizii de rotație mai bune.' },
			{ title: 'Markere weapon drops și cheste', copy: 'Evidențiază loadout-uri, cheste și weapon drops de nivel înalt fără a aglomera ecranul.' },
			{ title: 'Controale Aimbot Dota 2', copy: 'Ajustează smoothness, prioritate țintă și hotkeys pentru AR, SMG și sniper.' },
		],
		updatesLabel: 'Actualizări Dota 2 Cheats',
		updatesShort: 'Updates',
	},
	sv: {
		eyebrow: 'Dota 2 Cheats',
		title: 'Dota 2 galleri',
		subtitle: 'Dota 2-bilder — loadouts, squadstrider och match — med ESP, radar och Aimbot.',
		lead: 'Dota 2 Cheats för Dota 2:s match-loop: läs kartan, spåra fiendesquads, weapon dropsa och överlev extract.',
		highlights: [
			{ title: 'Player- & squad-ESP', copy: 'Spotta fiendeplayerer på kartor och loadout drop routes för bättre rotationsbeslut.' },
			{ title: 'Weapon drops- & petitsmarkörer', copy: 'Markera loadout-drops, petit och high-tier weapon drops utan skärmklutter.' },
			{ title: 'Dota 2 Aimbot-kontroller', copy: 'Justera smoothness, målprioritet och snabbtangenter för AR, SMG och sniper.' },
		],
		updatesLabel: 'Dota 2 Cheats uppdateringar',
		updatesShort: 'Updates',
	},
};

export function getGalleryUi(locale: LocaleCode): GalleryUi {
	return galleryUi[locale];
}
