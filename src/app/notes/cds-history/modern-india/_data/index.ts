import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_HI_MO_COMPANY_NOTE } from "./company";
import { CDS_HI_MO_ECONOMY_NOTE } from "./economy";
import { CDS_HI_MO_REVOLTS_NOTE } from "./revolts";
import { CDS_HI_MO_ACTS_NOTE } from "./acts";
import { CDS_HI_MO_REFORM_NOTE } from "./reform";
import { CDS_HI_MO_SOCIETY_NOTE } from "./society";
import { CDS_HI_MO_EARLY_NOTE } from "./early";
import { CDS_HI_MO_NONCOOP_NOTE } from "./noncoop";
import { CDS_HI_MO_CIVIL_NOTE } from "./civil";
import { CDS_HI_MO_INDEPENDENCE_NOTE } from "./independence";
import { CDS_HI_MO_CULTURE_NOTE } from "./culture";

export { CDS_HI_MODERN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-history/modern-india/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdshi-mo-` here and `cdshimo-` on concept slugs.
 *
 * 11 pages cut by reading every solution (scripts/cds-gs/reshape/modern-india.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_HI_MODERN_NOTES: Record<string, SubtopicNote> = {
  "cdshi-mo-company": CDS_HI_MO_COMPANY_NOTE,
  "cdshi-mo-economy": CDS_HI_MO_ECONOMY_NOTE,
  "cdshi-mo-revolts": CDS_HI_MO_REVOLTS_NOTE,
  "cdshi-mo-acts": CDS_HI_MO_ACTS_NOTE,
  "cdshi-mo-reform": CDS_HI_MO_REFORM_NOTE,
  "cdshi-mo-society": CDS_HI_MO_SOCIETY_NOTE,
  "cdshi-mo-early": CDS_HI_MO_EARLY_NOTE,
  "cdshi-mo-noncoop": CDS_HI_MO_NONCOOP_NOTE,
  "cdshi-mo-civil": CDS_HI_MO_CIVIL_NOTE,
  "cdshi-mo-independence": CDS_HI_MO_INDEPENDENCE_NOTE,
  "cdshi-mo-culture": CDS_HI_MO_CULTURE_NOTE,
};

export const CDS_HI_MODERN_SLUGS = Object.keys(CDS_HI_MODERN_NOTES);
