import { useState } from "react";
import type { SectionId } from "../sections";
import { ALL_SECTIONS, SECTION_LABELS } from "../sections";

interface NavbarProps {
	active: SectionId;
	onContact: () => void;
}

const BTN =
	"text-sm transition-colors px-1 py-2 sm:py-0.5 text-left " +
	"focus-visible:outline-none focus-visible:underline ";

export default function Navbar({ active, onContact }: NavbarProps) {
	const [open, setOpen] = useState(false);

	return (
		<nav
			aria-label="Main navigation"
			className="p-3 border-b border-zinc-800 bg-zinc-900"
		>
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				aria-controls="nav-links"
				className={`${BTN}sm:hidden text-zinc-300 hover:text-zinc-100`}
			>
				{open ? "✕ Close" : "☰ Menu"}
			</button>
			<div
				id="nav-links"
				className={`${open ? "flex" : "hidden"} flex-col mt-2 sm:mt-0 sm:flex sm:flex-row sm:flex-wrap gap-1 sm:gap-2`}
			>
				{ALL_SECTIONS.map((id) => (
					// Real links so every page has a shareable URL (#skills etc.); App listens for hashchange.
					<a
						key={id}
						href={`#${id}`}
						onClick={() => setOpen(false)}
						aria-current={id === active ? "page" : undefined}
						className={
							BTN +
							(id === active
								? "text-matte-blue"
								: "text-zinc-500 hover:text-zinc-300")
						}
					>
						{SECTION_LABELS[id]}
					</a>
				))}
				<span
					className="hidden sm:inline text-zinc-700 mx-1"
					aria-hidden="true"
				>
					|
				</span>
				<button
					type="button"
					onClick={() => {
						onContact();
						setOpen(false);
					}}
					className={`${BTN}text-zinc-500 hover:text-zinc-300`}
				>
					Contact
				</button>
			</div>
		</nav>
	);
}
