import type { SubtopicNote } from "@/app/notes/_types";
import { AF_RP_BASICS_NOTE } from "./basics";
import { AF_RP_COMBINING_NOTE } from "./combining";
import { AF_RP_DIVIDING_NOTE } from "./dividing";
import { AF_RP_PROPORTION_NOTE } from "./proportion";
import { AF_RP_ALGEBRA_NOTE } from "./algebra";
import { AF_RP_CHANGE_NOTE } from "./change";
import { AF_RP_MIXTURES_NOTE } from "./mixtures";
import { AF_RP_VARIATION_NOTE } from "./variation";

export { AF_RATIO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/ratio/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-rp-` here and `afrp-` on concept slugs.
 *
 * The eight pages were cut from the bank's eleven subtopics (2026-10-22): Duplicate/Triplicate
 * folds into Basics, Partnership into Dividing, Income/Expenditure into Change in Ratio
 * (scripts/afcat/sync-subtopics.ts). Order matches `subtopicOrder`.
 */
export const AF_RATIO_NOTES: Record<string, SubtopicNote> = {
  "af-rp-basics": AF_RP_BASICS_NOTE,
  "af-rp-combining": AF_RP_COMBINING_NOTE,
  "af-rp-dividing": AF_RP_DIVIDING_NOTE,
  "af-rp-proportion": AF_RP_PROPORTION_NOTE,
  "af-rp-algebra": AF_RP_ALGEBRA_NOTE,
  "af-rp-change": AF_RP_CHANGE_NOTE,
  "af-rp-mixtures": AF_RP_MIXTURES_NOTE,
  "af-rp-variation": AF_RP_VARIATION_NOTE,
};

export const AF_RATIO_SLUGS = Object.keys(AF_RATIO_NOTES);
