/**
 * Notes figures for MHT-CET, JEE Mains, NEET and SSC CGL (2026-11-19). On that
 * day CET had 108 figures across 1,173 concepts (all but 2 in Maths, none
 * animated) and the other three had none at all. This run borrows figures
 * drawn for other exams' notes (scripts/notes/BORROW_BRIEF.md) and draws new
 * ones (scripts/notes/CET_VISUALS_BRIEF.md) whose slugs start with the exam:
 * `cet-`, `jee-`, `neet-`, `ssc-`. Some are animated through the shared stepper.
 *
 * What is pinned, and why (the IMAT gate's rules, tests/imat-notes-visuals):
 * - Every figure these notes use draws, outside a browser, to an SVG. The
 *   print view draws the same component, so one that throws or draws nothing
 *   would leave a hole with no error.
 * - Its visible words keep the notes rules (src/lib/notes/visualText.ts): no
 *   exam's name, no "the bank", no rupees, and, for a figure drawn in this
 *   run, no em dashes and no raw underscore. A borrowed figure keeps the
 *   dashes it has on its own page.
 * - An animated figure's server markup lists every step, so print tells the
 *   whole process, not just its last frame.
 * - No figure appears twice on one page, and no figure drawn in this run is
 *   left unused.
 * - The counts only go up.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { renderDiagramMarkup } from "@/lib/ebooks/diagrams";
import { visibleText, visualTextProblems } from "@/lib/notes/visualText";
import type { VisualizationSlug } from "@/app/notes/_types";

/** The notes these rules cover, by subject-route prefix. */
const EXAM_ROUTES = ["mht-cet-", "jee-mains-", "neet-", "ssc-cgl-"];

/** Slug prefixes of figures drawn in this run (the stricter word rules apply). */
const NEW_FIGURE = /^(cet|jee|neet|ssc)-/;

/** Concepts carrying a figure, per subject. Raise these as figures land; never lower them. */
const MIN_FIGURES: Record<string, number> = {
  "mht-cet-maths": 122,
  "mht-cet-physics": 40,
  "mht-cet-chemistry": 33,
  "jee-mains-physics": 63,
  "jee-mains-chemistry": 29,
};

/** Figures placed on CET before this run, whose words were never checked against these rules. */
const SHIPPED_BEFORE = new Set<string>();

/**
 * Pages that already showed one figure on several concepts before this gate
 * existed, with how many times. Mostly deliberate (a plane's normal recurs
 * across 3D concepts); reviewing them is a backfill decision (SUGGESTIONS.md
 * ledger, 2026-11-19), not this run's. A new placement may not add a repeat.
 */
const KNOWN_REPEATS: Record<string, number> = {
  "mht-cet-maths/vectors/magnitude-unit-vectors vector-addition": 2,
  "mht-cet-maths/vectors/linear-combinations-coplanarity orthonormal-triple": 2,
  "mht-cet-maths/vectors/dot-product vector-projection": 2,
  "mht-cet-maths/line-and-plane/line-equation direction-cosines": 2,
  "mht-cet-maths/line-and-plane/plane-equation plane-with-normal": 2,
  "mht-cet-maths/line-and-plane/angles-conditions direction-cosines": 2,
  "mht-cet-maths/line-and-plane/angles-conditions plane-with-normal": 3,
  "mht-cet-maths/line-and-plane/distances-3d lines-distance-point-line": 2,
  "mht-cet-maths/line-and-plane/foot-image-projection plane-with-normal": 2,
  "mht-cet-maths/line-and-plane/intersection-coplanarity-skew triple-product-box": 2,
  "mht-cet-maths/probability-distribution/conditional-independence-bayes probability-tree": 3,
};

/**
 * Figures already shipped with maths in their header (shown in capitals, so
 * "work = F · d" reads "WORK = F · D"). They are on other exams' pages too;
 * rewording them is a backfill decision (SUGGESTIONS.md ledger, 2026-11-19).
 */
