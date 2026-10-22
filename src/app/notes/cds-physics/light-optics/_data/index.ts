import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_LI_MIRRORS_NOTE } from "./mirrors";
import { CDS_PH_LI_LENSES_NOTE } from "./lenses";
import { CDS_PH_LI_SPECTRUM_NOTE } from "./spectrum";
import { CDS_PH_LI_EYE_NOTE } from "./eye";

export { CDS_PH_LIGHT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/light-optics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-li-` here and `cdsphli-` on concept slugs.
 *
 * 4 pages cut by reading every solution (scripts/cds-gs/reshape/light-optics.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_LIGHT_NOTES: Record<string, SubtopicNote> = {
  "cdsph-li-mirrors": CDS_PH_LI_MIRRORS_NOTE,
  "cdsph-li-lenses": CDS_PH_LI_LENSES_NOTE,
  "cdsph-li-spectrum": CDS_PH_LI_SPECTRUM_NOTE,
  "cdsph-li-eye": CDS_PH_LI_EYE_NOTE,
};

export const CDS_PH_LIGHT_SLUGS = Object.keys(CDS_PH_LIGHT_NOTES);
