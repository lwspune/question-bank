import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_BM_CARBOHYDRATES_NOTE } from "./carbohydrates";
import { CB_CH_BM_PROTEINS_NOTE } from "./proteins";
import { CB_CH_BM_ENZYMES_NOTE } from "./enzymes";
import { CB_CH_BM_VITAMINS_NOTE } from "./vitamins";
import { CB_CH_BM_NUCLEIC_NOTE } from "./nucleic";

export { CB_CH_BM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/biomolecules/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-bm-` here and `cbcbm-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_BM_NOTES: Record<string, SubtopicNote> = {
  "cbc-bm-carbohydrates": CB_CH_BM_CARBOHYDRATES_NOTE,
  "cbc-bm-proteins": CB_CH_BM_PROTEINS_NOTE,
  "cbc-bm-enzymes": CB_CH_BM_ENZYMES_NOTE,
  "cbc-bm-vitamins": CB_CH_BM_VITAMINS_NOTE,
  "cbc-bm-nucleic": CB_CH_BM_NUCLEIC_NOTE,
};

export const CB_CH_BM_SLUGS = Object.keys(CB_CH_BM_NOTES);
