import type { SubtopicNote } from "@/app/notes/_types";
import { PHOTONS_ATOM_NOTE } from "./photons";
import { BOHR_ATOM_NOTE } from "./bohr";
import { SPECTRUM_ATOM_NOTE } from "./spectrum";
import { DUAL_NATURE_ATOM_NOTE } from "./dual-nature";
import { QUANTUM_NUMBERS_ATOM_NOTE } from "./quantum-numbers";
import { ORBITALS_ATOM_NOTE } from "./orbitals";
import { CONFIGURATION_ATOM_NOTE } from "./configuration";

export { JEE_CH_ATOM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/structure-of-atom/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-atom-` here and `jcatom-` on
 * concept slugs.
 */
export const JEE_CH_ATOM_NOTES: Record<string, SubtopicNote> = {
  "jch-atom-photons": PHOTONS_ATOM_NOTE,
  "jch-atom-bohr": BOHR_ATOM_NOTE,
  "jch-atom-spectrum": SPECTRUM_ATOM_NOTE,
  "jch-atom-dual-nature": DUAL_NATURE_ATOM_NOTE,
  "jch-atom-quantum-numbers": QUANTUM_NUMBERS_ATOM_NOTE,
  "jch-atom-orbitals": ORBITALS_ATOM_NOTE,
  "jch-atom-configuration": CONFIGURATION_ATOM_NOTE,
};

export const JEE_CH_ATOM_SLUGS = Object.keys(JEE_CH_ATOM_NOTES);
