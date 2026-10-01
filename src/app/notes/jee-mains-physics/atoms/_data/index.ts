import type { SubtopicNote } from "@/app/notes/_types";
import { RUTHERFORD_ATOM_NOTE } from "./rutherford";
import { ORBITS_ATOM_NOTE } from "./orbits";
import { SPECTRA_ATOM_NOTE } from "./spectra";
import { TRANSITIONS_ATOM_NOTE } from "./transitions";

export { JEE_PH_ATOM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/atoms/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-atom-` here and `jpatom-` on
 * concept slugs.
 */
export const JEE_PH_ATOM_NOTES: Record<string, SubtopicNote> = {
  "jph-atom-rutherford": RUTHERFORD_ATOM_NOTE,
  "jph-atom-orbits": ORBITS_ATOM_NOTE,
  "jph-atom-spectra": SPECTRA_ATOM_NOTE,
  "jph-atom-transitions": TRANSITIONS_ATOM_NOTE,
};

export const JEE_PH_ATOM_SLUGS = Object.keys(JEE_PH_ATOM_NOTES);
