import type { SubtopicNote } from "@/app/notes/_types";
import { MAXWELL_EMW_NOTE } from "./maxwell";
import { FIELDS_EMW_NOTE } from "./fields";
import { ENERGY_EMW_NOTE } from "./energy";
import { SPECTRUM_EMW_NOTE } from "./spectrum";

export { JEE_PH_EMW_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/electromagnetic-waves/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-emw-` here and `jpemw-` on
 * concept slugs.
 */
export const JEE_PH_EMW_NOTES: Record<string, SubtopicNote> = {
  "jph-emw-maxwell": MAXWELL_EMW_NOTE,
  "jph-emw-fields": FIELDS_EMW_NOTE,
  "jph-emw-energy": ENERGY_EMW_NOTE,
  "jph-emw-spectrum": SPECTRUM_EMW_NOTE,
};

export const JEE_PH_EMW_SLUGS = Object.keys(JEE_PH_EMW_NOTES);
