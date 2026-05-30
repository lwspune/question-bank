/**
 * Pure derivation of a chapter's concept-level PYQ weightage table — the
 * "high-yield triage" view at concept granularity. Given each subtopic's
 * concepts with their tagged-PYQ counts and the chapter's total PYQ count,
 * returns rows grouped by subtopic, concepts sorted high-yield-first, each
 * with its share of the chapter's PYQs.
 *
 * The DB fetch (counting question_concept_tags per concept) lives in
 * NotesChapterLanding; this helper stays pure + unit-tested.
 *
 * % basis: count / chapterTotalPyqs (the chapter's distinct PUBLIC PYQ
 * count). Dual-tagged questions count toward two concepts, so concept %s
 * can sum slightly above 100 — accepted: each row reads as "this concept
 * appears in ~N% of the chapter's questions".
 */

export type ConceptWeightConceptInput = {
  slug: string;
  name: string;
  /** Number of PUBLIC PYQs tagged to this concept (0 for foundations). */
  count: number;
};

export type ConceptWeightSubtopicInput = {
  subtopicTitle: string;
  subtopicHref: string;
  concepts: ConceptWeightConceptInput[];
};

export type ConceptWeightConcept = {
  slug: string;
  name: string;
  count: number;
  /** count / chapterTotal * 100, rounded to an integer. */
  pct: number;
  /** True when the concept has no tagged PYQs (a teaching primitive). */
  isFoundation: boolean;
};

export type ConceptWeightGroup = {
  subtopicTitle: string;
  subtopicHref: string;
  /** Sorted by count desc (stable); foundations sink to the bottom. */
  concepts: ConceptWeightConcept[];
  /** Subtopic subtotal of tagged PYQs. */
  count: number;
  /** Subtotal share of the chapter, rounded to an integer. */
  pct: number;
};

const pctOf = (count: number, total: number): number =>
  total > 0 ? Math.round((count / total) * 100) : 0;

export function buildConceptWeightTable(
  subtopics: ConceptWeightSubtopicInput[],
  chapterTotalPyqs: number
): ConceptWeightGroup[] {
  return subtopics.map((s) => {
    const concepts: ConceptWeightConcept[] = s.concepts
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        count: c.count,
        pct: pctOf(c.count, chapterTotalPyqs),
        isFoundation: c.count === 0,
      }))
      // Stable sort by count desc — equal counts keep declaration order,
      // zero-count foundations fall to the bottom.
      .sort((a, b) => b.count - a.count);

    const count = s.concepts.reduce((a, c) => a + c.count, 0);

    return {
      subtopicTitle: s.subtopicTitle,
      subtopicHref: s.subtopicHref,
      concepts,
      count,
      pct: pctOf(count, chapterTotalPyqs),
    };
  });
}
