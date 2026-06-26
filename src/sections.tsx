import type { ReactNode } from "react";
import ExpCard from "./components/ExpCard";
import SkillBubble from "./components/SkillBubble";

export const SectionId = {
	Hero: "hero",
	About: "about",
	Skills: "skills",
	Experience: "experience",
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
	[SectionId.Education]: "Education",
	[SectionId.Research]: "Research",
	[SectionId.Extracurricular]: "Extracurricular",
};

export const ALL_SECTIONS: SectionId[] = Object.values(SectionId);

type SkillCategory = {
	color: string;
	skills: string[];
};

const SKILL_CATEGORIES: Record<string, SkillCategory> = {
	Languages: {
		color: "bg-blue-600/20 text-blue-300 border-blue-700/30",
		skills: ["TypeScript", "JavaScript", "Python"],
	},
	Frontend: {
		color: "bg-teal-600/20 text-teal-300 border-teal-700/30",
		skills: [
			"React",
			"Next.js",
			"Zustand",
			"Redux Toolkit",
			"TanStack Query",
			"TanStack Table",
			"Tailwind CSS",
			"ShadCN UI",
			"Framer Motion",
			"Socket.io",
			"Storybook",
		],
	},
	Backend: {
		color: "bg-violet-600/20 text-violet-300 border-violet-700/30",
		skills: ["NestJS", "Node.js", "Express", "FastAPI", "Django", "PayloadCMS"],
	},
	Databases: {
		color: "bg-amber-600/20 text-amber-300 border-amber-700/30",
		skills: ["PostgreSQL", "Redis", "BullMQ", "Linode OSS"],
	},
	DevOps: {
		color: "bg-rose-600/20 text-rose-300 border-rose-700/30",
		skills: ["Docker", "Docker Compose", "Linux", "Nginx", "CI/CD"],
	},
	Other: {
		color: "bg-pink-600/20 text-pink-300 border-pink-700/30",
		skills: [
			"TypeORM",
			"Zod",
			"React Hook Form",
			"Web Components",
			"Vanilla JS",
			"OWL",
		],
	},
};

const SKILL_DATA = Object.values(SKILL_CATEGORIES).flatMap((cat, ci) =>
	cat.skills.map((label) => ({ label, color: cat.color, categoryIndex: ci })),
);

const HERO_LINKS = [
	{ href: "https://njayman.com", label: "njayman.com", name: "njayman.com" },
	{
		href: "https://github.com/njayman",
		label: "github.com/njayman",
		name: "GitHub profile",
	},
	{
		href: "https://www.linkedin.com/in/najishmahmud/",
		label: "linkedin.com/in/najishmahmud",
		name: "LinkedIn profile",
	},
];

