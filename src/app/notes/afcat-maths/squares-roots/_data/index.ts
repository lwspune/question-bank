import type { SubtopicNote } from "@/app/notes/_types";
import { AF_SQ_SQUARES_NOTE } from "./squares";
import { AF_SQ_ROOTS_NOTE } from "./roots";
import { AF_SQ_CUBES_NOTE } from "./cubes";
import { AF_SQ_MAKING_NOTE } from "./making";
import { AF_SQ_SURDS_NOTE } from "./surds";
import { AF_SQ_INDICES_NOTE } from "./indices";

export { AF_SQ_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/squares-roots/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-sq-` here and `afsq-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afsq-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_SQ_NOTES: Record<string, SubtopicNote> = {
  "af-sq-squares": AF_SQ_SQUARES_NOTE,
  "af-sq-roots": AF_SQ_ROOTS_NOTE,
  "af-sq-cubes": AF_SQ_CUBES_NOTE,
  "af-sq-making": AF_SQ_MAKING_NOTE,
  "af-sq-surds": AF_SQ_SURDS_NOTE,
  "af-sq-indices": AF_SQ_INDICES_NOTE,
};

export const AF_SQ_SLUGS = Object.keys(AF_SQ_NOTES);
