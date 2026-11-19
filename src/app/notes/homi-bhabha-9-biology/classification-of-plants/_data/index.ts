import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_CP_BASIS_NOTE } from "./basis";
import { HB9_CP_SPORES_NOTE } from "./spores";
import { HB9_CP_SEEDS_NOTE } from "./seeds";

export { HB9_PLANTCLASS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/classification-of-plants/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-cp-` here and `hb9cp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/classification-of-plants.ts). Order matches `subtopicOrder`.
 */
export const HB9_PLANTCLASS_NOTES: Record<string, SubtopicNote> = {
  "hb9-cp-basis": HB9_CP_BASIS_NOTE,
  "hb9-cp-spores": HB9_CP_SPORES_NOTE,
  "hb9-cp-seeds": HB9_CP_SEEDS_NOTE,
};

export const HB9_PLANTCLASS_SLUGS = Object.keys(HB9_PLANTCLASS_NOTES);
