import type { SubtopicNote } from "@/app/notes/_types";
import { AF_SS_AP_NOTE } from "./ap";
import { AF_SS_GP_NOTE } from "./gp";
import { AF_SS_HP_NOTE } from "./hp";
import { AF_SS_SPECIAL_NOTE } from "./special";

export { AF_SS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/sequence-series/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-ss-` here and `afss-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afss-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_SS_NOTES: Record<string, SubtopicNote> = {
  "af-ss-ap": AF_SS_AP_NOTE,
  "af-ss-gp": AF_SS_GP_NOTE,
  "af-ss-hp": AF_SS_HP_NOTE,
  "af-ss-special": AF_SS_SPECIAL_NOTE,
};

export const AF_SS_SLUGS = Object.keys(AF_SS_NOTES);
