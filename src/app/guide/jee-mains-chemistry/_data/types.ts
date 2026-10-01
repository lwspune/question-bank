/**
 * Shared editorial types for the /guide/jee-mains-chemistry data modules. `PlaybookDetail` lives here
 * because the deep-dives are authored in three part-files (one per strand) that all need it.
 *
 * PROSE CARRIES NO FIGURES. Counts and rates are printed by the pages from the generated matrix
 * (npm run jee:matrix -- --subject=Chemistry), so a number typed into `story`, `trigger` or a trap
 * would go stale after the next ingest. tests/jee-mains-chemistry-guide-data.test.ts fails on a count,
 * a share or a year in prose. Chemistry values (a pH, a bond order, a rate constant) are fine.
 */

/** The strategy strands: what kind of work a chapter's questions ask for. */
export type StrandId = "calculate" | "reactions" | "structure";

export type PlaybookDetail = {
  /** Matches a Playbook.slug in playbooks.ts — the chapter's /notes/jee-mains-chemistry slug. */
  slug: string;
  /** One line: what tells you a question belongs to this chapter's technique. */
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

/**
 * One entry on /guide/jee-mains-chemistry/reference: a formula (Calculate chapters), a reagent and
 * its product (Reactions), or a fact table row (Structure and recall). Plain text + unicode, never
 * LaTeX — the shared FormulaSheet prints `formula` raw.
 */
export type ReferenceEntry = {
  /** kebab-case, unique within the chapter. */
  id: string;
  name: string;
  /** Printed as raw text by the shared FormulaSheet. */
  formula: string;
  /** Short lines naming the symbols, or the conditions. */
  legend: string[];
  notes?: string;
};

/** One chapter's block on /guide/jee-mains-chemistry/reference. */
export type ReferenceGroup = {
  /** Canonical DB chapter name. */
  chapter: string;
  /** The chapter's playbook slug (= its /notes/jee-mains-chemistry slug). */
  playbookSlug: string;
  formulas: ReferenceEntry[];
};

/** The strand whose marks a trap costs; "paper" = paper-wide (time, marking, formats). */
export type TrapBucket = StrandId | "paper";

/** One distractor shape on /guide/jee-mains-chemistry/traps. */
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
