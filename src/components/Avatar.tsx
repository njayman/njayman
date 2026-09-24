import { useEffect, useRef } from "react";

// Coordinates in avatar.png pixels (445x680). Pupils were erased from the PNG and are drawn here.
const IMG_W = 445;
const IMG_H = 680;
const PUPIL = 39;
const RANGE = { x: 30, y: 25 }; // max pupil travel from eye centre, stays inside the whites
const EYES = [
	{ cx: 159, cy: 326, restX: 190, restY: 330.5 },
	{ cx: 281, cy: 324, restX: 254, restY: 330.5 },
];

// translate() percentages are relative to the pupil, so image px / PUPIL * 100 = %.
const toTransform = (dx: number, dy: number) =>
	`translate(${(dx / PUPIL) * 100}%, ${(dy / PUPIL) * 100}%)`;

export default function Avatar({
	alt,
	className,
}: {
	alt: string;
	className: string;
}) {
	const boxRef = useRef<HTMLDivElement>(null);
	const pupilRefs = useRef<(HTMLSpanElement | null)[]>([]);

	useEffect(() => {
		function onMove(e: PointerEvent) {
			const box = boxRef.current?.getBoundingClientRect();
			if (!box) return;
			const scale = box.width / IMG_W;
			EYES.forEach((eye, i) => {
				const el = pupilRefs.current[i];
				if (!el) return;
				const dx = e.clientX - (box.left + eye.cx * scale);
				const dy = e.clientY - (box.top + eye.cy * scale);
				const dist = Math.hypot(dx, dy) || 1;
				// ponytail: linear ramp to full travel at 150px from the eye
				const reach = Math.min(dist / 150, 1);
				el.style.transform = toTransform(
					(dx / dist) * reach * RANGE.x,
					(dy / dist) * reach * RANGE.y,
				);
			});
		}
		window.addEventListener("pointermove", onMove);
		return () => window.removeEventListener("pointermove", onMove);
	}, []);

	return (
		<div ref={boxRef} data-no-enter className={`w-fit ${className}`}>
			<img
				src="/avatar.png"
				alt={alt}
				width={IMG_W}
				height={IMG_H}
				className="h-full w-auto drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
			/>
			{EYES.map((eye, i) => (
				<span
					key={eye.cx}
					ref={(el) => {
						pupilRefs.current[i] = el;
					}}
					aria-hidden="true"
					className="absolute rounded-full bg-black"
					style={{
						left: `${((eye.cx - PUPIL / 2) / IMG_W) * 100}%`,
						top: `${((eye.cy - PUPIL / 2) / IMG_H) * 100}%`,
						width: `${(PUPIL / IMG_W) * 100}%`,
						height: `${(PUPIL / IMG_H) * 100}%`,
						transform: toTransform(eye.restX - eye.cx, eye.restY - eye.cy),
					}}
				/>
			))}
		</div>
	);
}
