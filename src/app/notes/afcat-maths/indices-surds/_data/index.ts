import type { SubtopicNote } from "@/app/notes/_types";
import { AF_IS_LAWS_NOTE } from "./laws";
import { AF_IS_FRACTIONAL_NOTE } from "./fractional";
import { AF_IS_SURDS_NOTE } from "./surds";
import { AF_IS_RATIONALISING_NOTE } from "./rationalising";

export { AF_IS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/indices-surds/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-is-` here and `afis-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afis-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_IS_NOTES: Record<string, SubtopicNote> = {
  "af-is-laws": AF_IS_LAWS_NOTE,
  "af-is-fractional": AF_IS_FRACTIONAL_NOTE,
  "af-is-surds": AF_IS_SURDS_NOTE,
  "af-is-rationalising": AF_IS_RATIONALISING_NOTE,
};

export const AF_IS_SLUGS = Object.keys(AF_IS_NOTES);
