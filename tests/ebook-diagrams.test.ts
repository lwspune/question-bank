/**
 * The Notes Books print each concept's diagram (owner, 2026-10-20: "i didnt
 * see any diagram"). The diagrams are the website's own React components,
 * drawn here to static markup at build time and styled by the site's Tailwind
 * classes, compiled for just those files. Two properties a reader cannot
 * check, so they are pinned:
 *
 * - every diagram a CET notes chapter uses draws, outside a browser, to an
 *   SVG (a component that throws or draws nothing would leave a hole in a book
 *   someone paid for, with no error);
 * - the compiled styles carry the classes the diagrams draw with, and no page
 *   reset that would undo the book's own styles.
 */
import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { renderDiagramMarkup } from "@/lib/ebooks/diagrams";
import { buildDiagramCss } from "../scripts/lib/ebookDiagramCss";

const CET_ROUTES = new Set(["mht-cet-maths", "mht-cet-physics", "mht-cet-chemistry"]);

const slugs = Array.from(
  new Set(
    NOTES_CHAPTERS.filter((c) => CET_ROUTES.has(c.subjectRoute)).flatMap((c) =>
      c.slugs.flatMap((s) => c.notes[s].concepts.flatMap((k) => (k.visualizationSlug ? [k.visualizationSlug] : [])))
    )
  )
);

describe("ebook diagrams", () => {
  it("finds the CET notes diagrams at all (a probe that reaches no diagram proves nothing)", () => {
    expect(slugs.length).toBeGreaterThan(50);
  });

  it.each(slugs.map((s) => [s]))("%s draws to an SVG outside a browser", (slug) => {
    const markup = renderDiagramMarkup(slug);
    expect(markup).toContain("<svg");
  });

  it("compiles the classes the diagrams draw with, without the site's page reset", async () => {
    const css = await buildDiagramCss();
    expect(css).toContain(".fill-rose-500");
    expect(css).toContain(".stroke-indigo-800");
    // Preflight would zero every border and margin in the book.
    expect(css).not.toMatch(/\*,\s*::before,\s*::after\s*\{[^}]*border-width:\s*0/);
  }, 60_000);
});
