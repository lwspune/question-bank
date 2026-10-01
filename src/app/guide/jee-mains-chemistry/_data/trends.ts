/**
 * Content for /guide/jee-mains-chemistry/trends.
 *
 * EVERY NUMBER ON THE PAGE IS COMPUTED from `matrix.generated.ts`
 * (npm run jee:matrix -- --subject=Chemistry), never typed. The editorial layer below carries only a
 * chapter, a direction and prose WITHOUT figures; the page prints each callout's rates beside it, and
 * tests/jee-mains-chemistry-guide-data.test.ts fails if a callout's direction stops agreeing with the
 * grid after the next ingest.
 *
 * WINDOWS. 2021-2024 (the 30-question papers, of which 25 were answered) against 2025-2026 (the
 * 25-question papers, set on the cut syllabus). Rates are a chapter's share of its window's
 * questions, scaled to 25, so the two compare. Two years is a small window; a callout names a
 * direction, not a forecast.
 */
import { perPaper } from "@/lib/guide/jeeTrendsMatrix";
import { CHAPTER_TABLE, EARLY, RECENT } from "./jee-mains-chemistry";
import { CHAPTER_MATRIX, YEARS } from "./matrix.generated";

export type YearRates = { chapter: string; slug: string | null; total: number; rates: number[] };

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
    chapter: "Chemical Thermodynamics",
    direction: "up",
    title: "Physical chemistry took the cut chapters' share",
    description:
      "When eight chapters left the syllabus, their questions went mostly to physical chemistry. Thermodynamics grew the most, and Kinetics, Equilibrium, Solutions and Electrochemistry all rose with it.",
  },
  {
    chapter: "Chemical Kinetics",
    direction: "up",
    title: "Chemical Kinetics nearly doubled",
    description:
      "A long-tail chapter in the early papers, now a steady core one. The questions are the same shapes: the first-order law, half-life and the Arrhenius equation.",
  },
  {
    chapter: "Organic Chemistry - Some Basic Principles and Techniques",
    direction: "up",
    title: "Basic Principles of Organic Chemistry is now the heaviest chapter",
    description:
      "It was already large; it now leads the paper. Naming, isomers and electron effects carry it, with the laboratory methods close behind.",
  },
  {
    chapter: "Coordination Compounds",
    direction: "up",
    title: "Coordination Compounds has grown",
    description:
      "Second only to Basic Principles on the recent papers. Isomer counts and spin-only moments give it many numeric answers.",
  },
  {
    chapter: "Hydrocarbons",
    direction: "up",
    title: "Hydrocarbons is set more often",
    description:
      "It has moved up among the organic chapters. Addition to alkenes and substitution on benzene carry most of it.",
  },
  {
    chapter: "The p-Block Elements",
    direction: "down",
    title: "The p-Block Elements has shrunk",
    description:
      "Once among the largest chapters, it is now mid-table. It still repays exact recall of structures and oxoacids, but it no longer deserves first place in revision.",
  },
  {
    chapter: "Alcohols, Phenols and Ethers",
    direction: "down",
    title: "Alcohols, Phenols and Ethers is lighter",
    description:
      "It has slipped to the smaller end of the organic chapters. Its acidity and dehydration ideas still return inside the other reaction chapters.",
  },
];

export const WINDOW_LABELS = { early: EARLY.label, recent: RECENT.label };