const SHIPPED_MATHS_HEADERS = new Set([
  "magnitude-right-triangle",
  "section-formula",
  "parallelogram-diagonals",
  "dot-product-work",
  "unit-normal-vector",
  "triple-product-box",
  "sample-space-event",
  "coin-toss-tree",
  "mean-balance-point",
  "mean-deviation-spread",
  "magnetic-force-triad",
  "torque-moment",
]);

const placements = NOTES_CHAPTERS.filter((c) => EXAM_ROUTES.some((r) => c.subjectRoute.startsWith(r))).flatMap((c) =>
  Object.entries(c.notes).flatMap(([s, note]) =>
    note.concepts.flatMap((k) =>
      k.visualizationSlug
        ? [{ subject: c.subjectRoute, page: `${c.subjectRoute}/${c.chapterSlug}/${s}`, concept: k.slug, viz: k.visualizationSlug }]
        : [],
    ),
  ),
);
const figures = [...new Set(placements.map((p) => p.viz))];

describe("MHT-CET, JEE Mains, NEET and SSC CGL notes figures", () => {
  it.each(Object.entries(MIN_FIGURES))("%s carries at least %i figures", (subject, min) => {
    expect(placements.filter((p) => p.subject === subject).length).toBeGreaterThanOrEqual(min);
  });

  it.each(figures.filter((f) => !SHIPPED_BEFORE.has(f)).map((f) => [f]))("%s draws an SVG and keeps the word rules", (viz) => {
    const markup = renderDiagramMarkup(viz as VisualizationSlug);
    expect(markup).toContain("<svg");
    expect(visualTextProblems(markup, { noDashes: NEW_FIGURE.test(viz) })).toEqual([]);
    // A raw "V_R" or "X_C" reads as code; write a subscript (₁, ₘₐₓ) or a word.
    if (NEW_FIGURE.test(viz)) expect(visibleText(markup).match(/\S*_\S*/g) ?? []).toEqual([]);
  });

  it("a header carries no maths: it is shown in capitals, which turns ν into N and λ into Λ", () => {
    const bad: string[] = [];
    for (const viz of figures.filter((f) => !SHIPPED_MATHS_HEADERS.has(f))) {
      const header = renderDiagramMarkup(viz as VisualizationSlug).match(/(?:Diagram|Visualization|Animation) · ([^<]*)/)?.[1] ?? "";
      if (/[α-ωΑ-Ω₀-₉⁰-⁹ₐ-ₜ=]/.test(header)) bad.push(`${viz}: ${header}`);
    }
    expect(bad).toEqual([]);
  });

  it("an animated figure's markup lists every step (at least three), each with words", () => {
    for (const viz of figures) {
      const markup = renderDiagramMarkup(viz as VisualizationSlug);
      if (!markup.includes("data-step-list")) continue;
      const items = markup.split("data-step-list")[1].match(/<li>([\s\S]*?)<\/li>/g) ?? [];
      expect(items.length, viz).toBeGreaterThanOrEqual(3);
      for (const li of items) expect(li.replace(/<[^>]+>/g, "").trim().length, viz).toBeGreaterThan(10);
    }
  });

  it("no figure appears twice on the same page, beyond the repeats already shipped", () => {
    const counts = new Map<string, number>();
    for (const p of placements) counts.set(`${p.page} ${p.viz}`, (counts.get(`${p.page} ${p.viz}`) ?? 0) + 1);
    const repeats = Object.fromEntries([...counts].filter(([, n]) => n > 1));
    expect(repeats).toEqual(KNOWN_REPEATS);
  });

  it("every figure drawn in this run is used by one of these notes", () => {
    const card = readFileSync(join(process.cwd(), "src/app/notes/_components/ConceptUnitCard.tsx"), "utf8");
    const drawn = [...card.matchAll(/case "((?:cet|jee|neet|ssc)-[^"]+)":/g)].map((m) => m[1]);
    const used = new Set<string>(figures);
    expect(drawn.filter((s) => !used.has(s))).toEqual([]);
  });
});
