import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_EX_ORGANS_NOTE } from "./organs";
import { NEET_ZO_EX_URINE_NOTE } from "./urine";
import { NEET_ZO_EX_REGULATION_NOTE } from "./regulation";

export { NEET_ZO_EX_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/excretion/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-ex-` here and `nzoex-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_EX_NOTES: Record<string, SubtopicNote> = {
  "nzo-ex-organs": NEET_ZO_EX_ORGANS_NOTE,
  "nzo-ex-urine": NEET_ZO_EX_URINE_NOTE,
  "nzo-ex-regulation": NEET_ZO_EX_REGULATION_NOTE,
};

export const NEET_ZO_EX_SLUGS = Object.keys(NEET_ZO_EX_NOTES);
