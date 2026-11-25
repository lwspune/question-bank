import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_AC_RESISTOR_NOTE } from "./resistor";
import { CB_PH_AC_REACTANCE_NOTE } from "./reactance";
import { CB_PH_AC_LCR_NOTE } from "./lcr";
import { CB_PH_AC_POWER_NOTE } from "./power";
import { CB_PH_AC_TRANSFORMER_NOTE } from "./transformer";

export { CB_PH_AC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/alternating-current/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-ac-` here and `cbpac-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_AC_NOTES: Record<string, SubtopicNote> = {
  "cbp-ac-resistor": CB_PH_AC_RESISTOR_NOTE,
  "cbp-ac-reactance": CB_PH_AC_REACTANCE_NOTE,
  "cbp-ac-lcr": CB_PH_AC_LCR_NOTE,
  "cbp-ac-power": CB_PH_AC_POWER_NOTE,
  "cbp-ac-transformer": CB_PH_AC_TRANSFORMER_NOTE,
};

export const CB_PH_AC_SLUGS = Object.keys(CB_PH_AC_NOTES);
