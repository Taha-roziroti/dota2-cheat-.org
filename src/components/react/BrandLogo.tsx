type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** Activision fist site mark — transparent PNG/WebP, no background box. */
export default function BrandLogo({ alt = 'Warzone Cheats logo', className }: Props) {
	return (
		<img
			className={className}
			src="/images/warzone-cheats-logo-mark.webp"
			srcSet="/images/warzone-cheats-logo-mark.webp 128w, /images/warzone-cheats-logo.webp 512w"
			sizes="40px"
			width={40}
			height={40}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
