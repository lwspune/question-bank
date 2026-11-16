import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_HH_DISEASES_NOTE } from "./diseases";
import { NEET_ZO_HH_IMMUNITY_NOTE } from "./immunity";
import { NEET_ZO_HH_CANCER_NOTE } from "./cancer";
import { NEET_ZO_HH_DRUGS_NOTE } from "./drugs";

export { NEET_ZO_HH_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/human-health/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-hh-` here and `nzohh-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_HH_NOTES: Record<string, SubtopicNote> = {
  "nzo-hh-diseases": NEET_ZO_HH_DISEASES_NOTE,
  "nzo-hh-immunity": NEET_ZO_HH_IMMUNITY_NOTE,
  "nzo-hh-cancer": NEET_ZO_HH_CANCER_NOTE,
  "nzo-hh-drugs": NEET_ZO_HH_DRUGS_NOTE,
};

export const NEET_ZO_HH_SLUGS = Object.keys(NEET_ZO_HH_NOTES);
