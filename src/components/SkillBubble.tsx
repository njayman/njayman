interface SkillBubbleProps {
	label: string;
	color: string;
	index: number;
}

export default function SkillBubble({ label, color, index }: SkillBubbleProps) {
	return (
		<span
			className={
				"px-3 py-1.5 rounded-full border text-sm font-medium cursor-default " +
				"transition-all duration-200 " +
				"hover:scale-125 hover:brightness-125 hover:[animation-play-state:paused] " +
				"focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 " +
				color
			}
			style={{
				animation: `float ${1.5 + (index % 5) * 0.3}s ease-in-out ${index * 0.08}s infinite, glow ${2 + (index % 3) * 0.5}s ease-in-out ${index * 0.08}s infinite`,
			}}
		>
			{label}
		</span>
	);
}
