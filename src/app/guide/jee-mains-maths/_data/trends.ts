/**
 * Content for /guide/jee-mains-maths/trends.
 *
 * EVERY NUMBER ON THE PAGE IS COMPUTED from `matrix.generated.ts` (npm run jee:matrix), never typed.
 * The editorial layer below carries only a chapter, a direction and prose WITHOUT figures; the page
 * prints each callout's rates beside it, and tests/jee-mains-maths-guide-data.test.ts fails if a
 * callout's direction stops agreeing with the grid after the next ingest.
 *
 * WINDOWS. 2021-2024 (the 30-question papers, of which 25 were answered) against 2025-2026 (the
 * 25-question papers). Rates are a chapter's share of its window's questions, scaled to 25, so the
 * two compare even though the papers changed length. Two years is a small window, and one heavy
 * year moves a chapter a long way, so a callout names a direction, not a forecast.
 */
import { perPaper } from "@/lib/guide/jeeTrendsMatrix";
import { CHAPTER_TABLE, EARLY, RECENT } from "./jee-mains-maths";
import { CHAPTER_MATRIX, YEARS } from "./matrix.generated";

export type YearRates = { chapter: string; slug: string; total: number; rates: number[] };

/** Per-year rate per 25-question paper for every chapter, in CHAPTER_TABLE order. */
export const YEAR_RATES: YearRates[] = CHAPTER_TABLE.map((row) => {
  const m = CHAPTER_MATRIX.find((r) => r.chapter === row.chapter);
  if (!m) throw new Error(`no matrix row for "${row.chapter}"`);
  return {
    chapter: row.chapter,
    slug: row.slug,
    total: m.total,
    rates: YEARS.map((y, i) => perPaper(m.counts[i], y.total)),
  };
});

/** The last year a chapter was set, or null if never. */
export function lastSeen(chapter: string): number | null {
  const m = CHAPTER_MATRIX.find((r) => r.chapter === chapter);
  if (!m) throw new Error(`no matrix row for "${chapter}"`);
  for (let i = YEARS.length - 1; i >= 0; i--) if (m.counts[i] > 0) return YEARS[i].year;
  return null;
}

/**
 * A chapter whose weight moved between the two windows. `direction` is asserted against the grid
 * by the data test: "up" needs the recent rate above the early one, "down" below it.
 */
export type DriftCallout = {
  chapter: string;
  direction: "up" | "down";
  title: string;
  description: string;
};

export const DRIFT_CALLOUTS: DriftCallout[] = [
  {
    chapter: "Conic Sections",
    direction: "up",
    title: "Conic Sections has pulled further ahead",
    description:
      "It was already the largest chapter; on the shorter papers it has grown again, to roughly one question in every eight. It has been the largest chapter in almost every year of the grid.",
  },
  {
    chapter: "Relations and Functions",
    direction: "up",
    title: "Relations and Functions has become a cornerstone",
    description:
      "A middling chapter in the early papers, it now sits beside Three Dimensional Geometry and Sequences and Series. Much of it is numeric-answer counting, so it rewards practice more than reading.",
  },
  {
    chapter: "Application of Integrals",
    direction: "up",
    title: "Area under curves is set more often",
    description:
      "It has moved from the long tail into the core. The questions have not changed shape: sketch the region, then integrate.",
  },
  {
    chapter: "Quadratic Equations",
    direction: "up",
    title: "Quadratic Equations has edged up",
    description:
      "A small rise, into the core. It is also the algebra behind Complex Numbers and several calculus questions, so the time is well spent either way.",
  },
  {
    chapter: "Trigonometric Identities",
    direction: "up",
    title: "Trigonometric Identities rose, on one heavy year",
    description:
      "Most of the rise is a single year that set far more than usual. Treat it as a small chapter that sometimes spikes, not as a growing one.",
  },
  {
    chapter: "Application of Derivatives",
    direction: "down",
    title: "Application of Derivatives has roughly halved",
    description:
      "It was a core chapter in the early papers and is now in the long tail. Still learn maxima, minima and monotonicity: they return inside other chapters.",
  },
  {
    chapter: "Differentiation",
    direction: "down",
    title: "Differentiation is lighter",
    description:
      "Fewer questions ask for a derivative on its own. The rules are still needed everywhere in calculus, so learn them through the chapters that use them.",
  },
  {
    chapter: "Determinants",
    direction: "down",
    title: "Determinants has slipped",
    description:
      "A small fall, from the core into the long tail. Its questions remain routine once the system-of-equations checks are known.",
  },
];

export const WINDOW_LABELS = { early: EARLY.label, recent: RECENT.label };
