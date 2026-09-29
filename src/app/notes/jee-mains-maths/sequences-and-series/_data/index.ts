import type { SubtopicNote } from "@/app/notes/_types";
import { AP_SEQ_NOTE } from "./ap";
import { COMMON_SEQ_NOTE } from "./common";
import { GP_SEQ_NOTE } from "./gp";
import { MEANS_SEQ_NOTE } from "./means";
import { INFINITE_GP_SEQ_NOTE } from "./infinite-gp";
import { SIGMA_SEQ_NOTE } from "./sigma";
import { TELESCOPING_SEQ_NOTE } from "./telescoping";
import { AGP_SEQ_NOTE } from "./agp";

export { JEE_SEQUENCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/sequences-and-series/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-seq-` here and `jseq-` on
 * concept slugs.
 */
export const JEE_SEQUENCES_NOTES: Record<string, SubtopicNote> = {
  "jee-seq-ap": AP_SEQ_NOTE,
  "jee-seq-common": COMMON_SEQ_NOTE,
  "jee-seq-gp": GP_SEQ_NOTE,
  "jee-seq-means": MEANS_SEQ_NOTE,
  "jee-seq-infinite-gp": INFINITE_GP_SEQ_NOTE,
  "jee-seq-sigma": SIGMA_SEQ_NOTE,
  "jee-seq-telescoping": TELESCOPING_SEQ_NOTE,
  "jee-seq-agp": AGP_SEQ_NOTE,
};

export const JEE_SEQUENCES_SLUGS = Object.keys(JEE_SEQUENCES_NOTES);
