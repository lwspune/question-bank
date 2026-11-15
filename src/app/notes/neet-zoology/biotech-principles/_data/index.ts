import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_BP_RESTRICTION_NOTE } from "./restriction";
import { NEET_ZO_BP_VECTORS_NOTE } from "./vectors";
import { NEET_ZO_BP_PCR_NOTE } from "./pcr";
import { NEET_ZO_BP_PROCESSES_NOTE } from "./processes";

export { NEET_ZO_BP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/biotech-principles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-bp-` here and `nzobp-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_BP_NOTES: Record<string, SubtopicNote> = {
  "nzo-bp-restriction": NEET_ZO_BP_RESTRICTION_NOTE,
  "nzo-bp-vectors": NEET_ZO_BP_VECTORS_NOTE,
  "nzo-bp-pcr": NEET_ZO_BP_PCR_NOTE,
  "nzo-bp-processes": NEET_ZO_BP_PROCESSES_NOTE,
};

export const NEET_ZO_BP_SLUGS = Object.keys(NEET_ZO_BP_NOTES);
