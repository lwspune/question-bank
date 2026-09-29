import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_TG_ANGLES_NOTE } from "./angles";
import { CDS_TG_INEQUALITIES_NOTE } from "./inequalities";
import { CDS_TG_CONGRUENCE_NOTE } from "./congruence";
import { CDS_TG_PROPORTIONALITY_NOTE } from "./proportionality";
import { CDS_TG_AREA_RATIOS_NOTE } from "./area-ratios";
import { CDS_TG_PYTHAGORAS_NOTE } from "./pythagoras";
import { CDS_TG_ALTITUDE_NOTE } from "./altitude";
import { CDS_TG_MEDIANS_NOTE } from "./medians";
import { CDS_TG_CENTRES_NOTE } from "./centres";
import { CDS_TG_SINE_COSINE_NOTE } from "./sine-cosine";

export { CDS_TRIANGLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/triangles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `cds-tg-` here and `cdstg-` on concept
 * slugs (`cds-tr-` / `cdstr-` belong to CDS Trigonometry).
 *
 * The ten pages were cut by reading all 151 solutions (scripts/cds-maths/reshape/triangles.ts):
 * the classification's "Pythagoras Theorem and its Converse" (39 q) mixed plain Pythagoras,
 * the altitude to the hypotenuse and the squared-difference cevian identities, each now on
 * the page that teaches it. Order matches `subtopicOrder`.
 */
export const CDS_TRIANGLES_NOTES: Record<string, SubtopicNote> = {
  "cds-tg-angles": CDS_TG_ANGLES_NOTE,
  "cds-tg-inequalities": CDS_TG_INEQUALITIES_NOTE,
  "cds-tg-congruence": CDS_TG_CONGRUENCE_NOTE,
  "cds-tg-proportionality": CDS_TG_PROPORTIONALITY_NOTE,
  "cds-tg-area-ratios": CDS_TG_AREA_RATIOS_NOTE,
  "cds-tg-pythagoras": CDS_TG_PYTHAGORAS_NOTE,
  "cds-tg-altitude": CDS_TG_ALTITUDE_NOTE,
  "cds-tg-medians": CDS_TG_MEDIANS_NOTE,
  "cds-tg-centres": CDS_TG_CENTRES_NOTE,
  "cds-tg-sine-cosine": CDS_TG_SINE_COSINE_NOTE,
};

export const CDS_TRIANGLES_SLUGS = Object.keys(CDS_TRIANGLES_NOTES);
