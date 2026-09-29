import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_RA_RATIO_NOTE } from "./ratio";
import { CDS_RA_STORIES_NOTE } from "./stories";
import { CDS_RA_ALGEBRA_NOTE } from "./algebra";
import { CDS_RA_VARIATION_NOTE } from "./variation";
import { CDS_RA_PARTNERSHIP_NOTE } from "./partnership";
import { CDS_RA_MIXTURES_NOTE } from "./mixtures";

export { CDS_RATIO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/ratio/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-ra-` here and `cdsra-` on concept slugs.
 *
 * The six pages were cut by reading all 76 solutions (scripts/cds-maths/reshape/ratio.ts):
 * "Ratio and Proportion" (40) split into combining ratios, ratio stories and equal-ratio algebra.
 * Order matches `subtopicOrder`.
 */
export const CDS_RATIO_NOTES: Record<string, SubtopicNote> = {
  "cds-ra-ratio": CDS_RA_RATIO_NOTE,
  "cds-ra-stories": CDS_RA_STORIES_NOTE,
  "cds-ra-algebra": CDS_RA_ALGEBRA_NOTE,
  "cds-ra-variation": CDS_RA_VARIATION_NOTE,
  "cds-ra-partnership": CDS_RA_PARTNERSHIP_NOTE,
  "cds-ra-mixtures": CDS_RA_MIXTURES_NOTE,
};

export const CDS_RATIO_SLUGS = Object.keys(CDS_RATIO_NOTES);
