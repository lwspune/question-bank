import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_AT_MODELS_NOTE } from "./models";
import { HB9_AT_NUMBERS_NOTE } from "./numbers";
import { HB9_AT_SHELLS_NOTE } from "./shells";
import { HB9_AT_VALENCY_NOTE } from "./valency";
import { HB9_AT_BONDS_NOTE } from "./bonds";

export { HB9_ATOMIC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/atomic-structure/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-at-` here and `hb9at-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/atomic-structure.ts). Order matches `subtopicOrder`.
 */
export const HB9_ATOMIC_NOTES: Record<string, SubtopicNote> = {
  "hb9-at-models": HB9_AT_MODELS_NOTE,
  "hb9-at-numbers": HB9_AT_NUMBERS_NOTE,
  "hb9-at-shells": HB9_AT_SHELLS_NOTE,
  "hb9-at-valency": HB9_AT_VALENCY_NOTE,
  "hb9-at-bonds": HB9_AT_BONDS_NOTE,
};

export const HB9_ATOMIC_SLUGS = Object.keys(HB9_ATOMIC_NOTES);
