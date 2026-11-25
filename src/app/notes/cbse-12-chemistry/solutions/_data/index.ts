import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_SO_TYPES_NOTE } from "./types";
import { CB_CH_SO_CONCENTRATION_NOTE } from "./concentration";
import { CB_CH_SO_SOLUBILITY_NOTE } from "./solubility";
import { CB_CH_SO_RAOULT_NOTE } from "./raoult";
import { CB_CH_SO_IDEAL_NOTE } from "./ideal";
import { CB_CH_SO_COLLIGATIVE_NOTE } from "./colligative";
import { CB_CH_SO_ABNORMAL_NOTE } from "./abnormal";

export { CB_CH_SO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/solutions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-so-` here and `cbcso-` on concept slugs.
 *
 * 7 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_SO_NOTES: Record<string, SubtopicNote> = {
  "cbc-so-types": CB_CH_SO_TYPES_NOTE,
  "cbc-so-concentration": CB_CH_SO_CONCENTRATION_NOTE,
  "cbc-so-solubility": CB_CH_SO_SOLUBILITY_NOTE,
  "cbc-so-raoult": CB_CH_SO_RAOULT_NOTE,
  "cbc-so-ideal": CB_CH_SO_IDEAL_NOTE,
  "cbc-so-colligative": CB_CH_SO_COLLIGATIVE_NOTE,
  "cbc-so-abnormal": CB_CH_SO_ABNORMAL_NOTE,
};

export const CB_CH_SO_SLUGS = Object.keys(CB_CH_SO_NOTES);
