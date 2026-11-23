import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_CE_KIRCHHOFF_NOTE } from "./kirchhoff";
import { HSC_PH_CE_BRIDGES_NOTE } from "./bridges";
import { HSC_PH_CE_POTENTIOMETER_NOTE } from "./potentiometer";
import { HSC_PH_CE_METERS_NOTE } from "./meters";

export { HSC_PH_CE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/current-electricity/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-ce-` here and `hscpce-` on concept slugs.
 *
 * 4 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_CE_NOTES: Record<string, SubtopicNote> = {
  "hscp-ce-kirchhoff": HSC_PH_CE_KIRCHHOFF_NOTE,
  "hscp-ce-bridges": HSC_PH_CE_BRIDGES_NOTE,
  "hscp-ce-potentiometer": HSC_PH_CE_POTENTIOMETER_NOTE,
  "hscp-ce-meters": HSC_PH_CE_METERS_NOTE,
};

export const HSC_PH_CE_SLUGS = Object.keys(HSC_PH_CE_NOTES);
