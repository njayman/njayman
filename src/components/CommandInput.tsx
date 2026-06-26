import { type FormEvent, type KeyboardEvent, useRef, useState } from "react";
import type { SectionId } from "../sections";
import { ALL_SECTIONS, SECTION_LABELS } from "../sections";

const SUGGESTIONS = [
	...ALL_SECTIONS.map((id) => ({ value: id, label: SECTION_LABELS[id] })),
	{ value: "contact", label: "Contact" },
];

interface CommandInputProps {
	onCommand: (id: SectionId) => void;
	onContact: () => void;
	onFocusInput: (el: HTMLInputElement) => void;
}

export default function CommandInput({
	onCommand,
	onContact,
	onFocusInput,
}: CommandInputProps) {
	const [inputVal, setInputVal] = useState("");
	const [highlighted, setHighlighted] = useState(0);
	const ref = useRef<HTMLInputElement>(null);

	const filtered = inputVal.trim()
		? SUGGESTIONS.filter((s) => s.value.includes(inputVal.trim().toLowerCase()))
		: SUGGESTIONS;

	const show = filtered.length > 0 && inputVal.length > 0;

	function select(val: string) {
		setInputVal("");
		if (val === "contact") {
			onContact();
		} else {
			const match = ALL_SECTIONS.find((s) => s === val);
			if (match) onCommand(match);
		}
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (show && filtered[highlighted]) {
			select(filtered[highlighted].value);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			setInputVal("");
			ref.current?.blur();
			return;
		}
		if (!show) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlighted((p) => Math.min(p + 1, filtered.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlighted((p) => Math.max(p - 1, 0));
		}
	}

	return (
		<search>
			<form
				onSubmit={handleSubmit}
				className="border-t border-zinc-800 p-3 relative"
			>
				<label htmlFor="command-input" className="sr-only">
					Jump to a section
				</label>
				<input
					id="command-input"
					ref={(el) => {
						ref.current = el;
						if (el) onFocusInput(el);
					}}
					type="text"
					placeholder="Type a section name or 'contact'..."
					value={inputVal}
					onChange={(e) => {
						setInputVal(e.target.value);
						setHighlighted(0);
					}}
					onFocus={() => setHighlighted(0)}
					onBlur={() => {
						setInputVal("");
					}}
					onKeyDown={handleKeyDown}
					className="w-full bg-transparent text-zinc-100 placeholder-zinc-600 outline-none"
				/>
				{show && (
					<ul className="absolute bottom-full left-0 right-0 mb-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-xl shadow-black/40">
						{filtered.map((s, i) => (
							<li
								key={s.value}
								onMouseDown={(e) => {
									e.preventDefault();
									select(s.value);
								}}
								onMouseEnter={() => setHighlighted(i)}
								className={
									"px-3 py-2 text-sm cursor-pointer transition-colors " +
									(i === highlighted
										? "bg-zinc-700 text-zinc-100"
										: "text-zinc-400 hover:bg-zinc-800")
								}
							>
								{s.label}
							</li>
						))}
					</ul>
				)}
			</form>
		</search>
	);
}
