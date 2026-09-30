import type { SubtopicNote } from "@/app/notes/_types";
import { MOLE_SBC_NOTE } from "./mole";
import { FORMULA_SBC_NOTE } from "./formula";
import { STOICHIOMETRY_SBC_NOTE } from "./stoichiometry";
import { GASES_SBC_NOTE } from "./gases";
import { MOLARITY_SBC_NOTE } from "./molarity";
import { CONCENTRATION_SBC_NOTE } from "./concentration";
import { REDOX_SBC_NOTE } from "./redox";
import { TITRATION_SBC_NOTE } from "./titration";

export { JEE_CH_SBC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/some-basic-concepts/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-sbc-` here and `jcsbc-` on
 * concept slugs.
 */
export const JEE_CH_SBC_NOTES: Record<string, SubtopicNote> = {
  "jch-sbc-mole": MOLE_SBC_NOTE,
  "jch-sbc-formula": FORMULA_SBC_NOTE,
  "jch-sbc-stoichiometry": STOICHIOMETRY_SBC_NOTE,
  "jch-sbc-gases": GASES_SBC_NOTE,
  "jch-sbc-molarity": MOLARITY_SBC_NOTE,
  "jch-sbc-concentration": CONCENTRATION_SBC_NOTE,
  "jch-sbc-redox": REDOX_SBC_NOTE,
  "jch-sbc-titration": TITRATION_SBC_NOTE,
};

export const JEE_CH_SBC_SLUGS = Object.keys(JEE_CH_SBC_NOTES);
