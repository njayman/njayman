import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Avatar from "./components/Avatar";
import CommandInput from "./components/CommandInput";
import ContactDialog from "./components/ContactDialog";
import Navbar from "./components/Navbar";
import PageWipe, { type PageWipeHandle } from "./components/PageWipe";
import {
	ALL_SECTIONS,
	renderSection,
	SECTION_COLORS,
	SectionId,
} from "./sections";

// "" -> home, "#skills" -> skills, anything else (e.g. #main-content skip link) -> ignore.
function sectionFromHash(): SectionId | null {
	const h = window.location.hash.slice(1);
	if (!h) return SectionId.Hero;
	return ALL_SECTIONS.find((id) => id === h) ?? null;
}

const reduceMotion = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Each block of the incoming page flies in with blur, tilt and an overshoot.
const ENTER: Keyframe[] = [
	{
		opacity: 0,
		transform: "translateY(56px) rotate(-5deg) scale(0.9)",
		filter: "blur(14px)",
	},
	{ opacity: 1, transform: "none", filter: "blur(0)" },
];

// Top two levels of the page, minus things with their own entrance (letter-split
// headings, self-drawing card outlines, physics bubbles, avatar pupils).
function enterTargets(root: Element) {
	return [
		...root.querySelectorAll(":scope > * > *, :scope > * > * > *"),
	].filter(
		(el) =>
			!/^(H1|H2|svg)$/i.test(el.tagName) &&
			!el.parentElement?.closest("[data-no-enter]"),
	);
}

export default function App() {
	// `active` is where the user is headed (drives the nav); `shown` is what's on screen.
	const [active, setActive] = useState<SectionId>(SectionId.Hero);
	const [shown, setShown] = useState<SectionId>(SectionId.Hero);
	const wipe = useRef<PageWipeHandle>(null);
	const target = useRef<SectionId>(SectionId.Hero);
	const busy = useRef(false);
	const pageRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLElement>(null);
	const firstRender = useRef(true);
	const shownRef = useRef<SectionId>(SectionId.Hero);

	function show(id: SectionId) {
		shownRef.current = id;
		mainRef.current?.scrollTo(0, 0);
		setShown(id);
	}

	// Whole transition fits in ~1s: cover 0.4s, reveal 0.4s, entrance overlaps the reveal.
	async function navigate(id: SectionId) {
		setActive(id);
		target.current = id;
		if (busy.current || id === shownRef.current) return; // a running transition picks up the latest target
		if (reduceMotion() || !wipe.current) {
			show(id);
			return;
		}
		busy.current = true;
		while (target.current !== shownRef.current) {
			const next = target.current;
			await wipe.current.cover(SECTION_COLORS[next]);
			show(next);
			await wipe.current.reveal();
		}
		busy.current = false;
	}

	// The URL hash is the source of truth: nav links, the command box and back/forward all go through it.
	// biome-ignore lint/correctness/useExhaustiveDependencies: navigate only touches refs and setters
	useEffect(() => {
		const initial = sectionFromHash();
		// Prerendered HTML is the home page; jump straight to a shared #page after hydrating.
		if (initial && initial !== SectionId.Hero) {
			target.current = initial;
			setActive(initial);
			show(initial);
		}
		const onHash = () => {
			const id = sectionFromHash();
			if (id) navigate(id);
		};
		window.addEventListener("hashchange", onHash);
		return () => window.removeEventListener("hashchange", onHash);
	}, []);

	const go = (id: SectionId) => {
		window.location.hash = id;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: replay the entrance whenever the shown page changes
	useLayoutEffect(() => {
		if (firstRender.current) {
			firstRender.current = false; // prerendered page is already visible, don't hide it
			return;
		}
		const root = pageRef.current;
		if (!root || reduceMotion()) return;
		enterTargets(root).forEach((el, i) => {
			el.animate(ENTER, {
				duration: 400,
				delay: 30 + Math.min(i, 12) * 12,
				easing: "cubic-bezier(0.2, 1.35, 0.4, 1)",
				fill: "backwards",
			});
		});
	}, [shown]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		function handleKey(e: Event) {
			const ke = e as KeyboardEvent;
			if (
				ke.key === "/" &&
				inputRef.current &&
				document.activeElement !== inputRef.current
			) {
				e.preventDefault();
				inputRef.current.focus();
			}
		}
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	const isHero = shown === SectionId.Hero;
	const commandInput = (
		<CommandInput
			hero={isHero}
			onCommand={go}
			onContact={() => setDialogOpen(true)}
			onFocusInput={(el) => {
				inputRef.current = el;
			}}
		/>
	);

	return (
		<div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-zinc-900 focus:text-zinc-100 focus:p-3 focus:rounded focus:border focus:border-zinc-700"
			>
				Skip to content
			</a>

			<Navbar active={active} onContact={() => setDialogOpen(true)} />

			<main
				ref={mainRef}
				id="main-content"
				className="flex-1 scrollable"
				tabIndex={-1}
			>
				<div
					className="min-h-full flex items-center justify-center p-4 sm:p-8 md:p-12"
					key={shown}
				>
					<div ref={pageRef} className="w-full max-w-3xl">
						{renderSection(shown)}
						{isHero && commandInput}
					</div>
				</div>
			</main>

			{!isHero && commandInput}

			{!isHero && (
				// Decorative duplicate of the hero avatar; mouse devices only, where the eyes can track.
				<Avatar
					alt=""
					className="fixed bottom-16 left-4 h-24 pointer-events-none hidden lg:pointer-fine:block"
				/>
			)}

			<PageWipe ref={wipe} />

			<ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
		</div>
	);
}
