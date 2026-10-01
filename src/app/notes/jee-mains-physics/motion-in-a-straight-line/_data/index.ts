import type { SubtopicNote } from "@/app/notes/_types";
import { AVERAGE_SL_NOTE } from "./average";
import { EQUATIONS_SL_NOTE } from "./equations";
import { GRAVITY_SL_NOTE } from "./gravity";
import { GRAPHS_SL_NOTE } from "./graphs";
import { CALCULUS_SL_NOTE } from "./calculus";

export { JEE_PH_SL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/motion-in-a-straight-line/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-sl-` here and `jpsl-` on
 * concept slugs.
 */
export const JEE_PH_SL_NOTES: Record<string, SubtopicNote> = {
  "jph-sl-average": AVERAGE_SL_NOTE,
  "jph-sl-equations": EQUATIONS_SL_NOTE,
  "jph-sl-gravity": GRAVITY_SL_NOTE,
  "jph-sl-graphs": GRAPHS_SL_NOTE,
  "jph-sl-calculus": CALCULUS_SL_NOTE,
};

export const JEE_PH_SL_SLUGS = Object.keys(JEE_PH_SL_NOTES);
