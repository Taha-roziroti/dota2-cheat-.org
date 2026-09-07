#!/usr/bin/env node
/**
 * Generates src/data/guides/guides.generated.ts — one dedicated guide per external URL.
 * Run: node scripts/generate-guides.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'src', 'data', 'guides', 'guides.generated.ts');
const URL_LIST = path.join(__dirname, 'guide-urls.raw.txt');

const RAW_URLS = (await readFile(URL_LIST, 'utf8')).trim().split(/\s+/);

const ANCHOR_TEXTS = [
	'this resource',
	'more game information',
	'additional guides',
	'related resources',
];

/** IGN-hosted images per game (assets-prd.ignimgs.com, sm.ign.com, assets2.ignimgs.com). */
const IGN_IMAGES = {
	'ARC Raiders': 'https://assets-prd.ignimgs.com/2021/12/15/arc-raiders-button-01-1639552157827.jpg',
	'Genshin Impact': 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg',
	'Dead by Daylight': 'https://assets-prd.ignimgs.com/2024/05/14/dead-by-daylight-button-replacement-1715713276872.jpg',
	'Escape from Tarkov': 'https://assets-prd.ignimgs.com/2021/12/07/escapefromtarkov-1638898094839.jpg',
	Unturned: 'https://assets-prd.ignimgs.com/2020/12/10/unturned-button-fin-1607643147558.jpg',
	'War Thunder': 'https://assets-prd.ignimgs.com/2021/12/20/warthunder-1640044666858.jpg',
	Fortnite: 'https://assets-prd.ignimgs.com/2025/04/02/nintendoswitch2-fortnite-keyart-square-1743635675429.jpg',
	Marathon: 'https://assets-prd.ignimgs.com/2023/05/24/marathon-announce-key-art-1x1-1684967675071.jpg',
	Battlefield: 'https://assets-prd.ignimgs.com/2024/03/20/battlefields7-1710977997041.jpg',
	'League of Legends': 'https://assets-prd.ignimgs.com/2021/12/14/leagueoflegends-1639513774570.jpg',
	Valorant: 'https://assets-prd.ignimgs.com/2020/06/05/valorant-button-replacement-1591394776227.jpg',
	'Call of Duty: Warzone': 'https://assets-prd.ignimgs.com/2021/12/21/warzone-1640045685890.jpg',
	'Gray Zone Warfare': 'https://assets-prd.ignimgs.com/2023/11/30/gray-zone-warfare-button-1701383116349.jpg',
	'Overwatch 2': 'https://assets-prd.ignimgs.com/2026/03/11/overwatch-1773211203379.jpg',
	'The Isle': 'https://assets-prd.ignimgs.com/2023/09/12/library-600x900-1694540297721.jpg',
	'The Finals': 'https://assets-prd.ignimgs.com/2022/08/23/the-finals-button-01-1661293340151.jpg',
	DayZ: 'https://ps3media.ign.com/ps3/image/object/133/133826/PC_MAX_DAYZTEMP.jpg',
	'Marvel Rivals': 'https://assets-prd.ignimgs.com/2024/03/27/marvelrivals-1711557092104.jpg',
	'Mecha BREAK': 'https://assets-prd.ignimgs.com/2023/12/08/mechabreak-1701997906808.jpg',
	Rust: 'https://assets-prd.ignimgs.com/2021/12/07/rust-1638841834256.png',
	Palworld: 'https://assets-prd.ignimgs.com/2024/01/19/palworld-1705691572614.jpg',
	'Rainbow Six Siege': 'https://assets-prd.ignimgs.com/2025/06/30/siegex-1751319986948.jpg',
	Caliber: 'https://assets-prd.ignimgs.com/2023/04/06/caliber-1680811698787.jpg',
	'Hunt: Showdown': 'https://assets-prd.ignimgs.com/2024/08/28/hunt-showdown-1896-button-1724846899827.jpg',
	'Destiny 2': 'https://assets-prd.ignimgs.com/2025/03/12/destiny2heresy-1741800139522.jpg',
	Squad: 'https://assets2.ignimgs.com/2015/12/17/squad-buttonjpg-19bbc6.jpg',
	'Sand Raiders': 'https://assets-prd.ignimgs.com/2026/01/09/sand-raiders-of-sophie-button-1767971628115.jpg',
	'Arena Breakout Infinite': 'https://assets-prd.ignimgs.com/2024/04/17/infinite-button-1713363504862.jpg',
	Bodycam: 'https://assets-prd.ignimgs.com/2024/01/21/untitled-1-1705872632310.jpg',
	'Once Human': 'https://assets-prd.ignimgs.com/2022/06/13/once-human-button-22-1655151627567.jpg',
	'Arma Reforger': 'https://assets-prd.ignimgs.com/2022/05/17/arma-reforger-button-1652812465455.jpg',
	Backrooms: 'https://assets-prd.ignimgs.com/2024/02/13/backrooms-1707864765589.jpg',
	'ARK: Survival Ascended': 'https://assets-prd.ignimgs.com/2023/04/01/arkascended-1680312404931.jpg',
	'ARK: Survival Evolved': 'https://assets-prd.ignimgs.com/2021/12/15/ark-survival-evolved-button-fin-1639607697385.jpg',
	Deadside: 'https://assets-prd.ignimgs.com/2022/11/16/deadside-1668635482936.jpg',
	'The Front': 'https://assets-prd.ignimgs.com/2023/02/27/thefront-1677525834490.jpg',
	'Lost Ark': 'https://assets2.ignimgs.com/2014/11/15/lostark-buttonjpg-bc185d.jpg',
	Warframe: 'https://assets1.ignimgs.com/2019/02/22/warframe---button-1550875935085.jpg',
	'Naraka: Bladepoint': 'https://assets1.ignimgs.com/2019/12/13/naraka---button-00-1576208838937.jpg',
	Minecraft: 'https://assets-prd.ignimgs.com/2021/12/14/minecraft-1639513933156.jpg',
	'Path of Exile': 'https://assets1.ignimgs.com/2017/08/24/path-of-exile---button-1503612705551.jpg',
	Raft: 'https://assets-prd.ignimgs.com/2022/07/29/raftfinal-1659126121018.jpg',
	'Sea of Thieves': 'https://assets-prd.ignimgs.com/2026/06/09/sot-customthieves-1781027869323.jpg',
	'Delta Force': 'https://assets-prd.ignimgs.com/2024/08/28/delta-force-button-replacement-1724855313566.jpg',
	'Dune: Awakening': 'https://assets-prd.ignimgs.com/2024/08/21/duneawak-1724235247826.jpg',
	'Wuthering Waves': 'https://assets-prd.ignimgs.com/2024/11/20/wutheringwaves-1732060928478.jpg',
	'Combat Master': 'https://assets-prd.ignimgs.com/2023/09/03/combatmaster-1693783237844.jpg',
	Foxhole: 'https://assets-prd.ignimgs.com/2023/10/31/foxhole-1698766398992.jpg',
	Exoborne: 'https://assets-prd.ignimgs.com/2023/12/08/exoborne-1702005698486.jpg',
	'NBA 2K26': 'https://assets-prd.ignimgs.com/2025/07/09/nba-2k26-button-replacement-1752079432392.jpg',
	'Team Fortress 2': 'https://assets-prd.ignimgs.com/2022/01/26/team-fortress-2-button-1643168687556.jpg',
	Enlisted: 'https://assets-prd.ignimgs.com/2021/04/09/enlisted-button-fin-1617993248241.jpg',
	SCUM: 'https://assets-prd.ignimgs.com/2022/10/08/scum-1665249692342.jpg',
	Grounded: 'https://assets-prd.ignimgs.com/2024/04/01/grounded-replacement-button-1712013698268.jpg',
	'Dota 2': 'https://assets-prd.ignimgs.com/2021/12/07/dota-2-1638917128883.jpg',
	'Civilization VI': 'https://assets-prd.ignimgs.com/2021/12/14/civ6-1639520169673.jpg',
	'Call of Duty': 'https://assets-prd.ignimgs.com/2022/03/14/cod-1647224857106.jpg',
};

