import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_IE_ACIDS_NOTE } from "./acids";
import { HSC_CH_IE_IONISATION_NOTE } from "./ionisation";
import { HSC_CH_IE_PH_NOTE } from "./ph";
import { HSC_CH_IE_HYDROLYSIS_NOTE } from "./hydrolysis";
import { HSC_CH_IE_BUFFERS_NOTE } from "./buffers";
import { HSC_CH_IE_SOLUBILITY_NOTE } from "./solubility";
import { HSC_CH_IE_COMMON_NOTE } from "./common";

export { HSC_CH_IE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/ionic-equilibria/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-ie-` here and `hsccie-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_IE_NOTES: Record<string, SubtopicNote> = {
  "hscc-ie-acids": HSC_CH_IE_ACIDS_NOTE,
  "hscc-ie-ionisation": HSC_CH_IE_IONISATION_NOTE,
  "hscc-ie-ph": HSC_CH_IE_PH_NOTE,
  "hscc-ie-hydrolysis": HSC_CH_IE_HYDROLYSIS_NOTE,
  "hscc-ie-buffers": HSC_CH_IE_BUFFERS_NOTE,
  "hscc-ie-solubility": HSC_CH_IE_SOLUBILITY_NOTE,
  "hscc-ie-common": HSC_CH_IE_COMMON_NOTE,
};

export const HSC_CH_IE_SLUGS = Object.keys(HSC_CH_IE_NOTES);
