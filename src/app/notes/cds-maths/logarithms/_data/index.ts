import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_LG_LAWS_NOTE } from "./laws";
import { CDS_LG_DIGITS_NOTE } from "./digits";
import { CDS_LG_EQUATIONS_NOTE } from "./equations";

export { CDS_LOGARITHMS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/logarithms/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-lg-` here and `cdslg-` on concept slugs.
 *
 * Three pages, as the bank files them (scripts/cds-maths/reshape/logarithms.ts):
 * the one comparison row joined the laws page.
 * Order matches `subtopicOrder`.
 */
export const CDS_LOGARITHMS_NOTES: Record<string, SubtopicNote> = {
  "cds-lg-laws": CDS_LG_LAWS_NOTE,
  "cds-lg-digits": CDS_LG_DIGITS_NOTE,
  "cds-lg-equations": CDS_LG_EQUATIONS_NOTE,
};

export const CDS_LOGARITHMS_SLUGS = Object.keys(CDS_LOGARITHMS_NOTES);