const GAME_PROFILES = {
	'ARC Raiders': {
		genre: 'extraction shooter',
		setting: 'collapsing industrial zones and rival salvage crews',
		mechanics: ['weapon drops extraction windows', 'PvPvE patrol routes', 'gear durability'],
		antiCheat: 'kernel-level anti-cheat with frequent signature sweeps',
	},
	'Genshin Impact': {
		genre: 'action RPG',
		setting: 'Teyvat open world with elemental combat puzzles',
		mechanics: ['elemental reactions', 'domain rotations', 'world boss timers'],
		antiCheat: 'server-side validation and client integrity checks',
	},
	'Dead by Daylight': {
		genre: 'asymmetric horror',
		setting: 'trial maps with generators, hooks, and chase loops',
		mechanics: ['generator pacing', 'chase mindgames', 'perk synergies'],
		antiCheat: 'Easy Anti-Cheat with post-match replay review',
	},
	'Escape from Tarkov': {
		genre: 'hardcore extraction FPS',
		setting: 'Raid maps with Scav AI, PMC squads, and high-stakes weapon drops',
		mechanics: ['ammo types and armor classes', 'insurance and hideout', 'flea market economy'],
		antiCheat: 'BattlEye with manual ban waves after patches',
	},
	Unturned: {
		genre: 'survival sandbox',
		setting: 'zombie-infested maps with base building and PvP zones',
		mechanics: ['resource farming', 'base raids', 'vehicle logistics'],
		antiCheat: 'VAC-enabled servers with admin tooling',
	},
	'War Thunder': {
		genre: 'combined-arms simulator',
		setting: 'WWII and modern vehicle battles across air, ground, and sea',
		mechanics: ['line-of-sight spotting', 'armor weak spots', 'BR matchmaking'],
		antiCheat: 'server-side ballistics with client tamper detection',
	},
	Fortnite: {
		genre: 'battle royale builder',
		setting: '100-player island drops with storm circles and build fights',
		mechanics: ['piece control', 'edit plays', 'loadout rotations'],
		antiCheat: 'Easy Anti-Cheat plus kernel driver on PC',
	},
	Marathon: {
		genre: 'extraction shooter',
		setting: 'mysterious off-world colony runs with runner classes',
		mechanics: ['runner builds', 'contract routing', 'extraction timing'],
		antiCheat: 'planned live-service anti-cheat at launch',
	},
	Battlefield: {
		genre: 'large-scale FPS',
		setting: '64v128-player zones with vehicles and destruction',
		mechanics: ['class gadgets', 'capture point flow', 'vehicle weak points'],
		antiCheat: 'Javelin anti-cheat with kernel components',
	},
	'League of Legends': {
		genre: 'MOBA',
		setting: 'Summoners Rift with five roles and objective timers',
		mechanics: ['wave management', 'vision control', 'teamfight positioning'],
		antiCheat: 'Vanguard kernel driver on PC',
	},
	Valorant: {
		genre: 'tactical FPS',
		setting: '5v5 rounds with agent abilities and spike plants',
		mechanics: ['crosshair placement', 'ability combos', 'economy rounds'],
		antiCheat: 'Vanguard kernel driver running at boot',
	},
	'Call of Duty: Warzone': {
		genre: 'battle royale',
		setting: 'Verdansk, Rebirth, and Urzikstan drops with loadout customisation',
		mechanics: ['loadout metas', 'buy stations', 'gulag resets'],
		antiCheat: 'Ricochet anti-cheat with kernel-level monitoring',
	},
	'Gray Zone Warfare': {
		genre: 'open-world tactical FPS',
		setting: 'Lamang Island with faction missions and realistic ballistics',
		mechanics: ['extraction contracts', 'NVG night raids', 'squad comms'],
		antiCheat: 'Easy Anti-Cheat with frequent integrity updates',
	},
	'Overwatch 2': {
		genre: 'agent shooter',
		setting: '5v5 role-queue matches with ultimate combos',
		mechanics: ['cooldown tracking', 'ultimate economy', 'map control'],
		antiCheat: 'Defense Matrix with machine-learning detection',
	},
	'The Isle': {
		genre: 'dinosaur survival',
		setting: 'open island growth cycles with carnivore and herbivore paths',
		mechanics: ['nest spawning', 'pack hunting', 'growth stages'],
		antiCheat: 'EAC on official servers with admin logs',
	},
	'The Finals': {
		genre: 'destruction-based FPS',
		setting: 'game-show arenas with cash-out objectives',
		mechanics: ['environmental destruction', 'team cash-outs', 'gadget combos'],
		antiCheat: 'Easy Anti-Cheat with rebuilds after patches',
	},
	DayZ: {
		genre: 'hardcore survival',
		setting: 'Chernarus wilderness with infected, players, and base raids',
		mechanics: ['infection management', 'base building', 'coastal spawns'],
		antiCheat: 'BattlEye with server-side script limits',
	},
	'Marvel Rivals': {
		genre: 'agent shooter',
		setting: 'Marvel roster 6v6 team fights with ultimate chains',
		mechanics: ['role synergy', 'ultimate combos', 'map verticality'],
		antiCheat: 'NetEase anti-cheat with kernel module',
	},
	'Mecha BREAK': {
		genre: 'mecha agent shooter',
		setting: 'stylised mech arenas with ability cooldown duels',
		mechanics: ['mech loadouts', 'dash trades', 'ultimate timing'],
		antiCheat: 'kernel anti-cheat at launch',
	},
	Rust: {
		genre: 'survival sandbox',
		setting: 'wipe cycles with monuments, raids, and helicopter events',
		mechanics: ['raid timing', 'recycler routes', 'electricity traps'],
		antiCheat: 'Easy Anti-Cheat with server-side validation',
	},
	Palworld: {
		genre: 'creature survival',
		setting: 'Palpagos Island with base building and Pal teams',
		mechanics: ['Pal breeding', 'base raids', 'dungeon clears'],
		antiCheat: 'Easy Anti-Cheat on official servers',
	},
	'Rainbow Six Siege': {
		genre: 'tactical FPS',
		setting: 'destructible ranked sites with operator gadgets',
		mechanics: ['reinforcement setups', 'drone clears', 'clutch rounds'],
		antiCheat: 'BattlEye with replay review on reports',
	},
	Caliber: {
		genre: 'tactical third-person shooter',
		setting: 'squad-based PvPvE missions with class roles',
		mechanics: ['operator abilities', 'mission routing', 'cover trades'],
		antiCheat: 'proprietary anti-cheat with server checks',
	},
	'Hunt: Showdown': {
		genre: 'extraction bounty hunter',
		setting: 'Louisiana bayou with boss bounties and rival hunters',
		mechanics: ['sound traps', 'boss burn timing', 'extract ambushes'],
		antiCheat: 'Easy Anti-Cheat with manual review',
	},
	'Destiny 2': {
		genre: 'weapon dropser shooter MMO',
		setting: 'strikes, raids, and Crucible PvP with buildcrafting',
		mechanics: ['build synergies', 'champion mods', 'DPS phases'],
		antiCheat: 'BattlEye on PC with activity restrictions',
	},
	Squad: {
		genre: 'military tactical FPS',
		setting: '50v50 combined-arms with logistics and comms',
		mechanics: ['FOB placement', 'squad comms', 'vehicle logistics'],
		antiCheat: 'Easy Anti-Cheat on official servers',
	},
	'Sand Raiders': {
		genre: 'action adventure',
		setting: 'desert ruins with traversal puzzles and combat arenas',
		mechanics: ['combo routes', 'gear unlocks', 'boss patterns'],
		antiCheat: 'standard PC anti-cheat at launch',
	},
	'Arena Breakout Infinite': {
		genre: 'tactical extraction FPS',
		setting: 'high-fidelity raids with gear fear and insurance',
		mechanics: ['ammo types', 'insurance returns', 'market flipping'],
		antiCheat: 'ACE anti-cheat with kernel module',
	},
	Bodycam: {
		genre: 'realistic FPS',
		setting: 'body-worn camera perspective raids with lethal TTK',
		mechanics: ['peek timing', 'room clearing', 'recoil control'],
		antiCheat: 'Easy Anti-Cheat on multiplayer',
	},
	'Once Human': {
		genre: 'survival sandbox',
		setting: 'post-apocalyptic zones with deviants and base building',
		mechanics: ['territory control', 'deviant capture', 'season wipes'],
		antiCheat: 'NetEase anti-cheat stack',
	},
	'Arma Reforger': {
		genre: 'military sandbox',
		setting: 'Cold War Everon with combined arms and Game Master',
		mechanics: ['radio comms', 'vehicle convoys', 'sector control'],
		antiCheat: 'BattlEye with mod restrictions',
	},
	Backrooms: {
		genre: 'horror exploration',
		setting: 'liminal maze levels with entity evasion',
		mechanics: ['level routing', 'entity sound cues', 'team extraction'],
		antiCheat: 'lightweight server validation',
	},
	'ARK: Survival Ascended': {
		genre: 'survival action',
		setting: 'remastered ARK island maps with cross-platform tribes',
		mechanics: ['dino taming routes', 'base raid timing', 'boss summoning'],
		antiCheat: 'BattlEye with mod restrictions on official servers',
	},
	'ARK: Survival Evolved': {
		genre: 'survival action',
		setting: 'prehistoric island maps with tribe wars and boss arenas',
		mechanics: ['taming efficiency', 'breeding lines', 'cave artifact runs'],
		antiCheat: 'BattlEye with server-side validation',
	},
	Deadside: {
		genre: 'hardcore survival shooter',
		setting: 'post-apocalyptic open world with loot routes and base raids',
		mechanics: ['loot pathing', 'base defense', 'vehicle scouting'],
		antiCheat: 'Easy Anti-Cheat on official servers',
	},
	'The Front': {
		genre: 'survival sandbox shooter',
		setting: 'alternate-history frontier with base building and faction wars',
		mechanics: ['base blueprints', 'faction territory', 'vehicle convoys'],
		antiCheat: 'BattlEye with periodic integrity scans',
	},
	'Lost Ark': {
		genre: 'action MMORPG',
		setting: 'Arkesia continents with raids, islands, and Guardian hunts',
		mechanics: ['class engravings', 'raid mechanics', 'island daily routes'],
		antiCheat: 'Easy Anti-Cheat with server-side checks',
	},
	Warframe: {
		genre: 'co-op looter shooter',
		setting: 'Origin System missions with Warframe builds and open worlds',
		mechanics: ['mod polarities', 'ability duration', 'steel path scaling'],
		antiCheat: 'client integrity checks with trade restrictions',
	},
	'Naraka: Bladepoint': {
		genre: 'melee battle royale',
		setting: 'Morai arenas with weapon swaps and soul jade builds',
		mechanics: ['parry timing', 'grapple mobility', 'ultimate combos'],
		antiCheat: 'NetEase anti-cheat with replay review',
	},
	Minecraft: {
		genre: 'sandbox survival',
		setting: 'procedurally generated biomes with crafting and redstone builds',
		mechanics: ['mob farms', 'enchantment setups', 'nether routing'],
		antiCheat: 'server-side plugins on multiplayer realms',
	},
	'Path of Exile': {
		genre: 'action RPG',
		setting: 'Wraeclast leagues with skill gems and atlas mapping',
		mechanics: ['passive tree paths', 'currency crafting', 'boss invulnerability phases'],
		antiCheat: 'server-authoritative combat with trade monitoring',
	},
	Raft: {
		genre: 'co-op survival',
		setting: 'open ocean raft expansion with story islands',
		mechanics: ['resource hooks', 'island routing', 'shark bait timing'],
		antiCheat: 'lightweight validation on hosted sessions',
	},
	'Sea of Thieves': {
		genre: 'shared-world adventure',
		setting: 'pirate seas with voyages, forts, and rival crews',
		mechanics: ['ship repair loops', 'chain-shot angles', 'fort key routes'],
		antiCheat: 'kernel anti-cheat with report review',
	},
	'Delta Force': {
		genre: 'tactical military FPS',
		setting: 'large-scale operations with vehicles and extraction modes',
		mechanics: ['operator gadgets', 'armored pushes', 'extraction timing'],
		antiCheat: 'ACE anti-cheat with kernel module',
	},
	'Dune: Awakening': {
		genre: 'survival MMO',
		setting: 'Arrakis deserts with spice harvesting and faction conflict',
		mechanics: ['spice refinery runs', 'still suit upkeep', 'sandworm evasion'],
		antiCheat: 'Funcom anti-cheat stack at launch',
	},
	'Wuthering Waves': {
		genre: 'action RPG',
		setting: 'Huanglong open world with echo abilities and tower climbs',
		mechanics: ['resonator synergies', 'echo farming', 'parry counters'],
		antiCheat: 'server-side validation with client checks',
	},
	'Combat Master': {
		genre: 'fast-paced FPS',
		setting: 'mobile-style arenas with slide chains and loadout perks',
		mechanics: ['movement tech', 'loadout perk stacks', 'ranked map pools'],
		antiCheat: 'Easy Anti-Cheat on PC client',
	},
	Foxhole: {
		genre: 'persistent war MMO',
		setting: 'faction-wide fronts with logistics and player-driven offensives',
		mechanics: ['logi convoys', 'refinery timing', 'hex push coordination'],
		antiCheat: 'server-side rules with admin tooling',
	},
	Exoborne: {
		genre: 'extraction shooter',
		setting: 'storm-ravaged Earth with gravity anomalies and squad extractions',
		mechanics: ['storm timing', 'gear insurance', 'vertical grapple routes'],
		antiCheat: 'planned live-service anti-cheat at launch',
	},
	'NBA 2K26': {
		genre: 'sports simulation',
		setting: 'MyCareer, Park, and competitive Pro-Am leagues',
		mechanics: ['badge builds', 'shooting tempo', 'defensive positioning'],
		antiCheat: '2K anti-cheat with online validation',
	},
	'Team Fortress 2': {
		genre: 'class-based shooter',
		setting: 'payload, control point, and Mann vs Machine modes',
		mechanics: ['class counters', 'uber timing', 'rocket jump routes'],
		antiCheat: 'VAC with community server plugins',
	},
	Enlisted: {
		genre: 'squad-based WWII shooter',
		setting: 'historical battles with infantry squads and vehicles',
		mechanics: ['squad orders', 'vehicle spawns', 'capture point flanks'],
		antiCheat: 'Easy Anti-Cheat with server checks',
	},
	SCUM: {
		genre: 'hardcore survival',
		setting: 'open-world prison island with metabolism and base raids',
		mechanics: ['metabolism tuning', 'base raid prep', 'vehicle maintenance'],
		antiCheat: 'Easy Anti-Cheat on official servers',
	},
	Grounded: {
		genre: 'co-op survival',
		setting: 'backyard scale maps with insect threats and base building',
		mechanics: ['armor tiers', 'base defense layouts', 'boss weak points'],
		antiCheat: 'Easy Anti-Cheat on multiplayer',
	},
	'Dota 2': {
		genre: 'MOBA',
		setting: 'Ancient Defense with five roles and item timings',
		mechanics: ['lane equilibrium', 'Roshan control', 'vision wards'],
		antiCheat: 'VAC with overwatch review',
	},
	'Civilization VI': {
		genre: 'turn-based strategy',
		setting: 'historical empires from ancient era to information age',
		mechanics: ['district adjacency', 'tech/civic paths', 'diplomatic victory routes'],
		antiCheat: 'server-side validation in ranked multiplayer',
	},
	'Call of Duty': {
		genre: 'arcade military FPS',
		setting: 'multiplayer playlists across modern and classic CoD maps',
		mechanics: ['loadout tuning', 'movement tech', 'scorestreak timing'],
		antiCheat: 'Ricochet anti-cheat with kernel-level monitoring',
	},
};

