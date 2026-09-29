import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_LE_SYSTEMS_NOTE } from "./systems";
import { CDS_LE_WORD_NOTE } from "./word";
import { CDS_LE_AGES_NOTE } from "./ages";
import { CDS_LE_INTEGRAL_NOTE } from "./integral";

export { CDS_LINEAR_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/linear-equations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-le-` here and `cdsle-` on concept slugs.
 *
 * The four pages were cut by reading all 40 solutions (scripts/cds-maths/reshape/linear.ts):
 * the word problems split into ages and the rest; consistency joined solving.
 * Order matches `subtopicOrder`.
 */
export const CDS_LINEAR_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "cds-le-systems": CDS_LE_SYSTEMS_NOTE,
  "cds-le-word": CDS_LE_WORD_NOTE,
  "cds-le-ages": CDS_LE_AGES_NOTE,
  "cds-le-integral": CDS_LE_INTEGRAL_NOTE,
};

export const CDS_LINEAR_EQUATIONS_SLUGS = Object.keys(CDS_LINEAR_EQUATIONS_NOTES);
