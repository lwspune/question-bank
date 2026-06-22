import type { SubtopicNote } from "@/app/notes/_types";
import { MAGNITUDE_UNIT_VECTORS_NOTE } from "./magnitude-unit-vectors";
import { SECTION_FORMULA_GEOMETRY_NOTE } from "./section-formula-geometry";
import { LINEAR_COMBINATIONS_COPLANARITY_NOTE } from "./linear-combinations-coplanarity";
import { DOT_PRODUCT_NOTE } from "./dot-product";
import { CROSS_PRODUCT_NOTE } from "./cross-product";
import { SCALAR_TRIPLE_PRODUCT_NOTE } from "./scalar-triple-product";

export { VECTORS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/vectors/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Slugs are distinct from the NDA Maths Vectors chapter's slugs (concept-tag
 * subtopic_slug keys are GLOBALLY unique).
 */
export const VECTORS_NOTES: Record<string, SubtopicNote> = {
  "magnitude-unit-vectors": MAGNITUDE_UNIT_VECTORS_NOTE,
  "section-formula-geometry": SECTION_FORMULA_GEOMETRY_NOTE,
  "linear-combinations-coplanarity": LINEAR_COMBINATIONS_COPLANARITY_NOTE,
  "dot-product": DOT_PRODUCT_NOTE,
  "cross-product": CROSS_PRODUCT_NOTE,
  "scalar-triple-product": SCALAR_TRIPLE_PRODUCT_NOTE,
};

export const VECTORS_SLUGS = Object.keys(VECTORS_NOTES);
