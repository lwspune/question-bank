import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_EC_NI_MEASURES_NOTE } from "./measures";
import { CDS_EC_NI_THEORY_NOTE } from "./theory";
import { CDS_EC_NI_EMPLOYMENT_NOTE } from "./employment";
import { CDS_EC_NI_POVERTY_NOTE } from "./poverty";
import { CDS_EC_NI_DEVELOPMENT_NOTE } from "./development";
import { CDS_EC_NI_INDUSTRY_NOTE } from "./industry";

export { CDS_EC_NATIONAL_INCOME_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-economics/national-income-growth/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsec-ni-` here and `cdsecni-` on concept slugs.
 *
 * 6 pages cut by reading every solution (scripts/cds-gs/reshape/national-income-growth.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_EC_NATIONAL_INCOME_NOTES: Record<string, SubtopicNote> = {
  "cdsec-ni-measures": CDS_EC_NI_MEASURES_NOTE,
  "cdsec-ni-theory": CDS_EC_NI_THEORY_NOTE,
  "cdsec-ni-employment": CDS_EC_NI_EMPLOYMENT_NOTE,
  "cdsec-ni-poverty": CDS_EC_NI_POVERTY_NOTE,
  "cdsec-ni-development": CDS_EC_NI_DEVELOPMENT_NOTE,
  "cdsec-ni-industry": CDS_EC_NI_INDUSTRY_NOTE,
};

export const CDS_EC_NATIONAL_INCOME_SLUGS = Object.keys(CDS_EC_NATIONAL_INCOME_NOTES);
