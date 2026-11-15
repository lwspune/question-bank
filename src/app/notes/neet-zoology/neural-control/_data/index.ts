import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_NC_NEURON_NOTE } from "./neuron";
import { NEET_ZO_NC_BRAIN_NOTE } from "./brain";

export { NEET_ZO_NC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/neural-control/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-nc-` here and `nzonc-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_NC_NOTES: Record<string, SubtopicNote> = {
  "nzo-nc-neuron": NEET_ZO_NC_NEURON_NOTE,
  "nzo-nc-brain": NEET_ZO_NC_BRAIN_NOTE,
};

export const NEET_ZO_NC_SLUGS = Object.keys(NEET_ZO_NC_NOTES);
