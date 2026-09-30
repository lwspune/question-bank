import type { SubtopicNote } from "@/app/notes/_types";
import { NOMENCLATURE_GOC_NOTE } from "./nomenclature";
import { STRUCTURAL_GOC_NOTE } from "./structural";
import { STEREO_GOC_NOTE } from "./stereo";
import { EFFECTS_GOC_NOTE } from "./effects";
import { INTERMEDIATES_GOC_NOTE } from "./intermediates";
import { PURIFICATION_GOC_NOTE } from "./purification";
import { CHROMATOGRAPHY_GOC_NOTE } from "./chromatography";
import { DETECTION_GOC_NOTE } from "./detection";
import { ESTIMATION_GOC_NOTE } from "./estimation";

export { JEE_CH_GOC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/organic-basic-principles/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-goc-` here and `jcgoc-` on
 * concept slugs.
 */
export const JEE_CH_GOC_NOTES: Record<string, SubtopicNote> = {
  "jch-goc-nomenclature": NOMENCLATURE_GOC_NOTE,
  "jch-goc-structural": STRUCTURAL_GOC_NOTE,
  "jch-goc-stereo": STEREO_GOC_NOTE,
  "jch-goc-effects": EFFECTS_GOC_NOTE,
  "jch-goc-intermediates": INTERMEDIATES_GOC_NOTE,
  "jch-goc-purification": PURIFICATION_GOC_NOTE,
  "jch-goc-chromatography": CHROMATOGRAPHY_GOC_NOTE,
  "jch-goc-detection": DETECTION_GOC_NOTE,
  "jch-goc-estimation": ESTIMATION_GOC_NOTE,
};

export const JEE_CH_GOC_SLUGS = Object.keys(JEE_CH_GOC_NOTES);
