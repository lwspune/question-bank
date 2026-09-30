import type { SubtopicNote } from "@/app/notes/_types";
import { COMPOUND_TI_NOTE } from "./compound";
import { MULTIPLE_TI_NOTE } from "./multiple";
import { POWERS_TI_NOTE } from "./powers";
import { PRODUCTS_TI_NOTE } from "./products";
import { RANGE_TI_NOTE } from "./range";

export { JEE_TRIG_IDENTITIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/trigonometric-identities/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-ti-` here and `jti-` on
 * concept slugs.
 */
export const JEE_TRIG_IDENTITIES_NOTES: Record<string, SubtopicNote> = {
  "jee-ti-compound": COMPOUND_TI_NOTE,
  "jee-ti-multiple": MULTIPLE_TI_NOTE,
  "jee-ti-powers": POWERS_TI_NOTE,
  "jee-ti-products": PRODUCTS_TI_NOTE,
  "jee-ti-range": RANGE_TI_NOTE,
};

export const JEE_TRIG_IDENTITIES_SLUGS = Object.keys(JEE_TRIG_IDENTITIES_NOTES);
