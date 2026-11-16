import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_HR_SYSTEMS_NOTE } from "./systems";
import { NEET_ZO_HR_GAMETOGENESIS_NOTE } from "./gametogenesis";
import { NEET_ZO_HR_CYCLE_NOTE } from "./cycle";
import { NEET_ZO_HR_PREGNANCY_NOTE } from "./pregnancy";

export { NEET_ZO_HR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/human-reproduction/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-hr-` here and `nzohr-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_HR_NOTES: Record<string, SubtopicNote> = {
  "nzo-hr-systems": NEET_ZO_HR_SYSTEMS_NOTE,
  "nzo-hr-gametogenesis": NEET_ZO_HR_GAMETOGENESIS_NOTE,
  "nzo-hr-cycle": NEET_ZO_HR_CYCLE_NOTE,
  "nzo-hr-pregnancy": NEET_ZO_HR_PREGNANCY_NOTE,
};

export const NEET_ZO_HR_SLUGS = Object.keys(NEET_ZO_HR_NOTES);
