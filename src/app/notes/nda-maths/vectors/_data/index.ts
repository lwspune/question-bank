import type { SubtopicNote } from "@/app/notes/_types";
import { MAGNITUDE_COMPONENTS_PROJECTION_NOTE } from "./magnitude-components-projection";
import { DOT_PRODUCT_ANGLE_NOTE } from "./dot-product-angle";
import { CROSS_PRODUCT_TRIPLE_PRODUCT_NOTE } from "./cross-product-triple-product";
import { VECTOR_GEOMETRY_NOTE } from "./vector-geometry";
import { POSITION_VECTORS_SECTION_NOTE } from "./position-vectors-section";

export { VECTORS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/vectors/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const VECTORS_NOTES: Record<string, SubtopicNote> = {
  "magnitude-components-projection": MAGNITUDE_COMPONENTS_PROJECTION_NOTE,
  "dot-product-angle": DOT_PRODUCT_ANGLE_NOTE,
  "cross-product-triple-product": CROSS_PRODUCT_TRIPLE_PRODUCT_NOTE,
  "vector-geometry": VECTOR_GEOMETRY_NOTE,
  "position-vectors-section": POSITION_VECTORS_SECTION_NOTE,
};

export const VECTORS_SLUGS = Object.keys(VECTORS_NOTES);
