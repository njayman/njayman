import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import type { Connect } from "vite";
import { defineConfig } from "vite";

// Dev/preview only: unknown paths get public/404.html like production, not the SPA index.
const notFound: Connect.NextHandleFunction = (req, res, next) => {
	const path = new URL(req.url ?? "/", "http://x").pathname;
	if (path === "/" || path === "/index.html") return next();
	res.statusCode = 404;
	res.setHeader("Content-Type", "text/html");
	res.end(readFileSync(new URL("./public/404.html", import.meta.url)));
};

// https://vite.dev/config/
export default defineConfig({
	appType: "mpa", // no SPA fallback to index.html
	plugins: [
		tailwindcss(),
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		{
			name: "serve-404",
			configureServer: (s) => () => s.middlewares.use(notFound),
			configurePreviewServer: (s) => () => s.middlewares.use(notFound),
		},
	],
});
