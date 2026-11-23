import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_MX_TRANSFORMATIONS_NOTE } from "./transformations";
import { HSC_MA_MX_ELEMENTARY_NOTE } from "./elementary";
import { HSC_MA_MX_COFACTORS_NOTE } from "./cofactors";
import { HSC_MA_MX_ADJOINT_NOTE } from "./adjoint";
import { HSC_MA_MX_EQUATIONS_NOTE } from "./equations";

export { HSC_MA_MX_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/matrices/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-mx-` here and `hscmmx-` on concept slugs.
 *
 * 5 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_MX_NOTES: Record<string, SubtopicNote> = {
  "hscm-mx-transformations": HSC_MA_MX_TRANSFORMATIONS_NOTE,
  "hscm-mx-elementary": HSC_MA_MX_ELEMENTARY_NOTE,
  "hscm-mx-cofactors": HSC_MA_MX_COFACTORS_NOTE,
  "hscm-mx-adjoint": HSC_MA_MX_ADJOINT_NOTE,
  "hscm-mx-equations": HSC_MA_MX_EQUATIONS_NOTE,
};

export const HSC_MA_MX_SLUGS = Object.keys(HSC_MA_MX_NOTES);
