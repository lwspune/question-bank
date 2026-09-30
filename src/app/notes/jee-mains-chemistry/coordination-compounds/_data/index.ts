import type { SubtopicNote } from "@/app/notes/_types";
import { WERNER_COORD_NOTE } from "./werner";
import { LIGANDS_COORD_NOTE } from "./ligands";
import { ISOMERISM_COORD_NOTE } from "./isomerism";
import { VBT_COORD_NOTE } from "./vbt";
import { SPLITTING_COORD_NOTE } from "./splitting";
import { CFSE_COORD_NOTE } from "./cfse";
import { MAGNETIC_COORD_NOTE } from "./magnetic";
import { CARBONYLS_COORD_NOTE } from "./carbonyls";

export { JEE_CH_COORD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/coordination-compounds/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-coord-` here and `jccoord-` on
 * concept slugs.
 */
export const JEE_CH_COORD_NOTES: Record<string, SubtopicNote> = {
  "jch-coord-werner": WERNER_COORD_NOTE,
  "jch-coord-ligands": LIGANDS_COORD_NOTE,
  "jch-coord-isomerism": ISOMERISM_COORD_NOTE,
  "jch-coord-vbt": VBT_COORD_NOTE,
  "jch-coord-splitting": SPLITTING_COORD_NOTE,
  "jch-coord-cfse": CFSE_COORD_NOTE,
  "jch-coord-magnetic": MAGNETIC_COORD_NOTE,
  "jch-coord-carbonyls": CARBONYLS_COORD_NOTE,
};

export const JEE_CH_COORD_SLUGS = Object.keys(JEE_CH_COORD_NOTES);
