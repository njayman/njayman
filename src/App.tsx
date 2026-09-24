import { useEffect, useRef, useState } from "react";
import Avatar from "./components/Avatar";
import CommandInput from "./components/CommandInput";
import ContactDialog from "./components/ContactDialog";
import Navbar from "./components/Navbar";
import { renderSection, SectionId } from "./sections";

export default function App() {
	const [active, setActive] = useState<SectionId>(SectionId.Hero);
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

	const isHero = active === SectionId.Hero;
	const commandInput = (
		<CommandInput
			hero={isHero}
			onCommand={setActive}
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

			<Navbar
				active={active}
				onSelect={setActive}
				onContact={() => setDialogOpen(true)}
			/>

			<main id="main-content" className="flex-1 scrollable" tabIndex={-1}>
				<div
					className="min-h-full flex items-center justify-center p-4 sm:p-8 md:p-12"
					key={active}
					style={{ animation: "fadeIn 0.15s ease" }}
				>
					<div className="w-full max-w-3xl">
						{renderSection(active)}
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

			<ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
		</div>
	);
}
