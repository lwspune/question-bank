import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_TF_EQUATIONS_NOTE } from "./equations";
import { HSC_MA_TF_POLAR_NOTE } from "./polar";
import { HSC_MA_TF_TRIANGLE_NOTE } from "./triangle";
import { HSC_MA_TF_APPLICATIONS_NOTE } from "./applications";
import { HSC_MA_TF_INVERSE_NOTE } from "./inverse";
import { HSC_MA_TF_PROPERTIES_NOTE } from "./properties";

export { HSC_MA_TF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/trigonometric-functions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-tf-` here and `hscmtf-` on concept slugs.
 *
 * 6 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_TF_NOTES: Record<string, SubtopicNote> = {
  "hscm-tf-equations": HSC_MA_TF_EQUATIONS_NOTE,
  "hscm-tf-polar": HSC_MA_TF_POLAR_NOTE,
  "hscm-tf-triangle": HSC_MA_TF_TRIANGLE_NOTE,
  "hscm-tf-applications": HSC_MA_TF_APPLICATIONS_NOTE,
  "hscm-tf-inverse": HSC_MA_TF_INVERSE_NOTE,
  "hscm-tf-properties": HSC_MA_TF_PROPERTIES_NOTE,
};

export const HSC_MA_TF_SLUGS = Object.keys(HSC_MA_TF_NOTES);
