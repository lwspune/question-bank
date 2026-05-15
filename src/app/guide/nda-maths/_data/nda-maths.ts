/**
 * Static content + numbers for the /guide/nda-maths route.
 *
 * Live CTA counts come from the existing /browse facet RPCs (see
 * src/app/guide/_components/BrowseLink.tsx); the narrative numbers here are a
 * snapshot updated manually when new papers land. `OVERVIEW.asOf` documents
 * the snapshot date so readers know what they're looking at.
 *
 * Phase 1 ships only the OVERVIEW + ROUTES + minimal types — the rest
 * (TOP_20_PRINCIPLES, COMPOUNDS, YEAR_DRIFT, TRAP_RULES) is populated in
 * later phases as those pages get built.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-maths (or "" for the landing)
  label: string; // side-nav and breadcrumb label
  blurb: string; // one-line description for the landing-page card
};

/** The 6 main routes under /guide/nda-maths, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA Mathematics actually works — what the 1,320-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb: "Score 100+ marks with 50 hours of focused, evidence-led prep.",
  },
  {
    slug: "principles",
    label: "Principles",
    blurb:
      "70 atoms behind every question. Drill the top 20 cross-chapter principles.",
  },
  {
    slug: "compound-tricks",
    label: "Compound Tricks",
    blurb:
      "4 compound recipes that own 30% of the HARD pool — the chains paper-setters love.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA Maths has shifted from 2021 to 2026, and what to practice first.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor patterns NDA reuses. The last-step verification rules that recover marks.",
  },
];

export type Overview = {
  totalQ: number;
  papers: number;
  chapters: number;
  principles: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date, e.g. "2026-05-15"
};

/** Snapshot of the bank's shape as of the date below. */
export const OVERVIEW: Overview = {
  totalQ: 1320,
  papers: 11,
  chapters: 31,
  principles: 70,
  difficulty: { easy: 375, moderate: 623, hard: 322 },
  asOf: "2026-05-15",
};
