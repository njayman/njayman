import { type PointerEvent, useLayoutEffect, useRef, useState } from "react";

interface Skill {
	label: string;
	color: string;
}

interface Body {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
	g: number; // growth 0..1; a popped bubble blooms back from 0
}

const WOBBLE: Keyframe[] = [
	{ transform: "scale(1, 1)" },
	{ transform: "scale(1.12, 0.9)" },
	{ transform: "scale(0.92, 1.08)" },
	{ transform: "scale(1.04, 0.97)" },
	{ transform: "scale(1, 1)" },
];

const POP: Keyframe[] = [
	{ transform: "scale(1)", opacity: 1, filter: "blur(0)" },
	{ transform: "scale(1.4)", opacity: 0, filter: "blur(3px)" },
];

// Hand-drawn bubble outline in a 100x100 box: slightly lumpy, ends overlap like a pen stroke,
// plus a short highlight arc inside. Seeded per bubble so each one wobbles differently.
function bubblePaths(seed: number) {
	const start = seed * 1.7;
	const pts: string[] = [];
	for (let k = 0; k <= 52; k++) {
		const a = start + (k / 48) * Math.PI * 2; // 52/48 = small overlap past closed
		const r =
			46 + 1.3 * Math.sin(2 * a + seed) + 0.7 * Math.sin(5 * a + seed * 2);
		pts.push(
			`${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`,
		);
	}
	const h0 = Math.PI * (1.08 + (seed % 3) * 0.04);
	const h1 = h0 + Math.PI * 0.3;
	const arc = (a: number) =>
		`${(50 + 33 * Math.cos(a)).toFixed(1)} ${(50 + 33 * Math.sin(a)).toFixed(1)}`;
	return {
		outline: `M ${pts.join(" L ")}`,
		highlight: `M ${arc(h0)} A 33 33 0 0 1 ${arc(h1)}`,
	};
}

// Tuning, per 60 Hz step.
const PULL = 0.35; // constant pull toward the cluster centre
const DAMP = 0.88;
const JITTER = 0.25; // idle wiggle so the blob looks alive
const GAP = 3;
const PUSH_REACH = 60; // pointer shoves bubbles within r + this
const PUSH_FORCE = 2.5;
const GROW = 0.035; // growth per step, ~0.5s to full size
const STEP_MS = 1000 / 60;

// Diameter in em, grows with label length so long names still fit.
const diameter = (label: string) => Math.min(5.5 + label.length * 0.2, 8);

