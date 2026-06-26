import { useEffect, useRef } from "react";

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
			className="bg-zinc-900 text-zinc-100 rounded-xl border border-zinc-800 p-6 shadow-2xl shadow-black/50 backdrop:bg-black/60 max-w-sm mx-auto open:flex open:flex-col open:gap-4"
		>
			<p className="text-sm leading-relaxed">
				Send an email to <strong>najishmahmud@gmail.com</strong>?
			</p>
			<div className="flex gap-3 justify-end">
				<button
					type="button"
					onClick={onClose}
					className="px-4 py-1.5 text-sm rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={send}
					className="px-4 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400"
				>
					Send
				</button>
			</div>
		</dialog>
	);
}
