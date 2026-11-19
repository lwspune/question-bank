import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_LP_DIGESTION_NOTE } from "./digestion";
import { HB9_LP_RESPIRATION_NOTE } from "./respiration";
import { HB9_LP_TRANSPORT_NOTE } from "./transport";
import { HB9_LP_CONTROL_NOTE } from "./control";

export { HB9_LIFE_PROCESSES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/life-processes/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-lp-` here and `hb9lp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/life-processes.ts). Order matches `subtopicOrder`.
 */
export const HB9_LIFE_PROCESSES_NOTES: Record<string, SubtopicNote> = {
  "hb9-lp-digestion": HB9_LP_DIGESTION_NOTE,
  "hb9-lp-respiration": HB9_LP_RESPIRATION_NOTE,
  "hb9-lp-transport": HB9_LP_TRANSPORT_NOTE,
  "hb9-lp-control": HB9_LP_CONTROL_NOTE,
};

export const HB9_LIFE_PROCESSES_SLUGS = Object.keys(HB9_LIFE_PROCESSES_NOTES);
