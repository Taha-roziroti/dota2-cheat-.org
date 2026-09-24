import { brand } from './brand';

/** English-only policy page (linked from footer and nav disclosure). */
export const AFFILIATE_DISCLOSURE_PATH = '/affiliate-disclosure/';

/** Google-recommended rel for paid / affiliate outbound purchase links. */
export const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

export function isCheckoutUrl(href: string): boolean {
	if (!href || href.startsWith('mailto:')) return false;
	if (href === brand.checkoutUrl) return true;
	try {
		const u = new URL(href);
		return u.hostname === 'zadeyo.com' || u.hostname.endsWith('.zadeyo.com');
	} catch {
		return false;
	}
}

export function relForOutboundHref(href: string): string | undefined {
	if (isCheckoutUrl(href)) return AFFILIATE_REL;
	if (href.startsWith('http://') || href.startsWith('https://')) return 'noopener noreferrer';
	return undefined;
}
