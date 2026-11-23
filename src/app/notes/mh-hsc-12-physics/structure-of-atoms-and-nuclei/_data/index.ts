import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_AN_RUTHERFORD_NOTE } from "./rutherford";
import { HSC_PH_AN_BOHR_NOTE } from "./bohr";
import { HSC_PH_AN_SPECTRA_NOTE } from "./spectra";
import { HSC_PH_AN_NUCLEUS_NOTE } from "./nucleus";
import { HSC_PH_AN_BINDING_NOTE } from "./binding";
import { HSC_PH_AN_DECAYS_NOTE } from "./decays";
import { HSC_PH_AN_HALFLIFE_NOTE } from "./halflife";
import { HSC_PH_AN_FISSION_NOTE } from "./fission";

export { HSC_PH_AN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/structure-of-atoms-and-nuclei/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-an-` here and `hscpan-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are; Bohr's model before Atomic Spectra, because the spectral formula is derived from it).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_AN_NOTES: Record<string, SubtopicNote> = {
  "hscp-an-rutherford": HSC_PH_AN_RUTHERFORD_NOTE,
  "hscp-an-bohr": HSC_PH_AN_BOHR_NOTE,
  "hscp-an-spectra": HSC_PH_AN_SPECTRA_NOTE,
  "hscp-an-nucleus": HSC_PH_AN_NUCLEUS_NOTE,
  "hscp-an-binding": HSC_PH_AN_BINDING_NOTE,
  "hscp-an-decays": HSC_PH_AN_DECAYS_NOTE,
  "hscp-an-halflife": HSC_PH_AN_HALFLIFE_NOTE,
  "hscp-an-fission": HSC_PH_AN_FISSION_NOTE,
};

export const HSC_PH_AN_SLUGS = Object.keys(HSC_PH_AN_NOTES);
