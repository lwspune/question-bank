import type { SubtopicNote } from "@/app/notes/_types";
import { AF_PR_BASICS_NOTE } from "./basics";
import { AF_PR_COINS_NOTE } from "./coins";
import { AF_PR_DICE_NOTE } from "./dice";
import { AF_PR_CARDS_NOTE } from "./cards";
import { AF_PR_BAG_NOTE } from "./bag";
import { AF_PR_SELECT_NOTE } from "./select";

export { AF_PR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/probability/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-pr-` here and `afpr-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afpr-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_PR_NOTES: Record<string, SubtopicNote> = {
  "af-pr-basics": AF_PR_BASICS_NOTE,
  "af-pr-coins": AF_PR_COINS_NOTE,
  "af-pr-dice": AF_PR_DICE_NOTE,
  "af-pr-cards": AF_PR_CARDS_NOTE,
  "af-pr-bag": AF_PR_BAG_NOTE,
  "af-pr-select": AF_PR_SELECT_NOTE,
};

export const AF_PR_SLUGS = Object.keys(AF_PR_NOTES);
