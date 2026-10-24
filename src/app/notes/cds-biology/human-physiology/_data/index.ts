import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_HU_TISSUES_NOTE } from "./tissues";
import { CDS_BI_HU_DIGESTION_NOTE } from "./digestion";
import { CDS_BI_HU_BLOOD_NOTE } from "./blood";
import { CDS_BI_HU_HEART_NOTE } from "./heart";
import { CDS_BI_HU_EXCRETION_NOTE } from "./excretion";
import { CDS_BI_HU_CONTROL_NOTE } from "./control";

export { CDS_BI_PHYSIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/human-physiology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-hu-` here and `cdsbihu-` on concept slugs.
 *
 * 6 pages cut by reading every solution (scripts/cds-gs/reshape/human-physiology.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_PHYSIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-hu-tissues": CDS_BI_HU_TISSUES_NOTE,
  "cdsbi-hu-digestion": CDS_BI_HU_DIGESTION_NOTE,
  "cdsbi-hu-blood": CDS_BI_HU_BLOOD_NOTE,
  "cdsbi-hu-heart": CDS_BI_HU_HEART_NOTE,
  "cdsbi-hu-excretion": CDS_BI_HU_EXCRETION_NOTE,
  "cdsbi-hu-control": CDS_BI_HU_CONTROL_NOTE,
};

export const CDS_BI_PHYSIOLOGY_SLUGS = Object.keys(CDS_BI_PHYSIOLOGY_NOTES);
