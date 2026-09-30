import type { SubtopicNote } from "@/app/notes/_types";
import { FORMS_SL_NOTE } from "./forms";
import { DISTANCE_SL_NOTE } from "./distance";
import { REFLECTION_SL_NOTE } from "./reflection";
import { BISECTORS_SL_NOTE } from "./bisectors";
import { CENTRES_SL_NOTE } from "./centres";
import { AREA_SL_NOTE } from "./area";
import { LOCUS_SL_NOTE } from "./locus";

export { JEE_STRAIGHT_LINES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/straight-lines/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-sl-` here and `jsl-` on
 * concept slugs.
 */
export const JEE_STRAIGHT_LINES_NOTES: Record<string, SubtopicNote> = {
  "jee-sl-forms": FORMS_SL_NOTE,
  "jee-sl-distance": DISTANCE_SL_NOTE,
  "jee-sl-reflection": REFLECTION_SL_NOTE,
  "jee-sl-bisectors": BISECTORS_SL_NOTE,
  "jee-sl-centres": CENTRES_SL_NOTE,
  "jee-sl-area": AREA_SL_NOTE,
  "jee-sl-locus": LOCUS_SL_NOTE,
};

export const JEE_STRAIGHT_LINES_SLUGS = Object.keys(JEE_STRAIGHT_LINES_NOTES);
