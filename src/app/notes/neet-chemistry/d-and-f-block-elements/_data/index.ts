import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_DF_PROPERTIES_NOTE } from "./properties";
import { NEET_CH_DF_MAGNETIC_NOTE } from "./magnetic";
import { NEET_CH_DF_COMPOUNDS_NOTE } from "./compounds";
import { NEET_CH_DF_LANTHANOIDS_NOTE } from "./lanthanoids";

export { NEET_CH_DF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/d-and-f-block-elements/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-df-` here and `nchdf-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_DF_NOTES: Record<string, SubtopicNote> = {
  "nch-df-properties": NEET_CH_DF_PROPERTIES_NOTE,
  "nch-df-magnetic": NEET_CH_DF_MAGNETIC_NOTE,
  "nch-df-compounds": NEET_CH_DF_COMPOUNDS_NOTE,
  "nch-df-lanthanoids": NEET_CH_DF_LANTHANOIDS_NOTE,
};

export const NEET_CH_DF_SLUGS = Object.keys(NEET_CH_DF_NOTES);
