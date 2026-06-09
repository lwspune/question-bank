import type { SubtopicNote } from "@/app/notes/_types";
import { EQUATION_CENTRE_RADIUS_NOTE } from "./equation-centre-radius";
import { THROUGH_POINTS_CONCYCLICITY_NOTE } from "./through-points-concyclicity";
import { INSCRIBED_TANGENTS_SEGMENTS_NOTE } from "./inscribed-tangents-segments";

export { CIRCLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/circles/[subtopicSlug].
 * Keys are the URL slugs; chapter.subtopicOrder owns rendering order. The
 * `circ-` prefix keeps the subtopic slugs (and therefore the concept-tag
 * keys) globally unique.
 */
export const CIRCLES_NOTES: Record<string, SubtopicNote> = {
  "circ-equation-centre-radius": EQUATION_CENTRE_RADIUS_NOTE,
  "circ-through-points-concyclicity": THROUGH_POINTS_CONCYCLICITY_NOTE,
  "circ-inscribed-tangents-segments": INSCRIBED_TANGENTS_SEGMENTS_NOTE,
};

export const CIRCLES_SLUGS = Object.keys(CIRCLES_NOTES);
