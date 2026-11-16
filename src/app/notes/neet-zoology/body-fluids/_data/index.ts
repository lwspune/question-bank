import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_BF_BLOOD_NOTE } from "./blood";
import { NEET_ZO_BF_HEART_NOTE } from "./heart";

export { NEET_ZO_BF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/body-fluids/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-bf-` here and `nzobf-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_BF_NOTES: Record<string, SubtopicNote> = {
  "nzo-bf-blood": NEET_ZO_BF_BLOOD_NOTE,
  "nzo-bf-heart": NEET_ZO_BF_HEART_NOTE,
};

export const NEET_ZO_BF_SLUGS = Object.keys(NEET_ZO_BF_NOTES);