function normalizeUrl(raw) {
	return raw.trim().replace(/^http:/i, 'https:').replace(/\/$/, '');
}

function hostname(url) {
	return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
}

function classifyGame(host) {
	const h = host;
	if (h.includes('arkascended')) return 'ARK: Survival Ascended';
	if (h.includes('arkcheat')) return 'ARK: Survival Evolved';
	if (h.includes('arcraider')) return 'ARC Raiders';
	if (h.includes('genshin')) return 'Genshin Impact';
	if (h.includes('dbd')) return 'Dead by Daylight';
	if (h.includes('cheatsfortarkov') || h.includes('tarkov') || h.includes('eft')) return 'Escape from Tarkov';
	if (h.includes('unturned')) return 'Unturned';
	if (h.includes('warthunder')) return 'War Thunder';
	if (h.includes('fortnite') || h === 'fncheats.net' || h === 'fncheat.com') return 'Fortnite';
	if (h.includes('marathon')) return 'Marathon';
	if (h.includes('battlefield')) return 'Battlefield';
	if (h.includes('lol')) return 'League of Legends';
	if (h.includes('valorant') || h.includes('valo')) return 'Valorant';
	if (h.includes('warzone')) return 'Call of Duty: Warzone';
	if (h.includes('codhack') || h.includes('codcheat')) return 'Call of Duty';
	if (h.includes('grayzone')) return 'Gray Zone Warfare';
	if (h.includes('overwatch')) return 'Overwatch 2';
	if (h.includes('theisle') || h.includes('islecheat')) return 'The Isle';
	if (h.includes('thefinal')) return 'The Finals';
	if (h.includes('dayz')) return 'DayZ';
	if (h.includes('marvelrival') || h.includes('rivalshack') || h.includes('rivalscheat')) return 'Marvel Rivals';
	if (h.includes('mecca') || h.includes('meccha')) return 'Mecha BREAK';
	if (h.includes('rust')) return 'Rust';
	if (h.includes('palworld')) return 'Palworld';
	if (h.includes('r6') || h.includes('siege')) return 'Rainbow Six Siege';
	if (h.includes('caliber')) return 'Caliber';
	if (h.includes('hunt')) return 'Hunt: Showdown';
	if (h.includes('destiny')) return 'Destiny 2';
	if (h.includes('squad')) return 'Squad';
	if (h.includes('sandraid') || h.includes('sophie') || h === 'sandhacks.com') return 'Sand Raiders';
	if (h.includes('abi')) return 'Arena Breakout Infinite';
	if (h.includes('bodycam')) return 'Bodycam';
	if (h.includes('oncehuman')) return 'Once Human';
	if (h.includes('reforger')) return 'Arma Reforger';
	if (h.includes('backroom')) return 'Backrooms';
	if (h.includes('deadside')) return 'Deadside';
	if (h.includes('thefront')) return 'The Front';
	if (h.includes('lostark')) return 'Lost Ark';
	if (h.includes('warframe')) return 'Warframe';
	if (h.includes('naraka')) return 'Naraka: Bladepoint';
	if (h.includes('minecraft')) return 'Minecraft';
	if (h.includes('poe')) return 'Path of Exile';
	if (h.includes('raft')) return 'Raft';
	if (h.includes('seaofthieves')) return 'Sea of Thieves';
	if (h.includes('deltaforce')) return 'Delta Force';
	if (h.includes('dune')) return 'Dune: Awakening';
	if (h.includes('wuthering')) return 'Wuthering Waves';
	if (h.includes('combatmaster')) return 'Combat Master';
	if (h.includes('foxhole')) return 'Foxhole';
	if (h.includes('exoborne')) return 'Exoborne';
	if (h.includes('nba2k26')) return 'NBA 2K26';
	if (h.includes('tf2')) return 'Team Fortress 2';
	if (h.includes('enlisted')) return 'Enlisted';
	if (h.includes('scum')) return 'SCUM';
	if (h.includes('grounded')) return 'Grounded';
	if (h.includes('dota2')) return 'Dota 2';
	if (h.includes('civ6')) return 'Civilization VI';
	return 'PC Gaming';
}

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

