import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_EV_EVIDENCES_NOTE } from "./evidences";
import { NEET_ZO_EV_RADIATION_NOTE } from "./radiation";
import { NEET_ZO_EV_HARDY_NOTE } from "./hardy";
import { NEET_ZO_EV_HISTORY_NOTE } from "./history";

export { NEET_ZO_EV_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/evolution/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-ev-` here and `nzoev-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_EV_NOTES: Record<string, SubtopicNote> = {
  "nzo-ev-evidences": NEET_ZO_EV_EVIDENCES_NOTE,
  "nzo-ev-radiation": NEET_ZO_EV_RADIATION_NOTE,
  "nzo-ev-hardy": NEET_ZO_EV_HARDY_NOTE,
  "nzo-ev-history": NEET_ZO_EV_HISTORY_NOTE,
};

export const NEET_ZO_EV_SLUGS = Object.keys(NEET_ZO_EV_NOTES);
