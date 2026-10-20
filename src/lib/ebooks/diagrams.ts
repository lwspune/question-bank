/**
 * A notes concept's diagram as static markup, for the Notes Books
 * (2026-10-20). The diagrams are the website's own components
 * (app/notes/_components/visualizations, picked by `renderVisualization`, the
 * same switch the notes pages and their print view use), so a book shows
 * exactly the figure the page does. Drawn at build time only: the interactive
 * ones render their starting state, and the book hides their controls.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { renderVisualization } from "@/app/notes/_components/ConceptUnitCard";
import type { VisualizationSlug } from "@/app/notes/_types";

export function renderDiagramMarkup(slug: VisualizationSlug): string {
  return renderToStaticMarkup(renderVisualization(slug));
}
