import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_MM_TORQUE_NOTE } from "./torque";
import { HSC_PH_MM_ORIGIN_NOTE } from "./origin";
import { HSC_PH_MM_MAGNETIZATION_NOTE } from "./magnetization";
import { HSC_PH_MM_CLASSES_NOTE } from "./classes";
import { HSC_PH_MM_HYSTERESIS_NOTE } from "./hysteresis";
import { HSC_PH_MM_APPLICATIONS_NOTE } from "./applications";

export { HSC_PH_MM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/magnetic-materials/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-mm-` here and `hscpmm-` on concept slugs.
 *
 * 6 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_MM_NOTES: Record<string, SubtopicNote> = {
  "hscp-mm-torque": HSC_PH_MM_TORQUE_NOTE,
  "hscp-mm-origin": HSC_PH_MM_ORIGIN_NOTE,
  "hscp-mm-magnetization": HSC_PH_MM_MAGNETIZATION_NOTE,
  "hscp-mm-classes": HSC_PH_MM_CLASSES_NOTE,
  "hscp-mm-hysteresis": HSC_PH_MM_HYSTERESIS_NOTE,
  "hscp-mm-applications": HSC_PH_MM_APPLICATIONS_NOTE,
};

export const HSC_PH_MM_SLUGS = Object.keys(HSC_PH_MM_NOTES);
