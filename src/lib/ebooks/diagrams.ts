/**
 * A notes concept's diagram as static markup, for the Notes Books
 * (2026-10-20). The diagrams are the website's own components
 * (app/notes/_components/visualizations, picked by `renderVisualizationStatic`
 * in diagramRegistry.tsx, the list the notes pages are generated from), so a book shows
 * exactly the figure the page does. Drawn at build time only: the interactive
 * ones render their starting state, and the book hides their controls.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { renderVisualizationStatic } from "@/app/notes/_components/diagramRegistry";
import type { VisualizationSlug } from "@/app/notes/_types";

// The full registry, not the page's renderVisualization: a page loads its
// browser-run diagrams lazily, and static markup cannot wait for one.
export function renderDiagramMarkup(slug: VisualizationSlug): string {
  return renderToStaticMarkup(renderVisualizationStatic(slug) ?? null);
}
