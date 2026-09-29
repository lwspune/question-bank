/**
 * Playbook catalog for /guide/cds-maths/playbooks — one playbook per chapter, for the 22 chapters at
 * 1.5 questions a paper or more. The four below the line (Sets, Lines and Angles, Sequences,
 * Inequalities) are listed in TAIL_CHAPTERS on /strategy so the bank is accounted for.
 *
 * DERIVED, NOT RETYPED. Each playbook's subtopics, counts, %HARD and summary come from its strand
 * chapter in strategy.ts and its row in CHAPTER_TABLE, so the playbooks and the strategy cannot
 * disagree. Only the slug (the chapter's /notes slug) and the display name are written here.
 */

import { CHAPTER_TABLE } from "./cds-maths";
import { STRATEGY_STRANDS, type StrandId } from "./strategy";

export type PlaybookBucket = StrandId;

export type Playbook = {
  slug: string;
  name: string;
  summary: string;
  chapter: string;
  /** Every subtopic of the chapter, in prep order. */
  subtopics: string[];
  qCount: number;
  /** Lifetime questions per paper (21 papers). */
  qPerPaper: number;
  pctHard: number;
  bucket: PlaybookBucket;
  /** The chapter's teaching notes. */
  notesHref: string;
};

/** Chapter -> [slug (= its /notes/cds-maths slug), display name]. */
const NAMES: Record<string, [string, string]> = {
  "Trigonometric Ratios and Identities": ["trigonometry", "Trigonometry"],
  "Number System": ["number-system", "Number System"],
  "Mensuration 2D": ["mensuration-2d", "Mensuration 2D"],
  "Mensuration 3D": ["mensuration-3d", "Mensuration 3D"],
  Triangles: ["triangles", "Triangles"],
  Statistics: ["statistics", "Statistics"],
  "Ratio, Proportion and Variation": ["ratio", "Ratio, Proportion and Variation"],
  "Time, Speed and Distance": ["tsd", "Time, Speed and Distance"],
  "Percentage, Profit and Loss": ["percentage", "Percentage, Profit and Loss"],
  "Data Interpretation": ["data-interpretation", "Data Interpretation"],
  Averages: ["averages", "Averages"],
  "Time and Work": ["time-work", "Time and Work"],
  "Simple and Compound Interest": ["interest", "Simple and Compound Interest"],
  "Algebraic Identities and Simplification": ["algebraic-identities", "Algebraic Identities"],
  "Quadratic Equations": ["quadratic-equations", "Quadratic Equations"],
  "Surds, Indices and Simplification": ["surds-indices", "Surds and Indices"],
  Polynomials: ["polynomials", "Polynomials"],
  Circles: ["circles", "Circles"],
  Quadrilaterals: ["quadrilaterals", "Quadrilaterals"],
  "Heights and Distances": ["heights", "Heights and Distances"],
  Logarithms: ["logarithms", "Logarithms"],
  "Linear Equations": ["linear-equations", "Linear Equations"],
};

export const PLAYBOOKS: Playbook[] = STRATEGY_STRANDS.flatMap((strand) =>
  strand.chapters.map((c) => {
    const row = CHAPTER_TABLE.find((r) => r.chapter === c.chapter);
    const names = NAMES[c.chapter];
    if (!row || !names) throw new Error(`cds-maths playbooks: no table row or name for ${c.chapter}`);
    return {
      slug: names[0],
      name: names[1],
      summary: c.summary,
      chapter: c.chapter,
      subtopics: c.mustDrill,
      qCount: c.qCount,
      qPerPaper: row.qPerPaper,
      pctHard: c.pctHard,
      bucket: strand.id,
      notesHref: `/notes/cds-maths/${names[0]}`,
    };
  }),
);

export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
