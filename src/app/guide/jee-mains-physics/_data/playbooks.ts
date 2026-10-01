/**
 * Playbook catalog for /guide/jee-mains-physics/playbooks — one playbook for every chapter still on
 * the paper (a 2025-2026 rate above zero). The chapters that have left the paper are listed on
 * /strategy so the bank is accounted for.
 *
 * DERIVED, NOT RETYPED. Name, summary and tier come from strategy.ts; rates, subtopics and the notes
 * link from CHAPTER_TABLE, which reads the generated matrix and the NOTES_CHAPTERS registry. The slug
 * is the chapter's /notes/jee-mains-physics slug, so a playbook and its notes can never disagree.
 */

import { STRATEGY_TIERS, type TierId } from "./strategy";

export type PlaybookBucket = TierId;

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
  bucket: PlaybookBucket;
  notesHref: string;
};

export const PLAYBOOKS: Playbook[] = STRATEGY_TIERS.flatMap((tier) =>
  tier.chapters.map((c) => ({
    slug: c.slug,
    name: c.name,
    summary: c.summary,
    chapter: c.chapter,
    subtopics: c.subtopics,
    qCount: c.qCount,
    recentPerPaper: c.recentPerPaper,
    earlyPerPaper: c.earlyPerPaper,
    pctNumeric: c.pctNumeric,
    bucket: tier.id,
    notesHref: c.notesHref,
  })),
);

export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
