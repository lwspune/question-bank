import type { SubtopicNote } from "@/app/notes/_types";
import { AF_DF_CONVERT_NOTE } from "./convert";
import { AF_DF_RECURRING_NOTE } from "./recurring";
import { AF_DF_COMPARE_NOTE } from "./compare";
import { AF_DF_OPERATIONS_NOTE } from "./operations";
import { AF_DF_FRACTIONS_NOTE } from "./fractions";
import { AF_DF_ROOTS_NOTE } from "./roots";
import { AF_DF_PERCENT_NOTE } from "./percent";

export { AF_DF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/decimals-fractions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-df-` here and `afdf-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afdf-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_DF_NOTES: Record<string, SubtopicNote> = {
  "af-df-convert": AF_DF_CONVERT_NOTE,
  "af-df-recurring": AF_DF_RECURRING_NOTE,
  "af-df-compare": AF_DF_COMPARE_NOTE,
  "af-df-operations": AF_DF_OPERATIONS_NOTE,
  "af-df-fractions": AF_DF_FRACTIONS_NOTE,
  "af-df-roots": AF_DF_ROOTS_NOTE,
  "af-df-percent": AF_DF_PERCENT_NOTE,
};

export const AF_DF_SLUGS = Object.keys(AF_DF_NOTES);
