import type { SubtopicNote } from "@/app/notes/_types";
import { FARADAY_EMI_NOTE } from "./faraday";
import { MOTIONAL_EMI_NOTE } from "./motional";
import { ROTATION_EMI_NOTE } from "./rotation";
import { INDUCTANCE_EMI_NOTE } from "./inductance";

export { JEE_PH_EMI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/electromagnetic-induction/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-emi-` here and `jpemi-` on
 * concept slugs.
 */
export const JEE_PH_EMI_NOTES: Record<string, SubtopicNote> = {
  "jph-emi-faraday": FARADAY_EMI_NOTE,
  "jph-emi-motional": MOTIONAL_EMI_NOTE,
  "jph-emi-rotation": ROTATION_EMI_NOTE,
  "jph-emi-inductance": INDUCTANCE_EMI_NOTE,
};

export const JEE_PH_EMI_SLUGS = Object.keys(JEE_PH_EMI_NOTES);
