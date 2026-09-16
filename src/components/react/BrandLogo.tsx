type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** Dota 2 wordmark — crisp PNG nav asset (transparent, white ink). */
export default function BrandLogo({ alt = 'Dota 2 Cheats logo', className }: Props) {
	return (
		<img
			className={className}
			src="/images/dota2-cheats-logo-nav.png"
			srcSet="/images/dota2-cheats-logo-nav-360w.png 360w, /images/dota2-cheats-logo-nav-480w.png 480w, /images/dota2-cheats-logo-nav-560w.png 560w, /images/dota2-cheats-logo-nav.png 640w, /images/dota2-cheats-logo-nav-720w.png 720w"
			sizes="(max-width: 480px) 160px, 200px"
			width={200}
			height={37}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
