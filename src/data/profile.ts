export interface SkillCategory {
	color: string;
	skills: string[];
}

export interface Experience {
	company: string;
	location: string;
	role: string;
	dates: string;
	bullets: string[];
}

export interface Project {
	name: string;
	description: string;
	url?: string;
}

export interface Education {
	institution: string;
	location: string;
	degree: string;
	dates: string;
}

export interface ResearchEntry {
	citation: string;
	doi: string;
}

export const NAME = "Najish Mahmud";
export const TITLE = "Full Stack Engineer";

export const SUMMARY =
	"Full-stack engineer with 4+ years building React/TypeScript web applications, including real-time data platforms using Socket.io and WebSocket state management. Self-taught in Go — built CLI tools and game projects independently. Experience with financial transaction flows through open banking integration and payment reconciliation. Comfortable owning features end to end in fast-moving, process-forming environments.";

export const ABOUT_LONG =
	"Full-stack TypeScript engineer with 5+ years building production web applications across React, Next.js, Express, NestJS and TypeScript. Experienced in delivering end-to-end features including AI inference visualization, open banking integrations, and complex UI systems. Currently completing an MS in Artificial Intelligence at the University of Bedfordshire.";

export const SKILL_CATEGORIES: Record<string, SkillCategory> = {
	Languages: {
		color: "bg-blue-600/20 text-blue-300 border-blue-700/30",
		skills: ["TypeScript", "JavaScript", "Python", "Go"],
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
		skills: [
			"NestJS",
			"Node.js",
			"Express",
			"Go",
			"FastAPI",
			"Django",
			"PayloadCMS",
		],
	},
	Databases: {
		color: "bg-amber-600/20 text-amber-300 border-amber-700/30",
		skills: ["PostgreSQL", "Redis", "BullMQ", "Linode OSS"],
	},
	DevOps: {
		color: "bg-rose-600/20 text-rose-300 border-rose-700/30",
		skills: ["Docker", "Docker Compose", "Linux", "Nginx", "CI/CD", "Coolify"],
	},
	Testing: {
		color: "bg-emerald-600/20 text-emerald-300 border-emerald-700/30",
		skills: ["Jest", "React Testing Library"],
	},
	Cloud: {
		color: "bg-sky-600/20 text-sky-300 border-sky-700/30",
		skills: ["Azure", "AWS", "Coolify"],
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

export const EXPERIENCES: Experience[] = [
	{
		company: "Malda Limited",
		location: "London, UK",
		role: "Fullstack TypeScript Developer",
		dates: "Nov 2025 – May 2026",
		bullets: [
			"Implemented Atto open banking integration end-to-end — reverse-engineered OAuth consent flow from incomplete API docs, built bank account linking modal and transaction sync pipeline for automated rent reconciliation.",
			"Delivered Finance page from scratch: rent charge management, transaction uploads, and reconciliation UI visualizing AI-generated payment-matching suggestions with confidence scores.",
			"Built full-stack features across a Next.js/NestJS property management platform — controllers, services, and APIs for properties, finance, and document modules.",
			"Revamped dynamic form builder to support 30+ AI-extracted house rental document types; built hierarchical property-unit selector for multi-unit management.",
		],
	},
	{
		company: "Therap (BD) Ltd",
		location: "Dhaka, Bangladesh",
		role: "Software Engineer",
		dates: "Jun 2023 – Aug 2025",
		bullets: [
			"Led ground-up development of an internal React + TypeScript UI component library as first React hire — DateTimePicker, Data Table, Localization Context with Storybook docs and unit tests; library powers the UI overhaul of electronic health records used across 26 US states.",
			"Developed QA Assistant notification system — real-time form rejection alerts surfaced via a floating Web Component embedding React, enabling reuse of the internal component library within legacy JSP pages; owned end to end.",
			"Built web components integrating legacy jQuery/JSP widgets with React, bridging old and new frontend architectures.",
			"Used Claude AI for debugging, code generation, and navigating unfamiliar areas of the codebase; wrote unit tests with Jest and React Testing Library for the component library.",
			"Mentored new recruits on React/TypeScript patterns and component architecture.",
		],
	},
	{
		company: "Mir Info Systems Limited",
		location: "Dhaka, Bangladesh",
		role: "Software Engineer",
		dates: "Mar 2022 – May 2023",
		bullets: [
			"Built near-realtime payment analytics dashboard using TanStack Query/Table with 5-min auto-fetch, live metrics, and filterable paginated tables.",
			"Built backend services with Node.js, FastAPI, and Django; deployed Rasa chatbot end-to-end including custom action server and containerization.",
		],
	},
	{
		company: "Kernel International Ltd.",
		location: "Dhaka, Bangladesh",
		role: "Fullstack Developer (Freelance)",
		dates: "Jan 2022 – Present",
		bullets: [
			"Architected and built NoticeBee from scratch — real-time notice platform using Socket.io and React with admin dashboard and kiosk display mode; v2 added offline/online status, multipart upload, layout management. Adopted by 100+ govt. colleges.",
			"Built Jacks Burger (UK) admin panel with Next.js + PayloadCMS — customer management, coupons, table management, and branch-level inventory reporting.",
			"Configured Jitsi WebRTC video infrastructure for Medibee's early platform, supporting live sessions for 20–30 concurrent users.",
			"Managed client relationships end-to-end via Fiverr — gathered requirements, scoped solutions, and iterated to delivery across multiple projects.",
			"Maintain Medibee and NoticeBee post-launch: CI/CD via Coolify, deployments, and feature updates.",
		],
	},
];

export const PROJECTS: Project[] = [
	{
		name: "proz",
		description:
			"Cross-platform CLI + TUI project launcher built with Go, Bubbletea and Cobra. Fuzzy-find and jump between projects from any terminal.",
		url: "https://github.com/njayman/proz",
	},
	{
		name: "raylibgame",
		description:
			"2D boss-fight game built with Go and raylib — state-machine AI, collision detection, HUD, and health-bar systems.",
		url: "https://github.com/njayman/raylibgame",
	},
	{
		name: "noticable",
		description:
			"Fork and rebuild of NoticeBee — realtime notice platform built with Socket.io and React — admin dashboard, kiosk display, multipart upload, layout management. Adopted by 100+ government colleges under CEDP.",
		url: "https://codeberg.org/njayman/noticable",
	},
	{
		name: "medible",
		description:
			"Fork and rebuild of Medibee — MERN stack subscription platform serving curated medical video content via Vimeo. Admin panel, student dashboards, and 1,000+ active subscribers.",
		url: "https://codeberg.org/njayman/medible",
	},
	{
		name: "brain.md Skills",
		description:
			"Agent Skill/MCP plugin that teaches AI coding agents (Claude Code, Cursor, VS Code Copilot) to connect to and use brain.md, a local-first Markdown knowledge vault — auth, search, and note read/write across 16+ tools.",
		url: "https://github.com/njayman/brainmd-skills",
	},
];

export const EDUCATION: Education[] = [
	{
		institution: "University of Bedfordshire",
		location: "Luton, UK",
		degree: "MSc in Artificial Intelligence",
		dates: "September 2025 – Present",
	},
	{
		institution: "Islamic University of Technology",
		location: "Dhaka, Bangladesh",
		degree: "BBA in Business and Technology Management",
		dates: "January 2018 – May 2022",
	},
];

export const RESEARCH: ResearchEntry[] = [
	{
		citation:
			'Mahmud, N. and Chowdhury, T.A. (2024) "Survival Prediction of Septic Patients Using Boosting and Oversampling Techniques", 2024 International Conference on Machine Learning and Cybernetics (ICMLC), pp. 71–76.',
		doi: "10.1109/icmlc63072.2024.10935134",
	},
];

export const HERO_LINKS = [
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
