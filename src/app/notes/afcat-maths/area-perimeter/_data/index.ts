import type { SubtopicNote } from "@/app/notes/_types";
import { AF_AP_RECTANGLES_NOTE } from "./rectangles";
import { AF_AP_TRIANGLES_NOTE } from "./triangles";
import { AF_AP_POLYGONS_NOTE } from "./polygons";
import { AF_AP_CIRCLES_NOTE } from "./circles";
import { AF_AP_COMBINED_NOTE } from "./combined";
import { AF_AP_CHANGE_NOTE } from "./change";

export { AF_AP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/area-perimeter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-ap-` here and `afap-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afap-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_AP_NOTES: Record<string, SubtopicNote> = {
  "af-ap-rectangles": AF_AP_RECTANGLES_NOTE,
  "af-ap-triangles": AF_AP_TRIANGLES_NOTE,
  "af-ap-polygons": AF_AP_POLYGONS_NOTE,
  "af-ap-circles": AF_AP_CIRCLES_NOTE,
  "af-ap-combined": AF_AP_COMBINED_NOTE,
  "af-ap-change": AF_AP_CHANGE_NOTE,
};

export const AF_AP_SLUGS = Object.keys(AF_AP_NOTES);
