import type { SubtopicNote } from "@/app/notes/_types";
import { PROPERTIES_ALC_NOTE } from "./properties";
import { ACIDITY_ALC_NOTE } from "./acidity";
import { ALCOHOL_REACTIONS_ALC_NOTE } from "./alcohol-reactions";
import { PHENOL_NAMED_ALC_NOTE } from "./phenol-named";
import { PHENOL_RING_ALC_NOTE } from "./phenol-ring";
import { ETHERS_ALC_NOTE } from "./ethers";

export { JEE_CH_ALC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/alcohols-phenols-and-ethers/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-alc-` here and `jcalc-` on
 * concept slugs.
 */
export const JEE_CH_ALC_NOTES: Record<string, SubtopicNote> = {
  "jch-alc-properties": PROPERTIES_ALC_NOTE,
  "jch-alc-acidity": ACIDITY_ALC_NOTE,
  "jch-alc-alcohol-reactions": ALCOHOL_REACTIONS_ALC_NOTE,
  "jch-alc-phenol-named": PHENOL_NAMED_ALC_NOTE,
  "jch-alc-phenol-ring": PHENOL_RING_ALC_NOTE,
  "jch-alc-ethers": ETHERS_ALC_NOTE,
};

export const JEE_CH_ALC_SLUGS = Object.keys(JEE_CH_ALC_NOTES);
