import type { SubtopicNote } from "@/app/notes/_types";
import { SUBATOMIC_PARTICLES_NOTE } from "./cetsoa-subatomic-particles";
import { EM_RADIATION_NOTE } from "./cetsoa-em-radiation";
import { BOHR_MODEL_NOTE } from "./cetsoa-bohr-model";
import { HYDROGEN_SPECTRUM_NOTE } from "./cetsoa-hydrogen-spectrum";
import { QUANTUM_MODEL_NOTE } from "./cetsoa-quantum-model";
import { ELECTRONIC_CONFIG_NOTE } from "./cetsoa-electronic-configuration";

export { STRUCTURE_OF_ATOM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-chemistry/structure-of-atom/[subtopicSlug].
 * Keys are GLOBALLY-unique (`cetsoa-` prefixed) — they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const STRUCTURE_OF_ATOM_NOTES: Record<string, SubtopicNote> = {
  "cetsoa-subatomic-particles": SUBATOMIC_PARTICLES_NOTE,
  "cetsoa-em-radiation": EM_RADIATION_NOTE,
  "cetsoa-bohr-model": BOHR_MODEL_NOTE,
  "cetsoa-hydrogen-spectrum": HYDROGEN_SPECTRUM_NOTE,
  "cetsoa-quantum-model": QUANTUM_MODEL_NOTE,
  "cetsoa-electronic-configuration": ELECTRONIC_CONFIG_NOTE,
};

export const STRUCTURE_OF_ATOM_SLUGS = Object.keys(STRUCTURE_OF_ATOM_NOTES);
