import type { SubtopicNote } from "@/app/notes/_types";
import { BASICS_COMM_NOTE } from "./basics";
import { LOS_COMM_NOTE } from "./los";
import { AM_COMM_NOTE } from "./am";

export { JEE_PH_COMM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/communication-systems/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-comm-` here and `jpcomm-` on
 * concept slugs.
 */
export const JEE_PH_COMM_NOTES: Record<string, SubtopicNote> = {
  "jph-comm-basics": BASICS_COMM_NOTE,
  "jph-comm-los": LOS_COMM_NOTE,
  "jph-comm-am": AM_COMM_NOTE,
};

export const JEE_PH_COMM_SLUGS = Object.keys(JEE_PH_COMM_NOTES);
