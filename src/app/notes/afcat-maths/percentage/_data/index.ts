import type { SubtopicNote } from "@/app/notes/_types";
import { AF_PC_BASICS_NOTE } from "./basics";
import { AF_PC_CHANGE_NOTE } from "./change";
import { AF_PC_SUCCESSIVE_NOTE } from "./successive";
import { AF_PC_GROWTH_NOTE } from "./growth";
import { AF_PC_SHARES_NOTE } from "./shares";
import { AF_PC_MARKS_NOTE } from "./marks";
import { AF_PC_PROFIT_NOTE } from "./profit";
import { AF_PC_MIXTURES_NOTE } from "./mixtures";
import { AF_PC_RATES_NOTE } from "./rates";

export { AF_PC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/percentage/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-pc-` here and `afpc-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afpc-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_PC_NOTES: Record<string, SubtopicNote> = {
  "af-pc-basics": AF_PC_BASICS_NOTE,
  "af-pc-change": AF_PC_CHANGE_NOTE,
  "af-pc-successive": AF_PC_SUCCESSIVE_NOTE,
  "af-pc-growth": AF_PC_GROWTH_NOTE,
  "af-pc-shares": AF_PC_SHARES_NOTE,
  "af-pc-marks": AF_PC_MARKS_NOTE,
  "af-pc-profit": AF_PC_PROFIT_NOTE,
  "af-pc-mixtures": AF_PC_MIXTURES_NOTE,
  "af-pc-rates": AF_PC_RATES_NOTE,
};

export const AF_PC_SLUGS = Object.keys(AF_PC_NOTES);
