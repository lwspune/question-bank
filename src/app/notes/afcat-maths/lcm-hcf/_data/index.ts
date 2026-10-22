import type { SubtopicNote } from "@/app/notes/_types";
import { AF_LH_FINDING_NOTE } from "./finding";
import { AF_LH_TOGETHER_NOTE } from "./together";
import { AF_LH_PROBLEMS_NOTE } from "./problems";

export { AF_LH_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/lcm-hcf/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-lh-` here and `aflh-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_aflh-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_LH_NOTES: Record<string, SubtopicNote> = {
  "af-lh-finding": AF_LH_FINDING_NOTE,
  "af-lh-together": AF_LH_TOGETHER_NOTE,
  "af-lh-problems": AF_LH_PROBLEMS_NOTE,
};

export const AF_LH_SLUGS = Object.keys(AF_LH_NOTES);
