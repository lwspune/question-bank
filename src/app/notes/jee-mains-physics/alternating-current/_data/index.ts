import type { SubtopicNote } from "@/app/notes/_types";
import { RMS_AC_NOTE } from "./rms";
import { REACTANCE_AC_NOTE } from "./reactance";
import { IMPEDANCE_AC_NOTE } from "./impedance";
import { RESONANCE_AC_NOTE } from "./resonance";
import { LC_TRANSFORMER_AC_NOTE } from "./lc-transformer";

export { JEE_PH_AC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/alternating-current/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-ac-` here and `jpac-` on
 * concept slugs.
 */
export const JEE_PH_AC_NOTES: Record<string, SubtopicNote> = {
  "jph-ac-rms": RMS_AC_NOTE,
  "jph-ac-reactance": REACTANCE_AC_NOTE,
  "jph-ac-impedance": IMPEDANCE_AC_NOTE,
  "jph-ac-resonance": RESONANCE_AC_NOTE,
  "jph-ac-lc-transformer": LC_TRANSFORMER_AC_NOTE,
};

export const JEE_PH_AC_SLUGS = Object.keys(JEE_PH_AC_NOTES);
