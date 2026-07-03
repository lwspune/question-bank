import type { SubtopicNote } from "@/app/notes/_types";
import { IONIC_COVALENT_NOTE } from "./cetcb-ionic-covalent-lewis";
import { HYBRIDIZATION_NOTE } from "./cetcb-hybridization";
import { VSEPR_NOTE } from "./cetcb-vsepr-geometry";
import { MOT_NOTE } from "./cetcb-mot-bond-order";
import { POLARITY_IMF_NOTE } from "./cetcb-polarity-imf";

export { CHEMICAL_BONDING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-chemistry/chemical-bonding/[subtopicSlug].
 * Keys are GLOBALLY-unique (`cetcb-` prefixed) — they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const CHEMICAL_BONDING_NOTES: Record<string, SubtopicNote> = {
  "cetcb-ionic-covalent-lewis": IONIC_COVALENT_NOTE,
  "cetcb-hybridization": HYBRIDIZATION_NOTE,
  "cetcb-vsepr-geometry": VSEPR_NOTE,
  "cetcb-mot-bond-order": MOT_NOTE,
  "cetcb-polarity-imf": POLARITY_IMF_NOTE,
};

export const CHEMICAL_BONDING_SLUGS = Object.keys(CHEMICAL_BONDING_NOTES);
