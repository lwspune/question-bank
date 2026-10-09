import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_ATS_PARTICLES_NOTE } from "./particles";
import { IMAT_CHE_ATS_ISOTOPES_NOTE } from "./isotopes";
import { IMAT_CHE_ATS_ORBITALS_NOTE } from "./orbitals";
import { IMAT_CHE_ATS_IONS_NOTE } from "./ions";
import { IMAT_CHE_ATS_RADIOACTIVITY_NOTE } from "./radioactivity";

export { IMAT_CHE_ATS_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Atomic Structure. Order matches `subtopicOrder`. */
export const IMAT_CHE_ATS_NOTES: Record<string, SubtopicNote> = {
  "imat-ats-particles": IMAT_CHE_ATS_PARTICLES_NOTE,
  "imat-ats-isotopes": IMAT_CHE_ATS_ISOTOPES_NOTE,
  "imat-ats-orbitals": IMAT_CHE_ATS_ORBITALS_NOTE,
  "imat-ats-ions": IMAT_CHE_ATS_IONS_NOTE,
  "imat-ats-radioactivity": IMAT_CHE_ATS_RADIOACTIVITY_NOTE,
};

export const IMAT_CHE_ATS_SLUGS = Object.keys(IMAT_CHE_ATS_NOTES);
