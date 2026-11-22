/**
 * IMAT notes figures (2026-11-17). The IMAT notes had one figure across 671
 * concepts; this run gave them ~140, some borrowed from other exams' notes and
 * the rest drawn for IMAT (slugs starting `imat-`), a few of them animated
 * through the shared stepper (StepFigure).
 *
 * What is pinned, and why:
 * - Every figure an IMAT concept uses draws, outside a browser, to an SVG. The
 *   print view and any notes book draw the same component, so one that throws
 *   or draws nothing would leave a hole with no error.
 * - Its visible words keep IMAT's rules (src/lib/notes/visualText.ts): no other
 *   exam's name, no "the bank", no rupees, and, for a figure written for IMAT,
 *   no em dashes. A borrowed figure keeps the dashes it already has on its own
 *   exam's page.
 * - An animated figure's server markup lists every step, so print and books
 *   tell the whole process, not just its last frame.
 * - No figure appears twice on one page, and no `imat-` figure is left unused.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { IMAT_NOTES_CHAPTERS } from "@/lib/sites/imat/notes/registry";
import { renderDiagramMarkup } from "@/lib/ebooks/diagrams";
import { visualTextProblems } from "@/lib/notes/visualText";
import type { VisualizationSlug } from "@/app/notes/_types";

const MIN_CONCEPTS_WITH_A_FIGURE = 140;

const placements = IMAT_NOTES_CHAPTERS.flatMap((c) =>
  c.slugs.flatMap((s) =>
    c.notes[s].concepts.flatMap((k) =>
      k.visualizationSlug ? [{ page: `${c.subjectRoute}/${s}`, concept: k.slug, viz: k.visualizationSlug }] : [],
    ),
  ),
);
const figures = [...new Set(placements.map((p) => p.viz))];

describe("IMAT notes figures", () => {
  it(`at least ${MIN_CONCEPTS_WITH_A_FIGURE} IMAT concepts carry a figure`, () => {
    expect(placements.length).toBeGreaterThanOrEqual(MIN_CONCEPTS_WITH_A_FIGURE);
  });

  it.each(figures.map((f) => [f]))("%s draws an SVG and keeps IMAT's word rules", (viz) => {
    const markup = renderDiagramMarkup(viz as VisualizationSlug);
    expect(visualTextProblems(markup, { noDashes: viz.startsWith("imat-") })).toEqual([]);
  });

  it("an animated figure's markup lists every step (at least three), each with words", () => {
    const animated = figures.filter((f) => renderDiagramMarkup(f as VisualizationSlug).includes("data-step-list"));
    for (const viz of animated) {
      const markup = renderDiagramMarkup(viz as VisualizationSlug);
      const items = markup.split("data-step-list")[1].match(/<li>([\s\S]*?)<\/li>/g) ?? [];
      expect(items.length, viz).toBeGreaterThanOrEqual(3);
      for (const li of items) expect(li.replace(/<[^>]+>/g, "").trim().length, viz).toBeGreaterThan(10);
    }
  });

  it("no figure appears twice on the same page", () => {
    const seen = new Set<string>();
    for (const p of placements) {
      const key = `${p.page} ${p.viz}`;
      expect(seen.has(key), key).toBe(false);
      seen.add(key);
    }
  });

  it("every figure drawn for IMAT is used by an IMAT concept", () => {
    const card = readFileSync(join(process.cwd(), "src/app/notes/_components/diagramRegistry.tsx"), "utf8");
    const imatCases = [...card.matchAll(/case "(imat-[^"]+)":/g)].map((m) => m[1]);
    const used = new Set(figures);
    expect(imatCases.filter((s) => !used.has(s as VisualizationSlug))).toEqual([]);
  });
});
