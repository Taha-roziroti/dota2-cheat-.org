export type GuideSection = {
	h2: string;
	paragraphs: string[];
};

export type GuideDefinition = {
	id: string;
	slug: string;
	game: string;
	gameSlug: string;
	externalUrl: string;
	anchorText: string;
	published: string;
	updated: string;
	title: string;
	metaDescription: string;
	h1: string;
	intro: string;
	imageUrl: string;
	imageAlt: string;
	sections: GuideSection[];
};

export type ResolvedGuide = GuideDefinition & {
	canonicalPath: string;
};

export type NativeGuideLink = {
	slug: string;
	href: string;
	title: string;
	description: string;
};
