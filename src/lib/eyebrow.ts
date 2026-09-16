/** Hide eyebrow labels that repeat or prefix the main heading. */
export function shouldShowEyebrow(eyebrow: string | undefined, heading: string): boolean {
	const e = eyebrow?.trim().toLowerCase();
	const h = heading.trim().toLowerCase();
	if (!e) return false;
	if (e === h) return false;
	if (h.startsWith(`${e} `) || h.startsWith(e)) return false;
	return true;
}
