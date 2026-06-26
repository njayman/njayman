import { useCallback, useEffect, useRef, useState } from "react";
import CommandInput from "./components/CommandInput";
import ContactDialog from "./components/ContactDialog";
import Navbar from "./components/Navbar";
import { renderSection, SectionId } from "./sections";

export default function App() {
	const [active, setActive] = useState<SectionId>(SectionId.Hero);
	const [feedback, setFeedback] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const feedbackTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

	const showFeedback = useCallback((msg: string) => {
		setFeedback(msg);
		clearTimeout(feedbackTimer.current);
		feedbackTimer.current = setTimeout(() => setFeedback(null), 2500);
	}, []);

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

			<div
				aria-live="polite"
				aria-atomic="true"
				className={
					feedback
						? "bg-zinc-800 text-zinc-300 text-xs text-center py-1"
						: "sr-only"
				}
			>
				{feedback ?? ""}
			</div>

			<main id="main-content" className="flex-1 scrollable" tabIndex={-1}>
				<div
					className="min-h-full flex items-center justify-center p-4 sm:p-8 md:p-12"
					key={active}
					style={{ animation: "fadeIn 0.15s ease" }}
				>
					<div className="w-full max-w-3xl">{renderSection(active)}</div>
				</div>
			</main>

			<CommandInput
				onCommand={setActive}
				onContact={() => setDialogOpen(true)}
				onInvalid={showFeedback}
				onFocusInput={(el) => {
					inputRef.current = el;
				}}
			/>

			<ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
		</div>
	);
}
