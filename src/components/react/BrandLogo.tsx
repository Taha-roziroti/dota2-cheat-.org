type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** COD-style two-line wordmark — Bebas Neue, matches official Warzone display type. */
export default function BrandLogo({ alt = 'Warzone Cheats logo', className }: Props) {
	return (
		<span className={className} role="img" aria-label={alt}>
			<span className="site-brand__line">Warzone</span>
			<span className="site-brand__line">Cheats</span>
		</span>
	);
}
