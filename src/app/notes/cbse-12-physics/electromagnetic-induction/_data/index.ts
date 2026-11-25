import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_EI_FARADAY_NOTE } from "./faraday";
import { CB_PH_EI_LENZ_NOTE } from "./lenz";
import { CB_PH_EI_MOTIONAL_NOTE } from "./motional";
import { CB_PH_EI_INDUCTANCE_NOTE } from "./inductance";
import { CB_PH_EI_GENERATOR_NOTE } from "./generator";

export { CB_PH_EI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/electromagnetic-induction/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-ei-` here and `cbpei-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_EI_NOTES: Record<string, SubtopicNote> = {
  "cbp-ei-faraday": CB_PH_EI_FARADAY_NOTE,
  "cbp-ei-lenz": CB_PH_EI_LENZ_NOTE,
  "cbp-ei-motional": CB_PH_EI_MOTIONAL_NOTE,
  "cbp-ei-inductance": CB_PH_EI_INDUCTANCE_NOTE,
  "cbp-ei-generator": CB_PH_EI_GENERATOR_NOTE,
};

export const CB_PH_EI_SLUGS = Object.keys(CB_PH_EI_NOTES);
