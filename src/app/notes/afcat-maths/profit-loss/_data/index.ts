import type { SubtopicNote } from "@/app/notes/_types";
import { AF_PL_BASICS_NOTE } from "./basics";
import { AF_PL_CONDITIONS_NOTE } from "./conditions";
import { AF_PL_ARTICLES_NOTE } from "./articles";
import { AF_PL_DISCOUNT_NOTE } from "./discount";
import { AF_PL_COMBINED_NOTE } from "./combined";
import { AF_PL_LOTS_NOTE } from "./lots";
import { AF_PL_DISHONEST_NOTE } from "./dishonest";
import { AF_PL_PARTNERSHIP_NOTE } from "./partnership";
import { AF_PL_INSTALMENTS_NOTE } from "./instalments";

export { AF_PL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/profit-loss/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-pl-` here and `afpl-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afpl-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_PL_NOTES: Record<string, SubtopicNote> = {
  "af-pl-basics": AF_PL_BASICS_NOTE,
  "af-pl-conditions": AF_PL_CONDITIONS_NOTE,
  "af-pl-articles": AF_PL_ARTICLES_NOTE,
  "af-pl-discount": AF_PL_DISCOUNT_NOTE,
  "af-pl-combined": AF_PL_COMBINED_NOTE,
  "af-pl-lots": AF_PL_LOTS_NOTE,
  "af-pl-dishonest": AF_PL_DISHONEST_NOTE,
  "af-pl-partnership": AF_PL_PARTNERSHIP_NOTE,
  "af-pl-instalments": AF_PL_INSTALMENTS_NOTE,
};

export const AF_PL_SLUGS = Object.keys(AF_PL_NOTES);
