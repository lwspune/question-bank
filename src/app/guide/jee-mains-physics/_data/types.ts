/**
 * Shared editorial types for the /guide/jee-mains-physics data modules. `PlaybookDetail` lives here
 * because the 27 deep-dives are authored in part-files that all need it.
 *
 * PROSE CARRIES NO FIGURES. Counts and rates are printed by the pages from the generated matrix
 * (npm run jee:matrix), so a number typed into `story`, `trigger` or a trap would go stale after the
 * next ingest. tests/jee-mains-physics-guide-data.test.ts fails on a digit-bearing count in prose.
 */

export type PlaybookDetail = {
  /** Matches a Playbook.slug in playbooks.ts — the chapter's /notes/jee-mains-physics slug. */
  slug: string;
  /** One line: what tells you this chapter's technique is the one required. */
  trigger: string;
  /** 2-3 short paragraphs — how the chapter behaves on the paper. No counts or rates. */
  story: string[];
  /** The distinct skills inside the chapter, in the order to learn them (follows the notes pages). */
  subSkills: { name: string; description: string }[];
  /** Distractor shapes this chapter reuses. */
  traps: { name: string; description: string }[];
  /** Other playbook slugs worth reading next. Must resolve in playbooks.ts. */
  relatedSlugs: string[];
};

/** One formula on /guide/jee-mains-physics/formulas. Plain text + unicode, never LaTeX. */
export type FormulaEntry = {
  /** kebab-case, unique within the chapter. */
  id: string;
  name: string;
  /** Printed as raw text by the shared FormulaSheet. */
  formula: string;
  /** Short lines naming the symbols. */
  legend: string[];
  notes?: string;
};

/** One chapter's block on /guide/jee-mains-physics/formulas. */
export type FormulaGroup = {
  /** Canonical DB chapter name. */
  chapter: string;
  /** The chapter's playbook slug (= its /notes/jee-mains-physics slug). */
  playbookSlug: string;
  formulas: FormulaEntry[];
};

/** The strategy tier whose marks a trap costs; "paper" = paper-wide (time, marking). */
export type TrapBucket = "cornerstone" | "core" | "longtail" | "paper";

/** One distractor shape on /guide/jee-mains-physics/traps. */
export type TrapShape = {
  /** kebab-case, unique. */
  id: string;
  title: string;
  bucket: TrapBucket;
  /** Playbook slugs it recurs in. Empty = paper-wide. */
  affects: string[];
  /** How the trap works, in 1-2 sentences. No counts or rates. */
  mechanic: string;
  /** How to catch it on the paper. */
  fix: string;
};
