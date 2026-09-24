import { renderToString } from "react-dom/server";
import App from "./App";
import { ALL_SECTIONS, renderSection, SectionId } from "./sections";

// Build-time only: scripts/prerender.mjs injects these into dist/index.html.
export const renderApp = () => renderToString(<App />);

// The app shows one section at a time, so no-JS readers (link unfurlers, ATS scrapers) get the rest here.
export const renderAllSections = () =>
	renderToString(
		<>
			{ALL_SECTIONS.filter((id) => id !== SectionId.Hero).map((id) => (
				<section key={id}>{renderSection(id)}</section>
			))}
		</>,
	);
