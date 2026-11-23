import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_AC_RMS_NOTE } from "./rms";
import { HSC_PH_AC_PHASORS_NOTE } from "./phasors";
import { HSC_PH_AC_POWER_NOTE } from "./power";
import { HSC_PH_AC_LC_NOTE } from "./lc";
import { HSC_PH_AC_RESONANCE_NOTE } from "./resonance";

export { HSC_PH_AC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/ac-circuits/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-ac-` here and `hscpac-` on concept slugs.
 *
 * 5 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_AC_NOTES: Record<string, SubtopicNote> = {
  "hscp-ac-rms": HSC_PH_AC_RMS_NOTE,
  "hscp-ac-phasors": HSC_PH_AC_PHASORS_NOTE,
  "hscp-ac-power": HSC_PH_AC_POWER_NOTE,
  "hscp-ac-lc": HSC_PH_AC_LC_NOTE,
  "hscp-ac-resonance": HSC_PH_AC_RESONANCE_NOTE,
};

export const HSC_PH_AC_SLUGS = Object.keys(HSC_PH_AC_NOTES);
