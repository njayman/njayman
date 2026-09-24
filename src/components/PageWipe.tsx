import { type Ref, useImperativeHandle, useRef } from "react";

export interface PageWipeHandle {
	cover: (color: string) => Promise<void>;
	reveal: () => Promise<void>;
}

const DURATION = 400; // each way, so a full page change stays around 1s with the entrance
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
// Skewed and oversized so the slanted edges never show a gap.
const OFF_LEFT = "translateX(-130%) skewX(-14deg)";
const ON = "translateX(0) skewX(-14deg)";
const OFF_RIGHT = "translateX(130%) skewX(-14deg)";
const BASE =
	"absolute -inset-y-10 -left-[20%] w-[140%] bg-zinc-900 border-x-4 border-current";

// A single slanted slab sweeps in, the page swaps underneath, and it sweeps out the other side.
export default function PageWipe({ ref }: { ref: Ref<PageWipeHandle> }) {
	const panel = useRef<HTMLDivElement>(null);

	function slide(from: string, to: string) {
		const anim = panel.current?.animate(
			[{ transform: from }, { transform: to }],
			{
				duration: DURATION,
				easing: EASE,
				fill: "forwards",
			},
		);
		return anim ? anim.finished.then(() => undefined) : Promise.resolve();
	}

	useImperativeHandle(ref, () => ({
		cover(color) {
			// The edge takes the destination page's accent colour (via currentColor).
			if (panel.current) panel.current.className = `${BASE} ${color}`;
			return slide(OFF_LEFT, ON);
		},
		reveal: () => slide(ON, OFF_RIGHT),
	}));

	return (
		<div
			aria-hidden="true"
			className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
		>
			<div
				ref={panel}
				className={`${BASE} text-matte-teal`}
				style={{ transform: OFF_LEFT }}
			/>
		</div>
	);
}
