/**
 * Content for /guide/jee-mains-physics/trends.
 *
 * EVERY NUMBER ON THE PAGE IS COMPUTED from `matrix.generated.ts` (npm run jee:matrix), never typed.
 * The editorial layer below carries only a chapter, a direction and prose WITHOUT figures; the page
 * prints each callout's rates beside it, and tests/jee-mains-physics-guide-data.test.ts fails if a
 * callout's direction stops agreeing with the grid after the next ingest.
 *
 * WINDOWS. 2021-2024 (the 30-question papers, of which 25 were answered) against 2025-2026 (the
 * 25-question papers). Rates are a chapter's share of its window's questions, scaled to 25, so the
 * two compare even though the papers changed length. Two years is a small window, and one heavy
 * year moves a chapter a long way, so a callout names a direction, not a forecast.
 */
import { perPaper } from "@/lib/guide/jeeTrendsMatrix";
import { CHAPTER_TABLE, EARLY, RECENT } from "./jee-mains-physics";
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
    chapter: "Ray Optics",
    direction: "up",
    title: "Ray Optics has roughly doubled",
    description:
      "A middling chapter in the early papers, it is now second only to Electrostatics, and both recent years set it heavily. Lenses, mirrors and prisms all rest on one sign convention, so this is the best return on time in the subject.",
  },
  {
    chapter: "Electrostatics",
    direction: "up",
    title: "Electrostatics has pulled further ahead",
    description:
      "It was already one of the largest chapters; on the shorter papers it is the largest. Capacitors carry much of it.",
  },
  {
    chapter: "Units and Measurements",
    direction: "up",
    title: "Units and Measurements has grown",
    description:
      "Dimensions and error questions now come on nearly every paper. They are short, so the rise is cheap marks for anyone who knows the dimensional formulas.",
  },
  {
    chapter: "System of Particles and Rotational Motion",
    direction: "up",
    title: "Rotational Motion has held its count while papers shrank",
    description:
      "The number of rotational questions in a year has barely changed, but the papers got shorter, so its share rose into the cornerstone tier.",
  },
  {
    chapter: "Wave Optics",
    direction: "up",
    title: "Wave Optics has grown into the core",
    description:
      "Young's double slit sets most of it, and it now comes about once a paper.",
  },
  {
    chapter: "Mechanical Properties of Fluids",
    direction: "up",
    title: "Fluids has grown into the core",
    description:
      "Bernoulli, viscosity and surface tension are set more often than in the early papers, mostly as calculations.",
  },
  {
    chapter: "Current Electricity",
    direction: "down",
    title: "Current Electricity has slipped from the top",
    description:
      "It was the heaviest chapter in the early papers and is now core. It still sets about a question a paper, so do not drop it.",
  },
  {
    chapter: "Gravitation",
    direction: "down",
    title: "Gravitation has almost halved",
    description:
      "A core chapter in the early papers, it is now in the long tail. Learn it after the rising chapters.",
  },
  {
    chapter: "Alternating Current",
    direction: "down",
    title: "Alternating Current has roughly halved",
    description:
      "Resonance and impedance are still asked, but less often. Its formulas also serve Electromagnetic Induction, so the time is not wasted.",
  },
  {
    chapter: "Motion in a Plane",
    direction: "down",
    title: "Motion in a Plane is lighter",
    description:
      "Projectile and circular-motion questions come less often than they did, though resolving a vector into two parts is needed everywhere in mechanics.",
  },
  {
    chapter: "Laws of Motion",
    direction: "down",
    title: "Laws of Motion is lighter",
    description:
      "Fewer questions ask for a free-body diagram on its own, but every mechanics chapter still needs one.",
  },
  {
    chapter: "Communication Systems",
    direction: "down",
    title: "Communication Systems has left the paper",
    description:
      "It was set in the early papers and has not been asked since. Its notes stay up for the older papers.",
  },
];

export const WINDOW_LABELS = { early: EARLY.label, recent: RECENT.label };
