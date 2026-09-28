import type { SubtopicNote } from "@/app/notes/_types";
import { PARABOLA_NOTE } from "./parabola";
import { ELLIPSE_HYPERBOLA_NOTE } from "./ellipse-hyperbola";

export { MHTCET_CONICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/conic-sections/[subtopicSlug].
 * `cetcon-` prefix: the slug doubles as the concept-tag key, which is global.
 */
export const MHTCET_CONICS_NOTES: Record<string, SubtopicNote> = {
  "cetcon-parabola": PARABOLA_NOTE,
  "cetcon-ellipse-hyperbola": ELLIPSE_HYPERBOLA_NOTE,
};

export const MHTCET_CONICS_SLUGS = Object.keys(MHTCET_CONICS_NOTES);
