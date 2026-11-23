import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_SD_RECTIFIER_NOTE } from "./rectifier";
import { HSC_PH_SD_RIPPLE_NOTE } from "./ripple";
import { HSC_PH_SD_ZENER_NOTE } from "./zener";
import { HSC_PH_SD_OPTODIODES_NOTE } from "./optodiodes";
import { HSC_PH_SD_TRANSISTOR_NOTE } from "./transistor";
import { HSC_PH_SD_AMPLIFIER_NOTE } from "./amplifier";
import { HSC_PH_SD_GATES_NOTE } from "./gates";

export { HSC_PH_SD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/semiconductor-devices/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-sd-` here and `hscpsd-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_SD_NOTES: Record<string, SubtopicNote> = {
  "hscp-sd-rectifier": HSC_PH_SD_RECTIFIER_NOTE,
  "hscp-sd-ripple": HSC_PH_SD_RIPPLE_NOTE,
  "hscp-sd-zener": HSC_PH_SD_ZENER_NOTE,
  "hscp-sd-optodiodes": HSC_PH_SD_OPTODIODES_NOTE,
  "hscp-sd-transistor": HSC_PH_SD_TRANSISTOR_NOTE,
  "hscp-sd-amplifier": HSC_PH_SD_AMPLIFIER_NOTE,
  "hscp-sd-gates": HSC_PH_SD_GATES_NOTE,
};

export const HSC_PH_SD_SLUGS = Object.keys(HSC_PH_SD_NOTES);
