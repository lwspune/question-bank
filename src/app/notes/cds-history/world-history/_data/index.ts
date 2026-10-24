import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_HI_WO_REVOLUTIONS_NOTE } from "./revolutions";
import { CDS_HI_WO_MODERN_NOTE } from "./modern";

export { CDS_HI_WORLD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-history/world-history/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdshi-wo-` here and `cdshiwo-` on concept slugs.
 *
 * Two pages cut by reading all 15 solutions (scripts/cds-gs/reshape/world-history.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_HI_WORLD_NOTES: Record<string, SubtopicNote> = {
  "cdshi-wo-revolutions": CDS_HI_WO_REVOLUTIONS_NOTE,
  "cdshi-wo-modern": CDS_HI_WO_MODERN_NOTE,
};

export const CDS_HI_WORLD_SLUGS = Object.keys(CDS_HI_WORLD_NOTES);
