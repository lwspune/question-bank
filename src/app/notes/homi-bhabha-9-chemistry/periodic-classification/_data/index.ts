import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_EP_SYMBOLS_NOTE } from "./symbols";
import { HB9_EP_PERIODIC_NOTE } from "./periodic";

export { HB9_PERIODIC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/periodic-classification/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-ep-` here and `hb9ep-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/periodic-classification.ts). Order matches `subtopicOrder`.
 */
export const HB9_PERIODIC_NOTES: Record<string, SubtopicNote> = {
  "hb9-ep-symbols": HB9_EP_SYMBOLS_NOTE,
  "hb9-ep-periodic": HB9_EP_PERIODIC_NOTE,
};

export const HB9_PERIODIC_SLUGS = Object.keys(HB9_PERIODIC_NOTES);
