import { useState } from "react";
import type { SectionId } from "../sections";
import { ALL_SECTIONS, SECTION_LABELS } from "../sections";

interface NavbarProps {
	active: SectionId;
	onSelect: (id: SectionId) => void;
	onContact: () => void;
}

const BTN =
	"text-sm transition-colors px-1 py-2 sm:py-0.5 rounded text-left " +
	"focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 ";

export default function Navbar({ active, onSelect, onContact }: NavbarProps) {
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
					<button
						key={id}
						type="button"
						onClick={() => {
							onSelect(id);
							setOpen(false);
						}}
						aria-current={id === active ? "page" : undefined}
						className={
							BTN +
							(id === active
								? "text-zinc-100 sm:border-b sm:border-zinc-100"
								: "text-zinc-500 hover:text-zinc-300")
						}
					>
						{SECTION_LABELS[id]}
					</button>
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
