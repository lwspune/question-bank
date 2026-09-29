import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_IN_SIMPLE_NOTE } from "./simple";
import { CDS_IN_COMPOUND_NOTE } from "./compound";
import { CDS_IN_DIFFERENCE_NOTE } from "./difference";

export { CDS_INTEREST_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/interest/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-in-` here and `cdsin-` on concept slugs.
 *
 * Three pages, as the bank files them (scripts/cds-maths/reshape/interest.ts):
 * the two principal-rate-time rows joined simple interest.
 * Order matches `subtopicOrder`.
 */
export const CDS_INTEREST_NOTES: Record<string, SubtopicNote> = {
  "cds-in-simple": CDS_IN_SIMPLE_NOTE,
  "cds-in-compound": CDS_IN_COMPOUND_NOTE,
  "cds-in-difference": CDS_IN_DIFFERENCE_NOTE,
};

export const CDS_INTEREST_SLUGS = Object.keys(CDS_INTEREST_NOTES);
