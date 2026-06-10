import type { SubtopicNote } from "@/app/notes/_types";
import { IONIC_COVALENT_NOTE } from "./ionic-covalent";
import { VALENCY_FORMULA_NOTE } from "./valency-formula";
import { BOND_COUNTING_NOTE } from "./bond-counting";

export { CHEMICAL_BONDING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/chemical-bonding/[subtopicSlug].
 * Keys are GLOBALLY-unique (`bond-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const CHEMICAL_BONDING_NOTES: Record<string, SubtopicNote> = {
  "bond-ionic-covalent": IONIC_COVALENT_NOTE,
  "bond-valency-formula": VALENCY_FORMULA_NOTE,
  "bond-counting": BOND_COUNTING_NOTE,
};

export const CHEMICAL_BONDING_SLUGS = Object.keys(CHEMICAL_BONDING_NOTES);
