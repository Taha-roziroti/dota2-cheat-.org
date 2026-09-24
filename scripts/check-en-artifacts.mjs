import { readFileSync } from 'node:fs';

const content = readFileSync('src/data/i18n/content.generated.ts', 'utf8');
const locales = ['es', 'fr', 'de', 'ja', 'zh'];
const patterns = [
	'should also read',
	'Step one:',
	'When VAC or',
	'Combine maintenance',
	'Discord-only',
	'Deep technical',
	'On patch mornings',
];

for (const loc of locales) {
	const start = content.indexOf(`${loc}: {`);
	const end = content.indexOf('\n\t},', start + 10);
	const block = content.slice(start, end > start ? end : start + 50000);
	console.log(`\n=== ${loc} ===`);
	for (const p of patterns) {
		const count = block.split(p).length - 1;
		if (count) console.log(`  ${count} × ${p}`);
	}
}
