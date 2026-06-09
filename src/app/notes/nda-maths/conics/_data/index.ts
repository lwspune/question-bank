import type { SubtopicNote } from "@/app/notes/_types";
import { IDENTIFICATION_NOTE } from "./identification";
import { PARABOLA_NOTE } from "./parabola";
import { ELLIPSE_NOTE } from "./ellipse";
import { HYPERBOLA_NOTE } from "./hyperbola";

export { CONICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/conics/[subtopicSlug].
 * `conics-` prefix keeps the subtopic slugs (and concept-tag keys) globally unique.
 */
export const CONICS_NOTES: Record<string, SubtopicNote> = {
  "conics-identification": IDENTIFICATION_NOTE,
  "conics-parabola": PARABOLA_NOTE,
  "conics-ellipse": ELLIPSE_NOTE,
  "conics-hyperbola": HYPERBOLA_NOTE,
};

export const CONICS_SLUGS = Object.keys(CONICS_NOTES);
