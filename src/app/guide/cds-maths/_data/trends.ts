/**
 * Content for /guide/cds-maths/trends.
 *
 * EVERY NUMBER ON THE PAGE IS COMPUTED from `matrix.generated.ts` (npm run cds:matrix), never typed.
 * The editorial layer below carries only a chapter, a direction and prose WITHOUT figures; the page
 * prints each callout's rates beside it, and tests/cds-trends-matrix-editorial.test.ts fails if a
 * callout's direction stops agreeing with the grid after the next ingest.
 *
 * WINDOWS. 21 sittings, 2016 II to 2026 II: early 2016-2020 (9 papers), middle 2021-2023 (6), recent
 * 2024-2026 (6). Every paper is 100 questions, so questions-per-paper compares across windows. Six
 * papers is still a small sample — one heavy paper moves a chapter's recent rate by a question or
 * more (Number System ran from 4 to 25 in a single paper), so a callout names a direction, not a
 * forecast.
 */
import { CHAPTER_MATRIX, PAPERS, PAPER_TOTALS } from "./matrix.generated";

export type WindowId = "early" | "mid" | "recent";

export const WINDOWS: { id: WindowId; label: string; from: number; to: number }[] = [
  { id: "early", label: "2016-2020", from: 2016, to: 2020 },
  { id: "mid", label: "2021-2023", from: 2021, to: 2023 },
  { id: "recent", label: "2024-2026", from: 2024, to: 2026 },
];

function windowOf(year: number): WindowId {
  const w = WINDOWS.find((x) => year >= x.from && year <= x.to);
  if (!w) throw new Error(`year ${year} falls in no trends window`);
  return w.id;
}

/** Papers in each window, counted from the grid's own columns. */
export const WINDOW_PAPERS: Record<WindowId, number> = PAPERS.reduce(
  (acc, p) => {
    acc[windowOf(p.year)]++;
    return acc;
  },
  { early: 0, mid: 0, recent: 0 } as Record<WindowId, number>
);

export type WindowRates = { chapter: string; total: number } & Record<WindowId, number>;

/** Questions per paper in each window, two decimals. Heaviest chapter first. */
export const WINDOW_RATES: WindowRates[] = CHAPTER_MATRIX.map((r) => {
  const sums: Record<WindowId, number> = { early: 0, mid: 0, recent: 0 };
  r.counts.forEach((c, i) => (sums[windowOf(PAPERS[i].year)] += c));
  const rate = (w: WindowId) => Math.round((100 * sums[w]) / WINDOW_PAPERS[w]) / 100;
  return { chapter: r.chapter, total: r.total, early: rate("early"), mid: rate("mid"), recent: rate("recent") };
});

export function ratesFor(chapter: string): WindowRates {
  const r = WINDOW_RATES.find((x) => x.chapter === chapter);
  if (!r) throw new Error(`no trends row for chapter "${chapter}"`);
  return r;
}

/** %HARD by year, summed over that year's papers. */
export type HardByYear = { year: number; papers: number; totalQ: number; hardQ: number; pctHard: number };

export const HARD_BY_YEAR: HardByYear[] = (() => {
  const by = new Map<number, HardByYear>();
  PAPERS.forEach((p, i) => {
    const t = PAPER_TOTALS[i];
    const row = by.get(p.year) ?? { year: p.year, papers: 0, totalQ: 0, hardQ: 0, pctHard: 0 };
    row.papers++;
    row.totalQ += t.total;
    row.hardQ += t.hard;
    by.set(p.year, row);
  });
  return [...by.values()]
    .sort((a, b) => a.year - b.year)
    .map((r) => ({ ...r, pctHard: Math.round((100 * r.hardQ) / r.totalQ) }));
})();

/**
 * A chapter whose weight moved between the early and recent windows. `direction` is asserted
 * against the grid by the editorial test: "up" needs recent > early, "down" recent < early.
 */
export type DriftCallout = {
  chapter: string;
  direction: "up" | "down";
  title: string;
  description: string;
};

export const DRIFT_CALLOUTS: DriftCallout[] = [
  {
    chapter: "Trigonometric Ratios and Identities",
    direction: "up",
    title: "Trigonometry is now the biggest chapter on the paper",
    description:
      "It has risen in each window and has not dropped below 13 questions in any of the last four papers. If your preparation has one priority, it is this chapter.",
  },
  {
    chapter: "Number System",
    direction: "up",
    title: "Number System rose too, but it swings from paper to paper",
    description:
      "Its recent rate is up, but single papers range widely — one had 25 questions, another 4. Treat it as a large chapter every paper, not a growing one: prepare it fully and do not read the average as a promise.",
  },
  {
    chapter: "Statistics",
    direction: "up",
    title: "Statistics has grown into a full chapter",
    description:
      "Two of the last four papers set eight or more questions. It stays one of the cheapest chapters to prepare, so the rise makes it worth more.",
  },
  {
    chapter: "Quadrilaterals",
    direction: "up",
    title: "Quadrilaterals picked up in the recent papers",
    description:
      "It was a two-question chapter; two of the last three papers set six or more.",
  },
  {
    chapter: "Mensuration 3D",
    direction: "down",
    title: "Mensuration 3D is lighter than it was",
    description:
      "Still a cornerstone chapter at several questions a paper, but below its middle-window peak. Do not cut it; do not give it more time than Trigonometry.",
  },
  {
    chapter: "Linear Equations",
    direction: "down",
    title: "Linear Equations has almost left the paper",
    description:
      "It has set one question in the six most recent papers. The skill — turning words into two equations — still carries most arithmetic questions, so learn it through those chapters rather than as its own.",
  },
  {
    chapter: "Time and Work",
    direction: "down",
    title: "Time and Work has halved",
    description:
      "Three of the last four papers set none. It is still quick to learn, so keep it, but after the rising chapters.",
  },
  {
    chapter: "Data Interpretation",
    direction: "down",
    title: "Data Interpretation comes and goes",
    description:
      "Seven of the 21 papers set a block of four to eight questions around charts; the rest set three or fewer, often none. When it appears it is cheap marks, so learn to read the four chart types; do not count on it.",
  },
];
