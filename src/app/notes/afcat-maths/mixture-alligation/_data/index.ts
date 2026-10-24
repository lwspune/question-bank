import type { SubtopicNote } from "@/app/notes/_types";
import { AF_MA_ADDING_NOTE } from "./adding";
import { AF_MA_PERCENT_NOTE } from "./percent";
import { AF_MA_MEAN_NOTE } from "./mean";
import { AF_MA_ALLIGATION_NOTE } from "./alligation";
import { AF_MA_PROFIT_NOTE } from "./profit";
import { AF_MA_REPLACE_NOTE } from "./replace";

export { AF_MA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/mixture-alligation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-ma-` here and `afma-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afma-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_MA_NOTES: Record<string, SubtopicNote> = {
  "af-ma-adding": AF_MA_ADDING_NOTE,
  "af-ma-percent": AF_MA_PERCENT_NOTE,
  "af-ma-mean": AF_MA_MEAN_NOTE,
  "af-ma-alligation": AF_MA_ALLIGATION_NOTE,
  "af-ma-profit": AF_MA_PROFIT_NOTE,
  "af-ma-replace": AF_MA_REPLACE_NOTE,
};

export const AF_MA_SLUGS = Object.keys(AF_MA_NOTES);
