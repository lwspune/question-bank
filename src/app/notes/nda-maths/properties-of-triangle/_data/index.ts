import type { SubtopicNote } from "@/app/notes/_types";
import { SINE_COSINE_RULES_NOTE } from "./sine-cosine-rules";
import { TRIANGLE_IDENTITIES_NOTE } from "./triangle-identities";
import { INCIRCLE_POLYGONS_NOTE } from "./incircle-polygons";

export { PROPERTIES_OF_TRIANGLE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/properties-of-triangle/[subtopicSlug].
 * `pt-` prefix keeps the subtopic slugs (and concept-tag keys) globally unique.
 */
export const PROPERTIES_OF_TRIANGLE_NOTES: Record<string, SubtopicNote> = {
  "pt-sine-cosine-rules": SINE_COSINE_RULES_NOTE,
  "pt-triangle-identities": TRIANGLE_IDENTITIES_NOTE,
  "pt-incircle-polygons": INCIRCLE_POLYGONS_NOTE,
};

export const PROPERTIES_OF_TRIANGLE_SLUGS = Object.keys(PROPERTIES_OF_TRIANGLE_NOTES);
