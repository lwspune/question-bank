import type { SubtopicNote } from "@/app/notes/_types";
import { ACID_BASE_THEORIES_NOTE } from "./cetie-acid-base-theories";
import { KA_KB_NOTE } from "./cetie-ka-kb-dissociation";
import { PH_POH_NOTE } from "./cetie-ph-poh-kw";
import { SALT_HYDROLYSIS_NOTE } from "./cetie-salt-hydrolysis";
import { BUFFERS_NOTE } from "./cetie-buffers";
import { KSP_NOTE } from "./cetie-solubility-product";

export { IONIC_EQUILIBRIA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-chemistry/ionic-equilibria/[subtopicSlug].
 * Keys are GLOBALLY-unique (`cetie-` prefixed) — they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const IONIC_EQUILIBRIA_NOTES: Record<string, SubtopicNote> = {
  "cetie-acid-base-theories": ACID_BASE_THEORIES_NOTE,
  "cetie-ka-kb-dissociation": KA_KB_NOTE,
  "cetie-ph-poh-kw": PH_POH_NOTE,
  "cetie-salt-hydrolysis": SALT_HYDROLYSIS_NOTE,
  "cetie-buffers": BUFFERS_NOTE,
  "cetie-solubility-product": KSP_NOTE,
};

export const IONIC_EQUILIBRIA_SLUGS = Object.keys(IONIC_EQUILIBRIA_NOTES);
