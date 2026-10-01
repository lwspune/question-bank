import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_CR_TYPES_NOTE } from "./types";
import { CDS_CH_CR_REDOX_NOTE } from "./redox";
import { CDS_CH_CR_DAILY_NOTE } from "./daily";

export { CDS_CH_REACTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/chemical-reactions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-cr-` here and `cdschcr-` on concept slugs.
 *
 * Three pages cut by reading all 19 solutions (scripts/cds-gs/reshape/chemical-reactions.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_CH_REACTIONS_NOTES: Record<string, SubtopicNote> = {
  "cdsch-cr-types": CDS_CH_CR_TYPES_NOTE,
  "cdsch-cr-redox": CDS_CH_CR_REDOX_NOTE,
  "cdsch-cr-daily": CDS_CH_CR_DAILY_NOTE,
};

export const CDS_CH_REACTIONS_SLUGS = Object.keys(CDS_CH_REACTIONS_NOTES);
