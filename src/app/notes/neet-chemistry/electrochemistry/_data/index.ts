import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_EC_CELLS_NOTE } from "./cells";
import { NEET_CH_EC_CONDUCTANCE_NOTE } from "./conductance";
import { NEET_CH_EC_ELECTROLYSIS_NOTE } from "./electrolysis";

export { NEET_CH_EC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/electrochemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-ec-` here and `nchec-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_EC_NOTES: Record<string, SubtopicNote> = {
  "nch-ec-cells": NEET_CH_EC_CELLS_NOTE,
  "nch-ec-conductance": NEET_CH_EC_CONDUCTANCE_NOTE,
  "nch-ec-electrolysis": NEET_CH_EC_ELECTROLYSIS_NOTE,
};

export const NEET_CH_EC_SLUGS = Object.keys(NEET_CH_EC_NOTES);
