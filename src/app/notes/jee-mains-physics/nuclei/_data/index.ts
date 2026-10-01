import type { SubtopicNote } from "@/app/notes/_types";
import { STRUCTURE_NUC_NOTE } from "./structure";
import { QVALUE_NUC_NOTE } from "./qvalue";
import { HALFLIFE_NUC_NOTE } from "./halflife";
import { ACTIVITY_NUC_NOTE } from "./activity";

export { JEE_PH_NUC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/nuclei/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-nuc-` here and `jpnuc-` on
 * concept slugs.
 */
export const JEE_PH_NUC_NOTES: Record<string, SubtopicNote> = {
  "jph-nuc-structure": STRUCTURE_NUC_NOTE,
  "jph-nuc-qvalue": QVALUE_NUC_NOTE,
  "jph-nuc-halflife": HALFLIFE_NUC_NOTE,
  "jph-nuc-activity": ACTIVITY_NUC_NOTE,
};

export const JEE_PH_NUC_SLUGS = Object.keys(JEE_PH_NUC_NOTES);
