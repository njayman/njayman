import type { ReactNode } from "react";

interface ExpCardProps {
	children: ReactNode;
}

export default function ExpCard({ children }: ExpCardProps) {
	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/30">
			{children}
		</div>
	);
}
