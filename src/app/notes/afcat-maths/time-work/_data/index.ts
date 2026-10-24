import type { SubtopicNote } from "@/app/notes/_types";
import { AF_TW_RATE_NOTE } from "./rate";
import { AF_TW_TOGETHER_NOTE } from "./together";
import { AF_TW_LEAVING_NOTE } from "./leaving";
import { AF_TW_ALTERNATE_NOTE } from "./alternate";
import { AF_TW_MANDAYS_NOTE } from "./mandays";
import { AF_TW_WORKFORCE_NOTE } from "./workforce";
import { AF_TW_PIPES_NOTE } from "./pipes";

export { AF_TW_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/time-work/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-tw-` here and `aftw-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_aftw-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_TW_NOTES: Record<string, SubtopicNote> = {
  "af-tw-rate": AF_TW_RATE_NOTE,
  "af-tw-together": AF_TW_TOGETHER_NOTE,
  "af-tw-leaving": AF_TW_LEAVING_NOTE,
  "af-tw-alternate": AF_TW_ALTERNATE_NOTE,
  "af-tw-mandays": AF_TW_MANDAYS_NOTE,
  "af-tw-workforce": AF_TW_WORKFORCE_NOTE,
  "af-tw-pipes": AF_TW_PIPES_NOTE,
};

export const AF_TW_SLUGS = Object.keys(AF_TW_NOTES);
