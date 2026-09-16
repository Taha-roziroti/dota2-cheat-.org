#!/usr/bin/env node
/**
 * Fix reliable/undetected corruption and Warzone artifacts across i18n sources.
 * Run before: npm run generate:i18n
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const I18N_DIR = path.join(ROOT, 'scripts/i18n-data');

const GLOBAL_REPLACEMENTS = [
	[/\.replace\(\/s\/g, 'reliable'\)/g, ''],
	[/\.replace\(\/s\/g, "reliable"\)/g, ''],
	[/ereliable/g, 'es'],
	[/reliableon/g, 'son'],
	[/reliablee/g, 'se'],
	[/reliableegún/g, 'según'],
	[/reliablei/g, 'si'],
	[/reliableoporte/g, 'soporte'],
	[/reliableupport/g, 'support'],
	[/reliableolo/g, 'solo'],
	[/reliableon/g, 'son'],
	[/trucoreliable/g, 'trucos'],
	[/Cheatreliable/g, 'Cheats'],
	[/controlereliable/g, 'controles'],
	[/conreliableulta/g, 'consulta'],
	[/revireliablea/g, 'revisa'],
	[/revireliableo/g, 'reviso'],
	[/antereliable/g, 'antes'],
	[/dereliablecripción/g, 'descripción'],
	[/inreliabletalación/g, 'instalación'],
	[/reconreliabletruccionereliable/g, 'reconstrucciones'],
	[/trareliable/g, 'tras'],
	[/parchereliable/g, 'parches'],
	[/loreliable/g, 'los'],
	[/lareliable/g, 'las'],
	[/notareliable/g, 'notas'],
	[/marcadorereliable/g, 'marcadores'],
	[/dropreliable/g, 'drops'],
	[/overlayreliable/g, 'overlays'],
	[/rereliablealtan/g, 'resaltan'],
	[/amenazareliable/g, 'amenazas'],
	[/cercanareliable/g, 'cercanas'],
	[/vireliableión/g, 'visión'],
	[/flancoreliable/g, 'flancos'],
	[/zonareliable/g, 'zonas'],
	[/Ereliabletado/g, 'Estado'],
	[/menreliableualereliable/g, 'mensuales'],
	[/planereliable/g, 'planes'],
	[/reliableon reliable/g, 'siguen activos'],
	[/an reliable /gi, 'a '],
	[/reliable dota 2 cheats/gi, 'dota 2 cheats'],
	[/reliable Dota 2 Cheats/gi, 'Dota 2 Cheats'],
	[/reliable ESP/gi, 'ESP'],
	[/Reliable ESP/gi, 'ESP'],
	[/reliable cheats/gi, 'dota 2 cheats'],
	[/reliable cheats for/gi, 'dota 2 cheats for'],
	[/reliable status/gi, 'patch status'],
	[/Reliable status/gi, 'Patch status'],
	[/Reliable-Status/gi, 'Patch-Status'],
	[/estado reliable/gi, 'estado del parche'],
	[/status reliable/gi, 'patch status'],
	[/статуса reliable/gi, 'статуса патча'],
	[/Paket reliable/gi, 'Premium-Paket'],
	[/pachet reliable/gi, 'pachet premium'],
	[/Gói reliable/gi, 'Gói premium'],
	[/แพ็กเกจ reliable/gi, 'แพ็กเกจพรีเมียม'],
	[/reliable Paket/gi, 'Premium-Paket'],
	[/reliable pakket/gi, 'premium pakket'],
	[/pakiet reliable/gi, 'pakiet premium'],
	[/Cheat Dota 2 reliable/gi, 'Dota 2 Cheats'],
	[/Cheats Dota 2 reliable/gi, 'Dota 2 Cheats'],
	[/reliable für/gi, 'für'],
	[/ und reliable /gi, ' und '],
	[/reliable overlay/gi, 'ESP overlay'],
	[/No cheat stays reliable forever/gi, 'Check patch status after every update'],
	[/reliable forever/gi, 'maintained after patches'],
	[/permanent reliable status/gi, 'permanent patch safety'],
	[/confirm reliable status/gi, 'confirm patch status'],
	[/estado reliable en/gi, 'estado del parche en'],
	[/¿Loreliable/g, '¿Los'],
	[/¿Puedo comprar trucos reliable/gi, '¿Puedo comprar trucos de'],
	[/¿Loreliable Dota/g, '¿Los trucos de Dota'],
	[/reliableon reliable en/gi, 'siguen activos en'],
	[/buy reliable /gi, 'buy '],
	[/Are dota 2 cheats reliable in 2026/gi, 'Are dota 2 cheats maintained in 2026'],
	[/Sind Dota 2 Cheats 2026 reliable/gi, 'Werden Dota 2 Cheats 2026 gewartet'],
	[/Reliable-Garantie/gi, 'dauerhafte Sicherheit'],
	[/operators/gi, 'heroes'],
	[/operator markers/gi, 'hero markers'],
	[/enemy operators/gi, 'enemy heroes'],
	[/weapon drops/gi, 'wards and runes'],
	[/Weapon drops/gi, 'Wards and runes'],
	[/buy stations/gi, 'shops'],
	[/Resurgence/gi, 'ranked'],
	[/ranked matches rounds/gi, 'ranked matches'],
	[/ranked matches matches/gi, 'ranked matches'],
	[/ranked and ranked/gi, 'ranked and casual'],
	[/ranked matches and ranked/gi, 'ranked and casual matches'],
	[/Activision/gi, 'Valve'],
	[/agents/gi, 'heroes'],
	[/bomb sites/gi, 'objectives'],
	[/spike sectors/gi, 'team fights'],
	[/loadout and streak/gi, 'item and ability'],
	[/loadouts/gi, 'item builds'],
	[/soft aim/gi, 'skillshot assist'],
	[/Soft aim/gi, 'Skillshot assist'],
	[/checkout via checkout/gi, 'secure checkout'],
	[/— secure checkout\./gi, '.'],
	[/reliable cheats guide/gi, 'status page'],
	[/Read the reliable cheats guide/gi, 'Read the status page'],
	[/Guides hub/gi, 'Forums'],
	[/guides hub/gi, 'forums'],
	[/Blog Dota/gi, 'Forums Dota'],
	[/Dota 2 Cheats Blog/gi, 'Dota 2 Cheats Forums'],
	[/"Guides"/g, '"Explore"'],
	[/eyebrow: 'Guides'/g, "eyebrow: 'Explore'"],
	[/linkBlog: 'Blog'/g, "linkBlog: 'Forums'"],
	[/blog: 'Blog'/g, "blog: 'Forums'"],
	[/reliable: 's'/g, "premium: ''"],
	[/reliable: 'reliable'/g, "premium: ''"],
	[/reliable: 'indetectáveis'/g, "premium: ''"],
	[/reliable: ''/g, "premium: ''"],
	[/\$\{phrases\.(\w+)\.reliable\}/g, ''],
	[/phrases\.(\w+)\.reliable/g, "''"],
	[/maps: 'maps, sites, and buy stations'/g, "maps: 'lanes, jungle, and Roshan'"],
	[/trucos s /g, 'trucos '],
	[/trucos s\?/g, 'trucos?'],
	[/trucos s\./g, 'trucos.'],
	[/trucos s,/g, 'trucos,'],
	[/triches s /g, 'triches '],
	[/cheat s /g, 'cheats '],
	[/ paquete de trucos s /g, ' paquete de trucos '],
	[/squad de triches s /g, 'pack de triches '],
	[/son s en/g, 'siguen activos en'],
	[/son-elles s en/g, 'sont-elles maintenues en'],
	[/indetectabilidad/gi, 'detección permanente'],
	[/indétectabilité/gi, 'détection permanente'],
];

async function walk(dir, files = []) {
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) await walk(p, files);
		else if (/\.(mjs|ts)$/.test(e.name)) files.push(p);
	}
	return files;
}

async function patchFile(file) {
	let c = await readFile(file, 'utf8');
	const orig = c;
	for (const [re, rep] of GLOBAL_REPLACEMENTS) {
		c = c.replace(re, rep);
	}
	// Collapse double spaces in strings (careful - only in obvious cases)
	c = c.replace(/  +/g, ' ');
	if (c !== orig) {
		await writeFile(file, c);
		console.log('patched', path.relative(ROOT, file));
	}
}

async function main() {
	for (const f of await walk(I18N_DIR)) await patchFile(f);
	// Also patch generate-locale-translations
	await patchFile(path.join(ROOT, 'scripts/generate-locale-translations.mjs'));
	console.log('i18n source cleanup complete');
}

main();
