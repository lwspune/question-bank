import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_AK_BASIS_NOTE } from "./basis";
import { NEET_ZO_AK_NONCHORDATES_NOTE } from "./nonchordates";
import { NEET_ZO_AK_CHORDATA_NOTE } from "./chordata";
import { NEET_ZO_AK_VERTEBRATES_NOTE } from "./vertebrates";

export { NEET_ZO_AK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/animal-kingdom/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-ak-` here and `nzoak-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_AK_NOTES: Record<string, SubtopicNote> = {
  "nzo-ak-basis": NEET_ZO_AK_BASIS_NOTE,
  "nzo-ak-nonchordates": NEET_ZO_AK_NONCHORDATES_NOTE,
  "nzo-ak-chordata": NEET_ZO_AK_CHORDATA_NOTE,
  "nzo-ak-vertebrates": NEET_ZO_AK_VERTEBRATES_NOTE,
};

export const NEET_ZO_AK_SLUGS = Object.keys(NEET_ZO_AK_NOTES);
