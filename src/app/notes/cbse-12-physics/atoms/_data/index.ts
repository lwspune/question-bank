import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_AT_RUTHERFORD_NOTE } from "./rutherford";
import { CB_PH_AT_SPECTRA_NOTE } from "./spectra";
import { CB_PH_AT_BOHR_NOTE } from "./bohr";
import { CB_PH_AT_SERIES_NOTE } from "./series";
import { CB_PH_AT_DEBROGLIE_NOTE } from "./debroglie";

export { CB_PH_AT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/atoms/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-at-` here and `cbpat-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_AT_NOTES: Record<string, SubtopicNote> = {
  "cbp-at-rutherford": CB_PH_AT_RUTHERFORD_NOTE,
  "cbp-at-spectra": CB_PH_AT_SPECTRA_NOTE,
  "cbp-at-bohr": CB_PH_AT_BOHR_NOTE,
  "cbp-at-series": CB_PH_AT_SERIES_NOTE,
  "cbp-at-debroglie": CB_PH_AT_DEBROGLIE_NOTE,
};

export const CB_PH_AT_SLUGS = Object.keys(CB_PH_AT_NOTES);
