import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_EM_FARADAY_NOTE } from "./faraday";
import { HSC_PH_EM_LENZ_NOTE } from "./lenz";
import { HSC_PH_EM_MOTIONAL_NOTE } from "./motional";
import { HSC_PH_EM_STATIONARY_NOTE } from "./stationary";
import { HSC_PH_EM_GENERATORS_NOTE } from "./generators";
import { HSC_PH_EM_EDDY_NOTE } from "./eddy";
import { HSC_PH_EM_SELF_NOTE } from "./self";
import { HSC_PH_EM_MUTUAL_NOTE } from "./mutual";

export { HSC_PH_EM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/electromagnetic-induction/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-em-` here and `hscpem-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_EM_NOTES: Record<string, SubtopicNote> = {
  "hscp-em-faraday": HSC_PH_EM_FARADAY_NOTE,
  "hscp-em-lenz": HSC_PH_EM_LENZ_NOTE,
  "hscp-em-motional": HSC_PH_EM_MOTIONAL_NOTE,
  "hscp-em-stationary": HSC_PH_EM_STATIONARY_NOTE,
  "hscp-em-generators": HSC_PH_EM_GENERATORS_NOTE,
  "hscp-em-eddy": HSC_PH_EM_EDDY_NOTE,
  "hscp-em-self": HSC_PH_EM_SELF_NOTE,
  "hscp-em-mutual": HSC_PH_EM_MUTUAL_NOTE,
};

export const HSC_PH_EM_SLUGS = Object.keys(HSC_PH_EM_NOTES);
