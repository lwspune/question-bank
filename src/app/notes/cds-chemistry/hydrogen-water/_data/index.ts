import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_HW_WATER_NOTE } from "./water";

export { CDS_CH_WATER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/hydrogen-water/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-hw-` here and `cdschhw-` on concept slugs.
 *
 * One page for all five rows (scripts/cds-gs/reshape/hydrogen-water.ts).
 */
export const CDS_CH_WATER_NOTES: Record<string, SubtopicNote> = {
  "cdsch-hw-water": CDS_CH_HW_WATER_NOTE,
};

export const CDS_CH_WATER_SLUGS = Object.keys(CDS_CH_WATER_NOTES);
