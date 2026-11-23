import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_MU_QUANTITIES_NOTE } from "./quantities";
import { HB9_MU_DERIVED_NOTE } from "./derived";

export { HB9_MEASUREMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/measurement-units/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-mu-` here and `hb9mu-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/measurement-units.ts). Order matches `subtopicOrder`.
 */
export const HB9_MEASUREMENT_NOTES: Record<string, SubtopicNote> = {
  "hb9-mu-quantities": HB9_MU_QUANTITIES_NOTE,
  "hb9-mu-derived": HB9_MU_DERIVED_NOTE,
};

export const HB9_MEASUREMENT_SLUGS = Object.keys(HB9_MEASUREMENT_NOTES);
