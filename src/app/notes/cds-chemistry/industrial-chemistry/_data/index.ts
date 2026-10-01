import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_IC_GASES_NOTE } from "./gases";
import { CDS_CH_IC_FERTILIZERS_NOTE } from "./fertilizers";
import { CDS_CH_IC_MATERIALS_NOTE } from "./materials";

export { CDS_CH_INDUSTRIAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/industrial-chemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-ic-` here and `cdschic-` on concept slugs.
 *
 * Three pages cut by reading all 14 solutions (scripts/cds-gs/reshape/industrial-chemistry.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_CH_INDUSTRIAL_NOTES: Record<string, SubtopicNote> = {
  "cdsch-ic-gases": CDS_CH_IC_GASES_NOTE,
  "cdsch-ic-fertilizers": CDS_CH_IC_FERTILIZERS_NOTE,
  "cdsch-ic-materials": CDS_CH_IC_MATERIALS_NOTE,
};

export const CDS_CH_INDUSTRIAL_SLUGS = Object.keys(CDS_CH_INDUSTRIAL_NOTES);
