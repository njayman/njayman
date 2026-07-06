import type { ReactNode } from "react";
import ExpCard from "./components/ExpCard";
import SkillBubble from "./components/SkillBubble";
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
	Hero: "hero",
	About: "about",
	Skills: "skills",
	Experience: "experience",
	Projects: "projects",
	Education: "education",
	Research: "research",
	Extracurricular: "extracurricular",
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

export const SECTION_LABELS: Record<SectionId, string> = {
	[SectionId.Hero]: "Hero",
	[SectionId.About]: "About",
	[SectionId.Skills]: "Skills",
	[SectionId.Experience]: "Experience",
	[SectionId.Projects]: "Projects",
	[SectionId.Education]: "Education",
	[SectionId.Research]: "Research",
	[SectionId.Extracurricular]: "Extracurricular",
};

export const ALL_SECTIONS: SectionId[] = Object.values(SectionId);

const SKILL_DATA = Object.values(SKILL_CATEGORIES).flatMap((cat, ci) =>
	cat.skills.map((label) => ({ label, color: cat.color, categoryIndex: ci })),
);

function SectionHeading({ children }: { children: string }) {
	return (
		<h2 className="text-lg font-semibold text-zinc-300 mb-4">{children}</h2>
	);
}

export function getSectionText(id: SectionId): string {
	switch (id) {
		case SectionId.Hero:
			return `${NAME} — ${TITLE}. Portfolio at njayman.com. GitHub at github.com/njayman. LinkedIn at linkedin.com/in/najishmahmud.`;
		case SectionId.About:
			return ABOUT_LONG;
		case SectionId.Skills:
			return `Skills: ${Object.entries(SKILL_CATEGORIES)
				.map(([cat, { skills }]) => `${cat}: ${skills.join(", ")}`)
				.join(". ")}.`;
		case SectionId.Experience:
			return `Experience:\n${EXPERIENCES.map((e) => `- ${e.company}, ${e.location} — ${e.role} (${e.dates}). ${e.bullets.join(" ")}`).join("\n")}`;
		case SectionId.Projects:
			return `Projects:\n${PROJECTS.map((p) => `- ${p.name}: ${p.description}`).join("\n")}`;
		case SectionId.Education:
			return EDUCATION.map(
				(e) => `${e.institution}, ${e.location} — ${e.degree} (${e.dates})`,
			).join(". ");
		case SectionId.Research:
			return RESEARCH.map((r) => `${r.citation} doi:${r.doi}`).join(". ");
		case SectionId.Extracurricular:
			return "General Member at JCI Dhaka West. Volunteered in organizing Battle of Brush 4.0 — art competition with thousands of young artists from 80+ schools. Volunteered in Project Vision — free eye treatment for bus drivers. Chess, Table Tennis, Badminton.";
	}
}

export function renderSection(id: SectionId): ReactNode {
	switch (id) {
		case SectionId.Hero:
			return (
				<header className="text-center py-12">
					<h1 className="text-4xl font-bold tracking-tight">{NAME}</h1>
					<p className="text-zinc-500 mt-2 text-lg">{TITLE}</p>
					<div className="flex justify-center gap-6 mt-6 text-sm text-zinc-600">
						{HERO_LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-400 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
								aria-label={`${link.name} (opens in new tab)`}
							>
								{link.label}
							</a>
						))}
					</div>
				</header>
			);
		case SectionId.About:
			return (
				<div>
					<SectionHeading>About</SectionHeading>
					<p className="leading-relaxed">{ABOUT_LONG}</p>
				</div>
			);
		case SectionId.Skills:
			return (
				<div>
					<SectionHeading>Skills</SectionHeading>
					<ul className="flex flex-wrap gap-3 justify-center">
						{SKILL_DATA.map(({ label, color }, i) => (
							<li key={label}>
								<SkillBubble label={label} color={color} index={i} />
							</li>
						))}
					</ul>
				</div>
			);
		case SectionId.Experience:
			return (
				<div className="space-y-4">
					<SectionHeading>Experience</SectionHeading>
					{EXPERIENCES.map((exp) => (
						<ExpCard key={`${exp.company}-${exp.role}`}>
							<h3 className="text-zinc-100 font-medium text-base">
								{exp.company}, {exp.location}
							</h3>
							<p className="text-zinc-500 text-xs mt-1">
								{exp.role} — {exp.dates}
							</p>
							<ul className="mt-3 space-y-1.5 text-zinc-400 text-sm leading-relaxed list-disc list-inside">
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
						{PROJECTS.map((p) => (
							<ExpCard key={p.name}>
								<h3 className="text-zinc-100 font-medium text-base">
									{p.url ? (
										<a
											href={p.url}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-blue-400 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
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
		case SectionId.Education:
			return (
				<div>
					<SectionHeading>Education</SectionHeading>
					{EDUCATION.map((e) => (
						<article key={e.institution} className="mb-3 last:mb-0">
							<h3 className="text-zinc-200 font-medium">
								{e.institution}, {e.location}
							</h3>
							<p className="text-zinc-400 text-sm mt-1">
								{e.degree} — {e.dates}
							</p>
						</article>
					))}
				</div>
			);
		case SectionId.Research:
			return (
				<div>
					<SectionHeading>Research</SectionHeading>
					<ul className="space-y-1 text-zinc-300 text-sm">
						{RESEARCH.map((r) => (
							<li key={r.doi}>
								{r.citation}
								<a
									href={`https://doi.org/${r.doi}`}
									target="_blank"
									rel="noopener noreferrer"
									className="block text-blue-400 hover:text-blue-300 mt-1 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
									aria-label="View publication on IEEE (opens in new tab)"
								>
									https://doi.org/{r.doi}
								</a>
							</li>
						))}
					</ul>
				</div>
			);
		case SectionId.Extracurricular:
			return (
				<div>
					<SectionHeading>Extracurricular</SectionHeading>
					<p className="text-zinc-400 text-sm">
						General Member at JCI Dhaka West. Participated in various voluntary
						events serving the SDGs.
					</p>
					<ul className="mt-2 space-y-1 text-zinc-300 text-sm list-disc list-inside">
						<li>
							Volunteered in organizing Battle of Brush 4.0, where thousands of
							young artists from 80+ government and primary schools competed.
						</li>
						<li>
							Volunteered in Project Vision, where hundreds of bus drivers were
							provided with free eye treatment.
						</li>
					</ul>
					<p className="text-zinc-400 text-sm mt-2">
						Chess, Table Tennis, Badminton
					</p>
				</div>
			);
	}
}
