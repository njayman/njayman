import type { SectionId } from "../sections";
import { ALL_SECTIONS, SECTION_LABELS } from "../sections";

interface NavbarProps {
	active: SectionId;
	onSelect: (id: SectionId) => void;
	onContact: () => void;
}

export default function Navbar({ active, onSelect, onContact }: NavbarProps) {
	return (
		<nav
			aria-label="Main navigation"
			className="flex gap-2 p-3 border-b border-zinc-800 bg-zinc-900"
		>
			{ALL_SECTIONS.map((id) => (
				<button
					key={id}
					type="button"
					onClick={() => onSelect(id)}
					aria-current={id === active ? "page" : undefined}
					className={
						"text-sm transition-colors px-1 py-0.5 rounded " +
						"focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 " +
						(id === active
							? "text-zinc-100 border-b border-zinc-100"
							: "text-zinc-500 hover:text-zinc-300")
					}
				>
					{SECTION_LABELS[id]}
				</button>
			))}
			<span className="text-zinc-700 mx-1" aria-hidden="true">
				|
			</span>
			<button
				type="button"
				onClick={onContact}
				className={
					"text-sm transition-colors px-1 py-0.5 rounded " +
					"focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 " +
					"text-zinc-500 hover:text-zinc-300"
				}
			>
				Contact
			</button>
		</nav>
	);
}