function gameSlug(game) {
	return slugify(game);
}

function hashString(str) {
	let h = 0;
	for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
	return h;
}

function pick(arr, seed) {
	return arr[seed % arr.length];
}

function buildGuide(url, index) {
	const externalUrl = normalizeUrl(url);
	const host = hostname(externalUrl);
	const game = classifyGame(host);
	const profile = GAME_PROFILES[game] ?? {
		genre: 'online multiplayer',
		setting: 'competitive PC matches',
		mechanics: ['map awareness', 'loadout tuning', 'team coordination'],
		antiCheat: 'platform anti-cheat with periodic updates',
	};
	const seed = hashString(externalUrl);
	const anchorText = pick(ANCHOR_TEXTS, seed);
	const slug = `${gameSlug(game)}-${host.replace(/\./g, '-')}-guide`;
	const imageUrl = IGN_IMAGES[game];
	if (!imageUrl) throw new Error(`Missing IGN image for game: ${game}`);

	const angles = [
		'beginner onboarding',
		'ranked climb strategy',
		'patch-day preparation',
		'solo queue survival',
		'squad coordination',
		'economy and loadout planning',
		'map control fundamentals',
		'anti-cheat awareness',
	];
	const angle = pick(angles, seed);
	const mechanic = pick(profile.mechanics, seed + 3);
	const mechanic2 = pick(profile.mechanics, seed + 7);

	const title = `${game} Guide: ${angle.replace(/\b\w/g, (c) => c.toUpperCase())} (2026)`;
	const h1 = `${game} ${angle.replace(/\b\w/g, (c) => c.toUpperCase())} Guide`;
	const metaDescription = `A practical ${game} guide covering ${profile.genre} fundamentals, ${mechanic}, and ${profile.setting} — updated for 2026 PC players.`;

	const intro = `${game} remains one of the most discussed ${profile.genre} titles on PC, especially for players who want sharper reads in ${profile.setting}. This guide focuses on ${angle} without skipping the basics: how rounds flow, where teams win fights, and why ${mechanic} often decides outcomes before aim ever matters.`;

	const sections = [
		{
			h2: `How ${game} matches actually play out`,
			paragraphs: [
				`Most ${game} sessions are won in the minutes before a fight starts. Learn the default routes players take through ${profile.setting}, which angles give free information, and when to disengage. In ${profile.genre} titles, map timing beats raw reflexes more often than new players expect.`,
				`Treat ${mechanic} as a repeatable checklist rather than a highlight-reel skill. When your plan is explicit — where you rotate, what you contest, and what you give up — you stop panic-switching mid-round and start forcing opponents into bad trades.`,
			],
		},
		{
			h2: `${mechanic2} and mid-game decisions`,
			paragraphs: [
				`${mechanic2} separates players who float with the lobby from players who steer it. Watch for audio cues, ability cooldowns, and objective timers that reveal when a squad is committed. In ${game}, the team that recognizes a committed enemy first usually wins the exchange.`,
				`If you queue solo, ping information consistently and play for space instead of agent plays. Even in chaotic ${profile.genre} lobbies, disciplined spacing around ${profile.setting} creates openings that raw aggression cannot.`,
			],
		},
		{
			h2: 'Performance, settings, and fair-play context',
			paragraphs: [
				`Stable FPS and clean audio matter in ${game}. Cap background apps, use a sensible sensitivity, and keep drivers current so you are not fighting input lag during clutch moments. Small setting tweaks often produce bigger gains than switching gear every month.`,
				`${game} uses ${profile.antiCheat}. Respect server rules, avoid sketchy downloads, and treat third-party tools as high-risk — policy changes and ban waves can land without warning after major patches.`,
			],
		},
		{
			h2: 'Putting the guide into practice',
			paragraphs: [
				`Pick one focus per session: ${mechanic}, ${mechanic2}, or map timing. Review a round where you died early and name the decision that put you in a bad spot. That habit compounds faster than grinding dozens of unfocused matches.`,
				`For more game updates, guides, and related resources, you can also explore <a href="${externalUrl}" target="_blank" rel="noopener noreferrer">${anchorText}</a>.`,
			],
		},
	];

	const published = `2026-0${1 + (index % 8)}-${String(5 + (index % 20)).padStart(2, '0')}`;
	const updated = '2026-03-15';

	return {
		id: slug,
		slug,
		game,
		gameSlug: gameSlug(game),
		externalUrl,
		anchorText,
		published,
		updated,
		title,
		metaDescription,
		h1,
		intro,
		imageUrl,
		imageAlt: `${game} gameplay — IGN screenshot`,
		sections,
	};
}

