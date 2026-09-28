import type { SubtopicNote } from "@/app/notes/_types";
import { COMPOUND_NOTE } from "./compound";
import { MULTIPLE_NOTE } from "./multiple";
import { FACTORISATION_NOTE } from "./factorisation";

export { MHTCET_TRIG2_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/trigonometry-ii/[subtopicSlug].
 * `cett2-` prefix: the slug doubles as the concept-tag key, which is global.
 */
export const MHTCET_TRIG2_NOTES: Record<string, SubtopicNote> = {
  "cett2-compound": COMPOUND_NOTE,
  "cett2-multiple": MULTIPLE_NOTE,
  "cett2-factorisation": FACTORISATION_NOTE,
};

export const MHTCET_TRIG2_SLUGS = Object.keys(MHTCET_TRIG2_NOTES);
