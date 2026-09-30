import type { SubtopicNote } from "@/app/notes/_types";
import { FORMATION_DE_NOTE } from "./formation";
import { SEPARABLE_DE_NOTE } from "./separable";
import { HOMOGENEOUS_DE_NOTE } from "./homogeneous";
import { LINEAR_DE_NOTE } from "./linear";
import { DISGUISE_DE_NOTE } from "./disguise";
import { REDUCIBLE_DE_NOTE } from "./reducible";
import { USE_DE_NOTE } from "./use";
import { HIDDEN_DE_NOTE } from "./hidden";
import { RATES_DE_NOTE } from "./rates";

export { JEE_DIFFERENTIAL_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/differential-equations/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-de-` here and `jde-` on
 * concept slugs.
 */
export const JEE_DIFFERENTIAL_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "jee-de-formation": FORMATION_DE_NOTE,
  "jee-de-separable": SEPARABLE_DE_NOTE,
  "jee-de-homogeneous": HOMOGENEOUS_DE_NOTE,
  "jee-de-linear": LINEAR_DE_NOTE,
  "jee-de-disguise": DISGUISE_DE_NOTE,
  "jee-de-reducible": REDUCIBLE_DE_NOTE,
  "jee-de-use": USE_DE_NOTE,
  "jee-de-hidden": HIDDEN_DE_NOTE,
  "jee-de-rates": RATES_DE_NOTE,
};

export const JEE_DIFFERENTIAL_EQUATIONS_SLUGS = Object.keys(JEE_DIFFERENTIAL_EQUATIONS_NOTES);
