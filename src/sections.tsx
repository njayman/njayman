import type { ReactNode } from "react";
import Avatar from "./components/Avatar";
import ExpCard from "./components/ExpCard";
import SkillBubbles from "./components/SkillBubbles";
import {
	ABOUT_LONG,
	EDUCATION,
	EXPERIENCES,
	HERO_LINKS,
	NAME,
	PROJECTS,
	RESEARCH,
	SKILL_CATEGORIES,
	TITLE,
} from "./data/profile";

export const SectionId = {
	Hero: "home", // also the URL hash, e.g. njayman.com/#skills
	Skills: "skills",
	Experience: "experience",
	Projects: "projects",
	Academics: "academics",
	// Extracurricular: "extracurricular",
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

export const SECTION_LABELS: Record<SectionId, string> = {
	[SectionId.Hero]: "Home",
	[SectionId.Skills]: "Skills",
	[SectionId.Experience]: "Experience",
	[SectionId.Projects]: "Projects",
	[SectionId.Academics]: "Academics",
	// [SectionId.Extracurricular]: "Extracurricular",
};

export const ALL_SECTIONS: SectionId[] = Object.values(SectionId);

// Accent per page, used for the transition title.
export const SECTION_COLORS: Record<SectionId, string> = {
	[SectionId.Hero]: "text-matte-teal",
	[SectionId.Skills]: "text-matte-violet",
	[SectionId.Experience]: "text-matte-blue",
	[SectionId.Projects]: "text-matte-emerald",
	[SectionId.Academics]: "text-matte-amber",
};

const SKILL_DATA = Object.values(SKILL_CATEGORIES).flatMap((cat) =>
	cat.skills.map((label) => ({ label, color: cat.color })),
);

const HEADING_COLORS: Record<string, string> = {
	Skills: "text-matte-violet",
	Experience: "text-matte-blue",
	Projects: "text-matte-emerald",
	Academics: "text-matte-amber",
	Education: "text-matte-teal",
	Research: "text-matte-rose",
	// Extracurricular: "text-matte-pink",
};

// Split into letters for the drop-in animation; screen readers get the whole word via aria-label.
function Letters({ text, delay = 0 }: { text: string; delay?: number }) {
	return [...text].map((ch, i) => (
		<span
			// biome-ignore lint/suspicious/noArrayIndexKey: static text, letters never reorder
			key={i}
			aria-hidden="true"
			className="letter"
			style={{ animationDelay: `${delay + i * 15}ms` }}
		>
			{ch === " " ? "\u00a0" : ch}
		</span>
	));
}

function SectionHeading({ children }: { children: string }) {
	return (
		<h2
			aria-label={children}
			className={`text-lg font-semibold mb-4 ${HEADING_COLORS[children]}`}
		>
			<Letters text={children} delay={50} />
		</h2>
	);
}

function SubHeading({ children }: { children: string }) {
	return (
		<h3 className={`text-base font-medium mb-2 ${HEADING_COLORS[children]}`}>
			{children}
		</h3>
	);
}

// Cards cycle through the matte palette. Full class names so Tailwind can find them.
const TINTS = [
	{
		text: "text-matte-teal",
		sub: "text-matte-teal/70",
		marker: "marker:text-matte-teal",
	},
	{
		text: "text-matte-violet",
		sub: "text-matte-violet/70",
		marker: "marker:text-matte-violet",
	},
	{
		text: "text-matte-amber",
		sub: "text-matte-amber/70",
		marker: "marker:text-matte-amber",
	},
	{
		text: "text-matte-rose",
		sub: "text-matte-rose/70",
		marker: "marker:text-matte-rose",
	},
	{
		text: "text-matte-sky",
		sub: "text-matte-sky/70",
		marker: "marker:text-matte-sky",
	},
	{
		text: "text-matte-emerald",
		sub: "text-matte-emerald/70",
		marker: "marker:text-matte-emerald",
	},
	{
		text: "text-matte-pink",
		sub: "text-matte-pink/70",
		marker: "marker:text-matte-pink",
	},
	{
		text: "text-matte-indigo",
		sub: "text-matte-indigo/70",
		marker: "marker:text-matte-indigo",
	},
	{
		text: "text-matte-blue",
		sub: "text-matte-blue/70",
		marker: "marker:text-matte-blue",
	},
];
const tint = (i: number) => TINTS[i % TINTS.length];

// Plain text links: no border, radius or outline; keyboard focus shows as colour + underline.
const LINK =
	"transition-colors focus-visible:outline-none focus-visible:underline";

// Each hero link lights up in its own matte colour on hover/focus.
const LINK_TINTS = [
	"hover:text-matte-teal focus-visible:text-matte-teal",
	"hover:text-matte-violet focus-visible:text-matte-violet",
	"hover:text-matte-emerald focus-visible:text-matte-emerald",
	"hover:text-matte-sky focus-visible:text-matte-sky",
];

export function getSectionText(id: SectionId): string {
	switch (id) {
		case SectionId.Hero:
			return `${NAME} — ${TITLE}. ${ABOUT_LONG} Portfolio at njayman.com. GitHub at github.com/njayman. Codeberg at codeberg.org/njayman. LinkedIn at linkedin.com/in/najishmahmud.`;
		case SectionId.Skills:
			return `Skills: ${Object.entries(SKILL_CATEGORIES)
				.map(([cat, { skills }]) => `${cat}: ${skills.join(", ")}`)
				.join(". ")}.`;
		case SectionId.Experience:
			return `Experience:\n${EXPERIENCES.map((e) => `- ${e.company}, ${e.location} — ${e.role} (${e.dates}). ${e.bullets.join(" ")}`).join("\n")}`;
		case SectionId.Projects:
			return `Projects:\n${PROJECTS.map((p) => `- ${p.name}: ${p.description}`).join("\n")}`;
		case SectionId.Academics:
			return `Education: ${EDUCATION.map(
				(e) => `${e.institution}, ${e.location} — ${e.degree} (${e.dates})`,
			).join(
				". ",
			)}. Research: ${RESEARCH.map((r) => `${r.citation} doi:${r.doi}`).join(". ")}`;
		// case SectionId.Extracurricular:
		// 	return "General Member at JCI Dhaka West. Volunteered in organizing Battle of Brush 4.0 — art competition with thousands of young artists from 80+ schools. Volunteered in Project Vision — free eye treatment for bus drivers. Chess, Table Tennis, Badminton.";
	}
}

export function renderSection(id: SectionId): ReactNode {
	switch (id) {
		case SectionId.Hero:
			return (
				<header className="text-center py-12">
					<Avatar
						alt={`Cartoon avatar of ${NAME}`}
						className="relative h-40 mx-auto mb-6"
					/>
					<h1 aria-label={NAME} className="text-4xl font-bold tracking-tight">
						<Letters text={NAME} delay={50} />
					</h1>
					<p className="text-matte-blue mt-2 text-lg">{TITLE}</p>
					<p className="text-zinc-400 mt-4 max-w-2xl mx-auto leading-relaxed">
						{ABOUT_LONG}
					</p>
					<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-zinc-500">
						{HERO_LINKS.map((link, i) => (
							<a
								key={link.href}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`${LINK} ${LINK_TINTS[i % LINK_TINTS.length]}`}
								aria-label={`${link.name} (opens in new tab)`}
							>
								{link.label}
							</a>
						))}
					</div>
					<a
						href="/Najish-Mahmud-CV.pdf"
						download
						className={`inline-block mt-6 text-sm text-matte-amber hover:text-zinc-100 focus-visible:text-zinc-100 ${LINK}`}
					>
						Download my resume
					</a>
				</header>
			);
		case SectionId.Skills:
			return (
				<div>
					<SectionHeading>Skills</SectionHeading>
					<SkillBubbles skills={SKILL_DATA} />
				</div>
			);
		case SectionId.Experience:
			return (
				<div className="space-y-4">
					<SectionHeading>Experience</SectionHeading>
					{EXPERIENCES.map((exp, i) => (
						<ExpCard key={`${exp.company}-${exp.role}`} color={tint(i).text}>
							<h3 className={`font-medium text-base ${tint(i).text}`}>
								{exp.company}, {exp.location}
							</h3>
							<p className={`text-xs mt-1 ${tint(i).sub}`}>
								{exp.role} — {exp.dates}
							</p>
							<ul
								className={`mt-3 space-y-1.5 text-zinc-400 text-sm leading-relaxed list-disc list-inside ${tint(i).marker}`}
							>
								{exp.bullets.map((b) => (
									<li key={b}>{b}</li>
								))}
							</ul>
						</ExpCard>
					))}
				</div>
			);
		case SectionId.Projects:
			return (
				<div>
					<SectionHeading>Projects</SectionHeading>
					<div className="space-y-3">
						{PROJECTS.map((p, i) => (
							<ExpCard key={p.name} color={tint(i).text}>
								<h3 className={`font-medium text-base ${tint(i).text}`}>
									{p.url ? (
										<a
											href={p.url}
											target="_blank"
											rel="noopener noreferrer"
											className={`hover:text-zinc-100 focus-visible:text-zinc-100 ${LINK}`}
										>
											{p.name}
										</a>
									) : (
										p.name
									)}
								</h3>
								<p className="text-zinc-400 text-sm mt-1">{p.description}</p>
							</ExpCard>
						))}
					</div>
				</div>
			);
		case SectionId.Academics:
			return (
				<div className="space-y-6">
					<SectionHeading>Academics</SectionHeading>
					<section>
						<SubHeading>Education</SubHeading>
						<div className="space-y-3">
							{EDUCATION.map((e, i) => (
								<ExpCard key={e.institution} color={tint(i).text}>
									<h4 className={`font-medium ${tint(i).text}`}>
										{e.institution}, {e.location}
									</h4>
									<p className={`text-sm mt-1 ${tint(i).sub}`}>
										{e.degree} — {e.dates}
									</p>
								</ExpCard>
							))}
						</div>
					</section>
					<section>
						<SubHeading>Research</SubHeading>
						{RESEARCH.map((r) => (
							<ExpCard key={r.doi} color="text-matte-rose">
								<p className="text-zinc-300 text-sm">{r.citation}</p>
								<a
									href={`https://doi.org/${r.doi}`}
									target="_blank"
									rel="noopener noreferrer"
									className={`inline-block text-sm text-matte-rose hover:text-zinc-100 focus-visible:text-zinc-100 mt-2 ${LINK}`}
									aria-label="View publication on IEEE (opens in new tab)"
								>
									https://doi.org/{r.doi}
								</a>
							</ExpCard>
						))}
					</section>
				</div>
			);
		// case SectionId.Extracurricular:
		// 	return (
		// 		<div>
		// 			<SectionHeading>Extracurricular</SectionHeading>
		// 			<p className="text-zinc-400 text-sm">
		// 				General Member at JCI Dhaka West. Participated in various voluntary
		// 				events serving the SDGs.
		// 			</p>
		// 			<ul className="mt-2 space-y-1 text-zinc-300 text-sm list-disc list-inside">
		// 				<li>
		// 					Volunteered in organizing Battle of Brush 4.0, where thousands of
		// 					young artists from 80+ government and primary schools competed.
		// 				</li>
		// 				<li>
		// 					Volunteered in Project Vision, where hundreds of bus drivers were
		// 					provided with free eye treatment.
		// 				</li>
		// 			</ul>
		// 			<p className="text-zinc-400 text-sm mt-2">
		// 				Chess, Table Tennis, Badminton
		// 			</p>
		// 		</div>
		// 	);
	}
}
