import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_BM_CARBOHYDRATES_NOTE } from "./carbohydrates";
import { HSC_CH_BM_PROTEINS_NOTE } from "./proteins";
import { HSC_CH_BM_NUCLEIC_NOTE } from "./nucleic";

export { HSC_CH_BM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/biomolecules/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-bm-` here and `hsccbm-` on concept slugs.
 *
 * 3 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_BM_NOTES: Record<string, SubtopicNote> = {
  "hscc-bm-carbohydrates": HSC_CH_BM_CARBOHYDRATES_NOTE,
  "hscc-bm-proteins": HSC_CH_BM_PROTEINS_NOTE,
  "hscc-bm-nucleic": HSC_CH_BM_NUCLEIC_NOTE,
};

export const HSC_CH_BM_SLUGS = Object.keys(HSC_CH_BM_NOTES);
