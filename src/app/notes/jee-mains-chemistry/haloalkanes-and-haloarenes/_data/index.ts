import type { SubtopicNote } from "@/app/notes/_types";
import { CLASSIFY_HALO_NOTE } from "./classify";
import { PREP_HALO_NOTE } from "./prep";
import { MECH_HALO_NOTE } from "./mech";
import { REACTIVITY_HALO_NOTE } from "./reactivity";
import { NUCLEO_HALO_NOTE } from "./nucleo";
import { ELIM_HALO_NOTE } from "./elim";
import { ARENES_HALO_NOTE } from "./arenes";

export { JEE_CH_HALO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/haloalkanes-and-haloarenes/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-halo-` here and `jchalo-` on
 * concept slugs.
 */
export const JEE_CH_HALO_NOTES: Record<string, SubtopicNote> = {
  "jch-halo-classify": CLASSIFY_HALO_NOTE,
  "jch-halo-prep": PREP_HALO_NOTE,
  "jch-halo-mech": MECH_HALO_NOTE,
  "jch-halo-reactivity": REACTIVITY_HALO_NOTE,
  "jch-halo-nucleo": NUCLEO_HALO_NOTE,
  "jch-halo-elim": ELIM_HALO_NOTE,
  "jch-halo-arenes": ARENES_HALO_NOTE,
};

export const JEE_CH_HALO_SLUGS = Object.keys(JEE_CH_HALO_NOTES);
