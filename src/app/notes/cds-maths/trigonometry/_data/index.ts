import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_TR_VALUES_NOTE } from "./values";
import { CDS_TR_RIGHT_TRIANGLE_NOTE } from "./right-triangle";
import { CDS_TR_COMPLEMENTARY_NOTE } from "./complementary";
import { CDS_TR_IDENTITIES_NOTE } from "./identities";
import { CDS_TR_RECIPROCAL_PAIRS_NOTE } from "./reciprocal-pairs";
import { CDS_TR_GIVEN_SUMS_NOTE } from "./given-sums";
import { CDS_TR_EQUATIONS_NOTE } from "./equations";
import { CDS_TR_COMPOUND_NOTE } from "./compound";
import { CDS_TR_MAX_MIN_NOTE } from "./max-min";
import { CDS_TR_ELIMINATION_NOTE } from "./elimination";

export { CDS_TRIGONOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/trigonometry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `cds-tr-` here and `cdstr-` on concept
 * slugs (NDA and MHT-CET both ship trigonometry notes).
 *
 * The ten pages were cut by reading all 227 solutions (scripts/cds-maths/reshape/trigonometry.ts):
 * the classification catch-all "Fundamental Identities" (115 q) held six technique families,
 * each now on the page that teaches it. Order matches `subtopicOrder`.
 */
export const CDS_TRIGONOMETRY_NOTES: Record<string, SubtopicNote> = {
  "cds-tr-values": CDS_TR_VALUES_NOTE,
  "cds-tr-right-triangle": CDS_TR_RIGHT_TRIANGLE_NOTE,
  "cds-tr-complementary": CDS_TR_COMPLEMENTARY_NOTE,
  "cds-tr-identities": CDS_TR_IDENTITIES_NOTE,
  "cds-tr-reciprocal-pairs": CDS_TR_RECIPROCAL_PAIRS_NOTE,
  "cds-tr-given-sums": CDS_TR_GIVEN_SUMS_NOTE,
  "cds-tr-equations": CDS_TR_EQUATIONS_NOTE,
  "cds-tr-compound": CDS_TR_COMPOUND_NOTE,
  "cds-tr-max-min": CDS_TR_MAX_MIN_NOTE,
  "cds-tr-elimination": CDS_TR_ELIMINATION_NOTE,
};

export const CDS_TRIGONOMETRY_SLUGS = Object.keys(CDS_TRIGONOMETRY_NOTES);
