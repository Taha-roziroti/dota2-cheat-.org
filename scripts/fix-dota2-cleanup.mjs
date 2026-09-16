#!/usr/bin/env node
import { readFile, writeFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['node_modules', '.git', 'dist', '.astro']);

const REPLACEMENTS = [
	['an reliable', 'a'],
	['Reliable reliable', 'Reliable'],
	['reliable reliable', 'reliable'],
	['Reliable Dota 2 cheats', 'Dota 2 cheats'],
	['reliable dota 2 cheats', 'dota 2 cheats'],
	['reliable Dota 2 cheats', 'Dota 2 cheats'],
	['Reliable ESP', 'ESP'],
	['reliable ESP', 'ESP'],
	['Reliable {antiCheat}', '{antiCheat}'],
	['reliable {antiCheat}', '{antiCheat}'],
	['Reliable Status', 'Patch Status'],
	['reliable status', 'patch status'],
	['0% detection', 'patch-ready builds'],
	['Hacks and cheats available — patch-ready builds.', 'ESP, aimbot, and maphack for ranked matches on Windows PC.'],
	['https://www.callofduty.com/dota2', 'https://www.dota2.com/'],
	['callofduty.com/dota2', 'dota2.com'],
	['Activision', 'Valve'],
	['Bladepoint', 'Dota 2'],
	['Resurgence', 'ranked'],
	['dota2cheat.com/blog', 'dota2cheat.com/forums'],
	['Compare plans and guides at dota2cheat.com', 'Compare plans at dota2cheat.com'],
	['indetectables', ''],
	['indétectables', ''],
	['unentdeckte', ''],
	['/guides/', '/forums/'],
	['Guides hub', 'Forums'],
	['guides hub', 'forums'],
];

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

async function main() {
	const targets = await walk(path.join(ROOT, 'src'));
	targets.push(...(await walk(path.join(ROOT, 'public/locales'))));
	let n = 0;
	for (const file of targets) {
		if (!/\.(ts|tsx|astro|json|mjs|js|css)$/.test(file)) continue;
		let c = await readFile(file, 'utf8');
		const o = c;
		for (const [a, b] of REPLACEMENTS) c = c.split(a).join(b);
		if (c !== o) {
			await writeFile(file, c);
			n++;
		}
	}
	await rm(path.join(ROOT, 'src/data/guides/guides.generated.ts'), { force: true });
	await rm(path.join(ROOT, 'src/data/guides/native-guides.ts'), { force: true });
	console.log(`Cleanup touched ${n} files`);
}

main();
