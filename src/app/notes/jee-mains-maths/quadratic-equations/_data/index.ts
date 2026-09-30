import type { SubtopicNote } from "@/app/notes/_types";
import { VIETA_QE_NOTE } from "./vieta";
import { POWERSUMS_QE_NOTE } from "./powersums";
import { COMMON_QE_NOTE } from "./common";
import { NATURE_QE_NOTE } from "./nature";
import { MODULUS_QE_NOTE } from "./modulus";
import { REDUCIBLE_QE_NOTE } from "./reducible";

export { JEE_QUADRATIC_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/quadratic-equations/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-qe-` here and `jqe-` on
 * concept slugs.
 */
export const JEE_QUADRATIC_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "jee-qe-vieta": VIETA_QE_NOTE,
  "jee-qe-power-sums": POWERSUMS_QE_NOTE,
  "jee-qe-common": COMMON_QE_NOTE,
  "jee-qe-nature": NATURE_QE_NOTE,
  "jee-qe-modulus": MODULUS_QE_NOTE,
  "jee-qe-reducible": REDUCIBLE_QE_NOTE,
};

export const JEE_QUADRATIC_EQUATIONS_SLUGS = Object.keys(JEE_QUADRATIC_EQUATIONS_NOTES);