export function renderSection(id: SectionId): ReactNode {
	switch (id) {
		case SectionId.Hero:
			return (
				<header className="text-center py-12">
					<h1 className="text-4xl font-bold tracking-tight">NAJISH MAHMUD</h1>
					<p className="text-zinc-500 mt-2 text-lg">Fullstack Developer</p>
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
					<h2 className="text-lg font-semibold text-zinc-300">About</h2>
					<p className="mt-2 leading-relaxed">
						Full-stack TypeScript engineer with 5+ years building production web
						applications across React, Next.js, Express, NestJS and TypeScript.
						Experienced in delivering end-to-end features including AI inference
						visualization, open banking integrations, and complex UI systems.
						Currently completing an MS in Artificial Intelligence at the
						University of Bedfordshire.
					</p>
				</div>
			);
		case SectionId.Skills:
			return (
				<div>
					<h2 className="text-lg font-semibold text-zinc-300 mb-6 text-center">
						Skills
					</h2>
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
					<h2 className="text-lg font-semibold text-zinc-300 mb-4">
						Experience
					</h2>
					<ExpCard>
						<h3 className="text-zinc-100 font-medium text-base">
							Malda Limited, London, UK
						</h3>
						<p className="text-zinc-500 text-xs mt-1">
							Fullstack TypeScript Developer — Nov 2025 – May 2026
						</p>
						<ul className="mt-3 space-y-1.5 text-zinc-400 text-sm leading-relaxed list-disc list-inside">
							<li>
								Developed and maintained full-stack features across a Next.js /
								NestJS property management platform for UK landlords, building
								controllers, services and APIs for properties, finance, and
								document modules.
							</li>
							<li>
								Built the full Finance page from scratch — rent charge
								management, bank transaction uploads, and a reconciliation UI
								that visualized AI-generated payment-to-charge matching
								suggestions (with confidence scores) from JSON responses for
								manual landlord review.
							</li>
							<li>
								Implemented Atto open banking integration end-to-end on the
								frontend, including the OAuth consent and authentication flow,
								bank account linking modal, and transaction sync UI.
							</li>
							<li>
								Revamped the dynamic form builder to support 30+ AI-extracted
								document types, authored tenancy and document form schemas, and
								solved complex UI problems including a hierarchical
								property-unit selector for multi-unit property management.
							</li>
						</ul>
					</ExpCard>
					<ExpCard>
						<h3 className="text-zinc-100 font-medium text-base">
							Therap (BD) Ltd, Dhaka, Bangladesh
						</h3>
						<p className="text-zinc-500 text-xs mt-1">
							Software Engineer — Jun 2023 – Aug 2025
						</p>
						<ul className="mt-3 space-y-1.5 text-zinc-400 text-sm leading-relaxed list-disc list-inside">
							<li>
								Joined as the first React hire and led the ground-up development
								of an internal React + TypeScript UI component library,
								delivering production-ready components including DateTimePicker,
								Data Table, Localization Context, and event-driven reactive
								modules with Storybook documentation and unit tests.
							</li>
							<li>
								Built web components in React with complex internal API call
								ecosystems, implemented vanilla JS modules where framework usage
								was restricted, and integrated legacy jQuery widgets from
								JSP-served pages into the React codebase — bridging old and new
								frontend architectures.
							</li>
							<li>
								Reviewed and refactored frontend code across the team,
								maintaining consistency and quality standards across the growing
								component library.
							</li>
							<li>
								Trained and mentored new recruits on the team's React/TypeScript
								patterns, component architecture, and development workflow.
							</li>
						</ul>
					</ExpCard>
					<ExpCard>
						<h3 className="text-zinc-100 font-medium text-base">
							Mir Info Systems Limited, Dhaka, Bangladesh
						</h3>
						<p className="text-zinc-500 text-xs mt-1">
							Software Engineer — Mar 2022 – May 2023
						</p>
						<ul className="mt-3 space-y-1.5 text-zinc-400 text-sm leading-relaxed list-disc list-inside">
							<li>
								Built data-heavy frontend interfaces in React and Next.js using
								TanStack Query and TanStack Table, including a near-realtime
								payment analytics dashboard for an Odoo module with 5-minute
								auto-fetch intervals, live success/fail metrics, and filterable,
								sortable paginated tables.
							</li>
							<li>
								Developed custom Odoo modules using JavaScript and the OWL
								framework, extending Odoo's frontend with bespoke business logic
								and UI.
							</li>
							<li>
								Built backend services using Node.js, FastAPI, and Django;
								trained and deployed a Rasa chatbot including model training,
								custom action server development, and containerization.
							</li>
							<li>
								Managed Docker-based deployments and hosted containerized
								services across multiple projects.
							</li>
						</ul>
					</ExpCard>
					<ExpCard>
						<h3 className="text-zinc-100 font-medium text-base">
							Kernel International Ltd., Dhaka, Bangladesh
						</h3>
						<p className="text-zinc-500 text-xs mt-1">
							Fullstack Developer (Freelance) — Jan 2022 – Present
						</p>
						<ul className="mt-3 space-y-1.5 text-zinc-400 text-sm leading-relaxed list-disc list-inside">
							<li>
								Maintain and extend Medibee and NoticeBee post-launch — handling
								bug fixes, feature updates, CI/CD pipelines, and deployment
								management across all production apps.
							</li>
							<li>
								Built core modules for the Jacks Burger admin panel (UK
								restaurant chain) using Next.js and PayloadCMS — customer
								management, coupon/voucher system, table management, and sales +
								stock inventory reporting across branches.
							</li>
						</ul>
					</ExpCard>
					<ExpCard>
						<h3 className="text-zinc-100 font-medium text-base">
							Kernel International Ltd., Dhaka, Bangladesh
						</h3>
						<p className="text-zinc-500 text-xs mt-1">
							Fullstack Developer (Intern) — Dec 2019 – Jan 2022
						</p>
						<ul className="mt-3 space-y-1.5 text-zinc-400 text-sm leading-relaxed list-disc list-inside">
							<li>
								Developed and deployed NoticeBee, a realtime notice platform
								using Socket.io, adopted by 100+ government colleges under CEDP
								for remote notice broadcasting.
							</li>
							<li>
								Built and shipped Medibee, a medical student subscription
								platform (React/Vite/Express monorepo) with API and admin panel,
								now serving 1,000+ active subscribers.
							</li>
							<li>
								Maintained and improved multiple production apps including a
								government horticulture reporting platform — fixing UI bugs,
								adding pagination, and managing Linux/Docker/Nginx deployments.
							</li>
						</ul>
					</ExpCard>
				</div>
			);
		case SectionId.Education:
			return (
				<div>
					<h2 className="text-lg font-semibold text-zinc-300 mb-2">
						Education
					</h2>
					<article className="mb-3 last:mb-0">
						<h3 className="text-zinc-200 font-medium">
							University of Bedfordshire, Luton, UK
						</h3>
						<p className="text-zinc-400 text-sm mt-1">
							MSc in Artificial Intelligence — September 2025 – Present
						</p>
					</article>
					<article className="mb-3 last:mb-0">
						<h3 className="text-zinc-200 font-medium">
							Islamic University of Technology, Dhaka, Bangladesh
						</h3>
						<p className="text-zinc-400 text-sm mt-1">
							BBA in Business and Technology Management — January 2018 – May
							2022
						</p>
					</article>
				</div>
			);
		case SectionId.Research:
			return (
				<div>
					<h2 className="text-lg font-semibold text-zinc-300 mb-2">Research</h2>
					<ul className="space-y-1 text-zinc-300 text-sm">
						<li>
							Mahmud, N. and Chowdhury, T.A. (2024) "Survival Prediction of
							Septic Patients Using Boosting and Oversampling Techniques", 2024
							International Conference on Machine Learning and Cybernetics
							(ICMLC), pp. 71–76.
							<a
								href="https://doi.org/10.1109/icmlc63072.2024.10935134"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-blue-400 hover:text-blue-300 mt-1 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
								aria-label="View publication on IEEE (opens in new tab)"
							>
								https://doi.org/10.1109/icmlc63072.2024.10935134
							</a>
						</li>
					</ul>
				</div>
			);
		case SectionId.Extracurricular:
			return (
				<div>
					<h2 className="text-lg font-semibold text-zinc-300 mb-2">
						Extracurricular
					</h2>
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
