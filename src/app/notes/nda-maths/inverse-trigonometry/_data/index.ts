import type { SubtopicNote } from "@/app/notes/_types";
import { IDENTITIES_PROPERTIES_NOTE } from "./identities-properties";
import { COMPOSITE_EVALUATION_NOTE } from "./composite-evaluation";
import { SOLVING_EQUATIONS_NOTE } from "./solving-equations";

export { INVERSE_TRIGONOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/inverse-trigonometry/[subtopicSlug].
 * `it-` prefix keeps the subtopic slugs (and concept-tag keys) globally unique.
 */
export const INVERSE_TRIGONOMETRY_NOTES: Record<string, SubtopicNote> = {
  "it-identities-properties": IDENTITIES_PROPERTIES_NOTE,
  "it-composite-evaluation": COMPOSITE_EVALUATION_NOTE,
  "it-solving-equations": SOLVING_EQUATIONS_NOTE,
};

export const INVERSE_TRIGONOMETRY_SLUGS = Object.keys(INVERSE_TRIGONOMETRY_NOTES);
