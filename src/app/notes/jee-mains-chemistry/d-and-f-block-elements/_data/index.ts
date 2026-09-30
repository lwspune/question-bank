import type { SubtopicNote } from "@/app/notes/_types";
import { CONFIG_DFB_NOTE } from "./config";
import { OXSTATES_DFB_NOTE } from "./oxstates";
import { MAGNETIC_DFB_NOTE } from "./magnetic";
import { OXIDES_DFB_NOTE } from "./oxides";
import { DICHROMATE_DFB_NOTE } from "./dichromate";
import { PERMANGANATE_DFB_NOTE } from "./permanganate";
import { LANTHANOIDS_DFB_NOTE } from "./lanthanoids";
import { QUALITATIVE_DFB_NOTE } from "./qualitative";

export { JEE_CH_DFB_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/d-and-f-block-elements/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-dfb-` here and `jcdfb-` on
 * concept slugs.
 */
export const JEE_CH_DFB_NOTES: Record<string, SubtopicNote> = {
  "jch-dfb-config": CONFIG_DFB_NOTE,
  "jch-dfb-oxstates": OXSTATES_DFB_NOTE,
  "jch-dfb-magnetic": MAGNETIC_DFB_NOTE,
  "jch-dfb-oxides": OXIDES_DFB_NOTE,
  "jch-dfb-dichromate": DICHROMATE_DFB_NOTE,
  "jch-dfb-permanganate": PERMANGANATE_DFB_NOTE,
  "jch-dfb-lanthanoids": LANTHANOIDS_DFB_NOTE,
  "jch-dfb-qualitative": QUALITATIVE_DFB_NOTE,
};

export const JEE_CH_DFB_SLUGS = Object.keys(JEE_CH_DFB_NOTES);
