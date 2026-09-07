type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** Call of Duty wordmark — wide nav asset (transparent, white ink). */
export default function BrandLogo({ alt = 'Warzone Cheats logo', className }: Props) {
	return (
		<img
			className={className}
			src="/images/warzone-cheats-logo-nav.webp"
			srcSet="/images/warzone-cheats-logo-nav-280w.webp 280w, /images/warzone-cheats-logo-nav-360w.webp 360w, /images/warzone-cheats-logo-nav.webp 440w"
			sizes="(max-width: 480px) 168px, 220px"
			width={220}
			height={44}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
