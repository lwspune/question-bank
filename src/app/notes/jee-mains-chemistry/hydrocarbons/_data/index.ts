import type { SubtopicNote } from "@/app/notes/_types";
import { ALKANES_HC_NOTE } from "./alkanes";
import { HALOGENATION_HC_NOTE } from "./halogenation";
import { ADDITION_HC_NOTE } from "./addition";
import { OXIDATION_HC_NOTE } from "./oxidation";
import { ALKYNES_HC_NOTE } from "./alkynes";
import { AROMATICITY_HC_NOTE } from "./aromaticity";
import { EAS_HC_NOTE } from "./eas";
import { SYNTHESIS_HC_NOTE } from "./synthesis";

export { JEE_CH_HC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/hydrocarbons/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-hc-` here and `jchc-` on
 * concept slugs.
 */
export const JEE_CH_HC_NOTES: Record<string, SubtopicNote> = {
  "jch-hc-alkanes": ALKANES_HC_NOTE,
  "jch-hc-halogenation": HALOGENATION_HC_NOTE,
  "jch-hc-addition": ADDITION_HC_NOTE,
  "jch-hc-oxidation": OXIDATION_HC_NOTE,
  "jch-hc-alkynes": ALKYNES_HC_NOTE,
  "jch-hc-aromaticity": AROMATICITY_HC_NOTE,
  "jch-hc-eas": EAS_HC_NOTE,
  "jch-hc-synthesis": SYNTHESIS_HC_NOTE,
};

export const JEE_CH_HC_SLUGS = Object.keys(JEE_CH_HC_NOTES);
