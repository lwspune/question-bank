import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_PR_CONDITIONAL_NOTE } from "./conditional";
import { CB_MA_PR_MULTIPLICATION_NOTE } from "./multiplication";
import { CB_MA_PR_INDEPENDENT_NOTE } from "./independent";
import { CB_MA_PR_TOTAL_NOTE } from "./total";
import { CB_MA_PR_BAYES_NOTE } from "./bayes";
import { CB_MA_PR_DISTRIBUTIONS_NOTE } from "./distributions";

export { CB_MA_PR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/probability/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-pr-` here and `cbmpr-` on concept slugs.
 *
 * 6 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_PR_NOTES: Record<string, SubtopicNote> = {
  "cbm-pr-conditional": CB_MA_PR_CONDITIONAL_NOTE,
  "cbm-pr-multiplication": CB_MA_PR_MULTIPLICATION_NOTE,
  "cbm-pr-independent": CB_MA_PR_INDEPENDENT_NOTE,
  "cbm-pr-total": CB_MA_PR_TOTAL_NOTE,
  "cbm-pr-bayes": CB_MA_PR_BAYES_NOTE,
  "cbm-pr-distributions": CB_MA_PR_DISTRIBUTIONS_NOTE,
};

export const CB_MA_PR_SLUGS = Object.keys(CB_MA_PR_NOTES);
