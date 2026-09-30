import type { SubtopicNote } from "@/app/notes/_types";
import { CONSTANT_EQ_NOTE } from "./constant";
import { COMPOSITION_EQ_NOTE } from "./composition";
import { DISSOCIATION_EQ_NOTE } from "./dissociation";
import { LE_CHATELIER_EQ_NOTE } from "./le-chatelier";
import { PH_EQ_NOTE } from "./ph";
import { BUFFER_EQ_NOTE } from "./buffer";
import { HYDROLYSIS_EQ_NOTE } from "./hydrolysis";
import { KSP_EQ_NOTE } from "./ksp";

export { JEE_CH_EQ_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/equilibrium/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-eq-` here and `jceq-` on
 * concept slugs.
 */
export const JEE_CH_EQ_NOTES: Record<string, SubtopicNote> = {
  "jch-eq-constant": CONSTANT_EQ_NOTE,
  "jch-eq-composition": COMPOSITION_EQ_NOTE,
  "jch-eq-dissociation": DISSOCIATION_EQ_NOTE,
  "jch-eq-le-chatelier": LE_CHATELIER_EQ_NOTE,
  "jch-eq-ph": PH_EQ_NOTE,
  "jch-eq-buffer": BUFFER_EQ_NOTE,
  "jch-eq-hydrolysis": HYDROLYSIS_EQ_NOTE,
  "jch-eq-ksp": KSP_EQ_NOTE,
};

export const JEE_CH_EQ_SLUGS = Object.keys(JEE_CH_EQ_NOTES);
