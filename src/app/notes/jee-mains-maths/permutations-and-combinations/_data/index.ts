import type { SubtopicNote } from "@/app/notes/_types";
import { ARRANGE_PNC_NOTE } from "./arrange";
import { RANK_PNC_NOTE } from "./rank";
import { NUMBERS_PNC_NOTE } from "./numbers";
import { SELECT_PNC_NOTE } from "./select";
import { DISTRIBUTE_PNC_NOTE } from "./distribute";
import { SETS_PNC_NOTE } from "./sets";
import { GEOMETRY_PNC_NOTE } from "./geometry";
import { DIVISORS_PNC_NOTE } from "./divisors";

export { JEE_PNC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/permutations-and-combinations/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-pnc-` here and `jpnc-` on
 * concept slugs.
 */
export const JEE_PNC_NOTES: Record<string, SubtopicNote> = {
  "jee-pnc-arrange": ARRANGE_PNC_NOTE,
  "jee-pnc-rank": RANK_PNC_NOTE,
  "jee-pnc-numbers": NUMBERS_PNC_NOTE,
  "jee-pnc-select": SELECT_PNC_NOTE,
  "jee-pnc-distribute": DISTRIBUTE_PNC_NOTE,
  "jee-pnc-sets": SETS_PNC_NOTE,
  "jee-pnc-geometry": GEOMETRY_PNC_NOTE,
  "jee-pnc-divisors": DIVISORS_PNC_NOTE,
};

export const JEE_PNC_SLUGS = Object.keys(JEE_PNC_NOTES);
