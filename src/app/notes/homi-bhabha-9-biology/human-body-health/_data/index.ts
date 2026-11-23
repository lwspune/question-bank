import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_HB_NUTRITION_NOTE } from "./nutrition";
import { HB9_HB_BLOOD_NOTE } from "./blood";
import { HB9_HB_NERVES_NOTE } from "./nerves";
import { HB9_HB_DISEASES_NOTE } from "./diseases";

export { HB9_HUMAN_BODY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/human-body-health/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-hb-` here and `hb9hb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/human-body-health.ts). Order matches `subtopicOrder`.
 */
export const HB9_HUMAN_BODY_NOTES: Record<string, SubtopicNote> = {
  "hb9-hb-nutrition": HB9_HB_NUTRITION_NOTE,
  "hb9-hb-blood": HB9_HB_BLOOD_NOTE,
  "hb9-hb-nerves": HB9_HB_NERVES_NOTE,
  "hb9-hb-diseases": HB9_HB_DISEASES_NOTE,
};

export const HB9_HUMAN_BODY_SLUGS = Object.keys(HB9_HUMAN_BODY_NOTES);
