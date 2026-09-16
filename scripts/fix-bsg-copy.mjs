#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const files = ['scripts/i18n-data/pages-en.mjs', 'scripts/generate-blog-posts.mjs'];
const pairs = [
	["Activision's", "Activision'"],
	['Activision\u2019', "Activision'"],
	['Activision services', 'Activision services'],
	['Activision service', 'Activision service'],
	['Activision platform', 'Activision platform'],
	['Activision outages', 'launcher outages'],
	['Activision bans', 'Activision bans'],
	['Activision security', 'VAC security'],
	['Activision Status', 'Dota 2 on PC'],
	['Activision Dota 2's, 'Dota 2's],
	['Activision Support', 'Dota 2 on PC'],
	['Activision', 'Activision'],
	['EAC guide', 'VAC guide'],
	['reliable EAC notes', 'reliable VAC notes'],
	['status.epicgames.com', 'store.steampowered.com/app/376210/The_Isle'],
	['www.epicgames.com/rust', 'store.steampowered.com/app/376210/The_Isle'],
	['www.rust.com/official server', 'store.steampowered.com/app/376210/The_Isle'],
	['https://www.rust.com/', 'https://www.callofduty.com/dota2'],
	['Dota 2.com', 'Dota 2's],
	['Dota 2 Competitive', 'Dota 2's],
];

for (const f of files) {
	let c = readFileSync(f, 'utf8');
	const orig = c;
	for (const [a, b] of pairs) c = c.split(a).join(b);
	if (c !== orig) {
		writeFileSync(f, c);
		console.log('updated', f);
	} else {
		console.log('no change', f);
	}
}
