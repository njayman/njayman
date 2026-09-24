import { useEffect, useRef } from "react";
import ExpCard from "./ExpCard";

interface ContactDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function ContactDialog({ open, onClose }: ContactDialogProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (open && !el.open) el.showModal();
		else if (!open && el.open) el.close();
	}, [open]);

	function send() {
		window.open("mailto:najishmahmud@gmail.com", "_blank");
		onClose();
	}

	return (
		<dialog
			ref={ref}
			onClose={onClose}
			className="dialog-pop m-auto bg-transparent text-zinc-100 p-0 max-w-sm w-[calc(100%-2rem)] overflow-visible backdrop:bg-black/70"
		>
			<ExpCard
				color="text-matte-blue"
				className="p-6 rounded-2xl bg-zinc-950 flex flex-col gap-5"
			>
				<p className="text-sm leading-relaxed text-center">
					Send an email to{" "}
					<strong className="text-matte-blue">najishmahmud@gmail.com</strong>?
				</p>
				<div className="flex gap-6 justify-center text-sm">
					<button
						type="button"
						onClick={onClose}
						className="text-zinc-400 hover:text-zinc-100 focus-visible:text-zinc-100 focus-visible:underline focus-visible:outline-none transition-colors"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={send}
						className="text-matte-blue hover:text-zinc-100 focus-visible:text-zinc-100 focus-visible:underline focus-visible:outline-none transition-colors font-medium"
					>
						Send
					</button>
				</div>
			</ExpCard>
		</dialog>
	);
}
