import type { SubtopicNote } from "@/app/notes/_types";
import { EVALUATE_DI_NOTE } from "./evaluate";
import { KING_DI_NOTE } from "./king";
import { ODD_EVEN_DI_NOTE } from "./odd-even";
import { PIECEWISE_DI_NOTE } from "./piecewise";
import { LEIBNIZ_DI_NOTE } from "./leibniz";
import { REDUCTION_DI_NOTE } from "./reduction";
import { RIEMANN_DI_NOTE } from "./riemann";

export { JEE_DEFINITE_INTEGRATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/definite-integration/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-di-` here and `jdi-` on
 * concept slugs.
 */
export const JEE_DEFINITE_INTEGRATION_NOTES: Record<string, SubtopicNote> = {
  "jee-di-evaluate": EVALUATE_DI_NOTE,
  "jee-di-king": KING_DI_NOTE,
  "jee-di-odd-even": ODD_EVEN_DI_NOTE,
  "jee-di-piecewise": PIECEWISE_DI_NOTE,
  "jee-di-leibniz": LEIBNIZ_DI_NOTE,
  "jee-di-reduction": REDUCTION_DI_NOTE,
  "jee-di-riemann": RIEMANN_DI_NOTE,
};

export const JEE_DEFINITE_INTEGRATION_SLUGS = Object.keys(JEE_DEFINITE_INTEGRATION_NOTES);
