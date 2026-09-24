import { readFileSync, writeFileSync } from "node:fs";
import { renderAllSections, renderApp } from "../dist-ssr/entry-server.js";

const path = new URL("../dist/index.html", import.meta.url);
const html = readFileSync(path, "utf-8");
const empty = '<div id="root"></div>';
if (!html.includes(empty)) throw new Error("prerender: empty #root not found in dist/index.html");

writeFileSync(
	path,
	html.replace(empty, `<div id="root">${renderApp()}</div><noscript>${renderAllSections()}</noscript>`),
);
console.log("prerendered dist/index.html");
