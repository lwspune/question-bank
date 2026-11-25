import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_SE_BANDS_NOTE } from "./bands";
import { CB_PH_SE_EXTRINSIC_NOTE } from "./extrinsic";
import { CB_PH_SE_JUNCTION_NOTE } from "./junction";
import { CB_PH_SE_RECTIFIER_NOTE } from "./rectifier";
import { CB_PH_SE_SPECIAL_NOTE } from "./special";

export { CB_PH_SE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/semiconductor-electronics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-se-` here and `cbpse-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_SE_NOTES: Record<string, SubtopicNote> = {
  "cbp-se-bands": CB_PH_SE_BANDS_NOTE,
  "cbp-se-extrinsic": CB_PH_SE_EXTRINSIC_NOTE,
  "cbp-se-junction": CB_PH_SE_JUNCTION_NOTE,
  "cbp-se-rectifier": CB_PH_SE_RECTIFIER_NOTE,
  "cbp-se-special": CB_PH_SE_SPECIAL_NOTE,
};

export const CB_PH_SE_SLUGS = Object.keys(CB_PH_SE_NOTES);
