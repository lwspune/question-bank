import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_PB_BORON_NOTE } from "./boron";
import { NEET_CH_PB_NITROGEN_NOTE } from "./nitrogen";
import { NEET_CH_PB_OXYGEN_NOTE } from "./oxygen";
import { NEET_CH_PB_HALOGENS_NOTE } from "./halogens";

export { NEET_CH_PB_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/p-block-elements/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-pb-` here and `nchpb-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_PB_NOTES: Record<string, SubtopicNote> = {
  "nch-pb-boron": NEET_CH_PB_BORON_NOTE,
  "nch-pb-nitrogen": NEET_CH_PB_NITROGEN_NOTE,
  "nch-pb-oxygen": NEET_CH_PB_OXYGEN_NOTE,
  "nch-pb-halogens": NEET_CH_PB_HALOGENS_NOTE,
};

export const NEET_CH_PB_SLUGS = Object.keys(NEET_CH_PB_NOTES);
