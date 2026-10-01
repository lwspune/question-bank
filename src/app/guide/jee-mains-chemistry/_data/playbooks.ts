/**
 * Playbook catalog for /guide/jee-mains-chemistry/playbooks — one playbook for every strand chapter
 * (on the paper, at or above PLAYBOOK_LINE). The tail and the chapters that left the syllabus are
 * listed on /strategy so the bank is accounted for.
 *
 * DERIVED, NOT RETYPED. Name, summary and strand come from strategy.ts; rates, subtopics and the notes
 * link from CHAPTER_TABLE, which reads the generated matrix and the NOTES_CHAPTERS registry. The slug
 * is the chapter's /notes/jee-mains-chemistry slug, so a playbook and its notes can never disagree.
 */

import { STRATEGY_STRANDS, type StrandId } from "./strategy";

export type PlaybookBucket = StrandId;

export type Playbook = {
  slug: string;
  name: string;
  summary: string;
  chapter: string;
  /** The notes pages' subtopic names, in teaching order. */
  subtopics: string[];
  /** PUBLIC PYQs since 2021. */
  qCount: number;
  /** Questions per 25-question paper, 2025-2026. */
  recentPerPaper: number;
  /** Questions per 25-question paper, 2021-2024. */
  earlyPerPaper: number;
  pctNumeric: number;
  pctCalc: number;
  bucket: PlaybookBucket;
  notesHref: string;
};

export const PLAYBOOKS: Playbook[] = STRATEGY_STRANDS.flatMap((strand) =>
  strand.chapters.map((c) => {
    if (c.slug === null || c.notesHref === null) throw new Error(`jee-mains-chemistry: ${c.chapter} has no notes`);
    return {
      slug: c.slug,
      name: c.name,
      summary: c.summary,
      chapter: c.chapter,
      subtopics: c.subtopics,
      qCount: c.qCount,
      recentPerPaper: c.recentPerPaper,
      earlyPerPaper: c.earlyPerPaper,
      pctNumeric: c.pctNumeric,
      pctCalc: c.pctCalc,
      bucket: strand.id,
      notesHref: c.notesHref,
    };
  }),
);

export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
