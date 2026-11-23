import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_SO_SOLUBILITY_NOTE } from "./solubility";
import { HSC_CH_SO_LIQUIDS_NOTE } from "./liquids";
import { HSC_CH_SO_COLLIGATIVE_NOTE } from "./colligative";
import { HSC_CH_SO_LOWERING_NOTE } from "./lowering";
import { HSC_CH_SO_BOILING_NOTE } from "./boiling";
import { HSC_CH_SO_FREEZING_NOTE } from "./freezing";
import { HSC_CH_SO_OSMOTIC_NOTE } from "./osmotic";
import { HSC_CH_SO_ELECTROLYTES_NOTE } from "./electrolytes";

export { HSC_CH_SO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/solutions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-so-` here and `hsccso-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_SO_NOTES: Record<string, SubtopicNote> = {
  "hscc-so-solubility": HSC_CH_SO_SOLUBILITY_NOTE,
  "hscc-so-liquids": HSC_CH_SO_LIQUIDS_NOTE,
  "hscc-so-colligative": HSC_CH_SO_COLLIGATIVE_NOTE,
  "hscc-so-lowering": HSC_CH_SO_LOWERING_NOTE,
  "hscc-so-boiling": HSC_CH_SO_BOILING_NOTE,
  "hscc-so-freezing": HSC_CH_SO_FREEZING_NOTE,
  "hscc-so-osmotic": HSC_CH_SO_OSMOTIC_NOTE,
  "hscc-so-electrolytes": HSC_CH_SO_ELECTROLYTES_NOTE,
};

export const HSC_CH_SO_SLUGS = Object.keys(HSC_CH_SO_NOTES);
