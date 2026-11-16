import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_CP_TABLE_NOTE } from "./table";
import { NEET_CH_CP_SIZE_NOTE } from "./size";
import { NEET_CH_CP_PROPERTIES_NOTE } from "./properties";

export { NEET_CH_CP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/classification-of-elements/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-cp-` here and `nchcp-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_CP_NOTES: Record<string, SubtopicNote> = {
  "nch-cp-table": NEET_CH_CP_TABLE_NOTE,
  "nch-cp-size": NEET_CH_CP_SIZE_NOTE,
  "nch-cp-properties": NEET_CH_CP_PROPERTIES_NOTE,
};

export const NEET_CH_CP_SLUGS = Object.keys(NEET_CH_CP_NOTES);
