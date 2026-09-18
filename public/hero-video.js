/**
 * Deferred hero background video — poster/LCP image paints first.
 */
(() => {
	const video = document.querySelector('.hero__video[data-defer-src]');
	if (!video) return;

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reducedMotion) return;

	const mp4 = video.getAttribute('data-defer-src');
	const webm = video.getAttribute('data-defer-webm');

	function attachSources() {
		if (video.querySelector('source')) return;

		if (webm) {
			const s = document.createElement('source');
			s.src = webm;
			s.type = 'video/webm';
			video.appendChild(s);
		}
		if (mp4) {
			const s = document.createElement('source');
			s.src = mp4;
			s.type = 'video/mp4';
			video.appendChild(s);
		}

		video.load();
		const play = video.play();
		if (play && typeof play.catch === 'function') play.catch(() => {});
	}

	function start() {
		attachSources();
	}

	if ('requestIdleCallback' in window) {
		requestIdleCallback(start, { timeout: 2500 });
	} else {
		window.setTimeout(start, 1200);
	}
})();
