import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_EF_CHARGE_NOTE } from "./charge";
import { CB_PH_EF_COULOMB_NOTE } from "./coulomb";
import { CB_PH_EF_FIELD_NOTE } from "./field";
import { CB_PH_EF_DIPOLE_NOTE } from "./dipole";
import { CB_PH_EF_GAUSS_NOTE } from "./gauss";
import { CB_PH_EF_APPLICATIONS_NOTE } from "./applications";

export { CB_PH_EF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/electric-charges-and-fields/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-ef-` here and `cbpef-` on concept slugs.
 *
 * 6 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_EF_NOTES: Record<string, SubtopicNote> = {
  "cbp-ef-charge": CB_PH_EF_CHARGE_NOTE,
  "cbp-ef-coulomb": CB_PH_EF_COULOMB_NOTE,
  "cbp-ef-field": CB_PH_EF_FIELD_NOTE,
  "cbp-ef-dipole": CB_PH_EF_DIPOLE_NOTE,
  "cbp-ef-gauss": CB_PH_EF_GAUSS_NOTE,
  "cbp-ef-applications": CB_PH_EF_APPLICATIONS_NOTE,
};

export const CB_PH_EF_SLUGS = Object.keys(CB_PH_EF_NOTES);
