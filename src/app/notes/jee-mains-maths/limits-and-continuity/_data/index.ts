import type { SubtopicNote } from "@/app/notes/_types";
import { STANDARD_LIM_NOTE } from "./standard";
import { SERIES_LIM_NOTE } from "./series";
import { ONE_INF_LIM_NOTE } from "./one-inf";
import { INFINITY_LIM_NOTE } from "./infinity";
import { CALCULUS_LIM_NOTE } from "./calculus";
import { GIF_LIM_NOTE } from "./gif";
import { CONTINUITY_LIM_NOTE } from "./continuity";
import { DISCONTINUITY_LIM_NOTE } from "./discontinuity";

export { JEE_LIMITS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/limits-and-continuity/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-lim-` here and `jlim-` on
 * concept slugs.
 */
export const JEE_LIMITS_NOTES: Record<string, SubtopicNote> = {
  "jee-lim-standard": STANDARD_LIM_NOTE,
  "jee-lim-series": SERIES_LIM_NOTE,
  "jee-lim-one-inf": ONE_INF_LIM_NOTE,
  "jee-lim-infinity": INFINITY_LIM_NOTE,
  "jee-lim-calculus": CALCULUS_LIM_NOTE,
  "jee-lim-gif": GIF_LIM_NOTE,
  "jee-lim-continuity": CONTINUITY_LIM_NOTE,
  "jee-lim-discontinuity": DISCONTINUITY_LIM_NOTE,
};

export const JEE_LIMITS_SLUGS = Object.keys(JEE_LIMITS_NOTES);
