import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_KT_GAS_LAWS_NOTE } from "./gas-laws";
import { NEET_PH_KT_KINETIC_NOTE } from "./kinetic";

export { NEET_PH_KT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/kinetic-theory/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-kt-` here and `nphkt-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_KT_NOTES: Record<string, SubtopicNote> = {
  "nph-kt-gas-laws": NEET_PH_KT_GAS_LAWS_NOTE,
  "nph-kt-kinetic": NEET_PH_KT_KINETIC_NOTE,
};

export const NEET_PH_KT_SLUGS = Object.keys(NEET_PH_KT_NOTES);
