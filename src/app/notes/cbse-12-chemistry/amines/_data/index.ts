import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_AM_CLASSIFICATION_NOTE } from "./classification";
import { CB_CH_AM_NOMENCLATURE_NOTE } from "./nomenclature";
import { CB_CH_AM_PREPARATION_NOTE } from "./preparation";
import { CB_CH_AM_PHYSICAL_NOTE } from "./physical";
import { CB_CH_AM_REACTIONS_NOTE } from "./reactions";
import { CB_CH_AM_DIAZONIUM_NOTE } from "./diazonium";
import { CB_CH_AM_SYNTHESIS_NOTE } from "./synthesis";

export { CB_CH_AM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/amines/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-am-` here and `cbcam-` on concept slugs.
 *
 * 7 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_AM_NOTES: Record<string, SubtopicNote> = {
  "cbc-am-classification": CB_CH_AM_CLASSIFICATION_NOTE,
  "cbc-am-nomenclature": CB_CH_AM_NOMENCLATURE_NOTE,
  "cbc-am-preparation": CB_CH_AM_PREPARATION_NOTE,
  "cbc-am-physical": CB_CH_AM_PHYSICAL_NOTE,
  "cbc-am-reactions": CB_CH_AM_REACTIONS_NOTE,
  "cbc-am-diazonium": CB_CH_AM_DIAZONIUM_NOTE,
  "cbc-am-synthesis": CB_CH_AM_SYNTHESIS_NOTE,
};

export const CB_CH_AM_SLUGS = Object.keys(CB_CH_AM_NOTES);
