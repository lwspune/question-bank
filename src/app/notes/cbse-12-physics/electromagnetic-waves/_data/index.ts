import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_EW_DISPLACEMENT_NOTE } from "./displacement";
import { CB_PH_EW_WAVES_NOTE } from "./waves";
import { CB_PH_EW_SPECTRUM_NOTE } from "./spectrum";

export { CB_PH_EW_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/electromagnetic-waves/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-ew-` here and `cbpew-` on concept slugs.
 *
 * 3 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_EW_NOTES: Record<string, SubtopicNote> = {
  "cbp-ew-displacement": CB_PH_EW_DISPLACEMENT_NOTE,
  "cbp-ew-waves": CB_PH_EW_WAVES_NOTE,
  "cbp-ew-spectrum": CB_PH_EW_SPECTRUM_NOTE,
};

export const CB_PH_EW_SLUGS = Object.keys(CB_PH_EW_NOTES);
