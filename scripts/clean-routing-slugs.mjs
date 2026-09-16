#!/usr/bin/env node
/** Remove orphaned localizedSlugs blocks from routing.ts */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(ROOT, 'src/data/i18n/routing.ts');

const REMOVE = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

let content = await readFile(file, 'utf8');
for (const id of REMOVE) {
	const re = new RegExp(`\\t'?${id.replace(/-/g, '\\-')}'?: \\{[\\s\\S]*?\\},\\n`, 'g');
	content = content.replace(re, '');
}
// Fix vac-bypass slugs that got double-replaced
content = content.replace(/vac-bypass-bypass/g, 'vac-bypass');
content = content.replace(/vac-bypass-trucos-dota2/g, 'vac-bypass-trucos-dota2');
await writeFile(file, content);
console.log('Cleaned routing.ts localizedSlugs');
