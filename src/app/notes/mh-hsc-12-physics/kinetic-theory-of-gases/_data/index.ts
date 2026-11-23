import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_KT_GAS_NOTE } from "./gas";
import { HSC_PH_KT_PRESSURE_NOTE } from "./pressure";
import { HSC_PH_KT_RMS_NOTE } from "./rms";
import { HSC_PH_KT_EQUIPARTITION_NOTE } from "./equipartition";
import { HSC_PH_KT_MAYER_NOTE } from "./mayer";
import { HSC_PH_KT_ABSORPTION_NOTE } from "./absorption";
import { HSC_PH_KT_BLACKBODY_NOTE } from "./blackbody";
import { HSC_PH_KT_KIRCHHOFF_NOTE } from "./kirchhoff";
import { HSC_PH_KT_WIEN_NOTE } from "./wien";

export { HSC_PH_KT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/kinetic-theory-of-gases/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-kt-` here and `hscpkt-` on concept slugs.
 *
 * 9 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_KT_NOTES: Record<string, SubtopicNote> = {
  "hscp-kt-gas": HSC_PH_KT_GAS_NOTE,
  "hscp-kt-pressure": HSC_PH_KT_PRESSURE_NOTE,
  "hscp-kt-rms": HSC_PH_KT_RMS_NOTE,
  "hscp-kt-equipartition": HSC_PH_KT_EQUIPARTITION_NOTE,
  "hscp-kt-mayer": HSC_PH_KT_MAYER_NOTE,
  "hscp-kt-absorption": HSC_PH_KT_ABSORPTION_NOTE,
  "hscp-kt-blackbody": HSC_PH_KT_BLACKBODY_NOTE,
  "hscp-kt-kirchhoff": HSC_PH_KT_KIRCHHOFF_NOTE,
  "hscp-kt-wien": HSC_PH_KT_WIEN_NOTE,
};

export const HSC_PH_KT_SLUGS = Object.keys(HSC_PH_KT_NOTES);
