import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_SW_PROGRESSIVE_NOTE } from "./progressive";
import { HSC_PH_SW_SUPERPOSITION_NOTE } from "./superposition";
import { HSC_PH_SW_STATIONARY_NOTE } from "./stationary";
import { HSC_PH_SW_HARMONICS_NOTE } from "./harmonics";
import { HSC_PH_SW_PIPES_NOTE } from "./pipes";
import { HSC_PH_SW_STRINGS_NOTE } from "./strings";
import { HSC_PH_SW_BEATS_NOTE } from "./beats";

export { HSC_PH_SW_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/superposition-of-waves/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-sw-` here and `hscpsw-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_SW_NOTES: Record<string, SubtopicNote> = {
  "hscp-sw-progressive": HSC_PH_SW_PROGRESSIVE_NOTE,
  "hscp-sw-superposition": HSC_PH_SW_SUPERPOSITION_NOTE,
  "hscp-sw-stationary": HSC_PH_SW_STATIONARY_NOTE,
  "hscp-sw-harmonics": HSC_PH_SW_HARMONICS_NOTE,
  "hscp-sw-pipes": HSC_PH_SW_PIPES_NOTE,
  "hscp-sw-strings": HSC_PH_SW_STRINGS_NOTE,
  "hscp-sw-beats": HSC_PH_SW_BEATS_NOTE,
};

export const HSC_PH_SW_SLUGS = Object.keys(HSC_PH_SW_NOTES);
