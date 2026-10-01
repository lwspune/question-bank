import type { SubtopicNote } from "@/app/notes/_types";
import { PHOTONS_DUAL_NOTE } from "./photons";
import { LAWS_DUAL_NOTE } from "./laws";
import { EINSTEIN_DUAL_NOTE } from "./einstein";
import { DEBROGLIE_DUAL_NOTE } from "./debroglie";
import { COMPARE_DUAL_NOTE } from "./compare";

export { JEE_PH_DUAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/dual-nature/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-dual-` here and `jpdual-` on
 * concept slugs.
 */
export const JEE_PH_DUAL_NOTES: Record<string, SubtopicNote> = {
  "jph-dual-photons": PHOTONS_DUAL_NOTE,
  "jph-dual-laws": LAWS_DUAL_NOTE,
  "jph-dual-einstein": EINSTEIN_DUAL_NOTE,
  "jph-dual-debroglie": DEBROGLIE_DUAL_NOTE,
  "jph-dual-compare": COMPARE_DUAL_NOTE,
};

export const JEE_PH_DUAL_SLUGS = Object.keys(JEE_PH_DUAL_NOTES);
