import type { SubtopicNote } from "@/app/notes/_types";
import { CIRCLE_EQUATION_NOTE } from "./circle-equation";
import { CIRCLE_CHORDS_TANGENTS_NOTE } from "./circle-chords-tangents";
import { TWO_CIRCLES_NOTE } from "./two-circles";
import { PARABOLA_NOTE } from "./parabola";
import { PARABOLA_TANGENTS_NOTE } from "./parabola-tangents";
import { ELLIPSE_NOTE } from "./ellipse";
import { ELLIPSE_TANGENTS_NOTE } from "./ellipse-tangents";
import { HYPERBOLA_NOTE } from "./hyperbola";
import { HYPERBOLA_TANGENTS_NOTE } from "./hyperbola-tangents";
import { COMMON_TANGENTS_NOTE } from "./common-tangents";

export { JEE_CONIC_SECTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/conic-sections/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-con-` here and `jcon-` on
 * concept slugs.
 */
export const JEE_CONIC_SECTIONS_NOTES: Record<string, SubtopicNote> = {
  "jee-con-circle-eq": CIRCLE_EQUATION_NOTE,
  "jee-con-circle-chords": CIRCLE_CHORDS_TANGENTS_NOTE,
  "jee-con-two-circles": TWO_CIRCLES_NOTE,
  "jee-con-parabola": PARABOLA_NOTE,
  "jee-con-parabola-tangents": PARABOLA_TANGENTS_NOTE,
  "jee-con-ellipse": ELLIPSE_NOTE,
  "jee-con-ellipse-tangents": ELLIPSE_TANGENTS_NOTE,
  "jee-con-hyperbola": HYPERBOLA_NOTE,
  "jee-con-hyperbola-tangents": HYPERBOLA_TANGENTS_NOTE,
  "jee-con-common-tangents": COMMON_TANGENTS_NOTE,
};

export const JEE_CONIC_SECTIONS_SLUGS = Object.keys(JEE_CONIC_SECTIONS_NOTES);
