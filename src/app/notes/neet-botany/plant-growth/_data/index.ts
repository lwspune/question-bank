import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_PG_GROWTH_NOTE } from "./growth";
import { NEET_BO_PG_PROMOTERS_NOTE } from "./promoters";
import { NEET_BO_PG_ETHYLENE_NOTE } from "./ethylene";

export { NEET_BO_PG_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/plant-growth/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-pg-` here and `nbopg-` on concept slugs.
 *
 * NCERT XI ch.13: growth, differentiation, plant growth regulators.
 */
export const NEET_BO_PG_NOTES: Record<string, SubtopicNote> = {
  "nbo-pg-growth": NEET_BO_PG_GROWTH_NOTE,
  "nbo-pg-promoters": NEET_BO_PG_PROMOTERS_NOTE,
  "nbo-pg-ethylene": NEET_BO_PG_ETHYLENE_NOTE,
};

export const NEET_BO_PG_SLUGS = Object.keys(NEET_BO_PG_NOTES);
