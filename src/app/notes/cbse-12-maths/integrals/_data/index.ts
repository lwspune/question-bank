import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_IN_ANTIDERIVATIVE_NOTE } from "./antiderivative";
import { CB_MA_IN_SUBSTITUTION_NOTE } from "./substitution";
import { CB_MA_IN_TRIG_NOTE } from "./trig";
import { CB_MA_IN_PARTICULAR_NOTE } from "./particular";
import { CB_MA_IN_PARTIAL_NOTE } from "./partial";
import { CB_MA_IN_PARTS_NOTE } from "./parts";
import { CB_MA_IN_SPECIAL_NOTE } from "./special";
import { CB_MA_IN_DEFINITE_NOTE } from "./definite";
import { CB_MA_IN_DEFSUB_NOTE } from "./defsub";
import { CB_MA_IN_PROPERTIES_NOTE } from "./properties";

export { CB_MA_IN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/integrals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-in-` here and `cbmin-` on concept slugs.
 *
 * 10 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_IN_NOTES: Record<string, SubtopicNote> = {
  "cbm-in-antiderivative": CB_MA_IN_ANTIDERIVATIVE_NOTE,
  "cbm-in-substitution": CB_MA_IN_SUBSTITUTION_NOTE,
  "cbm-in-trig": CB_MA_IN_TRIG_NOTE,
  "cbm-in-particular": CB_MA_IN_PARTICULAR_NOTE,
  "cbm-in-partial": CB_MA_IN_PARTIAL_NOTE,
  "cbm-in-parts": CB_MA_IN_PARTS_NOTE,
  "cbm-in-special": CB_MA_IN_SPECIAL_NOTE,
  "cbm-in-definite": CB_MA_IN_DEFINITE_NOTE,
  "cbm-in-defsub": CB_MA_IN_DEFSUB_NOTE,
  "cbm-in-properties": CB_MA_IN_PROPERTIES_NOTE,
};

export const CB_MA_IN_SLUGS = Object.keys(CB_MA_IN_NOTES);
