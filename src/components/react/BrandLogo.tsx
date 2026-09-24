type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** Dota 2 Cheats wordmark — SVG nav asset (purple gradient, no template branding). */
export default function BrandLogo({ alt = 'Dota 2 Cheats logo', className }: Props) {
	return (
		<img
			className={className}
			src="/dota2-cheats-logo-nav.svg"
			width={200}
			height={28}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