const reduceMotion = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function draw(el: HTMLElement | null | undefined, b: Body) {
	if (!el) return;
	// Ease-out-back on the visual scale so the bloom overshoots slightly.
	const g = Math.max(b.g, 0); // negative g = still waiting to bloom in
	const t = g - 1;
	const scale = g <= 0 ? 0 : g < 1 ? 1 + 2.7 * t ** 3 + 1.7 * t ** 2 : 1;
	el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px) scale(${scale})`;
}

function step(
	bs: Body[],
	{ w, h }: { w: number; h: number },
	p: { x: number; y: number } | null,
) {
	for (const b of bs) {
		const dx = w / 2 - b.x;
		const dy = h / 2 - b.y;
		const d = Math.hypot(dx, dy) || 1;
		b.vx += (dx / d) * PULL + (Math.random() - 0.5) * JITTER;
		b.vy += (dy / d) * PULL + (Math.random() - 0.5) * JITTER;
		if (p) {
			const px = b.x - p.x;
			const py = b.y - p.y;
			const pd = Math.hypot(px, py) || 1;
			const reach = b.r + PUSH_REACH;
			if (pd < reach) {
				const f = (1 - pd / reach) * PUSH_FORCE;
				b.vx += (px / pd) * f;
				b.vy += (py / pd) * f;
			}
		}
		b.g = Math.min(b.g + GROW, 1);
		b.vx *= DAMP;
		b.vy *= DAMP;
		b.x += b.vx;
		b.y += b.vy;
	}
	// ponytail: O(n²) pair check, fine for ~50 bubbles; spatial grid if this grows to hundreds
	for (let pass = 0; pass < 3; pass++) {
		for (let i = 0; i < bs.length; i++) {
			for (let j = i + 1; j < bs.length; j++) {
				const a = bs[i];
				const c = bs[j];
				const dx = c.x - a.x;
				const dy = c.y - a.y;
				const d = Math.hypot(dx, dy) || 0.01;
				// Radii scale with growth, so a blooming bubble shoulders its neighbours aside.
				const overlap =
					a.r * Math.max(a.g, 0) + c.r * Math.max(c.g, 0) + GAP - d;
				if (overlap <= 0) continue;
				const ox = (dx / d) * overlap * 0.5;
				const oy = (dy / d) * overlap * 0.5;
				a.x -= ox;
				a.y -= oy;
				c.x += ox;
				c.y += oy;
			}
		}
	}
	for (const b of bs) {
		b.x = Math.min(Math.max(b.x, b.r), w - b.r);
		b.y = Math.min(Math.max(b.y, b.r), h - b.r);
	}
}

export default function SkillBubbles({ skills }: { skills: Skill[] }) {
	const [paths] = useState(() => skills.map((_, i) => bubblePaths(i)));
	const boxRef = useRef<HTMLUListElement>(null);
	const items = useRef<(HTMLLIElement | null)[]>([]);
	const bodies = useRef<Body[]>([]);
	const box = useRef({ w: 0, h: 0 });
	const pointer = useRef<{ x: number; y: number } | null>(null);
	const hovered = useRef(-1);
	const popping = useRef(new Set<number>());

	useLayoutEffect(() => {
		const el = boxRef.current;
		if (!el) return;

		function layout() {
			if (!el) return;
			const w = el.clientWidth;
			const fs = Number.parseFloat(getComputedStyle(el).fontSize);
			const radii = skills.map((s) => (diameter(s.label) * fs) / 2);
			const area = radii.reduce((sum, r) => sum + Math.PI * r * r, 0);
			// Tall enough for the blob to pack loosely at this width.
			const h = Math.max(w * 0.6, area / (0.62 * w));
			el.style.height = `${h}px`;
			box.current = { w, h };
			if (bodies.current.length) {
				bodies.current.forEach((b, i) => {
					b.r = radii[i];
				});
				return;
			}
			// Start loosely spread on a sunflower spiral so the blob visibly clumps together.
			bodies.current = radii.map((r, i) => {
				const a = i * 2.39996;
				const d = Math.sqrt(i + 0.5) * r * 1.6;
				return {
					x: w / 2 + Math.cos(a) * d,
					y: h / 2 + Math.sin(a) * d,
					vx: 0,
					vy: 0,
					r,
					// Staggered entrance: each bubble waits a little longer, then blooms.
					g: reduceMotion() ? 1 : -(2 + i * 0.2) * GROW,
				};
			});
		}

		const drawAll = () => {
			bodies.current.forEach((b, i) => {
				draw(items.current[i], b);
			});
		};
		layout();

		if (reduceMotion()) {
			for (let i = 0; i < 400; i++) step(bodies.current, box.current, null);
			drawAll();
			const ro = new ResizeObserver(() => {
				layout();
				for (let i = 0; i < 100; i++) step(bodies.current, box.current, null);
				drawAll();
			});
			ro.observe(el);
			return () => ro.disconnect();
		}

		drawAll();
		const ro = new ResizeObserver(layout);
		ro.observe(el);
		// Fixed 60 Hz steps so the feel is the same on 120 Hz screens.
		let last = performance.now();
		let acc = 0;
		let raf = requestAnimationFrame(function frame(t) {
			acc += Math.min(t - last, 100);
			last = t;
			while (acc >= STEP_MS) {
				step(bodies.current, box.current, pointer.current);
				acc -= STEP_MS;
			}
			drawAll();
			raf = requestAnimationFrame(frame);
		});
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, [skills]);

	function onPointerMove(e: PointerEvent) {
		const rect = boxRef.current?.getBoundingClientRect();
		if (!rect) return;
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		pointer.current = reduceMotion() ? null : { x, y };
		const i = bodies.current.findIndex(
			(b) => Math.hypot(b.x - x, b.y - y) < b.r,
		);
		if (i === hovered.current) return;
		hovered.current = i;
		const btn = items.current[i]?.firstElementChild;
		if (btn && !popping.current.has(i) && !reduceMotion())
			btn.animate(WOBBLE, { duration: 500, easing: "ease-out" });
	}

	function releasePointer() {
		pointer.current = null;
		hovered.current = -1;
	}

	function pop(i: number, btn: HTMLElement) {
		if (popping.current.has(i) || reduceMotion()) return;
		popping.current.add(i);
		const anim = btn.animate(POP, {
			duration: 220,
			easing: "ease-out",
			fill: "forwards",
		});
		anim.finished.then(() => {
			// Bloom back from the middle of the cluster (its centroid, nudged so it never sits exactly on another bubble).
			const bs = bodies.current;
			const b = bs[i];
			b.x =
				bs.reduce((sum, o) => sum + o.x, 0) / bs.length + Math.random() * 4 - 2;
			b.y =
				bs.reduce((sum, o) => sum + o.y, 0) / bs.length + Math.random() * 4 - 2;
			b.vx = 0;
			b.vy = 0;
			b.g = 0;
			draw(items.current[i], b);
			anim.cancel();
			popping.current.delete(i);
		});
	}

	return (
		<ul
			ref={boxRef}
			data-no-enter
			className="relative w-full text-[11px] sm:text-sm touch-pan-y"
			onPointerMove={onPointerMove}
			onPointerLeave={releasePointer}
			onPointerUp={(e) => {
				if (e.pointerType !== "mouse") releasePointer();
			}}
			onPointerCancel={releasePointer}
		>
			{skills.map(({ label, color }, i) => (
				<li
					// Labels repeat across categories (e.g. Go), so the index is the identity.
					// biome-ignore lint/suspicious/noArrayIndexKey: list is static, never reordered
					key={i}
					ref={(el) => {
						items.current[i] = el;
					}}
					className="absolute top-0 left-0 will-change-transform"
				>
					<button
						type="button"
						onClick={(e) => pop(i, e.currentTarget)}
						className={
							"relative flex items-center justify-center text-center leading-tight font-medium " +
							"rounded-full p-[0.7em] select-none cursor-pointer " +
							"focus-visible:outline-2 focus-visible:outline-matte-blue focus-visible:outline-offset-2 " +
							color
						}
						style={{
							width: `${diameter(label)}em`,
							height: `${diameter(label)}em`,
						}}
					>
						<svg
							viewBox="0 0 100 100"
							aria-hidden="true"
							className="absolute inset-0 size-full pointer-events-none overflow-visible"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path
								d={paths[i].outline}
								strokeWidth={2}
								vectorEffect="non-scaling-stroke"
							/>
							<path
								d={paths[i].highlight}
								strokeWidth={1.5}
								vectorEffect="non-scaling-stroke"
							/>
						</svg>
						{label}
					</button>
				</li>
			))}
		</ul>
	);
}