function uniqueUrls(urls) {
	const seen = new Set();
	const out = [];
	for (const raw of urls) {
		const norm = normalizeUrl(raw);
		if (seen.has(norm)) continue;
		seen.add(norm);
		out.push(norm);
	}
	return out;
}

function serializeGuide(guide) {
	return JSON.stringify(guide, null, '\t').replace(/"([^"]+)":/g, '$1:');
}

async function main() {
	const urls = uniqueUrls(RAW_URLS);
	const expectedUnique = uniqueUrls(RAW_URLS).length;

	if (urls.length !== expectedUnique) {
		throw new Error(`URL dedupe mismatch: got ${urls.length}`);
	}

	const guides = urls.map((url, i) => buildGuide(url, i));
	const slugs = new Set();
	const urlSet = new Set(urls);
	for (const g of guides) {
		if (slugs.has(g.slug)) throw new Error(`Duplicate slug: ${g.slug}`);
		slugs.add(g.slug);
		if (!urlSet.has(g.externalUrl)) throw new Error(`Guide URL not in input set: ${g.externalUrl}`);
	}

	const body = `/** Auto-generated by scripts/generate-guides.mjs — do not edit by hand. */\nimport type { GuideDefinition } from './types';\n\nexport const guides: GuideDefinition[] = [\n${guides.map((g) => `\t${serializeGuide(g)},`).join('\n')}\n];\n`;

	await writeFile(OUT, body, 'utf8');
	console.log(`Generated ${guides.length} guides → ${OUT}`);
	console.log(`Total provided (raw): ${RAW_URLS.length}`);
	console.log(`Unique URLs: ${urls.length}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
