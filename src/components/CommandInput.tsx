import { type FormEvent, type KeyboardEvent, useRef } from "react";
import type { SectionId } from "../sections";
import { ALL_SECTIONS } from "../sections";

interface CommandInputProps {
	onCommand: (id: SectionId) => void;
	onContact: () => void;
	onInvalid: (msg: string) => void;
	onFocusInput: (el: HTMLInputElement) => void;
}

export default function CommandInput({
	onCommand,
	onContact,
	onInvalid,
	onFocusInput,
}: CommandInputProps) {
	const ref = useRef<HTMLInputElement>(null);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const input = ref.current;
		if (!input) return;

		const val = input.value.trim().toLowerCase();
		if (!val) return;

		if (val === "contact") {
			onContact();
			input.value = "";
			return;
		}

		const match = ALL_SECTIONS.find((s) => s === val) as SectionId | undefined;
		if (match) {
			onCommand(match);
			input.value = "";
		} else {
			onInvalid(`"${val}" is not a valid section`);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape" && ref.current) {
			ref.current.value = "";
			ref.current.blur();
		}
	}

	return (
		<search>
			<form onSubmit={handleSubmit} className="border-t border-zinc-800 p-3">
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
					onKeyDown={handleKeyDown}
					className="w-full bg-transparent text-zinc-100 placeholder-zinc-600 outline-none"
				/>
			</form>
		</search>
	);
}
