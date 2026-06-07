import type { SubtopicNote } from "@/app/notes/_types";
import { VALUES_QUADRANTS_NOTE } from "./values-quadrants";
import { COMPOUND_ANGLE_NOTE } from "./compound-angle";
import { MULTIPLE_HALF_ANGLE_NOTE } from "./multiple-half-angle";
import { PRODUCT_SUM_NOTE } from "./product-sum";
import { MAX_MIN_NOTE } from "./max-min";

export { TRIGONOMETRIC_IDENTITIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/trigonometric-identities/[subtopicSlug].
 * Keys are globally-unique subtopic slugs (`trig-` prefixed) — also the
 * subtopic_slug in question_concept_tags. Order = chapter teaching order.
 */
export const TRIGONOMETRIC_IDENTITIES_NOTES: Record<string, SubtopicNote> = {
  "trig-values-quadrants": VALUES_QUADRANTS_NOTE,
  "trig-compound-angle": COMPOUND_ANGLE_NOTE,
  "trig-multiple-half-angle": MULTIPLE_HALF_ANGLE_NOTE,
  "trig-product-sum": PRODUCT_SUM_NOTE,
  "trig-max-min": MAX_MIN_NOTE,
};

export const TRIGONOMETRIC_IDENTITIES_SLUGS = Object.keys(
  TRIGONOMETRIC_IDENTITIES_NOTES
);
