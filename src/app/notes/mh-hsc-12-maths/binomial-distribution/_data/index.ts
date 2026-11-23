import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_BD_BERNOULLI_NOTE } from "./bernoulli";
import { HSC_MA_BD_DISTRIBUTION_NOTE } from "./distribution";
import { HSC_MA_BD_MEAN_NOTE } from "./mean";

export { HSC_MA_BD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/binomial-distribution/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-bd-` here and `hscmbd-` on concept slugs.
 *
 * 3 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_BD_NOTES: Record<string, SubtopicNote> = {
  "hscm-bd-bernoulli": HSC_MA_BD_BERNOULLI_NOTE,
  "hscm-bd-distribution": HSC_MA_BD_DISTRIBUTION_NOTE,
  "hscm-bd-mean": HSC_MA_BD_MEAN_NOTE,
};

export const HSC_MA_BD_SLUGS = Object.keys(HSC_MA_BD_NOTES);
