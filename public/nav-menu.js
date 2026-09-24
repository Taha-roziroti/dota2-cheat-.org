/**
 * Mobile nav toggle — works before Astro/React islands hydrate.
 * Toggles `.is-open` on `[data-nav]` (not data-nav-open).
 */
(() => {
	function header() {
		return document.querySelector('[data-nav]');
	}

	function menuBtn() {
		const h = header();
		return h ? h.querySelector('.site-menu') : null;
	}

	function isOpen() {
		const h = header();
		return Boolean(h && h.classList.contains('is-open'));
	}

	/** Clone desktop nav + lang into mobile panel once — avoids duplicate anchor text in HTML. */
	function cloneMobileNav() {
		const panelNav = document.querySelector('[data-nav-clone]');
		const desktopNav = document.querySelector('.site-nav');
		if (!panelNav || !desktopNav || panelNav.dataset.ready === '1') return;

		panelNav.replaceChildren();
		desktopNav.querySelectorAll('a').forEach((link) => {
			const item = document.createElement('a');
			item.href = link.getAttribute('href') || '#';
			if (link.classList.contains('is-active')) item.classList.add('is-active');
			item.setAttribute('data-nav-close', '');
			const icon = link.querySelector('svg');
			const label = link.querySelector('span');
			if (icon) item.appendChild(icon.cloneNode(true));
			if (label) item.appendChild(label.cloneNode(true));
			panelNav.appendChild(item);
		});

		const langSlot = document.querySelector('[data-lang-clone]');
		const desktopLang = document.querySelector('.site-tools__lang .lang-switcher');
		if (langSlot && desktopLang && !langSlot.querySelector('.lang-switcher')) {
			langSlot.appendChild(desktopLang.cloneNode(true));
		}

		panelNav.dataset.ready = '1';
		panelNav.hidden = false;
		if (langSlot) langSlot.hidden = false;
	}

	function ensureMobileNav() {
		if (window.matchMedia('(max-width: 1024px)').matches) cloneMobileNav();
	}

	function setOpen(open) {
		const h = header();
		const btn = menuBtn();
		if (!h || !btn) return;

		if (open) ensureMobileNav();

		h.classList.toggle('is-open', open);
		btn.setAttribute('aria-expanded', open ? 'true' : 'false');

		const openLabel = btn.getAttribute('data-label-open') || 'Open menu';
		const closeLabel = btn.getAttribute('data-label-close') || 'Close menu';
		btn.setAttribute('aria-label', open ? closeLabel : openLabel);

		document.body.classList.toggle('nav-lock', open);
	}

	function close() {
		if (isOpen()) setOpen(false);
	}

	function toggle() {
		setOpen(!isOpen());
	}

	document.addEventListener(
		'click',
		(event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;

			if (target.closest('.site-menu') && header()?.contains(target.closest('.site-menu'))) {
				event.preventDefault();
				toggle();
				return;
			}

			if (target.closest('[data-nav-close]')) {
				close();
			}
		},
		true,
	);

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') close();
	});

	window.addEventListener('resize', () => {
		if (window.matchMedia('(min-width: 1025px)').matches) close();
	});

	document.addEventListener('astro:page-load', close);

	ensureMobileNav();
	window.addEventListener('resize', ensureMobileNav);
	document.addEventListener('astro:page-load', ensureMobileNav);

	function onScroll() {
		const h = header();
		if (!h) return;
		h.classList.toggle('is-scrolled', window.scrollY > 8);
	}

	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
	document.addEventListener('astro:page-load', onScroll);
})();
