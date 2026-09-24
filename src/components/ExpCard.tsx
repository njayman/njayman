import {
	type CSSProperties,
	type ReactNode,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

interface ExpCardProps {
	children: ReactNode;
	color?: string; // text-* class; drives the outline via currentColor
	className?: string;
}

const RADIUS = 14;
const INSET = 1.5; // keep the stroke inside the box

// Point and outward normal at distance s along a rounded rectangle, clockwise from the top-left.
function perimeterPoint(w: number, h: number, r: number, s: number) {
	const sw = w - 2 * r;
	const sh = h - 2 * r;
	const arc = (Math.PI * r) / 2;
	const total = 2 * sw + 2 * sh + 4 * arc;
	let d = ((s % total) + total) % total;
	const corner = (cx: number, cy: number, a0: number, t: number) => {
		const a = a0 + t / r;
		return {
			x: cx + r * Math.cos(a),
			y: cy + r * Math.sin(a),
			nx: Math.cos(a),
			ny: Math.sin(a),
		};
	};
	if (d < sw) return { x: r + d, y: 0, nx: 0, ny: -1 };
	d -= sw;
	if (d < arc) return corner(w - r, r, -Math.PI / 2, d);
	d -= arc;
	if (d < sh) return { x: w, y: r + d, nx: 1, ny: 0 };
	d -= sh;
	if (d < arc) return corner(w - r, h - r, 0, d);
	d -= arc;
	if (d < sw) return { x: w - r - d, y: h, nx: 0, ny: 1 };
	d -= sw;
	if (d < arc) return corner(r, h - r, Math.PI / 2, d);
	d -= arc;
	if (d < sh) return { x: 0, y: h - r - d, nx: -1, ny: 0 };
	d -= sh;
	return corner(r, r, Math.PI, d);
}

// Hand-drawn outline: gentle wobble along the edge, and the stroke runs a little past
// its start while drifting inward, like a pen closing a loop.
function sketch(w: number, h: number, seed: number) {
	const W = w - 2 * INSET;
	const H = h - 2 * INSET;
	const r = RADIUS;
	const total = 2 * (W - 2 * r) + 2 * (H - 2 * r) + 2 * Math.PI * r;
	const start = (seed * 97) % total;
	const overshoot = 22;
	const pts: string[] = [];
	for (let s = 0; s <= total + overshoot; s += 8) {
		const p = perimeterPoint(W, H, r, start + s);
		const drift = s > total ? -((s - total) / overshoot) * 2.5 : 0;
		const wob =
			0.5 * Math.sin(s / 90 + seed) +
			0.2 * Math.sin(s / 29 + seed * 1.7) +
			drift;
		pts.push(
			`${(INSET + p.x + p.nx * wob).toFixed(1)} ${(INSET + p.y + p.ny * wob).toFixed(1)}`,
		);
	}
	// Short highlight curve tucked inside the top-left corner, echoing the bubbles.
	const hr = r - 5;
	const c = INSET + r;
	const a0 = Math.PI * 1.12;
	const a1 = Math.PI * 1.38;
	const highlight = `M ${(c + hr * Math.cos(a0)).toFixed(1)} ${(c + hr * Math.sin(a0)).toFixed(1)} A ${hr} ${hr} 0 0 1 ${(c + hr * Math.cos(a1)).toFixed(1)} ${(c + hr * Math.sin(a1)).toFixed(1)}`;
	return { outline: `M ${pts.join(" L ")}`, highlight };
}

export default function ExpCard({
	children,
	color = "text-zinc-600",
	className = "p-5 transition-transform duration-200 hover:-translate-y-0.5",
}: ExpCardProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState<{ w: number; h: number } | null>(null);
	const [seed] = useState(() => Math.random() * 10);

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		const ro = new ResizeObserver(() =>
			setSize({ w: el.offsetWidth, h: el.offsetHeight }),
		);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	// Hidden (e.g. a closed dialog) measures 0x0: draw nothing, and redraw on show.
	const paths =
		size && size.w > 0 && size.h > 0 && sketch(size.w, size.h, seed);

	return (
		<div ref={ref} className={`relative ${className}`}>
			{paths && (
				<svg
					aria-hidden="true"
					width={size.w}
					height={size.h}
					className={`sketch-draw absolute inset-0 pointer-events-none overflow-visible opacity-70 ${color}`}
					style={
						{ "--draw-delay": `${0.02 + (seed % 1) * 0.06}s` } as CSSProperties
					}
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d={paths.outline} pathLength={1} strokeWidth={1.5} />
					<path d={paths.highlight} pathLength={1} strokeWidth={1.25} />
				</svg>
			)}
			{children}
		</div>
	);
}
