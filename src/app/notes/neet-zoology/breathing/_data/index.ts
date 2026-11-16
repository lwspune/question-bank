import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_BR_BREATHING_NOTE } from "./breathing";
import { NEET_ZO_BR_TRANSPORT_NOTE } from "./transport";

export { NEET_ZO_BR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/breathing/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-br-` here and `nzobr-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_BR_NOTES: Record<string, SubtopicNote> = {
  "nzo-br-breathing": NEET_ZO_BR_BREATHING_NOTE,
  "nzo-br-transport": NEET_ZO_BR_TRANSPORT_NOTE,
};

export const NEET_ZO_BR_SLUGS = Object.keys(NEET_ZO_BR_NOTES);
