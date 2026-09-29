import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_TW_RATES_NOTE } from "./rates";
import { CDS_TW_MANDAYS_NOTE } from "./mandays";
import { CDS_TW_MIXED_NOTE } from "./mixed";
import { CDS_TW_PIPES_NOTE } from "./pipes";

export { CDS_TIME_WORK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/time-work/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-tw-` here and `cdstw-` on concept slugs.
 *
 * The four pages were cut by reading all 46 solutions (scripts/cds-maths/reshape/time-work.ts):
 * the chapter-named subtopic (36) split into rates, man-days and mixed gangs.
 * Order matches `subtopicOrder`.
 */
export const CDS_TIME_WORK_NOTES: Record<string, SubtopicNote> = {
  "cds-tw-rates": CDS_TW_RATES_NOTE,
  "cds-tw-mandays": CDS_TW_MANDAYS_NOTE,
  "cds-tw-mixed": CDS_TW_MIXED_NOTE,
  "cds-tw-pipes": CDS_TW_PIPES_NOTE,
};

export const CDS_TIME_WORK_SLUGS = Object.keys(CDS_TIME_WORK_NOTES);
