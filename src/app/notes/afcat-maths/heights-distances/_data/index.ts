import type { SubtopicNote } from "@/app/notes/_types";
import { AF_HD_RATIOS_NOTE } from "./ratios";
import { AF_HD_ONE_ANGLE_NOTE } from "./one-angle";
import { AF_HD_TWO_POINTS_NOTE } from "./two-points";
import { AF_HD_TWO_HEIGHTS_NOTE } from "./two-heights";

export { AF_HD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/heights-distances/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-hd-` here and `afhd-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afhd-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_HD_NOTES: Record<string, SubtopicNote> = {
  "af-hd-ratios": AF_HD_RATIOS_NOTE,
  "af-hd-one-angle": AF_HD_ONE_ANGLE_NOTE,
  "af-hd-two-points": AF_HD_TWO_POINTS_NOTE,
  "af-hd-two-heights": AF_HD_TWO_HEIGHTS_NOTE,
};

export const AF_HD_SLUGS = Object.keys(AF_HD_NOTES);
