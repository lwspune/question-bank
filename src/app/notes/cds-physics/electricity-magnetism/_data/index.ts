import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_EM_CHARGE_NOTE } from "./charge";
import { CDS_PH_EM_CIRCUITS_NOTE } from "./circuits";
import { CDS_PH_EM_POWER_NOTE } from "./power";
import { CDS_PH_EM_MAGNETISM_NOTE } from "./magnetism";

export { CDS_PH_ELECTRICITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/electricity-magnetism/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-em-` here and `cdsphem-` on concept slugs.
 *
 * 4 pages cut by reading every solution (scripts/cds-gs/reshape/electricity-magnetism.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_ELECTRICITY_NOTES: Record<string, SubtopicNote> = {
  "cdsph-em-charge": CDS_PH_EM_CHARGE_NOTE,
  "cdsph-em-circuits": CDS_PH_EM_CIRCUITS_NOTE,
  "cdsph-em-power": CDS_PH_EM_POWER_NOTE,
  "cdsph-em-magnetism": CDS_PH_EM_MAGNETISM_NOTE,
};

export const CDS_PH_ELECTRICITY_SLUGS = Object.keys(CDS_PH_ELECTRICITY_NOTES);
