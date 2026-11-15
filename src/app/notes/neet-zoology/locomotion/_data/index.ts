import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_LM_MUSCLE_NOTE } from "./muscle";
import { NEET_ZO_LM_SKELETON_NOTE } from "./skeleton";
import { NEET_ZO_LM_JOINTS_NOTE } from "./joints";

export { NEET_ZO_LM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/locomotion/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-lm-` here and `nzolm-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_LM_NOTES: Record<string, SubtopicNote> = {
  "nzo-lm-muscle": NEET_ZO_LM_MUSCLE_NOTE,
  "nzo-lm-skeleton": NEET_ZO_LM_SKELETON_NOTE,
  "nzo-lm-joints": NEET_ZO_LM_JOINTS_NOTE,
};

export const NEET_ZO_LM_SLUGS = Object.keys(NEET_ZO_LM_NOTES);
